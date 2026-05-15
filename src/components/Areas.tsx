"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const areaColumns = [
  ["Miami", "Miami Beach", "Coral Gables", "Doral", "Hialeah", "Kendall", "Homestead"],
  ["Cutler Bay", "West Miami", "South Miami", "North Miami", "Sweetwater", "Palmetto Bay"],
  ["Miami Gardens", "Miami Lakes", "Pinecrest", "Aventura", "Miramar", "Westchester"],
];

export default function Areas() {
  const { t } = useLanguage();

  return (
    <section id="areas" className="py-28 lg:py-40 bg-[#F4F0E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Centered header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#E77B00]" />
            <span className="text-[#E77B00] text-xs font-medium tracking-[0.25em] uppercase">Coverage</span>
            <span className="w-10 h-px bg-[#E77B00]" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F] mb-6">
            {t("areas.title")}
          </h2>
          <p className="text-[#5B3A29]/65 text-lg font-light leading-relaxed">
            {t("areas.body")}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-stretch">

          {/* Area list — no boxes, clean editorial */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-x-8 gap-y-0 border-t border-[#D9CBB8]/50">
              {areaColumns.map((col, ci) => (
                <div key={ci}>
                  {col.map((area, ai) => (
                    <div
                      key={area}
                      className="py-3.5 border-b border-[#D9CBB8]/40 text-[#5B3A29] text-sm font-medium hover:text-[#E77B00] transition-colors duration-200"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-[#5B3A29]/40 text-xs font-medium tracking-[0.15em] uppercase mt-6">
              Miami-Dade County · Full Coverage
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[480px] lg:h-auto overflow-hidden">
            <Image
              src="/images/pintor/20.png"
              alt="Combo Studio Paint - Miami-Dade Coverage"
              fill
              className="object-cover"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/50 to-transparent" />
            {/* Clean overlay — no rounded boxes */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 bg-[#E77B00]" />
                <span className="text-white font-semibold text-base tracking-wide">Miami-Dade County</span>
              </div>
              <p className="text-white/55 text-sm font-light tracking-wide">Full coverage · All neighborhoods</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
