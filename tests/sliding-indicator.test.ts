import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import SegmentedControl from "../src/components/molecules/SegmentedControl.svelte";
import Tabs from "../src/components/molecules/Tabs.svelte";

/**
 * The sliding indicator of Tabs and SegmentedControl. jsdom has no layout, so
 * the boxes are supplied: each item is 100 wide and 30 high, placed by its
 * position in its row, and the container sits at the origin.
 */

const options = [
    { value: "list", label: "List" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
];
const tabs = [
    { id: "a", label: "Alpha" },
    { id: "b", label: "Beta" },
    { id: "c", label: "Gamma" },
];

/** Set to give every element an empty box, as a `hidden` ancestor does. */
let noLayout = false;

function mockBoxes() {
    return vi
        .spyOn(HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(function (this: HTMLElement) {
            if (noLayout) return { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} } as DOMRect;
            const item = this.matches(".segment-face, [role='tab']");
            const index = item ? Array.from(this.parentElement!.parentElement!.querySelectorAll(this.matches("[role='tab']") ? "[role='tab']" : ".segment-face")).indexOf(this) : 0;
            const left = item ? (this.matches("[role='tab']") ? index * 100 : this.closest("label") ? Array.from(this.closest(".segmented")!.querySelectorAll("label")).indexOf(this.closest("label")!) * 100 : 0) : 0;
            const width = item ? 100 : 400;
            const height = item ? 30 : 40;
            return { left, top: 0, right: left + width, bottom: height, width, height, x: left, y: 0, toJSON() {} } as DOMRect;
        });
}

afterEach(() => {
    noLayout = false;
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

const indicator = (root: Element) => root.querySelector<HTMLElement>("[aria-hidden='true'][style*='transform']");

describe("SegmentedControl indicator", () => {
    it("defaults to the neutral tone and keeps the static look without layout", async () => {
        render(SegmentedControl, { props: { options, value: "list", label: "View" } });
        const host = screen.getByRole("radiogroup");
        expect(host.getAttribute("data-tone")).toBe("neutral");
        // jsdom measures nothing: the checked segment draws its own look.
        await Promise.resolve();
        expect(host.hasAttribute("data-indicator")).toBe(false);
        expect(indicator(host)).toBeNull();
    });

    it("is marked ready and placed on the selected segment once boxes can be measured", async () => {
        mockBoxes();
        render(SegmentedControl, { props: { options, value: "month", label: "View" } });
        const host = screen.getByRole("radiogroup");
        await waitFor(() => expect(host.getAttribute("data-indicator")).toBe("ready"));
        const thumb = indicator(host)!;
        expect(thumb.style.transform).toBe("translate(100px, 0px)");
        expect(thumb.style.width).toBe("100px");
        expect(thumb.style.height).toBe("30px");
        expect(thumb.getAttribute("aria-hidden")).toBe("true");
        // It sits before the segments, so they paint over it.
        expect(host.firstElementChild).toBe(thumb);
    });

    it("moves when the selection changes, and does not animate its first placement", async () => {
        mockBoxes();
        const user = userEvent.setup();
        render(SegmentedControl, { props: { options, value: "list", label: "View" } });
        const host = screen.getByRole("radiogroup");
        await waitFor(() => expect(host.getAttribute("data-indicator")).toBe("ready"));
        expect(indicator(host)!.style.transform).toBe("translate(0px, 0px)");
        await waitFor(() => expect(host.hasAttribute("data-indicator-motion")).toBe(true));
        await user.click(screen.getByRole("radio", { name: "Year" }));
        await waitFor(() => expect(indicator(host)!.style.transform).toBe("translate(200px, 0px)"));
    });

    it("tone primary is passed to the markup the primary rules key on", () => {
        render(SegmentedControl, { props: { options, value: "list", label: "View", tone: "primary" } });
        expect(screen.getByRole("radiogroup").getAttribute("data-tone")).toBe("primary");
    });

    it("has a reduced-motion rule and no literal durations in its styles", () => {
        const source = readSource("src/components/molecules/SegmentedControl.svelte");
        expect(source).toMatch(/prefers-reduced-motion: reduce[\s\S]*segment-indicator/);
        expect(source).not.toMatch(/\d+ms/);
        // Its own tokens first, then the standard curve: a slide with no overshoot (Z-145).
        expect(source).toContain("var(--zabi-segment-ease, var(--ease-standard))");
        expect(source).toContain("var(--zabi-segment-duration, var(--duration-moderate))");
        expect(source).not.toContain("var(--ease-spring)");
    });

    it("works where ResizeObserver does not exist", async () => {
        vi.stubGlobal("ResizeObserver", undefined);
        mockBoxes();
        render(SegmentedControl, { props: { options, value: "list", label: "View" } });
        const host = screen.getByRole("radiogroup");
        await waitFor(() => expect(host.getAttribute("data-indicator")).toBe("ready"));
    });
});

describe("an indicator under a hidden ancestor (Z-152)", () => {
    it("SegmentedControl keeps its last box while it has no layout, and measures again when shown", async () => {
        mockBoxes();
        const { rerender } = render(SegmentedControl, { props: { options, value: "month", label: "View" } });
        const host = screen.getByRole("radiogroup");
        await waitFor(() => expect(host.getAttribute("data-indicator")).toBe("ready"));
        noLayout = true;
        await rerender({ options, value: "month", label: "View", size: "sm" });
        expect(host.getAttribute("data-indicator")).toBe("ready");
        expect(indicator(host)!.style.transform).toBe("translate(100px, 0px)");
        noLayout = false;
        await rerender({ options, value: "year", label: "View", size: "sm" });
        await waitFor(() => expect(indicator(host)!.style.transform).toBe("translate(200px, 0px)"));
    });

    it("Tabs keeps its last box while it has no layout", async () => {
        mockBoxes();
        const { rerender } = render(Tabs, { props: { tabs, activeTab: "b" } });
        const list = screen.getByRole("tablist");
        await waitFor(() => expect(indicator(list)).not.toBeNull());
        noLayout = true;
        await rerender({ tabs, activeTab: "b", fullWidth: true });
        expect(indicator(list)!.style.transform).toBe("translate(100px, 28px)");
    });
});

describe("Tabs indicator", () => {
    it("keeps the selected tab's own underline where nothing can be measured", () => {
        render(Tabs, { props: { tabs, activeTab: "b" } });
        expect(screen.getByRole("tab", { name: "Beta" }).className).toContain("border-brand-500");
        expect(indicator(screen.getByRole("tablist"))).toBeNull();
    });

    it("places the underline on the selected tab and moves it with the selection", async () => {
        mockBoxes();
        const user = userEvent.setup();
        render(Tabs, { props: { tabs, activeTab: "b" } });
        const list = screen.getByRole("tablist");
        await waitFor(() => expect(indicator(list)).not.toBeNull());
        const line = indicator(list)!;
        // The bottom 2px of the tab: 100 across, 28 down.
        expect(line.style.transform).toBe("translate(100px, 28px)");
        expect(line.style.height).toBe("2px");
        // The tab's own underline is handed over, but stays for forced colours.
        expect(screen.getByRole("tab", { name: "Beta" }).className).toContain("not-forced-colors:border-transparent");
        expect(line.className).toContain("forced-colors:hidden");
        await user.click(screen.getByRole("tab", { name: "Gamma" }));
        await waitFor(() => expect(indicator(list)!.style.transform).toBe("translate(200px, 28px)"));
    });

    it("the pill covers the whole tab, and neither it nor the underline springs", async () => {
        mockBoxes();
        const { unmount } = render(Tabs, { props: { tabs, activeTab: "a", variant: "pills" } });
        const list = screen.getByRole("tablist");
        await waitFor(() => expect(indicator(list)).not.toBeNull());
        expect(indicator(list)!.style.height).toBe("30px");
        expect(indicator(list)!.className).toContain("bg-action-primary-subtle");
        await waitFor(() => expect(indicator(list)!.className).toContain("ease-standard"));
        expect(indicator(list)!.className).not.toContain("ease-spring");
        expect(indicator(list)!.className).toContain("motion-reduce:transition-none");
        unmount();

        render(Tabs, { props: { tabs, activeTab: "a" } });
        await waitFor(() => expect(indicator(screen.getByRole("tablist"))!.className).toContain("ease-standard"));
        expect(indicator(screen.getByRole("tablist"))!.className).not.toContain("ease-spring");
    });

    it("works where ResizeObserver does not exist", async () => {
        vi.stubGlobal("ResizeObserver", undefined);
        mockBoxes();
        render(Tabs, { props: { tabs, activeTab: "a" } });
        await waitFor(() => expect(indicator(screen.getByRole("tablist"))).not.toBeNull());
    });
});

import { readFileSync } from "node:fs";
function readSource(path: string) {
    return readFileSync(path, "utf8");
}
