"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"residential" | "commercial" | "signature">("residential");
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const residential = [
    t("residential.s1"), t("residential.s2"), t("residential.s3"),
    t("residential.s4"), t("residential.s5"), t("residential.s6"),
    t("residential.s7"), t("residential.s8"), t("residential.s9"), t("residential.s10"),
  ];

  const commercial = [
    t("commercial.s1"), t("commercial.s2"), t("commercial.s3"),
    t("commercial.s4"), t("commercial.s5"), t("commercial.s6"), t("commercial.s7"),
  ];

  const signature = [
    "Limewash Finishes", "Roman Clay Finishes", "Venetian Plaster",
    "Textured Feature Walls", "Luxury Matte Finishes", "Decorative Architectural Finishes",
    "Designer Color Consultation", "Warm Neutral Palette Design", "Earthy Mediterranean Finishes",
    "Modern Organic Interior Finishes", "Monochromatic Luxury Walls", "Seamless Architectural Finishes",
    "Custom Accent Walls", "High-End Wall Textures", "Architectural Color Direction",
    "Contemporary Interior Wall Treatments", "Premium Decorative Coatings", "Soft Matte Wall Systems",
    "Bespoke Finish Applications", "Modern Luxury Surface Finishes",
  ];

  return (
    <section id="services" className="py-28 lg:py-40 bg-[#F4F0E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#E77B00]" />
              <span className="text-[#E77B00] text-xs font-medium tracking-[0.25em] uppercase">Services</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F]">
              {tab === "residential" ? t("residential.title") : tab === "commercial" ? t("commercial.title") : "Signature Services"}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border border-[#D9CBB8] rounded-sm overflow-hidden self-start flex-wrap">
            <button
              onClick={() => setTab("residential")}
              className={`px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                tab === "residential"
                  ? "bg-[#E77B00] text-white"
                  : "text-[#5B3A29]/60 hover:text-[#5B3A29] hover:bg-[#D9CBB8]/20"
              }`}
            >
              {t("nav.residential")}
            </button>
            <button
              onClick={() => setTab("commercial")}
              className={`px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                tab === "commercial"
                  ? "bg-[#E77B00] text-white"
                  : "text-[#5B3A29]/60 hover:text-[#5B3A29] hover:bg-[#D9CBB8]/20"
              }`}
            >
              {t("nav.commercial")}
            </button>
            <button
              onClick={() => setTab("signature")}
              className={`px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                tab === "signature"
                  ? "bg-[#1F1F1F] text-white"
                  : "text-[#5B3A29]/60 hover:text-[#5B3A29] hover:bg-[#D9CBB8]/20"
              }`}
            >
              Signature
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Service list */}
          <div>
            <p className="text-[#5B3A29]/65 text-base mb-10 font-light leading-relaxed">
              {tab === "residential" ? t("residential.sub") : tab === "commercial" ? t("commercial.sub") : "Luxury decorative wall finishes that define the character of premium interiors — from ancient Roman clay to contemporary limewash and bespoke Venetian plaster."}
            </p>
            <ul className="space-y-0 border-t border-[#D9CBB8]/50">
              {(tab === "residential" ? residential : tab === "commercial" ? commercial : signature).map((service, i) => (
                <li key={i} className="flex items-center gap-4 py-4 border-b border-[#D9CBB8]/50 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E77B00] flex-shrink-0" />
                  <span className="text-[#1F1F1F] text-sm font-medium group-hover:text-[#E77B00] transition-colors duration-200">{service}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-10 bg-[#E77B00] hover:bg-[#C96900] text-white font-medium px-8 py-4 rounded-sm transition-colors duration-300 text-xs tracking-widest uppercase"
            >
              {t("nav.cta")}
            </a>
          </div>

          {/* Images */}
          {tab === "signature" ? (
            <div className="grid grid-cols-2 gap-3">
              {["/images/pintor/34.png", "/images/pintor/32.png"].map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden cursor-zoom-in group"
                  style={{ height: "580px" }}
                  onClick={() => setLightbox(src)}
                >
                  <Image
                    src={src}
                    alt="Signature finish"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-[#1F1F1F]/0 group-hover:bg-[#1F1F1F]/20 transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {[
                tab === "residential" ? "/images/pintor/5.png" : "/images/pintor/15.png",
                tab === "residential" ? "/images/proyectos/1.png" : "/images/pintor/7.png",
                tab === "residential" ? "/images/pintor/20.png" : "/images/pintor/10.png",
                tab === "residential" ? "/images/proyectos/4.png" : "/images/pintor/17.png",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative h-72 overflow-hidden cursor-zoom-in group"
                  onClick={() => setLightbox(src)}
                >
                  <Image
                    src={src}
                    alt="Painting project"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-[#1F1F1F]/0 group-hover:bg-[#1F1F1F]/20 transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lightbox */}
          {lightbox && (
            <div
              className="fixed inset-0 z-50 bg-[#1F1F1F]/95 flex items-center justify-center p-6"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                onClick={() => setLightbox(null)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div
                className="relative w-full max-w-5xl max-h-[85vh] aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightbox}
                  alt="Project detail"
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
