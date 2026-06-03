# Workshop designer skill — specification.

Schema, field definitions, content rules, and output requirements for the Claude skill that generates Launch workshop artifacts end-to-end.

**Status:** Draft — pre-skill-build.
**Owner:** Tam Danier
**Repo:** `tamdanier/launch-workshops`

---

## Purpose.

The workshop-designer skill receives structured inputs from a facilitator and produces a complete, deployment-ready workshop folder — interactive dashboard, facilitator agenda, README, and optional invite draft — conforming to the Launch brand, voice, and repo conventions defined here.

The skill does not commit or push. It generates files. The facilitator reviews, then commits manually.

---

## Workshop metadata schema.

Every workshop requires the following fields before the skill can generate artifacts.

```json
{
  "folder":            "YYYY-MM-DD-short-name",
  "date":              "YYYY-MM-DD",
  "title":             "Short descriptive title.",
  "description":       "1–2 sentences. What this workshop decides or produces.",
  "category":          "internal | pre-sales | client",
  "tags":              ["tag1", "tag2"],
  "facilitator":       "Full name",
  "attendees":         ["Name 1", "Name 2"],
  "duration_minutes":  60,
  "outcome":           "Concrete deliverable produced within 24 hours of the session.",
  "artifact_types":    ["dashboard", "agenda", "invite"]
}
```

### Field rules.

| Field | Rule |
|---|---|
| `folder` | ISO date + kebab-case short name. No client names if repo is public. No version suffixes. |
| `title` | Sentence case. Period at end. < 8 words. |
| `description` | 1–2 sentences. Specific — name the decisions, output, or question. No filler. |
| `category` | Must match taxonomy below. One value only. |
| `tags` | 1–4 tags. Must match tag taxonomy below. |
| `outcome` | Concrete and time-bound. "BRD v3 produced within 24 hours." Not "alignment achieved." |
| `artifact_types` | Drives what the skill generates. At minimum: `dashboard` or `agenda`. |

---

## Category taxonomy.

| Category | Definition |
|---|---|
| `internal` | NTT DATA internal sessions — BRD reviews, skill shares, schema decisions, team planning. No client present. |
| `pre-sales` | Pursuit-related sessions. May include DISCO product, SA team, or cross-functional NTT DATA stakeholders working on a deal. |
| `client` | Client-facing workshops. Discovery, design, synthesis, co-creation sessions where the client attends. |

---

## Tag taxonomy.

Tags describe the *type of work* the workshop does. Apply 1–4. Do not invent new tags — extend this list via a PR when a new type is needed.

| Tag | When to use |
|---|---|
| `decision` | Primary output is captured decisions on named open questions. |
| `gateway` | Workshop clears a milestone or go/no-go before a next phase begins. |
| `discovery` | Understanding client context, needs, constraints, or org landscape. |
| `design` | Solution shaping, concept development, option generation. |
| `synthesis` | Making sense of prior inputs — consolidating research, workshop outputs, or findings. |
| `alignment` | Getting named stakeholders to a shared understanding or agreement. |
| `prioritization` | Sequencing, ranking, or scoping work — backlog grooming, initiative selection. |
| `planning` | Roadmap, sprint, or program planning with defined outputs (plan, milestones, owners). |
| `schema` | Data model, field-level, or API contract decisions. |
| `retrospective` | Looking back — what worked, what didn't, what to carry forward. |

---

## Open question (OQ) schema.

Required for `dashboard` artifact type. Each open question the workshop will decide.

```json
{
  "id":             "OQ-N",
  "title":          "Short phrase describing the question.",
  "question":       "The full question being decided.",
  "recommendation": "The pre-workshop recommendation. Specific — not 'TBD'.",
  "owner":          "Name or role responsible for the decision.",
  "track":          "Track name if grouping OQs into timed segments."
}
```

### OQ field rules.

| Field | Rule |
|---|---|
| `id` | Sequential within the workshop. Gaps allowed if OQs are closed pre-workshop. |
| `title` | ≤ 7 words. Sentence case. Period at end in display. |
| `question` | The actual question. Specific enough that a yes/no or option-selection closes it. |
| `recommendation` | Required — never blank. If genuinely unknown, use `[XX — owner — what's needed to form a recommendation]`. |
| `owner` | Person or role who drives follow-up if parked. Real names for internal workshops; roles only for public-committed client workshops. |
| `track` | Optional. Groups OQs under a named segment with a time budget. |

### Pre-workshop closed decisions.

OQs resolved before the session are documented separately — not in the interactive dashboard, but noted in the facilitator frame and exported output.

```json
{
  "id":       "OQ-N",
  "title":    "Short phrase.",
  "decision": "What was decided.",
  "decided_by": "Name or role.",
  "rationale": "Why it was closed pre-workshop."
}
```

---

## Artifact specifications.

### 1. Interactive dashboard (`index.html`)

Self-contained HTML — no external file dependencies except the Tabler icons CDN. Inline all CSS and JS.

**Required elements:**
- Launch eyebrow (`LAUNCH BY NTT DATA`)
- Workshop title + subtitle (decision count · duration · pace)
- Three-stat summary tiles: Approved / Decided differently / Parked
- Warning banner: surfaces OQs with non-Approve decisions and no notes
- Track headers with time budgets (if tracks defined)
- OQ cards: expand/collapse, three-state buttons, notes textarea, status badge, needs-note indicator
- Export bar: markdown, JSON, copy, reset
- Top nav: ← All workshops, dark mode toggle
- Dark mode: full CSS variable system, persisted via `localStorage`

**Three-state decision logic:**
- `Approve recommendation` — recommendation adopted as-is
- `Decide differently` — requires a note capturing the actual decision
- `Park / async` — requires a note capturing owner and next step

**Export format — markdown:** Summary counts → sections by decision state → each OQ with owner and notes → next steps block.

**Export format — JSON:** `captured_at`, `pre_workshop_decisions[]`, `summary{}`, `decisions[]` with id / title / owner / decision / notes per OQ.

### 2. Facilitator agenda (`facilitator-agenda.md`)

Structure:
1. Header — date, facilitator, attendees, outcome
2. Pre-workshop decisions (closed) — brief summary for context-setting
3. Frame (2–3 min) — operating model, pacing constraint, dashboard orientation
4. Tracks — each track with OQs, timing, facilitation notes
5. Buffer / overflow — always 10–15 min at end
6. Post-workshop — export, BRD update, owner follow-ups

**Timing discipline:** Total OQ time + frame + buffer = total session duration. Make the math explicit.

### 3. Workshop README (`README.md`)

```
# [Workshop title]

**Date:** YYYY-MM-DD
**Facilitator:** Name
**Attendees:** Name, Name, Name
**Outcome:** [outcome field verbatim]

---

## Artifacts
[table: artifact name → file link]

**Hosted URL:** https://tamdanier.github.io/launch-workshops/[folder]/

---

## Miro embed
[standard embed + test instructions block]

---

## Pre-workshop decisions (closed)
[closed OQs if any]

---

## Post-workshop
- [ ] Export decisions
- [ ] [outcome-specific follow-ups]
- [ ] Assign owners for parked items
```

### 4. Invite draft (optional, `invite-draft.md`)

Two variants: Slack message and calendar body.

**Slack variant:** 3–4 sentences. What we're deciding, who's in the room, what we need from them before the session.

**Calendar variant:** Subject line + 5–7 sentence body. Outcome-first. Link to pre-read if exists.

---

## Skill input prompt contract.

The facilitator invokes the skill with:

1. **Workshop metadata** (all required fields above)
2. **OQ list** (id, title, question, recommendation, owner — one per line or structured)
3. **Pre-workshop closed decisions** (if any)
4. **Artifacts requested** (dashboard / agenda / invite / all)
5. **Public repo flag** — if `true`, skill must not include client names or financial figures in any output

The skill may ask clarifying questions if `recommendation` fields are missing or if `outcome` is vague. It must not fabricate recommendations, attendee names, or decisions.

---

## Content discipline.

All generated content follows Launch voice and content rules.

**Voice:**
- Sentence case throughout — no Title Case in headings or labels
- Periods after standalone headlines and section titles
- Em dashes for pause or aside — not hyphens
- No exclamation points
- No consultant filler: leverage, synergies, holistic, robust, world-class, impactful

**Placeholders:**
- Unresolved items: `[XX — owner — what's needed]`
- Never bare `TBD` or `TODO`
- If a recommendation cannot be formed, state why explicitly

**Public repo discipline:**
- No client names, deal names, or account names in public-committed files
- No financial figures, contract values, win rates
- Attendee names: NTT DATA internal names are acceptable; client-side names require genericization (e.g., "client product lead")
- If in doubt: generic role > specific name

---

## Homepage card registration.

When a new workshop is generated, the skill also outputs the `<a class="workshop-card">` block to add to `index.html`. Fields:

```html
<a class="workshop-card" href="[folder]/"
   data-category="[category]"
   data-tags="[tag1],[tag2]">
  <div class="card-meta">
    <span class="card-date">[date]</span>
    <span class="card-category">[Category display name]</span>
  </div>
  <div class="card-title">[Title]</div>
  <div class="card-desc">[Description]</div>
  <div class="card-tags">
    <span class="card-tag">[Tag 1]</span>
    <span class="card-tag">[Tag 2]</span>
  </div>
  <span class="card-arrow">›</span>
</a>
```

The facilitator pastes this into `index.html` after review.

---

## Out of scope for v1 skill.

- Auto-commit or GitHub push — human reviews before any commit
- Real-time collaborative state in Miro (requires Miro SDK + backend)
- Multi-facilitator or role-based access control
- Automatic post-workshop BRD update
- Workshop templates library (template selection comes after 3+ workshop patterns emerge)
