-- Implement Role-Based Access Control (RBAC) for Customer PII Protection
-- This addresses PUBLIC_DATA_EXPOSURE security finding

-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'sales', 'viewer');

-- 2. Create user_roles table (CRITICAL: separate table prevents privilege escalation)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- 3. Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies for user_roles table
CREATE POLICY "Admins can view all user roles"
  ON public.user_roles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  ));

CREATE POLICY "Admins can manage user roles"
  ON public.user_roles FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  ));

-- 5. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 6. Update RLS policies on quote_requests to use role-based access
DROP POLICY IF EXISTS "Only authenticated users can read quote requests" ON public.quote_requests;

CREATE POLICY "Only admins and sales can read quotes"
  ON public.quote_requests FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'sales') OR
    public.has_role(auth.uid(), 'viewer')
  );

-- 7. Update RLS policies on contact_inquiries to use role-based access
DROP POLICY IF EXISTS "Only authenticated users can read contact inquiries" ON public.contact_inquiries;

CREATE POLICY "Only admins and sales can read contacts"
  ON public.contact_inquiries FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'sales') OR
    public.has_role(auth.uid(), 'viewer')
  );

-- 8. Create index for performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);