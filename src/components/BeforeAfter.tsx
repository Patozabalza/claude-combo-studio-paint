"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const projects = [
  {
    before: "/images/proyectos/4.png",
    after: "/images/proyectos/1.png",
    label: "Residential · Miami Beach",
    labelEs: "Residencial · Miami Beach",
  },
  {
    before: "/images/proyectos/3.png",
    after: "/images/proyectos/2.png",
    label: "Commercial · Downtown Miami",
    labelEs: "Comercial · Downtown Miami",
  },
];

export default function BeforeAfter() {
  const { t, lang } = useLanguage();
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="before-after" className="py-28 lg:py-40 bg-[#F4F0E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#E77B00]" />
            <span className="text-[#E77B00] text-xs font-medium tracking-[0.25em] uppercase">Before & After</span>
            <span className="w-10 h-px bg-[#E77B00]" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F] mb-6">
            {t("ba.title")}
          </h2>
          <p className="text-[#5B3A29]/65 text-lg font-light leading-relaxed">
            {t("ba.sub")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <div key={i} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative cursor-zoom-in group" onClick={() => setLightbox(project.before)}>
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={project.before}
                      alt="Before"
                      fill
                      className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-[#1F1F1F]/25 group-hover:bg-[#1F1F1F]/40 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 bg-[#1F1F1F] text-white text-[10px] font-semibold px-3 py-1.5 tracking-[0.2em] uppercase">
                    {t("ba.before")}
                  </div>
                </div>
                <div className="relative cursor-zoom-in group" onClick={() => setLightbox(project.after)}>
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={project.after}
                      alt="After"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-[#1F1F1F]/0 group-hover:bg-[#1F1F1F]/20 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 bg-[#E77B00] text-white text-[10px] font-semibold px-3 py-1.5 tracking-[0.2em] uppercase">
                    {t("ba.after")}
                  </div>
                </div>
              </div>
              <p className="text-[#5B3A29]/40 text-xs font-medium text-center tracking-[0.15em] uppercase">
                {lang === "es" ? project.labelEs : project.label}
              </p>
            </div>
          ))}
        </div>
      </div>

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
    </section>
  );
}
