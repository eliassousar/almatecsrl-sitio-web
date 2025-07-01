
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
    { name: 'Productos', path: '/productos' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <footer className="bg-almatec-dark-gray text-almatec-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-almatec-yellow rounded-lg flex items-center justify-center">
                <span className="text-almatec-black font-montserrat font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-montserrat font-bold text-almatec-white text-lg">ALMATEC</span>
                <span className="text-sm text-gray-300 -mt-1">SRL</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Soluciones agrícolas de alto rendimiento. Especialistas en silos GSI y tecnología agrícola en Bolivia.
            </p>
            <div className="space-y-1 text-sm text-gray-300">
              <p className="font-semibold text-almatec-yellow">Dirección:</p>
              <p>Av. Cristo Redentor - Entre 4to y 5to Anillo</p>
              <p>Comercial Plaza Norte Oficina Nro. 46</p>
              <p>Santa Cruz de la Sierra, Bolivia</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-montserrat font-semibold text-almatec-yellow mb-4">Contacto</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                <p className="font-semibold">Teléfonos:</p>
                <p>(+ 591) - 3 326206</p>
                <p>77028610</p>
                <p>78007220</p>
              </div>
              <div>
                <p className="font-semibold mt-3">Correos:</p>
                <p>edson_gsi@hotmail.com</p>
                <p>pabloarteaga@almatec.net</p>
              </div>
              <div>
                <p className="font-semibold mt-3">Web:</p>
                <p>www.almatec.net</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-almatec-yellow mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-almatec-yellow transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            Copyright © {currentYear} Almatec SRL. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social media icons placeholders */}
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-400">FB</span>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-400">IG</span>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-400">LI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
