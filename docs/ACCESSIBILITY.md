# Accessibility Audit - WCAG 2.1 AA Compliance

This document provides a comprehensive accessibility audit for zabi-components, following WCAG 2.1 Level AA guidelines.

## Audit Overview

**Audit Date:** 2025-01-XX  
**WCAG Version:** 2.1  
**Target Level:** AA  
**Scope:** All components in zabi-components library

> **Reading this document.** The per-component results are the January 2025
> audit. The entries for Button, Card, Modal, Dropdown, Navigation and Select,
> and the keyboard, screen reader, focus and summary sections, were checked
> against the code on 2026-09-30 and corrected where the issue had been fixed.
> The other entries, and every low-priority recommendation, were not
> re-checked. Components added since the audit (SortableList, Collapsible,
> ConfirmDialog, Drawer, MediaGrid, Slider, Spinner, UnsavedChangesBar, AppShell,
> AppBar, BottomTabBar and others) are not audited here; their keyboard behaviour is in
> KEYBOARD_NAVIGATION.md and their conventions are under
> [Library conventions](#library-conventions).

## WCAG Principles

### 1. Perceivable
Information and user interface components must be presentable to users in ways they can perceive.

### 2. Operable
User interface components and navigation must be operable.

### 3. Understandable
Information and the operation of user interface must be understandable.

### 4. Robust
Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

## Component Audit Results

### Button Component

**Status:** ✅ Mostly Compliant

**Current Features:**
- ✅ Proper semantic HTML (`<button>` element)
- ✅ Focus styles with ring indicators
- ✅ Disabled state properly handled
- ✅ Keyboard accessible (Enter/Space)
- ✅ Type attribute support (button/submit/reset)

- ✅ `aria-busy` while loading
- ✅ Extra attributes such as `aria-label` pass through to the `<button>`; icon-only buttons are `IconButton`

**Issues Found:**
- ✅ The two issues of the original audit (no `aria-label`, loading not announced) are resolved

**Recommendations:**
- None open

**Priority:** Low

---

### Input Component

**Status:** ✅ Compliant

**Current Features:**
- ✅ Proper label association (`for` attribute)
- ✅ `aria-invalid` for error states
- ✅ `aria-describedby` for error messages
- ✅ Error messages with proper role="alert"
- ✅ Focus management
- ✅ Disabled state support

**Issues Found:**
- ✅ No critical issues

**Recommendations:**
- Consider adding `aria-required` for required fields
- Add `aria-autocomplete` for autocomplete inputs

**Priority:** Low

---

### Textarea Component

**Status:** ✅ Compliant

**Current Features:**
- ✅ Proper label association
- ✅ `aria-invalid` for error states
- ✅ `aria-describedby` for error messages
- ✅ Error messages with proper role="alert"
- ✅ Focus management

**Issues Found:**
- ✅ No critical issues

**Recommendations:**
- Same as Input component

**Priority:** Low

---

### Card Component

**Status:** ✅ Mostly Compliant

**Current Features:**
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy support
- ✅ A card with `onclick` gets `role="button"`, `tabindex="0"` and a key handler

**Issues Found:**
- ✅ The role and keyboard issues of the original audit are resolved

**Recommendations:**
- Give an interactive card an accessible name (`aria-label` or `aria-labelledby`) when its content does not say what it does

**Priority:** Low

---

### Modal Component

**Status:** ✅ Compliant

**Current Features:**
- ✅ `role="dialog"`
- ✅ `aria-modal="true"`
- ✅ `aria-labelledby` for title
- ✅ `aria-describedby` for the description
- ✅ Escape key to close
- ✅ Backdrop click to close
- ✅ Tab is kept inside the panel
- ✅ Focus moves into the panel on open and returns to the opener on close, also when modals are nested

**Issues Found:**
- ✅ The focus trap, focus return and `aria-describedby` issues of the original audit are resolved

**Recommendations:**
- None open. SlideUp and Drawer share the same behaviour; see [Library conventions](#library-conventions)

**Priority:** Low

---

### Dropdown Component

**Status:** ✅ Mostly Compliant

**Current Features:**
- ✅ The trigger carries `aria-expanded` and `aria-haspopup`
- ✅ The popup is `role="menu"` or `role="listbox"`
- ✅ Arrow keys, Home and End move between items; Escape closes
- ✅ Focus returns to the trigger when the menu closes with focus inside it
- ✅ A disabled item is `aria-disabled` and stays in the arrow-key order

**Issues Found:**
- ✅ The ARIA and keyboard issues of the original audit are resolved

**Recommendations:**
- None open. Focus moves between the items themselves, so `aria-activedescendant` is not used

**Priority:** Low

---

### Tabs Component

**Status:** ✅ Mostly Compliant

**Current Features:**
- ✅ Proper ARIA attributes (`role="tablist"`, `role="tab"`, `role="tabpanel"`)
- ✅ `aria-selected` for active tab
- ✅ `aria-controls` linking tabs to panels
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ Proper `tabindex` management

**Issues Found:**
- ⚠️ Missing `aria-orientation` for vertical tabs
- ⚠️ Could improve focus management

**Recommendations:**
- Add `aria-orientation` prop
- Ensure focus styles are visible
- Consider adding `aria-label` for tab list

**Priority:** Low

---

### Alert Component

**Status:** ✅ Compliant

**Current Features:**
- ✅ Proper `role` attributes (`alert` or `status`)
- ✅ `aria-live` regions for dynamic content
- ✅ `aria-atomic="true"`
- ✅ Close button with `aria-label`
- ✅ Proper semantic HTML

**Issues Found:**
- ✅ No critical issues

**Recommendations:**
- Consider adding `aria-label` for alert container
- Ensure color contrast meets WCAG AA

**Priority:** Low

---

### Badge Component

**Status:** ✅ Compliant

**Current Features:**
- ✅ Semantic HTML (`<span>`)
- ✅ Proper color contrast (when using semantic colors)

**Issues Found:**
- ✅ No critical issues

**Recommendations:**
- Ensure all color combinations meet contrast requirements
- Consider adding `aria-label` for icon-only badges

**Priority:** Low

---

### Navigation Component

**Status:** ✅ Mostly Compliant

**Current Features:**
- ✅ Proper `role="navigation"`
- ✅ `aria-label` support
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Focus management
- ✅ Active state indication

- ✅ `aria-current="page"` on the current item (TopNavbar, SidebarNavigation)

**Issues Found:**
- ✅ The `aria-current` issue of the original audit is resolved

**Recommendations:**
- None open; the keyboard patterns are in KEYBOARD_NAVIGATION.md

**Priority:** Low

---

### Checkbox Component

**Status:** ✅ Compliant

**Current Features:**
- ✅ Proper semantic HTML (`<input type="checkbox">`)
- ✅ Label association
- ✅ Disabled state support
- ✅ Keyboard accessible

**Issues Found:**
- ✅ No critical issues

**Recommendations:**
- Add `aria-describedby` for help text
- Ensure focus styles meet contrast requirements

**Priority:** Low

---

### Select Component

**Status:** ✅ Mostly Compliant

**Current Features:**
- ✅ Built on Dropdown: the trigger carries `aria-expanded` and `aria-haspopup="listbox"`, the list is `role="listbox"` and each choice `role="option"` with `aria-selected`
- ✅ Arrow keys, Home and End move between options
- ✅ A disabled option is `aria-disabled` and stays in the arrow-key order
- ✅ The message below the field is `role="alert"` for an error and `role="status"` otherwise

**Issues Found:**
- ✅ The ARIA and keyboard issues of the original audit are resolved

**Recommendations:**
- None open

**Priority:** Low

---

### Toggle Component

**Status:** ✅ Compliant

**Current Features:**
- ✅ Proper semantic HTML (`<input type="checkbox">` or `<button>`)
- ✅ Label association
- ✅ Keyboard accessible
- ✅ Disabled state support

**Issues Found:**
- ✅ No critical issues

**Recommendations:**
- Add `aria-checked` if using button element
- Ensure focus styles meet contrast requirements

**Priority:** Low

---

### Rating Component

**Status:** ✅ Compliant in automated checks; not yet read with a screen reader

**Current Features:**
- ✅ A radio group of native radio inputs named by `label`; each star is named "4 of 5 stars", so it reads "Quiz, 4 of 5 stars"
- ✅ One Tab stop, also while empty; arrow keys, Home and End change the value
- ✅ Every star is a 44px target at every size
- ✅ A single selection is never cleared by a repeat press; `clearable` adds a named clear button, and Delete or Backspace clears
- ✅ Focus moves to the first star when the clear button hides
- ✅ Filled and empty stars differ by shape (filled against outlined), not by colour alone
- ✅ `readonly` is one image with one name ("Quiz, 3.5 of 5 stars"); it has no inputs, so it takes no focus and submits nothing, even with `name`
- ✅ Focus is an outline in forced colours; the pressed star does not animate under `prefers-reduced-motion`

**Issues Found:**
- ⚠️ The outline of an empty star (`--color-border-strong`) is 3:1 or better on the page, card and inset surfaces of both themes, and 2.49:1 on the dark elevated surface

**Recommendations:**
- Use it on page, card and inset surfaces
- Test with a screen reader on a phone

**Priority:** Low

---

### SegmentedControl Component

**Status:** ✅ Compliant in automated checks; not yet read with a screen reader

**Current Features:**
- ✅ A radio group of native radio inputs, named by `label` or `aria-labelledby`; each segment is named by its visible label
- ✅ One Tab stop, also with nothing selected; arrow keys, Home and End move and select, and skip a disabled segment
- ✅ A single selection is never cleared by a repeat press
- ✅ Segments are at least 44px tall on a touch screen at every size
- ✅ The selected segment is the primary action fill with its text colour, a pair `scripts/check-contrast.js` holds to 4.5:1
- ✅ Labels wrap, and segments fold into rows, instead of being cut off at 320px or with text at 200%
- ✅ The selection keeps a fill of its own and focus is an outline in forced colours; the fill does not animate under `prefers-reduced-motion`

**Issues Found:**
- ✅ No critical issues

**Recommendations:**
- Test with a screen reader on a phone

**Priority:** Low

---

## Color Contrast Audit

### Current Status
All components use semantic color tokens that should meet WCAG AA contrast requirements.

### Testing Required
- [ ] Verify all text colors meet 4.5:1 contrast ratio (normal text)
- [ ] Verify all text colors meet 3:1 contrast ratio (large text)
- [ ] Verify all interactive elements meet contrast requirements
- [ ] Test in both light and dark modes

### Recommendations
- Use automated contrast checking tools
- Test with actual color combinations
- Document contrast ratios in design system

## Keyboard Navigation Audit

### Standard Patterns
- ✅ Tab: Move between interactive elements
- ✅ Enter/Space: Activate buttons and links
- ✅ Escape: Close modals and dropdowns
- ✅ Arrow keys: Navigate within components (Tabs, Navigation)

### Missing Patterns
- None of the four patterns the original audit listed is missing any more: modals trap and return focus, and Dropdown and Select handle the arrow keys, Home and End.

### Recommendations
See KEYBOARD_NAVIGATION.md for detailed patterns.

## Screen Reader Support

### Current Status
Most components have basic ARIA support, but improvements are needed.

### Issues
- ✅ Toasts are announced: each toast is `role="status"`, or `role="alert"` for an error
- ⚠️ Not re-checked: live regions for other dynamic content, and ARIA completeness outside the components corrected above

### Recommendations
- Add `aria-live` regions for dynamic content
- Ensure all interactive elements have proper labels
- Test with screen readers (NVDA, JAWS, VoiceOver)

## Focus Management

### Current Status
The four issues of the original audit are resolved: Modal traps focus and returns it, Dropdown returns focus to its trigger, and the focus ring is 2px with a 2px gap, held to 3:1 against the page and a card by `scripts/check-contrast.js`.

### Recommendations
- Test focus order (tab order) in each app; the library cannot check it

## Library conventions

Rules every component follows, new ones included. Each names where it lives in the code.

- **Focus never falls to `<body>`.** When the focused element is removed or disabled, the browser drops focus on `<body>`, and the next Tab starts from the top of the page. Components that remove or disable their own focused control move focus first:
  - ImageUpload, when the dropzone and the Change button replace each other;
  - Collapsible, to its trigger when a panel closes with focus inside it;
  - MediaGrid, to the item that took a removed item's place, or to the grid when none is left;
  - Toaster, to the neighbouring toast when the focused one is dismissed, or back to where focus came from;
  - UnsavedChangesBar, which holds focus on the bar while its buttons are disabled during a save.

  Modal, SlideUp and Drawer cover the case they cannot prevent, content inside them that disables or removes its own focused control: the next Tab goes to the first control in the panel and Escape still closes it (`recoverStrayFocus` in `src/components/util/focus-utils.ts`).
- **Modal overlays share one stack and one scroll lock.** Modal, SlideUp and Drawer (and ConfirmDialog, which is a Modal) join the same stack, so the overlay opened last is on top whatever the DOM order, and only it acts on Tab and Escape (`joinOverlayStack` in `focus-utils.ts`). The scroll lock on `<body>` is counted, so the page scrolls again only when the last overlay has closed (`lockBodyScroll` in `src/components/util/overlay.ts`).
- **Disabled options stay reachable.** A disabled Dropdown item or Select option is `aria-disabled`, not `disabled`. It keeps its place in the arrow-key order and is announced as unavailable, and activating it does nothing. A natively disabled button cannot take focus, so the arrow keys used to stop at the option before it.
- **A single selection is never cleared by a repeat press.** Pressing the selected item again does nothing; only checkbox-like controls toggle off. MediaGrid without `multiple`, SegmentedControl and Rating follow it. Where a selection may be withdrawn there is a control for that: Rating's `clearable` adds a clear button beside the stars.
- **Nothing is reachable by hover alone.** Actions revealed on hover also appear when focus is inside the component, and are always visible where hover does not exist (touch). ImageUpload shows Change and Remove that way; MediaGrid keeps its remove button beside the item and always visible.
- **Focus is visible in forced colours.** The focus ring is a box-shadow, which forced-colours mode (Windows High Contrast) drops. `src/app.css` restates it there as an outline for `.focus-ring`, the legacy `.focus-brand` and `.focus-nav`, and the checkbox and radio row.

## Summary

### Overall Compliance

The original audit found 2 critical, 3 high-priority and 4 medium-priority issues. All nine are resolved in the code as of 2026-09-30:

- Modal focus trap and focus return
- Dropdown ARIA attributes and keyboard navigation
- Card keyboard navigation
- Button `aria-label` and loading state
- Navigation `aria-current`
- Select ARIA attributes
- Focus management

The low-priority recommendations were not re-checked, and the components added since have not had a formal audit.

## Action Plan

1. **Done:** the critical, high and medium items of the original audit (above).

2. **Still open:**
   - Comprehensive screen reader testing
   - Automated accessibility testing
   - Accessibility documentation updates

## Testing Recommendations

1. **Automated Testing:**
   - Use axe-core for automated testing
   - Integrate into CI/CD pipeline
   - Test all components regularly

2. **Manual Testing:**
   - Test with keyboard only (no mouse)
   - Test with screen readers (NVDA, JAWS, VoiceOver)
   - Test with browser zoom (200%)
   - Test color contrast with tools

3. **User Testing:**
   - Test with users who rely on assistive technologies
   - Gather feedback on accessibility
   - Iterate based on feedback

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

