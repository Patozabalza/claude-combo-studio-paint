"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F4F0E8]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-[#E77B00]" />
            <span className="text-[#E77B00] text-xs font-semibold tracking-[0.2em] uppercase">FAQ</span>
            <span className="w-8 h-px bg-[#E77B00]" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F]">{t("faq.title")}</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[#D9CBB8] hover:border-[#E77B00]/40 rounded-xl overflow-hidden transition-all duration-300 bg-white"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[#1F1F1F] font-semibold text-base">{faq.q}</span>
                <span
                  className={`text-[#E77B00] flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-6 pb-5 text-[#5B3A29]/75 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
