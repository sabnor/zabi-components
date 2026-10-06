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
> The Modal, Tabs, Alert and Navigation entries and the colour contrast section
> were checked again on 2026-10-05.
> The other entries, and every low-priority recommendation, were not
> re-checked. Components added since the audit (SortableList, Collapsible,
> ConfirmDialog, Drawer, MediaGrid, Slider, Spinner, UnsavedChangesBar, AppShell,
> AppBar, BottomTabBar, BottomSheet, StickyActionBar, FloatingActionButton, DateField,
> TimeField, Calendar, PhotoGrid, PhotoViewer and others) are not audited here; their keyboard behaviour is in
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

- ✅ `aria-busy` while loading, and focus stays: a loading button is `aria-disabled="true"`, not `disabled`, so it is still a Tab stop and a press does nothing (a `disabled` button drops focus on `<body>`). `disabled` is unchanged: out of the Tab order
- ✅ Extra attributes such as `aria-label` pass through to the `<button>`; icon-only buttons are `IconButton`
- ✅ With `href` it is a real `<a>`; a disabled or loading link has no `href` and is `aria-disabled`. A loading one keeps its Tab stop (`tabindex="0"`), so focus stays on it
- ✅ A label that does not fit wraps inside the button, also with the text enlarged to 200%
- ✅ The pressed dip is off under `prefers-reduced-motion`

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
- ✅ `hint` and `error` tied to the field with `aria-describedby`, hint first; only ids of elements that are rendered are listed
- ✅ Error messages with proper role="alert"; a hint is not a live region
- ✅ Focus management
- ✅ Disabled state support
- ✅ `revealable` passwords: a toggle with one name and `aria-pressed`, a 44px target on touch, that keeps focus and the caret
- ✅ Native attributes (`autocomplete`, `inputmode`, `maxlength`, `enterkeyhint`) reach the `<input>` and are typed

**Issues Found:**
- ✅ A `message` without a `variant` used to leave `aria-describedby` pointing at an id that was not rendered; resolved. Textarea and Select had the same fault

**Recommendations:**
- None open

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
- ✅ `role="dialog"`, or `role="alertdialog"` when asked for (ConfirmDialog uses it)
- ✅ `aria-modal="true"`
- ✅ `aria-labelledby` for title
- ✅ `aria-describedby` for the description
- ✅ Escape key to close
- ✅ Backdrop click to close
- ✅ Tab is kept inside the panel
- ✅ Focus moves into the panel on open (to the control `initialFocus` selects, else the first one) and returns to the opener on close, also when modals are nested
- ✅ Content that takes focus itself as the overlay opens (a search field that focuses on mount) keeps it: Modal, Drawer, SlideUp and BottomSheet move focus only when it is not already on something inside the panel. `initialFocus` still decides when it matches a control
- ✅ With `dismissible={false}` Escape, the backdrop and the close button do nothing; the close button is `aria-disabled` and keeps focus, so the trap holds

**Issues Found:**
- ✅ The focus trap, focus return and `aria-describedby` issues of the original audit are resolved

**Recommendations:**
- None open. SlideUp and Drawer share the same behaviour; see [Library conventions](#library-conventions)
- `fullScreen` (or `fullScreen="mobile"`) changes the layout only: role, name, focus handling and Escape are the same. The close button stays at the top inside the safe area and is a 44px target on a coarse pointer; scrolling content with nothing focusable in it becomes a Tab stop so the keyboard can scroll it

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
- ✅ A row of tabs that does not fit scrolls sideways inside the tablist; the selected and the focused tab are kept in view, and the scrolling box is not a Tab stop
- ✅ The fade at an edge with more tabs is a mask, so nothing covers a tab or its focus ring; it is dropped in forced colours
- ✅ `fullWidth` shares the row equally and is meant for two or three tabs. A tab is never narrower than its longest word: when a share is too small for one (more tabs, a long label, text at 200%), the row scrolls sideways like any other instead of breaking a word in two

**Issues Found:**
- ✅ No open issues. Tabs are horizontal only, so the `aria-orientation` item of the original audit does not apply: horizontal is the default of a tablist

**Recommendations:**
- None open

**Priority:** Low

---

### Alert Component

**Status:** ✅ Compliant

**Current Features:**
- ✅ `role="status"` for the `success` and `info` variants and `role="alert"` for the others; both roles are live regions, so no separate `aria-live` is set
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
- ✅ A `<nav>` landmark
- ✅ `aria-label` support
- ✅ Keyboard: every link is a Tab stop and Enter follows it. TopNavbar and SidebarNavigation have no arrow-key navigation; NavigationMenu opens a panel with Enter, Space or Arrow Down and closes it with Escape
- ✅ Focus management
- ✅ Active state indication

- ✅ `aria-current="page"` on the current item (TopNavbar, SidebarNavigation)
- ✅ TopNavbar's phone menu is a disclosure: `aria-expanded` on the menu button, and `aria-controls` only while the menu exists
- ✅ The phone menu closes on a link, on Escape, on a press or a focus move outside the bar, and when the screen passes the breakpoint; it scrolls on its own on a short screen
- ✅ In the phone menu each link is the full row; the brand is cut short so the menu button never leaves the screen

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
- ✅ The real input lies over the drawn box and takes the press itself (Radio and RadioGroup too), so pointer-driven assistive tools and tests that aim at the control reach it

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
- ✅ Every option has `aria-selected`, true or false. The chosen one is marked by a check at the end of its row and a fill, in the pop-over and in the sheet: a mark of its own, which is neither the focus ring (it used to be an edge in the action colour, as the ring is) nor colour alone. The check is the text colour, far above 3:1 on the row
- ✅ The list is one Tab stop (a roving tabindex on the focused option, or the chosen one, or the first). Shift+Tab from an option goes to the search field in one step and Tab from the field back to the list. A character typed on an option goes to the search field when there is one, and otherwise moves focus to the next option that starts with what was typed
- ✅ The message below the field is `role="alert"` for an error and `role="status"` otherwise
- ✅ It works before the scripts arrive and without them. The server's HTML carries a native `<select>` with the same options, named by the label, with `name`, `required` and the disabled options; until the component has mounted that is the control, and it has the field's box, so nothing moves when the trigger replaces it. A choice made in it before hydration is kept and reported once. After mounting it stays as the form control, kept at the same value, `visibility: hidden` and `aria-hidden`, out of the tab order and not hit-testable, so assistive technology meets one control, the trigger
- ✅ `required` is checked by the browser. On a mounted Select the browser's own bubble would point at a control nobody sees: instead its message, in the browser's language, is shown under the field as the error (`role="alert"`, in the trigger's `aria-describedby`) and focus goes to the trigger. A choice clears it
- ✅ `presentation="native"` is the native `<select>` alone, styled as the field: the platform's picker, labels only (no search, descriptions, loading or empty states)
- ✅ The trigger fills its container, like an Input, and may be narrower than its label; the label wraps instead of being cut, and the trigger grows by lines from its 32, 40 or 48px (44px on a coarse pointer). The chevron stays in the middle of the box
- ✅ Every text of its own is in `strings` (the name of the option list and the sheet's buttons included)

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
- Give every switch a name: a visible `label`, or `aria-label`, or `aria-labelledby` pointing at text already on the page. What the app passes wins. A switch with none of the three is called "Toggle", which tells nobody what it switches and is English in every language

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
- ✅ The outline of an empty star (`--color-control-border`) is 3:1 or better on every surface level of both themes
- ✅ `readonly` is one image with one name ("Quiz, 3.5 of 5 stars"); it has no inputs, so it takes no focus and submits nothing, even with `name`
- ✅ Focus is an outline in forced colours; the pressed star does not animate under `prefers-reduced-motion`

**Recommendations:**
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
Contrast is checked by a script, not by eye. `scripts/check-contrast.js`
(`npm run check:contrast`, part of `npm run check`) resolves every fill and
foreground pair a component can render, through the same token chain the CSS
uses, in light and in dark, and fails the build below WCAG AA: 4.5:1 for text,
3:1 for focus rings, control edges and other UI parts. It also holds the hover
and pressed tints to a visible step over every surface level.

A brand generated with `zabi-theme` is held to the same list of pairs; see
THEMING.md.

### Not covered
- Colours an app sets by hand on a role token
- Text placed on an image or a gradient
- Combinations an app makes itself, such as a status colour on a tinted fill of another family

### Recommendations
- Run `npm run check:contrast` after re-pointing any token
- Check the pairs above in the app, in both themes

## Keyboard Navigation Audit

### Standard Patterns
- ✅ Tab: Move between interactive elements
- ✅ Enter/Space: Activate buttons and links
- ✅ Escape: Close modals and dropdowns
- ✅ Arrow keys: Navigate within components (Tabs, Dropdown, Select, the radio-like controls, Calendar, MediaGrid)

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
  - UnsavedChangesBar, which holds focus on the bar while its buttons are disabled during a save;
  - TopNavbar, to the menu button when Escape closes the phone menu with focus inside it.

  Modal, SlideUp and Drawer cover the case they cannot prevent, content inside them that disables or removes its own focused control: the next Tab goes to the first control in the panel and Escape still closes it (`recoverStrayFocus` in `src/components/util/focus-utils.ts`).
- **Modal overlays share one stack and one scroll lock.** Modal, SlideUp, Drawer, BottomSheet and PhotoViewer (and ConfirmDialog, which is a Modal) join the same stack, so the overlay opened last is on top whatever the DOM order, and only it acts on Tab and Escape (`joinOverlayStack` in `focus-utils.ts`). The scroll lock on `<body>` is counted, so the page scrolls again only when the last overlay has closed (`lockBodyScroll` in `src/components/util/overlay.ts`).
- **A gesture is never the only way.** BottomSheet and SlideUp can be dragged and swiped closed (`attachSheetDrag` in `src/components/util/sheet-drag.ts`), and every result of a drag has a control: BottomSheet's grip is a button that changes its height, and both keep the close button, the backdrop and Escape. A touch on a sheet's content scrolls the content; it moves the sheet only from the top of the content, downwards. Under `prefers-reduced-motion` a sheet changes height and position without animation.
- **A photo viewer is dark, and nothing is written on the dark.** PhotoViewer is black behind the photo in both themes. The theme is switched on `<html>`, so a dark island inside a light page cannot be themed with a nested class; instead every control, the counter, the caption and the loading and error messages sit on opaque plates in the theme's own overlay surface and text colours, edged with `--color-control-border`. They read over any photo and on black, in either theme and in forced colours. The same goes for the "+12" on a PhotoGrid tile.
- **Zoom, pan and swipe have keys and buttons.** In PhotoViewer a pinch, a double tap, a drag and a swipe each have an equivalent: plus, minus and 0, the arrow keys, Page Up and Page Down, Escape, and the previous, next and close buttons, which are always shown. The gesture arithmetic is pure and tested (`src/components/util/photo.ts`). Under `prefers-reduced-motion` photos change and zoom without easing.
- **Bars that lie over the content reserve their room.** StickyActionBar sets `scroll-padding-bottom` on its scrolling ancestor to its own height, plus the on-screen keyboard's while that is up (`watchKeyboardInset` in `src/components/util/keyboard-inset.ts`), so a focused field is never left under it. FloatingActionButton cannot know what it covers: give the content padding at the end. Margins and minimum target sizes that must not grow with the text size are in px.
- **Disabled options stay reachable.** A disabled Dropdown item or Select option is `aria-disabled`, not `disabled`. It keeps its place in the arrow-key order and is announced as unavailable, and activating it does nothing. A natively disabled button cannot take focus, so the arrow keys used to stop at the option before it.
- **A single selection is never cleared by a repeat press.** Pressing the selected item again does nothing; only checkbox-like controls toggle off. MediaGrid without `multiple`, SegmentedControl, Rating, Calendar and PhotoGrid with `selectable="single"` follow it. Where a selection may be withdrawn there is a control for that: Rating's `clearable` adds a clear button beside the stars.
- **Dates and times stay native, and are strings.** DateField and TimeField are native inputs, so each device brings its own picker and its own way of reading the value out; the library does not put a custom widget in front of them. The field shows the format of the browser or device, not of the page, and cannot be told otherwise. Values are `YYYY-MM-DD`, `YYYY-MM` and 24-hour `HH:mm`, never `Date` objects, and all date arithmetic is on the numbers or in UTC (`src/components/util/date.ts`), so a date never shifts a day with the time zone. `formatDate` and `formatTime` turn a value into text in a named language.
- **A calendar names its days in full.** Each day of Calendar is a button whose name is the full date, its state (today, selected, unavailable) and its events, so nothing depends on a dot, a ring or a colour. Today is marked with a ring and a heavier number and has `aria-current="date"`. Calendar knows what day it is only once it runs in the browser: the server marks no day as today.
- **A touch target is 44 by 44px on a coarse pointer, and nothing changes on a fine one.** Every rule for it sits behind `pointer: coarse`, so a layout made for a mouse is as it was. There are two ways there, described in `src/components/util/touch-target.ts`:
  - *The control grows.* Button, IconButton, Input and Select at `sm` and `md`, Slider's row, ThemeToggle, Tabs, a checkbox or radio row, Dropdown items and Select options, NavigationMenu, TopNavbar and Sidebar items, the Collapsible trigger, and the handle and move buttons of a SortableList are 44px there. The shared-scale controls all grow together, so a row still lines up; `scripts/check-control-geometry.js` fails if one of them drops the rule. `sm` and `md` therefore look alike on a phone, and `lg` (48px) is the size for the main action there.
  - *The control keeps its size and an invisible layer takes the touch* (`TOUCH_HIT_AREA`): the switch of a Toggle, and the close buttons of Alert, Toast, Modal, SlideUp and Drawer. Only for a control with nothing pressable within about 10px, because the layer reaches past the visible box. A Toggle's row is 44px tall there for that reason, so switches stacked in a settings list do not take each other's taps.

  Exceptions: IconButton `xs` is 24px on every pointer, for dense pointer-first layouts (a larger invisible target covered the edge of the button beside it and was removed), and Button `variant="link"` is as wide as its text. `playwright/touch-targets.spec.ts` hit-tests every control on every component page and lists the exceptions in one place.

  Spacing: separate controls that sit side by side have 8px between them on a coarse pointer, so a thumb that lands on the edge of one does not press the next. The handle and the two move buttons of a SortableList row get that gap there (the row still fits at 320px). Controls that are one group with one selection are the accepted exception and stay contiguous, each 44px itself: the stars of a Rating, the segments of a SegmentedControl and the tabs of Tabs. A press on the wrong one is corrected by pressing the right one, and nothing else happens. A Toggle is not covered by the layout around it: the invisible layer of its switch reaches past the switch, so two toggles side by side need 16px between them, or a row each (stacked rows are 44px tall and already clear).
- **Every pressable control has a pressed state that does not depend on hover.** `:active` changes the fill (`--color-surface-active`, or the `-active` step of the control's own colour), the text colour of a link, or the size of a tile, in both themes. On a touch screen it is the only feedback there is before the action happens.
- **A hover style does not stay on after a tap.** A browser leaves `:hover` on the last element tapped until something else is tapped. Tailwind's `hover:` variant only applies where `(hover: hover)` holds; the hand-written `:hover` rules in `src/app.css` and in the components' own `<style>` blocks are inside the same media query (`tests/touch-targets.test.ts` fails on one that is not).
- **A popup stays on screen.** Dropdown opens on the side its `placement` asks for whenever it fits there; near an edge it flips to the other side, and when neither has room it is limited to the viewport less 8px on each side and scrolls inside. NavigationMenuContent is slid back from the edge the same way. Both are measured before they are painted and again on resize and scroll (`src/components/util/fit-in-viewport.ts`, which Tooltip's placement shares); a popup that fits is not touched. Arrow-key order and where focus returns do not change. A box that scrolls around the trigger (a Modal's body, a list with its own scrollbar) counts too, for Dropdown, Select's list and NavigationMenuContent: it decides which side the popup opens on, never how large it may be, and when the popup fits on neither side inside it, the popup is placed against the viewport (`position: fixed`) and reaches out of the box instead of being cut off. It stays where it is in the DOM, so a dialog's focus trap still holds it. Two limits: a trigger scrolled out of the box takes its popup with it, and an ancestor with a `transform`, `filter`, `backdrop-filter` or `contain` between the popup and the box cannot be left, so there the popup opens on the roomier side and is cut where the box ends. Select's list is 60dvh tall at most by default.
- **Nothing is reachable by hover alone.** Actions revealed on hover also appear when focus is inside the component, and are always visible where hover does not exist (touch). ImageUpload shows Change and Remove that way; MediaGrid keeps its remove button beside the item and always visible.
- **A tooltip is never the only way to learn something.** Tooltip opens on hover, on keyboard focus and on a tap (the trigger's own click still happens), is tied to its trigger with `aria-describedby`, and closes on Escape, on a tap elsewhere, on scrolling and when focus leaves. With a mouse the bubble can be pointed at and stays open while the pointer is on it or on the way to it, on a diagonal way as well (WCAG 1.4.13); Escape dismisses it without moving focus. Only one tooltip is open at a time. An open bubble takes presses, so place it where it does not lie over another control. After a tap it stays until it is dismissed, unless `touchDuration` gives it a time. It describes a disabled control too, but a natively disabled button takes no focus: use `aria-disabled="true"` when the tooltip says why. On a touch screen nothing shows that a tooltip is there: do not use it for essential information. Put that in the page, and keep the tooltip for a hint.
- **A list of choices is a sheet on a phone.** A pop-over under its trigger is as narrow as the field and opens under the thumb. Select (`presentation="auto"`, its default) opens its list in a BottomSheet on a touch screen narrower than 640px (`(pointer: coarse) and (max-width: 639.98px)`), and under the field everywhere else; Dropdown has the same prop, defaults to the pop-over, and with `presentation="sheet"` is the action sheet. The element with the `listbox` or `menu` role, its options, their names, the arrow keys, Home and End, and a disabled option that takes focus but cannot be chosen are the same in both; the trigger keeps `aria-haspopup`, `aria-expanded` and `aria-controls`. The sheet adds a dialog named by the Select's label (or `sheetTitle`), the focus trap, Escape, the backdrop and the swipe, and its place on top of a Modal, Drawer or BottomSheet it was opened from. It opens with focus on the chosen option, or the first, and closing returns focus to the trigger. It is not the phone's native picker: that cannot show the search field, descriptions, icons or the loading and empty states. Which one opens is decided in the browser when it opens, so the server renders the same closed control for everyone.
- **A screen always shows its name.** The AppBar's title never has less than 72px. When the back control, whatever is in `leading` and the actions leave it 72px or more, the bar is one 57px row and a title too long for it is cut with an ellipsis (after two lines with `titleLines={2}`). When they leave less (a wide chip in `leading` at enlarged text, a bar under about 260px with a back control and two actions), the title is drawn on a second row of its own, as wide as the bar, and the controls stay together on the first; before, it shrank to nothing and the heading was hidden. Only the drawing order changes: in the document, and so for a screen reader and the Tab key, the order is still back, leading, title, actions. The bar measures this in the browser, since no query knows how wide the app's `leading` is; in the server's markup and without scripts the row wraps instead, which also keeps the title at 72px but lets the actions follow it down. A cut title has no `title` attribute (a tooltip does nothing on touch): the heading's text is whole in the accessibility tree. A `leading` wider than the row is held to the row's width and cannot widen the page. In an AppShell the top inset follows the bar's height as measured.
- **The bars stay small when text grows.** AppBar is one row of 57px (two only when its title would have under 72px, see above) and BottomTabBar one row of 65px at every text size and width. With the root font at 200% on a 375px phone they used to take 225px and 145px or more, and a tab's label broke inside a word. WCAG 1.4.4 asks that text can be resized to 200% without loss of content or function; it does not ask that navigation chrome doubles, and a page left with half its height loses more than it gains. The limit of that reading is that nothing may be lost, so: the page's own content still scales in full; the AppBar title and the tab labels still grow, up to 1.3 times their size (23.4px and 15.6px); what does not fit on one line is cut with an ellipsis at the end, never broken or hyphenated, so the visible start still has to name the screen or the tab (write titles and labels with the distinguishing word first, and keep tab labels to one short word); the heading and each link keep their full text for assistive technology; the controls keep 48px and 44px targets in px. Where a tab is narrower than 52px (five tabs in a bar under 260px, a 360px phone zoomed to 200%) the labels are not drawn and the bar is icons only, the active tab included, with each link still named by its label. Tabs are 8px apart from 308px up for five tabs, closer below that, and edge to edge under 260px; under 220px five 44px tabs do not fit, and they share the bar at less than 44px each (36px at 180px) without overlapping or scrolling. The badge is placed against the icon's corner in px and does not grow over it. A truncated title has no `title` attribute: it would only help a mouse, and the bar is for touch. The header and footer of an overlay (BottomSheet, Drawer, SlideUp, Modal) are the same kind of chrome and are read the same way: they say where you are and how to leave, and at 200% on a 360px phone they used to take 394 of the 576px of a half-height sheet and leave its content 182px. Their gutters, gaps, grip and close button are in px (the close button keeps its 44px target on a touch screen), and the padding of the content and the footer is px with them so the three stay in line; the title grows up to 1.3 times its size (26px in a BottomSheet, 31.2px in the others) on a line that grows with it. Unlike a bar's title it is never shortened: it wraps onto as many lines as it needs, between words. While the text is enlarged (a root font size above 16px, read as the overlay opens) a word that does not fit at the end of a line is hyphenated by the rules of the page's `lang`, so set `lang`; only a word wider than the whole line with no hyphenation point is cut. At the default size a title wraps as it always did, without hyphens: `hyphens: auto` hyphenates at every line end, with whatever points the platform offers. What the app puts inside, the description, and the buttons it puts in the footer scale in full, and the half height of a BottomSheet still grows with the text (its floor is 18rem), so the room the chrome gives back goes to the content: 378 of 576px in that sheet.
- **A sidebar is a drawer on a small screen.** A SidebarShell rail is 266px wide, which a phone does not have beside its content. With `mobile="drawer"` the rail is there from the `lg` breakpoint (1024px) up; below it the rail is `display: none`, so it is in neither the tab order nor the accessibility tree, and the same regions open in a Drawer from the start edge: a modal dialog named by `drawerTitle`, holding a `nav` with the shell's `ariaLabel`, with the Drawer's focus trap, Escape, backdrop and return of focus. The button that opens it (the `trigger` snippet, or the app's own) carries `aria-haspopup="dialog"` and `aria-expanded`. The drawer closes when a link in it is followed, since the page it leads to is behind it, and when the window reaches `lg`. Which of the two shows is CSS, so the server renders the same markup for every screen, and the sidebar is in the page twice only while the drawer is open. The scrolling region's name is the `label` prop ("Navigation links").
- **Nothing sits under a notch or the home indicator.** AppShell, AppBar, BottomTabBar, BottomSheet, StickyActionBar, FloatingActionButton, a full-screen Modal, Toaster, Toast and Page read the safe-area insets (`env(safe-area-inset-*)`) and keep clear of them; Toaster also sits above an AppShell's tab bar (`--app-shell-bottom-inset`) and above a bar of your own (`--toaster-bottom-offset`). The insets are zero until the app asks for them: the viewport meta tag needs `viewport-fit=cover` (`<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`). Full heights are `dvh`, so a mobile browser's own bars do not cut content off. TopNavbar's phone menu is as tall as the screen less the bar and the top inset, so its last link is reachable under a notch.
- **No built-in text that an app cannot replace.** Every word a component says by itself, visible or for a screen reader, comes from a prop: a `…Label` prop where there are one or two, a `strings` object where there are several, with English as the default. The README lists the prop for each component ("Texts and other languages"). `tests/strings-guard.test.ts` and `tests/toaster-strings.test.ts` render the components with every string replaced and fail if a default is still said. Two are still open: Select's "Select options" and SidebarShell's "Navigation links".
- **A toast says what the app gave it, in the app's language.** A toast shows its `title` and its `message`, or the message alone; a default heading is used only for a toast pushed with neither. The words the library adds (the region's name, the names of its buttons, the sentence about the time left, the note that an action is available) are `strings` on Toaster, and `closeLabel` on Toast and Alert. The countdown is not a live region: the time left is in the toast as text a screen reader finds when it reads the toast, and the timer stops while the pointer or focus is on the toast (`data-paused`, `onpausechange`). `tests/toaster-strings.test.ts` renders these with every string replaced and fails if an English default is still said.
- **A toast stays long enough to be read, and can be held.** How long is said in words: `short` (3 seconds), `medium` (7), `long` (14), `persistent` (until it is dismissed). Short is for a few words that need no reading time ("Sparat"); anything a person has to read is medium or long; anything they have to act on, and an error, should stay. When the app says nothing, an error and a toast with an action stay until they are dismissed, and the rest go by their title and message together: up to 120 characters gets medium, 121 to 240 gets long, more than 240 stays. What the app says always wins, so a short error or a short long text is the app's choice. A mouse or a stylus over a timed toast, a finger held on it and keyboard focus inside it each stop its timer for as long as they last, which is what keeps a timed toast within WCAG 2.2.1. A finger that lifts leaves the toast at least three seconds, so holding a short toast starts it again; a tap does not stop the timer for good and does not dismiss. `data-paused` on the toast and `onpausechange` on the Toaster report each change once. A press on a toast is not a press outside what is open under it: the phone menu of a TopNavbar, a NavigationMenu panel and a ColorPicker stay open.
- **A toast is never out of reach, and never over a footer.** The toast stack is drawn above the modal overlays. Their focus trap takes the toast controls in, after the overlay's own (`cycleTrappedFocus` in `src/components/util/focus-utils.ts`), so a keyboard user can dismiss a toast with a modal open; `focusToasts()` works there too, and Escape in a toast returns focus to where it came from. An overlay says where its header (with the close button) and its pinned footer are (`registerOverlayHeader` and `registerOverlayFooter` in `src/components/util/overlay.ts`; SlideUp has a `footer` snippet for this) and the stack lies on neither: it sits above the panel where there is more room, otherwise between the two, so the close button of the overlay on top always takes a press. `--toaster-bottom-offset` is for what is on the page and is not added on top of that. Where the on-screen keyboard covers the page the stack sits above the keyboard. The stack is never taller than the room it has and scrolls when it holds more; a toast's buttons wrap under its title when the title would get less than 8rem.
- **A modal overlay stays above the on-screen keyboard.** Where the keyboard covers the page instead of shrinking it, Modal, BottomSheet, SlideUp and Drawer move their bottom edge to the top of the keyboard (`followKeyboard` in `src/components/util/overlay.ts`), so a pinned footer is not left behind it and the focused field is scrolled into view. A StickyActionBar inside one is not raised a second time.
- **Focus is visible in forced colours.** The focus ring is a box-shadow, which forced-colours mode (Windows High Contrast) drops. `src/app.css` restates it there as an outline for `.focus-ring`, the legacy `.focus-brand` and `.focus-nav`, and the checkbox and radio row.
- **Where you are is visible in forced colours.** The current item of SidebarNavigation (expanded, as a rail and as a drawer), the selected item of SidebarPanel and the current link of TopNavbar are marked with a tinted fill and a label colour, and in the sidebar a 3px bar that is itself a fill. Forced colours take all of those away. There the item carries a 2px outline inside its edge, as BottomTabBar's active pill and a pressed IconButton do; the focus ring is 2px outside, so the two read as different things. NavigationMenu has no current item of its own: it marks the menu that is open (`aria-expanded`).
- **A loading control keeps focus.** Button and IconButton turn `loading` without `disabled`: `aria-disabled="true"` and `aria-busy="true"`, still in the Tab order, and the press is swallowed (a loading submit button does not submit, by a press or by Enter in a field). A link button has no `href` while it loads and `tabindex="0"` instead. Before, focus fell to `<body>` the moment loading started. CSS and tests that matched a loading button with `:disabled` or `[disabled]` need `[aria-busy="true"]`.
- **A colour is chosen without a mouse.** ColorPicker's map is two sliders on one surface (`<input type="range">`, visually hidden, named "Saturation" and "Lightness" in a group named "Saturation and lightness"; all three in `strings`). Each says its value and the colour the two make (`aria-valuetext`, "50%, #bf4040"). One Tab stop; the arrow keys work as on a map and Shift moves by ten. The surface takes any pointer and does not scroll the page under a finger. The hue slider's track is 44px tall on a touch screen. Two native sliders were chosen over one focusable area because `role="slider"` has a single value, and a native range is what a screen reader on a phone, a switch and voice control already know how to read and set.
- **A layout that changes with width is one structure, drawn twice.** Stepper is one ordered list in both its layouts. The compact layout redraws the list's markers as a segmented bar and clips the labels instead of removing them; the visible line ("Step 2 of 3 — Ratings") is hidden from assistive technology, and is not in the layout at all when the full layout shows. The switch is a container query on the Stepper's own width, in rem, so the server's markup is right before any script runs and enlarged text goes compact sooner.
- **Progress is never colour alone.** In Stepper a completed step has a check, the current one its number in a filled marker inside a ring and a heavier label, an upcoming one its number in an outline drawn in `--color-control-border`. The line between steps is solid up to the current step and dashed after it. In forced colours the filled markers take the system's Highlight pair.
- **A step change is announced, and focus is the app's.** Stepper reads the new step out once through a polite status and clears it after three seconds. It does not move focus: the app focuses the new step's heading.
- **What is chosen before the page hydrates is kept.** A server-rendered page can be used before its scripts arrive. Checkbox, Radio, RadioGroup, Rating and SegmentedControl bind their native input, so a tick or a choice made in the server markup is still shown after hydration, becomes the bound value, and is reported once: Checkbox and Radio fire a `change` event on the input, Rating and SegmentedControl call `onchange`. Input, Textarea, Slider, DateField and TimeField keep what was typed the same way. The radios of a Rating or a SegmentedControl always share a name, so they are one group to the browser before any script has run. Toggle, Select and an interactive Stepper are buttons and need their scripts to do anything (`playwright/hydration-value.spec.ts`).
- **No bindable prop has a fallback.** Svelte throws `props_invalid_value` for `bind:value={undefined}` on a prop declared with one, and a page that throws while it hydrates never becomes interactive. Every component applies its default itself and writes it back through the binding, so `let open = $state<boolean>()` can be bound to any of them (`tests/bindable-undefined.test.ts` reads the list from the source).
- **A label that does not fit wraps.** Button and Badge have a minimum height, not a fixed one: at 200% text on a phone a long label takes a second line inside the control instead of painting outside it or widening the page. A one-line label is exactly as tall as before.

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
   - Run it with the other gates (the project has no CI; see RELEASING.md)
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

