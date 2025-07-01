
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

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

  return (
    <header className="bg-almatec-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-almatec-yellow rounded-lg flex items-center justify-center">
              <span className="text-almatec-white font-montserrat font-bold text-xl">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-bold text-almatec-dark-gray text-lg">ALMATEC</span>
              <span className="text-xs text-almatec-dark-gray -mt-1">SRL</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-open-sans font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-almatec-yellow border-b-2 border-almatec-yellow'
                    : 'text-almatec-dark-gray hover:text-almatec-yellow'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button - Desktop */}
          <div className="hidden md:block">
            <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-medium">
              <Link to="/contacto">Contáctenos</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-almatec-dark-gray" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-open-sans font-medium text-lg transition-colors ${
                      isActive(item.path)
                        ? 'text-almatec-yellow'
                        : 'text-almatec-dark-gray hover:text-almatec-yellow'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-medium mt-6">
                  <Link to="/contacto" onClick={() => setIsOpen(false)}>Contáctenos</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
