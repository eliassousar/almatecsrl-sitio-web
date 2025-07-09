import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-almatec-dark-gray to-almatec-black text-almatec-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560419164-98c46b585c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')"
          }}
        ></div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Soluciones Integrales para el Agro
            </h1>
            <p className="font-open-sans text-xl md:text-2xl text-gray-200 max-w-3xl">
              Impulsamos la productividad agroindustrial con tecnología de punta y servicios especializados.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-4 text-lg">
                Descubra Más
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="py-16 bg-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Nuestros Servicios
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de servicios diseñados para optimizar su producción agroindustrial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-almatec-dark-gray">
                  Silos de Almacenamiento
                </CardTitle>
                <CardDescription className="font-open-sans text-gray-600">
                  Diseño e instalación de silos para un almacenamiento eficiente y seguro de granos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src="https://images.unsplash.com/photo-1628494250987-bd99452374da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                    alt="Silos de Almacenamiento"
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </CardContent>
            </Card>

            {/* Servicio 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-almatec-dark-gray">
                  Sistemas de Secado
                </CardTitle>
                <CardDescription className="font-open-sans text-gray-600">
                  Implementación de sistemas de secado de granos para preservar la calidad y evitar pérdidas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src="https://images.unsplash.com/photo-1557498502-84449949a104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                    alt="Sistemas de Secado"
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </CardContent>
            </Card>

            {/* Servicio 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-almatec-dark-gray">
                  Automatización Agroindustrial
                </CardTitle>
                <CardDescription className="font-open-sans text-gray-600">
                  Soluciones de automatización para optimizar procesos y reducir costos en la producción agroindustrial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src="https://images.unsplash.com/photo-1606765497444-04645c9a5764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80"
                    alt="Automatización Agroindustrial"
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-4 text-lg">
              Ver Todos los Servicios
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Experiencias de clientes que han transformado su producción agroindustrial con nuestras soluciones.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <Card className="bg-white shadow-md rounded-md p-6">
              <CardContent>
                <div className="mb-4">
                  <p className="font-open-sans text-gray-700 italic">
                    "Almatec SRL superó nuestras expectativas. Sus silos de almacenamiento han optimizado nuestra operación y reducido las pérdidas."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                    <img
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2872&q=80"
                      alt="Cliente 1"
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-almatec-dark-gray">
                      Juan Pérez
                    </p>
                    <p className="font-open-sans text-gray-500 text-sm">
                      Productor de Granos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonio 2 */}
            <Card className="bg-white shadow-md rounded-md p-6">
              <CardContent>
                <div className="mb-4">
                  <p className="font-open-sans text-gray-700 italic">
                    "La automatización que implementaron en nuestra planta ha mejorado significativamente nuestra eficiencia y rentabilidad."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                    <img
                      src="https://images.unsplash.com/photo-1573496800643-6e79aa36e58f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2815&q=80"
                      alt="Cliente 2"
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-almatec-dark-gray">
                      María Rodríguez
                    </p>
                    <p className="font-open-sans text-gray-500 text-sm">
                      Gerente de Operaciones
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonio 3 */}
            <Card className="bg-white shadow-md rounded-md p-6">
              <CardContent>
                <div className="mb-4">
                  <p className="font-open-sans text-gray-700 italic">
                    "El soporte técnico que nos brindan es invaluable. Siempre están disponibles para resolver cualquier problema."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d674x?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2861&q=80"
                      alt="Cliente 3"
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-almatec-dark-gray">
                      Carlos Gómez
                    </p>
                    <p className="font-open-sans text-gray-500 text-sm">
                      Ingeniero Agrónomo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-almatec-dark-gray to-almatec-black text-almatec-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-8 text-center">
            ¿Su empresa necesita soluciones de almacenamiento de granos?
          </h2>
          <p className="font-open-sans text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Permítanos ayudarle a encontrar la solución perfecta para sus necesidades de almacenamiento y procesamiento de granos.
          </p>
          <Button 
            size="lg" 
            className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black font-montserrat font-semibold px-8 py-4 text-lg"
            onClick={() => window.location.href = '/contacto'}
          >
            Únase a Nuestros Clientes
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
