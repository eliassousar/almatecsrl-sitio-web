
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-almatec-blue text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para Comenzar tu Proyecto?
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto mb-8">
            Contáctanos hoy mismo y descubre cómo podemos ayudarte a optimizar tus procesos agroindustriales
          </p>
          <Button 
            onClick={() => navigate('/contacto')}
            className="bg-almatec-yellow text-almatec-black hover:bg-yellow-400 font-semibold px-8 py-3"
          >
            Contactar Ahora
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-2 text-almatec-yellow" />
              <CardTitle>Teléfono</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>+1 (555) 123-4567</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="text-center">
              <Mail className="h-8 w-8 mx-auto mb-2 text-almatec-yellow" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>info@almatec.com</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-almatec-yellow" />
              <CardTitle>Ubicación</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Ciudad, País</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;
