import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const NewHero = () => {
  const ref = useRef(null);

  return (
    <section 
      ref={ref}
      id="new-hero"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Overlay negro con 70% opacidad */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-5" />

      {/* Almatec Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-8 left-8 z-20"
      >
        <img 
          src="/lovable-uploads/60ea7bc0-cc0b-4570-8c9d-9a5c075afe6a.png" 
          alt="Almatec Isologo" 
          className="h-12 md:h-16 w-auto object-contain"
        />
      </motion.div>

      {/* Contenido principal centrado */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Título principal */}
        <h1 
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Soluciones Agroindustriales Integrales Para El Futuro De Bolivia
        </h1>
        
        {/* Subtítulo */}
        <p 
          className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "400" }}
        >
          Tecnología de vanguardia en silos, secado y manejo de granos para optimizar la productividad agrícola
        </p>
      </motion.div>
    </section>
  );
};

export default NewHero;