---
version: 1
slug: "src-pages-sunny-index-astro"
primary_target: "src/pages/sunny/index.astro"
related_targets: ["src/styles/sunny.css","src/scripts/sunny.ts"]
---

# Surface: Sunny sample (/sunny/)

Scope and visitor mode: **Persuade**. Same brand, copy and sections as the other three samples.

Audience, job, action: as PRODUCT.md. Action: "Start a subscription"; cafés and hours shown as the headline fact of their section.

Constraints: copy only from src/content/gratia.ts; GSAP kept light (entrance + soft reveals); no smooth-scroll library, per kit. Content visible without JS; full prefers-reduced-motion branch. No cookie banner or emoji (the kit's one emoji lives in a cookie banner a sample page does not need).

Unresolved decisions:
- DESIGN.md deferred until a direction is chosen. Finish review was a self-review, not the independent reviewer.
- Palette is adapted as the kit recommends (two other saturated hues): cobalt #1d2f8a, sun #ffc62d, tomato #c9301a on cream #f7f0e1. Confirm with the real brand colours.
- The kit's cream ground is pinned; the detector flags it as the cream-palette default.
- No photography: flat SVG sticker illustrations (bag, cup). The genre wants glossy cut-out photos of the real product.

## Direction contract

THESIS: A beach-bar confidence applied to coffee: big flat colour, huge heavy capitals, pill-shaped everything, no hurry. Refuses minimal, shadowed, gradient "premium coffee".
OWN-WORLD: Stack of flat colour bands: cream navbar and body, cobalt hero and footer, sun-yellow figures, menu and wholesale bands, ONE tomato order band. Archivo 900 capitals, Young Serif for the tilted solid/outline marquee, 100px pills, 20-25px radii. No shadows, no gradients. Single-colour sticker illustrations.
STORY: The visitor smiles, sees four coffees as bright bags, finds the nearest café's hours, and subscribes from the hot band.
FIRST VIEWPORT: Cobalt field with tone-on-tone bean pattern; centred cream "COFFEE, WITH THANKS." stacked three lines at ~150px; lede; yellow primary pill and an outlined secondary; a yellow bag lower left and a red cup upper right, both tilted.
FORM: Pill-and-band beach-bar page; hover inversion in 0.3s; rotated outline marquee. seed: none (pinned) "Design and build in the Paput Menorca brand... pill-shaped buttons and fields... rotated marquee" (paput-menorca-kit SKILL.md, supplied by the user).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
