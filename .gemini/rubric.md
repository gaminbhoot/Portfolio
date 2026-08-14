# Antigravity Review Rubric — bencodes.de Exact Replica

Scored 1–5 per criterion. Evidence files listed. Run via `npm run review:antigravity` or `npm run review:gemini`.

## Criteria

| # | Criterion | 1 (fail) | 3 (ok) | 5 (perfect) | Evidence |
|---|-----------|----------|--------|-------------|----------|
| 1 | Visual Design | IDE density, no bencodes parity | Minimal but not pixel-close | Exact bencodes: sticky nav 64px, hero 48/52, `lg:3` cards `rounded-2xl border`, skills pills `rounded-full`, `Inter` fluid | Screenshot vs `https://bencodes.de` + `src/pages/MinimalHome.jsx` + `src/components/MinimalLayout.jsx` |
| 2 | IA | Multi-route IDE (11 routes) | Single scroll but extra routes | Single page only: `/` + hidden `/epoxy`/`/boost`/`/:token` (no nav/sitemap) | `src/app.jsx` routes + `public/sitemap.xml` single URL |
| 3 | Motion | GSAP timelines, jank on low-tier | CSS only but duplicated | CSS `transition 200ms` only, `prefers-reduced-motion` disables, no `will-change` forever | `src/index.css` + `src/pages/MinimalHome.jsx` (no `gsap`/`framer` on hero) |
| 4 | Performance | `197+172+125kB` before gzip, `vendor-three 1B` | Single chunk but hero not preloaded | Bundle Health ≥90/100 A, JS <250KB gz, CSS <40KB, `vendor-three` gone, hero `preload fetchpriority=high` + `width`/`height` | `dist/assets/*` gz sizes + `index.html` preload + `python scripts/bundle_analyzer.py` |
| 5 | SEO | Single OG, missing tags, `relative og:image` | Per-`/` absolute OG but duplicate preconnect | Per-`/` distinct `title`/`description`/`og:image` absolute + `og:image:width/height` + `canonical` + JSON-LD `Person` + correct viewport | `index.html` + `src/lib/usePageMeta.js` + `curl -s https://jayjoshi.online/ | grep og:` |
| 6 | A11y | `user-scalable=no` or `cursor:none` + hidden scrollbar | Native cursor but missing labels | Native cursor/scroll, `skip-link`, `color-scheme`, `4.5:1` contrast, `aria-hidden` on hidden canvas, `aria-expanded` on mobile nav | Axe + keyboard tab + `src/index.css` + `src/components/MinimalLayout.jsx` |
| 7 | Maintainability | 2044L `IdeLayout` + 8 themes + 3 canvases | Branched but `IdeLayout` still imported | `MinimalLayout ~120L`, 1–2 themes (design tokens `design-tokens.css`), ~300L layout, dead code `Dock`/`GlassSurface`/`ColorBends` deleted or not imported | `src/components/MinimalLayout.jsx` LOC + `vite.config.js` `manualChunks` |

## Guardrails (must not regress)

- `og:image` 404 rate = 0
- Axe violations = 0
- `LCP <2.5s`, `CLS <0.1` on Lighthouse mobile
- No `*.tmp` / `.DS_Store` in `dist` or `public`

## How to run

- `npm run build && npm run review:antigravity` → `reports/antigravity-review.json`
- `npm run review:gemini` (alias, same rubric) → `reports/gemini-review.json`
- Manual: compare `feat/bencodes-type` branch preview vs `https://bencodes.de` side-by-side at 375/768/1440
