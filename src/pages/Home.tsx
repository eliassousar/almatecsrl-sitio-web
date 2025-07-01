
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-almatec-dark-gray to-almatec-black text-almatec-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')"
          }}
        ></div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Soluciones Agrícolas de 
              <span className="text-almatec-yellow"> Alto Rendimiento</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl">
              Especialistas en silos GSI y tecnología agrícola avanzada en Bolivia. 
              Potenciamos tu producción con equipos de calidad mundial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
                <Link to="/contacto">Contáctenos Hoy</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-almatec-white text-almatec-white hover:bg-almatec-white hover:text-almatec-black font-montserrat font-semibold">
                <Link to="/productos">Ver Productos</Link>
              </Button>
            </div>
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
              Ofrecemos las mejores soluciones en almacenamiento y manejo de granos con tecnología GSI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <AspectRatio ratio={16 / 9}>
                  <div className="w-full h-full bg-gradient-to-br from-almatec-yellow/20 to-almatec-yellow/10 rounded-t-lg flex items-center justify-center">
                    <span className="text-almatec-yellow text-4xl font-bold">GSI</span>
                  </div>
                </AspectRatio>
                <CardTitle className="font-montserrat text-almatec-dark-gray">Silos GSI</CardTitle>
                <CardDescription>
                  Sistemas de almacenamiento de granos de alta capacidad y durabilidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/productos">Ver Más</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <AspectRatio ratio={16 / 9}>
                  <div className="w-full h-full bg-gradient-to-br from-almatec-dark-gray/20 to-almatec-dark-gray/10 rounded-t-lg flex items-center justify-center">
                    <span className="text-almatec-dark-gray text-2xl font-bold">TECH</span>
                  </div>
                </AspectRatio>
                <CardTitle className="font-montserrat text-almatec-dark-gray">Tecnología Agrícola</CardTitle>
                <CardDescription>
                  Equipos modernos para optimizar procesos de producción agrícola
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/productos">Ver Más</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <AspectRatio ratio={16 / 9}>
                  <div className="w-full h-full bg-gradient-to-br from-almatec-yellow/20 to-almatec-dark-gray/10 rounded-t-lg flex items-center justify-center">
                    <span className="text-almatec-dark-gray text-2xl font-bold">SERVICE</span>
                  </div>
                </AspectRatio>
                <CardTitle className="font-montserrat text-almatec-dark-gray">Servicios Especializados</CardTitle>
                <CardDescription>
                  Instalación, mantenimiento y soporte técnico especializado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/servicios">Ver Más</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros Breve */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-6">
                Sobre Almatec SRL
              </h2>
              <p className="font-open-sans text-lg text-gray-600 mb-6 leading-relaxed">
                Con años de experiencia en el sector agrícola boliviano, somos representantes 
                oficiales de GSI (Grain Systems Inc.), líder mundial en sistemas de almacenamiento 
                y manejo de granos.
              </p>
              <p className="font-open-sans text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro compromiso es brindar soluciones integrales que mejoren la eficiencia 
                y rentabilidad de las operaciones agrícolas en Bolivia.
              </p>
              <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
                <Link to="/sobre-nosotros">Conocer Más</Link>
              </Button>
            </div>
            <div>
              <AspectRatio ratio={4 / 3}>
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                  alt="Campos agrícolas en Bolivia"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Breve */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Nuestros Servicios
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Acompañamos tu proyecto desde el diseño hasta la puesta en marcha
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-almatec-black">1</span>
              </div>
              <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2">Consultoría</h3>
              <p className="font-open-sans text-gray-600 text-sm">
                Análisis y diseño de soluciones personalizadas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-almatec-black">2</span>
              </div>
              <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2">Instalación</h3>
              <p className="font-open-sans text-gray-600 text-sm">
                Montaje profesional con equipos especializados
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-almatec-black">3</span>
              </div>
              <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2">Capacitación</h3>
              <p className="font-open-sans text-gray-600 text-sm">
                Entrenamiento para operación óptima de equipos
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-almatec-black">4</span>
              </div>
              <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2">Soporte</h3>
              <p className="font-open-sans text-gray-600 text-sm">
                Mantenimiento y soporte técnico continuo
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
              <Link to="/servicios">Ver Todos los Servicios</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
