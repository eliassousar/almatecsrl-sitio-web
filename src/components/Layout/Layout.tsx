
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../ui/scroll-to-top';
import WhatsAppButton from '../ui/whatsapp-button';
import LiveChat from '../ui/live-chat';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <LiveChat />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
