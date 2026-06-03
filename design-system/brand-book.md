# Launch by NTT DATA — brand book.

The canonical style guide for all Launch artifacts: decks, dashboards, workshop tools, and the platform itself.

**This is the source of truth.** Where any skill, repo, or theme disagrees with this document, this document wins. Machine-readable companions live alongside: [`v1/tokens.css`](v1/tokens.css) and [`v1/tokens.json`](v1/tokens.json).

**Version:** 1.0 · **Owner:** Tam Danier · **Updated:** 2026-06-03

---

## How to use this.

| You are… | Consume the brand via… |
|---|---|
| A workshop dashboard | `tokens.css` custom properties |
| The Slidev deck theme (`pitch`) | `tokens.css` values, mirrored in `themes/launch/styles/index.css` |
| The signal app | Generate `tailwind.config.ts` colors from `tokens.json` |
| A Claude skill (`launch-deck`, `launch-pitch`) | The synced snapshot in the skill, labeled "derived from brand-book.md" |
| A PowerPoint deck | The `launch-deck` skill + Starter Template (Avenir Next LT Pro) |

Never redefine a hex value inline. If you need a color that isn't here, it goes through the change process below — it does not get invented in a stylesheet.

---

## Color.

Use only these colors. Never invent new ones.

### Accents

| Name | Hex | Usage |
|---|---|---|
| Launch Blue | `#1E5AF2` | Primary CTA, highlights on dark mode |
| Blue dim | `#1749CC` | Blue hover / pressed |
| Blue light | `#E8EFFE` | Blue tint — backgrounds, fills |
| Lavender | `#CED4FE` | Supporting accent, light blue tone |
| Launch Yellow | `#FFCC2D` | Highlights on light mode, strong accents |
| Yellow dim | `#E6B800` | Yellow hover / pressed |
| Beige | `#FFEFE3` | Soft highlights on light mode (= N5) |
| Red | `#FF1C52` | Corrective / warning connotations only |
| Coral | `#FECED9` | Soft red tone, supporting |

### Neutrals

| Name | Hex | Usage |
|---|---|---|
| N1 | `#111113` | Dark mode background (primary) |
| N2 | `#252424` | Dark mode background (secondary) |
| N3 | `#77706F` | Muted / supporting text |
| N4 | `#908A89` | Lighter muted text |
| N5 | `#FFEFE3` | Light mode background / card (= Beige) |
| N6 | `#FCF8F5` | Light mode background (primary) |
| N7 | `#FFFFFF` | White — pure light mode or cards |
| Border | `#E8E3DF` | Light mode hairline |
| Border dark | `#333130` | Dark mode hairline |

> **N3 is `#77706F`.** A `#76706F` variant drifted into one stylesheet — it is wrong. This value is canonical.

---

## Typography.

**Print / PPTX:** Avenir Next LT Pro, all weights. Use the **Demi** weight for bold — never the Bold shortcut.

**Web:** Avenir is licensed and does not render in browsers. The canonical web typeface is **Outfit** — geometric, close to Avenir's character, used across the Slidev deck theme. Full stack:

```
'Outfit', 'Avenir Next LT Pro', 'Avenir Next', 'Inter', system-ui, sans-serif
```

> One web typeface. Outfit. Earlier builds used DM Sans and Inter independently — those are superseded. New work uses Outfit; existing work aligns at next touch.

### Scale

| Element | Size | Weight |
|---|---|---|
| Hero stat / big number | 64px (64pt print) | 600 / Demi |
| Cover / big statement | 44px (44pt print) | 600 / Demi |
| Slide / page title | 32px | 600 / Demi |
| Section header | 24px | 600 / Demi |
| Body | 16px | 400 |
| Eyebrow (uppercase, 0.12em tracking) | 13px | 600 |
| Small label | 12px | 400 |
| Caption / footnote | 10px | 400 |

---

## Light mode and dark mode.

Both modes are first-class. Every web artifact ships a dark-mode token set and a toggle.

| Mode | When |
|---|---|
| **Dark** (N1 / N2 bg) | Covers, section breaks, closing slides, high-impact statements |
| **Light** (N6 / N7 bg) | Most interior content, workshop dashboards, the platform homepage (default) |

Decks use the sandwich: dark cover → light content → dark closing. Highlight color follows the mode — Launch Blue on dark, Yellow or Beige on light.

---

## Structure and shape.

These conventions come from the workshop dashboards and platform, and apply to all web surfaces.

| Token | Value | Use |
|---|---|---|
| Radius — sm | 5px | Tags, badges, chips |
| Radius — md | 7px | Buttons, inputs |
| Radius — lg | 12px | Cards, stat tiles |
| Radius — xl | 16px | Shells, panels |
| Hairline border | 0.5px | Card and panel edges |
| Accent stripe | 3px | Left edge of cards |

**Accent stripe color carries meaning:** yellow = workshop, blue = deck/presentation, red = corrective.

---

## Design treatments.

Reusable visual patterns, beyond raw tokens. This section grows as patterns prove out across artifacts.

### Card with left accent stripe
A 3px colored stripe on the card's left edge, color-coded by type. White (N7) or N2 card surface, 0.5px border, 12–14px radius. Used on the platform homepage and workshop cards.

### Stat tile
White card, 3px top-or-left accent stripe, uppercase 10–11px label, large tabular-nums value. Used for live tallies and summary counts.

### Eyebrow → headline → sub
The standard heading stack: uppercase blue eyebrow (Launch by NTT DATA), then a sentence-case headline with a period, then muted supporting line. Opens every shell.

### Recommendation callout
Left blue border (3px), beige fill, uppercase blue label. Used to surface a default or recommended option inside a decision flow.

### Geometric path motif
The cover and section-break background device. Interlocking rounded-rectangle "circuit" path shapes in N1 (`#111113`) on a near-black field, with two accent squares — one Launch Yellow, one Launch Blue — placed at path terminals. Title sits in N7 over the motif, sentence case, with the L-mark bottom-right. Dark mode only. Use on covers, section breaks, and the closing slide — never behind body content.

### Big-stat observation
An observation slide built around one oversized number. Structure: uppercase section eyebrow → hero stat at the `stat` scale (64px / Demi) → a single framing sentence. The number carries the weight; the sentence gives it meaning. Example: "$1B Target" over "A $1B target and you own a piece of it." Highlight the stat in Yellow (light mode) or Blue (dark mode).

### Outcome metric row
A horizontal 4-up row of proof metrics, used for case-study results. Each cell: large tabular-nums number (Demi) + a short lowercase label beneath. Example: "240+ releases per year · 80% faster collection cycles · 28 internal teams coached · 6wk launch intervals." Equal-width cells, hairline dividers optional. Distinct from the stat tile (a single boxed metric) — this is an unboxed row reading as one proof bar.

### Phased timeline
A horizontal progression for time-boxed engagements. Phases as equal segments left to right, each with a phase label, a week range, and a short scope line — e.g. "Phase 1 (Week 1–4) … Phase 2 (Week 5–10) … Phase 3 (Week 11–12)." Accent the entry or active phase in Blue. Used for pilots and staged plans (the 90-day pilot is the reference).

### Question → next steps sequence
A paired, per-stakeholder pre-sales pattern. A **"what we'd like to know"** slide poses the open questions for one named stakeholder, followed immediately by a **"next steps"** slide addressed to that same person with concrete, time-bound actions ("Within the next week…"). Repeat the pair per stakeholder. Both carry the uppercase section eyebrow; the next-steps slide names the individual. This is the signature Launch close — it turns a pitch into a working agenda.

> **Adding more treatments:** document each here with a name, a description, and the tokens it uses — then add to `tokens.css` if it introduces a reusable value. See the change process below.

---

## Palette provenance note.

The Launch PowerPoint theme (Starter Template, HPI deck) carries slightly different hex than the values in this book — Blue `#1D5AF1`, Yellow `#FFC900`, Red `#FF004B`. **The documented values here are canonical** (`#1E5AF2`, `#FFCC2D`, `#FF1C52`); the PPTX theme is the drifted copy and is corrected at next template touch. If a future audit of the original designer source proves the PPTX values authoritative, that change goes through the version process — it is not applied piecemeal.

Two QA notes from the HPI deck, logged so they are not mistaken for brand: pure magenta `#FF40FF` and green `#00FA00` placeholder fills remain on some slides (off-brand, meant to be replaced), and the slide-21 appendix diagram uses a foreign palette. Neither is a Launch treatment.

---

## Voice.

Visual identity and verbal identity travel together. Full rules live in the `launch-voice` skill. The essentials:

- Sentence case — no Title Case in headings or labels
- Periods after standalone headlines and section titles
- Em dashes for pause — not hyphens
- No exclamation points
- Cut consultant filler: leverage, synergies, holistic, robust, world-class

---

## Changing the design system.

This document is canonical, so changes are deliberate.

1. **Propose** — describe the change and why. New treatments name the artifact they came from.
2. **Decide** — additive changes (new token, new treatment) land in the current version. Breaking changes (a hex value changes, a token is removed) trigger a new version directory (`v2/`) so existing artifacts pinned to `v1/` keep working.
3. **Codify** — update `brand-book.md`, then `tokens.css` and `tokens.json` together.
4. **Propagate** — update the derived snapshots in the skills; align `pitch` and `signal` at next touch.

Versioning is in the directory, not the filename. Artifacts pin to a version: `design-system/v1/tokens.css`.
