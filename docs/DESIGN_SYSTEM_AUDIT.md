# Design system audit — zabi-components

**Scope:** `src/components/**` (Svelte 5 + Tailwind v4). **Date:** 2026.

## Executive summary

The library has a **solid token foundation** in [`src/app.css`](../src/app.css) (semantic colors, radii, shadows, z-index) and **dark mode via `.dark`**. Main gaps are **API inconsistency** (`class` vs `className`, `onclick` vs events), **type drift** vs [`src/types/index.ts`](../src/types/index.ts), **a11y polish** (modal IDs, menu/listbox roles, trigger ARIA wiring), and **missing primitives** (layout, form field wrapper, table, empty state, toaster). Several components still use **raw palette utilities** (`bg-white`, `border-green-300`) instead of semantic tokens.

---

## Foundations

| Component / asset | Path | Notes |
|-------------------|------|--------|
| Theme tokens | `src/app.css` | Strong: semantic tokens, utilities, validation scripts. |
| `variant-utils` | `src/routes/lib/variant-utils.ts` | Was using raw greens/reds; **aligned to semantic tokens** in implementation pass. |
| `cn` | `src/components/index.ts` | Minimal join; OK for tree-shaking. |
| `focus-utils` | `src/routes/lib/focus-utils.ts` | Focus trap + restore; used by Modal/SlideUp. |

**Issues:** `dark:` utilities in built CSS may follow `prefers-color-scheme` while tokens use `.dark` — document for consumers.

---

## Components by category

### Foundations

| Component | Path | API | A11y | Theming | State |
|-----------|------|-----|------|---------|-------|
| Button | `atoms/Button.svelte` | variant/size | Focus ring; icon-only needs `aria-label` | Semantic actions | Stateless |
| IconButton | `atoms/IconButton.svelte` | label optional | `aria-label` when set | Semantic | Stateless |
| Heading | `atoms/Heading.svelte` | level | Semantic heading | Tokens | — |
| Badge | `atoms/Badge.svelte` | variant | Text contrast per variant | Mostly semantic | — |
| ThemeToggle | `atoms/ThemeToggle.svelte` | — | Button/toggle semantics | Tokens | Local |
| **Divider** | *added* | orientation, label | `separator` / `presentation` | `border-border` | — |
| **Container** | *added* | maxWidth | — | layout tokens | — |
| **Text** | *added* | size/variant | — | `text-body` etc. | — |
| CodeBlock | `atoms/CodeBlock.svelte` | — | Code presentation | Scoped | — |
| FeatureCard | `atoms/FeatureCard.svelte` | — | Card semantics | Mixed | — |
| OptimizedImage | `atoms/OptimizedImage.svelte` | — | `alt` required by usage | — | — |
| ColorPicker | `atoms/ColorPicker.svelte` | — | Label/input | Tokens | — |
| ActionPanel | `atoms/ActionPanel.svelte` | — | Review landmark roles | Tokens | — |

### Layout

| Component | Path | Notes |
|-----------|------|--------|
| Section | `molecules/Section.svelte` | Section wrapper |
| Card + Header/Content/Footer | `atoms/Card*.svelte` | Compound card; `className` on subcomponents |
| List / ListItem | `atoms/List*.svelte` | Lists |

### Inputs

| Component | Path | Issues addressed |
|-----------|------|------------------|
| Input | `atoms/Input.svelte` | Optional `id` / `hideLabel` for **FormField** |
| Textarea | `atoms/Textarea.svelte` | `$bindable` value; optional `id` / `hideLabel` |
| Select | `atoms/Select.svelte` | Listbox alignment via Dropdown `menuRole` |
| Checkbox | `atoms/Checkbox.svelte` | `$bindable` checked |
| Toggle | `atoms/Toggle.svelte` | `$bindable` checked |
| **FormField** | *added* | Label, description, error, required |

### Navigation

| Component | Path | Notes |
|-----------|------|--------|
| NavigationMenu* | `molecules/NavigationMenu*.svelte` | Complex; focus/escape |
| Tabs | `molecules/Tabs.svelte` | Tablist pattern |
| TopNavbar | `organisms/TopNavbar.svelte` | App shell |
| Sidebar* | `organisms/Sidebar*.svelte`, molecules | Sidebar patterns |

### Data display

| Component | Path | Notes |
|-----------|------|--------|
| Card | `atoms/Card.svelte` | Variants |
| List | `atoms/List.svelte` | — |
| **Table** | *added* | Wrapper + thead/tbody slots |
| **EmptyState** | *added* | Title, description, action |

### Feedback

| Component | Path | Notes |
|-----------|------|--------|
| Alert | `molecules/Alert.svelte` | Status |
| Toast | `atoms/Toast.svelte` | **Refined** semantic tokens |
| **Toaster** + store | *added* | Stacking, `aria-live` |
| Progress | `atoms/Progress.svelte` | — |
| Skeleton | `atoms/Skeleton.svelte` | — |

### Overlays

| Component | Path | Notes |
|-----------|------|--------|
| Modal | `molecules/Modal.svelte` | **Unique title/desc IDs**, `bind:isOpen` |
| SlideUp | `molecules/SlideUp.svelte` | **Fixed** `onclick`/`onkeydown`; unique IDs |
| Dropdown | `molecules/Dropdown.svelte` | **menu/listbox**, trigger ARIA via snippet, no `:global` menu CSS |
| Tooltip | `atoms/Tooltip.svelte` | Trigger focusability |

### Demos / app

| Component | Path |
|-----------|------|
| ComponentDemo | `molecules/ComponentDemo.svelte` |
| ContactForm, Form, ImageUpload | `molecules/` |

---

## Cross-cutting issues (resolved or tracked)

1. **Exports:** Root [`src/components/index.ts`](../src/components/index.ts) now re-exports new primitives where applicable.
2. **Modal/SlideUp:** Static `id="modal-title"` replaced with generated IDs; **`isOpen` bindable**.
3. **Dropdown:** `role="menu"` vs Select `listbox` — **`menuRole` prop**; trigger **`{#snippet trigger(aria)}`** for `aria-expanded` / `aria-controls`.
4. **Toast:** Semantic surfaces; **Toaster** for multiple notifications.
5. **Types:** [`src/types/index.ts`](../src/types/index.ts) — incremental alignment; full parity is follow-up.

---

## Missing vs checklist (before → after)

| Area | Status |
|------|--------|
| Divider, Container, Text, FormField | **Added** |
| Table (basic), EmptyState | **Added** |
| Toaster system | **Added** |
| Radio, Slider, Date/Time, OTP, Combobox | Still **out of scope** (roadmap) |
| Dialog rename | Modal covers; optional alias later |
| Data grid / Command palette | **Future** |

---

## Roadmap (remaining)

| Priority | Item | Complexity |
|----------|------|------------|
| P1 | Radio group, Switch polish (vs Toggle) | Medium |
| P1 | Breadcrumbs, Pagination | Medium |
| P2 | Combobox (accessible listbox + filter) | High |
| P2 | Drawer/Sheet (shared overlay primitive) | Medium |
| P3 | Data table (sort, pagination) | High |
