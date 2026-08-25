'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ModernPageHeroProps {
  title: string;
  subtitle?: string;
}

const ModernPageHero = ({ title, subtitle }: ModernPageHeroProps) => {
  return (
    <section 
      id="page-hero"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-almatec-black"
    >
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