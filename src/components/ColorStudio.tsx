"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function ColorStudio() {
  const { t } = useLanguage();

  return (
    <section id="color-studio" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl shadow-[#5B3A29]/10">
              <Image
                src="/images/proyectos/10.png"
                alt="Color Design Studio - Combo Studio Paint"
                fill
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/30 to-transparent" />
            </div>
            {/* Floating tag */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur border border-[#D9CBB8] rounded-xl px-5 py-3 shadow-md">
              <div className="text-[#E77B00] text-xs font-semibold tracking-widest uppercase mb-1">Color Design</div>
              <div className="text-[#1F1F1F] text-sm font-medium">Expert Consultation</div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-px bg-[#E77B00]" />
              <span className="text-[#E77B00] text-xs font-semibold tracking-[0.2em] uppercase">Color Studio</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F] leading-tight mb-8">
              {t("color.title")}
            </h2>
            <p className="text-[#5B3A29]/80 text-lg leading-relaxed mb-10 font-light">
              {t("color.body")}
            </p>

            {/* Brand color swatches */}
            <div className="flex gap-3 mb-10">
              {["#E77B00", "#5B3A29", "#1F1F1F", "#D9CBB8", "#F4F0E8"].map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg border border-[#D9CBB8] shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <blockquote className="border-l-2 border-[#E77B00] pl-6 mb-10">
              <p className="text-[#5B3A29] text-xl font-light italic leading-relaxed"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>
                "{t("color.quote")}"
              </p>
            </blockquote>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[#E77B00] text-[#E77B00] hover:bg-[#E77B00] hover:text-white font-semibold px-7 py-3.5 rounded transition-all duration-200 text-sm"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
