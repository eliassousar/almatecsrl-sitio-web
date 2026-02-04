import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/seo/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <SEO 
        title="Página no encontrada"
        description="La página que busca no existe. Visite nuestra página principal o contáctenos."
        noIndex={true}
      />
      <Card className="max-w-lg w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-almatec-yellow mb-2">404</div>
            <h1 className="text-2xl font-montserrat font-bold text-almatec-dark-gray mb-2">
              Página no encontrada
            </h1>
            <p className="text-gray-600">
              Lo sentimos, la página que está buscando no existe o ha sido movida.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold text-almatec-dark-gray">
              ¿Qué puede hacer?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Ir al inicio
                </Button>
              </Link>
              <Link to="/productos">
                <Button variant="outline" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Ver productos
                </Button>
              </Link>
              <Link to="/contacto">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contactar
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('tel:+59133326206')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar
              </Button>
            </div>
          </div>

          <div className="bg-almatec-yellow/10 p-4 rounded-lg">
            <h3 className="font-semibold text-almatec-dark-gray mb-2">
              ¿Necesita ayuda inmediata?
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Nuestro equipo está disponible para atenderle
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Teléfono:</strong> (+591) 3 326206</p>
              <p><strong>WhatsApp:</strong> (+591) 77028610</p>
              <p><strong>Email:</strong> pabloarteaga@almatec.net</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
