import LeadForm from '@/components/forms/LeadForm';

interface ContactFormProps {
  /** Se conserva por compatibilidad con las llamadas existentes; ambas variantes usan una sola pantalla. */
  variant?: 'full' | 'simple';
}

const ContactForm = ({ variant = 'full' }: ContactFormProps) => (
  <LeadForm
    compact={variant === 'simple'}
    submitLabel="Enviar consulta"
    successTitle="Consulta recibida"
    successDescription="Recibimos sus datos y comentarios. Los revisaremos para orientarle sobre el siguiente paso."
  />
);

export default ContactForm;
