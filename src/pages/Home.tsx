import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useNavigate } from 'react-router-dom';
import ProjectsGallery from '@/components/projects/ProjectsGallery';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-almatec-white">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/2022395/2022395-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          {/* Fallback background for browsers that don't support video */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1560419164-98c46b585c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')"
            }}
          />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Soluciones completas para la agroindustria boliviana
            </h1>
            <p className="font-open-sans text-xl md:text-2xl text-gray-200 max-w-3xl">
              Impulsamos la productividad agroindustrial con tecnología de punta y servicios especializados.
            </p>
            <div className="mt-10">
              <Button 
                size="lg" 
                className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-4 text-lg"
                onClick={() => navigate('/productos')}
              >
                Descubra Más
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Línea de Productos
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de productos diseñados para optimizar su producción agroindustrial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-almatec-dark-gray">
                  Silos de Almacenamiento
                </CardTitle>
                <CardDescription className="font-open-sans text-gray-600">
                  Diseño e instalación de silos para un almacenamiento eficiente y seguro de granos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src="/lovable-uploads/08d599de-6eea-419d-ac32-ea66dec5edf7.png"
                    alt="Silos de Almacenamiento"
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </CardContent>
            </Card>

            {/* Servicio 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-almatec-dark-gray">
                  Sistemas de Secado
                </CardTitle>
                <CardDescription className="font-open-sans text-gray-600">
                  Implementación de sistemas de secado de granos para preservar la calidad y evitar pérdidas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src="/lovable-uploads/cb476a95-88e2-4231-8e70-d0f3953b123b.png"
                    alt="Sistemas de Secado"
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </CardContent>
            </Card>

            {/* Servicio 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-almatec-dark-gray">
                  Manejo de Granos
                </CardTitle>
                <CardDescription className="font-open-sans text-gray-600">
                  Soluciones integrales para el manejo eficiente de granos, desde el transporte hasta el procesamiento final.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src="/lovable-uploads/d8a5bf33-184f-481b-add7-e884b002994a.png"
                    alt="Manejo de Granos"
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-4 text-lg"
              onClick={() => navigate('/productos')}
            >
              Ver Productos y Soluciones
            </Button>
          </div>
        </div>
      </section>

      {/* Galería de Proyectos */}
      <ProjectsGallery />

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-almatec-dark-gray to-almatec-black text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-8 text-center">
            ¿Su empresa necesita soluciones de almacenamiento de granos?
          </h2>
          <p className="font-open-sans text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Permítanos ayudarle a encontrar la solución perfecta para sus necesidades de almacenamiento y procesamiento de granos.
          </p>
          <Button 
            size="lg" 
            className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-4 text-lg"
            onClick={() => window.location.href = '/contacto'}
          >
            Únase a Nuestros Clientes
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
