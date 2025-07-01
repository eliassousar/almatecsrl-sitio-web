
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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

const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .refine((val) => val.trim().split(' ').length >= 2, {
      message: 'Ingrese su nombre completo (nombre y apellido)',
    }),
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Ingrese un email válido'),
  telefono: z
    .string()
    .min(1, 'El teléfono es obligatorio')
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .regex(/^[0-9+\-\s]+$/, 'Ingrese solo números, +, - y espacios'),
  empresa: z.string().min(1, 'La empresa/organización es obligatoria'),
  asunto: z.string().min(1, 'Seleccione un asunto'),
  mensaje: z
    .string()
    .min(1, 'El mensaje es obligatorio')
    .min(20, 'El mensaje debe tener al menos 20 caracteres'),
  ubicacion: z.string().optional(),
  tipoCultivo: z.string().optional(),
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
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulamos el envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Datos del formulario:', data);
      
      toast({
        title: "¡Mensaje enviado exitosamente!",
        description: "Nos pondremos en contacto con usted en un plazo máximo de 24 horas.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error al enviar el mensaje",
        description: "Por favor, intente nuevamente o contáctenos directamente.",
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Su nombre completo" {...field} />
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
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="su.email@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <Input placeholder="(+591) 12345678" {...field} />
                </FormControl>
                <FormMessage />
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
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
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
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    Acepto la política de privacidad y el tratamiento de mis datos personales *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo *</FormLabel>
                <FormControl>
                  <Input placeholder="Su nombre completo" {...field} />
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
                <FormLabel>Correo Electrónico *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="su.email@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="(+591) 12345678" {...field} />
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
                <FormLabel>Empresa/Organización *</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de su empresa" {...field} />
                </FormControl>
                <FormMessage />
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
                  <SelectTrigger>
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
              <FormMessage />
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
                  <Input placeholder="Ciudad, departamento" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="Soja, maíz, trigo, etc." {...field} />
                </FormControl>
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
              <FormLabel>Mensaje *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describa su proyecto, necesidades o consulta en detalle..."
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
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
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">
                  Acepto la política de privacidad y el tratamiento de mis datos personales *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          * Campos obligatorios. Nos pondremos en contacto con usted en un plazo máximo de 24 horas.
        </p>
      </form>
    </Form>
  );
};

export default ContactForm;
