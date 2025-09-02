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
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <motion.div 
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="absolute inset-0 w-full h-full bg-transparent bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:80px_80px]"
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