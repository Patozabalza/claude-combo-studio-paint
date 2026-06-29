export type AeoTaskStatus = "done" | "pending";

export type AeoCategory =
  | "Indexación IA"
  | "Datos Estructurados"
  | "Presencia Externa"
  | "Monitoreo";

export interface AeoChecklistItem {
  id: string;
  label: string;
  category: AeoCategory;
  status: AeoTaskStatus;
}

// Checklist estático: refleja tareas AEO completadas y pendientes.
// Actualizar manualmente a medida que se completen nuevas fases.
export const AEO_CHECKLIST: AeoChecklistItem[] = [
  { id: "llms-txt", label: "llms.txt publicado en la raíz pública", category: "Indexación IA", status: "done" },
  { id: "jsonld-housepainter", label: "JSON-LD HousePainter con matriz de servicios (Limewash, Venetian Plaster, Roman Clay, Hospitality)", category: "Datos Estructurados", status: "done" },
  { id: "jsonld-localbusiness", label: "JSON-LD LocalBusiness + WebSite + FAQPage", category: "Datos Estructurados", status: "done" },
  { id: "og-twitter", label: "Open Graph y Twitter Card metadata", category: "Datos Estructurados", status: "done" },
  { id: "sitemap", label: "Sitemap.xml declarado en robots.txt", category: "Indexación IA", status: "done" },
  { id: "aeo-dashboard", label: "Dashboard de monitoreo AEO con acceso protegido por token", category: "Monitoreo", status: "done" },
  { id: "gbp", label: "Google Business Profile verificado y enlazado", category: "Presencia Externa", status: "pending" },
  { id: "bing-indexnow", label: "Indexación en Bing Webmaster Tools / IndexNow", category: "Indexación IA", status: "pending" },
  { id: "directories", label: "Perfil verificado en directorios (Apple Maps, Yelp)", category: "Presencia Externa", status: "pending" },
  { id: "faq-expansion", label: "FAQPage ampliado con preguntas de intención comercial (Hospitality, Limewash)", category: "Datos Estructurados", status: "pending" },
  { id: "ai-mentions", label: "Monitoreo recurrente de menciones en respuestas de ChatGPT, Gemini y Perplexity", category: "Monitoreo", status: "pending" },
];

export function getAeoScore(items: AeoChecklistItem[] = AEO_CHECKLIST) {
  const done = items.filter((item) => item.status === "done").length;
  const total = items.length;
  return { done, total, percent: Math.round((done / total) * 100) };
}
