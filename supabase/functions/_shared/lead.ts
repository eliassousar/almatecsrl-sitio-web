export const MAX_BODY_BYTES = 32 * 1024;
export const RATE_LIMIT_RETRY_SECONDS = 30;

export type JsonRecord = Record<string, unknown>;

type RpcResult = { data: unknown; error: unknown };
type InsertResult = { data: unknown; error: unknown };

export interface SupabaseLike {
  rpc: (name: string, args: Record<string, unknown>) => Promise<RpcResult>;
  from: (table: string) => {
    insert: (values: JsonRecord) => {
      select: (columns: string) => { single: () => Promise<InsertResult> };
    };
  };
}

export interface LeadHandlerOptions {
  getSupabase: () => SupabaseLike;
  allowedOrigins?: string;
}

export interface RateLimitAllowed {
  ok: true;
  allowed: boolean;
  retryAfter?: number;
}

export interface RateLimitUnavailable {
  ok: false;
}

export type RateLimitResult = RateLimitAllowed | RateLimitUnavailable;

export interface ParsedBody {
  ok: true;
  value: JsonRecord;
}

export interface ParseBodyError {
  ok: false;
  error: 'too_large' | 'malformed';
}

const DEFAULT_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost:(?:3000|4173|5173)$/i,
  /^https?:\/\/127\.0\.0\.1:(?:3000|4173|5173)$/i,
];

const DEFAULT_ORIGINS = new Set([
  'https://almatecsrl-sitio-web.lovable.app',
  'https://preview--almatecsrl-sitio-web.lovable.app',
  'https://almatec.net',
  'https://www.almatec.net',
  'http://localhost:3000',
  'http://localhost:4173',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4173',
  'http://127.0.0.1:5173',
]);

function environment(name: string): string | undefined {
  try {
    return typeof Deno !== 'undefined' ? Deno.env.get(name) ?? undefined : undefined;
  } catch {
    return undefined;
  }
}

export function configuredOrigins(value = environment('ALLOWED_ORIGINS')): Set<string> {
  return new Set(
    (value ?? '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

export function isAllowedOrigin(origin: string | null, configured?: string): boolean {
  if (!origin) return true;
  const explicit = configuredOrigins(configured);
  if (explicit.size > 0) return explicit.has(origin);
  return DEFAULT_ORIGINS.has(origin) || DEFAULT_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}

export function corsHeaders(origin: string | null, configured?: string): HeadersInit {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '600',
    'Vary': 'Origin',
  };
  if (origin && isAllowedOrigin(origin, configured)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

export function jsonResponse(
  body: JsonRecord,
  status: number,
  origin: string | null,
  configuredOriginsValue?: string,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(origin, configuredOriginsValue),
      ...extraHeaders,
    },
  });
}

export function emptyResponse(
  status: number,
  origin: string | null,
  configuredOriginsValue?: string,
): Response {
  return new Response(null, {
    status,
    headers: corsHeaders(origin, configuredOriginsValue),
  });
}

export async function parseJsonBody(request: Request, maxBytes = MAX_BODY_BYTES): Promise<ParsedBody | ParseBodyError> {
  const contentLength = request.headers.get('content-length');
  if (contentLength && Number.isFinite(Number(contentLength)) && Number(contentLength) > maxBytes) {
    return { ok: false, error: 'too_large' };
  }

  let text: string;
  try {
    text = await request.text();
  } catch {
    return { ok: false, error: 'malformed' };
  }
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    return { ok: false, error: 'too_large' };
  }

  try {
    const value: unknown = JSON.parse(text);
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return { ok: false, error: 'malformed' };
    }
    return { ok: true, value: value as JsonRecord };
  } catch {
    return { ok: false, error: 'malformed' };
  }
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const candidate = (forwarded || real || '').split(',')[0].trim();
  return candidate;
}

export async function checkRateLimit(
  supabase: SupabaseLike,
  action: 'contact' | 'quote',
  request: Request,
  email: string,
): Promise<RateLimitResult> {
  const ip = clientIp(request);
  // Never send a shared placeholder to the database: it would rate-limit every
  // email-less request behind the same artificial address. Phone-only browser
  // submissions normally include a gateway IP; otherwise fail closed.
  if (!email && !ip) return { ok: false };
  try {
    const result = await supabase.rpc('check_rate_limit', {
      _action: action,
      _ip: ip,
      _email: email,
      _max_per_hour: 3,
      _max_per_day: 10,
    });
    if (result.error || !result.data || typeof result.data !== 'object' || Array.isArray(result.data)) {
      return { ok: false };
    }
    const value = result.data as Record<string, unknown>;
    if (typeof value.allowed !== 'boolean') return { ok: false };
    if (!value.allowed) {
      const retryAfter = typeof value.retry_after === 'number' && Number.isFinite(value.retry_after)
        ? Math.max(1, Math.min(Math.trunc(value.retry_after), 86400))
        : 3600;
      return { ok: true, allowed: false, retryAfter };
    }
    return { ok: true, allowed: true };
  } catch {
    return { ok: false };
  }
}

export function isHoneypotTriggered(value: JsonRecord): boolean {
  return typeof value.website === 'string' && value.website.trim().length > 0;
}

export function asAlias(value: JsonRecord, ...keys: string[]): unknown {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(value, key) && value[key] !== undefined) return value[key];
  }
  return undefined;
}

export function optionalString(
  value: JsonRecord,
  keys: string[],
  field: string,
  maxLength: number,
  errors: string[],
): string {
  const raw = asAlias(value, ...keys);
  if (raw === undefined || raw === null || raw === '') return '';
  if (typeof raw !== 'string') {
    errors.push(`${field}_type`);
    return '';
  }
  const normalized = collapseWhitespace(raw);
  if ([...normalized].length > maxLength) errors.push(`${field}_too_long`);
  return normalized;
}

export function requiredString(
  value: JsonRecord,
  keys: string[],
  field: string,
  maxLength: number,
  errors: string[],
): string {
  const raw = asAlias(value, ...keys);
  if (typeof raw !== 'string') {
    errors.push(`${field}_required`);
    return '';
  }
  const normalized = collapseWhitespace(raw);
  if (!normalized) errors.push(`${field}_required`);
  else if ([...normalized].length > maxLength) errors.push(`${field}_too_long`);
  return normalized;
}

export function collapseWhitespace(value: string): string {
  return value.trim().replace(/\s+/gu, ' ');
}

export function normalizeEmail(value: string): string {
  return collapseWhitespace(value).toLowerCase();
}

export function validateEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value);
}

export function normalizePhone(value: string): string {
  return collapseWhitespace(value);
}

export function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/gu, '');
  return value.length <= 30 && digits.length >= 7 && /^[0-9+().\-\s]+$/u.test(value);
}

export function validateName(value: string): boolean {
  if ([...value].length < 2 || [...value].length > 100) return false;
  if (!/[\p{L}]/u.test(value)) return false;
  return !/[\p{C}\d]/u.test(value) && /^[\p{L}\p{M}\s.'’\-]+$/u.test(value);
}

export function normalizedChoice(value: string): string {
  return collapseWhitespace(value).toLowerCase().replace(/\s+/gu, '-');
}

export const CONTACT_SUBJECTS = new Set([
  'almacenamiento',
  'secado',
  'limpieza',
  'manejo',
  'balanzas',
  'volcadoras',
  'servicio-tecnico',
  'orientacion',
  'otro',
  'cotizacion',
  'silos-gsi',
  'informacion-general',
  'por-definir',
]);

export const LEGACY_QUOTE_PRODUCTS = new Set([
  'silos-gsi',
  'sistemas-secado',
  'transportadores',
  'sistema-completo',
  'almacenamiento',
  'secado',
  'limpieza',
  'manejo',
  'balanzas',
  'volcadoras',
  'servicio-tecnico',
  'orientacion',
  'cotizacion',
  'otro',
]);

export function addStructuredDetails(
  message: string,
  details: Array<[label: string, value: string]>,
  maxLength = 4000,
): string {
  const lines = details.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
  const suffix = lines.length > 0 ? `\n\nDatos adicionales:\n${lines.join('\n')}` : '';
  const result = `${message}${suffix}`.trim() || 'Consulta enviada desde el formulario de contacto.';
  return result.slice(0, maxLength);
}

export async function insertConfirmed(
  supabase: SupabaseLike,
  table: string,
  row: JsonRecord,
): Promise<boolean> {
  try {
    const result = await supabase.from(table).insert(row).select('id').single();
    return !result.error && Boolean(result.data);
  } catch {
    return false;
  }
}

export function formVersion(value: JsonRecord): number | undefined {
  const raw = value.form_version;
  if (raw === undefined || raw === null || raw === '') return undefined;
  return typeof raw === 'number' && Number.isInteger(raw) && raw >= 1 && raw <= 10 ? raw : -1;
}

export function consentValue(value: JsonRecord): boolean {
  const raw = asAlias(value, 'aceptaPolitica', 'acepta_politica');
  return raw === true;
}

export function hasProvided(value: JsonRecord, ...keys: string[]): boolean {
  return asAlias(value, ...keys) !== undefined;
}
