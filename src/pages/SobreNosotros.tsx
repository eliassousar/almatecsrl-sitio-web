import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SobreNosotros = () => {
  const valores = [
    {
      title: "Excelencia técnica",
      description: "Nos comprometemos con los más altos estándares de calidad en cada proyecto que emprendemos",
      icon: "🏆"
    },
    {
      title: "Innovación constante",
      description: "Buscamos continuamente nuevas tecnologías y métodos para mejorar nuestras soluciones",
      icon: "💡"
    },
    {
      title: "Integridad",
      description: "Actuamos con honestidad y transparencia en todas nuestras relaciones comerciales",
      icon: "🤝"
    },
    {
      title: "Compromiso con el cliente",
      description: "El éxito de nuestros clientes es nuestra principal motivación y medida de logro",
      icon: "🎯"
    },
    {
      title: "Experiencia comprobada",
      description: "Más de dos décadas de trayectoria exitosa en el mercado agrícola boliviano",
      icon: "📈"
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
            backgroundImage: "url('/lovable-uploads/a39e2e59-574f-4889-b4cd-42efd1e10346.png')"
          }}
        ></div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight tracking-wide">
              Sobre 
              <span className="text-almatec-yellow"> Almatec SRL</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
              Líderes en soluciones agrícolas con más de una década de experiencia en el mercado boliviano
            </p>
          </div>
        </div>
      </section>

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
                  Almatec SRL es una empresa boliviana —con base operativa en Santa Cruz y cobertura en los nueve departamentos del país— dedicada a suministrar soluciones llave en mano para la poscosecha de granos. Desde hace más de dos décadas somos representantes oficiales de GSI® Grain Systems, líder mundial en almacenamiento, secado y manejo de granos, una alianza que nos permite acercar a los productores locales tecnología probada a escala global.
                </p>
                <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  Integramos todos los eslabones críticos del proceso: estudios de suelo, obra civil, montajes eléctricos, instalación de silos metálicos, secadoras de flujo continuo, cintas y elevadores, además de sistemas de monitoreo de temperatura e inventario. Cada proyecto se dimensiona según el cultivo y los planes de crecimiento del cliente, garantizando compatibilidad entre equipos y máxima eficiencia operativa.
                </p>
                <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  Hoy, Almatec SRL se enorgullece de haber contribuido al desarrollo de la infraestructura agrícola nacional, con proyectos implementados en los principales centros productivos del país, mejorando la capacidad de almacenamiento y la eficiencia operativa de nuestros clientes.
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
                  <span className="text-4xl">🎯</span>
                </div>
                <CardTitle className="font-montserrat text-3xl text-almatec-dark-gray tracking-wide">Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed text-center text-lg">
                  Proporcionar soluciones agrícolas integrales y de alta calidad que impulsen la 
                  productividad y rentabilidad de nuestros clientes, contribuyendo al desarrollo 
                  sostenible del sector agroindustrial boliviano.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🔭</span>
                </div>
                <CardTitle className="font-montserrat text-3xl text-almatec-dark-gray tracking-wide">Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed text-center text-lg">
                  Ser reconocidos como el socio estratégico preferido en soluciones de almacenamiento 
                  y procesamiento agrícola en Bolivia, destacándonos por la excelencia técnica, 
                  innovación y compromiso con el éxito de nuestros clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">{valor.icon}</span>
                  </div>
                  <CardTitle className="font-montserrat text-almatec-dark-gray text-xl tracking-wide">{valor.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-open-sans text-gray-600 leading-relaxed">{valor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alianzas Estratégicas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              Alianzas Estratégicas
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trabajamos con los mejores para ofrecer soluciones de calidad mundial
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="text-center shadow-xl">
              <CardHeader className="pb-8">
                <div className="w-32 h-32 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="font-montserrat font-bold text-almatec-black text-4xl">GSI</span>
                </div>
                <CardTitle className="font-montserrat text-3xl text-almatec-dark-gray tracking-wide">
                  Representantes Oficiales de GSI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-xl text-gray-600 mb-8 leading-relaxed">
                  Como representantes oficiales de GSI en Bolivia, ofrecemos acceso a la tecnología 
                  líder mundial en sistemas de almacenamiento de granos, respaldados por más de 40 años 
                  de innovación y excelencia en la industria. GSI es sinónimo de calidad, durabilidad 
                  y eficiencia en soluciones de almacenamiento agrícola.
                </p>
                <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                  <Link to="/productos">Ver Productos GSI</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-8 tracking-wide">
            ¿Quiere Conocer Más Sobre Nosotros?
          </h2>
          <p className="font-open-sans text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Contáctenos para conocer cómo podemos ayudarle a implementar las mejores 
            soluciones agrícolas para su proyecto.
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
