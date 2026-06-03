# Diagram style guide.

How to build flowcharts, journey maps, and framework diagrams that look like Launch. Diagrams are authored at build time — Claude generates them as static HTML/CSS or inline SVG when it builds a deck. There is no runtime generator; nothing calls an API. That keeps diagrams static, brand-controlled, and safe on GitHub Pages.

Pair this with the primitives in [`v1/diagrams.css`](v1/diagrams.css). Tokens come from [`v1/tokens.css`](v1/tokens.css) — never hard-code hex.

---

## Color grammar.

Color carries meaning in a diagram. Hold to this grammar so a reader can decode a diagram without a legend.

| Role | Token | Meaning |
|---|---|---|
| Primary path | `--launch-blue` | The main flow, the happy path, the recommended route |
| Secondary | `--n3` / `--n4` | Supporting nodes, context, parallel detail |
| Highlight | `--launch-yellow` | The node that matters most — the insight, the decision point |
| Corrective | `--launch-red` | Failure, friction, blocker, risk — used sparingly |
| Surface | `--n7` (light) / `--n2` (dark) | Node fill |
| Connector | `--n3` | Lines and arrows, unless the edge is on the primary path (then blue) |

One highlight per diagram. If everything is highlighted, nothing is.

---

## Node specs.

- **Fill:** `--n7` in light mode, `--n2` in dark. Tint fills (`--launch-blue-light`, `--launch-beige`) only to signal grouping.
- **Border:** `0.5px` hairline, `--border` (light) / `--border-dark` (dark). The primary-path node gets a `1.5px` `--launch-blue` border instead.
- **Radius:** `--radius-md` (7px) for process nodes; full-round (`border-radius: 999px`) for start/end terminals; `0` for data/IO if you need the distinction.
- **Padding:** 12–16px. **Label:** 13px, weight 500, `--text`. Sub-label: 11px, `--text-muted`.

## Connector specs.

- **Line:** `1.5px` solid `--n3`. Primary-path edges: `1.5px` `--launch-blue`.
- **Arrowheads:** small (6–8px), filled, matching the line color. One direction unless the relationship is genuinely bidirectional.
- **Labels on edges:** 11px `--text-muted`, on a `--n6` chip so they read over lines.
- **Right angles for structured flows** (org/process), **curves for organic ones** (relationships, ecosystems). Don't mix within one diagram.

## Spacing and grid.

- Node gap: 24px minimum. Rank/row gap: 40px. Diagrams breathe — when in doubt, fewer nodes, more space.
- Align to an invisible grid. Nodes on the same rank share a baseline.
- Cap a single diagram at ~9 nodes. More than that is two diagrams or a different layout.

---

## Primitive catalog.

Five reusable shapes cover most SA needs. Markup and classes are in [`v1/diagrams.css`](v1/diagrams.css).

| Primitive | Class root | Use for |
|---|---|---|
| **Flow** | `.dg-flow` | Linear process — steps with arrows between them |
| **Swim-lane** | `.dg-lanes` | Actor/persona rows across stage columns (journey, scenario) |
| **Layered stack** | `.dg-stack` | Tiers or maturity levels, top-to-bottom |
| **2×2 matrix** | `.dg-matrix` | Positioning across two axes |
| **Hub-and-spoke** | `.dg-hub` | One center, many related nodes |

For anything outside these five, hand-author inline SVG following the color grammar and node/connector specs above. Keep it static.

---

## When to use a diagram vs a layout.

A `layout` is the slide's frame (journey-map, roadmap, layered-model). A `diagram` is content you drop *into* a slide. Some overlap on purpose — the `journey-map` layout uses the swim-lane shape as its backbone, and `layered-model` uses the stack. Use the **layout** when the diagram is the whole slide; use a **primitive** when the diagram sits alongside other content.
