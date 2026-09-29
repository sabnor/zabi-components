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

## Versions before 8.0.1

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
