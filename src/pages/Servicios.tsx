import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import QuoteForm from '@/components/forms/QuoteForm';

const Servicios = () => {
  const servicios = [
    {
      id: "asesoria-tecnica",
      title: "Asesoría Técnica Especializada",
      icon: "🎯",
      description: "Nuestro equipo de ingenieros especializados evalúa sus necesidades específicas y condiciones locales para diseñar la solución óptima para su operación.",
      detalles: "El servicio incluye análisis de requerimientos, estudios de viabilidad, planificación de capacidad y recomendaciones técnicas personalizadas. Trabajamos con usted desde la conceptualización hasta la implementación final.",
      proceso: [
        "Evaluación inicial de necesidades y condiciones del sitio",
        "Análisis técnico y diseño de la solución óptima",
        "Elaboración de propuesta técnica detallada",
        "Acompañamiento durante la implementación"
      ],
      beneficios: [
        "Soluciones personalizadas según sus necesidades específicas",
        "Optimización de recursos y presupuesto",
        "Reducción de riesgos en la implementación",
        "Garantía de funcionamiento óptimo del sistema"
      ]
    },
    {
      id: "instalacion",
      title: "Instalación Profesional",
      icon: "🔧",
      description: "Contamos con equipos de instalación altamente capacitados con amplia experiencia en proyectos de diversa escala.",
      detalles: "Garantizamos un montaje profesional que cumple con todos los estándares de calidad y seguridad, asegurando el funcionamiento óptimo de su sistema desde el primer día.",
      proceso: [
        "Preparación del sitio y verificación de condiciones",
        "Montaje de estructuras principales y sistemas auxiliares",
        "Instalación de equipos electromecánicos y controles",
        "Pruebas de funcionamiento y puesta en marcha",
        "Capacitación al personal operativo"
      ],
      beneficios: [
        "Instalación por personal certificado y experimentado",
        "Cumplimiento de estándares internacionales de seguridad",
        "Garantía de calidad en todos los trabajos realizados",
        "Soporte técnico durante la puesta en marcha"
      ]
    },
    {
      id: "mantenimiento",
      title: "Mantenimiento Preventivo y Correctivo",
      icon: "⚙️",
      description: "Ofrecemos programas de mantenimiento preventivo y correctivo para maximizar la vida útil de sus equipos.",
      detalles: "Nuestros técnicos certificados realizan inspecciones regulares y servicios programados adaptados a sus necesidades específicas, previniendo costosas interrupciones operativas.",
      proceso: [
        "Inspección técnica completa de equipos y sistemas",
        "Mantenimiento preventivo según cronograma establecido",
        "Atención de emergencias y reparaciones correctivas",
        "Elaboración de reportes técnicos y recomendaciones"
      ],
      beneficios: [
        "Máxima disponibilidad operativa de sus equipos",
        "Reducción significativa de costos de reparación",
        "Extensión de la vida útil de la inversión",
        "Respuesta rápida ante emergencias técnicas"
      ]
    },
    {
      id: "capacitacion",
      title: "Capacitación y Entrenamiento",
      icon: "📚",
      description: "Programas de capacitación integral para el personal operativo y técnico de su empresa.",
      detalles: "Nuestros especialistas brindan entrenamiento teórico y práctico sobre operación, mantenimiento básico y mejores prácticas para optimizar el rendimiento de sus sistemas.",
      proceso: [
        "Evaluación de necesidades de capacitación",
        "Desarrollo de programa de entrenamiento personalizado",
        "Sesiones teóricas y prácticas en sitio",
        "Evaluación y certificación del personal"
      ],
      beneficios: [
        "Personal altamente capacitado y certificado",
        "Operación eficiente y segura de los equipos",
        "Reducción de errores operativos",
        "Autonomía en mantenimiento básico"
      ]
    },
    {
      id: "soporte-postventa",
      title: "Soporte Post-Venta",
      icon: "🛠️",
      description: "Servicio de soporte técnico continuo para garantizar el óptimo funcionamiento de su inversión.",
      detalles: "Ofrecemos asistencia técnica telefónica, suministro de repuestos originales y actualizaciones tecnológicas para mantener sus sistemas siempre actualizados y funcionando al máximo rendimiento.",
      proceso: [
        "Registro del equipo en nuestro sistema de soporte",
        "Monitoreo remoto y asistencia técnica",
        "Suministro de repuestos y actualizaciones",
        "Soporte técnico especializado 24/7"
      ],
      beneficios: [
        "Tranquilidad y respaldo permanente",
        "Acceso garantizado a repuestos originales",
        "Actualizaciones tecnológicas disponibles",
        "Soporte técnico especializado cuando lo necesite"
      ]
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
              <span className="text-almatec-yellow">Servicios</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl text-gray-200 max-w-3xl">
              Soluciones integrales para optimizar su producción agrícola
            </p>
          </div>
        </div>
      </section>

      {/* Servicios Principales */}
      <section className="py-20 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              Nuestros Servicios
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ofrecemos un servicio integral que abarca desde la asesoría inicial hasta el soporte post-venta, 
              garantizando el éxito de su proyecto agrícola.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {servicios.map((servicio, index) => (
                <AccordionItem key={servicio.id} value={servicio.id} className="border border-gray-200 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-almatec-yellow rounded-full flex items-center justify-center text-2xl">
                        {servicio.icon}
                      </div>
                      <div>
                        <h3 className="font-montserrat font-semibold text-xl text-almatec-dark-gray">
                          {servicio.title}
                        </h3>
                        <p className="font-open-sans text-gray-600 mt-1">
                          {servicio.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <p className="font-open-sans text-gray-700 leading-relaxed">
                        {servicio.detalles}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-montserrat font-semibold text-almatec-dark-gray mb-3">
                            Proceso de Trabajo:
                          </h4>
                          <ol className="space-y-2">
                            {servicio.proceso.map((paso, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <span className="bg-almatec-yellow text-almatec-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="font-open-sans text-gray-700 text-sm">
                                  {paso}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        
                        <div>
                          <h4 className="font-montserrat font-semibold text-almatec-dark-gray mb-3">
                            Beneficios Clave:
                          </h4>
                          <ul className="space-y-2">
                            {servicio.beneficios.map((beneficio, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <span className="text-almatec-yellow text-lg">✓</span>
                                <span className="font-open-sans text-gray-700 text-sm">
                                  {beneficio}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Proceso General de Trabajo */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Un enfoque estructurado para garantizar el éxito de su proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Paso 1: Asesoría Inicial */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🤝</span>
                </div>
                <CardTitle className="font-montserrat text-almatec-dark-gray text-xl tracking-wide">Asesoría Inicial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed">
                  Entendemos sus necesidades y objetivos para ofrecerle la mejor solución.
                </p>
              </CardContent>
            </Card>

            {/* Paso 2: Diseño y Planificación */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📐</span>
                </div>
                <CardTitle className="font-montserrat text-almatec-dark-gray text-xl tracking-wide">Diseño y Planificación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed">
                  Creamos un plan detallado que se ajusta a sus requerimientos y presupuesto.
                </p>
              </CardContent>
            </Card>

            {/* Paso 3: Implementación */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🛠️</span>
                </div>
                <CardTitle className="font-montserrat text-almatec-dark-gray text-xl tracking-wide">Implementación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed">
                  Nuestro equipo experto se encarga de la instalación y puesta en marcha de su sistema.
                </p>
              </CardContent>
            </Card>

            {/* Paso 4: Soporte Continuo */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📞</span>
                </div>
                <CardTitle className="font-montserrat text-almatec-dark-gray text-xl tracking-wide">Soporte Continuo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed">
                  Ofrecemos mantenimiento y soporte técnico para asegurar el óptimo rendimiento a largo plazo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulario de Solicitud de Cotización */}
      <section className="py-20 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              Solicite una Cotización
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Complete nuestro formulario detallado para recibir una cotización personalizada 
              de nuestros productos y servicios.
            </p>
          </div>

          <QuoteForm />
        </div>
      </section>

      {/* CTA de Contacto */}
      <section className="py-20 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-8 tracking-wide">
            ¿Listo para Transformar su Producción Agrícola?
          </h2>
          <p className="font-open-sans text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Contáctenos hoy mismo para descubrir cómo nuestras soluciones pueden optimizar su operación 
            y aumentar su rentabilidad.
          </p>
          <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
            <Link to="/contacto">Contactar Ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Servicios;
