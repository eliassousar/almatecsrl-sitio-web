import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import ProjectsGallery from '@/components/projects/ProjectsGallery';
import NewHero from '@/components/new-hero';
import SEO from '@/components/seo/SEO';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
        <SEO 
          title="Almatec SRL - Soluciones Agrícolas de Alto Rendimiento"
          description="Representante oficial de silos GSI en Bolivia. Más de 20 años ofreciendo soluciones integrales de almacenamiento, secado y manejo de granos."
          url="https://almatecsrl-sitio-web.lovable.app"
        />
        {/* Nueva Hero Section */}
        <NewHero />

      {/* Sección de Trayectoria */}
      <section className="py-16 bg-almatec-dark-gray w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-open-sans text-sm text-almatec-yellow uppercase tracking-widest mb-3">
              Nuestra trayectoria
            </p>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white leading-tight">
              Una trayectoria construida con la confianza<br className="hidden md:block" /> del productor.
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center lg:border-r border-gray-700">
              <span className="font-montserrat font-bold text-6xl text-almatec-yellow">21</span>
              <p className="font-open-sans text-sm text-gray-300 mt-3 leading-relaxed max-w-[140px] mx-auto">
                años brindando tecnología del líder mundial GSI® en Bolivia.
              </p>
            </div>
            <div className="text-center lg:border-r border-gray-700">
              <span className="font-montserrat font-bold text-6xl text-almatec-yellow">+60</span>
              <p className="font-open-sans text-sm text-gray-300 mt-3 leading-relaxed max-w-[140px] mx-auto">
                proyectos ejecutados en todo el territorio nacional.
              </p>
            </div>
            <div className="text-center lg:border-r border-gray-700">
              <span className="font-montserrat font-bold text-6xl text-almatec-yellow">3</span>
              <p className="font-open-sans text-sm text-gray-300 mt-3 leading-relaxed max-w-[140px] mx-auto">
                marcas líderes integradas en cada solución.
              </p>
            </div>
            <div className="text-center">
              <span className="font-montserrat font-bold text-6xl text-almatec-yellow">1</span>
              <p className="font-open-sans text-sm text-gray-300 mt-3 leading-relaxed max-w-[140px] mx-auto">
                solución completa de Llave en Mano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section id="productos" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
              Línea de Productos
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos una amplia gama de productos diseñados para optimizar su producción agroindustrial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-transform bg-card"
              onClick={() => navigate('/productos?tab=almacenamiento')}
            >
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-foreground">
                  Silos de Almacenamiento
                </CardTitle>
                <CardDescription className="font-open-sans text-muted-foreground">
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
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-transform bg-card"
              onClick={() => navigate('/productos?tab=secado')}
            >
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-foreground">
                  Sistemas de Secado
                </CardTitle>
                <CardDescription className="font-open-sans text-muted-foreground">
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
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-transform bg-card"
              onClick={() => navigate('/productos?tab=manejo')}
            >
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-foreground">
                  Manejo de Granos
                </CardTitle>
                <CardDescription className="font-open-sans text-muted-foreground">
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold px-8 py-4 text-lg"
              onClick={() => navigate('/productos')}
            >
              Ver Productos y Soluciones
            </Button>
          </div>
        </div>
      </section>

      {/* Galería de Proyectos */}
      <ProjectsGallery />

      {/* Modelo de Trabajo */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-open-sans text-sm text-almatec-yellow uppercase tracking-widest mb-4">
                Nuestro modelo de trabajo
              </p>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray leading-tight mb-6">
                Un proyecto bien ejecutado comienza mucho antes de la primera excavación.
              </h2>
              <p className="font-open-sans text-lg text-gray-600 leading-relaxed mb-8">
                Acompañamos a nuestros clientes desde la concepción del proyecto hasta la puesta en marcha de la planta. Ingeniería, obra civil, montaje mecánico y eléctrico, equipos e integración de sistemas — todo coordinado por un solo equipo. Así eliminamos las fricciones entre proveedores y garantizamos que el resultado final corresponda exactamente a lo que fue diseñado.
              </p>
              <Link
                to="/contacto"
                className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 rounded-md transition-colors inline-block"
              >
                Conversar con nuestro equipo
              </Link>
            </div>
            <div>
              <p className="font-montserrat font-semibold text-lg text-almatec-dark-gray mb-6">
                Lo que incluye cada proyecto:
              </p>
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                <span className="font-open-sans text-gray-700">Ingeniería de proyecto y diseño de planta a medida</span>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                <span className="font-open-sans text-gray-700">Obra civil y fundaciones certificadas</span>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                <span className="font-open-sans text-gray-700">Montaje mecánico y eléctrico completo</span>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                <span className="font-open-sans text-gray-700">Equipos GSI®, SAUR y COIMMA integrados en un solo sistema</span>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                <span className="font-open-sans text-gray-700">Puesta en marcha y capacitación operativa del personal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contacto" className="py-20 bg-gradient-to-r from-muted to-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-8 text-center">
            ¿Está pensando en ampliar o iniciar su capacidad de almacenamiento?
          </h2>
          <p className="font-open-sans text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cada operación agroindustrial tiene sus propias condiciones y objetivos. Conversemos sobre su proyecto — sin compromiso y con criterio técnico — para identificar juntos la solución más adecuada.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold px-8 py-4 text-lg"
            onClick={() => window.location.href = '/contacto'}
          >
            Iniciar una consulta
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
