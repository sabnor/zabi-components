// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import ThemeToggle from "../src/components/atoms/ThemeToggle.svelte";
import {
    getStoredThemeMode,
    getThemeMode,
    isThemeDark,
    setThemeMode,
    themeInitScript,
} from "../src/components/util/theme-mode.js";

/**
 * The shared Vitest config resolves `svelte` with the `browser` condition, so
 * the server runtime is named by path (as in modal-ssr.test.ts).
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

/** The class attribute of the first `<svg>` that carries `marker`. */
function iconClass(html: string, marker: string): string {
    const svg = html.split("<svg").find((part) => part.includes(marker)) ?? "";
    // The variant contains `&`, which the server writes as an entity.
    return (/class="([^"]*)"/.exec(svg)?.[1] ?? "").replaceAll("&amp;", "&");
}

describe("ThemeToggle on the server", () => {
    /**
     * The server cannot know the theme, and the button used to render the Sun
     * until it mounted, so a dark page showed the wrong icon first. Both icons
     * are now in the markup and the `dark` class on an ancestor chooses.
     */
    it("renders both icons and lets the dark class choose between them", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(ThemeToggle, { props: {} });

        const sun = iconClass(body, "lucide-sun");
        const moon = iconClass(body, "lucide-moon");

        expect(sun).toContain("[.dark_&]:hidden");
        expect(sun.split(/\s+/)).not.toContain("hidden");

        expect(moon.split(/\s+/)).toContain("hidden");
        expect(moon).toContain("[.dark_&]:block");
    });

    /**
     * A page switched with `data-theme` has no `dark` class, so with only the
     * class variant it showed the Sun on a dark page until the button mounted.
     * The same three selectors the dark tokens are published under choose now.
     * playwright/theme-toggle.spec.ts checks, without script, that they work.
     */
    it("lets data-theme choose as well: dark, and auto on a dark system", () => {
        const { body } = renderOnServer(ThemeToggle, { props: {} });
        const sun = iconClass(body, "lucide-sun").split(/\s+/);
        const moon = iconClass(body, "lucide-moon").split(/\s+/);
        for (const variant of ["[[data-theme=dark]_&]", "[@media(prefers-color-scheme:dark)]:[[data-theme=auto]_&]"]) {
            expect(sun).toContain(`${variant}:hidden`);
            expect(moon).toContain(`${variant}:block`);
        }
    });

    it("keeps one button with a name before it mounts", () => {
        const { body } = renderOnServer(ThemeToggle, { props: { size: "sm" } });
        expect(body.match(/<button/g)?.length).toBe(1);
        expect(body).toContain('aria-label="Theme toggle"');
    });
});

describe('ThemeToggle with modes="three" on the server', () => {
    /**
     * Three icons, and the stylesheet shows the one for the mode in the markup:
     * the monitor for `data-theme="auto"` whatever the system is, since this
     * button shows the mode and not its result.
     */
    it("renders sun, moon and monitor, each with the selectors that show it", () => {
        const { body } = renderOnServer(ThemeToggle, { props: { modes: "three" } });
        expect(body.match(/<button/g)?.length).toBe(1);
        expect(body.match(/<svg/g)?.length).toBe(3);

        const sun = iconClass(body, "lucide-sun").split(/\s+/);
        const moon = iconClass(body, "lucide-moon").split(/\s+/);
        const monitor = iconClass(body, "lucide-monitor").split(/\s+/);

        expect(sun).not.toContain("hidden");
        for (const variant of ["[.dark_&]", "[[data-theme=dark]_&]", "[[data-theme=auto]_&]"]) {
            expect(sun).toContain(`${variant}:hidden`);
        }
        expect(moon).toContain("hidden");
        expect(moon).toContain("[.dark_&]:block");
        expect(moon).toContain("[[data-theme=dark]_&]:block");
        // Not the moon on auto, also on a dark system.
        expect(moon.some((name) => name.includes("data-theme=auto"))).toBe(false);
        expect(monitor).toContain("hidden");
        expect(monitor).toContain("[[data-theme=auto]_&]:block");
    });

    it("takes its name before mount from labels", () => {
        const { body } = renderOnServer(ThemeToggle, { props: { modes: "three", labels: { beforeMount: "Tema" } } });
        expect(body).toContain('aria-label="Tema"');
    });
});

describe("the theme helpers on the server", () => {
    it("read the default and write nothing, without a document", () => {
        expect(typeof document).toBe("undefined");
        expect(getThemeMode()).toBe("light");
        expect(isThemeDark()).toBe(false);
        expect(getStoredThemeMode()).toBeNull();
        expect(() => setThemeMode("dark")).not.toThrow();
    });

    it("themeInitScript is a string to put in <head>", () => {
        const script = themeInitScript("quiz-theme");
        expect(typeof script).toBe("string");
        expect(script).toContain('localStorage.getItem("quiz-theme")');
        expect(script).not.toContain("</script>");
    });
});
