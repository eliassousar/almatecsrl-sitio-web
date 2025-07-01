
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeLabels: Record<string, string> = {
    'sobre-nosotros': 'Sobre Nosotros',
    'productos': 'Productos',
    'servicios': 'Servicios',
    'proyectos': 'Proyectos',
    'contacto': 'Contacto',
    'politica-privacidad': 'Política de Privacidad',
    'terminos-condiciones': 'Términos y Condiciones',
    'faq': 'Preguntas Frecuentes'
  };

  if (pathnames.length === 0) return null;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Inicio', path: '/' },
    ...pathnames.map((pathname, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const label = routeLabels[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
      return { label, path };
    })
  ];

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" />
              )}
              {index === 0 && (
                <Home className="w-4 h-4 text-gray-500 mr-1" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-almatec-dark-gray" aria-current="page">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-gray-600 hover:text-almatec-yellow transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbNav;
