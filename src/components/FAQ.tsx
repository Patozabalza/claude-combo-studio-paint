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
    { q: t("faq.q8"), a: t("faq.a8") },
    { q: t("faq.q9"), a: t("faq.a9") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
  ];

  return (
    <section className="py-28 lg:py-40 bg-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#E77B00]" />
            <span className="text-[#E77B00] text-xs font-medium tracking-[0.25em] uppercase">FAQ</span>
            <span className="w-10 h-px bg-[#E77B00]" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F]">{t("faq.title")}</h2>
        </div>

        <div className="border-t border-[#D9CBB8]/50">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#D9CBB8]/50">
              <button
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[#1F1F1F] font-medium text-base group-hover:text-[#E77B00] transition-colors duration-200">{faq.q}</span>
                <span className={`text-[#E77B00] flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="pb-6 text-[#5B3A29]/70 text-sm leading-relaxed font-light">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
