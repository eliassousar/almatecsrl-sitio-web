import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Wrench, Settings, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/forms/QuoteForm';

const servicios = [
  {
    title: "Instalación de Silos GSI",
    description: "Montaje profesional de silos de almacenamiento GSI, garantizando la correcta instalación y funcionamiento.",
    icon: Wrench,
    details: [
      "Inspección del sitio y preparación del terreno",
      "Montaje de la estructura del silo",
      "Instalación de sistemas de ventilación y control de temperatura",
      "Pruebas y puesta en marcha"
    ]
  },
  {
    title: "Mantenimiento Preventivo",
    description: "Programas de mantenimiento para asegurar la durabilidad y eficiencia de sus silos y equipos.",
    icon: CheckCircle,
    details: [
      "Inspecciones periódicas",
      "Ajuste y lubricación de componentes",
      "Revisión de sistemas eléctricos y mecánicos",
      "Limpieza y desinfección"
    ]
  },
  {
    title: "Servicios de Ingeniería",
    description: "Diseño y optimización de sistemas de almacenamiento y manejo de granos, adaptados a sus necesidades.",
    icon: Settings,
    details: [
      "Análisis de capacidad y flujo de granos",
      "Diseño de layouts de plantas",
      "Selección de equipos y componentes",
      "Elaboración de planos y especificaciones técnicas"
    ]
  },
  {
    title: "Asesoramiento Técnico",
    description: "Consultoría especializada para la gestión eficiente de sus operaciones agroindustriales.",
    icon: Users,
    details: [
      "Análisis de procesos y optimización de recursos",
      "Capacitación de personal",
      "Implementación de buenas prácticas agroindustriales",
      "Soporte técnico continuo"
    ]
  }
];

const features = [
  {
    title: "Tecnología de Vanguardia",
    description: "Utilizamos equipos y software de última generación para garantizar la precisión y eficiencia en todos nuestros servicios.",
    icon: Star
  },
  {
    title: "Equipo Especializado",
    description: "Contamos con un equipo de ingenieros y técnicos altamente capacitados y con amplia experiencia en el sector.",
    icon: Wrench
  },
  {
    title: "Atención Personalizada",
    description: "Nos adaptamos a las necesidades específicas de cada cliente, ofreciendo soluciones a medida y un servicio cercano.",
    icon: Users
  },
  {
    title: "Garantía de Calidad",
    description: "Todos nuestros servicios están respaldados por una garantía de satisfacción, asegurando la calidad y durabilidad.",
    icon: CheckCircle
  }
];

const Servicios = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <section className="bg-almatec-black py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-montserrat font-bold text-5xl text-almatec-white mb-6 tracking-wide">
            Nuestros Servicios
          </h1>
          <p className="font-open-sans text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos una amplia gama de servicios para optimizar sus operaciones agroindustriales, desde la instalación de silos hasta el asesoramiento técnico especializado.
          </p>
        </div>
      </section>

      {/* Servicios Principales */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-almatec-dark-gray mb-6 tracking-wide">
              Servicios Destacados
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conozca nuestros servicios principales y cómo podemos ayudarle a mejorar su productividad y rentabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicios.map((servicio, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl font-montserrat text-almatec-dark-gray flex items-center gap-2">
                    <servicio.icon className="w-5 h-5 mr-2" />
                    {servicio.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 font-open-sans leading-relaxed">
                    {servicio.description}
                  </CardDescription>
                  <ul className="list-disc pl-5 mt-4 text-gray-600 font-open-sans">
                    {servicio.details.map((detail, i) => (
                      <li key={i} className="text-sm">{detail}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-almatec-dark-gray mb-6 tracking-wide">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Le acompañamos en cada etapa de su proyecto, desde la planificación hasta la puesta en marcha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-almatec-black">
                1
              </div>
              <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2 text-xl">
                Análisis y Planificación
              </h3>
              <p className="font-open-sans text-gray-600 leading-relaxed">
                Evaluamos sus necesidades y diseñamos una solución a medida.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-almatec-black">
                2
              </div>
              <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2 text-xl">
                Implementación
              </h3>
              <p className="font-open-sans text-gray-600 leading-relaxed">
                Llevamos a cabo la instalación y configuración de los equipos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-almatec-black">
                3
              </div>
              <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2 text-xl">
                Soporte y Mantenimiento
              </h3>
              <p className="font-open-sans text-gray-600 leading-relaxed">
                Ofrecemos un servicio de soporte técnico y mantenimiento continuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-almatec-dark-gray mb-6 tracking-wide">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra las ventajas de trabajar con un equipo de expertos comprometidos con su éxito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-almatec-black">
                  <feature.icon />
                </div>
                <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2 text-xl">{feature.title}</h3>
                <p className="font-open-sans text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contacto */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-4xl text-almatec-dark-gray mb-4">
                Solicite una Cotización
              </h2>
              <p className="font-open-sans text-xl text-gray-600">
                Complete el formulario y nuestros especialistas le proporcionarán una propuesta personalizada
              </p>
            </div>
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <QuoteForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicios;
