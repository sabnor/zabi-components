/** Public types and pure helpers for `BottomTabBar`. */

import type { Component } from "svelte";

/** An icon component, as `@lucide/svelte` icons are. */
export type BottomTabBarIcon = Component<{ size?: number; class?: string; strokeWidth?: number }>;

/** One destination in the bar. */
export interface BottomTabBarItem {
    /** Where the tab goes. Also its identity: `active` is compared with it. */
    href: string;
    /** Shown under the icon. Keep it to one short word. */
    label: string;
    /** Rendered above the label, at 24px. Decorative: the label names the tab. */
    icon: BottomTabBarIcon;
    /**
     * Drawn instead of `icon` on the active tab, typically the filled form.
     * Left out, `icon` is drawn with a heavier stroke (2.5) when active.
     */
    activeIcon?: BottomTabBarIcon;
    /** A count shown on the icon. Nothing is shown for 0 or when it is left out. */
    badge?: number;
}

/**
 * A trailing tab that is a button, not a link: `BottomTabBar`'s `more`.
 * `AppNavigation` uses it for the overflow of destinations that do not fit.
 */
export interface BottomTabBarMore {
    /** Shown under the icon, like an item's label. */
    label: string;
    /** Rendered above the label, at 24px. */
    icon: BottomTabBarIcon;
    /** Draws the tab with the active mark (the pill, the heavier icon, the semibold label). It is never `aria-current`. */
    active?: boolean;
    /** A count shown on the icon. Nothing is shown for 0 or when it is left out. */
    badge?: number;
    /** The button's accessible name when it differs from the label (a count spelled out). */
    name?: string;
    /** Whether what the button opens is open: `aria-expanded`. */
    expanded?: boolean;
    /** What the button opens: `aria-haspopup`. */
    haspopup?: "dialog" | "menu";
    onclick: (event: MouseEvent) => void;
}

/** The words of `AppNavigation`. Pass a partial object to `strings` to translate. */
export interface AppNavigationStrings {
    /** The overflow tab's label, and the name of the sheet it opens. */
    more: string;
}

export const APP_NAVIGATION_STRINGS: AppNavigationStrings = { more: "More" };

/** The path of an href: no query, no hash, no trailing slash (except the root). */
function pathOf(href: string): string {
    const path = href.split(/[?#]/)[0];
    return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/**
 * Whether `current` is the tab's page or a page under it. The same rule as
 * `TopNavbar`: a prefix match on whole path segments, except that `/` and
 * absolute URLs only match exactly.
 */
export function tabMatchesPath(href: string, current: string): boolean {
    if (!current) return false;
    if (href === current) return true;
    if (/^https?:\/\//.test(href)) return false;
    const tab = pathOf(href);
    const path = pathOf(current);
    // An href with no path of its own (`#top`, `?tab=2`) has no pages under it.
    if (tab === "") return false;
    if (tab === "/") return path === "/";
    return path === tab || path.startsWith(`${tab}/`);
}

/**
 * The href of the one active tab, or undefined when none matches. When
 * several match (`/quiz` and `/quiz/live` on `/quiz/live/3`), the most
 * specific wins, so there is never more than one current page.
 */
export function activeTabHref(
    items: readonly BottomTabBarItem[],
    current: string | undefined,
): string | undefined {
    if (!current) return undefined;
    let best: BottomTabBarItem | undefined;
    for (const item of items) {
        if (item.href === current) return item.href;
        if (!tabMatchesPath(item.href, current)) continue;
        if (!best || pathOf(item.href).length > pathOf(best.href).length) best = item;
    }
    return best?.href;
}

/** How a badge is read out after the tab's label: "Notifications, 3 new". */
export function defaultBadgeLabel(count: number): string {
    return `${count} new`;
}

/** The number as shown on the badge: `99+` above the cap. */
export function badgeText(count: number, max: number): string {
    return count > max ? `${max}+` : String(count);
}
