"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t("test.1"),
      name: t("test.1name"),
      location: t("test.1loc"),
      image: "/images/proyectos/1.png",
    },
    {
      quote: t("test.2"),
      name: t("test.2name"),
      location: t("test.2loc"),
      image: "/images/proyectos/2.png",
    },
    {
      quote: t("test.3"),
      name: t("test.3name"),
      location: t("test.3loc"),
      image: "/images/proyectos/5.png",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-[#E77B00]" />
            <span className="text-[#E77B00] text-xs font-semibold tracking-[0.2em] uppercase">Testimonials</span>
            <span className="w-8 h-px bg-[#E77B00]" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-semibold text-[#1F1F1F]">{t("test.title")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t_, i) => (
            <div
              key={i}
              className="bg-[#F4F0E8] border border-[#D9CBB8]/60 hover:border-[#E77B00]/30 rounded-2xl overflow-hidden transition-all duration-300 group hover:shadow-md hover:shadow-[#E77B00]/8"
            >
              <div className="relative h-48">
                <Image
                  src={t_.image}
                  alt={`Project - ${t_.location}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  quality={70}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F4F0E8] via-[#F4F0E8]/20 to-transparent" />
              </div>
              <div className="p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#E77B00]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#5B3A29]/80 text-sm leading-relaxed mb-5 italic"
                  style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem" }}>
                  "{t_.quote}"
                </p>
                <div>
                  <p className="text-[#1F1F1F] font-semibold text-sm">{t_.name}</p>
                  <p className="text-[#E77B00] text-xs font-medium mt-0.5">{t_.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
