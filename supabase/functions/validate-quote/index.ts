import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
}

// Función de validación server-side para cotizaciones
function validateQuoteForm(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Validación nombre
  if (!data.nombre || typeof data.nombre !== 'string') {
    errors.push('El nombre es obligatorio')
  } else if (data.nombre.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres')
  } else if (data.nombre.trim().length > 100) {
    errors.push('El nombre no puede exceder 100 caracteres')
  }
  
  // Validación email
  if (!data.email || typeof data.email !== 'string') {
    errors.push('El email es obligatorio')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push('Ingrese un email válido')
  }
  
  // Validación teléfono
  if (!data.telefono || typeof data.telefono !== 'string') {
    errors.push('El teléfono es obligatorio')
  } else if (!/^[0-9+\-\s()]+$/.test(data.telefono.trim())) {
    errors.push('Formato de teléfono inválido')
  } else if (data.telefono.trim().length < 7) {
    errors.push('El teléfono debe tener al menos 7 dígitos')
  }
  
  // Validación empresa
  if (!data.empresa || typeof data.empresa !== 'string') {
    errors.push('La empresa es obligatoria')
  } else if (data.empresa.trim().length > 200) {
    errors.push('El nombre de la empresa no puede exceder 200 caracteres')
  }
  
  // Validación tipo de producto
  if (!data.tipoProducto || typeof data.tipoProducto !== 'string') {
    errors.push('Seleccione el tipo de producto')
  } else if (!['silos-gsi', 'sistemas-secado', 'transportadores', 'sistema-completo', 'otro'].includes(data.tipoProducto)) {
    errors.push('Tipo de producto inválido')
  }
  
  // Validación ubicación del proyecto
  if (!data.ubicacionProyecto || typeof data.ubicacionProyecto !== 'string') {
    errors.push('La ubicación del proyecto es obligatoria')
  } else if (data.ubicacionProyecto.trim().length > 200) {
    errors.push('La ubicación no puede exceder 200 caracteres')
  }
  
  // Validación campos opcionales
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
  
  if (data.energiaDisponible && typeof data.energiaDisponible === 'string' && !['electrica', 'gas', 'diesel', 'solar', 'mixta'].includes(data.energiaDisponible)) {
    errors.push('Tipo de energía inválido')
  }
  
  if (data.presupuestoAproximado && typeof data.presupuestoAproximado === 'string' && !['0-50k', '50k-100k', '100k-250k', '250k-500k', '500k+'].includes(data.presupuestoAproximado)) {
    errors.push('Rango de presupuesto inválido')
  }
  
  if (data.comentariosAdicionales && typeof data.comentariosAdicionales === 'string' && data.comentariosAdicionales.trim().length > 2000) {
    errors.push('Los comentarios adicionales no pueden exceder 2000 caracteres')
  }
  
  return { isValid: errors.length === 0, errors }
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
    
    // Verificar rate limit (máximo 3 requests por minuto por IP para cotizaciones)
    const { data: recentRequests } = await supabase
      .from('quote_requests')
      .select('id')
      .gte('created_at', oneMinuteAgo.toISOString())
      .limit(3)
    
    if (recentRequests && recentRequests.length >= 3) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    // Parsear datos
    const body = await req.json()
    
    // Validar datos
    const validation = validateQuoteForm(body)
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    // Sanitizar datos
    const sanitizedData = sanitizeQuoteData(body)
    
    // Insertar en base de datos
    const { data, error } = await supabase
      .from('quote_requests')
      .insert({
        nombre: sanitizedData.nombre,
        email: sanitizedData.email,
        telefono: sanitizedData.telefono,
        empresa: sanitizedData.empresa,
        tipo_producto: sanitizedData.tipoProducto,
        ubicacion_proyecto: sanitizedData.ubicacionProyecto,
        fecha_estimada: sanitizedData.fechaEstimada,
        capacidad_requerida: sanitizedData.capacidadRequerida,
        tipo_cultivo: sanitizedData.tipoCultivo,
        condiciones_ambientales: sanitizedData.condicionesAmbientales,
        energia_disponible: sanitizedData.energiaDisponible,
        presupuesto_aproximado: sanitizedData.presupuestoAproximado,
        comentarios_adicionales: sanitizedData.comentariosAdicionales,
      })
    
    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Quote request submitted successfully' }),
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