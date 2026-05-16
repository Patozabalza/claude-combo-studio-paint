"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.colorStudio": "Color Studio",
    "nav.residential": "Residential",
    "nav.commercial": "Commercial",
    "nav.beforeAfter": "Before & After",
    "nav.process": "Process",
    "nav.areas": "Areas",
    "nav.contact": "Contact",
    "nav.cta": "Get a Quote",

    // Hero
    "hero.headline": "Elevating Spaces Through Color.",
    "hero.sub": "Premium painting and color design solutions for residential and commercial spaces across Miami-Dade County.",
    "hero.cta1": "Schedule a Consultation",
    "hero.cta2": "Call Now",
    "hero.cta3": "WhatsApp",
    "hero.badge": "Premium Finishes. Exceptional Spaces.",

    // Trust Bar
    "trust.1": "Residential & Commercial",
    "trust.2": "Miami-Dade Coverage",
    "trust.3": "Premium Finishes",
    "trust.4": "Bilingual Crews",
    "trust.5": "Color Consultation",
    "trust.6": "Project Management",

    // About
    "about.title": "More Than Paint.",
    "about.titleAccent": "We Create Experiences.",
    "about.body": "COMBO STUDIO PAINT is a premium painting and color consulting studio serving Miami-Dade with impeccable craftsmanship, modern design thinking and reliable project execution. We transform homes, businesses and developments through color, detail and elevated finishes.",
    "about.stat1": "500+",
    "about.stat1Label": "Projects Completed",
    "about.stat2": "10+",
    "about.stat2Label": "Years of Excellence",
    "about.stat3": "100%",
    "about.stat3Label": "Client Satisfaction",

    // Residential
    "residential.title": "Residential Painting Services",
    "residential.sub": "Professional interior and exterior painting for luxury homes, condos, HOA communities and residential properties across Miami-Dade County.",
    "residential.s1": "Interior Painting",
    "residential.s2": "Exterior Painting",
    "residential.s3": "Luxury Homes",
    "residential.s4": "Condominiums",
    "residential.s5": "HOA Communities",
    "residential.s6": "Repainting Projects",
    "residential.s7": "Accent Walls",
    "residential.s8": "Drywall Repair",
    "residential.s9": "Pressure Cleaning",
    "residential.s10": "Color Consultation",

    // Commercial
    "commercial.title": "Professional Solutions for Modern Commercial Spaces.",
    "commercial.sub": "Premium commercial painting for offices, retail spaces, restaurants, warehouses, multifamily buildings and hospitality projects across Miami-Dade County.",
    "commercial.s1": "Offices",
    "commercial.s2": "Retail Spaces",
    "commercial.s3": "Restaurants",
    "commercial.s4": "Warehouses",
    "commercial.s5": "Multifamily Buildings",
    "commercial.s6": "New Developments",
    "commercial.s7": "Hospitality Projects",

    // Color Studio
    "color.title": "Color Design Studio",
    "color.body": "Our approach goes far beyond painting. We offer professional color consulting designed to elevate the visual experience of every property. Through architectural color direction, material harmony and modern aesthetic sensibility, we help clients create spaces that feel timeless, sophisticated and valuable.",
    "color.quote": "Color has the power to transform perception, atmosphere and property value.",

    // Difference
    "diff.title": "The COMBO Difference",
    "diff.d1": "Rapid & Reliable",
    "diff.d2": "On-Time Always",
    "diff.d3": "Floor & Furniture Protection",
    "diff.d4": "Premium Finishes",
    "diff.d5": "Constant Supervision",
    "diff.d6": "Bilingual Crews",
    "diff.d7": "Premium Paints",
    "diff.d8": "Technology Driven",
    "diff.d9": "Project Management",

    // Before After
    "ba.title": "Transformation That Speaks for Itself.",
    "ba.sub": "From preparation to final finish, every detail changes how a space feels.",
    "ba.before": "Before",
    "ba.after": "After",

    // Process
    "process.title": "A Seamless Experience From Start to Finish.",
    "process.s1": "Consultation & Site Visit",
    "process.s2": "Color & Design Direction",
    "process.s3": "Detailed Proposal",
    "process.s4": "Project Preparation",
    "process.s5": "Professional Execution",
    "process.s6": "Quality Control",
    "process.s7": "Final Walkthrough",

    // Scale
    "scale.title": "Boutique Detail.",
    "scale.titleAccent": "Scalable Execution.",
    "scale.body": "Whether it's a luxury residence, a commercial property or a large-scale development, COMBO STUDIO PAINT adapts the right team, workflow and execution strategy for each project.",

    // Areas
    "areas.title": "Proudly Serving Miami-Dade County",
    "areas.body": "From Coral Gables to Aventura, from Kendall to Miami Beach — we bring premium craftsmanship to every neighborhood across Miami-Dade County.",

    // Testimonials
    "test.title": "What Our Clients Say",
    "test.1": "Professional, fast and extremely detail-oriented. The result exceeded every expectation.",
    "test.1name": "Homeowner",
    "test.1loc": "Coral Gables",
    "test.2": "They transformed the entire atmosphere of our commercial space. Truly elevated craftsmanship.",
    "test.2name": "Business Owner",
    "test.2loc": "Miami",
    "test.3": "Our go-to painting partner for premium projects. Reliable, precise and always on time.",
    "test.3name": "Project Manager",
    "test.3loc": "Doral",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "Do you offer both residential and commercial painting?",
    "faq.a1": "Yes. We serve luxury homes, condos, HOA communities, offices, retail spaces, restaurants, warehouses, multifamily buildings and large-scale developments.",
    "faq.q2": "Do you serve all of Miami-Dade County?",
    "faq.a2": "Yes. We cover all of Miami-Dade County including Miami, Miami Beach, Coral Gables, Doral, Hialeah, Kendall, Homestead, Aventura, Pinecrest and surrounding areas.",
    "faq.q3": "Can you help us choose colors?",
    "faq.a3": "Absolutely. Our Color Design Studio offers professional color consulting — architectural color direction, material harmony and modern aesthetic guidance for any property.",
    "faq.q4": "Do you protect furniture and floors during the project?",
    "faq.a4": "Yes. Full protection of furniture, floors and fixtures is standard on every project. We treat your space with the same care we apply to our finishes.",
    "faq.q5": "Do you work with designers, architects and project managers?",
    "faq.a5": "Yes. We regularly partner with interior designers, architects, developers and project managers on premium residential and commercial projects.",
    "faq.q6": "Can you handle large-scale commercial projects?",
    "faq.a6": "Yes. We scale our team and execution strategy to match the scope of each project, from single units to large multifamily buildings and new developments.",
    "faq.q7": "How can I request a quote?",
    "faq.a7": "You can reach us by phone, WhatsApp or the contact form on this page. We'll schedule a site visit and deliver a detailed, no-obligation proposal.",
    "faq.q8": "Do you offer limewash, venetian plaster and specialty finishes?",
    "faq.a8": "Yes. Our Signature Services division specializes in luxury decorative wall finishes including Limewash, Roman Clay, Venetian Plaster, textured feature walls, earthy Mediterranean finishes and custom accent walls — the most in-demand treatments in Miami's premium residential and hospitality market.",
    "faq.q9": "Why are limewash and roman clay finishes so popular in Miami luxury homes?",
    "faq.a9": "These ancient finishes create a depth, warmth and texture that no standard paint can replicate. They're breathable, naturally antimicrobial, and age beautifully — perfectly suited to Miami's climate and the organic, warm-neutral aesthetic that defines high-end interiors today.",

    // Contact
    "contact.title": "Let's Bring Your Vision to Life.",
    "contact.sub": "Tell us about your project and our team will contact you to schedule a quote.",
    "contact.name": "Full Name",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.type": "Project Type",
    "contact.typeRes": "Residential",
    "contact.typeCom": "Commercial",
    "contact.typeHOA": "HOA",
    "contact.typeMulti": "Multifamily",
    "contact.typeHosp": "Hospitality",
    "contact.typeOther": "Other",
    "contact.service": "Service Needed",
    "contact.location": "Location / City",
    "contact.message": "Tell us about your project",
    "contact.method": "Preferred Contact Method",
    "contact.methodCall": "Call",
    "contact.methodWA": "WhatsApp",
    "contact.methodEmail": "Email",
    "contact.cta": "Request a Quote",
    "contact.sending": "Sending...",
    "contact.success": "Message sent! We'll contact you shortly.",
    "contact.or": "Or reach us directly",

    // Footer
    "footer.tagline": "Premium Finishes. Exceptional Spaces.",
    "footer.rights": "All rights reserved.",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.contact": "Contact",
  },
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.colorStudio": "Estudio de Color",
    "nav.residential": "Residencial",
    "nav.commercial": "Comercial",
    "nav.beforeAfter": "Antes & Después",
    "nav.process": "Proceso",
    "nav.areas": "Áreas",
    "nav.contact": "Contacto",
    "nav.cta": "Cotizar Proyecto",

    // Hero
    "hero.headline": "Elevamos Espacios a Través del Color.",
    "hero.sub": "Soluciones premium de pintura y diseño de color para espacios residenciales y comerciales en todo Miami-Dade.",
    "hero.cta1": "Agendar Cotización",
    "hero.cta2": "Llamar Ahora",
    "hero.cta3": "WhatsApp",
    "hero.badge": "Acabados Premium. Espacios Excepcionales.",

    // Trust Bar
    "trust.1": "Residencial y Comercial",
    "trust.2": "Cobertura en Miami-Dade",
    "trust.3": "Acabados Premium",
    "trust.4": "Equipos Bilingües",
    "trust.5": "Consultoría de Color",
    "trust.6": "Gestión de Proyecto",

    // About
    "about.title": "Más que pintura.",
    "about.titleAccent": "Creamos experiencias.",
    "about.body": "COMBO STUDIO PAINT es un estudio premium de pintura y consultoría de color en Miami-Dade. Combinamos acabados impecables, criterio de diseño moderno y ejecución profesional para transformar hogares, negocios y desarrollos inmobiliarios.",
    "about.stat1": "500+",
    "about.stat1Label": "Proyectos Completados",
    "about.stat2": "10+",
    "about.stat2Label": "Años de Excelencia",
    "about.stat3": "100%",
    "about.stat3Label": "Satisfacción del Cliente",

    // Residential
    "residential.title": "Servicios de Pintura Residencial",
    "residential.sub": "Para casas de lujo, condominios, comunidades HOA y espacios modernos.",
    "residential.s1": "Pintura Interior",
    "residential.s2": "Pintura Exterior",
    "residential.s3": "Casas de Lujo",
    "residential.s4": "Condominios",
    "residential.s5": "Comunidades HOA",
    "residential.s6": "Repintado",
    "residential.s7": "Paredes de Acento",
    "residential.s8": "Reparación de Drywall",
    "residential.s9": "Limpieza a Presión",
    "residential.s10": "Consultoría de Color",

    // Commercial
    "commercial.title": "Soluciones profesionales para espacios comerciales modernos.",
    "commercial.sub": "Ejecución eficiente y premium para negocios, propiedades comerciales y proyectos de gran escala.",
    "commercial.s1": "Oficinas",
    "commercial.s2": "Locales Comerciales",
    "commercial.s3": "Restaurantes",
    "commercial.s4": "Bodegas",
    "commercial.s5": "Multifamily",
    "commercial.s6": "Nuevos Desarrollos",
    "commercial.s7": "Hospitality",

    // Color Studio
    "color.title": "Estudio de Diseño de Color",
    "color.body": "Nuestro enfoque va mucho más allá de pintar. Ofrecemos consultoría profesional de color para elevar la experiencia visual de cada propiedad. A través de dirección de color arquitectónica, armonía de materiales y sensibilidad estética moderna, ayudamos a crear espacios atemporales, sofisticados y valiosos.",
    "color.quote": "El color tiene el poder de transformar la percepción, la atmósfera y el valor de una propiedad.",

    // Difference
    "diff.title": "La Diferencia COMBO",
    "diff.d1": "Rapidez y Confiabilidad",
    "diff.d2": "Puntualidad",
    "diff.d3": "Protección de Muebles y Pisos",
    "diff.d4": "Acabados Premium",
    "diff.d5": "Supervisión Constante",
    "diff.d6": "Equipos Bilingües",
    "diff.d7": "Pinturas Premium",
    "diff.d8": "Tecnología",
    "diff.d9": "Gestión de Proyecto",

    // Before After
    "ba.title": "Transformaciones que hablan por sí solas.",
    "ba.sub": "Desde la preparación hasta el acabado final, cada detalle cambia la manera en que se siente un espacio.",
    "ba.before": "Antes",
    "ba.after": "Después",

    // Process
    "process.title": "Una experiencia clara de principio a fin.",
    "process.s1": "Consulta y Visita al Sitio",
    "process.s2": "Dirección de Color y Diseño",
    "process.s3": "Propuesta Detallada",
    "process.s4": "Preparación del Proyecto",
    "process.s5": "Ejecución Profesional",
    "process.s6": "Control de Calidad",
    "process.s7": "Entrega Final",

    // Scale
    "scale.title": "Detalle boutique.",
    "scale.titleAccent": "Ejecución escalable.",
    "scale.body": "Ya sea una residencia de lujo, una propiedad comercial o un desarrollo de gran escala, COMBO STUDIO PAINT adapta el equipo, el flujo de trabajo y la estrategia de ejecución adecuada para cada proyecto.",

    // Areas
    "areas.title": "Atendemos Todo Miami-Dade",
    "areas.body": "Desde Coral Gables hasta Aventura, desde Kendall hasta Miami Beach — llevamos acabados premium a cada vecindario del condado de Miami-Dade.",

    // Testimonials
    "test.title": "Lo Que Dicen Nuestros Clientes",
    "test.1": "Profesionales, rápidos y extremadamente detallistas. El resultado superó todas las expectativas.",
    "test.1name": "Propietario",
    "test.1loc": "Coral Gables",
    "test.2": "Transformaron completamente la atmósfera de nuestro espacio comercial. Un trabajo realmente elevado.",
    "test.2name": "Dueño de Negocio",
    "test.2loc": "Miami",
    "test.3": "Nuestro aliado de confianza para proyectos premium. Confiables, precisos y siempre puntuales.",
    "test.3name": "Project Manager",
    "test.3loc": "Doral",

    // FAQ
    "faq.title": "Preguntas Frecuentes",
    "faq.q1": "¿Ofrecen pintura residencial y comercial?",
    "faq.a1": "Sí. Atendemos casas de lujo, condominios, comunidades HOA, oficinas, locales comerciales, restaurantes, bodegas, edificios multifamily y desarrollos de gran escala.",
    "faq.q2": "¿Atienden todo Miami-Dade?",
    "faq.a2": "Sí. Cubrimos todo Miami-Dade incluyendo Miami, Miami Beach, Coral Gables, Doral, Hialeah, Kendall, Homestead, Aventura, Pinecrest y alrededores.",
    "faq.q3": "¿Pueden ayudarnos a escoger colores?",
    "faq.a3": "Por supuesto. Nuestro Color Design Studio ofrece consultoría profesional de color — dirección de color arquitectónica, armonía de materiales y orientación estética moderna para cualquier propiedad.",
    "faq.q4": "¿Protegen muebles y pisos durante el proyecto?",
    "faq.a4": "Sí. La protección completa de muebles, pisos y accesorios es estándar en cada proyecto. Tratamos su espacio con el mismo cuidado que aplicamos a nuestros acabados.",
    "faq.q5": "¿Trabajan con diseñadores, arquitectos y project managers?",
    "faq.a5": "Sí. Colaboramos regularmente con diseñadores de interiores, arquitectos, desarrolladores y project managers en proyectos residenciales y comerciales premium.",
    "faq.q6": "¿Pueden manejar proyectos comerciales grandes?",
    "faq.a6": "Sí. Escalamos nuestro equipo y estrategia de ejecución según el alcance de cada proyecto, desde unidades individuales hasta grandes edificios multifamily y nuevos desarrollos.",
    "faq.q7": "¿Cómo puedo solicitar una cotización?",
    "faq.a7": "Puede contactarnos por teléfono, WhatsApp o el formulario en esta página. Agendaremos una visita al sitio y entregaremos una propuesta detallada sin compromiso.",
    "faq.q8": "¿Ofrecen limewash, estuco veneciano y acabados decorativos?",
    "faq.a8": "Sí. Nuestro servicio Signature está especializado en acabados decorativos de lujo: Limewash, Roman Clay, Estuco Veneciano, paredes texturizadas, acabados mediterráneos y paredes de acento personalizadas — los tratamientos más demandados en el mercado residencial premium de Miami.",
    "faq.q9": "¿Por qué los acabados limewash y roman clay son tan populares en hogares de lujo en Miami?",
    "faq.a9": "Estos acabados ancestrales crean profundidad, calidez y textura que ninguna pintura convencional puede replicar. Son transpirables, naturalmente antimicrobianos y envejecen bellamente — ideales para el clima de Miami y la estética orgánica y cálida que define los interiores de alto nivel hoy.",

    // Contact
    "contact.title": "Hagamos realidad tu visión.",
    "contact.sub": "Cuéntanos sobre tu proyecto y nuestro equipo te contactará para coordinar una cotización.",
    "contact.name": "Nombre Completo",
    "contact.phone": "Teléfono",
    "contact.email": "Email",
    "contact.type": "Tipo de Proyecto",
    "contact.typeRes": "Residencial",
    "contact.typeCom": "Comercial",
    "contact.typeHOA": "HOA",
    "contact.typeMulti": "Multifamily",
    "contact.typeHosp": "Hospitality",
    "contact.typeOther": "Otro",
    "contact.service": "Servicio Requerido",
    "contact.location": "Ubicación / Ciudad",
    "contact.message": "Cuéntanos sobre tu proyecto",
    "contact.method": "Medio de Contacto Preferido",
    "contact.methodCall": "Llamada",
    "contact.methodWA": "WhatsApp",
    "contact.methodEmail": "Email",
    "contact.cta": "Solicitar Cotización",
    "contact.sending": "Enviando...",
    "contact.success": "¡Mensaje enviado! Te contactaremos pronto.",
    "contact.or": "O contáctanos directamente",

    // Footer
    "footer.tagline": "Acabados Premium. Espacios Excepcionales.",
    "footer.rights": "Todos los derechos reservados.",
    "footer.services": "Servicios",
    "footer.company": "Empresa",
    "footer.contact": "Contacto",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[lang][key] ?? translations["en"][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
