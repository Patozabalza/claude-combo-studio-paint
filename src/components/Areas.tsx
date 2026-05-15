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
    <section id="areas" className="py-28 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-px bg-[#F7941D]" />
              <span className="text-[#F7941D] text-xs font-semibold tracking-[0.2em] uppercase">Coverage</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold uppercase text-white leading-tight mb-6">
              {t("areas.title")}
            </h2>
            <p className="text-white/55 text-lg font-light mb-10">
              {t("areas.body")}
            </p>

            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 border border-white/10 hover:border-[#F7941D]/40 text-white/70 hover:text-white text-sm rounded-full transition-all duration-200 cursor-default"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/images/pintor/20.png"
              alt="Miami-Dade Coverage - Combo Studio Paint"
              fill
              className="object-cover"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-[#0A0A0A]/80 backdrop-blur border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#F7941D] animate-pulse" />
                <span className="text-white font-semibold">Miami-Dade County</span>
              </div>
              <p className="text-white/60 text-sm mt-1">Full coverage · All neighborhoods</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
