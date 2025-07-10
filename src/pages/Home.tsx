import Hero from '@/components/home/Hero';
import MarcasSection from '@/components/home/MarcasSection';
import LineaProductos from '@/components/home/LineaProductos';
import ServiciosSection from '@/components/home/ServiciosSection';
import ContactoSection from '@/components/home/ContactoSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Almatec - Soluciones Integrales para la Agroindustria',
  description: 'Ofrecemos soluciones integrales para la agroindustria, desde el almacenamiento hasta el manejo de granos. ¡Contáctanos hoy!',
}

const productosDestacados = [
  {
    title: "Silos de Almacenamiento",
    description: "Sistemas de almacenamiento ventilados de alta capacidad para la conservación óptima de granos.",
    image: "/lovable-uploads/bb3e9329-ad88-485a-a354-d83f8632994f.png",
    category: "Almacenamiento"
  },
  {
    title: "Sistemas de Secado", 
    description: "Equipos de secado continuo con flujo de aire cruzado para un procesamiento eficiente.",
    image: "/lovable-uploads/d1e07e63-b4f8-48b3-9a56-1baef2ced2e9.png",
    category: "Secado"
  },
  {
    title: "Manejo de Granos",
    description: "Sistemas completos de transporte y manejo para optimizar el flujo de granos en su planta.",
    image: "/lovable-uploads/78866758-f51a-4f00-942d-d37f9de1a6c0.png",
    category: "Transporte"
  }
];

const Home = () => {
  return (
    <>
      <Hero />
      <MarcasSection />
      <LineaProductos productos={productosDestacados} />
      <ServiciosSection />
      <ContactoSection />
    </>
  );
};

export default Home;
