import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase-client";

export default defineTool({
  name: "list_contact_inquiries",
  title: "Listar consultas de contacto",
  description:
    "Lista las consultas recibidas por el formulario de contacto. Requiere una cuenta con permisos (admin o ventas); RLS filtra el acceso.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("Cantidad máxima de registros."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "No autenticado" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("contact_inquiries")
      .select("id, created_at, nombre, email, telefono, empresa, asunto, mensaje, ubicacion")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { count: data?.length ?? 0, inquiries: data ?? [] },
    };
  },
});
