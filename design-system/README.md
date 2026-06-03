# Design system.

The canonical home for the Launch by NTT DATA brand — colors, typography, treatments, and the rules that govern them.

## What's here

| File | What it is |
|---|---|
| [`brand-book.md`](brand-book.md) | The human-readable style guide. **Source of truth.** |
| [`v1/tokens.css`](v1/tokens.css) | CSS custom properties — import into any web surface |
| [`v1/tokens.json`](v1/tokens.json) | Machine-readable — generate Tailwind / other configs from this |
| [`v1/launch.css`](v1/launch.css) | Workshop component styles (built on the tokens) |
| [`v1/launch-workshop.js`](v1/launch-workshop.js) | Workshop interaction engine |

## Consuming the tokens

**Web (CSS):**
```html
<link rel="stylesheet" href="/launch-workshops/design-system/v1/tokens.css">
```
Then use `var(--launch-blue)`, `var(--n6)`, `var(--font-web)`, etc.

**Tailwind / build tools:** generate your color config from `tokens.json` — do not hand-copy hex values.

**Claude skills:** carry a snapshot labeled "derived from brand-book.md" with a link back here. The snapshot is a convenience copy, not an independent source.

## The one rule

Never redefine a brand hex value inline. If a stylesheet hard-codes `#1E5AF2` instead of referencing the token, that's how drift starts. Everything flows from `brand-book.md`.

## Versioning

Versions are directories (`v1/`, `v2/`), not filename suffixes. Additive changes land in the current version. Breaking changes (a value changes or a token is removed) open a new version so pinned artifacts keep working. See the change process in [`brand-book.md`](brand-book.md#changing-the-design-system).
