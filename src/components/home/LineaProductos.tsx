
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Producto {
  title: string;
  description: string;
  image: string;
  category: string;
}

interface LineaProductosProps {
  productos: Producto[];
}

const LineaProductos = ({ productos }: LineaProductosProps) => {
  const navigate = useNavigate();

  const handleVerProductos = () => {
    navigate('/productos');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-almatec-blue mb-4">
            Línea de Productos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra amplia gama de equipos y sistemas para la agroindustria
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {productos.map((producto, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={producto.image} 
                  alt={producto.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="text-sm text-almatec-yellow font-semibold mb-2">
                  {producto.category}
                </div>
                <CardTitle className="text-almatec-blue">{producto.title}</CardTitle>
                <CardDescription>{producto.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleVerProductos}
            className="bg-almatec-yellow text-almatec-black hover:bg-yellow-400 font-semibold px-8 py-3"
          >
            Ver Productos y Soluciones
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LineaProductos;
