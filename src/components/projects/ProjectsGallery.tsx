import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const projectsData = [
  {
    id: 1,
    title: "Instalación de Silos - Santa Cruz",
    description: "Proyecto de instalación de 5 silos metálicos para almacenamiento de soja, capacidad total de 50,000 toneladas.",
    image: "/lovable-uploads/08d599de-6eea-419d-ac32-ea66dec5edf7.png",
    location: "Santa Cruz de la Sierra",
    year: "2023"
  },
  {
    id: 2,
    title: "Sistema de Secado Automatizado",
    description: "Implementación de sistema de secado continuo con control automático de temperatura y humedad.",
    image: "/lovable-uploads/cb476a95-88e2-4231-8e70-d0f3953b123b.png",
    location: "Cochabamba",
    year: "2023"
  },
  {
    id: 3,
    title: "Centro de Acopio de Granos",
    description: "Construcción completa de centro de acopio con capacidad para 75,000 toneladas, incluye báscula y laboratorio.",
    image: "/lovable-uploads/d8a5bf33-184f-481b-add7-e884b002994a.png",
    location: "La Paz",
    year: "2022"
  },
  {
    id: 4,
    title: "Modernización de Planta Procesadora",
    description: "Actualización tecnológica completa de planta procesadora de quinua con nuevos equipos de clasificación.",
    image: "/lovable-uploads/29929e96-1389-43a3-a961-7fa37fb2c856.png",
    location: "Oruro",
    year: "2023"
  },
  {
    id: 5,
    title: "Sistema de Transporte Neumático",
    description: "Instalación de sistema de transporte neumático para manejo eficiente de granos en planta industrial.",
    image: "/lovable-uploads/54043837-d68a-4a6c-a2cc-4034d777c95f.png",
    location: "Tarija",
    year: "2022"
  },
  {
    id: 6,
    title: "Planta de Almacenamiento Refrigerado",
    description: "Construcción de almacenes refrigerados para preservación de semillas con control climático automatizado.",
    image: "/lovable-uploads/78866758-f51a-4f00-942d-d37f9de1a6c0.png",
    location: "Beni",
    year: "2023"
  }
];

const ProjectsGallery = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-almatec-dark-gray mb-4">
            Nuestros Proyectos Realizados
          </h2>
          <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Conozca algunos de los proyectos que hemos ejecutado exitosamente en toda Bolivia, 
            transformando la infraestructura agroindustrial de nuestros clientes.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projectsData.map((project) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <AspectRatio ratio={16 / 9} className="mb-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="object-cover rounded-md w-full h-full"
                        />
                      </AspectRatio>
                      
                      <div className="space-y-3">
                        <h3 className="font-montserrat font-bold text-xl text-almatec-dark-gray">
                          {project.title}
                        </h3>
                        
                        <p className="font-open-sans text-gray-600 text-sm leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex justify-between items-center pt-2">
                          <span className="font-open-sans text-almatec-yellow font-semibold text-sm">
                            📍 {project.location}
                          </span>
                          <span className="font-montserrat font-semibold text-almatec-dark-gray text-sm">
                            {project.year}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex -left-12 bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black border-almatec-yellow" />
            <CarouselNext className="hidden md:flex -right-12 bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black border-almatec-yellow" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;