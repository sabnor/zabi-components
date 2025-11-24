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
Edit the `@theme` block in `src/app.css` (lines 7-236)

### Dark Mode Theme
Edit the `.dark` block in `src/app.css` (lines 248-398)

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

The `dist/` files are **for consumers** of your library who want to import the theme separately:

### For Library Developers (You)
- **Edit**: `src/app.css` only
- **Build**: Run `npm run build:css` to regenerate all dist files

### For Library Consumers
They can import different files depending on their needs:

1. **`zabi-components-theme.css`** - Theme with Tailwind import (standalone use)
   ```css
   @import 'zabi-components/theme';
   ```

2. **`zabi-components-theme-only.css`** - Theme only (if they already have Tailwind)
   ```css
   @import 'zabi-components/theme-only';
   ```

3. **`zabi-components-theme-dark.css`** - Dark mode theme (import after main theme)
   ```css
   @import 'zabi-components/theme';
   @import 'zabi-components/theme-dark';
   ```

4. **`zabi-components.css`** - Full CSS with all utilities (includes dark mode)
   ```css
   @import 'zabi-components/dist/zabi-components.css';
   ```

5. **`zabi-components-colors.css`** - Standalone CSS custom properties (no Tailwind needed)
   ```css
   @import 'zabi-components/dist/zabi-components-colors.css';
   ```

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

The primary button uses `--color-action-primary` which defaults to `brand-800`. To change it:

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
- **brand-600**: Primary color, links
- **brand-700**: Link hover, primary hover
- **brand-800**: **Primary buttons** (`action-primary`)
- **brand-900**: Primary button hover
- **brand-950**: Darkest brand shade

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
- **Has explicit dark mode overrides** (lines 399-404) because red colors aren't automatically inverted:
  ```css
  .dark {
    --color-action-danger: theme(colors.red.500);
    --color-action-danger-hover: theme(colors.red.600);
    --color-action-danger-active: theme(colors.red.700);
    /* ... */
  }
  ```

### In Generated Files

- **`dist/zabi-components.css`**: Has dark mode at line 2178, danger actions at lines 2264-2269
- **`dist/zabi-components-theme-dark-only.css`**: Has dark mode action colors at lines 119-130 (only danger has explicit overrides)
- **`dist/zabi-components-theme-only.css`**: Only has light mode (@theme block), no dark mode
- **`dist/zabi-components-theme.css`**: Only has light mode (@theme block), no dark mode

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
