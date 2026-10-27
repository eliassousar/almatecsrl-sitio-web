import LeadForm from '@/components/forms/LeadForm';
import type { LeadAsunto } from '@/components/forms/lead-form-schema';

export interface QuoteFormProps {
  /** Permite conservar el uso actual y elegir orientación cuando el alcance aún no está definido. */
  initialAsunto?: Extract<LeadAsunto, 'cotizacion' | 'orientacion'>;
}

const QuoteForm = ({ initialAsunto = 'cotizacion' }: QuoteFormProps) => (
  <LeadForm
    initialAsunto={initialAsunto}
    submitLabel="Enviar consulta de cotización"
    successTitle="Solicitud recibida"
    successDescription="Recibimos la información de su proyecto. La revisaremos para conversar sobre el alcance adecuado."
  />
);

export default QuoteForm;
