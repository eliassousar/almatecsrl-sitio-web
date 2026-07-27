import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";

// Code-splitting: rutas secundarias se cargan bajo demanda
const SobreNosotros = lazy(() => import("./pages/SobreNosotros"));
const Productos = lazy(() => import("./pages/Productos"));
const Servicios = lazy(() => import("./pages/Servicios"));
const Contacto = lazy(() => import("./pages/Contacto"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const TerminosCondiciones = lazy(() => import("./pages/TerminosCondiciones"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Login = lazy(() => import("./pages/Login"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));
const NotFound = lazy(() => import("./pages/NotFound"));


// Optimización de React Query con configuración de caché mejorada
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="h-10 w-10 rounded-full border-2 border-muted border-t-primary animate-spin" aria-label="Cargando" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
