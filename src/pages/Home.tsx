import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Link } from 'react-router-dom';
import NewHero from '@/components/new-hero';
import SEO from '@/components/seo/SEO';
import { ALMATEC_SITE_URL } from '@/config/contact';

const Home = () => {
  const productCards = [
    {
      title: 'Silos de almacenamiento',
      description: 'Soluciones para conservar el grano con almacenamiento, aireación y monitoreo adecuados a la operación.',
      image: '/lovable-uploads/08d599de-6eea-419d-ac32-ea66dec5edf7.webp',
      tab: 'almacenamiento',
    },
    {
      title: 'Sistemas de secado',
      description: 'Equipos y configuraciones para reducir humedad y proteger la calidad antes del almacenamiento.',
      image: '/lovable-uploads/cb476a95-88e2-4231-8e70-d0f3953b123b.webp',
      tab: 'secado',
    },
    {
      title: 'Manejo de granos',
      description: 'Recepción, descarga, transporte y despacho coordinados para evitar cuellos de botella.',
      image: '/lovable-uploads/d8a5bf33-184f-481b-add7-e884b002994a.webp',
      tab: 'manejo',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Almatec Agronegocios | Soluciones poscosecha en Bolivia"
        description="Soluciones poscosecha para almacenar, secar y manejar granos en Bolivia, con orientación para productores, compradores, acopios y agroindustrias."
        url={ALMATEC_SITE_URL}
      />
      <NewHero />

      <section className="w-full bg-almatec-dark-gray py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.18em] text-almatec-yellow">Una mirada técnica a cada operación</p>
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-white md:text-4xl">
              La capacidad correcta empieza por entender su grano y su operación.
            </h2>
            <p className="mx-auto mt-5 font-open-sans text-lg leading-relaxed text-gray-300">
              Evaluamos necesidad, ubicación, cultivo, volumen y alcance para separar lo esencial de lo que puede crecer después.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div className="border-white/15 px-4 sm:border-r">
              <span className="font-montserrat text-3xl font-bold text-almatec-yellow">+60</span>
              <p className="mt-2 font-open-sans text-sm text-gray-300">proyectos confirmados por Almatec</p>
            </div>
            <div className="border-white/15 px-4 sm:border-r">
              <span className="font-montserrat text-3xl font-bold text-almatec-yellow">2016</span>
              <p className="mt-2 font-open-sans text-sm text-gray-300">año de fundación de Almatec SRL</p>
            </div>
            <div className="px-4">
              <span className="font-montserrat text-3xl font-bold text-almatec-yellow">Bolivia</span>
              <p className="mt-2 font-open-sans text-sm text-gray-300">nuestro ámbito de operación</p>
            </div>
          </div>
        </div>
      </section>

      <section id="productos" className="bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-montserrat text-3xl font-bold text-foreground md:text-4xl">Soluciones para su operación</h2>
            <p className="mx-auto max-w-2xl font-open-sans text-lg text-muted-foreground">
              Conozca las funciones que pueden formar parte de una solución poscosecha, según su escala y sus objetivos.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {productCards.map((card) => (
              <Link
                key={card.tab}
                to={`/productos?tab=${card.tab}`}
                className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-almatec-yellow focus-visible:ring-offset-2"
                aria-label={`Ver soluciones de ${card.title.toLowerCase()}`}
              >
                <Card className="h-full bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-montserrat text-xl text-foreground">{card.title}</CardTitle>
                    <CardDescription className="font-open-sans text-muted-foreground">{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={card.image}
                        alt={card.title}
                        width={800}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="h-full rounded-md object-cover"
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-primary px-8 py-4 font-montserrat text-lg font-semibold text-primary-foreground hover:bg-primary/90">
              <Link to="/productos">Ver todas las soluciones</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-gradient-to-r from-muted to-background py-20 text-foreground">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-montserrat text-3xl font-bold md:text-4xl">Cuéntenos qué necesita resolver</h2>
          <p className="mx-auto mb-8 max-w-2xl font-open-sans text-xl text-muted-foreground">
            Comparta lo que ya conoce de su operación. Le ayudaremos a ordenar el alcance y los próximos datos técnicos.
          </p>
          <Button asChild size="lg" className="bg-primary px-8 py-4 font-montserrat text-lg font-semibold text-primary-foreground hover:bg-primary/90">
            <Link to="/contacto">Quiero mi proyecto</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
