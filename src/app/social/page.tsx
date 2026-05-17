"use client";

import { useState, useRef, useCallback } from "react";
import {
  THEMES, THEMES_ES, SLIDE_FIELDS, ALL_PINTOR, ALL_PROJECTS,
  ThemeKey, Theme, Slide, SlideTexts, SlideType,
} from "@/lib/social-data";

type Lang = "en" | "es";

const UI = {
  en: {
    title:       "Social Media Generator",
    downloadAll: "Download All 5",
    formatNote:  "Stories / TikTok · 1080 × 1920 px · 9:16 · JPG",
    editSlide:   "Edit Slide",
    layout:      "Layout",
    photos:      "Photos",
    mainPhoto:   "Main Photo",
    secondPhoto: "Second Photo (After)",
    download:    "Download this slide",
    clickEdit:   "Click a slide to edit",
    change:      "Change →",
    picker:      "Select Photo",
    pintor:      "Painters — 36 photos",
    projects:    "Projects — 9 photos",
    myPhotos:    "My Uploaded Photos",
    upload:      "+ Upload from device",
  },
  es: {
    title:       "Generador de Contenido",
    downloadAll: "Descargar 5 slides",
    formatNote:  "Historias / TikTok · 1080 × 1920 px · 9:16 · JPG",
    editSlide:   "Editar Slide",
    layout:      "Diseño",
    photos:      "Fotos",
    mainPhoto:   "Foto Principal",
    secondPhoto: "Segunda Foto (Después)",
    download:    "Descargar este slide",
    clickEdit:   "Haz clic en un slide para editar",
    change:      "Cambiar →",
    picker:      "Seleccionar Foto",
    pintor:      "Pintores — 36 fotos",
    projects:    "Proyectos — 9 fotos",
    myPhotos:    "Mis Fotos Subidas",
    upload:      "+ Subir desde dispositivo",
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

function Img({ src, style }: { src: string; style: React.CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" style={style} />;
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
      <Img src={s.photo} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
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
        <Img src={s.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(transparent,${B.charcoal})` }} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 320, backgroundColor: B.charcoal, padding: "24px 32px 32px" }}>
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
        <Img src={s.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 64, background: `linear-gradient(transparent,${B.charcoal})` }} />
      </div>
      <div style={{ position: "absolute", top: 256, left: 32, right: 32, bottom: 0, paddingTop: 24 }}>
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
function StatSlide({ s }: { s: Slide }) {
  const stats = [
    { v: s.texts.stat1, l: s.texts.stat1Label },
    { v: s.texts.stat2, l: s.texts.stat2Label },
    { v: s.texts.stat3, l: s.texts.stat3Label },
  ].filter(st => st.v);
  return (
    <div style={{ position: "relative", width: 360, height: 640, overflow: "hidden", backgroundColor: B.charcoal }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 80% 15%, ${B.orange}20 0%, transparent 55%)` }} />
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Logo h={66} op={0.55} />
      </div>
      <div style={{ position: "absolute", top: 122, left: "50%", transform: "translateX(-50%)" }}>
        <OrangeLine w={48} />
      </div>
      {s.texts.tag && (
        <div style={{ position: "absolute", top: 140, left: 0, right: 0, textAlign: "center" as const }}>
          <Tag text={s.texts.tag} />
        </div>
      )}
      <div style={{ position: "absolute", top: 166, left: 32, right: 32, textAlign: "center" as const }}>
        <h2 style={{ fontFamily: FD, fontSize: 48, fontWeight: 500, color: "#fff", lineHeight: 1.02, margin: 0, whiteSpace: "pre-line" }}>
          {s.texts.headline}
        </h2>
      </div>
      <div style={{ position: "absolute", top: 300, left: 32, right: 32, display: "flex", justifyContent: "space-around", gap: 8 }}>
        {stats.map((st, i) => (
          <div key={i} style={{ textAlign: "center" as const, flex: 1 }}>
            <div style={{ fontFamily: FD, fontSize: 58, fontWeight: 500, color: B.orange, lineHeight: 1, letterSpacing: "-0.02em" }}>{st.v}</div>
            <div style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginTop: 6 }}>{st.l}</div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center" as const }}>
        <div style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,.2)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>
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
        <Img src={s.photo} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }} />
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
          <div style={{ backgroundColor: B.orange, color: "#fff", fontFamily: FB, fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, padding: "13px 26px", borderRadius: 2, marginBottom: 24 }}>
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
          <Img src={s.photo} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(50%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,.28)" }} />
          <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(0,0,0,.65)", color: "#fff", fontSize: 10, fontFamily: FB, fontWeight: 700, letterSpacing: "0.2em", padding: "5px 10px", borderRadius: 2, whiteSpace: "nowrap" as const }}>
            {s.texts.labelLeft || "BEFORE"}
          </div>
        </div>
        <div style={{ width: 2, backgroundColor: "#fff", flexShrink: 0 }} />
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <Img src={s.photoAlt || s.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
function PhotoPicker({ current, onPick, onClose, onUpload, uploadedPhotos, u }: {
  current: string;
  onPick: (photo: string) => void;
  onClose: () => void;
  onUpload: (url: string) => void;
  uploadedPhotos: string[];
  u: typeof UI["en"];
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpload(url);
    onPick(url);
    onClose();
    // reset so the same file can be picked again
    e.target.value = "";
  };

  function PhotoThumb({ photo, square = false }: { photo: string; square?: boolean }) {
    return (
      <button onClick={() => { onPick(photo); onClose(); }}
        className={`overflow-hidden rounded transition-all ${square ? "aspect-square" : "aspect-[9/16]"} ${current === photo ? "ring-2 ring-[#E77B00]" : "hover:ring-1 hover:ring-[#E77B00]/50"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="w-full h-full object-cover" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1F1F1F] rounded-2xl p-5 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#F4F0E8]/50 text-[10px] uppercase tracking-widest">{u.picker}</span>
          <button onClick={onClose} className="text-[#F4F0E8]/30 hover:text-[#F4F0E8] text-lg leading-none">✕</button>
        </div>

        {/* Upload button */}
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

        {/* Uploaded photos */}
        {uploadedPhotos.length > 0 && (
          <>
            <div className="text-[#E77B00]/70 text-[9px] uppercase tracking-widest mb-2">{u.myPhotos} — {uploadedPhotos.length}</div>
            <div className="grid grid-cols-6 gap-1.5 mb-5">
              {uploadedPhotos.map(photo => <PhotoThumb key={photo} photo={photo} />)}
            </div>
            <div className="border-t border-[#2a2a2a] mb-4" />
          </>
        )}

        {/* Project library */}
        <div className="text-[#F4F0E8]/30 text-[9px] uppercase tracking-widest mb-2">{u.pintor}</div>
        <div className="grid grid-cols-6 gap-1.5 mb-4">
          {ALL_PINTOR.map(photo => <PhotoThumb key={photo} photo={photo} />)}
        </div>
        <div className="text-[#F4F0E8]/30 text-[9px] uppercase tracking-widest mb-2">{u.projects}</div>
        <div className="grid grid-cols-6 gap-1.5">
          {ALL_PROJECTS.map(photo => <PhotoThumb key={photo} photo={photo} square />)}
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
    t.slides.forEach(s => { m[t.key][s.id] = { ...s, texts: { ...s.texts } }; });
  });
  return m;
}

export default function SocialPage() {
  const [lang,        setLang]        = useState<Lang>("en");
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("interior");
  const [selectedId,  setSelectedId]  = useState<string>(THEMES[0].slides[0].id);
  const [slideMap,    setSlideMap]    = useState<Record<string, Record<string, Slide>>>(() => buildSlideMap(THEMES));
  const [pickerFor,   setPickerFor]   = useState<{ slideId: string; isAlt: boolean } | null>(null);
  const [downloading,    setDownloading]    = useState<string | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const slideRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const currentThemes = lang === "en" ? THEMES : THEMES_ES;
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

    // Snapshot current img srcs before we swap them
    const imgs = Array.from(el.querySelectorAll<HTMLImageElement>("img"));
    const origSrcs = imgs.map(img => img.src);

    try {
      await document.fonts.ready;

      // Convert every img src to a data URL — prevents canvas taint in production
      // (Netlify doesn't return CORS headers on static files, so useCORS would blank the images)
      await Promise.all(imgs.map(async img => {
        try { img.src = await imageToDataURL(img.src); } catch { /* keep original on fetch error */ }
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
      // Restore original srcs and clear spinner no matter what
      imgs.forEach((img, i) => { img.src = origSrcs[i]; });
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
    setSelectedId(currentThemes.find(t => t.key === key)!.slides[0].id);
  };

  const switchLang = (l: Lang) => {
    const themes = l === "en" ? THEMES : THEMES_ES;
    setLang(l);
    setSlideMap(buildSlideMap(themes));
    setSelectedId(themes.find(t => t.key === activeTheme)!.slides[0].id);
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

          {/* Theme tabs */}
          <div className="flex items-center gap-1.5 flex-1 flex-wrap">
            {currentThemes.map(t => (
              <button key={t.key} onClick={() => switchTheme(t.key as ThemeKey)}
                className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded transition-colors ${activeTheme === t.key ? "text-white" : "bg-[#2a2a2a] text-[#F4F0E8]/35 hover:text-[#F4F0E8]/60"}`}
                style={activeTheme === t.key ? { backgroundColor: t.color } : {}}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Lang toggle */}
          <div className="flex items-center bg-[#2a2a2a] rounded overflow-hidden border border-[#333]">
            {(["en", "es"] as Lang[]).map(l => (
              <button key={l} onClick={() => switchLang(l)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${lang === l ? "bg-[#E77B00] text-white" : "text-[#F4F0E8]/30 hover:text-[#F4F0E8]/60"}`}>
                {l}
              </button>
            ))}
          </div>

          {/* Download All */}
          <button onClick={downloadAll} disabled={!!downloading}
            className="flex items-center gap-2 px-4 py-2 bg-[#E77B00] hover:bg-[#C96900] disabled:opacity-50 text-white text-[10px] font-bold uppercase tracking-widest rounded transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V21h18v-4" />
            </svg>
            {u.downloadAll}
          </button>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex">

        {/* ── Slide column ── */}
        <main className="flex-1 flex flex-col items-center gap-10 py-8 px-6 min-w-0">
          <div className="text-[#5B3A29]/40 text-[10px] uppercase tracking-widest">
            {u.formatNote}
          </div>

          {themeSlides.map((slide, i) => (
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
          {selected ? (
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
          ) : (
            <div className="flex items-center justify-center h-full text-[#5B3A29]/25 text-sm">
              {u.clickEdit}
            </div>
          )}
        </aside>
      </div>

      {/* Photo picker modal */}
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
    </div>
  );
}
