
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-almatec-dark-gray text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-montserrat font-bold text-almatec-yellow">
              Almatec SRL
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Especialistas en soluciones de almacenamiento agroindustrial y representantes oficiales de silos GSI en Bolivia.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-almatec-yellow flex-shrink-0" />
                <span>Santa Cruz de la Sierra, Bolivia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-almatec-yellow flex-shrink-0" />
                <span>(+591) 77028610</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-almatec-yellow flex-shrink-0" />
                <span>(+591) 78007220</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-almatec-yellow flex-shrink-0" />
                <span>edson_gsi@hotmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-almatec-yellow flex-shrink-0" />
                <span>pabloarteaga@almatec.net</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-montserrat font-semibold text-almatec-yellow">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sobre-nosotros" className="text-gray-300 hover:text-almatec-yellow transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-gray-300 hover:text-almatec-yellow transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-almatec-yellow transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-almatec-yellow transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-almatec-yellow transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-montserrat font-semibold text-almatec-yellow">
              Nuestras Soluciones
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Silos GSI</li>
              <li className="text-gray-300">Sistemas de almacenamiento</li>
              <li className="text-gray-300">Equipos de secado</li>
              <li className="text-gray-300">Sistemas de transporte</li>
              <li className="text-gray-300">Servicio técnico</li>
              <li className="text-gray-300">Mantenimiento</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-montserrat font-semibold text-almatec-yellow">
              Síguenos
            </h4>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/almatecscz/?locale=es_LA" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-almatec-yellow hover:text-almatec-black transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/almatecsrl/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-almatec-yellow hover:text-almatec-black transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/almatec-srl/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-almatec-yellow hover:text-almatec-black transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@GSI.americadelsur" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-almatec-yellow hover:text-almatec-black transition-colors cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Almatec SRL. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/politica-privacidad" 
                className="text-gray-400 hover:text-almatec-yellow transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link 
                to="/terminos-condiciones" 
                className="text-gray-400 hover:text-almatec-yellow transition-colors"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
