import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
  title: "ℹ️ Nosotros",
  type: "document",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título (línea 1)", type: "string" }),
        defineField({ name: "titleAccent", title: "Título (línea 2, acento)", type: "string" }),
        defineField({ name: "body", title: "Texto del cuerpo", type: "text", rows: 5 }),
      ],
    }),
    defineField({
      name: "es",
      title: "Español",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título (línea 1)", type: "string" }),
        defineField({ name: "titleAccent", title: "Título (línea 2, acento)", type: "string" }),
        defineField({ name: "body", title: "Texto del cuerpo", type: "text", rows: 5 }),
      ],
    }),
  ],
});
