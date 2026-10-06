import { cleanup, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ChipGroup from "../src/components/molecules/ChipGroup.svelte";
import ChipGroupHarness from "./fixtures/ChipGroupHarness.svelte";
import ChipHarness from "./fixtures/ChipHarness.svelte";
import {
    measureRowOverflow,
    scrollLeftToReveal,
    toggleValue,
    type RowMetrics,
} from "../src/components/util/chip";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const state = () => JSON.parse(screen.getByTestId("state").textContent!);
const plan = () => within(screen.getByRole("radiogroup", { name: "Plan" }));
const toppings = () => within(screen.getByRole("group", { name: "Toppings" }));
const checked = (group: ReturnType<typeof within>, role: "radio" | "checkbox") =>
    (group.getAllByRole(role) as HTMLInputElement[]).filter((input) => input.checked).map((input) => input.value);
const later = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("ChipGroup names and roles", () => {
    it("is a group named by label, and a radiogroup for type radio", () => {
        render(ChipHarness);
        expect(screen.getByRole("radiogroup", { name: "Plan" })).toBeTruthy();
        expect(screen.getByRole("group", { name: "Toppings" })).toBeTruthy();
    });

    it("shows the label as text on request, and names the group by it", () => {
        render(ChipGroup, { props: { label: "Filters", showLabel: true } });
        expect(screen.getByText("Filters")).toBeTruthy();
        expect(screen.getByRole("group", { name: "Filters" })).toBeTruthy();
    });

    it("takes aria-label as it comes", () => {
        render(ChipGroup, { props: { "aria-label": "Own name" } as never });
        expect(screen.getByRole("group", { name: "Own name" })).toBeTruthy();
    });
});

describe("ChipGroup as a radio group", () => {
    it("shares the group's name, and gives the chips its value and type", () => {
        render(ChipHarness, { props: { plan: "pro" } });
        const radios = plan().getAllByRole("radio") as HTMLInputElement[];
        expect(radios.map((radio) => radio.name)).toEqual(["plan", "plan", "plan"]);
        expect(checked(plan(), "radio")).toEqual(["pro"]);
    });

    it("a repeat press on the chosen chip never clears it", async () => {
        render(ChipHarness, { props: { plan: "pro" } });
        await userEvent.click(plan().getByRole("radio", { name: "Basic" }));
        expect(state().plan).toBe("basic");
        await userEvent.click(plan().getByRole("radio", { name: "Basic" }));
        expect(state().plan).toBe("basic");
        expect(checked(plan(), "radio")).toEqual(["basic"]);
    });

    it("takes one Tab stop for the group: the chosen radio", async () => {
        render(ChipHarness, { props: { plan: "pro" } });
        const pro = plan().getByRole("radio", { name: "Pro" });
        pro.focus();
        await userEvent.tab();
        expect(plan().getAllByRole("radio")).not.toContain(document.activeElement);
    });

    it("reports a change once, with the value", async () => {
        const onreport = vi.fn();
        render(ChipHarness, { props: { onreport } });
        await userEvent.click(plan().getByRole("radio", { name: "Pro" }));
        expect(onreport.mock.calls.filter(([which]) => which === "plan")).toEqual([["plan", "pro"]]);
    });

    it("follows the parent's value, and a disabled chip stays disabled", async () => {
        render(ChipHarness);
        await userEvent.click(screen.getByRole("button", { name: "Set all" }));
        expect(checked(plan(), "radio")).toEqual(["pro"]);
        await userEvent.click(screen.getByRole("button", { name: "Clear all" }));
        expect(checked(plan(), "radio")).toEqual([]);
        expect((plan().getByRole("radio", { name: "Team" }) as HTMLInputElement).disabled).toBe(true);
    });

    it("submits its value in a form, and a reset empties it", async () => {
        render(ChipHarness, { props: { plan: "pro" } });
        expect(new FormData(screen.getByTestId("form") as HTMLFormElement).get("plan")).toBe("pro");
        await userEvent.click(screen.getByRole("button", { name: "Reset" }));
        await later();
        expect(state().plan).toBeNull();
    });
});

describe("ChipGroup as a checkbox group", () => {
    it("holds an array: chips turn on and off, in the order they were chosen", async () => {
        render(ChipHarness);
        await userEvent.click(toppings().getByRole("checkbox", { name: "Ham" }));
        await userEvent.click(toppings().getByRole("checkbox", { name: "Cheese" }));
        expect(state().toppings).toEqual(["ham", "cheese"]);
        await userEvent.click(toppings().getByRole("checkbox", { name: "Ham" }));
        expect(state().toppings).toEqual(["cheese"]);
        expect(checked(toppings(), "checkbox")).toEqual(["cheese"]);
    });

    it("submits every chosen value under the group's name", () => {
        render(ChipHarness, { props: { toppings: ["ham", "cheese"] } });
        expect(new FormData(screen.getByTestId("form") as HTMLFormElement).getAll("topping")).toEqual(["cheese", "ham"]);
    });
});

describe("ChipGroup layouts", () => {
    it("wrap is a flex row that wraps", () => {
        render(ChipGroup, { props: { label: "A" } });
        expect(screen.getByRole("group").className.split(/\s+/)).toEqual(expect.arrayContaining(["flex", "flex-wrap", "gap-2"]));
    });

    it("row is one line that scrolls sideways, keeps room for the focus ring, and hides its scrollbar", () => {
        render(ChipGroup, { props: { label: "A", layout: "row" } });
        const own = screen.getByRole("group").className.split(/\s+/);
        expect(own).toEqual(expect.arrayContaining(["flex-nowrap", "overflow-x-auto", "overscroll-x-contain", "p-1", "-m-1", "scroll-px-8", "chip-row"]));
        expect(own).not.toContain("flex-wrap");
    });

    it("a group inside a group is a named sub-group: inline, not scrolling, with a wider gap around it", () => {
        render(ChipGroupHarness, { props: { scenario: "subgroups" } });
        const outer = screen.getByRole("group", { name: "Filters" });
        const day = screen.getByRole("radiogroup", { name: "Day" });
        const area = screen.getByRole("group", { name: "Area" });
        expect(day.parentElement).toBe(outer);
        expect(area.parentElement).toBe(outer);
        expect(day.hasAttribute("data-chip-subgroup")).toBe(true);
        expect(day.className.split(/\s+/)).toEqual(expect.arrayContaining(["flex", "shrink-0", "gap-2"]));
        expect(day.className).not.toContain("overflow-x-auto");
        expect(outer.className).toContain("has-[>[data-chip-subgroup]]:gap-6");
        // Each sub-group has its own type, name and value.
        expect(checked(within(day), "radio")).toEqual(["mon"]);
        expect(checked(within(area), "checkbox")).toEqual(["north"]);
        expect((within(day).getAllByRole("radio")[0] as HTMLInputElement).name).toBe("day");
        expect((within(area).getAllByRole("checkbox")[0] as HTMLInputElement).name).toBe("area");
    });
});

describe("ChipGroup edge cue and the chosen chip in view", () => {
    // jsdom has no layout: the row's metrics are supplied here.
    function mockRow(scrollWidth: number, clientWidth: number) {
        let scrollLeft = 0;
        const define = (name: string, descriptor: PropertyDescriptor) =>
            Object.defineProperty(HTMLElement.prototype, name, { configurable: true, ...descriptor });
        define("scrollWidth", { get: () => scrollWidth });
        define("clientWidth", { get: () => clientWidth });
        define("scrollLeft", { get: () => scrollLeft, set: (value: number) => (scrollLeft = value) });
        return { at: (value: number) => (scrollLeft = value), read: () => scrollLeft };
    }

    afterEach(() => {
        for (const name of ["scrollWidth", "clientWidth", "scrollLeft"]) {
            delete (HTMLElement.prototype as unknown as Record<string, unknown>)[name];
        }
    });

    it("writes data-overflow-end while more chips are hidden after, and data-overflow-start once scrolled", async () => {
        const row = mockRow(900, 300);
        render(ChipGroupHarness, { props: { scenario: "row", scrollSelectedIntoView: false } });
        const host = screen.getByRole("group", { name: "Filter" });
        await later();
        expect(host.hasAttribute("data-overflow-end")).toBe(true);
        expect(host.hasAttribute("data-overflow-start")).toBe(false);
        row.at(300);
        host.dispatchEvent(new Event("scroll"));
        await later();
        expect(host.hasAttribute("data-overflow-start")).toBe(true);
        expect(host.hasAttribute("data-overflow-end")).toBe(true);
        row.at(600);
        host.dispatchEvent(new Event("scroll"));
        await later();
        expect(host.hasAttribute("data-overflow-end")).toBe(false);
    });

    it("edge none never writes them", async () => {
        mockRow(900, 300);
        render(ChipGroupHarness, { props: { scenario: "row", edge: "none" } });
        await later();
        const host = screen.getByRole("group", { name: "Filter" });
        expect(host.hasAttribute("data-overflow-end")).toBe(false);
        expect(host.hasAttribute("data-overflow-start")).toBe(false);
    });

    it("a row that fits has no fade", async () => {
        mockRow(300, 300);
        render(ChipGroupHarness, { props: { scenario: "row" } });
        await later();
        expect(screen.getByRole("group", { name: "Filter" }).hasAttribute("data-overflow-end")).toBe(false);
    });

    it("on load sets the row's own scrollLeft so the chosen chip is in view, and never calls scrollIntoView", () => {
        const row = mockRow(900, 300);
        const scrollIntoView = vi.fn();
        Element.prototype.scrollIntoView = scrollIntoView;
        vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
            if (this.getAttribute("role") === "group") return { left: 0, right: 300, top: 0, bottom: 40, width: 300, height: 40 } as DOMRect;
            if (this.getAttribute("aria-current")) return { left: 600, right: 680, top: 0, bottom: 32, width: 80, height: 32 } as DOMRect;
            return { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 } as DOMRect;
        });
        render(ChipGroupHarness, { props: { scenario: "row" } });
        // 680 - 300 past the edge, plus a gap and the fade (32).
        expect(row.read()).toBe(412);
        expect(scrollIntoView).not.toHaveBeenCalled();
        delete (Element.prototype as unknown as Record<string, unknown>).scrollIntoView;
    });

    it("scrollSelectedIntoView false leaves the row where it is", () => {
        const row = mockRow(900, 300);
        render(ChipGroupHarness, { props: { scenario: "row", scrollSelectedIntoView: false } });
        expect(row.read()).toBe(0);
    });
});

describe("util/chip: measureRowOverflow", () => {
    const row = (scrollLeft: number, rtl = false): RowMetrics => ({ scrollLeft, scrollWidth: 900, clientWidth: 300, rtl });

    it("none when everything fits, with a pixel of tolerance", () => {
        expect(measureRowOverflow({ scrollLeft: 0, scrollWidth: 300, clientWidth: 300, rtl: false })).toEqual({ start: false, end: false });
        expect(measureRowOverflow({ scrollLeft: 0, scrollWidth: 300.5, clientWidth: 300, rtl: false })).toEqual({ start: false, end: false });
    });

    it("left to right: the end is hidden at rest, the start once scrolled, and only the start at the end", () => {
        expect(measureRowOverflow(row(0))).toEqual({ start: false, end: true });
        expect(measureRowOverflow(row(250))).toEqual({ start: true, end: true });
        expect(measureRowOverflow(row(600))).toEqual({ start: true, end: false });
        // Rubber-banding past either end does not invent a side.
        expect(measureRowOverflow(row(-20))).toEqual({ start: false, end: true });
        expect(measureRowOverflow(row(640))).toEqual({ start: true, end: false });
    });

    it("right to left: scrollLeft is negative and start and end follow the direction", () => {
        expect(measureRowOverflow(row(0, true))).toEqual({ start: false, end: true });
        expect(measureRowOverflow(row(-250, true))).toEqual({ start: true, end: true });
        expect(measureRowOverflow(row(-600, true))).toEqual({ start: true, end: false });
    });
});

describe("util/chip: scrollLeftToReveal", () => {
    const metrics = (scrollLeft: number, rtl = false): RowMetrics => ({ scrollLeft, scrollWidth: 900, clientWidth: 300, rtl });
    const box = { left: 100, right: 400 };

    it("keeps the position when the chip is in view with room to spare", () => {
        expect(scrollLeftToReveal(metrics(50), box, { left: 200, right: 280 })).toBe(50);
    });

    it("moves just enough to bring a chip hidden after the edge into view, with a margin", () => {
        // Its right edge, 480, is 80 past the box; plus the 8px margin.
        expect(scrollLeftToReveal(metrics(0), box, { left: 400, right: 480 })).toBe(88);
    });

    it("moves back for a chip hidden before the edge", () => {
        expect(scrollLeftToReveal(metrics(300), box, { left: 50, right: 130 })).toBe(242);
    });

    it("never scrolls past what the row can", () => {
        expect(scrollLeftToReveal(metrics(500), box, { left: 400, right: 480 })).toBe(588);
        expect(scrollLeftToReveal(metrics(500), box, { left: 400, right: 800 })).toBeLessThanOrEqual(600);
        expect(scrollLeftToReveal(metrics(10), box, { left: 0, right: 90 })).toBe(0);
    });

    it("right to left stays inside [-hidden, 0]", () => {
        const next = scrollLeftToReveal(metrics(0, true), box, { left: -200, right: -120 });
        expect(next).toBeLessThanOrEqual(0);
        expect(next).toBeGreaterThanOrEqual(-600);
    });
});

describe("util/chip: toggleValue", () => {
    it("adds at the end once, removes, and never changes its input", () => {
        const start = ["a"];
        expect(toggleValue(start, "b", true)).toEqual(["a", "b"]);
        expect(toggleValue(["a", "b"], "b", true)).toEqual(["a", "b"]);
        expect(toggleValue(["a", "b"], "a", false)).toEqual(["b"]);
        expect(toggleValue(undefined, "a", true)).toEqual(["a"]);
        expect(start).toEqual(["a"]);
    });
});
