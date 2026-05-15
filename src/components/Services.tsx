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
    <section id="services" className="py-24 lg:py-32 bg-[#F4F0E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="w-8 h-px bg-[#E77B00]" />
          <span className="text-[#E77B00] text-xs font-semibold tracking-[0.2em] uppercase">Services</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-12">
          <button
            onClick={() => setTab("residential")}
            className={`px-6 py-2.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 ${
              tab === "residential"
                ? "bg-[#E77B00] text-white"
                : "border border-[#D9CBB8] text-[#5B3A29]/70 hover:text-[#1F1F1F] hover:border-[#5B3A29]/40"
            }`}
          >
            {t("nav.residential")}
          </button>
          <button
            onClick={() => setTab("commercial")}
            className={`px-6 py-2.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 ${
              tab === "commercial"
                ? "bg-[#E77B00] text-white"
                : "border border-[#D9CBB8] text-[#5B3A29]/70 hover:text-[#1F1F1F] hover:border-[#5B3A29]/40"
            }`}
          >
            {t("nav.commercial")}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Text */}
          <div>
            <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F] leading-tight mb-4">
              {tab === "residential" ? t("residential.title") : t("commercial.title")}
            </h2>
            <p className="text-[#5B3A29]/70 text-lg mb-10 font-light">
              {tab === "residential" ? t("residential.sub") : t("commercial.sub")}
            </p>
            <ul className="space-y-3">
              {(tab === "residential" ? residential : commercial).map((service, i) => (
                <li key={i} className="flex items-center gap-3 text-[#5B3A29] font-medium group">
                  <span className="w-5 h-5 rounded-full border border-[#E77B00] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E77B00] transition-colors duration-200">
                    <svg className="w-2.5 h-2.5 text-[#E77B00] group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {service}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-10 bg-[#E77B00] hover:bg-[#C96900] text-white font-semibold px-7 py-3.5 rounded transition-colors duration-200 text-sm"
            >
              {t("nav.cta")}
            </a>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              <Image
                src={tab === "residential" ? "/images/pintor/5.png" : "/images/pintor/15.png"}
                alt="Painting service"
                fill
                className="object-cover transition-all duration-500"
                quality={80}
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden mt-8 shadow-md">
              <Image
                src={tab === "residential" ? "/images/proyectos/1.png" : "/images/proyectos/5.png"}
                alt="Premium result"
                fill
                className="object-cover transition-all duration-500"
                quality={80}
              />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden shadow-md">
              <Image
                src={tab === "residential" ? "/images/pintor/20.png" : "/images/pintor/10.png"}
                alt="Professional service"
                fill
                className="object-cover transition-all duration-500"
                quality={80}
              />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden mt-4 shadow-md">
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
