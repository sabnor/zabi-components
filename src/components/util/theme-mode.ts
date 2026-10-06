/**
 * The page's theme mode, read and written in one place.
 *
 * The theme is switched on `<html>`: `data-theme="auto" | "light" | "dark"`,
 * or the older `dark` class (THEMING.md, "Light, dark and auto"). ThemeToggle
 * uses these helpers, and so can an app that renders a control of its own, a
 * SegmentedControl with three options for instance: both then read and write
 * the same attribute, and ThemeToggle follows whatever the other one sets.
 *
 * Everything here is safe to call on the server: without a document the
 * readers return the default and the writers do nothing.
 */

/** `"auto"` follows the system; the other two are a choice. */
export type ThemeMode = "auto" | "light" | "dark";

/** The modes in the order a three-way ThemeToggle steps through them. */
export const THEME_MODES: readonly ThemeMode[] = ["auto", "light", "dark"];

/** Where the choice is kept in `localStorage` unless a key is given. The key ThemeToggle has always used. */
export const DEFAULT_THEME_STORAGE_KEY = "theme";

/** The texts ThemeToggle builds its accessible name from. Pass any of them as `labels`. */
export interface ThemeToggleLabels {
    /** What `"auto"` is called, with three modes. Default `"system"`. */
    auto: string;
    /** Default `"light"`. */
    light: string;
    /** Default `"dark"`. */
    dark: string;
    /**
     * The name with three modes, from the current mode's word and the next
     * one's. Default: "Theme: system. Switch to light".
     */
    describe: (current: string, next: string) => string;
    /**
     * The name with two modes. It does not change: the button is a switch, and
     * `aria-pressed` says whether dark is on. Default "Dark mode".
     */
    darkMode: string;
    /** The name before the button mounts, when the mode is not known yet. Default "Theme toggle". */
    beforeMount: string;
}

export function isThemeMode(value: unknown): value is ThemeMode {
    return value === "auto" || value === "light" || value === "dark";
}

function root(): HTMLElement | undefined {
    return typeof document === "undefined" ? undefined : document.documentElement;
}

function storage(): Storage | undefined {
    try {
        return typeof localStorage === "undefined" ? undefined : localStorage;
    } catch {
        // Reading `localStorage` throws where storage is blocked.
        return undefined;
    }
}

/**
 * The mode the page is in. `data-theme` says it outright; a page without the
 * attribute is dark with the `dark` class and light without it (such a page
 * does not follow the system, so it is never `"auto"`).
 */
export function getThemeMode(): ThemeMode {
    const html = root();
    if (!html) return "light";
    const attribute = html.getAttribute("data-theme");
    if (isThemeMode(attribute)) return attribute;
    return html.classList.contains("dark") ? "dark" : "light";
}

/** Whether the page is dark right now: by the class, by `data-theme="dark"`, or by `auto` on a dark system. */
export function isThemeDark(): boolean {
    const html = root();
    if (!html) return false;
    // The class brings the dark tokens whatever the attribute says.
    if (html.classList.contains("dark")) return true;
    const mode = getThemeMode();
    if (mode === "auto") {
        return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    }
    return mode === "dark";
}

export interface SetThemeModeOptions {
    /**
     * Where to keep the choice in `localStorage`. Default `"theme"`; `null`
     * keeps nothing (an app that stores the choice in its own backend).
     */
    storageKey?: string | null;
}

/**
 * Puts the page in `mode` by writing `data-theme` on `<html>`, and remembers
 * it. A leftover `dark` class and an inline `color-scheme` are removed: either
 * would hold the page dark, or its native controls, under another mode. The
 * theme sets `color-scheme` for each value of the attribute.
 */
export function setThemeMode(mode: ThemeMode, options: SetThemeModeOptions = {}): void {
    if (!isThemeMode(mode)) return;
    const html = root();
    if (!html) return;
    html.setAttribute("data-theme", mode);
    html.classList.remove("dark");
    html.style.removeProperty("color-scheme");
    storeThemeMode(mode, options.storageKey);
}

/** The stored choice, or `null` when there is none, it is not a mode, or `storageKey` is `null`. */
export function getStoredThemeMode(storageKey: string | null = DEFAULT_THEME_STORAGE_KEY): ThemeMode | null {
    if (storageKey === null) return null;
    try {
        const stored = storage()?.getItem(storageKey);
        return isThemeMode(stored) ? stored : null;
    } catch {
        return null;
    }
}

/** Remembers `mode` under `storageKey` (default `"theme"`); `null` keeps nothing. */
export function storeThemeMode(mode: ThemeMode, storageKey: string | null = DEFAULT_THEME_STORAGE_KEY): void {
    if (storageKey === null) return;
    try {
        storage()?.setItem(storageKey, mode);
    } catch {
        // Storage full or blocked: the page is still switched.
    }
}

/**
 * A script for `<head>` that applies the stored mode before the first paint,
 * so a returning visitor does not see the other theme flash by. Returns the
 * source as a string; it has no dependencies and can be inlined as it is.
 *
 * It writes to whichever mechanism the page uses, as ThemeToggle does:
 * `data-theme` when `<html>` already has the attribute or the stored mode is
 * `"auto"`, and the `dark` class otherwise. With nothing stored it does
 * nothing, and the markup's own `data-theme` (or its absence) stands.
 *
 * The key is written into the script as a JSON string, so any key is safe.
 */
export function themeInitScript(storageKey: string = DEFAULT_THEME_STORAGE_KEY): string {
    const key = JSON.stringify(String(storageKey)).replace(/</g, "\\u003c");
    return (
        "(function(){try{" +
        `var m=localStorage.getItem(${key});` +
        'if(m!=="auto"&&m!=="light"&&m!=="dark")return;' +
        "var r=document.documentElement;" +
        'if(r.hasAttribute("data-theme")||m==="auto"){r.setAttribute("data-theme",m);r.classList.remove("dark")}' +
        'else{r.classList.toggle("dark",m==="dark")}' +
        "}catch(e){}})();"
    );
}
