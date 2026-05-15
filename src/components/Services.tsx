"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"residential" | "commercial">("residential");

  const residential = [
    t("residential.s1"), t("residential.s2"), t("residential.s3"),
    t("residential.s4"), t("residential.s5"), t("residential.s6"),
    t("residential.s7"), t("residential.s8"), t("residential.s9"), t("residential.s10"),
  ];

  const commercial = [
    t("commercial.s1"), t("commercial.s2"), t("commercial.s3"),
    t("commercial.s4"), t("commercial.s5"), t("commercial.s6"), t("commercial.s7"),
  ];

  return (
    <section id="services" className="py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="w-8 h-px bg-[#F7941D]" />
          <span className="text-[#F7941D] text-xs font-semibold tracking-[0.2em] uppercase">Services</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-12">
          <button
            onClick={() => setTab("residential")}
            className={`px-6 py-2.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 ${
              tab === "residential"
                ? "bg-[#F7941D] text-white"
                : "border border-white/20 text-white/60 hover:text-white hover:border-white/40"
            }`}
          >
            {t("nav.residential")}
          </button>
          <button
            onClick={() => setTab("commercial")}
            className={`px-6 py-2.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 ${
              tab === "commercial"
                ? "bg-[#F7941D] text-white"
                : "border border-white/20 text-white/60 hover:text-white hover:border-white/40"
            }`}
          >
            {t("nav.commercial")}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <h2 className="text-5xl lg:text-6xl font-bold uppercase text-white leading-tight mb-4">
              {tab === "residential" ? t("residential.title") : t("commercial.title")}
            </h2>
            <p className="text-white/60 text-lg mb-10 font-light">
              {tab === "residential" ? t("residential.sub") : t("commercial.sub")}
            </p>
            <ul className="space-y-3">
              {(tab === "residential" ? residential : commercial).map((service, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 font-medium group">
                  <span className="w-5 h-5 rounded-full border border-[#F7941D] flex items-center justify-center flex-shrink-0 group-hover:bg-[#F7941D] transition-colors duration-200">
                    <svg className="w-2.5 h-2.5 text-[#F7941D] group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {service}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-10 bg-[#F7941D] hover:bg-[#E07810] text-white font-semibold px-7 py-3.5 rounded transition-colors duration-200 text-sm"
            >
              {t("nav.cta")}
            </a>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src={tab === "residential" ? "/images/pintor/5.png" : "/images/pintor/15.png"}
                alt="Painting service"
                fill
                className="object-cover transition-all duration-500"
                quality={80}
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden mt-8">
              <Image
                src={tab === "residential" ? "/images/proyectos/1.png" : "/images/proyectos/5.png"}
                alt="Premium result"
                fill
                className="object-cover transition-all duration-500"
                quality={80}
              />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src={tab === "residential" ? "/images/pintor/20.png" : "/images/pintor/10.png"}
                alt="Professional service"
                fill
                className="object-cover transition-all duration-500"
                quality={80}
              />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden mt-4">
              <Image
                src={tab === "residential" ? "/images/proyectos/4.png" : "/images/proyectos/2.png"}
                alt="Finished project"
                fill
                className="object-cover transition-all duration-500"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
