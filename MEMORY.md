# MEMORY — Combo Studio Paint
> Archivo de memoria del proyecto. Actualizar después de cada sesión de desarrollo.
> Última actualización: 2026-06-01

---

## 🏢 La Empresa

**Nombre:** Combo Studio Paint  
**Tipo:** Contratista de pintura premium  
**Mercado:** Miami-Dade County, Florida  
**Idiomas:** Inglés + Español (web bilingüe)  
**Email:** combostudiopaint@gmail.com  
**Teléfono:** +1 (305) 542-6364  
**WhatsApp:** 13055426364 → `https://wa.me/13055426364`  
**Web:** https://combostudiopaint.com  

### Propuesta de valor
- Pintura residencial y comercial premium
- Acabados decorativos de lujo: Limewash, Roman Clay, Venetian Plaster
- Equipo bilingüe (inglés/español)
- Cobertura total Miami-Dade: Coral Gables, Doral, Aventura, Miami Beach, Kendall, Hialeah, Pinecrest, Homestead, North Miami, Brickell, South Miami
- 500+ proyectos completados · 10+ años de experiencia · 100% satisfacción del cliente

### Servicios Residenciales
Interior Painting · Exterior Painting · Luxury Homes · Condominiums · HOA Communities · Repainting Projects · Accent Walls · Drywall Repair · Pressure Cleaning · Color Consultation

### Servicios Comerciales
Offices · Retail Spaces · Restaurants · Warehouses · Multifamily Buildings · New Developments · Hospitality Projects

### Servicios Signature (alta demanda en Miami)
Limewash · Roman Clay · Venetian Plaster · Textured feature walls · Mediterranean finishes · Custom accent walls

---

## 🎨 Identidad de Marca

| Token | Hex | Tailwind |
|---|---|---|
| Ivory (fondo) | `#F4F0E8` | `bg-brand-ivory` |
| Espresso (texto) | `#5B3A29` | `bg-brand-espresso` |
| Orange (acento) | `#E77B00` | `bg-brand-orange` |
| Charcoal (oscuro) | `#1F1F1F` | `bg-brand-charcoal` |
| Sand | `#D9CBB8` | `bg-brand-sand` |

**Fuentes:**
- `--font-montserrat` → cuerpo / UI
- `--font-cormorant` → display / headings

**Tono:** Premium, cálido, confiable. No flashy.

---

## 🛠 Stack Técnico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16.2.6 |
| UI | React 19 |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion v12 |
| Tipado | TypeScript |
| CMS | Sanity v5 (headless) |
| Deploy | Netlify + @netlify/plugin-nextjs |
| Formulario contacto | Web3Forms (sin backend) |

**Importante Tailwind v4:** No usa `tailwind.config.js`. Config en `postcss.config.mjs`. Tokens de color en `src/app/globals.css` bajo `@theme inline`.

---

## 📁 Arquitectura de Rutas

```
/          → Web de marketing (pública)
/cotizador → Herramienta interna de cotización (NO en CMS, NO en menú)
/studio    → Sanity Studio CMS (requiere login)
```

### Archivos clave
| Archivo | Qué hace |
|---|---|
| `src/app/page.tsx` | Server Component — fetches Sanity → pasa a PageClient |
| `src/app/PageClient.tsx` | Client Component — renderiza toda la web |
| `src/context/LanguageContext.tsx` | i18n — `t("key")` en todos los componentes. Exporta `defaultTranslations` |
| `src/lib/sanity.ts` | Cliente Sanity (projectId + dataset) |
| `src/lib/sanity.queries.ts` | `fetchSiteTranslations()` — fetcha Sanity y mapea al formato flat |
| `src/sanity/schemas/` | Schemas del CMS |
| `src/app/studio/[[...tool]]/page.tsx` | Ruta del Sanity Studio |
| `src/lib/pricing-data.ts` | Precios cotizador (75 servicios, 21 ciudades) — NO tocar desde CMS |
| `src/components/Contact.tsx` | Formulario → Web3Forms |

### Componentes de marketing (en orden de página)
Header · Hero · TrustBar · About · ComboDifference · Services · ColorStudio · BeforeAfter · Process · Areas · Testimonials · FAQ · Contact · Footer · WhatsAppButton

### Imágenes
- `public/images/pintor/` → fotos del equipo/trabajo (1–36)
- `public/images/proyectos/` → fotos de proyectos (1–10)

---

## 🗄 Sanity CMS

**Proyecto ID:** `5nrvq646`  
**Dataset:** `production`  
**Studio URL (dev):** http://localhost:3000/studio  
**Studio URL (prod):** https://combostudiopaint.com/studio  

### Documentos creados (singletons)
| ID en Sanity | Tipo | Contenido |
|---|---|---|
| `siteSettings` | `settings` | Teléfono, WhatsApp, email, stats (500+, 10+, 100%) |
| `siteHero` | `hero` | Headline, subtítulo, badge, CTAs (en + es) |
| `siteAbout` | `about` | Título, cuerpo (en + es) |
| `siteTestimonials` | `testimonials` | 3 testimonios con nombre, ciudad, cita (en + es) |
| `siteFAQ` | `faq` | 9 preguntas frecuentes (en + es) |
| `sitePageText` | `pageText` | Nav, servicios, colorStudio, diferencia, proceso, áreas, contacto, footer |

### Schemas disponibles
`settings` · `hero` · `about` · `testimonials` · `faq` · `pageText`

### Cómo funciona el CMS
1. `page.tsx` (Server) llama `fetchSiteTranslations(defaultTranslations)`
2. Sanity devuelve los documentos con GROQ
3. `mapSanityToTranslations()` convierte la data estructurada al formato flat `{ en: { "hero.headline": "..." }, es: {...} }`
4. Se pasa como `initialTranslations` a `LanguageProvider`
5. Si Sanity no responde o no está configurado → usa `defaultTranslations` del código (fallback seguro)
6. Revalida cada 60 segundos

### CORS configurado en Sanity
- `http://localhost:3000` (Allow credentials: ✓)
- `https://combostudiopaint.com`

### Variables de entorno
```
NEXT_PUBLIC_SANITY_PROJECT_ID=5nrvq646
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## 🧩 Cotizador (`/cotizador`)

- Herramienta interna para el dueño — NO está vinculada desde la web pública
- Estado: guardado en `localStorage` bajo clave `combo_est_v2`
- PDF: via `window.open` + `document.write` (NO html2canvas — falla en producción)
- i18n propio: objeto `T` al tope de `src/app/cotizador/page.tsx` — NO usa LanguageContext
- Precios: `src/lib/pricing-data.ts` — 75 servicios en 6 categorías, 21 ciudades con multiplicadores

---

## 🚀 Deploy

- **Plataforma:** Netlify
- **Config:** `netlify.toml` → publica `.next`, Node 20
- **Plugin:** `@netlify/plugin-nextjs` v5
- **⚠️ macOS LibreSSL bloquea `git push`** → usar Python urllib + GitHub Git Data API como workaround

---

## 📋 Reglas importantes

1. **Nunca hardcodear strings** en componentes — siempre usar `t("key")` y editar en `LanguageContext.tsx` (o en Sanity)
2. **Mantener en + es en sync** en todo momento
3. **No tocar `/cotizador`** desde el CMS ni desde integraciones externas
4. **Tailwind v4** — no crear `tailwind.config.js`, todo va en `globals.css`
5. **Framer Motion v12** — siempre correr `/emil-design-eng` antes de agregar animaciones
6. **`suppressHydrationWarning`** en `<html>` — necesario por extensión LanguageTool del navegador

---

## 🔧 Comandos

```bash
npm run dev      # Dev server en http://localhost:3000
npm run build    # Build de producción
npm run lint     # ESLint
```

---

## ⚠️ Gotchas importantes

### CORS Allow Credentials — obligatorio para el CMS
Para que el Studio funcione en producción, `https://combostudiopaint.com` debe tener **Allow credentials: ON** en Sanity CORS.
Sin esto el Studio muestra "Connect this studio to your project" o "An error occurred" aunque el dominio esté en la lista CORS.
Lo mismo aplica para `http://localhost:3000` en desarrollo.
Config: sanity.io → proyecto 5nrvq646 → Settings → API → CORS Origins → toggle Allow credentials.

### Netlify + variables de entorno
Las variables `NEXT_PUBLIC_*` se embeben **en el momento del build**, no en runtime. Si se agregan después del deploy, el Studio muestra `"Configuration must contain projectId"` aunque las variables estén en el dashboard.
**Fix:** Agregar las variables → luego triggerear un nuevo deploy manual: Deploys → Trigger deploy → Deploy site.

### GitHub push en macOS
LibreSSL bloquea `git push` normal. Workaround:
```bash
GIT_SSL_NO_VERIFY=true git push origin main
```
Si el token expiró, actualizar el remote primero:
```bash
git remote set-url origin "https://Patozabalza:TOKEN@github.com/Patozabalza/claude-combo-studio-paint.git"
```
Tokens nuevos: github.com → Settings → Developer settings → Personal access tokens → Tokens (classic) → scope: `repo`.

### Sanity API tokens para scripts de seed
- Necesita rol **Editor** (read+write). Viewer = solo lectura. Deploy Studio = solo deploy.
- Endpoint mutaciones: `https://5nrvq646.api.sanity.io/v2024-01-01/data/mutate/production`
- IDs singleton: `siteSettings`, `siteHero`, `siteAbout`, `siteTestimonials`, `siteFAQ`, `sitePageText`

### Turbopack panic en dev (no afecta producción)
Turbopack muestra `FATAL: Failed to write app endpoint /cotizador/page` al tener Sanity instalado. El servidor sigue funcionando — ignorar esos mensajes. El build de producción funciona perfecto.

---

## 📝 Historial de cambios relevantes

### 2026-06-01
- ✅ Integración Sanity CMS (solo web de marketing, cotizador intacto)
- ✅ CMS renombrado de `/studio` a `/cms` para acceso del cliente
- ✅ Studio publicado en `combostudiopaint.com/cms`
- ✅ 6 documentos poblados via API (settings, hero, about, testimonials, faq, pageText)
- ✅ CORS configurado con Allow credentials en localhost:3000 y combostudiopaint.com
- ✅ `suppressHydrationWarning` en `<html>` (fix extensión LanguageTool)
- ✅ `page.tsx` convertido a Server Component con fetch de Sanity (revalida 60s)
- ✅ Fallback a `defaultTranslations` si Sanity no responde
- ✅ Variables de entorno Sanity agregadas en Netlify
- ⚠️ Netlify requiere redeploy DESPUÉS de agregar env vars (NEXT_PUBLIC_* se embeben en build)
- ✅ Studio registrado como host en sanity.io → proyecto 5nrvq646 → Studios → combostudiopaint.com
- ✅ CMS accesible en combostudiopaint.com/cms con login Google

### Para invitar colaboradores al CMS
sanity.io → proyecto 5nrvq646 → Members → Invite → email → rol Editor

### Sesiones anteriores
- Rediseños múltiples del AdSlide (v1→v6): full-bleed photo, gradiente left-to-right, footer 2 filas, solo WhatsApp en footer
- Footer: layout 2 columnas contacto elegante
- Ads: logo PNG en header, headlines más pequeños, teléfono sin wrapping
