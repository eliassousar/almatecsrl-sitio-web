
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TerminosCondiciones = () => {
  return (
    <div className="min-h-screen bg-almatec-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-3xl font-montserrat font-bold text-almatec-dark-gray mb-2">
            Términos y Condiciones
          </h1>
          <p className="text-gray-600">Última actualización: Enero 2025</p>
        </div>

        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle className="text-xl text-almatec-dark-gray">
              Condiciones de Uso del Sitio Web
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                1. Aceptación de Términos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguno de estos términos, no debe utilizar este sitio web. Almatec SRL se reserva el derecho de modificar estos términos en cualquier momento.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                2. Descripción del Servicio
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Almatec SRL es una empresa especializada en soluciones de almacenamiento agroindustrial, representante oficial de silos GSI en Bolivia. Este sitio web proporciona información sobre nuestros productos, servicios y permite la comunicación con nuestro equipo comercial y técnico.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                3. Uso Apropiado
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Usted se compromete a utilizar este sitio web únicamente para fines legítimos y de manera que no infrinja los derechos de terceros. Está prohibido:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Usar el sitio para fines ilegales o no autorizados</li>
                <li>Intentar obtener acceso no autorizado a sistemas o datos</li>
                <li>Interferir con el funcionamiento del sitio web</li>
                <li>Transmitir virus, malware o código malicioso</li>
                <li>Reproducir contenido sin autorización expresa</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                4. Propiedad Intelectual
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, imágenes, y software, es propiedad de Almatec SRL o sus licenciantes y está protegido por las leyes de derechos de autor. Las marcas GSI y productos relacionados son propiedad de sus respectivos titulares.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                5. Información del Producto
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nos esforzamos por proporcionar información precisa sobre nuestros productos y servicios. Sin embargo, no garantizamos que toda la información sea completamente exacta o actualizada. Las especificaciones técnicas pueden variar y están sujetas a confirmación durante el proceso de cotización.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                6. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Almatec SRL no será responsable por daños directos, indirectos, incidentales o consecuenciales que resulten del uso de este sitio web o la información contenida en él. El uso de este sitio web es bajo su propio riesgo.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                7. Enlaces a Sitios Externos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Este sitio web puede contener enlaces a sitios web de terceros. Almatec SRL no es responsable del contenido, políticas de privacidad o prácticas de sitios web de terceros. El acceso a estos enlaces es bajo su propia responsabilidad.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                8. Ley Aplicable
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Estos términos y condiciones se rigen por las leyes de Bolivia. Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de Santa Cruz de la Sierra, Bolivia.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-almatec-dark-gray mb-3">
                9. Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Para consultas sobre estos términos y condiciones, puede contactarnos:
              </p>
              <div className="bg-almatec-yellow/10 p-4 rounded-lg mt-3">
                <p className="font-semibold text-almatec-dark-gray">Almatec SRL</p>
                <p className="text-gray-700">Email: pabloarteaga@almatec.net</p>
                <p className="text-gray-700">Teléfono: (+591) 3 326206</p>
                <p className="text-gray-700">Dirección: Santa Cruz de la Sierra, Bolivia</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TerminosCondiciones;
