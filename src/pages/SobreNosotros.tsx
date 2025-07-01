
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SobreNosotros = () => {
  const valores = [
    {
      title: "Excelencia",
      description: "Compromiso con la calidad en cada proyecto",
      icon: "🏆"
    },
    {
      title: "Innovación",
      description: "Tecnología de vanguardia para el sector agrícola",
      icon: "💡"
    },
    {
      title: "Confiabilidad",
      description: "Respaldo y garantía en todas nuestras soluciones",
      icon: "🤝"
    },
    {
      title: "Compromiso",
      description: "Dedicación total al éxito de nuestros clientes",
      icon: "🎯"
    },
    {
      title: "Experiencia",
      description: "Años de trayectoria en el mercado boliviano",
      icon: "📈"
    },
    {
      title: "Sostenibilidad",
      description: "Soluciones respetuosas con el medio ambiente",
      icon: "🌱"
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
              Sobre 
              <span className="text-almatec-yellow"> Almatec SRL</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl text-gray-200 max-w-3xl">
              Líderes en soluciones agrícolas con más de una década de experiencia en el mercado boliviano
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-6">
                <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  Fundada con la visión de revolucionar el sector agrícola boliviano, Almatec SRL 
                  nació en 2010 como respuesta a la creciente demanda de soluciones tecnológicas 
                  avanzadas para el almacenamiento y manejo de granos en Bolivia.
                </p>
                <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  Desde nuestros inicios, hemos mantenido un compromiso firme con la excelencia, 
                  convirtiéndonos en representantes oficiales de GSI (Grain Systems Inc.), 
                  líder mundial en sistemas de almacenamiento de granos.
                </p>
                <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  A lo largo de más de una década, hemos implementado exitosamente cientos de 
                  proyectos en todo el territorio nacional, desde pequeñas cooperativas hasta 
                  grandes complejos agroindustriales.
                </p>
              </div>
            </div>
            <div>
              <AspectRatio ratio={4 / 3}>
                <img 
                  src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Historia de Almatec"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <CardTitle className="font-montserrat text-2xl text-almatec-dark-gray">Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed text-center">
                  Proporcionar soluciones integrales de almacenamiento y manejo de granos 
                  de la más alta calidad, utilizando tecnología GSI de vanguardia, para 
                  impulsar la productividad y rentabilidad del sector agrícola boliviano.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔭</span>
                </div>
                <CardTitle className="font-montserrat text-2xl text-almatec-dark-gray">Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-600 leading-relaxed text-center">
                  Ser la empresa líder en Bolivia en soluciones agrícolas innovadoras, 
                  reconocida por nuestra excelencia técnica, compromiso con la calidad 
                  y contribución al desarrollo sostenible del agro boliviano.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Nuestros Valores
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo diario y definen nuestra cultura empresarial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{valor.icon}</span>
                  </div>
                  <CardTitle className="font-montserrat text-almatec-dark-gray">{valor.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-open-sans text-gray-600">{valor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alianzas Estratégicas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Alianzas Estratégicas
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Trabajamos con los mejores para ofrecer soluciones de calidad mundial
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-montserrat font-bold text-almatec-black text-2xl">GSI</span>
                </div>
                <CardTitle className="font-montserrat text-2xl text-almatec-dark-gray">
                  Representantes Oficiales de GSI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-lg text-gray-600 mb-6 leading-relaxed">
                  Grain Systems Inc. (GSI) es líder mundial en sistemas de almacenamiento, 
                  secado y manejo de granos. Como representantes oficiales en Bolivia, 
                  garantizamos el acceso a la más avanzada tecnología y soporte técnico especializado.
                </p>
                <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
                  <Link to="/productos">Ver Productos GSI</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
            ¿Quiere Conocer Más Sobre Nosotros?
          </h2>
          <p className="font-open-sans text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contáctenos para conocer cómo podemos ayudarle a implementar las mejores 
            soluciones agrícolas para su proyecto.
          </p>
          <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
            <Link to="/contacto">Contactar Ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;
