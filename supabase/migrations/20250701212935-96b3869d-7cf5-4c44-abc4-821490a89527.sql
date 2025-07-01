
-- Crear tabla para consultas de contacto
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  empresa TEXT NOT NULL,
  asunto TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  ubicacion TEXT,
  tipo_cultivo TEXT,
  acepta_politica BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla para solicitudes de cotización
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  empresa TEXT NOT NULL,
  tipo_producto TEXT NOT NULL,
  ubicacion_proyecto TEXT NOT NULL,
  fecha_estimada DATE,
  capacidad_requerida TEXT,
  tipo_cultivo TEXT,
  condiciones_ambientales TEXT,
  energia_disponible TEXT,
  presupuesto_aproximado TEXT,
  comentarios_adicionales TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir inserción pública (ya que son formularios de contacto público)
CREATE POLICY "Anyone can insert contact inquiries" 
  ON public.contact_inquiries 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can insert quote requests" 
  ON public.quote_requests 
  FOR INSERT 
  WITH CHECK (true);

-- Crear índices para mejorar el rendimiento
CREATE INDEX contact_inquiries_email_idx ON public.contact_inquiries(email);
CREATE INDEX contact_inquiries_created_at_idx ON public.contact_inquiries(created_at);
CREATE INDEX quote_requests_email_idx ON public.quote_requests(email);
CREATE INDEX quote_requests_created_at_idx ON public.quote_requests(created_at);
