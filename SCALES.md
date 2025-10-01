# Tailwind Scales Documentation

This document provides comprehensive information about the custom Tailwind scales that support both light and dark modes in the zabi-components library.

## Overview

The scales system provides a consistent design language across all components with automatic dark mode support. All scales are designed to work seamlessly with Tailwind CSS and include both light and dark mode variants.

## Color Scales

### Primary Colors
A blue-based color palette for primary actions and branding.

```css
/* Usage examples */
bg-primary-500    /* Base primary color */
bg-primary-600    /* Hover state */
text-primary-700  /* Darker text */
border-primary-300 /* Light border */
```

**Scale:** `50` (lightest) → `950` (darkest)

### Secondary Colors
A purple-based color palette for secondary actions and accents.

```css
/* Usage examples */
bg-secondary-500
text-secondary-600
border-secondary-400
```

### Neutral Colors
A comprehensive gray scale for text, borders, and backgrounds.

```css
/* Usage examples */
bg-neutral-100    /* Light backgrounds */
text-neutral-600  /* Secondary text */
border-neutral-300 /* Subtle borders */
```

### Semantic Colors
Pre-defined colors for specific states and feedback.

#### Success (Green)
```css
bg-success-500    /* Success backgrounds */
text-success-600  /* Success text */
border-success-400 /* Success borders */
```

#### Warning (Yellow/Orange)
```css
bg-warning-500    /* Warning backgrounds */
text-warning-600  /* Warning text */
border-warning-400 /* Warning borders */
```

#### Error (Red)
```css
bg-error-500      /* Error backgrounds */
text-error-600    /* Error text */
border-error-400  /* Error borders */
```

## Background & Surface Colors

### Background Colors
Semantic background colors that automatically adapt to light/dark mode.

```css
bg-primary        /* Main background */
bg-secondary      /* Secondary background */
bg-tertiary       /* Tertiary background */
```

### Surface Colors
Colors for cards, modals, and elevated surfaces.

```css
bg-surface-primary    /* Standard surface */
bg-surface-secondary  /* Secondary surface */
bg-surface-tertiary   /* Tertiary surface */
bg-surface-elevated   /* Elevated surface (more shadow) */
```

## Text Colors

Semantic text colors that automatically adapt to the current theme.

```css
text-primary      /* Primary text color */
text-secondary    /* Secondary text color */
text-tertiary     /* Tertiary text color */
text-inverse      /* Inverse text color */
```

## Border Colors

Consistent border colors with theme support.

```css
border-primary    /* Primary border color */
border-secondary  /* Secondary border color */
border-focus      /* Focus state border color */
```

## Typography Scale

Extended typography scale with proper line heights.

```css
text-2xs          /* 10px / 12px line height */
text-xs           /* 12px / 16px line height */
text-sm           /* 14px / 20px line height */
text-base         /* 16px / 24px line height */
text-lg           /* 18px / 28px line height */
text-xl           /* 20px / 28px line height */
text-2xl          /* 24px / 32px line height */
text-3xl          /* 30px / 36px line height */
text-4xl          /* 36px / 40px line height */
text-5xl          /* 48px / 48px line height */
text-6xl          /* 60px / 60px line height */
text-7xl          /* 72px / 72px line height */
text-8xl          /* 96px / 96px line height */
text-9xl          /* 128px / 128px line height */
```

## Spacing Scale

Extended spacing scale for consistent layouts.

```css
/* Standard spacing */
p-1, m-1          /* 4px */
p-2, m-2          /* 8px */
p-4, m-4          /* 16px */
p-8, m-8          /* 32px */

/* Extended spacing */
p-18, m-18        /* 72px */
p-88, m-88        /* 352px */
p-128, m-128      /* 512px */
p-256, m-256      /* 1024px */
p-384, m-384      /* 1536px */
```

## Border Radius Scale

Consistent border radius values.

```css
rounded-none      /* 0px */
rounded-sm        /* 2px */
rounded           /* 4px (default) */
rounded-md        /* 6px */
rounded-lg        /* 8px */
rounded-xl        /* 12px */
rounded-2xl       /* 16px */
rounded-3xl       /* 24px */
rounded-4xl       /* 32px */
rounded-full      /* 9999px */
```

## Shadow Scale

Comprehensive shadow system with dark mode support.

### Standard Shadows
```css
shadow-xs         /* Extra small shadow */
shadow-sm         /* Small shadow */
shadow            /* Default shadow */
shadow-md         /* Medium shadow */
shadow-lg         /* Large shadow */
shadow-xl         /* Extra large shadow */
shadow-2xl        /* 2X large shadow */
```

### Adaptive Shadows
Shadows that automatically adjust opacity for dark mode.

```css
shadow-adaptive-sm    /* Adaptive small shadow */
shadow-adaptive-md    /* Adaptive medium shadow */
shadow-adaptive-lg    /* Adaptive large shadow */
shadow-adaptive-xl    /* Adaptive extra large shadow */
```

### Dark Mode Specific Shadows
```css
shadow-dark-sm    /* Dark mode small shadow */
shadow-dark-md    /* Dark mode medium shadow */
shadow-dark-lg    /* Dark mode large shadow */
shadow-dark-xl    /* Dark mode extra large shadow */
```

## Animation Scale

Custom animations for enhanced user experience.

```css
animate-fade-in       /* Fade in animation */
animate-fade-out      /* Fade out animation */
animate-slide-in-up   /* Slide in from bottom */
animate-slide-in-down /* Slide in from top */
animate-slide-in-left /* Slide in from left */
animate-slide-in-right /* Slide in from right */
animate-scale-in      /* Scale in animation */
animate-scale-out     /* Scale out animation */
animate-bounce-gentle /* Gentle bounce animation */
animate-pulse-slow    /* Slow pulse animation */
```

## Z-Index Scale

Organized z-index values for proper layering.

```css
z-0               /* Base layer */
z-10              /* 10 */
z-20              /* 20 */
z-30              /* 30 */
z-40              /* 40 */
z-50              /* 50 */
z-60              /* 60 */
z-70              /* 70 */
z-80              /* 80 */
z-90              /* 90 */
z-100             /* 100 */
z-modal           /* 1000 - Modals */
z-popover         /* 1010 - Popovers */
z-tooltip         /* 1020 - Tooltips */
z-notification    /* 1030 - Notifications */
```

## Component Classes

Pre-built component classes that use the scale system.

### Cards
```css
.card             /* Standard card with adaptive styling */
.card-elevated    /* Elevated card with more shadow */
```

### Buttons
```css
.button-primary   /* Primary button styling */
.button-secondary /* Secondary button styling */
```

### Inputs
```css
.input            /* Input field with adaptive styling */
```

## Dark Mode Implementation

### Automatic Theme Detection
The system automatically detects the user's preferred color scheme and applies the appropriate theme.

### Manual Theme Control
Use the `ThemeToggle` component or manually add/remove the `dark` class:

```javascript
// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Set specific theme
document.documentElement.classList.add('dark');    // Dark mode
document.documentElement.classList.remove('dark'); // Light mode
```

### CSS Custom Properties
The system uses CSS custom properties for easy theme switching:

```css
:root {
  --color-background-primary: 255 255 255; /* Light mode */
  --color-text-primary: 10 10 10;
}

.dark {
  --color-background-primary: 10 10 10;    /* Dark mode */
  --color-text-primary: 250 250 250;
}
```

## Usage Examples

### Basic Component
```svelte
<div class="bg-surface-primary border border-primary rounded-lg shadow-adaptive-sm p-4">
  <h2 class="text-xl font-semibold text-primary mb-2">Card Title</h2>
  <p class="text-secondary">Card content with adaptive colors.</p>
</div>
```

### Button with Hover States
```svelte
<button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors">
  Click me
</button>
```

### Form Input
```svelte
<input 
  class="input w-full" 
  placeholder="Enter text..."
  type="text"
/>
```

### Responsive Layout
```svelte
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
  <div class="card p-4">Content 1</div>
  <div class="card p-4">Content 2</div>
  <div class="card p-4">Content 3</div>
</div>
```

## Best Practices

1. **Use Semantic Colors**: Prefer semantic color names over specific color values for better maintainability.

2. **Leverage Adaptive Classes**: Use adaptive classes like `bg-primary` instead of specific colors when possible.

3. **Consistent Spacing**: Use the spacing scale consistently throughout your application.

4. **Shadow Hierarchy**: Use appropriate shadow levels to create visual hierarchy.

5. **Animation Performance**: Use the provided animations sparingly and consider performance implications.

6. **Accessibility**: Ensure sufficient color contrast in both light and dark modes.

## Migration Guide

If you're migrating from standard Tailwind colors:

1. Replace `bg-gray-100` with `bg-neutral-100`
2. Replace `text-gray-600` with `text-secondary`
3. Replace `border-gray-300` with `border-primary`
4. Use adaptive classes for theme-aware components

## Browser Support

The scales system supports all modern browsers that support:
- CSS Custom Properties (CSS Variables)
- CSS Grid
- Flexbox
- CSS Transitions

## Performance Considerations

- CSS custom properties are efficiently handled by modern browsers
- The scale system is optimized for minimal CSS output
- Dark mode switching is performant with class-based toggling
- Animations use hardware acceleration when available
