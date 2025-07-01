
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreadcrumbNav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
