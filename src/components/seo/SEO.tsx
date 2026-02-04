import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const SEO = ({
  title = 'Almatec SRL - Soluciones Agrícolas de Alto Rendimiento',
  description = 'Representante oficial de silos GSI en Bolivia. Soluciones integrales de almacenamiento, secado y manejo de granos para el sector agroindustrial.',
  keywords = 'silos GSI, almacenamiento de granos, secado de granos, agroindustria Bolivia, silos metálicos, Almatec SRL',
  image = '/lovable-uploads/08c05001-4d71-4d61-80a1-eff7e7909dea.png',
  url = 'https://almatecsrl-sitio-web.lovable.app',
  type = 'website',
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title.includes('Almatec') ? title : `${title} | Almatec SRL`;

  return (
    <Helmet>
      {/* Título */}
      <title>{fullTitle}</title>

      {/* Meta tags básicos */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Almatec SRL" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="es_BO" />
      <meta property="og:site_name" content="Almatec SRL" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
