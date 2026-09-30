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

### Slider Component

**Current Keyboard Support** (native `<input type="range">`):
- ✅ **Tab**: Move to the slider
- ✅ **Arrow Right / Arrow Up**: Increase by one step
- ✅ **Arrow Left / Arrow Down**: Decrease by one step (left and right swap in a right-to-left layout)
- ✅ **Home**: Go to the minimum
- ✅ **End**: Go to the maximum
- ✅ **Page Up / Page Down**: Larger step, as the browser defines it

**Usage:**
```svelte
<Slider
    label="Image quality"
    bind:value={quality}
    min={10}
    max={100}
    step={10}
    showValue
    formatValue={(value) => `${value} %`}
/>
```

**Best Practices:**
- Give it a `label`, or an `aria-label` when there is no visible one
- Pass `formatValue` whenever the number has a unit; it sets `aria-valuetext`, so "80 %" is read instead of "80"
- Choose a `step` that gets across the range in a reasonable number of key presses
- The focus ring is drawn on the thumb

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

### SortableList Component

**Current Keyboard Support** (on the drag handle, a `<button>`):
- ✅ **Tab**: Move to the handle, then to the row's move up / move down buttons
- ✅ **Arrow Up**: Move the item up one place
- ✅ **Arrow Down**: Move the item down one place
- ✅ **Home**: Move the item to the start
- ✅ **End**: Move the item to the end
- ✅ **Escape**: Cancel a pointer drag and restore the original order
- ✅ **Enter / Space**: Activate a move up / move down button

The model is immediate: each arrow press moves the item and is announced
("Hero section, moved to position 2 of 5") in a polite live region. There is no
grab mode to enter or leave, so there is no state to get stuck in, and a move
is undone with the opposite arrow. A key that cannot move the item any further
says so ("Hero section, already first"). Arrow keys with Alt, Ctrl or Meta are
left to the browser.

Focus stays on the handle, but not always without a blur: reordering moves DOM
nodes, a moved node loses focus, and the list puts it back. This happens on a
move down, Home and End; a screen reader may then read the handle's name and
description again before the announcement. The description is one short
sentence for that reason; keep a translated one short too.

**Usage:**
```svelte
<SortableList
    bind:items={sections}
    getKey={(section) => section.id}
    getLabel={(section) => section.title}
    aria-label="Page sections"
>
    {#snippet item(section)}
        <SectionCard {section} />
    {/snippet}
</SortableList>
```

**Best Practices:**
- Give the list a name with `aria-label` or `aria-labelledby`
- Return a short, unique name from `getLabel`; it is in every button name and announcement
- Keep the move buttons unless space is tight: a screen reader in browse mode does not pass arrow keys to a button, and the move buttons work there
- Focus stays on the control that was used; when a move button reaches an end and becomes disabled, focus moves to the row's other move button
- Translate the button names, the handle description and the announcements through `strings`
- With `controls="manual"`, put `row.handle` and `row.moveButtons` beside a header toggle, never inside another `<button>` or link: a button inside a button is invalid markup and cannot be reached by keyboard
- A click on the handle or a move button does not bubble (Enter and Space produce a click too), so a card header with its own click handler is not toggled by them; use `onreorder` to observe a move

---

### MediaGrid Component

**Current Keyboard Support:**
- ✅ **Tab**: Into the grid (the selected item, else the first), then to that item's delete button, then out
- ✅ **Arrow Left / Arrow Right**: Previous / next item (mirrored in a right-to-left layout)
- ✅ **Arrow Up / Arrow Down**: The item above / below, by the number of columns on screen
- ✅ **Home / End**: First / last item in the row
- ✅ **Ctrl + Home / Ctrl + End**: First / last item in the grid
- ✅ **Enter / Space**: Select the item, or clear its selection
- ✅ **Delete**: Ask to delete the focused item (the same as its delete button)

Each item is a toggle button (`aria-pressed`) in a list, with its delete button
beside it, not inside it. A `listbox` was not used because an option cannot
contain a button, and a `grid` role needs rows in the DOM, which a layout that
picks its column count from the available width does not have. Only one
item's buttons are in the Tab order at a time (a roving tabindex), so a library
of two hundred files is one Tab stop; the arrow keys move between items and do
not select. A screen reader's own button and list navigation reaches every
item whatever the Tab order.

**Usage:**
```svelte
<MediaGrid
    {items}
    getKey={(item) => item.id}
    getLabel={(item) => item.name}
    getUrl={(item) => item.url}
    bind:selected
    ondelete={askToDelete}
    aria-label="Media library"
/>
```

**Best Practices:**
- Give the list a name with `aria-label` or `aria-labelledby`
- Return the file name or a title from `getLabel`; it names the item and its delete button ("Delete hero.jpg")
- Confirm a delete before removing the item (`ConfirmDialog`); the grid only reports it
- When the item is removed, focus moves to the item that took its place, also when a confirmation dialog closes after the removal; with nothing left it moves to the grid itself
- Inside a `Modal`, the arrow keys move between items instead of scrolling the dialog
- The built-in empty state's title is an `<h3>`, to sit under a Modal or section title; set `emptyHeadingLevel` when the heading above the grid is at another level

---

### Collapsible and CollapsibleGroup

**Current Keyboard Support** (on the trigger, a `<button>`):
- ✅ **Tab**: Move to the trigger, then into the panel when it is open
- ✅ **Enter / Space**: Open or close the panel

Inside a `CollapsibleGroup`, on a header button:
- ✅ **Arrow Down**: Move focus to the next header (wraps to the first)
- ✅ **Arrow Up**: Move focus to the previous header (wraps to the last)
- ✅ **Home**: Move focus to the first header
- ✅ **End**: Move focus to the last header

The arrow keys only move focus; they open nothing. Every header stays in the
tab order, so the group works without them, and a disabled header is skipped.
A closed panel is `hidden`: nothing in it takes focus or is read out. If a
panel closes while focus is inside it (a Save button in the panel closes it, or
the group closes it because another panel was opened), focus moves to that
panel's trigger; focus is not moved in any other case.

A disabled panel keeps its state. In a single-open group it is not closed when
another panel opens, so a disabled panel that is open stays open beside the
one the user opened. If several panels are marked open at the start of a
single-open group, only the first is rendered open, on the server too. Arrow
keys with Shift, Alt, Ctrl or Meta are left to the browser, and so are the keys
on a Collapsible nested inside a panel, which is not part of the group.

**Usage:**
```svelte
<Collapsible bind:open title="Billing details" headingLevel={3}>
    <BillingForm />
</Collapsible>

<!-- Your own header: spread the props on a <button> -->
<Collapsible bind:open>
    {#snippet trigger(props, state)}
        <div class="flex items-center gap-2">
            <h3 class="flex-1">Billing details</h3>
            <button {...props}>{state.open ? "Hide" : "Show"}</button>
        </div>
    {/snippet}
    <BillingForm />
</Collapsible>

<CollapsibleGroup>
    <Collapsible title="General" headingLevel={3}>…</Collapsible>
    <Collapsible title="Members" headingLevel={3}>…</Collapsible>
</CollapsibleGroup>
```

**Best Practices:**
- Spread the `trigger` props on a real `<button>`: Enter and Space come from the element, and the props carry `type="button"`, `aria-expanded`, `aria-controls`, `disabled` and the click handler
- Give a custom trigger a name that says what it shows, not only "Toggle"; the panel is labelled by it
- Set `headingLevel` on accordion headers so they appear in the document outline
- Keep the default closed behaviour for forms (the content stays mounted and keeps its values); use `unmountOnClose` for heavy or read-only content
- Leave `region` alone unless the panel deserves a landmark: it is on by default only in a single-open group, where one panel is exposed at a time

---

### ConfirmDialog Component

**Current Keyboard Support:**
- ✅ **Tab / Shift + Tab**: Move between Cancel and the confirm button; focus stays in the dialog
- ✅ **Enter / Space**: Activate the focused button
- ✅ **Escape**: Cancel and close (not while loading)

Focus starts on **Cancel** for every variant, so a stray Enter backs out
instead of confirming. There is no Enter shortcut for the confirm button: Enter
only activates the button that has focus. When the dialog closes, focus returns
to the element that opened it.

While a confirm is loading both buttons are disabled and Escape and the
backdrop do nothing. Focus is held on the dialog itself instead of falling to
the page (without a focus outline around the whole dialog, since the dialog is
not a control), and returns to the confirm button if the request fails and the
dialog stays open. `loadingLabel` ("Working…" by default) is announced once,
politely, when loading starts.

**Usage:**
```svelte
<ConfirmDialog
    bind:open
    variant="danger"
    title="Delete this project?"
    message="The project and its files are removed for everyone."
    confirmLabel="Delete"
    onconfirm={() => api.deleteProject(id)}
    onerror={(error) => (failure = error.message)}
/>
```

**Best Practices:**
- Write the title as the question and put the consequence in `message`: the title is the dialog's name and the message its description
- Name the action on the confirm button ("Delete", "Publish"), not "OK" or "Yes"
- Return the request's promise from `onconfirm` and let the dialog run the loading state; return `false` to keep it open
- Show a failed request inside the dialog through `children`, and handle it in `onerror`
- The dialog uses `role="alertdialog"` with `aria-modal`: it interrupts to ask for a response, and is named by the title and described by the message

---

### Drawer Component

**Current Keyboard Support:**
- ✅ **Tab / Shift + Tab**: Move through the controls in the drawer; focus wraps and never reaches the page behind
- ✅ **Escape**: Close the drawer (not when `dismissible` is false)
- ✅ **Enter / Space**: Activate the focused control, including the close button

When the drawer opens, focus moves to the control `initialFocus` selects, or to
the first control (the close button) when it is not set. When the drawer
closes, focus returns to the element that opened it. The page behind does not
scroll while the drawer is open.

With other overlays: a Drawer can open over a Modal and a Modal can open from a
Drawer. Escape closes only the topmost one, Tab stays inside it, and focus goes
back one step at a time. If the focused control is disabled or removed and focus
falls to the page, the next Tab brings it back into the drawer.

Content with nothing to focus: when the content is taller than the drawer and
holds no control, the scrolling area becomes a Tab stop, named by the title, so
the arrow keys, Page Up/Down and Space can scroll it. With any control in the
content there is no extra Tab stop.

`onkeydown` hears every keydown inside the drawer, after the drawer has handled
Escape; it does not replace the Tab cycle. On a touch screen the close button's
hit area is 44px around the same 32px button.

**Usage:**
```svelte
<Drawer
    bind:isOpen={open}
    title="Choose a project"
    side="right"
    initialFocus="#project-search"
>
    <Input id="project-search" label="Search projects" />
    <ProjectList />
    {#snippet footer()}
        <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
    {/snippet}
</Drawer>
```

**Best Practices:**
- Point `initialFocus` at the control the user came for (a search field); otherwise focus starts on the close button
- Use `start` or `end` for a drawer that should mirror in a right-to-left page; `left` and `right` stay where they are
- Translate the close button through `closeLabel`
- With `dismissible={false}`, give the drawer its own way out: the close button stays focusable but does nothing

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

