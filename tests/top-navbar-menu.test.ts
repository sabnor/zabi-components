import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import TopNavbar from "../src/components/organisms/TopNavbar.svelte";

/**
 * TopNavbar's phone menu: when it closes, where focus goes, and what the menu
 * button says about it. jsdom applies no media query, so the row and the menu
 * are both in the DOM here; what is shown at which width, and every size, is
 * in playwright/top-navbar.spec.ts.
 */

const items = [
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/components" },
    { label: "Theming", href: "/theming" },
];

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

const menuButton = () => screen.getByRole("button", { name: /^(Open|Close) menu$/ });
const panel = () => document.querySelector<HTMLElement>("[id^='topnavbar-menu']");
/** A link inside the open menu (the row has one of the same name). */
const menuLink = (name: string) =>
    [...panel()!.querySelectorAll<HTMLAnchorElement>("a")].find(
        (link) => link.textContent?.trim() === name,
    )!;

async function open(props: Record<string, unknown> = {}) {
    const user = userEvent.setup();
    const view = render(TopNavbar, {
        props: { brand: "Zabi", brandHref: "/", items, preventNavigation: true, ...props },
    });
    await user.click(menuButton());
    expect(panel()).not.toBeNull();
    return { user, ...view };
}

describe("TopNavbar phone menu", () => {
    it("names its panel with aria-controls only while the panel exists", async () => {
        const { user } = await open();
        expect(menuButton().getAttribute("aria-expanded")).toBe("true");
        expect(menuButton().getAttribute("aria-controls")).toBe(panel()!.id);

        await user.click(menuButton());
        expect(panel()).toBeNull();
        expect(menuButton().getAttribute("aria-expanded")).toBe("false");
        // Not a reference to an element that is not there.
        expect(menuButton().hasAttribute("aria-controls")).toBe(false);
    });

    it("closes when a link in it is followed, and still reports the click", async () => {
        const onclick = vi.fn();
        const { user } = await open({ onclick });
        await user.click(menuLink("Components"));
        expect(panel()).toBeNull();
        expect(menuButton().getAttribute("aria-expanded")).toBe("false");
        expect(onclick).toHaveBeenCalledTimes(1);
    });

    it("closes for a link in the caller's own actions too, but not for a button there", async () => {
        const { user } = await open();
        // The theme toggle is a button inside the panel: using it keeps the menu open.
        const toggle = panel()!.querySelector("button")!;
        await user.click(toggle);
        expect(panel()).not.toBeNull();
    });

    it("closes when the current path changes", async () => {
        const { rerender } = await open({ currentPath: "/docs" });
        await rerender({ currentPath: "/docs" });
        expect(panel()).not.toBeNull();
        await rerender({ currentPath: "/theming" });
        expect(panel()).toBeNull();
    });

    it("closes on Escape and returns focus to the menu button when focus was in the menu", async () => {
        const { user } = await open();
        menuLink("Docs").focus();
        await user.keyboard("{Escape}");
        expect(panel()).toBeNull();
        expect(document.activeElement).toBe(menuButton());
    });

    it("leaves focus alone on Escape when it was not in the menu", async () => {
        const { user } = await open();
        const outside = document.createElement("button");
        document.body.append(outside);
        // Focus elsewhere without the focus move closing it first.
        menuButton().focus();
        await user.keyboard("{Escape}");
        expect(panel()).toBeNull();
        expect(document.activeElement).toBe(menuButton());
        outside.remove();
    });

    it("leaves Escape to a menu inside it that has already handled the key", async () => {
        await open();
        const event = new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true });
        event.preventDefault();
        window.dispatchEvent(event);
        expect(panel()).not.toBeNull();
    });

    it("closes on a press outside the bar, and not on one inside it", async () => {
        const { user } = await open();
        await user.click(panel()!);
        expect(panel()).not.toBeNull();
        await user.click(screen.getByRole("link", { name: "Zabi" }));
        expect(panel()).not.toBeNull();

        await user.click(document.body);
        expect(panel()).toBeNull();
    });

    it("stays open until a press outside is complete, so the control under it gets its click", async () => {
        await open();
        const outside = document.createElement("button");
        const clicked = vi.fn();
        outside.addEventListener("click", clicked);
        document.body.append(outside);

        // The way down, and the focus move that comes with it: still open.
        // Closing here moves the page under the pointer before the click.
        await fireEvent.pointerDown(outside);
        await fireEvent.pointerUp(outside);
        await fireEvent.mouseDown(outside);
        outside.focus();
        expect(panel()).not.toBeNull();

        await fireEvent.mouseUp(outside);
        await fireEvent.click(outside);
        expect(clicked).toHaveBeenCalledTimes(1);
        expect(panel()).toBeNull();
        outside.remove();
    });

    it("closes on a press outside whose click a handler stops from bubbling", async () => {
        const { user } = await open();
        const outside = document.createElement("button");
        outside.addEventListener("click", (event) => event.stopPropagation());
        document.body.append(outside);
        await user.click(outside);
        expect(panel()).toBeNull();
        outside.remove();
    });

    it("closes when focus moves out of the bar, and leaves it there", async () => {
        await open();
        const outside = document.createElement("button");
        document.body.append(outside);
        menuLink("Docs").focus();
        expect(panel()).not.toBeNull();

        outside.focus();
        await waitFor(() => expect(panel()).toBeNull());
        expect(document.activeElement).toBe(outside);
        outside.remove();
    });

    it("closes when the screen widens past the breakpoint", async () => {
        // Only the bar's own query is tracked; other code asks about other media.
        const listeners: ((event: { matches: boolean }) => void)[] = [];
        const breakpoint = {
            matches: false,
            addEventListener: (_: string, fn: (event: { matches: boolean }) => void) =>
                listeners.push(fn),
            removeEventListener: () => {},
        };
        const other = { matches: false, addEventListener: () => {}, removeEventListener: () => {} };
        vi.stubGlobal(
            "matchMedia",
            vi.fn((query: string) => (query === "(min-width: 48rem)" ? breakpoint : other)),
        );
        await open();
        expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 48rem)");
        expect(listeners.length).toBeGreaterThan(0);

        // A change that is not a crossing upwards keeps it open.
        listeners.forEach((fn) => fn({ matches: false }));
        expect(panel()).not.toBeNull();
        breakpoint.matches = true;
        listeners.forEach((fn) => fn({ matches: true }));
        await waitFor(() => expect(panel()).toBeNull());
    });

    it("makes each link in the menu the full row, and leaves the row's links as pills", async () => {
        await open();
        expect(menuLink("Docs").className.split(/\s+/)).toContain("w-full");
        expect(menuLink("Docs").parentElement!.className.split(/\s+/)).toContain("w-full");
        const inRow = screen
            .getAllByRole("link", { name: "Docs" })
            .find((link) => !panel()!.contains(link))!;
        expect(inRow.className.split(/\s+/)).not.toContain("w-full");
        expect(inRow.parentElement!.className.split(/\s+/)).toContain("w-auto");
    });

    it("scrolls on its own inside the screen", async () => {
        await open();
        // The limits themselves are CSS; the class is what carries them.
        expect(panel()!.className.split(/\s+/)).toContain("topnavbar-menu");
    });

    it("lets the brand shrink and be cut short beside the menu button", () => {
        render(TopNavbar, { props: { brand: "A very long brand name", brandHref: "/", items } });
        const brand = screen.getByRole("link", { name: "A very long brand name" });
        expect(brand.className.split(/\s+/)).toEqual(expect.arrayContaining(["truncate", "min-w-0"]));
        const holder = brand.parentElement!;
        expect(holder.className.split(/\s+/)).toEqual(expect.arrayContaining(["min-w-0", "md:shrink-0"]));
        expect(holder.className.split(/\s+/)).not.toContain("shrink-0");
        expect(menuButton().parentElement!.className.split(/\s+/)).toContain("shrink-0");
    });
});

describe("TopNavbar collapseAt", () => {
    const rowAndMenu = () => {
        const holder = menuButton().parentElement!;
        const row = screen.getAllByRole("list")[0].closest("div")!.parentElement!;
        return { holder: holder.className.split(/\s+/), row: row.className.split(/\s+/) };
    };

    it("switches at md by default, as it always has", () => {
        render(TopNavbar, { props: { brand: "Zabi", items } });
        const { holder, row } = rowAndMenu();
        expect(holder).toContain("md:hidden");
        expect(row).toEqual(expect.arrayContaining(["hidden", "md:block"]));
    });

    it.each([
        ["sm", "(min-width: 40rem)"],
        ["lg", "(min-width: 64rem)"],
        ["xl", "(min-width: 80rem)"],
    ] as const)("moves the switch to %s", (collapseAt, query) => {
        const matchMedia = vi.fn(() => ({
            matches: false,
            addEventListener: () => {},
            removeEventListener: () => {},
        }));
        vi.stubGlobal("matchMedia", matchMedia);
        render(TopNavbar, { props: { brand: "Zabi", items, collapseAt } });
        const { holder, row } = rowAndMenu();
        expect(holder).toContain(`${collapseAt}:hidden`);
        expect(holder).not.toContain("md:hidden");
        expect(row).toEqual(expect.arrayContaining(["hidden", `${collapseAt}:block`]));
        expect(matchMedia).toHaveBeenCalledWith(query);
    });

    it("does not touch the embedded list", () => {
        render(TopNavbar, { props: { embedded: true, items, collapseAt: "xl" } });
        const list = screen.getByRole("list");
        expect(list.className).toContain("md:flex-row");
        expect(list.querySelector("li")!.className).toContain("md:w-auto");
        expect(screen.queryByRole("button", { name: /menu/ })).toBeNull();
    });
});
