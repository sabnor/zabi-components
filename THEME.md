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
| `zabi-components/theme-dark` | Dark mode with Tailwind import | Standalone + dark mode |
| `zabi-components/theme-dark-only` | Dark mode without Tailwind import | Existing Tailwind + dark mode |

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

Zabi Components supports dark mode through CSS custom properties in the `.dark` class.

### Automatic Dark Mode (System Preference)

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/theme-dark-only'; /* Supports system preference */
@import 'zabi-components/dist/zabi-components.css';
```

The dark theme file uses `@media (prefers-color-scheme: dark)` to automatically switch based on system preference.

### Manual Dark Mode Toggle

For manual dark mode toggling, add the `.dark` class to your HTML element:

```javascript
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

The dark theme file also includes `.dark` class support, so both system preference and manual toggle work.

### Custom Dark Mode Colors

You can override dark mode colors in your custom theme:

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';
@import 'zabi-components/theme-dark-only';

@theme {
  /* Your light mode customizations */
  --color-custom: #ff0000;
}

/* Custom dark mode overrides */
.dark {
  --color-custom: #ff6666; /* Lighter red for dark mode */
}

@import 'zabi-components/dist/zabi-components.css';
```

## Color System

Zabi Components uses a semantic color system with the following color scales:

### Color Scales

- **Brand** - Primary brand colors (blue palette)
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
- `--color-surface-elevated` - Elevated surfaces (cards, modals)
- `--color-surface-level-0/1/2` - Surface hierarchy
- `--color-primary` - Primary actions
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

### Example 1: Custom Brand Colors

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';

@theme {
  /* Override brand colors */
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

@import 'zabi-components/dist/zabi-components.css';
```

### Example 2: Custom Fonts

```css
@import "tailwindcss";
@import 'zabi-components/theme-only';

@theme {
  --font-family-title: 'Inter', 'Helvetica', sans-serif;
  --font-family-body: 'Inter', 'Helvetica', sans-serif;
  --font-family-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

@import 'zabi-components/dist/zabi-components.css';
```

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
2. Check that `.dark` class is applied to `<html>` or root element
3. Verify system preference detection (if using automatic mode)
4. Check that dark mode CSS custom properties are defined

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

