# Skill brand snapshot.

Paste this block into the brand sections of `launch-deck` and `launch-pitch` (and any future deck/artifact skill). It is a **derived copy** of the canonical design system — a convenience for generation time, not a source of truth. When the brand book changes, update this snapshot, then update the skills from it.

Keep the pointer line at the top of the pasted block so it's always clear where canonical lives.

---

```markdown
<!-- DERIVED FROM: launch-workshops/design-system/brand-book.md — do not edit values here.
     Canonical source of truth. If this disagrees with the brand book, the brand book wins.
     https://tamdanier.github.io/launch-workshops/design-system/ -->

## Launch brand — quick reference (derived)

**Color — accents.** Launch Blue `#1E5AF2` (CTA, dark-mode highlight) · Yellow `#FFCC2D`
(light-mode highlight) · Red `#FF1C52` (corrective only) · Lavender `#CED4FE` · Beige `#FFEFE3` ·
Coral `#FECED9`.

**Color — neutrals.** N1 `#111113` · N2 `#252424` · N3 `#77706F` · N4 `#908A89` ·
N5/Beige `#FFEFE3` · N6 `#FCF8F5` · N7 `#FFFFFF`.

**Type.** Print/PPTX: Avenir Next LT Pro (Demi for bold — never the Bold shortcut).
Web: Outfit. Scale — stat 64 · hero 44 · title 32 · section 24 · body 16 · eyebrow 13 (uppercase,
0.12em) · small 12 · caption 10.

**Modes.** Dark (N1/N2) for covers, section breaks, closings. Light (N6/N7) for content (default).
Sandwich: dark cover → light content → dark close. Highlight follows mode (Blue on dark, Yellow on light).

**Treatments.** Geometric path motif (cover/section background, accent squares) · big-stat observation ·
outcome metric row · phased timeline · question → next-steps per-stakeholder sequence · card with
left accent stripe (yellow=workshop, blue=deck, red=corrective). Full specs in the brand book.

**Voice.** Sentence case · periods after headlines · em dashes · no exclamation points ·
no filler (leverage, synergies, holistic, robust, world-class).
```

---

## Where to paste

- `launch-deck/SKILL.md` — replace the inline "Color Palette" / "Typography" tables with this block (or place it above them and mark the tables as derived). Note the documented hex is canonical; the Starter Template theme carries a drifted variant (`#1D5AF1` / `#FFC900` / `#FF004B`) corrected at next template touch.
- `launch-pitch/SKILL.md` — add under the brand/layout reference.
- Any new artifact-generation skill — paste at the top of its brand section.
