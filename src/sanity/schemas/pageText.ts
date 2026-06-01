import { defineType, defineField } from "sanity";

// Stores all remaining text not covered by dedicated schemas
// (nav, services, colorStudio, difference, process, areas, contact, footer)
export const pageText = defineType({
  name: "pageText",
  title: "📝 Textos de la Web",
  type: "document",
  groups: [
    { name: "nav", title: "Navegación" },
    { name: "services", title: "Servicios" },
    { name: "colorStudio", title: "Color Studio" },
    { name: "difference", title: "La Diferencia COMBO" },
    { name: "process", title: "Proceso" },
    { name: "areas", title: "Áreas" },
    { name: "contact", title: "Contacto" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // NAV
    defineField({
      name: "nav",
      title: "Navegación",
      type: "object",
      group: "nav",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "home", title: "Home", type: "string" }),
            defineField({ name: "services", title: "Services", type: "string" }),
            defineField({ name: "colorStudio", title: "Color Studio", type: "string" }),
            defineField({ name: "residential", title: "Residential", type: "string" }),
            defineField({ name: "commercial", title: "Commercial", type: "string" }),
            defineField({ name: "beforeAfter", title: "Before & After", type: "string" }),
            defineField({ name: "process", title: "Process", type: "string" }),
            defineField({ name: "areas", title: "Areas", type: "string" }),
            defineField({ name: "contact", title: "Contact", type: "string" }),
            defineField({ name: "cta", title: "CTA Button", type: "string" }),
          ],
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "object",
          fields: [
            defineField({ name: "home", title: "Inicio", type: "string" }),
            defineField({ name: "services", title: "Servicios", type: "string" }),
            defineField({ name: "colorStudio", title: "Estudio de Color", type: "string" }),
            defineField({ name: "residential", title: "Residencial", type: "string" }),
            defineField({ name: "commercial", title: "Comercial", type: "string" }),
            defineField({ name: "beforeAfter", title: "Antes & Después", type: "string" }),
            defineField({ name: "process", title: "Proceso", type: "string" }),
            defineField({ name: "areas", title: "Áreas", type: "string" }),
            defineField({ name: "contact", title: "Contacto", type: "string" }),
            defineField({ name: "cta", title: "Botón CTA", type: "string" }),
          ],
        }),
      ],
    }),

    // RESIDENTIAL SERVICES
    defineField({
      name: "residential",
      title: "Servicios Residenciales",
      type: "object",
      group: "services",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título sección", type: "string" }),
            defineField({ name: "sub", title: "Subtítulo", type: "text", rows: 2 }),
            defineField({ name: "s1", title: "Servicio 1", type: "string" }),
            defineField({ name: "s2", title: "Servicio 2", type: "string" }),
            defineField({ name: "s3", title: "Servicio 3", type: "string" }),
            defineField({ name: "s4", title: "Servicio 4", type: "string" }),
            defineField({ name: "s5", title: "Servicio 5", type: "string" }),
            defineField({ name: "s6", title: "Servicio 6", type: "string" }),
            defineField({ name: "s7", title: "Servicio 7", type: "string" }),
            defineField({ name: "s8", title: "Servicio 8", type: "string" }),
            defineField({ name: "s9", title: "Servicio 9", type: "string" }),
            defineField({ name: "s10", title: "Servicio 10", type: "string" }),
          ],
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título sección", type: "string" }),
            defineField({ name: "sub", title: "Subtítulo", type: "text", rows: 2 }),
            defineField({ name: "s1", title: "Servicio 1", type: "string" }),
            defineField({ name: "s2", title: "Servicio 2", type: "string" }),
            defineField({ name: "s3", title: "Servicio 3", type: "string" }),
            defineField({ name: "s4", title: "Servicio 4", type: "string" }),
            defineField({ name: "s5", title: "Servicio 5", type: "string" }),
            defineField({ name: "s6", title: "Servicio 6", type: "string" }),
            defineField({ name: "s7", title: "Servicio 7", type: "string" }),
            defineField({ name: "s8", title: "Servicio 8", type: "string" }),
            defineField({ name: "s9", title: "Servicio 9", type: "string" }),
            defineField({ name: "s10", title: "Servicio 10", type: "string" }),
          ],
        }),
      ],
    }),

    // COMMERCIAL SERVICES
    defineField({
      name: "commercial",
      title: "Servicios Comerciales",
      type: "object",
      group: "services",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título sección", type: "string" }),
            defineField({ name: "sub", title: "Subtítulo", type: "text", rows: 2 }),
            defineField({ name: "s1", title: "Servicio 1", type: "string" }),
            defineField({ name: "s2", title: "Servicio 2", type: "string" }),
            defineField({ name: "s3", title: "Servicio 3", type: "string" }),
            defineField({ name: "s4", title: "Servicio 4", type: "string" }),
            defineField({ name: "s5", title: "Servicio 5", type: "string" }),
            defineField({ name: "s6", title: "Servicio 6", type: "string" }),
            defineField({ name: "s7", title: "Servicio 7", type: "string" }),
          ],
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título sección", type: "string" }),
            defineField({ name: "sub", title: "Subtítulo", type: "text", rows: 2 }),
            defineField({ name: "s1", title: "Servicio 1", type: "string" }),
            defineField({ name: "s2", title: "Servicio 2", type: "string" }),
            defineField({ name: "s3", title: "Servicio 3", type: "string" }),
            defineField({ name: "s4", title: "Servicio 4", type: "string" }),
            defineField({ name: "s5", title: "Servicio 5", type: "string" }),
            defineField({ name: "s6", title: "Servicio 6", type: "string" }),
            defineField({ name: "s7", title: "Servicio 7", type: "string" }),
          ],
        }),
      ],
    }),

    // COLOR STUDIO
    defineField({
      name: "colorStudio",
      title: "Color Studio",
      type: "object",
      group: "colorStudio",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "body", title: "Texto", type: "text", rows: 5 }),
            defineField({ name: "quote", title: "Cita destacada", type: "string" }),
          ],
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "body", title: "Texto", type: "text", rows: 5 }),
            defineField({ name: "quote", title: "Cita destacada", type: "string" }),
          ],
        }),
      ],
    }),

    // DIFFERENCE
    defineField({
      name: "difference",
      title: "La Diferencia COMBO",
      type: "object",
      group: "difference",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título sección", type: "string" }),
            defineField({ name: "d1", title: "Diferenciador 1", type: "string" }),
            defineField({ name: "d2", title: "Diferenciador 2", type: "string" }),
            defineField({ name: "d3", title: "Diferenciador 3", type: "string" }),
            defineField({ name: "d4", title: "Diferenciador 4", type: "string" }),
            defineField({ name: "d5", title: "Diferenciador 5", type: "string" }),
            defineField({ name: "d6", title: "Diferenciador 6", type: "string" }),
            defineField({ name: "d7", title: "Diferenciador 7", type: "string" }),
            defineField({ name: "d8", title: "Diferenciador 8", type: "string" }),
            defineField({ name: "d9", title: "Diferenciador 9", type: "string" }),
          ],
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título sección", type: "string" }),
            defineField({ name: "d1", title: "Diferenciador 1", type: "string" }),
            defineField({ name: "d2", title: "Diferenciador 2", type: "string" }),
            defineField({ name: "d3", title: "Diferenciador 3", type: "string" }),
            defineField({ name: "d4", title: "Diferenciador 4", type: "string" }),
            defineField({ name: "d5", title: "Diferenciador 5", type: "string" }),
            defineField({ name: "d6", title: "Diferenciador 6", type: "string" }),
            defineField({ name: "d7", title: "Diferenciador 7", type: "string" }),
            defineField({ name: "d8", title: "Diferenciador 8", type: "string" }),
            defineField({ name: "d9", title: "Diferenciador 9", type: "string" }),
          ],
        }),
      ],
    }),

    // PROCESS
    defineField({
      name: "process",
      title: "Proceso",
      type: "object",
      group: "process",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "s1", title: "Paso 1", type: "string" }),
            defineField({ name: "s2", title: "Paso 2", type: "string" }),
            defineField({ name: "s3", title: "Paso 3", type: "string" }),
            defineField({ name: "s4", title: "Paso 4", type: "string" }),
            defineField({ name: "s5", title: "Paso 5", type: "string" }),
            defineField({ name: "s6", title: "Paso 6", type: "string" }),
            defineField({ name: "s7", title: "Paso 7", type: "string" }),
          ],
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "s1", title: "Paso 1", type: "string" }),
            defineField({ name: "s2", title: "Paso 2", type: "string" }),
            defineField({ name: "s3", title: "Paso 3", type: "string" }),
            defineField({ name: "s4", title: "Paso 4", type: "string" }),
            defineField({ name: "s5", title: "Paso 5", type: "string" }),
            defineField({ name: "s6", title: "Paso 6", type: "string" }),
            defineField({ name: "s7", title: "Paso 7", type: "string" }),
          ],
        }),
      ],
    }),

    // AREAS
    defineField({
      name: "areas",
      title: "Áreas de Servicio",
      type: "object",
      group: "areas",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "body", title: "Descripción", type: "text", rows: 3 }),
          ],
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "body", title: "Descripción", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),

    // CONTACT
    defineField({
      name: "contact",
      title: "Formulario de Contacto",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "sub", title: "Subtítulo", type: "string" }),
            defineField({ name: "cta", title: "Botón enviar", type: "string" }),
          ],
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "sub", title: "Subtítulo", type: "string" }),
            defineField({ name: "cta", title: "Botón enviar", type: "string" }),
          ],
        }),
      ],
    }),

    // FOOTER
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "taglineEn", title: "Tagline (English)", type: "string" }),
        defineField({ name: "taglineEs", title: "Tagline (Español)", type: "string" }),
      ],
    }),
  ],
});
