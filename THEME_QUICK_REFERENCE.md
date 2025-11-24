# Theme Quick Reference Guide

## 🎯 Where to Change `bg-action-primary`

The `bg-action-primary` utility class is defined in **one place** (`src/app.css`), but the color value comes from CSS variables. Here's exactly where to make changes:

### 1. **Light Mode Color** (Default)
**File:** `src/app.css`  
**Location:** Line ~197 in the `@theme` block

```css
--color-action-primary: var(--color-brand-800);
```

**To change:** Edit this line to use a different color:
- Use another brand shade: `var(--color-brand-600)` (lighter) or `var(--color-brand-900)` (darker)
- Use a direct color: `#3f4fc0` (hex) or `rgb(63, 79, 192)` (rgb)
- Use another semantic color: `var(--color-base-800)` (neutral)

### 2. **Dark Mode Color** (Automatic)
**File:** `src/app.css`  
**Location:** Line ~275 in the `.dark` block

The dark mode color is **automatically inverted** from the brand scale. Since `action-primary` uses `var(--color-brand-800)`, it becomes `brand-200` in dark mode (automatically inverted).

**To change:** Edit the brand color scale inversion in the `.dark` block:
```css
.dark {
  --color-brand-800: theme(colors.brand.200); /* This affects action-primary */
}
```

### 3. **Utility Class Definition**
**File:** `src/app.css`  
**Location:** Line ~812

```css
.bg-action-primary {
  background-color: var(--color-action-primary);
}
```

**Note:** You typically don't need to change this - it just references the CSS variable above.

---

## 📍 All Action Color Locations

### Primary Actions
- **CSS Variable (Light):** `src/app.css` line ~197 (`--color-action-primary`)
- **CSS Variable (Dark):** `src/app.css` line ~398 (`--color-action-primary-text` - only text color override)
- **Utility Class:** `src/app.css` line ~812 (`.bg-action-primary`)

### Secondary Actions
- **CSS Variable (Light):** `src/app.css` line ~206 (`--color-action-secondary`)
- **Utility Class:** `src/app.css` line ~841 (`.bg-action-secondary`)

### Danger Actions
- **CSS Variable (Light):** `src/app.css` line ~214 (`--color-action-danger`)
- **Utility Class:** `src/app.css` line ~870 (`.bg-action-danger`)

---

## 🎨 How the Theme System Works

1. **CSS Variables** are defined in the `@theme` block (light mode)
2. **Dark Mode Overrides** are in the `.dark` block
3. **Utility Classes** reference the CSS variables using `var(--color-*)`

### Example Flow:
```
@theme {
  --color-action-primary: var(--color-brand-800);  ← Define variable
}

.dark {
  --color-brand-800: theme(colors.brand.200);     ← Override for dark mode
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
├── @theme block (lines 21-236)
│   ├── Brand colors (lines 26-36)
│   ├── Action colors (lines 194-219) ← Primary actions here
│   └── Other semantic colors...
│
├── .dark block (lines 264-410)
│   ├── Brand color inversions (lines 275-285)
│   └── Action color overrides (lines 395-398) ← Text color override
│
└── Utility classes (lines 412-923)
    └── Action utilities (lines 810-870) ← bg-action-primary here
```

---

## ⚠️ Important Notes

1. **Single Source of Truth:** All theming is in `src/app.css` - don't edit `dist/` files!
2. **Dark Mode is Automatic:** Brand colors are automatically inverted in dark mode
3. **Use CSS Variables:** Always use `var(--color-*)` instead of direct colors for theme consistency
4. **Rebuild After Changes:** Run `npm run build:css` after editing `src/app.css` to update `dist/` files

---

## 🚀 Quick Examples

### Change Primary Action to a Different Brand Shade
```css
/* In src/app.css, line ~197 */
--color-action-primary: var(--color-brand-600); /* Changed from brand-800 */
```

### Change Primary Action to a Custom Color
```css
/* In src/app.css, line ~197 */
--color-action-primary: #ff6b6b; /* Custom red */
```

### Change Primary Action Hover State
```css
/* In src/app.css, line ~198 */
--color-action-primary-hover: var(--color-brand-700); /* Lighter hover */
```

