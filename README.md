# Gratia: design samples

Four sample landing pages for **Gratia**, a made-up coffee roaster, one per design kit. Same brand, same copy, same sections on every page, so the only thing that differs is the design. Open each, pick one, then build the real site on it.

| # | Route | Kit | Feel | Signature |
|---|---|---|---|---|
| 1 | `/precision/` | Precision Studio | Calm, instrument-like | three.js wireframe bean, dark → cream → dark inversion, odometer counters |
| 2 | `/motion/` | Hobro-style motion agency | Cinematic, loud | thank-you preloader, custom cursor, draggable coffee strip |
| 3 | `/editorial/` | Editorial WebGL | Print art-director | visible 4-column grid, curtain intro, three.js halftone shader, Flip list/grid |
| 4 | `/sunny/` | Paput-style | Friendly, flat colour | pills, colour bands, tilted solid/outline marquee |

`/` is a picker with previews and a side-by-side comparison.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Node 22.23+ (Astro 7). Everything is static; host `dist/` anywhere. If you host under a sub-path, set `base` in `astro.config.mjs`.

## Everything is placeholder

Gratia is invented. **Every name, price, address, hour, number and quote is placeholder content** and must be replaced before anything ships. It all lives in one file, `src/content/gratia.ts`, which all four samples read.

There is no photography. Imagery is authored: SVG bean fields (`BeanField.astro`), flat sticker illustrations (`Sticker.astro`), an SVG roast curve and two three.js scenes. Swap in real photos when they exist.

The forms are visual mocks and send nothing.

## Layout

```
src/content/gratia.ts     shared copy for all four samples
src/pages/                index (picker) + one folder per sample
src/styles/               one stylesheet per sample (tokens at the top)
src/scripts/              one script per sample + shared helpers; three.js code is lazy-loaded
src/components/           BeanField, Sticker, Burst, Arrow, SampleSwitcher
PRODUCT.md                product context (Impeccable)
.impeccable/surfaces/     one direction brief per sample
```

## Behaviour you can rely on

- Content is visible without JavaScript; animation states are only applied when JS runs.
- `prefers-reduced-motion` skips intros and smooth scroll and shows final states (three.js renders one still frame).
- Intros play once per browser session. Add `?intro` to a sample's URL to replay.
- Checked with axe-core (WCAG 2.2 AA tags) on every page at 1440px and 390px: no violations. Text drawn over SVG patterns or WebGL could not be measured by axe and was checked by hand.

## After you choose

1. Delete the three unused samples (page, style, script) and `SampleSwitcher` from `Base.astro`.
2. Replace the placeholder content and imagery.
3. Run `/impeccable document` to write `DESIGN.md` for the chosen direction. It is deliberately not written yet.

## Fonts and licensing

Fonts are self-hosted from Fontsource (open licences). The kits name commercial faces they were modelled on; those are **not** included, and the free stand-ins are named in each stylesheet's `:root`. The kits were reverse-engineered from public sites: only structural tokens are reused, and none of those sites' names, copy, logos or photography appear here.
