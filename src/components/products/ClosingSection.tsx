import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ClosingSection = () => (
  <section className="py-20 bg-almatec-dark-gray text-almatec-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
        SOLUCIONES HECHAS A MEDIDA
      </h2>
      <p className="font-open-sans text-lg text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
        Entendemos que cada operación tiene necesidades específicas. Nuestro equipo técnico está preparado para asesorarle en la selección de los equipos más adecuados para su proyecto, garantizando la máxima eficiencia y rentabilidad a corto y largo plazo.
      </p>
      <p className="font-open-sans text-xl text-almatec-yellow mb-8 max-w-3xl mx-auto">
        Contáctenos para una consulta personalizada y descubra cómo las soluciones GSI pueden transformar su operación agroindustrial.
      </p>
      <div className="flex justify-center">
        <Button asChild size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
          <Link to="/contacto">Solicitar asesoría técnica</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default ClosingSection;