import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url).pathname;
const read = (relative) => readFileSync(`${root}${relative}`, "utf8");
const migration = read("supabase/migrations/20261027170000_almatec_leads_security.sql");
const analytics = read("supabase/functions/analytics-dashboard/index.ts");
const maintenance = read("supabase/functions/maintenance-tasks/index.ts");
const mcpQuotes = read("src/lib/mcp/tools/list-quote-requests.ts");
const generatedMcp = read("supabase/functions/mcp/index.ts");
const login = read("src/pages/Login.tsx");

assert.match(migration, /CREATE OR REPLACE FUNCTION private\.has_role/);
assert.match(migration, /SECURITY DEFINER SET search_path = ''/);
assert.match(migration, /REVOKE ALL ON FUNCTION public\.has_role\(uuid, public\.app_role\) FROM PUBLIC, anon, authenticated/);
assert.match(migration, /GRANT EXECUTE ON FUNCTION public\.has_role\(uuid, public\.app_role\) TO service_role/);
assert.match(migration, /CREATE POLICY "user_roles_self_select"/);
assert.doesNotMatch(migration, /DELETE FROM public\.contact_inquiries|DELETE FROM public\.quote_requests/);
assert.match(migration, /DELETE FROM public\.rate_limits/);
assert.match(migration, /PRIMARY KEY \(source_table, source_id\)/);
assert.match(migration, /lead_notifications_contact_after_insert/);
assert.match(migration, /lead_notifications_quote_after_insert/);
assert.match(migration, /pg_advisory_xact_lock/);
assert.match(migration, /missing_identifier/);

for (const source of [analytics, maintenance, mcpQuotes, generatedMcp]) {
  assert.doesNotMatch(source, /select\(\s*["']\*["']\s*\)/i);
  assert.doesNotMatch(source, /\.select\(\s*["']\*["']\s*\)/i);
}
assert.match(analytics, /"Cache-Control": "no-store"/);
assert.doesNotMatch(analytics, /Cache-Control.*public|max-age=900|avgResponseTime: 250|errorRate: 0\.05/);
assert.doesNotMatch(maintenance, /select\(\s*["']\*["']\s*\)/i);
assert.match(mcpQuotes, /select\("id, created_at, nombre, email, telefono, empresa/);
assert.doesNotMatch(login, /signUp/);

console.log("PASS static security mock checks");
