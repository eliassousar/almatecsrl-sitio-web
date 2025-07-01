
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, Mail } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
    { name: 'Productos y Soluciones', path: '/productos' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Proyectos Realizados', path: '/proyectos' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handlePhoneClick = () => {
    window.location.href = 'tel:+59133326206';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:pabloarteaga@almatec.net';
  };

  return (
    <header className="bg-almatec-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Contact Bar - Hidden on mobile */}
      <div className="hidden lg:block bg-almatec-dark-gray text-almatec-white py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center space-x-6 text-sm">
            <button
              onClick={handlePhoneClick}
              className="flex items-center space-x-2 hover:text-almatec-yellow transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>(+591) 3 326206</span>
            </button>
            <button
              onClick={handleEmailClick}
              className="flex items-center space-x-2 hover:text-almatec-yellow transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>pabloarteaga@almatec.net</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="/lovable-uploads/54043837-d68a-4a6c-a2cc-4034d777c95f.png" 
                alt="Almatec Agronegocios Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-bold text-almatec-dark-gray text-lg">ALMATEC</span>
              <span className="text-xs text-almatec-dark-gray -mt-1 opacity-80">AGRONEGOCIOS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-open-sans font-medium px-4 py-2 rounded-md transition-all duration-200 relative ${
                  isActive(item.path)
                    ? 'text-almatec-yellow bg-almatec-yellow/10'
                    : 'text-almatec-dark-gray hover:text-almatec-yellow hover:bg-almatec-yellow/5'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-almatec-yellow rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Contact Button - Desktop */}
          <div className="hidden lg:block">
            <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold shadow-md hover:shadow-lg transition-all duration-200">
              <Link to="/contacto">Contáctenos</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-almatec-yellow/10">
                <Menu className="h-6 w-6 text-almatec-dark-gray" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Contact Links */}
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <button
                    onClick={handlePhoneClick}
                    className="flex items-center space-x-2 text-almatec-dark-gray hover:text-almatec-yellow transition-colors w-full mb-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="font-open-sans text-sm">(+591) 3 326206</span>
                  </button>
                  <button
                    onClick={handleEmailClick}
                    className="flex items-center space-x-2 text-almatec-dark-gray hover:text-almatec-yellow transition-colors w-full"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="font-open-sans text-sm">pabloarteaga@almatec.net</span>
                  </button>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-open-sans font-medium text-lg px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'text-almatec-yellow bg-almatec-yellow/10'
                        : 'text-almatec-dark-gray hover:text-almatec-yellow hover:bg-almatec-yellow/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold w-full">
                    <Link to="/contacto" onClick={() => setIsOpen(false)}>Contáctenos</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
