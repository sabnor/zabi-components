# Theming guide

An app gives the whole library its own brand from one generated file of token
overrides. There is no component CSS to write and nothing to repeat for dark
mode.

This guide is the token API. The tokens under
[Tokens an app may set](#tokens-an-app-may-set) and
[Roles: read them, do not set them](#roles-read-them-do-not-set-them) are
public: renaming or removing one is a breaking change (see
[Stability](#stability)).

The same guide, with a brand switcher to try it on real components, is on the
docs site at [/theming](https://zabi-components.vercel.app/theming).

- [The first thing to know: your colour is not pinned to a step](#the-first-thing-to-know-your-colour-is-not-pinned-to-a-step)
- [Quick start](#quick-start)
- [Import order](#import-order)
- [Tokens an app may set](#tokens-an-app-may-set)
- [Roles: read them, do not set them](#roles-read-them-do-not-set-them)
- [Light, dark and auto](#light-dark-and-auto)
- [Text and controls on a brand or accent block](#text-and-controls-on-a-brand-or-accent-block)
- [Component-level properties](#component-level-properties)
- [The generator](#the-generator)
- [What does not follow an override](#what-does-not-follow-an-override)
- [Stability](#stability)
- [Reference: how the theme is built](#reference-how-the-theme-is-built)
- [For maintainers](#for-maintainers)

## The first thing to know: your colour is not pinned to a step

**Need the exact brand colour on buttons? Use `--pin`.**
`npx zabi-theme --brand "#0026EA" --pin` makes the primary button `#0026ea`
itself in light, with a checked label colour. The rest of this section is what
happens without it, and [`--pin`](#--pin-the-exact-brand-colour-on-buttons)
has the trade-off.

`zabi-theme` takes one brand colour and builds an 11-step ramp from it. The
colour supplies the **hue and chroma**. The lightness of each step comes from
the library's own curve (see [Calibrated colour ramps](#calibrated-colour-ramps)),
so step 600 is as dark as every built-in 600 and every role keeps the contrast
it was designed with.

So the exact hex you give may not be in the ramp, and it is usually not the
colour of the primary button:

| You give | Nearest step | Primary button, light (step 600) | Primary button, dark (step 400) |
|---|---|---|---|
| `#0026EA` | 800, `#0024e1` (ΔE 3.5) | `#2b65ff` | `#84acff` |
| `#C17B00` | 500, exact | `#9b6200` | `#d99f58` |

`#0026EA` is darker than a 600, so it lands near step 800 and the button is the
lighter `#2b65ff`. The header of the generated file, the command's summary line
and `closest` from `createTheme()` all name the nearest step.

A very bright colour has no step that bright at its chroma. `#FFE600` lands
nearest step 300 at ΔE 14.8, and the generator says so:

```
zabi-theme: warning: brand #ffe600 is not in the ramp built from it: the nearest step is 300 (#dcc600, ΔE 14.8). The ramp keeps its hue on the library's lightness curve; fills use step 600 in light and 400 in dark.
```

If the brand colour itself has to be the button, use
[`--pin`](#--pin-the-exact-brand-colour-on-buttons). If it only has to appear
somewhere (a logo plate, a brand screen), use the step the generator names
(`var(--zabi-brand-500)` for the amber above), not the hex.

## Quick start

1. Generate the brand file. Commit it; the output has no timestamp, and the
   same input gives the same bytes.

   ```bash
   npx zabi-theme --brand "#C17B00" --neutral "#78716c" --out src/lib/brand.generated.css
   ```

2. Import it after the theme files.

   ```css
   /* src/lib/theme.css — the app's brand */
   @import "zabi-components/theme-only";
   @import "zabi-components/theme-dark-only";
   @import "./brand.generated.css"; /* --zabi-brand-*, --zabi-accent-*, --zabi-base-* */

   :root {
     --font-family-heading: "Your Display Font", var(--font-family-sans);
   }
   ```

   ```css
   /* src/app.css */
   @import "tailwindcss";
   @import "./lib/theme.css";
   ```

3. Choose how dark mode is selected, on `<html>`.

   ```html
   <html lang="en" data-theme="auto">
   ```

That is the whole rebrand: primary actions, focus rings, links, tints, text,
borders, the page, cards and the dark surface levels follow, in light and dark.

## Import order

| Order | Import | Why here |
|---|---|---|
| 1 | `tailwindcss` | The theme files are Tailwind v4 `@theme` blocks. |
| 2 | `zabi-components/theme-only` | Declares every token, light values, and the raw ramps. |
| 3 | `zabi-components/theme-dark-only` | Only remaps roles for dark. It declares no ramp, so it does nothing without the light theme. |
| 4 | your generated file | `:root` overrides. After both theme files, so they win in dark as well. |
| 5 | your own `:root { … }` | Fonts, radius and anything else from the tables below. |

Keep the brand file last. `:root`, `.dark` and `[data-theme="dark"]` have the
same specificity, so between them the later rule wins: a brand file imported
before the dark theme loses, in dark, every token the dark file restates (a
role moved with `--set`, `--shadow-color`). The ramps happen to apply from
either position in a Tailwind build, because Tailwind puts the theme's own
values in a cascade layer and your `:root` rule is outside it. With
`zabi-components/colors`, which is plain CSS, an override placed before the
import does nothing at all.

If the app has no Tailwind, `zabi-components/css` replaces steps 1 to 3 (see
[docs/theme-imports.md](./docs/theme-imports.md)); the brand file still goes
after it.

Set the overrides on `:root`, not on an element further down. The roles are
resolved on the root element, so `--zabi-brand-600` set on a `<section>`
changes nothing inside it.

## Tokens an app may set

Set these on `:root`, after the imports. One declaration covers light and dark
unless the table says otherwise. All of them were checked in a browser against
the built theme files.

### Colour

`zabi-theme` writes every token in this table. Write them by hand only if you
have your own ramps.

| Token | Steps | What follows |
|---|---|---|
| `--zabi-brand-50` … `--zabi-brand-950` | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 | Primary actions, focus rings, links, brand tints, `--color-primary*` |
| `--zabi-accent-50` … `--zabi-accent-950` | the same 11 | `--color-accent` and its roles: `bg-accent`, `text-accent`, `border-accent`. Defaults to the citron ramp. |
| `--zabi-base-50` … `--zabi-base-950` | 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 925, 950 | Text, borders, inputs, the page, cards and the four dark surface levels |
| `--zabi-on-brand` | | Label on a primary fill in light. Default `#ffffff`. |
| `--zabi-on-brand-dark` | | The same in dark. Default `var(--zabi-brand-950)`. |
| `--zabi-on-accent` | | Label on a solid accent fill in light. Default `#ffffff`. |
| `--zabi-on-accent-dark` | | The same in dark. Default `var(--zabi-accent-950)`. |

Each ramp runs light (50) to dark (950). Light mode puts fills on step 600;
dark mode mirrors the ramp, so the fill is step 400.

A ramp you write by hand should keep the library's lightness per step, or the
contrast the roles were designed with is gone. Run it through
`zabi-theme --set` to have it checked (see [`--set`](#--set-and-overrides)).

### Type

| Token | Default | What follows |
|---|---|---|
| `--font-family-sans` | `'Nunito Sans', ui-sans-serif, system-ui, sans-serif` | Body text and every component |
| `--font-family-heading` | `var(--font-family-sans)` | `h1` to `h6` and the Heading component |
| `--font-family-mono` | `"Monaco", "Menlo", "Ubuntu Mono", monospace` | CodeBlock |
| `--font-weight-regular` | `400` | `font-normal` |
| `--font-weight-medium` | `500` | `font-medium` |
| `--font-weight-semibold` | `600` | `font-semibold` |
| `--font-weight-bold` | `700` | `font-bold` |

Loading the font files is up to the app. The heading face is applied in the
base layer, so a `font-*` utility on a heading still wins.

Tailwind's own font utilities follow these tokens: `font-sans` is
`--font-family-sans`, `font-mono` is `--font-family-mono`, and `font-heading`
is `--font-family-heading`. The theme maps Tailwind's `--font-sans` and
`--font-mono` (and a `--font-heading` of its own) onto them. Before 8.1
`font-sans` was Tailwind's system stack, so `class="font-sans"` on a heading
dropped it out of the brand face. Set the `--font-family-*` tokens, not the
short names: the short ones follow.

### Shape, depth and stacking

| Token | Default | What follows |
|---|---|---|
| `--radius-control` | `0.5rem` | Buttons, inputs, selects, toggles |
| `--radius-container` | `0.75rem` | Cards, alerts, panels, list items, code blocks |
| `--radius-overlay` | `1rem` | Modals, sheets, menus, popovers, toasts |
| `--radius-pill` | `9999px` | Badges, avatars, status dots |
| `--shadow-color` | `24 24 27` (dark: `0 0 0`) | The colour of `shadow-sm` and `shadow-lg`, as three space-separated RGB channels |
| `--shadow-opacity` | `0.14` (dark: `0.3`) | Their strength |
| `--z-dropdown`, `--z-sticky`, `--z-fixed`, `--z-modal-backdrop`, `--z-modal`, `--z-popover`, `--z-tooltip`, `--z-toast` | 1000 to 1080 | The layer of each floating component, when the app has its own stacking order to fit into |

The two shadow tokens are the only ones here with a separate dark value. A
`:root` override after the imports replaces both; to keep two values, declare
the dark one under the dark selectors (see
[One role in dark only](#one-role-in-dark-only)).

### Not on the list

These tokens exist, and their names are kept, but setting them does not restyle
the components:

- `--spacing-xs` … `--spacing-2xl` feed the `p-md`, `gap-lg` utilities for your
  own markup. Components use Tailwind's numeric scale.
- `--control-height-sm`, `-md`, `-lg` record the 32, 40 and 48px control
  heights. Components set those heights with `h-8`, `h-10` and `h-12`.
- `--radius-sm`, `-md`, `-lg`, `-xl` are legacy aliases. No component uses them.
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` are built from the
  two shadow tokens above. Set those instead.

## Roles: read them, do not set them

A role says what a colour is for. Components paint with roles, and your own CSS
should too: `var(--color-action-primary)` or the `bg-action-primary` class, not
`var(--zabi-brand-600)`. A role is already the right step in each mode.

| Roles | For |
|---|---|
| `--color-action-primary`, `-hover`, `-active`, `-text`, `-subtle`, `-subtle-hover` | Primary buttons and controls. The same set exists for `secondary` and `danger`; `--color-action-disabled`, `-disabled-text`, `-disabled-border` for disabled ones. |
| `--color-on-brand`, `--color-on-accent` | Text on a primary fill and on a solid accent fill |
| `--color-accent`, `-hover`, `-active`, `-subtle`, `-border`, `-text` | The second brand colour |
| `--color-focus-ring`, `--color-focus-ring-offset`, `--color-focus` | The focus ring and the gap around it |
| `--color-focus-ring-muted` | The neutral ring of ghost and link controls (`.focus-ring--muted`); 3:1 or more on every surface level |
| `--color-focus-ring-danger` | The ring of a destructive control (`.focus-ring--danger`). It is `--color-error`; a role of its own so that a brand or accent block can re-point it |
| `--color-control-border` | The edge of a control that has nothing else to be seen by, such as an empty Rating star; 3:1 or more on every surface level |
| `--color-link`, `--color-link-hover` | Links |
| `--color-headline`, `--color-body`, `--color-description`, `--color-caption`, `--color-label` | Text |
| `--color-surface-base`, `-raised`, `-elevated`, `-overlay`, `-inset` | The page, cards, nested cards, floating panels, wells |
| `--color-surface-hover`, `--color-surface-active`, `--color-surface-overlay-hover` | Hover and pressed fills |
| `--color-border`, `-weak`, `-medium`, `-strong`, `--color-border-overlay` | Borders and dividers |
| `--color-input`, `-border`, `-border-hover`, `-hover`, `-active`, `-focus`, `-disabled`, `-placeholder` | Form fields; `-active` is the pressed Select trigger |
| `--color-<family>`, `-weak`, `-medium`, `-strong`, `-subtle`, `-border`, `-text` | `success`, `warning`, `error`, `info`, `energetic`, `neutral` (see [Semantic families](#semantic-families)) |

Aliases kept from earlier versions resolve to the same values: `--color-background`,
`--color-card`, `--color-surface-1` … `-4`, `--color-primary*`,
`--color-secondary*`, `--color-page`.

**Why not set them.** A role set on `:root` after the imports is one value for
both modes: it replaces the dark value as well, and nothing checks its
contrast. If one role has to move, do it through the generator, which checks
it: see [`--set`](#--set-and-overrides).

**Do not set `--color-brand-*`, `--color-accent-<step>` or `--color-base-*`
either.** Those are the mirrored steps: `--color-brand-600` is
`--zabi-brand-600` in light and `--zabi-brand-400` in dark. Set on `:root`
after the imports, one of them becomes the same colour in both modes and stops
mirroring. Override the `--zabi-*` ramp instead.

### One role in dark only

Declare it under all three dark selectors, after the imports:

```css
.dark,
[data-theme="dark"] {
  --color-link: var(--zabi-brand-200);
}

@media (prefers-color-scheme: dark) {
  [data-theme="auto"] {
    --color-link: var(--zabi-brand-200);
  }
}
```

## Light, dark and auto

The mode is chosen on the `<html>` element, by an attribute or a class:

| On `<html>` | Result |
|---|---|
| nothing | light, also on a dark system |
| `data-theme="light"` | light |
| `data-theme="dark"` | dark |
| `data-theme="auto"` | follows the system (`prefers-color-scheme`) |
| `class="dark"` | dark, the same as `data-theme="dark"` |

- **Following the system is opt-in.** A page with no attribute and no class
  stays light on a dark system, as it always has. `data-theme="auto"` needs no
  script.
- **`<html>` only.** A `.dark` or `data-theme` on an element further down is
  not supported. It re-themes the roles the dark file restates (the card
  surface, the label on a primary button) and leaves the rest (text, borders,
  the primary fill) light, so the subtree comes out half dark.
- `color-scheme` comes with the theme, so what the browser draws itself (date
  and time pickers, scrollbars, autofill) matches: dark under `.dark`,
  `data-theme="dark"` and `data-theme="auto"` on a dark system, and light
  everywhere else, a page with no class and no attribute included. That
  overrides a `<meta name="color-scheme">` tag, so the page needs neither the
  tag nor an inline `color-scheme` on `<html>`; `ThemeToggle` writes none and
  removes a stale `light` or `dark` one. Before 8.1 only the attributes set
  it.
- The dark file must be imported together with a light one. It only remaps
  roles onto ramps the light theme declares.
- Tailwind's own `dark:` variant follows the system unless you redefine it, and
  does not read `data-theme`.

### A theme control: system, light, dark

`ThemeToggle` reads the mode from `<html>` and follows whatever else changes
it.

| | Press | Writes |
|---|---|---|
| `<ThemeToggle />` (`modes="two"`) | light ↔ dark | `data-theme` when `<html>` has the attribute, the `dark` class otherwise. It is a switch named "Dark mode" (`labels.darkMode`), with `aria-pressed` for its state |
| `<ThemeToggle modes="three" />` | system → light → dark → system | always `data-theme` (`auto`, `light` or `dark`); it adds the attribute and removes a leftover `dark` class |

With two modes, a press on a page that is on `auto` sets `light` or `dark`, and
there is no way back to `auto` from that button. An app whose default is
`data-theme="auto"` wants three modes.

The three-mode button shows a monitor, a sun or a moon, and its accessible name
states the mode and what a press does: "Theme: system. Switch to light". The
words are replaceable:

```svelte
<ThemeToggle
  modes="three"
  labels={{
    auto: "följ telefonen",
    light: "ljust",
    dark: "mörkt",
    describe: (current, next) => `Tema: ${current}. Byt till ${next}`,
  }}
/>
```

**Remembering the choice.** The choice is kept in `localStorage` under
`storageKey` (default `"theme"`) and applied again when the button mounts, with
two modes and with three, on a `data-theme` page and on a class page: the
two-way button on a `data-theme="auto"` page that finds `"dark"` stored sets
`data-theme="dark"`.
`storageKey={null}` keeps nothing. To store it in your own backend, bind the
mode or listen for it:

```svelte
<ThemeToggle modes="three" storageKey={null} bind:mode onmodechange={(mode) => saveToProfile(mode)} />
```

`mode` is `"auto" | "light" | "dark"`. It follows the page, and assigning it
switches the page.

**No flash on load.** A component mounts after the first paint, so a visitor
who chose dark would see light first. `themeInitScript(storageKey?)` returns a
small script that applies the stored mode from `<head>`. It is a plain string
with no dependencies. In SvelteKit, print it once and paste it into
`src/app.html`, or inject it from `hooks.server.ts`:

```html
<!-- src/app.html -->
<html lang="sv" data-theme="auto">
  <head>
    <script>
      (function(){try{var m=localStorage.getItem("theme");if(m!=="auto"&&m!=="light"&&m!=="dark")return;var r=document.documentElement;if(r.hasAttribute("data-theme")||m==="auto"){r.setAttribute("data-theme",m);r.classList.remove("dark")}else{r.classList.toggle("dark",m==="dark")}}catch(e){}})();
    </script>
    %sveltekit.head%
```

```ts
// src/hooks.server.ts: the same, generated, so it follows the package.
// Put %theme-init% in the <head> of src/app.html where the script should go.
import { themeInitScript } from "zabi-components";

export const handle = ({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%theme-init%", `<script>${themeInitScript()}</script>`),
  });
```

With nothing stored the script does nothing, and the `data-theme` in your
markup stands.

**Your own control.** A settings screen usually wants three labelled options,
not a cycling button. Drive the theme with the same helpers and any
`ThemeToggle` on the page follows:

```svelte
<script lang="ts">
  import { onMount } from "svelte";
  import { SegmentedControl, getThemeMode, setThemeMode, type ThemeMode } from "zabi-components";

  let mode = $state<ThemeMode>("auto");
  onMount(() => (mode = getThemeMode()));
</script>

<SegmentedControl
  label="Tema"
  options={[
    { value: "auto", label: "Följ telefonen" },
    { value: "light", label: "Ljust" },
    { value: "dark", label: "Mörkt" },
  ]}
  value={mode}
  onchange={(value) => {
    mode = value as ThemeMode;
    setThemeMode(mode); // or setThemeMode(mode, { storageKey: null }) and save it yourself
  }}
/>
```

| Helper | |
|---|---|
| `getThemeMode()` | `"auto"`, `"light"` or `"dark"`, from `data-theme`; without the attribute, `"dark"` with the `dark` class and `"light"` without. |
| `setThemeMode(mode, { storageKey? })` | Writes `data-theme`, removes a leftover `dark` class and inline `color-scheme`, stores the choice (`storageKey: null` stores nothing). |
| `isThemeDark()` | Whether the page is dark right now; on `auto` that is the system's answer. |
| `getStoredThemeMode(storageKey?)`, `storeThemeMode(mode, storageKey?)` | The stored choice. |
| `themeInitScript(storageKey?)` | The `<head>` script above, as a string. |

All of them are safe to call on the server, where they read `"light"` and
write nothing.

```js
document.documentElement.dataset.theme = "dark"; // "light" | "auto"
// or
document.documentElement.classList.toggle("dark");
```

## Text and controls on a brand or accent block

A block filled with the brand colour (`bg-action-primary`) or the accent
(`bg-accent`) is not a surface level: the text roles (`--color-headline`,
`--color-body`) are chosen for the page and for cards, and on a brand fill
they are about 2:1 to 3.7:1. Three things make a block work.

**1. Say what the block is.** Add `on-brand` beside `bg-action-primary`, or
`on-accent` beside `bg-accent`:

```svelte
<section class="bg-action-primary on-brand rounded-container p-6">
  <Heading level={2} tone="inherit">Dagens quiz</Heading>
  <Text tone="inherit">Tio frågor om Sverige.</Text>
  <Button variant="accent">Spela</Button>
</section>
```

The class sets the block's text colour to the fill's label colour
(`--color-on-brand` or `--color-on-accent`). For everything inside the block
it re-points the focus rings, and the roles a control writes with when it has
no fill of its own (see 3).

**2. Give text a tone that belongs on a fill.** `Heading` and `Text` take:

| `tone` | Colour | Use |
|---|---|---|
| `inherit` | the block's own text colour | inside `on-brand` / `on-accent`, or any block that sets a colour |
| `on-brand` | `--color-on-brand` | on `bg-action-primary`, wherever the element is |
| `on-accent` | `--color-on-accent` | on `bg-accent` |

`Heading` is `tone="headline"` by default and `Text` `tone="body"`. Inside a
block both roles are the block's label colour, so the defaults are legible
there too; `inherit` says it outright, and is what works on a block of a
colour of your own.

**3. Controls on the block.** A control with no fill of its own writes with
the page's roles: a Checkbox's label is `--color-label`, an outline Button's
`--color-headline` with a `--color-border` edge, help text
`--color-description`. On a brand fill those were 1.5:1 to 3.7:1. Inside
`on-brand` and `on-accent` they are re-pointed at the block's label colour:

- the text roles: `--color-headline`, `--color-body`, `--color-label`,
  `--color-description`, `--color-caption`, `--color-link`,
  `--color-link-hover`
- the edges: `--color-border`, `--color-border-medium`,
  `--color-border-strong`, `--color-control-border`
- the rings: `--color-focus-ring`, `--color-focus-ring-muted`,
  `--color-focus-ring-danger`, `--color-nav-menu-focus`, with the gap
  (`--color-focus-ring-offset`) in the block's own colour

So every one of them measures what the label colour measures against the
fill, which the theme holds to 4.5:1 (`scripts/check-contrast.js` fails when a
block stops re-pointing one, or points it at something that does not read):

| Inside | Default theme, light | Default theme, dark | `#0026EA` pinned + `#FDD715` pinned accent, light | The same, dark |
|---|---|---|---|---|
| `on-brand` | 4.86 | 7.21 | 8.52 | 7.07 |
| `on-accent` | 5.02 | 7.11 | 11.66 | 11.66 |

That is the label of a Checkbox, Radio, Toggle, Input, Select, Textarea and
Rating, a field's help text, `Text` and `Heading` in their default tones, a
plain link, the label of an `outline`, `ghost` and `link` Button and
IconButton, the border of an `outline` one, and the focus ring of all of
them, the danger ring included. They were, on a brand block in the default
theme: labels 2.15 (light) and 1.52 (dark), `outline` and `ghost` 3.65 and
2.05, `link` 1.39 and 1.34, the danger ring 1.06 and 1.04.

The Button variants, on a brand block (`bg-action-primary`). "Label" is
against the button's own fill, or against the block where the button has
none; "fill" is the button's fill against the block (3:1 for the button to be
seen as a shape):

| `Button variant` | Default theme, light | Default theme, dark | `#0026EA` + `#FDD715` pinned, light | The same, dark |
|---|---|---|---|---|
| `outline`, `ghost`, `link` | label 4.86 | label 7.21 | label 8.52 | label 7.07 |
| `secondary` | label 5.65 | label 7.75 | label 9.58 | label 7.63 |
| `accent` | label 5.02, fill 1.03 | label 7.11, fill 1.03 | label 11.66, fill 6.05 | label 11.66, fill 1.60 |
| `danger` | label 4.78, fill 1.06 | label 7.10, fill 1.04 | label 4.78, fill 1.65 | label 7.10, fill 1.03 |
| `primary` | the block's own colour: invisible | invisible | invisible | invisible |

On an accent block (`bg-accent`):

| `Button variant` | Default theme, light | Default theme, dark | `#0026EA` + `#FDD715` pinned, light | The same, dark |
|---|---|---|---|---|
| `outline`, `ghost`, `link` | label 5.02 | label 7.11 | label 11.66 | label 11.66 |
| `secondary` | label 5.86 | label 7.73 | label 9.43 | label 11.92 |
| `primary` | label 4.86, fill 1.03 | label 7.21, fill 1.03 | label 8.52, fill 6.05 | label 7.07, fill 1.60 |
| `danger` | label 4.78, fill 1.03 | label 7.10, fill 1.01 | label 4.78, fill 3.66 | label 7.10, fill 1.65 |
| `accent` | invisible | invisible | invisible | invisible |

So the quiet variants (`outline`, `ghost`, `link`, `secondary`) are legible on
either block in any theme. A solid one keeps its own label; whether it also
stands out as a shape depends on how far apart the two brand colours are: an
ultramarine and a yellow are 6:1 apart in light, the library's own blue and
citron 1.03:1. Where they are close, use a quiet variant for a second action,
or put the action on a card.

**What a block cannot make legible: put it on a card.** Some parts of a
control are not written with a role that a block can re-point. They are drawn
with a neutral step, with the primary fill itself, or with a status colour.
Against the block:

| Part | On a brand block (default light, dark; pinned light, dark) | On an accent block |
|---|---|---|
| Checkbox or Radio box, and the Toggle track, empty | 1.89, 3.44; 3.32, 3.43 | 1.96, 3.35; 1.82, 5.49 |
| the same, ticked or on, and a filled Rating star (the primary fill) | 1.00 in all four | 1.03, 1.03; 6.05, 1.60 |
| the text of an error or other status message | 1.47, 1.31; 1.19, 1.31 | 1.42, 1.34; 5.07, 1.22 |
| the fill of a field (Input, Select, Textarea) | 4.86, 7.31; 8.52, 7.30 | 5.02, 7.12; 1.41, 11.67 |

The label of such a control is legible on the block and the control itself
may not be: a ticked Checkbox on a brand block is a tick with no box around
it. Put Checkbox, Radio, Toggle, Calendar and anything that shows a validation
message on a card inside the block. A field is a surface of its own and
carries its text; it only disappears on an accent as light as the field (the
pinned yellow, 1.41). Rating has properties for its colours
(`--zabi-rating-on`, `--zabi-rating-off`, below).

**A surface inside a block is a surface again.** Anything inside the block
that paints a surface (a `Card`, a field, an `Alert`, a `list-group`: the
`bg-card`, `bg-surface-*`, `bg-input` and `bg-*-subtle` fills) gets the
theme's own roles back, and its own text colour, so a card needs nothing: a
Checkbox on it has the page's label colour and the theme's focus ring. For a
background the library cannot recognise (an inline style, a class of your
own), add `on-surface`:

```svelte
<section class="bg-action-primary on-brand p-6">
  <Button variant="outline">Hoppa över</Button>
  <div class="on-surface rounded-container p-4" style="background: #fffbeb">
    <Checkbox label="Kom ihåg mig" />
  </div>
</section>
```

A block inside that surface is a block again.

**The focus ring.** The default ring (`--color-focus-ring`) is the primary
fill, so on a brand block it measures 1.00:1 against the background and only
its 2px gap shows; the danger ring is the error colour, 1.0:1 to 1.7:1 there.
Inside a block every ring is the block's label colour and the gap is the
block's colour: the numbers of the first table above.

To do the same on a block of another colour, set the colour and the ring on
it yourself, and give text `tone="inherit"`:

```css
.my-block {
  color: #ffffff;
  --color-focus-ring: #ffffff;
  --color-focus-ring-offset: #7a1f5c; /* the block's own colour */
}
```

The roles of 3 are not re-pointed there: a quiet Button or a Checkbox on such
a block keeps the page's colours. Re-point the ones you need the same way
(`--color-label: #ffffff`, `--color-headline: #ffffff`, `--color-border:
#ffffff`), and then mark any card inside it `on-surface` and set them back
there.

## Component-level properties

A few components read custom properties of their own, for colours that are not
roles of the theme. They are not tokens: the theme does not declare them, and
they do not appear in the generated files. Set them on the component, or on
anything around it; they inherit.

| Component | Property | What it colours | Default |
|---|---|---|---|
| `Rating` | `--zabi-rating-on` | a filled star | `--color-action-primary`; `--color-accent` with `tone="accent"` |
| `Rating` | `--zabi-rating-on-hover`, `--zabi-rating-on-active` | the same under the pointer and while pressed | `--zabi-rating-on` if you set it, else the tone's hover and pressed roles |
| `Rating` | `--zabi-rating-on-edge` | the outline of a filled star | the fill; `--color-accent-text` with `tone="accent"` |
| `Rating` | `--zabi-rating-off` | the outline of an empty star | `--color-control-border` |

```svelte
<Rating label="Betyg" tone="accent" bind:value />

<!-- or a colour of your own, here for every rating in a block -->
<section class="bg-action-primary on-brand" style="--zabi-rating-on: var(--color-accent); --zabi-rating-off: var(--color-on-brand)">
  <Rating label="Betyg" bind:value />
</section>
```

A star is a control whose shape has to be seen (3:1 against what it sits on).
`tone="accent"` fills the star with the accent and outlines it in the accent's
text step, because an accent can be a colour no fill can show on white:

| Filled star, `tone="accent"` | page | card | inset |
|---|---|---|---|
| Default accent, light: fill / outline | 4.25 / 5.93 | 5.02 / 7.00 | 4.56 / 6.37 |
| Default accent, dark: fill / outline | 7.68 / 10.34 | 6.54 / 8.81 | 7.12 / 9.60 |
| `#FDD715` pinned, light: fill / outline | 1.19 / 5.94 | 1.41 / 7.01 | 1.28 / 6.38 |
| `#FDD715` pinned, dark: fill / outline | 12.58 / 10.27 | 10.71 / 8.75 | 11.67 / 9.53 |

A yellow star cannot reach 3:1 on a white card: its fill is 1.41:1 there. The
outline keeps the star's shape at 7:1, so the stars are always there to see.
What tells a filled star from an empty one on white is then the yellow inside
the outline and the outline's own colour, which is less than 3:1; the rating
also has its value as text (`showValue`, on by default when `readonly`) and in
its accessible name. On a dark or a brand block the yellow fill itself is
6:1 or more. If you set `--zabi-rating-on` to a light colour yourself, set
`--zabi-rating-on-edge` too.

## The generator

Exact brand colour on buttons: use `--pin`.

```bash
npx zabi-theme --brand "#0026EA" --pin --out src/lib/brand.generated.css
```

Without it, every fill is a step of a ramp built from the colour:

```bash
npx zabi-theme --brand "#0026EA" --out src/lib/brand.generated.css
npx zabi-theme --brand "#C17B00" --accent "#ff3366" --neutral "#78716c" --out src/lib/brand.generated.css
```

| Option | |
|---|---|
| `--brand <hex>` | Required. Builds `--zabi-brand-50 … 950`. |
| `--pin` | The primary action is the exact brand colour in light. See [`--pin`](#--pin-the-exact-brand-colour-on-buttons). |
| `--accent <hex>` | Builds `--zabi-accent-50 … 950`. Omitted: the library's citron. |
| `--pin-accent` | The same for the solid accent fill. Needs `--accent`. |
| `--neutral <hex>` | Tints the 21-step `--zabi-base-50 … 950`. Omitted: the library's greys. |
| `--out <file>` | Where to write. Omitted: stdout. |
| `--strict` | Exit 1 when a role pair is below WCAG AA. |
| `--set <token>=<value>` | Also write this declaration; repeatable. |
| `--help` | Usage. |

Colours are hex, `#rgb` or `#rrggbb`. Warnings and the one-line summary go to
stderr. Exit codes: 0 done, 1 `--strict` with a failed pair, 2 bad usage
(missing `--brand`, not a hex colour).

### `--pin`: the exact brand colour on buttons

Unpinned, the primary button is step 600 of the ramp: for `#0026EA` that is
`#2b65ff`, visibly lighter than the brand. With `--pin` the ramp is the same
ramp, and the roles that *are* the brand colour are written as role overrides:

| | Unpinned | `--pin` |
|---|---|---|
| Primary button, light | step 600, `#2b65ff` | the colour itself, `#0026ea` |
| Its label | white, 4.76:1 | white, 8.52:1 |
| Hover, pressed | steps 700, 800 | the same hue, darker by the same distances: `#0100c4`, `#000e78` |
| Focus ring, links, checked boxes | steps 600 and 700 | the colour itself, because every guarded pair still passes |
| Tints and borders (`-subtle`, `-border`), `--color-brand-*` | on the ramp | on the ramp, unchanged |
| Dark | step 400, `#84acff` | step 400, `#84acff`: not pinned |

What it decides, and how:

- **The fill is never moved.** If the colour fails a pair, the pair is a
  warning (and `--strict` exits 1). `#C17B00` pinned is 2.92:1 against the
  light page, where a button needs 3:1, and the generator says so.
- **The label** is white or the ramp's 950 step, whichever reaches 4.5:1 on the
  fill and both its states. An amber gets the dark label, and its hover and
  pressed states go lighter, since darker states would lose the label.
- **Focus ring and links follow only if they pass.** The ring needs 3:1 on
  every surface and a link 4.5:1 on the page and on a card. A yellow passes
  neither, so both stay on the ramp. The header lists which followed.
- **Dark is not pinned unless the colour passes there.** `#0026EA` is 2.08:1
  against a dark page and 1.77:1 against a dark card, where a fill needs 3:1:
  no label makes that a button. Dark keeps the
  mirrored step 400, exactly as without `--pin`, and the header says so. A
  colour that does pass in dark (the amber, the yellow) is pinned there too,
  with lighter states.

The trade-off: a ramp step is guaranteed to pass, in both modes, for any
colour. A pinned colour is exact and passes only if the colour can. Unpinned,
a brand rarely warns; pinned, read the warnings.

The file then has three rules, not one: `:root` with the ramp and the light
roles, and the dark values of those roles under `.dark, [data-theme="dark"]`
and under `[data-theme="auto"]` in the dark media query. A role set on `:root`
alone would be one value in both modes. To force a dark value the generator
declined, write the role in your own dark rule after the file (see
[One role in dark only](#one-role-in-dark-only)).

A role you pass with `--set` is left to you in both modes: `--pin` does not
write it.

### What it does

- **Brand and accent ramps** on the library's lightness curve, from the hue and
  chroma of the colour you give. See
  [the first section](#the-first-thing-to-know-your-colour-is-not-pinned-to-a-step).
- **Neutral ramp.** It keeps the base scale's own 21 lightness steps and takes
  only the hue, at low chroma. A saturated colour gives a tinted grey, not a
  coloured page.
- **"On" colours.** It sets `--zabi-on-brand` and `--zabi-on-brand-dark` (and
  the accent pair when `--accent` is given) to white or the ramp's 950 step,
  whichever reaches 4.5:1 on the fill, its hover and its active step.
- **Contrast check.** Every pair the library holds itself to is resolved in
  light and dark with the new ramps in place: 4.5:1 for text and
  3:1 for focus rings and UI parts.

### What it does not do

- It does not put your exact hex in the ramp. `--pin` puts it on the primary
  action; the ramp steps stay on the curve.
- It does not write fonts, radius or shadow unless you pass them with `--set`.
- It does not check the hover, pressed and secondary-button alpha tints. They
  are not part of the contrast list.
- It does not check that a `--set` token exists. A misspelt name is written as
  given.
- It does not load or check fonts.

### Warnings

A plain brand passes, because the ramps share the library's curve. Warnings
come from two places.

An input that will not give the ramp its author probably expects:

```
zabi-theme: warning: brand #808080 has almost no colour in it, so the ramp is a grey scale. Give a more saturated colour for a visible hue.
```

A role pair below AA, which only happens when `--set` moves a role or `--pin`
pins a colour that cannot carry it:

```
zabi-theme: warning: light · on-brand label on primary: #2f1b00 on #9b6200 is 3.24:1, needs 4.5:1 (--color-on-brand on --color-action-primary)
```

### `--strict` in CI

Without `--strict` a failed pair is a warning and the file is still written.
With it the command exits 1. Because the output is deterministic, one line
checks both that the brand passes and that the committed file is current:

```bash
npx zabi-theme --brand "#C17B00" --neutral "#78716c" --strict --out src/lib/brand.generated.css && git diff --exit-code src/lib/brand.generated.css
```

### `--set` and overrides

`--set` writes one more declaration into the file. It applies in light and in
dark, and it takes part in the contrast check and in the choice of the "on"
colours.

```bash
npx zabi-theme --brand "#C17B00" --set "--color-link=var(--color-brand-800)" --out src/lib/brand.generated.css
npx zabi-theme --brand "#C17B00" --set '--font-family-heading="Fraunces", var(--font-family-sans)' --out src/lib/brand.generated.css
```

Point a role at a **semantic** step, `var(--color-brand-800)`, not at a
physical one. The semantic step mirrors in dark; `var(--zabi-brand-800)` is
the same dark brown in both modes, and as a link colour it fails in dark:

```
zabi-theme: warning: dark · link on page: #613b00 on #18181b is 1.8:1, needs 4.5:1 (--color-link on --color-surface-base)
```

### `createTheme()`

The same thing as a function, for a build script:

```js
import { writeFileSync } from "node:fs";
import { createTheme } from "zabi-components/create-theme";

const { css, tokens, warnings, closest } = createTheme({
  brand: "#C17B00",
  accent: "#ff3366", // optional
  neutral: "#78716c", // optional
  overrides: { "--color-link": "var(--color-brand-800)" }, // optional
  pin: true, // optional: the exact brand on the primary action; or { brand: true, accent: true }
});

for (const warning of warnings) console.warn(warning.message);
console.log(`Brand is closest to step ${closest.brand.step} (${closest.brand.hex}).`);

if (warnings.some((warning) => warning.type === "contrast")) process.exit(1);
writeFileSync("src/lib/brand.generated.css", css);
```

| Returned | |
|---|---|
| `css` | The stylesheet: a header comment and one `:root { … }` rule. With `pin`, two dark rules follow it. |
| `tokens` | Every declaration of the `:root` rule, name to value. |
| `darkTokens` | Only with `pin`: every declaration of the dark rules. |
| `pinned` | Only with `pin`: `{ brand?, accent? }`, each `{ hex, light: { followed, onRamp, states }, dark: { pinned, followed, onRamp, states?, failed? } }`. |
| `warnings` | `{ type: "contrast", pair, mode, ratio, required, foreground, background, message }` for each role pair below AA, and `{ type: "input", option, message }` notes about the colours given. Empty when everything passes. |
| `closest` | `{ brand, accent?, neutral? }`, each `{ step, hex, deltaE, exact }`: where the input landed in its ramp. |

It throws a `TypeError` when `brand` is missing, a colour is not hex, or
`pin.accent` is set without `accent`. Without `pin` the result and the file are
exactly what they were before the option existed.

## What does not follow an override

- **Hover, pressed and secondary-button fills.** `--color-surface-hover`,
  `--color-surface-active` and `--color-action-secondary` are fixed near-black
  (light) and near-white (dark) alpha tints. They do not take the hue of
  `--zabi-base-*`. At 8 to 15% the hue of the ink is not visible.
- **The overlay edge and the modal backdrop.** `--color-border-overlay` in
  light and `--color-overlay` are fixed alpha tints too.
- **The shadow colour.** `--shadow-color` is the default neutral's ink, not
  your neutral's. Set it yourself; it is on the list above.
- **The `energetic` family.** It points at the citron ramp, not at the accent,
  so it stays yellow when `--zabi-accent-*` changes. `success`, `warning`,
  `error` and `info` keep their own ramps as well.
- **The size of the dark surface steps.** The four dark levels are mixed from
  your neutral ramp, so they take its hue. The mix amounts were solved for the
  default greys; a neutral whose 900 or 50 step is far from `#18181b` /
  `#fafafa` gives steps of a different size.
- **Browsers without `color-mix()`.** Where Tailwind compiles the dark file
  (your build, or the `zabi-components/css` bundle) it adds the default hex as
  a fallback before each mixed surface. Those browsers get the default dark
  surfaces whatever the app overrides.
- **Tokens set below `<html>`.** See [Import order](#import-order).
- **Semantic steps.** `--color-brand-*` and friends do not rebrand both modes;
  see [Roles](#roles-read-them-do-not-set-them).

## Stability

Every token named in [Tokens an app may set](#tokens-an-app-may-set) and
[Roles](#roles-read-them-do-not-set-them) is public API, and so is every other
token the theme files publish. **Renaming or removing one is a breaking
change.** Adding a token is not. Regenerating the library's own ramps is
breaking too, because it changes every colour an app has not overridden.
`RELEASING.md` says the same from the release side.

This is enforced, not just promised.
`tests/__snapshots__/theme-token-names.snap.json` lists every published token
name. `npm run test:themes` reads the names out of the built
`zabi-components/colors` file and fails if one on the list is missing. The
list only grows: refreshing the snapshots adds new names and never drops one,
so taking a name off is a hand edit of that file in a commit, which is where a
breaking change gets noticed.

The CSS export paths (`zabi-components/theme-only` and the rest) are public in
the same way: removing one is breaking.

---

## Reference: how the theme is built

Background for the tables above. An app does not need any of it to rebrand.

### Which step does what

The brand scale is used throughout the system:

- **brand-50 to brand-100**: Subtle backgrounds, hover states
- **brand-300 to brand-400**: Light accents, disabled states
- **brand-500**: Medium emphasis
- **brand-600**: **Primary buttons** (`action-primary`) and the focus ring, in both modes
- **brand-700**: Primary hover, links
- **brand-800**: Primary active, link hover
- **brand-900 / 950**: Darkest brand shades

Hover and active always move *toward* the dark end in light mode. The `.dark`
mirror flips that automatically, so "more pressed" means "more contrast against
the page" in both themes. Never point `-active` at a step on the far side of the
ramp — that is how the pressed primary label ended up at 1.66:1.

### Calibrated colour ramps

Every chromatic ramp (`brand`, `citron`, `pine`, `iris`, `warning`, `error`) is
**generated against one shared lightness curve**, so `<ramp>-600` means the same
perceptual lightness in every ramp. That is what lets the semantic families read
as one family instead of six unrelated colours.

| step | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| CIE L\* | 97 | 94 | 88 | 80 | 70 | 58 | **47** | 38 | 29 | 20 | 12 |

Step **600** is the solid-fill step: dark enough to clear 4.5:1 against white,
light enough to still read as a colour. Every semantic token points at it.

- **Source of truth:** `tokens/chromatic-scales.js` — hue and peak chroma per
  ramp. The target curve, the chroma envelope and the solver are in
  `create-theme/lib/ramp-math.js`, which the theme generator ships, so a
  generated brand sits on the same curve.
- **Regenerate:** `node scripts/generate-ramps.js` (runs inside `npm run sync:tokens`).
- **Verify:** `node scripts/check-ramp-lightness.js` — fails if any step drifts
  more than ±1.5 L\* off the curve, or if two adjacent steps differ by more than
  15 L\* (a cliff rather than a ramp).

To change the library's own ramps, edit `hue` / `peakChroma` for a ramp in
`tokens/chromatic-scales.js` and re-run the generator. **Do not hand-edit
`--zabi-<ramp>-*` in `src/app.css`** — the generator overwrites them. They live
in `@theme` only; `.dark` no longer holds a copy. (An app rebrands by overriding
them on `:root` instead; see [Tokens an app may set](#tokens-an-app-may-set).)

`--zabi-accent-*` is not a generated ramp: each step aliases the citron step of
the same number.

The `base` (neutral) ramp is deliberately **not** on this curve: it is wider on
purpose because it also drives text, borders and the surface levels. Semantic
`neutral` aliases the base step closest to the chromatic 600s.

### Semantic families

Each family exposes the same roles, built from the same steps:

| token | step | use |
|---|---|---|
| `--color-<family>` | 600 | solid fill — badge `emphasis="solid"`, progress bars |
| `--color-<family>-weak` | 700 | pressed / emphasis |
| `--color-<family>-medium` | 800 | strongest fill |
| `--color-<family>-strong` | 900 | darkest |
| `--color-<family>-subtle` | 200 (dark: 100) | tinted fill — badges, alerts |
| `--color-<family>-border` | 300 (dark: 200) | tinted edge |
| `--color-<family>-text` | 700 | text on a subtle fill or a page surface |

Families: `success`, `warning`, `error`, `info`, `energetic`, `neutral`.

`accent` has the subtle trio on the same steps, and action-style `-hover` (700)
and `-active` (800) instead of `-weak` / `-medium` / `-strong`.

The tints are the one role that does not simply mirror. A step-100 fill is
1.16:1 on a white card, too pale to read as a fill, so light uses steps 200 and
300 (1.36:1 and about 1.7:1). Mirrored, those would be too heavy on a dark
surface, so `.dark` pins 100 and 200. `neutral` follows the same shape on the
base ramp: `base-250` fill and `base-300` edge in light, `base-300` and
`base-200` in dark.

Prefer the **subtle** trio (`-subtle` fill + `-border` edge + `-text` label) for
anything informational. Solid fills are for the one element on a screen that has
to shout.

### Surface elevation levels

Every surface uses one of four semantic levels. Use these tokens instead of raw `base-*` steps for backgrounds:

| Level | Token / utility | Use for | Light (OKLCH L) | Dark (OKLCH L) |
|---|---|---|---|---|
| Base | `--color-surface-base` · `bg-surface-base` | Page / app shell (the darkest level in both themes) | `base-150` · 94 | `--zabi-base-900` `#18181b` · 21 |
| Raised | `--color-surface-raised` · `bg-surface-raised` | Cards, panels, sidebars | `#ffffff` · 100 | 6.4% wash `#262629` · 27 |
| Elevated | `--color-surface-elevated` · `bg-surface-elevated` | Nested cards, hover and active fills | `base-100` · 97 | 13.1% wash `#363638` · 33 |
| Overlay | `--color-surface-overlay` · `bg-surface-overlay` | Modals, sheets, dropdown/select menus, navigation panels, toasts | `#ffffff` · 100 | 19.7% wash `#454547` · 39 |
| Inset | `--color-surface-inset` · `bg-surface-inset` | A recessed area on a raised surface: a well, a stat strip, a code sample inside a card | `base-100` · 97 | `base-150` `#1f1f22` · 24 |

**Inset is not a fifth rung.** The four levels say how far a surface is lifted;
inset says it is cut into the card it sits on. It is the ramp step between the
page and the raised surface in both themes, about 3 lightness points below
`raised`, and every text token passes AA on it. In dark it is the step the input
field has always used, and `--color-input` now points at it. In light it shares
`base-100` with `elevated`: under a white card the only direction left is down,
so a nested card and a well are the same colour there and differ only in dark.
Do not use `--color-input` for a well. It is white in light mode, because a
light field is a raised surface.

Supporting tokens:
- `--color-surface-overlay-hover` (`bg-surface-overlay-hover`): row and icon-button hover **inside** an overlay. It is lighter than the overlay in dark mode.
- `--color-border-overlay` (`border-border-overlay`): 1px edge on overlays. A 10% ink tint in light mode, so a white menu on a white card has an outline; a solid step in dark mode.

**The light ladder runs downwards.** Light cannot go lighter than white, so
below the card it is ordered page → elevated → raised, with overlay equal to
raised and separated from it by `shadow-lg` and the overlay edge. The page is
`base-150`, not `base-100`: at `base-100` a card was 1.10:1 on the page and a
nested card 1.04:1 on its parent.

**The dark levels are generated, not hand-picked.** The page is
`--zabi-base-900`, and each level above it is `--zabi-base-50` — the same light
as the dark hover tint `--color-surface-hover` — washed over the page at
6.4% / 13.1% / 19.7%, so every level is literally the level below it with more
light on it. The ladder lives in `tokens/surface-ladder.js`; edit the alphas
there and run `npm run sync:tokens`, never the values in `app.css`.

The levels ship as `color-mix()` over the neutral ramp, not as baked hex:

```css
--color-surface-base: var(--zabi-base-900);
--color-surface-raised: color-mix(in srgb, var(--zabi-base-50) 6.4%, var(--zabi-base-900));
```

That is how the ladder follows an app's `--zabi-base-*` override: a warm grey
gets four warm dark levels, with no surface tokens of its own. Mixing two
opaque colours in sRGB is the same arithmetic as the old build-time composite,
so the default theme resolves to exactly the hex in the table, and an overlay
is still opaque. The static checks evaluate the mix themselves
(`scripts/resolve-tokens.js`), so `check-contrast.js` still resolves every AA
pair against a dark surface and `check-surface-elevation.js` still measures the
steps. The trade is unchanged: nesting past the four levels is not automatic. A
card inside a card does not self-lighten, it names the next level up.

Two things to know. The step size depends on the app's neutrals: the alphas are
solved for the default greys, and a ramp whose 900 or 50 step is far from
`#18181b` / `#fafafa` can land outside the 5–8 point window the guard holds the
default to. And wherever Tailwind compiles the dark file (the
`zabi-components/css` bundle, or an app's own build) it adds a static fallback,
the default hex, before each mix for browsers without `color-mix()`; those get
the default dark surfaces whatever the app overrides.

**Why dark mode steps lightness instead of using shadows:** a drop shadow simulates light blocked by a raised object, which reads on a light page. On a dark page the shadow is as dark as the background, so the signal disappears. In dark mode each level is therefore **lighter** than the one below it, by +6 OKLCH lightness points on the neutral base hue. Light mode keeps white surfaces and uses shadows for elevation.

**Rules:**
- Anything that floats above content must use a lighter level than what it floats over. Floating components (Modal, SlideUp, Dropdown/Select menu, NavigationMenu panel, Toaster/Toast) use `bg-surface-overlay`.
- Hover fills on overlays use `bg-surface-overlay-hover`, not `bg-base-*`, which would go darker in dark mode.
- Existing tokens remain as aliases: `background` → base, `card` / `surface-1` → raised, `surface-2` / `card-hover` → elevated, `surface-3` → overlay (dark), `card-elevated` → overlay (light) / elevated (dark).

**Enforced by** `scripts/check-surface-elevation.js`, which `validate-theme.js` runs during `npm run build:css`. It fails when:
- dark levels aren't strictly increasing;
- any dark step is outside 5–8 OKLCH L points;
- the light levels are not ordered base < elevated < raised, either step is under 2 points, or the overlay is darker than raised;
- the inset surface is less than 2 points below raised, or darker than the page, in either theme;
- a text token falls below AA on any level or on the inset surface;
- overlay hover or tooltip fills are darker than the overlay;
- a floating component paints a surface class below overlay.

To retune the dark levels, edit `SURFACE_ALPHA` in `tokens/surface-ladder.js`, run `npm run sync:tokens`, and then `node scripts/check-surface-elevation.js`.

> The light surface tokens must stay **below** the `/* Background Colors */` marker in `@theme`. `scripts/sync-theme-tokens.js` regenerates everything between the base-scale aliases and that marker.

### Interaction fills

Hover and active fills are **surface-relative alpha tints**, not fixed ramp steps:

```css
/* light */
--color-surface-hover:  rgba(9, 9, 11, 0.09);
--color-surface-active: rgba(9, 9, 11, 0.15);
/* dark */
--color-surface-hover:  rgba(250, 250, 250, 0.08);
--color-surface-active: rgba(250, 250, 250, 0.14);
```

A fixed step can coincide exactly with the surface it sits on — `base-100` in
dark mode *is* `--color-surface-base`, which is how ghost-button hover became
invisible. `check-token-violations.js` now fails on `hover:bg-base-*` /
`active:bg-base-*` in component source, in `src/routes` and in the `@apply`
lines of `src/app.css`.

Being one step away is not the same as being visible. `check-contrast.js`
composites each tint over every surface level and requires 1.2:1 for the
resting hover and the secondary button, and a further 1.08:1 for each state
after it. Light hover was 6% ink, 1.14:1, and passed every check until then.

Use `hover:bg-surface-hover` / `active:bg-surface-active` for quiet controls, and
the `action-*-hover` / `action-*-active` tokens for filled ones.

**State variants next to a hand-written colour class.** `text-description`,
`border-border`, `bg-card` and the other semantic colour classes are written by
hand in `src/app.css`, outside every cascade layer, so they beat any generated
utility on the same element, including the state variant meant to replace
them. `text-description hover:text-headline` compiled and never changed on
hover. Each such variant a component uses is restated by hand in the block
headed "STATE VARIANTS OF THE HAND-WRITTEN COLOUR CLASSES". When a component
needs a new one, add the rule there; `tests/state-variants.test.ts`
(`scripts/check-state-variants.js`) fails until it exists.

### Contrast

`scripts/check-contrast.js` resolves every fill/foreground pair a component can
render — through the same token chain the CSS uses — in **both** themes, and
fails below WCAG AA. It also holds the focus ring to 3:1 against the page, a
card, and the offset gap that separates it from a primary button. The muted
ring (`--color-focus-ring-muted`), the danger ring (`--color-focus-ring-danger`) and the control boundary
(`--color-control-border`), and the brand and nav rings, are held to 3:1 on
all five surfaces: page, card, inset, elevated and overlay. The colour a focus-ring rule
uses must be a token in that list (`scripts/contrast-pairs.js`), so a ring
cannot read a raw ramp step. Run it after
re-pointing any token:

```bash
npm run check:contrast     # or: npm run check:design (all five guards)
```

### Border radius

Four radii, chosen by **role**, never by size. A large button is a bigger box
with the same corner as a small one.

| token | value | use |
|---|---|---|
| `--radius-control` | 8px | buttons, inputs, selects, toggles |
| `--radius-container` | 12px | cards, alerts, panels, list items, code blocks |
| `--radius-overlay` | 16px | modals, sheets, menus, popovers, toasts |
| `--radius-pill` | full | badges, avatars, status dots |

`--radius-sm/md/lg/xl` remain as legacy aliases so that existing consumer
stylesheets keep compiling, but components must not use them — `check-control-geometry.js` fails the build if a
component reaches for a t-shirt radius.

### Control geometry

One height scale is shared by **every** form control, so a Button, Input, Select,
IconButton and Slider of the same size line up in a row:

| size | height | token |
|---|---|---|
| `sm` | 32px | `--control-height-sm` |
| `md` | 40px | `--control-height-md` |
| `lg` | 48px | `--control-height-lg` |

IconButton also has `xs`, a 24px box for dense pointer-first layouts. No text
control is that small, so it sits outside the shared scale, and the check pins
it separately.

Enforced by `scripts/check-control-geometry.js`.

### Shadow scale

Elevation in light mode is **two steps**, not a ramp. A shadow says "this is
above the page" or "this floats over it" — there is no third meaning, and an
in-between value just makes two neighbouring surfaces look accidentally
different.

| Utility | Reads as | Use for |
|---|---|---|
| `shadow-sm` | Raised | Cards, tables, sidebars, toggle knobs, colour-picker thumbs |
| `shadow-lg` | Floating | Modals, sheets, dropdown/select menus, toasts, popovers |

`shadow-none` is the explicit *absence* of a shadow (outlined and flat cards,
disabled buttons), not a third step.

Rules:
- A raised element that becomes floating on interaction may go `sm` → `lg` on
  hover. Something already at `lg` does not deepen further — it changes its
  background instead.
- `shadow-md`, `shadow-xl` and a bare `shadow` are build failures. The bare
  `shadow` utility is the sneaky one: it resolves to a Tailwind default that
  `app.css` never defines, so no token controls it.
- Shadows carry elevation in **light mode only**. In dark mode the surface
  levels above do the work — see [Surface elevation levels](#surface-elevation-levels).
- The light shadow is the ramp's own ink (`--shadow-color: 24 24 27`) at
  `--shadow-opacity: 0.14`. Dark keeps black at 0.3.

Enforced by `scripts/check-token-violations.js`.

### Spacing rhythm

Layout spacing rides a **4px grid**. Half-steps (`gap-1.5`, `px-2.5`, `py-2.5`)
set up a second rhythm competing with the first: a 6px gap beside an 8px gap is
a 2px wobble nobody chose, and it accumulates down a dense form.

- `gap-*`, `space-x/y-*` and every padding utility must land on a whole step.
- **Margins are exempt**, because they carry optical nudges. `mt-0.5` on an
  icon sitting beside a first line of text is an alignment correction, not
  rhythm — Alert, ListItem, ToasterToast and the radio control all rely on it.
  Keep those to 0.5 and keep them on margins so the distinction stays visible.
- Icon sizes are their own scale (`size-3.5` = 14px, `size-4`, `size-5`), not
  spacing, and are unaffected.

Enforced by `scripts/check-token-violations.js`.

### Type scale

`Heading` and `Text` sit on **one** ramp rather than each carrying its own, so a
heading and the copy beneath it share line boxes instead of nearly matching.

| Step | `Heading` | `Text` |
|---|---|---|
| 36px | `level={1}` | — |
| 30px | `level={2}` | — |
| 24px | `level={3}` | — |
| 20px | `level={4}` | — |
| 18px | `level={5}` | `size="lg"` |
| 16px | `level={6}` | `size="md"` (default) |
| 14px | — | `size="sm"` |
| 12px | — | `size="xs"` |

Headings use `--font-family-heading` (the sans family unless an app sets it),
tighten tracking as they grow and are `semibold`/`bold`; `Text` takes a
`weight` prop (`normal` · `medium` · `semibold` · `bold`) so body copy can carry
emphasis without being promoted to a heading. `tone="label"` defaults to
`medium`; every other tone defaults to `normal`.

### Overriding a component's classes

`class` is the public prop on every component and is merged **last**, so a
call-site utility wins. That promise needs `cn()` (`src/components/util/cn.ts`,
tailwind-merge) to be true: `rounded-control` and `rounded-container` are
equal-specificity utilities, so plain concatenation leaves the winner to
whichever one Tailwind emits later in the stylesheet, not to the caller.

```svelte
<Card class="rounded-pill" />   <!-- rounded-container is dropped, not fought -->
```

Most semantic utilities work with stock tailwind-merge — `bg-card` vs
`bg-surface-overlay`, `text-headline` vs `text-description` all resolve. The
role-based radii are the exception and are declared explicitly in `cn.ts`,
because `control`/`container`/`overlay`/`pill` are role names rather than scale
values. **Add any future custom scale to that config**, or tailwind-merge keeps
both classes and stylesheet order silently decides again.

Covered by `tests/class-merge.test.ts`.

---

## For maintainers

This part is about changing the library's own theme, not an app's.

### One source file

All theming is in `src/app.css`:

- the `@theme` block holds every token and the light values, including the raw
  `--zabi-*` ramps, declared once;
- one `.dark { … }` rule remaps roles for dark. No `--zabi-*` token and no hex
  literal belongs in it; `validate-theme.js` fails the build on either.

The files under `dist/` are generated from it by `scripts/build-css.js` and are
overwritten on every build. Never edit them. Which file is which is in
[docs/theme-imports.md](./docs/theme-imports.md). `examples/theme-extensions/`
holds examples, not the theme.

Parts of `src/app.css` are generated too, so edit the source instead:

| To change | Edit | Then run |
|---|---|---|
| A chromatic ramp (`brand`, `citron`, `pine`, `iris`, `warning`, `error`) | `hue` / `peakChroma` in `tokens/chromatic-scales.js` | `npm run sync:tokens` |
| The neutral ramp | `tokens/base-scale.js` | `npm run sync:tokens` |
| The dark surface levels | `SURFACE_ALPHA` in `tokens/surface-ladder.js` | `npm run sync:tokens` |
| A role, a font, a radius | `src/app.css` | nothing in development |

Before a release, `npm run build:css` regenerates the `dist/` files and
`npm run build:lib` does that and verifies them (`scripts/verify-build.js`).

### Dark mode selectors

`src/app.css` holds one `.dark { … }` rule. `scripts/build-css.js` publishes it,
in every file that carries dark tokens, as:

```css
:root, [data-theme="light"] { color-scheme: light; }   /* in the light files */
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"]  { color-scheme: dark; }
[data-theme="auto"]  { color-scheme: light dark; }
.dark, [data-theme="dark"] { …; color-scheme: dark; }
@media (prefers-color-scheme: dark) { [data-theme="auto"] { …; color-scheme: dark; } }
```

- The light rule is written by hand in `src/app.css`, above `.dark`, and has
  to stay above it: all of these have the specificity of one class, so the
  later one wins. `validate-theme.js` fails the build if a light file lacks
  the rule or has it after a dark one.
- `color-scheme: dark` is the last declaration of the source `.dark` rule, so
  every dark selector carries it. The three attribute rules come first: with
  `class="dark" data-theme="light"` the class brings the dark tokens, and so
  the dark scheme with them.
- All selectors have the specificity of `.dark`.
- Keep it as one `.dark` rule in the source and do not write the others by
  hand; `scripts/dark-selectors.js` generates them.
- The dev site and Storybook read `src/app.css` directly. `postcss.config.cjs`
  runs the same expansion on it, so `data-theme` works there as it does in the
  published files.

`validate-theme.js` fails the build if a dark-carrying file lacks any of the
three, or if the `auto` copy differs from `.dark`.

### Dark mode action colours

- **Primary.** No dark override: `--color-brand-*` mirrors, so `brand-800` in
  light is `brand-200` in dark. The label is `--color-on-brand`, which `.dark`
  points at `--zabi-on-brand-dark`.
- **Secondary.** No dark override: `--color-base-*` mirrors the same way.
- **Danger.** Resolves through `--color-error-*`, which mirrors like every
  other ramp. The `.dark` block restates the aliases only so that
  `zabi-components/theme-dark-only` remains a complete standalone import
  (`validate-theme.js` enforces that).

Hover and active always move toward the dark end in light mode, and the mirror
flips that, so "more pressed" means "more contrast against the page" in both
themes. Never point `-active` at a step on the far side of the ramp; that is
how the pressed primary label once ended up at 1.66:1.

### Building the generator

The source is `create-theme/`. It ships as plain ESM in `dist/create-theme/`
and needs `culori` at runtime, so `culori` is a dependency.
`scripts/build-create-theme.js` copies it and writes `theme-data.js`, the
default theme and the pair list, from `src/app.css` and
`scripts/contrast-pairs.js` on every build. `verify-build.js` fails if that
file differs from its sources, and runs the bin from `dist/`. Tests:
`tests/create-theme.test.js`, part of `npm run test:themes`.

### Where the two-brand proof lives

- `tests/theme-output.test.js` (`npm run test:themes`) proves from the built
  CSS that one ramp override rebrands light and dark, and keeps the list of
  published token names.
- The docs site runs under two brands: the default, and Amber, which
  `vite-plugin-brand-themes.js` builds with `createTheme` from the inputs in
  `src/lib/marketing/brand-inputs.ts` each time the site starts or builds. The
  switcher is in the top bar and on `/theming`; `?brand=amber` opens any page
  in it.
- `playwright/theme-brands.spec.ts` (`npm run test:e2e`) loads component pages
  under both brands, in light and dark, at desktop width and at 375px, and
  checks from computed styles that the primary fill, its label, the focus ring,
  the card surface and the heading face change with the brand and that the
  label keeps 4.5:1.
- `tests/theming-guide.test.ts` (`npm test`) fails if this guide, `THEME.md`,
  `docs/theme-imports.md` or the site's token tables name a token the theme
  does not publish.

### Optional perceptual midpoint generation (OKLCH)

Base midpoints are frozen hex by default (`fixed` mode).  
For experimentation, you can generate midpoint steps in OKLCH interpolation and commit the resulting frozen values:

```bash
ZABI_BASE_SCALE_MODE=oklch npm run sync:tokens
npm run build:css
```

Notes:
- Primary anchors (`50, 100, 200 ... 950`) stay fixed.
- Midpoints (`75, 150, 250 ... 925`) are generated from adjacent anchors.
- Commit updated `src/app.css` and regenerated `dist/` outputs together.
