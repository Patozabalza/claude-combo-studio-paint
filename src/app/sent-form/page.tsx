"use client";

import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { defaultTranslations } from "@/lib/translations";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const STEPS = [
  {
    n: "01",
    title: "Request Received",
    titleEs: "Solicitud Recibida",
    body: "Your project details are in our system.",
    bodyEs: "Tu información ya está en nuestro sistema.",
    done: true,
  },
  {
    n: "02",
    title: "Team Review",
    titleEs: "Revisión del equipo",
    body: "We assess your project scope, location and timeline.",
    bodyEs: "Evaluamos el alcance, la ubicación y los tiempos del proyecto.",
    done: false,
  },
  {
    n: "03",
    title: "Personal Follow-up",
    titleEs: "Seguimiento Personal",
    body: "A specialist contacts you to schedule your free site visit.",
    bodyEs: "Un especialista se contacta para coordinar tu visita sin costo.",
    done: false,
  },
];

export default function SentFormPage() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "generate_lead" });
  }, []);

  return (
    <LanguageProvider initialTranslations={defaultTranslations}>
      <Header />

      <main className="min-h-[85dvh] bg-brand-ivory flex items-center justify-center px-6 py-28 lg:py-40">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-2xl w-full mx-auto text-center"
        >
          {/* Animated check circle */}
          <motion.div variants={fadeUp} className="flex justify-center mb-10">
            <svg
              viewBox="0 0 88 88"
              fill="none"
              className="w-[88px] h-[88px]"
              aria-hidden="true"
            >
              <motion.circle
                cx="44"
                cy="44"
                r="40"
                stroke="#E77B00"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
              <motion.path
                d="M27 44 L39 56 L61 32"
                stroke="#E77B00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.75 }}
              />
            </svg>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-brand-orange" />
            <span className="text-brand-orange text-[10px] font-semibold tracking-[0.25em] uppercase">
              Message Sent · Mensaje Enviado
            </span>
            <span className="w-8 h-px bg-brand-orange" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl lg:text-6xl font-semibold text-brand-charcoal leading-[1.05] mb-5"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}
          >
            We Received<br className="hidden sm:block" /> Your Message.
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="text-brand-espresso/70 text-[17px] font-light leading-relaxed mb-3 max-w-md mx-auto"
          >
            Our team will personally review your project and reach out within{" "}
            <span className="font-medium text-brand-espresso">24 business hours</span> to
            schedule your free on-site consultation.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-brand-espresso/40 text-sm font-light mb-14 max-w-xs mx-auto"
          >
            Nuestro equipo te contactará en menos de 24 horas hábiles.
          </motion.p>

          {/* Next-steps timeline */}
          <motion.div
            variants={fadeUp}
            className="grid sm:grid-cols-3 mb-14 overflow-hidden border border-brand-sand"
          >
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={[
                  "flex flex-col items-start text-left p-6 gap-2",
                  i < STEPS.length - 1 ? "border-b sm:border-b-0 sm:border-r border-brand-sand" : "",
                  step.done ? "bg-brand-charcoal" : "bg-brand-ivory",
                ].join(" ")}
              >
                <span
                  className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${
                    step.done ? "text-brand-orange" : "text-brand-espresso/30"
                  }`}
                >
                  {step.n}&nbsp;{step.done ? "✓" : "·"}
                </span>
                <p
                  className={`text-[15px] font-semibold leading-snug ${
                    step.done ? "text-brand-ivory" : "text-brand-charcoal"
                  }`}
                >
                  {step.title}
                  <span className={`block text-[12px] font-light mt-0.5 ${step.done ? "text-brand-ivory/40" : "text-brand-espresso/35"}`}>
                    {step.titleEs}
                  </span>
                </p>
                <p
                  className={`text-[13px] font-light leading-relaxed ${
                    step.done ? "text-brand-ivory/50" : "text-brand-espresso/55"
                  }`}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/13055426364?text=Hi%2C%20I%20just%20submitted%20the%20contact%20form%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold text-[11px] tracking-[0.2em] uppercase py-4 px-8 transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.438a.5.5 0 00.612.612l5.593-1.47A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.493-5.19-1.357l-.37-.219-3.837 1.009 1.009-3.837-.219-.37A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Chat on WhatsApp
            </a>

            <Link
              href="/"
              className="inline-flex items-center gap-2.5 border border-brand-espresso/25 hover:border-brand-orange text-brand-espresso hover:text-brand-orange font-semibold text-[11px] tracking-[0.2em] uppercase py-4 px-8 transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>

          {/* Phone fallback */}
          <motion.p
            variants={fadeUp}
            className="mt-10 text-brand-espresso/35 text-xs font-light tracking-wide"
          >
            Prefer to call?{" "}
            <a
              href="tel:+13055426364"
              className="text-brand-espresso/60 hover:text-brand-orange transition-colors duration-200 underline underline-offset-2"
            >
              +1 (305) 542 6364
            </a>
          </motion.p>
        </motion.div>
      </main>

      <Footer />
    </LanguageProvider>
  );
}
