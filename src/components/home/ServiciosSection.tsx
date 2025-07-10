
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Users, Clock, Award } from "lucide-react";

const ServiciosSection = () => {
  const servicios = [
    {
      icon: Wrench,
      title: "Instalación Especializada",
      description: "Equipo técnico especializado para la instalación profesional de todos nuestros equipos."
    },
    {
      icon: Users,
      title: "Soporte Técnico",
      description: "Atención personalizada y soporte técnico continuo para garantizar el óptimo funcionamiento."
    },
    {
      icon: Clock,
      title: "Mantenimiento Preventivo",
      description: "Programas de mantenimiento preventivo para maximizar la vida útil de sus equipos."
    },
    {
      icon: Award,
      title: "Garantía Extendida",
      description: "Respaldo completo con garantías extendidas y repuestos originales disponibles."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-almatec-blue mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos servicios integrales para acompañarte en cada etapa de tu proyecto
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.map((servicio, index) => {
            const IconComponent = servicio.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-almatec-blue" />
                  </div>
                  <CardTitle className="text-almatec-blue">{servicio.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{servicio.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiciosSection;
