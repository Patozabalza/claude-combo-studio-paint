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
              {tab === "residential" ? t("residential.title") : t("commercial.title")}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border border-[#D9CBB8] rounded-sm overflow-hidden self-start">
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
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Service list */}
          <div>
            <p className="text-[#5B3A29]/65 text-base mb-10 font-light leading-relaxed">
              {tab === "residential" ? t("residential.sub") : t("commercial.sub")}
            </p>
            <ul className="space-y-0 border-t border-[#D9CBB8]/50">
              {(tab === "residential" ? residential : commercial).map((service, i) => (
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

          {/* Images — clean 2×2 grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-72 overflow-hidden">
              <Image
                src={tab === "residential" ? "/images/pintor/5.png" : "/images/pintor/15.png"}
                alt="Painting service"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={80}
              />
            </div>
            <div className="relative h-72 overflow-hidden">
              <Image
                src={tab === "residential" ? "/images/proyectos/1.png" : "/images/proyectos/5.png"}
                alt="Premium result"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={80}
              />
            </div>
            <div className="relative h-72 overflow-hidden">
              <Image
                src={tab === "residential" ? "/images/pintor/20.png" : "/images/pintor/10.png"}
                alt="Professional service"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={80}
              />
            </div>
            <div className="relative h-72 overflow-hidden">
              <Image
                src={tab === "residential" ? "/images/proyectos/4.png" : "/images/proyectos/2.png"}
                alt="Finished project"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
