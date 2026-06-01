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
            S.documentTypeListItem("settings").title("⚙️ Configuración"),
            S.documentTypeListItem("hero").title("🏠 Hero"),
            S.documentTypeListItem("about").title("ℹ️ Nosotros"),
            S.documentTypeListItem("testimonials").title("⭐ Testimonios"),
            S.documentTypeListItem("faq").title("❓ Preguntas Frecuentes"),
            S.documentTypeListItem("pageText").title("📝 Textos de la Web"),
          ]),
    }),
    visionTool(),
  ],
});
