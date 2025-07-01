
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Validación mejorada con sanitización
const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, 'El nombre solo puede contener letras y espacios')
    .refine((val) => val.trim().split(' ').length >= 2, {
      message: 'Ingrese su nombre completo (nombre y apellido)',
    })
    .transform((val) => val.trim().replace(/\s+/g, ' ')), // Sanitización
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Ingrese un email válido')
    .max(254, 'El email no puede exceder 254 caracteres')
    .toLowerCase()
    .transform((val) => val.trim()), // Sanitización
  telefono: z
    .string()
    .min(1, 'El teléfono es obligatorio')
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .regex(/^[0-9+\-\s()]+$/, 'Formato de teléfono inválido')
    .transform((val) => val.trim().replace(/\s+/g, ' ')), // Sanitización
  empresa: z
    .string()
    .min(1, 'La empresa/organización es obligatoria')
    .max(200, 'El nombre de la empresa no puede exceder 200 caracteres')
    .transform((val) => val.trim().replace(/\s+/g, ' ')), // Sanitización
  asunto: z.string().min(1, 'Seleccione un asunto'),
  mensaje: z
    .string()
    .min(1, 'El mensaje es obligatorio')
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres')
    .transform((val) => val.trim().replace(/\s+/g, ' ')), // Sanitización
  ubicacion: z
    .string()
    .max(100, 'La ubicación no puede exceder 100 caracteres')
    .optional()
    .transform((val) => val ? val.trim().replace(/\s+/g, ' ') : val), // Sanitización
  tipoCultivo: z
    .string()
    .max(100, 'El tipo de cultivo no puede exceder 100 caracteres')
    .optional()
    .transform((val) => val ? val.trim().replace(/\s+/g, ' ') : val), // Sanitización
  aceptaPolitica: z.boolean().refine((val) => val === true, {
    message: 'Debe aceptar la política de privacidad',
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  variant?: 'full' | 'simple';
}

const ContactForm = ({ variant = 'full' }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      asunto: '',
      mensaje: '',
      ubicacion: '',
      tipoCultivo: '',
      aceptaPolitica: false,
    },
    mode: 'onChange', // Validación en tiempo real
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulación de envío con mejor manejo de errores
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulación de posible error de red
          if (Math.random() > 0.9) {
            reject(new Error('Error de red'));
          } else {
            resolve(true);
          }
        }, 1000 + Math.random() * 2000);
      });
      
      console.log('Datos del formulario (sanitizados):', data);
      
      toast({
        title: "¡Mensaje enviado exitosamente!",
        description: "Nos pondremos en contacto con usted en un plazo máximo de 24 horas.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      toast({
        title: "Error al enviar el mensaje",
        description: "Por favor, verifique su conexión a internet e intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const asuntoOptions = [
    { value: 'silos-gsi', label: 'Consulta sobre silos GSI' },
    { value: 'cotizacion', label: 'Solicitud de cotización' },
    { value: 'servicio-tecnico', label: 'Servicio técnico' },
    { value: 'informacion-general', label: 'Información general' },
    { value: 'otro', label: 'Otro' },
  ];

  if (variant === 'simple') {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Juan Pérez" 
                      {...field} 
                      autoComplete="name"
                      aria-describedby="nombre-error"
                    />
                  </FormControl>
                  <FormMessage id="nombre-error" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="juan@ejemplo.com" 
                      {...field} 
                      autoComplete="email"
                      aria-describedby="email-error"
                    />
                  </FormControl>
                  <FormMessage id="email-error" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(+591) 12345678" 
                    {...field} 
                    autoComplete="tel"
                    aria-describedby="telefono-error"
                  />
                </FormControl>
                <FormMessage id="telefono-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mensaje"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describa brevemente su consulta..."
                    className="min-h-[100px] resize-none"
                    {...field} 
                    aria-describedby="mensaje-error"
                    maxLength={2000}
                  />
                </FormControl>
                <FormMessage id="mensaje-error" />
                <p className="text-xs text-gray-500 mt-1">
                  {field.value.length}/2000 caracteres
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aceptaPolitica"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-describedby="politica-error"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    Acepto la política de privacidad y el tratamiento de mis datos personales *
                  </FormLabel>
                  <FormMessage id="politica-error" />
                </div>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold"
            disabled={isSubmitting}
            aria-describedby={isSubmitting ? "enviando-mensaje" : undefined}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
          </Button>
          {isSubmitting && (
            <p id="enviando-mensaje" className="sr-only">
              Enviando su consulta, por favor espere...
            </p>
          )}
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Juan Pérez" 
                    {...field} 
                    autoComplete="name"
                    aria-describedby="nombre-error"
                  />
                </FormControl>
                <FormMessage id="nombre-error" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico *</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="juan@ejemplo.com" 
                    {...field} 
                    autoComplete="email"
                    aria-describedby="email-error"
                  />
                </FormControl>
                <FormMessage id="email-error" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(+591) 12345678" 
                    {...field} 
                    autoComplete="tel"
                    aria-describedby="telefono-error"
                  />
                </FormControl>
                <FormMessage id="telefono-error" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa/Organización *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nombre de su empresa" 
                    {...field} 
                    autoComplete="organization"
                    aria-describedby="empresa-error"
                  />
                </FormControl>
                <FormMessage id="empresa-error" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="asunto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asunto *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger aria-describedby="asunto-error">
                    <SelectValue placeholder="Seleccione el motivo de su consulta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {asuntoOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage id="asunto-error" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ubicacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicación del Proyecto</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Santa Cruz, Bolivia" 
                    {...field} 
                    aria-describedby="ubicacion-error"
                  />
                </FormControl>
                <FormMessage id="ubicacion-error" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tipoCultivo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Cultivo</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Soja, maíz, trigo, etc." 
                    {...field} 
                    aria-describedby="tipoCultivo-error"
                  />
                </FormControl>
                <FormMessage id="tipoCultivo-error" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="mensaje"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describa su proyecto, necesidades o consulta en detalle..."
                  className="min-h-[120px] resize-none"
                  {...field} 
                  aria-describedby="mensaje-error"
                  maxLength={2000}
                />
              </FormControl>
              <FormMessage id="mensaje-error" />
              <p className="text-xs text-gray-500 mt-1">
                {field.value.length}/2000 caracteres
              </p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="aceptaPolitica"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-describedby="politica-error"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">
                  Acepto la política de privacidad y el tratamiento de mis datos personales *
                </FormLabel>
                <FormMessage id="politica-error" />
              </div>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold"
          disabled={isSubmitting}
          aria-describedby={isSubmitting ? "enviando-mensaje" : undefined}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>

        {isSubmitting && (
          <p id="enviando-mensaje" className="sr-only">
            Enviando su mensaje, por favor espere...
          </p>
        )}

        <p className="text-xs text-gray-500 text-center">
          * Campos obligatorios. Nos pondremos en contacto con usted en un plazo máximo de 24 horas.
        </p>
      </form>
    </Form>
  );
};

export default ContactForm;
