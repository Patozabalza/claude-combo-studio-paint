"use client";

import { useState, useRef, useCallback } from "react";
import {
  CAMPAIGNS, SLIDE_FIELDS, ALL_PINTOR, ALL_PROJECTS,
  ThemeKey, Theme, Slide, SlideTexts, SlideType,
} from "@/lib/social-data";

type Lang = "en" | "es";

const UI = {
  en: {
    title:         "Social Media Generator",
    downloadAll:   "Download All 5",
    formatNote:    "Stories / TikTok · 1080 × 1920 px · 9:16 · JPG",
    editSlide:     "Edit Slide",
    layout:        "Layout",
    photos:        "Photos",
    mainPhoto:     "Main Photo",
    secondPhoto:   "Second Photo (After)",
    download:      "Download this slide",
    clickEdit:     "Click a slide to edit",
    change:        "Change →",
    picker:        "Select Photo",
    pintor:        "Painters — 36 photos",
    projects:      "Projects — 9 photos",
    myPhotos:      "My Uploaded Photos",
    upload:        "+ Upload from device",
    newProposal:   "New Proposal",
    proposal:      "Proposal",
    tabLibrary:    "Library",
    tabWeb:        "Web",
    tabMine:       "Mine",
    searchPh:      "Search (e.g. interior, luxury room…)",
    searchBtn:     "Search",
    pasteUrlLabel: "Or paste any image URL",
    pasteUrlPh:    "https://...",
    addUrl:        "Add",
    noPhotos:      "No photos yet — upload one above",
    presetQueries: ["interior painting", "house exterior", "venetian plaster", "luxury room"],
    modeCarousel:  "Carousel",
    modeAds:       "Ads",
    adTitle:       "Ad Builder",
    adPhoto:       "Ad Photo",
    adTagline:     "Tagline",
    adH1:          "Headline 1 — white",
    adH2:          "Headline 2 — orange",
    adSubtitle:    "Subtitle",
    adBody:        "Description",
    adF1:          "Feature 1",
    adF2:          "Feature 2",
    adF3:          "Feature 3",
    downloadAd:    "Download Ad",
  },
  es: {
    title:         "Generador de Contenido",
    downloadAll:   "Descargar 5 slides",
    formatNote:    "Historias / TikTok · 1080 × 1920 px · 9:16 · JPG",
    editSlide:     "Editar Slide",
    layout:        "Diseño",
    photos:        "Fotos",
    mainPhoto:     "Foto Principal",
    secondPhoto:   "Segunda Foto (Después)",
    download:      "Descargar este slide",
    clickEdit:     "Haz clic en un slide para editar",
    change:        "Cambiar →",
    picker:        "Seleccionar Foto",
    pintor:        "Pintores — 36 fotos",
    projects:      "Proyectos — 9 fotos",
    myPhotos:      "Mis Fotos Subidas",
    upload:        "+ Subir desde dispositivo",
    newProposal:   "Nueva Propuesta",
    proposal:      "Propuesta",
    tabLibrary:    "Librería",
    tabWeb:        "Web",
    tabMine:       "Mis Fotos",
    searchPh:      "Buscar (ej. interior, cuarto de lujo…)",
    searchBtn:     "Buscar",
    pasteUrlLabel: "O pega cualquier URL de imagen",
    pasteUrlPh:    "https://...",
    addUrl:        "Agregar",
    noPhotos:      "Sin fotos aún — subí una arriba",
    presetQueries: ["pintura interior", "casa exterior", "estuco veneciano", "cuarto de lujo"],
    modeCarousel:  "Carrusel",
    modeAds:       "Anuncios",
    adTitle:       "Crear Anuncio",
    adPhoto:       "Foto del Anuncio",
    adTagline:     "Slogan",
    adH1:          "Título 1 — blanco",
    adH2:          "Título 2 — naranja",
    adSubtitle:    "Subtítulo",
    adBody:        "Descripción",
    adF1:          "Servicio 1",
    adF2:          "Servicio 2",
    adF3:          "Servicio 3",
    downloadAd:    "Descargar Anuncio",
  },
};

// ─── Brand tokens ──────────────────────────────────────────────────────────
const B = {
  ivory:     "#F4F0E8",
  espresso:  "#5B3A29",
  orange:    "#E77B00",
  charcoal:  "#1F1F1F",
  sand:      "#D9CBB8",
};
const FD = "'Cormorant Garamond', serif";
const FB = "'Montserrat', sans-serif";

// ─── Slide sub-components (inline styles only — captured by html2canvas) ──

// BgImg uses background-image on a div instead of <img objectFit="cover">
// html2canvas does not respect object-fit on img tags, causing photo distortion on download.
// background-size: cover on a div is correctly handled by html2canvas.
function BgImg({ src, style }: { src: string; style: React.CSSProperties }) {
  const { objectFit, ...rest } = style as React.CSSProperties & { objectFit?: string };
  return (
    <div
      data-photo-src={src}
      style={{
        ...rest,
        backgroundImage: `url(${JSON.stringify(src)})`,
        backgroundSize: objectFit === "contain" ? "contain" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

function Logo({ h = 36, op = 0.9, inv = true }: { h?: number; op?: number; inv?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.png" alt="Combo Studio Paint"
    style={{ height: h, objectFit: "contain", opacity: op, filter: inv ? "brightness(0) invert(1)" : "none" }} />;
}

function OrangeLine({ w = 40 }: { w?: number }) {
  return <div style={{ width: w, height: 2, backgroundColor: B.orange }} />;
}

function Tag({ text }: { text: string }) {
  return <div style={{ color: B.orange, fontSize: 11, fontFamily: FB, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const }}>{text}</div>;
}

// Hero: full-bleed photo + gradient + headline at bottom
function HeroSlide({ s }: { s: Slide }) {
  return (
    <div style={{ position: "relative", width: 360, height: 640, overflow: "hidden", backgroundColor: B.charcoal }}>
      <BgImg src={s.photo} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,.05) 35%,rgba(0,0,0,.5) 60%,rgba(0,0,0,.88) 100%)" }} />

      {/* Logo top center */}
      <div style={{ position: "absolute", top: 32, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Logo h={57} />
      </div>

      {/* Content bottom */}
      <div style={{ position: "absolute", bottom: 56, left: 32, right: 32 }}>
        {s.texts.tag && <><OrangeLine /><div style={{ marginTop: 10, marginBottom: 14 }}><Tag text={s.texts.tag} /></div></>}
        <h1 style={{ fontFamily: FD, fontSize: 54, fontWeight: 500, color: "#fff", lineHeight: 1.02, letterSpacing: "-0.02em", margin: 0, whiteSpace: "pre-line" }}>
          {s.texts.headline}
        </h1>
        {s.texts.subheadline && (
          <p style={{ fontFamily: FB, fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 14, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 500, margin: "14px 0 0" }}>
            {s.texts.subheadline}
          </p>
        )}
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, backgroundColor: B.orange }} />
    </div>
  );
}

// Feature: photo top 55%, dark text panel bottom 45%
function FeatureSlide({ s }: { s: Slide }) {
  return (
    <div style={{ position: "relative", width: 360, height: 640, overflow: "hidden", backgroundColor: B.charcoal }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 352, overflow: "hidden" }}>
        <BgImg src={s.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(transparent,${B.charcoal})` }} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 320, backgroundColor: B.charcoal, padding: "24px 32px 60px", overflow: "hidden" }}>
        {s.texts.tag && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 20, height: 1.5, backgroundColor: B.orange }} />
            <Tag text={s.texts.tag} />
          </div>
        )}
        <h2 style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 16px", whiteSpace: "pre-line" }}>
          {s.texts.headline}
        </h2>
        {s.texts.body && (
          <p style={{ fontFamily: FB, fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.65, margin: 0 }}>
            {s.texts.body}
          </p>
        )}
        <div style={{ position: "absolute", bottom: 24, right: 28 }}>
          <Logo h={33} op={0.2} />
        </div>
      </div>
    </div>
  );
}

// List: photo top 40%, bullets bottom 60%
function ListSlide({ s }: { s: Slide }) {
  const bullets = [s.texts.bullet1, s.texts.bullet2, s.texts.bullet3].filter(Boolean) as string[];
  return (
    <div style={{ position: "relative", width: 360, height: 640, overflow: "hidden", backgroundColor: B.charcoal }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 256, overflow: "hidden" }}>
        <BgImg src={s.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 64, background: `linear-gradient(transparent,${B.charcoal})` }} />
      </div>
      <div style={{ position: "absolute", top: 256, left: 32, right: 32, bottom: 0, paddingTop: 24, paddingBottom: 52, overflow: "hidden" }}>
        {s.texts.tag && <div style={{ marginBottom: 10 }}><Tag text={s.texts.tag} /></div>}
        <h2 style={{ fontFamily: FD, fontSize: 36, fontWeight: 500, color: "#fff", lineHeight: 1.05, margin: "0 0 20px", whiteSpace: "pre-line" }}>
          {s.texts.headline}
        </h2>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: B.orange, marginTop: 5, flexShrink: 0 }} />
              <span style={{ fontFamily: FB, fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 24, left: 32, right: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: 40, height: 1.5, backgroundColor: `${B.orange}66` }} />
        <Logo h={30} op={0.2} />
      </div>
    </div>
  );
}

// Stat: dark bg, 3 large stats
// Two independent zones: headline (top half) + stats (pinned lower half) — never overlap.
function StatSlide({ s }: { s: Slide }) {
  const stats = [
    { v: s.texts.stat1, l: s.texts.stat1Label },
    { v: s.texts.stat2, l: s.texts.stat2Label },
    { v: s.texts.stat3, l: s.texts.stat3Label },
  ].filter(st => st.v);
  return (
    <div style={{ position: "relative", width: 360, height: 640, overflow: "hidden", backgroundColor: B.charcoal }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 80% 15%, ${B.orange}20 0%, transparent 55%)` }} />

      {/* Logo fixed at top */}
      <div style={{ position: "absolute", top: 36, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Logo h={52} op={0.55} />
      </div>

      {/* Headline zone — top:100 to bottom:300 (y=340) — centers text of any length */}
      <div style={{ position: "absolute", top: 100, left: 32, right: 32, bottom: 300, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <OrangeLine w={48} />
        {s.texts.tag && <div style={{ marginTop: 10 }}><Tag text={s.texts.tag} /></div>}
        <h2 style={{ fontFamily: FD, fontSize: 44, fontWeight: 500, color: "#fff", lineHeight: 1.05, margin: "14px 0 0", textAlign: "center" as const, whiteSpace: "pre-line" }}>
          {s.texts.headline}
        </h2>
      </div>

      {/* Stats zone — pinned 180px above footer — always in the lower third */}
      {stats.length > 0 && (
        <div style={{ position: "absolute", left: 24, right: 24, bottom: 76, height: 120, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          {stats.map((st, i) => (
            <div key={i} style={{ textAlign: "center" as const, flex: 1 }}>
              <div style={{ fontFamily: FD, fontSize: 56, fontWeight: 500, color: B.orange, lineHeight: 1, letterSpacing: "-0.02em" }}>{st.v}</div>
              <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginTop: 6 }}>{st.l}</div>
            </div>
          ))}
        </div>
      )}

      {/* Thin separator between zones */}
      <div style={{ position: "absolute", left: 40, right: 40, bottom: 200, height: 1, backgroundColor: `${B.orange}30` }} />

      {/* Footer tagline */}
      <div style={{ position: "absolute", bottom: 30, left: 0, right: 0, textAlign: "center" as const }}>
        <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,.18)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>
          Premium Finishes · Exceptional Spaces
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, backgroundColor: B.orange }} />
    </div>
  );
}

// CTA: ivory bg, logo centered, contact info
function CTASlide({ s }: { s: Slide }) {
  return (
    <div style={{ position: "relative", width: 360, height: 640, overflow: "hidden", backgroundColor: B.ivory }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, backgroundColor: B.orange }} />
      {/* Faint photo bg */}
      <div style={{ position: "absolute", top: 4, left: 0, right: 0, height: 300, overflow: "hidden" }}>
        <BgImg src={s.photo} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }} />
      </div>
      {/* Content centered */}
      <div style={{ position: "absolute", inset: "4px 0 44px 0", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", padding: "0 44px" }}>
        <Logo h={90} op={1} inv={false} />
        <div style={{ width: 48, height: 2, backgroundColor: B.orange, margin: "22px 0" }} />
        <h2 style={{ fontFamily: FD, fontSize: 42, fontWeight: 500, color: B.espresso, lineHeight: 1.05, margin: "0 0 12px", textAlign: "center" as const, whiteSpace: "pre-line" }}>
          {s.texts.headline}
        </h2>
        {s.texts.subheadline && (
          <p style={{ fontFamily: FB, fontSize: 13, color: `${B.espresso}88`, margin: "0 0 28px", textAlign: "center" as const, lineHeight: 1.6, letterSpacing: "0.04em" }}>
            {s.texts.subheadline}
          </p>
        )}
        {s.texts.cta && (
          <div style={{ backgroundColor: B.orange, color: "#fff", fontFamily: FB, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "14px 20px", borderRadius: 2, marginBottom: 24, width: "100%", textAlign: "center" as const }}>
            {s.texts.cta}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 5 }}>
          {s.texts.phone && <div style={{ fontFamily: FB, fontSize: 14, fontWeight: 600, color: B.espresso, letterSpacing: "0.02em" }}>{s.texts.phone}</div>}
          {s.texts.web   && <div style={{ fontFamily: FB, fontSize: 16, color: B.espresso, letterSpacing: "0.05em", fontWeight: 500 }}>{s.texts.web}</div>}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 44, backgroundColor: B.espresso, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: "0.3em", textTransform: "uppercase" as const }}>
          COMBO STUDIO PAINT · Miami-Dade
        </div>
      </div>
    </div>
  );
}

// Split: before/after side-by-side
function SplitSlide({ s }: { s: Slide }) {
  return (
    <div style={{ position: "relative", width: 360, height: 640, overflow: "hidden", backgroundColor: B.charcoal }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 96, backgroundColor: B.charcoal, display: "flex", flexDirection: "column" as const, justifyContent: "center", padding: "0 28px" }}>
        {s.texts.tag && <div style={{ marginBottom: 6 }}><Tag text={s.texts.tag} /></div>}
        <h2 style={{ fontFamily: FD, fontSize: 30, fontWeight: 500, color: "#fff", lineHeight: 1.05, margin: 0, whiteSpace: "pre-line" }}>
          {s.texts.headline}
        </h2>
      </div>
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, height: 2, backgroundColor: B.orange }} />
      {/* Split photos */}
      <div style={{ position: "absolute", top: 98, left: 0, right: 0, bottom: 96, display: "flex" }}>
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <BgImg src={s.photo} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(50%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,.28)" }} />
          <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(0,0,0,.65)", color: "#fff", fontSize: 10, fontFamily: FB, fontWeight: 700, letterSpacing: "0.2em", padding: "5px 10px", borderRadius: 2, whiteSpace: "nowrap" as const }}>
            {s.texts.labelLeft || "BEFORE"}
          </div>
        </div>
        <div style={{ width: 2, backgroundColor: "#fff", flexShrink: 0 }} />
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <BgImg src={s.photoAlt || s.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", backgroundColor: B.orange, color: "#fff", fontSize: 10, fontFamily: FB, fontWeight: 700, letterSpacing: "0.2em", padding: "5px 10px", borderRadius: 2, whiteSpace: "nowrap" as const }}>
            {s.texts.labelRight || "AFTER"}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 96, backgroundColor: B.charcoal, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px" }}>
        <Logo h={45} op={0.45} />
        <div style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,.25)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>
          combostudiopaint.com
        </div>
      </div>
    </div>
  );
}

// ─── Paid Ad (Instagram / TikTok) ──────────────────────────────────────────
interface AdData {
  photo:     string;
  tagline:   string;
  headline1: string;
  headline2: string;
  subtitle:  string;
  body:      string;
  feature1:  string;
  feature2:  string;
  feature3:  string;
  phone:     string;
  web:       string;
}

const AD_DEFAULTS: Record<Lang, AdData> = {
  en: {
    photo:     "/images/pintor/20.png",
    tagline:   "LUXURY FINISHES. TIMELESS BEAUTY.",
    headline1: "ELEVATE",
    headline2: "YOUR HOME",
    subtitle:  "MIAMI'S PREMIER PAINTING STUDIO",
    body:      "Expert craftsmanship and luxury finishes for Miami-Dade's finest homes.",
    feature1:  "RESIDENTIAL & COMMERCIAL",
    feature2:  "VENETIAN PLASTER & TEXTURES",
    feature3:  "FREE ESTIMATES",
    phone:     "+1 305 542 6364",
    web:       "COMBOSTUDIOPAINT.COM",
  },
  es: {
    photo:     "/images/pintor/20.png",
    tagline:   "ACABADOS DE LUJO. BELLEZA ATEMPORAL.",
    headline1: "ELEVA",
    headline2: "TU HOGAR",
    subtitle:  "EL ESTUDIO DE PINTURA PREMIER DE MIAMI",
    body:      "Artesanía experta y acabados de lujo para los mejores hogares de Miami-Dade.",
    feature1:  "RESIDENCIAL Y COMERCIAL",
    feature2:  "ESTUCO VENECIANO Y TEXTURAS",
    feature3:  "ESTIMADOS GRATIS",
    phone:     "+1 305 542 6364",
    web:       "COMBOSTUDIOPAINT.COM",
  },
};


// ─── Ad Slide v5 — "Luxury Gallery" fixed proportions ────────────────────────
// Root cause of clipping: multi-word headline2 wraps at 56px (>316px wide).
// Fix: 46px + white-space:nowrap. Features moved to footer zone.
// Zones: header(66) | sep(2) | photo(354px=55%) | fade | text(106px) | sep | footer(110px)
function AdSlide({ ad }: { ad: AdData }) {
  const WA1 = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z";
  const WA2 = "M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.526 5.845L.057 23.737a.5.5 0 00.614.686l6.04-1.428A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.497-5.21-1.364l-.37-.213-3.844.909.9-3.738-.227-.38A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z";

  return (
    <div style={{ position: "relative", width: 360, height: 640, overflow: "hidden", backgroundColor: "#0a0806" }}>

      {/* ── HEADER (y 0–64) — logo + tagline only, no corner badge ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 64, backgroundColor: "#0a0806", zIndex: 2 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: B.orange }} />
        <div style={{ position: "absolute", inset: "3px 0 0 0", display: "flex", alignItems: "center", padding: "0 22px", gap: 14 }}>
          <Logo h={36} op={0.95} inv={true} />
          <div style={{ width: 1, height: 24, backgroundColor: "rgba(255,255,255,.1)", flexShrink: 0 }} />
          {ad.tagline && (
            <div style={{ fontFamily: FB, fontSize: 6.5, color: B.orange, letterSpacing: "0.14em", textTransform: "uppercase" as const, fontWeight: 700, lineHeight: 1.5 }}>
              {ad.tagline}
            </div>
          )}
        </div>
      </div>

      {/* ── ORANGE SEP ── */}
      <div style={{ position: "absolute", top: 64, left: 0, right: 0, height: 2, backgroundColor: B.orange, zIndex: 2 }} />

      {/* ── PHOTO (y 66–412, 54% of 640) ── */}
      <BgImg src={ad.photo} style={{ position: "absolute", top: 66, left: 0, width: "100%", height: 346, objectFit: "cover" }} />
      {/* Bottom fade into dark text zone */}
      <div style={{ position: "absolute", top: 368, left: 0, right: 0, height: 60, background: "linear-gradient(transparent, #0a0806)", zIndex: 1 }} />

      {/* ── TEXT ZONE (y 412–528, 116px) — 46px + nowrap fits any 2-word phrase ── */}
      <div style={{ position: "absolute", top: 412, left: 22, right: 22, zIndex: 2 }}>
        {ad.headline1 && (
          <div style={{ fontFamily: FD, fontSize: 46, fontWeight: 600, color: "#fff", lineHeight: 0.88, letterSpacing: "-0.02em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>
            {ad.headline1}
          </div>
        )}
        {ad.headline2 && (
          <div style={{ fontFamily: FD, fontSize: 46, fontWeight: 600, color: B.orange, lineHeight: 0.88, letterSpacing: "-0.02em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const, marginTop: 4 }}>
            {ad.headline2}
          </div>
        )}
        {ad.subtitle && (
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 12 }}>
            <div style={{ width: 18, height: 1.5, backgroundColor: B.orange, flexShrink: 0 }} />
            <div style={{ fontFamily: FB, fontSize: 7.5, fontWeight: 700, color: "rgba(255,255,255,.78)", letterSpacing: "0.28em", textTransform: "uppercase" as const }}>
              {ad.subtitle}
            </div>
          </div>
        )}
      </div>

      {/* ── ORANGE SEP ── */}
      <div style={{ position: "absolute", bottom: 96, left: 0, right: 0, height: 1, backgroundColor: `${B.orange}45`, zIndex: 2 }} />

      {/* ── FOOTER (96px) — 2-column elegant contact ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 96, backgroundColor: "#0a0806", display: "flex", alignItems: "center", padding: "0 24px", zIndex: 2 }}>

        {/* LEFT: WhatsApp + phone */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path fill={B.orange} d={WA1} />
            <path fill={B.orange} d={WA2} />
          </svg>
          <div>
            <div style={{ fontFamily: FB, fontSize: 19, fontWeight: 700, color: "#fff", letterSpacing: "0.03em", lineHeight: 1 }}>{ad.phone}</div>
            <div style={{ fontFamily: FB, fontSize: 7, color: B.orange, letterSpacing: "0.22em", textTransform: "uppercase" as const, marginTop: 5 }}>CONTACT US ON WHATSAPP</div>
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, height: 48, backgroundColor: `${B.orange}45`, flexShrink: 0, margin: "0 20px" }} />

        {/* RIGHT: Globe + website */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={B.orange} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
          </svg>
          <div style={{ fontFamily: FB, fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,.85)", letterSpacing: "0.12em" }}>{ad.web}</div>
        </div>
      </div>
    </div>
  );
}

function SlideRenderer({ slide }: { slide: Slide }) {
  switch (slide.type) {
    case "hero":    return <HeroSlide    s={slide} />;
    case "feature": return <FeatureSlide s={slide} />;
    case "list":    return <ListSlide    s={slide} />;
    case "stat":    return <StatSlide    s={slide} />;
    case "cta":     return <CTASlide     s={slide} />;
    case "split":   return <SplitSlide   s={slide} />;
    default:        return null;
  }
}

// ─── Photo Picker modal ────────────────────────────────────────────────────
type PickerTab = "library" | "web" | "mine";

function PhotoPicker({ current, onPick, onClose, onUpload, uploadedPhotos, u }: {
  current: string;
  onPick: (photo: string) => void;
  onClose: () => void;
  onUpload: (url: string) => void;
  uploadedPhotos: string[];
  u: typeof UI["en"];
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab,        setTab]        = useState<PickerTab>("library");
  const [query,      setQuery]      = useState(u.presetQueries[0]);
  const [searchTerm, setSearchTerm] = useState(u.presetQueries[0]);
  const [sigSeed,    setSigSeed]    = useState(0);
  const [pasteUrl,   setPasteUrl]   = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpload(url);
    onPick(url);
    onClose();
    e.target.value = "";
  };

  const handleSearch = () => {
    setSearchTerm(query);
    setSigSeed(s => s + 20);
  };

  const handlePreset = (q: string) => {
    setQuery(q);
    setSearchTerm(q);
    setSigSeed(s => s + 20);
  };

  const handleAddUrl = () => {
    const url = pasteUrl.trim();
    if (!url) return;
    onUpload(url);
    onPick(url);
    onClose();
    setPasteUrl("");
  };

  // 12 deterministic Unsplash Source URLs per query — sig keeps them stable within a session
  const webPhotos = Array.from({ length: 12 }, (_, i) =>
    `https://source.unsplash.com/720x1280/?${encodeURIComponent(searchTerm)}&sig=${sigSeed + i}`
  );

  function PhotoThumb({ photo, square = false }: { photo: string; square?: boolean }) {
    return (
      <button onClick={() => { onPick(photo); onClose(); }}
        className={`overflow-hidden rounded transition-all ${square ? "aspect-square" : "aspect-[9/16]"} ${current === photo ? "ring-2 ring-[#E77B00]" : "hover:ring-1 hover:ring-[#E77B00]/50"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="w-full h-full object-cover" loading="lazy" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1F1F1F] rounded-2xl p-5 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex justify-between items-center mb-3 flex-shrink-0">
          <span className="text-[#F4F0E8]/50 text-[10px] uppercase tracking-widest">{u.picker}</span>
          <button onClick={onClose} className="text-[#F4F0E8]/30 hover:text-[#F4F0E8] text-lg leading-none">✕</button>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1.5 mb-4 flex-shrink-0">
          {(["library", "web", "mine"] as PickerTab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded transition-colors ${tab === t ? "bg-[#E77B00] text-white" : "bg-[#2a2a2a] text-[#F4F0E8]/40 hover:text-[#F4F0E8]/70"}`}>
              {t === "library" ? u.tabLibrary : t === "web" ? u.tabWeb : u.tabMine}
            </button>
          ))}
        </div>

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 min-h-0">

          {/* ── Library tab ── */}
          {tab === "library" && (
            <>
              <div className="text-[#F4F0E8]/30 text-[9px] uppercase tracking-widest mb-2">{u.pintor}</div>
              <div className="grid grid-cols-6 gap-1.5 mb-4">
                {ALL_PINTOR.map(photo => <PhotoThumb key={photo} photo={photo} />)}
              </div>
              <div className="text-[#F4F0E8]/30 text-[9px] uppercase tracking-widest mb-2">{u.projects}</div>
              <div className="grid grid-cols-6 gap-1.5">
                {ALL_PROJECTS.map(photo => <PhotoThumb key={photo} photo={photo} square />)}
              </div>
            </>
          )}

          {/* ── Web tab ── */}
          {tab === "web" && (
            <>
              {/* Search bar */}
              <div className="flex gap-2 mb-3">
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  placeholder={u.searchPh}
                  className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/20 outline-none focus:border-[#E77B00]/60"
                />
                <button onClick={handleSearch}
                  className="px-4 py-2 bg-[#E77B00] hover:bg-[#C96900] text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap">
                  {u.searchBtn}
                </button>
              </div>

              {/* Preset keyword chips */}
              <div className="flex gap-1.5 flex-wrap mb-4">
                {u.presetQueries.map(q => (
                  <button key={q} onClick={() => handlePreset(q)}
                    className={`px-2.5 py-1 text-[9px] uppercase tracking-wider rounded transition-colors ${searchTerm === q ? "bg-[#E77B00]/20 text-[#E77B00] border border-[#E77B00]/40" : "bg-[#2a2a2a] text-[#F4F0E8]/40 hover:text-[#F4F0E8]/70 border border-transparent"}`}>
                    {q}
                  </button>
                ))}
              </div>

              {/* Photo grid from Unsplash */}
              <div className="text-[#F4F0E8]/20 text-[9px] uppercase tracking-widest mb-2">Unsplash · free photos</div>
              <div className="grid grid-cols-4 gap-1.5 mb-5">
                {webPhotos.map((photo, i) => (
                  <PhotoThumb key={`${searchTerm}-${sigSeed}-${i}`} photo={photo} />
                ))}
              </div>

              {/* URL paste section */}
              <div className="border-t border-[#2a2a2a] pt-4">
                <div className="text-[#F4F0E8]/30 text-[9px] uppercase tracking-widest mb-2">{u.pasteUrlLabel}</div>
                <div className="flex gap-2">
                  <input
                    value={pasteUrl}
                    onChange={e => setPasteUrl(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAddUrl()}
                    placeholder={u.pasteUrlPh}
                    className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/15 outline-none focus:border-[#E77B00]/60"
                  />
                  <button onClick={handleAddUrl}
                    className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#E77B00] border border-[#3a3a3a] hover:border-[#E77B00] text-[#F4F0E8]/50 hover:text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors">
                    {u.addUrl}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── Mine tab ── */}
          {tab === "mine" && (
            <>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full mb-5 flex items-center justify-center gap-2 border-2 border-dashed border-[#E77B00]/40 hover:border-[#E77B00] text-[#E77B00] text-xs font-semibold uppercase tracking-widest py-3 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {u.upload}
              </button>

              {uploadedPhotos.length > 0 ? (
                <>
                  <div className="text-[#E77B00]/70 text-[9px] uppercase tracking-widest mb-2">{u.myPhotos} — {uploadedPhotos.length}</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {uploadedPhotos.map((photo, i) => <PhotoThumb key={`${i}-${photo.slice(-20)}`} photo={photo} />)}
                  </div>
                </>
              ) : (
                <div className="text-center text-[#F4F0E8]/20 text-sm py-10">{u.noPhotos}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Field labels ──────────────────────────────────────────────────────────
const FIELD_LABEL: Record<keyof SlideTexts, string> = {
  tag: "Tag", headline: "Headline", subheadline: "Subheadline", body: "Body Text",
  bullet1: "• Bullet 1", bullet2: "• Bullet 2", bullet3: "• Bullet 3",
  stat1: "Stat 1", stat1Label: "Stat 1 Label",
  stat2: "Stat 2", stat2Label: "Stat 2 Label",
  stat3: "Stat 3", stat3Label: "Stat 3 Label",
  cta: "CTA Button", phone: "Phone", web: "Website",
  labelLeft: "Label Left", labelRight: "Label Right",
};

// Converts any image src to a base64 data URL so html2canvas
// can render it without CORS restrictions in production.
async function imageToDataURL(src: string): Promise<string> {
  if (src.startsWith("data:")) return src;
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ─── Main Page ─────────────────────────────────────────────────────────────
function buildSlideMap(themes: Theme[]) {
  const m: Record<string, Record<string, Slide>> = {};
  themes.forEach(t => {
    m[t.key] = {};
    t.slides.forEach((s: Slide) => { m[t.key][s.id] = { ...s, texts: { ...s.texts } }; });
  });
  return m;
}

function campaignThemes(campaignIdx: number, lang: Lang): Theme[] {
  const c = CAMPAIGNS[campaignIdx];
  return lang === "en" ? c.themes : c.themesEs;
}

export default function SocialPage() {
  // Pick a random campaign once on mount — all campaigns share the same slide ID structure
  const initCampaign = useRef(Math.floor(Math.random() * CAMPAIGNS.length));
  const [lang,           setLang]         = useState<Lang>("en");
  const [campaignIdx,    setCampaignIdx]  = useState<number>(initCampaign.current);
  const [activeTheme,    setActiveTheme]  = useState<ThemeKey>("interior");
  const [selectedId,     setSelectedId]   = useState<string>(CAMPAIGNS[initCampaign.current].themes[0].slides[0].id);
  const [slideMap,       setSlideMap]     = useState<Record<string, Record<string, Slide>>>(() => buildSlideMap(CAMPAIGNS[initCampaign.current].themes));
  const [pickerFor,        setPickerFor]        = useState<{ slideId: string; isAlt: boolean } | null>(null);
  const [downloading,      setDownloading]      = useState<string | null>(null);
  const [uploadedPhotos,   setUploadedPhotos]   = useState<string[]>([]);

  // ── Ads mode ──
  const [mode,         setMode]         = useState<"carousel" | "ads">("carousel");
  const [adData,       setAdData]       = useState<AdData>(() => ({ ...AD_DEFAULTS["en"] }));
  const [adPickerOpen, setAdPickerOpen] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  const slideRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const currentThemes = campaignThemes(campaignIdx, lang);
  const u             = UI[lang];

  const theme       = currentThemes.find(t => t.key === activeTheme)!;
  const getSlide    = (id: string) => slideMap[activeTheme][id];
  const themeSlides = theme.slides.map(s => getSlide(s.id));
  const selected    = getSlide(selectedId);

  const patchTexts = (slideId: string, patch: Partial<SlideTexts>) =>
    setSlideMap(prev => ({
      ...prev,
      [activeTheme]: {
        ...prev[activeTheme],
        [slideId]: { ...prev[activeTheme][slideId], texts: { ...prev[activeTheme][slideId].texts, ...patch } },
      },
    }));

  const patchPhoto = (slideId: string, photo: string, isAlt: boolean) =>
    setSlideMap(prev => ({
      ...prev,
      [activeTheme]: {
        ...prev[activeTheme],
        [slideId]: isAlt
          ? { ...prev[activeTheme][slideId], photoAlt: photo }
          : { ...prev[activeTheme][slideId], photo },
      },
    }));

  const downloadSlide = useCallback(async (slide: Slide, index: number) => {
    const el = slideRefs.current[slide.id];
    if (!el) return;
    setDownloading(slide.id);

    // Logo <img> elements (not photos — photos are now BgImg divs)
    const imgs    = Array.from(el.querySelectorAll<HTMLImageElement>("img"));
    const origSrcs = imgs.map(img => img.src);

    // BgImg divs — carry original URL in data-photo-src
    const bgEls   = Array.from(el.querySelectorAll<HTMLElement>("[data-photo-src]"));
    const origBgs  = bgEls.map(bg => bg.style.backgroundImage);

    try {
      await document.fonts.ready;

      // Convert logo img srcs to data URLs (CORS workaround for Netlify)
      await Promise.all(imgs.map(async img => {
        try { img.src = await imageToDataURL(img.src); } catch { /* keep original */ }
      }));

      // Convert photo background-image URLs to data URLs (fixes object-fit distortion)
      await Promise.all(bgEls.map(async bg => {
        const src = bg.dataset.photoSrc;
        if (!src) return;
        try {
          const dataUrl = await imageToDataURL(src);
          bg.style.backgroundImage = `url("${dataUrl}")`;
        } catch { /* keep original */ }
      }));

      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: false,
        allowTaint: false,
        width: 360,
        height: 640,
        backgroundColor: null,
        logging: false,
      });

      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob) { reject(new Error("toBlob returned null")); return; }
          const url = URL.createObjectURL(blob);
          const a   = document.createElement("a");
          a.href     = url;
          a.download = `combo-${activeTheme}-slide-0${index + 1}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          resolve();
        }, "image/jpeg", 0.95);
      });
    } catch (err) {
      console.error("Slide download failed:", err);
    } finally {
      imgs.forEach((img, i) => { img.src = origSrcs[i]; });
      bgEls.forEach((bg, i) => { bg.style.backgroundImage = origBgs[i]; });
      setDownloading(null);
    }
  }, [activeTheme]);

  const downloadAll = async () => {
    for (let i = 0; i < themeSlides.length; i++) {
      await downloadSlide(themeSlides[i], i);
      await new Promise<void>(r => setTimeout(r, 500));
    }
  };

  const switchTheme = (key: ThemeKey) => {
    setActiveTheme(key);
    setSelectedId(currentThemes.find((t: Theme) => t.key === key)!.slides[0].id);
  };

  const switchLang = (l: Lang) => {
    const themes = campaignThemes(campaignIdx, l);
    setLang(l);
    setSlideMap(buildSlideMap(themes));
    setSelectedId(themes.find((t: Theme) => t.key === activeTheme)!.slides[0].id);
  };

  const patchAd = (patch: Partial<AdData>) => setAdData(prev => ({ ...prev, ...patch }));

  const downloadAd = useCallback(async () => {
    const el = adRef.current;
    if (!el) return;
    setDownloading("ad");
    const imgs   = Array.from(el.querySelectorAll<HTMLImageElement>("img"));
    const origSrcs = imgs.map(img => img.src);
    const bgEls  = Array.from(el.querySelectorAll<HTMLElement>("[data-photo-src]"));
    const origBgs = bgEls.map(bg => bg.style.backgroundImage);
    try {
      await document.fonts.ready;
      await Promise.all(imgs.map(async img => {
        try { img.src = await imageToDataURL(img.src); } catch { /* keep */ }
      }));
      await Promise.all(bgEls.map(async bg => {
        const src = bg.dataset.photoSrc;
        if (!src) return;
        try { bg.style.backgroundImage = `url("${await imageToDataURL(src)}")`; } catch { /* keep */ }
      }));
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(el, { scale: 3, useCORS: false, allowTaint: false, width: 360, height: 640, backgroundColor: null, logging: false });
      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob) { reject(new Error("toBlob null")); return; }
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "combo-ad-instagram.jpg";
          document.body.appendChild(a); a.click();
          document.body.removeChild(a); URL.revokeObjectURL(url);
          resolve();
        }, "image/jpeg", 0.95);
      });
    } catch (err) { console.error("Ad download failed:", err); }
    finally {
      imgs.forEach((img, i) => { img.src = origSrcs[i]; });
      bgEls.forEach((bg, i) => { bg.style.backgroundImage = origBgs[i]; });
      setDownloading(null);
    }
  }, []);

  const switchCampaign = () => {
    const next = (campaignIdx + 1) % CAMPAIGNS.length;
    const themes = campaignThemes(next, lang);
    setCampaignIdx(next);
    setSlideMap(buildSlideMap(themes));
    setSelectedId(themes.find((t: Theme) => t.key === activeTheme)!.slides[0].id);
  };

  const fields = SLIDE_FIELDS[selected?.type as SlideType] ?? [];

  return (
    <div className="min-h-screen bg-[#F4F0E8]" style={{ fontFamily: "var(--font-montserrat)" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#1F1F1F]/97 border-b border-[#2a2a2a] backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-5 py-2.5 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-3 mr-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Combo Studio Paint" className="h-8 object-contain object-left" style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }} />
            <div className="w-px h-5 bg-[#2a2a2a]" />
            <span className="text-[9px] text-[#F4F0E8]/30 uppercase tracking-[0.3em] hidden sm:block">{u.title}</span>
          </div>

          {/* Mode toggle: Carousel / Ads */}
          <div className="flex items-center bg-[#2a2a2a] rounded overflow-hidden border border-[#333] mr-1">
            {(["carousel", "ads"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${mode === m ? "bg-[#E77B00] text-white" : "text-[#F4F0E8]/30 hover:text-[#F4F0E8]/60"}`}>
                {m === "carousel" ? u.modeCarousel : u.modeAds}
              </button>
            ))}
          </div>

          {/* Theme tabs — carousel only */}
          {mode === "carousel" && (
            <div className="flex items-center gap-1.5 flex-1 flex-wrap">
              {currentThemes.map(t => (
                <button key={t.key} onClick={() => switchTheme(t.key as ThemeKey)}
                  className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded transition-colors ${activeTheme === t.key ? "text-white" : "bg-[#2a2a2a] text-[#F4F0E8]/35 hover:text-[#F4F0E8]/60"}`}
                  style={activeTheme === t.key ? { backgroundColor: t.color } : {}}>
                  {t.label}
                </button>
              ))}
            </div>
          )}
          {mode === "ads" && <div className="flex-1" />}

          {/* Lang toggle */}
          <div className="flex items-center bg-[#2a2a2a] rounded overflow-hidden border border-[#333]">
            {(["en", "es"] as Lang[]).map(l => (
              <button key={l} onClick={() => switchLang(l)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${lang === l ? "bg-[#E77B00] text-white" : "text-[#F4F0E8]/30 hover:text-[#F4F0E8]/60"}`}>
                {l}
              </button>
            ))}
          </div>

          {/* New Proposal — carousel only */}
          {mode === "carousel" && (
            <button onClick={switchCampaign}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#333] border border-[#3a3a3a] text-[#F4F0E8]/55 hover:text-[#F4F0E8] text-[10px] font-semibold uppercase tracking-widest rounded transition-colors"
              title={`${u.proposal} ${campaignIdx + 1} / ${CAMPAIGNS.length}`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {u.newProposal}
              <span className="opacity-40">{campaignIdx + 1}/{CAMPAIGNS.length}</span>
            </button>
          )}

          {/* Download All (carousel) / Download Ad (ads) */}
          {mode === "carousel" ? (
            <button onClick={downloadAll} disabled={!!downloading}
              className="flex items-center gap-2 px-4 py-2 bg-[#E77B00] hover:bg-[#C96900] disabled:opacity-50 text-white text-[10px] font-bold uppercase tracking-widest rounded transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V21h18v-4" />
              </svg>
              {u.downloadAll}
            </button>
          ) : (
            <button onClick={downloadAd} disabled={!!downloading}
              className="flex items-center gap-2 px-4 py-2 bg-[#E77B00] hover:bg-[#C96900] disabled:opacity-50 text-white text-[10px] font-bold uppercase tracking-widest rounded transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V21h18v-4" />
              </svg>
              {u.downloadAd}
            </button>
          )}
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex">

        {/* ── Main column ── */}
        <main className="flex-1 flex flex-col items-center gap-10 py-8 px-6 min-w-0">
          <div className="text-[#5B3A29]/40 text-[10px] uppercase tracking-widest">
            {mode === "ads"
              ? (lang === "es" ? "Anuncio · Instagram / TikTok · 1080 × 1920 px · 9:16 · JPG" : "Ad · Instagram / TikTok · 1080 × 1920 px · 9:16 · JPG")
              : u.formatNote}
          </div>

          {/* ── Ad preview (ads mode) ── */}
          {mode === "ads" && (
            <div className="relative">
              <div className="absolute -top-5 left-0 text-[10px] text-[#5B3A29]/35 uppercase tracking-widest">
                {u.adTitle} — Instagram / TikTok
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-[#E77B00]">
                <div ref={adRef} style={{ width: 360, height: 640 }}>
                  <AdSlide ad={adData} />
                </div>
              </div>
            </div>
          )}

          {/* ── Carousel slides (carousel mode) ── */}
          {mode === "carousel" && themeSlides.map((slide, i) => (
            <div key={slide.id} className="relative">
              <div className="absolute -top-5 left-0 text-[10px] text-[#5B3A29]/35 uppercase tracking-widest">
                Slide {i + 1} / 5 — {slide.type}
              </div>

              {/* Click to select */}
              <div
                onClick={() => setSelectedId(slide.id)}
                className={`cursor-pointer rounded-2xl overflow-hidden shadow-2xl ring-4 transition-all duration-150 ${selectedId === slide.id ? "ring-[#E77B00]" : "ring-transparent hover:ring-[#D9CBB8]"}`}
              >
                {/* Capture target: exact 360×640 */}
                <div ref={el => { slideRefs.current[slide.id] = el; }} style={{ width: 360, height: 640 }}>
                  <SlideRenderer slide={slide} />
                </div>
              </div>

              {/* Per-slide download */}
              <button
                onClick={() => downloadSlide(slide, i)}
                disabled={!!downloading}
                className="absolute bottom-4 right-4 w-9 h-9 bg-[#E77B00] hover:bg-[#C96900] disabled:opacity-50 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
                title="Download this slide"
              >
                {downloading === slide.id ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                  </svg>
                )}
              </button>
            </div>
          ))}
          <div className="h-16" />
        </main>

        {/* ── Editor sidebar ── */}
        <aside className="w-80 flex-shrink-0 border-l border-[#D9CBB8] bg-white sticky top-[49px] h-[calc(100vh-49px)] overflow-y-auto">

          {/* ── Ad editor ── */}
          {mode === "ads" && (
            <div className="p-5">
              <div className="text-[#5B3A29]/40 text-[9px] uppercase tracking-widest mb-1">{u.adTitle}</div>
              <div className="text-[#5B3A29] text-sm font-semibold mb-4">Instagram · TikTok · 9:16</div>

              {/* Photo picker */}
              <div className="mb-5">
                <div className="text-[9px] text-[#5B3A29]/40 uppercase tracking-widest mb-1.5">{u.adPhoto}</div>
                <button onClick={() => setAdPickerOpen(true)}
                  className="w-full h-28 rounded overflow-hidden border-2 border-[#D9CBB8] hover:border-[#E77B00] transition-colors group relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={adData.photo} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                    <span className="text-transparent group-hover:text-white text-xs font-semibold transition-colors">{u.change}</span>
                  </div>
                </button>
              </div>

              {/* Ad text fields */}
              <div className="space-y-3">
                {([
                  { key: "tagline",   label: u.adTagline,  multi: false },
                  { key: "headline1", label: u.adH1,       multi: false },
                  { key: "headline2", label: u.adH2,       multi: false },
                  { key: "subtitle",  label: u.adSubtitle, multi: false },
                  { key: "body",      label: u.adBody,     multi: true  },
                  { key: "feature1",  label: u.adF1,       multi: false },
                  { key: "feature2",  label: u.adF2,       multi: false },
                  { key: "feature3",  label: u.adF3,       multi: false },
                  { key: "phone",     label: "Phone",      multi: false },
                  { key: "web",       label: "Website",    multi: false },
                ] as { key: keyof AdData; label: string; multi: boolean }[]).map(({ key, label, multi }) => (
                  <div key={key}>
                    <label className="block text-[9px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">{label}</label>
                    {multi ? (
                      <textarea
                        value={adData[key]}
                        onChange={e => patchAd({ [key]: e.target.value })}
                        rows={2}
                        className="w-full border border-[#D9CBB8] rounded px-3 py-2 text-sm text-[#5B3A29] outline-none focus:border-[#E77B00]/60 resize-none bg-[#F4F0E8]"
                      />
                    ) : (
                      <input
                        value={adData[key]}
                        onChange={e => patchAd({ [key]: e.target.value })}
                        className="w-full border border-[#D9CBB8] rounded px-3 py-2 text-sm text-[#5B3A29] outline-none focus:border-[#E77B00]/60 bg-[#F4F0E8]"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Download button */}
              <button onClick={downloadAd} disabled={!!downloading}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#E77B00] hover:bg-[#C96900] disabled:opacity-50 text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                </svg>
                {u.downloadAd}
              </button>
            </div>
          )}

          {/* ── Carousel editor ── */}
          {mode === "carousel" && selected ? (
            <div className="p-5">
              <div className="text-[#5B3A29]/40 text-[9px] uppercase tracking-widest mb-1">{u.editSlide}</div>
              <div className="text-[#5B3A29] text-sm font-semibold mb-4 capitalize">{selected.type} — {u.layout}</div>

              {/* Text fields */}
              <div className="space-y-3">
                {fields.map(key => {
                  const val = (selected.texts[key] ?? "") as string;
                  const multiline = key === "body" || key === "headline" || key === "subheadline";
                  return (
                    <div key={key}>
                      <label className="block text-[9px] text-[#5B3A29]/40 uppercase tracking-widest mb-1">
                        {FIELD_LABEL[key]}
                      </label>
                      {multiline ? (
                        <textarea
                          value={val}
                          onChange={e => patchTexts(selected.id, { [key]: e.target.value })}
                          rows={key === "body" ? 3 : 2}
                          className="w-full border border-[#D9CBB8] rounded px-3 py-2 text-sm text-[#5B3A29] outline-none focus:border-[#E77B00]/60 resize-none bg-[#F4F0E8]"
                        />
                      ) : (
                        <input
                          value={val}
                          onChange={e => patchTexts(selected.id, { [key]: e.target.value })}
                          className="w-full border border-[#D9CBB8] rounded px-3 py-2 text-sm text-[#5B3A29] outline-none focus:border-[#E77B00]/60 bg-[#F4F0E8]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Photo pickers */}
              <div className="mt-6 space-y-3">
                <div className="text-[9px] text-[#5B3A29]/40 uppercase tracking-widest">{u.photos}</div>
                <div>
                  <div className="text-[9px] text-[#5B3A29]/40 mb-1.5">{u.mainPhoto}</div>
                  <button
                    onClick={() => setPickerFor({ slideId: selected.id, isAlt: false })}
                    className="w-full h-28 rounded overflow-hidden border-2 border-[#D9CBB8] hover:border-[#E77B00] transition-colors group relative"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selected.photo} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                      <span className="text-transparent group-hover:text-white text-xs font-semibold transition-colors">{u.change}</span>
                    </div>
                  </button>
                </div>

                {selected.type === "split" && (
                  <div>
                    <div className="text-[9px] text-[#5B3A29]/40 mb-1.5">{u.secondPhoto}</div>
                    <button
                      onClick={() => setPickerFor({ slideId: selected.id, isAlt: true })}
                      className="w-full h-28 rounded overflow-hidden border-2 border-[#D9CBB8] hover:border-[#E77B00] transition-colors group relative"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selected.photoAlt || selected.photo} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                        <span className="text-transparent group-hover:text-white text-xs font-semibold transition-colors">{u.change}</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Download this slide */}
              <button
                onClick={() => {
                  const i = themeSlides.findIndex(s => s.id === selected.id);
                  downloadSlide(selected, i);
                }}
                disabled={!!downloading}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#E77B00] hover:bg-[#C96900] disabled:opacity-50 text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                </svg>
                {u.download}
              </button>
            </div>
          ) : mode === "carousel" ? (
            <div className="flex items-center justify-center h-full text-[#5B3A29]/25 text-sm">
              {u.clickEdit}
            </div>
          ) : null}
        </aside>
      </div>

      {/* Carousel photo picker */}
      {pickerFor && (
        <PhotoPicker
          current={pickerFor.isAlt ? (getSlide(pickerFor.slideId).photoAlt || "") : getSlide(pickerFor.slideId).photo}
          onPick={photo => patchPhoto(pickerFor.slideId, photo, pickerFor.isAlt)}
          onClose={() => setPickerFor(null)}
          onUpload={url => setUploadedPhotos(prev => [url, ...prev])}
          uploadedPhotos={uploadedPhotos}
          u={u}
        />
      )}

      {/* Ad photo picker */}
      {adPickerOpen && (
        <PhotoPicker
          current={adData.photo}
          onPick={photo => patchAd({ photo })}
          onClose={() => setAdPickerOpen(false)}
          onUpload={url => setUploadedPhotos(prev => [url, ...prev])}
          uploadedPhotos={uploadedPhotos}
          u={u}
        />
      )}
    </div>
  );
}
