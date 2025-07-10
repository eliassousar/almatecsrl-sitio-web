
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-almatec-blue to-almatec-dark-blue text-white">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Soluciones Integrales para la
            <span className="text-almatec-yellow block">Agroindustria</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Ofrecemos tecnología de vanguardia para el almacenamiento, secado y manejo de granos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-almatec-yellow text-almatec-black hover:bg-yellow-400 font-semibold"
            >
              Ver Productos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-almatec-blue"
            >
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
