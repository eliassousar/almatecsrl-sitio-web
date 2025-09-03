'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const smoothY = useSpring(y, { stiffness: 400, damping: 40 });
  const smoothOpacity = useSpring(opacity, { stiffness: 400, damping: 40 });

  return (
    <section 
      ref={ref}
      id="page-hero"
      className="h-screen w-full flex flex-col items-center justify-center bg-gray-950 relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <motion.div 
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="absolute inset-0 w-full h-full bg-transparent bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:80px_80px]"
      />

      {/* Almatec Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-8 left-8 z-20"
      >
        <img 
          src="/lovable-uploads/60ea7bc0-cc0b-4570-8c9d-9a5c075afe6a.png" 
          alt="Almatec Isologo" 
          className="h-16 w-auto object-contain opacity-90"
        />
      </motion.div>

      {/* Main content container */}
      <motion.div
        style={{ y: smoothY, opacity: smoothOpacity, scale }}
        className="z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Título principal con animación */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 30, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100
            }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-yellow-400"
          >
            {title}
          </motion.span>
        </motion.h1>

        {/* Subtítulo opcional */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100
            }}
            className="text-lg md:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-white mt-6 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};

export default ModernPageHero;