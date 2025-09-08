-- Enable RLS on the cached_stats table which is currently missing RLS protection
ALTER TABLE public.cached_stats ENABLE ROW LEVEL SECURITY;

-- Create a restrictive policy for cached_stats - only allow read access to authenticated users
-- This table contains metrics and should only be readable by authorized users
CREATE POLICY "Allow authenticated users to read cached stats" 
  ON public.cached_stats 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Fix function search_path security issues for existing functions
-- Update cleanup_old_audit_data function to include SET search_path
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Limpiar contact_inquiries más antiguos de 6 meses (solo para auditoría)
  DELETE FROM public.contact_inquiries 
  WHERE created_at < NOW() - INTERVAL '6 months';
  
  -- Limpiar quote_requests más antiguos de 6 meses (solo para auditoría)
  DELETE FROM public.quote_requests 
  WHERE created_at < NOW() - INTERVAL '6 months';
END;
$function$;

-- Update update_cached_stats function to include SET search_path
CREATE OR REPLACE FUNCTION public.update_cached_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Actualizar contador de contactos
  INSERT INTO public.cached_stats (metric_name, metric_value)
  VALUES ('total_contacts', 1)
  ON CONFLICT (metric_name) 
  DO UPDATE SET 
    metric_value = cached_stats.metric_value + 1,
    updated_at = NOW();
  
  RETURN NEW;
END;
$function$;

-- Update update_cached_quote_stats function to include SET search_path
CREATE OR REPLACE FUNCTION public.update_cached_quote_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Actualizar contador de cotizaciones
  INSERT INTO public.cached_stats (metric_name, metric_value)
  VALUES ('total_quotes', 1)
  ON CONFLICT (metric_name) 
  DO UPDATE SET 
    metric_value = cached_stats.metric_value + 1,
    updated_at = NOW();
  
  RETURN NEW;
END;
$function$;

-- Update get_contact_stats function to include SET search_path  
CREATE OR REPLACE FUNCTION public.get_contact_stats(start_date date DEFAULT (CURRENT_DATE - '30 days'::interval), end_date date DEFAULT CURRENT_DATE)
RETURNS TABLE(total_contacts bigint, total_quotes bigint, avg_per_day numeric, top_subjects text[], top_companies text[])
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  WITH contact_stats AS (
    SELECT 
      COUNT(*) as total_contacts,
      COUNT(DISTINCT empresa) as unique_companies,
      ARRAY_AGG(DISTINCT asunto ORDER BY asunto) as subjects
    FROM public.contact_inquiries 
    WHERE created_at::DATE BETWEEN start_date AND end_date
  ),
  quote_stats AS (
    SELECT 
      COUNT(*) as total_quotes,
      ARRAY_AGG(DISTINCT empresa ORDER BY empresa) as companies
    FROM public.quote_requests 
    WHERE created_at::DATE BETWEEN start_date AND end_date
  )
  SELECT 
    cs.total_contacts,
    qs.total_quotes,
    ROUND(cs.total_contacts::NUMERIC / GREATEST(end_date - start_date, 1), 2) as avg_per_day,
    cs.subjects[1:5] as top_subjects,
    qs.companies[1:10] as top_companies
  FROM contact_stats cs
  CROSS JOIN quote_stats qs;
END;
$function$;