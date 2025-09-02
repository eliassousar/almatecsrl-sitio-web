'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

  return (
    <section 
      ref={ref}
      id="new-hero"
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 120, 120, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(160, 160, 160, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(100, 100, 100, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #1f2937 0%, #374151 25%, #4b5563 50%, #374151 75%, #1f2937 100%)
        `
      }}
    >
      {/* Metallic overlay pattern */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Subtle grid background */}
      <motion.div 
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="absolute inset-0 w-full h-full bg-transparent bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px]"
      />

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
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight"
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
      </motion.div>
    </section>
  );
};

export default NewHero;