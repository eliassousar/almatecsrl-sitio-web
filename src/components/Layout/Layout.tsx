
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import BreadcrumbNav from '../ui/breadcrumb-nav';
import WhatsAppButton from '../ui/whatsapp-button';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Skip to main content para accesibilidad */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-almatec-yellow text-almatec-black px-4 py-2 rounded-md font-medium"
      >
        Saltar al contenido principal
      </a>
      
      <Header />
      <BreadcrumbNav />
      
      <main 
        id="main-content" 
        className="flex-1 w-full"
        role="main"
        aria-label="Contenido principal"
      >
        {children}
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
