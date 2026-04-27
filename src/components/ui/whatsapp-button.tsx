
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle } from 'lucide-react';
import { ALMATEC_PHONES, ALMATEC_PRIMARY_PHONE, buildWhatsAppUrl } from '@/config/contact';

const WhatsAppButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [consultaData, setConsultaData] = useState({
    nombre: '',
    tipoConsulta: ''
  });

  const handleDirectWhatsApp = useCallback(() => {
    const whatsappUrl = buildWhatsAppUrl();
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      window.location.href = whatsappUrl;
    }
  }, []);

  const handleConsultaSubmit = useCallback(() => {
    if (!consultaData.nombre.trim() || !consultaData.tipoConsulta) {
      return;
    }

    const tipoTexto = consultaData.tipoConsulta === 'silos-gsi' ? 'silos GSI' :
                     consultaData.tipoConsulta === 'sistemas-secado' ? 'sistemas de secado' :
                     consultaData.tipoConsulta === 'servicios-tecnicos' ? 'servicios técnicos' :
                     consultaData.tipoConsulta === 'cotizacion' ? 'una cotización' : 'consulta general';

    const message = `Hola, soy ${consultaData.nombre.trim()}. Estoy interesado en conocer más sobre ${tipoTexto} de Almatec SRL.`;
    const whatsappUrl = buildWhatsAppUrl(ALMATEC_PRIMARY_PHONE.raw, message);

    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      window.location.href = whatsappUrl;
    }
    
    setIsDialogOpen(false);
    setConsultaData({ nombre: '', tipoConsulta: '' });
  }, [consultaData]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setConsultaData(prev => ({ ...prev, [field]: value }));
  }, []);

  const isFormValid = consultaData.nombre.trim().length > 0 && consultaData.tipoConsulta.length > 0;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]" role="complementary" aria-label="Botón de contacto por WhatsApp">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 focus:ring-4 focus:ring-[#25D366]/30"
            size="icon"
            aria-label="Abrir chat de WhatsApp"
            title="Contactar por WhatsApp"
          >
            <div className="flex flex-col items-center justify-center">
              <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 mb-0.5 lg:mb-1" aria-hidden="true" />
              <span className="text-xs font-medium hidden lg:block">Chat</span>
            </div>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md mx-4" aria-describedby="whatsapp-dialog-description">
          <DialogHeader>
            <DialogTitle className="text-almatec-dark-gray">Consulta por WhatsApp</DialogTitle>
            <DialogDescription id="whatsapp-dialog-description">
              Complete los datos para una consulta personalizada por WhatsApp
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="nombre-whatsapp">Su nombre *</Label>
              <Input
                id="nombre-whatsapp"
                placeholder="Ingrese su nombre"
                value={consultaData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                maxLength={100}
                autoComplete="name"
                aria-required="true"
              />
            </div>
            
            <div>
              <Label htmlFor="tipo-consulta">Tipo de consulta *</Label>
              <Select 
                onValueChange={(value) => handleInputChange('tipoConsulta', value)}
                value={consultaData.tipoConsulta}
              >
                <SelectTrigger id="tipo-consulta" aria-required="true">
                  <SelectValue placeholder="Seleccione el tipo de consulta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silos-gsi">Silos GSI</SelectItem>
                  <SelectItem value="sistemas-secado">Sistemas de secado</SelectItem>
                  <SelectItem value="servicios-tecnicos">Servicios técnicos</SelectItem>
                  <SelectItem value="cotizacion">Solicitar cotización</SelectItem>
                  <SelectItem value="otro">Consulta general</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={handleConsultaSubmit} 
                disabled={!isFormValid}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white disabled:opacity-50 disabled:cursor-not-allowed h-12 text-sm"
                aria-label="Enviar consulta personalizada por WhatsApp"
              >
                Enviar por WhatsApp
              </Button>
              <div className="flex flex-col sm:flex-row gap-2">
                {ALMATEC_PHONES.map((phone) => (
                  <Button
                    key={phone.raw}
                    onClick={() => {
                      const url = buildWhatsAppUrl(phone.raw);
                      const w = window.open(url, '_blank', 'noopener,noreferrer');
                      if (!w) window.location.href = url;
                    }}
                    variant="outline"
                    className="flex-1 h-12 text-sm"
                    aria-label={`Contacto directo al ${phone.display}`}
                  >
                    📱 {phone.display}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhatsAppButton;
