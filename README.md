# Gratia Sourcing

Marketing site for **Gratia Sourcing**, a buying house that sources home textiles and home hard goods in India for overseas brands and retailers. Built as a time-and-action order board: fixed columns, rows as live orders, flaps that cascade as an order clears a signed gate.

Design context lives in `PRODUCT.md` (who and why), `DESIGN.md` (tokens and rules) and `.impeccable/` (sidecar and direction brief).

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Node 22.23+. Astro static output; host `dist/` anywhere. Set `site` (and `base` if under a sub-path) in `astro.config.mjs`.

## Deploy on Vercel

The site is plain static output, so Vercel needs no adapter or config file.

1. In Vercel: **Add New, Project**, import this GitHub repo.
2. Framework preset is detected as **Astro** (build `npm run build`, output `dist`). Under *Settings, General, Node.js Version* choose **22.x** (the project needs Node 22.23 or newer).
3. Deploy. Every push to `main` redeploys; other branches get preview URLs.
4. For a custom domain: *Settings, Domains*, add it (a subdomain such as `gratia.example.com` is a single CNAME record), then set `site` in `astro.config.mjs` to that URL.

Do not host this under a sub-path of another site (for example `yourdomain.com/gratia/`) unless you set `base` in `astro.config.mjs`; all internal links go through `withBase()` so that works, but the root is simplest.

GitHub Pages is not used: if Pages is enabled on the repo with the "Deploy from a branch" source, GitHub tries to build it as Jekyll and fails. Turn Pages off in **Settings, Pages** (or set Source to GitHub Actions with no workflow).

## Pages

`/` home · `/services/` · `/how-we-work/` (gate calendar calculator) · `/products/` · `/sustainability/` (compliance) · `/about/` · `/contact/` · `/404`

## Everything factual is placeholder

No real facts were supplied. All copy and data live in **`src/content/site.ts`**; swap them there. Turn off the "Draft site" strip with `draftNotice: false`.

Replace before launch:

| What | Where | Note |
|---|---|---|
| Email, phone, address, hours | `site` | all invented (`.example` email) |
| Sample orders on the board | `orders` | shown with a SAMPLE DATA label; use real examples or remove |
| Gate lead times (T-110 to T-0) | `gates[].offset` | planning placeholders |
| Category MOQs, lead times, hubs, materials | `categories` | generic ranges; confirm each |
| Certifications and standards | `standards`, `commitments` | the site only claims *checking suppliers'* certificates; confirm whether Gratia itself holds any |
| Company story, team roles, FAQ answers | `about`, `faqs` | written as plausible placeholders |
| Positioning | `PRODUCT.md` | the differentiator is an open decision |

Not invented on purpose: client names, testimonials, headcounts, years in business, and photographs.

## Imagery

No photography exists. Material swatches are authored SVG (`src/components/Swatch.astro`, drawn for this project, no third-party assets). Swap for real product photography when available.

## Forms

The sourcing-brief form validates and shows an on-page notice but **sends nothing**. Connect an endpoint (Formspree, Netlify Forms, your own API) in `src/pages/contact.astro` before launch.

## Behaviour

- Content is visible without JavaScript; the board and calendar enhance it.
- `prefers-reduced-motion`: no cascade, and the live board starts paused.
- The live board has a pause control and also holds while hovered or focused.
- axe-core (WCAG 2.2 AA tags): 0 violations on every page at 390 and 1440 px. Checked by hand at 375, 768, 1024, 1280, 1920 px for horizontal overflow.

## Fonts

Self-hosted via Fontsource (open licences): Barlow Condensed, Hanken Grotesk.
