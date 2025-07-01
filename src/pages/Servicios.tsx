
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Link } from 'react-router-dom';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Servicios = () => {
  const servicios = [
    {
      title: "Asesoría Técnica",
      description: "Consultoría especializada para el diseño y planificación de proyectos agrícolas",
      icon: "🎯",
      detalles: [
        "Análisis de necesidades específicas del cliente",
        "Diseño de soluciones personalizadas",
        "Estudios de factibilidad técnica y económica",
        "Recomendaciones de ubicación y capacidad",
        "Planificación de fases de implementación"
      ]
    },
    {
      title: "Instalación",
      description: "Montaje profesional con equipos especializados y personal certificado",
      icon: "🔧",
      detalles: [
        "Equipo técnico altamente capacitado",
        "Supervisión continua de calidad",
        "Cumplimiento de normas de seguridad",
        "Pruebas de funcionamiento completas",
        "Documentación técnica detallada"
      ]
    },
    {
      title: "Mantenimiento",
      description: "Programas de mantenimiento preventivo y correctivo para máximo rendimiento",
      icon: "⚙️",
      detalles: [
        "Mantenimiento preventivo programado",
        "Servicio de emergencia 24/7",
        "Repuestos originales GSI",
        "Diagnósticos técnicos avanzados",
        "Reportes detallados de estado"
      ]
    },
    {
      title: "Capacitación",
      description: "Entrenamiento especializado para operación óptima de equipos",
      icon: "📚",
      detalles: [
        "Cursos teóricos y prácticos",
        "Certificación de operadores",
        "Manuales de operación en español",
        "Simulaciones de situaciones reales",
        "Seguimiento post-capacitación"
      ]
    },
    {
      title: "Soporte Post-venta",
      description: "Acompañamiento continuo y soporte técnico especializado",
      icon: "📞",
      detalles: [
        "Línea directa de soporte técnico",
        "Asistencia remota especializada",
        "Actualizaciones de software",
        "Garantía extendida disponible",
        "Programa de mejoras continuas"
      ]
    }
  ];

  const procesoTrabajo = [
    {
      step: "01",
      title: "Consulta Inicial",
      description: "Evaluamos sus necesidades y objetivos específicos"
    },
    {
      step: "02", 
      title: "Análisis y Diseño",
      description: "Desarrollamos la solución técnica más adecuada"
    },
    {
      step: "03",
      title: "Planificación",
      description: "Creamos cronograma detallado y plan de implementación"
    },
    {
      step: "04",
      title: "Implementación",
      description: "Ejecutamos el proyecto con supervisión continua"
    },
    {
      step: "05",
      title: "Entrega y Capacitación",
      description: "Entregamos el proyecto y capacitamos a su equipo"
    },
    {
      step: "06",
      title: "Soporte Continuo",
      description: "Brindamos mantenimiento y soporte a largo plazo"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-almatec-dark-gray to-almatec-black text-almatec-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')"
          }}
        ></div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Nuestros 
              <span className="text-almatec-yellow"> Servicios</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl text-gray-200 max-w-3xl">
              Servicios integrales para maximizar el rendimiento de sus equipos agrícolas
            </p>
          </div>
        </div>
      </section>

      {/* Listado de Servicios con Acordeones */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Servicios Especializados
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una gama completa de servicios para acompañar su proyecto desde el diseño hasta la operación
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {servicios.map((servicio, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4 text-left">
                      <div className="w-12 h-12 bg-almatec-yellow rounded-full flex items-center justify-center text-2xl">
                        {servicio.icon}
                      </div>
                      <div>
                        <h3 className="font-montserrat font-semibold text-almatec-dark-gray text-lg">
                          {servicio.title}
                        </h3>
                        <p className="font-open-sans text-gray-600 text-sm">
                          {servicio.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-montserrat font-medium text-almatec-dark-gray mb-3">
                        ¿Qué incluye este servicio?
                      </h4>
                      <ul className="space-y-2">
                        {servicio.detalles.map((detalle, detalleIndex) => (
                          <li key={detalleIndex} className="flex items-start space-x-2">
                            <span className="text-almatec-yellow mt-1">•</span>
                            <span className="font-open-sans text-gray-600 text-sm">{detalle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Una metodología probada que garantiza el éxito de cada proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {procesoTrabajo.map((paso, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-montserrat font-bold text-almatec-black text-lg">{paso.step}</span>
                  </div>
                  <CardTitle className="font-montserrat text-almatec-dark-gray">{paso.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-open-sans text-gray-600">{paso.description}</p>
                </CardContent>
                {index < procesoTrabajo.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-almatec-yellow"></div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonio de Servicio */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <div className="mb-6">
                  <span className="text-6xl text-almatec-yellow">"</span>
                </div>
                <p className="font-open-sans text-lg text-gray-700 leading-relaxed mb-6 italic">
                  El servicio de Almatec superó nuestras expectativas. Desde la consulta inicial hasta 
                  la puesta en marcha, su equipo técnico demostró profesionalismo y conocimiento 
                  excepcional. Nuestro sistema GSI funciona perfectamente y el soporte post-venta 
                  es incomparable.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-almatec-yellow rounded-full flex items-center justify-center">
                    <span className="font-montserrat font-bold text-almatec-black">JM</span>
                  </div>
                  <div className="text-left">
                    <p className="font-montserrat font-semibold text-almatec-dark-gray">Juan Morales</p>
                    <p className="font-open-sans text-sm text-gray-600">Gerente General, Cooperativa El Palmar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solicitar Servicio */}
      <section className="py-16 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
                ¿Necesita Alguno de Nuestros Servicios?
              </h2>
              <p className="font-open-sans text-lg text-gray-300 mb-8 leading-relaxed">
                Contáctenos para recibir asesoría personalizada y conocer cómo podemos 
                ayudarle a optimizar sus operaciones agrícolas.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <span className="text-almatec-yellow">✓</span>
                  <span className="font-open-sans">Evaluación gratuita de necesidades</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-almatec-yellow">✓</span>
                  <span className="font-open-sans">Propuesta técnica personalizada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-almatec-yellow">✓</span>
                  <span className="font-open-sans">Garantía en todos nuestros servicios</span>
                </div>
              </div>
              <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
                <Link to="/contacto">Solicitar Servicio</Link>
              </Button>
            </div>
            <div>
              <AspectRatio ratio={4 / 3}>
                <img 
                  src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Servicios Almatec"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicios;
