# Theme Quick Reference Guide

## 🎯 Where to Change `bg-action-primary`

The `bg-action-primary` utility class is defined in **one place** (`src/app.css`), but the color value comes from CSS variables. Here's exactly where to make changes. Line numbers move, so each location is given as something to search for.

### 1. **Light Mode Color** (Default)
**File:** `src/app.css`  
**Location:** the `@theme` block; search for `--color-action-primary:`

```css
--color-action-primary: var(--color-brand-600);
```

**To change:** Edit this line to use a different color:
- Use another brand shade: `var(--color-brand-700)` (darker)
- Use a direct color: `#3f4fc0` (hex) or `rgb(63, 79, 192)` (rgb)
- Use another semantic color: `var(--color-base-800)` (neutral)

The label on the fill is `--color-action-primary-text`. `npm run check:contrast` fails if the pair drops below 4.5:1.

### 2. **Dark Mode Color** (Automatic)
**File:** `src/app.css`  
**Location:** the `.dark` block; search for `Brand Color Scale — semantic → physical mirror`

The dark mode color is **automatically mirrored** from the brand scale. `action-primary` uses `var(--color-brand-600)`, and inside `.dark` that step points at the physical step on the other side of the ramp:

```css
.dark {
  --color-brand-600: var(--zabi-brand-400); /* This affects action-primary */
}
```

**To change the brand colour in both themes,** edit the seed in `tokens/chromatic-scales.js` and run `npm run sync:tokens`. Do not hand-edit `--zabi-brand-*` in `src/app.css`; the generator overwrites them.

### 3. **Utility Class Definition**
**File:** `src/app.css`  
**Location:** the section headed `ACTION UTILITY CLASSES`

```css
.bg-action-primary {
  background-color: var(--color-action-primary);
}
```

**Note:** You typically don't need to change this - it just references the CSS variable above. Its hover, active and disabled states are rules on the same class, directly below it.

---

## 📍 All Action Color Locations

All in `src/app.css`; search for the name.

### Primary Actions
- **CSS Variable (Light):** `--color-action-primary` in `@theme`
- **CSS Variable (Dark):** `.dark` restates `--color-action-primary-text` and the `-subtle` pair; the fill itself follows the mirrored brand ramp
- **Utility Class:** `.bg-action-primary`

### Secondary Actions
- **CSS Variable (Light):** `--color-action-secondary` in `@theme` (a dark alpha tint)
- **CSS Variable (Dark):** `--color-action-secondary` in `.dark` (a light alpha tint)
- **Utility Class:** `.bg-action-secondary`

### Danger Actions
- **CSS Variable (Light):** `--color-action-danger` in `@theme`
- **CSS Variable (Dark):** restated in `.dark` with the same aliases; the error ramp mirrors
- **Utility Class:** `.bg-action-danger`

---

## 🎨 How the Theme System Works

1. **CSS Variables** are defined in the `@theme` block (light mode)
2. **Dark Mode Overrides** are in the `.dark` block
3. **Utility Classes** reference the CSS variables using `var(--color-*)`

### Example Flow:
```
@theme {
  --color-action-primary: var(--color-brand-600);  ← Define variable
}

.dark {
  --color-brand-600: var(--zabi-brand-400);       ← Mirrored step for dark mode
}

.bg-action-primary {
  background-color: var(--color-action-primary);  ← Use variable
}
```

---

## 🔍 Finding Other Colors

### Search Pattern:
1. **Find the utility class** (e.g., `bg-action-primary`)
2. **Find the CSS variable** it uses (e.g., `--color-action-primary`)
3. **Find where the variable is defined** (in `@theme` block)
4. **Find dark mode override** (in `.dark` block, if any)

Most `bg-*`, `text-*` and `border-*` classes have no hand-written rule: Tailwind generates them from the `--color-*` token of the same name.

### Quick Search Commands:
```bash
# Find where bg-action-primary is defined
grep -n "bg-action-primary" src/app.css

# Find where --color-action-primary is defined
grep -n "color-action-primary" src/app.css
```

---

## 📝 File Structure

```
src/app.css
├── @theme block
│   ├── Physical ramps (--zabi-*) and their semantic aliases (--color-brand-*, …)
│   ├── Surfaces, text, borders, focus
│   ├── Semantic families (success, warning, error, info, energetic, neutral)
│   └── Action colors ← Primary actions here
│
├── .dark block
│   ├── Mirrored ramps
│   ├── Surface levels and the values dark pins
│   └── Action color overrides
│
└── Hand-written classes
    ├── Semantic colour classes
    ├── @layer components (focus ring, selection rows)
    ├── Action utilities ← bg-action-primary here
    └── State variants of the hand-written colour classes
```

---

## ⚠️ Important Notes

1. **Single Source of Truth:** All theming is in `src/app.css` - don't edit `dist/` files!
2. **Dark Mode is Automatic:** Brand colors are automatically mirrored in dark mode
3. **Use CSS Variables:** Always use `var(--color-*)` instead of direct colors for theme consistency
4. **Rebuild After Changes:** Run `npm run build:css` after editing `src/app.css` to update `dist/` files. It also runs the design checks.

---

## 🚀 Quick Examples

### Change Primary Action to a Different Brand Shade
```css
/* In src/app.css, in @theme */
--color-action-primary: var(--color-brand-700); /* Changed from brand-600 */
```

### Change Primary Action to a Custom Color
```css
/* In src/app.css, in @theme */
--color-action-primary: #ff6b6b; /* Custom red */
```

### Change Primary Action Hover State
```css
/* In src/app.css, in @theme */
--color-action-primary-hover: var(--color-brand-800); /* Darker hover */
```
