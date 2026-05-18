# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite configured.

## Architecture

Two routes, both fully client-rendered (`"use client"`):

- **`/`** — Marketing site for Combo Studio Paint (Miami-Dade premium painting). All sections render sequentially in [src/app/page.tsx](src/app/page.tsx); no client-side routing.
- **`/cotizador`** — Internal project estimator tool (not linked from the main site). See below.

**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion v12 · TypeScript · Deployed on Netlify

### i18n

All user-facing text for the **marketing site** lives in [src/context/LanguageContext.tsx](src/context/LanguageContext.tsx) as a flat `translations` object with `"en"` and `"es"` keys. Every component consumes it via:

```tsx
const { t } = useLanguage();
// then: t("hero.headline")
```

Never hardcode strings in components; always edit the translations object and keep both `en` and `es` in sync.

The **cotizador** has its own self-contained `T` object at the top of [src/app/cotizador/page.tsx](src/app/cotizador/page.tsx) — it does **not** use `LanguageContext`.

### Design system

- **Fonts:** `--font-montserrat` (body/UI), `--font-cormorant` (display/headings)
- **Brand colors — raw hex:** bg `#F4F0E8` · text `#5B3A29` · accent `#E77B00` · dark `#1F1F1F` · sand `#D9CBB8`
- **Brand colors — Tailwind tokens:** `bg-brand-ivory`, `bg-brand-espresso`, `bg-brand-orange`, `bg-brand-charcoal`, `bg-brand-sand` (defined in [src/app/globals.css](src/app/globals.css) under `@theme inline`)
- **Images:** `public/images/pintor/` (team/work photos 1–36) and `public/images/proyectos/` (project shots 1–10)

### Cotizador (`/cotizador`)

Internal pricing and proposal tool for the owner. Not linked from the public site.

- **Pricing data:** [src/lib/pricing-data.ts](src/lib/pricing-data.ts) — 75 services across 6 categories (Residential, Commercial, Signature, Equipment, Labor, Materials), 21 Miami-Dade cities with price multipliers, and project templates. Edit here to add/change services or pricing.
- **State persistence:** Draft auto-saved to `localStorage` under the key `combo_est_v2`.
- **PDF generation:** Uses `window.open` + `document.write` — clones the `#proposal-doc` element into a new tab and triggers `window.print()`. Do **not** use html2canvas (fails in production due to canvas taint and Next.js image URL issues).

### Contact form

[src/components/Contact.tsx](src/components/Contact.tsx) submits to **Web3Forms** (`https://api.web3forms.com/submit`) — no backend. The access key is already in the component.

### Deployment

Netlify via `@netlify/plugin-nextjs`. The `netlify.toml` publishes `.next` and uses Node 20. **macOS LibreSSL blocks `git push`** — use the Python urllib + GitHub Git Data API workaround instead (see memory).

### Tailwind v4 note

Tailwind v4 no longer uses `tailwind.config.js`. Configuration lives in `postcss.config.mjs`; CSS custom properties and brand color tokens are in [src/app/globals.css](src/app/globals.css) under the `@theme inline` directive.
