'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Fondo servido como asset estático optimizado (WebP) desde public/lovable-uploads
const heroBackground = '/lovable-uploads/08d599de-6eea-419d-ac32-ea66dec5edf7.webp';

interface ModernPageHeroProps {
  title: string;
  subtitle?: string;
}

const ModernPageHero = ({ title, subtitle }: ModernPageHeroProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax ligero para la imagen de fondo
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={ref}
      id="page-hero"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay negro con 70% opacidad */}
      <div className="absolute inset-0 bg-black/70 z-[5]" />
      
      {/* Imagen de fondo con parallax */}
      <motion.div 
        style={{ 
          y: backgroundY,
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Contenido Principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Título principal */}
        <h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {title}
        </h1>
        
        {/* Subtítulo */}
        {subtitle && (
          <p 
            className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "400" }}
          >
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default ModernPageHero;