# Zabi Components — design review

**Scope:** all 63 components in `src/components` (29 atoms, 25 molecules, 4 organisms + compounds), rendered from your own Storybook stories in light and dark, plus the live showcase at `localhost:5173`. Every number below is measured from the rendered DOM or computed from `src/app.css` — nothing here is estimated.

**Method:** built Storybook from your current working tree (including the ~35 uncommitted component changes), screenshotted 209 stories × 2 themes, and measured computed geometry, colour and hover state with Playwright.

---

## Verdict

The engineering underneath this is genuinely good. The four-level surface elevation model, the OKLCH step enforcement in `check-surface-elevation.js`, the physical-ramp/semantic-alias split, the token-violation linter — that's infrastructure most component libraries never build. The problem is not the plumbing.

The problem is that **the plumbing was built before the visual decisions were made**, so the system faithfully distributes values that were never reconciled with each other. Three things follow from that, and they're the whole review:

1. **The colour ramps aren't calibrated to each other**, so anything built at the same nominal step lands at wildly different lightness. This is the root cause of the "doesn't feel like one system" symptom.
2. **The geometry scales weren't reconciled across components**, so a Button and an Input of the same declared size are different heights, and there are eight radii in play.
3. **The call-site API drifted three ways**, so a third of the library can't be adjusted by a consumer at all.

Fix (1) and everything downstream — badges, alerts, inputs, toasts — snaps into a family without touching a single component. Fix (2) and it starts to look designed rather than assembled. Fix (3) and it becomes reusable in the way the README promises.

---

## 1. The root cause: ramps aren't lightness-calibrated

Here is L\* (perceptual lightness, 0 = black, 100 = white) for every ramp at every step:

| step | 50 | 100 | 200 | 300 | 400 | **500** | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| base | 98.3 | 96.2 | 90.7 | 85.0 | 66.5 | **47.9** | 35.2 | 26.9 | 15.7 | 8.4 | 2.5 |
| brand | 98.2 | 95.4 | 91.6 | 87.3 | 79.2 | **70.2** | 58.7 | 48.0 | 38.6 | 29.8 | 19.1 |
| citron | 97.8 | 95.4 | 91.4 | 86.8 | 81.9 | **75.0** | 66.8 | 55.6 | 44.0 | 33.5 | 21.2 |
| pine | 95.8 | 91.4 | 82.9 | 73.9 | 64.4 | **34.6** | 30.0 | 25.4 | 21.0 | 11.3 | 5.6 |
| iris | 96.3 | 92.7 | 86.3 | 77.8 | 68.7 | **47.4** | 40.4 | 33.2 | 26.2 | 19.3 | 11.2 |
| warning | 98.5 | 95.7 | 91.4 | 85.9 | 80.7 | **72.2** | 59.9 | 46.9 | 37.5 | 30.8 | 15.5 |
| error | 96.4 | 92.1 | 85.8 | 76.3 | 64.1 | **55.0** | 47.9 | 40.0 | 33.2 | 28.1 | 12.6 |

At step 500 the ramps span **34.6 → 75.0 L\*** — a 40-point spread at the same nominal step. That is why `bg-success` looks near-black next to a bright yellow `bg-warning`: they are not the same step in any perceptual sense, only in name.

Two ramps also have a **cliff**. Step-to-step L\* deltas:

```
pine     4.4, 8.5, 9.0, 9.5, [29.8], 4.6, 4.6, 4.4, 9.7, 5.7      ← 400→500 falls off a shelf
iris     3.6, 6.4, 8.5, 9.1, [21.3], 7.0, 7.2, 7.0, 6.9, 8.1      ← same place
base     2.1, 5.5, 5.7, [18.5, 18.6], 12.7, 8.3, 11.2, 7.3, 5.9
brand    2.8, 3.8, 4.3, 8.1, 9.0, 11.5, 10.7, 9.4, 8.8, 10.7      ← smooth
```

Pine goes from a usable mid-green (`#49ad91`) straight to near-black (`#0c5d43`) in one step. Half the pine ramp is unusable as a result — 500 through 950 are all within 29 L\* points of each other and functionally interchangeable, while the visually useful greens all sit at 300–400.

**Recommendation.** Re-generate every ramp so the same step means the same lightness everywhere. Targets that work well and keep your existing hues:

| step | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| target L\* | 97 | 94 | 88 | 80 | 70 | 58 | 48 | 39 | 30 | 21 | 12 |

You already have `culori` as a dependency and `tokens/base-scale.js` + `scripts/sync-theme-tokens.js` doing exactly this kind of generation for the base ramp. Extend that machinery to all seven ramps: hold each ramp's hue and chroma character, solve for the L\* targets, write the frozen hex back. Then `--color-success`, `--color-warning`, `--color-error`, `--color-info`, `--color-energetic` can all point at step 600 and finally read as one family.

This single change is the highest-leverage thing in the review. It fixes badges, alerts, toasts, input validation states and status text simultaneously, with no component edits.

---

## 2. Contrast and state failures that follow from it

Measured, light mode, white foreground (`text-card` resolves to `#ffffff`):

| Badge variant | fill | contrast vs white | verdict |
|---|---|---|---|
| success (pine-600) | `#0a513a` | 9.33 | passes, but visually near-black |
| neutral / default (base-600) | `#52525b` | 7.73 | passes |
| info (iris-600) | `#58589e` | 6.35 | passes |
| error (error-500) | `#ef4444` | **3.76** | fails AA for body text |
| warning (warning-500) | `#f59e0b` | **2.15** | fails badly |
| energetic (citron-500) | `#bbbe64` | **1.97** | effectively illegible |

In **dark** mode the same badges all pass (4.0–7.7) because `text-card` flips to `#262629`. The foreground is bound to the surface token rather than chosen per fill, so the system gets dark mode right by accident and light mode wrong by the same accident.

Two more measured state bugs:

- **Primary button `:active` is unreadable.** `--color-action-primary-active` is `brand-400` (`#abc4ff`) while the label stays `brand-50` (`#f7faff`). Contrast **1.66:1** — the label vanishes while the button is pressed. It's also a jump from L\* 19 to L\* 79, which reads as a flash rather than a press. Active should be *darker* than rest in light mode: use `brand-950`→ a step beyond, not a step back across the ramp.
- **Ghost hover is invisible on the app shell, in both themes.** `hover:bg-base-100` computes to `#f4f4f5` in light and `#18181b` in dark — byte-identical to `--color-surface-base` in each theme. Measured: hover fill `rgb(244,244,245)` vs page `rgb(244,244,245)`. Ghost buttons only show hover when they happen to sit on a card. In dark mode it's worse than nothing: on a raised surface the hover fill is *darker* than the surface, so hovering recedes. Ghost and IconButton-ghost should use a semantic `--color-surface-hover` that is always one step away from whatever it sits on, not a hard-coded ramp step.

Also worth noting: `--color-input-placeholder` is defined in the theme but never used — `Input.svelte` uses `placeholder:text-description`. Either wire it up or delete it; a token that lies is worse than no token.

---

## 3. Geometry: the scales don't line up

### Control heights

Measured rendered heights:

| size | Button | Input | Select | Textarea | IconButton |
|---|---|---|---|---|---|
| sm | **40** | 38 | 38 | — | **32** |
| md | **48** | 46 | 46 | 46 | **40** |
| lg | **64** | 50 | 50 | — | **48** |

Put a `md` Button next to a `md` Input — a search field with a submit button, the most common pattern there is — and they're 2px apart. At `lg` they're **14px** apart. An IconButton beside its own Button is 8px short at `sm` and `md`, and 16px short at `lg`.

This is the single most visible "not coherent" defect, and it's the one a consumer hits in the first hour.

**Recommendation.** Define one control height scale as tokens and derive every control from it:

```
--control-h-sm: 32px    --control-px-sm: 12px    --control-text-sm: 13px
--control-h-md: 40px    --control-px-md: 14px    --control-text-md: 14px
--control-h-lg: 48px    --control-px-lg: 18px    --control-text-lg: 16px
```

Note the sizes come *down*. Your own components tell you they should: `text-sm` appears **74** times across the library versus **17** for `text-base`. The library is a 14px system everywhere except Button and Input, which default a step larger and therefore feel chunky next to everything else.

### Radii

Eight distinct radii are in use (`rounded-xs, sm, md, lg, xl, 2xl, 3xl, full`). Measured on the actual components:

| 2px | 6px | 8px | 12px | 16px | 24px |
|---|---|---|---|---|---|
| Badge | Alert, IconButton-sm | Button sm/md, Input, Select, Textarea, CodeBlock | Button-lg, IconButton-lg, ListItem, Card-sm | Card-md, FeatureCard, ActionPanel | Card-lg, Modal |

There's no rule connecting them. Badge at 2px next to a Button at 8px inside a Card at 16px is three different design languages in one row. And radius is coupled to size on Button, IconButton and Card but not on Input, Select or Textarea — so a `lg` Button (12px) beside a `lg` Input (8px) disagrees on corner shape as well as height.

**Recommendation.** Four radii, fixed per role, never varying by size:

```
--radius-control: 8px     buttons, inputs, selects, toggles, badges
--radius-container: 12px  cards, alerts, panels, code blocks, list items
--radius-overlay: 16px    modals, sheets, dropdown menus, popovers
--radius-full: 9999px     avatars, pills, status dots
```

Size changes the box, not the corner. That alone makes the whole library read as one hand.

### Spacing and the 4px grid

`gap` values in use: `0.5, 1, 1.5, 2, 2.5, 3, 4, 5`. `py` values: `1, 1.5, 2, 2.5, 3, 4, 5, 8, 12, 16, 24, 32`. The half-steps (`0.5`, `1.5`, `2.5`) break the 4px rhythm and appear 21 times between them. Restrict component-internal spacing to `1, 2, 3, 4, 6, 8` (4/8/12/16/24/32px) and let the half-steps exist only for optical icon alignment, documented as such.

---

## 4. Typography

**`Heading.svelte` hardcodes the font family.** It carries its own `<style>` block:

```css
.font-nunito { font-family: "Nunito Sans", ui-sans-serif, system-ui, sans-serif; }
```

`--font-family-sans` already exists in `@theme`. A consumer who rebrands the font per your own THEMING.md gets a rebranded body and Nunito Sans headings. For a library whose landing page says *"themed by tokens"*, this is the one bug that undercuts the pitch. Delete the style block; use the token.

**The display sizes have no optical correction.** `level: 1` is `text-4xl` (36px) with Tailwind's default 40px leading and `normal` tracking. Type at 36px+ needs to tighten:

| level | current | recommended |
|---|---|---|
| 1 | 36px / 40px / normal | 36px / 40px / **-0.02em** |
| 2 | 30px / 36px / normal | 30px / 36px / **-0.015em** |
| 3 | 24px / 32px / normal | 24px / 30px / **-0.01em** |
| 4–6 | 20/18/16px / normal | unchanged |

Negative tracking on display sizes is most of what separates "modern and clean" from "default Tailwind" visually, and it costs four lines.

**Button type is non-monotonic.** Measured: sm `14px/500/0.1px`, md `16px/500/0.15px`, lg `18px/**400**/normal`. Weight *drops* at large, so the biggest button has the lightest label — visible in the dark contact sheet, where Large reads thinner than Medium. Tracking goes 0.1 → 0.15 → 0, which is neither increasing nor decreasing. Pick one weight (500) for all sizes and let tracking go slightly negative as size grows.

**`Heading` and `Text` don't share a scale** and `Heading` takes `text: string` with no `children` snippet, so you can't put a link or emphasis inside a heading. `level?: number` is also untyped — `level={9}` compiles and silently falls back to `text-base`. Make it `1 | 2 | 3 | 4 | 5 | 6`, add `children`, and add a `size` prop so visual weight can be decoupled from heading level (the thing every real page needs).

---

## 5. Where the brand colour went

`--color-action-primary` is `brand-950` = `#1f2866` in light and resolves to `#f7faff` in dark. Your primary button is near-black navy in one theme and near-white in the other. The brand ramp's actual identity — the periwinkle at `#6e84fa` / `#abc4ff` — never appears on a primary action in either theme.

That's a legitimate aesthetic (it's the shadcn/Vercel move), but combined with `danger` being the only saturated button, the loudest element on any screen is the destructive action. In the live showcase the Variants row reads: near-black Primary, almost-invisible Secondary (`brand-800` at 10% alpha), and a bright red Delete that pulls the eye first.

Two coherent options — pick one deliberately rather than landing between them:

- **Neutral-primary (current direction, finished properly).** Keep near-black/near-white primary, but desaturate danger to a deeper red at rest and reserve the bright red for hover/confirm. Then give `secondary` real presence — a solid `base-100` fill with a `base-300` border, not a 10% alpha wash.
- **Brand-primary.** Move `--color-action-primary` to `brand-700` (`#5366e2`, 4.8:1 on white already) and let the product actually look like its brand. Danger stays red; the two no longer compete because primary now has its own colour.

Related: **`ghost` and `link` are visually identical in dark mode.** Both render as plain text on transparent; `link` is `brand-700` which maps to `#ccdbfd` in dark and reads as white. Two variants that look the same is API surface without meaning — either give `link` real link affordance (brand colour + underline offset at rest) or drop it and let people use an anchor.

And `disabled` is backwards. `--color-action-primary-disabled` is `brand-500` (`#8fa8ff`) plus `disabled:opacity-50`, which makes the disabled primary **lighter and more colourful** than the enabled secondary. In the showcase's Disabled row, "Saving…" and "Cancel" are indistinguishable from each other and both look like a secondary variant. A disabled control should keep its shape and lose its energy: same fill at reduced chroma, not a different, brighter colour.

---

## 6. Reusability: three conventions for one prop

Across the 63 component files:

- **25** expose `className` as the public prop
- **15** expose `class` (aliased internally, the Svelte-idiomatic form)
- **21** expose **neither** — including `Badge`, `Select`, `Tabs`, `Dropdown`, `Toggle`, `Checkbox`, `Radio`, `Tooltip`, `Heading`, `Progress`, `SlideUp`, `ImageUpload`

A third of the library cannot be adjusted at the call site at all. For a component library, that's the difference between "reusable" and "reusable until you need it to be 4px narrower". `Badge` and `Heading` don't even spread `...restProps`, so you can't attach a `data-testid` or an `aria-*` attribute.

Standardise on `class` everywhere (aliased to `className` internally), always merged last, and always spread `...restProps` onto the root element. Same story for `fullWidth` (Card) vs `isFullWidth` (Button) — pick one, and `fullWidth` is the conventional spelling.

**`Badge` specifically needs a pass.** It has no `class`, no `children`, no `restProps` — yet it ships stories called `WithChildren` and `WithCustomClass`, both of which render nothing meaningful because the props don't exist. It's also the only component with `rounded-xs` (2px) and it draws a `border` in the same colour as its fill, which does nothing but add 2px to the box.

And `AllVariantsWithIcons` **crashes** — it's cast `as any` over an invalid render shape (`Component: 'div'` with a `children` array, which isn't a Svelte CSF render), so TypeScript can't catch it and the story throws `TypeError: b is not a function` at runtime. It's visible in the attached Badge contact sheet.

---

## 7. Component-level notes

**Alerts** have no background fill — they're a 1px coloured border and an icon on a transparent ground. Warning and energetic borders are nearly invisible against a light page. Give them a subtle tinted fill (step 50 of the matching ramp once the ramps are calibrated) plus the border; that's what makes an alert read as an alert. They're also inline-sized, so each variant is a different width depending on its text — they should be `w-full` by default. The `neutral` icon is a small filled dot while every other variant uses a Lucide outline icon; that breaks the icon family.

**Inputs use a grey fill (`#dcdcdf`) on a grey page.** The result reads as *disabled* — compare the Default and Disabled stories in the attached Input sheet; they're too close. On a white card the grey fill looks heavier still. Modern-clean here means a surface-coloured fill with a defined border, and reserving the grey fill for the actual disabled state.

The placeholder is `--color-description` (`#52525b`), almost as dark as the real value text — in the sheet, "Enter text…" and "Sample text" are near-identical in weight. Placeholders should be visibly quieter (that's what `--color-input-placeholder` was presumably for).

Input's size range is 38→50px (12px of travel) while Button's is 40→64 (24px). `lg` gains only 4px over `md` and keeps the same 16px text, so Large and Default are indistinguishable. Also, `min-w-48` is hardcoded on the input, which fights any narrow layout.

**Cards** are the best-resolved part of the library — the white surface, soft shadow and generous radius read exactly as intended in the showcase. The only issue is radius scaling with size (12/16/24), which pulls them out of sync with everything else.

**Shadows lean heavy.** `shadow-lg` (7 uses) and `shadow-xl` (4) outnumber `shadow-sm` (5). Modern-clean generally means one soft ambient shadow for raised surfaces and a slightly larger one for overlays — two values, not four in rotation.

---

## 8. Add the guardrails you're already good at

You have `check-surface-elevation.js`, `check-token-violations.js`, `check-layout-width.js` and `validate-theme.js` running in `build:css`. That's the right instinct — three more scripts in the same style would lock in everything above:

- **`check-ramp-lightness.js`** — fail if any ramp's L\* at a given step deviates more than ±3 from the target curve, or if any step-to-step delta exceeds 15. This would have caught the pine cliff.
- **`check-control-geometry.js`** — render Button/IconButton/Input/Select/Textarea at each size and fail if heights within a size differ by more than 0 px. You already have Playwright wired up for the chaos-lab spec.
- **`check-contrast.js`** — compute every fill/foreground pair the components can produce, in both themes, and fail below 4.5:1. All seven badge variants × 2 themes is 14 assertions.

Also extend `check-token-violations.js`: it currently blocks Tailwind's default palette (`bg-red-500`) but allows raw steps from your *own* physical ramp (`hover:bg-base-100`), which is exactly how the invisible ghost hover got in.

---

## Suggested order

Ordered by visual return per unit of risk:

| # | Change | Effort | What it fixes |
|---|---|---|---|
| 1 | Re-generate all ramps to a shared L\* curve | ~half a day | Badges, alerts, toasts, validation states all become one family. Fixes three contrast failures. Zero component edits. |
| 2 | One control-height scale (32/40/48) | ~half a day | Buttons, inputs and selects finally align. Brings the whole library to its native 14px density. |
| 3 | Four role-based radii | ~2 hours | Removes the biggest "assembled not designed" tell. |
| 4 | Fix primary `:active`, ghost hover, disabled | ~2 hours | Three measured bugs; all token-level. |
| 5 | Heading: drop hardcoded font, type `level`, add `children`, add display tracking | ~2 hours | Makes theming actually work; biggest single typography lever. |
| 6 | Standardise `class` + `restProps` across all 63 | ~half a day | Turns "reusable" from a claim into a fact. |
| 7 | Pick a primary-colour direction deliberately | ~2 hours | Decides what the library looks like. |
| 8 | Alert fills, Input surface fill, Badge rebuild | ~half a day | Component-level polish. |
| 9 | Three new guardrail scripts | ~half a day | Stops all of the above from drifting back. |

Steps 1–4 are roughly two days and account for most of the visible difference. Everything in 1, 3 and 4 lives in `src/app.css` and is reversible in a single commit.

---

*Reviewed against your working tree at commit `5fb7710` plus uncommitted changes, 15 September 2026.*
