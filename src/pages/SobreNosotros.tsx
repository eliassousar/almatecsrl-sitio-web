import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Lightbulb, Shield, Target, TrendingUp, Crosshair, Telescope } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ModernPageHero from '@/components/modern-page-hero';
import UpcomingFairs from '@/components/about/UpcomingFairs';
const SobreNosotros = () => {
  const valores = [
    {
      title: "Excelencia técnica",
      description: "Nos comprometemos con los más altos estándares de calidad en cada proyecto que emprendemos",
      icon: Award
    },
    {
      title: "Innovación constante", 
      description: "Buscamos continuamente nuevas tecnologías y métodos para mejorar nuestras soluciones",
      icon: Lightbulb
    },
    {
      title: "Integridad",
      description: "Actuamos con honestidad y transparencia en todas nuestras relaciones comerciales",
      icon: Shield
    },
    {
      title: "Compromiso con el cliente",
      description: "El éxito de nuestros clientes es nuestra principal motivación y medida de logro",
      icon: Target
    },
    {
      title: "Experiencia comprobada",
      description: "Más de dos décadas de trayectoria exitosa en el mercado agroindustrial boliviano",
      icon: TrendingUp
    }
  ];

  const representantes = [
    {
      name: "GSI",
      logo: "/lovable-uploads/08c05001-4d71-4d61-80a1-eff7e7909dea.png"
    },
    {
      name: "SAUR",
      logo: "/lovable-uploads/bdef7309-ce39-4cc0-b493-973bd897e31c.png"
    },
    {
      name: "COIMMA", 
      logo: "/lovable-uploads/20b0ade2-f758-4313-9202-802e946a8e9c.png"
    },
    {
      name: "PROCER",
      logo: "/lovable-uploads/bee243ee-4597-4039-8345-521424ab163b.png"
    },
    {
      name: "Marca 5",
      logo: "/lovable-uploads/marca5-logo.png" // Placeholder path - will need actual logo
    },
    {
      name: "Marca 6",
      logo: "/lovable-uploads/marca6-logo.png" // Placeholder path - will need actual logo
    }
  ];

  return (
    <div className="min-h-screen bg-almatec-black">
      <ModernPageHero 
        title="Conoce a tu próximo socio estratégico que impulsará la productividad y rentabilidad de tu agroindustria."
      />

      {/* Nuestra Historia */}
      <section className="py-20 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-8 tracking-wide">
                Nuestra Historia
              </h2>
              <div className="space-y-8">
                <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  Somos una empresa boliviana con base operativa en Santa Cruz de la Sierra y cobertura en los nueve departamentos del país. Dedicada a suministrar soluciones llave en mano para la poscosecha de granos.
                </p>
                <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  Desde hace más de dos décadas somos representantes oficiales de GSI® Grain Systems, líder mundial en almacenamiento, secado y manejo de granos, una alianza que nos permite acercar a los productores locales tecnología probada a escala global.
                </p>
                <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  Integramos todos los eslabones críticos del proceso: estudios de suelo, obra civil, montajes eléctricos, instalación de silos metálicos, secadoras de flujo continuo, cintas y elevadores, además de sistemas de monitoreo de temperatura e inventario. Cada proyecto se dimensiona según el cultivo y los planes de crecimiento del cliente, garantizando compatibilidad entre equipos y máxima eficiencia operativa.
                </p>
                <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  Hoy, Almatec SRL se enorgullece de haber contribuido al desarrollo de la infraestructura agroindustrial nacional, con proyectos implementados en los principales centros productivos del país, mejorando la capacidad de almacenamiento y la eficiencia operativa de nuestros clientes.
                </p>
              </div>
            </div>
            <div>
              <AspectRatio ratio={4 / 3}>
                <img 
                  src="/lovable-uploads/fa89e05e-4726-4a5f-b6e4-d2eee416394a.png" 
                  alt="Historia de Almatec"
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <Crosshair className="w-10 h-10 text-almatec-dark-gray" />
                </div>
                <CardTitle className="font-montserrat text-3xl text-almatec-dark-gray tracking-wide">Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed text-center text-lg">
                  Proporcionar soluciones agroindustriales integrales y de alta calidad que impulsen la 
                  productividad y rentabilidad de nuestros clientes, contribuyendo al desarrollo 
                  sostenible del sector agroindustrial boliviano.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <Telescope className="w-10 h-10 text-almatec-dark-gray" />
                </div>
                <CardTitle className="font-montserrat text-3xl text-almatec-dark-gray tracking-wide">Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed text-center text-lg">
                  Ser reconocidos como el socio estratégico preferido en soluciones de almacenamiento 
                  y procesamiento agroindustrial en Bolivia, destacándonos por la excelencia técnica, 
                  innovación y compromiso con el éxito de nuestros clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nuestros Valores - Carrusel Mejorado */}
      <section className="py-20 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              Nuestros Valores
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Los principios que guían nuestro trabajo diario y definen nuestra cultura empresarial
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {valores.map((valor, index) => {
                  const IconComponent = valor.icon;
                  return (
                    <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <Card className="h-80 flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <CardHeader className="flex-shrink-0 text-center pb-4">
                          <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="w-8 h-8 text-almatec-dark-gray" />
                          </div>
                          <CardTitle className="font-montserrat text-almatec-dark-gray text-lg tracking-wide leading-tight">
                            {valor.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-center justify-center px-4">
                          <p className="font-open-sans text-gray-600 leading-relaxed text-center text-sm">
                            {valor.description}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Representantes para Bolivia */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              Representantes para Bolivia
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trabajamos con las mejores marcas mundiales
              <br />
              para ofrecer soluciones de calidad superior
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {representantes.map((representante, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-4">
                      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white h-32 flex items-center justify-center">
                        <CardContent className="flex items-center justify-center p-6 h-full w-full">
                          {representante.name === "GSI" ? (
                            <img 
                              src="/lovable-uploads/08c05001-4d71-4d61-80a1-eff7e7909dea.png" 
                              alt="GSI Logo"
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : representante.name === "SAUR" ? (
                            <img 
                              src="/lovable-uploads/bdef7309-ce39-4cc0-b493-973bd897e31c.png" 
                              alt="SAUR Logo"
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : representante.name === "COIMMA" ? (
                            <img 
                              src="/lovable-uploads/20b0ade2-f758-4313-9202-802e946a8e9c.png" 
                              alt="COIMMA Logo"
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : representante.name === "PROCER" ? (
                            <img 
                              src="/lovable-uploads/bee243ee-4597-4039-8345-521424ab163b.png" 
                              alt="PROCER Logo"
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                              <span className="text-gray-400 font-medium">{representante.name}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Upcoming Fairs Section */}
      <UpcomingFairs />

      {/* CTA Section */}
      <section className="py-20 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-8 tracking-wide">
            ¿Quiere Conocer Más Sobre Nosotros?
          </h2>
          <p className="font-open-sans text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Contáctenos para conocer cómo podemos ayudarle a implementar las mejores 
            soluciones agroindustriales para su proyecto.
          </p>
          <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
            <Link to="/contacto">Contactar Ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;
