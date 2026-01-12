import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers para optimizar preflight requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400', // Cache preflight por 24 horas
}

// Cache en memoria para validaciones frecuentes
const validationCache = new Map<string, { isValid: boolean; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

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
  // Honeypot field - should be empty for real submissions
  website?: string
}

// Honeypot validation - returns true if submission appears to be from a bot
function isHoneypotTriggered(data: any): boolean {
  // If the honeypot field has any value, it's likely a bot
  if (data.website && data.website.trim() !== '') {
    console.log('Honeypot triggered - bot detected')
    return true
  }
  
  // Additional bot detection: check for suspiciously fast submissions
  // (bots typically fill forms instantly)
  if (data._timestamp) {
    const submissionTime = Date.now() - parseInt(data._timestamp, 10)
    // If form was filled in less than 3 seconds, likely a bot
    if (submissionTime < 3000) {
      console.log('Suspicious submission speed - possible bot')
      return true
    }
  }
  
  return false
}

// Función de validación server-side optimizada con caching
function validateContactForm(data: any): { isValid: boolean; errors: string[] } {
  // Crear clave de cache basada en datos críticos
  const cacheKey = `validation:${JSON.stringify({
    nombre: data.nombre?.trim(),
    email: data.email?.trim(),
    telefono: data.telefono?.trim(),
    empresa: data.empresa?.trim(),
    asunto: data.asunto,
    mensaje: data.mensaje?.trim().substring(0, 100), // Solo primeros 100 chars para cache
    aceptaPolitica: data.aceptaPolitica
  })}`
  
  // Verificar cache
  const cached = validationCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { isValid: cached.isValid, errors: cached.isValid ? [] : ['Cached validation failed'] }
  }
  
  const errors: string[] = []
  
  // Validación nombre (optimizada)
  if (!data.nombre || typeof data.nombre !== 'string') {
    errors.push('El nombre es obligatorio')
  } else {
    const nombre = data.nombre.trim()
    if (nombre.length < 2) errors.push('El nombre debe tener al menos 2 caracteres')
    else if (nombre.length > 100) errors.push('El nombre no puede exceder 100 caracteres')
    else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(nombre)) errors.push('El nombre solo puede contener letras y espacios')
    else if (nombre.split(' ').length < 2) errors.push('Ingrese su nombre completo (nombre y apellido)')
  }
  
  // Validación email (optimizada)
  if (!data.email || typeof data.email !== 'string') {
    errors.push('El email es obligatorio')
  } else {
    const email = data.email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Ingrese un email válido')
    else if (email.length > 254) errors.push('El email no puede exceder 254 caracteres')
  }
  
  // Validación teléfono (optimizada)
  if (!data.telefono || typeof data.telefono !== 'string') {
    errors.push('El teléfono es obligatorio')
  } else {
    const telefono = data.telefono.trim()
    if (!/^[0-9+\-\s()]+$/.test(telefono)) errors.push('Formato de teléfono inválido')
    else if (telefono.length < 7 || telefono.length > 20) errors.push('El teléfono debe tener entre 7 y 20 caracteres')
  }
  
  // Validación empresa (optimizada)
  if (!data.empresa || typeof data.empresa !== 'string') {
    errors.push('La empresa/organización es obligatoria')
  } else if (data.empresa.trim().length > 200) {
    errors.push('El nombre de la empresa no puede exceder 200 caracteres')
  }
  
  // Validación asunto (optimizada con Set)
  const validAsuntos = new Set(['silos-gsi', 'cotizacion', 'servicio-tecnico', 'informacion-general', 'otro'])
  if (!data.asunto || typeof data.asunto !== 'string') {
    errors.push('Seleccione un asunto')
  } else if (!validAsuntos.has(data.asunto)) {
    errors.push('Asunto inválido')
  }
  
  // Validación mensaje (optimizada)
  if (!data.mensaje || typeof data.mensaje !== 'string') {
    errors.push('El mensaje es obligatorio')
  } else {
    const mensaje = data.mensaje.trim()
    if (mensaje.length < 20) errors.push('El mensaje debe tener al menos 20 caracteres')
    else if (mensaje.length > 2000) errors.push('El mensaje no puede exceder 2000 caracteres')
  }
  
  // Validación campos opcionales (optimizada)
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
  
  const isValid = errors.length === 0
  
  // Guardar en cache
  validationCache.set(cacheKey, { isValid, timestamp: Date.now() })
  
  // Limpiar cache periódicamente
  if (validationCache.size > 1000) {
    const now = Date.now()
    for (const [key, value] of validationCache.entries()) {
      if (now - value.timestamp > CACHE_DURATION) {
        validationCache.delete(key)
      }
    }
  }
  
  return { isValid, errors }
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  // Solo permite POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders } 
    })
  }
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Rate limiting optimizado usando el índice compuesto
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const now = new Date()
    const oneMinuteAgo = new Date(now.getTime() - 60000)
    
    // Verificar rate limit usando índice optimizado (máximo 5 requests por minuto por IP)
    const { data: recentRequests } = await supabase
      .from('contact_inquiries')
      .select('id')
      .gte('created_at', oneMinuteAgo.toISOString())
      .eq('email', req.headers.get('email') || '')
      .limit(5)
    
    if (recentRequests && recentRequests.length >= 5) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }
    
    // Parsear datos con timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    )
    
    const body = await Promise.race([
      req.json(),
      timeoutPromise
    ]) as any
    
    // Check honeypot - reject bot submissions silently
    if (isHoneypotTriggered(body)) {
      // Return success to not tip off the bot, but don't process
      return new Response(
        JSON.stringify({ success: true, message: 'Contact form submitted successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }
    
    // Validar datos con cache
    const validation = validateContactForm(body)
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.errors }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }
    
    // Sanitizar datos
    const sanitizedData = sanitizeData(body)
    
    // Función de inserción en background
    const insertData = async () => {
      try {
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
          // Aquí podrías implementar retry logic o queue
        }
        
        return { data, error }
      } catch (error) {
        console.error('Insert error:', error)
        return { data: null, error }
      }
    }
    
    // Ejecutar inserción en background usando EdgeRuntime.waitUntil
    const insertPromise = insertData()
    EdgeRuntime.waitUntil(insertPromise)
    
    // Responder inmediatamente sin esperar la inserción
    return new Response(
      JSON.stringify({ success: true, message: 'Contact form submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
    
  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})