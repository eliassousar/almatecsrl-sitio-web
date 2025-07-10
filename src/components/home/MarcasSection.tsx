
const MarcasSection = () => {
  const marcas = [
    { name: "Chief", logo: "/lovable-uploads/2d924d1b-1e2d-4145-8f7c-a101eb817498.png" },
    { name: "Brock", logo: "/lovable-uploads/20b0ade2-f758-4313-9202-802e946a8e9c.png" },
    { name: "Superior", logo: "/lovable-uploads/8dcfbef7-bc28-41e0-afdb-5be5a5f92626.png" },
    { name: "GSI", logo: "/lovable-uploads/4636726b-0882-42cd-827f-edf9bd0df859.png" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-almatec-blue mb-12">
          Marcas Líderes que Representamos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {marcas.map((marca, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <img 
                src={marca.logo} 
                alt={`Logo ${marca.name}`}
                className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarcasSection;
