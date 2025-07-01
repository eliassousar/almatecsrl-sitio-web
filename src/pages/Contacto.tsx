
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Contacto = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6">
            Contacto
          </h1>
          <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte con tus proyectos agrícolas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-montserrat text-2xl text-almatec-dark-gray">
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-montserrat font-semibold text-almatec-yellow mb-2">Dirección</h3>
                <p className="font-open-sans text-gray-600">
                  Av. Cristo Redentor - Entre 4to y 5to Anillo<br />
                  Comercial Plaza Norte Oficina Nro. 46<br />
                  Santa Cruz de la Sierra, Bolivia
                </p>
              </div>
              
              <div>
                <h3 className="font-montserrat font-semibold text-almatec-yellow mb-2">Teléfonos</h3>
                <p className="font-open-sans text-gray-600">
                  (+ 591) - 3 326206<br />
                  77028610<br />
                  78007220
                </p>
              </div>
              
              <div>
                <h3 className="font-montserrat font-semibold text-almatec-yellow mb-2">Correos Electrónicos</h3>
                <p className="font-open-sans text-gray-600">
                  edson_gsi@hotmail.com<br />
                  pabloarteaga@almatec.net
                </p>
              </div>
              
              <div>
                <h3 className="font-montserrat font-semibold text-almatec-yellow mb-2">Sitio Web</h3>
                <p className="font-open-sans text-gray-600">
                  www.almatec.net
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-montserrat text-2xl text-almatec-dark-gray">
                Formulario de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-open-sans text-gray-600 mb-6">
                El formulario de contacto será implementado en la siguiente fase del proyecto.
              </p>
              <Button className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold">
                Próximamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
