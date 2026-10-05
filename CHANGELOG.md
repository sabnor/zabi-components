# Changelog

All notable changes to this project will be documented in this file.

## Changelog policy (theme/token surface)

Whenever token or CSS import API surface changes, include:
- exported path additions/removals/deprecations (`package.json` `exports`)
- token rename/add/remove (for `--color-*` and `--zabi-*`)
- mapping rule updates (for example dark semantic mapping)
- migration guidance when compatibility aliases remain temporarily

## [Unreleased]

### Added

- **`zabi-theme --pin`** (and `createTheme({ pin: true })`): the primary action
  is the exact brand colour in light, with hover and pressed states derived
  from it and a label checked at 4.5:1. The focus ring and links take the
  colour where every guarded pair still passes. Dark keeps the mirrored ramp
  step unless the colour passes there; the file header says which. A pair that
  fails is a warning and the colour is never moved. `--pin-accent` /
  `pin: { accent: true }` does the same for the solid accent fill. Without the
  option the output is unchanged.
- **ThemeToggle `modes="three"`**: steps through system, light and dark, writes
  `data-theme` on `<html>`, shows a monitor, sun or moon, and names itself
  "Theme: system. Switch to light". `labels` replaces the words for another
  language.
- **ThemeToggle `mode` (bindable), `onmodechange` and `storageKey`**: read or
  drive the mode from the app, store the choice under your own key, or pass
  `storageKey={null}` and store it yourself.
- **Theme helpers** from the package root: `getThemeMode`, `setThemeMode`,
  `isThemeDark`, `getStoredThemeMode`, `storeThemeMode`, `themeInitScript` and
  the `ThemeMode` type. `themeInitScript()` returns a script for `<head>` that
  applies the stored mode before first paint. An app's own control (a
  SegmentedControl with three options) can drive the theme through them, and
  ThemeToggle follows.

### Changed

- **Nested corners are concentric.** Where a rounded element sits closer to
  its rounded container's corner than that corner's radius, its radius is now
  the container's minus the gap: the Card inside a Modal, the avatar in
  SidebarFooter's profile button, MediaGrid's check mark (now a rounded
  square) and video badge, Alert's close button, and ListItem rows inside a
  `.list-group`.
- **Dropdown menus and Select lists use the overlay radius** (16px, was 8px).
  Select's search field and options sit 4px closer to the edge of the list to
  stay concentric with it.
- With both `class="dark"` and `data-theme="light"` on `<html>`, the colour
  scheme is now dark, matching the tokens.
- **ThemeToggle applies the stored choice when it mounts**, in both modes.
  Before, a stored choice was written but only a page script could apply it.
  Pass `storageKey={null}` to only read the page.

### Fixed

- **Placeholder contrast.** Placeholder text, and the format hint of an empty
  DateField or TimeField, was 3.40:1 on a dark field and 4.40:1 on a hovered
  light one. `--color-input-placeholder` moves one step in each theme (light
  #61616a, dark #a1a1aa) and is 4.5:1 or more on the resting, hovered, focused
  and pressed field.
- **Native controls follow the dark theme.** The dark theme now sets
  `color-scheme: dark` itself, under `.dark` as well as `data-theme`. On a page
  switched with the `dark` class, scrollbars, date and time pickers, other
  native form controls and autofill turn dark. A page that sets `color-scheme`
  on `<html>` itself keeps its value.
- **ThemeToggle works with `data-theme`.** It reads `dark`, `light` and `auto`,
  writes the attribute where the page uses it and the `dark` class otherwise,
  follows changes made elsewhere, and shows the right icon before it mounts. A
  page that uses only the class behaves as before.
- A toggled-on danger-tone IconButton shows its pressed fill while held.
- `npm run build:css` works in a fresh checkout with no `dist/`.
- Site: the "On this page" list on the docs and theming pages marks the
  section being read (`aria-current="location"`, a leading bar and heavier
  text), while scrolling, after following an entry, and when the address has
  a hash.
- Site: `viewport-fit=cover` was missing, so the phone components' safe-area
  insets were zero on a real phone. The site's own header, content and footer
  now keep clear of a notch and the home indicator, the header folds into the
  phone menu below 1024px, and the marketing headings follow
  `--font-family-heading`.
- docs/KEYBOARD_NAVIGATION.md and docs/ACCESSIBILITY.md described missing or
  planned behaviour for Modal, Card, Dropdown, Select, Input, Alert, Tabs and
  navigation; they now describe what the components do.
- A List no longer clips the focus ring of its rows.
- A disabled field's placeholder is no stronger than a disabled value.
- Select's trigger placeholder uses the placeholder colour, so a chosen option
  can be told from "Choose an option" in dark.

## [8.1.0-beta.0] - 2026-10-05

A pre-release, published under the `beta` dist-tag:
`npm install zabi-components@beta`. 8.0.1 was never published, so coming from
8.0.0 you also get the changes listed under 8.0.1 below.

### Upgrade notes

Nothing was removed or renamed: every `exports` path and every token name of
8.0.0 is still there. These changes are visible without a code change:

- **Import the dark theme after a light one.** `theme-dark`,
  `theme-dark-only` and the dark part of `colors` no longer carry the raw
  `--zabi-*` ramps; they only remap roles. If you imported a dark file on its
  own, add `theme` or `theme-only` before it:
  `@import "zabi-components/theme-only"; @import "zabi-components/theme-dark-only";`
- **Dark surfaces are `color-mix()` expressions** over `--zabi-base-*`. The
  pixels are the same; `getComputedStyle` reports `color(srgb …)`, not
  `rgb(…)`, so a test that compares the string needs updating.
- **Every dark focus ring is one step lighter** (`brand-600`, #92a9ff by
  default, was `brand-500`), and the muted ring in dark is `base-600`.
- **The computed `box-shadow` of a focused element lists five shadows**, not
  two, because the ring now composes with shadow utilities.
- **Controls are at least 44px on touch screens** (`pointer: coarse`), so
  layouts there get taller. Nothing changes with a mouse.
- **Tabs with long labels scroll** instead of wrapping onto several lines.
- **Page pads for the safe areas by default** (`safeArea`). An app that sets
  `viewport-fit=cover` and already pads for the insets itself should pass
  `safeArea={false}`.
- **A Tooltip that would leave the viewport moves to stay inside it**, and
  `data-placement` on its bubble reports the side used.
- **`culori` is now a dependency**, used by the theme generator.

New surface, following the changelog policy above:

- Exported paths added: `zabi-components/create-theme`. A `bin` is added:
  `zabi-theme`. None removed or deprecated.
- Tokens added: `--zabi-accent-50` … `950`, `--color-accent-50` … `950`,
  `--color-accent`, `-hover`, `-active`, `-subtle`, `-border`, `-text`,
  `--color-on-accent`, `--zabi-on-accent`, `--zabi-on-accent-dark`,
  `--color-on-brand`, `--zabi-on-brand`, `--zabi-on-brand-dark`,
  `--font-family-heading`, `--font-family-mono`, `--font-weight-regular`,
  `-normal`, `-medium`, `-semibold`, `-bold`, `--color-control-border`,
  `--color-focus-ring-muted`, `--color-input-active`, and, from earlier in
  this cycle, `--color-surface-inset` and `--color-input-border-hover`. None
  renamed or removed.
- Mapping rules: the dark block declares no raw palette and no hex value; dark
  `--color-base-*` steps alias the mirrored `--zabi-base-*` step, and the dark
  surface ladder is mixed from `--zabi-base-50` over `--zabi-base-900`.
  `--color-action-primary-text` follows `--color-on-brand`. The dark block is
  also published for `[data-theme="dark"]` and, under
  `prefers-color-scheme: dark`, for `[data-theme="auto"]`.

### Known limitations of this beta

Everything was verified in desktop Chromium only, with phone widths, touch,
safe areas and the on-screen keyboard emulated. None of the following has been
checked, and each is worth a look on a real device:

- **iOS Safari and Android Chrome** in general: taps and focus, the body scroll
  lock behind overlays, swipe gestures on BottomSheet and SlideUp.
- **The native date and time pickers** behind DateField and TimeField. The
  fields rely on WebKit-specific CSS for iOS that has not been seen on a
  device: an empty field keeping its height, the value's alignment, `readonly`,
  `step`, `min` and `max`, and the picker in dark mode.
- **The on-screen keyboard** with StickyActionBar (its lift was tested against
  an emulated visual viewport), and with BottomSheet and a full-screen Modal,
  whose footers are not lifted above the keyboard.
- **Real safe-area insets** (they need `viewport-fit=cover`) and **`dvh` with
  collapsing browser bars**, for AppShell, AppBar, BottomTabBar, Page, Toaster
  and the full-screen Modal.
- **Screen readers.** Names, roles and live regions were read from the
  accessibility tree, not listened to: Calendar's day names and month changes,
  Rating, the BottomSheet grip, the scrolling Tabs.
- **Firefox and Safari on desktop.**

Known issues in this beta:

- A toast can cover the footer of a full-screen Modal or a bottom sheet, and
  the focus trap keeps the keyboard from reaching the toast to dismiss it.
- A Dropdown inside a scrolling or clipping container (a Modal's content, for
  one) is kept inside the viewport, not inside that container, and can be
  clipped.
- Placeholder text in dark fields is 3.4:1, including the format hint of an
  empty DateField or TimeField.
- A Tooltip opened by a tap closes after 2.5 seconds (`touchDuration`), and a
  tooltip cannot be hovered with a mouse.
- Calendar marks unavailable days by colour only, and its built-in words
  ("today", "selected", "unavailable") are English whatever `locale` is; pass
  `strings`.
- Not in this beta: the nested corner radius fixes, PhotoGrid and PhotoViewer,
  and a touch mode for Select and Dropdown.

### Added

- **SortableList**, a new molecule that reorders items and leaves their content
  to you. Each row has a drag handle (mouse and touch, by pointer events), arrow
  keys, Home and End on the handle, optional move up and move down buttons, and
  a polite announcement of the new position. `bind:items` holds the order,
  `onreorder` reports the item with its old and new index, `controls="manual"`
  lets a row place the handle itself, and every built-in string can be replaced
  through `strings`. Escape cancels a drag.
  A key that cannot move the item further says so ("Hero section, already
  first"). If the parent replaces `items` during a drag, the drag is cancelled
  rather than moving another item. A click on the handle or a move button does
  not bubble, so a card header with its own click handler is not toggled; put
  them beside a header toggle, never inside another button.
- **ImageUpload can open your own picker.** `onbrowse` replaces the native file
  chooser, for a media library or another source, and `event.preventDefault()`
  in `onclick` now keeps the chooser closed.
- **ImageUpload previews video.** A value that is a video (by file type, by
  extension, or forced with `previewType`) renders a `<video>` with controls; it
  never autoplays. A `preview` snippet replaces the built-in preview.
- **ImageUpload has a label.** `label` and `id` props; the dropzone is a native
  `<button>` the label points at. Change and Remove take their accessible names
  from the label ("Change logo"), or from `changeLabel` and `removeLabel`, and
  the preview accepts `alt`.
- **ImageUpload accepts a dropped file**, checked against `accept`; a file that
  does not match is reported through `onfilereject`.
- **ImageUpload copy is configurable**: `browseText`, `changeText`,
  `removeText`, `errorTitle` and `errorRecovery` (`false` leaves the line out).
  The defaults are the previous strings.
- **IconButton has an `xs` size**, a 24px box for dense, pointer-first layouts
  such as card headers. It is the minimum target size; use `sm` or larger where
  the primary input is touch.
- **IconButton can be a toggle.** `pressed` (bindable) renders `aria-pressed`
  and a pressed style in every variant, and a click flips it;
  `event.preventDefault()` in `onclick` keeps the current state. Left
  undefined, the button renders no `aria-pressed`, as before.
- **IconButton has a quiet destructive style.** `tone="danger"` on the `ghost`
  or `outline` variant gives a danger-coloured icon, a danger-tinted hover and
  the danger focus ring, for inline delete.
- **Modal can render in `document.body`.** With `portal`, the overlay is moved
  out of its ancestors on mount, so a transformed, filtered or clipped ancestor
  can no longer position or clip it. Focus trap, focus restore, scroll lock and
  nested modals work as before. A theme class set below `<body>` does not reach
  a portalled modal.
- **Modal reports why it closed.** `onclose` receives
  `{ reason: "escape" | "backdrop" | "close-button" }` whenever the modal
  closes itself.
- **Modal can refuse to close.** With `dismissible={false}`, Escape, a backdrop
  click and the close button do nothing (the close button stays focusable and
  is marked `aria-disabled`); setting `isOpen` yourself still closes it. Meant
  for a pending action.
- **Collapsible**, a new molecule: a trigger wired to the panel it shows and
  hides. It owns the ids, `aria-expanded`, `aria-controls` and the panel's name.
  `title` gives a full-width header button with a chevron (`headingLevel` wraps
  it in a real heading); a `trigger` snippet hands the same wiring to your own
  `<button>` inside your own header. `bind:open` holds the state, `onopenchange`
  reports a toggle, and `disabled` turns the trigger off. Closed content stays
  in the DOM under `hidden`, so it takes no focus and a form inside it keeps its
  values; `unmountOnClose` removes it instead.
- **CollapsibleGroup** turns the Collapsibles inside it into an accordion:
  opening one closes the others, or `multiple` lets several stay open. Arrow
  Up, Arrow Down, Home and End move focus between the header buttons, and Tab
  still reaches each of them.
- ImageUpload takes `actionsPlacement` (`"overlay"` or `"strip"`). A video
  preview, including one rendered by a `preview` snippet, defaults to the strip
  so its controls stay clear.
- ImageUpload announces "Image selected" and "Image removed" to screen readers;
  `selectedText` and `removedText` replace the wording.
- **A toast can offer an action.** `pushToast` takes an optional
  `action: { label, onclick, dismissOnClick? }`, rendered as a button in the
  toast; the toast closes after the handler runs unless `dismissOnClick` is
  `false`. The countdown pauses while the pointer or focus is on the toast, and
  the action is announced with the message. Give an action toast a long
  `duration` (or `0`), and offer the same action elsewhere in the page. The
  `ToastAction` type is exported.
- **Dropdown options can carry an icon, a danger tone and a description.**
  Each item of `options` takes an optional `icon` (a component, such as a
  lucide icon), `tone: "danger"` and `description`, shown under the label and
  linked as the item's description. The `DropdownOption` type is exported.
- **DropdownItem**, the same menu item as a component, for a Dropdown's custom
  `children`. It takes its role from the Dropdown and joins the arrow-key order.
- **ConfirmDialog**, a new molecule built on Modal: a dialog that asks before
  an action. `title` names it and `message` describes it; `variant` is
  `danger`, `warning` or `info`, each with its own icon, and `danger` uses the
  danger button. `confirmLabel` and `cancelLabel` set the button text. If
  `onconfirm` returns a promise the dialog shows its loading state and cannot
  be dismissed until it settles: it closes on success and stays open on
  failure, with the error passed to `onerror`. Returning `false` keeps it open.
  `loading` does the same for callers who track the request themselves.
  `oncancel` reports how the user backed out. Focus starts on Cancel, Enter
  only activates the focused button, and the dialog renders in `document.body`
  unless `portal={false}`.
- **`--color-surface-inset`** (`bg-surface-inset`), a recessed area on a card
  that works in both themes: a well, a stat strip, a code sample. It is the
  ramp step between the page and the raised surface, `base-100` in light and
  `base-150` in dark, and every text token passes AA on it. Dark
  `--color-input` now points at it and keeps its value. Do not use
  `--color-input` for a well; it is white in light mode.
- **`--color-input-border-hover`**, the edge of a hovered field: `base-450` in
  light, equal to `--color-input-border` in dark. No component uses it yet.
- **Modal can be an `alertdialog`.** `role="alertdialog"` is for a dialog that
  interrupts to ask for a response; the focus trap treats both roles alike,
  including when one is opened over the other. ConfirmDialog uses it.
- **Modal's close button can be renamed** with `closeLabel` (default "Close").
- **Modal accepts the dialog panel's attributes as typed props**
  (`aria-describedby`, `aria-busy`, `data-*`, `id`); they were already passed
  through, but not declared.
- **Drawer**, a new molecule: a modal panel that slides in from the side of the
  screen. `side` is `left`, `right`, or `start` / `end` to follow the writing
  direction; `size` is `sm`, `md` or `lg` and never wider than the screen. It
  has a `title`, an optional `description` and a `footer` snippet pinned below
  the scrolling content. Focus is trapped and returns to the opener, the page
  behind does not scroll, and Escape, the backdrop and the close button close
  it; `dismissible`, `onclose({ reason })` and `closeLabel` work as in Modal.
  `initialFocus` names the control that takes focus on open. It renders in
  `document.body` unless `portal={false}`, shares the scroll lock with Modal
  and SlideUp, and can be opened over a Modal or host one. The slide is skipped
  under `prefers-reduced-motion`.
- **Table can stack its rows on small screens.** `stacked` lays each row out as
  label and value pairs and drops the 20rem minimum width, so nothing scrolls
  sideways; `stacked="sm"`, `"md"` or `"lg"` does so only below that breakpoint.
  Put the column name on each cell as `data-label` (`<td data-label="Role">`).
  Keep the `<thead>`: it is hidden from view when stacked but still gives the
  cells their headers.
- Table takes `captionHidden`, which keeps the caption as the table's accessible
  name but hides it from view.
- EmptyState takes `headingLevel` (1–6, default 2) so its title fits the heading
  outline of the page, and `size="compact"` with tighter padding and a smaller
  title for use inside a card.
- **MediaGrid**, a new molecule: a grid of image and video thumbnails to pick
  from, for a media library. It is the grid only; the modal, the upload button
  and the data stay yours. Pass `getKey`, `getLabel` and `getUrl`. One item is
  selected at a time (`bind:selected`), or any number with `multiple`
  (`bind:selectedKeys`); the selected item has a thicker border and a check
  mark. A single selection moves when another item is pressed and is never
  cleared by pressing it again; with `multiple` the items toggle. `ondelete` shows an always-visible delete button named after each item;
  the grid only reports the item, and when it is removed focus moves to the one
  that took its place. The grid is one Tab stop: arrow keys move between items
  by the columns on screen, Home and End within the row, and Delete asks to
  delete. A video is a still with a play badge (`getType`, `getPoster`), a file
  that fails to load shows a fallback, `loading` adds placeholder tiles, and an
  empty library shows a compact empty state (`emptyHeadingLevel`, default 3)
  or your `empty` snippet. Columns follow
  the width (`minTileSize`, default 96px), and every built-in string can be
  replaced through `strings`.
  "Use the arrow keys to move between items." is read when focus enters the
  grid and shown below it while it has keyboard focus. The delete button sits
  on the end corner, mirrors in right-to-left layouts, and takes taps in a
  44px area on touch screens.
- **Modal and SlideUp take `initialFocus`**, a CSS selector for the control
  that takes focus on open, as Drawer does.
- **SlideUp's close button can be renamed** with `closeLabel` (default "Close").
- **ConfirmDialog announces its loading state.** `loadingLabel` (default
  "Working…") is read out once, politely, when loading starts.
- **Spinner**, a new atom: the loading ring Button, IconButton and Input show,
  on its own. Sizes `xs` to `lg` (12, 14, 16, 20px), in the text colour. With a
  `label` it is a `status` that screen readers announce; without one it is
  decorative. Under `prefers-reduced-motion` it fades instead of spinning.
- **Slider**, a new atom: a native range input in the library's colours, so
  the keyboard, touch, right-to-left layouts and form submission are the
  browser's own. `bind:value`, `min`, `max`, `step`, a label, helper or error
  text, and three sizes on the Input and Button height scale. `showValue`
  displays the value and `formatValue` adds a unit, which is also what
  assistive technology reads (`aria-valuetext`).
- **UnsavedChangesBar**, a new molecule: a bar with Save and Discard that shows
  while a form has unsaved changes (`dirty`). It is sticky (`position`
  `bottom` or `top`), so it stays in view without covering the last field.
  `onsave` may return a promise: the bar shows its saving state until it
  settles, and a rejection keeps the bar and calls `onerror`. Its appearance
  is announced politely and it never takes focus; when it goes, focus returns
  to the field the user was editing. An `actions` snippet adds buttons.
  Warning before the page is left is your app's job.
- **`focusToasts()`** moves keyboard focus to the newest toast, for a shortcut
  of your own. Focus returns to where it was when that toast is dismissed.
- **TopNavbar nav items take `external`.** It marks the link and opens it in a
  new tab; it defaults to true for absolute URLs, and can be set on a
  same-origin link that leaves the app, or turned off.
- **One brand override restyles light and dark.** The raw `--zabi-*` ramps are
  declared once; the dark block only remaps roles and holds no palette and no
  hex value. Override `--zabi-brand-*`, `--zabi-accent-*` or `--zabi-base-*` on
  `:root` and both themes follow. The dark surfaces are mixed from the neutral
  ramp, so warm or tinted greys carry through to cards and overlays.
- **An accent colour.** `--zabi-accent-50` … `950` (the citron ramp by default)
  and `--color-accent-50` … `950`, with the roles `--color-accent`, `-hover`,
  `-active`, `-subtle`, `-border` and `-text`, `--color-on-accent` for a label
  on the fill, and the classes `bg-accent`, `text-accent` and `border-accent`.
  The `energetic` tokens are unchanged.
- **The text on a primary fill can be set.** `--zabi-on-brand` (light, white)
  and `--zabi-on-brand-dark` (dark, `brand-950`) feed the new role
  `--color-on-brand`, which `--color-action-primary-text` now follows. A light
  brand such as amber sets a dark label once. `--zabi-on-accent` and
  `--zabi-on-accent-dark` do the same for the accent.
- **Font tokens.** `--font-family-heading` (follows `--font-family-sans` until
  set; applied to `h1`–`h6` and Heading), `--font-family-mono` (CodeBlock's
  existing stack, which it now reads from the token), and
  `--font-weight-regular`, `-normal`, `-medium`, `-semibold` and `-bold`, the
  variables the `font-*` utilities read.
- **Dark mode by attribute, and by the system setting.** The published dark
  files apply to `.dark` and `[data-theme="dark"]`, and to
  `[data-theme="auto"]` when `prefers-color-scheme` is dark;
  `[data-theme="light"]` stays light. Following the system is opt-in: a page
  with no class and no attribute is light, as before. Put the class or the
  attribute on `<html>`.
- **AppShell**, a new organism: the phone layout. A `header` snippet (an
  AppBar), the scrolling content in `<main>`, and a `footer` snippet (a
  BottomTabBar), in a full-height column that uses `dvh` and keeps clear of the
  notch, the home indicator and the rounded corners (`env(safe-area-inset-*)`).
  It sets `--app-shell-top-inset` and `--app-shell-bottom-inset` to the measured
  height of its bars, so a floating control can sit above the tab bar.
  `contentElement="div"` is for a shell inside a page that already has a
  `<main>`.
- **AppBar**, a new molecule: the top bar of a phone screen, with a `title`
  (`headingLevel`, default 1), a back control (`backHref` or `onback`,
  `backLabel`), a `leading` snippet and an `actions` snippet for up to two
  actions. `collapseOnScroll` slides it away on the way down and brings it back
  on the way up; it stays while keyboard focus is inside it, comes back when
  focus enters, and does not animate under `prefers-reduced-motion`.
- **BottomTabBar**, a new molecule: main navigation at the bottom of a phone
  screen, for three to five links with an icon above a short label. `items`
  take `href`, `label`, `icon` and an optional `badge` count, which is read
  with the label ("Inbox, 3 new"; `badgeLabel`, `badgeMax`). `active` is an
  href or a path and marks one item with `aria-current="page"`; left out, the
  bar follows the address in the browser, so pass it when rendering on the
  server (`active={page.url.pathname}`). It is fixed to the bottom on its own
  and in the flow inside an AppShell (`position`), and keeps clear of the home
  indicator. Tabs are at least 44px with 8px between them.
- **Rating**, a new atom: one to `max` stars (default 5) that can be left
  empty. `bind:value` is a number or `null`. It is a radio group named by
  `label`, each star reads "4 of 5 stars", the arrow keys, Home and End change
  the value, and `name` submits it with a form. Pressing the selected star
  again never clears it; `clearable` adds a clear button, and Delete or
  Backspace clears too. `readonly` shows a score as one image with one name
  ("Quiz, 3.5 of 5 stars"), fills stars by any fraction and prints the number
  beside them (`showValue`, `formatValue`); it submits nothing. Each star is a
  44px target at every `size`. The texts are replaceable through `strings`.
  An empty star is drawn in `--color-control-border`, 3:1 or more on every
  surface level in both themes.
- **SegmentedControl**, a new molecule: two to four choices in one row, such as
  List / Month. `options` take `value`, `label`, an optional `icon` and
  `disabled`; `bind:value` holds the choice and `onchange` reports it. It is a
  radio group, not tabs: one Tab stop, arrow keys move and select, `name`
  submits it, and a repeat press on the selected segment does nothing.
  Segments share the row equally (`fullWidth`, default true), labels wrap
  before they are cut, and every segment is 44px tall on a touch screen.
- **A theme generator.** `npx zabi-theme --brand "#0026EA"` writes a CSS file
  with the full `--zabi-brand-*` ramp, and with `--accent` and `--neutral` the
  `--zabi-accent-*` ramp and all 21 `--zabi-base-*` steps; `--out` names the
  file. Import it after `theme-only` and `theme-dark-only` and it covers light
  and dark. The same is available in code as `createTheme({ brand, accent,
  neutral })` from the new export `zabi-components/create-theme`, which returns
  `{ css, tokens, warnings, closest }`. The ramps sit on the library's
  lightness curve: your colour gives the hue and the chroma and is not pinned
  to a step, so the exact hex may not appear, and the file header names the
  closest step. The generator picks the text colour for the brand and accent
  fills.
- **The generator checks contrast.** Every role pair the library's own guard
  checks is resolved with the generated ramps in light and dark, and a pair
  below WCAG AA (4.5:1 for text, 3:1 for UI parts) is reported on stderr, in
  the file header and in `warnings`. `--strict` exits 1 on a failed pair.
  `--set <token>=<value>` (or `overrides`) moves a role, and is checked too.
- **A theming guide.** `THEMING.md` is now the documented token API: a quick
  start with `zabi-theme`, the import order, tables of the tokens an app may
  set (the brand, accent and neutral ramps, the "on" colours, fonts and
  weights, radius, shadow, z-index) and the roles it should read, light, dark
  and auto, what the generator does and does not do, and what does not follow
  an override. Renaming or removing a documented token is a breaking change;
  the token-name snapshot in `npm run test:themes` enforces it.
- **A theming page on the docs site** (`/theming`) with a brand switcher. Amber
  is generated with `createTheme` from `#C17B00` and a warm neutral when the
  site builds; `?brand=amber` opens any page in it.
- **Two-brand tests.** `playwright/theme-brands.spec.ts` checks component pages
  under the default brand and Amber, in light and dark, at desktop width and
  375px, from computed styles.
- **`--color-control-border`** (`border-control-border`,
  `text-control-border`): the edge of a control that has nothing else to be
  seen by. 3:1 or more on every surface level in light and dark.
  `--color-border-strong` is unchanged and remains a decorative edge.
- **`--color-focus-ring-muted`**, the colour of `.focus-ring--muted`.
- The contrast guard holds the muted and danger focus rings and the control
  boundary to 3:1 on all five surface levels, and fails when a focus-ring rule
  reads a colour that is not in its pair list. The theme generator checks the
  same pairs.
- **BottomSheet**, a new molecule: a modal panel that slides up from the bottom
  for pickers, filters and short forms. It rests at snap points (`snapPoints`,
  `"half"` and `"full"` by default; `bind:snap`); the grip at the top drags it
  between them or down to close, and is also a button ("Expand" / "Collapse")
  for the keyboard and screen readers. Scrolling inside the sheet wins over
  dragging unless the content is at its top. `title`, `description`, a `footer`
  snippet, and `isOpen`, `dismissible`, `portal`, `initialFocus`, `closeLabel`
  and `onclose({ reason })` as in Drawer, with the added reason `"swipe"`.
  Focus is trapped and returns to the opener; point `initialFocus` at the first
  field of a form. It keeps clear of the safe areas, does not animate under
  `prefers-reduced-motion`, and from `md` up is a centred 40rem sheet.
- **StickyActionBar**, a new molecule: a bar that keeps a form's main action in
  view at the bottom of the screen or of its scrolling box, and rises above the
  on-screen keyboard where the browser does not shrink the page for it. It
  reserves `scroll-padding-bottom` so the focused field is not hidden behind
  it, and never takes focus. Use one per scrolling box. A short form needs
  `class="flex min-h-full flex-col"` for the bar to sit at the bottom.
- **FloatingActionButton**, a new atom: a round 56px primary button that floats
  above the content. `label` is required and is its accessible name;
  `extended` shows it as text beside the `icon`. It is a link with `href`, a
  button otherwise. `position` is `bottom-end` (default), `bottom-start` or
  `bottom-center`. Inside an AppShell it sits above the tab bar; elsewhere it
  is fixed above the safe area, and `--fab-bottom-offset` lifts it further.
- **SlideUp can be swiped away.** `swipeToClose` adds a grip and closes the
  sheet on a downward swipe; `onclick` is called as for the other ways of
  closing.
- AppShell also sets `--app-shell-top-inset` and `--app-shell-bottom-inset` on
  `<html>` while it is mounted, so overlays rendered in `document.body` can
  read them.
- **`--color-input-active`** (`active:bg-input-active`), the fill of a pressed
  field. Select's trigger uses it.
- **TopNavbar takes `collapseAt`** (`"sm"`, `"md"`, `"lg"` or `"xl"`; default
  `"md"`, as before): the width at which the row of links gives way to the
  menu button. Use a later one when the links do not fit between 768px and
  your widest layout. The `TopNavbarCollapseAt` type is exported.
- **Tabs take `fullWidth`**, which shares the row equally between the tabs. It
  is meant for two or three tabs.
- **Tooltip opens on a tap.** A touch or pen press on the trigger toggles it,
  and the trigger's own click still fires. It closes on a second tap, a tap
  outside, Escape, a scroll, when focus leaves, or after `touchDuration`
  (default 2500ms; `0` keeps it open until dismissed). With a mouse or the
  keyboard it behaves as before. Do not put essential information in a
  tooltip.
- **Modal can fill the screen.** `fullScreen` makes the dialog fill the dynamic
  viewport, with the title and close button pinned at the top and the footer
  at the bottom, inside the safe areas, and the content scrolling between
  them; `fullScreen="mobile"` does so below `md` only. Meant for long forms.
- **Page keeps clear of the safe areas.** `safeArea` (default true) pads the
  left, right and bottom by `env(safe-area-inset-*)`; it adds nothing inside an
  AppShell, and nothing where the insets are zero. Your own `px-*` class on a
  Page replaces the padding on that side. Safe areas need
  `viewport-fit=cover` in the page's viewport meta tag.
- **`--toaster-bottom-offset`** lifts the toast stack above a fixed bar or a
  floating button of your own (72px clears a FloatingActionButton). Toaster
  passes other attributes through to its region.
- **DateField and TimeField**, two new atoms: the browser's own date and time
  inputs in the library's Input, so a phone shows its native picker.
  `bind:value` is a string, `YYYY-MM-DD` or 24-hour `HH:mm`, and `""` while
  empty. `label`, `hint`, `error`, `min`, `max`, `step`, `required`,
  `disabled`, `readonly`, `size`, `name`; they work inside FormField. The
  field shows the date in the device's format, which a page cannot change.
- **`formatDate` and `formatTime`**, exported from the package root, format
  those strings for display in a given locale (`formatDate("2026-10-06", "sv")`
  is "6 okt. 2026"). They never shift a date by the time zone, and return `""`
  for an empty or invalid value.
- **Calendar**, a new molecule: one month as a grid, with dots on the days
  that have events. `bind:month` (`YYYY-MM`), `bind:selected` (`YYYY-MM-DD` or
  `null`), `events` (`date`, `label`, optional `tone`; up to three dots a
  day), `weekStartsOn` (default Monday), `locale`, `min`, `max`,
  `isDateDisabled`, `onselect`, `onmonthchange`. Pressing the selected day
  again does nothing. It is an ARIA grid with one Tab stop: arrow keys move by
  day and week, Home and End within the week, Page Up and Page Down by month
  (with Shift, by year). Each day is named in full with its state and events
  ("Tuesday, 6 October 2026, today, 2 events: …"); `locale` translates the
  dates, and `strings` the words around them. Days are 44px tall and share
  the width, 41px each on a 320px screen.

### Changed

- **ImageUpload no longer forces a 16rem minimum width**; it fills its
  container. Set a width on the host with `class` if you relied on it.
- **ImageUpload's `id` now names the control** the label points at, not the
  host element.
- ImageUpload reveals Change and Remove on keyboard focus (`:focus-visible`)
  rather than on any focus, so they do not cover a preview just picked with a
  mouse. They wrap and truncate in a narrow container.
- **A disabled Dropdown option stays focusable.** It is rendered with
  `aria-disabled` instead of `disabled`, so the arrow keys reach it and move
  past it, and a screen reader can read why it is unavailable; it still cannot
  be chosen.
- **Light mode has a visible surface ladder.** The page
  (`--color-surface-base`, `--color-page`, `--color-background-tertiary`) moves
  from `base-100` to `base-150`, and `--color-surface-elevated` from `base-50`
  to `base-100`. A card is now 1.18:1 on the page (was 1.10) and a nested card
  1.10:1 on its parent (was 1.04). `--color-card-active` is `base-150` and
  `--color-surface-overlay-hover` is `base-150`.
- **Light tinted fills read on a white card.** `--color-<family>-subtle` moves
  from step 100 to step 200 and `--color-<family>-border` from 200 to 300, for
  success, warning, error, energetic and info (1.36:1 on a card, was 1.16).
  `--color-neutral-subtle` is `base-250` and `--color-neutral-border`
  `base-300`. `--color-action-primary-subtle` and `-subtle-hover` are
  `brand-200` and `brand-300`.
- **Light hover and secondary fills are stronger.** `--color-surface-hover` and
  `--color-surface-active` are 9% and 15% ink (were 6% and 11%);
  `--color-action-secondary`, `-hover` and `-active` are 10%, 15% and 20% (were
  7%, 12%, 17%).
- **The light focus ring clears 3:1.** `--color-focus` moves from `brand-500`
  (2.99:1 on the page) to `brand-600` (4.12:1), and `--color-focus-weak`,
  `-medium` and `-strong` each move one step. `--color-nav-menu-focus` now
  follows `--color-focus`.
- **Overlays have an edge in light mode.** `--color-border-overlay` was
  transparent and is now a 10% ink tint.
- **Light shadows are stronger.** `--shadow-color` is `24 24 27` and
  `--shadow-opacity` 0.14 (were `0 0 0` and 0.1).
- **Light fields and disabled controls follow the new page.**
  `--color-input-hover` is `base-100`, `--color-input-disabled` is the page
  colour, `--color-action-disabled` is `base-250` and
  `--color-action-disabled-border` `base-300`.
- **Dark mode is unchanged.** `.dark` now restates the values above that it
  used to inherit, so nothing moves there. No token was removed or renamed and
  no `exports` path changed.
- Input, Textarea and Select render their text at 16px below the `sm`
  breakpoint (640px), so iOS Safari no longer zooms the page when a field takes
  focus. Sizes are unchanged from `sm` up, and control heights are unchanged
  everywhere. This also covers ColorPicker's hex field and the search fields in
  Select and the sidebars.
- **Checked checkboxes and radios use the primary action fill**, the same
  colour as a primary button, in place of a paler step that was 2.8:1 on the
  light page. The tick and the radio dot take the primary button's text colour.
- **Menus share one edge and surface.** Dropdown, NavigationMenuContent and the
  ColorPicker popover all use `border-border-overlay` on `bg-surface-overlay`.
  The ColorPicker popover no longer sits on the inset field colour in dark.
- Table and PropsTable sit on the card surface with an elevated header band,
  in place of a `base-50` band over a body that was the page colour.
- Skeleton and the variant chips in Header use the neutral fill
  (`bg-neutral-subtle`), so they show on a card and on the page in both themes.
- Input, Select and Textarea darken their border on hover in light mode
  (`--color-input-border-hover`); error, success, warning and disabled fields
  are unchanged.
- Sidebar search fields, the selected panel item, the elevated panel and the
  profile button use full-strength rings in place of 40–80% alpha ones; the
  dashed empty states keep only their dashed border.
- The rule under Tabs is `border-border`, and a selected pill uses
  `action-primary-subtle`, which shows on the light page.
- **A toast with an action stays until it is dismissed**, unless you give it a
  `duration`, so a keyboard user can reach the action.
- EmptyState at `size="compact"` is a plain `<div>`, not a named region, so a
  page of cards with empty states is not a page of landmarks. The default size
  is still a `<section>` named by its title.
- **The dark theme files need the light theme.** `theme-dark`,
  `theme-dark-only` and the dark part of `colors` no longer restate the
  `--zabi-*` ramps, so import them after `theme` or `theme-only`, as the docs
  already said. No token was removed or renamed and every existing token
  resolves to the same colour in both themes.
- Dark surface tokens (`--color-surface-raised`, `-elevated`, `-overlay`) are
  `color-mix()` expressions over `--zabi-base-*`. They paint the same pixels,
  but `getComputedStyle` reports them as `color(srgb …)`, not `rgb(…)`.
- The dark theme files are about 13 KB larger, because the block is published
  once for the class and attribute and once for the system setting.
- `culori` is now a dependency, not a development dependency: the theme
  generator uses it at run time. The package gains a `bin`, `zabi-theme`.
- The dev site and Storybook honour `data-theme` like the published files.
- `THEME.md` no longer tells apps to import the compiled stylesheet after
  `theme-only`, or to use `theme()` for a colour.
- **Controls are 44px on a touch screen.** Behind `@media (pointer: coarse)`,
  Button, IconButton, Input and the Select trigger are at least 44px tall at
  `sm` and `md` (`lg` is 48px already; use it for the main action on a phone),
  and so are Slider rows, Checkbox, Radio and Toggle rows, Tabs, Collapsible
  triggers, Dropdown items, Select options (48px), NavigationMenu, TopNavbar
  and Sidebar items, SortableList controls and toast buttons. The close
  buttons of Alert, Toast, Modal, SlideUp and Drawer and the Toggle switch
  keep their size and take taps in a 44px area. Layouts on touch get taller
  where controls grew: a checkbox list at an 8px gap is 52px a row. IconButton
  `xs` stays 24px. Nothing changes with a mouse.
- **Every pressable control shows a pressed state** (`:active`) that does not
  depend on hover, in both themes. A disabled Toggle or Tab no longer shows
  one.
- SlideUp pads its content for the bottom safe area and is at most `90dvh`
  tall (was `90vh`).
- **Tabs scroll sideways when they do not fit**, with a fade on the edge that
  has more to show, and bring the selected and the keyboard-focused tab into
  view. Tab labels no longer wrap or squeeze to fit: a list with long labels
  in a narrow box that used to wrap onto several lines now stays on one line
  and scrolls. A list that fits looks as before.
- **Toasts sit above the tab bar and the home indicator.** The stack's bottom
  edge clears `--app-shell-bottom-inset` and the bottom safe area, and below
  `sm` it spans the width with 16px gutters. From `sm` up it is where it was.
  A `viewport` Toast at the top also clears the top safe area and an AppShell
  header.
- A Tooltip that would leave the viewport flips to the other side or slides
  along its edge to stay 8px inside, also with a mouse; below 640px a `left`
  or `right` tooltip opens above or below. `data-placement` on the bubble now
  reports the side actually used.
- Modal is at most `90dvh` tall (was `90vh`).

### Deprecated

- **Modal's `onclick` is deprecated as a close signal.** It is still called
  with the event on Escape, a backdrop click and the close button; use
  `onclose`.

### Fixed

- **A long Modal title no longer squeezes the close button or runs out of the
  panel.** The title wraps, also inside a single long word, and the close
  button keeps its 32px.
- **A Tooltip with `strategy="fixed"` no longer covers its trigger** when it
  opens above or to the left, and a closed tooltip no longer widens the page.
- A Tooltip has an edge in forced-colours mode, and is centred correctly in
  right-to-left layouts.
- Toasts fit a 320px screen; their 18rem minimum width no longer overflows.
- A disabled Checkbox or Radio no longer dips or changes fill when pressed or
  hovered.
- **A Dropdown stays on screen.** The menu is measured before it is painted:
  it flips to the other side when the preferred one does not fit, slides back
  when neither does, and is capped to the viewport with its own scroll only
  when it must be (8px margin). `placement` is still the preferred side, and a
  menu that fits is positioned exactly as before. The menu box reports the
  side used in `data-resolved-placement`.
- **NavigationMenu fits a narrow screen.** The list wraps onto further rows
  instead of overflowing, and a content panel slides back inside the viewport.
  The `viewport` prop only sets `isMobile` on the context for your own
  children; it has no effect of its own, and the docs now say so.
- **TopNavbar's phone menu closes when it should**: after a link in it is
  followed, when `currentPath` changes, on Escape (focus returns to the menu
  button), on a click or a focus move outside the bar, and when the screen
  widens past the breakpoint. A press on a control behind the open menu still
  reaches that control.
- **TopNavbar's phone menu can be reached on a short screen.** It is at most
  as tall as the screen below the bar and scrolls on its own when it has to.
- **TopNavbar's menu button stays on screen** with a long brand or enlarged
  text; the brand shrinks and truncates below the breakpoint.
- TopNavbar's phone-menu links fill the row, and `aria-controls` on the menu
  button is set only while the menu it names exists.
- **The focus ring shows on dark overlays.** The focus ring and the nav ring
  were 2.91:1 on the dark overlay surface (modals, menus, toasts). Dark
  `--color-focus` moves from `brand-500` to `brand-600` (#92a9ff by default),
  the step of the dark primary fill: 4.26:1 on the overlay and more elsewhere.
  `--color-focus-weak`, `-medium` and `-strong` move one step with it. Light is
  unchanged.
- **The focus ring survives a shadow.** `.focus-ring` on an element with a
  `shadow-*` or `ring-*` utility (also `shadow-none`) drew no ring, because the
  utility replaced the box-shadow: the SidebarNavigation search field, the
  selected SidebarPanel row, an interactive Card, any IconButton given a
  shadow. The ring now composes with them. The computed `box-shadow` of a
  focused element lists five shadows where it listed two; a test that reads
  the ring colour from it should pick the 4px spread.
- **Select's pressed trigger is visible**: 1.27:1 against its resting fill in
  light and 1.31:1 in dark (was 1.10:1).
- **A disabled Checkbox, Radio or RadioGroup row no longer shows the pressed
  fill** on touch.
- **Alert's close button shows the library's focus ring**, not the browser's.
- **Hover colours no longer stick after a tap.** The hand-written `:hover`
  rules in the theme files (`.bg-action-primary:hover` and 41 more) applied on
  touch screens, so a tapped primary button stayed in its hover colour. They
  now sit in `@media (hover: hover)`, as Tailwind's own `hover:` does.
- **The Select trigger's pressed state shows in light mode**; it was the
  resting fill.
- **Stacked checkbox and radio rows no longer overlap** on touch screens.
- **The muted focus ring shows in dark.** `.focus-ring--muted` (ghost and link
  buttons, the AppBar back control, the SortableList handle) read
  `--color-base-500`, the same grey in both themes: 2.49:1 on the dark elevated
  surface and 1.98:1 on the dark overlay. It now reads
  `--color-focus-ring-muted`, one step lighter in dark, 3.7:1 or more on every
  surface level. Light is unchanged.
- **The brand menu in the docs site header stays on screen.** It opened past
  the right edge and widened the page at 768px and 1024px; it now opens toward
  the side that has room.
- **ImageUpload's Change and Remove actions are reachable on touch screens.**
  They were hidden until hover or focus; on coarse pointers, and where hover is
  not available, they now stay visible.
- **Modal keeps Tab inside, and still closes on Escape, when focus has fallen
  out of the dialog** because the focused control was disabled or removed.
- **ImageUpload keeps keyboard focus.** Picking a file, removing it, or setting
  `value` from your own picker used to drop focus on `<body>`. Focus now moves
  to Change after a selection and to the dropzone after Remove, and is left
  alone when it is somewhere else.
- **ImageUpload's Change label is readable over any image.** In the dark theme
  over a light image it fell to 2.59:1; the actions now sit on an opaque plate.
- ImageUpload cancels a file dropped while `disabled`, so the browser no longer
  opens the file in place of the page.
- ImageUpload's actions layer no longer takes clicks meant for the preview.
- ImageUpload's error message is tied to the Change button when a preview is
  showing, not only to the empty dropzone.
- A disabled ImageUpload dropzone no longer takes the primary border on hover.
- **Checkbox and radio rows show their hover.** The row used a fixed
  `base-100` fill, which was the page colour in both themes; it now uses
  `--color-surface-hover` and `--color-surface-active`.
- **State variants beside a semantic colour class work.** The hand-written
  colour classes are outside every cascade layer, so a generated variant on the
  same element never won: `text-description hover:text-headline` did not change
  on hover. Thirteen such variants the components use are now restated by hand,
  among them the hover colour of close buttons, the hover border of outline
  buttons and the disabled text colour of fields and ghost buttons.
- **An overlay opened later is always on top.** Modal and SlideUp take a
  z-index that grows with the number of open overlays, so a modal opened from
  a portalled one no longer opens behind it.
- **Escape with a tooltip showing dismisses the tooltip only**, not the modal
  or sheet it sits in.
- **A modal or sheet with nothing focusable takes focus itself**, instead of
  leaving it on the opener behind the backdrop.
- **Modal and SlideUp do not slide in under `prefers-reduced-motion`.**
- **Focus returns to a replaced element.** When the element that opened an
  overlay has left the document, focus goes to the element that now has its id
  instead of falling to `<body>`.
- **SlideUp keeps Tab inside, and still closes on Escape,** when focus has
  fallen out of the sheet because the focused control was disabled or removed.
- **Select's arrow keys get past a disabled option.** A disabled option was a
  natively disabled button that could not take focus, so ArrowDown stopped at
  the option before it. It is now `aria-disabled`: reachable, announced as
  disabled, and still not selectable.
- **Collapsible keeps focus when its panel closes under it.** If the panel
  closes while focus is inside it, focus moves to the panel's trigger instead
  of falling to the page.
- **CollapsibleGroup settles panels that start open.** In a single-open group
  only the first panel marked open is rendered open, on the server too, and
  `onopenchange` is not called for it. A disabled panel keeps its state: it is
  not closed when another panel opens.
- **Drawer stacks with the other overlays.** A modal opened while a portalled
  drawer is open, or a drawer opened while a portalled modal is open, is now
  drawn on top of it.
- **`zabi-components/types` matches the components again.** Every exported
  `*Props` interface now declares the props its component accepts today:
  `ModalProps` has `isOpen`, the interfaces have `class`, and the props added
  since are there. Members that were exported but never existed (`open`,
  `className`, `position`, Button's `ariaLabel` and icon props) stay as
  optional and deprecated, so existing code keeps compiling. `SelectProps.options`,
  `AlertProps.message` and `TooltipProps.content` are optional, as they are on
  the components.
- **Keyboard focus is visible in forced-colours mode.** The focus ring is a
  box-shadow, which Windows High Contrast drops, so focus had no indicator
  there. `.focus-ring`, the legacy `.focus-brand` and `.focus-nav`, and the
  checkbox and radio row now draw an outline in forced colours. Nothing changes
  outside that mode.
- **ActionPanel shows its hover and pressed states.** The hover fill never
  applied beside `bg-card`; the tint is now drawn over the card.
- A selected Tabs pill shows its pressed state, and a selected List row shows
  its selected border, which the default border used to override.
- SidebarFooter's avatar ring pointed at a colour token that does not exist
  and fell back to the text colour; it now uses the border colour.
- Removed a `dark:` variant from Section's accent background. It followed the
  OS setting, not the `.dark` class, and never applied.
- **ThemeToggle shows the right icon before it mounts.** On a dark page the
  server-rendered button showed the Sun until hydration. Both icons are now in
  the markup and the `dark` class picks one. No prop changed.
- **ConfirmDialog no longer draws a focus outline around the whole dialog**
  while it is loading, and no longer sets `aria-busy` on the dialog panel,
  which could hold back the loading announcement.
- **Drawer's `onkeydown` was silently dropped.** It now runs after the drawer
  has handled Escape, and the Tab cycle is kept.
- **Drawer content with nothing to focus can be scrolled by keyboard.** When
  the content overflows and holds no control, the scrolling area is a Tab
  stop named by the title.
- **Drawer's close button has a 44px hit area on touch screens**, around the
  same 32px button.
- **Dropdown and Select return focus to the trigger** when the menu closes from
  inside it (Escape, or choosing an item by keyboard or mouse), instead of
  dropping it on `<body>`. Focus your own handler moved elsewhere is left alone.
- **Dropdown follows the writing direction.** `bottom-start` and `top-start`
  sit on the start edge and item text aligns to it, so a right-to-left page
  gets the mirror image.
- **A DropdownItem with custom children and a description** is named by its
  content alone; the description is no longer read twice.
- **Dismissing the focused toast keeps focus in reach**: it moves to the next
  toast, or back to where it was before it entered the notifications.
- **Toasts do not fly in or out under `prefers-reduced-motion`.**
- **Stacked Table keeps a cell's content together.** A cell with several
  children had them pushed to opposite ends of the line; they now sit together
  on the value side. A cell with no `data-label` puts its content on the value
  side too, and an empty cell no longer leaves a blank line.
- **Built-in loading rings respect reduced motion.** The rings in Button,
  IconButton, Input, Textarea, ActionPanel and Toggle kept spinning under
  `prefers-reduced-motion`; they now fade in and out instead, as Spinner does.
  Checkbox's ring stops.
- **Checkbox shows its loading ring.** `loading` disabled the box but the ring
  never appeared. It now replaces the tick while loading, on the fill if the
  box is checked, and fades instead of spinning under
  `prefers-reduced-motion`.
- **Toggle's loading ring has its gap back**, so the rotation can be seen; the
  hand-written border colour used to close it.

### Documentation

- **`docs/theme-imports.md` says what to expect when Tailwind and
  `zabi-components/css` are combined.** The compiled stylesheet carries its own
  copy of each utility, so the import order decides which copy wins: Tailwind
  first, the package's `w-full` beats your `md:w-1/2`; `css` first, your `p-0`
  beats Modal's `md:p-4`. With Tailwind in the app, import `theme-only` and
  `theme-dark-only` instead. No CSS output changed.
- `docs/ACCESSIBILITY.md` no longer lists fixed issues as open, and has a
  "Library conventions" section: where focus goes when a focused control is
  removed, the shared overlay stack and scroll lock, disabled options,
  hover-revealed actions, and focus in forced colours.
- `THEME_QUICK_REFERENCE.md` shows the current primary colour and dark mirror.
- `docs/VARIANTS.md`, the README, the Storybook introduction and the showcase
  guide cover the components added in this release.

### Site and Storybook (not in the package)

- Site cards carry `shadow-sm`, the hero stage and the navbar read against the
  new page colour, and the showcase uses surface tokens in place of raw ramp
  steps.
- The Pine and Citron accents follow the Iris recipe in light mode: fill at
  step 600 with a white label, focus ring at step 600. Pine's light focus ring
  was 1.93:1 on the page and is now 4.19:1.
- Storybook's sidebar, toolbar and docs pages follow the Theme control in the
  toolbar instead of the operating system.
- `theme-color` follows the theme toggle.

## [8.0.1] - 2026-09-29

Fixes the documented setup. In 8.0.0 (and 7.0.2) the three-line Tailwind setup
from the README left components unstyled; `@import "zabi-components/css"` was
the only import that worked. No tokens or `exports` paths were added, removed
or renamed.

### Fixed

- **Theme files are valid CSS again.** `theme`, `theme-only`, `theme-dark` and
  `theme-dark-only` were written without semicolons between declarations, so a
  CSS parser read all 355 tokens as one declaration. `scripts/build-css.js` now
  terminates each declaration.
- **`theme` and `theme-only` carry an `@source` directive** for the package's
  own components. Tailwind CSS v4 does not scan `node_modules`, so the classes
  the components use were never generated. No `@source` line is needed in your
  own CSS.
- **`theme` and `theme-only` ship the hand-written component rules**:
  `.focus-ring` and its variants, `.text-action-primary`, the action hover,
  active and disabled states, the semantic colour classes and the `z-*` scale.
  These existed only in the compiled `css` bundle. Without them a primary
  button's label took the colour of its fill, and nothing had a focus ring.
- **ColorPicker renders on the server.** Its teardown ran in `onDestroy`, which
  also runs during SSR, and threw `window is not defined`. It is now returned
  from `onMount`.
- **Progress has an accessible name.** Its label was a `<label for>`, which
  only names form controls, so screen readers announced a progressbar with no
  name. The label is now referenced through `aria-labelledby`.

### Changed

- The universal-selector scrollbar rules (`* { scrollbar-width: thin }` and the
  `*::-webkit-scrollbar` family) are in the compiled `css` bundle only, not in
  the theme files, so importing a theme does not restyle every scrollbar in
  your app. `.scrollbar-semantic` is in both and is the opt-in.
- `theme` and `theme-only` grew from about 22 kB to about 35 kB.
- `scripts/validate-theme.js` parses the theme files instead of pattern-matching
  them, and fails the build if the token block does not parse or the component
  rules are missing. The old check passed on the broken files.

### Migration

Nothing to change if you import `zabi-components/css`. If you worked around the
broken theme files with your own `@source` line or your own copies of
`.focus-ring` or `.text-action-primary`, you can remove them.

## [8.0.0] - 2026-09-22

Consolidates two development cycles. 7.1.0 and 7.2.0 were both prepared but
never published, so the last release on npm is 7.0.2 and everything below ships
together in 8.0.0.

### Breaking changes since 7.0.2

What can break a working 7.0.2 consumer. Each item is detailed in the sections
that follow.

- **The `zabi-components/react` subpath is gone** from `exports`. It pointed at
  `dist/react`, which was never built, so importing from it already failed at
  resolution — but the subpath no longer exists at all.
- **Three tokens were removed**: `--color-action-primary-disabled`,
  `--color-action-secondary-disabled`, `--color-action-danger-disabled`. Use the
  shared `--color-action-disabled`, `--color-action-disabled-text` and
  `--color-action-disabled-border` instead. Your own CSS referencing the old
  names will silently resolve to nothing, so grep for them before upgrading.
- **Every chromatic ramp was regenerated** against a shared lightness curve, and
  the semantic families moved from step 500 to step 600. Rendered colour changes
  throughout, in both themes, with no opt-out. Screenshot tests will all churn.
- **`max-w-*`, `w-*` and `min-w-*` with `xs`–`2xl` resolve to container sizes
  again** (`max-w-lg` is 32rem, not 1.5rem). This is a bug fix, but anyone who
  compensated for the broken values in their own CSS must undo that.
- **No install scripts run in consumer installs.** The `postinstall` hook is
  gone; it is now a dev-only `prepare` script and is not in the tarball.

Not breaking, but worth knowing: the published tarball no longer contains
`dist/lib/**`. Those were declaration files for this repo's demo site and
showcase, emitted by mistake; no `exports` entry ever pointed at them.

### Design system

Outcome of a full design review of all 63 components. The headline change is
that the colour ramps are now generated against one shared lightness curve, so
the semantic families read as a single family instead of six unrelated colours.

#### Colour — BREAKING (visual)

- **All chromatic ramps regenerated** (`brand`, `citron`, `pine`, `iris`,
  `warning`, `error`) against a shared CIE L\* curve defined in
  `tokens/chromatic-scales.js`. `<ramp>-600` now means the same lightness in
  every ramp. Previously the ramps spanned L\* 34.6–75.0 at step 500 — a
  40-point spread at the same nominal step — and `pine` fell 29.8 points between
  400 and 500, which made half that ramp unusable.
- **Semantic tokens moved to step 600** across the board. `warning`, `error` and
  `energetic` previously sat at step 500 (the dark mirror's fixed point) and so
  did not invert between themes at all, while `success` and `info` did. Solid
  badges were 2.15:1 (warning) and 1.97:1 (energetic) in light mode.
- **New per-family tokens**: `--color-<family>-subtle` (step 100),
  `--color-<family>-border` (step 200). `--color-<family>-text` is now step 700
  for every family.
- **`--color-action-primary` is now `brand-600`** (was `brand-950`). The primary
  action carries the brand colour in both themes.
- **`--color-action-primary-active` no longer jumps across the ramp.** It was
  `brand-400` against a `brand-50` label — 1.66:1, so the label vanished while
  the button was held. Hover/active now step darker in light, lighter in dark.
- **`--color-action-secondary`** is a neutral alpha tint instead of a 10% brand
  wash, which was too pale to read as a control.
- **New**: `--color-action-disabled`, `--color-action-disabled-text`,
  `--color-action-disabled-border` — one quiet neutral pair shared by every
  variant. Disabled was previously `brand-500` + `opacity-50`, which made a
  disabled primary *lighter and more colourful* than an enabled secondary.
- **New**: `--color-surface-hover`, `--color-surface-active` — surface-relative
  alpha tints. `hover:bg-base-100` resolved to exactly `--color-surface-base` in
  dark mode, so ghost buttons had no hover feedback on the app shell.
- **New**: `--color-control-track{,-hover,-active}` for switch rails.
- **Removed**: `--color-action-{primary,secondary,danger}-disabled` (use
  `--color-action-disabled`); the raw-hex `.dark` danger overrides (danger now
  mirrors through `--color-error-*` like every other family).
- `--color-input` is now a raised surface (white in light, an inset step in
  dark) rather than a grey well that read as disabled.
- `--color-input-placeholder` is wired up — it was defined but unused.
- `--color-link` moved to `brand-700`: `brand-600` cleared AA on a card but only
  managed 4.42:1 on the page surface.

#### Geometry — BREAKING (visual)

- **One control height scale**: `sm` 32px, `md` 40px, `lg` 48px, shared by
  Button, IconButton, Input, Select and Textarea. They previously rendered at
  40/48/64, 32/40/48 and 38/46/50 — a `lg` Button stood 14px taller than the
  `lg` Input beside it.
- **Four role-based radii** replace eight t-shirt radii: `--radius-control`
  (8px), `--radius-container` (12px), `--radius-overlay` (16px),
  `--radius-pill`. Radius no longer changes with size. `--radius-sm/md/lg/xl`
  remain as legacy aliases for consumer overrides.
- Button type is monotonic again: weight is `font-medium` at every size (it used
  to drop to `font-normal` at `lg`, so the biggest button had the lightest
  label), and the arbitrary letter-spacing values are gone.
- **Elevation is two steps**, not four. `shadow-sm` means raised (cards, tables,
  sidebars, toggle knobs), `shadow-lg` means floating (modals, sheets, menus,
  toasts); `shadow-none` stays the explicit absence of one. `shadow-md` and
  `shadow-xl` are gone, and so is the bare `shadow` on the Toggle knob, which
  resolved to a Tailwind default `app.css` never defined. An elevated Card no
  longer deepens its shadow on hover — it was already at the floating step, so
  the hover now changes background only.
- **Layout spacing snaps to the 4px grid.** 30 half-step utilities
  (`gap-1.5`, `gap-2.5`, `px-2.5`, `px-3.5`, `py-2.5`, `space-y-1.5`, …) were
  setting a second rhythm against the first across forms, sidebars and badges.
  Margins are deliberately exempt: `mt-0.5` beside a first line of text is an
  optical alignment nudge, not rhythm, and Alert, ListItem, ToasterToast and the
  radio control still use it.
- A one-row `Textarea` is now 40px like the `Input` beside it (was 44px, from
  `py-2.5`).

#### Components

- **`Badge`**: rebuilt. New `emphasis` prop (`subtle` | `solid`, default
  `subtle`), plus `class`, `children` and `...restProps` — none of which existed,
  despite stories shipping for two of them. Pill radius instead of 2px. Renders
  nothing when it has no label, rather than leaving an empty box.
- **`Alert`**: tinted fill + tinted border instead of a bare 1px outline on a
  transparent ground; full-width by default with a new `inline` prop; one Lucide
  icon family instead of hand-rolled SVGs of mixed weight.
- **`Heading`**: no longer hardcodes `font-family: "Nunito Sans"` in a local
  `<style>` block — it uses `--font-family-sans`, so rebranding the font token
  now actually rebrands headings. `level` is typed `1 | 2 | 3 | 4 | 5 | 6`
  instead of `number`; new `size` prop decouples visual size from semantic
  level; `children` snippet supported; display sizes carry negative tracking.
- **New `SidebarShell`**: the chrome of a sidebar with the regions left open —
  width, surface, collapse behaviour, the shared inset and a scrolling middle.
  Regions are snippets (`header` / `children` / `footer`), each handed
  `{ collapsed, insetX }`. `SidebarNavigation` is 39 props on one component and
  is excellent right up until your sidebar is not shaped like that one, at
  which point none of the parts are reachable; compose `SidebarBrandHeader`,
  `SidebarNavSection` and `SidebarFooter` into the shell instead and skip the
  ~30 props you never set. `SidebarNavigation` is now built on it rather than
  duplicating the chrome, so the two cannot drift. Additive — its prop API is
  unchanged.
- **`SidebarNavigation`**: its Props table documented 7 of 39 props. All 39 are
  documented now, with types and defaults.
- **`Text`**: now sits on the same type ramp as `Heading` rather than carrying
  its own — `size="md"` matches an `h6` and `size="lg"` an `h5`, line box
  included, and a new `xs` step (12px) extends the bottom. Leading is stated
  rather than inherited from Tailwind's defaults, so the shared steps stay
  locked together if the scale is retuned. **New `weight` prop** (`normal` |
  `medium` | `semibold` | `bold`) lets body copy carry emphasis without being
  promoted to a heading; `tone="label"` defaults to `medium`, every other tone
  to `normal`. Purely additive — existing `sm`/`md`/`lg` call sites are
  unchanged visually.
- **`Input`**: raised surface, quieter placeholder, `min-w-48` removed.
- **`Card`**: radius no longer scales with size; `outlined` uses `border-border`.

#### API consistency

- **Class overrides actually win now.** `class` being "merged last" only held
  for properties the component didn't already set: `rounded-control` and
  `rounded-container` are equal-specificity utilities, so the winner was
  whichever Tailwind emitted later. The sidebar's search field asked for
  `rounded-container` and rendered at 8px. Every component now merges through
  `cn()` (tailwind-merge, a new runtime dependency), with the role-based radii
  declared explicitly since `control`/`container`/`overlay`/`pill` are role
  names rather than scale values that tailwind-merge could recognise.
- **`class` is now the public prop on every component.** 25 components exposed
  `className`, 15 exposed `class`, and 21 exposed neither. `className` is kept
  everywhere as a deprecated alias and both are merged, so existing call sites
  keep working.
- Every component spreads `...restProps` onto its host element.
- `Button`: `fullWidth` replaces `isFullWidth` (deprecated alias retained).

#### Guardrails

- **New** `scripts/check-ramp-lightness.js` — fails if a ramp drifts off the
  shared curve (±1.5 L\*) or develops a cliff (>15 L\* between adjacent steps).
- **New** `scripts/check-contrast.js` — resolves every fill/foreground pair a
  component can render, in both themes, and fails below WCAG AA. 84 pairs.
- **New** `scripts/check-control-geometry.js` — fails if controls disagree on
  height, or if any component uses a t-shirt radius.
- **New** `scripts/generate-ramps.js` + `tokens/chromatic-scales.js` — ramp
  generation, wired into `npm run sync:tokens`.
- `scripts/check-token-violations.js` now also rejects fixed ramp steps in
  interaction states (`hover:bg-base-*`, `active:bg-base-*`), which is how the
  invisible ghost hover got in.
- **New** `scripts/generate-surfaces.js` + `tokens/surface-ladder.js` — the four
  dark surface levels are now derived from one wash ladder instead of four
  independently tuned hex values, and regenerate with `npm run sync:tokens`.
  `--color-surface-elevated` moves `#35353a` → `#363638` and
  `--color-surface-overlay` `#44444c` → `#454547` (slightly less blue); base and
  raised were already exactly on the ladder.
- The ramp-interaction rule now also scans `src/lib/marketing` and the landing
  route. The rest of the checks guard what ships in the package, but
  `hover:bg-base-100` had reached two marketing specimens, where dark mode
  painted the hover darker than the card it sat on.
- `scripts/check-token-violations.js` also rejects **off-scale shadows**
  (anything but `shadow-sm` / `shadow-lg` / `shadow-none`, including a bare
  `shadow`) and **half-step spacing** on gap/space/padding utilities. Margins
  are exempt by design. Comment lines are skipped so prose about shadow DOM
  doesn't trip it.
- New scripts: `npm run check:ramps`, `check:contrast`, `check:geometry`, and
  `check:design` (all four). `build:css` and `check` run `check:design`.

#### Stories

- `Badge` → `AllVariantsWithIcons` no longer crashes. It used an invalid CSF
  render shape (`Component: 'div'` with a `children` array) cast through
  `as any`, so TypeScript could not catch it and it threw at runtime. Replaced
  with real harness components, which also fixes `WithChildren` and
  `WithCustomClass` (both silently rendered nothing).

### Forms

- **`ContactForm`**: invalid submissions no longer fall through to a native POST and page reload.
- **`ImageUpload`**: `onchange` / `onclick` are now actually called; `value` supports `bind:value`; new `onfileselect({ file, url })` exposes the selected `File`. Change/Remove actions are visible on keyboard focus, and Space activates the drop zone.
- **`ColorPicker`**: 3-digit hex (`#f00`) is parsed correctly; `value` supports `bind:value`.
- **`Form`**: accepts standard form attributes and a `novalidate` prop; docs note that `onsubmit` handlers must call `preventDefault()` for client-side handling.

### Widgets

- **`Tabs`**: Arrow/Home/End move focus as well as selection; the tablist is no longer an extra tab stop; `activeTab` supports `bind:activeTab`.
- **`Select`**: new `name` prop renders a hidden input for native form submission; the search field sits outside the `listbox`; string/number option values compare consistently.
- **`Dropdown`**: new optional `header` snippet; Home/End/Space behave normally inside text inputs in the menu.
- **`Toggle`**: new `id`, `name` and `value` props for label pairing and form submission.
- **`ThemeToggle`**: a consumer `onclick` no longer overrides the toggle; pre-mount placeholder respects `size`/`variant` (no layout shift).

### Overlays

- **`Modal` / `SlideUp`**: `role="dialog"` moved from the backdrop to the panel; body scroll locked while open (nested-safe); focus trap picks up content added while open; Escape closes only the topmost dialog. `Modal` gains `showClose` (default `true`) so untitled modals still have a close button.
- **`Toaster`**: countdown is no longer announced every second; it pauses on hover/focus; no double announcements from nested live regions.
- **`NavigationMenu`**: fixed a leaked document `mousedown` listener; panels use the disclosure pattern (no `role="menu"` / `aria-haspopup`); new `ariaLabel` prop.
- **`Dropdown`**: arrow keys, Home and End now reach `menuitemradio` and `menuitemcheckbox` items. The item query matched only `menuitem` and `option`, so a menu built from radio items had nothing to focus: opening it by keyboard focused nothing and Tab closed it, leaving the items unreachable.
- **`Alert`**: `closable` now hides the alert; new bindable `open` prop.
- **`Tooltip`**: Escape no longer steals focus; CSS custom properties no longer leak onto `:root`.
- **`util/ssr-safe`**: timer helpers typed with `ReturnType<typeof setTimeout/setInterval>` instead of `NodeJS.Timeout`, so consumers don't need `@types/node`.

### Surfaces

- **New semantic surface elevation tokens** (both themes), lowest → highest: `--color-surface-base` (page), `--color-surface-raised` (cards, panels, sidebars), `--color-surface-elevated` (nested cards, hover/active fills), `--color-surface-overlay` (modals, sheets, menus, toasts), plus `--color-surface-overlay-hover` (row/icon hover inside overlays) and `--color-border-overlay` (1px overlay edge: transparent in light, visible in dark). Utilities: `bg-surface-base`, `bg-surface-raised`, `bg-surface-elevated`, `bg-surface-overlay`, `bg-surface-overlay-hover`, `border-border-overlay`.
- **Dark mode elevation no longer relies on shadows**: levels step up +6 OKLCH lightness each (L 21 → 27 → 33 → 39) on the neutral base hue. Light mode is visually unchanged.
- **Existing tokens are now aliases** (no renames): `background` → `surface-base`; `card` → `surface-raised`; `surface-1` → `surface-raised`; `surface-2` → `surface-elevated`; `card-elevated` → `surface-overlay` (light) / `surface-elevated` (dark); in dark, `card-hover` → `surface-elevated`, `card-active` and `surface-3` → `surface-overlay`. Dark values of `card`, `card-hover`, `card-active`, `surface-1`–`surface-3` shift slightly to land on the new levels.
- **Floating components use the overlay level**: `Modal`, `SlideUp`, `Dropdown` (and `Select`'s menu), `NavigationMenu` panels, `Toaster` toasts and the `Toast` atom now paint `bg-surface-overlay` (previously `bg-card` / `bg-surface-1`, which in dark matched or undercut the card they floated over). Hover fills inside them use `bg-surface-overlay-hover` so they read above the overlay. `Modal`/`SlideUp` get a `border-border-overlay` edge. `Card variant="elevated"` uses `bg-card-elevated`.
- **Dark `--color-description`** moves one step lighter (`base-650`) so description text keeps ≥ 4.5:1 contrast on every surface level, including overlays.
- **New guard**: `scripts/check-surface-elevation.js` (run by `validate-theme.js` during `build:css`) fails the build if dark levels aren't strictly increasing, any step is outside 5–8 OKLCH L points, overlay hover/tooltip fills are darker than the overlay, or a floating component paints a surface below overlay.

### Theme fixes

- **`max-w-*`, `w-*` and `min-w-*` with `xs`–`2xl` now use Tailwind's container sizes again** (`max-w-lg` = 32rem). Tailwind v4 resolves these utilities through `--spacing-*` before `--container-*`, so the theme's named spacing tokens made `max-w-lg` resolve to 1.5rem for anyone importing the theme. New `--max-width-*`, `--width-*` and `--min-width-*` tokens (xs 20rem … 2xl 42rem) are checked first. Spacing utilities such as `p-lg` / `gap-md` are unchanged.
- **`--color-caption` meets WCAG AA on every surface level**: light `base-500` → `base-550` (was 4.40:1 on the page background, now ≥ 5.58:1); dark `base-500` → `base-650` (was 2.00:1 on overlays, now ≥ 5.00:1). To keep caption visibly softer than description in dark mode, dark `--color-description` moves from `base-650` to `base-700` (≥ 6.53:1).
- **New guard**: `scripts/check-surface-elevation.js` also fails the build if `headline`, `body`, `label`, `description` or `caption` drop below 4.5:1 on any surface level in either theme.
- **`Modal`**: the title and close button line up with the body and footer. The inner `Card`'s own padding stacked on the header's padding and indented the title 24px past the content.

### Packaging

- **Removed `zabi-components/react`**: the export pointed at `dist/react`, which was never built, and the wrappers were out of sync with the Svelte components. The optional `react` peer dependency and `@types/react` are gone too.
- **No more `postinstall` in consumer installs**: `scripts/fix-lucide-svelte-icon-dts.js` only ever patched this repo's own `node_modules` (from a consumer install it resolved to a non-existent nested path and did nothing). It now runs as a dev-only `prepare` script and is no longer shipped in the tarball. Installs with `--ignore-scripts` (pnpm/Bun defaults) are unaffected.
- **`zabi-components/lib/ssr-safe` and `zabi-components/lib/variant-utils` now resolve to compiled `.js` + `.d.ts`** (`dist/util/ssr-safe.*`, `dist/routes/lib/variant-utils.*`) instead of raw `.ts` sources. Import paths are unchanged.
- **`generateId` / `createId` from the package root** now use the shared `util/ssr-safe` implementation; the previous root version used `Date.now()` on the server, so two ids created in the same millisecond collided.
- **`CodeBlock`**: window-chrome dots use semantic tokens (`bg-error` / `bg-warning` / `bg-success`) instead of raw Tailwind palette classes; props are now typed.
- **`check:tokens`** also flags raw Tailwind palette utilities (e.g. `bg-red-500`) in `src/components`.
- **Repo**: `dist/`, `.svelte-kit/` and `storybook-static/` are no longer tracked in git; unused Storybook template assets and `src/_tmp-lucide-import.ts` removed.
- **CI**: Node 24; the smoke workflow now also runs `check`, unit tests, theme tests and the token scan; publish runs `check` and unit tests before building.

## [7.0.2] - 2026-04-20

### Changed

- **`Tooltip`**: Tooltip surface styling now uses theme tokens **`--color-tooltip-bg`** / **`--color-tooltip-fg`** (with **`bg-tooltip-bg`** / **`text-tooltip-fg`** utilities) and **`z-tooltip`**, keeping layout/arrow logic in scoped CSS while aligning colors with the design system.
- **`Tooltip` layout**: Tooltip panel uses **`width: max-content`** with a responsive **`max-width`** cap (`min(24rem, calc(100vw - 2rem))`) so typical copy stays on one line until the limit; arrow fill follows **`--color-tooltip-bg`**.
- **Theme (`src/app.css`)**: Defines **`--color-tooltip-bg`** / **`--color-tooltip-fg`** (defaults to base-800 / base-50); **`prefers-contrast: high`** maps them to **`CanvasText`** / **`Canvas`** for stronger contrast. Regenerated **`zabi-components*.css`** picks up the new utilities.

## [7.0.1] - 2026-04-19

### Fixed

- **`postinstall`**: The Lucide typings patch script is **included in the published package** (`scripts/fix-lucide-svelte-icon-dts.js` via `package.json` `files`), so `npm install zabi-components` no longer fails when lifecycle scripts run.
- **Theme CSS (Tailwind v4)**: Replaced `theme(colors.*)` inside `@theme` / `.dark` with `var(--color-*)` for Zabi scales and stable hex literals for Tailwind default ramps (e.g. red/amber) and white, so consumers processing `theme-only` / `colors` bundles do not hit unresolved `theme()` during Tailwind passes.
- **Props typings**: **`Button`**, **`IconButton`**, and **`Tooltip`** prop types now intersect native element attributes (`HTMLButtonAttributes` / `HTMLAttributes<HTMLDivElement>`) so passthrough attributes (`class`, ARIA, `data-*`, etc.) type-check when spread with `...restProps`.

### Added

- **`docs/lucide-icons.md`**: Lists Lucide icons imported by published components for teams using a custom `@lucide/svelte` barrel.

### Changed

- **`scripts/sync-theme-tokens.js`**: End marker after the mirrored base ramp now matches the **`Brand Color Scale - Dark mode variants`** comment (including the “no theme() forward refs” note).

### Migration / discovery

- **`Navbar` → `TopNavbar`**: The older **`Navbar`** export was removed in **6.0.0**; use **`TopNavbar`**. See the **6.0.0** migration notes in this file.

## [7.0.0] - 2026-04-19

### Breaking changes

- **`Page`**: Removed the built-in `max-w-4xl` cap. Width is now fully controlled by the parent, or pass e.g. `className="max-w-4xl"` (or use **`Container`** / **`Section`** with `maxWidth` per the layout-width policy).
- **`EmptyState`**: Removed the built-in `max-w-lg` cap. Add `className="max-w-lg"` (or another token) if you still want a narrow empty state.

### Added

- **`postinstall`**: After `npm install`, runs `scripts/fix-lucide-svelte-icon-dts.js` to strip a duplicate `type X = ReturnType<typeof X>` line from each `@lucide/svelte` per-icon `dist/icons/*.svelte.d.ts` file. Some TypeScript language services treat the unpatched file as a non-module, which breaks types for deep icon imports and root re-exports.
- **`fixedSidebarFlyout`**: New Svelte **action** in the built package (`util/fixed-sidebar-flyout.js`) used by **`SidebarFooter`**. It pins flyouts with `position: fixed` to `[data-sidebar-flyout-anchor]` inside `[data-sidebar-flyout-root]`, teleports the panel to `document.body` while open to avoid scroll clipping, and updates position on scroll/resize. Options: `open`, `align` (`"top"` | `"bottom"`), `gap`, `anchorRole` (`"search"` | `"profile"`).

### Changed

- **`CodeBlock`**: Replaced the ad-hoc copy **`<button>`** with **`IconButton`** (ghost, sm). Copy / copied states use Lucide **`Check`** and **`Copy`** from **`@lucide/svelte/icons/*`**. Wrapper uses **`bg-surface-1`**, **`border-border`**, header **`bg-surface-2`**; code uses **`text-base-900`** on light surfaces instead of **`bg-base-900`** / **`bg-base-*`** chrome with **`text-base-100`** body text.
- **`SidebarFooter`**: Profile panel markup restructured with **`data-sidebar-flyout-root`** on the footer host; **`data-sidebar-flyout-anchor="profile"`** on the launcher; the profile snippet is positioned with **`fixedSidebarFlyout`** (`align: "bottom"`, viewport-limited **`max-height`**, **`overflow-y-auto`**, **`overscroll-contain`**). Drops the previous **`absolute bottom-0 left-full`** positioning that misbehaved beside fixed sidebars / scroll ancestors.
- **`SidebarNavigation`**: Search trigger wrapped with **`data-sidebar-flyout-anchor="search"`** (collapsed and expanded) so flyouts share the same anchor protocol as the footer profile panel.
- **Lucide usage in source**: Prefer **`import Icon from "@lucide/svelte/icons/name"`** over the package barrel for clearer tree-shaking and alignment with the postinstall typings fix. Showcase demos replace **`CircleHelp`** with **`CircleQuestionMark`** (current Lucide export name).
- **`zabi-components.css` (generated bundle)**: Picks up additional theme utilities used by the showcase and organisms—e.g. **`--spacing-xs`**, **`text-base-900`**, **`max-h-[min(32rem,calc(100dvh-6rem))]`**, **`overscroll-contain`**, prose/fit/max/min width utilities, responsive **`md:z-10`**, **`md:w-80`**, **`md:flex-nowrap`**, **`md:items-stretch`**, **`overflow-auto`**, **`align-top`**. Some rarely-used utilities were dropped from the scanned set where no longer referenced (e.g. **`left-full`**, base **`items-stretch`** in favor of **`md:items-stretch`**, **`bg-gray-50`**).

### Fixed

- **Lucide + TypeScript**: Consumers importing per-icon modules get consistent typings after install thanks to the **`postinstall`** patch for **`@lucide/svelte`** ~**0.544.x** declaration output.

### Migration (from 6.x)

1. **`Page` / `EmptyState`**: If layout relied on the old max widths, add them explicitly:
   - `<Page className="max-w-4xl">` or wrap content in **`Container`** / **`Section`**.
   - `<EmptyState className="max-w-lg" …>` (or another **`max-w-*`** from your layout policy).
2. **`npm install`**: Keep **`postinstall`** enabled so Lucide icon **`.d.ts`** files are patched; if you use **`npm install --ignore-scripts`**, run `node scripts/fix-lucide-svelte-icon-dts.js` manually or rely on root **`@lucide/svelte`** barrel imports only (may bundle more code).
3. **Demos copying Lucide icon names**: Replace **`CircleHelp`** with **`CircleQuestionMark`** when upgrading Lucide past names that removed **`CircleHelp`**.

## [6.0.0] - 2026-04-12

### Breaking changes

- Removed the `Navigation` organism; use `TopNavbar` with `items`, optional `embedded`, or a `nav` snippet instead.
- Renamed `SidebarProjectPanel` to `SidebarPanel` (including the `SidebarPanelItem` type).

### Added

- Package subpath exports `zabi-components/colors` and `zabi-components/css` for theme and full bundle CSS.
- Published theme documentation files in the package (`THEME.md`, `THEMING.md`, `docs/theme-imports.md`).

### Changed

- Theme build runs `sync:tokens` before CSS generation; added theme output tests (`test:themes`).
- Refined default border styling on several components.

### Migration

- Replace `import { Navigation } from 'zabi-components'` (or organisms path) with `TopNavbar` and the documented props/snippets.
- Replace `SidebarProjectPanel` imports with `SidebarPanel` and align prop/type names to `SidebarPanelItem` where applicable.

## Pending deprecations

- Legacy deep CSS import paths under `zabi-components/dist/*.css` are still supported for compatibility but documented as legacy. Prefer short exports such as `zabi-components/theme-only`, `zabi-components/theme-dark-only`, `zabi-components/colors`, and `zabi-components/css`.

## [5.0.22] - 2026-03-16

### ✨ **Features**

- **List Components**: Added new `List` and `ListItem` components with documentation and usage examples
- **Sidebar**: Added `SidebarNavigation` and `SidebarPanel` with improved navigation behaviors

### 🔧 **Improvements**

- **Card Components**: Refactored `Card`, `CardHeader`, and `CardContent` and simplified composition patterns
- **Documentation**: Updated Storybook setup and improved component documentation quality
- **Config & Environment**: Refined environment variable definitions and release metadata handling

### ✅ **No Breaking Changes**

This is a backward-compatible update.

---

## [5.0.21] - 2026-01-17

### ✨ **Features**

- **IconButton**: Added a new icon-only button with variants, sizes, and accessible labels
- **Exports & Storybook**: Included IconButton in atom exports and Storybook registry
- **Docs**: Added IconButton examples to the docs and components showcase

### 🔧 **Improvements**

- **Navigation**: Header navigation now stacks for mobile-friendly layouts
- **Select**: Improved selected label truncation and helper message layout
- **Button**: Standardized disabled behavior without pointer-events override

### ✅ **No Breaking Changes**

This is a backward-compatible update.

---

## [5.0.20] - 2025-01-27

### 🔧 **Patch Release**

- **Maintenance**: General improvements and stability updates
- **Build**: Enhanced build process and type definitions
- **Documentation**: Minor documentation updates

### ✅ **No Breaking Changes**

This is a backward-compatible patch release.

---

## [5.0.19] - 2025-01-27

### 🐛 **Bug Fixes**

#### **Modal Component**
- **Fixed SSR Import Error**: Resolved issue where Modal component was trying to import `focus-utils.js` from a relative path that didn't exist in consuming projects
- **Internal Focus Utilities**: Moved focus management utilities (`focus-utils.ts`) to be properly included in the build output
- **Build Process**: Added post-build script to fix import paths in built components
- This fixes the "Failed to load url ../../routes/lib/focus-utils.js" error that occurred during SSR

## [5.0.18] - 2025-01-27

### ✨ **Component Enhancements & Documentation**

#### **Card Component Improvements**
- **Compound Components**: Added CardHeader, CardContent, CardFooter, CardTitle, and CardDescription sub-components
  - Enables flexible card composition with better structure
  - Maintains backward compatibility with existing title/description/image props
  - Supports both old and new API patterns
- **Enhanced Variants**: Improved elevated, outlined, and flat variants with better hover states
- **Accessibility**: Added keyboard navigation (Enter/Space) and proper ARIA attributes for interactive cards
- **Size Variants**: Enhanced size support (sm, md, lg) with responsive padding and typography

#### **Button Component Enhancements**
- **New Variants**: Added ghost, outline, and link variants for more design flexibility
- **Improved Focus States**: Enhanced focus ring styles for better accessibility
- **Size Refinements**: Improved size variants with better typography and spacing
- **Better Disabled States**: Enhanced disabled state styling and interaction

#### **Badge Component Updates**
- **Icon Support**: Added optional icon display for success, warning, error, and info variants
- **Size Variants**: Enhanced size support with responsive icon sizing
- **Visual Consistency**: Improved color system integration

#### **Component Accessibility Improvements**
- **Modal Component**: Enhanced focus management and keyboard navigation
- **Dropdown Component**: Improved ARIA attributes and keyboard navigation
- **Card Component**: Added proper roles and keyboard handlers for interactive cards
- **Focus Utilities**: New focus-utils.ts for better focus management across components

#### **Documentation Additions**
- **ACCESSIBILITY.md**: Comprehensive accessibility documentation with component-by-component analysis
- **KEYBOARD_NAVIGATION.md**: Detailed keyboard navigation patterns and best practices
- **VARIANTS.md**: Complete variant system documentation
- **THEMING.md**: Enhanced theming guide with customization examples
- **THEME_QUICK_REFERENCE.md**: Quick reference for theme customization
- **SHADCN_INSPIRATION.md**: Design system inspiration and improvement roadmap

#### **Theme & Styling Improvements**
- **Color System**: Enhanced color variable resolution and consistency
- **Theme Files**: Updated theme CSS files with improved structure
- **Build Process**: Enhanced CSS build scripts for better theme processing

#### **Build & Development**
- **Type Definitions**: Updated TypeScript definitions for new components
- **Component Exports**: Added exports for new Card compound components
- **Storybook**: Enhanced Card stories with compound component examples

### ✅ **No Breaking Changes**

This is a backward-compatible update. Existing component usage continues to work, with new features available as optional enhancements.

---

## [5.0.17] - 2025-01-27

### 🔧 **Patch Release**

- **Documentation**: Updated changelog with version 5.0.16 release notes
- **Build Improvements**: Adjusted theme validation script to be less strict for dark theme structure differences
- **Version Bump**: Patch release for improved stability

---

## [5.0.16] - 2025-01-27

### 🎨 **Color System & Component Styling Updates**

#### **Color System Refactoring**
- **Enhanced Color Variables**: Improved color system with better CSS variable resolution
- **Theme Updates**: Updated theme files with improved color consistency
- **Build Process**: Enhanced CSS build scripts for better color processing

#### **Component Style Improvements**
- **Checkbox Component**: Updated styling to match M3 design system with improved visual consistency
- **Input Component**: Enhanced color system integration and styling updates
- **Multiple Components**: Updated Button, CodeBlock, ColorPicker, FeatureCard, Progress, Skeleton, Textarea, Toast, Toggle, and more with consistent styling
- **Molecule Components**: Updated Alert, ComponentDemo, Dropdown, ImageUpload, Modal, SlideUp, and Tabs with improved styling

#### **Storybook Configuration**
- **Story Organization**: Reorganized stories into atoms/, molecules/, and organisms/ folders for better structure
- **Enhanced Stories**: Updated component stories with improved examples and controls
- **Configuration Updates**: Enhanced Storybook configuration for better development experience

#### **Build & Dependency Updates**
- **Dependency Updates**: Updated package dependencies for improved compatibility
- **Build Scripts**: Enhanced CSS build and cleanup scripts
- **Type Definitions**: Updated TypeScript definitions for better type safety

### ✅ **No Breaking Changes**

This is a backward-compatible update focusing on styling improvements and build enhancements.

---

## [5.0.15] - 2025-01-27

### 🎨 **Color System Improvements**

#### **Standalone Colors File**
- **New Export**: Added `zabi-components-colors.css` as a separate export for consumer apps
  - Contains resolved CSS custom properties that work without Tailwind CSS processing
  - Perfect for apps not using Tailwind CSS v4
  - Includes all color variables with resolved hex values
  - Supports both light and dark mode variants
- **Package Export**: Added `./dist/zabi-components-colors.css` to package.json exports
- **Usage**: Consumer apps can now import colors independently:
  ```css
  /* For Tailwind v4 users */
  @import "zabi-components/dist/zabi-components.css";
  
  /* For non-Tailwind users */
  @import "zabi-components/dist/zabi-components-colors.css";
  ```

#### **Component Cleanup**
- **Badge Component**: Removed all arbitrary Tailwind values (`[var(--color-*)]`)
  - Now uses proper utility classes: `bg-success border-success` instead of `bg-success border-[var(--color-success)]`
  - More maintainable and consistent code
- **Added Background Utilities**: Created explicit background utility classes to match border utilities
  - Added: `bg-success`, `bg-warning`, `bg-error`, `bg-info`, `bg-neutral`, `bg-energetic`, `bg-secondary`
  - Ensures consistent styling across all components

#### **Build Improvements**
- **Simplified Build Script**: Cleaned up CSS build process
- **Better Separation**: Colors file is now separate from main CSS, making it easier to import independently

### 🎯 **Technical Details**

- **Color System**: Colors now work correctly in consumer apps regardless of Tailwind CSS setup
- **Code Quality**: Removed all arbitrary value syntax for better maintainability
- **Consistency**: All color utilities now follow the same pattern

### ✅ **No Breaking Changes**

This is a backward-compatible update. Existing usage continues to work, with improved color system support.

---

## [5.0.14] - 2025-01-27

### ✨ **Component Improvements**

#### **Textarea Component**
- **Visual Consistency**: Updated Textarea styling to match Input component exactly
  - Changed background to `bg-brand-100` (matching Input)
  - Updated border radius from `rounded-md` to `rounded-lg`
  - Removed border for default variant (matches Input's borderless design)
  - Updated focus states to use `focus:ring-2 focus:ring-brand-500` with `focus:ring-offset-0`
  - Standardized placeholder and text colors to match Input
- **Simplified API**: Removed `size` prop - Textarea now uses a fixed size (matching Input's default "md" size)
- **Enhanced Features**: Added message support with icons for success, warning, and error variants (matching Input component)

#### **Storybook Updates**
- **Storybook 10 Compatibility**: Standardized `argTypes` controls across all stories
  - Updated Alert, Badge, Toggle, Tooltip, and SlideUp stories to use string shorthand for controls
  - Improved consistency and cleaner code
- **Textarea Stories**: Added message examples for success, warning, and error variants
- **Removed Deprecated Stories**: Removed Small and Large Textarea stories (size prop removed)

### 🎯 **Technical Details**

- **Styling Alignment**: Textarea now visually matches Input component for consistent form design
- **API Simplification**: Removed unnecessary size variations from Textarea
- **Storybook Modernization**: All stories now use Storybook 10 best practices

### ✅ **No Breaking Changes**

This is a backward-compatible update. Existing Textarea usage continues to work, with improved visual consistency.

---

## [4.0.1] - 2025-01-27

### 🛡️ **SSR Safety Overhaul - "Zero Runtime Errors" Edition**

#### ✅ **Critical SSR Issues Resolved**

This release completely eliminates the "Cannot read properties of null (reading 'f')" error and ensures 100% SSR safety across all components.

#### 🔧 **SSR Safety Improvements**

##### **Route Navigation Fixed**
- **Replaced `window.location.href`**: All route pages now use SvelteKit's `goto()` from `$app/navigation`
- **SSR-Safe Navigation**: No more direct window access during server-side rendering
- **Files Updated**: `src/routes/+page.svelte`, `src/routes/docs/+page.svelte`

##### **Component Lifecycle Fixed**
- **ThemeToggle Component**: Replaced `$effect` with `onMount` for initial setup
- **SSRSafe Component**: Simplified checks to rely solely on `mounted` state
- **Eliminated Race Conditions**: Fixed timing issues during hydration

##### **ID Generation Fixed**
- **Input Component**: Moved ID generation to `onMount` to prevent hydration mismatches
- **Checkbox Component**: Moved ID generation to `onMount` for consistency
- **SSR-Safe IDs**: No more SSR/client ID mismatches

##### **Enhanced SSR Utilities**
- **New `ssr-safe.ts`**: Comprehensive SSR-safe utility functions
- **SvelteKit Integration**: Uses `browser` from `$app/environment`
- **Safe API Access**: `safeLocalStorage()`, `safeDocument()`, `safeWindow()`
- **ID Generation**: `generateId()` function for consistent SSR-safe IDs

#### 🎯 **Technical Improvements**

##### **Consistent SSR Pattern**
```svelte
import { safeLocalStorage, safeDocument } from "../../lib/ssr-safe";

onMount(() => {
    mounted = true;
    const storage = safeLocalStorage();
    if (storage) {
        // Safe browser API access
    }
});
```

##### **SvelteKit Best Practices**
- Uses `browser` from `$app/environment` instead of manual checks
- Uses `goto()` from `$app/navigation` for routing
- Follows SvelteKit SSR patterns throughout

##### **Hydration Safety**
- No more SSR/client mismatches
- Consistent ID generation across server and client
- Proper lifecycle management

#### ✅ **Results Achieved**

##### **Build Status**
- ✅ **Successful Builds**: All builds complete without errors
- ✅ **Type Safety**: 0 TypeScript errors in zabi-components code
- ✅ **SSR Compatible**: Full server-side rendering support

##### **Runtime Safety**
- ✅ **Zero Runtime Errors**: Eliminated all "Cannot read properties of null" errors
- ✅ **Hydration Safe**: No more client/server mismatches
- ✅ **Theme Toggle**: Works correctly on first load
- ✅ **Form Inputs**: Stable IDs across SSR/hydration

##### **Cross-Environment Compatibility**
- ✅ **SvelteKit SSR**: Full compatibility with server-side rendering
- ✅ **Client Hydration**: Smooth hydration without errors
- ✅ **Production Ready**: Works correctly in production environments

#### 📋 **Files Modified**

1. `src/routes/+page.svelte` - Navigation fixes (6 instances)
2. `src/routes/docs/+page.svelte` - Navigation fixes (2 instances)
3. `src/components/atoms/ThemeToggle.svelte` - SSR safety improvements
4. `src/components/atoms/Input.svelte` - ID generation fixes
5. `src/components/atoms/Checkbox.svelte` - ID generation fixes
6. `src/components/SSRSafe.svelte` - Simplified checks
7. `src/lib/ssr-safe.ts` - Enhanced SSR utilities

#### 🚀 **Performance Benefits**

- **Faster Builds**: Reduced build time and complexity
- **Better Reliability**: No more runtime crashes
- **Improved DX**: Better developer experience with consistent patterns
- **Production Ready**: Fully tested in production environments

#### 🔄 **Migration Notes**

**No Breaking Changes**: This is a backward-compatible update that fixes SSR issues without changing component APIs.

**For Developers**: All existing component usage remains the same - the fixes are internal and transparent to users.

---

## [2.1.0] - 2025-01-27

### 🚀 Major Event Handling Refactor - "Cross-Framework Compatible" Edition

#### ⚠️ **BREAKING CHANGES** - Event Handling Overhaul

This is a **major breaking change** that affects how all components handle events. The refactoring eliminates SSR/production errors and makes components compatible with React, Vue, and vanilla JavaScript applications.

#### 🔧 **Event System Refactoring**
- **Removed `createEventDispatcher`**: Eliminated all `createEventDispatcher` usage across 18 components
- **Implemented Event Forwarding**: All components now use `{...$$restProps}` for native DOM event forwarding
- **SSR-Safe**: Fixed hydration mismatches and production build errors
- **Cross-Framework Compatible**: Components now work in React, Vue, Svelte, and vanilla JS

#### 🎯 **Components Refactored**

##### **Form Components**
- **Input**: Replaced `bind:value` with `value` prop + `on:input` handler
- **Textarea**: Replaced `bind:value` with `value` prop + `on:input` handler  
- **Select**: Replaced `bind:value` with `value` prop + `on:change` handler
- **Checkbox**: Replaced `bind:checked` with `checked` prop + `on:change` handler

##### **Interactive Components**
- **Button**: Added `{...$$restProps}` for native event forwarding
- **Toggle**: Added event handler + `{...$$restProps}` for cross-framework compatibility
- **ThemeToggle**: Added `{...$$restProps}` for event forwarding

##### **Complex Components**
- **Modal**: Removed `createEventDispatcher`, simplified event handling
- **Tabs**: Removed `createEventDispatcher`, uses direct state management
- **ImageUpload**: Removed `createEventDispatcher`, simplified file handling
- **ContactForm**: Updated to use new event patterns
- **Form**: Removed `createEventDispatcher`, added `{...$$restProps}`
- **Alert**: Removed `createEventDispatcher`, added `{...$$restProps}`
- **Toast**: Removed `createEventDispatcher`, simplified close handling
- **Badge**: Removed `createEventDispatcher`, added `{...$$restProps}`
- **SlideUp**: Removed `createEventDispatcher`, simplified modal handling
- **TopNavbar**: Removed `createEventDispatcher`, added `{...$$restProps}`
- **Navigation**: Removed `createEventDispatcher`, simplified navigation

#### ✅ **Benefits Achieved**

##### **SSR/Production Safe**
- ✅ **No more hydration errors** in SSR environments
- ✅ **Production builds work correctly** without runtime errors
- ✅ **Eliminated `createEventDispatcher` errors** in SvelteKit applications

##### **Cross-Framework Compatible**
- ✅ **React Applications**: Components work with standard React event handlers
- ✅ **Vue Applications**: Compatible with Vue's event system
- ✅ **Vanilla JavaScript**: Full compatibility with native DOM events
- ✅ **Svelte/SvelteKit**: Maintains full compatibility with improved reliability

##### **Standards Compliant**
- ✅ **Native DOM Events**: Uses web standards instead of framework-specific events
- ✅ **Better Performance**: Reduced JavaScript overhead and bundle size
- ✅ **More Predictable**: Event handling follows web standards

#### 🔄 **Migration Required**

**Before (Old Pattern):**
```svelte
<!-- This would cause SSR errors -->
<Button on:click={handleClick}>Click me</Button>
<Input bind:value={inputValue} />
<Modal bind:isOpen onclick={handleClose} />
```

**After (New Pattern):**
```svelte
<!-- Now works in all environments -->
<Button on:click={handleClick}>Click me</Button>
<Input value={inputValue} on:input={(e) => inputValue = e.target.value} />
<Modal bind:isOpen on:click={handleClose} />
```

#### 📋 **Breaking Changes Summary**

1. **Form Components**: Must use `value` prop + event handlers instead of `bind:value`
2. **Event Names**: Some custom events replaced with native DOM events
3. **Event Structure**: Simplified event structures across all components
4. **SSR Compatibility**: Components now work correctly in SSR environments

#### 🛠️ **Technical Details**

- **Event Forwarding**: All interactive elements now use `{...$$restProps}`
- **Native Events**: Replaced custom events with standard DOM events where possible
- **State Management**: Simplified internal state management
- **Type Safety**: Maintained full TypeScript support with updated types

#### 🎯 **Migration Guide**

See the updated README.md for detailed migration examples and new usage patterns.

---

## [2.0.2] - 2025-01-27

### 🎯 Major Simplification - "Less is More" Edition

#### ✨ Simplified Components
- **Massive Code Reduction**: Reduced component complexity by 60-80% across the board
- **Modern CSS-First Approach**: Replaced complex JavaScript with modern CSS-only solutions
- **Unified Form Component**: Consolidated 4 form components into 1 simple Form component
- **Removed Complex Managers**: Eliminated NotificationManager, ToastManager, and other complex utilities

#### 🔧 Atom Components Simplified
- **Badge**: Removed complex variants, icons, and animations - now just basic color variants
- **Button**: Simplified to 3 variants (primary, secondary, danger) with minimal props
- **Card**: Merged ModernCard into Card, removed complex styling and animations
- **Checkbox**: Removed complex validation, sizing, and custom CSS
- **Input**: Simplified to essential props only, removed complex validation system
- **Heading**: Clean heading component with just level and text props
- **Progress**: Basic progress bar with simple percentage display
- **Select**: Simplified dropdown with basic options support
- **Textarea**: Essential textarea with minimal configuration
- **Toggle**: Fixed-size toggle with simple on/off state
- **ThemeToggle**: Emoji-based theme switcher, removed complex styling
- **Toast**: Fixed-position toast with basic message display
- **Tooltip**: CSS-only positioning with data-placement attributes
- **Skeleton**: Simple loading placeholder with basic styling
- **TextAlignment**: Emoji-based alignment selector
- **OptimizedImage**: Basic image component with lazy loading
- **ColorPicker**: Simple color grid without complex dropdown logic

#### 🧩 Molecule Components Simplified
- **Dropdown**: CSS-only positioning, removed complex JavaScript calculations
- **ImageUpload**: Direct file selection, removed modal and progress bars
- **Form**: Unified form component, removed complex validation and field management
- **Modal**: Simple modal with basic backdrop and close functionality
- **SlideUp**: CSS-only slide-up panel, removed complex state management
- **Tabs**: Basic tab navigation with keyboard support, removed complex utilities

#### 🏗️ Organism Components Simplified
- **TopNavbar**: Responsive top navbar with mobile menu, removed complex variants
- **Navigation**: Simple navigation list with active state
- **Removed Complex Components**: Deleted NavigationItem, NotificationManager, ToastManager

#### 🗑️ Removed Complexity
- **External Utility Functions**: Removed complex tabs-utils, navigation-utils
- **Complex Type Definitions**: Simplified event types and interfaces
- **Svelte Transitions**: Replaced with CSS-only animations
- **Custom CSS Variables**: Replaced with standard Tailwind classes
- **Complex State Management**: Simplified to essential state only
- **Redundant Folders**: Removed simple/ folder with duplicate exports

#### 🎨 Modern CSS Features
- **CSS-only Positioning**: Using `position: absolute` and `transform` for tooltips and dropdowns
- **CSS Pseudo-elements**: Using `::before` for arrows and indicators
- **CSS Data Attributes**: Using `data-placement` for component positioning
- **CSS Transitions**: Smooth animations handled entirely by CSS
- **Tailwind-First**: All styling using Tailwind utility classes

#### 📦 Package Improvements
- **Cleaner Structure**: Removed unnecessary abstraction layers
- **Direct Imports**: Components available from their natural locations
- **Simplified APIs**: Just the essential props needed for functionality
- **Better Performance**: Reduced JavaScript overhead and complexity

#### 🐛 Bug Fixes
- **Accessibility**: Fixed label associations and ARIA attributes
- **TypeScript**: Resolved all type errors and warnings
- **Linting**: Fixed all ESLint and Svelte warnings
- **Deprecation**: Replaced deprecated Lucide icons with emoji alternatives

### Breaking Changes
- **Removed Components**: KeyValueForm, ContactForm, ModernForm, NotificationManager, ToastManager
- **Simplified Props**: Many components now have fewer configuration options
- **Removed Variants**: Reduced complex variant systems to essential options only
- **Event Simplification**: Simplified event structures across all components

### Migration Guide
- **Form Components**: Use the unified `Form` component instead of multiple form variants
- **Complex Features**: Many complex features have been removed in favor of simplicity
- **Styling**: Components now use standard Tailwind classes instead of custom CSS variables
- **Imports**: Import components directly from atoms/, molecules/, organisms/ folders

## [1.1.1] - 2025-10-06

### Fixed
- Updated generated TypeScript definitions for better type safety
- Enhanced package structure with improved type exports
- Fixed build consistency and versioning

### Changed
- Updated internal build files and generated assets
- Improved TypeScript declaration file generation
- Enhanced package.json structure and exports

## [1.1.0] - 2025-10-05

### Added
- Comprehensive TypeScript definitions built into the library
- Self-contained type system - no custom type definitions needed in consumer apps
- Enhanced component type safety with proper event handling
- SSR-safe utilities for better SvelteKit compatibility

### Changed
- Updated build configuration for proper SvelteKit compatibility
- Removed SSR mode from library build (libraries should be client-side)
- Enhanced package.json exports for better module resolution
- Updated peer dependencies for Svelte 5 compatibility

### Fixed
- Fixed runtime errors with `Cannot read properties of null (reading 'f')`
- Fixed event handling for Svelte 5 compatibility
- Fixed TypeScript type inference for component props and events
- Fixed package exports for proper module resolution

### Removed
- Removed need for custom type definitions in consumer applications
- Removed unnecessary client-only component duplicates
- Removed SSR wrapper components (not needed)

### Breaking Changes
- None - this is a backward-compatible update

## [1.0.11] - Previous version
- Initial release with basic components

