# Keyboard Navigation Guide

This guide documents keyboard navigation patterns and standards for zabi-components.

## Standard Keyboard Patterns

### Basic Navigation

- **Tab**: Move forward through interactive elements
- **Shift + Tab**: Move backward through interactive elements
- **Enter**: Activate buttons, links, and menu items
- **Space**: Activate buttons and checkboxes (when focused)
- **Escape**: Close modals, dropdowns, and other overlays

### Arrow Key Navigation

Arrow keys are used for navigation within components that contain multiple related items:

- **Arrow Right / Arrow Down**: Move to next item
- **Arrow Left / Arrow Up**: Move to previous item
- **Home**: Move to first item
- **End**: Move to last item

## Component-Specific Patterns

### Button Component

**Keyboard Support:**
- ✅ **Enter**: Activates the button
- ✅ **Space**: Activates the button (when focused)
- ✅ **Tab**: Receives focus
- ✅ **Shift + Tab**: Loses focus

**Usage:**
```svelte
<Button onclick={handleClick}>Click me</Button>
```

**Best Practices:**
- Buttons should always be keyboard accessible
- Focus styles must be visible
- Disabled buttons should not receive focus

---

### Input Component

**Keyboard Support:**
- ✅ **Tab**: Move to input field
- ✅ **Shift + Tab**: Move away from input field
- ✅ Standard text input keys (typing, backspace, etc.)
- ✅ **Escape**: Clear input (if implemented)

**Usage:**
```svelte
<Input 
    label="Name" 
    placeholder="Enter your name"
    oninput={handleInput}
/>
```

**Best Practices:**
- Labels must be associated with inputs (`for` attribute)
- Error messages should be announced to screen readers
- Focus styles must be visible

---

### Card Component (Interactive)

**Current Status:** ⚠️ Needs Improvement

**Recommended Keyboard Support:**
- **Tab**: Focus the card
- **Enter / Space**: Activate card click handler
- **Escape**: (If card opens a modal/dialog)

**Implementation Needed:**
```svelte
<!-- Interactive cards should have: -->
<div 
    role="button"
    tabindex="0"
    onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    }}
>
```

**Best Practices:**
- Add `role="button"` for interactive cards
- Add `tabindex="0"` for keyboard focus
- Implement Enter/Space handlers
- Ensure focus styles are visible

---

### Modal Component

**Current Keyboard Support:**
- ✅ **Escape**: Closes modal
- ✅ **Tab**: Navigates within modal
- ⚠️ **Focus Trap**: Not yet implemented
- ⚠️ **Focus Return**: Not yet implemented

**Recommended Pattern:**
1. **On Open:**
   - Trap focus within modal
   - Focus first focusable element
   - Prevent background scrolling

2. **While Open:**
   - Tab cycles through modal elements only
   - Escape closes modal
   - Click outside closes modal (optional)

3. **On Close:**
   - Return focus to trigger element
   - Restore background scrolling

**Implementation Needed:**
```typescript
// Focus trap utility needed
function trapFocus(element: HTMLElement) {
    // Trap focus within element
}

// Focus return utility needed
function returnFocus(previousElement: HTMLElement) {
    // Return focus to previous element
}
```

**Best Practices:**
- Always trap focus in modals
- Always return focus on close
- Focus first focusable element on open
- Ensure close button is keyboard accessible

---

### Dropdown Component

**Current Status:** ⚠️ Needs Improvement

**Recommended Keyboard Support:**
- **Enter / Space**: Open/close dropdown
- **Arrow Down**: Move to next option
- **Arrow Up**: Move to previous option
- **Home**: Move to first option
- **End**: Move to last option
- **Escape**: Close dropdown
- **Tab**: Close dropdown and move to next element

**Implementation Pattern:**
```typescript
function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
        case 'Enter':
        case ' ':
            event.preventDefault();
            toggleDropdown();
            break;
        case 'ArrowDown':
            event.preventDefault();
            focusNextOption();
            break;
        case 'ArrowUp':
            event.preventDefault();
            focusPreviousOption();
            break;
        case 'Home':
            event.preventDefault();
            focusFirstOption();
            break;
        case 'End':
            event.preventDefault();
            focusLastOption();
            break;
        case 'Escape':
            event.preventDefault();
            closeDropdown();
            break;
    }
}
```

**Best Practices:**
- Use `role="listbox"` or `role="menu"`
- Use `aria-expanded` to indicate open state
- Use `aria-activedescendant` for current selection
- Trap focus when open
- Return focus to trigger on close

---

### Tabs Component

**Current Keyboard Support:**
- ✅ **Arrow Right**: Move to next tab
- ✅ **Arrow Left**: Move to previous tab
- ✅ **Home**: Move to first tab
- ✅ **End**: Move to last tab
- ✅ **Enter / Space**: Activate tab

**Usage:**
```svelte
<Tabs 
    tabs={[
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' }
    ]}
    activeTab="tab1"
/>
```

**Best Practices:**
- Use proper ARIA attributes (`role="tablist"`, `role="tab"`, `role="tabpanel"`)
- Use `aria-selected` for active tab
- Use `aria-controls` to link tabs to panels
- Manage `tabindex` properly (0 for active, -1 for inactive)
- Support both horizontal and vertical orientations

**Vertical Tabs:**
- Use `aria-orientation="vertical"`
- Arrow Up/Down for navigation
- Arrow Left/Right disabled

---

### Navigation Component

**Current Keyboard Support:**
- ✅ **Arrow Right / Arrow Down**: Move to next item
- ✅ **Arrow Left / Arrow Up**: Move to previous item
- ✅ **Enter / Space**: Activate navigation item
- ✅ **Escape**: Close mobile menu (if applicable)
- ✅ **Home**: Move to first item
- ✅ **End**: Move to last item

**Usage:**
```svelte
<Navigation
    variant="header"
    items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' }
    ]}
/>
```

**Best Practices:**
- Use `role="navigation"`
- Use `aria-label` for navigation context
- Use `aria-current="page"` for current page
- Ensure focus styles are visible
- Support both horizontal and vertical navigation

---

### Select Component

**Current Status:** ⚠️ Needs Improvement

**Recommended Keyboard Support:**
- **Enter / Space**: Open dropdown
- **Arrow Down**: Move to next option
- **Arrow Up**: Move to previous option
- **Home**: Move to first option
- **End**: Move to last option
- **Escape**: Close dropdown
- **Enter**: Select option and close
- **Tab**: Close dropdown and move to next element

**Best Practices:**
- Use `role="combobox"` or `role="listbox"`
- Use `aria-expanded` for open state
- Use `aria-activedescendant` for current selection
- Use `aria-autocomplete` if applicable
- Trap focus when open

---

### Alert Component

**Keyboard Support:**
- ✅ **Tab**: Focus close button (if closable)
- ✅ **Enter / Space**: Close alert (if closable)
- ✅ **Escape**: Close alert (if closable)

**Usage:**
```svelte
<Alert
    variant="success"
    title="Success"
    message="Operation completed"
    closable={true}
/>
```

**Best Practices:**
- Use proper `role` attributes (`alert` or `status`)
- Use `aria-live` for dynamic content
- Ensure close button is keyboard accessible
- Use `aria-label` for close button

---

## Focus Management

### Focus Styles

All interactive elements must have visible focus indicators:

```css
/* Minimum focus style */
:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
}

/* Better focus style */
:focus {
    outline: 2px solid theme('colors.brand.500');
    outline-offset: 2px;
    box-shadow: 0 0 0 4px theme('colors.brand.100');
}
```

### Focus Order

Tab order should follow visual order and logical flow:
1. Header navigation
2. Main content
3. Sidebar (if present)
4. Footer

### Skip Links

Consider adding skip links for main content:
```html
<a href="#main-content" class="sr-only focus:not-sr-only">
    Skip to main content
</a>
```

## Testing Keyboard Navigation

### Manual Testing Checklist

- [ ] All interactive elements are reachable via Tab
- [ ] Focus order is logical and follows visual order
- [ ] Focus styles are visible on all elements
- [ ] All components respond to appropriate keyboard shortcuts
- [ ] Modals trap focus correctly
- [ ] Focus returns to trigger after closing modals
- [ ] Dropdowns can be navigated with arrow keys
- [ ] Tabs can be navigated with arrow keys
- [ ] Escape closes all overlays
- [ ] No keyboard traps (can always navigate away)

### Automated Testing

Consider using tools like:
- [axe-core](https://github.com/dequelabs/axe-core) for accessibility testing
- [Pa11y](https://pa11y.org/) for automated accessibility testing
- [WAVE](https://wave.webaim.org/) browser extension

## Common Patterns

### Focus Trap Implementation

```typescript
function trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    container.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}
```

### Focus Return Implementation

```typescript
let previousFocus: HTMLElement | null = null;

function openModal() {
    previousFocus = document.activeElement as HTMLElement;
    // Open modal
    // Focus first element in modal
}

function closeModal() {
    // Close modal
    if (previousFocus) {
        previousFocus.focus();
        previousFocus = null;
    }
}
```

## Resources

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN: Keyboard Navigation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)
- [WebAIM: Keyboard Accessibility](https://webaim.org/techniques/keyboard/)

