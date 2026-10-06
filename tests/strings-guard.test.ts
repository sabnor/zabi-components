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
import { DEFAULT_CALENDAR_STRINGS } from "../src/components/util/calendar";
import { MEDIA_GRID_STRINGS } from "../src/components/util/media-grid";
import { PHOTO_GRID_STRINGS, PHOTO_VIEWER_STRINGS } from "../src/components/util/photo";
import { PROGRESS_STRINGS } from "../src/components/util/progress";
import { RATING_STRINGS } from "../src/components/util/rating";
import { DATE_FIELD_STRINGS, TIME_FIELD_STRINGS } from "../src/components/util/temporal-field";
import { SORTABLE_LIST_STRINGS } from "../src/components/util/sortable-list";
import { DEFAULT_TOASTER_STRINGS } from "../src/components/util/toaster";
import { STEPPER_STRINGS } from "../src/components/util/stepper";
import { DEFAULT_AVATAR_GROUP_STRINGS } from "../src/components/util/avatar";
import { DEFAULT_PULL_TO_REFRESH_STRINGS } from "../src/components/util/pull-to-refresh";
import { DEFAULT_SWIPEABLE_LIST_ITEM_STRINGS } from "../src/components/util/swipeable-list-item";
import {
    DEFAULT_ALERT_TEXTS,
    DEFAULT_CODE_BLOCK_TEXTS,
    DEFAULT_IMAGE_UPLOAD_TEXTS,
    DEFAULT_TOAST_TEXTS,
    DEFAULT_UNSAVED_CHANGES_BAR_TEXTS,
    DEFAULT_ZABI_COMMON_STRINGS,
    type ZabiStrings,
} from "../src/components/util/zabi-strings";
import StringsHarness from "./fixtures/StringsHarness.svelte";
import ZabiStringsHarness from "./fixtures/ZabiStringsHarness.svelte";

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

/**
 * The same, with the words set once for the whole app: every component that
 * reads a `ZabiStringsProvider` is rendered under one whose every value is a
 * sentinel, with nothing set on the component itself. No default English may
 * be left; and under no provider each says exactly what it always said.
 */
const THEME_TOGGLE_DEFAULTS: Words = {
    auto: "system",
    light: "light",
    dark: "dark",
    describe: ((current: string, next: string) => `Theme: ${current}. Switch to ${next}`) as never,
    darkMode: "Dark mode",
    beforeMount: "Theme toggle",
};

const ENTRY_DEFAULTS: Record<keyof ZabiStrings, Words> = {
    common: DEFAULT_ZABI_COMMON_STRINGS as unknown as Words,
    alert: DEFAULT_ALERT_TEXTS as unknown as Words,
    avatarGroup: DEFAULT_AVATAR_GROUP_STRINGS as unknown as Words,
    codeBlock: DEFAULT_CODE_BLOCK_TEXTS as unknown as Words,
    imageUpload: DEFAULT_IMAGE_UPLOAD_TEXTS as unknown as Words,
    pullToRefresh: DEFAULT_PULL_TO_REFRESH_STRINGS as unknown as Words,
    swipeableListItem: DEFAULT_SWIPEABLE_LIST_ITEM_STRINGS as unknown as Words,
    toast: DEFAULT_TOAST_TEXTS as unknown as Words,
    unsavedChangesBar: DEFAULT_UNSAVED_CHANGES_BAR_TEXTS as unknown as Words,
    calendar: DEFAULT_CALENDAR_STRINGS as unknown as Words,
    colorPicker: DEFAULT_COLOR_PICKER_STRINGS as unknown as Words,
    componentDemo: DEFAULT_COMPONENT_DEMO_STRINGS as unknown as Words,
    contactForm: DEFAULT_CONTACT_FORM_STRINGS as unknown as Words,
    mediaGrid: MEDIA_GRID_STRINGS as unknown as Words,
    photoGrid: PHOTO_GRID_STRINGS as unknown as Words,
    photoViewer: PHOTO_VIEWER_STRINGS as unknown as Words,
    propsTable: DEFAULT_PROPS_TABLE_STRINGS as unknown as Words,
    dateField: DATE_FIELD_STRINGS as unknown as Words,
    timeField: TIME_FIELD_STRINGS as unknown as Words,
    progress: PROGRESS_STRINGS as unknown as Words,
    rating: RATING_STRINGS as unknown as Words,
    toaster: DEFAULT_TOASTER_STRINGS as unknown as Words,
    select: DEFAULT_SELECT_STRINGS as unknown as Words,
    sidebarAccountPanel: DEFAULT_SIDEBAR_ACCOUNT_PANEL_STRINGS as unknown as Words,
    sidebarBrandHeader: DEFAULT_SIDEBAR_BRAND_HEADER_STRINGS as unknown as Words,
    sidebarFooter: DEFAULT_SIDEBAR_FOOTER_STRINGS as unknown as Words,
    sidebarNavigation: DEFAULT_SIDEBAR_NAVIGATION_STRINGS as unknown as Words,
    sortableList: SORTABLE_LIST_STRINGS as unknown as Words,
    stepper: STEPPER_STRINGS as unknown as Words,
    themeToggle: THEME_TOGGLE_DEFAULTS,
    topNavbar: DEFAULT_TOP_NAVBAR_STRINGS as unknown as Words,
};

/** The mark every word of `entry` starts with: its place in the list, not its name, which is English itself. */
const markOf = (entry: string) => `¤${Object.keys(ENTRY_DEFAULTS).indexOf(entry)}:`;

/** A provider's worth of sentinels: every entry, every key, each marked with numbers only. */
function sentinelProvider(): ZabiStrings {
    return Object.fromEntries(
        Object.entries(ENTRY_DEFAULTS).map(([entry, defaults]) => [
            entry,
            Object.fromEntries(
                Object.entries(defaults).map(([key, value], index) => [
                    key,
                    typeof value === "function"
                        ? (...input: unknown[]) => `${markOf(entry)}${index}(${input.join(",")})`
                        : `${markOf(entry)}${index}`,
                ]),
            ),
        ]),
    ) as ZabiStrings;
}

/** The sentinel for one common word. */
const commonMark = (key: keyof typeof DEFAULT_ZABI_COMMON_STRINGS) =>
    `${markOf("common")}${Object.keys(DEFAULT_ZABI_COMMON_STRINGS).indexOf(key)}`;

/**
 * Each converted component, the entries it reads, and the common words it
 * says. `common` lists only the words this component itself falls back to:
 * a dialog it sits in may still say "Close" until that dialog reads the
 * provider too.
 */
const PROVIDED: {
    kind: string;
    entries: (keyof typeof ENTRY_DEFAULTS)[];
    common?: (keyof typeof DEFAULT_ZABI_COMMON_STRINGS)[];
    /**
     * A word of an entry that this state also says through a single-text
     * prop with a sentence of its own for a default, which no provider entry
     * covers yet. Named here so the gap is in one place and in sight.
     */
    stillEnglish?: string[];
}[] = [
    { kind: "ColorPicker", entries: ["colorPicker"] },
    { kind: "ContactForm", entries: ["contactForm"] },
    { kind: "PropsTable", entries: ["propsTable"] },
    { kind: "ComponentDemo", entries: ["componentDemo"] },
    { kind: "SidebarBrandHeader", entries: ["sidebarBrandHeader"] },
    { kind: "SidebarFooter", entries: ["sidebarFooter"] },
    { kind: "SidebarAccountPanel", entries: ["sidebarAccountPanel"] },
    // `ariaLabel` defaults to "Sidebar navigation"; `sectionNavigation` ends in the same word.
    { kind: "SidebarNavigation", entries: ["sidebarNavigation"], common: ["search"], stillEnglish: ["navigation"] },
    { kind: "TopNavbar", entries: ["topNavbar", "themeToggle"] },
    { kind: "Select", entries: ["select"] },
    { kind: "Calendar", entries: ["calendar"] },
    { kind: "MediaGrid", entries: ["mediaGrid"] },
    { kind: "SortableList", entries: ["sortableList"] },
    { kind: "Stepper", entries: ["stepper"] },
    { kind: "Gallery", entries: ["photoGrid", "photoViewer"] },
    { kind: "ThemeToggle", entries: ["themeToggle"] },
    { kind: "AppBar", entries: [], common: ["back"] },
    { kind: "RequiredField", entries: [], common: ["required"] },
    { kind: "PasswordField", entries: [], common: ["showPassword"] },
    { kind: "SidebarPanel", entries: [], common: ["search"] },
    { kind: "ConfirmDialog", entries: [], common: ["confirm", "cancel"] },
    { kind: "DropdownSheet", entries: [], common: ["close", "expand", "collapse"] },
    { kind: "SidebarDrawer", entries: [], common: ["close"] },
    { kind: "Modal", entries: [], common: ["close"] },
    { kind: "Drawer", entries: [], common: ["close"] },
    { kind: "SlideUp", entries: [], common: ["close"] },
    { kind: "BottomSheet", entries: [], common: ["close", "expand", "collapse"] },
    // Mounted under the provider, with one toast on screen.
    { kind: "Toaster", entries: ["toaster"] },
    { kind: "Rating", entries: ["rating"] },
    { kind: "DateField", entries: ["dateField"] },
    { kind: "TimeField", entries: ["timeField"] },
    { kind: "AvatarGroup", entries: ["avatarGroup"] },
    { kind: "SwipeableListItem", entries: ["swipeableListItem"] },
    { kind: "PullToRefresh", entries: ["pullToRefresh"] },
    { kind: "Toast", entries: ["toast"] },
    { kind: "Alert", entries: ["alert"] },
    { kind: "CodeBlock", entries: ["codeBlock"] },
    { kind: "ImageUpload", entries: ["imageUpload"] },
    { kind: "UnsavedChangesBar", entries: ["unsavedChangesBar"] },
    // Select's own entry names the sheet's buttons too, and wins over `common`: see the test for that below.
    { kind: "SelectSheet", entries: ["select"] },
];

// A toast enters with a transition, which this DOM has no `animate` for.
if (typeof Element.prototype.animate !== "function") {
    Element.prototype.animate = function animate() {
        const animation = {
            cancel() {},
            finish() {},
            onfinish: null as null | (() => void),
            finished: Promise.resolve(),
            currentTime: 0,
            playState: "finished",
        };
        queueMicrotask(() => animation.onfinish?.());
        return animation as unknown as Animation;
    };
}

/** Brings a provider-harness kind into the state that says the most. */
async function revealProvided(kind: string) {
    if (kind === "SelectSheet") {
        await fireEvent.click(document.querySelector<HTMLElement>('button[aria-haspopup="listbox"]')!);
        await waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
        return;
    }
    if (kind === "Toaster") {
        await waitFor(() => expect(document.querySelector("[data-toast-id]")).not.toBeNull());
        return;
    }
    if (kind === "DateField" || kind === "TimeField") {
        const button = await waitFor(() => {
            const found = document.querySelector<HTMLElement>('button[aria-haspopup="dialog"]');
            expect(found).not.toBeNull();
            return found!;
        });
        await fireEvent.click(button);
        await waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
        return;
    }
    if (
        ["DropdownSheet", "SidebarDrawer", "ConfirmDialog", "Gallery", "Modal", "Drawer", "SlideUp", "BottomSheet"].includes(
            kind,
        )
    ) {
        await waitFor(() => expect(document.querySelector('[role="dialog"], [role="alertdialog"]')).not.toBeNull());
        return;
    }
    await reveal[kind]?.();
}

describe.each(PROVIDED)("$kind under a ZabiStringsProvider", ({ kind, entries, common, stillEnglish }) => {
    /** A sentence that takes something other than text (Calendar's takes a list of events) is left out. */
    const englishOf = (defaults: Words) =>
        Object.entries(defaults).flatMap(([key, value]) => {
            try {
                return english({ [key]: value });
            } catch {
                return [];
            }
        });
    const wordsOf = () => [
        ...entries.flatMap((entry) => englishOf(ENTRY_DEFAULTS[entry])),
        ...(common ?? []).map((key) => DEFAULT_ZABI_COMMON_STRINGS[key]),
    ];

    it("with nothing set on the component, no default English is left", async () => {
        // What it says by default, to know which of its words this state shows at all.
        const plain = render(ZabiStringsHarness, { kind });
        await revealProvided(kind);
        const before = everythingSaid();
        plain.unmount();
        cleanup();
        const shown = wordsOf().filter((word) => before.includes(word) && !(stillEnglish ?? []).includes(word));
        expect(shown.length, `${kind} shows none of its default words in this state`).toBeGreaterThan(0);

        render(ZabiStringsHarness, { kind, strings: sentinelProvider() });
        await revealProvided(kind);
        const said = everythingSaid();
        for (const word of shown) {
            expect(said, `"${word}" is still said`).not.toContain(word);
        }
        // And the provider's own words are what is said instead: one per entry it reads.
        for (const entry of entries) expect(said).toContain(markOf(entry));
        // A common word this state showed in English is now the provider's.
        for (const key of common ?? []) {
            if (before.includes(DEFAULT_ZABI_COMMON_STRINGS[key])) expect(said, key).toContain(commonMark(key));
        }
    });

    it("without a provider it says what it always said", async () => {
        render(ZabiStringsHarness, { kind });
        await revealProvided(kind);
        expect(everythingSaid()).not.toContain("¤");
    });
});

describe("ZabiStringsProvider", () => {
    it("the common words are today's English, word for word", () => {
        expect(DEFAULT_ZABI_COMMON_STRINGS).toEqual({
            close: "Close",
            back: "Back",
            expand: "Expand",
            collapse: "Collapse",
            required: "(required)",
            showPassword: "Show password",
            search: "Search...",
            confirm: "Confirm",
            cancel: "Cancel",
        });
    });

    it("an instance's strings win over the provider, and a single-text prop over both", async () => {
        const { default: Select } = await import("../src/components/atoms/Select.svelte");
        const { default: Wrapper } = await import("./fixtures/ZabiStringsOrderHarness.svelte");
        render(Wrapper, { component: Select });
        const triggers = [...document.querySelectorAll('button[aria-haspopup="listbox"]')].map((button) =>
            button.textContent!.trim(),
        );
        // Provider only; provider + strings; provider + strings + the placeholder prop.
        expect(triggers).toEqual(["Från appen", "Från instansen", "Från propen"]);
    });

    it("Select's sheet says the common words when the provider gives no words for Select itself", async () => {
        render(ZabiStringsHarness, {
            kind: "SelectSheet",
            strings: { common: { close: "Stäng", expand: "Visa mer", collapse: "Visa mindre" } },
        });
        await revealProvided("SelectSheet");
        expect(screen.getByRole("button", { name: "Stäng" })).toBeTruthy();
        expect(screen.getByRole("button", { name: /Visa mer|Visa mindre/ })).toBeTruthy();
    });

    it("an inner provider replaces only the words it gives", async () => {
        render(ZabiStringsHarness, {
            kind: "DropdownSheet",
            strings: { common: { close: "Stäng", expand: "Visa mer", collapse: "Visa mindre" } },
            inner: { common: { close: "Stäng menyn" } },
        });
        await waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
        expect(screen.getByRole("button", { name: "Stäng menyn" })).toBeTruthy();
        // From the outer one, untouched by the inner.
        expect(screen.getByRole("button", { name: /Visa mer|Visa mindre/ })).toBeTruthy();
        // And outside the inner provider the outer word still stands.
        expect(screen.getByTestId("outer-probe").textContent).toBe("Stäng");
    });

    it("overlays rendered in <body> still read the provider they were written under", async () => {
        render(ZabiStringsHarness, { kind: "Portals", strings: { common: { close: "Stäng" } } });
        await waitFor(() => expect(document.querySelectorAll('[role="dialog"]').length).toBe(3));
        for (const id of ["in-page", "in-modal", "in-drawer", "in-sheet"]) {
            expect(screen.getByTestId(id).textContent, id).toBe("Stäng");
        }
        // Each overlay is in <body>, not inside the harness's own container.
        expect(screen.getByTestId("in-modal").closest('[role="dialog"]')!.closest("[data-overlay-depth]")!.parentElement).toBe(
            document.body,
        );
    });

    it("a change of the provider's strings after mount changes the words: a language switch", async () => {
        const { rerender } = render(ZabiStringsHarness, {
            kind: "AppBar",
            strings: { common: { back: "Tillbaka" } },
        });
        expect(screen.getByRole("link", { name: "Tillbaka" })).toBeTruthy();
        await rerender({ kind: "AppBar", strings: { common: { back: "Takaisin" } } });
        await waitFor(() => expect(screen.getByRole("link", { name: "Takaisin" })).toBeTruthy());
        expect(screen.queryByRole("link", { name: "Tillbaka" })).toBeNull();
        // And a component's own entry, in the same way.
        cleanup();
        const select = render(ZabiStringsHarness, {
            kind: "SelectSheet",
            strings: { select: { placeholder: "Välj" } },
        });
        expect(document.querySelector('button[aria-haspopup="listbox"]')!.textContent).toContain("Välj");
        await select.rerender({ kind: "SelectSheet", strings: { select: { placeholder: "Valitse" } } });
        await waitFor(() =>
            expect(document.querySelector('button[aria-haspopup="listbox"]')!.textContent).toContain("Valitse"),
        );
    });

    it("the Toaster says the words of the provider it is mounted under", async () => {
        render(ZabiStringsHarness, {
            kind: "Toaster",
            strings: { toaster: { regionLabel: "Aviseringar", dismiss: "Stäng aviseringen" } },
        });
        await waitFor(() => expect(document.querySelector("[data-toast-id]")).not.toBeNull());
        expect(document.querySelector("[data-zabi-toaster]")!.getAttribute("aria-label")).toBe("Aviseringar");
        expect(screen.getAllByRole("button", { name: "Stäng aviseringen" }).length).toBeGreaterThan(0);
        expect(screen.queryByRole("button", { name: "Dismiss notification" })).toBeNull();
    });

    it("app code outside any provider reads nothing", () => {
        render(ZabiStringsHarness, { kind: "Portals" });
        expect(screen.getByTestId("in-page").textContent).toBe("(none)");
    });
});
