// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import ThemeToggle from "../src/components/atoms/ThemeToggle.svelte";

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
