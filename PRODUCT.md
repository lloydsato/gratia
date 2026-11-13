# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output), GSAP (ScrollTrigger, SplitText, Flip), three.js, Lenis for smooth scroll where a kit calls for it, self-hosted Fontsource fonts. Chosen by the user, replacing the kits' plain-HTML default.

## Users

Coffee drinkers who buy whole-bean coffee online for home brewing and who also walk into the roaster's cafés. They land from a link or a search, decide in seconds whether this is a roaster worth ordering from, and want a bag on the way within two days.

## Product Purpose

Gratia is a **fictional placeholder brand**, invented by the assistant at the user's request ("Invent a placeholder for me"). This repository's job is to show the real Gratia owner four design directions on one shared brief so they can select one. Success is a clear, fair comparison: same brand, same copy, same sections, four visual worlds.

The placeholder brand is a small-batch coffee roastery that sells beans online by subscription and one-off bag, runs three cafés and supplies a few wholesale accounts.

## Positioning

Gratia is "coffee, with thanks": the name is Latin for gratitude, and the thank-you, said in many languages, is the brand's one recurring device. Roasting is small and slow, and the page should feel like it was made by people who care about the details.

## Operating Context

- Beans are roasted weekly in 12 kg batches and shipped within 48 hours of roasting.
- Four coffees are on sale at any time: three single origins and one house espresso blend.
- Three cafés, each with posted opening hours.
- A subscription is the primary action; a one-off bag is the secondary one.

## Capabilities and Constraints

- Landing page only. No cart, checkout, accounts or CMS exist; every form is a visual mock and submits nowhere.
- All four samples share one content module (`src/content/gratia.ts`) so differences between them are design, not copy.
- Static pages, no server. Must work with JavaScript disabled (content visible by default) and with `prefers-reduced-motion`.
- No photography exists. Imagery is authored (SVG bean fields, a three.js wireframe bean, a WebGL shader field) and is labelled as placeholder.

## Brand Commitments

None yet. The name "Gratia" comes from the repository name; everything else about the brand is placeholder.

## Evidence on Hand

None. There are no real customers, reviews, prices, addresses, certifications or photographs. **Every number, price, address, origin detail and quote in the samples is invented placeholder content and must be replaced before anything ships.** Do not present any of it as fact.

## Product Principles

1. Same brief, four worlds: never let copy or structure differences decide the comparison.
2. Opening hours and the primary action are findable within seconds on every sample.
3. Motion is the genre where a kit calls for it, and never the only way to read the page.
4. Placeholder content is labelled as placeholder wherever a visitor could take it for real.

## Accessibility & Inclusion

WCAG 2.1 AA contrast on every ground a kit uses, visible keyboard focus, 44px touch targets, full `prefers-reduced-motion` branch, semantic HTML under the animation.
