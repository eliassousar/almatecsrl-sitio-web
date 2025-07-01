
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Home = () => {
  const solutions = [
    {
      title: "Silos GSI",
      description: "Sistemas de almacenamiento de granos de alta capacidad y durabilidad. Tecnología líder mundial.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      title: "Sistemas de Almacenamiento",
      description: "Soluciones integrales para el almacenamiento seguro y eficiente de productos agrícolas.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      title: "Equipos de Secado",
      description: "Tecnología avanzada para el secado óptimo de granos y cereales.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      title: "Sistemas de Transporte",
      description: "Equipos especializados para el manejo y transporte eficiente de granos.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ];

  const whyChooseUs = [
    {
      title: "Experiencia en Bolivia",
      description: "Años de experiencia en el mercado agrícola boliviano",
      icon: "🇧🇴"
    },
    {
      title: "Representantes Oficiales GSI",
      description: "Somos representantes oficiales de GSI en Bolivia",
      icon: "🏆"
    },
    {
      title: "Servicio Técnico Especializado",
      description: "Equipo técnico altamente capacitado y certificado",
      icon: "🔧"
    },
    {
      title: "Soluciones Personalizadas",
      description: "Adaptamos cada solución a las necesidades específicas",
      icon: "⚙️"
    }
  ];

  const featuredProjects = [
    {
      name: "Complejo Agroindustrial Santa Cruz",
      location: "Santa Cruz de la Sierra",
      description: "Instalación de 12 silos GSI de alta capacidad para almacenamiento de soja",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Centro de Acopio El Palmar",
      location: "Montero, Santa Cruz",
      description: "Sistema completo de secado y almacenamiento para cooperativa agrícola",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Proyecto Agropecuario Los Andes",
      location: "Cochabamba",
      description: "Implementación de sistema de transporte y almacenamiento de cereales",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-almatec-dark-gray to-almatec-black">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')"
                  }}
                ></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                  <div className="max-w-4xl text-almatec-white">
                    <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
                      Soluciones Agrícolas de 
                      <span className="text-almatec-yellow"> Alto Rendimiento</span>
                    </h1>
                    <p className="font-open-sans text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl">
                      Representantes oficiales de silos GSI en Bolivia. Potenciamos tu producción con equipos de calidad mundial.
                    </p>
                    <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
                      <Link to="/productos">Conozca Nuestras Soluciones</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-almatec-dark-gray to-almatec-black">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')"
                  }}
                ></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                  <div className="max-w-4xl text-almatec-white">
                    <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
                      Tecnología 
                      <span className="text-almatec-yellow"> GSI</span> en Bolivia
                    </h1>
                    <p className="font-open-sans text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl">
                      Líderes en sistemas de almacenamiento y manejo de granos con la confianza de la marca GSI.
                    </p>
                    <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
                      <Link to="/sobre-nosotros">Conocer Más</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Nuestras Soluciones */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Nuestras Soluciones
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos las mejores soluciones en almacenamiento y manejo de granos con tecnología GSI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow ${solution.featured ? 'ring-2 ring-almatec-yellow' : ''}`}>
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </AspectRatio>
                  <div className="p-6 pb-2">
                    <CardTitle className="font-montserrat text-almatec-dark-gray flex items-center gap-2">
                      {solution.title}
                      {solution.featured && <span className="text-almatec-yellow text-sm">★</span>}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {solution.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <Button asChild variant="outline" className="w-full hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow">
                    <Link to="/productos">Ver Más</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Somos su mejor aliado para implementar soluciones agrícolas de calidad mundial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  {item.icon}
                </div>
                <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-3 text-lg">{item.title}</h3>
                <p className="font-open-sans text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos Destacados */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Proyectos Destacados
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Algunos de nuestros proyectos más exitosos en el sector agrícola boliviano
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {featuredProjects.map((project, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <AspectRatio ratio={16 / 10}>
                        <img 
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </AspectRatio>
                    </CardHeader>
                    <CardContent className="p-6">
                      <h3 className="font-montserrat font-semibold text-almatec-dark-gray text-xl mb-2">{project.name}</h3>
                      <p className="font-open-sans text-almatec-yellow font-medium mb-3">{project.location}</p>
                      <p className="font-open-sans text-gray-600 mb-4">{project.description}</p>
                      <Button asChild variant="outline" className="w-full hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow">
                        <Link to="/proyectos">Ver Detalles</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="text-center mt-8">
            <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
              <Link to="/proyectos">Ver Todos los Proyectos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contáctenos Preview */}
      <section className="py-16 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
                ¿Listo para Potenciar su Producción?
              </h2>
              <p className="font-open-sans text-lg text-gray-300 mb-8 leading-relaxed">
                Contáctenos hoy mismo para conocer cómo nuestras soluciones GSI pueden optimizar 
                sus operaciones agrícolas y maximizar su rentabilidad.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <span className="text-almatec-yellow">📞</span>
                  <span className="font-open-sans">(+591) 3 326206</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-almatec-yellow">📧</span>
                  <span className="font-open-sans">edson_gsi@hotmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-almatec-yellow">📍</span>
                  <span className="font-open-sans">Santa Cruz de la Sierra, Bolivia</span>
                </div>
              </div>
              <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
                <Link to="/contacto">Contactar Ahora</Link>
              </Button>
            </div>
            <div>
              <AspectRatio ratio={4 / 3}>
                <img 
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Contacto Almatec"
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

export default Home;
