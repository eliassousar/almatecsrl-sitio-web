import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/seo/SEO';

const PoliticaPrivacidad = () => {
  return (
    <div className="min-h-screen bg-almatec-black">
      <SEO 
        title="Política de Privacidad"
        description="Política de privacidad y protección de datos personales de Almatec SRL. Conoce cómo protegemos tu información."
        url="https://almatecsrl-sitio-web.lovable.app/politica-privacidad"
        noIndex={true}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-3xl font-montserrat font-bold text-almatec-dark-gray mb-2">
            Política de Privacidad
          </h1>
          <p className="text-gray-600">Última actualización: Enero 2025</p>
        </div>

        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle className="text-xl text-almatec-dark-gray">
              Compromiso con su Privacidad
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                1. Información que Recopilamos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                En Almatec SRL recopilamos información que usted nos proporciona voluntariamente a través de nuestros formularios de contacto, incluyendo nombre, email, teléfono, empresa y detalles específicos sobre sus proyectos agroindustriales. También recopilamos información técnica básica sobre su navegación para mejorar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                2. Uso de la Información
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Utilizamos su información personal para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Responder a sus consultas sobre nuestros productos y servicios</li>
                <li>Proporcionar cotizaciones personalizadas para proyectos de silos GSI</li>
                <li>Enviar información relevante sobre soluciones agroindustriales</li>
                <li>Mejorar nuestros servicios y experiencia web</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                3. Protección de Datos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizacionales apropiadas para proteger su información personal contra el acceso no autorizado, alteración, divulgación o destrucción. Sus datos se almacenan en servidores seguros y solo el personal autorizado tiene acceso a ellos.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                4. Compartir Información
              </h2>
              <p className="text-gray-700 leading-relaxed">
                No vendemos, intercambiamos o transferimos su información personal a terceros sin su consentimiento, excepto cuando sea necesario para proporcionar nuestros servicios o cumplir con requisitos legales. Podemos compartir información con nuestros socios tecnológicos (como GSI) únicamente para fines relacionados con su consulta.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                5. Sus Derechos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Acceder y conocer qué información personal tenemos sobre usted</li>
                <li>Solicitar la corrección de información inexacta</li>
                <li>Solicitar la eliminación de sus datos personales</li>
                <li>Retirar su consentimiento para el procesamiento de datos</li>
                <li>Recibir una copia de sus datos en formato portable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                6. Cookies y Tecnologías Similares
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nuestro sitio web utiliza cookies para mejorar su experiencia de navegación, recordar sus preferencias y analizar el tráfico del sitio. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                7. Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Para cualquier consulta sobre esta política de privacidad o el manejo de sus datos personales, puede contactarnos en:
              </p>
              <div className="bg-almatec-yellow/10 p-4 rounded-lg mt-3">
                <p className="font-semibold text-almatec-dark-gray">Almatec SRL</p>
                <p className="text-gray-700">Email: pabloarteaga@almatec.net</p>
                <p className="text-gray-700">Teléfono: (+591) 3 326206</p>
                <p className="text-gray-700">WhatsApp: (+591) 77028610</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
