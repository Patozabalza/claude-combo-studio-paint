import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "⚙️ Configuración General",
  type: "document",
  groups: [
    { name: "general", title: "📋 General" },
    { name: "tracking", title: "📊 Tracking & Analytics" },
  ],
  fields: [
    defineField({ name: "phone", title: "Teléfono (display)", type: "string", description: "Ej: +1 (305) 542-6364", group: "general" }),
    defineField({ name: "whatsapp", title: "WhatsApp (número completo)", type: "string", description: "Ej: 13055426364", group: "general" }),
    defineField({ name: "email", title: "Email", type: "string", group: "general" }),
    defineField({
      name: "stats",
      title: "Estadísticas (sección Nosotros)",
      type: "object",
      group: "general",
      fields: [
        defineField({ name: "projects", title: "Proyectos completados", type: "string", description: "Ej: 500+" }),
        defineField({ name: "years", title: "Años de experiencia", type: "string", description: "Ej: 10+" }),
        defineField({ name: "satisfaction", title: "Satisfacción del cliente", type: "string", description: "Ej: 100%" }),
      ],
    }),
    defineField({
      name: "tracking",
      title: "Tracking & Analytics",
      type: "object",
      group: "tracking",
      description: "Pega aquí los IDs de tus plataformas de medición. Los cambios se reflejan en el sitio automáticamente.",
      fields: [
        defineField({
          name: "gtmId",
          title: "Google Tag Manager — Container ID",
          type: "string",
          description: "Formato: GTM-XXXXXXX · Encuéntralo en tagmanager.google.com → Administrador → ID del contenedor",
          placeholder: "GTM-XXXXXXX",
          validation: (Rule) => Rule.regex(/^GTM-[A-Z0-9]+$/, { name: "GTM ID" }),
        }),
        defineField({
          name: "ga4Id",
          title: "Google Analytics 4 — Measurement ID",
          type: "string",
          description: "Formato: G-XXXXXXXXXX · Solo si usas GA4 directo sin GTM. Si ya tienes GTM configurado, déjalo vacío.",
          placeholder: "G-XXXXXXXXXX",
          validation: (Rule) => Rule.regex(/^G-[A-Z0-9]+$/, { name: "GA4 ID" }),
        }),
        defineField({
          name: "metaPixelId",
          title: "Meta (Facebook) Pixel ID",
          type: "string",
          description: "Formato: número de 15-16 dígitos · Encuéntralo en Meta Business Suite → Events Manager",
          placeholder: "123456789012345",
          validation: (Rule) => Rule.regex(/^\d{15,16}$/, { name: "Meta Pixel ID" }),
        }),
        defineField({
          name: "googleAdsId",
          title: "Google Ads — Conversion ID",
          type: "string",
          description: "Formato: AW-XXXXXXXXXX · Encuéntralo en Google Ads → Herramientas → Conversiones",
          placeholder: "AW-XXXXXXXXXX",
          validation: (Rule) => Rule.regex(/^AW-\d+$/, { name: "Google Ads ID" }),
        }),
      ],
    }),
  ],
});
