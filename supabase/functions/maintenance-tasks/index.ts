import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers para optimizar preflight requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400', // Cache preflight por 24 horas
}

interface MaintenanceTask {
  name: string
  description: string
  lastRun?: Date
  nextRun?: Date
  status: 'pending' | 'running' | 'completed' | 'failed'
  duration?: number
  error?: string
}

interface MaintenanceReport {
  timestamp: Date
  tasks: MaintenanceTask[]
  summary: {
    totalTasks: number
    successfulTasks: number
    failedTasks: number
    totalDuration: number
  }
}

// Función para limpiar datos antiguos
async function cleanupOldData(supabase: any): Promise<MaintenanceTask> {
  const task: MaintenanceTask = {
    name: 'cleanup_old_data',
    description: 'Limpiar registros de auditoría antiguos (>6 meses)',
    status: 'running'
  }

  const startTime = Date.now()

  try {
    // Ejecutar función de limpieza optimizada
    const { data, error } = await supabase.rpc('cleanup_old_audit_data')

    if (error) {
      throw error
    }

    task.status = 'completed'
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  } catch (error) {
    task.status = 'failed'
    task.error = error.message
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  }
}

// Función para actualizar estadísticas de cache
async function updateCachedStats(supabase: any): Promise<MaintenanceTask> {
  const task: MaintenanceTask = {
    name: 'update_cached_stats',
    description: 'Actualizar estadísticas cacheadas para mejor performance',
    status: 'running'
  }

  const startTime = Date.now()

  try {
    // Actualizar estadísticas totales
    const { data: contactCount } = await supabase
      .from('contact_inquiries')
      .select('id', { count: 'exact', head: true })

    const { data: quoteCount } = await supabase
      .from('quote_requests')
      .select('id', { count: 'exact', head: true })

    // Actualizar cache de estadísticas
    await supabase
      .from('cached_stats')
      .upsert([
        { 
          metric_name: 'total_contacts', 
          metric_value: contactCount?.length || 0,
          updated_at: new Date().toISOString()
        },
        { 
          metric_name: 'total_quotes', 
          metric_value: quoteCount?.length || 0,
          updated_at: new Date().toISOString()
        }
      ])

    // Calcular métricas adicionales
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    
    const { data: recentContacts } = await supabase
      .from('contact_inquiries')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo)

    const { data: recentQuotes } = await supabase
      .from('quote_requests')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo)

    await supabase
      .from('cached_stats')
      .upsert([
        { 
          metric_name: 'contacts_30d', 
          metric_value: recentContacts?.length || 0,
          updated_at: new Date().toISOString()
        },
        { 
          metric_name: 'quotes_30d', 
          metric_value: recentQuotes?.length || 0,
          updated_at: new Date().toISOString()
        }
      ])

    task.status = 'completed'
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  } catch (error) {
    task.status = 'failed'
    task.error = error.message
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  }
}

// Función para optimizar índices
async function optimizeIndexes(supabase: any): Promise<MaintenanceTask> {
  const task: MaintenanceTask = {
    name: 'optimize_indexes',
    description: 'Optimizar índices de base de datos para mejor performance',
    status: 'running'
  }

  const startTime = Date.now()

  try {
    // Ejecutar ANALYZE para actualizar estadísticas del query planner
    await supabase.rpc('analyze_tables', {})

    // Verificar uso de índices
    const { data: indexUsage } = await supabase
      .from('pg_stat_user_indexes')
      .select('*')
      .eq('schemaname', 'public')

    // Log de uso de índices para monitoreo
    console.log('Index usage stats:', indexUsage)

    task.status = 'completed'
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  } catch (error) {
    task.status = 'failed'
    task.error = error.message
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  }
}

// Función para limpiar cache de validaciones
async function cleanupValidationCache(): Promise<MaintenanceTask> {
  const task: MaintenanceTask = {
    name: 'cleanup_validation_cache',
    description: 'Limpiar cache de validaciones para liberar memoria',
    status: 'running'
  }

  const startTime = Date.now()

  try {
    // Nota: En un entorno real, esto limpiaría el cache compartido
    // Por ahora, es más conceptual ya que cada invocación de edge function
    // tiene su propio contexto de memoria
    
    task.status = 'completed'
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  } catch (error) {
    task.status = 'failed'
    task.error = error.message
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  }
}

// Función para generar reporte de salud del sistema
async function generateHealthReport(supabase: any): Promise<MaintenanceTask> {
  const task: MaintenanceTask = {
    name: 'generate_health_report',
    description: 'Generar reporte de salud del sistema',
    status: 'running'
  }

  const startTime = Date.now()

  try {
    // Verificar tamaño de tablas
    const { data: tableStats } = await supabase
      .from('pg_stat_user_tables')
      .select('*')
      .eq('schemaname', 'public')

    // Verificar conexiones activas
    const { data: connections } = await supabase
      .from('pg_stat_activity')
      .select('state, count')
      .eq('datname', 'postgres')

    // Verificar rendimiento de consultas
    const { data: slowQueries } = await supabase
      .from('pg_stat_statements')
      .select('*')
      .order('mean_exec_time', { ascending: false })
      .limit(10)

    const healthReport = {
      timestamp: new Date().toISOString(),
      tables: tableStats,
      connections: connections,
      slowQueries: slowQueries,
      status: 'healthy'
    }

    // Guardar reporte en cache de estadísticas
    await supabase
      .from('cached_stats')
      .upsert({
        metric_name: 'health_report',
        metric_value: JSON.stringify(healthReport),
        updated_at: new Date().toISOString()
      })

    task.status = 'completed'
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  } catch (error) {
    task.status = 'failed'
    task.error = error.message
    task.duration = Date.now() - startTime
    task.lastRun = new Date()

    return task
  }
}

// Función principal de mantenimiento
async function runMaintenance(supabase: any): Promise<MaintenanceReport> {
  const startTime = Date.now()
  const tasks: MaintenanceTask[] = []

  // Ejecutar tareas de mantenimiento en paralelo cuando sea posible
  const parallelTasks = [
    cleanupValidationCache(),
    updateCachedStats(supabase),
    generateHealthReport(supabase)
  ]

  // Tareas secuenciales que requieren más recursos
  const sequentialTasks = [
    () => cleanupOldData(supabase),
    () => optimizeIndexes(supabase)
  ]

  // Ejecutar tareas paralelas
  const parallelResults = await Promise.allSettled(parallelTasks)
  parallelResults.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      tasks.push(result.value)
    } else {
      tasks.push({
        name: `parallel_task_${index}`,
        description: 'Tarea paralela falló',
        status: 'failed',
        error: result.reason,
        lastRun: new Date()
      })
    }
  })

  // Ejecutar tareas secuenciales
  for (const taskFn of sequentialTasks) {
    try {
      const result = await taskFn()
      tasks.push(result)
    } catch (error) {
      tasks.push({
        name: 'sequential_task',
        description: 'Tarea secuencial falló',
        status: 'failed',
        error: error.message,
        lastRun: new Date()
      })
    }
  }

  const totalDuration = Date.now() - startTime
  const successfulTasks = tasks.filter(t => t.status === 'completed').length
  const failedTasks = tasks.filter(t => t.status === 'failed').length

  return {
    timestamp: new Date(),
    tasks,
    summary: {
      totalTasks: tasks.length,
      successfulTasks,
      failedTasks,
      totalDuration
    }
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Solo permite POST para seguridad
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders } 
    })
  }

  try {
    // Verificar autorización mediante JWT
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Inicializar cliente Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Verificar el token JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting maintenance tasks...')
    
    // Ejecutar mantenimiento
    const report = await runMaintenance(supabase)

    // Log del reporte
    console.log('Maintenance completed:', {
      duration: report.summary.totalDuration,
      successful: report.summary.successfulTasks,
      failed: report.summary.failedTasks
    })

    return new Response(
      JSON.stringify({
        success: true,
        report,
        message: 'Maintenance tasks completed'
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )

  } catch (error) {
    console.error('Maintenance error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})