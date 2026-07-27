import { defineTool } from "@lovable.dev/mcp-js";
import {
  ALMATEC_ADDRESS,
  ALMATEC_BUSINESS_HOURS,
  ALMATEC_EMAILS,
  ALMATEC_PHONES,
  ALMATEC_SITE_URL,
  ALMATEC_SOCIAL,
} from "../../../config/contact";

export default defineTool({
  name: "get_company_info",
  title: "Información de la empresa",
  description:
    "Devuelve los datos oficiales de contacto de Almatec SRL: teléfonos, correos, dirección, horarios, redes sociales y sitio web.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      company: "Almatec SRL",
      website: ALMATEC_SITE_URL,
      phones: ALMATEC_PHONES.map((p) => p.displayFull),
      emails: ALMATEC_EMAILS,
      address: ALMATEC_ADDRESS,
      businessHours: ALMATEC_BUSINESS_HOURS,
      social: ALMATEC_SOCIAL,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
