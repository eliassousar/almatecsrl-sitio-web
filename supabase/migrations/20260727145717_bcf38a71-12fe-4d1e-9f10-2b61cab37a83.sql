REVOKE ALL ON public.rate_limits FROM anon;
REVOKE ALL ON public.rate_limits FROM authenticated;

REVOKE ALL ON FUNCTION public.cleanup_old_audit_data() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.cleanup_old_audit_data() FROM anon;
REVOKE ALL ON FUNCTION public.cleanup_old_audit_data() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_old_audit_data() TO service_role;