import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Productos = () => {
  const productosAlmacenamiento = [
    {
      id: 1,
      name: "Silos de Fondo Plano EVO 50",
      description: "Para cumplir con las diversas aplicaciones requeridas, GSI ofrece una completa línea de silos de almacenamiento ventilados de fondo plano. Esta línea abarca capacidades desde 90 m³ hasta 41.165 m³, adaptándose a las necesidades específicas de cada productor.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specs: [
        "Capacidades desde 90 m³ hasta 41.165 m³",
        "Sistema de ventilación integrado",
        "Diseño versátil para diversas aplicaciones",
        "Construcción robusta con estándares de calidad GSI"
      ]
    },
    {
      id: 2,
      name: "Silos de Fondo Cónico EVO 50",
      description: "Los silos de fondo cónico EVO 50 de GSI ofrecen mayor agilidad en la descarga, optimizando el flujo de granos y reduciendo tiempos de operación. Su diseño cónico facilita la descarga completa del producto almacenado.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specs: [
        "Diseño cónico que facilita la descarga completa",
        "Mayor eficiencia en el manejo de granos",
        "Construcción duradera con tecnología EVO 50",
        "Ideal para operaciones que requieren descargas frecuentes"
      ]
    },
    {
      id: 3,
      name: "Roscas Barredoras",
      description: "Las roscas barredoras de GSI ofrecen la tecnología que su propiedad necesita para almacenar granos de manera segura y lograr mejores resultados. Son capaces de auxiliar en la descarga de silos y brindan agilidad, eficiencia y robustez, minimizando el acceso del operador al interior de los silos.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specs: [
        "Tecnología avanzada para descarga eficiente",
        "Mayor seguridad al minimizar el acceso del operador al interior",
        "Robustez y durabilidad",
        "Mejora la eficiencia operativa",
        "Compatible con los sistemas de silos GSI"
      ]
    }
  ];

  const productosSecado = [
    {
      id: 4,
      name: "Process Dryer",
      description: "Secadora de granos con tecnología original GSI y sistema de secado continuo con flujo de aire cruzado, proporciona granos secos con calidad superior. Fue desarrollada para trabajar con diferentes tipos de granos, ya sea con fines comerciales o para la producción de semillas.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specs: [
        "Tecnología original GSI",
        "Sistema de secado continuo con flujo de aire cruzado",
        "Calidad superior de secado",
        "Versatilidad para diferentes tipos de granos",
        "Mantiene la integridad del grano",
        "Ideal tanto para uso comercial como para producción de semillas"
      ]
    },
    {
      id: 5,
      name: "Sistema de Aireación y Ventiladores",
      description: "Los sistemas de aireación de los silos GSI se dimensionan de acuerdo al producto almacenado y a la tasa de aireación (flujo de aire) necesaria para la conservación del grano. Se encuentran disponibles sistemas de aireación de canal y de piso 100% perforado.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specs: [
        "Dimensionamiento personalizado según el producto almacenado",
        "Adaptación a la tasa de aireación necesaria",
        "Disponible en sistemas de canal y de piso 100% perforado",
        "Diseñado para la óptima conservación del grano",
        "Compatible con los sistemas de silos GSI"
      ]
    }
  ];

  const productosManejo = [
    {
      id: 6,
      name: "Elevadores",
      description: "Fabricados con componentes de alta calidad y construcción robusta, los elevadores de granos GSI cuentan con alta durabilidad, operación continua y la mejor relación costo-beneficio para su producción.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specs: [
        "Componentes de alta calidad",
        "Construcción robusta",
        "Alta durabilidad",
        "Operación continua",
        "Excelente relación costo-beneficio",
        "Diseñados para uso intensivo en operaciones agrícolas"
      ]
    },
    {
      id: 7,
      name: "Transportadores de Cadena",
      description: "Los transportadores de cadena GSI son extremadamente eficientes para el transporte de los granos en forma horizontal o vertical en la planta almacenadora, optimizando el flujo de material y reduciendo tiempos de operación.",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specs: [
        "Alta eficiencia en el transporte de granos",
        "Versatilidad para transporte horizontal o vertical",
        "Diseño robusto para plantas almacenadoras",
        "Integración perfecta con otros sistemas GSI",
        "Optimización del flujo de granos en la planta"
      ]
    },
    {
      id: 8,
      name: "Cintas/Correas Transportadoras",
      description: "La tecnología aplicada en los mayores proyectos de almacenamiento globales llega a usted a través de dos líneas de cintas/correas GSI. Estos modelos emplean una solución inteligente, silenciosa y versátil para el transporte de granos horizontal e inclinado en distancias cortas, medias y largas.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specs: [
        "Tecnología de nivel mundial",
        "Solución inteligente y silenciosa",
        "Versatilidad para transporte horizontal e inclinado",
        "Adaptable a distancias cortas, medias y largas",
        "Diseño eficiente para minimizar el daño al grano",
        "Operación silenciosa para mejor ambiente de trabajo"
      ]
    },
    {
      id: 9,
      name: "Máquina de Prelimpieza",
      description: "Las máquinas de prelimpieza de GSI separan las impurezas de todo tipo de granos, mejorando la calidad del producto almacenado y reduciendo riesgos de contaminación durante el almacenamiento.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specs: [
        "Separación eficiente de impurezas",
        "Compatible con diversos tipos de granos",
        "Mejora la calidad del producto almacenado",
        "Reduce riesgos de contaminación",
        "Optimiza el proceso de almacenamiento",
        "Prolonga la vida útil del grano almacenado"
      ]
    }
  ];

  const ProductCard = ({ producto }: { producto: any }) => (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 10}>
          <img 
            src={producto.image}
            alt={producto.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="font-montserrat font-semibold text-almatec-dark-gray text-xl mb-3">
          {producto.name}
        </h3>
        <p className="font-open-sans text-gray-600 mb-4 text-sm leading-relaxed">
          {producto.description}
        </p>
        <div className="space-y-2 mb-6">
          <h4 className="font-montserrat font-medium text-almatec-dark-gray text-sm">Características destacadas:</h4>
          <ul className="space-y-1">
            {producto.specs.slice(0, 3).map((spec: string, index: number) => (
              <li key={index} className="font-open-sans text-xs text-gray-500 flex items-start">
                <span className="text-almatec-yellow mr-2">•</span>
                {spec}
              </li>
            ))}
          </ul>
        </div>
        <Button 
          variant="outline" 
          className="w-full hover:bg-almatec-yellow hover:text-almatec-black hover:border-almatec-yellow transition-all duration-300 font-montserrat"
        >
          Solicitar información
        </Button>
      </CardContent>
    </Card>
  );

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
              SOLUCIONES INTEGRALES
              <span className="text-almatec-yellow"> GSI</span> PARA EL SECTOR AGRÍCOLA
            </h1>
            <h2 className="font-montserrat text-2xl md:text-3xl text-almatec-yellow mb-6">
              Tecnología de vanguardia para maximizar la productividad y rentabilidad de su operación
            </h2>
            <p className="font-open-sans text-lg md:text-xl text-gray-200 max-w-4xl leading-relaxed">
              Almatec SRL ofrece la línea completa de soluciones GSI, reconocida mundialmente por su calidad, seguridad, 
              confiabilidad y durabilidad. Con más de 50 años de experiencia, GSI desarrolla sistemas de almacenamiento 
              y manejo de granos que revolucionan la operativa agrícola, aumentando la rentabilidad y garantizando la 
              seguridad de sus granos cosecha tras cosecha.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Productos por Categorías */}
      <section className="py-20 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="almacenamiento" className="w-full max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100">
              <TabsTrigger 
                value="almacenamiento" 
                className="font-montserrat font-medium data-[state=active]:bg-almatec-yellow data-[state=active]:text-almatec-black"
              >
                Almacenamiento de Granos
              </TabsTrigger>
              <TabsTrigger 
                value="secado" 
                className="font-montserrat font-medium data-[state=active]:bg-almatec-yellow data-[state=active]:text-almatec-black"
              >
                Sistemas de Secado
              </TabsTrigger>
              <TabsTrigger 
                value="manejo" 
                className="font-montserrat font-medium data-[state=active]:bg-almatec-yellow data-[state=active]:text-almatec-black"
              >
                Manejo de Granos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="almacenamiento" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
                  SISTEMAS DE ALMACENAMIENTO DE GRANOS
                </h2>
                <p className="font-open-sans text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Los sistemas de almacenamiento de granos GSI están diseñados con los más estrictos estándares de calidad. 
                  GSI fabrica una completa línea de equipos para el almacenamiento seguro y eficiente de granos, asistiendo 
                  las necesidades de los productores para obtener mejores resultados cosecha tras cosecha.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productosAlmacenamiento.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="secado" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
                  SISTEMAS DE SECADO DE GRANO
                </h2>
                <p className="font-open-sans text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  En el área de secado de granos, GSI ofrece equipos extremadamente eficientes, tanto para uso en granos 
                  comerciales como para semillas. Su sistema de secado continuo con flujo de aire cruzado permite procesar 
                  diferentes tipos de granos, entregando siempre un producto entero y sin olor.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productosSecado.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="manejo" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
                  SISTEMAS DE MANEJO DE GRANOS
                </h2>
                <p className="font-open-sans text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Los equipos GSI para transporte de granos están diseñados para garantizar una operativa más fácil y rápida 
                  que mejorará el resultado de su cosecha. Con componentes de alta calidad y construcción robusta, estos 
                  sistemas optimizan el flujo de granos en su planta.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productosManejo.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Sección de Soluciones Personalizadas */}
      <section className="py-20 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
            SOLUCIONES PERSONALIZADAS PARA SU OPERACIÓN
          </h2>
          <p className="font-open-sans text-lg text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            En Almatec SRL entendemos que cada operación agrícola tiene necesidades específicas. Nuestro equipo técnico 
            especializado está preparado para asesorarle en la selección de los equipos GSI más adecuados para su proyecto, 
            garantizando la máxima eficiencia y rentabilidad.
          </p>
          <p className="font-open-sans text-xl text-almatec-yellow mb-8 max-w-3xl mx-auto">
            Contáctenos para una consulta personalizada y descubra cómo las soluciones GSI pueden transformar su operación agrícola.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
              <Link to="/contacto">Solicitar asesoría técnica</Link>
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