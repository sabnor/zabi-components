/** Shared by `AppShell` and the bars that go in it (`AppBar`, `BottomTabBar`). */

import { getContext, setContext } from "svelte";

const APP_SHELL_CONTEXT = Symbol.for("zabi-components.app-shell");

/** Called by `AppShell`, so the bars inside it know the shell lays them out. */
export function markAppShell(): void {
    setContext(APP_SHELL_CONTEXT, true);
}

/** True for a component rendered inside an `AppShell`. */
export function isInsideAppShell(): boolean {
    return getContext(APP_SHELL_CONTEXT) === true;
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
