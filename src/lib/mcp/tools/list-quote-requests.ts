import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase-client";

export default defineTool({
  name: "list_quote_requests",
  title: "Listar solicitudes de cotización",
  description:
    "Lista campos comerciales explícitos de cotizaciones para cuentas admin o sales; RLS bloquea a viewer y a cualquier otra cuenta.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("Cantidad máxima de registros."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "No autenticado" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("quote_requests")
      .select("id, created_at, nombre, email, telefono, empresa, tipo_producto, ubicacion_proyecto, fecha_estimada, capacidad_requerida, tipo_cultivo, condiciones_ambientales, energia_disponible, presupuesto_aproximado, comentarios_adicionales")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { count: data?.length ?? 0, quotes: data ?? [] },
    };
  },
});
