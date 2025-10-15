-- Remove overly permissive RLS insert policies that allow direct client access
-- This forces all inserts to go through the edge functions which provide proper validation

-- Remove the dangerous public insert policies
DROP POLICY IF EXISTS "optimized_contact_insert" ON public.contact_inquiries;
DROP POLICY IF EXISTS "optimized_quote_insert" ON public.quote_requests;

-- No replacement policies are created
-- Without an INSERT policy, only the service_role (used by edge functions) can insert
-- This prevents direct client-side database manipulation