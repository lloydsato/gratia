---
version: 1
slug: "src-pages-motion-index-astro"
primary_target: "src/pages/motion/index.astro"
related_targets: ["src/styles/motion.css","src/scripts/motion.ts"]
---

# Surface: Motion sample (/motion/)

Scope and visitor mode: **Persuade**. Same brand, copy and sections as the other three samples.

Audience, job, action: as PRODUCT.md. Action: "Start a subscription"; hours findable in the cafés list. No real proof: all content is placeholder.

Constraints: copy only from src/content/gratia.ts; GSAP (ScrollTrigger, SplitText, Draggable, Inertia) + Lenis. Custom cursor and magnetic buttons only on fine pointers and only after the first mouse move. Content visible without JS; full prefers-reduced-motion branch.

Unresolved decisions:
- DESIGN.md deferred until a direction is chosen. Finish review was a self-review, not the independent reviewer.
- Kit pins an all-caps mono statement (146 characters); kept as the genre's signature but flagged by the detector as all-caps body text.
- No photography: plates are duotone SVG bean fields. Replace with real product photography.

## Direction contract

THESIS: A cinematic, motion-first agency page for a coffee roaster: scale, contrast and choreography do the selling. Refuses the tidy product-grid page.
OWN-WORLD: True black, white, one crema-orange accent (#ff6b2c) on under 5% of any screen (cursor dot, selection, hovers, one bean). Heavy uppercase Archivo display with tight negative leading; outlined italic serif (Bodoni Moda) for the emotional word; mono uppercase labels. Sharp-cornered plates, pill CTAs, radiating burst glyph, film grain.
STORY: The visitor feels a considered, high-craft brand; learns the four coffees by dragging through them; subscribes from the closing CTA.
FIRST VIEWPORT: Bottom-anchored "COFFEE, WITH" in huge uppercase over outlined italic "thanks."; a thin radiating burst top right; lede and two CTAs at bottom right; a mono meta row on a hairline at the foot.
FORM: Awwwards-style motion-agency page with a thank-you-cycling preloader and a draggable coffee filmstrip. seed: none (pinned) "Build motion-first, cinematic agency/studio/portfolio websites... GSAP + Lenis" (hobro-style-kit SKILL.md, supplied by the user).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
