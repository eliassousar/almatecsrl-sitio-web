import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ContactForm from '@/components/forms/ContactForm';

const Home = () => {
  const solutions = [
    {
      title: "Silos GSI",
      description: "Sistemas de almacenamiento de granos de alta capacidad con tecnología líder mundial, diseñados para maximizar la conservación y calidad de sus cosechas.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      title: "Sistemas de almacenamiento",
      description: "Soluciones integrales que incluyen silos, transportadores y sistemas de control para gestionar eficientemente sus operaciones agrícolas.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      title: "Equipos de secado",
      description: "Tecnología avanzada para el secado uniforme y eficiente de granos, preservando la calidad y reduciendo costos operativos.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      title: "Sistemas de transporte",
      description: "Equipos de transporte de granos que optimizan el flujo de material, reducen pérdidas y aumentan la eficiencia operativa.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ];

  const whyChooseUs = [
    {
      title: "Experiencia comprobada",
      description: "Más de una década brindando soluciones agrícolas de alta calidad en todo el territorio boliviano.",
      icon: "📅"
    },
    {
      title: "Tecnología GSI",
      description: "Somos distribuidores autorizados de GSI, líder mundial en soluciones de almacenamiento agrícola.",
      icon: "🏆"
    },
    {
      title: "Servicio técnico especializado",
      description: "Equipo de profesionales capacitados para brindar soporte técnico, mantenimiento y reparaciones.",
      icon: "🔧"
    },
    {
      title: "Soluciones a medida",
      description: "Diseñamos e implementamos sistemas adaptados a sus necesidades específicas y condiciones locales.",
      icon: "⚙️"
    }
  ];

  const featuredProjects = [
    {
      name: "Complejo de almacenamiento Santa Cruz",
      location: "Santa Cruz de la Sierra",
      description: "Sistema de almacenamiento de 15,000 toneladas con tecnología de control de temperatura y humedad para productor de soya.",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Centro de acopio Cochabamba",
      location: "Cochabamba",
      description: "Instalación de 6 silos GSI con capacidad total de 8,000 toneladas para cooperativa agrícola.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Complejo agroindustrial La Paz",
      location: "La Paz",
      description: "Sistema integrado de secado y almacenamiento para procesamiento de quinoa de exportación.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const clients = [
    {
      name: "ADM",
      logoUrl: "https://logo.clearbit.com/adm.com",
      alt: "ADM Logo"
    },
    {
      name: "Cargill",
      logoUrl: "https://logo.clearbit.com/cargill.com",
      alt: "Cargill Logo"
    },
    {
      name: "Agro Campo",
      logoUrl: "https://via.placeholder.com/160x96/f5f5f5/666666?text=Agro+Campo",
      alt: "Agro Campo Logo"
    },
    {
      name: "Coop. Colinas",
      logoUrl: "https://via.placeholder.com/160x96/f5f5f5/666666?text=Coop.+Colinas",
      alt: "Cooperativa Colinas Logo"
    },
    {
      name: "Grupo Hilagro",
      logoUrl: "https://via.placeholder.com/160x96/f5f5f5/666666?text=Grupo+Hilagro",
      alt: "Grupo Hilagro Logo"
    },
    {
      name: "Neuland Ltda.",
      logoUrl: "https://via.placeholder.com/160x96/f5f5f5/666666?text=Neuland+Ltda.",
      alt: "Neuland Ltda. Logo"
    },
    {
      name: "Cultivatto",
      logoUrl: "https://via.placeholder.com/160x96/f5f5f5/666666?text=Cultivatto",
      alt: "Cultivatto Logo"
    },
    {
      name: "Transagro",
      logoUrl: "https://via.placeholder.com/160x96/f5f5f5/666666?text=Transagro",
      alt: "Transagro Logo"
    },
    {
      name: "D'Italia S.A.",
      logoUrl: "https://via.placeholder.com/160x96/f5f5f5/666666?text=D%27Italia+S.A.",
      alt: "D'Italia S.A. Logo"
    },
    {
      name: "Raúl Peña Ltda.",
      logoUrl: "https://via.placeholder.com/160x96/f5f5f5/666666?text=Ra%C3%BAl+Pe%C3%B1a+Ltda.",
      alt: "Raúl Peña Ltda. Logo"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-almatec-dark-gray to-almatec-black">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/lovable-uploads/7a7c4c77-d016-4c07-8227-bedc452e90d8.png')"
                  }}
                ></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                  <div className="max-w-4xl text-almatec-white">
                    <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight tracking-wide">
                      Soluciones de almacenamiento agrícola de 
                      <span className="text-almatec-yellow"> clase mundial</span>
                    </h1>
                    <p className="font-open-sans text-lg mb-8 text-gray-300 max-w-3xl leading-relaxed">
                      Ofrecemos sistemas completos de almacenamiento, secado y manejo de granos con tecnología de vanguardia para maximizar la productividad de su operación agrícola.
                    </p>
                    <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
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
                    backgroundImage: "url('/lovable-uploads/7a7c4c77-d016-4c07-8227-bedc452e90d8.png')"
                  }}
                ></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                  <div className="max-w-4xl text-almatec-white">
                    <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight tracking-wide">
                      Tecnología 
                      <span className="text-almatec-yellow"> GSI</span> en Bolivia
                    </h1>
                    <p className="font-open-sans text-xl md:text-2xl mb-4 text-gray-200 max-w-3xl leading-relaxed">
                      Líderes en sistemas de almacenamiento y manejo de granos con la confianza de la marca GSI.
                    </p>
                    <p className="font-open-sans text-lg mb-8 text-gray-300 max-w-3xl leading-relaxed">
                      Más de una década de experiencia implementando soluciones agrícolas de clase mundial en todo el territorio nacional.
                    </p>
                    <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                      <Link to="/sobre-nosotros">Conocer Más</Link>
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
                    backgroundImage: "url('/lovable-uploads/7a7c4c77-d016-4c07-8227-bedc452e90d8.png')"
                  }}
                ></div>
                <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                  <div className="max-w-4xl text-almatec-white">
                    <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight tracking-wide">
                      Instalación completa de 
                      <span className="text-almatec-yellow"> silos GSI</span>
                    </h1>
                    <p className="font-open-sans text-xl md:text-2xl mb-4 text-gray-200 max-w-3xl leading-relaxed">
                      Equipo técnico especializado para la implementación de proyectos de gran escala.
                    </p>
                    <p className="font-open-sans text-lg mb-8 text-gray-300 max-w-3xl leading-relaxed">
                      Desde el diseño hasta la puesta en marcha, acompañamos cada etapa de su proyecto agrícola con profesionalismo y excelencia técnica.
                    </p>
                    <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                      <Link to="/servicios">Ver Servicios</Link>
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
      <section className="section-spacing bg-almatec-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              Nuestras Soluciones
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ofrecemos las mejores soluciones en almacenamiento y manejo de granos con tecnología GSI de clase mundial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className={`card-elegant ${solution.featured ? 'ring-2 ring-almatec-yellow shadow-lg' : ''}`}>
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </AspectRatio>
                  <div className="p-6 pb-2">
                    <CardTitle className="font-montserrat text-almatec-dark-gray flex items-center gap-2 text-xl mb-3">
                      {solution.title}
                      {solution.featured && <span className="text-almatec-yellow text-lg">★</span>}
                    </CardTitle>
                    <CardDescription className="font-open-sans text-gray-600 leading-relaxed">
                      {solution.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <Button asChild variant="outline" className="w-full hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow transition-all duration-300 font-montserrat">
                    <Link to="/productos">Ver Más</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Somos su mejor aliado para implementar soluciones agrícolas de calidad mundial en Bolivia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-24 h-24 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-6 text-4xl group-hover:bg-almatec-dark-gray transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-4 text-xl">{item.title}</h3>
                <p className="font-open-sans text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Clientes */}
      <section className="py-20 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              Nuestros Clientes
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empresas líderes del sector agrícola boliviano confían en nuestras soluciones GSI
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {clients.map((client, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <img
                  src={client.logoUrl}
                  alt={client.alt}
                  className="max-h-24 max-w-40 object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  aria-label={client.name}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="font-open-sans text-lg text-gray-600 mb-6">
              ¿Su empresa necesita soluciones de almacenamiento agrícola?
            </p>
            <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
              <Link to="/contacto">Únase a Nuestros Clientes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Proyectos Destacados */}
      <section className="py-20 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
              Proyectos Destacados
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Algunos de nuestros proyectos más exitosos en el sector agrícola boliviano
            </p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {featuredProjects.map((project, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader className="p-0">
                      <AspectRatio ratio={16 / 10}>
                        <img 
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </AspectRatio>
                    </CardHeader>
                    <CardContent className="p-8">
                      <h3 className="font-montserrat font-semibold text-almatec-dark-gray text-2xl mb-3">{project.name}</h3>
                      <p className="font-montserrat text-almatec-yellow font-medium mb-4 text-lg">{project.location}</p>
                      <p className="font-open-sans text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                      <Button asChild variant="outline" className="w-full hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow transition-all duration-300 font-montserrat">
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

          <div className="text-center mt-12">
            <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
              <Link to="/proyectos">Ver Todos los Proyectos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contacto Rápido */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div>
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-8 tracking-wide">
                ¿Listo para Potenciar su Producción?
              </h2>
              <p className="font-open-sans text-xl text-gray-600 mb-10 leading-relaxed">
                Contáctenos hoy mismo para conocer cómo nuestras soluciones GSI pueden optimizar 
                sus operaciones agrícolas y maximizar su rentabilidad.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-almatec-yellow rounded-full flex items-center justify-center">
                    <span className="text-almatec-black text-xl">📞</span>
                  </div>
                  <span className="font-open-sans text-lg">(+591) 77028610</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-almatec-yellow rounded-full flex items-center justify-center">
                    <span className="text-almatec-black text-xl">📧</span>
                  </div>
                  <span className="font-open-sans text-lg">edson_gsi@hotmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-almatec-yellow rounded-full flex items-center justify-center">
                    <span className="text-almatec-black text-xl">📍</span>
                  </div>
                  <span className="font-open-sans text-lg">Santa Cruz de la Sierra, Bolivia</span>
                </div>
              </div>
              <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                <Link to="/contacto">Ver Información Completa</Link>
              </Button>
            </div>
            
            <Card className="shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="font-montserrat text-3xl text-almatec-dark-gray tracking-wide">
                  Consulta Rápida
                </CardTitle>
                <CardDescription className="font-open-sans text-lg text-gray-600 leading-relaxed">
                  Envíenos su consulta y nos pondremos en contacto con usted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm variant="simple" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
