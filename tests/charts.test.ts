import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Sparkline from "../src/components/atoms/Sparkline.svelte";
import BarChart from "../src/components/molecules/BarChart.svelte";
import LineChart from "../src/components/molecules/LineChart.svelte";
import PieChart from "../src/components/molecules/PieChart.svelte";

afterEach(cleanup);

const host = (container: HTMLElement) => container.firstElementChild as HTMLElement;
const cells = (row: Element) => Array.from(row.children).map((cell) => cell.textContent?.trim());

const xLabels = ["v. 36", "v. 37", "v. 38"];
const series = [
    { name: "Vårt lag", points: [62, 68, 71] },
    { name: "Snitt", points: [58, null, 59] },
];

describe("LineChart", () => {
    const props = { label: "Rätt svar", xTitle: "Vecka", xLabels, series, yMin: 0, yMax: 100, yFormat: "percent" as const, locale: "en" };

    it("is a figure named by its caption, with the drawing hidden and no control in it", () => {
        const { container } = render(LineChart, { props });
        const figure = host(container);
        expect(figure.tagName).toBe("FIGURE");
        expect(figure.querySelector("figcaption")?.textContent).toBe("Rätt svar");
        expect(figure.querySelector("svg.plot")?.getAttribute("aria-hidden")).toBe("true");
        expect(figure.querySelector(".key")?.getAttribute("aria-hidden")).toBe("true");
        expect(figure.querySelector("table")!.closest("[aria-hidden]")).toBeNull();
        expect(container.querySelector("[tabindex],button,[role]")).toBeNull();
    });

    it("says the same numbers in a table: a column per series, a row per x label, a gap left empty", () => {
        const { container } = render(LineChart, { props });
        const table = container.querySelector("table")!;
        expect(cells(table.querySelector("thead tr")!)).toEqual(["Vecka", "Vårt lag", "Snitt"]);
        expect(table.querySelectorAll("thead th[scope='col']")).toHaveLength(3);
        const rows = Array.from(table.querySelectorAll("tbody tr"));
        expect(rows).toHaveLength(3);
        expect(rows[0].querySelector("th")?.getAttribute("scope")).toBe("row");
        expect(cells(rows[0])[0]).toBe("v. 36");
        expect(cells(rows[0])[1]).toMatch(/^62\s?%$/);
        expect(cells(rows[1])[2]).toBe("");
    });

    it("keeps the table off screen by default and shows it with showTable; the caption likewise with labelHidden", () => {
        const { container } = render(LineChart, { props });
        expect(container.querySelector("table")!.parentElement!.className).toContain("sr-only");
        expect(container.querySelector("figcaption")!.className).not.toContain("sr-only");
        cleanup();
        const shown = render(LineChart, { props: { ...props, showTable: true, labelHidden: true } });
        expect(shown.container.querySelector("table")!.parentElement!.className).not.toContain("sr-only");
        expect(shown.container.querySelector("figcaption")!.className).toContain("sr-only");
    });

    it("draws one line per series in its series colour, broken at a gap, with a marker shape of its own", () => {
        const { container } = render(LineChart, { props });
        const groups = Array.from(container.querySelectorAll<SVGGElement>("svg.plot g.series"));
        expect(groups).toHaveLength(2);
        expect(groups[0].style.getPropertyValue("--_c")).toBe("var(--zabi-chart-1, var(--color-action-primary))");
        expect(groups[1].style.getPropertyValue("--_c")).toBe("var(--zabi-chart-2, var(--color-accent))");
        expect(groups[0].querySelector("path.line")!.getAttribute("d")!.match(/M/g)).toHaveLength(1);
        expect(groups[1].querySelector("path.line")!.getAttribute("d")!.match(/M/g)).toHaveLength(2);
        expect(groups[0].querySelectorAll("path.marker")).toHaveLength(3);
        expect(groups[1].querySelectorAll("path.marker")).toHaveLength(2);
        const shape = (group: Element) => group.querySelector("path.marker")!.getAttribute("d")!.replace(/[-\d. ]/g, "");
        expect(shape(groups[0])).not.toBe(shape(groups[1]));
    });

    it("takes a colour of its own per series, and draws no markers when told not to", () => {
        const { container } = render(LineChart, {
            props: { ...props, markers: false, series: [{ name: "a", points: [1, 2, 3], color: "info" }] },
        });
        const group = container.querySelector<SVGGElement>("g.series")!;
        expect(group.style.getPropertyValue("--_c")).toBe("var(--color-info)");
        expect(group.querySelectorAll("path.marker")).toHaveLength(0);
    });

    it("has a key for more than one series, none for one, and legend overrides both", () => {
        const many = render(LineChart, { props });
        expect(many.container.querySelector(".key")!.textContent).toContain("Snitt");
        cleanup();
        const one = render(LineChart, { props: { ...props, series: [series[0]] } });
        expect(one.container.querySelector(".key")!.textContent?.trim()).toBe("");
        cleanup();
        const forced = render(LineChart, { props: { ...props, series: [series[0]], legend: true } });
        expect(forced.container.querySelector(".key")!.textContent).toContain("Vårt lag");
    });

    it("writes the y ticks in the format and the x labels on the axis", () => {
        const { container } = render(LineChart, { props });
        const ticks = Array.from(container.querySelectorAll("svg.plot text.tick")).map((text) => text.textContent?.trim());
        expect(ticks.some((text) => /^100\s?%$/.test(text ?? ""))).toBe(true);
        expect(ticks).toContain("v. 36");
        expect(ticks).toContain("v. 38");
    });

    it("shows the values at the x label pointed at, and takes them away when a mouse leaves", async () => {
        const { container } = render(LineChart, { props });
        const plot = container.querySelector("svg.plot") as SVGSVGElement;
        plot.getBoundingClientRect = () => ({ left: 0, top: 0, width: 600, height: 240, right: 600, bottom: 240, x: 0, y: 0, toJSON: () => ({}) });
        const key = container.querySelector(".key")!;
        expect(container.querySelector("line.guide")).toBeNull();
        await fireEvent.pointerMove(plot, { clientX: 590, pointerType: "mouse" });
        expect(key.textContent).toContain("v. 38");
        expect(key.textContent).toMatch(/Vårt lag\s*71\s?%/);
        expect(container.querySelector("line.guide")).not.toBeNull();
        await fireEvent.pointerMove(plot, { clientX: 0, pointerType: "mouse" });
        expect(key.textContent).toContain("v. 36");
        await fireEvent.pointerLeave(plot, { pointerType: "mouse" });
        expect(key.textContent).not.toContain("v. 36");
        expect(container.querySelector("line.guide")).toBeNull();
    });

    it("renders with no series and with one point", () => {
        expect(() => render(LineChart, { props: { label: "Tom", series: [] } })).not.toThrow();
        cleanup();
        const { container } = render(LineChart, { props: { label: "En", xLabels: ["a"], series: [{ name: "s", points: [4] }] } });
        expect(container.innerHTML).not.toContain("NaN");
    });

    it("passes other attributes and class to the figure", () => {
        const { container } = render(LineChart, { props: { ...props, id: "stats", class: "mt-4" } });
        expect(host(container).id).toBe("stats");
        expect(host(container).className).toContain("mt-4");
    });
});

describe("BarChart", () => {
    const data = [
        { label: "R1", value: 7 },
        { label: "R2", value: 9, color: "success" },
        { label: "R3", value: 4 },
    ];
    const props = { label: "Poäng per runda", categoryTitle: "Runda", valueTitle: "Poäng", data, locale: "en" };

    it("is a figure with the drawing hidden and the numbers in a table", () => {
        const { container } = render(BarChart, { props });
        const figure = host(container);
        expect(figure.tagName).toBe("FIGURE");
        expect(figure.querySelector("figcaption")?.textContent).toBe("Poäng per runda");
        expect(figure.querySelector("svg.plot")?.getAttribute("aria-hidden")).toBe("true");
        const table = figure.querySelector("table")!;
        expect(table.parentElement!.className).toContain("sr-only");
        expect(cells(table.querySelector("thead tr")!)).toEqual(["Runda", "Poäng"]);
        expect(Array.from(table.querySelectorAll("tbody tr")).map(cells)).toEqual([
            ["R1", "7"],
            ["R2", "9"],
            ["R3", "4"],
        ]);
    });

    it("draws a bar per value from zero, taller for more, one colour unless a datum has its own", () => {
        const { container } = render(BarChart, { props });
        const bars = Array.from(container.querySelectorAll<SVGRectElement>("rect.bar"));
        expect(bars).toHaveLength(3);
        const heights = bars.map((bar) => Number(bar.getAttribute("height")));
        expect(heights[1]).toBeGreaterThan(heights[0]);
        expect(heights[0]).toBeGreaterThan(heights[2]);
        const bottoms = bars.map((bar) => Number(bar.getAttribute("y")) + Number(bar.getAttribute("height")));
        expect(bottoms[0]).toBeCloseTo(bottoms[1]);
        expect(bars[0].style.getPropertyValue("--_c")).toBe("var(--zabi-chart-1, var(--color-action-primary))");
        expect(bars[2].style.getPropertyValue("--_c")).toBe(bars[0].style.getPropertyValue("--_c"));
        expect(bars[1].style.getPropertyValue("--_c")).toBe("var(--color-success)");
    });

    it("takes one colour for all bars", () => {
        const { container } = render(BarChart, { props: { ...props, color: "accent" } });
        expect(container.querySelector<SVGRectElement>("rect.bar")!.style.getPropertyValue("--_c")).toBe("var(--color-accent)");
    });

    it("writes each value over its bar unless told not to, and each label under it", () => {
        const { container } = render(BarChart, { props });
        expect(Array.from(container.querySelectorAll("text.value")).map((text) => text.textContent?.trim())).toEqual(["7", "9", "4"]);
        expect(Array.from(container.querySelectorAll("text.tick")).map((text) => text.textContent?.trim())).toContain("R2");
        cleanup();
        const bare = render(BarChart, { props: { ...props, showValues: false } });
        expect(bare.container.querySelectorAll("text.value")).toHaveLength(0);
    });

    it("draws a value below zero downward from the zero line", () => {
        const { container } = render(BarChart, { props: { label: "x", data: [{ label: "a", value: 4 }, { label: "b", value: -4 }] } });
        const [up, down] = Array.from(container.querySelectorAll("rect.bar"));
        expect(Number(down.getAttribute("y"))).toBeCloseTo(Number(up.getAttribute("y")) + Number(up.getAttribute("height")));
        expect(container.innerHTML).not.toContain("NaN");
    });

    it("renders with no data", () => {
        const { container } = render(BarChart, { props: { label: "Tom", data: [] } });
        expect(container.querySelectorAll("rect.bar")).toHaveLength(0);
        expect(container.innerHTML).not.toContain("NaN");
    });
});

describe("PieChart", () => {
    const data = [
        { label: "Rätt", value: 15, color: "success" },
        { label: "Fel", value: 3 },
        { label: "Överhoppade", value: 2 },
    ];
    const props = { label: "Svar", data, locale: "en" };

    it("is a figure with the drawing and the key hidden and the numbers in a table with shares", () => {
        const { container } = render(PieChart, { props });
        const figure = host(container);
        expect(figure.tagName).toBe("FIGURE");
        expect(figure.querySelector("figcaption")?.textContent).toBe("Svar");
        expect(figure.querySelector("svg.pie")?.getAttribute("aria-hidden")).toBe("true");
        expect(figure.querySelector("ul.key")?.getAttribute("aria-hidden")).toBe("true");
        const table = figure.querySelector("table")!;
        expect(table.parentElement!.className).toContain("sr-only");
        expect(cells(table.querySelector("thead tr")!)).toEqual(["Category", "Value", "Share"]);
        expect(Array.from(table.querySelectorAll("tbody tr")).map(cells)).toEqual([
            ["Rätt", "15", "75%"],
            ["Fel", "3", "15%"],
            ["Överhoppade", "2", "10%"],
        ]);
    });

    it("draws a slice per value in its colour, cut apart through a mask", () => {
        const { container } = render(PieChart, { props });
        const slices = Array.from(container.querySelectorAll<SVGPathElement>("path.slice"));
        expect(slices).toHaveLength(3);
        expect(slices[0].style.getPropertyValue("--_c")).toBe("var(--color-success)");
        expect(slices[1].style.getPropertyValue("--_c")).toBe("var(--zabi-chart-2, var(--color-accent))");
        expect(slices[0].getAttribute("d")).toMatch(/^M50 0A50 50 0 1 1 /);
        const mask = container.querySelector("mask")!;
        expect(mask.querySelectorAll("line")).toHaveLength(3);
        expect(slices[0].parentElement!.getAttribute("mask")).toBe(`url(#${mask.id})`);
    });

    it("writes label, value and share in the key, in the order of the slices", () => {
        const { container } = render(PieChart, { props });
        const items = Array.from(container.querySelectorAll("ul.key li")).map((item) => item.textContent?.replace(/\s+/g, " ").trim());
        expect(items).toEqual(["Rätt 15 75%", "Fel 3 15%", "Överhoppade 2 10%"]);
        cleanup();
        const bare = render(PieChart, { props: { ...props, legend: false, showTable: true } });
        expect(bare.container.querySelector("ul.key")).toBeNull();
        expect(bare.container.querySelector("table")!.parentElement!.className).not.toContain("sr-only");
    });

    it("is a ring with donut", () => {
        const pie = render(PieChart, { props });
        expect(pie.container.querySelector("path.slice")!.getAttribute("d")).toContain("L50 50Z");
        cleanup();
        const ring = render(PieChart, { props: { ...props, donut: true } });
        const d = ring.container.querySelector("path.slice")!.getAttribute("d")!;
        expect(d).not.toContain("L50 50Z");
        expect(d).toContain("A30 30");
    });

    it("gives two charts on a page different mask ids", () => {
        const a = render(PieChart, { props });
        const b = render(PieChart, { props });
        expect(a.container.querySelector("mask")!.id).not.toBe(b.container.querySelector("mask")!.id);
    });

    it("draws one slice whole and uncut, skips a slice with no room, and survives no data", () => {
        const one = render(PieChart, { props: { label: "x", data: [{ label: "a", value: 5 }, { label: "b", value: 0 }], locale: "en" } });
        expect(one.container.querySelectorAll("path.slice")).toHaveLength(1);
        expect(one.container.querySelectorAll("mask line")).toHaveLength(0);
        expect(one.container.querySelectorAll("ul.key li")).toHaveLength(2);
        cleanup();
        const none = render(PieChart, { props: { label: "x", data: [] } });
        expect(none.container.querySelectorAll("path.slice")).toHaveLength(0);
        expect(none.container.innerHTML).not.toContain("NaN");
    });
});

describe("Sparkline", () => {
    it("is an image named by its label, in the first series colour", () => {
        const { container } = render(Sparkline, { props: { points: [3, 5, 4, 7], label: "Stigande" } });
        const svg = host(container);
        expect(svg.tagName.toLowerCase()).toBe("svg");
        expect(svg.getAttribute("role")).toBe("img");
        expect(svg.getAttribute("aria-label")).toBe("Stigande");
        expect(svg.hasAttribute("aria-hidden")).toBe(false);
        expect(svg.style.getPropertyValue("--_c")).toBe("var(--zabi-chart-1, var(--color-action-primary))");
        expect(svg.getAttribute("preserveAspectRatio")).toBe("none");
    });

    it("is decoration without a label", () => {
        const { container } = render(Sparkline, { props: { points: [3, 5, 4] } });
        const svg = host(container);
        expect(svg.getAttribute("aria-hidden")).toBe("true");
        expect(svg.hasAttribute("role")).toBe(false);
        expect(svg.hasAttribute("aria-label")).toBe(false);
    });

    it("runs from edge to edge, highest value at the top, with a gap where a value is missing", () => {
        const { container } = render(Sparkline, { props: { points: [0, 10, null, 5, 10] } });
        const d = container.querySelector("path.line")!.getAttribute("d")!;
        expect(d.startsWith("M0 92")).toBe(true);
        expect(d).toContain("L25 8");
        expect(d.match(/M/g)).toHaveLength(2);
        expect(d.endsWith("L100 8")).toBe(true);
    });

    it("takes a colour, a class and a fixed scale", () => {
        const { container } = render(Sparkline, { props: { points: [5, 5], min: 0, max: 10, color: "error", class: "w-full" } });
        const svg = host(container);
        expect(svg.style.getPropertyValue("--_c")).toBe("var(--color-error)");
        expect(svg.getAttribute("class")).toContain("w-full");
        expect(container.querySelector("path.line")!.getAttribute("d")).toBe("M0 50L100 50");
    });

    it("is a level line for equal values or one value, and empty for none", () => {
        const flat = render(Sparkline, { props: { points: [4, 4, 4] } });
        expect(flat.container.querySelector("path.line")!.getAttribute("d")).toBe("M0 50L50 50L100 50");
        cleanup();
        const one = render(Sparkline, { props: { points: [4] } });
        expect(one.container.querySelector("path.line")!.getAttribute("d")).toBe("M0 50L100 50");
        cleanup();
        const none = render(Sparkline, { props: { points: [] } });
        expect(none.container.querySelector("path.line")!.getAttribute("d")).toBe("");
    });
});
