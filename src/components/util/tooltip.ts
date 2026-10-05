/**
 * One tooltip at a time. A tooltip that opens closes the one that was open: a
 * mouse resting on one trigger while Tab moves focus to another would
 * otherwise show both, one of them stale.
 */

/** The tooltip that is open, as the function that closes it. */
let closeOpen: (() => void) | null = null;

/** Called by a tooltip as it opens, with what closes it. Closes any other. */
export function claimOpenTooltip(close: () => void): void {
    if (closeOpen && closeOpen !== close) closeOpen();
    closeOpen = close;
}

/** Called by a tooltip as it closes or goes. */
export function releaseOpenTooltip(close: () => void): void {
    if (closeOpen === close) closeOpen = null;
}
