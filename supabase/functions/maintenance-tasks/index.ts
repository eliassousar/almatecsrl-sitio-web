import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};
const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" };
type TaskStatus = "pending" | "running" | "completed" | "failed";
interface MaintenanceTask { name: string; description: string; status: TaskStatus; duration?: number; error?: string; lastRun?: string; }

function safeError() { return "maintenance task failed"; }
function response(body: unknown, status = 200) { return new Response(JSON.stringify(body), { status, headers: jsonHeaders }); }
function completed(name: string, description: string, start: number): MaintenanceTask {
  return { name, description, status: "completed", duration: Date.now() - start, lastRun: new Date().toISOString() };
}
function failed(name: string, description: string, start: number): MaintenanceTask {
  return { name, description, status: "failed", error: safeError(), duration: Date.now() - start, lastRun: new Date().toISOString() };
}

async function cleanupOldData(supabase: any): Promise<MaintenanceTask> {
  const start = Date.now();
  try {
    const { error } = await supabase.rpc("cleanup_old_audit_data");
    if (error) throw error;
    return completed("cleanup_old_data", "Eliminar solo rate_limits con más de 7 días; conservar leads", start);
  } catch (_error) { return failed("cleanup_old_data", "Limpieza no destructiva", start); }
}

async function updateCachedStats(supabase: any): Promise<MaintenanceTask> {
  const start = Date.now();
  try {
    const [contacts, quotes, recentContacts, recentQuotes] = await Promise.all([
      supabase.from("contact_inquiries").select("id", { count: "exact", head: true }),
      supabase.from("quote_requests").select("id", { count: "exact", head: true }),
      supabase.from("contact_inquiries").select("id", { count: "exact", head: true }).gte("created_at", new Date(Date.now() - 30 * 86400000).toISOString()),
      supabase.from("quote_requests").select("id", { count: "exact", head: true }).gte("created_at", new Date(Date.now() - 30 * 86400000).toISOString()),
    ]);
    if (contacts.error || quotes.error || recentContacts.error || recentQuotes.error) throw new Error("stats query failed");
    const { error } = await supabase.from("cached_stats").upsert([
      { metric_name: "total_contacts", metric_value: contacts.count ?? 0, updated_at: new Date().toISOString() },
      { metric_name: "total_quotes", metric_value: quotes.count ?? 0, updated_at: new Date().toISOString() },
      { metric_name: "contacts_30d", metric_value: recentContacts.count ?? 0, updated_at: new Date().toISOString() },
      { metric_name: "quotes_30d", metric_value: recentQuotes.count ?? 0, updated_at: new Date().toISOString() },
    ]);
    if (error) throw error;
    return completed("update_cached_stats", "Actualizar agregados permitidos", start);
  } catch (_error) { return failed("update_cached_stats", "Actualizar estadísticas agregadas", start); }
}

async function cleanupValidationCache(): Promise<MaintenanceTask> {
  const start = Date.now();
  return completed("cleanup_validation_cache", "No hay caché compartida que limpiar en esta ejecución", start);
}

async function generateHealthReport(): Promise<MaintenanceTask> {
  const start = Date.now();
  // Avoid querying exposed system views or persisting operational details in cached_stats.
  return completed("generate_health_report", "Comprobación básica de disponibilidad del worker", start);
}

async function runMaintenance(supabase: any): Promise<MaintenanceTask[]> {
  const tasks: MaintenanceTask[] = [];
  const parallel = await Promise.all([cleanupValidationCache(), updateCachedStats(supabase), generateHealthReport()]);
  tasks.push(...parallel, await cleanupOldData(supabase));
  return tasks;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return response({ error: "Method not allowed" }, 405);
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return response({ error: "Authentication required" }, 401);
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    const token = authHeader.slice("Bearer ".length).trim();
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return response({ error: "Invalid authentication token" }, 401);
    const { data: roles, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .limit(3);
    if (roleError) return response({ error: "Error verifying permissions" }, 500);
    if (!(roles ?? []).some((row: any) => row.role === "admin")) {
      return response({ error: "Insufficient permissions" }, 403);
    }
    const tasks = await runMaintenance(supabase);
    const successfulTasks = tasks.filter((task) => task.status === "completed").length;
    return response({
      success: true,
      report: {
        timestamp: new Date().toISOString(),
        tasks,
        summary: { totalTasks: tasks.length, successfulTasks, failedTasks: tasks.length - successfulTasks },
      },
    });
  } catch (_error) {
    return response({ error: "Internal server error" }, 500);
  }
});
