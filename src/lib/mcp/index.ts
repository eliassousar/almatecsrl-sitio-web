import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list-products";
import getCompanyInfo from "./tools/get-company-info";
import listContactInquiries from "./tools/list-contact-inquiries";
import listQuoteRequests from "./tools/list-quote-requests";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "almatec-mcp",
  title: "Almatec SRL MCP",
  version: "0.1.0",
  instructions:
    "Herramientas de Almatec SRL en Bolivia. Usa `list_products` y `get_company_info` para catálogo y contacto público. `list_contact_inquiries` y `list_quote_requests` requieren sesión autenticada con rol admin o sales y devuelven solo campos comerciales explícitos; viewer no recibe filas de leads y solo puede consultar agregados autorizados por el dashboard.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listProducts, getCompanyInfo, listContactInquiries, listQuoteRequests],
});
