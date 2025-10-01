# Button Component Usage Guide

## Overview

The Button component is a modern, accessible, and fully tokenized component that supports 7 variants, multiple sizes, and comprehensive state management. It uses semantic design tokens for consistent theming across light and dark modes.

## Features

- ✅ **7 Variants**: primary, secondary, success, warning, danger, ghost, link
- ✅ **3 Sizes**: sm, md, lg
- ✅ **Full State Coverage**: default, hover, active, focus, disabled, loading
- ✅ **Accessibility**: WCAG AA compliant, keyboard navigation, ARIA support
- ✅ **Semantic Tokens**: Uses design system tokens, no hardcoded values
- ✅ **Theme Support**: Automatic light/dark mode adaptation
- ✅ **TypeScript**: Full type safety and IntelliSense support

## Basic Usage

```svelte
<script>
  import { Button } from '$lib/components/atoms';
</script>

<!-- Basic button -->
<Button>Click me</Button>

<!-- With variant -->
<Button variant="primary">Primary Button</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Cancel</Button>
```

## Variants

### Primary (Default)
```svelte
<Button variant="primary">Primary Action</Button>
```
- Background: `color.primary`
- Text: `color.surface` (inverse)
- Use for: Main actions, CTAs

### Secondary
```svelte
<Button variant="secondary">Secondary Action</Button>
```
- Background: `color.surface-alt`
- Text: `color.text.primary`
- Use for: Secondary actions, alternatives

### Success
```svelte
<Button variant="success">Save Changes</Button>
```
- Background: `color.success`
- Text: `color.surface` (inverse)
- Use for: Positive actions, confirmations

### Warning
```svelte
<Button variant="warning">Proceed with Caution</Button>
```
- Background: `color.warning`
- Text: `color.surface` (inverse)
- Use for: Cautionary actions

### Danger
```svelte
<Button variant="danger">Delete Forever</Button>
```
- Background: `color.danger`
- Text: `color.surface` (inverse)
- Use for: Destructive actions

### Ghost
```svelte
<Button variant="ghost">Cancel</Button>
```
- Background: transparent
- Text: `color.text.primary`
- Hover: `color.surface-alt`
- Use for: Subtle actions, overlays

### Link
```svelte
<Button variant="link">Learn More</Button>
```
- Background: transparent
- Text: `color.primary`
- Hover: underline
- Use for: Text-like actions, navigation

## Sizes

```svelte
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

## States

### Loading State
```svelte
<Button loading>Processing...</Button>
<Button variant="primary" loading>Save Changes</Button>
```

### Disabled State
```svelte
<Button disabled>Cannot Click</Button>
<Button variant="danger" disabled>Delete (Disabled)</Button>
```

### Full Width
```svelte
<Button fullWidth>Full Width Button</Button>
```

## Icons

```svelte
<script>
  import { SearchIcon, ArrowRightIcon } from 'lucide-svelte';
</script>

<!-- Left icon -->
<Button iconLeft={SearchIcon}>Search</Button>

<!-- Right icon -->
<Button iconRight={ArrowRightIcon}>Continue</Button>

<!-- Both icons -->
<Button iconLeft={SearchIcon} iconRight={ArrowRightIcon}>
  Search & Continue
</Button>

<!-- Icons with loading (icons hidden during loading) -->
<Button iconLeft={SearchIcon} loading>Searching...</Button>
```

## Accessibility

### ARIA Labels
```svelte
<!-- Icon-only button -->
<Button ariaLabel="Close dialog" variant="ghost">×</Button>

<!-- Described button -->
<Button ariaDescribedBy="help-text">Submit</Button>
<div id="help-text">This will submit your form</div>
```

### Toggle Buttons
```svelte
<Button 
  ariaPressed={isPressed} 
  on:click={() => isPressed = !isPressed}
>
  Toggle
</Button>
```

### Expandable Controls
```svelte
<Button 
  ariaExpanded={isOpen}
  ariaControls="menu"
  on:click={() => isOpen = !isOpen}
>
  Menu
</Button>
```

## Event Handling

```svelte
<script>
  function handleClick(event) {
    console.log('Button clicked!', event);
  }
</script>

<Button on:click={handleClick}>Click Me</Button>
```

## Custom Styling

```svelte
<!-- Additional classes -->
<Button className="my-custom-class">Custom Styled</Button>

<!-- Full width with custom styling -->
<Button fullWidth className="mt-4 font-bold">
  Custom Full Width
</Button>
```

## Form Integration

```svelte
<form>
  <input type="text" placeholder="Name" />
  
  <!-- Submit button -->
  <Button type="submit" variant="primary">Submit Form</Button>
  
  <!-- Reset button -->
  <Button type="reset" variant="secondary">Reset</Button>
</form>
```

## Complete Example

```svelte
<script>
  import { Button } from '$lib/components/atoms';
  import { SaveIcon, TrashIcon, EditIcon } from 'lucide-svelte';
  
  let isSaving = false;
  let isDeleting = false;
  
  async function handleSave() {
    isSaving = true;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    isSaving = false;
  }
  
  function handleDelete() {
    if (confirm('Are you sure?')) {
      isDeleting = true;
      // Delete logic
    }
  }
</script>

<div class="flex gap-4 flex-wrap">
  <!-- Primary action -->
  <Button 
    variant="primary" 
    iconLeft={SaveIcon}
    loading={isSaving}
    on:click={handleSave}
  >
    {isSaving ? 'Saving...' : 'Save Changes'}
  </Button>
  
  <!-- Secondary action -->
  <Button variant="secondary" iconLeft={EditIcon}>
    Edit
  </Button>
  
  <!-- Destructive action -->
  <Button 
    variant="danger" 
    iconLeft={TrashIcon}
    loading={isDeleting}
    on:click={handleDelete}
  >
    {isDeleting ? 'Deleting...' : 'Delete'}
  </Button>
  
  <!-- Cancel action -->
  <Button variant="ghost">
    Cancel
  </Button>
  
  <!-- Link action -->
  <Button variant="link">
    Learn More
  </Button>
</div>
```

## Design Tokens Used

The Button component uses these semantic tokens:

- **Colors**: `primary`, `secondary`, `success`, `warning`, `error`, `surface`, `text`
- **Spacing**: `sm`, `md`, `lg` for padding and gaps
- **Border Radius**: `md`, `lg` for rounded corners
- **Shadows**: `adaptive-sm`, `adaptive-md` for elevation
- **Focus**: `focus-ring` for keyboard navigation

All tokens automatically adapt to light/dark themes.

## Best Practices

1. **Use semantic variants**: Choose variants that match the action's intent
2. **Provide clear labels**: Use descriptive text and ARIA labels
3. **Handle loading states**: Show loading spinners for async actions
4. **Group related actions**: Use consistent variants for related buttons
5. **Test keyboard navigation**: Ensure all buttons are accessible via keyboard
6. **Use appropriate sizes**: Match button size to content hierarchy

## Migration from Old Button

If migrating from the old Button component:

```svelte
<!-- Old -->
<Button variant="brand" text="Click me" />

<!-- New -->
<Button variant="primary">Click me</Button>

<!-- Old -->
<Button variant="danger" loading={true} text="Delete" />

<!-- New -->
<Button variant="danger" loading>Delete</Button>
```

Key changes:
- `variant="brand"` → `variant="primary"`
- `text` prop removed, use slot content
- `loading={true}` → `loading`
- Added `warning` and `link` variants
- Improved accessibility and semantic tokens
