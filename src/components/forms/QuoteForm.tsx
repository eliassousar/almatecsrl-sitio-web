
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const quoteFormSchema = z.object({
  // Paso 1: Información de contacto
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().min(1, 'El email es obligatorio').email('Email inválido'),
  telefono: z.string().min(7, 'Teléfono debe tener al menos 7 dígitos'),
  empresa: z.string().min(1, 'La empresa es obligatoria'),
  
  // Paso 2: Detalles del proyecto
  tipoProducto: z.string().min(1, 'Seleccione el tipo de producto'),
  ubicacionProyecto: z.string().min(1, 'La ubicación es obligatoria'),
  fechaEstimada: z.string().optional(),
  
  // Paso 3: Especificaciones técnicas
  capacidadRequerida: z.string().optional(),
  tipoCultivo: z.string().optional(),
  condicionesAmbientales: z.string().optional(),
  energiaDisponible: z.string().optional(),
  
  // Paso 4: Información adicional
  presupuestoAproximado: z.string().optional(),
  comentariosAdicionales: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      tipoProducto: '',
      ubicacionProyecto: '',
      fechaEstimada: '',
      capacidadRequerida: '',
      tipoCultivo: '',
      condicionesAmbientales: '',
      energiaDisponible: '',
      presupuestoAproximado: '',
      comentariosAdicionales: '',
    },
  });

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Datos de cotización:', data);
      
      toast({
        title: "¡Solicitud de cotización enviada!",
        description: "Nuestro equipo comercial se pondrá en contacto con usted en las próximas 24 horas.",
      });
      
      form.reset();
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: "Error al enviar la solicitud",
        description: "Por favor, intente nuevamente o contáctenos directamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepProgress = () => {
    return (currentStep / 4) * 100;
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-montserrat text-almatec-dark-gray">
          Solicitud de Cotización
        </CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-almatec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${getStepProgress()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">Paso {currentStep} de 4</p>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-almatec-dark-gray">Información de Contacto</h3>
                
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
                        <FormLabel>Empresa *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre de su empresa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-almatec-dark-gray">Detalles del Proyecto</h3>
                
                <FormField
                  control={form.control}
                  name="tipoProducto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Producto *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione el tipo de producto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="silos-gsi">Silos GSI</SelectItem>
                          <SelectItem value="sistemas-secado">Sistemas de secado</SelectItem>
                          <SelectItem value="transportadores">Sistemas de transporte</SelectItem>
                          <SelectItem value="sistema-completo">Sistema completo</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ubicacionProyecto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación del Proyecto *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ciudad, departamento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fechaEstimada"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha Estimada de Implementación</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-almatec-dark-gray">Especificaciones Técnicas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="capacidadRequerida"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacidad Requerida</FormLabel>
                        <FormControl>
                          <Input placeholder="ej. 1000 toneladas" {...field} />
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
                  name="condicionesAmbientales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condiciones Ambientales</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describa las condiciones ambientales del sitio..."
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="energiaDisponible"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Energía Disponible</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione el tipo de energía" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electrica">Eléctrica</SelectItem>
                          <SelectItem value="gas">Gas natural</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="solar">Solar</SelectItem>
                          <SelectItem value="mixta">Mixta</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-almatec-dark-gray">Información Adicional</h3>
                
                <FormField
                  control={form.control}
                  name="presupuestoAproximado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Presupuesto Aproximado (USD)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Rango de presupuesto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-50k">$0 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                          <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                          <SelectItem value="500k+">$500,000+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comentariosAdicionales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comentarios Adicionales</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Información adicional que considere relevante..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-almatec-yellow/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-almatec-dark-gray mb-2">Resumen de su solicitud:</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Producto:</strong> {form.watch('tipoProducto') || 'No especificado'}</p>
                    <p><strong>Ubicación:</strong> {form.watch('ubicacionProyecto') || 'No especificada'}</p>
                    <p><strong>Capacidad:</strong> {form.watch('capacidadRequerida') || 'No especificada'}</p>
                    <p><strong>Presupuesto:</strong> {form.watch('presupuestoAproximado') || 'No especificado'}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              
              {currentStep < 4 ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black"
                >
                  Siguiente
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;
