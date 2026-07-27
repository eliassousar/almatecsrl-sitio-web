import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  productosAlmacenamiento,
  productosSecado,
  productosManejo,
  productosBalanzas,
  productosVolcadoras,
} from "../../../data/productos";

const CATEGORIES = {
  almacenamiento: productosAlmacenamiento,
  secado: productosSecado,
  manejo: productosManejo,
  balanzas: productosBalanzas,
  volcadoras: productosVolcadoras,
} as const;

export default defineTool({
  name: "list_products",
  title: "Listar productos",
  description:
    "Lista el catálogo de productos GSI de Almatec SRL (silos, secadoras, manejo de granos, balanzas y volcadoras), opcionalmente filtrado por categoría.",
  inputSchema: {
    category: z
      .enum(["almacenamiento", "secado", "manejo", "balanzas", "volcadoras"])
      .optional()
      .describe("Categoría de producto a listar. Si se omite, devuelve todas."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const entries = category
      ? [[category, CATEGORIES[category]] as const]
      : (Object.entries(CATEGORIES) as [keyof typeof CATEGORIES, typeof productosAlmacenamiento][]);

    const products = entries.flatMap(([cat, items]) =>
      items.map((p) => ({
        category: cat,
        name: p.name,
        description: p.description,
        specs: p.specs,
      })),
    );

    return {
      content: [{ type: "text", text: JSON.stringify(products, null, 2) }],
      structuredContent: { count: products.length, products },
    };
  },
});
