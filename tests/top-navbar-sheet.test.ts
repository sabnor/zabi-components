import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import TopNavbarSheetHarness from "./fixtures/TopNavbarSheetHarness.svelte";

/**
 * TopNavbar's phone menu as a sheet (the default). jsdom applies no media
 * query, so the row and the button are both in the DOM; what is shown at which
 * width is in playwright/top-navbar.spec.ts.
 */

const items = [
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/components" },
    { label: "Theming", href: "/theming" },
    { label: "GitHub", href: "https://github.com/example/repo" },
];

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

const menuButton = () => screen.getByRole("button", { name: /^(Open|Close) menu$/ });
const sheet = () => screen.queryByRole("dialog");
const sheetNav = () => within(sheet()!).getByRole("navigation");

async function open(props: Record<string, unknown> = {}) {
    const user = userEvent.setup();
    const view = render(TopNavbarSheetHarness, {
        props: { brand: "Zabi", brandHref: "/", items, preventNavigation: true, ...props },
    });
    await user.click(menuButton());
    await waitFor(() => expect(sheet()).not.toBeNull());
    return { user, ...view };
}

describe("TopNavbar phone menu as a sheet", () => {
    it("is a closed dialog button until it is pressed, with no sheet in the page", () => {
        render(TopNavbarSheetHarness, { props: { brand: "Zabi", items } });
        expect(menuButton().getAttribute("aria-haspopup")).toBe("dialog");
        expect(menuButton().getAttribute("aria-expanded")).toBe("false");
        expect(menuButton().hasAttribute("aria-controls")).toBe(false);
        expect(sheet()).toBeNull();
    });

    it("opens a modal dialog named from the strings, and names it with aria-controls only while open", async () => {
        await open();
        const dialog = sheet()!;
        expect(dialog.getAttribute("aria-modal")).toBe("true");
        expect(screen.getByRole("dialog", { name: "Menu" })).toBe(dialog);
        expect(menuButton().getAttribute("aria-expanded")).toBe("true");
        expect(menuButton().getAttribute("aria-controls")).toBe(dialog.id);
        expect(dialog.id.startsWith("topnavbar-menu")).toBe(true);
        // The inline panel is not drawn as well.
        expect(document.querySelector(".topnavbar-menu")).toBeNull();
    });

    it("names the dialog and its nav from the strings, and the nav from ariaLabel when there is one", async () => {
        const first = await open({ strings: { menuTitle: "Meny" } });
        expect(screen.getByRole("dialog", { name: "Meny" })).toBeTruthy();
        expect(within(sheet()!).getByRole("navigation", { name: "Meny" })).toBeTruthy();
        first.unmount();
        await open({ ariaLabel: "Main navigation" });
        expect(within(sheet()!).getByRole("navigation", { name: "Main navigation" })).toBeTruthy();
    });

    it("is as tall as its content, up to the full screen and not half of it", async () => {
        await open();
        expect(sheet()!.style.height).toBe("auto");
        expect(sheet()!.style.maxHeight).not.toContain("50%");
        expect(sheet()!.style.maxHeight).toContain("100%");
    });

    it("holds the links in order, the current page marked, and the external one flagged", async () => {
        await open({ currentPath: "/components" });
        const links = within(sheetNav()).getAllByRole("link");
        expect(links.map((link) => link.textContent?.replace(/\s+/g, " ").trim())).toEqual([
            "Docs",
            "Components",
            "Theming",
            "GitHub (opens in a new tab)",
        ]);
        expect(links.map((link) => link.getAttribute("aria-current"))).toEqual([null, "page", null, null]);
        expect(links[3].getAttribute("target")).toBe("_blank");
        // Full rows, 44px on every pointer.
        for (const link of links) {
            expect(link.className.split(/\s+/)).toContain("w-full");
            expect(link.firstElementChild!.className.split(/\s+/)).toContain("h-11");
        }
    });

    it("draws the actions and the theme choice after the links, in a section of their own", async () => {
        await open({ withActions: true });
        const dialog = sheet()!;
        const signIn = within(dialog).getByTestId("signin");
        const theme = within(dialog).getByRole("radiogroup", { name: "Theme" });
        const last = within(sheetNav()).getAllByRole("link").at(-1)!;
        expect(last.compareDocumentPosition(signIn) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(signIn.compareDocumentPosition(theme) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        // Apart from the links, outside their nav.
        expect(sheetNav().contains(signIn)).toBe(false);
        expect(signIn.closest("[data-topnavbar-sheet-section]")).toBe(theme.closest("[data-topnavbar-sheet-section]"));
    });

    it("tells the caller's actions where they are: the sheet says menu, the bar says bar", async () => {
        await open({ withActions: true });
        const places = screen.getAllByTestId("place");
        expect(places.filter((place) => sheet()!.contains(place)).map((p) => p.dataset.place)).toEqual(["menu"]);
        expect(places.filter((place) => !sheet()!.contains(place)).map((p) => p.dataset.place)).toEqual(["bar"]);
    });

    it("leaves the sheet open when a theme is chosen, and the accent too", async () => {
        const { user } = await open({ themeStorageKey: null });
        await user.click(within(sheet()!).getByRole("radio", { name: "Dark" }));
        await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
        expect(sheet()).not.toBeNull();
        await user.click(within(sheet()!).getByRole("radio", { name: "Light" }));
        expect(sheet()).not.toBeNull();
    });

    it("has a theme choice of light and dark that writes the page, and a press on the chosen one changes nothing", async () => {
        document.documentElement.classList.remove("dark");
        document.documentElement.removeAttribute("data-theme");
        const { user } = await open({ themeStorageKey: null });
        const group = within(sheet()!).getByRole("radiogroup", { name: "Theme" });
        const light = within(group).getByRole("radio", { name: "Light" }) as HTMLInputElement;
        const dark = within(group).getByRole("radio", { name: "Dark" }) as HTMLInputElement;
        expect(within(group).queryByRole("radio", { name: "System" })).toBeNull();
        expect(light.checked).toBe(true);

        await user.click(dark);
        await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
        await waitFor(() => expect(dark.checked).toBe(true));
        expect(sheet()).not.toBeNull();

        await user.click(dark);
        expect(dark.checked).toBe(true);
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        await user.click(light);
        await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(false));
    });

    it("has system, light and dark with three modes, and writes data-theme", async () => {
        document.documentElement.classList.remove("dark");
        document.documentElement.removeAttribute("data-theme");
        const { user } = await open({ themeModes: "three", themeStorageKey: null, themeLabels: { auto: "auto" } });
        const group = within(sheet()!).getByRole("radiogroup", { name: "Theme" });
        expect(within(group).getAllByRole("radio").map((radio) => radio.getAttribute("value"))).toEqual([
            "auto",
            "light",
            "dark",
        ]);
        await user.click(within(group).getByRole("radio", { name: "Auto" }));
        await waitFor(() => expect(document.documentElement.getAttribute("data-theme")).toBe("auto"));
        document.documentElement.removeAttribute("data-theme");
    });

    it("names the theme heading from the strings", async () => {
        await open({ strings: { themeHeading: "Tema" } });
        expect(within(sheet()!).getByRole("radiogroup", { name: "Tema" })).toBeTruthy();
    });

    it("leaves the theme choice out of the sheet when the bar has no theme toggle", async () => {
        await open({ showThemeToggle: false });
        expect(within(sheet()!).queryByRole("radiogroup")).toBeNull();
    });

    it("draws the bar's own nav snippet in place of the items", async () => {
        await open({ withNav: true });
        expect(within(sheetNav()).getByTestId("own-nav")).toBeTruthy();
        expect(within(sheetNav()).getByRole("link", { name: "Own link" })).toBeTruthy();
    });

    it("moves focus into the sheet and returns it to the menu button on Escape", async () => {
        const { user } = await open();
        await waitFor(() => expect(sheet()!.contains(document.activeElement)).toBe(true));
        await user.keyboard("{Escape}");
        await waitFor(() => expect(sheet()).toBeNull());
        expect(menuButton().getAttribute("aria-expanded")).toBe("false");
        expect(document.activeElement).toBe(menuButton());
    });

    it("closes on the backdrop and on the close button, and locks the page while open", async () => {
        const { user } = await open();
        expect(document.body.style.overflow).toBe("hidden");
        await user.click(screen.getByRole("button", { name: "Close" }));
        await waitFor(() => expect(sheet()).toBeNull());
        expect(document.body.style.overflow).toBe("");

        await user.click(menuButton());
        await waitFor(() => expect(sheet()).not.toBeNull());
        await fireEvent.click(sheet()!.parentElement!);
        await waitFor(() => expect(sheet()).toBeNull());
        expect(document.body.style.overflow).toBe("");
    });

    it("closes when a link is followed, and still reports the click", async () => {
        const onclick = vi.fn();
        const { user } = await open({ onclick });
        await user.click(within(sheetNav()).getByRole("link", { name: "Components" }));
        await waitFor(() => expect(sheet()).toBeNull());
        expect(menuButton().getAttribute("aria-expanded")).toBe("false");
        expect(onclick).toHaveBeenCalledTimes(1);
    });

    it("closes for a same-page anchor and for a link in the caller's actions, not for a button", async () => {
        const first = await open({ items: [{ label: "Top", href: "#top" }], withActions: true });
        await first.user.click(within(sheet()!).getByTestId("help"));
        expect(sheet()).not.toBeNull();
        await first.user.click(within(sheetNav()).getByRole("link", { name: "Top" }));
        await waitFor(() => expect(sheet()).toBeNull());

        await first.user.click(menuButton());
        await waitFor(() => expect(sheet()).not.toBeNull());
        await first.user.click(within(sheet()!).getByTestId("signin"));
        await waitFor(() => expect(sheet()).toBeNull());
    });

    it("closes when the current path changes", async () => {
        const { rerender } = await open({ currentPath: "/docs" });
        await rerender({ currentPath: "/docs" });
        expect(sheet()).not.toBeNull();
        await rerender({ currentPath: "/theming" });
        await waitFor(() => expect(sheet()).toBeNull());
    });

    it("closes when the screen widens past the breakpoint, and lets go of the scroll lock", async () => {
        const listeners: ((event: { matches: boolean }) => void)[] = [];
        const breakpoint = {
            matches: false,
            addEventListener: (_: string, fn: (event: { matches: boolean }) => void) => listeners.push(fn),
            removeEventListener: () => {},
        };
        const other = { matches: false, addEventListener: () => {}, removeEventListener: () => {} };
        vi.stubGlobal(
            "matchMedia",
            vi.fn((query: string) => (query === "(min-width: 48rem)" ? breakpoint : other)),
        );
        await open();
        expect(document.body.style.overflow).toBe("hidden");
        breakpoint.matches = true;
        listeners.forEach((fn) => fn({ matches: true }));
        await waitFor(() => expect(sheet()).toBeNull());
        expect(document.body.style.overflow).toBe("");
    });

    it("does not give the bar the material while the sheet is open", async () => {
        render(TopNavbarSheetHarness, { props: { brand: "Zabi", items } });
        const bar = document.querySelector<HTMLElement>("nav[data-scrolled-under]")!;
        expect(bar.dataset.scrolledUnder).toBe("false");
        await userEvent.setup().click(menuButton());
        await waitFor(() => expect(sheet()).not.toBeNull());
        expect(bar.dataset.scrolledUnder).toBe("false");
    });

    it("ignores a press outside and a focus move out of it: the dialog is modal", async () => {
        const { user } = await open();
        await user.click(document.body);
        expect(sheet()).not.toBeNull();
    });

    it("draws the embedded list alone, with no sheet or button", () => {
        render(TopNavbarSheetHarness, { props: { embedded: true, items } });
        expect(screen.queryByRole("button", { name: /menu/i })).toBeNull();
        expect(sheet()).toBeNull();
    });
});

describe('TopNavbar menu="inline"', () => {
    it("is a disclosure, as before: no dialog, no aria-haspopup, the panel under the bar", async () => {
        const user = userEvent.setup();
        render(TopNavbarSheetHarness, { props: { brand: "Zabi", items, menu: "inline" } });
        expect(menuButton().hasAttribute("aria-haspopup")).toBe(false);
        await user.click(menuButton());
        expect(sheet()).toBeNull();
        expect(document.querySelector(".topnavbar-menu")).not.toBeNull();
        expect(menuButton().getAttribute("aria-label")).toBe("Close menu");
        expect(document.body.style.overflow).toBe("");
    });
});
