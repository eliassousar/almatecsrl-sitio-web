export interface Producto {
  id: number;
  name: string;
  description: string;
  image: string;
  specs: string[];
}

export const productosAlmacenamiento: Producto[] = [
  {
    id: 1,
    name: "Silos de Fondo Plano EVO 50",
    description: "Para cumplir con las diversas aplicaciones requeridas, GSI ofrece una completa línea de silos de almacenamiento ventilados de fondo plano. Esta línea abarca capacidades desde 90 m³ hasta 41.165 m³, adaptándose a las necesidades específicas de cada productor.",
    image: "/lovable-uploads/bb3e9329-ad88-485a-a354-d83f8632994f.png",
    specs: [
      "Capacidades desde 90 m³ hasta 41.165 m³",
      "Sistema de ventilación integrado",
      "Diseño versátil para diversas aplicaciones",
      "Construcción robusta con estándares de calidad GSI"
    ]
  },
  {
    id: 2,
    name: "Silos de Fondo Cónico EVO 50",
    description: "Los silos de fondo cónico EVO 50 de GSI ofrecen mayor agilidad en la descarga, optimizando el flujo de granos y reduciendo tiempos de operación. Su diseño cónico facilita la descarga completa del producto almacenado.",
    image: "/lovable-uploads/bb0c281c-6e9a-48ed-b2ab-bc5a3251358d.png",
    specs: [
      "Diseño cónico que facilita la descarga completa",
      "Mayor eficiencia en el manejo de granos",
      "Construcción duradera con tecnología EVO 50",
      "Ideal para operaciones que requieren descargas frecuentes"
    ]
  },
  {
    id: 3,
    name: "Roscas Barredoras",
    description: "Las roscas barredoras de GSI ofrecen la tecnología que su propiedad necesita para almacenar granos de manera segura y lograr mejores resultados. Son capaces de auxiliar en la descarga de silos y brindan agilidad, eficiencia y robustez, minimizando el acceso del operador al interior de los silos.",
    image: "/lovable-uploads/8b70f38c-5c2b-4e4c-8fcd-e0135e9d31a7.png",
    specs: [
      "Tecnología avanzada para descarga eficiente",
      "Mayor seguridad al minimizar el acceso del operador al interior",
      "Robustez y durabilidad",
      "Mejora la eficiencia operativa",
      "Compatible con los sistemas de silos GSI"
    ]
  },
  {
    id: 4,
    name: "Esparcidor de Granos",
    description: "El esparcidor de granos GSI asegura una distribución uniforme del grano dentro del silo, optimizando el espacio de almacenamiento y mejorando la aireación. Esto contribuye a una mejor conservación del grano y a la prevención de puntos calientes.",
    image: "/lovable-uploads/b1109187-68a8-45ef-b7c0-959aed07cfe3.png",
    specs: [
      "Distribución uniforme del grano",
      "Optimización del espacio de almacenamiento",
      "Mejora la aireación",
      "Contribuye a la conservación del grano",
      "Previene puntos calientes"
    ]
  }
];

export const productosSecado: Producto[] = [
  {
    id: 5,
    name: "Process Dryer",
    description: "Secadora de granos con tecnología original GSI y sistema de secado continuo con flujo de aire cruzado, proporciona granos secos con calidad superior. Fue desarrollada para trabajar con diferentes tipos de granos, ya sea con fines comerciales o para la producción de semillas.",
    image: "/lovable-uploads/d1e07e63-b4f8-48b3-9a56-1baef2ced2e9.png",
    specs: [
      "Tecnología original GSI",
      "Sistema de secado continuo con flujo de aire cruzado",
      "Calidad superior de secado",
      "Versatilidad para diferentes tipos de granos",
      "Mantiene la integridad del grano",
      "Ideal tanto para uso comercial como para producción de semillas"
    ]
  },
  {
    id: 6,
    name: "Sistema de Aireación y Ventiladores",
    description: "Los sistemas de aireación de los silos GSI se dimensionan de acuerdo al producto almacenado y a la tasa de aireación (flujo de aire) necesaria para la conservación del grano. Se encuentran disponibles sistemas de aireación de canal y de piso 100% perforado.",
    image: "/lovable-uploads/e35fc5b9-1b54-4cb1-81e6-bc564e15499b.png",
    specs: [
      "Dimensionamiento personalizado según el producto almacenado",
      "Adaptación a la tasa de aireación necesaria",
      "Disponible en sistemas de canal y de piso 100% perforado",
      "Diseñado para la óptima conservación del grano",
      "Compatible con los sistemas de silos GSI"
    ]
  },
  {
    id: 7,
    name: "Portable Dryers",
    description: "Las secadoras portátiles GSI ofrecen flexibilidad y eficiencia para el secado de granos en diferentes ubicaciones. Son ideales para operaciones que requieren movilidad y un secado rápido y efectivo.",
    image: "/lovable-uploads/9fb7021e-e36f-406c-bf46-205a18fa659c.png",
    specs: [
      "Flexibilidad y movilidad",
      "Secado rápido y efectivo",
      "Ideal para diferentes ubicaciones",
      "Construcción robusta y duradera",
      "Fácil de operar y mantener"
    ]
  },
  {
    id: 8,
    name: "TopDry",
    description: "El sistema TopDry de GSI combina el secado y el almacenamiento en una sola unidad, ofreciendo una solución compacta y eficiente para el manejo de granos. Permite secar y enfriar el grano antes de almacenarlo, optimizando el proceso.",
    image: "/lovable-uploads/5455be7f-63a4-40ec-9625-1b637a5f7c88.png",
    specs: [
      "Combina secado y almacenamiento en una unidad",
      "Solución compacta y eficiente",
      "Secado y enfriamiento del grano antes del almacenamiento",
      "Optimiza el proceso de manejo de granos",
      "Reduce la necesidad de equipos adicionales"
    ]
  }
];

export const productosManejo: Producto[] = [
  {
    id: 9,
    name: "Elevadores",
    description: "Fabricados con componentes de alta calidad y construcción robusta, los elevadores de granos GSI cuentan con alta durabilidad, operación continua y la mejor relación costo-beneficio para su producción.",
    image: "/lovable-uploads/78866758-f51a-4f00-942d-d37f9de1a6c0.png",
    specs: [
      "Componentes de alta calidad",
      "Construcción robusta",
      "Alta durabilidad",
      "Operación continua",
      "Excelente relación costo-beneficio",
      "Diseñados para uso intensivo en operaciones agrícolas"
    ]
  },
  {
    id: 10,
    name: "Transportadores de Cadena",
    description: "Los transportadores de cadena GSI son extremadamente eficientes para el transporte de los granos en forma horizontal o vertical en la planta almacenadora, optimizando el flujo de material y reduciendo tiempos de operación.",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Alta eficiencia en el transporte de granos",
      "Versatilidad para transporte horizontal o vertical",
      "Diseño robusto para plantas almacenadoras",
      "Integración perfecta con otros sistemas GSI",
      "Optimización del flujo de granos en la planta"
    ]
  },
  {
    id: 11,
    name: "Cintas/Correas Transportadoras",
    description: "La tecnología aplicada en los mayores proyectos de almacenamiento globales llega a usted a través de dos líneas de cintas/correas GSI. Estos modelos emplean una solución inteligente, silenciosa y versátil para el transporte de granos horizontal e inclinado en distancias cortas, medias y largas.",
    image: "/lovable-uploads/f3419807-79a8-4523-9743-9cb6795e00db.png",
    specs: [
      "Tecnología de nivel mundial",
      "Solución inteligente y silenciosa",
      "Versatilidad para transporte horizontal e inclinado",
      "Adaptable a distancias cortas, medias y largas",
      "Diseño eficiente para minimizar el daño al grano",
      "Operación silenciosa para mejor ambiente de trabajo"
    ]
  },
  {
    id: 12,
    name: "Máquina de Prelimpieza",
    description: "Las máquinas de prelimpieza de GSI separan las impurezas de todo tipo de granos, mejorando la calidad del producto almacenado y reduciendo riesgos de contaminación durante el almacenamiento.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Separación eficiente de impurezas",
      "Compatible con diversos tipos de granos",
      "Mejora la calidad del producto almacenado",
      "Reduce riesgos de contaminación",
      "Optimiza el proceso de almacenamiento",
      "Prolonga la vida útil del grano almacenado"
    ]
  }
];