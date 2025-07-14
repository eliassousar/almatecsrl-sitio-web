
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Producto } from '@/data/productos';
import { useCallback } from 'react';

interface ProductCardProps {
  producto: Producto;
}

const ProductCard = ({ producto }: ProductCardProps) => {
  const handleWhatsAppRedirect = useCallback(() => {
    const phoneNumber = "+59177028610";
    const message = encodeURIComponent(`Hola, me interesa obtener información sobre ${producto.name} de Almatec SRL. ¿Podrían brindarme más detalles sobre este producto?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      // Fallback si el popup es bloqueado
      window.location.href = whatsappUrl;
    }
  }, [producto.name]);

  return (
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
          onClick={handleWhatsAppRedirect}
        >
          Solicitar información
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
