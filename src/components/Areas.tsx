"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const areas = [
  "Miami", "Miami Beach", "Coral Gables", "Doral",
  "Hialeah", "Kendall", "Homestead", "Cutler Bay",
  "West Miami", "South Miami", "North Miami", "Sweetwater",
  "Palmetto Bay", "Miami Gardens", "Miami Lakes", "Pinecrest",
  "Aventura", "Miramar", "Westchester",
];

export default function Areas() {
  const { t } = useLanguage();

  return (
    <section id="areas" className="py-24 lg:py-32 bg-[#F4F0E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-px bg-[#E77B00]" />
              <span className="text-[#E77B00] text-xs font-semibold tracking-[0.2em] uppercase">Coverage</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F] leading-tight mb-6">
              {t("areas.title")}
            </h2>
            <p className="text-[#5B3A29]/70 text-lg font-light mb-10">
              {t("areas.body")}
            </p>

            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 border border-[#D9CBB8] hover:border-[#E77B00]/50 text-[#5B3A29]/70 hover:text-[#5B3A29] text-sm rounded-full transition-all duration-200 cursor-default bg-white"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl shadow-[#5B3A29]/10">
            <Image
              src="/images/pintor/20.png"
              alt="Miami-Dade Coverage - Combo Studio Paint"
              fill
              className="object-cover"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur border border-[#D9CBB8] rounded-xl p-5 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#E77B00] animate-pulse" />
                <span className="text-[#1F1F1F] font-semibold">Miami-Dade County</span>
              </div>
              <p className="text-[#5B3A29]/60 text-sm mt-1">Full coverage · All neighborhoods</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
