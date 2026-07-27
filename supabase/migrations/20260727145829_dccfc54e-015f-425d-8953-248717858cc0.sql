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
  -- Cuenta por identificador y toma el mayor (no suma IP + email)
  SELECT
    coalesce(max(hour_count), 0),
    coalesce(max(day_count), 0)
  INTO v_hour_count, v_day_count
  FROM (
    SELECT
      count(*) FILTER (WHERE created_at >= now() - interval '1 hour') AS hour_count,
      count(*) FILTER (WHERE created_at >= now() - interval '1 day') AS day_count
    FROM public.rate_limits
    WHERE action = _action
      AND created_at >= now() - interval '1 day'
      AND (
        (v_ip IS NOT NULL AND identifier_type = 'ip' AND identifier = v_ip)
        OR (v_email IS NOT NULL AND identifier_type = 'email' AND identifier = v_email)
      )
    GROUP BY identifier_type, identifier
  ) counts;

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

REVOKE ALL ON FUNCTION public.check_rate_limit(text, text, text, integer, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, text, text, integer, integer) FROM anon;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, text, text, integer, integer) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, text, text, integer, integer) TO service_role;

DELETE FROM public.rate_limits;