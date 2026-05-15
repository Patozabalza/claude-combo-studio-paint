"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
          ? "bg-[#0D1117]/95 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span className="text-white font-bold text-xl tracking-tight">COMBO</span>
          <span className="text-[#E8631A] font-bold text-xl tracking-tight">STUDIO PAINT</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 tracking-wide"
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
            className="text-white/60 hover:text-white text-sm font-medium tracking-widest transition-colors border border-white/20 hover:border-white/40 px-3 py-1.5 rounded"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="bg-[#E8631A] hover:bg-[#d45515] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors duration-200 tracking-wide"
          >
            {t("nav.cta")}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0D1117]/98 backdrop-blur-md border-t border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white/80 hover:text-white text-base font-medium py-2 border-b border-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-white/60 hover:text-white text-sm font-medium border border-white/20 px-3 py-1.5 rounded transition-colors"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-[#E8631A] hover:bg-[#d45515] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
