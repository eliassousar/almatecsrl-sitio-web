
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ContactForm from '@/components/forms/ContactForm';

const Contacto = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-almatec-dark-gray to-almatec-black text-almatec-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')"
          }}
        ></div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
              <span className="text-almatec-yellow">Contáctenos</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl text-gray-200 max-w-3xl">
              Estamos aquí para ayudarle con sus proyectos agrícolas. Converse con nuestros especialistas.
            </p>
          </div>
        </div>
      </section>

      {/* Información de Contacto Rápida */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2">Teléfonos</h3>
                <div className="space-y-1">
                  <p className="font-open-sans text-gray-600">(+591) 3 326206</p>
                  <p className="font-open-sans text-gray-600">77028610</p>
                  <p className="font-open-sans text-gray-600">78007220</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2">Correos</h3>
                <div className="space-y-1">
                  <p className="font-open-sans text-gray-600">edson_gsi@hotmail.com</p>
                  <p className="font-open-sans text-gray-600">pabloarteaga@almatec.net</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🕒</span>
                </div>
                <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2">Horario</h3>
                <div className="space-y-1">
                  <p className="font-open-sans text-gray-600">Lunes a Viernes</p>
                  <p className="font-open-sans text-gray-600">8:00 - 18:00</p>
                  <p className="font-open-sans text-gray-600">Sábados: 8:00 - 12:00</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat text-2xl text-almatec-dark-gray text-center">
                  Formulario de Contacto
                </CardTitle>
                <p className="font-open-sans text-gray-600 text-center">
                  Complete el formulario y nos pondremos en contacto con usted a la brevedad posible.
                </p>
              </CardHeader>
              <CardContent>
                <ContactForm variant="full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mapa con enlace funcional */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Nuestra Ubicación
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Encuéntrenos fácilmente en el corazón comercial de Santa Cruz de la Sierra
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9}>
                <a 
                  href="https://maps.app.goo.gl/kHZ2LP4FBZwmb9FC9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-almatec-yellow rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">📍</span>
                    </div>
                    <h3 className="font-montserrat font-semibold text-almatec-dark-gray mb-2">
                      Ver en Google Maps
                    </h3>
                    <p className="font-open-sans text-gray-600 text-sm">
                      Haga clic para abrir nuestra ubicación en Google Maps
                    </p>
                  </div>
                </a>
              </AspectRatio>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA de Contacto Rápido */}
      <section className="py-16 bg-almatec-dark-gray text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
            ¿Tiene una Consulta Urgente?
          </h2>
          <p className="font-open-sans text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Para consultas urgentes o emergencias técnicas, contáctenos directamente por teléfono
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = 'tel:+59133326206'}
              className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-3 rounded-md transition-colors inline-flex items-center justify-center"
            >
              📞 Llamar Ahora
            </button>
            <button 
              onClick={() => window.open('https://wa.me/+59177028610?text=Hola, tengo una consulta urgente sobre los servicios de Almatec SRL', '_blank')}
              className="border border-almatec-white text-almatec-white hover:bg-almatec-white hover:text-almatec-black px-8 py-3 rounded-md transition-colors inline-flex items-center justify-center"
            >
              📱 WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
