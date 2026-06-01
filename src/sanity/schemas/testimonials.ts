import { defineType, defineField } from "sanity";

export const testimonials = defineType({
  name: "testimonials",
  title: "⭐ Testimonios",
  type: "document",
  fields: [
    defineField({
      name: "titleEn",
      title: "Título sección (English)",
      type: "string",
      initialValue: "What Our Clients Say",
    }),
    defineField({
      name: "titleEs",
      title: "Título sección (Español)",
      type: "string",
      initialValue: "Lo Que Dicen Nuestros Clientes",
    }),
    defineField({
      name: "items",
      title: "Testimonios",
      type: "array",
      of: [
        {
          type: "object",
          name: "testimonial",
          title: "Testimonio",
          fields: [
            defineField({ name: "name", title: "Nombre / Rol", type: "string", description: "Ej: Homeowner, Business Owner" }),
            defineField({ name: "location", title: "Ciudad", type: "string", description: "Ej: Coral Gables" }),
            defineField({ name: "quoteEn", title: "Cita (English)", type: "text", rows: 3 }),
            defineField({ name: "quoteEs", title: "Cita (Español)", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "name", subtitle: "location" },
          },
        },
      ],
    }),
  ],
});
