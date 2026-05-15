"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Process() {
  const { t } = useLanguage();

  const steps = [
    t("process.s1"), t("process.s2"), t("process.s3"), t("process.s4"),
    t("process.s5"), t("process.s6"), t("process.s7"),
  ];

  return (
    <section id="process" className="py-28 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-3 mb-10">
              <span className="w-10 h-px bg-[#E77B00]" />
              <span className="text-[#E77B00] text-xs font-medium tracking-[0.25em] uppercase">Our Process</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F] mb-8">
              {t("process.title")}
            </h2>
            <p className="text-[#5B3A29]/70 text-lg font-light mb-12 leading-relaxed max-w-sm">
              Every project follows a precise, structured workflow designed to deliver exceptional results on time and within scope.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#E77B00] hover:bg-[#C96900] text-white font-medium px-8 py-4 rounded-sm transition-colors duration-300 text-xs tracking-widest uppercase"
            >
              {t("nav.cta")}
            </a>
          </div>

          {/* Steps */}
          <div className="border-t border-[#D9CBB8]/50">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-8 py-7 border-b border-[#D9CBB8]/50 group">
                <div className="flex-shrink-0 pt-0.5">
                  <span className="text-[#E77B00]/40 text-xs font-semibold tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[#1F1F1F] font-medium text-base group-hover:text-[#E77B00] transition-colors duration-200">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
