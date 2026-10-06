/** Public types and pure helpers for `Drawer`. */

/**
 * The edge the drawer is anchored to. `left` and `right` are physical and stay
 * put in a right-to-left page; `start` and `end` follow the writing direction.
 */
export type DrawerSide = "left" | "right" | "start" | "end";

/** Panel width on wide screens. On a phone the panel is never wider than the screen. */
export type DrawerSize = "sm" | "md" | "lg";

/** What the user did to close the drawer. The same values Modal reports. */
export type DrawerCloseReason = "escape" | "backdrop" | "close-button";

/** The physical edge a side resolves to, given the writing direction. */
export function resolveDrawerEdge(
    side: DrawerSide,
    rtl: boolean,
): "left" | "right" {
    if (side === "left" || side === "right") return side;
    return (side === "start") !== rtl ? "left" : "right";
}
