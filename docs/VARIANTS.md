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

Size variants are consistent across the components that take `SizeVariant`:

- **`sm`** - Small size
  - Use for: Compact spaces, dense layouts

- **`md`** - Medium size (default)
  - Use for: Standard layouts, most use cases

- **`lg`** - Large size
  - Use for: Prominent elements, spacious layouts

Button, IconButton, Input, Select and Slider share one height per size (32, 40
and 48px), so controls of the same size line up in a row.

On a touch screen (`pointer: coarse`) `sm` and `md` are 44px tall in all of
them, and an IconButton is 44px wide as well, so the row still lines up and
each control is a full touch target. Nothing changes with a mouse. `sm` and
`md` therefore look alike on a phone; use `lg` (48px) for the main action
there.

A few components have sizes of their own, because the shared three do not fit
them:

- **IconButton** and **Spinner** add **`xs`** (IconButton: a 24px box for dense, pointer-first layouts; it stays 24px on a touch screen, so use `sm` or larger there).
- **EmptyState** takes `default` | `compact`.
- **Drawer** takes `sm` | `md` | `lg` for the width of the panel, not a control height.
- **SegmentedControl** is 32, 40 and 48px tall as the controls above, and never less than 44px a segment on a touch screen, where the three sizes therefore look alike.
- **Rating** takes `sm` | `md` | `lg` for the star (20, 24 and 32px); the target around an interactive star stays at 44px or more.
- **DateField** and **TimeField** take the three sizes of Input and are exactly as tall, on a touch screen too.
- **Calendar** has no `size`: it is as wide as its container, in seven equal columns, with days at least 44px tall. Give it a width where the container is wide.
- **Button** is 32, 40 and 48px tall for a label on one line, and taller when the label wraps: the size is a minimum height. **IconButton**, **Input** and **Select** are fixed at the same three heights.
- **Stepper** takes `sm` | `md` | `lg` for its markers (1.5, 2 and 2.5rem: 24, 32 and 40px at the default text size) and its text (12, 14 and 16px). It is not a control height: nothing in it is pressed unless `interactive`, and then a completed step is a 44px target on a touch screen at every size. One limit: in the compact layout the segments share the width of the bar, so with more than six steps on a 320px screen (more than seven at 375px) a segment is narrower than 44px, though still 44px tall. A flow that long is better not `interactive` on a phone. As an item of a flex row, or anywhere else that gives it no width, the Stepper asks for 30rem and takes less when there is less.

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
3. **Size variants are always consistent** - `sm`, `md`, `lg` mean the same thing wherever a component takes `SizeVariant`
4. **Default is always available** - All components should have a `default` variant or size

## Type Definitions

The shared variants are defined in `src/components/types/variants.ts` and
exported from `zabi-components/types`:

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

### IconButton
- Variants: the Button variants
- Sizes: `xs`, `sm`, `md`, `lg`
- Tone: `default`, `danger` (colour intent for the `ghost` and `outline` variants)

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

### Slider
- Variants: `default`, `success`, `warning`, `error`, `info`
- Sizes: `sm`, `md`, `lg`

### DateField and TimeField
- Sizes: `sm`, `md`, `lg`
- States: `error` (with a message), `readonly`, `disabled`, `required`

### Calendar
- Event tones: `default`, `success`, `warning`, `danger`, `accent` (the colour of a day's dot)
- States of a day: today, selected, unavailable (`min`, `max`, `isDateDisabled`)

### Rating
- Sizes: `sm`, `md`, `lg`
- States: `readonly`, `clearable`, `disabled`

### SegmentedControl
- Sizes: `sm`, `md`, `lg`
- Width: `fullWidth` (default) or as wide as its labels

### Stepper
- Sizes: `sm`, `md`, `lg`
- Layouts: `auto` (default: compact while the Stepper itself is narrower than 30rem, full from there), `full`, `compact`
- States of a step: completed, current, upcoming (set by `current`, not by a prop of the step)
- Modes: `interactive` (completed steps are buttons that go back)

### Spinner
- Sizes: `xs`, `sm`, `md`, `lg`

### ConfirmDialog
- Variants: `danger`, `warning`, `info` (`ConfirmDialogVariant`)

### DropdownItem
- Tone: `default`, `danger` (`DropdownItemTone`)

### Drawer
- Side: `left`, `right`, `start`, `end` (`DrawerSide`)
- Sizes: `sm`, `md`, `lg` (`DrawerSize`)

### EmptyState
- Sizes: `default`, `compact`

### FloatingActionButton
- Position: `bottom-end` (default), `bottom-start`, `bottom-center`
- Shape: round with an icon, or `extended` with the label beside it
- No sizes: 56px, the same on every screen

### BottomTabBar
- Position: `fixed` (default), `static`. AppShell places the bar itself

### BottomSheet
- Snap points: `half`, `full` (`BottomSheetSnap`); one or both, through `snapPoints`

### Modal
- Sizes: `sm`, `md`, `lg`
- Full screen: `fullScreen` at every width, or `fullScreen="mobile"` below 768px

### TopNavbar
- Collapse point: `collapseAt` is `sm`, `md` (default), `lg` or `xl`, the width from which the links are a row

AppBar, AppShell and StickyActionBar have no variants or sizes.

## Best Practices

1. **Use semantic variants for states** - Don't use `error` variant just because you like red
2. **Use style variants for appearance** - Use `outline` when you want an outlined look, not to indicate state
3. **Be consistent** - Use the same variant names across similar components
4. **Document exceptions** - If a component has unique variants, document why
5. **Default to `default`** - Always provide a sensible default variant

## Migration Guide

When adding variants to existing components:

1. Check if semantic variants are appropriate
2. Use centralized type definitions from `src/components/types/variants.ts`
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
    <CardHeader title="Title" />
</Card>
```

### Size Variants
```svelte
<!-- Small button -->
<Button size="sm" variant="primary">Small</Button>

<!-- Large input -->
<Input size="lg" label="Name" />
```

