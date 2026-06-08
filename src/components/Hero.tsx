"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/proyectos/7.png"
          alt="Combo Studio Paint - Luxury Miami Property"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Warm dark overlay — not pure black */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1208]/95 via-[#1A1208]/70 to-[#1A1208]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/80 via-transparent to-transparent" />
      </div>


      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-36 w-full">
        <div
          className="max-w-3xl transition-all duration-1000 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-10">
            <span className="w-10 h-px bg-[#E77B00]" />
            <span className="text-[#E77B00] text-xs font-semibold tracking-[0.25em] uppercase">
              {t("hero.badge")}
            </span>
          </div>

          {/* Headline — fixed line-height so Cormorant doesn't clip */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-semibold text-white mb-8"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
            }}
          >
            {t("hero.headline")}
          </h1>

          {/* Thin rule */}
          <div className="w-16 h-px bg-[#E77B00]/60 mb-8" />

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-white/65 leading-relaxed mb-12 max-w-lg font-light tracking-wide">
            {t("hero.sub")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#E77B00] hover:bg-[#C96900] text-white font-medium px-8 py-4 rounded-sm transition-all duration-300 text-sm tracking-widest uppercase shadow-lg shadow-[#E77B00]/20"
            >
              {t("hero.cta1")}
            </a>
            <a
              href="tel:+13055426364"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-medium px-8 py-4 rounded-sm transition-all duration-300 text-sm tracking-widest uppercase"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t("hero.cta2")}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-36 right-12 hidden lg:flex flex-col items-center gap-3 z-20" style={{ opacity: visible ? 0.45 : 0, transition: "opacity 1.5s ease" }}>
        <span className="text-white text-[10px] tracking-[0.25em] uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
