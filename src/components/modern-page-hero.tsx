'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface ModernPageHeroProps {
  title: string;
  subtitle?: string;
}

const ModernPageHero = ({ title, subtitle }: ModernPageHeroProps) => {
  return (
    <section 
      id="page-hero"
      className="h-screen w-full flex flex-col items-center justify-center bg-neutral-950 relative overflow-hidden"
    >
      {/* Fondo de rejilla sutil */}
      <div className="absolute inset-0 w-full h-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]"></div>
      
      {/* Título principal con animación */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="text-5xl md:text-7xl font-bold text-neutral-100 z-10 text-center tracking-tighter"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </motion.h1>

      {/* Subtítulo opcional */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
          className="text-lg md:text-xl text-neutral-400 z-10 text-center mt-6 max-w-4xl px-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Indicador de scroll animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-10 z-10"
      >
        <ArrowDown className="text-neutral-400 animate-bounce" size={24} />
      </motion.div>
    </section>
  );
};

export default ModernPageHero;