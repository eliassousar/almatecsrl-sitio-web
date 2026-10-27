-- ALMATEC security hardening: RBAC, least privilege, atomic rate limiting and durable lead outbox.
-- This migration is intentionally non-destructive: it does not delete leads, roles, users or history.
-- Apply only after local/Postgres review. No live deployment is performed by this change.

BEGIN;

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = _user_id AND ur.role = _role
  );
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$ SELECT private.has_role(_user_id, _role); $$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_self_select" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_admin_insert" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_admin_update" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_admin_delete" ON public.user_roles;
CREATE POLICY "user_roles_self_select" ON public.user_roles FOR SELECT USING (
  auth.uid() = user_id OR private.has_role(auth.uid(), 'admin'::public.app_role)
);
CREATE POLICY "user_roles_admin_insert" ON public.user_roles FOR INSERT
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "user_roles_admin_update" ON public.user_roles FOR UPDATE
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "user_roles_admin_delete" ON public.user_roles FOR DELETE
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "optimized_contact_insert" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Only authenticated users can read contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Only admins and sales can read contacts" ON public.contact_inquiries;
DROP POLICY IF EXISTS "contact_inquiries_admin_sales_select" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Admins can update contacts" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Admins can delete contacts" ON public.contact_inquiries;
DROP POLICY IF EXISTS "contact_inquiries_admin_update" ON public.contact_inquiries;
DROP POLICY IF EXISTS "contact_inquiries_admin_delete" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Anyone can insert quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "optimized_quote_insert" ON public.quote_requests;
DROP POLICY IF EXISTS "Only authenticated users can read quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Only admins and sales can read quotes" ON public.quote_requests;
DROP POLICY IF EXISTS "quote_requests_admin_sales_select" ON public.quote_requests;
DROP POLICY IF EXISTS "Admins can update quotes" ON public.quote_requests;
DROP POLICY IF EXISTS "Admins can delete quotes" ON public.quote_requests;
DROP POLICY IF EXISTS "quote_requests_admin_update" ON public.quote_requests;
DROP POLICY IF EXISTS "quote_requests_admin_delete" ON public.quote_requests;
CREATE POLICY "contact_inquiries_admin_sales_select" ON public.contact_inquiries FOR SELECT USING (
  private.has_role(auth.uid(), 'admin'::public.app_role)
  OR private.has_role(auth.uid(), 'sales'::public.app_role)
);
CREATE POLICY "contact_inquiries_admin_update" ON public.contact_inquiries FOR UPDATE
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "contact_inquiries_admin_delete" ON public.contact_inquiries FOR DELETE
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "quote_requests_admin_sales_select" ON public.quote_requests FOR SELECT USING (
  private.has_role(auth.uid(), 'admin'::public.app_role)
  OR private.has_role(auth.uid(), 'sales'::public.app_role)
);
CREATE POLICY "quote_requests_admin_update" ON public.quote_requests FOR UPDATE
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "quote_requests_admin_delete" ON public.quote_requests FOR DELETE
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

REVOKE ALL ON public.contact_inquiries, public.quote_requests FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.contact_inquiries, public.quote_requests TO authenticated;
GRANT UPDATE ON public.contact_inquiries, public.quote_requests TO authenticated;
GRANT DELETE ON public.contact_inquiries, public.quote_requests TO authenticated;
REVOKE TRUNCATE, TRIGGER, REFERENCES ON public.contact_inquiries, public.quote_requests FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.contact_inquiries, public.quote_requests TO service_role;

REVOKE ALL ON public.user_roles FROM PUBLIC, anon, authenticated;
GRANT SELECT (id, user_id, role, created_at), INSERT (user_id, role), UPDATE (role), DELETE
  ON public.user_roles TO authenticated;
REVOKE TRUNCATE, TRIGGER, REFERENCES ON public.user_roles FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.cached_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authenticated users to read cached stats" ON public.cached_stats;
DROP POLICY IF EXISTS "cached_stats_authorized_aggregate_select" ON public.cached_stats;
CREATE POLICY "cached_stats_authorized_aggregate_select" ON public.cached_stats FOR SELECT USING (
  metric_name IN ('total_contacts', 'total_quotes', 'contacts_30d', 'quotes_30d')
  AND (
    private.has_role(auth.uid(), 'admin'::public.app_role)
    OR private.has_role(auth.uid(), 'sales'::public.app_role)
    OR private.has_role(auth.uid(), 'viewer'::public.app_role)
  )
);
REVOKE ALL ON public.cached_stats FROM PUBLIC, anon, authenticated;
GRANT SELECT (metric_name, metric_value, updated_at) ON public.cached_stats TO authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, TRIGGER, REFERENCES ON public.cached_stats FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.cached_stats TO service_role;

DROP POLICY IF EXISTS "Admins can read rate limits" ON public.rate_limits;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.rate_limits FROM PUBLIC, anon, authenticated;
REVOKE TRUNCATE, TRIGGER, REFERENCES ON public.rate_limits FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.rate_limits TO service_role;

CREATE OR REPLACE FUNCTION public.check_rate_limit(
  _action text, _ip text, _email text,
  _max_per_hour integer DEFAULT 3, _max_per_day integer DEFAULT 10
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_action text := nullif(pg_catalog.btrim(coalesce(_action, '')), '');
  v_ip text := nullif(pg_catalog.btrim(coalesce(_ip, '')), '');
  v_email text := pg_catalog.lower(nullif(pg_catalog.btrim(coalesce(_email, '')), ''));
  v_max_hour integer := 3;
  v_max_day integer := 10;
  v_ip_key bigint;
  v_email_key bigint;
  v_hour_count integer := 0;
  v_day_count integer := 0;
  v_retry_after integer := 0;
BEGIN
  IF v_action IS NULL OR (v_ip IS NULL AND v_email IS NULL) THEN
    RETURN jsonb_build_object('allowed', false, 'retry_after', 0,
      'hour_count', 0, 'day_count', 0, 'reason', 'missing_identifier');
  END IF;
  IF _max_per_hour BETWEEN 1 AND 1000
     AND _max_per_day BETWEEN 1 AND 10000
     AND _max_per_day >= _max_per_hour THEN
    v_max_hour := _max_per_hour;
    v_max_day := _max_per_day;
  END IF;
  IF v_ip IS NOT NULL THEN
    v_ip_key := pg_catalog.hashtextextended(v_action || ':ip:' || v_ip, 0);
  END IF;
  IF v_email IS NOT NULL THEN
    v_email_key := pg_catalog.hashtextextended(v_action || ':email:' || v_email, 0);
  END IF;
  IF v_ip IS NOT NULL AND v_email IS NOT NULL THEN
    IF v_ip_key < v_email_key THEN
      PERFORM pg_catalog.pg_advisory_xact_lock(v_ip_key);
      PERFORM pg_catalog.pg_advisory_xact_lock(v_email_key);
    ELSE
      PERFORM pg_catalog.pg_advisory_xact_lock(v_email_key);
      PERFORM pg_catalog.pg_advisory_xact_lock(v_ip_key);
    END IF;
  ELSIF v_ip IS NOT NULL THEN
    PERFORM pg_catalog.pg_advisory_xact_lock(v_ip_key);
  ELSE
    PERFORM pg_catalog.pg_advisory_xact_lock(v_email_key);
  END IF;
  WITH counts AS (
    SELECT rl.identifier_type, rl.identifier,
      count(*) FILTER (WHERE rl.created_at >= now() - interval '1 hour')::integer AS hour_count,
      count(*) FILTER (WHERE rl.created_at >= now() - interval '1 day')::integer AS day_count,
      min(rl.created_at) FILTER (WHERE rl.created_at >= now() - interval '1 hour') AS first_hour_at,
      min(rl.created_at) FILTER (WHERE rl.created_at >= now() - interval '1 day') AS first_day_at
    FROM public.rate_limits AS rl
    WHERE rl.action = v_action AND rl.created_at >= now() - interval '1 day'
      AND ((v_ip IS NOT NULL AND rl.identifier_type = 'ip' AND rl.identifier = v_ip)
        OR (v_email IS NOT NULL AND rl.identifier_type = 'email' AND rl.identifier = v_email))
    GROUP BY rl.identifier_type, rl.identifier
  )
  SELECT coalesce(max(c.hour_count), 0), coalesce(max(c.day_count), 0),
    coalesce(max(CASE WHEN c.day_count >= v_max_day AND c.first_day_at IS NOT NULL
      THEN greatest(1, ceil(extract(epoch FROM (c.first_day_at + interval '1 day' - now())))::integer)
      WHEN c.hour_count >= v_max_hour AND c.first_hour_at IS NOT NULL
      THEN greatest(1, ceil(extract(epoch FROM (c.first_hour_at + interval '1 hour' - now())))::integer)
      ELSE 0 END), 0)
  INTO v_hour_count, v_day_count, v_retry_after FROM counts AS c;
  IF v_hour_count >= v_max_hour OR v_day_count >= v_max_day THEN
    RETURN jsonb_build_object('allowed', false, 'retry_after', greatest(1, v_retry_after),
      'hour_count', v_hour_count, 'day_count', v_day_count);
  END IF;
  IF v_ip IS NOT NULL THEN
    INSERT INTO public.rate_limits (identifier, identifier_type, action)
      VALUES (v_ip, 'ip', v_action);
  END IF;
  IF v_email IS NOT NULL THEN
    INSERT INTO public.rate_limits (identifier, identifier_type, action)
      VALUES (v_email, 'email', v_action);
  END IF;
  RETURN jsonb_build_object('allowed', true, 'retry_after', 0,
    'hour_count', v_hour_count + 1, 'day_count', v_day_count + 1);
END;
$$;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, text, text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, text, text, integer, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.cleanup_old_audit_data()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.rate_limits WHERE created_at < now() - interval '7 days';
END;
$$;
REVOKE ALL ON FUNCTION public.cleanup_old_audit_data() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_old_audit_data() TO service_role;

REVOKE ALL ON FUNCTION public.get_contact_stats(date, date) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_contact_stats(date, date) TO service_role;
REVOKE ALL ON FUNCTION public.can_create_quote_request(inet, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_create_quote_request(inet, text) TO service_role;
REVOKE ALL ON FUNCTION public.enforce_rate_limit() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enforce_rate_limit() TO service_role;
REVOKE ALL ON FUNCTION public.update_cached_stats() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_cached_stats() TO service_role;
REVOKE ALL ON FUNCTION public.update_cached_quote_stats() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_cached_quote_stats() TO service_role;

CREATE TABLE IF NOT EXISTS public.lead_notifications (
  source_table text NOT NULL CHECK (source_table IN ('contact_inquiries', 'quote_requests')),
  source_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz,
  PRIMARY KEY (source_table, source_id)
);
ALTER TABLE public.lead_notifications ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.lead_notifications FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.lead_notifications TO service_role;
REVOKE TRUNCATE, TRIGGER, REFERENCES ON public.lead_notifications FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION private.enqueue_lead_notification()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.lead_notifications (source_table, source_id)
    VALUES (TG_TABLE_NAME, NEW.id)
    ON CONFLICT (source_table, source_id) DO NOTHING;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION private.enqueue_lead_notification() FROM PUBLIC, anon, authenticated, service_role;
DROP TRIGGER IF EXISTS lead_notifications_contact_after_insert ON public.contact_inquiries;
CREATE TRIGGER lead_notifications_contact_after_insert AFTER INSERT ON public.contact_inquiries
  FOR EACH ROW EXECUTE FUNCTION private.enqueue_lead_notification();
DROP TRIGGER IF EXISTS lead_notifications_quote_after_insert ON public.quote_requests;
CREATE TRIGGER lead_notifications_quote_after_insert AFTER INSERT ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION private.enqueue_lead_notification();
COMMENT ON TABLE public.lead_notifications IS
  'PII-free durable notification outbox; source ids only, service_role processor pending confirmation.';
COMMENT ON COLUMN public.lead_notifications.last_error IS
  'Non-sensitive operational error text; processors must not write lead contents or credentials.';

COMMIT;

-- No claim/lease RPC yet: no sender/processor is deployed. Add one only with
-- confirmed SMTP/API worker and tests for SKIP LOCKED plus lease expiry.
