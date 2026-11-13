---
version: 1
slug: "src-pages-editorial-index-astro"
primary_target: "src/pages/editorial/index.astro"
related_targets: ["src/styles/editorial.css","src/scripts/editorial.ts"]
---

# Surface: Editorial sample (/editorial/)

Scope and visitor mode: **Persuade**. Same brand, copy and sections as the other three samples.

Audience, job, action: as PRODUCT.md. Action: "Start a subscription"; cafés' hours in their own grid column.

Constraints: copy only from src/content/gratia.ts; GSAP (ScrollTrigger, SplitText, Flip) + Lenis + three.js (replaces the kit's Pixi). The WebGL canvas is atmosphere only: pointer-events none, never carries meaning. Content visible without JS; full prefers-reduced-motion branch (static shader frame).

Unresolved decisions:
- DESIGN.md deferred until a direction is chosen. Finish review was a self-review, not the independent reviewer.
- Hero scale: the kit's 15rem cap was written for a 13-character headline; "THANKS." is 7 characters, so it is set larger to fill the grid.
- No photography: plates are SVG bean fields (roast-stage contact sheet). Replace with real photography.

## Direction contract

THESIS: A print art-director's grid, running WebGL: the visible 4-column grid is the layout, and everything (nav, copy, plates, forms) snaps to it. Refuses the free-floating dark portfolio.
OWN-WORLD: Cool blue-black #15161b room, #d7d9dc text, one warm bone note #d7d5c6. Giant condensed Bebas Neue caps with tracking >=0.02em; small Figtree body; sharp-cornered plates with diagonal hatch; rule buttons (label between thin vertical rules); fixed exclusion-blend column lines; bottom-anchored dock whose links sit in their own columns.
STORY: The visitor reads Gratia as craft-led and typographic; sees roast stages as a contact sheet; flips the coffees between list and grid; subscribes at the foot under a giant GRATIA wordmark.
FIRST VIEWPORT: Four hairline columns. Small right-aligned "Coffee, with" over a monster "THANKS." that spans three columns; the lede and two rule buttons start at column three. A halftone shader glow with RGB fringing sits bottom right. Brand top left, Subscribe top right, dock along the bottom.
FORM: Editorial grid with curtain intro, WebGL canvas and Flip layout morph. seed: none (pinned) "grid-first, typographically-driven studio sites... visible multi-column grid overlay... fixed WebGL canvas behind the content" (editorial-webgl-kit SKILL.md, supplied by the user).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
