import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ThemeToggle from "../src/components/atoms/ThemeToggle.svelte";

/**
 * The theme is switched on `<html>` in one of two ways: the `dark` class, or
 * `data-theme="light" | "dark" | "auto"` (THEMING.md, "Light, dark and auto").
 * ThemeToggle read and wrote only the class, so on a page that uses the
 * attribute it showed the wrong icon and, pressed, added a class beside an
 * attribute that said otherwise. It reads the effective mode from either and
 * writes to the one the page uses.
 */

const root = document.documentElement;

/** jsdom has no matchMedia; `dark` is what the system reports. */
function system(dark: boolean) {
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    const query = {
        matches: dark,
        media: "(prefers-color-scheme: dark)",
        addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
        removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    };
    vi.stubGlobal("matchMedia", vi.fn(() => query));
    return {
        change(next: boolean) {
            query.matches = next;
            for (const listener of listeners) listener({ matches: next } as MediaQueryListEvent);
        },
    };
}

const button = () => screen.findByRole("button", { name: /switch to (dark|light) mode/i });
const state = () => ({
    class: root.classList.contains("dark"),
    attribute: root.getAttribute("data-theme"),
    inline: root.style.colorScheme,
    stored: localStorage.getItem("theme"),
});

/** The test environment has no localStorage; the component writes the choice there when it can. */
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
    cleanup();
    root.classList.remove("dark");
    root.removeAttribute("data-theme");
    root.style.colorScheme = "";
    vi.unstubAllGlobals();
});

describe("ThemeToggle on a page switched by the dark class", () => {
    it("is unchanged: it toggles the class, the inline color-scheme and the stored choice", async () => {
        const user = userEvent.setup();
        render(ThemeToggle);
        const toggle = await button();
        expect(toggle.getAttribute("aria-label")).toBe("Switch to dark mode");
        expect(toggle.getAttribute("aria-pressed")).toBe("false");

        await user.click(toggle);
        expect(state()).toEqual({ class: true, attribute: null, inline: "dark", stored: "dark" });
        expect(toggle.getAttribute("aria-label")).toBe("Switch to light mode");
        expect(toggle.getAttribute("aria-pressed")).toBe("true");

        await user.click(toggle);
        expect(state()).toEqual({ class: false, attribute: null, inline: "light", stored: "light" });
    });

    it("starts dark when the class is already there", async () => {
        root.classList.add("dark");
        render(ThemeToggle);
        expect((await button()).getAttribute("aria-label")).toBe("Switch to light mode");
    });

    it("still follows a system change while nothing is stored, and writes the class", async () => {
        const os = system(false);
        render(ThemeToggle);
        const toggle = await button();
        os.change(true);
        await waitFor(() => expect(toggle.getAttribute("aria-pressed")).toBe("true"));
        expect(state()).toEqual({ class: true, attribute: null, inline: "dark", stored: null });
    });
});

describe("ThemeToggle on a page switched by data-theme", () => {
    it.each([
        ["dark", false, true],
        ["light", true, false],
        ["auto", true, true],
        ["auto", false, false],
    ])('reads data-theme="%s" with a %s system as dark: %s', async (theme, systemDark, dark) => {
        system(systemDark);
        root.setAttribute("data-theme", theme);
        render(ThemeToggle);
        const toggle = await button();
        expect(toggle.getAttribute("aria-pressed")).toBe(String(dark));
        expect(toggle.getAttribute("aria-label")).toBe(dark ? "Switch to light mode" : "Switch to dark mode");
    });

    it("writes the attribute, and neither the class nor an inline color-scheme", async () => {
        const user = userEvent.setup();
        root.setAttribute("data-theme", "light");
        render(ThemeToggle);
        const toggle = await button();

        await user.click(toggle);
        expect(state()).toEqual({ class: false, attribute: "dark", inline: "", stored: "dark" });
        expect(toggle.getAttribute("aria-pressed")).toBe("true");

        await user.click(toggle);
        expect(state()).toEqual({ class: false, attribute: "light", inline: "", stored: "light" });
        expect(toggle.getAttribute("aria-pressed")).toBe("false");
    });

    it('leaves "auto" for the opposite of what the system shows', async () => {
        const user = userEvent.setup();
        system(true);
        root.setAttribute("data-theme", "auto");
        render(ThemeToggle);
        await user.click(await button());
        expect(state()).toMatchObject({ class: false, attribute: "light" });
    });

    it("going light also drops a dark class left beside the attribute, or the page would stay dark", async () => {
        const user = userEvent.setup();
        root.classList.add("dark");
        root.setAttribute("data-theme", "light");
        render(ThemeToggle);
        const toggle = await button();
        // The class brings the dark tokens whatever the attribute says.
        expect(toggle.getAttribute("aria-pressed")).toBe("true");
        await user.click(toggle);
        expect(state()).toMatchObject({ class: false, attribute: "light" });
    });

    it('on "auto" a system change moves the reading and writes nothing', async () => {
        const os = system(false);
        root.setAttribute("data-theme", "auto");
        render(ThemeToggle);
        const toggle = await button();
        expect(toggle.getAttribute("aria-pressed")).toBe("false");
        os.change(true);
        await waitFor(() => expect(toggle.getAttribute("aria-pressed")).toBe("true"));
        expect(state()).toEqual({ class: false, attribute: "auto", inline: "", stored: null });
    });
});

describe("ThemeToggle beside something else that switches the theme", () => {
    it("follows a class or an attribute set from outside", async () => {
        render(ThemeToggle);
        const toggle = await button();
        root.classList.add("dark");
        await waitFor(() => expect(toggle.getAttribute("aria-pressed")).toBe("true"));
        root.classList.remove("dark");
        await waitFor(() => expect(toggle.getAttribute("aria-pressed")).toBe("false"));
        root.setAttribute("data-theme", "dark");
        await waitFor(() => expect(toggle.getAttribute("aria-label")).toBe("Switch to light mode"));
    });

    it("a disabled toggle writes nothing", async () => {
        const user = userEvent.setup();
        root.setAttribute("data-theme", "light");
        render(ThemeToggle, { props: { disabled: true } });
        await user.click(await button());
        expect(state()).toEqual({ class: false, attribute: "light", inline: "", stored: null });
    });
});
