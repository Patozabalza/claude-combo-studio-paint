"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1F1F1F] border-t border-[#F4F0E8]/8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="Combo Studio Paint"
                width={120}
                height={80}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-[#F4F0E8]/45 text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/13055426364"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#F4F0E8]/8 hover:bg-[#E77B00] flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-[#F4F0E8]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.438a.5.5 0 00.612.612l5.593-1.47A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.493-5.19-1.357l-.37-.219-3.837 1.009 1.009-3.837-.219-.37A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </a>
              <a
                href="tel:+13055426364"
                className="w-9 h-9 bg-[#F4F0E8]/8 hover:bg-[#E77B00] flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-[#F4F0E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-[#F4F0E8] font-semibold text-sm mb-5 tracking-wide">{t("footer.services")}</p>
            <ul className="space-y-3">
              {["Interior Painting", "Exterior Painting", "Color Consultation", "Pressure Cleaning", "Drywall Repair", "Commercial Projects"].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-[#F4F0E8]/45 hover:text-[#F4F0E8] text-sm transition-colors duration-200">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#F4F0E8] font-semibold text-sm mb-5 tracking-wide">{t("footer.contact")}</p>
            <ul className="space-y-3">
              <li>
                <a href="tel:+13055426364" className="text-[#F4F0E8]/45 hover:text-[#F4F0E8] text-sm transition-colors duration-200">
                  +1 (305) 542 6364
                </a>
              </li>
              <li>
                <a href="mailto:combostudiopaint@gmail.com" className="text-[#F4F0E8]/45 hover:text-[#F4F0E8] text-sm transition-colors duration-200">
                  combostudiopaint@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/13055426364" className="text-[#F4F0E8]/45 hover:text-[#F4F0E8] text-sm transition-colors duration-200">
                  WhatsApp
                </a>
              </li>
              <li className="text-[#F4F0E8]/45 text-sm">Miami-Dade County, FL</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#F4F0E8]/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#F4F0E8]/30 text-xs">
            © {year} Combo Studio Paint. {t("footer.rights")}
          </p>
          <p className="text-[#F4F0E8]/20 text-xs">combostudiopaint.com</p>
        </div>
      </div>
    </footer>
  );
}
