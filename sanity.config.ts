"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  basePath: "/cms",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  title: "Combo Studio Paint",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Combo Studio Paint CMS")
          .items([
            S.listItem().title("⚙️ Configuración").id("settings").child(
              S.document().schemaType("settings").documentId("siteSettings").title("⚙️ Configuración General")
            ),
            S.listItem().title("🏠 Hero").id("hero").child(
              S.document().schemaType("hero").documentId("siteHero").title("🏠 Hero")
            ),
            S.listItem().title("ℹ️ Nosotros").id("about").child(
              S.document().schemaType("about").documentId("siteAbout").title("ℹ️ Nosotros")
            ),
            S.listItem().title("⭐ Testimonios").id("testimonials").child(
              S.document().schemaType("testimonials").documentId("siteTestimonials").title("⭐ Testimonios")
            ),
            S.listItem().title("❓ Preguntas Frecuentes").id("faq").child(
              S.document().schemaType("faq").documentId("siteFAQ").title("❓ Preguntas Frecuentes")
            ),
            S.listItem().title("📝 Textos de la Web").id("pageText").child(
              S.document().schemaType("pageText").documentId("sitePageText").title("📝 Textos de la Web")
            ),
          ]),
    }),
    visionTool(),
  ],
});
