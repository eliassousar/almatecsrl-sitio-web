import { Producto } from '@/data/productos';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  title: string;
  description: string;
  productos: Producto[];
}

const ProductSection = ({ title, description, productos }: ProductSectionProps) => (
  <div className="space-y-12">
    <div className="text-center mb-12">
      <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
        {title}
      </h2>
      <p className="font-open-sans text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  </div>
);

export default ProductSection;