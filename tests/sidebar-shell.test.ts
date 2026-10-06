import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import SidebarShellHarness from "./fixtures/SidebarShellHarness.svelte";

/**
 * SidebarShell's small-screen mode. Which of the rail and the drawer is seen
 * at a width is CSS (`hidden lg:flex`, `lg:hidden`) and is measured in
 * playwright/sidebar-drawer.spec.ts; this pins the structure, the names and
 * what closes the drawer.
 */

/** What `(min-width: 1024px)` answers, and a way to change it. */
function screenWidth(wide: boolean) {
    const listeners = new Set<() => void>();
    const query = {
        matches: wide,
        media: "(min-width: 1024px)",
        addEventListener: (_: string, listener: () => void) => listeners.add(listener),
        removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
    };
    vi.stubGlobal("matchMedia", () => query);
    return (next: boolean) => {
        query.matches = next;
        for (const listener of listeners) listener();
    };
}

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    document.body.style.overflow = "";
});

const rail = () => screen.getByTestId("rail");
const isOpen = () => screen.getByTestId("open").textContent;

describe("SidebarShell", () => {
    it("without mobile it is the rail it always was: a flex nav, no trigger, no drawer", () => {
        screenWidth(false);
        render(SidebarShellHarness);
        expect(rail().tagName).toBe("NAV");
        expect(rail().getAttribute("aria-label")).toBe("Main menu");
        expect(rail().className).toMatch(/(?:^|\s)flex(?:\s|$)/);
        expect(rail().className).not.toContain("hidden");
        expect(rail().className).toContain("w-[266px]");
        expect(screen.queryByRole("button", { name: "Menu" })).toBeNull();
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("names its scrolling region Navigation links, or what label says", () => {
        screenWidth(false);
        const first = render(SidebarShellHarness);
        expect(within(rail()).getByRole("region", { name: "Navigation links" })).toBeTruthy();
        first.unmount();
        render(SidebarShellHarness, { label: "Länkar" });
        expect(within(rail()).getByRole("region", { name: "Länkar" })).toBeTruthy();
    });

    it("drawer: the rail is only a flex box from lg up, and the trigger only shows below it", () => {
        screenWidth(false);
        render(SidebarShellHarness, { mobile: "drawer" });
        expect(rail().className).toContain("hidden");
        expect(rail().className).toContain("lg:flex");
        expect(rail().className).not.toMatch(/(?:^|\s)flex(?:\s|$)/);
        const trigger = screen.getByRole("button", { name: "Menu" });
        expect(trigger.closest("[data-sidebar-trigger]")!.className).toContain("lg:hidden");
        expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
        expect(trigger.getAttribute("aria-expanded")).toBe("false");
        // Nothing of the sidebar is in the page twice while the drawer is closed.
        expect(screen.getAllByText("Home")).toHaveLength(1);
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("drawer: the trigger opens a dialog named by drawerTitle with the same regions, spelled out", async () => {
        screenWidth(false);
        const user = userEvent.setup();
        render(SidebarShellHarness, { mobile: "drawer", drawerTitle: "Menu" });
        await user.click(screen.getByRole("button", { name: "Menu" }));
        const dialog = await screen.findByRole("dialog", { name: "Menu" });
        expect(dialog.className).toContain("lg:hidden");
        expect(dialog.getAttribute("data-side")).toBe("start");
        const nav = within(dialog).getByRole("navigation", { name: "Main menu" });
        expect(within(nav).getByRole("region", { name: "Navigation links" })).toBeTruthy();
        expect(within(nav).getByRole("link", { name: "Home" })).toBeTruthy();
        expect(within(nav).getByTestId("brand").getAttribute("data-collapsed")).toBe("false");
        expect(within(nav).getByTestId("foot")).toBeTruthy();
        // The drawer's padding is the inset there.
        expect(within(nav).getByRole("link", { name: "Home" }).getAttribute("data-inset")).toBe("px-0");
        expect(screen.getByRole("button", { name: "Menu", hidden: true }).getAttribute("aria-expanded")).toBe("true");
        expect(isOpen()).toBe("true");
    });

    it("drawer: without drawerTitle the dialog is named by ariaLabel; a button of the app's own opens it too", async () => {
        screenWidth(false);
        const user = userEvent.setup();
        render(SidebarShellHarness, { mobile: "drawer", withTrigger: false });
        expect(screen.queryByRole("button", { name: "Menu" })).toBeNull();
        await user.click(screen.getByRole("button", { name: "Own button" }));
        expect(await screen.findByRole("dialog", { name: "Main menu" })).toBeTruthy();
    });

    it("drawer: following a link closes it; a button in it does not", async () => {
        screenWidth(false);
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(SidebarShellHarness, { mobile: "drawer", initialOpen: true, onclose });
        const dialog = await screen.findByRole("dialog");
        await user.click(within(dialog).getByRole("button", { name: "Not a link" }));
        expect(screen.getByRole("dialog")).toBeTruthy();
        expect(onclose).not.toHaveBeenCalled();
        await user.click(within(dialog).getByRole("link", { name: "Teams" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).toHaveBeenCalledWith({ reason: "navigate" });
        expect(isOpen()).toBe("false");
    });

    it("drawer: Escape and the close button close it and say so", async () => {
        screenWidth(false);
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(SidebarShellHarness, { mobile: "drawer", onclose });
        await user.click(screen.getByRole("button", { name: "Menu" }));
        await screen.findByRole("dialog");
        await user.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).toHaveBeenLastCalledWith({ reason: "escape" });
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: "Menu" })));

        await user.click(screen.getByRole("button", { name: "Menu" }));
        const dialog = await screen.findByRole("dialog");
        await user.click(within(dialog).getByRole("button", { name: "Close" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).toHaveBeenLastCalledWith({ reason: "close-button" });
    });

    it("drawer: it closes when the screen reaches lg, where the rail is", async () => {
        const resize = screenWidth(false);
        const onclose = vi.fn();
        render(SidebarShellHarness, { mobile: "drawer", initialOpen: true, onclose });
        await screen.findByRole("dialog");
        resize(true);
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).toHaveBeenCalledWith({ reason: "resize" });
        expect(isOpen()).toBe("false");
    });
});
