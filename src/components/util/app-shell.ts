/** Shared by `AppShell` and the bars that go in it (`AppBar`, `BottomTabBar`). */

import { getContext, setContext } from "svelte";

const APP_SHELL_CONTEXT = Symbol.for("zabi-components.app-shell");

/**
 * What a shell tells the pieces inside it. Getters, so a reader sees the
 * shell's current state; the object itself never changes.
 */
export interface AppShellContext {
    /** Content has scrolled under the header. False on the server and before the first measurement. */
    readonly scrolledTop: boolean;
    /** Content is not at the end: it passes under the footer. False on the server and before the first measurement. */
    readonly scrolledBottom: boolean;
    /** The footer lies over the bottom of the scroller (true whenever there is a footer). */
    readonly footerOverlays: boolean;
    /** The measured height of the footer in px, safe area included; 0 without a footer and until measured. */
    readonly footerHeight: number;
}

const NO_SHELL_STATE: AppShellContext = {
    scrolledTop: false,
    scrolledBottom: false,
    footerOverlays: false,
    footerHeight: 0,
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
const mountedShells: { top: string; bottom: string }[] = [];

function applyRootInsets(): void {
    const root = document.documentElement;
    const current = mountedShells[mountedShells.length - 1];
    if (current) {
        root.style.setProperty("--app-shell-top-inset", current.top);
        root.style.setProperty("--app-shell-bottom-inset", current.bottom);
    } else {
        root.style.removeProperty("--app-shell-top-inset");
        root.style.removeProperty("--app-shell-bottom-inset");
    }
}

/**
 * Mirrors a shell's two inset properties onto `<html>` while it is mounted,
 * so what is rendered outside the shell (an overlay moved to `document.body`,
 * a toast) can stay clear of its bars too. With several shells mounted the
 * one mounted last is the one mirrored; when it goes, the one before it is
 * again, and with none left the properties are removed.
 *
 * Call it in the browser when the shell mounts. `update` reports new values;
 * `leave` is for when the shell is destroyed.
 */
export function publishAppShellInsets(
    top: string,
    bottom: string,
): { update: (top: string, bottom: string) => void; leave: () => void } {
    const entry = { top, bottom };
    mountedShells.push(entry);
    applyRootInsets();
    return {
        update(nextTop, nextBottom) {
            entry.top = nextTop;
            entry.bottom = nextBottom;
            applyRootInsets();
        },
        leave() {
            const index = mountedShells.indexOf(entry);
            if (index !== -1) mountedShells.splice(index, 1);
            applyRootInsets();
        },
    };
}
