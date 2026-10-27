import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/seo/SEO';
import { ALMATEC_SITE_URL, ALMATEC_EMAILS, ALMATEC_PRIMARY_PHONE } from '@/config/contact';

const PoliticaPrivacidad = () => {
  return (
    <div className="min-h-screen bg-almatec-black py-8">
      <SEO
        title="Política de Privacidad | Almatec Agronegocios"
        description="Información sobre los datos que Almatec recibe mediante sus formularios de contacto."
        url={`${ALMATEC_SITE_URL}/politica-privacidad`}
        noIndex={true}
      />
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4"><ArrowLeft className="mr-2 h-4 w-4" />Volver al inicio</Button>
          </Link>
          <h1 className="mb-2 font-montserrat text-3xl font-bold text-white">Política de Privacidad</h1>
          <p className="text-gray-300">Última actualización: octubre de 2026</p>
        </div>

        <Card className="max-w-4xl">
          <CardHeader><CardTitle className="text-xl text-almatec-dark-gray">Datos de sus consultas</CardTitle></CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-almatec-dark-gray">1. Qué información recibimos</h2>
              <p className="leading-relaxed text-gray-700">Cuando usted envía el formulario, recibimos el nombre, el municipio o ubicación, la necesidad principal y la aceptación de esta política. También puede enviar, de forma opcional, correo electrónico, teléfono o WhatsApp, empresa u organización, actividad, cultivo o grano, volumen aproximado y comentarios. El formulario incluye un campo técnico no visible para ayudar a detectar envíos automatizados y una marca de tiempo de la solicitud.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-almatec-dark-gray">2. Para qué usamos esos datos</h2>
              <p className="leading-relaxed text-gray-700">Usamos la información para leer y responder su consulta, entender el alcance técnico que describe, orientar una conversación comercial o de servicio y proteger el formulario frente a abuso. No usamos el formulario para pedir presupuesto ni fechas operativas.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-almatec-dark-gray">3. Acceso interno y proveedores técnicos</h2>
              <p className="leading-relaxed text-gray-700">La consulta puede ser revisada por el personal interno que gestiona la atención comercial y técnica, según sus funciones. Los proveedores que mantienen componentes técnicos del sitio podrían procesar datos para prestar ese servicio. No publicamos las consultas en la web ni las vendemos.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-almatec-dark-gray">4. Protección y conservación</h2>
              <p className="leading-relaxed text-gray-700">Aplicamos controles técnicos y de acceso destinados a proteger la información contra acceso o uso no autorizado. Conservaremos la consulta durante el tiempo necesario para gestionarla y atender obligaciones aplicables; no indicamos un plazo fijo que no esté definido para cada sistema.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-almatec-dark-gray">5. Sus solicitudes</h2>
              <p className="leading-relaxed text-gray-700">Si necesita revisar, corregir o retirar los datos que envió, escríbanos indicando la consulta y el canal de contacto utilizado. Atenderemos la solicitud según la información disponible y las obligaciones aplicables.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-almatec-dark-gray">6. Contacto</h2>
              <p className="leading-relaxed text-gray-700">Para preguntas sobre el manejo de una consulta, puede contactarnos en:</p>
              <div className="mt-3 rounded-lg bg-almatec-yellow/10 p-4">
                <p className="font-semibold text-almatec-dark-gray">Almatec SRL</p>
                <p className="text-gray-700">Email: {ALMATEC_EMAILS.secondary}</p>
                <p className="text-gray-700">WhatsApp: {ALMATEC_PRIMARY_PHONE.displayFull}</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
