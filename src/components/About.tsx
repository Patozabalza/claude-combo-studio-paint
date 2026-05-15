"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { value: t("about.stat1"), label: t("about.stat1Label") },
    { value: t("about.stat2"), label: t("about.stat2Label") },
    { value: t("about.stat3"), label: t("about.stat3Label") },
  ];

  return (
    <section id="about" className="py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-px bg-[#F7941D]" />
              <span className="text-[#F7941D] text-xs font-semibold tracking-[0.2em] uppercase">About Us</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold uppercase text-white leading-tight mb-2">
              {t("about.title")}
            </h2>
            <h2 className="text-5xl lg:text-6xl font-bold uppercase text-[#F7941D] leading-tight mb-8">
              {t("about.titleAccent")}
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-12 font-light">
              {t("about.body")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/50 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="relative h-[550px] rounded-2xl overflow-hidden">
              <Image
                src="/images/proyectos/1.png"
                alt="Luxury Miami interior - Combo Studio Paint"
                fill
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
            </div>
            {/* Accent card */}
            <div className="absolute -bottom-6 -left-6 bg-[#F7941D] p-6 rounded-xl max-w-[200px]">
              <div className="text-white text-4xl font-bold">10+</div>
              <div className="text-white/80 text-sm mt-1 leading-tight">Years elevating Miami spaces</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
