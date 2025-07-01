
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Productos = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6">
            Productos y Soluciones
          </h1>
          <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra línea completa de productos GSI y soluciones agrícolas
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-montserrat text-2xl text-almatec-dark-gray">
              Contenido en desarrollo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-open-sans text-gray-600">
              Esta sección será desarrollada en la siguiente fase del proyecto con el catálogo 
              completo de productos GSI y soluciones agrícolas disponibles.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Productos;
