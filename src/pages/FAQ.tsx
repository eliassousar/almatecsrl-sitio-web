import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/seo/SEO';

const FAQ = () => {
  const faqs = [
    {
      category: "Silos GSI",
      questions: [
        {
          q: "¿Qué capacidades de silos GSI tienen disponibles?",
          a: "Ofrecemos silos GSI desde 100 toneladas hasta 20,000 toneladas de capacidad. Contamos con opciones comerciales y de granja para satisfacer diferentes necesidades de almacenamiento."
        },
        {
          q: "¿Cuánto tiempo toma la instalación de un silo GSI?",
          a: "El tiempo de instalación varía según el tamaño y complejidad del proyecto. Un silo pequeño puede instalarse en 1-2 semanas, mientras que proyectos más grandes pueden tomar 4-8 semanas. Proporcionamos cronogramas detallados con cada cotización."
        },
        {
          q: "¿Los silos GSI incluyen sistemas de ventilación?",
          a: "Sí, todos nuestros silos GSI incluyen sistemas de aireación diseñados específicamente para cada aplicación. Esto garantiza la conservación óptima de los granos almacenados."
        }
      ]
    },
    {
      category: "Servicios",
      questions: [
        {
          q: "¿Ofrecen servicio de mantenimiento?",
          a: "Sí, ofrecemos programas completos de mantenimiento preventivo y correctivo. Nuestros técnicos certificados realizan inspecciones regulares y servicios programados para maximizar la vida útil de sus equipos."
        },
        {
          q: "¿Qué incluye el servicio de asesoría técnica?",
          a: "Nuestro servicio de asesoría incluye evaluación de necesidades, análisis de sitio, diseño de soluciones personalizadas, estudios de viabilidad y recomendaciones técnicas específicas para su operación."
        },
        {
          q: "¿Brindan capacitación al personal?",
          a: "Sí, incluimos capacitación operativa básica con cada instalación. También ofrecemos programas de capacitación avanzada y certificación para el manejo óptimo de los equipos."
        }
      ]
    },
    {
      category: "Proceso de Compra",
      questions: [
        {
          q: "¿Cómo solicito una cotización?",
          a: "Puede solicitar una cotización completando nuestro formulario online, llamándonos directamente o contactándonos por WhatsApp. Necesitaremos información sobre su proyecto, ubicación y requerimientos específicos."
        },
        {
          q: "¿Cuánto tiempo toma recibir una cotización?",
          a: "Normalmente proporcionamos cotizaciones preliminares en 24-48 horas. Para proyectos complejos que requieren ingeniería detallada, puede tomar 3-5 días hábiles."
        },
        {
          q: "¿Ofrecen financiamiento?",
          a: "Trabajamos con diferentes instituciones financieras para ofrecer opciones de financiamiento a nuestros clientes. Consulte con nuestro equipo comercial sobre las opciones disponibles."
        }
      ]
    },
    {
      category: "Soporte Técnico",
      questions: [
        {
          q: "¿Cómo contacto al soporte técnico?",
          a: "Nuestro soporte técnico está disponible de lunes a viernes de 8:00 a 18:00 y sábados de 8:00 a 12:00. Puede contactarnos por teléfono, WhatsApp o email para asistencia inmediata."
        },
        {
          q: "¿Tienen repuestos disponibles?",
          a: "Mantenemos un inventario de repuestos originales GSI para los componentes más comunes. Para piezas especializadas, coordinamos la importación directa desde el fabricante."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-almatec-black">
      <SEO 
        title="Preguntas Frecuentes"
        description="Respuestas a las consultas más comunes sobre silos GSI, servicios de instalación, mantenimiento y proceso de compra en Almatec SRL."
        url="https://almatecsrl-sitio-web.lovable.app/faq"
        keywords="preguntas frecuentes silos, FAQ Almatec, dudas silos GSI, consultas agroindustriales"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-6 lg:mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4 h-12">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-montserrat font-bold text-almatec-dark-gray mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Encuentre respuestas a las consultas más comunes sobre nuestros productos y servicios
          </p>
        </div>

        <div className="max-w-4xl space-y-8">
          {faqs.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl text-almatec-dark-gray">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${index}-${faqIndex}`}
                      className="border border-gray-200 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left font-medium text-almatec-dark-gray hover:text-almatec-yellow">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed pt-2">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mt-8 bg-almatec-yellow/10">
          <CardContent className="p-6">
            <h2 className="text-xl font-montserrat font-semibold text-almatec-dark-gray mb-4">
              ¿No encontró lo que buscaba?
            </h2>
            <p className="text-gray-700 mb-6">
              Nuestro equipo está listo para responder cualquier consulta específica sobre nuestros productos y servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contacto" className="flex-1">
                <Button className="w-full h-12 bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar Consulta
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
