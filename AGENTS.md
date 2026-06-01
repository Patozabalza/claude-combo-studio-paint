<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Brand Identity

- **Project:** Combo Studio Paint — premium painting contractor, Miami-Dade
- **Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion v12 · TypeScript
- **Colors:** `#F4F0E8` ivory · `#5B3A29` espresso · `#E77B00` orange · `#1F1F1F` charcoal · `#D9CBB8` sand
- **Fonts:** `--font-montserrat` (body/UI) · `--font-cormorant` (display/headings)
- **Tone:** Premium, warm, trustworthy — not flashy

## Available Skills

Use these skills when working on UI, design, or animation tasks in this project.

### Primary (use these first)

| Skill | Invoke with | When to use |
|---|---|---|
| `emil-design-eng` | `/emil-design-eng` | **Animations, transitions, Framer Motion** — this site uses FM v12 heavily. Use for any hover, enter/exit, spring, or scroll animation. Follow the animation decision framework (ask: should this animate? how often is it seen?). |
| `ui-ux-pro-max` | `/ui-ux-pro-max` | General UI design — components, layouts, color palettes, accessibility. 67 styles and 161 palettes available. |
| `ui-styling` | `/ui-styling` | Tailwind v4 utilities, CSS custom properties, responsive design. Tailwind config lives in `globals.css` under `@theme inline`. |

### Secondary

| Skill | Invoke with | When to use |
|---|---|---|
| `design` | `/design` | Component architecture decisions, design system consistency |
| `taste-skill` | `/taste-skill` | Overall visual quality review — "does this look good?" |
| `minimalist-skill` | `/minimalist-skill` | When sections feel cluttered or overdesigned |
| `soft-skill` | `/soft-skill` | Soft, warm UI aesthetic — fits this brand's premium feel |
| `image-to-code-skill` | `/image-to-code-skill` | Converting reference screenshots or mockups to code |
| `redesign-skill` | `/redesign-skill` | Reworking existing sections that aren't landing right |

### Animation rules for this project

- This site uses Framer Motion v12. Always prefer `transform` + `opacity` over layout-triggering properties.
- Use `ease-out` for entrances, `ease-in-out` for on-screen movement.
- Keyboard-triggered actions (form submit, tab navigation) → no animation.
- Target durations: hover/press 100–160ms · cards/sections 200–350ms.
- Use `useSpring` for scroll-parallax and mouse-tracking effects.
- Run `/emil-design-eng` before adding any new animation to this project.
