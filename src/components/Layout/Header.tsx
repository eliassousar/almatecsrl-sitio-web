import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, Mail } from 'lucide-react';
import { ALMATEC_PHONES, ALMATEC_EMAILS } from '@/config/contact';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
    { name: 'Productos y Soluciones', path: '/productos' },
    { name: 'Servicios', path: '/servicios' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handlePhoneClick = (raw: string) => { window.location.href = `tel:${raw}`; };
  const handleEmailClick = () => { window.location.href = `mailto:${ALMATEC_EMAILS.primary}`; };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-almatec-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="transition-opacity hover:opacity-90" aria-label="Almatec Agronegocios, ir al inicio">
            <img
              src="/lovable-uploads/7b64d736-3e47-4632-88ea-bf9f994641db.webp"
              alt="Almatec Agronegocios Logo"
              width={250}
              height={48}
              loading="eager"
              decoding="async"
              className="h-12 w-auto max-w-[250px] object-contain"
            />
          </Link>

          <nav className="hidden space-x-1 lg:flex" aria-label="Navegación principal">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={`relative rounded-md px-4 py-2 font-open-sans font-medium transition-all duration-200 ${isActive(item.path) ? 'bg-almatec-yellow/10 text-almatec-yellow' : 'text-almatec-dark-gray hover:bg-almatec-yellow/5 hover:text-almatec-yellow'}`}
              >
                {item.name}
                {isActive(item.path) && <div className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 transform rounded-full bg-almatec-yellow" aria-hidden="true" />}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild className="bg-almatec-yellow font-montserrat font-semibold text-almatec-black shadow-md transition-all duration-200 hover:bg-almatec-yellow/90 hover:shadow-lg">
              <Link to="/contacto">Contáctenos</Link>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-almatec-yellow/10" aria-label="Abrir menú de navegación" aria-expanded={isOpen}>
                <Menu className="h-6 w-6 text-almatec-dark-gray" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80" aria-label="Menú de navegación móvil">
              <div className="mt-8 flex flex-col space-y-4">
                <div className="mb-4 border-b border-gray-200 pb-4" aria-label="Datos de contacto">
                  {ALMATEC_PHONES.map((phone) => (
                    <button key={phone.raw} onClick={() => handlePhoneClick(phone.raw)} className="mb-2 flex w-full items-center space-x-2 text-almatec-dark-gray transition-colors hover:text-almatec-yellow" aria-label={`Llamar a ${phone.displayFull}`}>
                      <Phone className="h-4 w-4" aria-hidden="true" /><span className="font-open-sans text-sm">{phone.displayFull}</span>
                    </button>
                  ))}
                  <button onClick={handleEmailClick} className="flex w-full items-center space-x-2 text-almatec-dark-gray transition-colors hover:text-almatec-yellow" aria-label={`Enviar correo a ${ALMATEC_EMAILS.primary}`}>
                    <Mail className="h-4 w-4" aria-hidden="true" /><span className="font-open-sans text-sm">{ALMATEC_EMAILS.primary}</span>
                  </button>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    className={`rounded-lg px-4 py-3 font-open-sans text-lg font-medium transition-all duration-200 ${isActive(item.path) ? 'bg-almatec-yellow/10 text-almatec-yellow' : 'text-almatec-dark-gray hover:bg-almatec-yellow/5 hover:text-almatec-yellow'}`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <Button asChild className="w-full bg-almatec-yellow font-montserrat font-semibold text-almatec-black hover:bg-almatec-yellow/90">
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
