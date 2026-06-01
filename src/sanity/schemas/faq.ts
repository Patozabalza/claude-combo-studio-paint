import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "❓ Preguntas Frecuentes",
  type: "document",
  fields: [
    defineField({
      name: "titleEn",
      title: "Título sección (English)",
      type: "string",
      initialValue: "Frequently Asked Questions",
    }),
    defineField({
      name: "titleEs",
      title: "Título sección (Español)",
      type: "string",
      initialValue: "Preguntas Frecuentes",
    }),
    defineField({
      name: "items",
      title: "Preguntas",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Pregunta",
          fields: [
            defineField({ name: "questionEn", title: "Pregunta (English)", type: "string" }),
            defineField({ name: "questionEs", title: "Pregunta (Español)", type: "string" }),
            defineField({ name: "answerEn", title: "Respuesta (English)", type: "text", rows: 4 }),
            defineField({ name: "answerEs", title: "Respuesta (Español)", type: "text", rows: 4 }),
          ],
          preview: {
            select: { title: "questionEs", subtitle: "questionEn" },
          },
        },
      ],
    }),
  ],
});
