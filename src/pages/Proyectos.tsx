import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from 'react-router-dom';

const Proyectos = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');

  const filtros = [
    { id: 'todos', nombre: 'Todos los Proyectos' },
    { id: 'silos', nombre: 'Silos de Almacenamiento' },
    { id: 'secado', nombre: 'Sistemas de Secado' },
    { id: 'integral', nombre: 'Soluciones Integrales' }
  ];

  const proyectos = [
    {
      id: 1,
      nombre: "Complejo Agroindustrial Santa Cruz",
      ubicacion: "Santa Cruz de la Sierra",
      tipo: "integral",
      año: "2023",
      descripcion: "Instalación completa de 12 silos GSI con capacidad total de 60,000 toneladas, sistema de secado continuo y red de transporte automatizada para el procesamiento de soja y maíz.",
      imagen: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cliente: "Grupo Agroindustrial del Oriente",
      capacidad: "60,000 ton",
      duracion: "8 meses",
      destacado: true
    },
    {
      id: 2,
      nombre: "Centro de Acopio El Palmar",
      ubicacion: "Montero, Santa Cruz",
      tipo: "silos",
      año: "2023",
      descripcion: "Proyecto de 6 silos GSI de alta capacidad para cooperativa agroindustrial, incluyendo sistema de ventilación avanzado y monitoreo digital de temperatura y humedad.",
      imagen: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cliente: "Cooperativa El Palmar",
      capacidad: "24,000 ton",
      duracion: "5 meses",
      destacado: true
    },
    {
      id: 3,
      nombre: "Planta de Secado Los Andes",
      ubicacion: "Cochabamba",
      tipo: "secado",
      año: "2022",
      descripcion: "Implementación de sistema de secado continuo de alta eficiencia para procesamiento de quinoa y cereales andinos, adaptado a condiciones climáticas específicas.",
      imagen: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cliente: "Procesadora Andina SAM",
      capacidad: "200 ton/día",
      duracion: "3 meses",
      destacado: false
    },
    {
      id: 4,
      nombre: "Terminal de Granos Puerto Aguirre",
      ubicacion: "Puerto Aguirre, Santa Cruz",
      tipo: "integral",
      año: "2022",
      descripcion: "Desarrollo de terminal portuario con 20 silos de gran capacidad, sistema de carga rápida para barcazas y red de transporte pneumático para exportación de soja.",
      imagen: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cliente: "Terminal Portuaria del Este",
      capacidad: "150,000 ton",
      duracion: "12 meses",
      destacado: true
    },
    {
      id: 5,
      nombre: "Cooperativa San Juan",
      ubicacion: "San Juan de Yapacaní",
      tipo: "silos",
      año: "2021",
      descripcion: "Instalación de 4 silos medianos para cooperativa de pequeños productores, incluyendo capacitación técnica y programa de mantenimiento.",
      imagen: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cliente: "Cooperativa San Juan",
      capacidad: "8,000 ton",
      duracion: "3 meses",
      destacado: false
    },
    {
      id: 6,
      nombre: "Modernización Planta Warnes",
      ubicacion: "Warnes, Santa Cruz",
      tipo: "secado",
      año: "2021",
      descripcion: "Actualización completa de sistema de secado existente con tecnología GSI de última generación, mejorando eficiencia energética en 40%.",
      imagen: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cliente: "Industrias Warnes SRL",
      capacidad: "500 ton/día",
      duracion: "2 meses",
      destacado: false
    }
  ];

  const testimonios = [
    {
      nombre: "Carlos Mendoza",
      cargo: "Gerente General",
      empresa: "Grupo Agroindustrial del Oriente",
      testimonio: "Almatec transformó nuestras operaciones. La instalación fue impecable y el soporte técnico es excepcional. Incrementamos nuestra eficiencia en un 35%.",
      foto: "CM",
      proyecto: "Complejo Agroindustrial Santa Cruz"
    },
    {
      nombre: "María Rodriguez",
      cargo: "Presidenta",
      empresa: "Cooperativa El Palmar",
      testimonio: "El equipo de Almatec nos acompañó desde el diseño hasta la capacitación. Nuestros socios están muy satisfechos con los resultados obtenidos.",
      foto: "MR",
      proyecto: "Centro de Acopio El Palmar"
    },
    {
      nombre: "Roberto Silva",
      cargo: "Director de Operaciones",
      empresa: "Terminal Portuaria del Este",
      testimonio: "Un proyecto complejo ejecutado con profesionalismo excepcional. La tecnología GSI instalada por Almatec nos posicionó como líder regional.",
      foto: "RS",
      proyecto: "Terminal de Granos Puerto Aguirre"
    }
  ];

  const proyectosFiltrados = filtroActivo === 'todos' 
    ? proyectos 
    : proyectos.filter(proyecto => proyecto.tipo === filtroActivo);

  const proyectosDestacados = proyectos.filter(proyecto => proyecto.destacado);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-almatec-dark-gray to-almatec-black text-almatec-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')"
          }}
        ></div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Proyectos 
              <span className="text-almatec-yellow"> Realizados</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl text-gray-200 max-w-3xl">
              Conoce algunos de nuestros proyectos más exitosos en el sector agroindustrial boliviano
            </p>
          </div>
        </div>
      </section>

      {/* Estadísticas Rápidas */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-montserrat font-bold text-almatec-yellow mb-2">50+</div>
              <div className="font-open-sans text-gray-600">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-montserrat font-bold text-almatec-yellow mb-2">300K+</div>
              <div className="font-open-sans text-gray-600">Toneladas Instaladas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-montserrat font-bold text-almatec-yellow mb-2">+20</div>
              <div className="font-open-sans text-gray-600">Años de Experiencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos Destacados */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Proyectos Destacados
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestros proyectos más emblemáticos que demuestran nuestra capacidad y experiencia
            </p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {proyectosDestacados.map((proyecto) => (
                <CarouselItem key={proyecto.id} className="md:basis-1/2">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <AspectRatio ratio={16 / 10}>
                        <img 
                          src={proyecto.imagen}
                          alt={proyecto.nombre}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </AspectRatio>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-almatec-yellow text-almatec-black font-medium">Destacado</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/90">{proyecto.año}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <h3 className="font-montserrat font-semibold text-almatec-dark-gray text-xl mb-2">
                        {proyecto.nombre}
                      </h3>
                      <p className="font-open-sans text-almatec-yellow font-medium mb-3 flex items-center">
                        📍 {proyecto.ubicacion}
                      </p>
                      <p className="font-open-sans text-gray-600 mb-4 line-clamp-3">
                        {proyecto.descripcion}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-open-sans text-gray-500">Cliente:</span>
                          <p className="font-open-sans font-medium text-gray-700">{proyecto.cliente}</p>
                        </div>
                        <div>
                          <span className="font-open-sans text-gray-500">Capacidad:</span>
                          <p className="font-open-sans font-medium text-gray-700">{proyecto.capacidad}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow">
                        Ver Detalles del Proyecto
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Galería de Proyectos con Filtros */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Galería de Proyectos
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Explore todos nuestros proyectos organizados por tipo de solución implementada
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filtros.map((filtro) => (
              <Button
                key={filtro.id}
                variant={filtroActivo === filtro.id ? "default" : "outline"}
                onClick={() => setFiltroActivo(filtro.id)}
                className={`${
                  filtroActivo === filtro.id
                    ? 'bg-almatec-yellow text-almatec-black hover:bg-almatec-yellow/90'
                    : 'hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow'
                }`}
              >
                {filtro.nombre}
              </Button>
            ))}
          </div>

          {/* Grid de Proyectos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectosFiltrados.map((proyecto) => (
              <Card key={proyecto.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 10}>
                    <img 
                      src={proyecto.imagen}
                      alt={proyecto.nombre}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </AspectRatio>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90">{proyecto.año}</Badge>
                  </div>
                  {proyecto.destacado && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-almatec-yellow text-almatec-black font-medium">★</Badge>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-montserrat font-semibold text-almatec-dark-gray text-lg mb-2">
                    {proyecto.nombre}
                  </h3>
                  <p className="font-open-sans text-almatec-yellow font-medium mb-3 text-sm flex items-center">
                    📍 {proyecto.ubicacion}
                  </p>
                  <p className="font-open-sans text-gray-600 mb-4 text-sm line-clamp-2">
                    {proyecto.descripcion}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>Duración: {proyecto.duracion}</span>
                    <span>{proyecto.capacidad}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow">
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Testimonios reales de clientes satisfechos con nuestros proyectos
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonios.map((testimonio, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <span className="text-4xl text-almatec-yellow">"</span>
                      </div>
                      <p className="font-open-sans text-gray-700 leading-relaxed mb-6 italic">
                        {testimonio.testimonio}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-almatec-yellow rounded-full flex items-center justify-center">
                          <span className="font-montserrat font-bold text-almatec-black text-sm">{testimonio.foto}</span>
                        </div>
                        <div>
                          <p className="font-montserrat font-semibold text-almatec-dark-gray">{testimonio.nombre}</p>
                          <p className="font-open-sans text-sm text-gray-600">{testimonio.cargo}</p>
                          <p className="font-open-sans text-sm text-almatec-yellow">{testimonio.empresa}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="font-open-sans text-xs text-gray-500">
                          Proyecto: {testimonio.proyecto}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
            ¿Listo para su Próximo Proyecto?
          </h2>
          <p className="font-open-sans text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Permítanos ayudarle a desarrollar una solución a medida que transforme 
            sus operaciones agroindustriales como lo hemos hecho con nuestros clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
              <Link to="/contacto">Solicitar Cotización</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-almatec-white text-almatec-white hover:bg-almatec-white hover:text-almatec-black">
              <Link to="/productos">Ver Nuestros Productos</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Proyectos;
