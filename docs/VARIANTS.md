# Variant Naming Conventions

This document outlines the variant naming conventions used across zabi-components.

## Overview

Variants in zabi-components are categorized into two main types:
1. **Semantic Color Variants** - Indicate meaning or state
2. **Style Variants** - Change visual appearance only

## Semantic Color Variants

Semantic color variants use colors to convey meaning or state. These are consistent across components that use them.

### Core Semantic Variants

- **`default`** - Standard/default appearance
  - Use for: Normal state, default appearance
  - Color: Neutral/base colors

- **`success`** - Positive/successful state
  - Use for: Success messages, completed actions, positive feedback
  - Color: Green palette

- **`warning`** - Cautionary state
  - Use for: Warnings, cautionary messages, pending actions
  - Color: Yellow/amber palette

- **`error`** - Error/dangerous state
  - Use for: Errors, destructive actions, critical issues
  - Color: Red palette

- **`info`** - Informational state
  - Use for: Information messages, neutral notifications
  - Color: Blue palette

### Extended Semantic Variants

Some components support additional semantic variants:

- **`neutral`** - Neutral state
  - Use for: Neutral information, no particular state
  - Color: Gray palette

- **`energetic`** - Energetic/vibrant state
  - Use for: High-energy content, vibrant highlights
  - Color: Yellow/orange palette

### Components Using Semantic Variants

- **Input** - `default` | `success` | `warning` | `error`
- **Textarea** - `default` | `success` | `warning` | `error`
- **Badge** - `default` | `success` | `warning` | `error` | `info` | `neutral` | `energetic`
- **Alert** - `info` | `success` | `warning` | `error` | `neutral` | `energetic`

## Style Variants

Style variants change the visual appearance of components without necessarily conveying meaning.

### Button Variants

Button variants are style-based and indicate different visual treatments:

- **`primary`** - Primary action button
  - Use for: Main actions, primary CTAs
  - Style: Solid background with primary color

- **`secondary`** - Secondary action button
  - Use for: Secondary actions, alternative options
  - Style: Light background with colored text

- **`danger`** - Destructive action button
  - Use for: Destructive actions (delete, remove)
  - Style: Red/danger color scheme

- **`ghost`** - Ghost/transparent button
  - Use for: Tertiary actions, subtle interactions
  - Style: Transparent background, visible on hover

- **`outline`** - Outlined button
  - Use for: Secondary actions with border emphasis
  - Style: Transparent background with border

- **`link`** - Link-style button
  - Use for: Text links styled as buttons
  - Style: Minimal styling, underlined on hover

### Card Variants

Card variants change the visual appearance of cards:

- **`default`** - Default card appearance
  - Style: Subtle shadow, standard border

- **`elevated`** - Elevated card appearance
  - Style: Stronger shadow for elevated look

- **`outlined`** - Outlined card
  - Style: Border with no shadow

- **`flat`** - Flat card
  - Style: No shadow, no border (minimal)

## Size Variants

Size variants are consistent across all components:

- **`sm`** - Small size
  - Use for: Compact spaces, dense layouts

- **`md`** - Medium size (default)
  - Use for: Standard layouts, most use cases

- **`lg`** - Large size
  - Use for: Prominent elements, spacious layouts

## Usage Guidelines

### When to Use Semantic Variants

Use semantic color variants when:
- The variant indicates a state or meaning
- You want consistent color coding across components
- The color conveys important information

**Example:**
```svelte
<!-- Good: Using semantic variant for error state -->
<Input variant="error" label="Email" message="Invalid email address" />

<!-- Good: Using semantic variant for success state -->
<Badge variant="success" text="Active" />
```

### When to Use Style Variants

Use style variants when:
- The variant changes visual appearance only
- Different visual treatments are needed
- The variant doesn't convey meaning

**Example:**
```svelte
<!-- Good: Using style variant for visual appearance -->
<Button variant="outline">Cancel</Button>
<Button variant="primary">Submit</Button>

<!-- Good: Using style variant for card appearance -->
<Card variant="elevated">Content</Card>
```

### Consistency Rules

1. **Semantic variants should be consistent** - If a component supports `success`, it should use the same green color as other components
2. **Style variants can be component-specific** - Button variants don't need to match Card variants
3. **Size variants are always consistent** - `sm`, `md`, `lg` mean the same thing across all components
4. **Default is always available** - All components should have a `default` variant or size

## Type Definitions

All variants are defined in `src/types/variants.ts`:

```typescript
// Semantic variants
export type SemanticVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ExtendedSemanticVariant = SemanticVariant | 'neutral' | 'energetic';

// Style variants
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'link';
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

// Size variants
export type SizeVariant = 'sm' | 'md' | 'lg';
```

## Component-Specific Variants

### Button
- Variants: `primary`, `secondary`, `danger`, `ghost`, `outline`, `link`
- Sizes: `sm`, `md`, `lg`

### Card
- Variants: `default`, `elevated`, `outlined`, `flat`
- Sizes: `sm`, `md`, `lg`

### Input / Textarea
- Variants: `default`, `success`, `warning`, `error`
- Sizes: `sm`, `md`, `lg`

### Badge
- Variants: `default`, `success`, `warning`, `error`, `info`, `neutral`, `energetic`
- Sizes: `sm`, `md`, `lg`

### Alert
- Variants: `info`, `success`, `warning`, `error`, `neutral`, `energetic`

## Best Practices

1. **Use semantic variants for states** - Don't use `error` variant just because you like red
2. **Use style variants for appearance** - Use `outline` when you want an outlined look, not to indicate state
3. **Be consistent** - Use the same variant names across similar components
4. **Document exceptions** - If a component has unique variants, document why
5. **Default to `default`** - Always provide a sensible default variant

## Migration Guide

When adding variants to existing components:

1. Check if semantic variants are appropriate
2. Use centralized type definitions from `src/types/variants.ts`
3. Update component props to use the types
4. Add stories for all variants in Storybook
5. Document variants in component API docs

## Examples

### Semantic Variants
```svelte
<!-- Input with error state -->
<Input variant="error" label="Email" message="Invalid email" />

<!-- Badge with success state -->
<Badge variant="success" text="Active" />

<!-- Alert with warning -->
<Alert variant="warning" title="Warning" message="Please review" />
```

### Style Variants
```svelte
<!-- Button with outline style -->
<Button variant="outline">Cancel</Button>

<!-- Card with elevated style -->
<Card variant="elevated">
    <CardHeader>
        <CardTitle>Title</CardTitle>
    </CardHeader>
</Card>
```

### Size Variants
```svelte
<!-- Small button -->
<Button size="sm" variant="primary">Small</Button>

<!-- Large input -->
<Input size="lg" label="Name" />
```

