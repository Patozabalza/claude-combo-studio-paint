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

- **`/`** — Marketing site for Combo Studio Paint (Miami-Dade premium painting), fully client-rendered (`"use client"`). All sections render sequentially in [src/app/page.tsx](src/app/page.tsx); no client-side routing.
- **`/cotizador`** — Internal project estimator tool (not linked from the main site). See below.
- **`/aeo`** — Hidden AEO monitoring dashboard, server-rendered. See below.

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

### AEO Dashboard (`/aeo`)

Hidden internal panel that tracks AEO (Answer Engine Optimization) progress — not linked from any page, not in the sitemap, disallowed in `robots.txt`.

- **Access:** gated by query param `?auth=<AEO_DASHBOARD_TOKEN>`, checked server-side in [src/app/aeo/page.tsx](src/app/aeo/page.tsx) with a constant-time hash comparison. Wrong or missing token → real `notFound()` (HTTP 404), so the route's existence isn't revealed.
- **Score data:** static checklist in [src/lib/aeo-checklist.ts](src/lib/aeo-checklist.ts) — update item `status` (`"done"` / `"pending"`) manually as AEO tasks are completed. Not wired to any live API.
- **UI:** [src/components/AeoDashboard.tsx](src/components/AeoDashboard.tsx) — branded with the official logo, brand fonts/colors, and an animated circular score gauge (Framer Motion).

### Contact form

[src/components/Contact.tsx](src/components/Contact.tsx) submits to **Web3Forms** (`https://api.web3forms.com/submit`) using `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (env var — see `.env.local.example`). In parallel it POSTs to [src/app/api/submit-lead/route.ts](src/app/api/submit-lead/route.ts), which validates input (email/phone format, length limits, honeypot field `website`) before forwarding to a Google Apps Script webhook (`GOOGLE_SHEETS_WEBHOOK_URL`, server-only) that appends a row to a Google Sheet. Errors never leak `error.message` to the client.

### Environment variables

See [.env.local.example](.env.local.example) for the full list: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, `GOOGLE_SHEETS_WEBHOOK_URL`, `AEO_DASHBOARD_TOKEN`. All must also be set in Netlify's dashboard (Project configuration → Environment variables) — `NEXT_PUBLIC_*` vars are inlined at build time, so adding/changing one requires a redeploy, not just a runtime restart.

### Deployment

Netlify via `@netlify/plugin-nextjs`. The `netlify.toml` publishes `.next` and uses Node 20. **macOS LibreSSL blocks `git push`** — try `GIT_SSL_NO_VERIFY=true git push origin main` first (confirmed working 2026-06-26); if that fails, fall back to the Python urllib + GitHub Git Data API workaround (see memory).

### Tailwind v4 note

Tailwind v4 no longer uses `tailwind.config.js`. Configuration lives in `postcss.config.mjs`; CSS custom properties and brand color tokens are in [src/app/globals.css](src/app/globals.css) under the `@theme inline` directive.
