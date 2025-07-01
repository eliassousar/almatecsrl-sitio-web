
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from 'react-router-dom';

const Productos = () => {
  const [activeCategory, setActiveCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos los Productos' },
    { id: 'silos', name: 'Silos GSI' },
    { id: 'secado', name: 'Sistemas de Secado' },
    { id: 'transporte', name: 'Sistemas de Transporte' },
    { id: 'accesorios', name: 'Accesorios y Complementos' }
  ];

  const productos = [
    {
      id: 1,
      name: "Silo GSI Serie 5000",
      category: "silos",
      description: "Silo de almacenamiento de granos de alta capacidad con sistema de ventilación avanzado",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      specs: ["Capacidad: 5,000 ton", "Diámetro: 18.29 m", "Altura: 25 m"]
    },
    {
      id: 2,
      name: "Silo GSI Serie 3000",
      category: "silos",
      description: "Solución intermedia ideal para cooperativas y medianos productores",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      specs: ["Capacidad: 3,000 ton", "Diámetro: 15.24 m", "Altura: 22 m"]
    },
    {
      id: 3,
      name: "Sistema de Secado Continuo",
      category: "secado",
      description: "Equipo de secado de alta eficiencia para procesamiento continuo de granos",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      specs: ["Capacidad: 100 ton/h", "Eficiencia: 95%", "Combustible: GLP/GN"]
    },
    {
      id: 4,
      name: "Transportador de Cadena",
      category: "transporte",
      description: "Sistema de transporte de granos de alta resistencia y durabilidad",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      specs: ["Capacidad: 200 ton/h", "Longitud: Variable", "Material: Acero"]
    },
    {
      id: 5,
      name: "Elevador de Cangilones",
      category: "transporte",
      description: "Elevador vertical para manejo eficiente de granos a gran altura",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      specs: ["Capacidad: 300 ton/h", "Altura: Hasta 50 m", "Tipo: Centrifugo"]
    },
    {
      id: 6,
      name: "Sistema de Monitoreo Digital",
      category: "accesorios",
      description: "Tecnología IoT para monitoreo remoto de temperatura y humedad",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      specs: ["Sensores: 16 puntos", "Conectividad: WiFi/4G", "Alertas: SMS/Email"]
    }
  ];

  const productosDestacados = productos.filter(producto => producto.featured);

  const productosFiltrados = activeCategory === 'todos' 
    ? productos 
    : productos.filter(producto => producto.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-almatec-dark-gray to-almatec-black text-almatec-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')"
          }}
        ></div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Productos y 
              <span className="text-almatec-yellow"> Soluciones</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl text-gray-200 max-w-3xl">
              Descubre nuestra línea completa de productos GSI y soluciones agrícolas de vanguardia
            </p>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Productos Destacados
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestras soluciones más populares y confiables del mercado
            </p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {productosDestacados.map((producto) => (
                <CarouselItem key={producto.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <AspectRatio ratio={16 / 10}>
                        <img 
                          src={producto.image}
                          alt={producto.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </AspectRatio>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-almatec-yellow text-almatec-black font-medium">Destacado</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <h3 className="font-montserrat font-semibold text-almatec-dark-gray text-xl mb-2">
                        {producto.name}
                      </h3>
                      <p className="font-open-sans text-gray-600 mb-4 line-clamp-2">
                        {producto.description}
                      </p>
                      <div className="space-y-1 mb-4">
                        {producto.specs.map((spec, index) => (
                          <p key={index} className="font-open-sans text-sm text-gray-500">• {spec}</p>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow">
                        Ver Detalles
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

      {/* Sistema de Filtrado */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Catálogo Completo
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Explora toda nuestra gama de productos organizados por categorías
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id
                    ? 'bg-almatec-yellow text-almatec-black hover:bg-almatec-yellow/90'
                    : 'hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow'
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map((producto) => (
              <Card key={producto.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 10}>
                    <img 
                      src={producto.image}
                      alt={producto.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </AspectRatio>
                  {producto.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-almatec-yellow text-almatec-black font-medium">★</Badge>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-montserrat font-semibold text-almatec-dark-gray text-lg">
                      {producto.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {categories.find(cat => cat.id === producto.category)?.name.replace('Sistemas de ', '')}
                    </Badge>
                  </div>
                  <p className="font-open-sans text-gray-600 mb-4 text-sm line-clamp-2">
                    {producto.description}
                  </p>
                  <div className="space-y-1 mb-4">
                    {producto.specs.slice(0, 2).map((spec, index) => (
                      <p key={index} className="font-open-sans text-xs text-gray-500">• {spec}</p>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow">
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
            ¿Necesita Asesoría Técnica?
          </h2>
          <p className="font-open-sans text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestros especialistas están listos para ayudarle a elegir la solución perfecta 
            para sus necesidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
              <Link to="/contacto">Solicitar Cotización</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-almatec-white text-almatec-white hover:bg-almatec-white hover:text-almatec-black">
              <Link to="/servicios">Ver Servicios</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Productos;
