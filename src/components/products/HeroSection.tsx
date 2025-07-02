const HeroSection = () => (
  <section className="relative bg-gradient-to-br from-almatec-dark-gray to-almatec-black text-almatec-white">
    <div className="absolute inset-0 bg-black/50 z-10"></div>
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')"
      }}
    ></div>
    
    <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="max-w-4xl">
        <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 leading-tight">
          SOLUCIONES INTEGRALES
          <span className="text-almatec-yellow"> GSI</span> PARA EL SECTOR AGRÍCOLA
        </h1>
        <h2 className="font-montserrat text-2xl md:text-3xl text-almatec-yellow mb-6">
          Tecnología de vanguardia para maximizar la productividad y rentabilidad de su operación
        </h2>
        <p className="font-open-sans text-lg md:text-xl text-gray-200 max-w-4xl leading-relaxed">
          Almatec SRL ofrece la línea completa de soluciones GSI, reconocida mundialmente por su calidad, seguridad, 
          confiabilidad y durabilidad. Con más de 50 años de experiencia, GSI desarrolla sistemas de almacenamiento 
          y manejo de granos que revolucionan la operativa agrícola, aumentando la rentabilidad y garantizando la 
          seguridad de sus granos cosecha tras cosecha.
        </p>
      </div>
    </div>
  </section>
);

export default HeroSection;