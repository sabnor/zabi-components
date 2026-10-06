# Changelog

All notable changes to this project will be documented in this file.

## Changelog policy (theme/token surface)

Whenever token or CSS import API surface changes, include:
- exported path additions/removals/deprecations (`package.json` `exports`)
- token rename/add/remove (for `--color-*` and `--zabi-*`)
- mapping rule updates (for example dark semantic mapping)
- migration guidance when compatibility aliases remain temporarily

## [Unreleased]

### Fixed

- **Z-040: the pressed field follows the field.** `--color-input-active` (the
  pressed Select trigger) is now derived from `--color-input`, so an app that
  sets the light card colour through `createTheme` `overrides.light` no longer
  trips "pressed field against the resting field". Light mixes 12% of the ink
  (`--zabi-base-900`) into the field, dark 10% of the light end
  (`--zabi-base-50`). On the default theme light moves from `#e4e4e7` to
  `#e3e3e4` and dark from `#333338` to `#353538`. An app that overrode
  `--color-input-active` by hand to get past the check can delete that override.
  Restore: `--color-input-active: var(--color-base-200)` in light,
  `var(--color-base-250)` in dark. The neutral chroma at the light end is not a
  new option: set the page per mode (`overrides.light`, `--color-surface-base`),
  see THEMING.md.

## [9.0.0-alpha.1] - 2026-10-06

A local preview build of the 9.0 visual direction, not published to npm; 8.1.0
stays the stable version. It holds the token layer only (surfaces, status
colours, materials, gradients, motion, typeface): no component is restyled yet
except the default `Card` and the `ImageUpload` hover plate, and dark mode is
not yet art-directed. No token, prop or export is removed or renamed; values
move, and each visible change below has a line that restores 8.1. Built quickly
and tested lightly on purpose: the type and design checks, one unit run, the
theme tests, the package build and a scratch install were run on it. NOTHING
was rendered: no browser suite, no Storybook or visual check in either mode, no
accessibility or QA review. Using it is the test.

### Added

- **Motion tokens.** `--duration-fast|base|moderate|slow` (100, 150, 200, 300ms) and `--ease-standard` (`cubic-bezier(0.2, 0, 0, 1)`), `--ease-out` (Tailwind's own curve) and `--ease-spring` (a lightly damped `linear()` spring with one overshoot, with a cubic-bezier fallback where `linear()` is unsupported). Utilities: `ease-standard`, `ease-out`, `ease-spring`; durations are `duration-(--duration-moderate)` (Tailwind has no `duration-fast` style name for custom properties). Under `prefers-reduced-motion: reduce` the four durations become `0s` and the spring becomes the standard curve, in both modes and over an app's own values (`:root:root`, like the materials fallback), so everything that reads the tokens follows. All are settable through `createTheme` `overrides`.
- **Materials (frosted glass) for what floats over content.** Tokens `--color-material-thin|regular|thick` (the fills: `--color-surface-chrome` at an alpha for thin and regular, `--color-surface-overlay` for thick), `--material-alpha-thin|regular|thick`, `--material-blur-thin|regular|thick`, `--material-saturate`, `--material-filter-*`, `--color-material-highlight`, `--color-material-rim`, `--shadow-material` and `--shadow-opacity-contact`, and the classes `material-thin`, `material-regular` and `material-thick` (fill, backdrop filter, edge and shadow; they compose with `rounded-*` and `focus-ring`). Highlight, rim and shadow derive from the neutral ramp, so `neutralChroma` tints them. No component uses them yet except the `ImageUpload` hover plate.
- **Alpha floors in the contrast guard.** Each material is composited over the worst backdrop of the mode (`--zabi-base-950` behind light, `--zabi-base-50` behind dark) and over the page: thin must give its headline 4.5:1, regular its headline, body and label, thick all five text roles, and regular and thick the focus ring 3:1 (a thin control's ring is drawn outside it). Shipped alphas for thin, regular and thick: light 58, 80 and 86, dark 66, 76 and 98, each the smallest whole 2% that passes except light thin, whose floor is lower. Dark thick is close to opaque because captions must hold over a white backdrop; dark is art-directed in a later 9.0 change. `scripts/contrast-pairs.js` has a `behind` form that `createTheme` evaluates too, so an app's generated theme gets the same floor; every material token is settable through `overrides` (`light`, `dark`, `both`).
- **Fallbacks and `data-materials="opaque"`.** The fills become the opaque surface they are made from, and the blur goes, under `prefers-reduced-transparency: reduce`, `prefers-contrast: more`, `forced-colors: active`, where `backdrop-filter` is unsupported, and where the root or any ancestor has `data-materials="opaque"`. Under forced colors the rim is a `CanvasText` outline. The fallbacks are in the theme files and in `zabi-components-colors.css`.
- **Gradient tokens and three classes.** Canvas: `--gradient-canvas` (two soft radial washes from brand 300 and accent 300, a `background-image` only), its stops `--color-canvas-wash-brand` and `--color-canvas-wash-accent`, and `--gradient-canvas-strength` (light 55%, dark 25%); the class `bg-canvas` adds `--color-surface-base` under it. The library does not paint it on `body`. Controls: `--gradient-control` and `--gradient-control-accent`, a translucent veil over the control's own `background-color` (so hover and pressed fills still show), with the veil colours `--color-control-gradient-start|end` and `--color-control-gradient-accent-start|end`, strengths `--gradient-control-top-strength` and `--gradient-control-bottom-strength`, and `--shadow-control-highlight` (an inset 1px top edge); classes `bg-control-gradient` and `bg-control-gradient-accent` (the highlight goes through Tailwind's shadow variables, so `focus-ring` still draws). All follow a custom `brand` and `accent` and are settable through `createTheme` `overrides` (`light`, `dark`, `both`). No component uses them yet.
- **Worst-case rule for gradients.** Contrast is never measured against a gradient. The guard holds the five text roles, `--color-link` (4.5:1), `--color-focus-ring` and `--color-input-border` (3:1) on each canvas wash stop over `--color-surface-base`, and the solid-button label on both veil ends over rest, hover and pressed fills (4.5:1). Solved strengths: canvas light 55 and dark 25 (the prototype used 85 and 45); top veil light 4 and dark 22. `createTheme` evaluates the same pairs.
- `scripts/check-token-violations.js` fails `backdrop-blur-*` and `backdrop-filter` in `src/components`. The `ImageUpload` hover plate (`bg-surface-overlay/60 backdrop-blur-md`) is now `material-thin`.

### Changed (visible in 9.0)

- **Default typeface is the platform's UI face.** `--font-family-sans` is `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` plus the emoji faces; `--font-family-heading` still follows it; `--font-family-mono` is `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` (it was Monaco, Menlo, Ubuntu Mono). The library and its Storybook no longer load Nunito Sans, so a default install downloads no font. The face now differs by platform (San Francisco, Segoe UI, Roboto) and text widths change, so truncation and wrapping can move. Restore 8.1: load Nunito Sans yourself and set `--font-family-sans: 'Nunito Sans', ui-sans-serif, system-ui, sans-serif` on `:root` after the imports. The docs site keeps Familjen Grotesk for its marketing headings.
- **Default transition curve.** `transition`, `transition-colors`, `transition-opacity` and the rest, where a component sets no duration of its own, now use `--ease-standard` instead of Tailwind's `cubic-bezier(0.4, 0, 0.2, 1)`; the duration stays 150ms (`--duration-base`). Restore Tailwind's curve: `--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)` on `:root` after the imports, or `createTheme({ …, overrides: { '--default-transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)' } })`.
- **Light page and cards.** The light page is now near-white (`--color-surface-base` is `--zabi-base-50`, `#fafafa`; it was `--zabi-base-150`, `#ececee`), and `--color-page` and `--color-background` follow it. A default `Card` now has a 1px `--color-border` edge and no shadow (it used `shadow-sm`, and `hover:shadow-lg` when clickable); it is the same as `variant="outlined"`, which stays. `elevated` and `flat` are unchanged. A clickable card's hover fill is now `--color-card-hover` = base-150 (was base-100) and its pressed fill base-200, and `--color-input-disabled` is base-150 and `--color-background-secondary` base-100, so they still read against the lighter page. Dark does not change.
- **New token `--color-surface-chrome`** (and the `bg-surface-chrome` utility) for bars and sidebars: `var(--color-surface-raised)` in both modes. The components do not read it yet. In `createTheme`, set it per mode with `overrides: { light: { '--color-surface-chrome': … }, dark: { … } }`.
- **Restore 8.1.** Page: `createTheme({ …, overrides: { light: { '--color-surface-base': 'var(--zabi-base-150)' } } })`, or `--color-surface-base: var(--zabi-base-150)` in light CSS. Card: there is no `variant` that gives the old shadowed default; pass `class="border-transparent shadow-sm"` to approximate it.
- **Status colours.** Every `-subtle` fill moves from ramp step 200 to step 100 and every `-border` from 300 to 200 in light (`success`, `warning`, `error`, `energetic`, `accent`, `info`; `--color-action-primary-subtle` and its hover and pressed steps follow, to 100, 200 and 300/200). Neutral's fill is `--color-base-200` (was 250) and its edge `--color-base-250` (was 300). Dark already used 100 and 200 and is only affected by the regenerated ramps below. The `warning`, `citron` (the default `accent` and `energetic`) and `pine` (`success`) ramps are regenerated on the same lightness curve with new hue and chroma, which is breaking by the repo's policy for every `--zabi-warning-*`, `--zabi-citron-*`, `--zabi-accent-*` and `--zabi-pine-*` step. Step 600: warning `#9e6000` to `#a05f00`, citron and accent `#707400` to `#5d7900`, pine `#00805e` to `#00804b`. Contrast ratios are unchanged to within rounding. An app that passes its own `accent` or `brand` to `createTheme` is unaffected, except that its dark mirror of `success`, `warning` and `energetic` follows the new ramps.
- **Restore 8.1 status colours.** Subtle fills: set `--color-<family>-subtle: var(--color-<ramp>-200)` and `--color-<family>-border: var(--color-<ramp>-300)` (ramp `pine` for success, `iris` for info, `citron` for energetic) in light, and `--color-neutral-subtle: var(--color-base-250)`, `--color-neutral-border: var(--color-base-300)`. Ramps: pass the old colour to `createTheme` (`accent: '#707400'`) or set the old `--zabi-*` steps on `:root`; the 8.1 seeds were warning hue 82, shift -24, chroma 0.165; citron hue 112, chroma 0.135; pine hue 170, chroma 0.115.
- **Softer, layered shadows.** `--shadow-sm|md|lg|xl` keep their names and are each a tight contact shadow plus a wider soft one. `--shadow-opacity` is now the strength of the wide layer: `0.10` in light (was `0.14`) and `0.24` in dark (was `0.3`); the new `--shadow-opacity-contact` is the contact layer, `0.06` light and `0.3` dark. Restore 8.1: in light `--shadow-opacity: 0.14`, `--shadow-sm: 0 1px 3px 0 rgb(var(--shadow-color) / var(--shadow-opacity)), 0 1px 2px -1px rgb(var(--shadow-color) / var(--shadow-opacity))`, `--shadow-md: 0 4px 6px -1px rgb(var(--shadow-color) / var(--shadow-opacity)), 0 2px 4px -2px rgb(var(--shadow-color) / var(--shadow-opacity))`, `--shadow-lg: 0 10px 15px -3px rgb(var(--shadow-color) / var(--shadow-opacity)), 0 4px 6px -4px rgb(var(--shadow-color) / var(--shadow-opacity))`, `--shadow-xl: 0 20px 25px -5px rgb(var(--shadow-color) / var(--shadow-opacity)), 0 8px 10px -6px rgb(var(--shadow-color) / var(--shadow-opacity))`; in dark the same with `--shadow-opacity: 0.3`.
- The surface guard (`scripts/check-surface-elevation.js`) now checks the light surfaces by the card edge (`--color-border` at 1.2:1 or more on the page and the card) instead of a lightness ladder; the dark rules are unchanged.

## [8.1.0] - 2026-10-06

8.1.0 adds a theme generator (`zabi-theme`, `createTheme`) and an accent colour,
a mobile set (AppShell, AppBar, BottomTabBar, BottomSheet, Drawer, Select as a
sheet, safe areas, 44px touch targets) and more than 25 new components. Form fields,
focus rings and light-mode surfaces are easier to see, and `strings` and
`ZabiStringsProvider` replace every built-in English text. Nothing from 8.0.0
was removed or renamed: every `exports` path, prop and token is still there.
8.0.1 was never published, so everything in the 8.0.1 section below (valid theme
files, the three-line Tailwind setup working, ColorPicker on the server,
Progress named) is part of 8.1.0.

### Upgrade notes

Coming from 8.0.0, these are visible without a code change. Each bullet says
what to do.

**Appearance**

- **Form field edges are darker.** `--color-input-border` is `base-500` in
  light and dark (was `base-350` light, `base-300` dark) and
  `--color-input-border-hover` is `base-550` in light. The edge is guarded at
  3:1 against the field fill, the page and the card, in both themes. A theme
  of yours that overrides the edge can now report a pair below 3:1 in the
  generator check. The dark field edge on the overlay surface (sheets, modals)
  is about 2:1 against the panel and is not guarded. Nothing to do unless you
  override the edge.
- **`Progress` uses new tokens.** The fill is `--color-progress-fill` (default
  `--color-action-primary`) and the track `--color-progress-track` (default
  `--color-input`); utilities `bg-progress-fill` and `bg-progress-track`. The
  fill used to be the hard-coded brand step 600, so a bar changes colour in an
  app that pins a primary action, and in dark. Fill on track is guarded at
  3:1. Set the two tokens to keep the old colour.
- **Light mode has a visible surface ladder, stronger tints and shadows.** See
  Changed: the page, cards, tinted fills, hover fills, overlay edge and shadow
  all move. A card is 1.18:1 on the page (was 1.10). Check screenshots; no
  token was renamed.
- **Focus rings are one step darker in light and lighter in dark.**
  `--color-focus` is `brand-600` in both themes (light was `brand-500` at
  2.99:1 on the page; dark was `brand-500`, 2.91:1 on the overlay; dark is
  #92a9ff by default). The muted ring in dark is one step lighter
  (`--color-focus-ring-muted`, `base-600`).
- **The computed `box-shadow` of a focused element lists five shadows**, not
  two, because the ring now composes with shadow utilities. A test that reads
  the ring colour from it should pick the 4px spread.
- **Dark surfaces are `color-mix()` expressions** over `--zabi-base-*`
  (`--color-surface-raised`, `-elevated`, `-overlay`). The pixels are the same;
  `getComputedStyle` reports `color(srgb …)`, not `rgb(…)`, so a test that
  compares the string needs updating.
- **Placeholder text is one step stronger** in both themes
  (`--color-input-placeholder`: #61616a light, #a1a1aa dark; 4.5:1 or more on
  the resting, hovered, focused and pressed field).
- **Checked checkboxes and radios use the primary action fill**, with the
  primary button's text colour on the tick and dot.
- **Dropdown menus, Select lists, the ColorPicker popover and NavigationMenu
  panels have 16px corners** (were 8px), and other nested corners are
  concentric: the Card in a Modal, MediaGrid's check mark, Alert's close
  button, rows in a `.list-group`, the avatar in SidebarFooter's profile
  button.
- **`font-sans` and `font-mono` follow the theme's font tokens**
  (`--font-family-sans`, `--font-family-mono`), not Tailwind's system stacks.
  If you used `font-sans` to get the system font, write the stack yourself.
- **`color-scheme` comes from the theme**: `light` by default and for
  `data-theme="light"`, `dark` under `.dark` and `data-theme="dark"` (also when
  both `class="dark"` and `data-theme="light"` are set). Native controls,
  scrollbars, date pickers and autofill follow the theme. A
  `<meta name="color-scheme">` tag is not needed, and a `color-scheme` rule of
  your own must come after the theme import to win.

**Markup, roles and accessible names**

- **A `Select` is found by role `combobox`, not `button`.** Its trigger has
  `role="combobox"` and reports `aria-invalid`, `aria-required` and
  `aria-busy`. Its form control is a native `<select name>` (not a hidden
  input), so code that looked for `input[type=hidden]` must look for the
  select, and `required` now blocks the form. A form reset returns the Select
  to the value it was rendered with. Update tests and selectors.
- **A loading `Button` or `IconButton` is `aria-disabled="true"` and
  `aria-busy="true"`, not `disabled`.** It keeps keyboard focus and swallows
  the press. CSS or tests that matched it with `:disabled`, `[disabled]` or a
  strict `toBeDisabled()` must use `[aria-busy="true"]`.
- **`ThemeToggle` (two modes) has the constant name "Dark mode"** with
  `aria-pressed`, not "Switch to dark mode" / "Switch to light mode"; update
  tests and scripts that find the button by those names. It applies the stored
  choice when it mounts (`storageKey={null}` turns that off) and no longer
  writes an inline `color-scheme`.
- **`NavigationMenu` is a list of links and disclosure buttons**, not a
  `menubar`: the list has `role="list"` and items carry no menu roles. Screen
  readers announce it differently; keyboard use is unchanged.
- **A `List` row with no `href` in a List with no `onclick` is plain content**,
  not a focusable button with an arrow.
- **Checkbox and Radio inputs are stretched invisibly over their box** instead
  of being visually hidden, so `getByRole("checkbox").check()` works.
- **An unnamed `RadioGroup` submits nothing.** Give it a `name`. (The
  generated name still groups the radios.)
- **A disabled `Dropdown` or `Select` option is `aria-disabled`, not
  `disabled`**: reachable with the arrow keys, announced as disabled, not
  selectable.
- A Select list and a Dropdown menu are one Tab stop (roving `tabindex`, 0 or
  -1). `getFocusableElements` skips `tabindex="-1"`.

**Defaults and behaviour**

- **A binding that starts `undefined` on a bindable prop is now written back
  as the default** (`""`, `false`, `null`). `let value = $state()` works with
  `bind:value` everywhere; no bindable prop has a fallback expression any
  more.
- **Controls are at least 44px on touch screens** (`pointer: coarse`), so
  layouts there get taller (a checkbox list at an 8px gap is 52px a row).
  Nothing changes with a mouse.
- **Every pressable control shows a `:active` pressed state** that does not
  depend on hover. Hand-written `:hover` rules apply only under
  `@media (hover: hover)`, so a tapped button no longer sticks in its hover
  colour.
- **`Page` pads for the safe areas by default** (`safeArea`). An app that sets
  `viewport-fit=cover` and already pads for the insets itself should pass
  `safeArea={false}`. Without `viewport-fit=cover` the insets are zero and
  nothing changes.
- **`Select` opens as a bottom sheet on a phone** (a touch screen narrower than
  640px; `presentation="auto"`). Pass `presentation="popover"` to keep the
  pop-over. It fills its container like Input (a Select in a flex row takes the
  free width; give it a width such as `class="w-48"`, which is honoured now),
  and a label too long for the trigger wraps instead of being cut.
  `maxMenuHeight` defaults to `60dvh` (was `60vh`).
- **`Button` labels wrap.** A label that does not fit goes onto a second line
  and the button grows (`min-height` instead of a fixed height); in a tight
  flex row a button may shrink and wrap where it held its width.
- **Toasts show your message.** A toast with a `message` and no `title` shows
  the message, not a default heading; only a toast with `detail` can be
  expanded; the countdown sentence and "Click to stop" are off unless
  `showCountdown`. A toast with no `duration` closes after 7 s (14 s when its
  text is 121 to 240 characters, stays when longer); an error toast and a
  toast with an action stay until dismissed. On touch, `onpausechange` reports
  `paused` then `running` for a tap. Toasts also sit above the tab bar, the
  home indicator and the on-screen keyboard, and move while an overlay with a
  header and footer is open. Mount the Toaster inside `ZabiStringsProvider`
  when you use it.
- **`Tooltip` opens on a tap and can be hovered.** A touch or pen press toggles
  it, and it stays open until a second tap, a tap elsewhere, Escape, a scroll
  or focus leaving (`touchDuration` defaults to `0`). The pointer can move from
  the trigger onto the open bubble, so an open tooltip takes presses: keep
  tooltips clear of other controls. A tooltip that would leave the viewport
  flips or slides to stay 8px inside, and `data-placement` reports the side
  used.
- **`Tabs` with long labels scroll** instead of wrapping onto several lines.
- **`AppBar` and `BottomTabBar` stay one row** (titles and labels get an
  ellipsis; the bars are 57px and 65px at any text size). AppBar can be two
  rows tall when the title would have under 72px beside the controls.
- **Overlays follow the on-screen keyboard** where it covers the page (Modal,
  BottomSheet, SlideUp, Drawer), and Modal and SlideUp are at most `90dvh`.
- **Light-mode `Input`, `Textarea` and `Select` darken their border on hover**
  and render text at 16px below 640px, so iOS Safari no longer zooms on focus.
- **`Table` and `PropsTable` sit on the card surface** with an elevated header
  band; Skeleton and Header's variant chips use `bg-neutral-subtle`.
- **Inside `on-brand` and `on-accent` blocks** labels, links, borders and quiet
  buttons change to the block's on-colour; a card inside a block gets the
  page's colours back. Custom properties named `--zabi-theme-*` appear on a
  block's parent.
- **`ImageUpload` no longer forces a 16rem minimum width**, and its `id` names
  the control (the dropzone button), not the host. Set a width with `class` if
  you relied on it.
- **`SidebarAccountPanel`'s `systemMode` default text is "Follows the
  system".**
- `UnsavedChangesBar` and `ConfirmDialog` leave focus on the pressed button
  while busy, where they moved it to their container.
- `Modal`'s `onclick` as a close signal is deprecated (see Deprecated).

**Theme files and the generator**

- **Dark theme files no longer restate the `--zabi-*` ramps.** `theme-dark`,
  `theme-dark-only` and the dark part of `colors` only remap roles; the raw
  palettes are declared once, in the light theme. Import the light theme
  first: `@import "zabi-components/theme-only"; @import
  "zabi-components/theme-dark-only";`. 8.0.0's `.dark`-only file carried a
  copy; a dark file imported on its own now has no ramps. An override of
  `--zabi-brand-*`, `--zabi-accent-*` or `--zabi-base-*` on `:root` applies in
  both modes. The dark files are about 13 KB larger, because the block is
  published for the class and attribute and for the system setting. See
  `docs/theme-imports.md`.
- **The generator checks more role pairs than 8.0.0**, so a theme check that
  passed on 8.0.0 can turn red. `createTheme` and `zabi-theme` resolve every
  role pair the library's own guard checks (the field edge on fill, page and
  card; the progress fill on its track; the muted and danger focus rings and
  the control boundary on all five surface levels; the accent star outline on
  an inset surface; the focus ring or its offset gap on an accent button; the
  label on a selected and on a held selected pill tab). A pair below AA (4.5:1
  text, 3:1 UI parts) is a warning, and fails under `--strict`. The generated
  values are unchanged; the findings are real for that theme. Fix them with an
  override (`--set`), for example `--color-focus` and `--color-link-hover` one
  brand step darker, or use `--pin`.
- Theme files work with `[data-theme="dark"]`, and with `[data-theme="auto"]`
  under `prefers-color-scheme: dark`. A page with no class and no attribute is
  light, as before.

**Package**

- `package.json`: new `./create-theme` export and `zabi-theme` bin; `culori`
  moved to `dependencies` (the generator uses it at run time);
  `sideEffects: ["**/*.css"]`; `CHANGELOG.md` shipped in `files`; the `prepare`
  script renamed `fix:lucide-types` (dev-only, so installing prints no
  install-scripts notice; run it if your editor needs it). Every component
  imports icons from `@lucide/svelte/icons/<name>`; import yours that way too.
  No export, prop, token or file from 8.0.0 was removed or renamed.

### Added

#### Theming and the `zabi-theme` generator

- **`npx zabi-theme --brand "#0026EA"`** writes a CSS file with the full
  `--zabi-brand-*` ramp; with `--accent` and `--neutral` also the
  `--zabi-accent-*` ramp and all 21 `--zabi-base-*` steps; `--out` names the
  file. Import it after `theme-only` and `theme-dark-only` and it covers light
  and dark. The same is available in code as `createTheme({ brand, accent,
  neutral })` from `zabi-components/create-theme`, which returns `{ css, tokens,
  warnings, closest }`. The ramps sit on the library's lightness curve: your
  colour gives the hue and chroma and is not pinned to a step, so the exact hex
  may not appear, and the file header names the closest step. The generator
  picks the text colour for the brand and accent fills.
- **The generator reports contrast** on stderr, in the file header and in
  `warnings`; `--strict` exits 1 on a failed pair. `--set <token>=<value>` (or
  `overrides`) moves a role and is checked too. `overrides` takes a flat map
  (both modes) or `{ light, dark, both }`; the CLI has `--set-light` and
  `--set-dark`. A light-only override is restated with the library's own dark
  value in the dark rules, and the check reads each mode's own value.
- **`zabi-theme --pin`** (`createTheme({ pin: true })`): the primary action is
  the exact brand colour in light, with derived hover and pressed states and a
  label checked at 4.5:1. The focus ring and links take the colour where every
  guarded pair still passes. Dark keeps the mirrored ramp step unless the colour
  passes there; the header says which. A failing pair is a warning and the
  colour is never moved. `--pin-accent` / `pin: { accent: true }` does the same
  for the solid accent fill.
- **`neutralChroma`** (CLI `--neutral-chroma`, 0 to 0.1, needs `neutral`): the
  OKLCH chroma at the neutral ramp's peak, for a clearly tinted neutral. With it
  the translucent ink roles (`--color-action-secondary` and its hover and
  pressed steps, `--color-surface-hover`, `-active`, `--color-border-overlay`
  in light, `--shadow-color`) follow the neutral ramp, and the file restates the
  dark values under the dark selectors.
- **A theming guide.** `THEMING.md` is the documented token API: quick start
  with `zabi-theme`, import order, tables of the tokens an app may set (brand,
  accent and neutral ramps, the "on" colours, fonts and weights, radius,
  shadow, z-index) and the roles to read, light, dark and auto, what the
  generator does and does not do, and what does not follow an override.
  Renaming or removing a documented token is a breaking change; the token-name
  snapshot in `npm run test:themes` enforces it. The docs site has a `/theming`
  page with a brand switcher (`?brand=amber` opens any page in Amber, generated
  from `#C17B00` and a warm neutral).
- **One brand override restyles light and dark.** The raw `--zabi-*` ramps are
  declared once and the dark block only remaps roles; dark surfaces are mixed
  from the neutral ramp, so warm or tinted greys carry through.
- **An accent colour.** `--zabi-accent-50` … `950`, `--color-accent-50` …
  `950`, the roles `--color-accent`, `-hover`, `-active`, `-subtle`, `-border`,
  `-text`, `--color-on-accent`, and the classes `bg-accent`, `text-accent`,
  `border-accent` (with working `hover:` and `active:` forms, also
  `active:bg-info-active` and `hover:bg-nav-menu-active-hover`). The
  `energetic` tokens are unchanged. `Button` and `IconButton` take
  `variant="accent"` (solid, own hover and pressed fills, `--color-on-accent`
  label); `Badge variant="accent"` (subtle and solid); `Rating tone="accent"`.
- **The text on a fill can be set.** `--zabi-on-brand` (light, white) and
  `--zabi-on-brand-dark` (dark, `brand-950`) feed `--color-on-brand`, which
  `--color-action-primary-text` follows; `--zabi-on-accent` and
  `--zabi-on-accent-dark` do the same for the accent. `Heading` and `Text` take
  `tone="inherit" | "on-brand" | "on-accent"`; the classes `on-brand` and
  `on-accent` set a block's text colour and make the focus ring visible on it;
  `on-surface` marks a surface of your own inside a block.
  THEMING.md ("Text and controls on a brand or accent block") says which button
  variants stay legible there. Directly on a block an empty or ticked checkbox,
  radio or toggle, a filled Rating star and status message text are not legible
  (put them on a card); a card inside a block needs `:has()`.
- **Font tokens.** `--font-family-heading` (follows `--font-family-sans` until
  set; applied to `h1`–`h6` and Heading), `--font-family-mono` (CodeBlock reads
  it), `--font-weight-regular`, `-normal`, `-medium`, `-semibold`, `-bold`,
  `--font-sans`, `--font-mono`, `--font-heading`, and a `font-heading` utility.
- **Dark mode by attribute and by the system setting.** The dark files apply to
  `.dark`, `[data-theme="dark"]`, and `[data-theme="auto"]` when
  `prefers-color-scheme` is dark; `[data-theme="light"]` stays light. Following
  the system is opt-in. Put the class or attribute on `<html>`.
- **ThemeToggle `modes="three"`** steps through system, light and dark, writes
  `data-theme` on `<html>`, shows a monitor, sun or moon and names itself
  "Theme: system. Switch to light"; `labels` (including `labels.darkMode`)
  replaces the words. `mode` (bindable), `onmodechange` and `storageKey` read or
  drive the mode, or store it under your own key. It reads `dark`, `light` and
  `auto`, follows changes made elsewhere, and shows the right icon before it
  mounts.
- **Theme helpers** from the package root: `getThemeMode`, `setThemeMode`,
  `isThemeDark`, `getStoredThemeMode`, `storeThemeMode`, `themeInitScript` and
  the `ThemeMode` type. `themeInitScript()` returns a script for `<head>` that
  applies the stored mode before first paint. TopNavbar takes `themeModes`,
  `themeStorageKey` and `themeLabels`; SidebarAccountPanel takes
  `themeModes="three"` with `onThemeModeChange`.
- New tokens: `--color-surface-inset` (`bg-surface-inset`; a recessed well on a
  card, `base-100` light and `base-150` dark, AA text; dark `--color-input`
  points at it and keeps its value; do not use `--color-input` for a well, it is
  white in light), `--color-input-border-hover`, `--color-control-border`
  (`border-control-border`, `text-control-border`; 3:1 on every surface level;
  `--color-border-strong` is unchanged and decorative), `--color-focus-ring-muted`
  (`.focus-ring--muted`), `--color-focus-ring-danger` (the error colour; the
  on-colour inside a block), `--color-input-active` (`active:bg-input-active`;
  Select's trigger uses it), `--color-action-primary-subtle-active` and
  `--color-action-danger-subtle-active` (`active:bg-…`), `--zabi-list-row-radius`
  (`.list-group` sets it for rows), `--color-progress-fill`,
  `--color-progress-track`, `--zabi-avatar-ring`, and the documented star
  colours `--zabi-rating-on`, `--zabi-rating-off`, `--zabi-rating-on-hover`,
  `--zabi-rating-on-active`, `--zabi-rating-on-edge` (they apply when set on an
  ancestor or by a class). The contrast guard holds the muted and danger focus
  rings and the control boundary to 3:1 on all five surface levels, and fails
  when a focus-ring rule reads a colour that is not in its pair list.

#### New components

- **SortableList** reorders items and leaves their content to you. Each row
  has a drag handle (mouse and touch), arrow keys, Home and End on the handle,
  optional move up and down buttons and a polite announcement of the new
  position. `bind:items`, `onreorder` (item, old and new index),
  `controls="manual"`, `strings`. Escape cancels a drag; a key that cannot move
  further says so ("Hero section, already first"); a parent replacing `items`
  mid-drag cancels it. Clicks on the handle or a move button do not bubble: put
  them beside a header toggle, never inside another button. Handle and buttons
  sit 8px apart on touch.
- **Collapsible**: a trigger wired to the panel it shows and hides, owning ids,
  `aria-expanded`, `aria-controls` and the panel's name. `title` gives a
  full-width header button with a chevron (`headingLevel` wraps it in a real
  heading); a `trigger` snippet hands the wiring to your own `<button>`.
  `bind:open`, `onopenchange`, `disabled`. Closed content stays in the DOM under
  `hidden` (`unmountOnClose` removes it). If the panel closes while focus is
  inside it, focus moves to the trigger. **CollapsibleGroup** makes an
  accordion: opening one closes the others, or `multiple`; Arrow Up and Down,
  Home and End move between headers. In a single-open group only the first
  panel marked open renders open (also on the server, without
  `onopenchange`); a disabled panel keeps its state.
- **ConfirmDialog** (on Modal): `title`, `message`, `variant` (`danger`,
  `warning`, `info`, each with an icon; `danger` uses the danger button),
  `confirmLabel`, `cancelLabel`. If `onconfirm` returns a promise the dialog
  shows its loading state and cannot be dismissed until it settles: it closes on
  success, stays open on failure and passes the error to `onerror`; returning
  `false` keeps it open. `loading` does the same for your own request tracking;
  `oncancel` reports how the user backed out; `loadingLabel` (default
  "Working…") is announced once. Focus starts on Cancel, Enter only activates
  the focused button, and it renders in `document.body` unless `portal={false}`.
  It uses `role="alertdialog"`, draws no outline around the whole dialog while
  loading and sets no `aria-busy` on the panel.
- **Drawer**: a modal panel from the side. `side` is `left`, `right`, `start` or
  `end`; `size` is `sm`, `md` or `lg`, never wider than the screen; `title`,
  `description`, a `footer` snippet; `dismissible`, `onclose({ reason })`,
  `closeLabel`, `initialFocus`, `portal` (default true). Focus is trapped and
  returns to the opener, the page does not scroll, the slide is skipped under
  `prefers-reduced-motion`, it shares the scroll lock with Modal and SlideUp and
  stacks with them. Its `onkeydown` runs after Escape handling; content with
  nothing to focus is a Tab stop named by the title; the panel pads for the
  bottom safe area; the close button takes taps in a 44px area.
- **MediaGrid**: image and video thumbnails to pick from (the grid only).
  `getKey`, `getLabel`, `getUrl`; `bind:selected` or, with `multiple`,
  `bind:selectedKeys`. A single selection moves and is never cleared by a repeat
  press. `ondelete` shows a delete button named after each item (focus moves to
  the item that took its place); `getType`, `getPoster`, `loading`, `empty`
  snippet, `emptyHeadingLevel` (default 3), `minTileSize` (96px), `strings`. One
  Tab stop; arrow keys move by the columns on screen, Home and End within the
  row, Delete asks to delete; "Use the arrow keys to move between items." is read
  when focus enters the grid and shown below it while it has keyboard focus. The delete button sits on the end corner, mirrors
  in RTL, takes taps in a 44px area and shows a pressed state on touch.
- **Spinner**: the loading ring on its own. Sizes `xs` to `lg` (12, 14, 16,
  20px); with a `label` it is a `status`, without one it is decorative; fades
  instead of spinning under `prefers-reduced-motion`.
- **Slider**: a native range input in the library's colours. `bind:value`,
  `min`, `max`, `step`, label, helper or error text, three sizes, `showValue`,
  `formatValue` (also `aria-valuetext`).
- **UnsavedChangesBar**: Save and Discard while a form is `dirty`; sticky
  (`position` `bottom` or `top`); `onsave` may return a promise (saving state;
  a rejection keeps the bar and calls `onerror`); appearance announced politely;
  never takes focus; focus returns to the edited field when it goes; `actions`
  snippet. Warning before the page is left is your app's job.
- **AppShell**: the phone layout. `header` snippet (AppBar), `<main>` content,
  `footer` snippet (BottomTabBar), a `dvh` column inside the safe areas. Sets
  `--app-shell-top-inset` and `--app-shell-bottom-inset` (fallbacks 57px and
  65px) on itself and on `<html>` while mounted, for overlays in
  `document.body`. `contentElement="div"` inside a page that already has a
  `<main>`.
- **AppBar**: a phone top bar with `title` (`headingLevel`, default 1;
  `titleLines={2}` allows two lines), back control (`backHref` or `onback`,
  `backLabel`), `leading` and `actions` snippets (up to two actions),
  `collapseOnScroll` (stays while focus is inside; no animation under reduced
  motion). The title always has at least 72px; a `leading` wider than the row is
  held to the row. Parts carry `data-appbar-part` (`back`, `title`, `actions`);
  the bar measures itself in the browser, so before hydration the title wraps to
  the second row. At 180px wide no title shows beside a back control and two
  actions.
- **BottomTabBar**: three to five links with an icon above a short label.
  `items` take `href`, `label`, `icon`, `badge` (read with the label: "Inbox, 3
  new"; `badgeLabel`, `badgeMax`). `active` is an href or path (`aria-current=
  "page"`); left out, the bar follows the browser address, so pass
  `active={page.url.pathname}` on the server. Fixed on its own and in the flow
  in an AppShell (`position`), clear of the home indicator. Tabs are at least
  44px with 8px gaps; under 52px wide the labels hide (icon only, label stays
  the accessible name); tabs go under 44px only when five do not fit. The
  active tab has a 2px outline in the action colour. With five tabs labels stay
  11 to 12px at 200% text.
- **Rating**: one to `max` (default 5) stars, can be empty. `bind:value` is a
  number or `null`; a radio group named by `label`, each star reads "4 of 5
  stars"; arrow keys, Home and End; `name` submits it. A repeat press on the
  selected star never clears it; `clearable` adds a clear button (Delete and
  Backspace clear too). `readonly` shows a score as one image ("Quiz, 3.5 of 5
  stars"), with fractions, `showValue`, `formatValue`; it submits nothing. 44px
  targets at every `size`; `strings`; the empty star uses
  `--color-control-border`.
- **SegmentedControl**: two to four choices in one row. `options` (`value`,
  `label`, `icon`, `disabled`), `bind:value`, `onchange`. A radio group, not
  tabs: one Tab stop, arrows move and select, `name` submits, a repeat press
  does nothing. `fullWidth` (default true), labels wrap, 44px tall on touch.
- **BottomSheet**: a modal panel sliding up from the bottom. Snap points
  (`snapPoints`, `"half"` and `"full"` by default; `bind:snap`); the grip drags
  between them or down to close and is a button ("Expand" / "Collapse"). Content
  scroll wins over dragging unless at its top. `title`, `description`, `footer`,
  `isOpen`, `dismissible`, `portal`, `initialFocus`, `closeLabel`,
  `onclose({ reason })` with the extra reason `"swipe"`. Safe areas, no animation
  under reduced motion, a centred 40rem sheet from `md`. Half and full heights
  are shares of what the on-screen keyboard leaves. The grip's focus ring is
  drawn inside its 44px box; a click reaches the grip button, and flicks are
  timed from the events' own times.
- **StickyActionBar**: keeps a form's main action in view at the bottom of the
  screen or scrolling box, rises above the on-screen keyboard, reserves
  `scroll-padding-bottom`, never takes focus. One per scrolling box; a short
  form needs `class="flex min-h-full flex-col"`.
- **FloatingActionButton**: a round 56px primary button. `label` (required, the
  accessible name), `extended`, `icon`, `href` (a link; a button otherwise),
  `position` (`bottom-end` default, `bottom-start`, `bottom-center`). Above the
  tab bar in an AppShell, above the safe area elsewhere; `--fab-bottom-offset`
  lifts it; it reserves `scroll-padding-bottom` on what scrolls under it.
- **DateField** and **TimeField**: the browser's date and time inputs in the
  library's Input. `bind:value` is `YYYY-MM-DD` or 24-hour `HH:mm`, `""` when
  empty; `label`, `hint`, `error`, `min`, `max`, `step`, `required`, `disabled`,
  `readonly`, `size`, `name`; work in FormField; ids start with `input-`.
  **`formatDate` and `formatTime`** (package root) format those strings for a
  locale (`formatDate("2026-10-06", "sv")` is "6 okt. 2026"), never shift by the
  time zone, and return `""` for empty or invalid.
- **Calendar**: one month as an ARIA grid with event dots. `bind:month`
  (`YYYY-MM`), `bind:selected` (`YYYY-MM-DD` or `null`), `events` (`date`,
  `label`, `tone`; up to three dots a day), `weekStartsOn` (default Monday),
  `locale`, `min`, `max`, `isDateDisabled`, `onselect`, `onmonthchange`,
  `strings`. One Tab stop: arrows by day and week, Home and End within the
  week, Page Up and Down by month (Shift: year). Days are named in full with
  state and events and are 44px tall; unavailable days have a line through the
  number. `locale` translates dates only, so pass `strings` for "today",
  "selected", "unavailable". Pressing the selected day does nothing.
- **DropdownItem**: the menu item as a component for a Dropdown's custom
  `children`; takes its role from the Dropdown and joins the arrow-key order. A
  DropdownItem with custom children and a description is named by its content
  alone.
- **Stepper**: progress through a multi-step form. `steps` (labels or `{ label,
  description }`), `bind:current` (zero-based), `layout` (auto goes compact below
  30rem of its own width: it suits about five short labels; compact segments are
  narrower than 44px from seven steps with `interactive` on 320px), `size`
  (`sm`, `md`, `lg`), `strings`. Completed steps show a check, the current one
  its number, upcoming an outline; a navigation landmark with
  `aria-current="step"`; a step change is announced once. `interactive` makes
  completed steps buttons. It does not move focus: focus the new heading
  yourself. In Safari 16 and older it needs a width from its parent in a flex
  row.
- **PhotoGrid**: square thumbnails that open a viewer. `photos` (`src`,
  `thumbSrc`, `alt`, `width`, `height`, `caption`, `id`), `columns` (3, then 4
  and 5), `max` ("+N" tile), `onopen(index)`, `onadd` ("Add photo" tile),
  `selectable` (`"single"` or `"multiple"`, `bind:selected`,
  `bind:selectedKeys`; a single selection is never cleared by a repeat press and
  each tile gets an Open button). One Tab stop, lazy loading, placeholder and
  failure fallback. **PhotoViewer**: a full-screen dialog for them, `bind:index`,
  `bind:isOpen`, caption, counter, up to three `actions` (more in a menu).
  Swipe or arrows change photo; pinch, double tap, Ctrl+wheel or `+`/`-` zoom;
  drag pans; swipe down, Escape or the close button close it
  (`onclose({ reason })`). Focus returns to the tile; the thumbnail shows
  blurred until the full image loads; neighbours are preloaded; dark in both
  themes; safe areas. Double tap is timed from the touch events. Previous and
  Next at the ends keep their plate and dim only the arrow.
- **Avatar** and **AvatarGroup**: `Avatar` is a round picture falling back to
  initials (`name`, `src`, `size` `sm` 24, `md` 32, `lg` 48px, `alt`, `alt=""`
  for decorative, `locale`); initials come from the first and last word, are in
  the server markup and remain if the picture fails. They are `brand-200` on
  `brand-700` in the default light theme (the subtle primary pair, 4.5:1).
  `AvatarGroup` shows `people` overlapped as a list, up to `max` (default 4) and
  "+3" (`strings.more`), `locale`. Not interactive.
- **SwipeableListItem**: a row with one or two `actions` revealed by a swipe
  towards the inline start (touch and stylus; mirrored in RTL); a swipe only
  reveals, an action runs on press. The same actions are behind a "more"
  button (`showMoreButton`, on by default; with `false` offer another route).
  Bindable `open`, `onopenchange`, `strings.actions`; one row open per list.
- **PullToRefresh**: wraps a list; pulling down at the top calls `onrefresh`
  (touch only). Bindable `refreshing`, `disabled`, `threshold` (64px),
  `strings`. A Refresh button shown on keyboard focus does the same; a status
  region says "Refreshing" then "Updated". A rejected `onrefresh` ends the busy
  state silently: report the failure in the app. In controlled mode it says
  "Updated" whenever `refreshing` goes back to false.
- **`focusToasts()`** moves focus to the newest toast; focus returns when it is
  dismissed, also from inside an open overlay.

#### Existing components

- **ImageUpload**: `onbrowse` replaces the native chooser and
  `event.preventDefault()` in `onclick` keeps it closed. A video value (file
  type, extension, or `previewType`) renders a `<video>` with controls, never
  autoplaying; a `preview` snippet replaces the preview. `label` and `id` (the
  dropzone is a native `<button>`); Change and Remove are named from the label
  ("Change logo") or `changeLabel` and `removeLabel`; the preview takes `alt`.
  A dropped file is checked against `accept` and rejected through
  `onfilereject`. Copy props: `browseText`, `changeText`, `removeText`,
  `errorTitle`, `errorRecovery` (`false` leaves the line out), `selectedText`,
  `removedText` ("Image selected" / "Image removed" are announced);
  `actionsPlacement` (`"overlay"` or `"strip"`, strip by default for video).
- **IconButton**: `xs` size (24px, the minimum target; use `sm` or larger where
  touch is primary); `pressed` (bindable, `aria-pressed` and a pressed style in
  every variant; `event.preventDefault()` in `onclick` keeps the state; left
  undefined it renders no `aria-pressed`); `tone="danger"` on `ghost` or
  `outline` for a quiet destructive style. `href` on Button and IconButton
  renders a real link (`target`, `rel`, `download`); a disabled or loading link
  has no `href` and is `aria-disabled`.
- **Modal**: `portal` (renders in `document.body`; a theme class set below
  `<body>` does not reach it); `onclose({ reason: "escape" | "backdrop" |
  "close-button" })`; `dismissible={false}` (the close button stays focusable,
  `aria-disabled`; setting `isOpen` still closes); `role="alertdialog"`;
  `closeLabel` (default "Close"); `fullScreen` (or `"mobile"` below `md`);
  `initialFocus` (also on SlideUp); typed `aria-describedby`, `aria-busy`,
  `data-*`, `id`. SlideUp: `closeLabel`, `swipeToClose` (grip, downward swipe,
  calls `onclick`), a `footer` snippet kept above the keyboard.
- **Toast and Toaster**: `pushToast` takes `action: { label, onclick,
  dismissOnClick? }` (a button in the toast, announced with the message, closes
  after the handler unless `dismissOnClick` is `false`; the countdown pauses
  while pointer or focus is on it; give it a long `duration` or `0`; the
  `ToastAction` type is exported); `duration` takes `"short"` (3 s), `"medium"`
  (7 s), `"long"` (14 s), `"persistent"` or milliseconds, with `defaultDuration`
  on Toaster (`TOAST_DURATIONS`, `ToastDuration` exported); `strings` for every
  built-in word (`ToasterStrings`, `DEFAULT_TOASTER_STRINGS`), `aria-label`,
  `showCountdown`, `onpausechange({ id, paused })`, `data-paused`; `closeLabel`
  on Toast and Alert; `--toaster-bottom-offset` (72px clears a
  FloatingActionButton); other attributes pass to the region. A held finger
  pauses a toast, lifting resumes with at least 3 s left. Toasts do not fly
  under reduced motion; one with an action stays until dismissed.
- **Dropdown**: options take `icon`, `tone: "danger"` and `description` (the
  `DropdownOption` type is exported). `presentation` (`"auto"`, `"popover"`,
  `"sheet"`; default `"popover"`): in a sheet the same menu opens in a
  BottomSheet titled by the control's label; `<Dropdown presentation="sheet">`
  is the library's action sheet (`sheetTitle`, `sheetSnap`, `sheetCloseLabel`,
  `sheetExpandLabel`, `sheetCollapseLabel`, `fullWidth`, optional
  `ariaLabelledby`). Menu boxes report `data-resolved-placement`.
- **Select**: renders a real `<select>` on the server, the working control
  before hydration and with scripts off; on mount the custom list takes over,
  and a choice made before is kept and reported once; `presentation="native"`
  renders only the native select. `presentation` (`"auto"`, `"popover"`,
  `"sheet"`, `"native"`), `strings` (including `listLabel`;
  `DEFAULT_SELECT_STRINGS`, `SelectStrings`, `SelectPresentation` exported,
  also from atoms; the six text props still win). The chosen option has a check
  mark at the inline end and a fill, and every option carries `aria-selected`.
  A disabled Select submits its value once hydrated and not before; the inline
  message of a `required` Select is the browser's, in the browser's language; a
  label longer than one line is cut in the native select and wraps in the custom
  one, so the field can grow by a line.
- **Input, Textarea, Select**: `hint` and `error` (a hint is tied with
  `aria-describedby`, an error sets the error state and is announced;
  `variant` + `message` still work and your own `aria-describedby` is merged).
  Input takes `leading` and `trailing` snippets and, for `type="password"`,
  `revealable` (`revealLabel`, default "Show password", `aria-pressed`). Input,
  Textarea, Select, Checkbox, Radio, Toggle and ThemeToggle accept their
  element's native attributes (`autocomplete`, `inputmode`, `maxlength`,
  `enterkeyhint`, `data-*`); Table and Text pass other attributes on. Toggle
  takes `aria-label` and `aria-labelledby` ("Toggle" is only the last fallback).
  `Checkbox` is exported from the atoms entry.
- **Table**: `stacked` (or `"sm"`, `"md"`, `"lg"`) lays rows out as label and
  value pairs and drops the 20rem minimum; put `data-label` on each cell and
  keep the `<thead>`; `captionHidden` keeps the caption as the accessible name
  but hides it. A stacked cell keeps several children together on the value
  side; a cell without `data-label` puts its content there too; an empty cell
  leaves no blank line.
- **EmptyState**: `headingLevel` (1–6, default 2); `size="compact"` (tighter,
  smaller title, a plain `<div>` not a named region; the default is still a
  `<section>` named by its title).
- **TopNavbar**: nav items take `external` (default true for absolute URLs);
  `collapseAt` (`"sm"`, `"md"` default, `"lg"`, `"xl"`; `TopNavbarCollapseAt`
  exported).
- **Tabs**: `fullWidth` (for two or three tabs; scrolls when a share is too
  small for the longest word). The rule under Tabs is `border-border`; a
  selected pill uses `action-primary-subtle`.
- **SidebarShell**: `mobile="drawer"` hides the sidebar below `lg` and opens it
  in a Drawer from the start side: `bind:isOpen`, `trigger` snippet
  (`aria-expanded` wiring), `drawerTitle`, `closeLabel`, `onclose({ reason })`;
  it closes when a link is followed and when the screen widens past 1024px;
  `label` names the scrolling region (default "Navigation links").
  SidebarNavigation declares and passes these on. Default `mobile="none"`
  changes nothing.
- **Page**: `safeArea` (default true) pads left, right and bottom by
  `env(safe-area-inset-*)`; nothing inside an AppShell or where the insets are
  zero; your own `px-*` class replaces that side. Needs `viewport-fit=cover`.
- **Tooltip**: `touchDuration` (default `0`); one open at a time; a tooltip on a
  disabled button is tied to it with `aria-describedby`. Do not put essential
  information in a tooltip.
- **ColorPicker**: the colour map is two native sliders (saturation, lightness)
  in one Tab stop, working by keyboard (Shift moves ten steps), touch and pen;
  new strings `area`, `saturation`, `lightness`, `invalidHex`; the hue slider
  shows its focus ring and is 44px on a coarse pointer.
- **CodeBlock**: `copyLabel`, `copiedLabel`; "copied" is announced through a
  status region. **FormField**: `requiredLabel`.
#### Mobile and touch

- New props for phones: `Page` `safeArea`, `Modal` `fullScreen`, `SlideUp`
  `swipeToClose` and `footer`, `TopNavbar` `collapseAt`, `Tabs` `fullWidth`,
  `Tooltip` tap, `Select` and `Dropdown` `presentation`, `SidebarShell`
  `mobile="drawer"`, `Toaster` `--toaster-bottom-offset`. Components for them:
  AppShell, AppBar, BottomTabBar, BottomSheet, Drawer, StickyActionBar,
  FloatingActionButton, SwipeableListItem, PullToRefresh, PhotoViewer. Safe areas
  need `viewport-fit=cover`.

#### Accessibility

- A focus ring in forced colours: `.focus-ring`, the legacy `.focus-brand` and
  `.focus-nav`, and the checkbox and radio row draw an outline there. The
  current page has an outline in forced colours in SidebarNavigation,
  SidebarPanel and TopNavbar. In forced colours every option of a Select list
  has the same border and the chosen one is told apart by its check mark only.
- `docs/ACCESSIBILITY.md` has a "Library conventions" section (where focus goes
  when a focused control is removed, the shared overlay stack and scroll lock,
  disabled options, hover-revealed actions, focus in forced colours) and no
  longer lists fixed issues as open; `docs/KEYBOARD_NAVIGATION.md` describes
  what the components do.

#### Strings and hydration

- **`ZabiStringsProvider`**: wrap the app in `<ZabiStringsProvider
  strings={…}>` and every component under it uses those words unless an
  instance says otherwise. One entry per component with a `strings` object
  (including `avatarGroup`, `swipeableListItem`, `pullToRefresh`), keyed by prop
  name for components with single-text props (`toast`, `alert`, `codeBlock`,
  `imageUpload`, `unsavedChangesBar`), and a `common` group (close, back, expand,
  collapse, required, showPassword, search, confirm, cancel). Order, later wins:
  built-in English, provider, the instance's `strings`, its own text props. It
  is Svelte context (per request on the server, nestable, reaches portalled
  overlays); Modal, Drawer, SlideUp, BottomSheet, Toaster, Rating and the
  components above read it; landmark `ariaLabel`s are not covered.
  `getZabiStrings()`, `DEFAULT_ZABI_COMMON_STRINGS` and the types are exported.
  No translations ship; the README has a complete Swedish example. Nothing
  changes outside a provider.
- **Every built-in text can be replaced**: `strings` on TopNavbar,
  SidebarFooter, SidebarAccountPanel, SidebarNavigation, SidebarBrandHeader,
  ColorPicker, ContactForm, PropsTable, ComponentDemo, Select, Toaster, Stepper,
  Calendar, MediaGrid, SortableList, Rating, PullToRefresh. The README's "Texts
  and other languages" lists the prop for each component.
- **A choice made before the page hydrates is kept.** A Checkbox, Radio,
  RadioGroup, Rating, SegmentedControl or Select changed in the server's markup
  was set back at hydration; the bound value now follows the native input and
  the change callback fires once (a form reset still returns to the rendered
  value). A bound Select value with no matching option is kept and submitted as
  itself.
- **No component drops keyboard focus on hydration** (Heading, Text,
  CardHeader, AppBar's title, EmptyState's heading, Container, AppShell,
  Collapsible); a guard fails the build if a dynamic element comes back.

#### Package and build

- Exports and package fields are listed under Upgrade notes. `zabi-components/types`
  matches the components again (see Fixed). `npm run build:css` works in a fresh
  checkout with no `dist/`.
- The docs site honours `data-theme`, and Storybook's toolbar Theme control
  drives its sidebar, toolbar and docs pages. `docs/theme-imports.md` says what
  to expect when Tailwind and `zabi-components/css` are combined (the compiled
  stylesheet carries its own copy of each utility, so import order decides: with
  Tailwind in the app import `theme-only` and `theme-dark-only` instead).
  `THEME.md` no longer tells apps to import the compiled stylesheet after
  `theme-only` or to use `theme()` for a colour. `THEME_QUICK_REFERENCE.md`
  shows the current primary colour and dark mirror; `docs/VARIANTS.md`, the
  README, the Storybook introduction and the showcase guide cover the new
  components. The component docs site examples are written in English. The
  site's catalog sidebar is a drawer below 1024px and its "On this page" list
  marks the section being read; the site sets `viewport-fit=cover`.

### Changed

- **Light mode has a visible surface ladder.** `--color-surface-base`,
  `--color-page` and `--color-background-tertiary` move from `base-100` to
  `base-150`; `--color-surface-elevated` from `base-50` to `base-100`; a card is
  1.18:1 on the page (was 1.10) and a nested card 1.10:1 (was 1.04).
  `--color-card-active` and `--color-surface-overlay-hover` are `base-150`.
- **Light tinted fills read on a white card.** `--color-<family>-subtle` moves
  from step 100 to 200 and `--color-<family>-border` from 200 to 300 for
  success, warning, error, energetic and info (1.36:1 on a card, was 1.16);
  `--color-neutral-subtle` is `base-250`, `--color-neutral-border` `base-300`;
  `--color-action-primary-subtle` and `-subtle-hover` are `brand-200` and
  `brand-300`.
- **Light hover and secondary fills are stronger.** `--color-surface-hover` and
  `--color-surface-active` are 9% and 15% ink (were 6% and 11%);
  `--color-action-secondary`, `-hover`, `-active` are 10%, 15%, 20% (were 7%,
  12%, 17%).
- **Overlays have an edge in light** (`--color-border-overlay` is a 10% ink tint,
  was transparent); **light shadows are stronger** (`--shadow-color` `24 24 27`,
  `--shadow-opacity` 0.14; were `0 0 0` and 0.1).
- **Light fields and disabled controls follow the new page**:
  `--color-input-hover` `base-100`, `--color-input-disabled` the page colour,
  `--color-action-disabled` `base-250`, `--color-action-disabled-border`
  `base-300`.
- **Focus tokens**: `--color-focus` is `brand-600` in both themes;
  `--color-focus-weak`, `-medium`, `-strong` each move one step;
  `--color-nav-menu-focus` follows `--color-focus`; `.focus-ring--muted` (ghost
  and link buttons, the AppBar back control, the SortableList handle) reads
  `--color-focus-ring-muted`, 3.7:1 or more on every surface level (dark was
  `base-500`, 2.49:1 on elevated, 1.98:1 on overlay). Dark mode otherwise keeps
  its values: `.dark` restates the values it used to inherit.
- **Dark mapping**: `--color-action-primary-text` follows `--color-on-brand`;
  dark `--color-base-*` steps alias the mirrored `--zabi-base-*` step; the dark
  block holds no raw palette and no hex value.
- **Menus share one edge and surface**: Dropdown, NavigationMenuContent and the
  ColorPicker popover use `border-border-overlay` on `bg-surface-overlay` (the
  ColorPicker popover no longer sits on the inset field colour in dark). Dropdown
  menus and Select lists use the 16px overlay radius, and Select's search field
  and options sit 4px closer to the list's edge. ColorPicker's popover and
  NavigationMenu's panels use the overlay radius.
- **Nested corners are concentric** where a rounded element sits closer to its
  container's corner than that corner's radius: the Card in a Modal, the avatar
  in SidebarFooter's profile button, MediaGrid's check mark (a rounded square)
  and video badge, Alert's close button, ListItem rows in a `.list-group`.
- Input, Textarea and Select text is 16px below 640px (also ColorPicker's hex
  field and the search fields in Select and the sidebars); sizes unchanged from
  `sm` up and control heights unchanged.
- **Checked checkboxes and radios use the primary action fill**, tick and dot in
  the primary button's text colour (was a paler step at 2.8:1 on the light page).
- Input, Select and Textarea darken their border on hover in light
  (`--color-input-border-hover`); error, success, warning and disabled fields
  are unchanged. Select's trigger placeholder uses the placeholder colour.
- Table and PropsTable sit on the card surface with an elevated header band;
  Skeleton and Header's variant chips use `bg-neutral-subtle`.
- Sidebar search fields, the selected panel item, the elevated panel and the
  profile button use full-strength rings instead of 40–80% alpha ones; dashed
  empty states keep only their dashed border. SidebarNavigation's search
  placeholder keeps 4.5:1 on hover.
- **Controls are 44px on touch** (`@media (pointer: coarse)`): Button, IconButton,
  Input and the Select trigger at `sm` and `md` (`lg` is 48px already; use it
  for the main action on a phone), and Slider rows, Checkbox, Radio and Toggle
  rows, Tabs, Collapsible triggers, Dropdown items, Select options (48px),
  NavigationMenu, TopNavbar and Sidebar items, SortableList controls and toast
  buttons. The close buttons of Alert, Toast, Modal, SlideUp and Drawer and the
  Toggle switch keep their size and take taps in a 44px area. IconButton `xs`
  stays 24px.
- **Every pressable control shows a `:active` state**; a disabled Toggle or Tab
  no longer shows one. A toggled-on ghost, outline, link or danger-tone
  IconButton shows a pressed fill distinct from hover and 1.25:1 or more from
  rest. The selected pill Tab's pressed fill is 1.42:1 from rest (was 1.24:1)
  and its label keeps 4.89:1.
- SlideUp pads its content for the bottom safe area and is at most `90dvh`
  (was `90vh`); Modal is at most `90dvh`.
- **Tabs scroll sideways when they do not fit**, with a fade on the edge that has
  more, and bring the selected and keyboard-focused tab into view; labels no
  longer wrap or squeeze.
- **Toasts**: sit above the tab bar and home indicator (the stack clears
  `--app-shell-bottom-inset` and the bottom safe area; below `sm` it spans the
  width with 16px gutters; a `viewport` Toast at the top clears the top safe
  area and an AppShell header); keep clear of an overlay's footer (16px above
  it, or at the top when there is no room; a centred desktop Modal changes
  nothing); take the larger free stretch above the panel or between header and
  footer, scrolling there, without covering an overlay's title and close button;
  sit above the on-screen keyboard; `--toaster-bottom-offset` is not added on top
  of an overlay's footer. Tab moves from an overlay's last control to the toast
  controls and back, and Escape in a toast returns focus without closing the
  overlay. Padding, gaps and button targets are in px and the status icon stays
  20px at enlarged text (a two-sentence toast at 375px and 200% text is at most
  420px tall, was 594px); buttons wrap under the title when it would get less
  than 8rem; the stack is capped to the screen and scrolls. The countdown says
  "1 second", not "1 seconds".
- **Tooltip**: flips or slides to stay 8px inside the viewport, also with a
  mouse; below 640px a `left` or `right` tooltip opens above or below; a tap
  opens it when the finger comes up where it went down, so a scroll that starts
  on the trigger no longer flashes it; `data-placement` reports the side used.
- **Overlays stay above the on-screen keyboard** where it covers the page; the
  focused field is scrolled into view.
- **Overlay headers stay compact at large text sizes.** In BottomSheet, Modal,
  Drawer and SlideUp the header's padding, gaps, grip and close button are in px
  and the title grows to 1.3 times and stops; at 200% text a half-height sheet
  gives the content 378 of 576px (was 182). Titles break at a hyphen in the
  page's language and a too-long word no longer sticks out of Drawer or SlideUp.
- **Select fills its container** and no longer changes width with the chosen
  option; its trigger is a `combobox` reporting `aria-invalid` (with `error`, the
  error variant or a failed `required` check), `aria-required` and `aria-busy`;
  `required` blocks an empty form, shows the browser's message as the error and
  focuses the trigger; a long label wraps; the form control is a `<select
  name>`; a reset returns it to its rendered value; it opens as a sheet on a
  phone; the chevron and the Dropdown panel do not animate under reduced
  motion; keyboard focus in the native select moves to the trigger at handover;
  `aria-label` and `aria-labelledby` name the native select too; with several
  empty required Selects only the form's first invalid control takes focus.
- **A loading Button or IconButton** is `aria-disabled` and `aria-busy` (see
  Upgrade notes); a loading link keeps its place in the Tab order. Button labels
  wrap (`min-height`: 32, 40, 48px; 44px minimum on touch).
- **A disabled Dropdown option stays focusable** (`aria-disabled`).
- **A toast with an action stays until dismissed** unless given a `duration`;
  with no duration a toast closes after 7 s (see Upgrade notes); a message with
  no title is the toast's text.
- **ThemeToggle** (two modes) has the name "Dark mode" and applies the stored
  choice on mount in both modes; it no longer writes an inline `color-scheme`
  and removes a stale one, so adding or removing `class="dark"` from your own
  script moves native controls with the tokens.
- **EmptyState at `size="compact"`** is a plain `<div>`.
- **ImageUpload** fills its container; `id` names the control; Change and Remove
  appear on `:focus-visible` (not any focus), wrap and truncate in a narrow
  container, stay visible on coarse pointers and where hover is unavailable, and
  sit on an opaque plate so "Change" is readable over any image (it was 2.59:1 in
  dark over a light image).
- **`font-sans` and `font-mono` follow the theme.**
- **A List row with nothing to do is plain content**; a disabled plain ListItem
  row no longer carries `aria-disabled`.
- Checkbox and Radio inputs are stretched invisibly over their box.
- Textarea and Select status messages use the same text colour step as Input's.
- **Icons are imported one file at a time** from `@lucide/svelte/icons/<name>`,
  not the `@lucide/svelte` barrel: an app importing one Button from the root
  compiles 366 modules where it compiled 3,800 (233 from
  `zabi-components/atoms`). The re-exported icons keep their names.
- The `viewport` prop on NavigationMenu only sets `isMobile` on the context for
  your own children; it has no effect of its own, and the docs now say so.
- **`Toast`/`Alert`/`CodeBlock`/`ImageUpload`/`UnsavedChangesBar`** follow
  `ZabiStringsProvider`.

### Deprecated

- **Modal's `onclick` is deprecated as a close signal.** It is still called with
  the event on Escape, a backdrop click and the close button; use `onclose`.
- In `zabi-components/types`, members that were exported but never existed
  (`open`, `className`, `position`, Button's `ariaLabel` and icon props) stay as
  optional and deprecated so existing code keeps compiling.

### Fixed

- **`strings` props and `ZabiStringsProvider`:** a key set to `undefined` keeps
  the English default instead of blanking the text (`null` and an empty string
  are still honoured).
- **`Progress`:** a passed `id` is on the wrapper only (it appeared on the
  wrapper and the bar); `aria-valuenow` is clamped to 0..`max`; a non-positive
  or non-finite `max` falls back to 100; new `aria-label` and `aria-labelledby`
  props name the progressbar.
- **`ColorPicker`:** Escape closes the popover and returns focus to the swatch
  (and does not close a Modal around it); opening by keyboard moves focus in;
  typing a hex redraws the colour map; with a `label`, the hex input and swatch
  are named by it. Its popover could be placed below the viewport at 320px; a
  press on a toast no longer closes it.
- **`Select`:** the popover listbox is named by the field's label (still "Select
  options" with no label); **`Dropdown`** gets an optional `ariaLabelledby`
  prop. Arrow keys get past a disabled option. The Select trigger's pressed
  state shows in light (was the resting fill) and is 1.27:1 against rest in
  light and 1.31:1 in dark (was 1.10:1). A Select no longer changes its value
  when the page hydrates. A disabled Select dims its value. Dropdown and Select
  return focus to the trigger when the menu closes from inside it; focus your
  own handler moved elsewhere is left alone. A Select list and a Dropdown menu
  are one Tab stop: Shift+Tab goes to the search field in one step, and a
  character typed on an option goes to the search field or the matching item.
  A press on a toast no longer closes an open Select or Dropdown.
- **`SwipeableListItem`:** a long action label wraps (it was clipped at the start
  at 200% text), the action area is capped at two thirds of the row, and the
  "more" button stays 44px at any text size. With `showMoreButton={false}` focus
  has nowhere to return to after an action.
- A long Modal title no longer squeezes the close button or runs out of the
  panel (the title wraps, also inside a single long word; the close button keeps
  32px).
- A Tooltip with `strategy="fixed"` no longer covers its trigger when it opens
  above or to the left; a closed tooltip no longer widens the page; it has an
  edge in forced colours, is centred correctly in RTL and its arrow points at its
  trigger in RTL; only one tooltip is open at a time and the pointer can cross a
  diagonal to its far corner. Escape with a tooltip showing dismisses the
  tooltip only, not the modal or sheet it sits in.
- A Dropdown stays on screen: measured before paint, it flips when the preferred
  side does not fit, slides back when neither does and is capped to the viewport
  with its own scroll only when it must be (8px margin). `placement` is still
  the preferred side; a menu that fits is positioned as before. A Dropdown, Select
  list or NavigationMenu panel is no longer cut off by a scrolling or clipping
  ancestor such as a Modal's content (the nearest clipping ancestor decides the
  side; when it fits on neither it is positioned against the viewport; an
  ancestor with a transform or filter cannot be escaped), and a menu leaves a
  clipping container only when that puts it on screen. A height-capped Dropdown
  scrolls inside its rounded panel. Dropdown follows the writing direction
  (`bottom-start` and `top-start` sit on the start edge, item text aligns to it).
- NavigationMenu fits a narrow screen: the list wraps onto further rows and a
  content panel slides back inside the viewport. A press on a toast no longer
  closes a NavigationMenu panel or the TopNavbar menu.
- TopNavbar's phone menu closes after a link in it is followed, when
  `currentPath` changes, on Escape (focus returns to the menu button), on a click
  or focus move outside the bar and when the screen widens past the breakpoint;
  a press on a control behind the open menu still reaches it. It is at most as
  tall as the screen below the bar and scrolls, allows for the top safe area,
  its links fill the row, and `aria-controls` on the menu button is set only
  while the menu exists. The menu button stays on screen with a long brand or
  enlarged text (the brand truncates below the breakpoint).
- Toasts fit a 320px screen (the 18rem minimum width no longer overflows); the
  close button takes taps in its full 44px area; `aria-controls` on the expand
  button is set only while the detail is open; focus no longer falls to the page
  after "Okay" or "Click to stop" is pressed; dismissing the focused toast moves
  focus to the next toast or back to where it was; a tap neither sticks nor
  dismisses; toasts do not fly in or out under `prefers-reduced-motion`.
- A disabled Checkbox, Radio or RadioGroup row no longer dips, changes fill or
  shows the pressed fill when pressed or hovered; stacked checkbox and radio
  rows no longer overlap on touch; the row shows its hover
  (`--color-surface-hover`, `--color-surface-active`, was a fixed `base-100`).
  Checkbox shows its loading ring (replacing the tick, fading under reduced
  motion).
- Alert's close button shows the library's focus ring and mirrors in RTL.
- State variants beside a semantic colour class work: the hand-written colour
  classes sit outside every cascade layer, so `text-description
  hover:text-headline` never changed on hover. Thirteen such variants the
  components use are restated by hand (the hover colour of close buttons, the
  hover border of outline buttons, the disabled text colour of fields and ghost
  buttons).
- Accent hover and pressed states work: `hover:bg-accent-hover` and
  `active:bg-accent-active` did nothing next to `bg-accent`.
- An overlay opened later is always on top: Modal and SlideUp take a z-index
  that grows with the number of open overlays, so a modal opened from a portalled
  one no longer opens behind it; a modal opened while a portalled drawer is open
  (and the reverse) is drawn on top.
- Modal and SlideUp keep Tab inside, and still close on Escape, when focus has
  fallen out of the dialog because the focused control was disabled or removed.
  A modal or sheet with nothing focusable takes focus itself. Modal, Drawer,
  SlideUp and BottomSheet no longer take focus from content that focused itself
  inside the panel as it opened. Focus returns to a replaced element (the one
  that now has the opener's id) instead of `<body>`. Modal and SlideUp do not
  slide in under `prefers-reduced-motion`.
- The focus ring survives a shadow: `.focus-ring` on an element with a `shadow-*`
  or `ring-*` utility (also `shadow-none`) drew no ring (the SidebarNavigation
  search field, the selected SidebarPanel row, an interactive Card, any
  IconButton given a shadow); it now composes. A List no longer clips the focus
  ring of its rows.
- Placeholder contrast: placeholder text and the format hint of an empty
  DateField or TimeField was 3.40:1 on a dark field and 4.40:1 on a hovered light
  one; see Upgrade notes. A disabled field's placeholder is no stronger than a
  disabled value.
- Native controls follow the dark theme under `.dark` as well as `data-theme`
  (scrollbars, date and time pickers, other native form controls, autofill); a
  page that sets `color-scheme` on `<html>` keeps its value.
- Hover colours no longer stick after a tap: the hand-written `:hover` rules in
  the theme files (`.bg-action-primary:hover` and 41 more) now sit in `@media
  (hover: hover)`.
- ImageUpload keeps keyboard focus (to Change after a selection, to the dropzone
  after Remove, untouched when focus is elsewhere), cancels a file dropped while
  `disabled`, its actions layer no longer takes clicks meant for the preview, its
  error message is tied to the Change button when a preview is showing, and a
  disabled dropzone no longer takes the primary border on hover.
- ActionPanel shows its hover and pressed states (the fill is drawn over the
  card). A selected Tabs pill shows its pressed state and a selected List row its
  selected border. ListItem rows show a hover and a pressed fill.
  SidebarFooter's avatar ring used a colour token that does not exist and now uses
  the border colour. A `dark:` variant in Section's accent background, which
  followed the OS setting and never applied, was removed.
- ThemeToggle shows the right icon before it mounts (both icons are in the
  markup and the `dark` class picks one); it works with `data-theme`.
- ConfirmDialog no longer draws a focus outline around the whole dialog while
  loading and sets no `aria-busy` on the panel.
- A Badge with a long label wraps: it is at least 20, 24 or 28px tall, grows when
  the label wraps and is never wider than its container; a one-line badge is
  unchanged to the pixel and a wrapped one reads as a rounded rectangle.
- An AppBar's title is never squeezed out (see AppBar).
- Keyboard focus is visible in forced colours (see Accessibility).
- **`zabi-components/types` matches the components again.** Every exported
  `*Props` interface declares the props its component accepts today: `ModalProps`
  has `isOpen`, the interfaces have `class`, and the new props are there.
  `SelectProps.options`, `AlertProps.message` and `TooltipProps.content` are
  optional, as on the components.
- A bindable prop bound to `undefined` no longer stops the page from hydrating
  (RadioGroup threw, and 36 other bindable props could); see Upgrade notes.
- Button and IconButton (including `variant="accent"`) do not scale when pressed
  under `prefers-reduced-motion`; built-in loading rings (Button, IconButton,
  Input, Textarea, ActionPanel, Toggle) fade instead of spinning, Checkbox's
  ring stops; Toggle's loading ring has its gap back.
- Input, Textarea and Select no longer point `aria-describedby` at a message that
  is not rendered.
- `fullWidth` Tabs scroll instead of breaking a word; BottomSheet's grip answers
  a mouse click; a flick on a sheet is measured from the events' own times.
- Drawer content clears the home indicator; MediaGrid's remove button shows a
  pressed state on touch; SidebarAccountPanel's three-mode theme row follows a
  theme changed elsewhere; CodeBlock announces "copied".
- The brand menu in the docs site header stays on screen (it opened past the
  right edge at 768px and 1024px); the Pine and Citron accents follow the Iris
  recipe in light (fill at step 600 with a white label, focus ring at step 600;
  Pine's light ring was 1.93:1 on the page, now 4.19:1); `theme-color` follows
  the theme toggle; the site's cards carry `shadow-sm` and the showcase uses
  surface tokens in place of raw ramp steps.
- README links to RELEASING.md point at the repository, and the README says to
  install `@lucide/svelte` and import icons per file.

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

