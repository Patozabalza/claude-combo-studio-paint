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

Single-page marketing site for Combo Studio Paint, a premium painting company in Miami-Dade. All page sections render sequentially in [src/app/page.tsx](src/app/page.tsx) — there is no routing.

**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion v12 · TypeScript · Deployed on Netlify

### i18n

All user-facing text lives in **[src/context/LanguageContext.tsx](src/context/LanguageContext.tsx)** as a flat `translations` object with `"en"` and `"es"` keys. Every component consumes it via:

```tsx
const { t } = useLanguage();
// then: t("hero.headline")
```

To add or change any text, edit the translations object — never hardcode strings in components. Both `en` and `es` entries must always be kept in sync.

### Design system

- **Fonts:** `--font-montserrat` (body/UI), `--font-cormorant` (display/headings)
- **Brand colors:** bg `#F4F0E8` · text `#5B3A29` · accent `#E77B00` · dark sections `#1F1F1F`
- **Images:** `public/images/pintor/` (team/work photos 1–36) and `public/images/proyectos/` (project shots 1–10)

### Contact form

[src/components/Contact.tsx](src/components/Contact.tsx) submits to **Web3Forms** (`https://api.web3forms.com/submit`) — no backend. The access key is already in the component.

### Deployment

Netlify via `@netlify/plugin-nextjs`. The `netlify.toml` publishes `.next` and uses Node 20. **macOS LibreSSL blocks `git push`** — use the Python urllib + GitHub Git Data API workaround instead (see memory).

### Tailwind v4 note

Tailwind v4 no longer uses `tailwind.config.js`. Configuration lives in `postcss.config.mjs` and CSS custom properties in [src/app/globals.css](src/app/globals.css). The `@theme` directive replaces the `theme` config block.
