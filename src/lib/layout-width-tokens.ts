/**
 * Named aliases for layout widths that are otherwise enforced as literals in
 * `scripts/layout-width-policy.js` (see `ARBITRARY_MAX_WIDTH`).
 *
 * **Sync rule:** values MUST match `ARBITRARY_MAX_WIDTH` keys exactly. After
 * changing policy, update this file (or vice versa) and run `npm run check`.
 *
 * Prefer `<Container>` / `<Section>` `maxWidth` for screen tokens; use these
 * only where a fixed arbitrary literal is still required (shell, demos).
 */
export const layoutArbitraryWidth = {
    /** DOCS_CATALOG_SIDEBAR_CAP — mobile drawer cap for /components sidebar */
    docsCatalogSidebar: "max-w-[266px]",
    /** SIDEBAR_APP_SHELL_RAIL — showcase app-shell sidebar column demo */
    showcaseSidebarRail: "max-w-[280px]",
} as const;
