# Theming Guide

## 🎨 Single Source of Truth

**All theming is done in one file: `src/app.css`**

This file contains:
- All color scales (brand, citron, pine, iris, base)
- Semantic color tokens (primary, secondary, success, error, etc.)
- Action colors (for buttons and interactive elements)
- Dark mode overrides
- Typography settings
- Spacing, border radius, and z-index values

## 📍 Where to Make Changes

### Main Theme (Light Mode)
Edit the `@theme` block in `src/app.css`.

### Dark Mode Theme
Edit the `.dark` block in `src/app.css`.

## ⚠️ Important: Don't Edit These Files

### Generated Files (in `dist/` folder)
These files are **automatically generated** from `src/app.css` by the build script:
- ❌ `dist/zabi-components.css` - Full compiled CSS (generated)
- ❌ `dist/zabi-components-theme.css` - Theme with Tailwind import (generated)
- ❌ `dist/zabi-components-theme-only.css` - Theme only, no Tailwind (generated)
- ❌ `dist/zabi-components-theme-dark.css` - Dark mode theme (generated)
- ❌ `dist/zabi-components-theme-dark-only.css` - Dark mode theme only (generated)
- ❌ `dist/zabi-components-colors.css` - Standalone colors (generated from app.css)

**These files are overwritten every time you run `npm run build:css`**

### Example Files
- ❌ `examples/theme-extensions/02-custom-brand-colors.css` - Just an example, not your actual theme
- ❌ `examples/theme-extensions/03-custom-semantic-colors.css` - Just an example, not your actual theme

### Source Files (Edit These)
- ✅ `src/app.css` - **THIS IS THE ONLY FILE YOU NEED TO EDIT**
- ✅ Removed deprecated files (`src/styles/colors.css`, `src/styles/base.css`, `src/styles/simple.css`, `src/app-simple.css`)

## 📦 What Are the Dist Files For?

The `dist/` files are **for consumers** of your library who want to import the theme separately.

**Full import matrix, export paths, and examples:** [docs/theme-imports.md](./docs/theme-imports.md)

### For Library Developers (You)
- **Edit**: `src/app.css` only
- **Build**: Run `npm run build:css` to regenerate all dist files (or `npm run build:lib` before publish)
- **After token edits**: run `node scripts/verify-build.js` to confirm outputs (also runs as part of `build:lib`)
- **Base scale source**: use `tokens/base-scale.js`; run `npm run sync:tokens` (or `npm run build:css`) to render token blocks back into `src/app.css`

### For Library Consumers

Use **package exports** (preferred):

| Need | Import |
|------|--------|
| Tailwind + full `@theme` (app has no Tailwind yet) | `zabi-components/theme` |
| Tailwind already in app — merge `@theme` only | `zabi-components/theme-only` |
| Dark overrides (+ Tailwind import in file) | `zabi-components/theme-dark` |
| Dark overrides only (Tailwind already loaded) | `zabi-components/theme-dark-only` |
| CSS variables only, no Tailwind | `zabi-components/colors` |
| Full compiled CSS (utilities + everything) | `zabi-components/css` |

Examples:

```css
@import "zabi-components/theme-only";
@import "zabi-components/theme-dark-only";
```

```css
@import "zabi-components/colors";
```

```css
@import "zabi-components/css";
```

Canonical recommendation for most apps remains:

```css
@import "tailwindcss";
@import "zabi-components/theme-only";
@import "zabi-components/theme-dark-only";
```

Dark mapping rule reference:
- Physical ramp tokens are `--zabi-base-50 ... --zabi-base-950`.
- Semantic dark mapping is generated with `S -> 1000 - S` (for example `50 <-> 950`, `75 <-> 925`, `500` unchanged).

## 🎯 Common Customizations

### Change Brand Colors

```css
@theme {
  /* Replace the brand color scale */
  --color-brand-50: #f0f9ff;
  --color-brand-100: #e0f2fe;
  --color-brand-200: #bae6fd;
  --color-brand-300: #7dd3fc;
  --color-brand-400: #38bdf8;
  --color-brand-500: #0ea5e9;
  --color-brand-600: #0284c7;
  --color-brand-700: #0369a1;
  --color-brand-800: #075985;
  --color-brand-900: #0c4a6e;
  --color-brand-950: #082f49;
}
```

### Change Primary Button Color

The primary button uses `--color-action-primary`, which defaults to `brand-600`
(4.86:1 against a white label). To change it:

```css
@theme {
  /* Use a different brand shade */
  --color-action-primary: theme(colors.brand.600);
  
  /* Or use a completely custom color */
  --color-action-primary: #your-color-here;
}
```

### Brand Scale Usage

The brand scale is used throughout the system:

- **brand-50 to brand-100**: Subtle backgrounds, hover states
- **brand-300 to brand-400**: Light accents, disabled states
- **brand-500**: Focus rings, medium emphasis
- **brand-600**: **Primary buttons** (`action-primary`)
- **brand-700**: Primary hover, links
- **brand-800**: Primary active, link hover
- **brand-900 / 950**: Darkest brand shades

Hover and active always move *toward* the dark end in light mode. The `.dark`
mirror flips that automatically, so "more pressed" means "more contrast against
the page" in both themes. Never point `-active` at a step on the far side of the
ramp — that is how the pressed primary label ended up at 1.66:1.

### Dark Mode

Dark mode automatically inverts the brand scale:
- `brand-50` becomes `brand-950` (darkest)
- `brand-950` becomes `brand-50` (lightest)

This happens automatically in the `.dark` block, so you typically don't need to override action colors in dark mode.

## 🌙 Dark Mode Action Colors

Dark mode action colors are handled in `src/app.css` in the `.dark` block (lines 393-404):

### Primary Actions
- **No explicit dark mode override needed** - Brand colors are automatically inverted
- `brand-800` (light mode) → `brand-200` (dark mode) automatically

### Secondary Actions  
- **No explicit dark mode override needed** - Base colors are automatically inverted
- `base-600` (light mode) → `base-400` (dark mode) automatically

### Danger Actions
- **No re-pointing needed.** Danger resolves through `--color-error-*`, which
  mirrors like every other ramp, so dark danger is the same step of the same
  ramp as light danger. The `.dark` block restates the aliases only so that
  `zabi-components/theme-dark-only` remains a complete standalone import
  (`validate-theme.js` enforces that).

### In Generated Files

- **`dist/zabi-components.css`**: Has dark mode at line 2178, danger actions at lines 2264-2269
- **`dist/zabi-components-theme-dark-only.css`**: Has dark mode action colors at lines 119-130 (only danger has explicit overrides)
- **`dist/zabi-components-theme-only.css`**: Only has light mode (@theme block), no dark mode
- **`dist/zabi-components-theme.css`**: Only has light mode (@theme block), no dark mode

## 🎨 Calibrated Colour Ramps

Every chromatic ramp (`brand`, `citron`, `pine`, `iris`, `warning`, `error`) is
**generated against one shared lightness curve**, so `<ramp>-600` means the same
perceptual lightness in every ramp. That is what lets the semantic families read
as one family instead of six unrelated colours.

| step | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| CIE L\* | 97 | 94 | 88 | 80 | 70 | 58 | **47** | 38 | 29 | 20 | 12 |

Step **600** is the solid-fill step: dark enough to clear 4.5:1 against white,
light enough to still read as a colour. Every semantic token points at it.

- **Source of truth:** `tokens/chromatic-scales.js` — hue, peak chroma, the
  chroma envelope, and the target curve.
- **Regenerate:** `node scripts/generate-ramps.js` (runs inside `npm run sync:tokens`).
- **Verify:** `node scripts/check-ramp-lightness.js` — fails if any step drifts
  more than ±1.5 L\* off the curve, or if two adjacent steps differ by more than
  15 L\* (a cliff rather than a ramp).

To rebrand, edit `hue` / `peakChroma` for a ramp in `tokens/chromatic-scales.js`
and re-run the generator. **Do not hand-edit `--zabi-<ramp>-*` in `src/app.css`** —
the generator overwrites them, in both the `@theme` block and the `.dark` mirror.

The `base` (neutral) ramp is deliberately **not** on this curve: it is wider on
purpose because it also drives text, borders and the surface levels. Semantic
`neutral` aliases the base step closest to the chromatic 600s.

## 🧩 Semantic Families

Each family exposes the same roles, built from the same steps:

| token | step | use |
|---|---|---|
| `--color-<family>` | 600 | solid fill — badge `emphasis="solid"`, progress bars |
| `--color-<family>-weak` | 700 | pressed / emphasis |
| `--color-<family>-medium` | 800 | strongest fill |
| `--color-<family>-strong` | 900 | darkest |
| `--color-<family>-subtle` | 100 | tinted fill — badges, alerts |
| `--color-<family>-border` | 200 | tinted edge |
| `--color-<family>-text` | 700 | text on a subtle fill or a page surface |

Families: `success`, `warning`, `error`, `info`, `energetic`, `neutral`.

Prefer the **subtle** trio (`-subtle` fill + `-border` edge + `-text` label) for
anything informational. Solid fills are for the one element on a screen that has
to shout.

## 📐 Control Geometry

One height scale is shared by **every** form control, so a Button, Input, Select
and IconButton of the same size line up in a row:

| size | height | token |
|---|---|---|
| `sm` | 32px | `--control-height-sm` |
| `md` | 40px | `--control-height-md` |
| `lg` | 48px | `--control-height-lg` |

Enforced by `scripts/check-control-geometry.js`.

## 🔲 Border Radius

Four radii, chosen by **role**, never by size. A large button is a bigger box
with the same corner as a small one.

| token | value | use |
|---|---|---|
| `--radius-control` | 8px | buttons, inputs, selects, toggles |
| `--radius-container` | 12px | cards, alerts, panels, list items, code blocks |
| `--radius-overlay` | 16px | modals, sheets, menus, popovers, toasts |
| `--radius-pill` | full | badges, avatars, status dots |

`--radius-sm/md/lg/xl` remain as legacy aliases for consumer overrides, but
components must not use them — `check-control-geometry.js` fails the build if a
component reaches for a t-shirt radius.

## ✋ Interaction Fills

Hover and active fills are **surface-relative alpha tints**, not fixed ramp steps:

```css
/* light */
--color-surface-hover:  rgba(9, 9, 11, 0.06);
--color-surface-active: rgba(9, 9, 11, 0.11);
/* dark */
--color-surface-hover:  rgba(250, 250, 250, 0.08);
--color-surface-active: rgba(250, 250, 250, 0.14);
```

A fixed step can coincide exactly with the surface it sits on — `base-100` in
dark mode *is* `--color-surface-base`, which is how ghost-button hover became
invisible. `check-token-violations.js` now fails on `hover:bg-base-*` /
`active:bg-base-*` in component source.

Use `hover:bg-surface-hover` / `active:bg-surface-active` for quiet controls, and
the `action-*-hover` / `action-*-active` tokens for filled ones.

## ♿ Contrast

`scripts/check-contrast.js` resolves every fill/foreground pair a component can
render — through the same token chain the CSS uses — in **both** themes, and
fails below WCAG AA. Run it after re-pointing any token:

```bash
npm run check:contrast     # or: npm run check:design (all four guards)
```

## 🧱 Surface Elevation Levels

Every surface uses one of four semantic levels. Use these tokens instead of raw `base-*` steps for backgrounds:

| Level | Token / utility | Use for | Light | Dark (OKLCH L) |
|---|---|---|---|---|
| Base | `--color-surface-base` · `bg-surface-base` | Page / app shell (the darkest level in dark mode) | `base-100` | `#18181b` · 21 |
| Raised | `--color-surface-raised` · `bg-surface-raised` | Cards, panels, sidebars | `#ffffff` | `#262629` · 27 |
| Elevated | `--color-surface-elevated` · `bg-surface-elevated` | Nested cards, hover and active fills | `base-50` | `#35353a` · 33 |
| Overlay | `--color-surface-overlay` · `bg-surface-overlay` | Modals, sheets, dropdown/select menus, navigation panels, toasts | `#ffffff` | `#44444c` · 39 |

Supporting tokens:
- `--color-surface-overlay-hover` (`bg-surface-overlay-hover`): row and icon-button hover **inside** an overlay. It is lighter than the overlay in dark mode.
- `--color-border-overlay` (`border-border-overlay`): 1px edge on overlays. Transparent in light mode, visible in dark mode.

**The dark levels are generated, not hand-picked.** Each one is `#fafafa` — the
same light as the dark hover tint `--color-surface-hover` — washed over the page
at 6.4% / 13.1% / 19.7%, so every level is literally the level below it with more
light on it. The ladder lives in `tokens/surface-ladder.js`; edit the alphas
there and run `npm run sync:tokens`, never the hex in `app.css`.

The composite is baked to an opaque hex at build time rather than shipped as
`rgba()`. Flat colours keep the static toolchain working — `check-contrast.js`
can resolve every AA pair against a surface, `check-surface-elevation.js` can
measure the steps — and an opaque overlay means a modal never lets the page bleed
through it. The trade: nesting past the four levels is not automatic. A card
inside a card does not self-lighten, it names the next level up.

**Why dark mode steps lightness instead of using shadows:** a drop shadow simulates light blocked by a raised object, which reads on a light page. On a dark page the shadow is as dark as the background, so the signal disappears. In dark mode each level is therefore **lighter** than the one below it, by +6 OKLCH lightness points on the neutral base hue. Light mode keeps white surfaces and uses shadows for elevation.

**Rules:**
- Anything that floats above content must use a lighter level than what it floats over. Floating components (Modal, SlideUp, Dropdown/Select menu, NavigationMenu panel, Toaster/Toast) use `bg-surface-overlay`.
- Hover fills on overlays use `bg-surface-overlay-hover`, not `bg-base-*`, which would go darker in dark mode.
- Existing tokens remain as aliases: `background` → base, `card` / `surface-1` → raised, `surface-2` / `card-hover` → elevated, `surface-3` → overlay (dark), `card-elevated` → overlay (light) / elevated (dark).

**Enforced by** `scripts/check-surface-elevation.js`, which `validate-theme.js` runs during `npm run build:css`. It fails when:
- dark levels aren't strictly increasing;
- any step is outside 5–8 OKLCH L points;
- overlay hover or tooltip fills are darker than the overlay;
- a floating component paints a surface class below overlay.

To retune the dark levels, edit the four `--color-surface-*` values in the `.dark` block of `src/app.css` and run `node scripts/check-surface-elevation.js`.

> The light surface tokens must stay **below** the `/* Background Colors */` marker in `@theme`. `scripts/sync-theme-tokens.js` regenerates everything between the base-scale aliases and that marker.

## 🌑 Shadow Scale

Elevation in light mode is **two steps**, not a ramp. A shadow says "this is
above the page" or "this floats over it" — there is no third meaning, and an
in-between value just makes two neighbouring surfaces look accidentally
different.

| Utility | Reads as | Use for |
|---|---|---|
| `shadow-sm` | Raised | Cards, tables, sidebars, toggle knobs, colour-picker thumbs |
| `shadow-lg` | Floating | Modals, sheets, dropdown/select menus, toasts, popovers |

`shadow-none` is the explicit *absence* of a shadow (outlined and flat cards,
disabled buttons), not a third step.

Rules:
- A raised element that becomes floating on interaction may go `sm` → `lg` on
  hover. Something already at `lg` does not deepen further — it changes its
  background instead.
- `shadow-md`, `shadow-xl` and a bare `shadow` are build failures. The bare
  `shadow` utility is the sneaky one: it resolves to a Tailwind default that
  `app.css` never defines, so no token controls it.
- Shadows carry elevation in **light mode only**. In dark mode the surface
  levels above do the work — see Surface Elevation Levels.

Enforced by `scripts/check-token-violations.js`.

## 📏 Spacing Rhythm

Layout spacing rides a **4px grid**. Half-steps (`gap-1.5`, `px-2.5`, `py-2.5`)
set up a second rhythm competing with the first: a 6px gap beside an 8px gap is
a 2px wobble nobody chose, and it accumulates down a dense form.

- `gap-*`, `space-x/y-*` and every padding utility must land on a whole step.
- **Margins are exempt**, because they carry optical nudges. `mt-0.5` on an
  icon sitting beside a first line of text is an alignment correction, not
  rhythm — Alert, ListItem, ToasterToast and the radio control all rely on it.
  Keep those to 0.5 and keep them on margins so the distinction stays visible.
- Icon sizes are their own scale (`size-3.5` = 14px, `size-4`, `size-5`), not
  spacing, and are unaffected.

Enforced by `scripts/check-token-violations.js`.

## 🔠 Type Scale

`Heading` and `Text` sit on **one** ramp rather than each carrying its own, so a
heading and the copy beneath it share line boxes instead of nearly matching.

| Step | `Heading` | `Text` |
|---|---|---|
| 36px | `level={1}` | — |
| 30px | `level={2}` | — |
| 24px | `level={3}` | — |
| 20px | `level={4}` | — |
| 18px | `level={5}` | `size="lg"` |
| 16px | `level={6}` | `size="md"` (default) |
| 14px | — | `size="sm"` |
| 12px | — | `size="xs"` |

Headings tighten tracking as they grow and are `semibold`/`bold`; `Text` takes a
`weight` prop (`normal` · `medium` · `semibold` · `bold`) so body copy can carry
emphasis without being promoted to a heading. `tone="label"` defaults to
`medium`; every other tone defaults to `normal`.

## 📁 File Structure

```
src/
└── app.css          ← 🎯 EDIT THIS FILE FOR ALL THEMING (single source of truth)

dist/                 ← ⚠️ GENERATED FILES - DON'T EDIT
├── zabi-components.css              (full CSS with dark mode)
├── zabi-components-theme.css       (light mode only)
├── zabi-components-theme-only.css  (light mode only)
├── zabi-components-theme-dark.css   (dark mode only)
├── zabi-components-theme-dark-only.css (dark mode only)
└── zabi-components-colors.css       (standalone, both modes)

examples/             ← ⚠️ EXAMPLES ONLY - DON'T EDIT
└── theme-extensions/
    ├── 02-custom-brand-colors.css
    └── 03-custom-semantic-colors.css
```

## ⚠️ Important Notes

1. **Never edit files in `dist/`** - These are automatically generated from `src/app.css` by `scripts/build-css.js`
2. **All theming is in `src/app.css`** - This is the single source of truth
3. **Always edit `src/app.css`** - This is your single source of truth
4. The `examples/` folder contains examples, not your actual theme
5. **Dist files are overwritten** every time you run `npm run build:css`

## 🔄 Build Process

When you edit `src/app.css`:

1. **Development**: Changes are automatically reflected (no build needed)
2. **Production**: Run `npm run build:css` to regenerate dist files
3. The build script (`scripts/build-css.js`) reads `src/app.css` and generates:
   - `zabi-components.css` - Full compiled CSS with Tailwind processed (includes dark mode)
   - `zabi-components-theme.css` - Theme block with Tailwind import (light mode only)
   - `zabi-components-theme-only.css` - Theme block only (light mode only)
   - `zabi-components-theme-dark.css` - Dark mode theme with Tailwind import
   - `zabi-components-theme-dark-only.css` - Dark mode theme only
   - `zabi-components-colors.css` - Standalone CSS custom properties (both light and dark)

## 🔄 After Making Changes

### For Development
After editing `src/app.css`, changes are automatically reflected in your app. No build needed!

### For Production/Library Build
If you're building the library for distribution:
```bash
npm run build:css  # Regenerates all dist CSS files from src/app.css
```

## Optional perceptual midpoint generation (OKLCH)

Base midpoints are frozen hex by default (`fixed` mode).  
For experimentation, you can generate midpoint steps in OKLCH interpolation and commit the resulting frozen values:

```bash
ZABI_BASE_SCALE_MODE=oklch npm run sync:tokens
npm run build:css
```

Notes:
- Primary anchors (`50, 100, 200 ... 950`) stay fixed.
- Midpoints (`75, 150, 250 ... 925`) are generated from adjacent anchors.
- Commit updated `src/app.css` and regenerated `dist/` outputs together.
