# Components showcase (`/components`)

This route is the **interactive catalog** for Zabi Components. It mirrors the data in `src/lib/showcase/components-catalog.ts` and renders live demos plus a **Props** table per component.

## URL routing

- **`/components`** redirects (302) to the first catalog component (currently the first atom).
- **`/components/{Name}`** — live page for that component, e.g. **`/components/SidebarNavigation`**. Names match `ComponentMetadata.name` (PascalCase). Wrong casing is corrected with a 301 to the canonical name. Unknown names return **404**.
- **`?catalog=all`** — when the **All** category is selected, the URL includes this query so the full merged list stays visible while you open different components. Other categories do not need a query string; the path alone identifies the component.

Category rows still use internal `category:` `href`s with `preventDefault` and `goto()` so picking a category jumps to the first component in that slice (with `?catalog=all` only for **All**).

## Layout

- **Left column**: `SidebarNavigation` drives category and component selection. Search filters both category rows and the component list. The active category is highlighted via `activePrimaryHref` so nested selection stays clear.
- **Main column**: Header (name, description, badges, variants), `ComponentShowcaseExampleDemos` examples, then the props table.

On small viewports, the sidebar is a drawer; use the menu control to open it.

### Left navigation (what users see)

The catalog rail is intentionally split into two groups:

1. **Categories (primary)** — Rows such as Atoms, Molecules, Organisms, All. Choosing one updates which components appear below. Badge values show how many components are in that category (or total when “All” is selected).
2. **Components (secondary)** — The full list for the active category. Choosing a row loads that component’s detail, demos, and props table in the main column.
3. **Search** — A single field that filters **both** category names and component names so you can jump quickly without expanding sections manually.

On **mobile**, the same `SidebarNavigation` instance opens inside the drawer when you tap ☰ **Browse components**.

Maintainer-oriented detail lives in this file; the showcase UI does not duplicate long copy on the page.

## Organisms: naming

| Export | Role |
|--------|------|
| **`TopNavbar`** | Horizontal **top** bar: brand, links, theme toggle, mobile menu. Use `embedded` for a link-only strip inside your own header. Types: `TopNavbarNavItem`. |
| **`SidebarNavigation`** | **Vertical** app rail: optional brand/logo, search, grouped items (`section`), primary vs `group: "secondary"`, profile, logout/theme. Props: `layout` (`rail` \| `card`), `mode` (`expanded` \| `collapsed`). |
| **`SidebarPanel`** | Picker next to the sidebar when search is button-triggered; `variant` `plain` \| `elevated` aligns with `SidebarNavigation` `layout="card"`. |

Do not confuse **TopNavbar** (header) with **SidebarNavigation** (side rail).

## Molecules used by the sidebar

- **`SidebarBrandHeader`** — optional logo + wordmark (or monogram when collapsed).
- **`SidebarNavSection`** — section title + list; used internally by `SidebarNavigation`.

## Maintaining the catalog

1. Add or edit entries in **`components-catalog.ts`** (name, description, `props[]`, `examples[]`, `variants`).
2. For new organisms, add a branch in **`ComponentShowcaseExampleDemos.svelte`** so the showcase renders a demo.
3. Add Storybook stories under **`src/stories/`** for isolated development (`npm run storybook`).

## Related docs

- **`/docs`** — install, quick start, quality checks.
- **Storybook** — controls and autodocs for each story.
- **`THEME.md`** (repo root) — theme tokens and Tailwind setup.
