'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { name: 'Productos', href: '/productos' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Contacto', href: '/contacto' },
];

const MobileNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center lg:hidden"
          >
            <div className="mt-4 mx-4 w-full max-w-sm">
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-full bg-black/80 backdrop-blur-lg text-white rounded-full px-6 py-4 flex items-center justify-between shadow-lg"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <span className="font-medium">Menú</span>
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-50 justify-center hidden lg:flex"
          >
            <nav className="mt-4 px-8 py-4 bg-black/80 backdrop-blur-lg rounded-full">
              <ul className="flex items-center gap-x-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => handleNavClick(link.href)}
                      className={`text-sm font-medium transition-colors duration-200 px-4 py-2 rounded-full ${
                        isActive(link.href) 
                          ? 'text-neutral-900 bg-white' 
                          : 'text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="py-4">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                    >
                      <button 
                        onClick={() => handleNavClick(link.href)}
                        className={`w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-200 ${
                          isActive(link.href) 
                            ? 'text-almatec-yellow bg-almatec-yellow/10 border-r-4 border-almatec-yellow' 
                            : 'text-gray-800 hover:bg-gray-50 hover:text-almatec-yellow'
                        }`}
                      >
                        {link.name}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;