// Social media carousel data — internal tool

export type ThemeKey  = "interior" | "exterior" | "signature" | "beforeafter";
export type SlideType = "hero" | "feature" | "list" | "stat" | "cta" | "split";

export interface SlideTexts {
  headline:    string;
  subheadline?: string;
  body?:        string;
  tag?:         string;
  bullet1?:     string;
  bullet2?:     string;
  bullet3?:     string;
  stat1?:       string; stat1Label?: string;
  stat2?:       string; stat2Label?: string;
  stat3?:       string; stat3Label?: string;
  cta?:         string;
  phone?:       string;
  web?:         string;
  labelLeft?:   string;
  labelRight?:  string;
}

export interface Slide {
  id:        string;
  type:      SlideType;
  photo:     string;
  photoAlt?: string;
  texts:     SlideTexts;
}

export interface Theme {
  key:    ThemeKey;
  label:  string;
  color:  string;
  slides: Slide[];
}

const p = (n: number) => `/images/pintor/${n}.png`;
const r = (n: number) => `/images/proyectos/${n}.png`;

export const ALL_PINTOR   = Array.from({ length: 36 }, (_, i) => p(i + 1));
export const ALL_PROJECTS = [1, 2, 3, 4, 5, 6, 7, 8, 10].map(r);

export const SLIDE_FIELDS: Record<SlideType, (keyof SlideTexts)[]> = {
  hero:    ["tag", "headline", "subheadline"],
  feature: ["tag", "headline", "body"],
  list:    ["tag", "headline", "bullet1", "bullet2", "bullet3"],
  stat:    ["tag", "headline", "stat1", "stat1Label", "stat2", "stat2Label", "stat3", "stat3Label"],
  cta:     ["headline", "subheadline", "cta", "phone", "web"],
  split:   ["tag", "headline", "labelLeft", "labelRight"],
};

export const THEMES_ES: Theme[] = [
  {
    key: "interior", label: "Pintura Interior", color: "#4A90D9",
    slides: [
      { id: "int-1", type: "hero",
        photo: p(1),
        texts: { tag: "PINTURA INTERIOR", headline: "Donde las Paredes\nCuentan Historias", subheadline: "Pintura Interior Premium · Miami-Dade" } },
      { id: "int-2", type: "feature",
        photo: p(5),
        texts: { tag: "NUESTRO PROCESO", headline: "Impecable de\nPrep a Acabado Final", body: "Protegemos cada superficie, aplicamos pinturas premium y dejamos tu hogar impecable. Sin atajos, jamás." } },
      { id: "int-3", type: "list",
        photo: p(8),
        texts: { tag: "QUÉ INCLUYE", headline: "La Experiencia\nCombo Completa", bullet1: "Preparación completa de superficies y sellador", bullet2: "Pinturas premium — Sherwin-Williams & Benjamin Moore", bullet3: "Cero desorden: protección total de muebles y pisos" } },
      { id: "int-4", type: "stat",
        photo: p(1),
        texts: { tag: "CONFIANZA EN MIAMI-DADE", headline: "Números\nQue Hablan", stat1: "500+", stat1Label: "Proyectos", stat2: "21", stat2Label: "Ciudades", stat3: "5★", stat3Label: "Calificación" } },
      { id: "int-5", type: "cta",
        photo: p(2),
        texts: { headline: "¿Listo para Transformar\nTu Espacio?", subheadline: "Cotización gratis en sitio en 24 horas.", cta: "Obtén Tu Cotización Gratis", phone: "+1 (305) 542-6364", web: "combostudiopaint.com" } },
    ],
  },
  {
    key: "exterior", label: "Pintura Exterior", color: "#4CAF50",
    slides: [
      { id: "ext-1", type: "hero",
        photo: r(2),
        texts: { tag: "PINTURA EXTERIOR", headline: "El Atractivo\nEmpieza Aquí", subheadline: "Pintura Exterior & Protección · Miami-Dade" } },
      { id: "ext-2", type: "feature",
        photo: p(15),
        texts: { tag: "PROTECCIÓN CLIMÁTICA", headline: "Hecho para\nel Clima de Miami", body: "Recubrimientos resistentes a UV y pinturas elásticas que soportan el calor, la humedad y los huracanes de Florida." } },
      { id: "ext-3", type: "list",
        photo: r(3),
        texts: { tag: "NOS ESPECIALIZAMOS EN", headline: "Todo Tipo\nde Propiedad", bullet1: "Comunidades HOA y condominios", bullet2: "Residencias de lujo unifamiliares", bullet3: "Edificios comerciales y bodegas" } },
      { id: "ext-4", type: "stat",
        photo: r(4),
        texts: { tag: "LA ELECCIÓN DE MIAMI-DADE", headline: "Resultados\nComprobados", stat1: "21", stat1Label: "Ciudades", stat2: "15+", stat2Label: "Proyectos HOA", stat3: "100%", stat3Label: "Licenciado" } },
      { id: "ext-5", type: "cta",
        photo: p(3),
        texts: { headline: "Transforma la Primera\nImpresión de tu Hogar", subheadline: "Presupuesto gratis en sitio. Sin compromiso.", cta: "Agendar Visita Gratis", phone: "+1 (305) 542-6364", web: "combostudiopaint.com" } },
    ],
  },
  {
    key: "signature", label: "Servicios Signature", color: "#E77B00",
    slides: [
      { id: "sig-1", type: "hero",
        photo: p(20),
        texts: { tag: "SERVICIOS SIGNATURE", headline: "Lujo que\nHabla por Sí Solo", subheadline: "Acabados Decorativos · Miami-Dade" } },
      { id: "sig-2", type: "feature",
        photo: p(22),
        texts: { tag: "ESTUCO VENECIANO", headline: "Artesanía Italiana,\nLujo Moderno", body: "Estuco Veneciano aplicado a mano crea paredes con profundidad, luminosidad y textura que ninguna pintura puede replicar." } },
      { id: "sig-3", type: "feature",
        photo: p(25),
        texts: { tag: "LIMEWASH", headline: "Textura Ancestral,\nEstilo Atemporal", body: "Acabado Limewash auténtico con profundidad orgánica y movimiento. Cada pared es única — igual que tu hogar." } },
      { id: "sig-4", type: "feature",
        photo: p(28),
        texts: { tag: "ARCILLA ROMANA", headline: "Tierra. Impacto.\nInolvidable.", body: "La Arcilla Romana ofrece la textura mate cruda de paredes naturales con la durabilidad de materiales modernos." } },
      { id: "sig-5", type: "cta",
        photo: p(30),
        texts: { headline: "Eleva tu Espacio\ncon Textura", subheadline: "Consulta e instalación de muestra incluida.", cta: "Reservar Consulta", phone: "+1 (305) 542-6364", web: "combostudiopaint.com" } },
    ],
  },
  {
    key: "beforeafter", label: "Antes & Después", color: "#9B59B6",
    slides: [
      { id: "ba-1", type: "hero",
        photo: r(1),
        texts: { tag: "ANTES & DESPUÉS", headline: "La Diferencia\nCombo Studio", subheadline: "Mira la transformación por ti mismo" } },
      { id: "ba-2", type: "split",
        photo: p(10), photoAlt: r(5),
        texts: { tag: "INTERIOR RESIDENCIAL", headline: "Transformación\nSala de Estar", labelLeft: "ANTES", labelRight: "DESPUÉS" } },
      { id: "ba-3", type: "split",
        photo: p(14), photoAlt: r(6),
        texts: { tag: "RENOVACIÓN EXTERIOR", headline: "Transformación\nExterior Completa", labelLeft: "ANTES", labelRight: "DESPUÉS" } },
      { id: "ba-4", type: "split",
        photo: p(18), photoAlt: r(7),
        texts: { tag: "ACABADO SIGNATURE", headline: "Aplicación de\nEstuco Veneciano", labelLeft: "PARED SIMPLE", labelRight: "DESPUÉS" } },
      { id: "ba-5", type: "cta",
        photo: r(8),
        texts: { headline: "Tu Hogar\nPodría Ser el Próximo", subheadline: "Cotización gratis · Visita en sitio · Respuesta en 24hs", cta: "Comenzar Tu Transformación", phone: "+1 (305) 542-6364", web: "combostudiopaint.com" } },
    ],
  },
];

export const THEMES: Theme[] = [
  {
    key: "interior", label: "Interior Painting", color: "#4A90D9",
    slides: [
      { id: "int-1", type: "hero",
        photo: p(1),
        texts: { tag: "INTERIOR PAINTING", headline: "Where Walls\nTell Stories", subheadline: "Premium Interior Painting · Miami-Dade" } },
      { id: "int-2", type: "feature",
        photo: p(5),
        texts: { tag: "OUR PROCESS", headline: "Flawless From\nPrep to Final Coat", body: "We protect every surface, apply premium-grade paints, and leave your home spotless. No shortcuts, ever." } },
      { id: "int-3", type: "list",
        photo: p(8),
        texts: { tag: "WHAT'S INCLUDED", headline: "The Full\nCombo Experience", bullet1: "Complete surface prep & priming", bullet2: "Premium paints — Sherwin-Williams & Benjamin Moore", bullet3: "Zero mess: full furniture & floor protection" } },
      { id: "int-4", type: "stat",
        photo: p(1),
        texts: { tag: "TRUSTED IN MIAMI-DADE", headline: "Numbers\nThat Speak", stat1: "500+", stat1Label: "Projects", stat2: "21", stat2Label: "Cities", stat3: "5★", stat3Label: "Rating" } },
      { id: "int-5", type: "cta",
        photo: p(2),
        texts: { headline: "Ready to Transform\nYour Space?", subheadline: "Free on-site quote within 24 hours.", cta: "Get Your Free Quote", phone: "+1 (305) 542-6364", web: "combostudiopaint.com" } },
    ],
  },
  {
    key: "exterior", label: "Exterior Painting", color: "#4CAF50",
    slides: [
      { id: "ext-1", type: "hero",
        photo: r(2),
        texts: { tag: "EXTERIOR PAINTING", headline: "Curb Appeal\nStarts Here", subheadline: "Exterior Painting & Protection · Miami-Dade" } },
      { id: "ext-2", type: "feature",
        photo: p(15),
        texts: { tag: "WEATHER PROTECTION", headline: "Built for\nMiami's Climate", body: "UV-resistant coatings and elastomeric paints that stand up to Florida's heat, humidity and hurricane seasons." } },
      { id: "ext-3", type: "list",
        photo: r(3),
        texts: { tag: "WE SPECIALIZE IN", headline: "Every Property\nType", bullet1: "HOA communities & condominiums", bullet2: "Single-family luxury homes", bullet3: "Commercial buildings & warehouses" } },
      { id: "ext-4", type: "stat",
        photo: r(4),
        texts: { tag: "MIAMI-DADE'S CHOICE", headline: "Proven\nResults", stat1: "21", stat1Label: "Cities", stat2: "15+", stat2Label: "HOA Projects", stat3: "100%", stat3Label: "Licensed" } },
      { id: "ext-5", type: "cta",
        photo: p(3),
        texts: { headline: "Transform Your\nFirst Impression", subheadline: "Free on-site estimate. No obligation.", cta: "Schedule a Free Visit", phone: "+1 (305) 542-6364", web: "combostudiopaint.com" } },
    ],
  },
  {
    key: "signature", label: "Signature Services", color: "#E77B00",
    slides: [
      { id: "sig-1", type: "hero",
        photo: p(20),
        texts: { tag: "SIGNATURE SERVICES", headline: "Luxury That\nSpeaks for Itself", subheadline: "Decorative Wall Finishes · Miami-Dade" } },
      { id: "sig-2", type: "feature",
        photo: p(22),
        texts: { tag: "VENETIAN PLASTER", headline: "Old World Craft,\nModern Luxury", body: "Hand-applied Italian Venetian Plaster creates walls with depth, luminosity and texture that no paint can replicate." } },
      { id: "sig-3", type: "feature",
        photo: p(25),
        texts: { tag: "LIMEWASH", headline: "Ancient Texture,\nTimeless Style", body: "Authentic Limewash with organic depth and movement. Each wall is unique — just like your home." } },
      { id: "sig-4", type: "feature",
        photo: p(28),
        texts: { tag: "ROMAN CLAY", headline: "Earthy. Bold.\nUnforgettable.", body: "Roman Clay delivers the raw, matte texture of natural earth walls with the durability of modern materials." } },
      { id: "sig-5", type: "cta",
        photo: p(30),
        texts: { headline: "Elevate Your\nSpace with Texture", subheadline: "Consultation & sample application included.", cta: "Book a Consultation", phone: "+1 (305) 542-6364", web: "combostudiopaint.com" } },
    ],
  },
  {
    key: "beforeafter", label: "Before & After", color: "#9B59B6",
    slides: [
      { id: "ba-1", type: "hero",
        photo: r(1),
        texts: { tag: "BEFORE & AFTER", headline: "The Combo\nStudio Difference", subheadline: "See the transformation for yourself" } },
      { id: "ba-2", type: "split",
        photo: p(10), photoAlt: r(5),
        texts: { tag: "RESIDENTIAL INTERIOR", headline: "Living Room\nTransformation", labelLeft: "BEFORE", labelRight: "AFTER" } },
      { id: "ba-3", type: "split",
        photo: p(14), photoAlt: r(6),
        texts: { tag: "EXTERIOR REVIVAL", headline: "Full Exterior\nTransformation", labelLeft: "BEFORE", labelRight: "AFTER" } },
      { id: "ba-4", type: "split",
        photo: p(18), photoAlt: r(7),
        texts: { tag: "SIGNATURE FINISH", headline: "Venetian Plaster\nApplication", labelLeft: "PLAIN WALL", labelRight: "AFTER" } },
      { id: "ba-5", type: "cta",
        photo: r(8),
        texts: { headline: "Your Home\nCould Be Next", subheadline: "Free quote · On-site visit · 24hr response", cta: "Start Your Transformation", phone: "+1 (305) 542-6364", web: "combostudiopaint.com" } },
    ],
  },
];
