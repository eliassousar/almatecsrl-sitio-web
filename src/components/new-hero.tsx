import React from 'react';
import { motion } from 'framer-motion';

const NewHero = () => {
  return (
    <section 
      id="new-hero"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-almatec-black"
    >
      {/* Contenido principal centrado */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center px-4 mx-auto"
        style={{ maxWidth: '850px' }}
      >
        {/* Título principal */}
        <h1 
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight tracking-tight mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Infraestructura agroindustrial que trabaja para usted, incluso cuando no está cosechando.
        </h1>
      </motion.div>
    </section>
  );
};

export default NewHero;