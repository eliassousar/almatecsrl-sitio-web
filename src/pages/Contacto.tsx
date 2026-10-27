import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import ModernPageHero from '@/components/modern-page-hero';
import SEO from '@/components/seo/SEO';
import {
  ALMATEC_SITE_URL,
  ALMATEC_PHONES,
  ALMATEC_PRIMARY_PHONE,
  ALMATEC_EMAILS,
  ALMATEC_BUSINESS_HOURS,
  buildWhatsAppUrl,
} from '@/config/contact';

const Contacto = () => {
  return (
    <div className="min-h-screen bg-almatec-black">
      <SEO
        title="Contacto | Almatec Agronegocios"
        description="Cuéntenos sobre su necesidad de almacenamiento, secado o manejo de granos en Bolivia."
        url={`${ALMATEC_SITE_URL}/contacto`}
        keywords="contacto Almatec, soluciones poscosecha, teléfono Almatec, WhatsApp granos Bolivia, Santa Cruz"
      />
      <ModernPageHero
        title="Contemos el proyecto"
        subtitle="Comparta la necesidad de su operación; no hace falta tener todos los datos definidos."
      />

      <section className="bg-almatec-white py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-almatec-yellow">
                  <Phone className="h-8 w-8 text-almatec-dark-gray" />
                </div>
                <h3 className="mb-2 font-montserrat font-semibold text-almatec-dark-gray">Teléfonos</h3>
                <div className="space-y-1">
                  {ALMATEC_PHONES.map((phone) => <p key={phone.raw} className="font-open-sans text-gray-600">{phone.displayFull}</p>)}
                </div>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-almatec-yellow">
                  <Mail className="h-8 w-8 text-almatec-dark-gray" />
                </div>
                <h3 className="mb-2 font-montserrat font-semibold text-almatec-dark-gray">Correos</h3>
                <div className="space-y-1">
                  <p className="font-open-sans text-gray-600">{ALMATEC_EMAILS.primary}</p>
                  <p className="font-open-sans text-gray-600">{ALMATEC_EMAILS.secondary}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-almatec-yellow">
                  <Clock className="h-8 w-8 text-almatec-dark-gray" />
                </div>
                <h3 className="mb-2 font-montserrat font-semibold text-almatec-dark-gray">Horario</h3>
                <div className="space-y-1">
                  <p className="font-open-sans text-gray-600">{ALMATEC_BUSINESS_HOURS.weekdays.label}</p>
                  <p className="font-open-sans text-gray-600">{ALMATEC_BUSINESS_HOURS.weekdays.hours}</p>
                  <p className="font-open-sans text-gray-600">{`${ALMATEC_BUSINESS_HOURS.saturday.label}: ${ALMATEC_BUSINESS_HOURS.saturday.hours}`}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center font-montserrat text-2xl text-almatec-dark-gray">Cuéntenos su necesidad</CardTitle>
                <p className="text-center font-open-sans text-gray-600">Puede comenzar con una orientación, una consulta técnica o una necesidad concreta de almacenamiento, secado o manejo.</p>
              </CardHeader>
              <CardContent><ContactForm variant="full" /></CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-almatec-white py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-montserrat text-3xl font-bold text-almatec-dark-gray md:text-4xl">Nuestra ubicación</h2>
            <p className="mx-auto max-w-2xl font-open-sans text-lg text-gray-600">Encuéntrenos en Santa Cruz de la Sierra.</p>
          </div>
          <Card className="mx-auto max-w-4xl">
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9}>
                <a href="https://maps.app.goo.gl/kHZ2LP4FBZwmb9FC9" target="_blank" rel="noopener noreferrer" className="group flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 transition-colors hover:bg-gray-300" aria-label="Abrir ubicación de Almatec en Google Maps">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-almatec-yellow transition-transform group-hover:scale-110"><span className="text-2xl" aria-hidden="true">📍</span></div>
                    <h3 className="mb-2 font-montserrat font-semibold text-almatec-dark-gray">Ver en Google Maps</h3>
                    <p className="font-open-sans text-sm text-gray-600">Abra el mapa para consultar la ubicación.</p>
                  </div>
                </a>
              </AspectRatio>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-almatec-dark-gray py-10 text-almatec-white md:py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-montserrat text-3xl font-bold md:text-4xl">¿Prefiere escribirnos directamente?</h2>
          <p className="mx-auto mb-8 max-w-2xl font-open-sans text-lg text-gray-300">Use WhatsApp para compartir una primera consulta o coordinar el canal de conversación.</p>
          <button
            onClick={() => window.open(buildWhatsAppUrl(ALMATEC_PRIMARY_PHONE.raw, 'Hola, tengo una consulta sobre las soluciones poscosecha de Almatec'), '_blank')}
            className="inline-flex items-center justify-center rounded-md border border-almatec-white px-8 py-3 text-almatec-white transition-colors hover:bg-almatec-white hover:text-almatec-black"
          >
            WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
