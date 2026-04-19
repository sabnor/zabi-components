import type { Action } from "svelte/action";
export type SidebarFlyoutAlign = "top" | "bottom";
/** Which trigger inside the flyout root to pin to (when multiple anchors exist). */
export type SidebarFlyoutAnchorRole = "search" | "profile";
export interface FixedSidebarFlyoutParams {
    open: boolean;
    align: SidebarFlyoutAlign;
    gap?: number;
    /**
     * Prefer setting this when the root contains both search and profile anchors
     * (same `SidebarNavigation`). Defaults to the first `[data-sidebar-flyout-anchor]`.
     */
    anchorRole?: SidebarFlyoutAnchorRole;
}
/**
 * Pins a flyout with `position: fixed` next to the trigger marked with
 * `[data-sidebar-flyout-anchor]` inside `[data-sidebar-flyout-root]` (typically the
 * search or profile button), updating on scroll and resize.
 * While open, the node is moved to `document.body` so `overflow-y: auto` / scroll
 * ancestors cannot clip it (fixed descendants are still painted inside scrollports).
 */
export declare const fixedSidebarFlyout: Action<HTMLElement, FixedSidebarFlyoutParams>;
//# sourceMappingURL=fixed-sidebar-flyout.d.ts.map