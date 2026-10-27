import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  buildLeadPayload,
  getLeadDefaultValues,
  getLeadErrorMessage,
  LEAD_ACTIVIDAD_OPTIONS,
  LEAD_ASUNTO_OPTIONS,
  leadFormSchema,
  type LeadAsunto,
  type InitialLeadAsunto,
  type LeadFormValues,
} from '@/components/forms/lead-form-schema';

interface LeadFormProps {
  compact?: boolean;
  initialAsunto?: InitialLeadAsunto;
  submitLabel?: string;
  successTitle?: string;
  successDescription?: string;
}

const LeadForm = ({
  compact = false,
  initialAsunto = '',
  submitLabel = 'Enviar consulta',
  successTitle = 'Consulta recibida',
  successDescription = 'Recibimos sus datos y comentarios. Los revisaremos para orientarle sobre el siguiente paso.',
}: LeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formLoadTime] = useState(() => Date.now());
  const { toast } = useToast();
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: getLeadDefaultValues(initialAsunto),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitted(false);

    try {
      const { data: response, error } = await supabase.functions.invoke('validate-contact', {
        body: buildLeadPayload(data, formLoadTime),
      });

      if (error || response?.success !== true || response?.accepted === false) {
        const message = await getLeadErrorMessage(error, response);
        setSubmitError(message);
        toast({
          title: 'No se pudo enviar la consulta',
          description: message,
          variant: 'destructive',
        });
        return;
      }

      // Solo se limpia después de confirmar success === true del backend.
      form.reset(getLeadDefaultValues(initialAsunto));
      setSubmitted(true);
      toast({ title: successTitle, description: successDescription });
    } catch (error) {
      const message = await getLeadErrorMessage(error);
      setSubmitError(message);
      toast({
        title: 'No se pudo enviar la consulta',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={compact ? 'space-y-4' : 'space-y-5'}
        noValidate
        aria-label="Formulario de consulta"
      >
        <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="lead-website">No completar este campo</label>
          <input
            id="lead-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-label="No completar este campo"
            {...form.register('website')}
          />
        </div>

        {submitError && (
          <div role="alert" className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{submitError}</span>
          </div>
        )}

        {submitted && (
          <div role="status" className="flex items-start gap-3 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{successDescription}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input placeholder="Su nombre y apellido" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa u organización <span className="font-normal text-muted-foreground">(opcional)</span></FormLabel>
                <FormControl>
                  <Input placeholder="Si corresponde" autoComplete="organization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">¿Cómo podemos contactarle? <span aria-hidden="true">*</span></p>
          <p className="mb-3 text-xs text-muted-foreground">Indique al menos un teléfono/WhatsApp o un correo electrónico.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono o WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(+591) 70000000" autoComplete="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="nombre@empresa.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="ubicacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Municipio o ubicación *</FormLabel>
                <FormControl>
                  <Input
                    list="lead-municipios"
                    placeholder="Ej. Santa Cruz o Por definir"
                    autoComplete="address-level2"
                    {...field}
                  />
                </FormControl>
                <datalist id="lead-municipios">
                  <option value="Por definir" />
                </datalist>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="asunto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Necesidad principal *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una necesidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LEAD_ASUNTO_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="actividad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Actividad <span className="font-normal text-muted-foreground">(opcional)</span></FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Seleccione" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LEAD_ACTIVIDAD_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipo_cultivo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cultivo o grano <span className="font-normal text-muted-foreground">(opcional)</span></FormLabel>
                <FormControl><Input placeholder="Soja, maíz, sorgo..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="volumen_aprox"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volumen aproximado <span className="font-normal text-muted-foreground">(opcional)</span></FormLabel>
                <FormControl><Input placeholder="Si lo conoce" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="mensaje"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentarios <span className="font-normal text-muted-foreground">(opcional)</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntenos qué necesita resolver o qué información ya tiene."
                  className="min-h-[110px] resize-y"
                  maxLength={2000}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-right text-xs text-muted-foreground">{field.value.length}/2000</p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acepta_politica"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  aria-describedby="lead-privacy-error"
                />
              </FormControl>
              <div className="space-y-1 leading-tight">
                <FormLabel className="text-sm font-normal">
                  Acepto la <Link to="/politica-privacidad" className="underline underline-offset-2 hover:text-almatec-yellow">política de privacidad</Link> y el tratamiento de los datos enviados. *
                </FormLabel>
                <FormMessage id="lead-privacy-error" />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-almatec-yellow font-montserrat font-semibold text-almatec-black hover:bg-almatec-yellow/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando…' : submitLabel}
        </Button>
        {isSubmitting && <p className="sr-only" role="status">Enviando su consulta, por favor espere.</p>}
      </form>
    </Form>
  );
};

export default LeadForm;
