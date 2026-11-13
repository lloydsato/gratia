---
version: 1
slug: "src-pages-precision-index-astro"
primary_target: "src/pages/precision/index.astro"
related_targets: ["src/styles/precision.css","src/scripts/precision.ts"]
---

# Surface: Precision sample (/precision/)

Scope and visitor mode: **Persuade**. One landing page; the visitor decides whether to subscribe to a coffee roaster. One of four sample directions for the same placeholder brand (see PRODUCT.md); the user chooses between them.

Audience, job, action: home-brew coffee buyers; the action is "Start a subscription" (also visible: opening hours of three cafés). Proof available: none real. All numbers, prices and the roast curve are invented placeholder data, labelled as such where a visitor could mistake them.

Constraints: copy comes only from src/content/gratia.ts. Static Astro, GSAP + Lenis + three.js. Content visible without JS. Full prefers-reduced-motion branch.

Unresolved decisions:
- DESIGN.md is deliberately NOT written yet. It documents a chosen world; four samples exist and one will be picked. Run `/impeccable document` on the winner.
- The finish review was a self-review against this contract, not the independent fresh-context reviewer the skill specifies (that agent type was unavailable in this environment).
- No photography: imagery is authored (three.js wireframe bean, SVG bean fields, SVG roast curve). Replace with real photography when it exists.

## Direction contract

THESIS: A coffee roaster presented as a precision instrument: calm, spacious, almost empty, with a few exactly-placed marks. Refuses the warm-brown, cosy coffee-shop page.
OWN-WORLD: Near-black #040508 hero and close, warm cream #e6e4e2 body that the whole document crossfades into on scroll. Ultralight serif display, neutral grotesk body, mono only for measurements. Soft 1.5rem radii, pill buttons, glass chip, corner "+" registration marks, hairline rules. No chromatic accent except one small amber status dot.
STORY: The visitor understands that Gratia roasts small batches by the curve, believes it because the roast profile and live batch readout are shown working, and acts by subscribing or finding a café's hours.
FIRST VIEWPORT: Left: "Coffee, with thanks." in ultralight serif at ~8rem, with the primary pill and a text link beneath. Right: a rotating three.js wireframe coffee bean with a bright S-shaped crease, ringed by faint orbit lines. Bottom left: a glass "sample batch" readout (bean temp, elapsed, stage) that walks the placeholder roast curve. Bottom right: the lede.
FORM: Dark to light to dark inversion with a wireframe-object centrepiece; kit pin. Position n/a, seed: none (pinned) "Build calm, precision-instrument studio websites in the trionn.com mould" (precision-studio-kit SKILL.md, supplied by the user).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
