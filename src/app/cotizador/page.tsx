"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  CITIES, SERVICES, TEMPLATES, ServiceDef, ServiceState, Controls, CustomItem,
  CalcResult, calculate, initServices, getDefaultQty,
} from "@/lib/pricing-data";

// ─── Brand tokens ──────────────────────────────────────────────────────────
// #E77B00 Burnt Orange · #F4F0E8 Warm Ivory · #5B3A29 Espresso Brown
// #1F1F1F Charcoal Black · #D9CBB8 Soft Sand

const fmt  = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtD = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Lang = "en" | "es";

const CATEGORIES = ["Residential", "Commercial", "Signature", "Equipment", "Labor", "Materials"] as const;

const CAT_COLOR: Record<string, string> = {
  Residential: "#4A90D9", Commercial: "#7B68EE", Signature: "#E77B00",
  Equipment: "#4CAF50", Labor: "#FF6B6B", Materials: "#48CAE4",
};

const DEFAULT_CONTROLS: Controls = {
  includeTax: false, taxRate: 7, overhead: 10, profit: 15, discount: 0,
  rushFee: false, rushRate: 15, weekendWork: false, weekendRate: 10,
  nightWork: false, nightRate: 20, occupiedMult: 1.0, luxuryMult: 1.0,
};

// ─── Translations ──────────────────────────────────────────────────────────
const T = {
  en: {
    estimator: "Project Estimator", projectName: "Project Name", clientName: "Client Name",
    city: "City", template: "Template", save: "Save Draft", saved: "Saved!",
    controls: "Controls", proposal: "Proposal Preview", langToggle: "ES",
    summary: "Project Summary", location: "Location", tier: "Tier",
    multiplier: "Multiplier", activeServices: "Active Services",
    totalSqFt: "Total Sq Ft", avgPerSqFt: "Avg / Sq Ft",
    byCategory: "By Category", servicesSubtotal: "Services Subtotal",
    discountLbl: "Discount", afterDiscount: "After Discount",
    overheadLbl: "Overhead", profitLbl: "Profit", taxLbl: "Tax",
    total: "Total", generateProposal: "Generate Proposal",
    includedServices: "Included Services", toggleHint: "Toggle services on the left to build your estimate.",
    advancedControls: "Advanced Cost Controls", includeTax: "Include Tax",
    discountPct: "Discount %", overheadPct: "Overhead %", profitMargin: "Profit Margin %",
    rushFee: "Rush Fee", weekendWork: "Weekend Work", nightWork: "Night Work",
    occupiedSpace: "Occupied Space ×", luxuryFinish: "Luxury Finish ×", resetDefaults: "Reset to defaults",
    quantity: "Quantity", pricePerUnit: "Price /", manualOverride: "Manual Override",
    reset: "Reset", difficulty: "Difficulty ×", access: "Access ×", taxable: "Taxable",
    subtotal: "Subtotal", belowMin: "Below minimum", internalNotes: "Internal Notes",
    notesPlaceholder: "Add notes...", customItems: "Custom Items", addCustom: "+ Add Custom Item",
    noCustom: "No custom items.", searchPlaceholder: "Search", searchSuffix: "services...",
    noServices: "No services found", suggestedFor: "Suggested for",
    proposalTitle: "Project Proposal", preparedFor: "Prepared For",
    projectLbl: "Project", scopeOfWork: "Scope of Work", serviceLbl: "Service",
    qtyLbl: "Qty", unitPrice: "Unit Price", amount: "Amount",
    projectConditions: "Project Conditions", validityLbl: "Proposal Validity",
    paymentTerms: "Payment Terms", additionalConditions: "Additional Conditions",
    addCondition: "+ Add condition", authorizedBy: "Authorized By",
    clientSignature: "Client Signature", dateLbl: "Date",
    print: "Print / PDF", generating: "Opening…", close: "Close", margin: "Margin",
    editConditions: "Edit Conditions", doneEditing: "Done",
    proposalNote: "This proposal is valid for the period stated above. All prices are subject to on-site verification.",
    confidential: "Internal · Confidential", acceptance: "Acceptance",
    tagline: "Premium Finishes. Exceptional Spaces.",
  },
  es: {
    estimator: "Cotizador de Proyectos", projectName: "Nombre del Proyecto", clientName: "Nombre del Cliente",
    city: "Ciudad", template: "Plantilla", save: "Guardar", saved: "¡Guardado!",
    controls: "Controles", proposal: "Ver Propuesta", langToggle: "EN",
    summary: "Resumen del Proyecto", location: "Ubicación", tier: "Nivel",
    multiplier: "Multiplicador", activeServices: "Servicios Activos",
    totalSqFt: "Total Sq Ft", avgPerSqFt: "Promedio / Sq Ft",
    byCategory: "Por Categoría", servicesSubtotal: "Subtotal Servicios",
    discountLbl: "Descuento", afterDiscount: "Después del Descuento",
    overheadLbl: "Gastos Generales", profitLbl: "Margen", taxLbl: "Impuesto",
    total: "Total", generateProposal: "Generar Propuesta",
    includedServices: "Servicios Incluidos", toggleHint: "Activa servicios a la izquierda para construir tu estimado.",
    advancedControls: "Controles de Costo Avanzados", includeTax: "Incluir Impuesto",
    discountPct: "Descuento %", overheadPct: "Gastos Generales %", profitMargin: "Margen de Ganancia %",
    rushFee: "Cargo por Urgencia", weekendWork: "Trabajo en Fin de Semana", nightWork: "Trabajo Nocturno",
    occupiedSpace: "Espacio Ocupado ×", luxuryFinish: "Acabado de Lujo ×", resetDefaults: "Restablecer",
    quantity: "Cantidad", pricePerUnit: "Precio /", manualOverride: "Ajuste Manual",
    reset: "Restablecer", difficulty: "Dificultad ×", access: "Acceso ×", taxable: "Gravable",
    subtotal: "Subtotal", belowMin: "Bajo el mínimo", internalNotes: "Notas Internas",
    notesPlaceholder: "Agrega notas...", customItems: "Partidas Personalizadas", addCustom: "+ Agregar Partida",
    noCustom: "Sin partidas personalizadas.", searchPlaceholder: "Buscar", searchSuffix: "servicios...",
    noServices: "Sin servicios encontrados", suggestedFor: "Sugerido para",
    proposalTitle: "Propuesta de Proyecto", preparedFor: "Preparado Para",
    projectLbl: "Proyecto", scopeOfWork: "Alcance del Trabajo", serviceLbl: "Servicio",
    qtyLbl: "Cant.", unitPrice: "Precio Unitario", amount: "Monto",
    projectConditions: "Condiciones del Proyecto", validityLbl: "Validez de la Propuesta",
    paymentTerms: "Forma de Pago", additionalConditions: "Condiciones Adicionales",
    addCondition: "+ Agregar condición", authorizedBy: "Autorizado Por",
    clientSignature: "Firma del Cliente", dateLbl: "Fecha",
    print: "Imprimir / PDF", generating: "Abriendo…", close: "Cerrar", margin: "Margen",
    editConditions: "Editar Condiciones", doneEditing: "Listo",
    proposalNote: "Esta propuesta tiene la validez indicada arriba. Todos los precios están sujetos a verificación en sitio.",
    confidential: "Interno · Confidencial", acceptance: "Aceptación",
    tagline: "Acabados Premium. Espacios Excepcionales.",
  },
};

// ─── Conditions ────────────────────────────────────────────────────────────
const defaultConditions = (lang: Lang) => ({
  validity: lang === "es" ? "30 días a partir de la fecha de emisión" : "30 days from the date of issue",
  payment:  lang === "es"
    ? "50% de anticipo al momento de aprobar el proyecto. 50% restante al finalizar y entregar el proyecto a satisfacción del cliente."
    : "50% deposit upon project approval. Remaining 50% upon project completion and client acceptance.",
  extraTerms: lang === "es"
    ? [
        "Todos los precios están sujetos a verificación y ajuste en visita al sitio.",
        "Se incluye protección completa de muebles, pisos y accesorios durante todo el proyecto.",
        "Los colores deben ser aprobados por el cliente antes de la aplicación completa.",
        "COMBO STUDIO PAINT garantiza materiales premium y acabados de alta calidad.",
      ]
    : [
        "All prices are subject to on-site verification and adjustment.",
        "Full protection of furniture, floors, and fixtures is included throughout the project.",
        "Colors must be approved by client prior to full application.",
        "COMBO STUDIO PAINT guarantees premium materials and high-quality finishes.",
      ],
});
type Conditions = ReturnType<typeof defaultConditions>;

// ─── Toggle ────────────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)}
      className={`relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 ${on ? "bg-[#E77B00]" : "bg-[#D9CBB8]"}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

function NumInput({ value, onChange, prefix, step = 1, min = 0, className = "" }: {
  value: number; onChange: (v: number) => void;
  prefix?: string; step?: number; min?: number; className?: string;
}) {
  const [raw, setRaw] = useState(String(value));
  const [prevValue, setPrevValue] = useState(value);
  if (prevValue !== value) {
    setPrevValue(value);
    setRaw(String(value));
  }
  return (
    <div className={`flex items-center bg-white border border-[#D9CBB8] rounded px-2 py-1 ${className}`}>
      {prefix && <span className="text-[#5B3A29]/30 text-xs mr-1">{prefix}</span>}
      <input type="number" value={raw} min={min} step={step}
        className="bg-transparent text-[#5B3A29] text-sm w-full outline-none"
        onChange={e => setRaw(e.target.value)}
        onBlur={e => {
          const n = parseFloat(e.target.value);
          if (!isNaN(n) && n >= min) { onChange(n); setRaw(String(n)); }
          else setRaw(String(value));
        }} />
    </div>
  );
}

// ─── Service Card ──────────────────────────────────────────────────────────
function ServiceCard({ def, state, cityName, onUpdate, t }: {
  def: ServiceDef; state: ServiceState; cityName: string;
  onUpdate: (id: string, patch: Partial<ServiceState>) => void;
  t: typeof T["en"];
}) {
  const [open, setOpen] = useState(false);
  const effectivePrice = state.priceOverride ?? state.pricePerUnit;
  const subtotal = state.qty * effectivePrice * state.difficultyMult * state.accessMult;
  const mult = CITIES[cityName]?.multiplier ?? 1;

  return (
    <div className={`border rounded-lg transition-all duration-200 ${state.enabled ? "border-[#E77B00]/40 bg-[#FEF9F3]" : "border-[#D9CBB8] bg-white"}`}>
      <div className="flex items-center gap-3 px-4 py-3">
        <Toggle on={state.enabled} onChange={() => { onUpdate(def.id, { enabled: !state.enabled }); if (!state.enabled) setOpen(true); }} />
        <button onClick={() => setOpen(v => !v)} className="flex-1 flex items-center gap-2 text-left min-w-0">
          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-sm uppercase tracking-wider flex-shrink-0"
            style={{ color: CAT_COLOR[def.category], backgroundColor: `${CAT_COLOR[def.category]}18` }}>
            {def.category}
          </span>
          <span className={`text-sm font-medium truncate ${state.enabled ? "text-[#5B3A29]" : "text-[#5B3A29]/35"}`}>{def.name}</span>
          {def.isSignature && <span className="text-[9px] text-[#E77B00] border border-[#E77B00]/30 px-1.5 py-0.5 rounded-sm uppercase tracking-wider flex-shrink-0">Signature</span>}
          {state.priceOverride !== null && <span className="text-[9px] text-amber-600 border border-amber-400/40 px-1.5 py-0.5 rounded-sm uppercase tracking-wider flex-shrink-0">{t.manualOverride}</span>}
        </button>
        <div className="text-right flex-shrink-0">
          {state.enabled
            ? <span className="text-[#E77B00] font-semibold text-sm tabular-nums">{fmt(subtotal)}</span>
            : <span className="text-[#D9CBB8] text-xs tabular-nums">{fmtD(effectivePrice)} / {def.unit}</span>}
        </div>
        <button onClick={() => setOpen(v => !v)} className="text-[#D9CBB8] hover:text-[#5B3A29]/40 transition-colors flex-shrink-0 ml-1">
          <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-[#EDE8DF] px-4 pb-4 pt-3">
          <p className="text-[#5B3A29]/40 text-xs mb-4 leading-relaxed">{def.notes}</p>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 mb-4">
            <div>
              <label className="block text-[10px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">{t.quantity} ({def.unit})</label>
              <NumInput value={state.qty} onChange={v => onUpdate(def.id, { qty: v })} step={def.unit === "sq ft" ? 100 : 1} />
            </div>
            <div>
              <label className="block text-[10px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">
                {t.pricePerUnit} {def.unit}
                {state.priceOverride !== null && <span className="ml-2 text-amber-600"> — {t.manualOverride}</span>}
              </label>
              <div className="flex gap-1">
                <NumInput value={state.priceOverride ?? state.pricePerUnit} onChange={v => onUpdate(def.id, { priceOverride: v })} prefix="$" step={0.01} className="flex-1" />
                {state.priceOverride !== null && (
                  <button onClick={() => onUpdate(def.id, { priceOverride: null })}
                    className="px-2 bg-[#F4F0E8] border border-[#D9CBB8] rounded text-[10px] text-[#5B3A29]/50 hover:text-[#5B3A29] transition-colors">
                    {t.reset}
                  </button>
                )}
              </div>
              <p className="text-[10px] text-[#5B3A29]/30 mt-1">
                {state.priceOverride !== null
                  ? `Source: ${cityName} → ${fmtD(state.pricePerUnit)} / ${def.unit}`
                  : `${cityName} (×${mult.toFixed(2)}) — Min: ${fmt(def.minPrice)}`}
              </p>
            </div>
            <div>
              <label className="block text-[10px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">{t.difficulty}</label>
              <NumInput value={state.difficultyMult} onChange={v => onUpdate(def.id, { difficultyMult: Math.max(0.5, v) })} step={0.05} min={0.5} />
            </div>
            <div>
              <label className="block text-[10px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">{t.access}</label>
              <NumInput value={state.accessMult} onChange={v => onUpdate(def.id, { accessMult: Math.max(0.5, v) })} step={0.05} min={0.5} />
            </div>
            <div className="flex items-center gap-2">
              <Toggle on={state.taxable} onChange={v => onUpdate(def.id, { taxable: v })} />
              <span className="text-xs text-[#5B3A29]/50">{t.taxable}</span>
            </div>
            <div>
              <label className="text-[10px] text-[#5B3A29]/40 uppercase tracking-widest">{t.subtotal}</label>
              <div className="text-[#E77B00] font-semibold text-lg tabular-nums">{fmtD(subtotal)}</div>
              {subtotal > 0 && subtotal < def.minPrice && (
                <span className="text-amber-600 text-[10px]">{t.belowMin} ({fmt(def.minPrice)})</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-[10px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">{t.internalNotes}</label>
            <textarea value={state.notes} onChange={e => onUpdate(def.id, { notes: e.target.value })}
              rows={2} placeholder={t.notesPlaceholder}
              className="w-full bg-[#F4F0E8] border border-[#D9CBB8] rounded px-3 py-2 text-xs text-[#5B3A29] placeholder-[#D9CBB8] outline-none focus:border-[#E77B00]/50 resize-none" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Proposal View — Brand Identity ───────────────────────────────────────
function ProposalView({ projectName, clientName, city, calc, controls, customItems, conditions, setConditions, onClose, t }: {
  projectName: string; clientName: string; city: string;
  calc: CalcResult; controls: Controls; customItems: CustomItem[];
  conditions: Conditions; setConditions: (c: Conditions) => void;
  onClose: () => void; t: typeof T["en"];
}) {
  const [editing, setEditing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const proposalNum = `CSP-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}`;

  const downloadPDF = () => {
    const proposal = document.getElementById("proposal-doc");
    if (!proposal) return;

    // Open blank window NOW — synchronous within the click event so popup blocker won't fire
    const win = window.open("", "_blank");
    if (!win) {
      alert("Por favor permite ventanas emergentes para este sitio.\nPlease allow popups for this site.");
      return;
    }

    setGenerating(true);

    // Collect Next.js compiled CSS from the current page
    const cssLinks = Array.from(
      document.head.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
    )
      .map(l => l.href)
      .filter(h => h && !h.includes("fonts.googleapis.com"))
      .map(h => `<link rel="stylesheet" href="${h}">`)
      .join("\n");

    // Make relative image src values absolute so they load in the new window
    const proposalHtml = proposal.outerHTML
      .replace(/ src="(\/[^"]+)"/g, ` src="${window.location.origin}$1"`);

    win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  ${cssLinks}
  <style>
    :root { --font-montserrat: 'Montserrat', sans-serif; --font-cormorant: 'Cormorant Garamond', serif; }
    *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    @page { margin: 0; size: A4 portrait; }
    html, body { margin: 0; padding: 0; background: #F4F0E8; }
  </style>
</head>
<body>
  ${proposalHtml}
  <script>
    document.fonts.ready.then(function() {
      var imgs = Array.from(document.images);
      Promise.all(imgs.map(function(img) {
        return img.complete ? Promise.resolve() : new Promise(function(r) { img.onload = r; img.onerror = r; });
      })).then(function() {
        setTimeout(function() { window.print(); }, 400);
      });
    });
  <\/script>
</body>
</html>`);

    win.document.close();
    setTimeout(() => setGenerating(false), 800);
  };

  const updateExtraTerm = (idx: number, val: string) => {
    const next = [...conditions.extraTerms]; next[idx] = val;
    setConditions({ ...conditions, extraTerms: next });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1F1F1F]/90 flex items-start justify-center overflow-y-auto py-6 px-4">

      {/* Floating action bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 flex items-center gap-2 bg-[#1F1F1F] border border-[#2a2a2a] rounded-full px-4 py-2 shadow-2xl print:hidden">
        <button onClick={() => setEditing(v => !v)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${editing ? "bg-[#E77B00] text-white" : "text-[#888] hover:text-white"}`}>
          {editing ? t.doneEditing : t.editConditions}
        </button>
        <div className="w-px h-4 bg-[#2a2a2a]" />
        <button onClick={downloadPDF} disabled={generating}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E77B00] text-white text-xs font-medium rounded-full hover:bg-[#C96900] disabled:opacity-60 disabled:cursor-wait transition-colors">
          {generating ? (
            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17a9 9 0 0118 0" />
            </svg>
          )}
          {generating ? t.generating : t.print}
        </button>
        <button onClick={onClose} className="px-3 py-1.5 text-[#555] text-xs font-medium rounded-full hover:text-white transition-colors">{t.close}</button>
      </div>

      {/* ── PROPOSAL DOCUMENT ── */}
      <div id="proposal-doc" className="bg-[#F4F0E8] w-full max-w-[800px] mt-14 print:mt-0 shadow-2xl print:shadow-none"
        style={{ fontFamily: "var(--font-montserrat)" }}>

        {/* ── Header ── */}
        <div className="px-12 pt-10 pb-8 flex justify-between items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Combo Studio Paint" width={140} height={90} style={{ objectFit: "contain", objectPosition: "left" }} />
          <div className="text-right mt-1">
            <div className="text-[9px] text-[#5B3A29]/40 uppercase tracking-[0.35em] mb-1.5">Proposal</div>
            <div className="text-[#5B3A29] text-sm font-semibold">{proposalNum}</div>
            <div className="text-[#5B3A29]/50 text-xs mt-1">{today}</div>
          </div>
        </div>

        {/* Orange rule */}
        <div className="mx-12 h-[1.5px] bg-[#E77B00]" />

        {/* ── Proposal Title (Cormorant Garamond) ── */}
        <div className="px-12 pt-7 pb-5">
          <h1 className="text-[42px] leading-none text-[#5B3A29] font-medium"
            style={{ fontFamily: "var(--font-cormorant)" }}>
            {t.proposalTitle}
          </h1>
          <div className="text-[10px] text-[#E77B00] uppercase tracking-[0.35em] mt-2">{t.tagline}</div>
        </div>

        {/* ── Client / Project ── */}
        <div className="mx-12 border-t border-[#D9CBB8] pt-6 pb-6 grid grid-cols-2 gap-12">
          <div>
            <div className="text-[9px] text-[#E77B00] font-semibold uppercase tracking-[0.35em] mb-2.5">{t.preparedFor}</div>
            <div className="text-[#5B3A29] font-semibold text-lg leading-tight">{clientName || "—"}</div>
            <div className="text-[#5B3A29]/50 text-sm mt-1">{city}, Miami-Dade County, FL</div>
          </div>
          <div>
            <div className="text-[9px] text-[#E77B00] font-semibold uppercase tracking-[0.35em] mb-2.5">{t.projectLbl}</div>
            <div className="text-[#5B3A29] font-semibold text-lg leading-tight">{projectName || "—"}</div>
            <div className="text-[#5B3A29]/50 text-sm mt-1">{CITIES[city]?.tier} · ×{CITIES[city]?.multiplier.toFixed(2)}</div>
          </div>
        </div>

        {/* ── Scope of Work ── */}
        <div className="mx-12 border-t border-[#D9CBB8] pt-6 pb-4">
          <h2 className="text-sm text-[#5B3A29] font-semibold uppercase tracking-[0.25em] mb-5"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px", fontWeight: 600, letterSpacing: "0.15em" }}>
            {t.scopeOfWork}
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#D9CBB8]">
                {[t.serviceLbl, t.qtyLbl, t.unitPrice, t.amount].map((h, i) => (
                  <th key={i} className={`text-[9px] text-[#5B3A29]/40 uppercase tracking-[0.3em] pb-3 font-medium ${i === 0 ? "text-left pr-4" : "text-right"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calc.enabledServices.map(({ def, state, subtotal, effectivePrice }) => (
                <tr key={def.id} className="border-b border-[#D9CBB8]/50">
                  <td className="py-3 pr-4">
                    <div className="text-[#5B3A29] font-medium text-sm">{def.name}</div>
                    {def.isSignature && <div className="text-[#E77B00] text-[9px] uppercase tracking-wider mt-0.5">Signature Finish</div>}
                  </td>
                  <td className="py-3 text-right text-[#5B3A29]/60 text-xs tabular-nums whitespace-nowrap">
                    {state.qty.toLocaleString()} {def.unit}
                  </td>
                  <td className="py-3 text-right text-[#5B3A29]/60 text-xs tabular-nums">{fmtD(effectivePrice)}</td>
                  <td className="py-3 text-right text-[#5B3A29] font-semibold text-sm tabular-nums">{fmtD(subtotal)}</td>
                </tr>
              ))}
              {customItems.map(item => (
                <tr key={item.id} className="border-b border-[#D9CBB8]/50">
                  <td className="py-3 pr-4 text-[#5B3A29] font-medium text-sm">{item.name}</td>
                  <td className="py-3 text-right text-[#5B3A29]/60 text-xs tabular-nums">{item.qty} {item.unit}</td>
                  <td className="py-3 text-right text-[#5B3A29]/60 text-xs tabular-nums">{fmtD(item.price)}</td>
                  <td className="py-3 text-right text-[#5B3A29] font-semibold text-sm tabular-nums">{fmtD(item.qty * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Totals ── */}
        <div className="px-12 pb-8 flex justify-end">
          <div className="w-72 bg-white/60 border border-[#D9CBB8] rounded-lg overflow-hidden">
            <div className="px-5 py-4 space-y-2">
              {calc.discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#5B3A29]/60">{t.servicesSubtotal}</span>
                  <span className="text-[#5B3A29] tabular-nums font-medium">{fmtD(calc.rawSubtotal)}</span>
                </div>
              )}
              {calc.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-700">
                  <span>{t.discountLbl} ({controls.discount}%)</span>
                  <span className="tabular-nums">−{fmtD(calc.discountAmount)}</span>
                </div>
              )}
              {calc.overheadAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#5B3A29]/60">{t.overheadLbl} ({controls.overhead}%)</span>
                  <span className="text-[#5B3A29] tabular-nums">+{fmtD(calc.overheadAmount)}</span>
                </div>
              )}
              {calc.profitAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#5B3A29]/60">{t.margin} ({controls.profit}%)</span>
                  <span className="text-[#5B3A29] tabular-nums">+{fmtD(calc.profitAmount)}</span>
                </div>
              )}
              {controls.includeTax && calc.taxAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#5B3A29]/60">{t.taxLbl} ({controls.taxRate}%)</span>
                  <span className="text-[#5B3A29] tabular-nums">+{fmtD(calc.taxAmount)}</span>
                </div>
              )}
            </div>
            <div className="bg-[#E77B00] px-5 py-3.5 flex justify-between items-center">
              <span className="text-white font-bold uppercase tracking-[0.2em] text-xs"
                style={{ fontFamily: "var(--font-montserrat)" }}>{t.total}</span>
              <span className="text-white font-bold text-2xl tabular-nums"
                style={{ fontFamily: "var(--font-cormorant)" }}>{fmtD(calc.total)}</span>
            </div>
            {calc.avgPricePerSqFt && (
              <div className="px-5 py-2 text-right">
                <span className="text-[9px] text-[#5B3A29]/40">{fmtD(calc.avgPricePerSqFt)} / sq ft avg</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Project Conditions ── */}
        <div className="mx-12 border-t border-[#E77B00]/30 pt-6 pb-8">
          <h2 className="text-[#5B3A29] font-semibold mb-5"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {t.projectConditions}
          </h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#E77B00] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[9px] text-[#5B3A29]/40 uppercase tracking-[0.3em] mb-1">{t.validityLbl}</div>
                {editing ? (
                  <input value={conditions.validity} onChange={e => setConditions({ ...conditions, validity: e.target.value })}
                    className="w-full border-b border-[#E77B00]/40 bg-transparent text-sm text-[#5B3A29] outline-none pb-1" />
                ) : (
                  <div className="text-[#5B3A29] text-sm leading-relaxed">{conditions.validity}</div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#E77B00] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[9px] text-[#5B3A29]/40 uppercase tracking-[0.3em] mb-1">{t.paymentTerms}</div>
                {editing ? (
                  <textarea value={conditions.payment} onChange={e => setConditions({ ...conditions, payment: e.target.value })}
                    rows={3} className="w-full border-b border-[#E77B00]/40 bg-transparent text-sm text-[#5B3A29] outline-none pb-1 resize-none" />
                ) : (
                  <div className="text-[#5B3A29] text-sm leading-relaxed">{conditions.payment}</div>
                )}
              </div>
            </div>

            {conditions.extraTerms.map((term, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#D9CBB8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E77B00]/60" />
                </div>
                <div className="flex-1">
                  {editing ? (
                    <div className="flex gap-2 items-start">
                      <textarea value={term} onChange={e => updateExtraTerm(idx, e.target.value)}
                        rows={2} className="flex-1 border-b border-[#E77B00]/40 bg-transparent text-sm text-[#5B3A29] outline-none pb-1 resize-none" />
                      <button onClick={() => setConditions({ ...conditions, extraTerms: conditions.extraTerms.filter((_, i) => i !== idx) })}
                        className="text-red-400 hover:text-red-600 text-xs mt-1 flex-shrink-0">✕</button>
                    </div>
                  ) : (
                    <div className="text-[#5B3A29]/80 text-sm leading-relaxed">{term}</div>
                  )}
                </div>
              </div>
            ))}

            {editing && (
              <button onClick={() => setConditions({ ...conditions, extraTerms: [...conditions.extraTerms, ""] })}
                className="ml-8 text-[#E77B00] text-xs hover:text-[#C96900] transition-colors">
                {t.addCondition}
              </button>
            )}
          </div>
        </div>

        {/* ── Acceptance / Signatures ── */}
        <div className="mx-12 border-t border-[#D9CBB8] pt-6 pb-10">
          <h2 className="text-[#5B3A29] font-semibold mb-7"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {t.acceptance}
          </h2>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <div className="text-[9px] text-[#5B3A29]/40 uppercase tracking-[0.25em] mb-8">{t.authorizedBy} — COMBO STUDIO PAINT</div>
              <div className="border-b border-[#5B3A29]/20 h-9 mb-2" />
              <div className="text-[10px] text-[#5B3A29]/30">{t.dateLbl}: ___________________________</div>
            </div>
            <div>
              <div className="text-[9px] text-[#5B3A29]/40 uppercase tracking-[0.25em] mb-8">{t.clientSignature}</div>
              <div className="border-b border-[#5B3A29]/20 h-9 mb-2" />
              <div className="text-[10px] text-[#5B3A29]/30">{t.dateLbl}: ___________________________</div>
            </div>
          </div>
          <p className="mt-8 text-[10px] text-[#5B3A29]/35 text-center leading-relaxed max-w-lg mx-auto">{t.proposalNote}</p>
        </div>

        {/* ── Footer ── */}
        <div className="border-t-2 border-[#E77B00] bg-[#5B3A29] px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Combo Studio Paint" width={70} height={45} style={{ objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.8 }} />
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-white/70 text-[9px] uppercase tracking-[0.3em]">combostudiopaint.com</div>
              <div className="text-white/40 text-[9px] mt-0.5">Miami-Dade County, Florida</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/70 text-xs">+1 (305) 542-6364</div>
            <div className="text-white/40 text-[9px] mt-0.5">combostudiopaint@gmail.com</div>
          </div>
        </div>

      </div>

    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function CotizadorPage() {
  const [lang,        setLang]        = useState<Lang>("en");
  const [projectName, setProjectName] = useState("Untitled Project");
  const [clientName,  setClientName]  = useState("");
  const [city,        setCity]        = useState("Miami");
  const [activeCategory, setActiveCategory] = useState("Residential");
  const [services,    setServices]    = useState<Record<string, ServiceState>>(() => initServices("Miami"));
  const [controls,    setControls]    = useState<Controls>(DEFAULT_CONTROLS);
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [conditions,  setConditions]  = useState<Conditions>(() => defaultConditions("en"));
  const [template,    setTemplate]    = useState("");
  const [proposal,    setProposal]    = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [search,      setSearch]      = useState("");
  const [saved,       setSaved]       = useState(false);

  const t = T[lang];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConditions(defaultConditions(lang));
  }, [lang]);

  useEffect(() => {
    const mult = CITIES[city]?.multiplier ?? 1;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setServices(prev => {
      const next = { ...prev };
      SERVICES.forEach(def => {
        if (next[def.id].priceOverride === null) {
          next[def.id] = { ...next[def.id], pricePerUnit: parseFloat((def.basePrice * mult).toFixed(2)) };
        }
      });
      return next;
    });
  }, [city]);

  const calc = useMemo(() => calculate(services, controls, customItems), [services, controls, customItems]);

  const applyTemplate = useCallback((key: string) => {
    if (!key) return;
    const tmpl = TEMPLATES[key];
    if (!tmpl) return;
    const mult = CITIES[city]?.multiplier ?? 1;
    setServices(prev => {
      const next = { ...prev };
      SERVICES.forEach(def => { next[def.id] = { ...next[def.id], enabled: false }; });
      tmpl.services.forEach(id => {
        const def = SERVICES.find(d => d.id === id);
        if (!def || !next[id]) return;
        next[id] = { ...next[id], enabled: true, qty: tmpl.defaultQty[id] ?? getDefaultQty(def), pricePerUnit: parseFloat((def.basePrice * mult).toFixed(2)), priceOverride: null };
      });
      return next;
    });
    setTemplate(key);
    setActiveCategory("Residential");
  }, [city]);

  const updateService = useCallback((id: string, patch: Partial<ServiceState>) => {
    setServices(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }, []);

  const patchControls = useCallback((patch: Partial<Controls>) => {
    setControls(prev => ({ ...prev, ...patch }));
  }, []);

  const saveDraft = useCallback(() => {
    localStorage.setItem("combo_est_v2", JSON.stringify({ projectName, clientName, city, services, controls, customItems, conditions, lang }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [projectName, clientName, city, services, controls, customItems, conditions, lang]);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("combo_est_v2") ?? "null");
      if (!d) return;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (d.projectName) setProjectName(d.projectName);
      if (d.clientName)  setClientName(d.clientName);
      if (d.city)        setCity(d.city);
      if (d.services)    setServices(d.services);
      if (d.controls)    setControls(d.controls);
      if (d.customItems) setCustomItems(d.customItems);
      if (d.conditions)  setConditions(d.conditions);
      if (d.lang)        setLang(d.lang);
    } catch { /* ignore */ }
  }, []);

  const visibleServices = useMemo(() =>
    SERVICES.filter(def => def.category === activeCategory && (!search || def.name.toLowerCase().includes(search.toLowerCase())))
  , [activeCategory, search]);

  const suggestions = useMemo(() => {
    const tier = CITIES[city]?.tier ?? "";
    if (tier.includes("Luxury") || tier.includes("Ultra"))
      return SERVICES.filter(d => d.isSignature && !services[d.id]?.enabled).slice(0, 3);
    return [];
  }, [city, services]);

  const cityTier = CITIES[city]?.tier ?? "";

  const catLabel: Record<string, string> = {
    Residential: lang === "es" ? "Residencial" : "Residential",
    Commercial:  lang === "es" ? "Comercial"   : "Commercial",
    Signature:   "Signature",
    Equipment:   lang === "es" ? "Equipamiento": "Equipment",
    Labor:       lang === "es" ? "M. de Obra"  : "Labor",
    Materials:   lang === "es" ? "Materiales"  : "Materials",
  };

  return (
    <div className="min-h-screen bg-[#F4F0E8]" style={{ fontFamily: "var(--font-montserrat)" }}>

      {/* ── Header — Charcoal Black, same as main site ── */}
      <header className="sticky top-0 z-40 bg-[#1F1F1F]/97 border-b border-[#2a2a2a] backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-5 py-2 flex flex-wrap items-center gap-3">

          {/* Logo + brand */}
          <div className="flex items-center gap-3 mr-3">
            <div className="h-9 flex items-center">
              <Image src="/logo.png" alt="Combo Studio Paint" width={60} height={36} className="object-contain object-left" />
            </div>
            <div className="w-px h-6 bg-[#2a2a2a]" />
            <div className="hidden sm:block">
              <div className="text-[9px] text-[#F4F0E8]/30 uppercase tracking-[0.3em]"
                style={{ fontFamily: "var(--font-montserrat)" }}>
                {t.estimator}
              </div>
            </div>
          </div>

          {/* Project / client inputs */}
          <input value={projectName} onChange={e => setProjectName(e.target.value)}
            className="bg-transparent text-[#F4F0E8] text-sm font-medium outline-none border-b border-transparent focus:border-[#E77B00]/40 transition-colors w-40"
            placeholder={t.projectName} />
          <input value={clientName} onChange={e => setClientName(e.target.value)}
            className="bg-transparent text-[#F4F0E8]/40 text-sm outline-none border-b border-transparent focus:border-[#E77B00]/40 focus:text-[#F4F0E8] transition-colors w-36"
            placeholder={t.clientName} />

          <div className="w-px h-5 bg-[#2a2a2a]" />

          {/* City selector */}
          <div className="flex items-center gap-2">
            <label className="text-[9px] text-[#F4F0E8]/25 uppercase tracking-widest">{t.city}</label>
            <select value={city} onChange={e => setCity(e.target.value)}
              className="bg-[#2a2a2a] border border-[#333] text-[#F4F0E8] text-xs rounded px-2 py-1.5 outline-none focus:border-[#E77B00]/40 [&>option]:bg-[#1F1F1F]">
              {Object.keys(CITIES).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="text-[9px] text-[#E77B00] hidden md:block">{cityTier}</span>
          </div>

          {/* Template */}
          <div className="flex items-center gap-2">
            <label className="text-[9px] text-[#F4F0E8]/25 uppercase tracking-widest">{t.template}</label>
            <select value={template} onChange={e => applyTemplate(e.target.value)}
              className="bg-[#2a2a2a] border border-[#333] text-[#F4F0E8] text-xs rounded px-2 py-1.5 outline-none focus:border-[#E77B00]/40 [&>option]:bg-[#1F1F1F]">
              <option value="">—</option>
              {Object.entries(TEMPLATES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>

          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className="px-3 py-1.5 text-[10px] font-bold rounded border border-[#333] text-[#F4F0E8]/40 hover:text-[#E77B00] hover:border-[#E77B00]/30 transition-colors tracking-[0.2em]">
              {t.langToggle}
            </button>
            <button onClick={saveDraft}
              className={`px-3 py-1.5 text-[10px] rounded border transition-colors ${saved ? "border-green-500/40 text-green-400" : "border-[#333] text-[#F4F0E8]/30 hover:text-[#F4F0E8]"}`}>
              {saved ? t.saved : t.save}
            </button>
            <button onClick={() => setShowControls(v => !v)}
              className={`px-3 py-1.5 text-[10px] rounded border transition-colors ${showControls ? "border-[#E77B00]/40 text-[#E77B00]" : "border-[#333] text-[#F4F0E8]/30 hover:text-[#F4F0E8]"}`}>
              {t.controls}
            </button>
            <button onClick={() => setProposal(true)} disabled={calc.activeCount === 0}
              className="px-4 py-1.5 text-[10px] font-semibold rounded bg-[#E77B00] text-white hover:bg-[#C96900] disabled:opacity-30 disabled:cursor-not-allowed transition-colors tracking-[0.1em] uppercase">
              {t.proposal}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex">

        {/* ── Left: Services ── */}
        <main className="flex-1 min-w-0 px-4 py-5">

          {/* Controls panel */}
          {showControls && (
            <div className="mb-5 bg-white border border-[#D9CBB8] rounded-xl p-5 shadow-sm">
              <h2 className="text-[9px] text-[#5B3A29]/40 uppercase tracking-widest mb-4">{t.advancedControls}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Toggle on={controls.includeTax} onChange={v => patchControls({ includeTax: v })} />
                    <span className="text-xs text-[#5B3A29]/60">{t.includeTax}</span>
                  </div>
                  <NumInput value={controls.taxRate} onChange={v => patchControls({ taxRate: v })} prefix="%" step={0.5} className={controls.includeTax ? "" : "opacity-40"} />
                </div>
                {[
                  [t.discountPct,  controls.discount,  (v: number) => patchControls({ discount: Math.min(50, v) })],
                  [t.overheadPct,  controls.overhead,  (v: number) => patchControls({ overhead: v })],
                  [t.profitMargin, controls.profit,    (v: number) => patchControls({ profit: v })],
                ].map(([label, val, fn], i) => (
                  <div key={i}>
                    <label className="block text-[9px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">{label as string}</label>
                    <NumInput value={val as number} onChange={fn as (v: number) => void} step={1} />
                  </div>
                ))}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Toggle on={controls.rushFee} onChange={v => patchControls({ rushFee: v })} />
                    <span className="text-xs text-[#5B3A29]/60">{t.rushFee}</span>
                  </div>
                  <NumInput value={controls.rushRate} onChange={v => patchControls({ rushRate: v })} prefix="%" step={5} className={controls.rushFee ? "" : "opacity-40"} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Toggle on={controls.weekendWork} onChange={v => patchControls({ weekendWork: v })} />
                    <span className="text-xs text-[#5B3A29]/60">{t.weekendWork}</span>
                  </div>
                  <NumInput value={controls.weekendRate} onChange={v => patchControls({ weekendRate: v })} prefix="%" step={5} className={controls.weekendWork ? "" : "opacity-40"} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Toggle on={controls.nightWork} onChange={v => patchControls({ nightWork: v })} />
                    <span className="text-xs text-[#5B3A29]/60">{t.nightWork}</span>
                  </div>
                  <NumInput value={controls.nightRate} onChange={v => patchControls({ nightRate: v })} prefix="%" step={5} className={controls.nightWork ? "" : "opacity-40"} />
                </div>
                <div>
                  <label className="block text-[9px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">{t.occupiedSpace}</label>
                  <NumInput value={controls.occupiedMult} onChange={v => patchControls({ occupiedMult: Math.max(1, v) })} step={0.05} min={1} />
                </div>
                <div>
                  <label className="block text-[9px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">{t.luxuryFinish}</label>
                  <NumInput value={controls.luxuryMult} onChange={v => patchControls({ luxuryMult: Math.max(1, v) })} step={0.05} min={1} />
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button onClick={() => setControls(DEFAULT_CONTROLS)} className="text-[10px] text-[#5B3A29]/35 hover:text-[#5B3A29] transition-colors">{t.resetDefaults}</button>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-4 px-4 py-3 border border-[#E77B00]/20 bg-[#E77B00]/5 rounded-xl">
              <p className="text-[9px] text-[#E77B00] uppercase tracking-widest mb-2">{t.suggestedFor} {city} — {cityTier}</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(def => (
                  <button key={def.id} onClick={() => { updateService(def.id, { enabled: true }); setActiveCategory("Signature"); }}
                    className="text-xs text-[#E77B00] border border-[#E77B00]/30 rounded px-3 py-1 hover:bg-[#E77B00]/10 transition-colors">
                    + {def.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category tabs */}
          <div className="flex flex-wrap gap-1 mb-3">
            {CATEGORIES.map(cat => {
              const count = SERVICES.filter(d => d.category === cat && services[d.id]?.enabled).length;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[10px] rounded-lg transition-all duration-150 flex items-center gap-1.5 uppercase tracking-wider font-medium ${activeCategory === cat ? "text-white shadow-sm" : "bg-white text-[#5B3A29]/40 border border-[#D9CBB8] hover:text-[#5B3A29] hover:border-[#5B3A29]/30"}`}
                  style={activeCategory === cat ? { backgroundColor: CAT_COLOR[cat] } : {}}>
                  {catLabel[cat]}
                  {count > 0 && (
                    <span className={`text-[9px] font-bold rounded px-1 ${activeCategory === cat ? "bg-white/25" : "bg-[#E77B00]/12 text-[#E77B00]"}`}>{count}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="mb-3 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#D9CBB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={`${t.searchPlaceholder} ${catLabel[activeCategory]} ${t.searchSuffix}`}
              className="w-full bg-white border border-[#D9CBB8] rounded-lg pl-8 pr-3 py-2 text-xs text-[#5B3A29] placeholder-[#D9CBB8] outline-none focus:border-[#E77B00]/50 shadow-sm" />
          </div>

          {/* Service cards */}
          <div className="space-y-1.5">
            {visibleServices.length === 0 && <p className="text-center text-[#D9CBB8] text-sm py-12">{t.noServices}</p>}
            {visibleServices.map(def => (
              <ServiceCard key={def.id} def={def} state={services[def.id]} cityName={city} onUpdate={updateService} t={t} />
            ))}
          </div>

          {/* Custom items */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[9px] text-[#5B3A29]/30 uppercase tracking-widest">{t.customItems}</h3>
              <button onClick={() => setCustomItems(prev => [...prev, { id: `c_${Date.now()}`, name: "Custom Service", category: "Custom", unit: "each", qty: 1, price: 0, taxable: true, notes: "" }])}
                className="text-xs text-[#E77B00] hover:text-[#C96900] transition-colors">{t.addCustom}</button>
            </div>
            {customItems.length === 0 ? (
              <div className="border border-dashed border-[#D9CBB8] rounded-lg py-8 text-center">
                <p className="text-[#D9CBB8] text-xs">{t.noCustom}</p>
              </div>
            ) : customItems.map((item, idx) => (
              <div key={item.id} className="flex gap-2 items-center bg-white border border-[#D9CBB8] rounded-lg px-4 py-3 mb-2 shadow-sm">
                <input value={item.name} onChange={e => setCustomItems(p => p.map((c, i) => i === idx ? { ...c, name: e.target.value } : c))}
                  className="flex-1 bg-transparent text-sm text-[#5B3A29] outline-none" />
                <input value={item.unit} onChange={e => setCustomItems(p => p.map((c, i) => i === idx ? { ...c, unit: e.target.value } : c))}
                  className="w-14 bg-[#F4F0E8] border border-[#D9CBB8] rounded px-2 py-1 text-xs text-[#5B3A29] outline-none" />
                <NumInput value={item.qty} onChange={v => setCustomItems(p => p.map((c, i) => i === idx ? { ...c, qty: v } : c))} className="w-16" />
                <NumInput value={item.price} onChange={v => setCustomItems(p => p.map((c, i) => i === idx ? { ...c, price: v } : c))} prefix="$" step={0.01} className="w-24" />
                <span className="text-[#E77B00] text-sm font-semibold tabular-nums w-20 text-right">{fmt(item.qty * item.price)}</span>
                <button onClick={() => setCustomItems(p => p.filter((_, i) => i !== idx))} className="text-[#D9CBB8] hover:text-red-400 transition-colors ml-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
          <div className="h-20" />
        </main>

        {/* ── Right: Live Summary — Espresso Brown sidebar ── */}
        <aside className="w-72 xl:w-80 flex-shrink-0 sticky top-[49px] h-[calc(100vh-49px)] overflow-y-auto border-l border-[#4a3022] bg-[#5B3A29]">
          <div className="p-5">

            {/* Mini logo */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#4a3022]">
              <Image src="/logo.png" alt="CSP" width={44} height={28} className="object-contain object-left brightness-0 invert opacity-50" />
              <span className="text-[9px] text-[#F4F0E8]/25 uppercase tracking-[0.3em]">{t.confidential}</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-[9px] text-[#F4F0E8]/30 uppercase tracking-widest mb-3">{t.summary}</div>
                <div className="space-y-1.5">
                  {[
                    [t.location, city],
                    [t.tier, cityTier, "text-[#E77B00]"],
                    [t.multiplier, `×${CITIES[city]?.multiplier.toFixed(2)}`],
                    [t.activeServices, calc.activeCount, calc.activeCount > 0 ? "text-[#E77B00] font-semibold" : "text-[#F4F0E8]/20"],
                    ...(calc.totalSqFt > 0 ? [[t.totalSqFt, calc.totalSqFt.toLocaleString()]] : []),
                    ...(calc.avgPricePerSqFt ? [[t.avgPerSqFt, fmtD(calc.avgPricePerSqFt)]] : []),
                  ].map(([label, val, cls], i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-[#F4F0E8]/40">{label}</span>
                      <span className={`text-[#F4F0E8] tabular-nums ${cls ?? ""}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {Object.entries(calc.byCategory).filter(([, v]) => v > 0).length > 0 && (
                <div className="border-t border-[#4a3022] pt-4">
                  <div className="text-[9px] text-[#F4F0E8]/30 uppercase tracking-widest mb-3">{t.byCategory}</div>
                  <div className="space-y-2">
                    {CATEGORIES.map(cat => {
                      const val = calc.byCategory[cat] ?? 0;
                      if (!val) return null;
                      const pct = calc.rawSubtotal > 0 ? (val / calc.rawSubtotal) * 100 : 0;
                      return (
                        <div key={cat}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CAT_COLOR[cat] }} />
                              <span className="text-[10px] text-[#F4F0E8]/50">{catLabel[cat]}</span>
                            </div>
                            <span className="text-[10px] text-[#F4F0E8] tabular-nums font-medium">{fmt(val)}</span>
                          </div>
                          <div className="h-px bg-[#4a3022] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: CAT_COLOR[cat] }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="border-t border-[#4a3022] pt-4 space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-[#F4F0E8]/40">{t.servicesSubtotal}</span><span className="text-[#F4F0E8] tabular-nums">{fmt(calc.rawSubtotal)}</span></div>
                {calc.discountAmount > 0 && <div className="flex justify-between"><span className="text-[#F4F0E8]/40">{t.discountLbl} ({controls.discount}%)</span><span className="text-green-300 tabular-nums">−{fmt(calc.discountAmount)}</span></div>}
                {calc.overheadAmount > 0 && <div className="flex justify-between"><span className="text-[#F4F0E8]/40">{t.overheadLbl}</span><span className="text-[#F4F0E8] tabular-nums">+{fmt(calc.overheadAmount)}</span></div>}
                {calc.profitAmount > 0  && <div className="flex justify-between"><span className="text-[#F4F0E8]/40">{t.profitLbl}</span><span className="text-[#F4F0E8] tabular-nums">+{fmt(calc.profitAmount)}</span></div>}
                {controls.includeTax && calc.taxAmount > 0 && <div className="flex justify-between"><span className="text-[#F4F0E8]/40">{t.taxLbl}</span><span className="text-[#F4F0E8] tabular-nums">+{fmt(calc.taxAmount)}</span></div>}
              </div>

              {/* Total */}
              <div className="border border-[#E77B00]/25 rounded-lg overflow-hidden">
                <div className="px-4 py-3 flex justify-between items-center bg-[#4a3022]">
                  <div>
                    <div className="text-[9px] text-[#F4F0E8]/30 uppercase tracking-widest">{t.total}</div>
                    {calc.avgPricePerSqFt && <div className="text-[9px] text-[#F4F0E8]/20 mt-0.5">{fmtD(calc.avgPricePerSqFt)} / sq ft</div>}
                  </div>
                  <div className={`font-bold tabular-nums transition-all ${calc.total > 0 ? "text-[#E77B00] text-2xl" : "text-[#F4F0E8]/20 text-lg"}`}
                    style={{ fontFamily: "var(--font-cormorant)" }}>
                    {fmt(calc.total)}
                  </div>
                </div>
              </div>

              {calc.activeCount === 0 ? (
                <p className="text-center text-[#F4F0E8]/20 text-xs py-3">{t.toggleHint}</p>
              ) : (
                <button onClick={() => setProposal(true)}
                  className="w-full bg-[#E77B00] hover:bg-[#C96900] text-white text-[10px] font-semibold py-3 rounded-lg transition-colors tracking-[0.15em] uppercase">
                  {t.generateProposal}
                </button>
              )}

              {calc.enabledServices.length > 0 && (
                <div className="border-t border-[#4a3022] pt-4">
                  <div className="text-[9px] text-[#F4F0E8]/25 uppercase tracking-widest mb-2">{t.includedServices}</div>
                  <div className="space-y-1">
                    {calc.enabledServices.map(({ def, subtotal }) => (
                      <div key={def.id} className="flex justify-between items-center py-0.5">
                        <span className="text-[11px] text-[#F4F0E8]/50 truncate flex-1 mr-2">{def.name}</span>
                        <span className="text-[11px] text-[#D9CBB8]/60 tabular-nums flex-shrink-0">{fmt(subtotal)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Proposal modal */}
      {proposal && (
        <ProposalView
          projectName={projectName} clientName={clientName} city={city}
          calc={calc} controls={controls} customItems={customItems}
          conditions={conditions} setConditions={setConditions}
          onClose={() => setProposal(false)} t={t}
        />
      )}
    </div>
  );
}
