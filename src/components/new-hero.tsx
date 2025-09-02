'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

const NewHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const smoothY = useSpring(y, { stiffness: 400, damping: 40 });
  const smoothOpacity = useSpring(opacity, { stiffness: 400, damping: 40 });

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <section 
      ref={ref}
      id="new-hero"
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden"
    >
      {/* Animated grid background */}
      <motion.div 
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="absolute inset-0 w-full h-full bg-transparent bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]"
      />
      
      {/* Floating decorative elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 text-yellow-400/20"
      >
        <Sparkles size={24} />
      </motion.div>
      
      <motion.div
        animate={floatingAnimation}
        style={{ animationDelay: "2s" }}
        className="absolute top-32 right-16 text-yellow-400/20"
      >
        <Sparkles size={16} />
      </motion.div>
      
      <motion.div
        animate={floatingAnimation}
        style={{ animationDelay: "4s" }}
        className="absolute bottom-32 left-20 text-yellow-400/20"
      >
        <Sparkles size={20} />
      </motion.div>

      {/* Main content container */}
      <motion.div
        style={{ y: smoothY, opacity: smoothOpacity, scale }}
        className="z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Título principal con animación */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-yellow-400"
          >
            Soluciones agroindustriales
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-white"
          >
            integrales para el futuro
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-300"
          >
            de Bolivia
          </motion.span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Líderes en tecnología GSI para almacenamiento, secado y manejo de granos
        </motion.p>

        {/* CTA moderno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(234, 179, 8, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explorar Soluciones
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/30 text-white font-medium rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contactar Ahora
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll animado mejorado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-8 lg:bottom-10 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-gray-400 text-sm font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Desliza para explorar
          </span>
          <ArrowDown className="text-yellow-400 w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewHero;