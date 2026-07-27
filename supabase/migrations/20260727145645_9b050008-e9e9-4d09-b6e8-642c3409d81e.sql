-- Tabla de control de rate limiting (uso interno del backend)
CREATE TABLE public.rate_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL,
  identifier_type text NOT NULL CHECK (identifier_type IN ('ip','email')),
  action text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Solo el backend (edge functions con service_role) accede a esta tabla
GRANT ALL ON public.rate_limits TO service_role;

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read rate limits"
ON public.rate_limits FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_rate_limits_lookup
  ON public.rate_limits (action, identifier_type, identifier, created_at DESC);

-- Verifica y registra un intento. Devuelve true si se permite, false si excede el limite.
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  _action text,
  _ip text,
  _email text,
  _max_per_hour integer DEFAULT 3,
  _max_per_day integer DEFAULT 10
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ip text := nullif(trim(coalesce(_ip, '')), '');
  v_email text := lower(nullif(trim(coalesce(_email, '')), ''));
  v_hour_count integer := 0;
  v_day_count integer := 0;
  v_retry_after integer := 3600;
BEGIN
  SELECT
    count(*) FILTER (WHERE created_at >= now() - interval '1 hour'),
    count(*) FILTER (WHERE created_at >= now() - interval '1 day')
  INTO v_hour_count, v_day_count
  FROM public.rate_limits
  WHERE action = _action
    AND created_at >= now() - interval '1 day'
    AND (
      (v_ip IS NOT NULL AND identifier_type = 'ip' AND identifier = v_ip)
      OR (v_email IS NOT NULL AND identifier_type = 'email' AND identifier = v_email)
    );

  IF v_hour_count >= _max_per_hour OR v_day_count >= _max_per_day THEN
    IF v_day_count >= _max_per_day THEN
      v_retry_after := 86400;
    END IF;
    RETURN jsonb_build_object(
      'allowed', false,
      'retry_after', v_retry_after,
      'hour_count', v_hour_count,
      'day_count', v_day_count
    );
  END IF;

  IF v_ip IS NOT NULL THEN
    INSERT INTO public.rate_limits (identifier, identifier_type, action)
    VALUES (v_ip, 'ip', _action);
  END IF;

  IF v_email IS NOT NULL THEN
    INSERT INTO public.rate_limits (identifier, identifier_type, action)
    VALUES (v_email, 'email', _action);
  END IF;

  RETURN jsonb_build_object(
    'allowed', true,
    'hour_count', v_hour_count,
    'day_count', v_day_count
  );
END;
$$;

-- Solo el backend puede ejecutarla
REVOKE ALL ON FUNCTION public.check_rate_limit(text, text, text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, text, text, integer, integer) TO service_role;

-- Limpieza de registros antiguos junto al mantenimiento existente
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.contact_inquiries
  WHERE created_at < NOW() - INTERVAL '6 months';

  DELETE FROM public.quote_requests
  WHERE created_at < NOW() - INTERVAL '6 months';

  DELETE FROM public.rate_limits
  WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$;