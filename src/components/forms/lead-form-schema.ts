import * as z from 'zod';

export const LEAD_ASUNTO_OPTIONS = [
  { value: 'almacenamiento', label: 'Almacenamiento' },
  { value: 'secado', label: 'Secado' },
  { value: 'limpieza', label: 'Limpieza' },
  { value: 'manejo', label: 'Manejo de granos' },
  { value: 'balanzas', label: 'Balanzas' },
  { value: 'volcadoras', label: 'Volcadoras' },
  { value: 'servicio-tecnico', label: 'Servicio técnico' },
  { value: 'orientacion', label: 'Orientación para mi proyecto' },
  { value: 'otro', label: 'Otro' },
  { value: 'cotizacion', label: 'Cotización y alcance' },
] as const;

export const LEAD_ACTIVIDAD_OPTIONS = [
  { value: 'productor', label: 'Productor' },
  { value: 'comprador-acopio', label: 'Comprador de granos / acopio' },
  { value: 'agroindustria', label: 'Agroindustria' },
  { value: 'otro', label: 'Otro' },
] as const;

export type LeadAsunto = (typeof LEAD_ASUNTO_OPTIONS)[number]['value'];
export type InitialLeadAsunto = LeadAsunto | '';

const cleanText = (max: number, message: string) =>
  z
    .string()
    .max(max, message)
    .transform((value) => value.trim().replace(/\s+/g, ' '));

const optionalText = (max: number, message: string) => cleanText(max, message);

export const leadFormSchema = z
  .object({
    nombre: cleanText(100, 'El nombre no puede exceder 100 caracteres').refine(
      (value) => value.length >= 2,
      'El nombre debe tener al menos 2 caracteres',
    ),
    email: z
      .string()
      .max(254, 'El correo electrónico no puede exceder 254 caracteres')
      .transform((value) => value.trim().toLowerCase())
      .refine(
        (value) => value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        'Ingrese un correo electrónico válido',
      ),
    telefono: z
      .string()
      .max(20, 'El teléfono no puede exceder 20 caracteres')
      .transform((value) => value.trim().replace(/\s+/g, ' '))
      .refine(
        (value) => value === '' || /^[0-9+\-\s()]+$/.test(value),
        'Ingrese un teléfono o WhatsApp válido',
      )
      .refine(
        (value) => value === '' || value.replace(/\D/g, '').length >= 7,
        'El teléfono debe tener al menos 7 dígitos',
      ),
    empresa: optionalText(200, 'La empresa no puede exceder 200 caracteres'),
    asunto: z.enum(
      LEAD_ASUNTO_OPTIONS.map((option) => option.value) as [LeadAsunto, ...LeadAsunto[]],
      { errorMap: () => ({ message: 'Seleccione una necesidad' }) },
    ),
    mensaje: optionalText(2000, 'Los comentarios no pueden exceder 2000 caracteres'),
    ubicacion: cleanText(120, 'La ubicación no puede exceder 120 caracteres').refine(
      (value) => value.length > 0,
      'Indique un municipio o seleccione Por definir',
    ),
    tipo_cultivo: optionalText(100, 'El cultivo o grano no puede exceder 100 caracteres'),
    actividad: z.enum(['', ...LEAD_ACTIVIDAD_OPTIONS.map((option) => option.value)] as [string, ...string[]]),
    volumen_aprox: optionalText(100, 'El volumen aproximado no puede exceder 100 caracteres'),
    acepta_politica: z.boolean().refine((value) => value === true, {
      message: 'Debe aceptar la política de privacidad',
    }),
    website: z.string().max(200, 'Valor inválido').optional(),
  })
  .superRefine((data, context) => {
    if (!data.email && !data.telefono) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['telefono'],
        message: 'Indique al menos un teléfono/WhatsApp o un correo electrónico',
      });
    }
  });

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export interface LeadPayload {
  form_version: 2;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  asunto: LeadAsunto;
  mensaje: string;
  ubicacion: string;
  tipo_cultivo: string;
  actividad: string;
  volumen_aprox: string;
  acepta_politica: true;
  website: string;
  _timestamp: string;
}

export const getLeadDefaultValues = (initialAsunto: InitialLeadAsunto = ''): LeadFormValues => ({
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  asunto: initialAsunto as LeadAsunto,
  mensaje: '',
  ubicacion: '',
  tipo_cultivo: '',
  actividad: '',
  volumen_aprox: '',
  acepta_politica: false,
  website: '',
});

export const buildLeadPayload = (data: LeadFormValues, timestamp: number): LeadPayload => ({
  form_version: 2,
  nombre: data.nombre,
  email: data.email || '',
  telefono: data.telefono || '',
  empresa: data.empresa || '',
  asunto: data.asunto,
  mensaje: data.mensaje || '',
  ubicacion: data.ubicacion,
  tipo_cultivo: data.tipo_cultivo || '',
  actividad: data.actividad || '',
  volumen_aprox: data.volumen_aprox || '',
  acepta_politica: true,
  website: data.website || '',
  _timestamp: String(timestamp),
});

type ErrorPayload = {
  error?: unknown;
  details?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readContextBody = async (error: unknown): Promise<ErrorPayload | undefined> => {
  if (!isRecord(error) || !isRecord(error.context)) return undefined;
  const context = error.context as unknown as Response;
  if (typeof context.clone !== 'function') return undefined;

  try {
    const body = await context.clone().json();
    return isRecord(body) ? body : undefined;
  } catch {
    return undefined;
  }
};

const normalizeDetails = (details: unknown): string | undefined => {
  if (Array.isArray(details)) {
    const messages = details.filter((detail): detail is string => typeof detail === 'string');
    return messages.length > 0 ? messages.join('. ') : undefined;
  }
  return typeof details === 'string' ? details : undefined;
};

export const getLeadErrorMessage = async (
  error: unknown,
  response?: unknown,
): Promise<string> => {
  const errorRecord = isRecord(error) ? error : undefined;
  const context = errorRecord?.context;
  const status = isRecord(context) && typeof context.status === 'number' ? context.status : undefined;
  const contextBody = await readContextBody(error);
  const responseBody = isRecord(response) ? response : undefined;
  const body = contextBody ?? responseBody;

  if (status === 429) {
    return 'Recibimos demasiadas solicitudes desde este dispositivo. Espere un momento e intente nuevamente.';
  }
  if (status === 503) {
    return 'El servicio está temporalmente no disponible. Intente nuevamente en unos minutos; sus datos siguen en el formulario.';
  }

  const details = normalizeDetails(body?.details);
  if (details) return details;

  const serverMessage = typeof body?.error === 'string' ? body.error : undefined;
  if (serverMessage && !['Validation failed', 'Internal server error'].includes(serverMessage)) {
    return serverMessage;
  }

  if (status && status >= 500) {
    return 'No pudimos procesar su consulta en este momento. Intente nuevamente más tarde.';
  }

  if (errorRecord?.message === 'Failed to fetch') {
    return 'No pudimos conectar con el servicio. Revise su conexión e intente nuevamente.';
  }

  return 'No pudimos enviar su consulta. Revise los datos e intente nuevamente.';
};
