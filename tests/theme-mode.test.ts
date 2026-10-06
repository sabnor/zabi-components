import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as library from "../src/components/index.js";
import {
    DEFAULT_THEME_STORAGE_KEY,
    THEME_MODES,
    getStoredThemeMode,
    getThemeMode,
    isThemeDark,
    isThemeMode,
    setThemeMode,
    storeThemeMode,
    themeInitScript,
} from "../src/components/util/theme-mode.js";

/**
 * The helpers an app drives the theme with when it renders its own control
 * (system / light / dark in a settings screen), and the script it puts in
 * `<head>` so a stored choice is applied before the first paint. ThemeToggle
 * goes through the same functions; tests/theme-toggle.test.ts covers it.
 */

const root = document.documentElement;

beforeEach(() => {
    const stored = new Map<string, string>();
    vi.stubGlobal("localStorage", {
        getItem: (key: string) => stored.get(key) ?? null,
        setItem: (key: string, value: string) => void stored.set(key, value),
        removeItem: (key: string) => void stored.delete(key),
        clear: () => stored.clear(),
    });
});

afterEach(() => {
    root.classList.remove("dark");
    root.removeAttribute("data-theme");
    root.style.colorScheme = "";
    vi.unstubAllGlobals();
});

describe("getThemeMode and isThemeDark", () => {
    it("reads data-theme, and without it the dark class", () => {
        expect(getThemeMode()).toBe("light");
        root.classList.add("dark");
        expect(getThemeMode()).toBe("dark");
        for (const mode of THEME_MODES) {
            root.setAttribute("data-theme", mode);
            expect(getThemeMode()).toBe(mode);
        }
        // Not a mode: as if the attribute were not there.
        root.setAttribute("data-theme", "sepia");
        expect(getThemeMode()).toBe("dark");
        root.classList.remove("dark");
        expect(getThemeMode()).toBe("light");
    });

    it("says whether the page is dark, following the system only on auto", () => {
        vi.stubGlobal("matchMedia", () => ({ matches: true }));
        expect(isThemeDark()).toBe(false);
        root.setAttribute("data-theme", "light");
        expect(isThemeDark()).toBe(false);
        root.setAttribute("data-theme", "auto");
        expect(isThemeDark()).toBe(true);
        vi.stubGlobal("matchMedia", () => ({ matches: false }));
        expect(isThemeDark()).toBe(false);
        root.setAttribute("data-theme", "dark");
        expect(isThemeDark()).toBe(true);
        // The class brings the dark tokens whatever the attribute says.
        root.setAttribute("data-theme", "light");
        root.classList.add("dark");
        expect(isThemeDark()).toBe(true);
    });
});

describe("setThemeMode", () => {
    it("writes the attribute, clears what would contradict it, and stores the choice", () => {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
        setThemeMode("auto");
        expect(root.getAttribute("data-theme")).toBe("auto");
        expect(root.classList.contains("dark")).toBe(false);
        expect(root.style.colorScheme).toBe("");
        expect(localStorage.getItem(DEFAULT_THEME_STORAGE_KEY)).toBe("auto");
        expect(getStoredThemeMode()).toBe("auto");
    });

    it("takes a storage key, or none", () => {
        setThemeMode("dark", { storageKey: "quiz-theme" });
        expect(localStorage.getItem("quiz-theme")).toBe("dark");
        expect(localStorage.getItem("theme")).toBeNull();
        expect(getStoredThemeMode("quiz-theme")).toBe("dark");

        setThemeMode("light", { storageKey: null });
        expect(root.getAttribute("data-theme")).toBe("light");
        expect(localStorage.getItem("quiz-theme")).toBe("dark");
        expect(getStoredThemeMode(null)).toBeNull();
    });

    it("ignores what is not a mode, and survives storage that throws", () => {
        root.setAttribute("data-theme", "light");
        setThemeMode("sepia" as never);
        expect(root.getAttribute("data-theme")).toBe("light");
        expect(isThemeMode("auto")).toBe(true);
        expect(isThemeMode("system")).toBe(false);

        localStorage.setItem("theme", "sepia");
        expect(getStoredThemeMode()).toBeNull();

        vi.stubGlobal("localStorage", {
            getItem: () => {
                throw new Error("blocked");
            },
            setItem: () => {
                throw new Error("blocked");
            },
        });
        expect(() => setThemeMode("dark")).not.toThrow();
        expect(root.getAttribute("data-theme")).toBe("dark");
        expect(getStoredThemeMode()).toBeNull();
        expect(() => storeThemeMode("light")).not.toThrow();
    });
});

describe("themeInitScript", () => {
    /** Runs the script as a browser would run an inline `<script>`. */
    const run = (source: string) => new Function(source)();

    it("is a pure string: the same key gives the same script, and nothing runs when it is made", () => {
        root.setAttribute("data-theme", "auto");
        localStorage.setItem("theme", "dark");
        const script = themeInitScript();
        expect(script).toBe(themeInitScript("theme"));
        expect(script).toMatch(/^\(function\(\)\{try\{/);
        expect(root.getAttribute("data-theme")).toBe("auto");
    });

    it("applies the stored mode to data-theme on a page that uses it", () => {
        root.setAttribute("data-theme", "auto");
        localStorage.setItem("theme", "dark");
        run(themeInitScript());
        expect(root.getAttribute("data-theme")).toBe("dark");
        localStorage.setItem("theme", "auto");
        run(themeInitScript());
        expect(root.getAttribute("data-theme")).toBe("auto");
    });

    it("applies it to the class on a page without the attribute, except for auto", () => {
        localStorage.setItem("theme", "dark");
        run(themeInitScript());
        expect(root.classList.contains("dark")).toBe(true);
        expect(root.hasAttribute("data-theme")).toBe(false);
        localStorage.setItem("theme", "light");
        run(themeInitScript());
        expect(root.classList.contains("dark")).toBe(false);

        // "auto" can only be said with the attribute.
        root.classList.add("dark");
        localStorage.setItem("theme", "auto");
        run(themeInitScript());
        expect(root.getAttribute("data-theme")).toBe("auto");
        expect(root.classList.contains("dark")).toBe(false);
    });

    it("does nothing with nothing stored, with a value that is not a mode, or when storage throws", () => {
        root.setAttribute("data-theme", "auto");
        run(themeInitScript());
        expect(root.getAttribute("data-theme")).toBe("auto");
        localStorage.setItem("theme", "sepia");
        run(themeInitScript());
        expect(root.getAttribute("data-theme")).toBe("auto");
        vi.stubGlobal("localStorage", {
            getItem: () => {
                throw new Error("blocked");
            },
        });
        expect(() => run(themeInitScript())).not.toThrow();
    });

    it("reads the key it is given, and a hostile key cannot leave the string or the script element", () => {
        root.setAttribute("data-theme", "auto");
        localStorage.setItem("quiz-theme", "light");
        run(themeInitScript("quiz-theme"));
        expect(root.getAttribute("data-theme")).toBe("light");

        const hostile = '");document.documentElement.setAttribute("data-owned","1");("</script><script>';
        const script = themeInitScript(hostile);
        expect(script).not.toContain("</script>");
        localStorage.setItem(hostile, "dark");
        run(script);
        expect(root.hasAttribute("data-owned")).toBe(false);
        expect(root.getAttribute("data-theme")).toBe("dark");
    });
});

describe("the theming guide", () => {
    it("prints the script themeInitScript() returns, so the copy an app pastes is the real one", () => {
        const guide = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "THEMING.md"), "utf8");
        expect(guide).toContain(themeInitScript());
    });
});

describe("the package root", () => {
    it("exports the helpers", () => {
        expect(library.getThemeMode).toBe(getThemeMode);
        expect(library.setThemeMode).toBe(setThemeMode);
        expect(library.themeInitScript).toBe(themeInitScript);
        expect(library.isThemeDark).toBe(isThemeDark);
        expect(library.getStoredThemeMode).toBe(getStoredThemeMode);
        expect(library.THEME_MODES).toEqual(["auto", "light", "dark"]);
        expect(library.DEFAULT_THEME_STORAGE_KEY).toBe("theme");
    });
});
