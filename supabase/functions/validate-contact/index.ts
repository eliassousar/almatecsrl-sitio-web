import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  CONTACT_SUBJECTS,
  LeadHandlerOptions,
  SupabaseLike,
  addStructuredDetails,
  asAlias,
  checkRateLimit,
  consentValue,
  emptyResponse,
  formVersion,
  insertConfirmed,
  isHoneypotTriggered,
  isAllowedOrigin,
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

export interface ContactValidation {
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
  email_type: "El correo electrónico debe ser texto.",
  email_invalid: "El correo electrónico no es válido.",
  email_too_long: "El correo electrónico es demasiado largo.",
  telefono_type: "El teléfono debe ser texto.",
  telefono_invalid: "El teléfono no es válido.",
  telefono_too_long: "El teléfono es demasiado largo.",
  contacto_required: "Ingresa un correo electrónico o un teléfono.",
  empresa_type: "La empresa debe ser texto.",
  empresa_too_long: "La empresa es demasiado larga.",
  ubicacion_required: "La ubicación es obligatoria para este formulario.",
  ubicacion_type: "La ubicación debe ser texto.",
  ubicacion_too_long: "La ubicación es demasiado larga.",
  asunto_required: "El asunto es obligatorio.",
  asunto_type: "El asunto debe ser texto.",
  asunto_invalid: "El asunto seleccionado no es válido.",
  asunto_too_long: "El asunto es demasiado largo.",
  mensaje_type: "El mensaje debe ser texto.",
  mensaje_too_long: "El mensaje es demasiado largo.",
  tipo_cultivo_type: "El tipo de cultivo debe ser texto.",
  tipo_cultivo_too_long: "El tipo de cultivo es demasiado largo.",
  actividad_type: "La actividad debe ser texto.",
  actividad_too_long: "La actividad es demasiado larga.",
  volumen_aprox_type: "El volumen aproximado debe ser texto.",
  volumen_aprox_too_long: "El volumen aproximado es demasiado largo.",
  acepta_politica_type: "El consentimiento debe ser válido.",
  acepta_politica_required: "Debes aceptar la política de privacidad.",
  website_type: "La solicitud no es válida.",
  timestamp_type: "La solicitud no es válida.",
  timestamp_too_long: "La solicitud no es válida.",
};

function validationDetails(errors: string[]): string[] {
  return errors.map((error) => VALIDATION_MESSAGES[error] ?? "Revisa los datos ingresados.");
}

function validateBooleanField(value: Record<string, unknown>, errors: string[]): void {
  const raw = asAlias(value, "aceptaPolitica", "acepta_politica");
  if (raw !== undefined && typeof raw !== "boolean") errors.push("acepta_politica_type");
}

export function validateContactPayload(value: Record<string, unknown>): ContactValidation {
  const errors: string[] = [];
  const version = formVersion(value);
  if (version === -1) errors.push("form_version_type");

  const nombre = requiredString(value, ["nombre"], "nombre", 100, errors);
  if (nombre && !validateName(nombre)) errors.push("nombre_invalid");

  const email = normalizeEmail(optionalString(value, ["email"], "email", 254, errors));
  if (email && !validateEmail(email)) errors.push("email_invalid");

  const telefono = normalizePhone(optionalString(value, ["telefono", "phone"], "telefono", 30, errors));
  if (telefono && !validatePhone(telefono)) errors.push("telefono_invalid");
  if (!email && !telefono) errors.push("contacto_required");

  const empresa = optionalString(value, ["empresa", "organizacion", "organization"], "empresa", 200, errors);
  const ubicacion = version === 2
    ? requiredString(value, ["ubicacion", "municipio", "ubicacion_proyecto"], "ubicacion", 200, errors)
    : optionalString(value, ["ubicacion", "municipio", "ubicacion_proyecto"], "ubicacion", 200, errors);
  const rawSubject = requiredString(value, ["asunto", "necesidad"], "asunto", 80, errors);
  const asunto = normalizedChoice(rawSubject);
  if (asunto && !CONTACT_SUBJECTS.has(asunto)) errors.push("asunto_invalid");

  const mensajeBase = optionalString(value, ["mensaje", "message"], "mensaje", 3500, errors);
  const tipoCultivo = optionalString(value, ["tipoCultivo", "tipo_cultivo"], "tipo_cultivo", 100, errors);
  const actividad = optionalString(value, ["actividad", "tipoActividad", "tipo_actividad"], "actividad", 120, errors);
  const volumen = optionalString(value, ["volumen_aprox", "volumenAprox", "volumen"], "volumen_aprox", 120, errors);

  const website = asAlias(value, "website");
  if (website !== undefined && typeof website !== "string") errors.push("website_type");
  const timestamp = asAlias(value, "_timestamp");
  if (timestamp !== undefined && typeof timestamp !== "string" && typeof timestamp !== "number") {
    errors.push("timestamp_type");
  }
  if (typeof timestamp === "string" && timestamp.length > 40) errors.push("timestamp_too_long");

  validateBooleanField(value, errors);
  const consent = consentValue(value);
  if (!consent) errors.push("acepta_politica_required");

  const mensaje = addStructuredDetails(mensajeBase, [
    ["Actividad", actividad],
    ["Volumen aproximado", volumen],
    ["Tipo de cultivo", tipoCultivo],
  ]);

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    errors: [],
    row: {
      nombre,
      email,
      telefono,
      empresa,
      asunto,
      mensaje,
      ubicacion,
      tipo_cultivo: tipoCultivo || null,
      acepta_politica: true,
    },
  };
}

export function createContactHandler(options: LeadHandlerOptions): (request: Request) => Promise<Response> {
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

    // Only the explicit honeypot is a bot signal. A fast timestamp is not rejection logic.
    if (isHoneypotTriggered(body)) {
      return jsonResponse({ success: true, accepted: false, bot: true }, 200, origin, configured);
    }

    const validation = validateContactPayload(body);
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

    const rateLimit = await checkRateLimit(supabase, "contact", request, String(validation.row.email ?? ""));
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

    const inserted = await insertConfirmed(supabase, "contact_inquiries", validation.row);
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
  serve(createContactHandler({ getSupabase: defaultSupabase }));
}
