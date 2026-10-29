import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NewHero = () => {
  return (
    <section
      id="new-hero"
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-almatec-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(242,183,5,0.12),transparent_34%)]" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center md:px-8"
      >
        <p className="mb-5 font-montserrat text-sm font-semibold uppercase tracking-[0.24em] text-almatec-yellow">
        </p>
        <h1 className="mb-6 font-montserrat text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-[4rem]">
          Soluciones poscosecha para almacenar, secar y manejar granos en Bolivia.
        </h1>
        <p className="mx-auto max-w-3xl font-open-sans text-lg leading-relaxed text-gray-300 md:text-xl">
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full bg-almatec-yellow px-7 font-montserrat font-semibold text-almatec-black hover:bg-almatec-yellow/90 sm:w-auto">
            <Link to="/contacto">
              Contar mi proyecto
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full border-white/60 bg-transparent px-7 font-montserrat font-semibold text-white hover:bg-white hover:text-almatec-black sm:w-auto">
            <Link to="/productos">Ver soluciones</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default NewHero;
