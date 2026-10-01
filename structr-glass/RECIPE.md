# StructrGlass — integration recipe for App Builder

**Owner:** Flint (design tokens)  
**Consumer:** App Builder (landing / Next.js in `artistdbjohnson/structr`)  
**Package path (handoff):** `/workspace/structr-glass/`  
**Do not:** push to GitHub or deploy to Vercel from this package — App Builder owns the repo.

---

## 1. Two glass systems (do not merge)

| System | Where | Blur | Fill | Radius | Used for |
|--------|--------|------|------|--------|----------|
| **Home dock (dglxss frosted pill)** | `app/globals.css` → `.dock` | **~42px** + saturate ~138% | Thick warm-gray acrylic; wallpaper bleeds through | **999px** capsule | Train / Plans / You. Glyphs are **debossed** |
| **StructrGlass (this package)** | `tokens.css` → `--sg-*` | **12–16px** + saturate 130–160% | **Magenta / orange / cyan** tints | **Squircle** `--sg-radius-sm…xl` | MetricPill, TrendChip, PhaseBar |

**Rule:** Never fold dock styles into MetricPill tokens (or the reverse). Dock has no dashed rim, no grain overlay, no tint fills, no squircle shell. Keep `.dock` untouched when wiring StructrGlass.

### dglxss dock language

The home capsule is thick frosted acrylic, not a flat milky print.

- Warm-gray glass. The wallpaper bleeds through the frost. Soft rim highlight along the top edge.
- Train, Plans, and You icons (and their labels) are **debossed**: a dark lip on the top of the carve, a light lip along the bottom, and a soft internal luminosity. They are not flat filled glyphs.
- Selection is a fixed circle, slightly more opaque than the pill, with a soft elevation. The icon stays debossed on top of that disc. The disc glides on Y only and does not stretch.

---

## 2. Stack match (live repo)

- Next.js **16** + React **19** + TypeScript  
- **No Tailwind** today — plain CSS in `globals.css` + CSS Modules  
- These recipes use **CSS Modules** + CSS variables so they drop in without new deps

---

## 3. Install (copy-paste)

1. Copy this folder into the app, e.g. `structr-glass/` at repo root (or `styles/structr-glass/`).
2. Import tokens once in `app/layout.tsx` (or at top of `app/globals.css`):

```ts
import "../structr-glass/tokens.css";
```

3. Move or re-export components:

```ts
// e.g. components/metric-pill.tsx
export { MetricPill, PercentChip } from "../structr-glass/components/MetricPill";
export { TrendChip } from "../structr-glass/components/TrendChip";
export { PhaseBar } from "../structr-glass/components/PhaseBar";
```

4. Ensure `tsconfig` path alias `@/*` still resolves; CSS Modules are already used-friendly with Next.

---

## 4. Token map → visual traits

| Visual trait | Tokens | Default |
|--------------|--------|---------|
| Backdrop blur + saturate | `--sg-blur`, `--sg-blur-sm`, `--sg-blur-lg`, `--sg-saturate*`, `--sg-backdrop` | blur **14px** (range **12–16**), saturate **145%** |
| Tinted glass fills | `--sg-tint-{magenta,orange,cyan}`, `--sg-fill-*`, `--sg-fill-*-strong`, `--sg-glow-*` | HSL channels + alpha fills |
| Squircle radii | `--sg-radius-xs…xl` | 10 / 14 / 20 / 26 / 32 — **not** dock’s 999 |
| Dashed inner rim | `--sg-rim-dash`, `--sg-rim-gap`, `--sg-rim-inset`, `--sg-rim-color*` | 1.5px dashed, 3px inset |
| Grain overlay | `--sg-grain-image`, `--sg-grain-opacity`, `--sg-grain-size` | SVG noise ~8% overlay |
| Refractive rim shadows | `--sg-shadow-rim`, `--sg-shadow-depth`, `--sg-shadow-metric`, `--sg-shadow-glow-*` | inset highlights + depth + tint glow |
| Dot-matrix numerals | `--sg-numeral-*`, `--sg-numeral-dot`, `--sg-numeral-mask-size` | mono + tabular + soft lattice |
| Nested % chip | `--sg-chip-*` | pill radius, blur 10px, own fill/shadow |
| Hairline sparkline | `--sg-spark-stroke` (1.25px), `--sg-spark-height/width`, `--sg-spark-{magenta,orange,cyan}` | SVG path in MetricPill |

Tint selection is via `data-tint="magenta|orange|cyan"` on each recipe (sets local `--sg-fill` / `--sg-spark` / glow aliases).

---

## 5. Component recipes

### MetricPill

```tsx
import { MetricPill } from "@/structr-glass/components/MetricPill";
import { TrendChip } from "@/structr-glass/components/TrendChip";

<MetricPill
  label="HRV"
  value={62}
  percent={18}
  tint="cyan"
  spark={[0.2, 0.35, 0.3, 0.55, 0.5, 0.7, 0.65]}
  footer={<TrendChip value="+4%" direction="up" tint="cyan" />}
/>
```

- Shell: squircle + `--sg-backdrop` + tint fill + refractive shadow  
- `::before` dashed rim · `::after` grain  
- Value: dot-matrix numeral  
- `percent` → nested `PercentChip`  
- `spark` → hairline SVG  

### TrendChip

```tsx
<TrendChip value="−2.1%" direction="down" tint="orange" />
```

Compact nested glass; dashed rim + grain at smaller scale. Use in MetricPill `footer` or alone.

### PhaseBar

```tsx
<PhaseBar
  title="Session"
  phases={4}
  activeIndex={1}
  activeProgress={0.6}
  phaseName="Build"
  percent={40}
  tint="magenta"
/>
```

Segmented track on a StructrGlass plate; active segment uses hairline-glow fill.

---

## 6. Blur / saturate ranges (metric only)

| Token | Value | Use |
|-------|-------|-----|
| `--sg-blur-sm` / `--sg-saturate-sm` | 12px / 130% | TrendChip, dense UI |
| `--sg-blur` / `--sg-saturate` | 14px / 145% | MetricPill, PhaseBar default |
| `--sg-blur-lg` / `--sg-saturate-lg` | 16px / 160% | Hero metric (still ≪ dock 36px) |

Dock remains **36px / 160%** in `globals.css` — out of scope for `--sg-*`.

---

## 7. Accessibility already wired

- `prefers-reduced-transparency` → opaque fills, no backdrop, no grain  
- `prefers-reduced-motion` → durations → 0  
- MetricPill / PhaseBar / TrendChip expose labels / `role="status"`  

---

## 8. Preview

Open `preview.html` in a browser (static) to eyeball the three recipes on a dark canvas. It inlines a subset of tokens for standalone viewing; production should use `tokens.css` + CSS Modules.

---

## 9. Mismatches vs live site (2026-10-01)

Inspected: `https://structr-wine.vercel.app` + `artistdbjohnson/structr@main`.

| Finding | Implication |
|---------|-------------|
| Live page is **wallpaper + HomeDock only** | MetricPill / TrendChip / PhaseBar **do not exist** in repo yet — this package is greenfield |
| Dock is its own pill (now dglxss debossed frost in `globals.css`, not metric glass) | Confirms separation from metric 12–16px tinted squircles |
| No Tailwind; CSS in `globals.css` | Recipes use CSS Modules + vars (no Tailwind dependency) |
| `:root` only has `--glass`, `--rim-soft`, `--ink` | StructrGlass adds `--sg-*` namespace; leave dock vars alone |
| Search for MetricPill / glass metric code → **0 hits** | Spec comes from App Builder brief, not existing components |

---

## 10. Message for App Builder (forwardable)

> StructrGlass handoff is ready under `/workspace/structr-glass/` (tokens + MetricPill / TrendChip / PhaseBar + RECIPE.md). Import `tokens.css`, drop the three CSS Module components into the Next app. **Keep the home dock’s dglxss frosted pill (`.dock` in globals.css, debossed glyphs) as a separate system** — do not reuse `--sg-*` metric tokens on the dock or dock styles on MetricPill. Metric glass = blur 12–16px, magenta/orange/cyan tints, squircle radii, dashed rim, grain, refractive shadows, dot-matrix numerals, nested % chip, hairline sparkline. Flint will not push to GitHub; please pull these files into `artistdbjohnson/structr` when ready.
