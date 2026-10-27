import { createClient } from "@supabase/supabase-js";
import type { ToolContext } from "@lovable.dev/mcp-js";
import process from "node:process";

function publishableKey(): string | undefined {
  const explicitKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (explicitKey) return explicitKey;

  const keysJson = process.env.SUPABASE_PUBLISHABLE_KEYS;
  if (keysJson) {
    try {
      const keys: unknown = JSON.parse(keysJson);
      if (keys && typeof keys === "object" && !Array.isArray(keys)) {
        const entries = keys as Record<string, unknown>;
        const key = entries.default ?? Object.values(entries).find(
          (value) => typeof value === "string" && value.startsWith("sb_publishable_"),
        );
        if (typeof key === "string" && key.startsWith("sb_publishable_")) return key;
      }
    } catch {
      // Fall back only to the legacy PUBLIC anon key, never a service-role key.
    }
  }
  return process.env.SUPABASE_ANON_KEY;
}

/**
 * Cliente que actúa con el token OAuth del usuario y una clave pública.
 * RLS se evalúa con esa identidad; no usa claves privilegiadas del backend.
 */
export function supabaseForUser(ctx: ToolContext) {
  const url = process.env.SUPABASE_URL;
  const key = publishableKey();
  if (!url || !key) throw new Error("Configuración pública de Supabase no disponible");

  return createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
