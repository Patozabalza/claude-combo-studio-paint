"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.colorStudio"), href: "#color-studio" },
    { label: t("nav.beforeAfter"), href: "#before-after" },
    { label: t("nav.process"), href: "#process" },
    { label: t("nav.areas"), href: "#areas" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F4F0E8]/97 backdrop-blur-md border-b border-[#D9CBB8] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Combo Studio Paint"
            width={120}
            height={80}
            className="h-11 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 tracking-wide ${
                scrolled
                  ? "text-[#5B3A29]/80 hover:text-[#1F1F1F]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language switcher */}
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className={`text-sm font-medium tracking-widest transition-colors px-3 py-1.5 rounded border ${
              scrolled
                ? "text-[#5B3A29]/70 hover:text-[#1F1F1F] border-[#D9CBB8] hover:border-[#5B3A29]"
                : "text-white/70 hover:text-white border-white/30 hover:border-white/60"
            }`}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="bg-[#E77B00] hover:bg-[#C96900] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors duration-200 tracking-wide"
          >
            {t("nav.cta")}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className={`lg:hidden p-2 ${scrolled ? "text-[#1F1F1F]" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? "bg-[#1F1F1F]" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? "bg-[#1F1F1F]" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? "bg-[#1F1F1F]" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#F4F0E8] border-t border-[#D9CBB8] px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-[#5B3A29] hover:text-[#1F1F1F] text-base font-medium py-2 border-b border-[#D9CBB8]/60 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-[#5B3A29] hover:text-[#1F1F1F] text-sm font-medium border border-[#D9CBB8] px-3 py-1.5 rounded transition-colors"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-[#E77B00] hover:bg-[#C96900] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
