import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  LEGACY_QUOTE_PRODUCTS,
  LeadHandlerOptions,
  SupabaseLike,
  asAlias,
  checkRateLimit,
  consentValue,
  emptyResponse,
  formVersion,
  insertConfirmed,
  isAllowedOrigin,
  isHoneypotTriggered,
  jsonResponse,
  normalizedChoice,
  normalizeEmail,
  normalizePhone,
  optionalString,
  parseJsonBody,
  requiredString,
  validateEmail,
  validateName,
  validatePhone,
} from "../_shared/lead.ts";

export interface QuoteValidation {
  ok: boolean;
  errors: string[];
  row?: Record<string, unknown>;
}

const VALIDATION_MESSAGES: Record<string, string> = {
  form_version_type: "La versión del formulario no es válida.",
  nombre_required: "El nombre es obligatorio.",
  nombre_type: "El nombre debe ser texto.",
  nombre_invalid: "El nombre no es válido.",
  nombre_too_long: "El nombre es demasiado largo.",
  email_required: "El correo electrónico es obligatorio.",
  email_type: "El correo electrónico debe ser texto.",
  email_invalid: "El correo electrónico no es válido.",
  email_too_long: "El correo electrónico es demasiado largo.",
  telefono_required: "El teléfono es obligatorio.",
  telefono_type: "El teléfono debe ser texto.",
  telefono_invalid: "El teléfono no es válido.",
  telefono_too_long: "El teléfono es demasiado largo.",
  empresa_required: "La empresa es obligatoria.",
  empresa_type: "La empresa debe ser texto.",
  empresa_too_long: "La empresa es demasiado larga.",
  tipo_producto_required: "El tipo de producto es obligatorio.",
  tipo_producto_type: "El tipo de producto debe ser texto.",
  tipo_producto_invalid: "El tipo de producto seleccionado no es válido.",
  tipo_producto_too_long: "El tipo de producto es demasiado largo.",
  ubicacion_proyecto_required: "La ubicación del proyecto es obligatoria.",
  ubicacion_proyecto_type: "La ubicación del proyecto debe ser texto.",
  ubicacion_proyecto_too_long: "La ubicación del proyecto es demasiado larga.",
  fecha_estimada_type: "La fecha estimada debe ser texto.",
  fecha_estimada_too_long: "La fecha estimada es demasiado larga.",
  fecha_estimada_invalid: "La fecha estimada no es válida.",
  capacidad_requerida_type: "La capacidad requerida debe ser texto.",
  capacidad_requerida_too_long: "La capacidad requerida es demasiado larga.",
  tipo_cultivo_type: "El tipo de cultivo debe ser texto.",
  tipo_cultivo_too_long: "El tipo de cultivo es demasiado largo.",
  condiciones_ambientales_type: "Las condiciones ambientales deben ser texto.",
  condiciones_ambientales_too_long: "Las condiciones ambientales son demasiado largas.",
  energia_disponible_type: "La energía disponible debe ser texto.",
  energia_disponible_too_long: "La energía disponible es demasiado larga.",
  presupuesto_aproximado_type: "El presupuesto aproximado debe ser texto.",
  presupuesto_aproximado_too_long: "El presupuesto aproximado es demasiado largo.",
  comentarios_adicionales_type: "Los comentarios adicionales deben ser texto.",
  comentarios_adicionales_too_long: "Los comentarios adicionales son demasiado largos.",
  acepta_politica_type: "El consentimiento debe ser válido.",
  acepta_politica_required: "Debes aceptar la política de privacidad.",
  website_type: "La solicitud no es válida.",
  timestamp_type: "La solicitud no es válida.",
};

function validationDetails(errors: string[]): string[] {
  return errors.map((error) => VALIDATION_MESSAGES[error] ?? "Revisa los datos ingresados.");
}

function isCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  return day <= daysInMonth;
}

export function validateQuotePayload(value: Record<string, unknown>): QuoteValidation {
  const errors: string[] = [];
  const version = formVersion(value);
  if (version === -1) errors.push("form_version_type");

  const nombre = requiredString(value, ["nombre"], "nombre", 100, errors);
  if (nombre && !validateName(nombre)) errors.push("nombre_invalid");
  const email = normalizeEmail(requiredString(value, ["email"], "email", 254, errors));
  if (email && !validateEmail(email)) errors.push("email_invalid");
  const telefono = normalizePhone(requiredString(value, ["telefono", "phone"], "telefono", 30, errors));
  if (telefono && !validatePhone(telefono)) errors.push("telefono_invalid");
  const empresa = requiredString(value, ["empresa", "organizacion", "organization"], "empresa", 200, errors);

  const rawProduct = requiredString(value, ["tipoProducto", "tipo_producto"], "tipo_producto", 80, errors);
  const tipoProducto = normalizedChoice(rawProduct);
  if (tipoProducto && !LEGACY_QUOTE_PRODUCTS.has(tipoProducto)) errors.push("tipo_producto_invalid");
  const ubicacionProyecto = requiredString(
    value,
    ["ubicacionProyecto", "ubicacion_proyecto", "ubicacion", "municipio"],
    "ubicacion_proyecto",
    200,
    errors,
  );

  const fechaEstimada = optionalString(value, ["fechaEstimada", "fecha_estimada"], "fecha_estimada", 30, errors);
  if (fechaEstimada && !isCalendarDate(fechaEstimada)) errors.push("fecha_estimada_invalid");
  const capacidadRequerida = optionalString(
    value,
    ["capacidadRequerida", "capacidad_requerida"],
    "capacidad_requerida",
    120,
    errors,
  );
  const tipoCultivo = optionalString(value, ["tipoCultivo", "tipo_cultivo"], "tipo_cultivo", 100, errors);
  const condicionesAmbientales = optionalString(
    value,
    ["condicionesAmbientales", "condiciones_ambientales"],
    "condiciones_ambientales",
    1000,
    errors,
  );
  const energiaDisponible = optionalString(
    value,
    ["energiaDisponible", "energia_disponible"],
    "energia_disponible",
    50,
    errors,
  );
  const presupuestoAproximado = optionalString(
    value,
    ["presupuestoAproximado", "presupuesto_aproximado"],
    "presupuesto_aproximado",
    120,
    errors,
  );
  const comentariosAdicionales = optionalString(
    value,
    ["comentariosAdicionales", "comentarios_adicionales", "mensaje"],
    "comentarios_adicionales",
    3000,
    errors,
  );

  const website = asAlias(value, "website");
  if (website !== undefined && typeof website !== "string") errors.push("website_type");
  const timestamp = asAlias(value, "_timestamp");
  if (timestamp !== undefined && typeof timestamp !== "string" && typeof timestamp !== "number") {
    errors.push("timestamp_type");
  }

  // validate-quote predates the consent checkbox. If a future v2 caller uses it,
  // enforce consent, but legacy requests remain accepted and are not assigned a
  // consent column because quote_requests has no such historical field.
  const consent = asAlias(value, "aceptaPolitica", "acepta_politica");
  if (consent !== undefined && typeof consent !== "boolean") errors.push("acepta_politica_type");
  // Legacy requests may omit consent for historical compatibility. An
  // explicitly false value is different: reject it, and require v2 consent.
  if (consent === false || (version === 2 && !consentValue(value))) errors.push("acepta_politica_required");

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    errors: [],
    row: {
      nombre,
      email,
      telefono,
      empresa,
      tipo_producto: tipoProducto,
      ubicacion_proyecto: ubicacionProyecto,
      fecha_estimada: fechaEstimada || null,
      capacidad_requerida: capacidadRequerida || null,
      tipo_cultivo: tipoCultivo || null,
      condiciones_ambientales: condicionesAmbientales || null,
      energia_disponible: energiaDisponible || null,
      presupuesto_aproximado: presupuestoAproximado || null,
      comentarios_adicionales: comentariosAdicionales || null,
    },
  };
}

export function createQuoteHandler(options: LeadHandlerOptions): (request: Request) => Promise<Response> {
  return async (request: Request): Promise<Response> => {
    const origin = request.headers.get("origin");
    const configured = options.allowedOrigins;
    if (!isAllowedOrigin(origin, configured)) {
      return jsonResponse({ error: "Origen no permitido." }, 403, null, configured);
    }
    if (request.method === "OPTIONS") return emptyResponse(204, origin, configured);
    if (request.method !== "POST") {
      return jsonResponse({ error: "Método no permitido." }, 405, origin, configured, { Allow: "POST, OPTIONS" });
    }

    const parsed = await parseJsonBody(request);
    if (!parsed.ok) {
      const message = parsed.error === "too_large"
        ? "La solicitud es demasiado grande."
        : "El cuerpo de la solicitud no es JSON válido.";
      return jsonResponse({ error: message }, 400, origin, configured);
    }
    const body = parsed.value;

    if (isHoneypotTriggered(body)) {
      return jsonResponse({ success: true, accepted: false, bot: true }, 200, origin, configured);
    }

    const validation = validateQuotePayload(body);
    if (!validation.ok || !validation.row) {
      return jsonResponse(
        { error: "Revisa los datos ingresados.", details: validationDetails(validation.errors) },
        400,
        origin,
        configured,
      );
    }

    let supabase: SupabaseLike;
    try {
      supabase = options.getSupabase();
    } catch {
      return jsonResponse({ error: "Servicio temporalmente no disponible. Intenta nuevamente más tarde." }, 503, origin, configured);
    }

    const rateLimit = await checkRateLimit(supabase, "quote", request, String(validation.row.email ?? ""));
    if (!rateLimit.ok) {
      return jsonResponse(
        { error: "No se pudo verificar el límite de solicitudes. Intenta nuevamente más tarde." },
        503,
        origin,
        configured,
        { "Retry-After": "30" },
      );
    }
    if (!rateLimit.allowed) {
      return jsonResponse(
        { error: "Has enviado demasiadas solicitudes. Intenta nuevamente más tarde." },
        429,
        origin,
        configured,
        { "Retry-After": String(rateLimit.retryAfter ?? 3600) },
      );
    }

    const inserted = await insertConfirmed(supabase, "quote_requests", validation.row);
    if (!inserted) {
      return jsonResponse({ error: "No se pudo guardar la solicitud. Intenta nuevamente más tarde." }, 503, origin, configured, {
        "Retry-After": "30",
      });
    }

    return jsonResponse({ success: true }, 200, origin, configured);
  };
}

const defaultSupabase = (): SupabaseLike => createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
) as unknown as SupabaseLike;

if (import.meta.main || Deno.env.has("DENO_DEPLOYMENT_ID")) {
  serve(createQuoteHandler({ getSupabase: defaultSupabase }));
}
