# Deck authoring schema.

The contract for turning a markdown content document into a Launch-branded Slidev deck. This is the spec the **`launch-pitch`** skill follows when Claude transforms an SA's content into a deck that uses the full design system.

**Pipeline:** source markdown → `content/[name].md` (RAW blocks) → `convert.ts` → `decks/[name]/slides.md` → `slidev build` → deck on GitHub Pages.

**Design system:** all visual rules come from [`../design-system/brand-book.md`](../design-system/brand-book.md). Diagrams from [`../design-system/diagram-style-guide.md`](../design-system/diagram-style-guide.md). Never invent colors, fonts, or layouts not defined there.

---

## Part 1 — The source document.

What an SA (or Claude in chat) writes. Human-friendly: headers, body, footer, and directives for diagrams and images. Claude Code transforms each slide block into the correct RAW block.

### Document header (once, at top)

```markdown
---
deck: hpi                                  # kebab folder name
client: HP Inc × Launch by NTT DATA        # appears on cover + eyebrows
title: Accelerating AI-powered growth      # cover headline if not given per-slide
audience: Boivin · Gawlik · Micolon        # who's in the room
status: internal-review                    # internal-review | client-ready
sensitivity: standard                      # standard | sensitive (see images)
---
```

### Slide block (repeat per slide)

```markdown
## [SECTION EYEBROW] {layout: auto}
# Headline goes here.
Body — prose, or "- " bullets, or **bold lead.** sentences.

> footer: optional one-line footer
> diagram: flow — Assess → Pilot → Scale; highlight Pilot
> image: inline alt="WXP telemetry dashboard" src="assets/wxp.png"
> note: speaker or build note — never rendered on the slide
```

**Rules for the source:**
- `##` line = section eyebrow + optional `{layout: ...}` directive. `auto` (or omitted) means Claude selects the layout from the catalog in Part 2.
- `#` = the slide headline. Sentence case, period at end (Launch voice).
- Body is plain markdown. `**bold.**` for lead-ins, `- ` for lists.
- `>` directives are typed instructions, one per line: `footer:`, `diagram:`, `image:`, `note:`, plus layout-specific keys (e.g. `cta:`, `weeks:`, `axisX:`).
- Everything in a `> note:` is preserved as an HTML comment in the RAW block — it never renders.

---

## Part 2 — Layout catalog.

18 layouts. Choose by what the content *is*, not by variety for its own sake. Each entry: when to use · mode · frontmatter · slots / markup.

### Openers & dividers

**`cover`** · dark · the title slide.
fm: `client`, `clientLogo?`, `footer?`. Body: `#` headline + one lead line.

**`section-break`** · dark · divider between movements.
fm: `sectionNum?`. Body: `#` section title.

### Framing

**`observation-cards`** · light · 3 framing observations before the pitch.
fm: `client?`, `footer?`, `presenter?`, `presenterColor?`. Slots: `heading` (`#`), `subheading`, `cards` → 3× `.oc-card` ( `.oc-card-label`, `.oc-card-title`, `.oc-card-body` ).

**`two-pane`** · dark · a contrast or two-sided framing.
Slot `left` (`#` + lead) + default → `.point` blocks ( `.pt-label` + `<p>`; add `.active` to one for the yellow highlight ).

**`statement`** · dark · one punchy line, nothing else.
Default slot: the statement.

**`pull-quote`** · dark · a quotation moment.
fm: `mode: dark`, `attribution?`. Default slot: the quote. `*em*` → blue, `**strong**` → yellow (one highlight).

### Body / opportunity

**`narrative`** · light · the default content slide — headline + prose + lists.
fm: `eyebrow`. Default slot: `#` headline + body. `**bold.**` lead-ins, `- ` bullets.

**`three-things`** · light · exactly 3 pillars / factors / steps.
fm: `eyebrow`, `footerBar?`. Slots: `heading` (`#`), `setup`, `cells` → 3× `.tt-cell` with `data-num="01"` ( `.tt-cell-bar`, `.tt-cell-title`, `.tt-cell-body`, `.tt-cell-tag` ).

**`statement-split`** · split · a statement beside a supporting list.
fm: `eyebrow`, `attribution?`, `listHeading?`. Slot `statement` + default list.

### Evidence

**`case-study`** · light · a proof story with metrics.
Default body: `##` subtitle, `#` headline, `.cs-hook`, `.cs-story` (3× `.cs-story-item`: `.cs-story-label` + `.cs-story-text`). Slots: `outcomes` → 3× `.cs-metric` ( `.cs-metric-label`, `.cs-metric-value`, `.cs-metric-desc` ); `sidebar` → `.cs-sidebar-block`s ( `.cs-sidebar-label` + `.cs-sidebar-val` ), optional `.cs-tag-list`>`.cs-tag-item`, `.cs-sidebar-divider`, `.cs-why` ( `.cs-why-label` + `.cs-why-text` ).

**`stat-grid`** · light · a standalone grid of metrics (not tied to one case study).
Slots: `eyebrow`, `stats` → `.stat` ( `.num`, `.unit?`, `.label` ).

### Frameworks & diagrams (the new layouts)

**`journey-map`** · light · persona/actor rows across stage columns (CX journey, scenario).
fm: `eyebrow`. Slots: `heading`, `setup`, `lanes` → `.jm-row` (inline `style="--jm-stages: N"`); first cell `.jm-rowlabel` (actor) or `.jm-stagehead` (column headers); body cells `.jm-cell` (+ `.is-pain` red / `.is-win` yellow).

**`roadmap`** · light · a phased timeline / staged plan.
fm: `eyebrow`. Slots: `heading`, `setup`, `phases` → `.rm-phase` (+ `.is-active` for one highlight): `.rm-phase-label`, `.rm-phase-weeks`, `<ul class="rm-phase-scope"><li>`.

**`layered-model`** · light · capability tiers or maturity levels, stacked.
fm: `eyebrow`. Slots: `heading`, `setup`, `tiers` → `.lm-tier` (first/`.is-top` auto-highlighted): `.lm-tier-label`, `.lm-tier-title`, `.lm-tier-body`.

**`matrix-2x2`** · light · positioning across two axes.
fm: `eyebrow`, `axisX`, `axisY`. Slots: `heading`, `quadrants` → exactly 4× `.mx-quad` (+ `.is-highlight`): `.mx-quad-label`, `.mx-quad-body`.

### Closers & media

**`conversation`** · light · open-floor / discovery questions.
fm: `eyebrow`, `cta?`, `presenter?`. Slots: `heading` (`#`), `subheading`, `questions` → `.cv-q` ( `.cv-q-num`, `.cv-q-text` ).

**`closing`** · dark · the brand close. Default slot: one closing line.

**`full-bleed`** · image · a full-frame image moment. Default slot: image + optional caption.

### Layout selection heuristics (for `{layout: auto}`)

| Content shape | Layout |
|---|---|
| Title / first slide | `cover` |
| 3 observations about the client's moment | `observation-cards` |
| Headline + prose + a few points | `narrative` |
| Exactly 3 pillars / factors | `three-things` |
| A proof story with client + metrics | `case-study` |
| A row of standalone numbers | `stat-grid` |
| Persona × stage / before→after | `journey-map` |
| Phased plan with weeks | `roadmap` |
| Tiers / maturity / layers | `layered-model` |
| Two-axis positioning | `matrix-2x2` |
| Open questions to the room | `conversation` |
| One big line | `statement` / `pull-quote` |
| Final slide | `closing` |

When in doubt between two, pick the simpler one. Never force a framework layout onto prose.

---

## Part 3 — Diagrams.

When a slide needs a flowchart or relationship graphic, the author writes a `> diagram:` directive describing it. Claude generates **static HTML/CSS or inline SVG at build time** following [`../design-system/diagram-style-guide.md`](../design-system/diagram-style-guide.md). There is no runtime generator.

**Directive syntax:**
```
> diagram: <primitive> — <description>; highlight <node>
```
Primitives: `flow`, `swim-lane`, `layered`, `matrix`, `hub-spoke` (from [`../design-system/v1/diagrams.css`](../design-system/v1/diagrams.css)). Example:
```
> diagram: flow — Assess adoption → Run 90-day pilot → Scale with evidence; highlight pilot
```

**Color grammar (always):** blue = primary path · neutral = secondary · yellow = the one highlight · red = corrective. One highlight per diagram. For anything outside the five primitives, hand-author inline SVG following the same grammar.

**Diagram vs layout:** if the diagram *is* the slide, use a framework layout (`journey-map`, `layered-model`, `matrix-2x2`, `roadmap`). If it sits alongside other content, drop a `diagrams.css` primitive into the slide body.

---

## Part 4 — Images.

Authors mark images with a `> image:` directive. Claude resolves it per the rules in the brand book's Images section.

**Directive syntax:**
```
> image: <role> alt="<description>" (src="assets/<file>" | url="https://…")
```
- `role`: `hero` (full-bleed), `inline` (in body), `client-logo` (cover).
- **`src=`** → a local file in `decks/[name]/assets/`. Use for anything that must render reliably and is non-sensitive.
- **`url=`** → an external image. Only for stable, public sources.
- Always include `alt`.

**The sensitivity rule.** If the document is `sensitivity: sensitive`, or the image shows client data / internal systems, it does **not** go in the public repo. Claude flags it: genericize, or keep the deck internal. When unsure, leave a placeholder and flag — never commit unconfirmed client imagery.

**Treatment:** 16:9 for hero, 4:3 or 1:1 inline, rounded corners (`--radius-lg`) on inline, compress before commit, never distort — crop.

---

## Part 5 — Transform requirements.

Rules Claude Code follows when producing `content/[name].md`:

1. **One RAW block per slide**, headed `### RAW N | TITLE`, numbered sequentially from 0. The block holds Slidev frontmatter + slots/markup per the layout's API.
2. **RAW 0 is the cover** — its frontmatter (`layout`, `mode`, `client`, `footer`) becomes the deck's global config via the converter.
3. **Use the exact slot names and class markup** from Part 2. A wrong slot name renders empty — verify against the catalog.
4. **Headline → `#`, sub/eyebrow → the layout's eyebrow/subheading, footer → `footer`/`footerBar`** per layout. Don't put a footer line in body text.
5. **`> note:` → HTML comment** (`<!-- … -->`) inside the block. Never rendered.
6. **Voice:** sentence case, periods after headlines, em dashes, no exclamation points, no consultant filler. (Launch voice — apply before this stage, enforce here.)
7. **Placeholders:** unresolved content as `[XX — owner — what's needed]`, never bare TBD.
8. **Verify the build:** run `convert` then `slidev build` and confirm zero errors before handoff. Confirm new/uncommon layouts render (DOM check or screenshot).
9. **GitHub Pages base:** the deck's `vite.config.ts` must set `base: '/launch-workshops/decks/[name]/'` so assets resolve. Clean-rebuild (remove the output dir first) to avoid stale chunk hashes.
10. **Do not auto-commit client-facing decks** — human review before anything leaves internal review.

---

## Part 6 — Updating the `launch-pitch` skill.

The skill is the home for this transform. Because skills are session-scoped, this schema is canonical here and the skill carries a derived pointer. Paste into `launch-pitch/SKILL.md`:

```markdown
<!-- DERIVED FROM: launch-workshops/docs/deck-authoring-schema.md — canonical.
     https://tamdanier.github.io/launch-workshops/docs/deck-authoring-schema.md -->
## Deck authoring (derived)
Transform a source markdown doc into content/[name].md RAW blocks per the
canonical schema. 18 layouts (openers, framing, body, evidence, frameworks,
closers) — select by content shape, not variety. Diagrams: build-time
HTML/CSS or SVG per the diagram style guide (blue=path, yellow=one highlight,
red=corrective). Images: local in decks/[name]/assets/ or public URL;
sensitive client imagery never in the public repo. Voice: sentence case,
periods after headlines, em dashes, no exclamations, no filler. Verify the
slidev build (base = /launch-workshops/decks/[name]/) before handoff.
Full catalog + slot APIs: the canonical schema above.
```
