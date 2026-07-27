import { createClient } from "@supabase/supabase-js";
import type { ToolContext } from "@lovable.dev/mcp-js";

/**
 * Cliente Supabase que actúa en nombre del usuario autenticado del token OAuth.
 * RLS se evalúa con la identidad de ese usuario.
 */
export function supabaseForUser(ctx: ToolContext) {
  return createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_PUBLISHABLE_KEY as string,
    {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}
