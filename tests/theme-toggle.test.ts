import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ThemeToggle from "../src/components/atoms/ThemeToggle.svelte";
import ThemeModeHarness from "./fixtures/ThemeModeHarness.svelte";

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

const button = () => screen.findByRole("button", { name: "Dark mode" });
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
    it("toggles the class and the stored choice, and writes no inline color-scheme", async () => {
        const user = userEvent.setup();
        render(ThemeToggle);
        const toggle = await button();
        expect(toggle.getAttribute("aria-label")).toBe("Dark mode");
        expect(toggle.getAttribute("aria-pressed")).toBe("false");

        await user.click(toggle);
        expect(state()).toEqual({ class: true, attribute: null, inline: "", stored: "dark" });
        // The name does not change with the state; `aria-pressed` does.
        expect(toggle.getAttribute("aria-label")).toBe("Dark mode");
        expect(toggle.getAttribute("aria-pressed")).toBe("true");

        await user.click(toggle);
        expect(state()).toEqual({ class: false, attribute: null, inline: "", stored: "light" });
    });

    it("starts dark when the class is already there", async () => {
        root.classList.add("dark");
        render(ThemeToggle);
        expect((await button()).getAttribute("aria-pressed")).toBe("true");
    });

    it("still follows a system change while nothing is stored, and writes the class", async () => {
        const os = system(false);
        render(ThemeToggle);
        const toggle = await button();
        os.change(true);
        await waitFor(() => expect(toggle.getAttribute("aria-pressed")).toBe("true"));
        expect(state()).toEqual({ class: true, attribute: null, inline: "", stored: null });
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
        expect(toggle.getAttribute("aria-label")).toBe("Dark mode");
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
        await waitFor(() => expect(toggle.getAttribute("aria-pressed")).toBe("true"));
    });

    it("a disabled toggle writes nothing", async () => {
        const user = userEvent.setup();
        root.setAttribute("data-theme", "light");
        render(ThemeToggle, { props: { disabled: true } });
        await user.click(await button());
        expect(state()).toEqual({ class: false, attribute: "light", inline: "", stored: null });
    });
});

/**
 * Three modes: system, light, dark. The app's default is `data-theme="auto"`,
 * and a two-way toggle pressed there leaves "auto" with no way back. With
 * `modes="three"` the button steps through all three and always writes the
 * attribute.
 */
describe('ThemeToggle with modes="three"', () => {
    const three = () => screen.findByRole("button", { name: /^Theme: / });

    it("steps system, light, dark and back to system, writing data-theme each time", async () => {
        const user = userEvent.setup();
        const onmodechange = vi.fn();
        root.setAttribute("data-theme", "auto");
        render(ThemeToggle, { props: { modes: "three", onmodechange } });
        const toggle = await three();

        const seen: (string | null)[][] = [];
        const read = () => [root.getAttribute("data-theme"), toggle.getAttribute("aria-label"), toggle.getAttribute("data-theme-mode")];
        seen.push(read());
        for (let press = 0; press < 3; press += 1) {
            await user.click(toggle);
            seen.push(read());
        }
        expect(seen).toEqual([
            ["auto", "Theme: system. Switch to light", "auto"],
            ["light", "Theme: light. Switch to dark", "light"],
            ["dark", "Theme: dark. Switch to system", "dark"],
            ["auto", "Theme: system. Switch to light", "auto"],
        ]);
        expect(onmodechange.mock.calls.map(([mode]) => mode)).toEqual(["light", "dark", "auto"]);
        // A step, not a switch that is on or off.
        expect(toggle.hasAttribute("aria-pressed")).toBe(false);
        // Never the class, never an inline color-scheme; the last choice is stored.
        expect(state()).toEqual({ class: false, attribute: "auto", inline: "", stored: "auto" });
    });

    it("shows one icon per mode: monitor, sun, moon", async () => {
        const user = userEvent.setup();
        root.setAttribute("data-theme", "auto");
        render(ThemeToggle, { props: { modes: "three" } });
        const toggle = await three();
        const icon = () => toggle.querySelector("svg")!.getAttribute("class")!.match(/lucide-[a-z-]+/g)!.find((name) => name !== "lucide-icon");
        expect(toggle.querySelectorAll("svg")).toHaveLength(1);
        expect(icon()).toBe("lucide-monitor");
        await user.click(toggle);
        expect(icon()).toBe("lucide-sun");
        await user.click(toggle);
        expect(icon()).toBe("lucide-moon");
    });

    it("adds the attribute to a page that had none, and takes over from a dark class", async () => {
        const user = userEvent.setup();
        root.classList.add("dark");
        root.style.colorScheme = "dark";
        render(ThemeToggle, { props: { modes: "three" } });
        const toggle = await three();
        // Read from the class: the page is dark, and nothing is written until a press.
        expect(toggle.getAttribute("aria-label")).toBe("Theme: dark. Switch to system");
        expect(state()).toMatchObject({ class: true, attribute: null });

        await user.click(toggle);
        // The class and the inline scheme would hold the page dark under "auto".
        expect(state()).toEqual({ class: false, attribute: "auto", inline: "", stored: "auto" });
    });

    it("writes the attribute for light and dark too, on a page with neither class nor attribute", async () => {
        const user = userEvent.setup();
        render(ThemeToggle, { props: { modes: "three" } });
        const toggle = await three();
        expect(toggle.getAttribute("aria-label")).toBe("Theme: light. Switch to dark");
        expect(state()).toEqual({ class: false, attribute: null, inline: "", stored: null });
        await user.click(toggle);
        // The two-way button would add the class here. This one never does.
        expect(state()).toEqual({ class: false, attribute: "dark", inline: "", stored: "dark" });
    });

    it("stays on system when the system changes, and writes nothing", async () => {
        const os = system(false);
        const onmodechange = vi.fn();
        root.setAttribute("data-theme", "auto");
        render(ThemeToggle, { props: { modes: "three", onmodechange } });
        const toggle = await three();
        os.change(true);
        await waitFor(() => expect(toggle.getAttribute("aria-label")).toBe("Theme: system. Switch to light"));
        expect(toggle.getAttribute("data-theme-mode")).toBe("auto");
        expect(state()).toEqual({ class: false, attribute: "auto", inline: "", stored: null });
        expect(onmodechange).not.toHaveBeenCalled();
    });

    it("restores the stored mode when it mounts", async () => {
        localStorage.setItem("theme", "dark");
        root.setAttribute("data-theme", "auto");
        render(ThemeToggle, { props: { modes: "three" } });
        const toggle = await three();
        expect(toggle.getAttribute("aria-label")).toBe("Theme: dark. Switch to system");
        expect(state()).toMatchObject({ class: false, attribute: "dark" });
    });

    it("keeps the choice under storageKey, and nowhere with storageKey null", async () => {
        const user = userEvent.setup();
        localStorage.setItem("quiz-theme", "light");
        localStorage.setItem("theme", "dark");
        root.setAttribute("data-theme", "auto");
        const first = render(ThemeToggle, { props: { modes: "three", storageKey: "quiz-theme" } });
        const toggle = await three();
        expect(root.getAttribute("data-theme")).toBe("light");
        await user.click(toggle);
        expect(localStorage.getItem("quiz-theme")).toBe("dark");
        expect(localStorage.getItem("theme")).toBe("dark");
        first.unmount();

        localStorage.clear();
        localStorage.setItem("theme", "light");
        root.setAttribute("data-theme", "auto");
        render(ThemeToggle, { props: { modes: "three", storageKey: null } });
        const unstored = await three();
        // Nothing restored, nothing written.
        expect(root.getAttribute("data-theme")).toBe("auto");
        await user.click(unstored);
        expect(root.getAttribute("data-theme")).toBe("light");
        expect(localStorage.getItem("theme")).toBe("light");
        await user.click(unstored);
        expect(localStorage.getItem("theme")).toBe("light");
    });

    it("takes its words from labels, for another language", async () => {
        const user = userEvent.setup();
        root.setAttribute("data-theme", "auto");
        render(ThemeToggle, {
            props: {
                modes: "three",
                labels: {
                    auto: "följ telefonen",
                    light: "ljust",
                    dark: "mörkt",
                    describe: (current: string, next: string) => `Tema: ${current}. Byt till ${next}`,
                },
            },
        });
        const toggle = await screen.findByRole("button", { name: "Tema: följ telefonen. Byt till ljust" });
        await user.click(toggle);
        expect(toggle.getAttribute("aria-label")).toBe("Tema: ljust. Byt till mörkt");
    });

    it("a disabled button changes nothing", async () => {
        const user = userEvent.setup();
        root.setAttribute("data-theme", "auto");
        render(ThemeToggle, { props: { modes: "three", disabled: true } });
        await user.click(await three());
        expect(state()).toEqual({ class: false, attribute: "auto", inline: "", stored: null });
    });
});

describe("ThemeToggle: mode, bound, and an app control beside it", () => {
    const bound = () => screen.getByTestId("bound").textContent;

    it("mode follows the page, a press reports it, and assigning it switches the page", async () => {
        const user = userEvent.setup();
        const onmodechange = vi.fn();
        root.setAttribute("data-theme", "auto");
        render(ThemeModeHarness, { props: { onmodechange } });
        const toggle = await screen.findByRole("button", { name: /^Theme: / });
        await waitFor(() => expect(bound()).toBe("auto"));

        await user.click(toggle);
        expect(bound()).toBe("light");
        expect(onmodechange).toHaveBeenLastCalledWith("light");

        await user.click(screen.getByTestId("assign-dark"));
        await waitFor(() => expect(root.getAttribute("data-theme")).toBe("dark"));
        expect(toggle.getAttribute("aria-label")).toBe("Theme: dark. Switch to system");
        expect(localStorage.getItem("theme")).toBe("dark");
        // Assigned by the app, not pressed: the app already knows.
        expect(onmodechange).toHaveBeenCalledTimes(1);
    });

    it("the app's own three-option control and the toggle stay in step through the helpers", async () => {
        const user = userEvent.setup();
        root.setAttribute("data-theme", "auto");
        render(ThemeModeHarness);
        const toggle = await screen.findByRole("button", { name: /^Theme: / });
        const option = (name: string) => screen.getByRole("radio", { name });
        await waitFor(() => expect((option("System") as HTMLInputElement).checked).toBe(true));

        await user.click(option("Dark"));
        await waitFor(() => expect(toggle.getAttribute("aria-label")).toBe("Theme: dark. Switch to system"));
        expect(state()).toMatchObject({ class: false, attribute: "dark", stored: "dark" });

        await user.click(toggle);
        await waitFor(() => expect((option("System") as HTMLInputElement).checked).toBe(true));
        expect(root.getAttribute("data-theme")).toBe("auto");
    });

    it("an initial mode from the app wins over the stored one", async () => {
        localStorage.setItem("theme", "light");
        root.setAttribute("data-theme", "auto");
        render(ThemeModeHarness, { props: { initial: "dark" } });
        await screen.findByRole("button", { name: "Theme: dark. Switch to system" });
        expect(root.getAttribute("data-theme")).toBe("dark");
    });

    it('with two modes, "auto" assigned from outside is written as the attribute', async () => {
        const user = userEvent.setup();
        system(true);
        render(ThemeModeHarness, { props: { modes: "two" } });
        const toggle = await button();
        await user.click(screen.getByTestId("assign-auto"));
        await waitFor(() => expect(root.getAttribute("data-theme")).toBe("auto"));
        // A dark system: the two-way button reads the result.
        expect(toggle.getAttribute("aria-pressed")).toBe("true");
    });
});

describe("ThemeToggle with two modes restores the stored choice", () => {
    it("on a class page", async () => {
        localStorage.setItem("theme", "dark");
        render(ThemeToggle);
        const toggle = await button();
        expect(toggle.getAttribute("aria-pressed")).toBe("true");
        expect(state()).toEqual({ class: true, attribute: null, inline: "", stored: "dark" });
    });

    it("on a data-theme page, and leaves a stored value that is not a mode alone", async () => {
        localStorage.setItem("theme", "light");
        root.setAttribute("data-theme", "dark");
        const first = render(ThemeToggle);
        await button();
        expect(root.getAttribute("data-theme")).toBe("light");
        first.unmount();

        localStorage.setItem("theme", "sepia");
        root.setAttribute("data-theme", "dark");
        render(ThemeToggle);
        expect((await button()).getAttribute("aria-pressed")).toBe("true");
        expect(root.getAttribute("data-theme")).toBe("dark");
    });
});

/**
 * Two modes are a switch: one name and `aria-pressed`. The name used to flip
 * with the state ("Switch to dark mode", then "Switch to light mode, pressed"),
 * which a screen reader announced as a pressed button that switches to light.
 */
describe("ThemeToggle with two modes: one name, and pressed for the state", () => {
    it("is called Dark mode whatever the state, on a class page and on a data-theme page", async () => {
        const user = userEvent.setup();
        const first = render(ThemeToggle);
        const toggle = await button();
        const seen = [[toggle.getAttribute("aria-label"), toggle.getAttribute("aria-pressed")]];
        await user.click(toggle);
        seen.push([toggle.getAttribute("aria-label"), toggle.getAttribute("aria-pressed")]);
        await user.click(toggle);
        seen.push([toggle.getAttribute("aria-label"), toggle.getAttribute("aria-pressed")]);
        expect(seen).toEqual([
            ["Dark mode", "false"],
            ["Dark mode", "true"],
            ["Dark mode", "false"],
        ]);
        first.unmount();

        // Nothing stored from the presses above, or it would be restored over the attribute.
        localStorage.clear();
        root.setAttribute("data-theme", "dark");
        render(ThemeToggle);
        const onAttribute = await button();
        expect(onAttribute.getAttribute("aria-pressed")).toBe("true");
        expect(screen.queryByRole("button", { name: /switch to/i })).toBeNull();
    });

    it("takes the name from labels.darkMode", async () => {
        render(ThemeToggle, { props: { labels: { darkMode: "Mörkt läge" } } });
        const toggle = await screen.findByRole("button", { name: "Mörkt läge" });
        expect(toggle.getAttribute("aria-pressed")).toBe("false");
    });
});

/**
 * The theme sets `color-scheme` itself: dark under `.dark`, light on the root
 * otherwise. The button used to write it inline as well, and an inline value
 * outranks the stylesheet: after one press, an app that added `class="dark"`
 * from its own script got dark tokens and light native controls.
 */
describe("ThemeToggle leaves color-scheme to the theme", () => {
    it("writes no inline value on a class page, pressed or following the system", async () => {
        const user = userEvent.setup();
        const os = system(false);
        render(ThemeToggle);
        const toggle = await button();
        os.change(true);
        await waitFor(() => expect(toggle.getAttribute("aria-pressed")).toBe("true"));
        expect(root.style.colorScheme).toBe("");
        await user.click(toggle);
        await user.click(toggle);
        expect(root.getAttribute("style") ?? "").not.toContain("color-scheme");
    });

    it.each(["light", "dark"])('clears a stale inline "%s" when it mounts, and after a press', async (stale) => {
        const user = userEvent.setup();
        root.style.colorScheme = stale;
        render(ThemeToggle);
        const toggle = await button();
        expect(root.style.colorScheme).toBe("");
        // Written again by something else: a press clears it too.
        root.style.colorScheme = stale;
        await user.click(toggle);
        expect(root.style.colorScheme).toBe("");
    });

    it("leaves an inline value that is not light or dark to the app", async () => {
        root.style.colorScheme = "light dark";
        render(ThemeToggle);
        await button();
        expect(root.style.colorScheme).toBe("light dark");
    });
});
