
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Clock } from 'lucide-react';
import {
  ALMATEC_PHONES,
  ALMATEC_EMAILS,
  ALMATEC_ADDRESS,
  ALMATEC_BUSINESS_HOURS,
  ALMATEC_SOCIAL,
} from '@/config/contact';

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
              Representantes exclusivos de GSI® Grain Systems en Bolivia. Más de 20 años ejecutando proyectos de almacenamiento, secado y manejo de granos.
            </p>
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

          <div className="space-y-4">
            <h4 className="text-lg font-montserrat font-semibold text-almatec-yellow">
              Atención al Cliente
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-almatec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">{ALMATEC_BUSINESS_HOURS.weekdays.label}</p>
                  <p className="text-white font-medium">{ALMATEC_BUSINESS_HOURS.weekdays.hours}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-almatec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">{ALMATEC_BUSINESS_HOURS.saturday.label}</p>
                  <p className="text-white font-medium">{ALMATEC_BUSINESS_HOURS.saturday.hours}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 pt-2 border-t border-gray-700">
                <MapPin className="w-4 h-4 text-almatec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">{ALMATEC_ADDRESS.line1}</p>
                  <p className="text-gray-300">{ALMATEC_ADDRESS.line2}</p>
                  <p className="text-gray-300">{ALMATEC_ADDRESS.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-montserrat font-semibold text-almatec-yellow">
              Síguenos
            </h4>
            <div className="flex space-x-3">
              <a 
                href={ALMATEC_SOCIAL.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-almatec-yellow hover:text-almatec-black transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={ALMATEC_SOCIAL.instagram} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-almatec-yellow hover:text-almatec-black transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={ALMATEC_SOCIAL.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-almatec-yellow hover:text-almatec-black transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={ALMATEC_SOCIAL.youtube} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-almatec-yellow hover:text-almatec-black transition-colors cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-700">
              {/* Contacto 1 */}
              <div className="space-y-1">
                <a href={`tel:${ALMATEC_PHONES[0].raw}`} className="flex items-center space-x-2 text-gray-300 hover:text-almatec-yellow transition-colors text-sm">
                  <Phone className="w-3.5 h-3.5 text-almatec-yellow flex-shrink-0" />
                  <span>{ALMATEC_PHONES[0].displayFull}</span>
                </a>
                <a href={`mailto:${ALMATEC_EMAILS.primary}`} className="flex items-center space-x-2 text-gray-300 hover:text-almatec-yellow transition-colors text-sm">
                  <Mail className="w-3.5 h-3.5 text-almatec-yellow flex-shrink-0" />
                  <span>{ALMATEC_EMAILS.primary}</span>
                </a>
              </div>

              {/* Contacto 2 */}
              <div className="space-y-1">
                <a href={`tel:${ALMATEC_PHONES[1].raw}`} className="flex items-center space-x-2 text-gray-300 hover:text-almatec-yellow transition-colors text-sm">
                  <Phone className="w-3.5 h-3.5 text-almatec-yellow flex-shrink-0" />
                  <span>{ALMATEC_PHONES[1].displayFull}</span>
                </a>
                <a href={`mailto:${ALMATEC_EMAILS.secondary}`} className="flex items-center space-x-2 text-gray-300 hover:text-almatec-yellow transition-colors text-sm">
                  <Mail className="w-3.5 h-3.5 text-almatec-yellow flex-shrink-0" />
                  <span>{ALMATEC_EMAILS.secondary}</span>
                </a>
              </div>
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
