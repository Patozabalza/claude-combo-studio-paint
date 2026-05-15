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
      await fetch("https://formspree.io/f/combostudiopaint", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _replyto: form.email }),
      });
      setStatus("success");
      setForm({ name: "", phone: "", email: "", type: "", service: "", location: "", message: "", method: "" });
    } catch {
      setStatus("idle");
    }
  };

  const inputClass = "w-full bg-[#181818] border border-white/10 focus:border-[#E8631A] text-white placeholder-white/30 rounded-lg px-4 py-3.5 text-sm outline-none transition-colors duration-200";
  const labelClass = "block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2";

  return (
    <section id="contact" className="py-28 bg-[#181818]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left info */}
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-px bg-[#E8631A]" />
              <span className="text-[#E8631A] text-xs font-semibold tracking-[0.2em] uppercase">Contact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-white/60 text-lg font-light mb-12">
              {t("contact.sub")}
            </p>

            <div className="space-y-6">
              <div className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-4">
                {t("contact.or")}
              </div>

              <a
                href="tel:+13055426364"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0D1117] group-hover:bg-[#E8631A] flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5 text-[#E8631A] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">Phone / Call</p>
                  <p className="text-white font-semibold text-base">+1 (305) 542 6364</p>
                </div>
              </a>

              <a
                href="https://wa.me/13055426364"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0D1117] group-hover:bg-[#25D366] flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.438a.5.5 0 00.612.612l5.593-1.47A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.493-5.19-1.357l-.37-.219-3.837 1.009 1.009-3.837-.219-.37A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">WhatsApp</p>
                  <p className="text-white font-semibold text-base">+1 (305) 542 6364</p>
                </div>
              </a>

              <a
                href="mailto:combostudiopaint@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0D1117] group-hover:bg-[#E8631A] flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5 text-[#E8631A] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">Email</p>
                  <p className="text-white font-semibold text-base">combostudiopaint@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#0D1117] border border-white/8 rounded-2xl p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 bg-[#E8631A]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#E8631A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-xl">{t("contact.success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
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

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>{t("contact.type")}</label>
                    <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
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
                    <select name="method" value={form.method} onChange={handleChange} className={inputClass}>
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
                  className="w-full bg-[#E8631A] hover:bg-[#d45515] disabled:opacity-60 text-white font-semibold py-4 rounded-lg transition-colors duration-200 text-sm tracking-wide"
                >
                  {status === "sending" ? t("contact.sending") : t("contact.cta")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
