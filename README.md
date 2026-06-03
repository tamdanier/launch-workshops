# Launch workshops.

Versioned, durable home for interactive workshop artifacts — dashboards, agendas, invites, pre-reads — built and hosted for Launch by NTT DATA Solutions Architects.

Artifacts are public-committed static HTML, hosted via GitHub Pages. Embed any workshop URL directly into Miro as an interactive iframe.

---

## Workshop index

| Date | Workshop | Dashboard |
|---|---|---|
| 2026-06-03 | Solution Brief BRD — OQ Workshop | [workshops/2026-06-03-solution-brief-oq/](workshops/2026-06-03-solution-brief-oq/) |

---

## Naming conventions

```
YYYY-MM-DD-short-name/
├── index.html           # interactive artifact
├── facilitator-agenda.md
└── README.md
```

- Date: ISO format, workshop's actual date
- Short name: kebab-case, < 5 words, no client names for public-committed folders
- No version suffixes — versioning is in git history

---

## Design system

Shared CSS and JS live in [`design-system/v1/`](design-system/v1/). Workshop `index.html` files pin to a version:

```html
<link rel="stylesheet" href="../../design-system/v1/launch.css">
<script src="../../design-system/v1/launch-workshop.js"></script>
```

Future design changes ship as `v2`, `v3` — existing workshops keep working.

---

## Content discipline

**Public repo — do not commit:**
- Client names or deal-specific identifiers
- Financial figures, contract values, win rates
- Personally identifiable information beyond internal NTT DATA team members

Workshops with flagged content: genericize before commit, or host privately on Vercel free tier.

---

## Hosting

- GitHub Pages: `https://tamdanier.github.io/launch-workshops/[workshop-folder]/`
- Enable in repo Settings → Pages → branch: main, folder: `/`
- Miro embed: paste the `https://` URL into any Miro board — no SDK required

---

## Brand reference

- Colors, typography, light/dark conventions: `launch-deck` skill (`SKILL.md`)
- Voice — sentence case, periods after headlines, em dashes, no exclamation points: `launch-voice` skill (`SKILL.md`)
