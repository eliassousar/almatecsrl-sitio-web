import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import SobreNosotros from "./pages/SobreNosotros";
import Productos from "./pages/Productos";
import Servicios from "./pages/Servicios";
import Proyectos from "./pages/Proyectos";
import Contacto from "./pages/Contacto";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
            <Route path="/faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
