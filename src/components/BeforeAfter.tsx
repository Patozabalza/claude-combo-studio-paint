"use client";

import Image from "next/image";
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

  return (
    <section id="before-after" className="py-24 lg:py-32 bg-[#F4F0E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-[#E77B00]" />
            <span className="text-[#E77B00] text-xs font-semibold tracking-[0.2em] uppercase">Before & After</span>
            <span className="w-8 h-px bg-[#E77B00]" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F] mb-4 max-w-2xl mx-auto">
            {t("ba.title")}
          </h2>
          <p className="text-[#5B3A29]/65 text-lg font-light max-w-xl mx-auto">
            {t("ba.sub")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <div key={i} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={project.before}
                      alt="Before"
                      fill
                      className="object-cover grayscale"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-[#1F1F1F]/30" />
                  </div>
                  <div className="absolute top-3 left-3 bg-[#1F1F1F]/80 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded tracking-widest uppercase">
                    {t("ba.before")}
                  </div>
                </div>
                <div className="relative">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={project.after}
                      alt="After"
                      fill
                      className="object-cover"
                      quality={75}
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-[#E77B00] text-white text-xs font-semibold px-3 py-1.5 rounded tracking-widest uppercase">
                    {t("ba.after")}
                  </div>
                </div>
              </div>
              <p className="text-[#5B3A29]/60 text-sm font-medium text-center tracking-wide">
                {lang === "es" ? project.labelEs : project.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
