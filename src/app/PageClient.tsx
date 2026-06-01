"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Services from "@/components/Services";
import ColorStudio from "@/components/ColorStudio";
import ComboDifference from "@/components/ComboDifference";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import Areas from "@/components/Areas";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface PageClientProps {
  initialTranslations: Record<string, Record<string, string>>;
}

export default function PageClient({ initialTranslations }: PageClientProps) {
  return (
    <LanguageProvider initialTranslations={initialTranslations}>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <ComboDifference />
        <Services />
        <ColorStudio />
        <BeforeAfter />
        <Process />
        <Areas />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  );
}
