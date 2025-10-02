'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBackground from '@/assets/hero-agro-background.jpg';

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
      <div className="absolute inset-0 bg-black bg-opacity-70 z-5" />
      
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

      {/* Almatec Logo - Top Left */}
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