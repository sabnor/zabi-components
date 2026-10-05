# Zabi Components Theme Guide

Complete guide to using and customizing the Zabi Components theme system with Tailwind CSS v4.

## Table of Contents

- [Quick Start](#quick-start)
- [Theme Files](#theme-files)
- [Import Options](#import-options)
- [Theme Extension](#theme-extension)
- [Dark Mode](#dark-mode)
- [Color System](#color-system)
- [Customization Examples](#customization-examples)
- [Common Pitfalls](#common-pitfalls)

## Quick Start

### Basic Setup (Standalone)

If you don't have Tailwind CSS set up yet:

```css
/* app.css */
@import 'zabi-components/theme';
@import 'zabi-components/dist/zabi-components.css';
```

### Setup with Existing Tailwind

If you already have Tailwind CSS configured:

```css
/* app.css */
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/dist/zabi-components.css';
```

### With Dark Mode

```css
/* app.css */
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/theme-dark-only';
@import 'zabi-components/dist/zabi-components.css';
```

## Theme Files

Zabi Components provides multiple theme file variants:

| File | Description | Use Case |
|------|-------------|----------|
| `zabi-components/theme` | Full theme with Tailwind import | Standalone projects |
| `zabi-components/theme-only` | Theme without Tailwind import | Projects with existing Tailwind |
| `zabi-components/theme-dark` | Dark role remaps with Tailwind import; needs the light theme | Standalone + dark mode |
| `zabi-components/theme-dark-only` | Dark role remaps without Tailwind import; needs the light theme | Existing Tailwind + dark mode |

### Direct Path Imports

You can also import using direct paths:

```css
@import 'zabi-components/dist/zabi-components-theme.css';
@import 'zabi-components/dist/zabi-components-theme-only.css';
@import 'zabi-components/dist/zabi-components-theme-dark.css';
@import 'zabi-components/dist/zabi-components-theme-dark-only.css';
```

## Import Options

### Option 1: Standalone (No Existing Tailwind)

Best for new projects or projects without Tailwind:

```css
@import 'zabi-components/theme';
@import 'zabi-components/theme-dark'; /* Optional: for dark mode */
@import 'zabi-components/dist/zabi-components.css';
```

**Pros:**
- Simple setup
- No Tailwind configuration needed
- Everything included

**Cons:**
- Less control over Tailwind configuration
- Slightly larger bundle if you need custom Tailwind config

### Option 2: With Existing Tailwind

Best for projects already using Tailwind CSS:

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/theme-dark-only'; /* Optional: for dark mode */
@import 'zabi-components/dist/zabi-components.css';
```

**Pros:**
- Full control over Tailwind configuration
- Can customize Tailwind before importing theme
- Smaller bundle (no duplicate Tailwind import)

**Cons:**
- Requires Tailwind setup
- Must import Tailwind first

## Theme Extension

You can extend the Zabi theme with your own customizations using additional `@theme` blocks:

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';

/* Your custom theme extensions */
@theme {
  /* Custom font families */
  --font-family-title: 'Your Font', sans-serif;
  --font-family-body: 'Another Font', sans-serif;
  
  /* Custom colors */
  --color-custom-primary: #ff0000;
  --color-custom-secondary: #00ff00;
}

@import 'zabi-components/dist/zabi-components.css';
```

### Important: Import Order

The import order is critical:

1. **First:** `@import "tailwindcss"` (if using theme-only)
2. **Second:** `@import 'zabi-components/theme-only'` (or theme)
3. **Third:** Your custom `@theme` block (extends zabi theme)
4. **Fourth:** `@import 'zabi-components/dist/zabi-components.css'` (uses the theme)

This order ensures:
- Tailwind is available for `theme()` function calls
- Zabi theme is defined first
- Your extensions override zabi defaults
- Components can use all theme values

## Dark Mode

Import the dark theme file after the light one. It only remaps roles; the raw
palettes (`--zabi-brand-*`, `--zabi-accent-*`, `--zabi-base-*` and the other
ramps) are declared once, in the light theme, so the dark file does nothing on
its own.

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/theme-dark-only';
```

Dark is switched on the `<html>` element, by a class or by an attribute:

| On `<html>` | Result |
|---|---|
| nothing | light |
| `class="dark"` | dark |
| `data-theme="dark"` | dark (the same as the class) |
| `data-theme="light"` | light, whatever the system says |
| `data-theme="auto"` | follows the system (`prefers-color-scheme`) |

Following the system is opt-in. A page with no class and no attribute stays
light on a dark system, as it always has.

```html
<!-- Follow the phone's setting, with no script -->
<html data-theme="auto">
```

The three `data-theme` values also set `color-scheme`, so native controls and
scrollbars match. `.dark` does not; set `color-scheme` yourself if you use the
class.

Put the class or attribute on `<html>`. The role tokens are resolved on the
root element, so a `.dark` further down the tree does not re-theme its subtree.

`ThemeToggle` toggles the `dark` class, and Tailwind's `dark:` variant follows
the system unless you redefine it; neither reads `data-theme`.

### Manual Dark Mode Toggle

```javascript
document.documentElement.classList.toggle('dark');
// or
document.documentElement.dataset.theme = 'dark'; // 'light' | 'auto'
```

### Custom Dark Mode Colors

A brand, accent or neutral override needs no dark counterpart (see
[Customization Examples](#customization-examples)). To change one role in dark
only, declare it under all three dark selectors, after the imports:

```css
.dark,
[data-theme="dark"] {
  --color-link: var(--zabi-brand-200);
}

@media (prefers-color-scheme: dark) {
  [data-theme="auto"] {
    --color-link: var(--zabi-brand-200);
  }
}
```

## Color System

Zabi Components uses a semantic color system with the following color scales:

### Color Scales

- **Brand** - Primary brand colors (blue palette)
- **Accent** - Second brand colour for highlights, badges and celebrations (`--zabi-accent-*`, citron by default)
- **Citron** - Energetic/yellow colors
- **Pine** - Success/green colors
- **Iris** - Info/purple colors

Each scale includes shades from 50 (lightest) to 950 (darkest).

### Semantic Colors

Semantic colors map to specific use cases:

- `--color-background` - Main background
- `--color-headline` - Headings and titles
- `--color-body` - Body text
- `--color-description` - Secondary/description text
- `--color-caption` - Captions and labels
- `--color-border` - Borders and dividers
- `--color-surface-base` / `-raised` / `-elevated` / `-overlay` - Surface levels: page, cards, nested cards, floating panels
- `--color-surface-inset` - A recessed area on a card (a well); see THEMING.md, Surface Elevation Levels
- `--color-primary` - Primary actions
- `--color-on-brand` - Text on a primary fill (`--color-action-primary-text` follows it)
- `--color-accent`, `-hover`, `-active`, `-subtle`, `-border`, `-text` - The accent role
- `--color-on-accent` - Text on a solid accent fill
- `--color-secondary` - Secondary actions
- `--color-success` - Success states
- `--color-warning` - Warning states
- `--color-error` - Error states

### Using Colors

#### In CSS

```css
.my-element {
  background-color: var(--color-primary);
  color: var(--color-headline);
}
```

#### In Tailwind Classes

Zabi Components provides utility classes:

```html
<div class="bg-primary text-headline">
  Primary background with headline text
</div>
```

#### In Tailwind theme() Function

```css
.custom-class {
  color: theme(colors.brand.600);
  background: theme(colors.surface.elevated);
}
```

## Customization Examples

### Example 1: A Brand From Tokens Alone

Override the physical ramps on `:root`, once. Light and dark both follow; there
is nothing to repeat under `.dark`.

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/theme-dark-only';

:root {
  /* Primary actions, focus rings, links, brand tints */
  --zabi-brand-50: #fffbeb;
  /* … 100 to 900 … */
  --zabi-brand-950: #451a03;

  /* Second brand colour: --color-accent and its roles */
  --zabi-accent-50: #fdf2f8;
  /* … */
  --zabi-accent-950: #500724;

  /* Neutrals: text, borders, page and card surfaces, the dark surface levels.
     21 steps: 50, 75, 100, 150 … 900, 925, 950 */
  --zabi-base-50: #fafaf9;
  /* … */
  --zabi-base-950: #0c0a09;
}
```

Each ramp runs light (50) to dark (950). Light mode puts fills on step 600
with white text; dark mode mirrors the ramp, so the fill is step 400 with the
950 step as its text. A ramp whose 600 is too light for white text needs the
"on brand" knobs:

```css
:root {
  --zabi-on-brand: #451a03;       /* label on the primary fill, light mode */
  --zabi-on-brand-dark: #451a03;  /* the same, dark mode (default: brand-950) */
  --zabi-on-accent: #ffffff;      /* and for a solid accent fill */
  --zabi-on-accent-dark: #500724;
}
```

Check the result: 4.5:1 for the label on the fill, its hover (700) and its
active (800) step.

### Example 2: Custom Fonts

```css
:root {
  --font-family-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  /* Headings (h1–h6 and the Heading component). Defaults to the sans family. */
  --font-family-heading: 'Fraunces', var(--font-family-sans);
  /* CodeBlock */
  --font-family-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* What font-normal, font-medium, font-semibold and font-bold resolve to */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

Loading the font files is up to the app.

### Example 3: Custom Semantic Colors

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';

@theme {
  /* Custom primary color */
  --color-primary: theme(colors.purple.600);
  --color-primary-weak: theme(colors.purple.700);
  --color-primary-medium: theme(colors.purple.800);
  --color-primary-strong: theme(colors.purple.900);
}

@import 'zabi-components/dist/zabi-components.css';
```

### Example 4: Multiple Theme Variants

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';

/* Default theme */
@theme {
  --color-primary: theme(colors.blue.600);
}

/* Custom variant */
.variant-custom {
  --color-primary: theme(colors.purple.600);
  --color-secondary: theme(colors.pink.600);
}

@import 'zabi-components/dist/zabi-components.css';
```

## Common Pitfalls

### Pitfall 1: Wrong Import Order

**Wrong:**
```css
@import 'zabi-components/dist/zabi-components.css';
@import 'zabi-components/theme-only'; /* Too late! */
```

**Correct:**
```css
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/dist/zabi-components.css';
```

### Pitfall 2: Double Tailwind Import

**Wrong:**
```css
@import "tailwindcss";
@import 'zabi-components/theme'; /* This also imports Tailwind! */
```

**Correct:**
```css
@import "tailwindcss";
@import 'zabi-components/theme-only'; /* Use theme-only */
```

### Pitfall 3: Theme Extension After Components

**Wrong:**
```css
@import 'zabi-components/theme-only';
@import 'zabi-components/dist/zabi-components.css';
@theme { /* Too late! */ }
```

**Correct:**
```css
@import "tailwindcss";
@import 'zabi-components/theme-only';
@theme { /* Extend before components */ }
@import 'zabi-components/dist/zabi-components.css';
```

### Pitfall 4: Missing Dark Mode Import

If you want dark mode support, you must import the dark theme file:

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/theme-dark-only'; /* Don't forget this! */
@import 'zabi-components/dist/zabi-components.css';
```

### Pitfall 5: Using theme() Before Theme is Defined

**Wrong:**
```css
@theme {
  --color-custom: theme(colors.brand.600); /* Works */
  --color-other: theme(colors.custom.500); /* Fails - custom not defined yet */
}
```

**Correct:**
```css
@theme {
  --color-custom: theme(colors.brand.600);
  /* Define custom colors first, then reference them */
  --color-custom-500: #ff0000;
  --color-other: var(--color-custom-500); /* Use var() for custom colors */
}
```

## Troubleshooting

### Theme Variables Not Working

1. Check import order (theme must come before components CSS)
2. Verify you're using the correct theme file variant
3. Ensure Tailwind is imported if using `theme-only`
4. Check browser console for CSS errors

### Dark Mode Not Working

1. Ensure dark theme file is imported
2. Check that `class="dark"` or `data-theme="dark"` is on `<html>`, not on an element inside it
3. To follow the system, set `data-theme="auto"`; nothing follows it by default
4. Check that the light theme is imported too: the dark file only remaps its tokens

### Colors Not Updating

1. Clear browser cache
2. Restart dev server
3. Check for CSS specificity issues
4. Verify theme extension is after zabi theme import

## Advanced Usage

### Programmatic Theme Switching

```javascript
// Switch to dark mode
document.documentElement.classList.add('dark');

// Switch to light mode
document.documentElement.classList.remove('dark');

// Toggle
document.documentElement.classList.toggle('dark');
```

### Theme with Svelte

```svelte
<script>
  import { onMount } from 'svelte';
  
  let isDark = $state(false);
  
  onMount(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDark = prefersDark;
    updateTheme();
  });
  
  function updateTheme() {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<button on:click={() => { isDark = !isDark; updateTheme(); }}>
  Toggle Theme
</button>
```

## Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Zabi Components GitHub](https://github.com/zabi-components/zabi-components)

