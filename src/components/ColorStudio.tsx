"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function ColorStudio() {
  const { t } = useLanguage();

  return (
    <section id="color-studio" className="py-28 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/images/proyectos/10.png"
                alt="Color Design Studio - Combo Studio Paint"
                fill
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent" />
            </div>
            {/* Floating tag */}
            <div className="absolute top-6 left-6 bg-[#0A0A0A]/90 backdrop-blur border border-white/10 rounded-xl px-5 py-3">
              <div className="text-[#F7941D] text-xs font-semibold tracking-widest uppercase mb-1">Color Design</div>
              <div className="text-white text-sm font-medium">Expert Consultation</div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-px bg-[#F7941D]" />
              <span className="text-[#F7941D] text-xs font-semibold tracking-[0.2em] uppercase">Color Studio</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold uppercase text-white leading-tight mb-8">
              {t("color.title")}
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-10 font-light">
              {t("color.body")}
            </p>

            {/* Color swatches decorative */}
            <div className="flex gap-3 mb-10">
              {["#F7941D", "#003B5C", "#1D6B5F", "#B8AFA4", "#111111"].map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg border border-white/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <blockquote className="border-l-2 border-[#F7941D] pl-6 mb-10">
              <p className="text-white/80 text-xl font-light italic leading-relaxed">
                "{t("color.quote")}"
              </p>
            </blockquote>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[#F7941D] text-[#F7941D] hover:bg-[#F7941D] hover:text-white font-semibold px-7 py-3.5 rounded transition-all duration-200 text-sm"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
