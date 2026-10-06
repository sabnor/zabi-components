import { cleanup, render, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import NavMenuHarness from "./fixtures/NavMenuHarness.svelte";

/**
 * NavigationMenu at a narrow width: the list wraps, and a panel is moved back
 * inside the screen. jsdom has no layout, so the boxes are supplied here; the
 * real ones are measured in playwright/navigation-menu.spec.ts.
 */

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

function layOut(itemLeft: number, panelWidth = 200) {
    Object.defineProperty(document.documentElement, "clientWidth", {
        configurable: true,
        get: () => 375,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
        configurable: true,
        get: () => 667,
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
        this: HTMLElement,
    ) {
        if (this.hasAttribute("data-navigation-menu-content")) {
            return { left: itemLeft, top: 148, right: itemLeft + panelWidth, bottom: 248, width: panelWidth, height: 100 } as DOMRect;
        }
        // The item the panel hangs from.
        return { left: itemLeft, top: 100, right: itemLeft + 80, bottom: 140, width: 80, height: 40 } as DOMRect;
    });
}

const panel = () => document.querySelector<HTMLElement>("[data-navigation-menu-content]")!;
const trigger = (name: string) =>
    [...document.querySelectorAll<HTMLElement>("[data-navigation-menu-trigger]")].find(
        (button) => button.textContent?.trim() === name,
    )!;

describe("NavigationMenu at a narrow width", () => {
    it("lets the list wrap onto further rows", () => {
        render(NavMenuHarness);
        const list = document.querySelector("[data-navigation-menu-list]")!;
        expect(list.className.split(/\s+/)).toEqual(
            expect.arrayContaining(["flex", "flex-row", "flex-wrap"]),
        );
        // A list of links and disclosure buttons, not a menu bar: there are no arrow keys.
        expect(list.getAttribute("role")).toBe("list");
        expect(list.hasAttribute("aria-orientation")).toBe(false);
        const items = [...list.children];
        expect(items.length).toBeGreaterThan(0);
        for (const item of items) {
            expect(item.tagName).toBe("LI");
            // Not presentational any more: each is a list item.
            expect(item.hasAttribute("role")).toBe(false);
        }
        // The triggers are plain buttons that say whether their panel is open.
        for (const trigger of list.querySelectorAll("[data-navigation-menu-trigger]")) {
            expect(trigger.tagName).toBe("BUTTON");
            expect(trigger.getAttribute("aria-expanded")).toBe("false");
            expect(trigger.hasAttribute("role")).toBe(false);
        }
        expect(list.closest("nav")).not.toBeNull();
    });

    it("moves a panel that would leave the screen back inside it", async () => {
        // 182 + 200 = 382: 7px past a 375px screen, as the review found.
        layOut(182);
        const user = userEvent.setup();
        render(NavMenuHarness);
        await user.click(trigger("Two"));

        await waitFor(() => expect(panel()).toBeTruthy());
        // 15px to the left: its right edge is then 8px from the edge of the screen.
        await waitFor(() => expect(panel().style.left).toBe("-15px"));
        expect(panel().style.maxWidth).toBe("");
        // Still positioned from the left of its item, below it.
        expect(panel().className).toContain("left-0");
        expect(panel().className).toContain("top-full");
    });

    it("leaves a panel that fits exactly where it was, with no inline style", async () => {
        layOut(20);
        const user = userEvent.setup();
        render(NavMenuHarness);
        await user.click(trigger("One"));

        await waitFor(() => expect(panel()).toBeTruthy());
        expect(panel().getAttribute("style") ?? "").toBe("");
    });

    it("narrows a panel wider than the screen to the screen less 16px", async () => {
        layOut(100, 600);
        const user = userEvent.setup();
        render(NavMenuHarness);
        await user.click(trigger("One"));

        await waitFor(() => expect(panel().style.maxWidth).toBe("359px"));
        // Its left edge is on the 8px margin: 100 - 92.
        expect(panel().style.left).toBe("-92px");
        // The class's 200px minimum must not hold it wider than the limit.
        expect(panel().style.minWidth).toBe("0px");
    });
});
