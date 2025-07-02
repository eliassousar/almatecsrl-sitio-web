import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { productosAlmacenamiento, productosSecado, productosManejo } from '@/data/productos';
import HeroSection from '@/components/products/HeroSection';
import ProductSection from '@/components/products/ProductSection';
import ClosingSection from '@/components/products/ClosingSection';

const Productos = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

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
          </Tabs>
        </div>
      </section>

      <ClosingSection />
    </div>
  );
};

export default Productos;