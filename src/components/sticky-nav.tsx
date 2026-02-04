import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { name: 'Productos', href: '/productos' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Contacto', href: '/contacto' },
];

const StickyNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleVisibility = () => {
      // Muestra la barra de navegación cuando el scroll supera el 90% de la altura de la ventana
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
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        >
          <nav className="mt-4 px-6 py-3 bg-black/50 backdrop-blur-lg rounded-full">
            <ul className="flex items-center gap-x-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleNavClick(link.href)}
                    className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default StickyNav;