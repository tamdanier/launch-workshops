# Launch Workshops — Project Handoff

*Starting brief for the `launch-workshops` repo work, to be picked up in a new Claude Code thread*

**Project owner:** Tam Danier
**Repo:** https://github.com/tamdanier/launch-workshops
**Status:** Repo created, empty. No commits yet.
**Created:** June 2026
**Reference instance:** The Solution Brief BRD OQ Workshop dashboard (built in the skill-share chat thread that produced this handoff) is the first complete workshop artifact. Use it as the design and pattern reference.

---

## What this project is

A versioned, durable home for **interactive workshop artifacts** — dashboards, agendas, invites, pre-reads — that Launch by NTT DATA Solutions Architects can build, host, embed in Miro, and reuse across pursuits and internal initiatives.

The proximate need: host the Solution Brief BRD OQ Workshop dashboard so it can be embedded in Miro for the upcoming session with Woody, John, Kavya, and Scott.

The strategic need: establish the **pattern** for how Launch workshop artifacts are built, named, hosted, and consumed — so the upcoming **workshop-designer skill** (Claude skill that generates workshop materials end-to-end) has a deployment target that already exists.

This is not "host one HTML file." It is the first instance of a recurring design discipline.

---

## What exists today

- **The repo:** `tamdanier/launch-workshops`, public, empty
- **A working reference dashboard:** built in the skill-share thread, in Launch brand styling (Launch Blue `#1E5AF2`, Launch Yellow `#FFCC2D`, Red `#FF1C52` corrective, N6 `#FCF8F5` shell). Sourced from `/mnt/skills/user/launch-deck/SKILL.md` brand spec. Embeds: interactive decision capture per OQ, three-state buttons (Approve / Decided differently / Park), live summary tallies, missing-notes warning banner, markdown + JSON export
- **A facilitator agenda v2** (`OQ_Workshop_Facilitator_Agenda_v2.md`) and meeting invite drafts — supporting artifacts that accompany the dashboard
- **Launch brand reference:** in `launch-deck/SKILL.md` — colors, typography (Avenir Next LT Pro), light/dark mode conventions
- **Launch voice reference:** in `launch-voice/SKILL.md` — periods after headlines, sentence case, em dashes, no exclamation points, no consultant filler

---

## What this project will need to decide

Five architectural questions, in priority order. Resolve before scaffolding the repo.

### 1. Folder structure for workshops

Two patterns to choose between:

**Pattern A — date-first (chronological)**
```
launch-workshops/
├── 2026-06-15-solution-brief-oq/
│   ├── index.html
│   ├── facilitator-agenda.md
│   └── README.md
├── 2026-07-XX-[next]/
└── README.md
```
Easy to sort, easy to find recent. Loses categorical view.

**Pattern B — category-first**
```
launch-workshops/
├── decision-workshops/
│   └── 2026-06-15-solution-brief-oq/
├── discovery-workshops/
├── synthesis-workshops/
└── README.md
```
Better for browsing by type. Harder if a workshop spans categories.

**Pattern C — hybrid (date-first with category tag)**
```
2026-06-15-solution-brief-oq--decision/
2026-07-08-acme-pursuit-kickoff--discovery/
```

**Recommendation:** Pattern A. Categorical browsing is a "nice to have" that adds folder depth. Date-first matches how workshops are actually referenced ("the OQ workshop from last June"). If categorization becomes important later, add it as a top-level `README.md` index rather than as folder structure.

### 2. Reusable design system — extracted or embedded?

The reference dashboard's CSS + JS could be:

**Option A — Embedded in each workshop's `index.html`** (every workshop is fully self-contained, ~30KB)
- Pro: zero external dependencies, dashboard works even if repo is partially broken
- Con: every workshop is a copy of the same CSS; updating the design system means editing N files

**Option B — Shared `/design-system/` directory** with `launch.css` and `launch-workshop.js`
- Pro: design system updates propagate; smaller per-workshop file
- Con: workshops depend on relative paths; breaks if folder structure changes

**Recommendation:** Option B with a versioned subdirectory pattern: `/design-system/v1/launch.css`. Workshops pin to a version: `<link href="../../design-system/v1/launch.css">`. Future updates ship as `v2`, `v3` without breaking old workshops. The design system becomes a first-class artifact, not a copy-pasted asset.

### 3. Public repo content sensitivity

`tamdanier/launch-workshops` is currently public (default). Most workshop content is fine to make public — OQ titles, owner names like "Woody + John + Kavya" are internal but not confidential. Some workshops may be sensitive (client names, deal-specific numbers, financial figures).

**Pattern recommendation:**
- **Default: public.** All workshop dashboards public unless a specific workshop has flagged content.
- **Sensitive workshops:** either (a) genericize content before committing, (b) host privately on Vercel free tier (supports private repos), or (c) keep on a separate `launch-workshops-private` repo.
- **`.gitignore` discipline:** any workshop folder containing real client names or financials gets `.gitignored` for the public repo and committed to a private mirror.

This is a discipline question, not a tooling question. Decide the rule, write it in the repo README, follow it.

### 4. Workshop-designer skill relationship

The handoff context: a workshop-designer Claude skill is planned. The question is how the skill and this repo interact.

**Pattern A — Skill generates, you commit**
- Skill produces `index.html`, agenda, invite — you place them in the repo and push manually
- Simple. Decouples generation from deployment. Works without GitHub MCP access.

**Pattern B — Skill generates and commits via GitHub MCP**
- Skill scaffolds folder, writes files, commits, pushes — all in one motion
- Faster. Requires GitHub MCP access and an auth model.
- Risk: skill commits with bad content if the user hasn't reviewed

**Pattern C — Skill generates a PR for review**
- Skill creates a new branch, commits, opens a PR
- Best of both: speed + review gate
- Requires GitHub MCP with PR-create permissions

**Recommendation:** Pattern A for v1 of the skill. Build the discipline of human-in-the-loop review first; automate the commit step only when the pattern is mature and the trust is established. Avoid the failure mode of an auto-committed workshop with `[XX]` placeholders or unconfirmed assumptions slipping into the public repo.

### 5. Naming conventions for workshops

Once Pattern A folder structure is chosen, naming becomes:

`YYYY-MM-DD-short-name/`

Examples:
- `2026-06-15-solution-brief-oq/` — the inaugural one
- `2026-07-08-acme-pursuit-kickoff/`
- `2026-09-22-fy26-solutions-framework-round-2/`

**Rules:**
- Date in ISO format (YYYY-MM-DD), workshop's actual or planned date
- Short name in `kebab-case`, descriptive but compact (< 5 words)
- No client names if the repo is public
- No version suffixes (`-v2`) — versioning is in git history, not folder name

---

## First actionable move

Once architectural questions 1–5 above are resolved (recommend 30 minutes of decision-making), the first concrete work in the new thread is:

1. **Scaffold the repo:**
   - Top-level `README.md` (project overview, naming conventions, link to handoff doc)
   - `/design-system/v1/` (extracted CSS + JS from the reference dashboard, depending on Q2 resolution)
   - `/2026-06-15-solution-brief-oq/` (the inaugural workshop folder, using actual meeting date)
2. **Port the reference dashboard** from the skill-share thread into `2026-06-15-solution-brief-oq/index.html`. Refactor to use the design system if Option B was chosen for Q2.
3. **Enable GitHub Pages** on the repo (Settings → Pages → branch: main, folder: `/`)
4. **Verify URL** — typically `https://tamdanier.github.io/launch-workshops/2026-06-15-solution-brief-oq/`
5. **Test Miro embed** — paste URL into a Miro board, confirm interactive iframe loads
6. **Update the inaugural workshop's `README.md`** with: meeting date, attendees, dashboard URL, agenda link, post-workshop link to exported decisions

---

## Constraints and principles

These carry over from the broader Launch SA work and should govern all workshop artifacts:

### Brand
- Launch by NTT DATA color palette only — no invented colors (`launch-deck/SKILL.md` is the source of truth)
- Typography: Avenir Next LT Pro with Demi for bold moments (won't render in browser; specify in font stack with clean sans-serif fallback)
- Light mode as default for workshop tools (N6 background); dark mode as appropriate alternative

### Voice
- Periods after headlines
- Sentence case (no Title Case)
- Em dashes for pause, no exclamation points
- Cut consultant filler (leverage, synergies, holistic, robust, world-class)
- Voice rules in `/mnt/skills/user/launch-voice/SKILL.md`

### Content discipline
- `[XX — owner — what's needed]` for unresolved items, never bare `TBD`
- No fabricated content — client names, financial figures, case studies only from confirmed sources
- For public-repo workshops: genericize sensitive content before commit

### Hosting
- GitHub Pages for public workshops (free, durable)
- Vercel free tier for private workshops (supports private repos)
- Miro embed via `https://` URL — no SDK needed unless deep Miro integration emerges

---

## What's out of scope for this project

- The workshop-designer Claude skill itself — that's a separate future project. This repo is the deployment target the skill will eventually use, not the skill's home.
- Migration of historical workshops — start fresh from 2026-06-15.
- Multi-tenant features (other SAs running workshops from the same repo) — possible later, not first.
- Backend / authentication — workshops are public-by-default static HTML. Anyone with the URL can view; only repo collaborators can edit.
- Slack / notification integration on workshop events.

---

## Reference artifacts to pull from the skill-share thread

When the new thread opens, these are the artifacts to bring over (they live in `/mnt/user-data/outputs/` in the skill-share thread):

1. The reference dashboard HTML — the v3 Launch-branded version with the missing-notes warning enhancement (rendered widget in the chat; needs to be exported to a standalone `.html` file)
2. `OQ_Workshop_Facilitator_Agenda_v2.md` — the agenda companion artifact
3. The meeting invite drafts (Slack-formatted, two variants)

The dashboard HTML in particular needs to be extracted from the chat widget into a standalone file. That's the first concrete task in the new thread.

---

## Context that may be useful for the new Claude instance

- **Project owner pattern:** Tam communicates in short, directive sentences. "GA" = go ahead. Doesn't need rationale re-explained once a decision is confirmed.
- **Deliverable discipline:** Internal scaffolding before external polish. Two-document discipline for client work.
- **Pre-existing skills referenced:** `launch-deck`, `launch-voice`, `solub`, `rocky`, `hcd-ethos` — all in `/mnt/skills/user/`.
- **Adjacent work in flight:** Solution Brief BRD v2 → DISCO integration, solub-team and rocky-team skills shared externally. This workshop is part of resolving the open questions on the BRD.

---

*Handoff prepared by the skill-share thread. Drop this into a new Claude Code thread as the project brief.*
