---
name: Gratia Sourcing
description: A time-and-action order board for a home-goods buying house. Steel ground, matte-black flaps, amber lamps.
colors:
  steel: "#d4d7d9"
  steel-hi: "#e5e7e8"
  steel-lo: "#b7bbbe"
  steel-rule: "#9ea3a7"
  ink: "#121417"
  ink-2: "#363c43"
  flap: "#0f1113"
  flap-2: "#191c1f"
  flap-3: "#23272b"
  flap-ink: "#f2f2ee"
  flap-dim: "#b6bcc2"
  amber: "#ffb400"
  amber-deep: "#8a5d00"
  hold-red: "#ff7a66"
  flap-line: "#000000"
  amber-hover: "#ffc633"
  error-red: "#8a1c10"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(3.1rem, 9vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(2.2rem, 5.4vw, 3.9rem)"
    fontWeight: 700
    lineHeight: 0.96
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)"
    fontWeight: 700
    lineHeight: 1.05
  body:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  flap:
    fontFamily: "Barlow Condensed, Arial Narrow, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0"
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  sm: "2px"
  md: "3px"
  board: "6px"
  hairline: "1px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "72px"
  xxl: "112px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.flap}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#ffc633"
  board:
    backgroundColor: "{colors.flap}"
    textColor: "{colors.flap-ink}"
    rounded: "{rounded.board}"
  field:
    backgroundColor: "{colors.steel-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "48px"
---

# Design System: Gratia Sourcing

## Overview

**Creative North Star: "The Order Board"**

A buying house sells control, so the site is built as the thing a buyer wants to see: a time-and-action board. Rows are live orders, columns never move, only the flaps do, and every order must clear a signed gate before the next. It borrows the rail-concourse split-flap board's discipline (fixed columns, rows as entities, change as a cascade) and fuses it with the real buying-house calendar of gated milestones (material approval gates bulk purchase, pre-production sample gates bulk cut, bulk cut gates ex-factory).

The ground is a light brushed steel because the audience works in daylight at a desk. Boards and the gates section are matte black. Amber is the lamp: the gate in progress and the one primary action. All other colour comes from the goods themselves, in authored fabric, wood, rattan, brass and glaze swatches.

**Key Characteristics:**
- Fixed-column ruled rows, split-line flap cells, eight gate lamps
- Light steel ground, black board fields, amber used sparingly
- Colour from materials, never from chrome
- One authored motion: the flap cascade, plus a slow live row advance with a pause control
- Plain trade English; invented facts labelled SAMPLE DATA or placeholder

## Colors

A restrained palette on steel with committed black fields; the swatches carry saturated colour.

### Primary
- **Gate Lamp Amber** (#ffb400): The lit lamp. Primary button fill, the current-gate lamp, gate codes on black, board tags. Rare on steel, never body text.

### Neutral
- **Brushed Steel** (#d4d7d9): Page ground. Tinted cool, never white. **Steel Rule** (#9ea3a7) for hairlines and dividers, **Steel Low** (#b7bbbe) for board frames.
- **Gauge Ink** (#121417): Text on steel. **Ink Two** (#363c43): secondary text on steel (contrast above 7:1).
- **Matte Flap** (#0f1113), **Flap Two** (#191c1f), **Flap Three** (#23272b): board field, character cell, ruled lines.
- **Flap Ink** (#f2f2ee) and **Flap Dim** (#b6bcc2): text on black.
- **Hold Red** (#ff7a66): only the HOLD status, always paired with a square marker and the word. **Flap Line** (#000000) is the split line and row rule inside boards. **Amber Hover** (#ffc633) is the button hover. **Error Red** (#8a1c10) is form errors on steel only.

### Named Rules
**The One Lamp Rule.** Amber marks exactly two things: the gate in progress and the action to take. If everything glows, nothing is in progress.
**The Material Colour Rule.** Hue beyond steel, black and amber comes from a swatch of real goods. Never fill a surface with decorative colour.

## Typography

**Display and Flap Font:** Barlow Condensed (600 and 700), self-hosted via Fontsource, fallback Arial Narrow.
**Body Font:** Hanken Grotesk Variable.

**Character:** Condensed transit-signage capitals for everything that is announced; a calm humanist grotesque for everything that is read.

### Hierarchy
- **Display** (700, clamp 3.1 to 6rem, 0.96): Home headline only, two lines.
- **Headline** (700, clamp 2.2 to 3.9rem): Section heads, uppercase, max 13em wide.
- **Title** (700, 1.4 to 1.8rem): Gate names, category names, buttons.
- **Body** (400, 17px, 1.6): Reading text, capped at 68ch.
- **Flap** (600, 1.25rem, uppercase, tabular numerals): Board cells, one box per character.
- **Label** (600, 0.95rem, 0.16em, uppercase): Table heads, field labels, "Signed by".
- **Supporting steps** (rem): 0.8125 to 0.9 for footnotes and helper text; 1 to 1.15 for dense body and small buttons; 1.3 to 1.6 for lede, FAQ questions and board titles; 2 to 2.6 for gate codes and row titles. Display and inner-page heads scale fluidly with `clamp`.

### Named Rules
**The Announce/Read Rule.** Condensed caps announce (status, gate, date). Grotesque reads (explanation). Never set a paragraph in the condensed face.

## Layout

A 1320px max container with a fluid gutter (16 to 48px). Sections alternate between steel and black fields with generous vertical rhythm (72 to 112px above, tighter below). Heading-and-lede rows pair a thirteen-em headline with a 46ch lede. Inner pages open with a quieter head (max 4.75rem). The goods patchwork is a 12-column grid of unequal patches with no gaps in the pattern; it collapses to 2 columns under 760px. The board collapses under 560px from a six-column table into stacked rows (goods, then gate and status), keeping the same data. Breakpoints in use: 960 (nav to menu), 860, 760, 560.

## Elevation & Depth

Flat. Depth is carried by frames and tone, not shadow: boards sit in a steel border (8px) with a hairline outline, rows are ruled by a black line over a one-pixel lighter line. The only transform is a 1px lift on buttons and a 1.04 scale on patch swatches. No box shadows, blur or glass.

## Shapes

Square and ruled. Radius 2 to 3px on cells, buttons, chips and patches; 6px on the board frame. The dashed amber rule over a patch caption is the "stitch" borrowed from patchwork. Flap cells carry a one-pixel split line at mid-height.

## Components

### Buttons
- **Shape:** 3px radius, 2px ink border (amber border on black), 48px tall (44px small).
- **Primary:** Amber fill, flap-black condensed caps, 0.08em tracking, 24px side padding.
- **Hover / Focus:** Lighter amber and a 1px lift; focus is a 3px ink ring (amber on black), offset 3px.
- **Secondary:** Underlined condensed caps link, 2px underline offset 0.3em.

### Order board (signature)
Black field in a steel frame. Header strip with title, SAMPLE DATA tag and a pause control; fixed-column table (PO, goods with swatch chip, origin hub, gate, ex-factory, status). Gate cell shows the gate name and eight lamps: signed gates amber, current gate pulsing slowly, future gates dark. Status is word plus marker: ON TIME white dot, WATCH amber dot, HOLD red square. Text is real DOM text; characters are wrapped for the cascade and hidden from assistive tech behind a visually hidden copy.

### Goods patch
Authored SVG swatch filling the patch, black caption bar with a 2px dashed amber top rule, condensed name and a one-line item list.

### Gate row
Gate code in amber, lamp strip, name and sentence, then Signed by and Unlocks columns, ruled on black.

### Inputs / Fields
- **Style:** 48px, 2px ink border, steel-hi fill, 3px radius, labels above in label style.
- **Focus:** 3px amber-deep ring, offset 2px.
- **Error:** inline message below the field in a dark red (#8a1c10), field border red, focus moved to the first invalid field.

### Navigation
Sticky steel bar with flap-cell wordmark, condensed caps links, current page marked by a 3px ink underline, and a primary button. Under 960px the links move into a details menu.

## Do's and Don'ts

### Do:
- **Do** keep columns fixed and let only the characters move.
- **Do** pair every status colour with a word and a distinct marker shape.
- **Do** label invented orders, dates and figures as SAMPLE DATA or placeholder.
- **Do** colour a surface only with material swatches, amber, black or steel.
- **Do** pause or stop any auto-updating board for users who ask, and start paused under reduced motion.

### Don't:
- **Don't** use amber for decoration, links or body text.
- **Don't** add shadows, blur, gradients or glass.
- **Don't** replace the swatches with stock photography of factories or container ships.
- **Don't** invent client names, certifications or testimonials; leave a labelled placeholder.
- **Don't** set paragraphs in Barlow Condensed.
