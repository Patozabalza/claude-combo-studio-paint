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
    <section id="about" className="py-28 lg:py-40 bg-[#F4F0E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-3 mb-10">
              <span className="w-10 h-px bg-[#E77B00]" />
              <span className="text-[#E77B00] text-xs font-medium tracking-[0.25em] uppercase">About Us</span>
            </div>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#1F1F1F] mb-1">
              {t("about.title")}
            </h2>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#E77B00] mb-10">
              {t("about.titleAccent")}
            </h2>
            <p className="text-[#5B3A29]/75 text-lg leading-relaxed mb-14 font-light max-w-lg">
              {t("about.body")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#D9CBB8]/60">
              {stats.map((stat, i) => (
                <div key={i} className={i > 0 ? "pl-6 border-l border-[#D9CBB8]/60" : ""}>
                  <div className="text-4xl lg:text-5xl font-semibold text-[#1F1F1F] mb-2 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[#5B3A29]/55 text-xs font-medium tracking-wide uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative pt-8">
            <div className="relative h-[580px] rounded-none overflow-hidden">
              <Image
                src="/images/proyectos/1.png"
                alt="Luxury Miami interior - Combo Studio Paint"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/20 to-transparent" />
            </div>
            {/* Orange accent block */}
            <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 bg-[#E77B00] w-24 h-24 z-10" />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#1F1F1F]/85 backdrop-blur-sm px-6 py-4">
              <p className="text-[#F4F0E8]/60 text-xs tracking-[0.2em] uppercase font-medium">Miami-Dade County</p>
              <p className="text-[#F4F0E8] text-sm font-medium mt-0.5">Premium Painting & Color Studio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
