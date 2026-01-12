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

// Batch processor para múltiples requests
interface BatchRequest {
  id: string
  data: QuoteFormData
  timestamp: number
}

const batchQueue: BatchRequest[] = []
const BATCH_SIZE = 10
const BATCH_TIMEOUT = 5000 // 5 segundos

// Esquema de validación server-side para cotizaciones
interface QuoteFormData {
  nombre: string
  email: string
  telefono: string
  empresa: string
  tipoProducto: string
  ubicacionProyecto: string
  fechaEstimada?: string
  capacidadRequerida?: string
  tipoCultivo?: string
  condicionesAmbientales?: string
  energiaDisponible?: string
  presupuestoAproximado?: string
  comentariosAdicionales?: string
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
function validateQuoteForm(data: any): { isValid: boolean; errors: string[] } {
  // Crear clave de cache basada en datos críticos
  const cacheKey = `quote_validation:${JSON.stringify({
    nombre: data.nombre?.trim(),
    email: data.email?.trim(),
    telefono: data.telefono?.trim(),
    empresa: data.empresa?.trim(),
    tipoProducto: data.tipoProducto,
    ubicacionProyecto: data.ubicacionProyecto?.trim(),
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
  }
  
  // Validación email (optimizada)
  if (!data.email || typeof data.email !== 'string') {
    errors.push('El email es obligatorio')
  } else {
    const email = data.email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Ingrese un email válido')
  }
  
  // Validación teléfono (optimizada)
  if (!data.telefono || typeof data.telefono !== 'string') {
    errors.push('El teléfono es obligatorio')
  } else {
    const telefono = data.telefono.trim()
    if (!/^[0-9+\-\s()]+$/.test(telefono)) errors.push('Formato de teléfono inválido')
    else if (telefono.length < 7) errors.push('El teléfono debe tener al menos 7 dígitos')
  }
  
  // Validación empresa (optimizada)
  if (!data.empresa || typeof data.empresa !== 'string') {
    errors.push('La empresa es obligatoria')
  } else if (data.empresa.trim().length > 200) {
    errors.push('El nombre de la empresa no puede exceder 200 caracteres')
  }
  
  // Validación tipo de producto (optimizada con Set)
  const validProductos = new Set(['silos-gsi', 'sistemas-secado', 'transportadores', 'sistema-completo', 'otro'])
  if (!data.tipoProducto || typeof data.tipoProducto !== 'string') {
    errors.push('Seleccione el tipo de producto')
  } else if (!validProductos.has(data.tipoProducto)) {
    errors.push('Tipo de producto inválido')
  }
  
  // Validación ubicación del proyecto (optimizada)
  if (!data.ubicacionProyecto || typeof data.ubicacionProyecto !== 'string') {
    errors.push('La ubicación del proyecto es obligatoria')
  } else if (data.ubicacionProyecto.trim().length > 200) {
    errors.push('La ubicación no puede exceder 200 caracteres')
  }
  
  // Validación campos opcionales (optimizada)
  if (data.fechaEstimada && typeof data.fechaEstimada === 'string') {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.fechaEstimada)) {
      errors.push('Formato de fecha inválido')
    }
  }
  
  if (data.capacidadRequerida && typeof data.capacidadRequerida === 'string' && data.capacidadRequerida.trim().length > 100) {
    errors.push('La capacidad requerida no puede exceder 100 caracteres')
  }
  
  if (data.tipoCultivo && typeof data.tipoCultivo === 'string' && data.tipoCultivo.trim().length > 100) {
    errors.push('El tipo de cultivo no puede exceder 100 caracteres')
  }
  
  if (data.condicionesAmbientales && typeof data.condicionesAmbientales === 'string' && data.condicionesAmbientales.trim().length > 1000) {
    errors.push('Las condiciones ambientales no pueden exceder 1000 caracteres')
  }
  
  const validEnergias = new Set(['electrica', 'gas', 'diesel', 'solar', 'mixta'])
  if (data.energiaDisponible && typeof data.energiaDisponible === 'string' && !validEnergias.has(data.energiaDisponible)) {
    errors.push('Tipo de energía inválido')
  }
  
  const validPresupuestos = new Set(['0-50k', '50k-100k', '100k-250k', '250k-500k', '500k+'])
  if (data.presupuestoAproximado && typeof data.presupuestoAproximado === 'string' && !validPresupuestos.has(data.presupuestoAproximado)) {
    errors.push('Rango de presupuesto inválido')
  }
  
  if (data.comentariosAdicionales && typeof data.comentariosAdicionales === 'string' && data.comentariosAdicionales.trim().length > 2000) {
    errors.push('Los comentarios adicionales no pueden exceder 2000 caracteres')
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
function sanitizeQuoteData(data: any): QuoteFormData {
  return {
    nombre: data.nombre?.trim().replace(/\s+/g, ' ') || '',
    email: data.email?.trim().toLowerCase() || '',
    telefono: data.telefono?.trim().replace(/\s+/g, ' ') || '',
    empresa: data.empresa?.trim().replace(/\s+/g, ' ') || '',
    tipoProducto: data.tipoProducto || '',
    ubicacionProyecto: data.ubicacionProyecto?.trim().replace(/\s+/g, ' ') || '',
    fechaEstimada: data.fechaEstimada || null,
    capacidadRequerida: data.capacidadRequerida?.trim().replace(/\s+/g, ' ') || null,
    tipoCultivo: data.tipoCultivo?.trim().replace(/\s+/g, ' ') || null,
    condicionesAmbientales: data.condicionesAmbientales?.trim().replace(/\s+/g, ' ') || null,
    energiaDisponible: data.energiaDisponible || null,
    presupuestoAproximado: data.presupuestoAproximado || null,
    comentariosAdicionales: data.comentariosAdicionales?.trim().replace(/\s+/g, ' ') || null,
  }
}

// Función de batch processing para cotizaciones
async function processBatch(supabase: any) {
  if (batchQueue.length === 0) return

  const batch = batchQueue.splice(0, BATCH_SIZE)
  
  try {
    const insertData = batch.map(item => ({
      nombre: item.data.nombre,
      email: item.data.email,
      telefono: item.data.telefono,
      empresa: item.data.empresa,
      tipo_producto: item.data.tipoProducto,
      ubicacion_proyecto: item.data.ubicacionProyecto,
      fecha_estimada: item.data.fechaEstimada,
      capacidad_requerida: item.data.capacidadRequerida,
      tipo_cultivo: item.data.tipoCultivo,
      condiciones_ambientales: item.data.condicionesAmbientales,
      energia_disponible: item.data.energiaDisponible,
      presupuesto_aproximado: item.data.presupuestoAproximado,
      comentarios_adicionales: item.data.comentariosAdicionales,
    }))

    const { data, error } = await supabase
      .from('quote_requests')
      .insert(insertData)

    if (error) {
      console.error('Batch insert error:', error)
      // Reintroducir elementos fallidos en la cola
      batchQueue.unshift(...batch)
    }
  } catch (error) {
    console.error('Batch processing error:', error)
    // Reintroducir elementos fallidos en la cola
    batchQueue.unshift(...batch)
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
    const twoMinutesAgo = new Date(now.getTime() - 120000)
    
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
        JSON.stringify({ success: true, message: 'Quote request submitted successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }
    
    // Verificar rate limit usando índice optimizado (máximo 3 requests por 2 minutos por email)
    const { data: recentRequests } = await supabase
      .from('quote_requests')
      .select('id')
      .gte('created_at', twoMinutesAgo.toISOString())
      .eq('email', body.email)
      .limit(3)
    
    if (recentRequests && recentRequests.length >= 3) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }
    
    // Validar datos con cache
    const validation = validateQuoteForm(body)
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.errors }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }
    
    // Sanitizar datos
    const sanitizedData = sanitizeQuoteData(body)
    
    // Agregar a batch queue para procesamiento asíncrono
    const batchItem: BatchRequest = {
      id: crypto.randomUUID(),
      data: sanitizedData,
      timestamp: Date.now()
    }
    
    batchQueue.push(batchItem)
    
    // Procesar batch si llegó al límite o por timeout
    if (batchQueue.length >= BATCH_SIZE) {
      EdgeRuntime.waitUntil(processBatch(supabase))
    } else {
      // Procesar batch después de timeout
      setTimeout(() => {
        if (batchQueue.length > 0) {
          EdgeRuntime.waitUntil(processBatch(supabase))
        }
      }, BATCH_TIMEOUT)
    }
    
    // Responder inmediatamente
    return new Response(
      JSON.stringify({ success: true, message: 'Quote request submitted successfully' }),
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