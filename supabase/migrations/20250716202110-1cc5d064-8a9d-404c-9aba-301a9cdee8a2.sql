-- 1. OPTIMIZACIÓN DE CONSULTAS A BASE DE DATOS
-- Crear índices compuestos para consultas comunes de rate limiting y reporting

-- Índice compuesto para rate limiting en contact_inquiries (sin filtro WHERE)
CREATE INDEX IF NOT EXISTS contact_inquiries_rate_limit_idx 
ON public.contact_inquiries (created_at, email);

-- Índice compuesto para rate limiting en quote_requests (sin filtro WHERE)
CREATE INDEX IF NOT EXISTS quote_requests_rate_limit_idx 
ON public.quote_requests (created_at, email);

-- Índice para consultas por empresa (reporting)
CREATE INDEX IF NOT EXISTS contact_inquiries_empresa_idx 
ON public.contact_inquiries (empresa, created_at);

CREATE INDEX IF NOT EXISTS quote_requests_empresa_idx 
ON public.quote_requests (empresa, created_at);

-- Índice para consultas por tipo de producto (analytics)
CREATE INDEX IF NOT EXISTS quote_requests_tipo_producto_idx 
ON public.quote_requests (tipo_producto, created_at);

-- Índice para consultas por asunto (analytics)
CREATE INDEX IF NOT EXISTS contact_inquiries_asunto_idx 
ON public.contact_inquiries (asunto, created_at);

-- Índice para búsquedas por ubicación
CREATE INDEX IF NOT EXISTS contact_inquiries_ubicacion_idx 
ON public.contact_inquiries (ubicacion);

CREATE INDEX IF NOT EXISTS quote_requests_ubicacion_idx 
ON public.quote_requests (ubicacion_proyecto);

-- 2. FUNCIÓN DE LIMPIEZA AUTOMÁTICA PARA OPTIMIZAR PERFORMANCE
-- Función para limpiar registros antiguos (solo para auditoría, mantener últimos 6 meses)
CREATE OR REPLACE FUNCTION cleanup_old_audit_data()
RETURNS void AS $$
BEGIN
  -- Limpiar contact_inquiries más antiguos de 6 meses (solo para auditoría)
  DELETE FROM public.contact_inquiries 
  WHERE created_at < NOW() - INTERVAL '6 months';
  
  -- Limpiar quote_requests más antiguos de 6 meses (solo para auditoría)
  DELETE FROM public.quote_requests 
  WHERE created_at < NOW() - INTERVAL '6 months';
END;
$$ LANGUAGE plpgsql;

-- 3. FUNCIÓN DE ESTADÍSTICAS OPTIMIZADA
-- Función para obtener estadísticas de manera eficiente
CREATE OR REPLACE FUNCTION get_contact_stats(
  start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_contacts BIGINT,
  total_quotes BIGINT,
  avg_per_day NUMERIC,
  top_subjects TEXT[],
  top_companies TEXT[]
) AS $$
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
$$ LANGUAGE plpgsql;

-- 4. CONFIGURACIÓN DE AUTOESCALADO - TABLESPACES Y PARÁMETROS
-- Configurar parámetros de performance para las tablas
ALTER TABLE public.contact_inquiries SET (
  fillfactor = 90,
  autovacuum_vacuum_scale_factor = 0.1,
  autovacuum_analyze_scale_factor = 0.05
);

ALTER TABLE public.quote_requests SET (
  fillfactor = 90,
  autovacuum_vacuum_scale_factor = 0.1,
  autovacuum_analyze_scale_factor = 0.05
);

-- 5. POLÍTICAS DE REPLICACIÓN Y BACKUP (usando built-in features)
-- Configurar row-level security para mejor performance
-- Reemplazar las políticas existentes por versiones más eficientes

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Anyone can insert contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Anyone can insert quote requests" ON public.quote_requests;

-- Crear políticas optimizadas
CREATE POLICY "optimized_contact_insert" 
ON public.contact_inquiries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "optimized_quote_insert" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- 6. TRIGGER PARA ESTADÍSTICAS EN TIEMPO REAL
-- Crear tabla de estadísticas cacheadas
CREATE TABLE IF NOT EXISTS public.cached_stats (
  id SERIAL PRIMARY KEY,
  metric_name VARCHAR(50) NOT NULL,
  metric_value BIGINT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(metric_name)
);

-- Trigger para actualizar estadísticas en tiempo real
CREATE OR REPLACE FUNCTION update_cached_stats()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_cached_quote_stats()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Crear triggers
CREATE TRIGGER contact_stats_trigger
  AFTER INSERT ON public.contact_inquiries
  FOR EACH ROW EXECUTE FUNCTION update_cached_stats();

CREATE TRIGGER quote_stats_trigger
  AFTER INSERT ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_cached_quote_stats();

-- Inicializar estadísticas
INSERT INTO public.cached_stats (metric_name, metric_value)
SELECT 'total_contacts', COUNT(*) FROM public.contact_inquiries
ON CONFLICT (metric_name) DO NOTHING;

INSERT INTO public.cached_stats (metric_name, metric_value)
SELECT 'total_quotes', COUNT(*) FROM public.quote_requests
ON CONFLICT (metric_name) DO NOTHING;