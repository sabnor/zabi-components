import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
    DEFAULT_COLOR_PICKER_STRINGS,
    DEFAULT_COMPONENT_DEMO_STRINGS,
    DEFAULT_CONTACT_FORM_STRINGS,
    DEFAULT_PROPS_TABLE_STRINGS,
} from "../src/components/util/ready-made-strings";
import {
    DEFAULT_SIDEBAR_ACCOUNT_PANEL_STRINGS,
    DEFAULT_SIDEBAR_BRAND_HEADER_STRINGS,
    DEFAULT_SIDEBAR_FOOTER_STRINGS,
    DEFAULT_SIDEBAR_NAVIGATION_STRINGS,
} from "../src/components/util/sidebar";
import { getThemeMode, setThemeMode } from "../src/components/util/theme-mode";
import { DEFAULT_SELECT_STRINGS } from "../src/components/util/select";
import { DEFAULT_TOP_NAVBAR_STRINGS } from "../src/components/util/top-navbar";
import StringsHarness from "./fixtures/StringsHarness.svelte";

/**
 * No English an app cannot replace, for the components that have words of
 * their own outside the toaster (tests/toaster-strings.test.ts holds that
 * one). Each is rendered in the state that says the most, once with every
 * string replaced by a sentinel and once with none: the first must leave no
 * default English in its text or accessible names, the second must say the
 * defaults exactly as they were, since they are what every existing app sees.
 */

afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.classList.remove("dark");
    try {
        localStorage.clear();
    } catch {
        /* no storage in this DOM */
    }
});

type Words = Record<string, string | ((value: never) => string)>;

/**
 * The same keys, each value a mark no English contains: a number, not the
 * key, since a key such as `errorMessage` holds an English word itself.
 * Functions keep their argument.
 */
function sentinel(defaults: Words): Words {
    return Object.fromEntries(
        Object.entries(defaults).map(([key, value], index) => [
            key,
            typeof value === "function" ? (input: string) => `¤${index}(${input})` : `¤${index}`,
        ]),
    ) as Words;
}

/** What the sentinel says for `key`, with `input` for a sentence. */
function said(defaults: Words, key: string, input?: string): string {
    const value = sentinel(defaults)[key];
    return typeof value === "function" ? (value as (text: string) => string)(input ?? "") : value;
}

/** The English of a set of defaults: each string, and the fixed parts of each sentence. */
function english(defaults: Words): string[] {
    return Object.values(defaults).flatMap((value) =>
        typeof value === "function"
            ? (value as (input: string) => string)("¤")
                  .split("¤")
                  .map((part) => part.trim().replace(/^["'.,]+|["'.,]+$/g, "").trim())
                  .filter((part) => part.length > 3)
            : [value],
    );
}

/** All the text and every accessible name in the page, as one string. */
function everythingSaid(): string {
    const names = [...document.body.querySelectorAll("*")].flatMap((element) =>
        ["aria-label", "title", "alt", "placeholder", "aria-description"].map(
            (attribute) => element.getAttribute(attribute) ?? "",
        ),
    );
    return [document.body.textContent ?? "", ...names].join(" | ");
}

/** Brings a component into the state that says the most of its words. */
const reveal: Record<string, () => Promise<void>> = {
    async ColorPicker() {
        const swatch = document.querySelector<HTMLElement>("[data-color-picker-open]")!;
        await fireEvent.click(swatch);
        await waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
        // A value that is not a colour: the message under the field.
        const field = document.querySelector<HTMLInputElement>('input[type="text"]')!;
        await fireEvent.input(field, { target: { value: "zzz" } });
    },
    async ContactForm() {
        // Sent empty: every field's error and the box above them.
        await fireEvent.submit(document.querySelector("form")!);
        await waitFor(() => expect(document.querySelector('[role="alert"]')).not.toBeNull());
        const email = document.querySelector<HTMLInputElement>('input[name="email"]')!;
        // And a second time with an address that is not one.
        email.value = "anna";
        await fireEvent.input(email);
        await fireEvent.submit(document.querySelector("form")!);
    },
    async ComponentDemo() {
        // The other face of the switch.
        await fireEvent.click(document.querySelector("button")!);
    },
    async Select() {
        const open = async (which: string) => {
            const field = document.querySelector(`[data-select="${which}"]`)!;
            await fireEvent.click(field.querySelector<HTMLElement>('button[aria-haspopup="listbox"]')!);
        };
        // The list, and a search that finds nothing.
        await open("search");
        const search = await waitFor(() => {
            const input = document.querySelector<HTMLInputElement>('[data-select="search"] input[type="text"]');
            expect(input).not.toBeNull();
            return input!;
        });
        search.value = "zzz";
        await fireEvent.input(search);
        // No options at all, and the sheet with its close button and grip.
        await open("empty");
        await open("sheet");
        await waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
    },
    async TopNavbar() {
        const menu = document.querySelector<HTMLElement>("[aria-expanded]")!;
        await fireEvent.click(menu);
        await waitFor(() => expect(menu.getAttribute("aria-expanded")).toBe("true"));
    },
};

const THEME_LABELS = {
    auto: "¤auto",
    light: "¤light",
    dark: "¤dark",
    describe: (current: string, next: string) => `¤describe(${current},${next})`,
    darkMode: "¤darkMode",
    beforeMount: "¤beforeMount",
};

const CASES: { kind: string; defaults: Words; extra?: Record<string, unknown>; alsoEnglish?: string[] }[] = [
    { kind: "FormField", defaults: { requiredLabel: "(required)" } },
    {
        kind: "CodeBlock",
        defaults: { copyLabel: "Copy code to clipboard", copiedLabel: "Code copied to clipboard" },
    },
    { kind: "ColorPicker", defaults: DEFAULT_COLOR_PICKER_STRINGS as unknown as Words },
    { kind: "Select", defaults: DEFAULT_SELECT_STRINGS as unknown as Words },
    { kind: "ContactForm", defaults: DEFAULT_CONTACT_FORM_STRINGS as unknown as Words },
    { kind: "PropsTable", defaults: DEFAULT_PROPS_TABLE_STRINGS as unknown as Words },
    { kind: "ComponentDemo", defaults: DEFAULT_COMPONENT_DEMO_STRINGS as unknown as Words },
    { kind: "SidebarBrandHeader", defaults: DEFAULT_SIDEBAR_BRAND_HEADER_STRINGS as unknown as Words },
    { kind: "SidebarFooter", defaults: DEFAULT_SIDEBAR_FOOTER_STRINGS as unknown as Words },
    { kind: "SidebarAccountPanel", defaults: DEFAULT_SIDEBAR_ACCOUNT_PANEL_STRINGS as unknown as Words },
    { kind: "SidebarNavigation", defaults: DEFAULT_SIDEBAR_NAVIGATION_STRINGS as unknown as Words },
    {
        kind: "TopNavbar",
        defaults: DEFAULT_TOP_NAVBAR_STRINGS as unknown as Words,
        extra: { themeLabels: THEME_LABELS },
        alsoEnglish: ["Dark mode", "Theme toggle"],
    },
];

describe.each(CASES)("$kind", ({ kind, defaults, extra, alsoEnglish }) => {
    it("with every string replaced, no default English is left", async () => {
        render(StringsHarness, { kind, words: { ...sentinel(defaults), ...extra } });
        await reveal[kind]?.();
        const said = everythingSaid();
        for (const word of [...english(defaults), ...(alsoEnglish ?? [])]) {
            expect(said, `"${word}" is still said`).not.toContain(word);
        }
        // Each of the app's words that this state shows is in use: none was dropped on the way.
        expect(said).toContain("¤");
    });

    it("with none, it says what it always said", async () => {
        render(StringsHarness, { kind });
        await reveal[kind]?.();
        expect(everythingSaid()).not.toContain("¤");
    });
});

describe("the defaults are today's English", () => {
    it("FormField, CodeBlock, Toggle", () => {
        const first = render(StringsHarness, { kind: "FormField" });
        expect(document.querySelector(".sr-only")?.textContent).toBe("(required)");
        first.unmount();
        const second = render(StringsHarness, { kind: "CodeBlock" });
        expect(screen.getByRole("button", { name: "Copy code to clipboard" })).toBeTruthy();
        second.unmount();
        render(StringsHarness, { kind: "Toggle" });
        expect(screen.getByRole("switch", { name: "Toggle" })).toBeTruthy();
    });

    it("the strings objects, word for word", () => {
        expect(DEFAULT_TOP_NAVBAR_STRINGS).toEqual({
            openMenu: "Open menu",
            closeMenu: "Close menu",
            opensInNewTab: "(opens in a new tab)",
        });
        expect(DEFAULT_COLOR_PICKER_STRINGS).toEqual({
            hexInput: "Hex color input",
            open: "Open color picker",
            picker: "Color picker",
            hue: "Hue slider",
            area: "Saturation and lightness",
            saturation: "Saturation",
            lightness: "Lightness",
            invalidHex: "Please enter a valid hex color (e.g., #ff0000 or #f00)",
        });
        expect(DEFAULT_SELECT_STRINGS).toEqual({
            placeholder: "Select an option",
            searchPlaceholder: "Search options",
            noResults: "No results found",
            loading: "Loading options...",
            emptyTitle: "No options available",
            emptyDescription: "Add an option to start making selections.",
            listLabel: "Select options",
            closeLabel: "Close",
            expandLabel: "Expand",
            collapseLabel: "Collapse",
        });
        expect(DEFAULT_SIDEBAR_BRAND_HEADER_STRINGS).toEqual({ brandAlt: "Brand" });
        expect(DEFAULT_SIDEBAR_FOOTER_STRINGS.accountAndSettings).toBe("Account and settings");
        expect(DEFAULT_SIDEBAR_FOOTER_STRINGS.openAccountPanel).toBe("Open account panel");
        expect(DEFAULT_SIDEBAR_FOOTER_STRINGS.openAccountPanelFor("Anna")).toBe("Open account panel for Anna");
        expect(DEFAULT_SIDEBAR_ACCOUNT_PANEL_STRINGS).toEqual({
            panelLabel: "Account panel",
            title: "Account",
            closeLabel: "Close account panel",
            listLabel: "Select item",
            account: "Account",
            theme: "Theme",
            lightMode: "Light mode",
            darkMode: "Dark mode",
            systemMode: "Follows the system",
            light: "Light",
            dark: "Dark",
            system: "System",
            signOut: "Sign out of this account",
        });
        expect(DEFAULT_SIDEBAR_NAVIGATION_STRINGS.primaryNavigation).toBe("Primary navigation");
        expect(DEFAULT_SIDEBAR_NAVIGATION_STRINGS.secondaryNavigation).toBe("Secondary navigation");
        expect(DEFAULT_SIDEBAR_NAVIGATION_STRINGS.sectionNavigation("Spel")).toBe("Spel navigation");
        expect(DEFAULT_SIDEBAR_NAVIGATION_STRINGS.noMatchesTitle).toBe("No matching navigation items");
        expect(DEFAULT_SIDEBAR_NAVIGATION_STRINGS.noMatchesDescription("zzz")).toBe(
            'No results found for "zzz". Try another keyword.',
        );
        expect(DEFAULT_CONTACT_FORM_STRINGS.heading).toBe("Get in Touch");
        expect(DEFAULT_CONTACT_FORM_STRINGS.submit).toBe("Send Message");
        expect(DEFAULT_PROPS_TABLE_STRINGS.empty).toBe("No documented props.");
        expect(DEFAULT_COMPONENT_DEMO_STRINGS.showCode).toBe("Show code");
    });
});

describe("Toggle and the names an app gives it", () => {
    const toggle = () => screen.getByRole("switch");

    it("aria-label from the app is its name, not the fallback", () => {
        render(StringsHarness, { kind: "Toggle", words: { ariaLabel: "Mörkt läge" } });
        expect(toggle().getAttribute("aria-label")).toBe("Mörkt läge");
    });

    it("aria-labelledby from the app is used, and the fallback is not set beside it", () => {
        render(StringsHarness, { kind: "Toggle", words: { ariaLabelledby: "namn" } });
        expect(toggle().getAttribute("aria-labelledby")).toBe("namn");
        expect(toggle().hasAttribute("aria-label")).toBe(false);
    });

    it("a visible label needs neither", () => {
        render(StringsHarness, { kind: "Toggle", words: { label: "Mörkt läge" } });
        expect(toggle().hasAttribute("aria-label")).toBe(false);
        expect(screen.getByText("Mörkt läge")).toBeTruthy();
    });
});

describe("an existing prop wins over a strings key for the same text", () => {
    it("SidebarBrandHeader: strings.brandAlt is the last resort for the logo's alt", () => {
        render(StringsHarness, { kind: "SidebarBrandHeader", words: { brandAlt: "¤brandAlt" } });
        expect(document.querySelector("img")?.getAttribute("alt")).toBe("¤brandAlt");
    });

    it("SidebarFooter: collapsed and expanded use the two names", () => {
        const footer = DEFAULT_SIDEBAR_FOOTER_STRINGS as unknown as Words;
        const first = render(StringsHarness, { kind: "SidebarFooter", words: sentinel(footer) });
        expect(screen.getByRole("button", { name: said(footer, "openAccountPanelFor", "Anna") })).toBeTruthy();
        first.unmount();
        render(StringsHarness, { kind: "SidebarFooter", collapsed: true, words: sentinel(footer) });
        expect(screen.getByRole("button", { name: said(footer, "openAccountPanel") })).toBeTruthy();
    });

    it("SidebarNavigation hands the footer and the brand header their words", () => {
        const nav = DEFAULT_SIDEBAR_NAVIGATION_STRINGS as unknown as Words;
        const expanded = render(StringsHarness, { kind: "SidebarNavigation", words: sentinel(nav) });
        const open = everythingSaid();
        for (const [key, input] of [
            ["accountAndSettings"],
            ["openAccountPanelFor", "Anna"],
            ["brandAlt"],
            ["primaryNavigation"],
            ["secondaryNavigation"],
            ["noMatchesTitle"],
            ["noMatchesDescription", "zzz"],
        ]) {
            expect(open, key).toContain(said(nav, key, input));
        }
        expanded.unmount();
        // Collapsed: a section's heading is not shown, so its list is named from it.
        render(StringsHarness, { kind: "SidebarNavigation", collapsed: true, words: sentinel(nav) });
        const rail = everythingSaid();
        expect(rail).toContain(said(nav, "sectionNavigation", "Spel"));
        expect(rail).toContain(said(nav, "openAccountPanel"));
    });
});

describe("SidebarAccountPanel theme row", () => {
    const row = () => screen.getByRole("option", { name: /Theme/ });

    it("two modes, as before: it flips isLightMode, calls onThemeToggle and leaves the page alone", async () => {
        const onThemeToggle = vi.fn();
        const onThemeModeChange = vi.fn();
        render(StringsHarness, { kind: "SidebarAccountPanel", onThemeToggle, onThemeModeChange });
        expect(row().textContent).toContain("Dark mode");
        await fireEvent.click(row());
        expect(onThemeToggle).toHaveBeenCalledWith(true);
        expect(onThemeModeChange).not.toHaveBeenCalled();
        expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
    });

    it("three modes: it steps through system, light and dark, switches the page and says so", async () => {
        document.documentElement.setAttribute("data-theme", "auto");
        const onThemeToggle = vi.fn();
        const onThemeModeChange = vi.fn();
        render(StringsHarness, {
            kind: "SidebarAccountPanel",
            themeModes: "three",
            onThemeToggle,
            onThemeModeChange,
        });
        await waitFor(() => expect(row().textContent).toContain("System"));
        // Two lines and a badge, and no word of it twice: the second line and
        // the badge were both "System", and the row read "Theme System System".
        const said = row().textContent!.replace(/\s+/g, " ").trim();
        expect(said).toBe("Theme Follows the system System");

        await fireEvent.click(row());
        expect(getThemeMode()).toBe("light");
        expect(onThemeModeChange).toHaveBeenLastCalledWith("light");
        await waitFor(() => expect(row().textContent).toContain("Light mode"));

        await fireEvent.click(row());
        expect(getThemeMode()).toBe("dark");
        expect(onThemeModeChange).toHaveBeenLastCalledWith("dark");
        await waitFor(() => expect(row().textContent).toContain("Dark mode"));

        await fireEvent.click(row());
        expect(getThemeMode()).toBe("auto");
        expect(onThemeModeChange).toHaveBeenLastCalledWith("auto");
        expect(onThemeToggle, "The two-mode callback is not used").not.toHaveBeenCalled();
    });

    it("three modes: the row follows a mode that something else switched while the panel is open", async () => {
        document.documentElement.setAttribute("data-theme", "light");
        const onThemeModeChange = vi.fn();
        render(StringsHarness, { kind: "SidebarAccountPanel", themeModes: "three", onThemeModeChange });
        await waitFor(() => expect(row().textContent).toContain("Light mode"));

        // A ThemeToggle in the bar, or the app's own script.
        setThemeMode("dark", { storageKey: null });
        await waitFor(() => expect(row().textContent).toContain("Dark mode"));
        expect(row().textContent).not.toContain("Light mode");
        expect(onThemeModeChange, "Not the row's own step").not.toHaveBeenCalled();

        // And steps on from there.
        await fireEvent.click(row());
        expect(getThemeMode()).toBe("auto");
        await waitFor(() => expect(row().textContent).toContain("System"));
    });

    it("three modes, in the app's words", async () => {
        document.documentElement.setAttribute("data-theme", "auto");
        render(StringsHarness, {
            kind: "SidebarAccountPanel",
            themeModes: "three",
            words: { theme: "Tema", systemMode: "Följer systemet", system: "System", lightMode: "Ljust läge", light: "Ljust" },
        });
        const themeRow = () => screen.getByRole("option", { name: /Tema/ });
        await waitFor(() => expect(themeRow().textContent).toContain("Följer systemet"));
        await fireEvent.click(themeRow());
        await waitFor(() => expect(themeRow().textContent).toContain("Ljust läge"));
    });
});

describe("TopNavbar and its theme toggle", () => {
    it("passes modes and labels to the toggle", async () => {
        render(StringsHarness, {
            kind: "TopNavbar",
            themeModes: "three",
            words: { themeLabels: THEME_LABELS },
        });
        // Three modes: the name says the mode it is in and the next one.
        await waitFor(() => expect(everythingSaid()).toContain("¤describe("));
    });

    it("two modes by default", async () => {
        render(StringsHarness, { kind: "TopNavbar" });
        await waitFor(() => expect(screen.getAllByRole("button", { name: "Dark mode" }).length).toBeGreaterThan(0));
    });
});
