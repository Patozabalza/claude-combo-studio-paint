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

export interface Campaign {
  id:       string;
  label:    string;
  labelEs:  string;
  themes:   Theme[];
  themesEs: Theme[];
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

// ─── Shared brand constants ────────────────────────────────────────────────
const PHONE = "+1 (305) 542-6364";
const WEB   = "combostudiopaint.com";
const STATS_EN = { stat1: "500+", stat1Label: "Projects", stat2: "21", stat2Label: "Cities", stat3: "5★", stat3Label: "Rating" };
const STATS_ES = { stat1: "500+", stat1Label: "Proyectos", stat2: "21", stat2Label: "Ciudades", stat3: "5★", stat3Label: "Calificación" };

// ══════════════════════════════════════════════════════════════════════════════
// CAMPAIGN 1 — "Craft & Quality"  (original, quality-focused copy)
// ══════════════════════════════════════════════════════════════════════════════
const c1_en: Theme[] = [
  {
    key: "interior", label: "Interior Painting", color: "#4A90D9",
    slides: [
      { id: "int-1", type: "hero",    photo: p(1),
        texts: { tag: "INTERIOR PAINTING", headline: "Where Walls\nTell Stories", subheadline: "Premium Interior Painting · Miami-Dade" } },
      { id: "int-2", type: "feature", photo: p(5),
        texts: { tag: "OUR PROCESS", headline: "Flawless From\nPrep to Final Coat", body: "We protect every surface, apply premium-grade paints, and leave your home spotless. No shortcuts, ever." } },
      { id: "int-3", type: "list",    photo: p(8),
        texts: { tag: "WHAT'S INCLUDED", headline: "The Full\nCombo Experience", bullet1: "Complete surface prep & priming", bullet2: "Premium paints — Sherwin-Williams & Benjamin Moore", bullet3: "Zero mess: full furniture & floor protection" } },
      { id: "int-4", type: "stat",    photo: p(1),
        texts: { tag: "TRUSTED IN MIAMI-DADE", headline: "Numbers\nThat Speak", ...STATS_EN } },
      { id: "int-5", type: "cta",     photo: p(2),
        texts: { headline: "Ready to Transform\nYour Space?", subheadline: "Free on-site quote within 24 hours.", cta: "Get Your Free Quote", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "exterior", label: "Exterior Painting", color: "#4CAF50",
    slides: [
      { id: "ext-1", type: "hero",    photo: r(2),
        texts: { tag: "EXTERIOR PAINTING", headline: "Curb Appeal\nStarts Here", subheadline: "Exterior Painting & Protection · Miami-Dade" } },
      { id: "ext-2", type: "feature", photo: p(15),
        texts: { tag: "WEATHER PROTECTION", headline: "Built for\nMiami's Climate", body: "UV-resistant coatings and elastomeric paints that stand up to Florida's heat, humidity and hurricane seasons." } },
      { id: "ext-3", type: "list",    photo: r(3),
        texts: { tag: "WE SPECIALIZE IN", headline: "Every Property\nType", bullet1: "HOA communities & condominiums", bullet2: "Single-family luxury homes", bullet3: "Commercial buildings & warehouses" } },
      { id: "ext-4", type: "stat",    photo: r(4),
        texts: { tag: "MIAMI-DADE'S CHOICE", headline: "Proven\nResults", ...STATS_EN } },
      { id: "ext-5", type: "cta",     photo: p(3),
        texts: { headline: "Transform Your\nFirst Impression", subheadline: "Free on-site estimate. No obligation.", cta: "Schedule a Free Visit", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "signature", label: "Signature Services", color: "#E77B00",
    slides: [
      { id: "sig-1", type: "hero",    photo: p(20),
        texts: { tag: "SIGNATURE SERVICES", headline: "Luxury That\nSpeaks for Itself", subheadline: "Decorative Wall Finishes · Miami-Dade" } },
      { id: "sig-2", type: "feature", photo: p(22),
        texts: { tag: "VENETIAN PLASTER", headline: "Old World Craft,\nModern Luxury", body: "Hand-applied Italian Venetian Plaster creates walls with depth, luminosity and texture that no paint can replicate." } },
      { id: "sig-3", type: "feature", photo: p(25),
        texts: { tag: "LIMEWASH", headline: "Ancient Texture,\nTimeless Style", body: "Authentic Limewash with organic depth and movement. Each wall is unique — just like your home." } },
      { id: "sig-4", type: "feature", photo: p(28),
        texts: { tag: "ROMAN CLAY", headline: "Earthy. Bold.\nUnforgettable.", body: "Roman Clay delivers the raw, matte texture of natural earth walls with the durability of modern materials." } },
      { id: "sig-5", type: "cta",     photo: p(30),
        texts: { headline: "Elevate Your\nSpace with Texture", subheadline: "Consultation & sample application included.", cta: "Book a Consultation", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "beforeafter", label: "Before & After", color: "#9B59B6",
    slides: [
      { id: "ba-1", type: "hero",  photo: r(1),
        texts: { tag: "BEFORE & AFTER", headline: "The Combo\nStudio Difference", subheadline: "See the transformation for yourself" } },
      { id: "ba-2", type: "split", photo: p(10), photoAlt: r(5),
        texts: { tag: "RESIDENTIAL INTERIOR", headline: "Living Room\nTransformation", labelLeft: "BEFORE", labelRight: "AFTER" } },
      { id: "ba-3", type: "split", photo: p(14), photoAlt: r(6),
        texts: { tag: "EXTERIOR REVIVAL", headline: "Full Exterior\nTransformation", labelLeft: "BEFORE", labelRight: "AFTER" } },
      { id: "ba-4", type: "split", photo: p(18), photoAlt: r(7),
        texts: { tag: "SIGNATURE FINISH", headline: "Venetian Plaster\nApplication", labelLeft: "PLAIN WALL", labelRight: "AFTER" } },
      { id: "ba-5", type: "cta",   photo: r(8),
        texts: { headline: "Your Home\nCould Be Next", subheadline: "Free quote · On-site visit · 24hr response", cta: "Start Your Transformation", phone: PHONE, web: WEB } },
    ],
  },
];

const c1_es: Theme[] = [
  {
    key: "interior", label: "Pintura Interior", color: "#4A90D9",
    slides: [
      { id: "int-1", type: "hero",    photo: p(1),
        texts: { tag: "PINTURA INTERIOR", headline: "Donde las Paredes\nCuentan Historias", subheadline: "Pintura Interior Premium · Miami-Dade" } },
      { id: "int-2", type: "feature", photo: p(5),
        texts: { tag: "NUESTRO PROCESO", headline: "Impecable de\nPrep a Acabado Final", body: "Protegemos cada superficie, aplicamos pinturas premium y dejamos tu hogar impecable. Sin atajos, jamás." } },
      { id: "int-3", type: "list",    photo: p(8),
        texts: { tag: "QUÉ INCLUYE", headline: "La Experiencia\nCombo Completa", bullet1: "Preparación completa de superficies y sellador", bullet2: "Pinturas premium — Sherwin-Williams & Benjamin Moore", bullet3: "Cero desorden: protección total de muebles y pisos" } },
      { id: "int-4", type: "stat",    photo: p(1),
        texts: { tag: "CONFIANZA EN MIAMI-DADE", headline: "Números\nQue Hablan", ...STATS_ES } },
      { id: "int-5", type: "cta",     photo: p(2),
        texts: { headline: "¿Listo para Transformar\nTu Espacio?", subheadline: "Cotización gratis en sitio en 24 horas.", cta: "Obtén Tu Cotización Gratis", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "exterior", label: "Pintura Exterior", color: "#4CAF50",
    slides: [
      { id: "ext-1", type: "hero",    photo: r(2),
        texts: { tag: "PINTURA EXTERIOR", headline: "El Atractivo\nEmpieza Aquí", subheadline: "Pintura Exterior & Protección · Miami-Dade" } },
      { id: "ext-2", type: "feature", photo: p(15),
        texts: { tag: "PROTECCIÓN CLIMÁTICA", headline: "Hecho para\nel Clima de Miami", body: "Recubrimientos resistentes a UV y pinturas elásticas que soportan el calor, la humedad y los huracanes de Florida." } },
      { id: "ext-3", type: "list",    photo: r(3),
        texts: { tag: "NOS ESPECIALIZAMOS EN", headline: "Todo Tipo\nde Propiedad", bullet1: "Comunidades HOA y condominios", bullet2: "Residencias de lujo unifamiliares", bullet3: "Edificios comerciales y bodegas" } },
      { id: "ext-4", type: "stat",    photo: r(4),
        texts: { tag: "LA ELECCIÓN DE MIAMI-DADE", headline: "Resultados\nComprobados", ...STATS_ES } },
      { id: "ext-5", type: "cta",     photo: p(3),
        texts: { headline: "Transforma la Primera\nImpresión de tu Hogar", subheadline: "Presupuesto gratis en sitio. Sin compromiso.", cta: "Agendar Visita Gratis", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "signature", label: "Servicios Signature", color: "#E77B00",
    slides: [
      { id: "sig-1", type: "hero",    photo: p(20),
        texts: { tag: "SERVICIOS SIGNATURE", headline: "Lujo que\nHabla por Sí Solo", subheadline: "Acabados Decorativos · Miami-Dade" } },
      { id: "sig-2", type: "feature", photo: p(22),
        texts: { tag: "ESTUCO VENECIANO", headline: "Artesanía Italiana,\nLujo Moderno", body: "Estuco Veneciano aplicado a mano crea paredes con profundidad, luminosidad y textura que ninguna pintura puede replicar." } },
      { id: "sig-3", type: "feature", photo: p(25),
        texts: { tag: "LIMEWASH", headline: "Textura Ancestral,\nEstilo Atemporal", body: "Acabado Limewash auténtico con profundidad orgánica y movimiento. Cada pared es única — igual que tu hogar." } },
      { id: "sig-4", type: "feature", photo: p(28),
        texts: { tag: "ARCILLA ROMANA", headline: "Tierra. Impacto.\nInolvidable.", body: "La Arcilla Romana ofrece la textura mate cruda de paredes naturales con la durabilidad de materiales modernos." } },
      { id: "sig-5", type: "cta",     photo: p(30),
        texts: { headline: "Eleva tu Espacio\ncon Textura", subheadline: "Consulta e instalación de muestra incluida.", cta: "Reservar Consulta", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "beforeafter", label: "Antes & Después", color: "#9B59B6",
    slides: [
      { id: "ba-1", type: "hero",  photo: r(1),
        texts: { tag: "ANTES & DESPUÉS", headline: "La Diferencia\nCombo Studio", subheadline: "Mira la transformación por ti mismo" } },
      { id: "ba-2", type: "split", photo: p(10), photoAlt: r(5),
        texts: { tag: "INTERIOR RESIDENCIAL", headline: "Transformación\nSala de Estar", labelLeft: "ANTES", labelRight: "DESPUÉS" } },
      { id: "ba-3", type: "split", photo: p(14), photoAlt: r(6),
        texts: { tag: "RENOVACIÓN EXTERIOR", headline: "Transformación\nExterior Completa", labelLeft: "ANTES", labelRight: "DESPUÉS" } },
      { id: "ba-4", type: "split", photo: p(18), photoAlt: r(7),
        texts: { tag: "ACABADO SIGNATURE", headline: "Aplicación de\nEstuco Veneciano", labelLeft: "PARED SIMPLE", labelRight: "DESPUÉS" } },
      { id: "ba-5", type: "cta",   photo: r(8),
        texts: { headline: "Tu Hogar\nPodría Ser el Próximo", subheadline: "Cotización gratis · Visita en sitio · Respuesta en 24hs", cta: "Comenzar Tu Transformación", phone: PHONE, web: WEB } },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// CAMPAIGN 2 — "Transformation"  (emotional, aspirational)
// ══════════════════════════════════════════════════════════════════════════════
const c2_en: Theme[] = [
  {
    key: "interior", label: "Interior Painting", color: "#4A90D9",
    slides: [
      { id: "int-1", type: "hero",    photo: p(3),
        texts: { tag: "INTERIOR PAINTING", headline: "Your Home.\nYour Story.\nOur Craft.", subheadline: "Premium Interior Painting · Miami-Dade" } },
      { id: "int-2", type: "feature", photo: p(7),
        texts: { tag: "DONE RIGHT", headline: "Every Corner,\nPerfect.", body: "From floors to crown molding, we protect everything and leave no trace — only flawless walls and rich, lasting color." } },
      { id: "int-3", type: "list",    photo: p(11),
        texts: { tag: "YOUR EXPERIENCE", headline: "The Combo\nPromise", bullet1: "Color consultation included — we find your perfect shade", bullet2: "Sherwin-Williams & Benjamin Moore paints only", bullet3: "Spotless cleanup — as if we were never there" } },
      { id: "int-4", type: "stat",    photo: p(4),
        texts: { tag: "MIAMI TRUSTS US", headline: "Results That\nSpeak for Themselves", ...STATS_EN } },
      { id: "int-5", type: "cta",     photo: p(6),
        texts: { headline: "Your Dream Home\nStarts Here", subheadline: "Free on-site consultation — same week available.", cta: "Book My Free Consult", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "exterior", label: "Exterior Painting", color: "#4CAF50",
    slides: [
      { id: "ext-1", type: "hero",    photo: r(3),
        texts: { tag: "EXTERIOR PAINTING", headline: "Love Where\nYou Live", subheadline: "Exterior Painting & Protection · Miami-Dade" } },
      { id: "ext-2", type: "feature", photo: p(16),
        texts: { tag: "BUILT FOR FLORIDA", headline: "Sun. Rain.\nHurricane Season.\nWe've Got You.", body: "Our elastomeric coatings form a protective shield built to outlast Miami's most extreme weather — season after season." } },
      { id: "ext-3", type: "list",    photo: r(5),
        texts: { tag: "WE HANDLE IT ALL", headline: "No Property\nToo Large", bullet1: "HOA communities — same quality, any scale", bullet2: "Single-family luxury estates", bullet3: "Commercial & industrial properties" } },
      { id: "ext-4", type: "stat",    photo: r(4),
        texts: { tag: "TRUSTED ACROSS MIAMI", headline: "Proven\nEvery Job", ...STATS_EN } },
      { id: "ext-5", type: "cta",     photo: p(9),
        texts: { headline: "First Impressions\nMatter Most", subheadline: "Free on-site estimate — no commitment.", cta: "Get My Free Estimate", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "signature", label: "Signature Services", color: "#E77B00",
    slides: [
      { id: "sig-1", type: "hero",    photo: p(21),
        texts: { tag: "SIGNATURE SERVICES", headline: "Walls That Make\nMouths Drop.", subheadline: "Decorative Wall Finishes · Miami-Dade" } },
      { id: "sig-2", type: "feature", photo: p(23),
        texts: { tag: "VENETIAN PLASTER", headline: "Timeless Italian\nCraft, Your Walls", body: "Applied hand-over-hand, layer by layer. The depth and luminosity of authentic Venetian Plaster can't be replicated — only mastered." } },
      { id: "sig-3", type: "feature", photo: p(26),
        texts: { tag: "LIMEWASH", headline: "Organic Texture,\nInfinite Character", body: "No two Limewash walls are ever the same. Each one tells its own story through soft layered color and living texture." } },
      { id: "sig-4", type: "feature", photo: p(29),
        texts: { tag: "ROMAN CLAY", headline: "Raw Earth.\nRefined Space.", body: "Roman Clay brings the warmth of natural stone into modern spaces — velvety, matte and impossibly beautiful." } },
      { id: "sig-5", type: "cta",     photo: p(31),
        texts: { headline: "Your Walls\nDeserve More", subheadline: "Book your consultation — sample application included.", cta: "Reserve My Consultation", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "beforeafter", label: "Before & After", color: "#9B59B6",
    slides: [
      { id: "ba-1", type: "hero",  photo: r(2),
        texts: { tag: "BEFORE & AFTER", headline: "We Don't\nJust Paint.\nWe Transform.", subheadline: "See the results for yourself" } },
      { id: "ba-2", type: "split", photo: p(13), photoAlt: r(5),
        texts: { tag: "RESIDENTIAL INTERIOR", headline: "Living Room\nReinvented", labelLeft: "BEFORE", labelRight: "AFTER" } },
      { id: "ba-3", type: "split", photo: p(17), photoAlt: r(6),
        texts: { tag: "EXTERIOR REVIVAL", headline: "Curb Appeal\nUnleashed", labelLeft: "BEFORE", labelRight: "AFTER" } },
      { id: "ba-4", type: "split", photo: p(19), photoAlt: r(7),
        texts: { tag: "SIGNATURE FINISH", headline: "Plain Wall\nto Statement", labelLeft: "PLAIN WALL", labelRight: "AFTER" } },
      { id: "ba-5", type: "cta",   photo: r(5),
        texts: { headline: "Your Home\nCould Be Next", subheadline: "Free quote · On-site visit · 24hr turnaround", cta: "See What's Possible", phone: PHONE, web: WEB } },
    ],
  },
];

const c2_es: Theme[] = [
  {
    key: "interior", label: "Pintura Interior", color: "#4A90D9",
    slides: [
      { id: "int-1", type: "hero",    photo: p(3),
        texts: { tag: "PINTURA INTERIOR", headline: "Tu Hogar.\nTu Historia.\nNuestro Arte.", subheadline: "Pintura Interior Premium · Miami-Dade" } },
      { id: "int-2", type: "feature", photo: p(7),
        texts: { tag: "HECHO CON CUIDADO", headline: "Cada Rincón,\nImpecable.", body: "Del piso al techo, protegemos todo y no dejamos rastro — solo paredes perfectas y un color rico y duradero." } },
      { id: "int-3", type: "list",    photo: p(11),
        texts: { tag: "TU EXPERIENCIA", headline: "La Promesa\nCombo", bullet1: "Consultoría de color incluida — encontramos tu tono perfecto", bullet2: "Solo pinturas Sherwin-Williams & Benjamin Moore", bullet3: "Limpieza total — como si nunca hubiéramos estado" } },
      { id: "int-4", type: "stat",    photo: p(4),
        texts: { tag: "MIAMI CONFÍA EN NOSOTROS", headline: "Resultados que\nHablan por Sí Solos", ...STATS_ES } },
      { id: "int-5", type: "cta",     photo: p(6),
        texts: { headline: "Tu Hogar Ideal\nEmpieza Aquí", subheadline: "Consulta gratis en sitio — disponible esta semana.", cta: "Reservar Mi Consulta Gratis", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "exterior", label: "Pintura Exterior", color: "#4CAF50",
    slides: [
      { id: "ext-1", type: "hero",    photo: r(3),
        texts: { tag: "PINTURA EXTERIOR", headline: "Ama el Lugar\nDonde Vives", subheadline: "Pintura Exterior & Protección · Miami-Dade" } },
      { id: "ext-2", type: "feature", photo: p(16),
        texts: { tag: "HECHO PARA FLORIDA", headline: "Sol. Lluvia.\nHuracán.\nContigo.", body: "Nuestros recubrimientos elásticos forman una barrera protectora diseñada para resistir los climas más extremos de Miami." } },
      { id: "ext-3", type: "list",    photo: r(5),
        texts: { tag: "NOS ENCARGAMOS DE TODO", headline: "De lo Pequeño\na lo Masivo", bullet1: "Comunidades HOA — misma calidad, cualquier escala", bullet2: "Residencias de lujo unifamiliares", bullet3: "Propiedades comerciales e industriales" } },
      { id: "ext-4", type: "stat",    photo: r(4),
        texts: { tag: "CONFIANZA EN TODO MIAMI", headline: "Comprobado\nen Cada Proyecto", ...STATS_ES } },
      { id: "ext-5", type: "cta",     photo: p(9),
        texts: { headline: "La Primera\nImpresión Importa", subheadline: "Presupuesto gratis en sitio — sin compromiso.", cta: "Obtener Mi Presupuesto Gratis", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "signature", label: "Servicios Signature", color: "#E77B00",
    slides: [
      { id: "sig-1", type: "hero",    photo: p(21),
        texts: { tag: "SERVICIOS SIGNATURE", headline: "Paredes que\nHacen que la\nGente se Detenga.", subheadline: "Acabados Decorativos · Miami-Dade" } },
      { id: "sig-2", type: "feature", photo: p(23),
        texts: { tag: "ESTUCO VENECIANO", headline: "Arte Italiano,\nTus Paredes", body: "Aplicado a mano, capa a capa. La profundidad del Estuco Veneciano auténtico no se puede replicar — solo dominar." } },
      { id: "sig-3", type: "feature", photo: p(26),
        texts: { tag: "LIMEWASH", headline: "Textura Orgánica,\nCarácter Infinito", body: "No hay dos paredes de Limewash iguales. Cada una cuenta su propia historia a través de color suave y textura viva." } },
      { id: "sig-4", type: "feature", photo: p(29),
        texts: { tag: "ARCILLA ROMANA", headline: "Tierra Cruda.\nEspacio Refinado.", body: "La Arcilla Romana lleva la calidez de la piedra natural a espacios modernos — aterciopelada, mate e imposiblemente bella." } },
      { id: "sig-5", type: "cta",     photo: p(31),
        texts: { headline: "Tus Paredes\nMerecen Más", subheadline: "Reserva una consulta — muestra de aplicación incluida.", cta: "Reservar Mi Consulta", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "beforeafter", label: "Antes & Después", color: "#9B59B6",
    slides: [
      { id: "ba-1", type: "hero",  photo: r(2),
        texts: { tag: "ANTES & DESPUÉS", headline: "No Solo\nPintamos.\nTransformamos.", subheadline: "Mira los resultados por ti mismo" } },
      { id: "ba-2", type: "split", photo: p(13), photoAlt: r(5),
        texts: { tag: "INTERIOR RESIDENCIAL", headline: "Sala de Estar\nReinventada", labelLeft: "ANTES", labelRight: "DESPUÉS" } },
      { id: "ba-3", type: "split", photo: p(17), photoAlt: r(6),
        texts: { tag: "RENOVACIÓN EXTERIOR", headline: "Atractivo\nDesbordante", labelLeft: "ANTES", labelRight: "DESPUÉS" } },
      { id: "ba-4", type: "split", photo: p(19), photoAlt: r(7),
        texts: { tag: "ACABADO SIGNATURE", headline: "Pared Simple a\nDeclaración de Estilo", labelLeft: "PARED SIMPLE", labelRight: "DESPUÉS" } },
      { id: "ba-5", type: "cta",   photo: r(5),
        texts: { headline: "Tu Hogar\nPodría Ser el Próximo", subheadline: "Cotización gratis · Visita en sitio · Respuesta en 24hs", cta: "Ver las Posibilidades", phone: PHONE, web: WEB } },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// CAMPAIGN 3 — "Authority"  (trust, social proof, numbers)
// ══════════════════════════════════════════════════════════════════════════════
const c3_en: Theme[] = [
  {
    key: "interior", label: "Interior Painting", color: "#4A90D9",
    slides: [
      { id: "int-1", type: "hero",    photo: p(2),
        texts: { tag: "500+ HOMES PAINTED", headline: "Miami's Most\nTrusted Interior\nPainters.", subheadline: "Premium Interior Painting · Miami-Dade" } },
      { id: "int-2", type: "feature", photo: p(4),
        texts: { tag: "WHY FAMILIES CHOOSE US", headline: "Licensed.\nInsured.\nExperienced.", body: "Every project is managed by seasoned professionals who take pride in precision. We don't meet expectations — we exceed them." } },
      { id: "int-3", type: "list",    photo: p(9),
        texts: { tag: "WHITE-GLOVE SERVICE", headline: "Above & Beyond\nEvery Time", bullet1: "Licensed, insured & background-checked team", bullet2: "On-time, every time — we respect your schedule", bullet3: "Final walkthrough — your satisfaction is guaranteed" } },
      { id: "int-4", type: "stat",    photo: p(10),
        texts: { tag: "THE PROOF IS IN THE NUMBERS", headline: "Why 500+\nFamilies Chose Us", ...STATS_EN } },
      { id: "int-5", type: "cta",     photo: p(12),
        texts: { headline: "Join 500+\nSatisfied Homeowners", subheadline: "Free detailed quote — no surprises, ever.", cta: "Get My Free Quote Today", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "exterior", label: "Exterior Painting", color: "#4CAF50",
    slides: [
      { id: "ext-1", type: "hero",    photo: r(4),
        texts: { tag: "MIAMI-DADE SPECIALISTS", headline: "21 Cities.\nOne Standard:\nExcellence.", subheadline: "Exterior Painting · Miami-Dade County" } },
      { id: "ext-2", type: "feature", photo: p(18),
        texts: { tag: "FLORIDA-PROOF YOUR HOME", headline: "Built to Outlast\nMiami Weather.", body: "UV-resistant coatings and elastomeric finishes stop moisture, mold and sun damage before they start. Long-lasting beauty guaranteed." } },
      { id: "ext-3", type: "list",    photo: r(1),
        texts: { tag: "FULL-SERVICE EXTERIOR", headline: "We Handle\nEvery Step", bullet1: "Pressure washing & crack repair included", bullet2: "Premium primer + minimum 2 finish coats", bullet3: "Complete cleanup — we leave zero mess" } },
      { id: "ext-4", type: "stat",    photo: r(3),
        texts: { tag: "PROVEN ACROSS MIAMI-DADE", headline: "Results You\nCan Count On", ...STATS_EN } },
      { id: "ext-5", type: "cta",     photo: p(8),
        texts: { headline: "Protected.\nBeautiful.\nDone Right.", subheadline: "Free estimate — same-week scheduling available.", cta: "Schedule My Free Visit", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "signature", label: "Signature Services", color: "#E77B00",
    slides: [
      { id: "sig-1", type: "hero",    photo: p(24),
        texts: { tag: "ARTISAN FINISHES", headline: "Not Every\nPainter Can\nDo This.", subheadline: "Decorative Wall Finishes · Miami-Dade" } },
      { id: "sig-2", type: "feature", photo: p(27),
        texts: { tag: "VENETIAN PLASTER", headline: "Old World Mastery,\nModern Impact", body: "Our Venetian Plaster artisans are trained in authentic Italian technique — walls with brilliance and depth that no ordinary paint achieves." } },
      { id: "sig-3", type: "feature", photo: p(32),
        texts: { tag: "LIMEWASH", headline: "Ancient Texture.\nFresh Perspective.", body: "Limewash has graced the world's most beautiful interiors for centuries. We bring that ancient craft to Miami's finest homes." } },
      { id: "sig-4", type: "feature", photo: p(33),
        texts: { tag: "ROMAN CLAY", headline: "Earthy. Bold.\nUnforgettable.", body: "Roman Clay delivers a raw, matte warmth that transforms any room into a statement. Durable, beautiful and uniquely yours." } },
      { id: "sig-5", type: "cta",     photo: p(34),
        texts: { headline: "Upgrade Your\nInteriors Today", subheadline: "Free consultation & sample application on us.", cta: "Book My Free Consult", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "beforeafter", label: "Before & After", color: "#9B59B6",
    slides: [
      { id: "ba-1", type: "hero",  photo: r(6),
        texts: { tag: "SEE THE DIFFERENCE", headline: "Before vs. After\nCombo Studio.", subheadline: "Real results from real Miami homes" } },
      { id: "ba-2", type: "split", photo: p(15), photoAlt: r(5),
        texts: { tag: "INTERIOR TRANSFORMATION", headline: "Same Room.\nDifferent World.", labelLeft: "BEFORE", labelRight: "AFTER" } },
      { id: "ba-3", type: "split", photo: p(16), photoAlt: r(6),
        texts: { tag: "EXTERIOR MAKEOVER", headline: "Neighborhood\nStandout", labelLeft: "BEFORE", labelRight: "AFTER" } },
      { id: "ba-4", type: "split", photo: p(20), photoAlt: r(7),
        texts: { tag: "SIGNATURE MAGIC", headline: "Venetian Plaster\nMagic", labelLeft: "PLAIN WALL", labelRight: "AFTER" } },
      { id: "ba-5", type: "cta",   photo: r(7),
        texts: { headline: "Ready for Your\nTransformation?", subheadline: "Free quote · On-site visit · Answer in 24 hours", cta: "Start My Project", phone: PHONE, web: WEB } },
    ],
  },
];

const c3_es: Theme[] = [
  {
    key: "interior", label: "Pintura Interior", color: "#4A90D9",
    slides: [
      { id: "int-1", type: "hero",    photo: p(2),
        texts: { tag: "500+ HOGARES PINTADOS", headline: "Los Pintores\nde Interior Más\nConfiables de Miami.", subheadline: "Pintura Interior Premium · Miami-Dade" } },
      { id: "int-2", type: "feature", photo: p(4),
        texts: { tag: "POR QUÉ NOS ELIGEN", headline: "Licenciados.\nAsegurados.\nExperimentados.", body: "Cada proyecto está dirigido por profesionales que se enorgullecen de la precisión. No cumplimos expectativas — las superamos." } },
      { id: "int-3", type: "list",    photo: p(9),
        texts: { tag: "SERVICIO WHITE-GLOVE", headline: "Por Encima\ny Más Allá Siempre", bullet1: "Equipo licenciado, asegurado y con verificación de antecedentes", bullet2: "Puntualidad garantizada — respetamos tu tiempo", bullet3: "Recorrido final — tu satisfacción está garantizada" } },
      { id: "int-4", type: "stat",    photo: p(10),
        texts: { tag: "LOS NÚMEROS NO MIENTEN", headline: "Por Qué 500+\nFamilias Nos Eligieron", ...STATS_ES } },
      { id: "int-5", type: "cta",     photo: p(12),
        texts: { headline: "Únete a 500+\nFamilias Satisfechas", subheadline: "Cotización detallada gratis — sin sorpresas.", cta: "Obtener Mi Cotización Hoy", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "exterior", label: "Pintura Exterior", color: "#4CAF50",
    slides: [
      { id: "ext-1", type: "hero",    photo: r(4),
        texts: { tag: "ESPECIALISTAS EN MIAMI-DADE", headline: "21 Ciudades.\nUn Estándar:\nExcelencia.", subheadline: "Pintura Exterior · Condado Miami-Dade" } },
      { id: "ext-2", type: "feature", photo: p(18),
        texts: { tag: "PROTEGE TU HOGAR", headline: "Diseñado para\nResistir el Clima\nde Miami.", body: "Recubrimientos resistentes a UV y pinturas elásticas detienen la humedad, el moho y el daño solar antes de que empiecen." } },
      { id: "ext-3", type: "list",    photo: r(1),
        texts: { tag: "SERVICIO COMPLETO", headline: "Nosotros\nManejamos Todo", bullet1: "Lavado a presión y reparación de grietas incluidos", bullet2: "Imprimante premium + mínimo 2 capas de acabado", bullet3: "Limpieza total — dejamos todo impecable" } },
      { id: "ext-4", type: "stat",    photo: r(3),
        texts: { tag: "COMPROBADO EN MIAMI-DADE", headline: "Resultados en\nlos que Confiar", ...STATS_ES } },
      { id: "ext-5", type: "cta",     photo: p(8),
        texts: { headline: "Protegido.\nHermoso.\nBien Hecho.", subheadline: "Presupuesto gratis. Agenda disponible esta semana.", cta: "Agendar Mi Visita Gratis", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "signature", label: "Servicios Signature", color: "#E77B00",
    slides: [
      { id: "sig-1", type: "hero",    photo: p(24),
        texts: { tag: "ACABADOS ARTESANALES", headline: "No Todo\nPintor Puede\nHacer Esto.", subheadline: "Acabados Decorativos · Miami-Dade" } },
      { id: "sig-2", type: "feature", photo: p(27),
        texts: { tag: "ESTUCO VENECIANO", headline: "Maestría Italiana,\nImpacto Moderno", body: "Nuestros artesanos de Estuco Veneciano están formados en técnica italiana auténtica. El resultado: paredes con profundidad y brillo únicos." } },
      { id: "sig-3", type: "feature", photo: p(32),
        texts: { tag: "LIMEWASH", headline: "Textura Ancestral.\nPerspectiva Nueva.", body: "El Limewash ha adornado los hogares más bellos del mundo por siglos. Lo traemos a los mejores interiores de Miami con durabilidad garantizada." } },
      { id: "sig-4", type: "feature", photo: p(33),
        texts: { tag: "ARCILLA ROMANA", headline: "Cruda. Audaz.\nInolvidable.", body: "La Arcilla Romana ofrece calidez mate y cruda que convierte cualquier ambiente en una declaración de estilo. Duradera y única." } },
      { id: "sig-5", type: "cta",     photo: p(34),
        texts: { headline: "Mejora Tus\nAmbientes Hoy", subheadline: "Consulta gratis e instalación de muestra de regalo.", cta: "Reservar Mi Consulta Gratis", phone: PHONE, web: WEB } },
    ],
  },
  {
    key: "beforeafter", label: "Antes & Después", color: "#9B59B6",
    slides: [
      { id: "ba-1", type: "hero",  photo: r(6),
        texts: { tag: "VE LA DIFERENCIA", headline: "Antes vs.\nDespués con\nCombo Studio.", subheadline: "Resultados reales de hogares reales en Miami" } },
      { id: "ba-2", type: "split", photo: p(15), photoAlt: r(5),
        texts: { tag: "TRANSFORMACIÓN INTERIOR", headline: "El Mismo\nCuarto. Otro Mundo.", labelLeft: "ANTES", labelRight: "DESPUÉS" } },
      { id: "ba-3", type: "split", photo: p(16), photoAlt: r(6),
        texts: { tag: "RENOVACIÓN EXTERIOR", headline: "El Destaque\ndel Vecindario", labelLeft: "ANTES", labelRight: "DESPUÉS" } },
      { id: "ba-4", type: "split", photo: p(20), photoAlt: r(7),
        texts: { tag: "MAGIA SIGNATURE", headline: "Magia de\nEstuco Veneciano", labelLeft: "PARED SIMPLE", labelRight: "DESPUÉS" } },
      { id: "ba-5", type: "cta",   photo: r(7),
        texts: { headline: "¿Listo para Tu\nTransformación?", subheadline: "Cotización gratis · Visita en sitio · Respuesta en 24 horas", cta: "Iniciar Mi Proyecto", phone: PHONE, web: WEB } },
    ],
  },
];

// ─── Campaigns export ──────────────────────────────────────────────────────
export const CAMPAIGNS: Campaign[] = [
  { id: "craft",     label: "Craft & Quality", labelEs: "Calidad & Arte",  themes: c1_en, themesEs: c1_es },
  { id: "transform", label: "Transformation",  labelEs: "Transformación",  themes: c2_en, themesEs: c2_es },
  { id: "authority", label: "Authority",        labelEs: "Autoridad",       themes: c3_en, themesEs: c3_es },
];

// Backward-compat aliases (first campaign)
export const THEMES    = CAMPAIGNS[0].themes;
export const THEMES_ES = CAMPAIGNS[0].themesEs;
