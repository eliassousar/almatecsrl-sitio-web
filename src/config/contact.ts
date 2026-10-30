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
  primary: 'eliaspereira@almatec.net',
  secondary: 'pabloarteaga@almatec.net',
} as const;

export const ALMATEC_ADDRESS = {
  line1: 'Av. Cristo Redentor entre 4to y 5to anillo',
  line2: 'Comercial Plaza Norte, Oficina 46',
  city: 'Santa Cruz de la Sierra, Bolivia',
} as const;

export const ALMATEC_BUSINESS_HOURS = {
  weekdays: { label: 'Lunes a Viernes', hours: '8:00 – 18:00' },
  saturday: { label: 'Sábados', hours: '8:00 – 12:00' },
} as const;

export const ALMATEC_SOCIAL = {
  facebook: 'https://www.facebook.com/almatecscz/',
  instagram: 'https://www.instagram.com/almatecsrl/',
  linkedin: 'https://www.linkedin.com/company/almatec-srl/',
  youtube: 'https://www.youtube.com/@GSI.americadelsur',
} as const;

/** Enlace directo al lugar de ALMATEC en Google Maps, sin redirección acortada. */
export const ALMATEC_MAP_URL =
  'https://www.google.com/maps/place/ALMATEC+-+GSI/@-17.7442183,-63.1721707,20z/data=!4m6!3m5!1s0x93f1e7ecb9524a11:0xf5fb24b383e8b843!8m2!3d-17.7441873!4d-63.1722687';

export const ALMATEC_SITE_URL = 'https://almatecsrl-sitio-web.lovable.app';

/** Construye una URL de wa.me con mensaje precodificado. */
export const buildWhatsAppUrl = (
  phoneRaw: string = ALMATEC_PRIMARY_PHONE.raw,
  message: string = 'Hola, me interesa conocer más sobre las soluciones agroindustriales de Almatec SRL',
): string => `https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`;
