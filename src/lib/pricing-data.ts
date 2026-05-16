// Internal pricing database — extracted from COMBO_STUDIO_PAINT_Cost_Matrix_Miami_Dade.xlsx
// All prices are base prices. Final price = base × city multiplier.

export type ServiceCategory = "Residential" | "Commercial" | "Signature" | "Equipment" | "Labor" | "Materials";
export type PricingUnit = "sq ft" | "linear ft" | "session" | "day" | "hour" | "gallon" | "project" | "roll" | "unit" | "pack";

export interface ServiceDef {
  id: string;
  category: ServiceCategory;
  name: string;
  unit: PricingUnit;
  basePrice: number;
  minPrice: number;
  taxable: boolean;
  notes: string;
  isSignature?: boolean;
}

export interface ServiceState {
  enabled: boolean;
  qty: number;
  pricePerUnit: number;
  priceOverride: number | null;
  taxable: boolean;
  difficultyMult: number;
  accessMult: number;
  notes: string;
}

export interface Controls {
  includeTax: boolean;
  taxRate: number;
  overhead: number;
  profit: number;
  discount: number;
  rushFee: boolean;
  rushRate: number;
  weekendWork: boolean;
  weekendRate: number;
  nightWork: boolean;
  nightRate: number;
  occupiedMult: number;
  luxuryMult: number;
}

export interface CustomItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  qty: number;
  price: number;
  taxable: boolean;
  notes: string;
}

export const CITIES: Record<string, { multiplier: number; tier: string }> = {
  "Miami":              { multiplier: 1.00, tier: "Core Market" },
  "Miami Beach":        { multiplier: 1.25, tier: "Luxury / Coastal" },
  "Coral Gables":       { multiplier: 1.22, tier: "Luxury" },
  "Doral":              { multiplier: 1.08, tier: "Premium Commercial" },
  "Hialeah":            { multiplier: 0.90, tier: "Value Market" },
  "Kendall":            { multiplier: 0.96, tier: "Residential" },
  "Homestead":          { multiplier: 0.86, tier: "Value / South" },
  "Cutler Bay":         { multiplier: 0.92, tier: "Residential" },
  "West Miami":         { multiplier: 0.98, tier: "Residential" },
  "South Miami":        { multiplier: 1.12, tier: "Premium Residential" },
  "North Miami":        { multiplier: 0.96, tier: "Residential / Commercial" },
  "Sweetwater":         { multiplier: 0.92, tier: "Value / Commercial" },
  "Palmetto Bay":       { multiplier: 1.08, tier: "Premium Residential" },
  "Miami Gardens":      { multiplier: 0.90, tier: "Value / Commercial" },
  "Miami Lakes":        { multiplier: 1.02, tier: "Residential" },
  "Pinecrest":          { multiplier: 1.30, tier: "Ultra Luxury" },
  "Aventura":           { multiplier: 1.18, tier: "Luxury Condo" },
  "Miramar":            { multiplier: 0.98, tier: "Surrounding Premium" },
  "Westchester":        { multiplier: 0.96, tier: "Residential" },
  "Miami-Dade County":  { multiplier: 1.00, tier: "Default" },
  "Surrounding Areas":  { multiplier: 0.98, tier: "Fallback" },
};

export const SERVICES: ServiceDef[] = [
  // Residential
  { id: "res_interior",   category: "Residential", name: "Interior Painting",    unit: "sq ft",     basePrice: 3.25,  minPrice: 650,  taxable: true,  notes: "Standard interior repaint by painted area." },
  { id: "res_exterior",   category: "Residential", name: "Exterior Painting",    unit: "sq ft",     basePrice: 3.75,  minPrice: 850,  taxable: true,  notes: "Exterior surfaces; adjust for height, stucco, weather." },
  { id: "res_luxury",     category: "Residential", name: "Luxury Homes",         unit: "sq ft",     basePrice: 4.85,  minPrice: 1500, taxable: true,  notes: "Premium prep, clean finish, higher supervision." },
  { id: "res_condos",     category: "Residential", name: "Condos",               unit: "sq ft",     basePrice: 3.55,  minPrice: 750,  taxable: true,  notes: "Includes condo logistics; confirm elevator/access." },
  { id: "res_hoa",        category: "Residential", name: "HOA Projects",         unit: "sq ft",     basePrice: 3.35,  minPrice: 1200, taxable: true,  notes: "Community-wide projects; scalable pricing." },
  { id: "res_repaint",    category: "Residential", name: "Repainting",           unit: "sq ft",     basePrice: 2.95,  minPrice: 550,  taxable: true,  notes: "Standard repaint over existing surfaces." },
  { id: "res_accent",     category: "Residential", name: "Accent Walls",         unit: "sq ft",     basePrice: 5.25,  minPrice: 350,  taxable: true,  notes: "Feature wall painting with premium finish." },
  { id: "res_drywall",    category: "Residential", name: "Drywall Repair",       unit: "sq ft",     basePrice: 4.75,  minPrice: 450,  taxable: true,  notes: "Patch, repair, and smooth drywall surfaces." },
  { id: "res_pressure",   category: "Residential", name: "Pressure Cleaning",    unit: "sq ft",     basePrice: 0.55,  minPrice: 250,  taxable: true,  notes: "Exterior surface cleaning before painting." },
  { id: "res_cabinet",    category: "Residential", name: "Cabinet Painting",     unit: "linear ft", basePrice: 95,    minPrice: 1200, taxable: true,  notes: "Kitchen/bathroom cabinet repainting." },
  { id: "res_ceiling",    category: "Residential", name: "Ceiling Painting",     unit: "sq ft",     basePrice: 2.20,  minPrice: 450,  taxable: true,  notes: "Flat or textured ceiling surfaces." },
  { id: "res_trim",       category: "Residential", name: "Trim & Baseboards",    unit: "linear ft", basePrice: 2.75,  minPrice: 350,  taxable: true,  notes: "Doors, windows, baseboards, crown molding." },
  { id: "res_garage",     category: "Residential", name: "Garage Floors",        unit: "sq ft",     basePrice: 4.50,  minPrice: 650,  taxable: true,  notes: "Epoxy or sealed garage floor coating." },
  { id: "res_waterproof", category: "Residential", name: "Waterproofing",        unit: "sq ft",     basePrice: 2.85,  minPrice: 700,  taxable: true,  notes: "Exterior waterproofing membrane application." },
  { id: "res_stucco",     category: "Residential", name: "Stucco Repairs",       unit: "sq ft",     basePrice: 5.25,  minPrice: 600,  taxable: true,  notes: "Stucco patch and repair before painting." },

  // Commercial
  { id: "com_offices",    category: "Commercial", name: "Offices",               unit: "sq ft",     basePrice: 2.85,  minPrice: 950,  taxable: true,  notes: "Standard office interior painting." },
  { id: "com_retail",     category: "Commercial", name: "Retail",                unit: "sq ft",     basePrice: 3.15,  minPrice: 950,  taxable: true,  notes: "Retail space interior and storefront." },
  { id: "com_restaurants",category: "Commercial", name: "Restaurants",           unit: "sq ft",     basePrice: 3.55,  minPrice: 1200, taxable: true,  notes: "Food service compliant finishes." },
  { id: "com_warehouses", category: "Commercial", name: "Warehouses",            unit: "sq ft",     basePrice: 1.75,  minPrice: 1500, taxable: true,  notes: "Industrial-grade coatings, large areas." },
  { id: "com_multifamily",category: "Commercial", name: "Multifamily",           unit: "sq ft",     basePrice: 2.65,  minPrice: 1500, taxable: true,  notes: "Apartment/condo building common areas and units." },
  { id: "com_hospitality",category: "Commercial", name: "Hospitality",           unit: "sq ft",     basePrice: 4.25,  minPrice: 1800, taxable: true,  notes: "Hotels, resorts — premium finishes, minimal disruption." },
  { id: "com_newdev",     category: "Commercial", name: "New Developments",      unit: "sq ft",     basePrice: 3.05,  minPrice: 2500, taxable: true,  notes: "New construction painting from foundation." },
  { id: "com_lobbies",    category: "Commercial", name: "Lobbies",               unit: "sq ft",     basePrice: 4.50,  minPrice: 1200, taxable: true,  notes: "Premium lobby finishes with design direction." },
  { id: "com_hallways",   category: "Commercial", name: "Hallways",              unit: "sq ft",     basePrice: 2.75,  minPrice: 900,  taxable: true,  notes: "Corridor and hallway painting." },
  { id: "com_common",     category: "Commercial", name: "Common Areas",          unit: "sq ft",     basePrice: 3.15,  minPrice: 1200, taxable: true,  notes: "Amenity areas, lounges, recreational spaces." },
  { id: "com_parking",    category: "Commercial", name: "Parking Structures",    unit: "sq ft",     basePrice: 1.65,  minPrice: 1500, taxable: true,  notes: "Traffic paint, line marking, structural coatings." },
  { id: "com_industrial", category: "Commercial", name: "Industrial Spaces",     unit: "sq ft",     basePrice: 1.95,  minPrice: 1800, taxable: true,  notes: "Heavy-duty industrial coatings." },

  // Signature Finishes
  { id: "sig_limewash",   category: "Signature", name: "Limewash Finishes",      unit: "sq ft",     basePrice: 8.50,  minPrice: 1200, taxable: true,  notes: "Authentic limewash. Multiple coats. Breathable, antimicrobial.", isSignature: true },
  { id: "sig_romanclay",  category: "Signature", name: "Roman Clay Finishes",    unit: "sq ft",     basePrice: 10.50, minPrice: 1500, taxable: true,  notes: "Allow 24–48h drying time per coat. Specialty labor.", isSignature: true },
  { id: "sig_venetian",   category: "Signature", name: "Venetian Plaster",       unit: "sq ft",     basePrice: 15.00, minPrice: 2200, taxable: true,  notes: "Multi-coat with burnishing. Specialty labor required.", isSignature: true },
  { id: "sig_textured",   category: "Signature", name: "Textured Feature Walls", unit: "sq ft",     basePrice: 9.00,  minPrice: 1200, taxable: true,  notes: "Custom texture application for focal walls.", isSignature: true },
  { id: "sig_matte",      category: "Signature", name: "Luxury Matte Finishes",  unit: "sq ft",     basePrice: 5.75,  minPrice: 850,  taxable: true,  notes: "Ultra-flat premium matte systems.", isSignature: true },
  { id: "sig_decorative", category: "Signature", name: "Decorative Arch. Finishes", unit: "sq ft", basePrice: 11.00, minPrice: 1500, taxable: true,  notes: "Custom architectural decorative coatings.", isSignature: true },
  { id: "sig_consult",    category: "Signature", name: "Color Consultation",     unit: "session",   basePrice: 250,   minPrice: 250,  taxable: true,  notes: "Professional color selection session (2–3 hours)." },
  { id: "sig_palette",    category: "Signature", name: "Warm Neutral Palette",   unit: "session",   basePrice: 350,   minPrice: 350,  taxable: true,  notes: "Full property palette direction." },
  { id: "sig_mediter",    category: "Signature", name: "Earthy Mediterranean",   unit: "sq ft",     basePrice: 9.75,  minPrice: 1300, taxable: true,  notes: "Organic earthy tones with natural pigments.", isSignature: true },
  { id: "sig_organic",    category: "Signature", name: "Modern Organic Finishes",unit: "sq ft",     basePrice: 8.85,  minPrice: 1200, taxable: true,  notes: "Biophilic, warm-neutral wall systems.", isSignature: true },
  { id: "sig_mono",       category: "Signature", name: "Monochromatic Luxury",   unit: "sq ft",     basePrice: 6.75,  minPrice: 900,  taxable: true,  notes: "Single-tone luxury wall systems.", isSignature: true },
  { id: "sig_seamless",   category: "Signature", name: "Seamless Arch. Finishes",unit: "sq ft",     basePrice: 12.50, minPrice: 1800, taxable: true,  notes: "No-joint continuous finish systems.", isSignature: true },
  { id: "sig_custom",     category: "Signature", name: "Custom Accent Walls",    unit: "sq ft",     basePrice: 7.25,  minPrice: 750,  taxable: true,  notes: "Bespoke accent wall treatments.", isSignature: true },
  { id: "sig_texture",    category: "Signature", name: "High-End Wall Textures", unit: "sq ft",     basePrice: 9.50,  minPrice: 1200, taxable: true,  notes: "Premium texture systems.", isSignature: true },
  { id: "sig_archdirect", category: "Signature", name: "Architectural Color Dir.",unit: "session",   basePrice: 450,   minPrice: 450,  taxable: true,  notes: "Full project color strategy session." },
  { id: "sig_contemp",    category: "Signature", name: "Contemporary Wall Treats.",unit: "sq ft",    basePrice: 8.25,  minPrice: 1100, taxable: true,  notes: "Modern wall treatment systems.", isSignature: true },
  { id: "sig_premium",    category: "Signature", name: "Premium Decorative Coat.",unit: "sq ft",    basePrice: 10.00, minPrice: 1400, taxable: true,  notes: "High-end protective decorative coatings.", isSignature: true },
  { id: "sig_soft",       category: "Signature", name: "Soft Matte Wall Systems",unit: "sq ft",     basePrice: 5.95,  minPrice: 850,  taxable: true,  notes: "Velvet-soft matte systems.", isSignature: true },
  { id: "sig_bespoke",    category: "Signature", name: "Bespoke Finish Apps.",    unit: "sq ft",     basePrice: 13.50, minPrice: 1900, taxable: true,  notes: "One-of-a-kind custom finish applications.", isSignature: true },
  { id: "sig_modern",     category: "Signature", name: "Modern Luxury Surface",  unit: "sq ft",     basePrice: 11.50, minPrice: 1600, taxable: true,  notes: "Premium modern surface treatment systems.", isSignature: true },

  // Equipment & Access
  { id: "eq_scaffolding", category: "Equipment", name: "Scaffolding",            unit: "day",       basePrice: 185,   minPrice: 185,  taxable: true,  notes: "Per day rental." },
  { id: "eq_forklift",    category: "Equipment", name: "Forklifts",              unit: "day",       basePrice: 375,   minPrice: 375,  taxable: true,  notes: "Per day rental." },
  { id: "eq_boom",        category: "Equipment", name: "Boom Lifts",             unit: "day",       basePrice: 425,   minPrice: 425,  taxable: true,  notes: "High-reach access. Per day." },
  { id: "eq_scissor",     category: "Equipment", name: "Scissor Lifts",          unit: "day",       basePrice: 325,   minPrice: 325,  taxable: true,  notes: "Indoor/outdoor. Per day." },
  { id: "eq_swing",       category: "Equipment", name: "Swing Stage",            unit: "day",       basePrice: 650,   minPrice: 650,  taxable: true,  notes: "High-rise facade access." },
  { id: "eq_ladders",     category: "Equipment", name: "Ladders",                unit: "day",       basePrice: 45,    minPrice: 45,   taxable: true,  notes: "Standard ladder rental." },
  { id: "eq_safety",      category: "Equipment", name: "Safety Equipment",       unit: "project",   basePrice: 150,   minPrice: 150,  taxable: true,  notes: "PPE, harnesses, safety kits." },
  { id: "eq_barriers",    category: "Equipment", name: "Protective Barriers",    unit: "project",   basePrice: 225,   minPrice: 225,  taxable: true,  notes: "Floor and furniture protection." },

  // Labor
  { id: "lab_painters",   category: "Labor", name: "Painters",                   unit: "hour",      basePrice: 45,    minPrice: 180,  taxable: false, notes: "Standard painter rate per hour." },
  { id: "lab_signature",  category: "Labor", name: "Signature Specialists",      unit: "hour",      basePrice: 75,    minPrice: 300,  taxable: false, notes: "Specialty finish applicators." },
  { id: "lab_drywall",    category: "Labor", name: "Drywall Specialists",        unit: "hour",      basePrice: 58,    minPrice: 232,  taxable: false, notes: "Drywall repair and finishing." },
  { id: "lab_supervisors",category: "Labor", name: "Supervisors",                unit: "hour",      basePrice: 65,    minPrice: 260,  taxable: false, notes: "On-site project supervision." },
  { id: "lab_helpers",    category: "Labor", name: "Helpers",                    unit: "hour",      basePrice: 28,    minPrice: 112,  taxable: false, notes: "General labor support." },
  { id: "lab_pm",         category: "Labor", name: "Project Managers",           unit: "hour",      basePrice: 85,    minPrice: 340,  taxable: false, notes: "Project management and coordination." },

  // Materials
  { id: "mat_primer",     category: "Materials", name: "Primer",                 unit: "gallon",    basePrice: 38,    minPrice: 38,   taxable: true,  notes: "Interior/exterior primer." },
  { id: "mat_paint",      category: "Materials", name: "Paint",                  unit: "gallon",    basePrice: 58,    minPrice: 58,   taxable: true,  notes: "Standard premium paint." },
  { id: "mat_specialty",  category: "Materials", name: "Specialty Paint",        unit: "gallon",    basePrice: 92,    minPrice: 92,   taxable: true,  notes: "High-performance specialty coatings." },
  { id: "mat_limewash",   category: "Materials", name: "Limewash Material",      unit: "gallon",    basePrice: 115,   minPrice: 115,  taxable: true,  notes: "Authentic limewash material." },
  { id: "mat_romanclay",  category: "Materials", name: "Roman Clay Material",    unit: "gallon",    basePrice: 125,   minPrice: 125,  taxable: true,  notes: "Premium Roman Clay material." },
  { id: "mat_venetian",   category: "Materials", name: "Venetian Plaster Mat.",  unit: "gallon",    basePrice: 165,   minPrice: 165,  taxable: true,  notes: "Authentic Venetian plaster." },
  { id: "mat_protective", category: "Materials", name: "Protective Materials",   unit: "project",   basePrice: 180,   minPrice: 180,  taxable: true,  notes: "Drop cloths, plastic sheeting." },
  { id: "mat_plastic",    category: "Materials", name: "Plastic Coverings",      unit: "roll",      basePrice: 28,    minPrice: 28,   taxable: true,  notes: "Protective plastic rolls." },
  { id: "mat_tape",       category: "Materials", name: "Tape",                   unit: "roll",      basePrice: 8,     minPrice: 8,    taxable: true,  notes: "Painter's tape." },
  { id: "mat_rollers",    category: "Materials", name: "Rollers",                unit: "unit",      basePrice: 12,    minPrice: 12,   taxable: true,  notes: "Paint rollers." },
  { id: "mat_brushes",    category: "Materials", name: "Brushes",                unit: "unit",      basePrice: 16,    minPrice: 16,   taxable: true,  notes: "Paint brushes." },
  { id: "mat_sprayers",   category: "Materials", name: "Sprayers",               unit: "day",       basePrice: 95,    minPrice: 95,   taxable: true,  notes: "Airless sprayer rental." },
  { id: "mat_sandpaper",  category: "Materials", name: "Sandpaper",              unit: "pack",      basePrice: 14,    minPrice: 14,   taxable: true,  notes: "Prep sandpaper packs." },
  { id: "mat_sealers",    category: "Materials", name: "Sealers",                unit: "gallon",    basePrice: 68,    minPrice: 68,   taxable: true,  notes: "Protective sealers and varnishes." },
];

export interface TemplateConfig {
  label: string;
  services: string[];
  defaultQty: Record<string, number>;
  suggestedUpgrades?: string[];
}

export const TEMPLATES: Record<string, TemplateConfig> = {
  luxury_residential: {
    label: "Luxury Residential",
    services: ["res_interior", "res_exterior", "res_luxury", "res_trim", "res_ceiling", "res_accent", "sig_consult"],
    defaultQty: { res_interior: 3000, res_exterior: 2500, res_luxury: 3000, res_trim: 200, res_ceiling: 2000, res_accent: 300, sig_consult: 1 },
    suggestedUpgrades: ["sig_limewash", "sig_romanclay", "sig_archdirect"],
  },
  condo_repaint: {
    label: "Condo Repaint",
    services: ["res_condos", "res_interior", "res_trim", "res_ceiling"],
    defaultQty: { res_condos: 1200, res_interior: 1200, res_trim: 120, res_ceiling: 1000 },
    suggestedUpgrades: ["sig_consult", "sig_matte"],
  },
  commercial_office: {
    label: "Commercial Office",
    services: ["com_offices", "com_lobbies", "com_hallways"],
    defaultQty: { com_offices: 5000, com_lobbies: 800, com_hallways: 1200 },
  },
  restaurant: {
    label: "Restaurant",
    services: ["com_restaurants", "sig_consult"],
    defaultQty: { com_restaurants: 2500, sig_consult: 1 },
    suggestedUpgrades: ["sig_limewash", "sig_textured", "sig_archdirect"],
  },
  hospitality: {
    label: "Hospitality",
    services: ["com_hospitality", "com_lobbies", "com_hallways", "sig_consult"],
    defaultQty: { com_hospitality: 8000, com_lobbies: 1500, com_hallways: 2000, sig_consult: 1 },
    suggestedUpgrades: ["sig_venetian", "sig_limewash", "sig_archdirect"],
  },
  warehouse: {
    label: "Warehouse",
    services: ["com_warehouses", "com_parking"],
    defaultQty: { com_warehouses: 15000, com_parking: 5000 },
  },
  hoa_community: {
    label: "HOA Community",
    services: ["res_hoa", "res_exterior", "res_pressure"],
    defaultQty: { res_hoa: 10000, res_exterior: 8000, res_pressure: 8000 },
  },
  multifamily: {
    label: "Multifamily",
    services: ["com_multifamily", "com_hallways", "com_common", "com_lobbies"],
    defaultQty: { com_multifamily: 12000, com_hallways: 3000, com_common: 2000, com_lobbies: 600 },
  },
  signature_project: {
    label: "Signature Finishes",
    services: ["sig_limewash", "sig_romanclay", "sig_consult", "sig_archdirect"],
    defaultQty: { sig_limewash: 800, sig_romanclay: 500, sig_consult: 1, sig_archdirect: 1 },
    suggestedUpgrades: ["sig_venetian", "sig_textured", "sig_bespoke"],
  },
};

export function getDefaultQty(def: ServiceDef): number {
  switch (def.unit) {
    case "sq ft":     return 1000;
    case "linear ft": return 50;
    case "session":   return 1;
    case "day":       return 3;
    case "hour":      return 8;
    case "gallon":    return 5;
    case "project":   return 1;
    case "roll":      return 10;
    case "unit":      return 10;
    case "pack":      return 5;
    default:          return 1;
  }
}

export function initServices(city: string): Record<string, ServiceState> {
  const mult = CITIES[city]?.multiplier ?? 1;
  return Object.fromEntries(
    SERVICES.map(def => [def.id, {
      enabled:        false,
      qty:            getDefaultQty(def),
      pricePerUnit:   parseFloat((def.basePrice * mult).toFixed(2)),
      priceOverride:  null,
      taxable:        def.taxable,
      difficultyMult: 1.0,
      accessMult:     1.0,
      notes:          "",
    }])
  );
}

export interface CalcResult {
  enabledServices: Array<{
    def: ServiceDef;
    state: ServiceState;
    subtotal: number;
    effectivePrice: number;
    isOverride: boolean;
  }>;
  customSubtotal: number;
  byCategory: Partial<Record<ServiceCategory | "Custom", number>>;
  rawSubtotal:          number;
  adjSubtotal:          number;
  rushAmount:           number;
  weekendAmount:        number;
  nightAmount:          number;
  discountAmount:       number;
  afterDiscount:        number;
  overheadAmount:       number;
  profitAmount:         number;
  taxableBase:          number;
  taxAmount:            number;
  total:                number;
  activeCount:          number;
  totalSqFt:            number;
  avgPricePerSqFt:      number | null;
}

export function calculate(
  services: Record<string, ServiceState>,
  controls: Controls,
  customItems: CustomItem[]
): CalcResult {
  const enabledServices = SERVICES
    .filter(def => services[def.id]?.enabled)
    .map(def => {
      const state = services[def.id];
      const effectivePrice = state.priceOverride ?? state.pricePerUnit;
      const subtotal = state.qty * effectivePrice * state.difficultyMult * state.accessMult;
      return { def, state, subtotal, effectivePrice, isOverride: state.priceOverride !== null };
    });

  const customSubtotal = customItems.reduce((s, i) => s + i.qty * i.price, 0);

  const byCategory: Partial<Record<ServiceCategory | "Custom", number>> = { Custom: customSubtotal };
  for (const { def, subtotal } of enabledServices) {
    byCategory[def.category] = (byCategory[def.category] ?? 0) + subtotal;
  }

  const rawSubtotal = enabledServices.reduce((s, { subtotal }) => s + subtotal, 0) + customSubtotal;
  const globalAdj    = rawSubtotal * controls.occupiedMult * controls.luxuryMult;
  const rushAmount   = controls.rushFee    ? globalAdj * (controls.rushRate    / 100) : 0;
  const weekendAmount = controls.weekendWork ? globalAdj * (controls.weekendRate / 100) : 0;
  const nightAmount  = controls.nightWork  ? globalAdj * (controls.nightRate   / 100) : 0;
  const adjSubtotal  = globalAdj + rushAmount + weekendAmount + nightAmount;
  const discountAmount = adjSubtotal * (controls.discount / 100);
  const afterDiscount  = adjSubtotal - discountAmount;
  const overheadAmount = afterDiscount * (controls.overhead / 100);
  const profitAmount   = (afterDiscount + overheadAmount) * (controls.profit / 100);

  const taxableBase = enabledServices
    .filter(({ state }) => state.taxable)
    .reduce((s, { subtotal }) => s + subtotal, 0)
    * controls.occupiedMult * controls.luxuryMult
    * (1 - controls.discount / 100);
  const taxAmount = controls.includeTax ? taxableBase * (controls.taxRate / 100) : 0;
  const total = afterDiscount + overheadAmount + profitAmount + taxAmount;

  const sqftItems = enabledServices.filter(({ def }) => def.unit === "sq ft");
  const totalSqFt = sqftItems.reduce((s, { state }) => s + state.qty, 0);
  const sqftSubtotal = sqftItems.reduce((s, { subtotal }) => s + subtotal, 0);
  const avgPricePerSqFt = totalSqFt > 0 ? sqftSubtotal / totalSqFt : null;

  return {
    enabledServices, customSubtotal, byCategory, rawSubtotal, adjSubtotal,
    rushAmount, weekendAmount, nightAmount, discountAmount, afterDiscount,
    overheadAmount, profitAmount, taxableBase, taxAmount, total,
    activeCount: enabledServices.length, totalSqFt, avgPricePerSqFt,
  };
}
