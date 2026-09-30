# Theme CSS imports (consumers)

Published CSS files are **generated** from `src/app.css` when you run `npm run build:css`. Do not edit files under `dist/` by hand.

## Canonical recommendation

For most Tailwind v4 apps, use:

```css
@import "tailwindcss";
@import "zabi-components/theme-only";
@import "zabi-components/theme-dark-only";
```

Without Tailwind, import the compiled stylesheet on its own:

```css
@import "zabi-components/css";
```

Use short package exports by default. Legacy deep `dist` imports remain supported for compatibility.

## What the theme files contain

`theme` and `theme-only` hold three things:

1. An `@source` directive for the package's own components. Tailwind CSS v4 does not scan `node_modules`, and this is what makes it generate the classes the components use. You do not need an `@source` line of your own.
2. The `@theme` block with every token.
3. The hand-written component rules that Tailwind cannot generate from the tokens: `.focus-ring`, `.text-action-primary`, the action hover, active and disabled states, the semantic colour classes and the `z-*` scale.

`theme-dark` and `theme-dark-only` hold the `.dark { … }` overrides.

The universal scrollbar rules are in the compiled `css` bundle only. Importing a theme does not restyle the scrollbars in your app; add `.scrollbar-semantic` where you want them.

## Tailwind together with the compiled stylesheet

`zabi-components/css` is a finished Tailwind build. It carries its own copy of every utility the components use, `w-full`, `px-6` and `mt-10` among them, in the same `utilities` layer your Tailwind build writes to. Two builds cannot be sorted into one order, so the import order decides which copy wins:

- **Tailwind first, `css` second.** The package's plain utilities land after your variants. `w-full md:w-1/2` stays full width, and `px-6 md:px-8` keeps the narrow padding, wherever the package ships the plain class too.
- **`css` first, Tailwind second.** Your plain utilities land after the package's variants. `Modal` declares `items-end md:items-center` and `p-0 md:p-4`; if your app uses `items-end` or `p-0` anywhere, the dialog stays at the bottom edge, without padding, on wide screens. A component's own `p-6 pt-0` loses its `pt-0` the same way.

Neither order is right. With Tailwind in the app, import `theme-only` and `theme-dark-only` instead, as above: Tailwind then generates each utility once, in its own order, and both cases resolve. If you started on 8.0.0, where `css` was the only import that worked, switch when you upgrade.

The hand-written colour classes (`bg-card`, `text-headline`, `border-border` and the rest) are outside every layer, in `css` and in the theme files alike, so they win over any utility on the same element: `bg-card md:bg-red-500` keeps the card colour. Change the colour by replacing the class, not by adding a variant next to it.

## Version 8.0.0 and earlier

In 8.0.0 and 7.0.2 the theme files were published without semicolons, without the `@source` directive and without the component rules, so they left components unstyled. Upgrade, or import `zabi-components/css`, which worked in those versions too.

## Package export paths

Use these subpaths with your bundler or `npm`/`pnpm` resolution:

| Export | Resolves to | Use case |
|--------|-------------|----------|
| `zabi-components/theme` | `zabi-components-theme.css` | Tailwind **not** already in the project; ships `@import "tailwindcss"` + `@theme`. |
| `zabi-components/theme-only` | `zabi-components-theme-only.css` | Tailwind **already** configured; merge only the `@theme` block. |
| `zabi-components/theme-dark` | `zabi-components-theme-dark.css` | Same as `theme` but for **dark**; includes Tailwind import + `.dark { … }`. |
| `zabi-components/theme-dark-only` | `zabi-components-theme-dark-only.css` | Tailwind present; **only** `.dark { … }` overrides (import after light theme). |
| `zabi-components/colors` | `zabi-components-colors.css` | **No Tailwind**: `:root` + `.dark` CSS variables only. |
| `zabi-components/css` | `zabi-components.css` | Full compiled CSS (utilities, components styles, dark). |

### Legacy export paths (supported, deprecated in docs)

These are still exported for backward compatibility but are not the recommended imports for new integration:

| Legacy export | Resolves to |
|--------|-------------|
| `zabi-components/dist/zabi-components.css` | `zabi-components.css` |
| `zabi-components/dist/zabi-components-colors.css` | `zabi-components-colors.css` |
| `zabi-components/dist/zabi-components-theme.css` | `zabi-components-theme.css` |
| `zabi-components/dist/zabi-components-theme-only.css` | `zabi-components-theme-only.css` |
| `zabi-components/dist/zabi-components-theme-dark.css` | `zabi-components-theme-dark.css` |
| `zabi-components/dist/zabi-components-theme-dark-only.css` | `zabi-components-theme-dark-only.css` |

## Decision matrix

1. **Vanilla CSS or no Tailwind** → `colors` (or full `css` if you need utility classes from the bundle).
2. **Tailwind v4 app, extend design tokens** → `theme-only` (+ `theme-dark-only` if you use `class="dark"` / dark mode).
3. **Minimal setup, one import for light** → `theme`.
4. **Dark as a second file** → `theme` + `theme-dark`, or `theme-only` + `theme-dark-only`.

## Examples

### Vite / SvelteKit (Tailwind already installed)

```css
/* src/app.css */
@import "tailwindcss";
@import "zabi-components/theme-only";
@import "zabi-components/theme-dark-only";
```

### Vite (no Tailwind; variables only)

```css
@import "zabi-components/colors";
```

### Full stylesheet (Storybook, demos)

```css
@import "zabi-components/css";
```

### Next.js App Router (global CSS)

```css
/* app/globals.css */
@import "tailwindcss";
@import "zabi-components/theme-only";
@import "zabi-components/theme-dark-only";
```

### Vanilla CSS app (no Tailwind)

```css
@import "zabi-components/colors";
```

Toggle `.dark` at the root element to activate dark tokens:

```html
<html class="dark">
```

## Maintainer checklist (token changes)

1. Edit **`src/app.css`** only (`@theme` for light tokens, `.dark` for overrides).
2. If you change **physical base ramp** hexes, keep the **mirrored** `--zabi-base-*` block inside `.dark` in sync with `@theme` (required for standalone dark imports).
3. Run **`npm run build:css`** (or **`npm run build:lib`** before publish).
4. Confirm **`node scripts/verify-build.js`** passes in CI or locally after builds.

## Generated outputs (reference)

| File | Contents |
|------|----------|
| `zabi-components.css` | PostCSS/Tailwind output: utilities + theme + `.dark`. |
| `zabi-components-theme.css` | `@import tailwind` + `@theme`. |
| `zabi-components-theme-only.css` | `@theme` only. |
| `zabi-components-theme-dark.css` | `@import tailwind` + `.dark`. |
| `zabi-components-theme-dark-only.css` | `.dark` only. |
| `zabi-components-colors.css` | `:root` + `.dark` as plain custom properties. |

Build logic lives in **`scripts/build-css.js`** (see file header for behavior).
