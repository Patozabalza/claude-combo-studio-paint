"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", type: "", service: "",
    location: "", message: "", method: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const [web3res] = await Promise.allSettled([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: "cc717448-45a7-496e-b7ef-ef3c26e34200",
            subject: `New quote request — ${form.type || "General"} | Combo Studio Paint`,
            from_name: "Combo Studio Paint Web",
            ...form,
          }),
        }).then((r) => r.json()),
        fetch("/api/submit-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
      ]);

      const web3data = web3res.status === "fulfilled" ? web3res.value : null;
      if (web3data?.success) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", type: "", service: "", location: "", message: "", method: "" });
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  const inputClass = "w-full bg-transparent border-0 border-b border-[#F4F0E8]/20 focus:border-[#E77B00] text-[#F4F0E8] placeholder-[#F4F0E8]/30 py-3 text-sm outline-none transition-colors duration-200 font-light";
  const labelClass = "block text-[#F4F0E8]/50 text-[10px] font-semibold tracking-[0.2em] uppercase mb-1";

  return (
    <section id="contact" className="py-28 lg:py-40 bg-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28">
          {/* Left — info */}
          <div>
            <div className="inline-flex items-center gap-3 mb-10">
              <span className="w-10 h-px bg-[#E77B00]" />
              <span className="text-[#E77B00] text-xs font-medium tracking-[0.25em] uppercase">Contact</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-semibold text-[#F4F0E8] mb-6">
              {t("contact.title")}
            </h2>
            <p className="text-[#F4F0E8]/50 text-lg font-light mb-16 leading-relaxed max-w-sm">
              {t("contact.sub")}
            </p>

            <div className="space-y-8">
              <div className="text-[10px] font-semibold text-[#F4F0E8]/25 tracking-[0.25em] uppercase mb-6">
                {t("contact.or")}
              </div>

              <a href="tel:+13055426364" className="flex items-center gap-5 group border-b border-[#F4F0E8]/8 pb-6">
                <div className="w-11 h-11 border border-[#F4F0E8]/15 group-hover:border-[#E77B00] group-hover:bg-[#E77B00] flex items-center justify-center transition-all duration-300">
                  <svg className="w-4 h-4 text-[#E77B00] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#F4F0E8]/35 text-[10px] uppercase tracking-[0.2em] font-medium">Phone</p>
                  <p className="text-[#F4F0E8] font-medium text-base mt-0.5">+1 (305) 542 6364</p>
                </div>
              </a>

              <a href="https://wa.me/13055426364" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group border-b border-[#F4F0E8]/8 pb-6">
                <div className="w-11 h-11 border border-[#F4F0E8]/15 group-hover:border-[#25D366] group-hover:bg-[#25D366] flex items-center justify-center transition-all duration-300">
                  <svg className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.438a.5.5 0 00.612.612l5.593-1.47A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.493-5.19-1.357l-.37-.219-3.837 1.009 1.009-3.837-.219-.37A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#F4F0E8]/35 text-[10px] uppercase tracking-[0.2em] font-medium">WhatsApp</p>
                  <p className="text-[#F4F0E8] font-medium text-base mt-0.5">+1 (305) 542 6364</p>
                </div>
              </a>

              <a href="mailto:combostudiopaint@gmail.com" className="flex items-center gap-5 group pb-6">
                <div className="w-11 h-11 border border-[#F4F0E8]/15 group-hover:border-[#E77B00] group-hover:bg-[#E77B00] flex items-center justify-center transition-all duration-300">
                  <svg className="w-4 h-4 text-[#E77B00] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#F4F0E8]/35 text-[10px] uppercase tracking-[0.2em] font-medium">Email</p>
                  <p className="text-[#F4F0E8] font-medium text-sm mt-0.5">combostudiopaint@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="border-t border-[#F4F0E8]/10 pt-10 lg:pt-0 lg:border-0">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-12 h-12 border border-[#E77B00] flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-[#E77B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[#F4F0E8] font-semibold text-xl">{t("contact.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClass}>{t("contact.name")}</label>
                      <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="John Smith" />
                    </div>
                    <div>
                      <label className={labelClass}>{t("contact.phone")}</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+1 (305) 000 0000" />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{t("contact.email")}</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="email@example.com" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClass}>{t("contact.type")}</label>
                      <select name="type" value={form.type} onChange={handleChange} className={`${inputClass} bg-[#1F1F1F] [&>option]:bg-[#1F1F1F] [&>option]:text-[#F4F0E8]`}>
                        <option value="">—</option>
                        <option value="Residential">{t("contact.typeRes")}</option>
                        <option value="Commercial">{t("contact.typeCom")}</option>
                        <option value="HOA">{t("contact.typeHOA")}</option>
                        <option value="Multifamily">{t("contact.typeMulti")}</option>
                        <option value="Hospitality">{t("contact.typeHosp")}</option>
                        <option value="Other">{t("contact.typeOther")}</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>{t("contact.method")}</label>
                      <select name="method" value={form.method} onChange={handleChange} className={`${inputClass} bg-[#1F1F1F] [&>option]:bg-[#1F1F1F] [&>option]:text-[#F4F0E8]`}>
                        <option value="">—</option>
                        <option value="Call">{t("contact.methodCall")}</option>
                        <option value="WhatsApp">{t("contact.methodWA")}</option>
                        <option value="Email">{t("contact.methodEmail")}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{t("contact.location")}</label>
                    <input name="location" value={form.location} onChange={handleChange} className={inputClass} placeholder="Miami, Coral Gables..." />
                  </div>

                  <div>
                    <label className={labelClass}>{t("contact.message")}</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} placeholder="..." />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-[#E77B00] hover:bg-[#C96900] disabled:opacity-50 text-white font-medium py-4 transition-colors duration-300 text-xs tracking-[0.2em] uppercase"
                  >
                    {status === "sending" ? t("contact.sending") : t("contact.cta")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
