/** Public types and pure helpers for `PullToRefresh`. */

/** The words a `PullToRefresh` says by itself. */
export interface PullToRefreshStrings {
    /** Shown while the list is being pulled, short of the threshold. */
    pull: string;
    /** Shown once letting go would refresh. */
    release: string;
    /** Shown, and announced, while the refresh runs. */
    refreshing: string;
    /** Announced when it has finished. */
    done: string;
    /** The button that refreshes without the gesture. */
    refresh: string;
}

export const DEFAULT_PULL_TO_REFRESH_STRINGS: PullToRefreshStrings = {
    pull: "Pull to refresh",
    release: "Release to refresh",
    refreshing: "Refreshing",
    done: "Updated",
    refresh: "Refresh",
};

/**
 * How far the indicator has come out for a finger that has travelled
 * `distance` px: half as far, so the list feels held, and never more than one
 * and a half times the threshold.
 */
export function pullDistance(distance: number, threshold: number): number {
    return Math.max(0, Math.min(distance / 2, threshold * 1.5));
}

/**
 * What scrolls the element: its nearest ancestor that scrolls on the block
 * axis, or the page.
 */
export function scrollContainerOf(element: HTMLElement): HTMLElement {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        if (parent === document.body || parent === document.documentElement) break;
        const overflow = getComputedStyle(parent).overflowY;
        if (overflow === "auto" || overflow === "scroll" || overflow === "overlay") return parent;
    }
    return (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
}
