/** Shared by `AppShell` and the bars that go in it (`AppBar`, `BottomTabBar`). */

import { getContext, setContext } from "svelte";

const APP_SHELL_CONTEXT = Symbol.for("zabi-components.app-shell");

/** Where a shell's `navigation` is drawn: over the bottom (tabs), or a column at the start (rail, sidebar). */
export type AppShellNavigationPlacement = "tabs" | "rail" | "sidebar";

/** The `navigationPlacement` prop: one of the three, or `auto` to follow the viewport. */
export type AppShellNavigationMode = "auto" | AppShellNavigationPlacement;

/** The argument the `navigation` snippet receives. */
export interface AppShellNavigationContext {
    placement: AppShellNavigationPlacement;
}

/** In `auto`, the navigation is a rail from this viewport width (768px at the default font size). */
export const APP_SHELL_RAIL_MIN_WIDTH = "48rem";
/** In `auto`, the navigation is a sidebar from this viewport width (1024px; the breakpoint `SidebarShell` uses). */
export const APP_SHELL_SIDEBAR_MIN_WIDTH = "64rem";

/**
 * What a shell tells the pieces inside it. Getters, so a reader sees the
 * shell's current state; the object itself never changes.
 */
export interface AppShellContext {
    /** Content has scrolled under the header. False on the server and before the first measurement. */
    readonly scrolledTop: boolean;
    /** Content is not at the end: it passes under the footer. False on the server and before the first measurement. */
    readonly scrolledBottom: boolean;
    /**
     * Something lies over the bottom of the scroller: a footer, or a `navigation`
     * placed as tabs.
     */
    readonly footerOverlays: boolean;
    /**
     * The measured height in px of what lies over the bottom of the scroller (the
     * footer, plus the tabs when `navigation` is placed as tabs), safe area
     * included; 0 with nothing there and until measured.
     */
    readonly footerHeight: number;
    /**
     * Where the shell's `navigation` is: the forced placement, or in `auto` what
     * the viewport says once mounted. `tabs` on the server, before mount and
     * without a `navigation`.
     */
    readonly navigationPlacement: AppShellNavigationPlacement;
    /**
     * A header with a large title says how far the shell's header wrapper
     * sticks above the top of the scroller (the height of the large row, px):
     * the shell sets the wrapper's `top` to minus that, reports the condensed
     * height as `--app-shell-top-inset`, and counts content as under the
     * header only once scrolled past it. `0` puts it back.
     */
    setHeaderOverscroll(px: number): void;
}

const NO_SHELL_STATE: AppShellContext = {
    scrolledTop: false,
    scrolledBottom: false,
    footerOverlays: false,
    footerHeight: 0,
    navigationPlacement: "tabs",
    setHeaderOverscroll() {},
};

/** Called by `AppShell`, so the bars inside it know the shell lays them out. */
export function markAppShell(state: AppShellContext = NO_SHELL_STATE): void {
    setContext(APP_SHELL_CONTEXT, state);
}

/** The shell's state for a component rendered inside an `AppShell`, else undefined. */
export function getAppShell(): AppShellContext | undefined {
    const value = getContext<AppShellContext | true | undefined>(APP_SHELL_CONTEXT);
    return value && typeof value === "object" ? value : undefined;
}

/** True for a component rendered inside an `AppShell`. */
export function isInsideAppShell(): boolean {
    return getContext(APP_SHELL_CONTEXT) !== undefined;
}

/**
 * The nearest ancestor that scrolls vertically, or null when that is the
 * window. `AppShell` scrolls a container of its own; a page without it
 * scrolls the window.
 */
export function findScrollParent(element: HTMLElement): HTMLElement | null {
    for (let node = element.parentElement; node; node = node.parentElement) {
        if (node === document.body || node === document.documentElement) return null;
        const overflow = getComputedStyle(node).overflowY;
        if (overflow === "auto" || overflow === "scroll" || overflow === "overlay") return node;
    }
    return null;
}

/** True in a development build of a Vite app; false wherever that cannot be told. */
export function isDevBuild(): boolean {
    return Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV);
}

/** The shells that are mounted, oldest first, with the insets each last reported. */
const mountedShells: { top: string; bottom: string; start?: string }[] = [];

function applyRootInsets(): void {
    const root = document.documentElement;
    const current = mountedShells[mountedShells.length - 1];
    if (current) {
        root.style.setProperty("--app-shell-top-inset", current.top);
        root.style.setProperty("--app-shell-bottom-inset", current.bottom);
        if (current.start === undefined) root.style.removeProperty("--app-shell-start-inset");
        else root.style.setProperty("--app-shell-start-inset", current.start);
    } else {
        root.style.removeProperty("--app-shell-top-inset");
        root.style.removeProperty("--app-shell-bottom-inset");
        root.style.removeProperty("--app-shell-start-inset");
    }
}

/**
 * Mirrors a shell's inset properties onto `<html>` while it is mounted,
 * so what is rendered outside the shell (an overlay moved to `document.body`,
 * a toast) can stay clear of its bars too. With several shells mounted the
 * one mounted last is the one mirrored; when it goes, the one before it is
 * again, and with none left the properties are removed.
 *
 * `start` is `--app-shell-start-inset`, given only by a shell with a `navigation`.
 *
 * Call it in the browser when the shell mounts. `update` reports new values;
 * `leave` is for when the shell is destroyed.
 */
export function publishAppShellInsets(
    top: string,
    bottom: string,
    start?: string,
): { update: (top: string, bottom: string, start?: string) => void; leave: () => void } {
    const entry: { top: string; bottom: string; start?: string } = { top, bottom, start };
    mountedShells.push(entry);
    applyRootInsets();
    return {
        update(nextTop, nextBottom, nextStart) {
            entry.top = nextTop;
            entry.bottom = nextBottom;
            entry.start = nextStart;
            applyRootInsets();
        },
        leave() {
            const index = mountedShells.indexOf(entry);
            if (index !== -1) mountedShells.splice(index, 1);
            applyRootInsets();
        },
    };
}
