-- Tables: remove anon visibility (no anon policy grants any row anyway)
REVOKE ALL ON public.cached_stats FROM anon;
REVOKE ALL ON public.contact_inquiries FROM anon;
REVOKE ALL ON public.quote_requests FROM anon;
REVOKE ALL ON public.user_roles FROM anon;

-- Ensure service_role retains full access for edge functions
GRANT ALL ON public.cached_stats TO service_role;
GRANT ALL ON public.contact_inquiries TO service_role;
GRANT ALL ON public.quote_requests TO service_role;
GRANT ALL ON public.user_roles TO service_role;

-- SECURITY DEFINER functions: revoke execute from public API roles
REVOKE ALL ON FUNCTION public.cleanup_old_audit_data() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_contact_stats(date, date) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.can_create_quote_request(inet, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_rate_limit() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_cached_stats() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_cached_quote_stats() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.cleanup_old_audit_data() TO service_role;
GRANT EXECUTE ON FUNCTION public.get_contact_stats(date, date) TO service_role;
GRANT EXECUTE ON FUNCTION public.can_create_quote_request(inet, text) TO service_role;

-- has_role must stay executable: RLS policies evaluate it as the calling role
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;