"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function ColorStudio() {
  const { t } = useLanguage();

  return (
    <section id="color-studio" className="py-28 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[600px] overflow-hidden">
              <Image
                src="/images/proyectos/10.png"
                alt="Color Design Studio - Combo Studio Paint"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                quality={85}
              />
            </div>
            {/* Accent strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E77B00]" />
            {/* Floating label */}
            <div className="absolute bottom-6 left-6 bg-white border-l-2 border-[#E77B00] pl-4 pr-6 py-3">
              <div className="text-[#E77B00] text-xs font-medium tracking-[0.2em] uppercase mb-0.5">Color Design</div>
              <div className="text-[#1F1F1F] text-sm font-semibold">Expert Consultation</div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 mb-10">
              <span className="w-10 h-px bg-[#E77B00]" />
              <span className="text-[#E77B00] text-xs font-medium tracking-[0.25em] uppercase">Color Studio</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F] mb-8">
              {t("color.title")}
            </h2>
            <p className="text-[#5B3A29]/75 text-lg leading-relaxed mb-10 font-light">
              {t("color.body")}
            </p>

            {/* Brand color swatches */}
            <div className="flex items-center gap-2 mb-10">
              {[
                { color: "#E77B00", label: "Burnt Orange" },
                { color: "#5B3A29", label: "Espresso" },
                { color: "#1F1F1F", label: "Charcoal" },
                { color: "#D9CBB8", label: "Soft Sand" },
                { color: "#F4F0E8", label: "Warm Ivory" },
              ].map(({ color, label }, i) => (
                <div key={i} title={label}
                  className="w-9 h-9 border border-[#D9CBB8]"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span className="text-[#5B3A29]/45 text-xs font-medium ml-2 tracking-wide">Brand Palette</span>
            </div>

            <blockquote className="border-l-2 border-[#E77B00] pl-6 mb-12">
              <p className="text-[#5B3A29]/80 text-2xl font-light leading-relaxed italic"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>
                &ldquo;{t("color.quote")}&rdquo;
              </p>
            </blockquote>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[#E77B00] text-[#E77B00] hover:bg-[#E77B00] hover:text-white font-medium px-8 py-4 rounded-sm transition-all duration-300 text-xs tracking-widest uppercase"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
