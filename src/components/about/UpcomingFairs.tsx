import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

interface Fair {
  id: string;
  name: string;
  date: string;
  location: string;
}

const upcomingFairs: Fair[] = [
  {
    id: '1',
    name: 'Expocruz 2025',
    date: '19 - 28 de Septiembre, 2025',
    location: 'Santa Cruz de la Sierra, Fexpocruz'
  },
  {
    id: '2',
    name: 'Feria Agropecruz',
    date: '15 - 18 de Octubre, 2025',
    location: 'Santa Cruz de la Sierra'
  },
  {
    id: '3',
    name: 'Expo Norte Integrado',
    date: '20 - 24 de Noviembre, 2025',
    location: 'Montero, Santa Cruz'
  }
];

const UpcomingFairs = () => {
  return (
    <section className="py-20 bg-almatec-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-almatec-dark-gray mb-6 tracking-wide">
            Visítanos en nuestra próxima feria
          </h2>
          <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Encuéntranos en las próximas ferias del sector agroindustrial. Te esperamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {upcomingFairs.map((fair) => (
            <Card 
              key={fair.id} 
              className="group bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <h3 className="font-montserrat font-semibold text-xl text-almatec-dark-gray mb-4 group-hover:text-almatec-yellow transition-colors duration-300">
                  {fair.name}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-almatec-yellow flex-shrink-0" />
                    <span className="font-open-sans text-sm">{fair.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-almatec-yellow flex-shrink-0" />
                    <span className="font-open-sans text-sm">{fair.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="font-open-sans text-center text-gray-500 mt-10 text-sm">
          Más fechas se anunciarán próximamente
        </p>
      </div>
    </section>
  );
};

export default UpcomingFairs;
