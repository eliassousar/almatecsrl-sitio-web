import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  createContactHandler,
  validateContactPayload,
} from "../validate-contact/index.ts";
import {
  createQuoteHandler,
  validateQuotePayload,
} from "../validate-quote/index.ts";
import {
  clientIp,
  isAllowedOrigin,
} from "./lead.ts";
import type { SupabaseLike } from "./lead.ts";

interface MockState {
  rpcCalls: Array<{ name: string; args: Record<string, unknown> }>;
  inserts: Array<{ table: string; values: Record<string, unknown>; selected: string; singleCalled: boolean }>;
}

function mockSupabase(
  rateResult: { data: unknown; error: unknown } = { data: { allowed: true }, error: null },
  insertResult: { data: unknown; error: unknown } = { data: { id: "lead-1" }, error: null },
): { client: SupabaseLike; state: MockState } {
  const state: MockState = { rpcCalls: [], inserts: [] };
  const client: SupabaseLike = {
    async rpc(name, args) {
      state.rpcCalls.push({ name, args });
      return rateResult;
    },
    from(table) {
      return {
        insert(values) {
          const record = { table, values, selected: "", singleCalled: false };
          state.inserts.push(record);
          return {
            select(columns) {
              record.selected = columns;
              return {
                async single() {
                  record.singleCalled = true;
                  return insertResult;
                },
              };
            },
          };
        },
      };
    },
  };
  return { client, state };
}

function request(
  body: unknown,
  options: { method?: string; origin?: string; ip?: string } = {},
): Request {
  const method = options.method ?? "POST";
  const headers = new Headers({
    "content-type": "application/json",
    origin: options.origin ?? "https://allowed.example",
  });
  if (options.ip) headers.set("x-forwarded-for", options.ip);
  return new Request("https://edge.example.test", {
    method,
    headers,
    body: method === "POST" ? JSON.stringify(body) : undefined,
  });
}

function contactBody(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    form_version: 2,
    nombre: "Álvaro",
    email: "",
    telefono: "+591 70000000",
    empresa: "",
    asunto: "orientacion",
    mensaje: "Necesito orientación para un acopio.",
    ubicacion: "Por definir",
    tipo_cultivo: "soya",
    actividad: "acopio",
    volumen_aprox: "1.000 t",
    acepta_politica: true,
    website: "",
    _timestamp: String(Date.now()),
    ...overrides,
  };
}

function legacyQuoteBody(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    nombre: "María",
    email: "maria@example.com",
    telefono: "+591 70000000",
    empresa: "Acopio SRL",
    tipoProducto: "silos-gsi",
    ubicacionProyecto: "Santa Cruz",
    fechaEstimada: "",
    capacidadRequerida: "1000 t",
    tipoCultivo: "soya",
    condicionesAmbientales: "",
    energiaDisponible: "",
    presupuestoAproximado: "",
    comentariosAdicionales: "Cotización de silos.",
    website: "",
    _timestamp: String(Date.now()),
    ...overrides,
  };
}

Deno.test("contacto: espera insert confirmado y agrega actividad/volumen al mensaje", async () => {
  const mock = mockSupabase();
  const handler = createContactHandler({
    getSupabase: () => mock.client,
    allowedOrigins: "https://allowed.example",
  });
  const response = await handler(request(contactBody(), { ip: "198.51.100.10" }));
  const result = await response.json();

  assertEquals(response.status, 200);
  assertEquals(result.success, true);
  assertEquals(mock.state.rpcCalls.length, 1);
  assertEquals(mock.state.inserts.length, 1);
  assertEquals(mock.state.inserts[0].selected, "id");
  assertEquals(mock.state.inserts[0].singleCalled, true);
  assertStringIncludes(String(mock.state.inserts[0].values.mensaje), "Actividad: acopio");
  assertStringIncludes(String(mock.state.inserts[0].values.mensaje), "Volumen aproximado: 1.000 t");
  assertEquals("ip" in mock.state.inserts[0].values, false);
  assertEquals("user_agent" in mock.state.inserts[0].values, false);
});

Deno.test("contacto: timestamp rápido no rechaza a una persona sin honeypot", async () => {
  const mock = mockSupabase();
  const handler = createContactHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const response = await handler(request(contactBody({ _timestamp: String(Date.now()) }), { ip: "198.51.100.11" }));
  assertEquals(response.status, 200);
  assertEquals(mock.state.inserts.length, 1);
});

Deno.test("contacto: acepta aliases snake/camel y solo teléfono o solo email", () => {
  const phoneOnly = validateContactPayload(contactBody({ email: "", acepta_politica: true, aceptaPolitica: undefined }));
  assertEquals(phoneOnly.ok, true);
  const emailOnly = validateContactPayload(contactBody({ telefono: "", email: "persona@example.com" }));
  assertEquals(emailOnly.ok, true);
  const camel = validateContactPayload(contactBody({ tipo_cultivo: undefined, tipoCultivo: "maíz", acepta_politica: undefined, aceptaPolitica: true }));
  assertEquals(camel.ok, true);
  assertEquals(camel.row?.tipo_cultivo, "maíz");
});

Deno.test("contacto: valida tipos, consentimiento v2 y campos requeridos", async () => {
  const mock = mockSupabase();
  const handler = createContactHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const response = await handler(request(contactBody({ email: 42, actividad: { bad: true }, acepta_politica: false, aceptaPolitica: undefined })));
  const result = await response.json();
  assertEquals(response.status, 400);
  assertEquals(result.error, "Revisa los datos ingresados.");
  assertStringIncludes(result.details.join(" "), "correo electrónico");
  assertEquals(mock.state.inserts.length, 0);
});

Deno.test("contacto: rate limit denegado responde 429 sin insertar", async () => {
  const mock = mockSupabase({ data: { allowed: false, retry_after: 120 }, error: null });
  const handler = createContactHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const response = await handler(request(contactBody(), { ip: "198.51.100.12" }));
  assertEquals(response.status, 429);
  assertEquals(response.headers.get("retry-after"), "120");
  assertEquals(mock.state.inserts.length, 0);
});

Deno.test("contacto: error de rate limit falla cerrado con 503", async () => {
  const mock = mockSupabase({ data: null, error: { code: "db_unavailable" } });
  const handler = createContactHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const response = await handler(request(contactBody()));
  const result = await response.json();
  assertEquals(response.status, 503);
  assertEquals(result.error, "No se pudo verificar el límite de solicitudes. Intenta nuevamente más tarde.");
  assertEquals(mock.state.inserts.length, 0);
});

Deno.test("contacto: error de base de datos no confirma éxito", async () => {
  const mock = mockSupabase({ data: { allowed: true }, error: null }, { data: null, error: { code: "insert_failed" } });
  const handler = createContactHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const response = await handler(request(contactBody(), { ip: "198.51.100.13" }));
  const result = await response.json();
  assertEquals(response.status, 503);
  assertEquals(result.success, undefined);
  assertEquals(mock.state.inserts[0].singleCalled, true);
});

Deno.test("contacto: honeypot devuelve fake success distinguible y no persiste", async () => {
  const mock = mockSupabase();
  const handler = createContactHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const response = await handler(request(contactBody({ website: "filled-by-bot" })));
  const result = await response.json();
  assertEquals(response.status, 200);
  assertEquals(result.success, true);
  assertEquals(result.accepted, false);
  assertEquals(result.bot, true);
  assertEquals(mock.state.rpcCalls.length, 0);
  assertEquals(mock.state.inserts.length, 0);
});

Deno.test("quote legacy: acepta shape camel, espera insert confirmado y no guarda metadata", async () => {
  const mock = mockSupabase();
  const handler = createQuoteHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const response = await handler(request(legacyQuoteBody()));
  const result = await response.json();
  assertEquals(response.status, 200);
  assertEquals(result.success, true);
  assertEquals(mock.state.inserts[0].table, "quote_requests");
  assertEquals(mock.state.inserts[0].selected, "id");
  assertEquals(mock.state.inserts[0].singleCalled, true);
  assertEquals("ip" in mock.state.inserts[0].values, false);
  assertEquals("user_agent" in mock.state.inserts[0].values, false);
});

Deno.test("quote legacy: acepta shape snake_case y consentimiento ausente", () => {
  const validation = validateQuotePayload({
    nombre: "José",
    email: "jose@example.com",
    telefono: "+591 70000001",
    empresa: "Cooperativa",
    tipo_producto: "sistemas-secado",
    ubicacion_proyecto: "Cochabamba",
    fecha_estimada: null,
    capacidad_requerida: null,
    tipo_cultivo: null,
    condiciones_ambientales: null,
    energia_disponible: null,
    presupuesto_aproximado: null,
    comentarios_adicionales: null,
  });
  assertEquals(validation.ok, true);
  assertEquals(validation.row?.tipo_producto, "sistemas-secado");
});

Deno.test("quote v2: consentimiento es obligatorio, fechas/presupuesto no", () => {
  const validation = validateQuotePayload(legacyQuoteBody({ form_version: 2, acepta_politica: false }));
  assertEquals(validation.ok, false);
  assert(validation.errors.includes("acepta_politica_required"));
  const validV2 = validateQuotePayload(legacyQuoteBody({ form_version: 2, acepta_politica: true, fechaEstimada: "", presupuestoAproximado: "" }));
  assertEquals(validV2.ok, true);
});

Deno.test("HTTP: malformed JSON, 405 y CORS no autorizado son controlados", async () => {
  const mock = mockSupabase();
  const contact = createContactHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const malformed = await contact(new Request("https://edge.example.test", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://allowed.example" },
    body: "{not-json",
  }));
  assertEquals(malformed.status, 400);
  assertEquals((await malformed.json()).error, "El cuerpo de la solicitud no es JSON válido.");
  const method = await contact(request({}, { method: "GET" }));
  assertEquals(method.status, 405);
  assertEquals((await method.json()).error, "Método no permitido.");
  const cors = await contact(request(contactBody(), { origin: "https://evil.example" }));
  assertEquals(cors.status, 403);
});

Deno.test("contacto legacy: ubicación vacía es compatible, pero consentimiento siempre es obligatorio", () => {
  const legacy = validateContactPayload(contactBody({
    form_version: undefined,
    ubicacion: undefined,
    acepta_politica: true,
  }));
  assertEquals(legacy.ok, true);
  assertEquals(legacy.row?.ubicacion, "");
  assertEquals(legacy.row?.acepta_politica, true);

  const camel = validateContactPayload(contactBody({
    form_version: undefined,
    ubicacion: undefined,
    acepta_politica: undefined,
    aceptaPolitica: true,
  }));
  assertEquals(camel.ok, true);

  const missing = validateContactPayload(contactBody({
    form_version: undefined,
    ubicacion: undefined,
    acepta_politica: undefined,
    aceptaPolitica: undefined,
  }));
  assertEquals(missing.ok, false);
  assert(missing.errors.includes("acepta_politica_required"));

  const rejected = validateContactPayload(contactBody({
    form_version: undefined,
    ubicacion: undefined,
    acepta_politica: false,
    aceptaPolitica: undefined,
  }));
  assertEquals(rejected.ok, false);
  assert(rejected.errors.includes("acepta_politica_required"));
});

Deno.test("contacto: ausencia simultánea de correo e IP falla cerrado sin llamar RPC", async () => {
  const mock = mockSupabase();
  const handler = createContactHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const response = await handler(request(contactBody()));
  assertEquals(response.status, 503);
  assertEquals(mock.state.rpcCalls.length, 0);
  assertEquals(clientIp(request(contactBody())), "");
});

Deno.test("quote legacy: omitir consentimiento es válido, pero false explícito se rechaza", () => {
  const omitted = validateQuotePayload(legacyQuoteBody());
  assertEquals(omitted.ok, true);
  const falseConsent = validateQuotePayload(legacyQuoteBody({ acepta_politica: false }));
  assertEquals(falseConsent.ok, false);
  assert(falseConsent.errors.includes("acepta_politica_required"));
});

Deno.test("quote: rechaza fechas con formato válido pero calendario imposible", async () => {
  const validation = validateQuotePayload(legacyQuoteBody({ fechaEstimada: "2024-02-30" }));
  assertEquals(validation.ok, false);
  assert(validation.errors.includes("fecha_estimada_invalid"));

  const mock = mockSupabase();
  const handler = createQuoteHandler({ getSupabase: () => mock.client, allowedOrigins: "https://allowed.example" });
  const response = await handler(request(legacyQuoteBody({ fechaEstimada: "2023-02-29" }), { ip: "198.51.100.14" }));
  const result = await response.json();
  assertEquals(response.status, 400);
  assertEquals(result.error, "Revisa los datos ingresados.");
  assertStringIncludes(result.details.join(" "), "fecha estimada");
  assertEquals(mock.state.rpcCalls.length, 0);
  assertEquals(mock.state.inserts.length, 0);
});

Deno.test("CORS fallback: solo permite hosts exactos y puertos locales previstos", () => {
  assertEquals(isAllowedOrigin("https://almatecsrl-sitio-web.lovable.app"), true);
  assertEquals(isAllowedOrigin("https://preview--almatecsrl-sitio-web.lovable.app"), true);
  assertEquals(isAllowedOrigin("https://almatec.net"), true);
  assertEquals(isAllowedOrigin("https://www.almatec.net"), true);
  assertEquals(isAllowedOrigin("https://otro.lovable.app"), false);
  assertEquals(isAllowedOrigin("https://almatec.net.evil.example"), false);
  assertEquals(isAllowedOrigin("http://localhost:3000"), true);
  assertEquals(isAllowedOrigin("http://127.0.0.1:5173"), true);
  assertEquals(isAllowedOrigin("http://localhost:8080"), false);
});
