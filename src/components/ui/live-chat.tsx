
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'agent', time: string}[]>([]);
  const [chatStarted, setChatStarted] = useState(false);

  const currentTime = new Date().toLocaleTimeString('es-BO', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const isBusinessHours = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // Lunes a Viernes 8:00-18:00, Sábados 8:00-12:00
    if (day >= 1 && day <= 5) {
      return hour >= 8 && hour < 18;
    } else if (day === 6) {
      return hour >= 8 && hour < 12;
    }
    return false;
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      sender: 'user' as const,
      time: currentTime
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simular respuesta automática
    setTimeout(() => {
      const autoResponse = {
        text: chatStarted ? 
          "Gracias por su mensaje. Un especialista se pondrá en contacto con usted en breve. ¿Hay algo específico sobre nuestros productos GSI que le interese?" :
          "¡Hola! Bienvenido a Almatec SRL. Soy el asistente virtual. ¿En qué puedo ayudarle hoy? Puede consultar sobre silos GSI, sistemas de secado o servicios técnicos.",
        sender: 'agent' as const,
        time: new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, autoResponse]);
      setChatStarted(true);
    }, 1500);
  };

  const handleStartWhatsApp = () => {
    const phoneNumber = "+59177028610";
    const whatsappMessage = "Hola, me gustaría iniciar una conversación desde el chat de su sitio web.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-almatec-dark-gray hover:bg-almatec-dark-gray/90 text-white shadow-lg relative"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {isBusinessHours() && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </Button>
      )}

      {isOpen && (
        <Card className="w-80 h-96 flex flex-col shadow-xl">
          <CardHeader className="bg-almatec-dark-gray text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-sm">Chat en Vivo - Almatec SRL</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${isBusinessHours() ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-xs">
                    {isBusinessHours() ? 'En línea' : 'Fuera de horario'}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {!isBusinessHours() && (
                <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-orange-800">Fuera de horario</p>
                  <p className="text-orange-700">
                    Horario: Lun-Vie 8:00-18:00, Sáb 8:00-12:00
                  </p>
                  <p className="text-orange-700 mt-1">
                    Puede dejar un mensaje o contactarnos por WhatsApp.
                  </p>
                </div>
              )}

              {messages.length === 0 && isBusinessHours() && (
                <div className="bg-blue-50 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-blue-800">¡Hola! 👋</p>
                  <p className="text-blue-700">
                    Bienvenido a Almatec SRL. ¿En qué podemos ayudarle?
                  </p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-almatec-yellow text-almatec-black'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-almatec-black/70' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              {!isBusinessHours() && (
                <div className="mb-3">
                  <Button
                    onClick={handleStartWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white text-sm"
                    size="sm"
                  >
                    📱 Continuar en WhatsApp
                  </Button>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Input
                  placeholder={isBusinessHours() ? "Escriba su mensaje..." : "Deje su mensaje..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  size="sm"
                  className="bg-almatec-yellow hover:bg-almatec-yellow/90 text-almatec-black"
                >
                  ➤
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveChat;
