"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Process() {
  const { t } = useLanguage();

  const steps = [
    t("process.s1"), t("process.s2"), t("process.s3"), t("process.s4"),
    t("process.s5"), t("process.s6"), t("process.s7"),
  ];

  return (
    <section id="process" className="py-28 bg-[#181818] relative overflow-hidden">
      {/* BG image */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/images/pintor/1.png"
          alt=""
          fill
          className="object-cover object-center"
          quality={40}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-px bg-[#E8631A]" />
              <span className="text-[#E8631A] text-xs font-semibold tracking-[0.2em] uppercase">Our Process</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              {t("process.title")}
            </h2>
            <p className="text-white/60 text-lg font-light mb-12">
              Every project follows a precise, structured workflow designed to deliver exceptional results on time and within scope.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#E8631A] hover:bg-[#d45515] text-white font-semibold px-7 py-3.5 rounded transition-colors duration-200 text-sm"
            >
              {t("nav.cta")}
            </a>
          </div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-[#E8631A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8631A] transition-colors duration-200">
                    <span className="text-[#E8631A] group-hover:text-white text-xs font-bold transition-colors duration-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-[#E8631A]/20 my-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-white font-semibold text-base pt-2.5">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
