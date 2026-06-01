import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "🏠 Hero",
  type: "document",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "sub", title: "Subtítulo", type: "text", rows: 3 }),
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "cta1", title: "CTA principal", type: "string" }),
        defineField({ name: "cta2", title: "CTA llamar", type: "string" }),
        defineField({ name: "cta3", title: "CTA WhatsApp", type: "string" }),
      ],
    }),
    defineField({
      name: "es",
      title: "Español",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Titular", type: "string" }),
        defineField({ name: "sub", title: "Subtítulo", type: "text", rows: 3 }),
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "cta1", title: "CTA principal", type: "string" }),
        defineField({ name: "cta2", title: "CTA llamar", type: "string" }),
        defineField({ name: "cta3", title: "CTA WhatsApp", type: "string" }),
      ],
    }),
  ],
});
