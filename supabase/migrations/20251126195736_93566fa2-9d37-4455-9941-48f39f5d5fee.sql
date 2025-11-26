-- Fix enforce_rate_limit function to include search_path setting
-- This addresses SUPA_function_search_path_mutable security warning

CREATE OR REPLACE FUNCTION public.enforce_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
begin
  if not public.can_create_quote_request(NEW.ip, NEW.email) then
    raise exception 'Rate limit exceeded. Try again later.' using errcode = 'P0001';
  end if;

  -- sanitización básica en BD (defensa en profundidad)
  NEW.email := lower(trim(NEW.email));
  NEW.telefono := nullif(trim(NEW.telefono), '');
  NEW.empresa := left(coalesce(NEW.empresa,''), 120);
  NEW.comentarios_adicionales := left(coalesce(NEW.comentarios_adicionales,''), 4000);
  return NEW;
end;
$function$;