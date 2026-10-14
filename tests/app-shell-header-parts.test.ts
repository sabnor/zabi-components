import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import AppShellPartsHarness from "./fixtures/AppShellPartsHarness.svelte";

const HEIGHTS: Record<string, number> = {
    "part-bar": 56,
    "part-filters": 48,
    "part-tabs": 40,
};
const LARGE = 80;
let viewport = 600;

beforeEach(() => {
    viewport = 600;
    vi.stubGlobal(
        "ResizeObserver",
        class {
            observe() {}
            unobserve() {}
            disconnect() {}
        },
    );
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
        const id = this.getAttribute("data-testid") ?? "";
        let height = HEIGHTS[id] ?? 0;
        if (this.hasAttribute("data-appbar-large")) height = LARGE;
        if (id === "part-bar" && this.querySelector("[data-appbar-large]")) height += LARGE;
        return { height, width: 0, top: 0, left: 0, right: 0, bottom: height, x: 0, y: 0, toJSON() {} };
    });
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockImplementation(() => viewport);
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

const shell = () => screen.getByTestId("shell");
const part = (name: string) => screen.getByTestId(`part-${name}`);
const top = (name: string) => part(name).style.getPropertyValue("--app-shell-part-top");
const inset = () => shell().style.getPropertyValue("--app-shell-top-inset");

describe("AppShellHeaderPart", () => {
    it("is a block of the header, in document order, with one banner", () => {
        render(AppShellPartsHarness);
        const header = shell().querySelector("[data-app-shell-header]")!;
        const parts = Array.from(header.children).filter((child) => child.hasAttribute("data-app-shell-part"));
        expect(parts.map((child) => child.getAttribute("data-testid"))).toEqual([
            "part-bar",
            "part-filters",
            "part-tabs",
        ]);
        expect(within(shell()).getAllByRole("banner")).toHaveLength(1);
        expect(parts.every((child) => child.getAttribute("data-sticky") === "true")).toBe(true);
    });

    it("stacks the parts that stick directly under one another", async () => {
        render(AppShellPartsHarness);
        await waitFor(() => expect(top("filters")).toBe("56px"));
        expect(top("bar")).toBe("0px");
        expect(top("tabs")).toBe("104px");
        // Everything sticks: the whole stack covers content.
        expect(inset()).toBe("144px");
    });

    it("sticks a part under the status bar strip when the bar above it scrolls away", async () => {
        render(AppShellPartsHarness, { props: { sticky: [false, true, true] } });
        await waitFor(() => expect(part("bar").getAttribute("data-sticky")).toBe("false"));
        // No safe area in the test DOM: the strip is 0px. The stack starts under it.
        await waitFor(() => expect(top("filters")).toBe("0px"));
        expect(top("tabs")).toBe("48px");
        // Only what is stuck covers content, so only that is reported.
        expect(inset()).toBe("88px");
    });

    it("skips a part that scrolls away between two that stick", async () => {
        render(AppShellPartsHarness, { props: { sticky: [true, false, true] } });
        await waitFor(() => expect(top("tabs")).toBe("56px"));
        expect(inset()).toBe("96px");
        expect(part("filters").style.getPropertyValue("--app-shell-part-top")).toBe("");
    });

    it("reports nothing as covering when no part sticks, and does not hide a field under the header", async () => {
        render(AppShellPartsHarness, { props: { sticky: [false, false, false] } });
        await waitFor(() => expect(inset()).toBe("0px"));
        const scroller = shell().querySelector<HTMLElement>("[data-app-shell-scroller]")!;
        expect(scroller.className).toContain("scroll-pt-(--app-shell-top-inset)");
    });

    it("follows sticky when it changes", async () => {
        const { rerender } = render(AppShellPartsHarness, { props: { sticky: [true, true, true] } });
        await waitFor(() => expect(inset()).toBe("144px"));
        await rerender({ sticky: [true, false, true] });
        await waitFor(() => expect(inset()).toBe("96px"));
    });

    it("lets a large title's row leave: the part sticks above the top by its height", async () => {
        render(AppShellPartsHarness, { props: { largeTitle: true } });
        await waitFor(() => expect(part("bar").getAttribute("data-overscroll")).toBe(String(LARGE)));
        await waitFor(() => expect(top("bar")).toBe(`-${LARGE}px`));
        expect(top("filters")).toBe("56px");
        expect(inset()).toBe("144px");
    });

    it("puts the content under the stuck parts only once the lowest has reached its place", async () => {
        render(AppShellPartsHarness, { props: { sticky: [false, true, true] } });
        await waitFor(() => expect(top("tabs")).toBe("48px"));
        const scroller = shell().querySelector<HTMLElement>("[data-app-shell-scroller]")!;
        const scrollTo = (value: number) => {
            Object.defineProperty(scroller, "scrollTop", { configurable: true, value });
            Object.defineProperty(scroller, "scrollHeight", { configurable: true, value: 2000 });
            scroller.dispatchEvent(new Event("scroll"));
        };
        // The tabs stick once they have moved up the 56 + 48 px in front of them.
        scrollTo(10);
        expect(shell().getAttribute("data-scrolled-top")).toBe("false");
        expect(part("tabs").getAttribute("data-scrolled-under")).toBe("false");
        scrollTo(110);
        await waitFor(() => expect(shell().getAttribute("data-scrolled-top")).toBe("true"));
        expect(part("tabs").getAttribute("data-scrolled-under")).toBe("true");
    });

    it("lets the lower parts scroll when the stuck ones would cover too much of a short screen", async () => {
        viewport = 200;
        render(AppShellPartsHarness);
        // 40% of 200 is 80: the bar (56) fits, the filters (to 104) do not.
        await waitFor(() => expect(part("filters").hasAttribute("data-released")).toBe(true));
        expect(part("tabs").hasAttribute("data-released")).toBe(true);
        expect(part("bar").hasAttribute("data-released")).toBe(false);
        expect(inset()).toBe("56px");
    });
});
