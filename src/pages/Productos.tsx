import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { productosAlmacenamiento, productosSecado, productosManejo, productosBalanzas, productosVolcadoras } from '@/data/productos';
import ModernPageHero from '@/components/modern-page-hero';
import ProductSection from '@/components/products/ProductSection';
import ClosingSection from '@/components/products/ClosingSection';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import SEO from '@/components/seo/SEO';

const Productos = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'almacenamiento';
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);
  return (
    <div className="min-h-screen bg-almatec-black">
      <SEO 
        title="Productos y Soluciones"
        description="Silos de almacenamiento GSI, sistemas de secado, manejo de granos, balanzas y volcadoras. Catálogo completo de soluciones agroindustriales en Bolivia."
        url="https://almatecsrl-sitio-web.lovable.app/productos"
        keywords="silos GSI, silos almacenamiento, sistemas secado granos, manejo granos, balanzas industriales, volcadoras"
      />
      <ModernPageHero 
        title="Conoce nuestras soluciones integrales para el sector agroindustrial"
      />

      <section className="py-20 bg-gray-50">
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
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                  <span className="font-open-sans text-gray-700">Ingeniería de proyecto y diseño de planta a medida</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                  <span className="font-open-sans text-gray-700">Obra civil y fundaciones certificadas</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                  <span className="font-open-sans text-gray-700">Montaje mecánico y eléctrico completo</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                  <span className="font-open-sans text-gray-700">Equipos GSI®, SAUR y COIMMA integrados en un solo sistema</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-almatec-yellow flex-shrink-0 mt-0.5" />
                  <span className="font-open-sans text-gray-700">Puesta en marcha y capacitación operativa del personal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Productos por Categorías */}
      <section className="py-20 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-8 lg:mb-12 bg-gray-100 h-auto p-1">
              <TabsTrigger 
                value="almacenamiento" 
                className="font-montserrat font-medium data-[state=active]:bg-almatec-yellow data-[state=active]:text-almatec-black text-xs sm:text-sm py-3 px-2 lg:px-3"
              >
                <span className="lg:hidden">Almacén</span>
                <span className="hidden lg:inline">Almacenamiento de Granos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="secado" 
                className="font-montserrat font-medium data-[state=active]:bg-almatec-yellow data-[state=active]:text-almatec-black text-xs sm:text-sm py-3 px-2 lg:px-3"
              >
                <span className="lg:hidden">Secado</span>
                <span className="hidden lg:inline">Sistemas de Secado</span>
              </TabsTrigger>
              <TabsTrigger 
                value="manejo" 
                className="font-montserrat font-medium data-[state=active]:bg-almatec-yellow data-[state=active]:text-almatec-black text-xs sm:text-sm py-3 px-2 lg:px-3"
              >
                <span className="lg:hidden">Manejo</span>
                <span className="hidden lg:inline">Manejo de Granos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="balanzas" 
                className="font-montserrat font-medium data-[state=active]:bg-almatec-yellow data-[state=active]:text-almatec-black text-xs sm:text-sm py-3 px-2 lg:px-3"
              >
                Balanzas
              </TabsTrigger>
              <TabsTrigger 
                value="volcadoras" 
                className="font-montserrat font-medium data-[state=active]:bg-almatec-yellow data-[state=active]:text-almatec-black text-xs sm:text-sm py-3 px-2 lg:px-3"
              >
                Volcadoras
              </TabsTrigger>
            </TabsList>

            <TabsContent value="almacenamiento">
              <ProductSection
                title="SISTEMAS DE ALMACENAMIENTO DE GRANOS"
                description="Los sistemas de almacenamiento de granos GSI están diseñados con los más estrictos estándares de calidad. GSI fabrica una completa línea de equipos para el almacenamiento seguro y eficiente de granos, asistiendo las necesidades de los productores para obtener mejores resultados cosecha tras cosecha."
                productos={productosAlmacenamiento}
              />
            </TabsContent>

            <TabsContent value="secado">
              <ProductSection
                title="SISTEMAS DE SECADO DE GRANO"
                description="En el área de secado de granos, GSI ofrece equipos extremadamente eficientes, tanto para uso en granos comerciales como para semillas. Su sistema de secado continuo con flujo de aire cruzado permite procesar diferentes tipos de granos, entregando siempre un producto entero y sin olor."
                productos={productosSecado}
              />
            </TabsContent>

            <TabsContent value="manejo">
              <ProductSection
                title="SISTEMAS DE MANEJO DE GRANOS"
                description="Los equipos GSI para transporte de granos están diseñados para garantizar una operativa más fácil y rápida que mejorará el resultado de su cosecha. Con componentes de alta calidad y construcción robusta, estos sistemas optimizan el flujo de granos en su planta."
                productos={productosManejo}
              />
            </TabsContent>

            <TabsContent value="balanzas">
              <ProductSection
                title="SISTEMAS DE BALANZAS"
                description="Las balanzas Coimma ofrecen soluciones de pesaje industrial de alta precisión para la industria agrícola. Diseñadas para soportar cargas pesadas y operación continua, garantizan mediciones exactas y confiables en el pesaje de granos y productos agrícolas."
                productos={productosBalanzas}
              />
            </TabsContent>

            <TabsContent value="volcadoras">
              <ProductSection
                title="SISTEMAS DE VOLCADORAS"
                description="Los equipos Saur para descarga y muestreo están diseñados para optimizar los procesos de recepción de granos. Con tecnología especializada y construcción robusta, estos sistemas mejoran la eficiencia operativa y garantizan el control de calidad en la recepción de productos."
                productos={productosVolcadoras}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <ClosingSection />
    </div>
  );
};

export default Productos;
