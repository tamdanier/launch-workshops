# Pitch workflow & content document template.

How a pitch travels from account intelligence to a live deck — and the one markdown artifact the writing skills hand to `launch-pitch`.

---

## The workflow.

Each skill works at a different altitude and contributes to **one shared artifact: the pitch content document** (`content-[name].md`). The document is born from intelligence, filled with argument, verified, polished, then transformed into the deck.

```
   ALTITUDE              SKILL                  CONTRIBUTES

   Account          ┌─ SIGNAL ──────────┐   Condition: archetype · position · posture.
   intelligence     │   (pulls Rocky)    │   Seeds the Strategic frame + research.
                    └────────┬───────────┘
                             ↓
   Offering          ┌─ Solution Design ─┐   The spine: which of the 7 solutions
   design            │                   │   compose, sequenced; what flexes for
                     └────────┬───────────┘   this industry. Sets the slide arc.
                             ↓
   Deal             ┌─ SoluB (optional) ─┐   Deal-level brief — framing for a
   brief            └────────┬───────────┘   specific opportunity.
                             ↓
   Content          ┌─ HUGE Digital Agency ─┐ Writes the slides — headlines + body.
   creation         │  HUGE Feedback Team   │ Critiques and restructures the argument.
                    └────────┬──────────────┘
                             ↓
   Verification      ┌─ The Fact-Checker ─┐   Fills/verifies `> source:` per claim.
                     └────────┬───────────┘   Flags anything unverified.
                             ↓
   Language          ┌─ Launch Voice ─────┐   Sentence case, periods after headlines,
                     └────────┬───────────┘   em dashes, no exclamations, no filler.
                             ↓
   Transform         ┌─ launch-pitch ─────┐   content-[name].md → content/[name].md
                     │   (deck build)     │   RAW blocks → convert → slidev build.
                     └────────┬───────────┘
                             ↓
                    Pitch repo → push → GitHub Pages deck
```

**One rule governs the order:** `launch-pitch` does not run until the document is fact-checked and voice-passed. It maps layout; it does not write, argue, or fix facts.

---

## The handoff artifact: the pitch content document.

Every writing skill reads and writes the **same** markdown file. It is the single source of truth for the deck's content, and it is structured so `launch-pitch` can transform it slide-for-slide. The format is the source-document schema from [`deck-authoring-schema.md`](deck-authoring-schema.md) plus a strategic preamble that keeps the deck grounded.

### Template

```markdown
---
deck: hpi                                   # kebab name → folder + build target
client: HP Inc × Launch by NTT DATA
audience: Boivin (methodology) · Gawlik (eng scale) · Micolon (order ops)
goal: A working session booked per stakeholder
status: draft                               # draft → fact-checked → voice-passed → ready-for-build
sensitivity: standard                       # standard | sensitive
---

## Strategic frame
<!-- Not slides. Grounds every slide. Filled by SIGNAL + Solution Design. -->
- **Condition (SIGNAL):** [archetype · position · posture]
- **Offering (Solution Design):** [the spine being instantiated, e.g. AI-Powered Development → Frictionless Enterprise → App Rationalization]
- **Core message:** [the one sentence they should remember]
- **Proof points:** [the case studies / metrics that will carry weight]

---

## Slides

### Slide 0 — Cover {layout: cover}
# Accelerating AI-powered and frictionless enterprise growth for HP Inc.
A working conversation on methodology, adoption, and the operating model behind the $1B mandate.
> footer: Before we say anything about us — does that frame match where you are?

### Slide 1 — Where HP stands today {layout: observation-cards}
# Where HP stands today.
Three observations about your current moment — before we say anything about us.
- **A $1B target, and you own a piece of it.** HP has committed to ~$1B in run-rate savings by FY2028…
- **Project Armor is in motion.** Methodology is the hard question inside it…
- **The S/4HANA foundation is in place.** The next layer is harder…
> source: HP Q4 FY2025 earnings ($1B); Boivin LinkedIn + BTOES 2020 (50% reduction, S/4HANA)
> question: name "Project Armor" on-slide, or "the 50% IT asset reduction program"? Craig's call.
> note: Boivin variant — three observations map to his ownership.

### Slide 6 — The 90-day pilot {layout: roadmap}
# The 90-day pilot.
Start narrow, prove it with evidence, then scale.
> diagram: roadmap — Phase 1 (Wk 1–4) Baseline · Phase 2 (Wk 5–10) Enablement · Phase 3 (Wk 11–12) Results; highlight Phase 1
> source: AI-Powered Dev Transformation deck (original pptx slide 8)
```

### The directive vocabulary

| Directive | Who fills it | Becomes in the deck |
|---|---|---|
| `> footer:` | content writer | the slide footer |
| `> diagram:` | content writer + Solution Design | a built-time HTML/CSS or SVG diagram |
| `> image:` | content writer | a local/asset or public image (sensitivity rule applies) |
| `> source:` | **The Fact-Checker** | an HTML comment — provenance, never rendered |
| `> question:` | any skill | an HTML comment — open item for the team |
| `> note:` | any skill | an HTML comment — build/speaker note |

`launch-pitch` renders headline + body + footer + diagram + image; it folds `source` / `question` / `note` into comments. The Strategic frame never becomes slides — it is the grounding the writers and the layout pass check against.

---

## Who owns the format — and who just feeds it.

**Not every skill writes in this format.** The intelligence skills produce intelligence; only the content writer produces external-facing prose. The schema lives in **one** place — the first skill that writes external content, `huge-digital-agency`. Everything upstream feeds the document; everything downstream edits it in place.

| Skill | Role on the document |
|---|---|
| **SIGNAL** | Intelligence. Keeps its own JSON/Notion output. *May* seed the Strategic frame condition — does not write slides. |
| **Solution Design** | Intelligence. Keeps its spine/scaffold output. *May* seed the Strategic frame offering + suggested slide arc — does not write slides. |
| **SoluB / Rocky** | Intelligence. Feed the frame and the proof points. No prose. |
| **HUGE Digital Agency** | **Owns the schema.** First to write external content — births `content-[name].md` in this format: header, Strategic frame, slide blocks, directives. |
| **HUGE Feedback Team** | Edits in place. Critiques the argument and slide order against the frame. |
| **The Fact-Checker** | Edits in place. Fills every `> source:`; flags unverified as `[XX — owner — what's needed]`. |
| **Launch Voice** | Edits in place. Polishes prose only — **guardrail: preserve the slide structure and `>` directives, never restructure.** |
| **launch-pitch** | Consumes the finished document; transforms per [`deck-authoring-schema.md`](deck-authoring-schema.md); verifies the build; pushes. |

The rule: **structure is born correct at first-write** (huge-digital-agency), so no later pass has to restructure — they only refine. The intelligence skills stay exactly as they are; the most they do is drop facts into the frame.

Naming: the handoff file is `content-[name].md` (the working content document). `launch-pitch` produces `content/[name].md` in the pitch repo (the RAW-block deck source). Two different files — the first feeds the second.

---

## Skill snapshots (paste-in).

Skills are session-scoped, so this doc is canonical and the two writing skills carry derived pointers.

**Into `huge-digital-agency` (Launch pitch mode):**
```markdown
<!-- DERIVED FROM: launch-workshops/docs/pitch-workflow-and-content-template.md -->
## Launch pitch mode
When the deliverable is a Launch pitch deck, author the content as
content-[name].md in the pitch content-document format: document header
(deck/client/audience/goal/status/sensitivity), a Strategic frame
(condition from SIGNAL, offering from Solution Design, core message,
proof points), then slide blocks — `### Slide N — [eyebrow] {layout: auto}`,
`#` headline, body, and `> footer/diagram/image/source/question/note`
directives. Pick layouts by content shape (or {layout: auto}); never invent
layouts. Voice: sentence case, periods after headlines, em dashes, no
exclamations, no filler. Full schema + 18-layout catalog: the canonical doc.
```

**Into `launch-voice` (guardrail):**
```markdown
<!-- Pitch content documents (content-[name].md): polish prose only.
     Preserve the slide-block structure, frontmatter, and all `>` directives
     (footer/diagram/image/source/question/note). Do not restructure or
     reformat — that structure is owned upstream by huge-digital-agency. -->
```
