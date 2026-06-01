import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "⚙️ Configuración General",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Teléfono (display)", type: "string", description: "Ej: +1 (305) 542-6364" }),
    defineField({ name: "whatsapp", title: "WhatsApp (número completo)", type: "string", description: "Ej: 13055426364" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "stats",
      title: "Estadísticas (sección Nosotros)",
      type: "object",
      fields: [
        defineField({ name: "projects", title: "Proyectos completados", type: "string", description: "Ej: 500+" }),
        defineField({ name: "years", title: "Años de experiencia", type: "string", description: "Ej: 10+" }),
        defineField({ name: "satisfaction", title: "Satisfacción del cliente", type: "string", description: "Ej: 100%" }),
      ],
    }),
  ],
});
