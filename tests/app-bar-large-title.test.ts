import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import AppBarHarness from "./fixtures/AppBarHarness.svelte";
import AppShellHarness from "./fixtures/AppShellHarness.svelte";

const LARGE = 80;
const HEADER = 56 + LARGE;

beforeEach(() => {
    // jsdom has no layout: the large row is 80px tall, the shell's header wrapper 136px.
    vi.stubGlobal(
        "ResizeObserver",
        class {
            observe() {}
            unobserve() {}
            disconnect() {}
        },
    );
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
        const height = this.hasAttribute("data-appbar-large")
            ? LARGE
            : this.hasAttribute("data-app-shell-header")
              ? HEADER
              : 0;
        return { height, width: 0, top: 0, left: 0, right: 0, bottom: height, x: 0, y: 0, toJSON() {} };
    });
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
});

const bar = () => screen.getByTestId("bar");

function scrollTo(element: HTMLElement, top: number) {
    Object.defineProperty(element, "scrollTop", { configurable: true, value: top });
    Object.defineProperty(element, "scrollHeight", { configurable: true, value: 2000 });
    Object.defineProperty(element, "clientHeight", { configurable: true, value: 300 });
    element.dispatchEvent(new Event("scroll"));
}

describe("AppBar largeTitle markup", () => {
    it("makes the heading the large one and hides the small title", () => {
        render(AppBarHarness, { props: { largeTitle: true } });
        const heading = within(bar()).getByRole("heading", { level: 1, name: "Round 3" });
        expect(heading.closest("[data-appbar-large]")).not.toBeNull();
        expect(heading.className).toContain("min(1.875rem,39px)");
        expect(heading.className).toContain("font-bold");
        expect(heading.className).toContain("line-clamp-2");

        const small = bar().querySelector<HTMLElement>("[data-appbar-part='title']")!;
        expect(small.tagName).toBe("P");
        expect(small.getAttribute("aria-hidden")).toBe("true");
        expect(small.className).toContain("opacity-0");
        expect(small.className).toContain("duration-(--duration-base)");
        // Only one heading, and the row measuring still finds the title part.
        expect(within(bar()).getAllByRole("heading")).toHaveLength(1);
        expect(bar().getAttribute("data-large-title")).toBe("");
    });

    it("follows headingLevel", () => {
        render(AppBarHarness, { props: { largeTitle: true, headingLevel: 3 } });
        expect(within(bar()).getByRole("heading", { level: 3, name: "Round 3" })).toBeTruthy();
    });

    it("puts the surface and the safe-area strip on the 56px row, not the header", () => {
        render(AppBarHarness, { props: { largeTitle: true } });
        expect(bar().className).not.toContain("material-bar");
        expect(bar().hasAttribute("data-scrolled-under")).toBe(false);
        const row = bar().querySelector<HTMLElement>("[data-appbar-bar]")!;
        expect(row.className).toContain("material-bar");
        expect(row.className).toContain("sticky");
        expect(row.className).toContain("env(safe-area-inset-top)");
        expect(row.getAttribute("data-scrolled-under")).toBe("false");
        expect(row.querySelector(".appbar-row")).not.toBeNull();
    });

    it("keeps the bar as it was without a large title", () => {
        render(AppBarHarness);
        expect(bar().className).toContain("material-bar");
        expect(bar().getAttribute("data-scrolled-under")).toBe("false");
        expect(bar().querySelector("[data-appbar-large]")).toBeNull();
        expect(bar().hasAttribute("data-large-title")).toBe(false);
        expect(bar().getAttribute("data-tone")).toBe("default");
    });

    it("needs a title", () => {
        render(AppBarHarness, { props: { largeTitle: true, title: "" } });
        expect(bar().querySelector("[data-appbar-large]")).toBeNull();
    });

    it("warns once in a dev build when collapseOnScroll is also set, and ignores it", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        render(AppBarHarness, { props: { largeTitle: true, collapseOnScroll: true } });
        expect(warn).toHaveBeenCalledTimes(1);
        expect(String(warn.mock.calls[0][0])).toContain("collapseOnScroll");
        expect(bar().hasAttribute("data-collapsed")).toBe(false);
    });

    it("does not warn for either alone", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        render(AppBarHarness, { props: { largeTitle: true } });
        cleanup();
        render(AppBarHarness, { props: { collapseOnScroll: true } });
        expect(warn).not.toHaveBeenCalled();
    });
});

describe("AppBar largeTitle on its own scroller", () => {
    it("sticks at minus the large row, and condenses once scrolled past it", async () => {
        render(AppBarHarness, { props: { largeTitle: true, inScroller: true } });
        const scroller = screen.getByTestId("scroller");
        await waitFor(() => expect(bar().style.top).toBe(`-${LARGE}px`));
        const small = () => bar().querySelector<HTMLElement>("[data-appbar-part='title']")!;
        const surface = () => bar().querySelector<HTMLElement>("[data-appbar-bar]")!;

        scrollTo(scroller, LARGE);
        await waitFor(() => expect(bar().getAttribute("data-condensed")).toBe("false"));
        expect(small().className).toContain("opacity-0");

        scrollTo(scroller, LARGE + 1);
        await waitFor(() => expect(bar().getAttribute("data-condensed")).toBe("true"));
        expect(small().className).toContain("opacity-100");
        expect(surface().getAttribute("data-scrolled-under")).toBe("true");

        scrollTo(scroller, 0);
        await waitFor(() => expect(bar().getAttribute("data-condensed")).toBe("false"));
        expect(surface().getAttribute("data-scrolled-under")).toBe("false");
    });

    it("stays at top 0 and unmeasured when nothing has layout", () => {
        vi.restoreAllMocks();
        render(AppBarHarness, { props: { largeTitle: true, inScroller: true } });
        expect(bar().style.top).toBe("");
        expect(bar().getAttribute("data-condensed")).toBe("false");
    });
});

describe("AppBar largeTitle inside an AppShell", () => {
    const shell = () => screen.getByTestId("shell");
    const wrapper = () => shell().querySelector<HTMLElement>("[data-app-shell-header]")!;
    const scroller = () => shell().querySelector<HTMLElement>("[data-app-shell-scroller]")!;

    it("hands the overscroll to the wrapper and reports the condensed height", async () => {
        render(AppShellHarness, { props: { largeTitle: true } });
        await waitFor(() => expect(wrapper().style.top).toBe(`-${LARGE}px`));
        // The bar does not style its own top: the wrapper is the sticky container.
        expect(bar().style.top).toBe("");
        await waitFor(() =>
            expect(shell().getAttribute("style")).toContain("--app-shell-top-inset: 56px"),
        );
    });

    it("counts content as under the header only past the large row", async () => {
        render(AppShellHarness, { props: { largeTitle: true } });
        await waitFor(() => expect(wrapper().style.top).toBe(`-${LARGE}px`));
        scrollTo(scroller(), LARGE);
        await fireEvent.scroll(scroller());
        expect(shell().getAttribute("data-scrolled-top")).toBe("false");
        scrollTo(scroller(), LARGE + 1);
        await waitFor(() => expect(shell().getAttribute("data-scrolled-top")).toBe("true"));
        expect(bar().getAttribute("data-condensed")).toBe("true");
    });

    it("keeps the full inset and top 0 without a large title", async () => {
        render(AppShellHarness);
        expect(wrapper().style.top).toBe("");
        await waitFor(() =>
            expect(shell().getAttribute("style")).toContain(`--app-shell-top-inset: ${HEADER}px`),
        );
        scrollTo(scroller(), 1);
        await waitFor(() => expect(shell().getAttribute("data-scrolled-top")).toBe("true"));
    });

    it("puts the wrapper back when the large title goes", async () => {
        const { rerender } = render(AppShellHarness, { props: { largeTitle: true } });
        await waitFor(() => expect(wrapper().style.top).toBe(`-${LARGE}px`));
        await rerender({ largeTitle: false });
        await waitFor(() => expect(wrapper().style.top).toBe(""));
    });
});

describe("AppBar tone", () => {
    it("writes data-tone and adds nothing for the default", () => {
        render(AppBarHarness);
        expect(bar().getAttribute("data-tone")).toBe("default");
        expect(bar().className).not.toContain("--color-bar");
        expect(bar().className).not.toContain("on-brand");
    });

    it("transparent scopes the bar fill off on the material element", () => {
        render(AppBarHarness, { props: { tone: "transparent" } });
        expect(bar().getAttribute("data-tone")).toBe("transparent");
        expect(bar().className).toContain("[--color-bar:transparent]");
        expect(bar().className).not.toContain("on-brand");
    });

    it("transparent takes the glass through scrollEdge as the default does", () => {
        render(AppBarHarness, { props: { tone: "transparent", scrollEdge: "always" } });
        expect(bar().getAttribute("data-scrolled-under")).toBe("true");
    });

    it("brand is the on-brand fill, flush whatever scrollEdge says", () => {
        render(AppBarHarness, { props: { tone: "brand", scrollEdge: "always", backHref: "/" } });
        expect(bar().getAttribute("data-tone")).toBe("brand");
        expect(bar().className).toContain("[--color-bar:var(--color-bar-brand)]");
        expect(bar().className.split(/\s+/)).toContain("on-brand");
        expect(bar().getAttribute("data-scrolled-under")).toBe("false");
        // Hover and pressed fills that show on the brand fill.
        const back = within(bar()).getByRole("link", { name: "Back" });
        expect(back.className).toContain("var(--color-on-brand)");
        expect(back.className).not.toContain("hover:bg-surface-hover");
    });

    it("brand with a large title: the large row is part of the brand block", () => {
        render(AppBarHarness, { props: { tone: "brand", largeTitle: true } });
        expect(bar().className.split(/\s+/)).toContain("on-brand");
        const surface = bar().querySelector<HTMLElement>("[data-appbar-bar]")!;
        expect(surface.className).toContain("[--color-bar:var(--color-bar-brand)]");
        expect(surface.getAttribute("data-scrolled-under")).toBe("false");
        expect(bar().querySelector("[data-appbar-large]")!.className).toContain("bg-bar-brand");
    });

    it("transparent with a large title scopes the fill on the 56px row", () => {
        render(AppBarHarness, { props: { tone: "transparent", largeTitle: true } });
        expect(bar().querySelector("[data-appbar-bar]")!.className).toContain("[--color-bar:transparent]");
        expect(bar().querySelector("[data-appbar-large]")!.className).not.toContain("bg-bar-brand");
    });
});
