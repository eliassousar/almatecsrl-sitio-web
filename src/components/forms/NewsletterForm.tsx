
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const newsletterSchema = z.object({
  email: z.string().min(1, 'El email es obligatorio').email('Email inválido'),
  nombre: z.string().optional(),
  aceptaPolitica: z.boolean().refine((val) => val === true, {
    message: 'Debe aceptar la política de privacidad',
  }),
});

type NewsletterData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  variant?: 'inline' | 'popup' | 'full';
}

const NewsletterForm = ({ variant = 'inline' }: NewsletterFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      nombre: '',
      aceptaPolitica: false,
    },
  });

  const onSubmit = async (data: NewsletterData) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Suscripción al newsletter:', data);
      
      toast({
        title: "¡Suscripción exitosa!",
        description: "Gracias por suscribirse a nuestro newsletter. Recibirá contenido relevante sobre soluciones agrícolas.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error en la suscripción",
        description: "Por favor, intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-almatec-yellow/20 to-almatec-yellow/10 p-6 rounded-lg">
        <h3 className="text-xl font-montserrat font-semibold text-almatec-dark-gray mb-2">
          Manténgase Actualizado
        </h3>
        <p className="text-gray-600 mb-4">
          Reciba las últimas noticias sobre tecnología agrícola y nuestros productos.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        placeholder="Su email" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black px-8"
              >
                {isSubmitting ? 'Suscribiendo...' : 'Suscribirse'}
              </Button>
            </div>
            
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
                    <FormLabel className="text-xs text-gray-600">
                      Acepto recibir comunicaciones de Almatec SRL y la política de privacidad
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Su nombre" {...field} />
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
                <Input placeholder="su.email@ejemplo.com" type="email" {...field} />
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
                  Acepto recibir comunicaciones de Almatec SRL y la política de privacidad *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Suscribiendo...' : 'Suscribirse al Newsletter'}
        </Button>
      </form>
    </Form>
  );
};

export default NewsletterForm;
