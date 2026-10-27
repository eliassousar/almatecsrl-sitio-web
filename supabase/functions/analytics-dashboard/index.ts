import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Max-Age": "86400",
};
const privateHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  Vary: "Authorization",
};
const aggregateMetricNames = ["total_contacts", "total_quotes", "contacts_30d", "quotes_30d"];
type Role = "admin" | "sales" | "viewer";
type QueryType = "contacts" | "quotes" | "stats" | "performance";

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: privateHeaders });
}

function dateFilter(timeRange: string | null) {
  const duration = timeRange === "24h" ? 24 : timeRange === "7d" ? 7 : timeRange === "90d" ? 90 : 30;
  return new Date(Date.now() - duration * 24 * 60 * 60 * 1000).toISOString();
}

async function getCachedAggregates(supabase: any) {
  const { data, error } = await supabase
    .from("cached_stats")
    .select("metric_name, metric_value")
    .in("metric_name", aggregateMetricNames)
    .limit(10);
  if (error) throw error;
  const values = Object.fromEntries((data ?? []).map((row: any) => [row.metric_name, Number(row.metric_value) || 0]));
  return {
    totalContacts: values.total_contacts ?? 0,
    totalQuotes: values.total_quotes ?? 0,
    contacts30d: values.contacts_30d ?? 0,
    quotes30d: values.quotes_30d ?? 0,
  };
}

async function getPerformanceMetrics(supabase: any) {
  const aggregate = await getCachedAggregates(supabase);
  return {
    ...aggregate,
    // These values are not persisted by the current schema; do not masquerade as measurements.
    avgResponseTime: null,
    errorRate: null,
  };
}

async function getContactsData(supabase: any, timeRange: string | null, filters: Record<string, string>) {
  let query = supabase
    .from("contact_inquiries")
    .select("asunto, empresa, created_at, ubicacion")
    .gte("created_at", dateFilter(timeRange))
    .order("created_at", { ascending: false })
    .limit(500);
  if (filters.asunto) query = query.eq("asunto", filters.asunto);
  if (filters.empresa) query = query.ilike("empresa", `%${filters.empresa}%`);
  const { data, error } = await query;
  if (error) throw error;
  const rows = data ?? [];
  const countBy = (key: string) => rows.reduce((acc: Record<string, number>, row: any) => {
    const value = row[key] || "No especificado";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  const timeline = rows.reduce((acc: Record<string, number>, row: any) => {
    const day = new Date(row.created_at).toISOString().slice(0, 10);
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  return { total: rows.length, bySubject: countBy("asunto"), byCompany: countBy("empresa"), timeline };
}

async function getQuotesData(supabase: any, timeRange: string | null, filters: Record<string, string>) {
  let query = supabase
    .from("quote_requests")
    .select("tipo_producto, empresa, created_at, ubicacion_proyecto, presupuesto_aproximado")
    .gte("created_at", dateFilter(timeRange))
    .order("created_at", { ascending: false })
    .limit(500);
  if (filters.tipo_producto) query = query.eq("tipo_producto", filters.tipo_producto);
  if (filters.empresa) query = query.ilike("empresa", `%${filters.empresa}%`);
  const { data, error } = await query;
  if (error) throw error;
  const rows = data ?? [];
  const countBy = (key: string) => rows.reduce((acc: Record<string, number>, row: any) => {
    const value = row[key] || "No especificado";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  const timeline = rows.reduce((acc: Record<string, number>, row: any) => {
    const day = new Date(row.created_at).toISOString().slice(0, 10);
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  return {
    total: rows.length,
    byProduct: countBy("tipo_producto"),
    byBudget: countBy("presupuesto_aproximado"),
    byLocation: countBy("ubicacion_proyecto"),
    timeline,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "GET") return response({ error: "Method not allowed" }, 405);
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

    // Service-role client verifies roles server-side; no user-controlled role claims are trusted.
    const { data: roleRows, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .limit(3);
    if (roleError) return response({ error: "Error verifying permissions" }, 500);
    const roles = (roleRows ?? []).map((row: any) => row.role as Role);
    const role = roles.find((candidate) => ["admin", "sales", "viewer"].includes(candidate));
    if (!role) return response({ error: "Insufficient permissions" }, 403);

    const url = new URL(req.url);
    const type = (url.searchParams.get("type") ?? "stats") as QueryType;
    if (!["contacts", "quotes", "stats", "performance"].includes(type)) {
      return response({ error: "Invalid query type" }, 400);
    }
    const timeRange = url.searchParams.get("timeRange");
    let filters: Record<string, string> = {};
    const rawFilters = url.searchParams.get("filters");
    if (rawFilters) {
      const parsed = JSON.parse(rawFilters);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        filters = Object.fromEntries(Object.entries(parsed).filter(([, value]) => typeof value === "string")) as Record<string, string>;
      }
    }

    // Viewers receive only cached aggregate counters; they never query lead tables.
    const data = role === "viewer"
      ? await getPerformanceMetrics(supabase)
      : type === "contacts"
        ? await getContactsData(supabase, timeRange, filters)
        : type === "quotes"
          ? await getQuotesData(supabase, timeRange, filters)
          : await getPerformanceMetrics(supabase);
    return response({ success: true, data, role, timestamp: new Date().toISOString() });
  } catch (_error) {
    // Do not place tokens, lead data or provider errors in logs/responses.
    return response({ error: "Internal server error" }, 500);
  }
});
