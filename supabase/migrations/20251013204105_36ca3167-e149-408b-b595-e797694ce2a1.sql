-- 1.1 Añadir columnas de trazabilidad faltantes
alter table public.quote_requests
  add column if not exists user_id uuid,
  add column if not exists ip inet,
  add column if not exists user_agent text,
  add column if not exists source text;

-- 1.2 Índices útiles
create index if not exists idx_quote_requests_email on public.quote_requests (lower(email));
create index if not exists idx_quote_requests_created_at on public.quote_requests (created_at);
create index if not exists idx_quote_requests_ip on public.quote_requests (ip);

-- 1.3 Rate-limit simple en BD (por IP y email) vía función
create or replace function public.can_create_quote_request(p_ip inet, p_email text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  max_per_10min constant int := 5;
  cnt_ip int;
  cnt_email int;
begin
  select count(*) into cnt_ip
    from public.quote_requests
   where ip = p_ip
     and created_at >= now() - interval '10 minutes';

  select count(*) into cnt_email
    from public.quote_requests
   where lower(email) = lower(p_email)
     and created_at >= now() - interval '10 minutes';

  if cnt_ip >= max_per_10min or cnt_email >= max_per_10min then
    return false;
  end if;
  return true;
end;
$$;

-- 1.4 Trigger BEFORE INSERT que aplica el rate-limit server-side
create or replace function public.enforce_rate_limit()
returns trigger
language plpgsql
as $$
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
$$;

drop trigger if exists trg_quote_requests_rate_limit on public.quote_requests;
create trigger trg_quote_requests_rate_limit
before insert on public.quote_requests
for each row execute function public.enforce_rate_limit();