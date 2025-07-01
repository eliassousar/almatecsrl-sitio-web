
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' },
  ];

  return (
    <footer className="bg-almatec-dark-gray text-almatec-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-almatec-yellow rounded-lg flex items-center justify-center">
                <span className="text-almatec-black font-montserrat font-bold text-lg">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-montserrat font-bold text-almatec-white text-lg">ALMATEC</span>
                <span className="text-xs text-gray-300 -mt-1">SRL</span>
              </div>
            </div>
            <p className="font-open-sans text-gray-300 text-sm">
              Soluciones agrícolas de alto rendimiento. Representantes oficiales de silos GSI en Bolivia.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-montserrat font-semibold text-almatec-yellow mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="font-open-sans text-gray-300 hover:text-almatec-yellow transition-colors text-sm">Inicio</Link></li>
              <li><Link to="/sobre-nosotros" className="font-open-sans text-gray-300 hover:text-almatec-yellow transition-colors text-sm">Sobre Nosotros</Link></li>
              <li><Link to="/productos" className="font-open-sans text-gray-300 hover:text-almatec-yellow transition-colors text-sm">Productos</Link></li>
              <li><Link to="/servicios" className="font-open-sans text-gray-300 hover:text-almatec-yellow transition-colors text-sm">Servicios</Link></li>
              <li><Link to="/proyectos" className="font-open-sans text-gray-300 hover:text-almatec-yellow transition-colors text-sm">Proyectos</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-montserrat font-semibold text-almatec-yellow mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><span className="font-open-sans text-gray-300 text-sm">Silos GSI</span></li>
              <li><span className="font-open-sans text-gray-300 text-sm">Sistemas de Secado</span></li>
              <li><span className="font-open-sans text-gray-300 text-sm">Equipos de Transporte</span></li>
              <li><span className="font-open-sans text-gray-300 text-sm">Mantenimiento</span></li>
              <li><span className="font-open-sans text-gray-300 text-sm">Asesoría Técnica</span></li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="font-montserrat font-semibold text-almatec-yellow mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="text-almatec-yellow mt-1">📍</span>
                <p className="font-open-sans text-gray-300 text-sm">
                  Av. Cristo Redentor - Entre 4to y 5to Anillo<br />
                  Comercial Plaza Norte Oficina Nro. 46<br />
                  Santa Cruz de la Sierra, Bolivia
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-almatec-yellow">📞</span>
                <div className="font-open-sans text-gray-300 text-sm">
                  <p>(+591) 3 326206</p>
                  <p>77028610 - 78007220</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-almatec-yellow">📧</span>
                <div className="font-open-sans text-gray-300 text-sm">
                  <p>edson_gsi@hotmail.com</p>
                  <p>pabloarteaga@almatec.net</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-almatec-yellow">🌐</span>
                <p className="font-open-sans text-gray-300 text-sm">www.almatec.net</p>
              </div>
            </div>
          </div>
        </div>

        {/* Redes sociales y copyright */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-gray-600 hover:bg-almatec-yellow text-gray-300 hover:text-almatec-black rounded-full flex items-center justify-center transition-all duration-300 text-lg"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="font-open-sans text-gray-300 text-sm text-center md:text-right">
            © {currentYear} Almatec SRL. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
