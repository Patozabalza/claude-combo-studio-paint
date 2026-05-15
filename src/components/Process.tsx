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
    <section id="process" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Image
          src="/images/pintor/1.png"
          alt=""
          fill
          className="object-cover object-center"
          quality={40}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-px bg-[#E77B00]" />
              <span className="text-[#E77B00] text-xs font-semibold tracking-[0.2em] uppercase">Our Process</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F] leading-tight mb-8">
              {t("process.title")}
            </h2>
            <p className="text-[#5B3A29]/70 text-lg font-light mb-12">
              Every project follows a precise, structured workflow designed to deliver exceptional results on time and within scope.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#E77B00] hover:bg-[#C96900] text-white font-semibold px-7 py-3.5 rounded transition-colors duration-200 text-sm"
            >
              {t("nav.cta")}
            </a>
          </div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-[#E77B00] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E77B00] transition-colors duration-200">
                    <span className="text-[#E77B00] group-hover:text-white text-xs font-bold transition-colors duration-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-[#E77B00]/20 my-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-[#1F1F1F] font-semibold text-base pt-2.5">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
