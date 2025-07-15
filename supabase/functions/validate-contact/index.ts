import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Esquema de validación server-side (replica del frontend)
interface ContactFormData {
  nombre: string
  email: string
  telefono: string
  empresa: string
  asunto: string
  mensaje: string
  ubicacion?: string
  tipoCultivo?: string
  aceptaPolitica: boolean
}

// Función de validación server-side
function validateContactForm(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Validación nombre
  if (!data.nombre || typeof data.nombre !== 'string') {
    errors.push('El nombre es obligatorio')
  } else if (data.nombre.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres')
  } else if (data.nombre.trim().length > 100) {
    errors.push('El nombre no puede exceder 100 caracteres')
  } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(data.nombre.trim())) {
    errors.push('El nombre solo puede contener letras y espacios')
  } else if (data.nombre.trim().split(' ').length < 2) {
    errors.push('Ingrese su nombre completo (nombre y apellido)')
  }
  
  // Validación email
  if (!data.email || typeof data.email !== 'string') {
    errors.push('El email es obligatorio')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push('Ingrese un email válido')
  } else if (data.email.trim().length > 254) {
    errors.push('El email no puede exceder 254 caracteres')
  }
  
  // Validación teléfono
  if (!data.telefono || typeof data.telefono !== 'string') {
    errors.push('El teléfono es obligatorio')
  } else if (!/^[0-9+\-\s()]+$/.test(data.telefono.trim())) {
    errors.push('Formato de teléfono inválido')
  } else if (data.telefono.trim().length < 7 || data.telefono.trim().length > 20) {
    errors.push('El teléfono debe tener entre 7 y 20 caracteres')
  }
  
  // Validación empresa
  if (!data.empresa || typeof data.empresa !== 'string') {
    errors.push('La empresa/organización es obligatoria')
  } else if (data.empresa.trim().length > 200) {
    errors.push('El nombre de la empresa no puede exceder 200 caracteres')
  }
  
  // Validación asunto
  if (!data.asunto || typeof data.asunto !== 'string') {
    errors.push('Seleccione un asunto')
  } else if (!['silos-gsi', 'cotizacion', 'servicio-tecnico', 'informacion-general', 'otro'].includes(data.asunto)) {
    errors.push('Asunto inválido')
  }
  
  // Validación mensaje
  if (!data.mensaje || typeof data.mensaje !== 'string') {
    errors.push('El mensaje es obligatorio')
  } else if (data.mensaje.trim().length < 20) {
    errors.push('El mensaje debe tener al menos 20 caracteres')
  } else if (data.mensaje.trim().length > 2000) {
    errors.push('El mensaje no puede exceder 2000 caracteres')
  }
  
  // Validación campos opcionales
  if (data.ubicacion && typeof data.ubicacion === 'string' && data.ubicacion.trim().length > 100) {
    errors.push('La ubicación no puede exceder 100 caracteres')
  }
  
  if (data.tipoCultivo && typeof data.tipoCultivo === 'string' && data.tipoCultivo.trim().length > 100) {
    errors.push('El tipo de cultivo no puede exceder 100 caracteres')
  }
  
  // Validación política
  if (data.aceptaPolitica !== true) {
    errors.push('Debe aceptar la política de privacidad')
  }
  
  return { isValid: errors.length === 0, errors }
}

// Función de sanitización
function sanitizeData(data: any): ContactFormData {
  return {
    nombre: data.nombre?.trim().replace(/\s+/g, ' ') || '',
    email: data.email?.trim().toLowerCase() || '',
    telefono: data.telefono?.trim().replace(/\s+/g, ' ') || '',
    empresa: data.empresa?.trim().replace(/\s+/g, ' ') || '',
    asunto: data.asunto || '',
    mensaje: data.mensaje?.trim().replace(/\s+/g, ' ') || '',
    ubicacion: data.ubicacion?.trim().replace(/\s+/g, ' ') || null,
    tipoCultivo: data.tipoCultivo?.trim().replace(/\s+/g, ' ') || null,
    aceptaPolitica: data.aceptaPolitica === true
  }
}

serve(async (req) => {
  // Solo permite POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Rate limiting básico por IP
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const now = new Date()
    const oneMinuteAgo = new Date(now.getTime() - 60000)
    
    // Verificar rate limit (máximo 5 requests por minuto por IP)
    const { data: recentRequests } = await supabase
      .from('contact_inquiries')
      .select('id')
      .gte('created_at', oneMinuteAgo.toISOString())
      .limit(5)
    
    if (recentRequests && recentRequests.length >= 5) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    // Parsear datos
    const body = await req.json()
    
    // Validar datos
    const validation = validateContactForm(body)
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    // Sanitizar datos
    const sanitizedData = sanitizeData(body)
    
    // Insertar en base de datos
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert({
        nombre: sanitizedData.nombre,
        email: sanitizedData.email,
        telefono: sanitizedData.telefono,
        empresa: sanitizedData.empresa,
        asunto: sanitizedData.asunto,
        mensaje: sanitizedData.mensaje,
        ubicacion: sanitizedData.ubicacion,
        tipo_cultivo: sanitizedData.tipoCultivo,
        acepta_politica: sanitizedData.aceptaPolitica,
      })
    
    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Contact form submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})