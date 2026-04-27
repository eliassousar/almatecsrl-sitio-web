/**
 * Configuración centralizada de información de contacto de Almatec SRL.
 *
 * Mantén AQUÍ cualquier cambio de teléfono, correo, dirección o redes sociales.
 * Todos los componentes (Header, Footer, WhatsAppButton, ProductCard, etc.)
 * deben importar estos valores en lugar de hardcodearlos.
 */

export interface ContactPhone {
  /** Número en formato internacional con +, sin espacios. Útil para tel:/wa.me */
  raw: string;
  /** Número con espacios para mostrar al usuario (sin prefijo país) */
  display: string;
  /** Número formateado completo para mostrar (con prefijo país) */
  displayFull: string;
}

export const ALMATEC_PHONES: readonly ContactPhone[] = [
  {
    raw: '+59177028610',
    display: '77028610',
    displayFull: '(+591) 77028610',
  },
  {
    raw: '+59178007220',
    display: '78007220',
    displayFull: '(+591) 78007220',
  },
] as const;

/** Número principal usado por defecto (botón flotante de WhatsApp, CTAs, etc.) */
export const ALMATEC_PRIMARY_PHONE = ALMATEC_PHONES[0];

export const ALMATEC_EMAILS = {
  primary: 'edson_gsi@hotmail.com',
  secondary: 'pabloarteaga@almatec.net',
} as const;

export const ALMATEC_ADDRESS = {
  line1: 'Av. Banzer entre 4to y 5to anillo',
  line2: 'Comercial Plaza Norte, Oficina 46',
  city: 'Santa Cruz de la Sierra, Bolivia',
} as const;

export const ALMATEC_BUSINESS_HOURS = {
  weekdays: { label: 'Lunes a Viernes', hours: '8:00 – 18:00' },
  saturday: { label: 'Sábados', hours: '8:00 – 12:00' },
} as const;

export const ALMATEC_SOCIAL = {
  facebook: 'https://www.facebook.com/almatecscz/?locale=es_LA',
  instagram: 'https://www.instagram.com/almatecsrl/',
  linkedin: 'https://www.linkedin.com/company/almatec-srl/',
  youtube: 'https://www.youtube.com/@GSI.americadelsur',
} as const;

export const ALMATEC_SITE_URL = 'https://almatecsrl-sitio-web.lovable.app';

/** Construye una URL de wa.me con mensaje precodificado. */
export const buildWhatsAppUrl = (
  phoneRaw: string = ALMATEC_PRIMARY_PHONE.raw,
  message: string = 'Hola, me interesa conocer más sobre las soluciones agroindustriales de Almatec SRL',
): string => `https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`;
