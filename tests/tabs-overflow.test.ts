import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Tabs from "../src/components/molecules/Tabs.svelte";
import TabsHarness from "./fixtures/TabsHarness.svelte";

/**
 * Tabs that do not fit their row: the scrolling box, which edges fade, and
 * `fullWidth`. jsdom has no layout, so the scroll metrics are supplied here;
 * the real ones are measured in playwright/tabs-overflow.spec.ts.
 */

const tabs = [
    { id: "a", label: "Alpha" },
    { id: "b", label: "Beta" },
    { id: "c", label: "Gamma" },
];

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const tablist = () => screen.getByRole("tablist");
const scroller = () => tablist().querySelector<HTMLElement>(".tabs-list")!;
const classes = (element: Element) => element.className.split(/\s+/);

/** Give the scrolling box a width, a content width and a position. */
function scrollMetrics(element: HTMLElement, clientWidth: number, scrollWidth: number, scrollLeft = 0) {
    Object.defineProperty(element, "clientWidth", { configurable: true, get: () => clientWidth });
    Object.defineProperty(element, "scrollWidth", { configurable: true, get: () => scrollWidth });
    Object.defineProperty(element, "scrollLeft", {
        configurable: true,
        get: () => scrollLeft,
        set: (value: number) => {
            scrollLeft = value;
        },
    });
    return {
        scrollTo(value: number) {
            scrollLeft = value;
        },
    };
}

const fades = () => [scroller().hasAttribute("data-fade-left"), scroller().hasAttribute("data-fade-right")];

describe("Tabs structure", () => {
    it("keeps the tabs in the tablist, inside a scrolling box that is not a Tab stop", () => {
        render(Tabs, { props: { tabs, activeTab: "a" } });
        // The line under the tabs stays on the tablist.
        expect(classes(tablist())).toEqual(expect.arrayContaining(["border-b", "border-border"]));
        expect(scroller().getAttribute("role")).toBe("presentation");
        expect(scroller().getAttribute("tabindex")).toBe("-1");
        expect(screen.getAllByRole("tab")).toHaveLength(3);
        for (const tab of screen.getAllByRole("tab")) expect(scroller().contains(tab)).toBe(true);
        // One Tab stop: the selected tab.
        expect(screen.getAllByRole("tab").map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
    });

    it("lets a tab keep its width so the list scrolls instead of squeezing it", () => {
        render(Tabs, { props: { tabs, activeTab: "a" } });
        for (const tab of screen.getAllByRole("tab")) {
            expect(classes(tab)).toEqual(expect.arrayContaining(["shrink-0", "whitespace-nowrap"]));
            expect(classes(tab)).not.toContain("flex-1");
        }
    });

    it("fullWidth shares the row between the tabs", () => {
        render(Tabs, { props: { tabs, activeTab: "a", fullWidth: true } });
        for (const tab of screen.getAllByRole("tab")) {
            expect(classes(tab)).toEqual(expect.arrayContaining(["flex-1", "basis-0", "min-w-min", "text-center"]));
            expect(classes(tab)).not.toContain("shrink-0");
            expect(classes(tab)).not.toContain("whitespace-nowrap");
        }
    });

    it("pressing the selected tab changes nothing", async () => {
        const user = userEvent.setup();
        render(TabsHarness);
        await user.click(screen.getByRole("tab", { name: "Beta" }));
        expect(screen.getByTestId("bound").textContent).toBe("b");
        await user.click(screen.getByRole("tab", { name: "Beta" }));
        await user.click(screen.getByRole("tab", { name: "Beta" }));
        expect(screen.getByTestId("bound").textContent).toBe("b");
        expect(screen.getAllByRole("tab", { selected: true })).toHaveLength(1);
    });

    it("arrow keys, Home and End move and select as before, skipping a disabled tab", async () => {
        const user = userEvent.setup();
        render(TabsHarness);
        screen.getByRole("tab", { name: "Alpha" }).focus();
        await user.keyboard("{ArrowRight}");
        expect(screen.getByTestId("bound").textContent).toBe("b");
        expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Beta" }));
        await user.keyboard("{ArrowRight}");
        // Gamma is disabled.
        expect(screen.getByTestId("bound").textContent).toBe("d");
        await user.keyboard("{ArrowRight}");
        expect(screen.getByTestId("bound").textContent).toBe("a");
        await user.keyboard("{End}");
        expect(screen.getByTestId("bound").textContent).toBe("d");
        await user.keyboard("{Home}");
        expect(screen.getByTestId("bound").textContent).toBe("a");
    });
});

describe("Tabs fades", () => {
    it("has none when the tabs fit", async () => {
        render(Tabs, { props: { tabs, activeTab: "a" } });
        scrollMetrics(scroller(), 300, 300);
        await fireEvent.scroll(scroller());
        expect(fades()).toEqual([false, false]);
    });

    it("fades only the edge that has more tabs beyond it", async () => {
        render(Tabs, { props: { tabs, activeTab: "a" } });
        const metrics = scrollMetrics(scroller(), 200, 500);

        await fireEvent.scroll(scroller());
        expect(fades()).toEqual([false, true]);

        metrics.scrollTo(120);
        await fireEvent.scroll(scroller());
        expect(fades()).toEqual([true, true]);

        metrics.scrollTo(300);
        await fireEvent.scroll(scroller());
        expect(fades()).toEqual([true, false]);
    });

    it("mirrors in a right-to-left layout, where the list starts at the right", async () => {
        render(Tabs, { props: { tabs, activeTab: "a" } });
        const list = scroller();
        const real = window.getComputedStyle.bind(window);
        vi.spyOn(window, "getComputedStyle").mockImplementation((element, pseudo) => {
            const style = real(element, pseudo);
            return element === list
                ? (new Proxy(style, {
                      get: (target, key) =>
                          key === "direction" ? "rtl" : Reflect.get(target, key),
                  }) as CSSStyleDeclaration)
                : style;
        });
        // Right to left, the start is scrollLeft 0 and the end is minus the hidden width.
        const metrics = scrollMetrics(list, 200, 500, 0);
        const shown = () => [list.hasAttribute("data-fade-left"), list.hasAttribute("data-fade-right")];
        await fireEvent.scroll(list);
        expect(shown()).toEqual([true, false]);

        metrics.scrollTo(-300);
        await fireEvent.scroll(list);
        expect(shown()).toEqual([false, true]);
    });

    it("updates when the number of tabs changes", async () => {
        const { rerender } = render(Tabs, { props: { tabs, activeTab: "a" } });
        scrollMetrics(scroller(), 200, 500);
        await rerender({
            tabs: [...tabs, { id: "d", label: "Delta" }],
            activeTab: "a",
        });
        await waitFor(() => expect(fades()).toEqual([false, true]));
    });
});

describe("Tabs keep the selected and the focused tab in view", () => {
    function layOut() {
        const list = scroller();
        scrollMetrics(list, 200, 500);
        const scrollBy = vi.fn();
        list.scrollBy = scrollBy as unknown as typeof list.scrollBy;
        list.getBoundingClientRect = () =>
            ({ left: 0, right: 200, top: 0, bottom: 40, width: 200, height: 40 }) as DOMRect;
        const boxes: Record<string, [number, number]> = { Alpha: [0, 90], Beta: [90, 180], Gamma: [180, 280] };
        for (const tab of screen.getAllByRole("tab")) {
            const [left, right] = boxes[tab.textContent!.trim()];
            tab.getBoundingClientRect = () =>
                ({ left, right, top: 0, bottom: 38, width: right - left, height: 38 }) as DOMRect;
        }
        return scrollBy;
    }

    it("scrolls the list, not the page, to a tab selected out of view", async () => {
        const { rerender } = render(Tabs, { props: { tabs, activeTab: "a" } });
        const scrollBy = layOut();
        // jsdom has no scrollIntoView; give it one to see that it is never used.
        const pageScroll = vi.fn();
        Element.prototype.scrollIntoView = pageScroll;

        await rerender({ tabs, activeTab: "c" });
        await waitFor(() => expect(scrollBy).toHaveBeenCalled());
        // Gamma ends at 280 in a 200px box: 80px, and 32px of room for the fade and the ring.
        expect(scrollBy.mock.calls.at(-1)![0]).toMatchObject({ left: 112 });
        expect(pageScroll).not.toHaveBeenCalled();
    });

    it("does not scroll for a tab that is already in view", async () => {
        const { rerender } = render(Tabs, { props: { tabs, activeTab: "a" } });
        const scrollBy = layOut();
        await rerender({ tabs, activeTab: "b" });
        // Beta ends at 180: outside the 32px margin, so it is nudged by 12px only.
        await waitFor(() => expect(scrollBy).toHaveBeenCalled());
        expect(scrollBy.mock.calls.at(-1)![0]).toMatchObject({ left: 12 });
    });

    it("scrolls at once under prefers-reduced-motion, and smoothly otherwise", async () => {
        const reduced = { value: false };
        vi.stubGlobal(
            "matchMedia",
            vi.fn((query: string) => ({
                matches: query.includes("prefers-reduced-motion") && reduced.value,
                addEventListener: () => {},
                removeEventListener: () => {},
            })),
        );
        const { rerender } = render(Tabs, { props: { tabs, activeTab: "a" } });
        const scrollBy = layOut();

        await rerender({ tabs, activeTab: "c" });
        await waitFor(() => expect(scrollBy).toHaveBeenCalled());
        expect(scrollBy.mock.calls.at(-1)![0]).toMatchObject({ behavior: "smooth" });

        reduced.value = true;
        scrollBy.mockClear();
        await rerender({ tabs, activeTab: "a" });
        await rerender({ tabs, activeTab: "c" });
        await waitFor(() => expect(scrollBy).toHaveBeenCalled());
        expect(scrollBy.mock.calls.at(-1)![0]).toMatchObject({ behavior: "instant" });
        vi.unstubAllGlobals();
    });

    it("moves focus with an arrow key without the browser's own jump", async () => {
        const user = userEvent.setup();
        render(Tabs, { props: { tabs, activeTab: "a" } });
        const focus = vi.spyOn(HTMLElement.prototype, "focus");
        screen.getByRole("tab", { name: "Alpha" }).focus();
        focus.mockClear();
        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Beta" }));
        expect(focus).toHaveBeenCalledWith({ preventScroll: true });
    });
});
