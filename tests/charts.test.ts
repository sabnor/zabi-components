import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
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
        expect(groups[1].style.getPropertyValue("--_c")).toBe("var(--zabi-chart-2, var(--color-accent-500))");
        expect(groups[0].querySelector("path.line")!.getAttribute("d")!.match(/M/g)).toHaveLength(1);
        expect(groups[1].querySelector("path.line")!.getAttribute("d")!.match(/M/g)).toHaveLength(2);
        const marks = Array.from(container.querySelectorAll<SVGGElement>("svg.plot g.marks"));
        expect(marks.map((group) => group.style.getPropertyValue("--_c"))).toEqual(groups.map((group) => group.style.getPropertyValue("--_c")));
        expect(marks[0].querySelectorAll("path.marker")).toHaveLength(3);
        expect(marks[1].querySelectorAll("path.marker")).toHaveLength(2);
        const shape = (group: Element) => group.querySelector("path.marker")!.getAttribute("d")!.replace(/[-\d. ]/g, "");
        expect(shape(marks[0])).not.toBe(shape(marks[1]));
    });

    it("cuts a ring out of the lines around every marker, so the ring is whatever the chart stands on", () => {
        const { container } = render(LineChart, { props });
        const mask = container.querySelector("svg.plot mask")!;
        expect(mask.querySelectorAll("path.ring")).toHaveLength(5);
        const lines = container.querySelector("svg.plot g.series")!.parentElement!;
        expect(lines.getAttribute("mask")).toBe(`url(#${mask.id})`);
        // The markers are drawn over the lines, outside the mask.
        expect(container.querySelector("svg.plot g.marks")!.closest("[mask]")).toBeNull();
        cleanup();
        const two = render(LineChart, { props });
        expect(two.container.querySelector("svg.plot mask")!.id).toBeTruthy();
    });

    it("takes a colour of its own per series, and draws no markers when told not to", () => {
        const { container } = render(LineChart, {
            props: { ...props, markers: false, series: [{ name: "a", points: [1, 2, 3], color: "info" }] },
        });
        const group = container.querySelector<SVGGElement>("g.series")!;
        expect(group.style.getPropertyValue("--_c")).toBe("var(--color-info)");
        expect(container.querySelectorAll("svg.plot path.marker")).toHaveLength(0);
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

    it("shows the values at the x label pointed at in a pane over the plot, and takes it away when a mouse leaves", async () => {
        const { container } = render(LineChart, { props });
        const plot = container.querySelector("svg.plot") as SVGSVGElement;
        plot.getBoundingClientRect = () => ({ left: 0, top: 0, width: 600, height: 240, right: 600, bottom: 240, x: 0, y: 0, toJSON: () => ({}) });
        const readout = () => container.querySelector<HTMLElement>(".readout");
        expect(container.querySelector("line.guide")).toBeNull();
        expect(readout()).toBeNull();
        await fireEvent.pointerMove(plot, { clientX: 590, pointerType: "mouse" });
        expect(readout()!.textContent).toContain("v. 38");
        expect(readout()!.textContent).toMatch(/Vårt lag\s*71\s?%/);
        // The library's own material, as a Tooltip; hidden from assistive technology, which has the table.
        expect(readout()!.className).toContain("material-thick");
        expect(readout()!.getAttribute("aria-hidden")).toBe("true");
        // On the side of the guide with more room: before it at the far end, after it at the near end.
        expect(readout()!.style.right).not.toBe("");
        expect(readout()!.style.left).toBe("");
        expect(container.querySelector("line.guide")).not.toBeNull();
        await fireEvent.pointerMove(plot, { clientX: 0, pointerType: "mouse" });
        expect(readout()!.textContent).toContain("v. 36");
        expect(readout()!.style.left).not.toBe("");
        // The key stays the key.
        expect(container.querySelector(".key")!.textContent).not.toContain("v. 36");
        await fireEvent.pointerLeave(plot, { pointerType: "mouse" });
        expect(readout()).toBeNull();
        expect(container.querySelector("line.guide")).toBeNull();
    });

    it("leaves a missing value out of the pane", async () => {
        const { container } = render(LineChart, { props });
        const plot = container.querySelector("svg.plot") as SVGSVGElement;
        plot.getBoundingClientRect = () => ({ left: 0, top: 0, width: 600, height: 240, right: 600, bottom: 240, x: 0, y: 0, toJSON: () => ({}) });
        await fireEvent.pointerMove(plot, { clientX: 320, pointerType: "mouse" });
        const text = container.querySelector(".readout")!.textContent!;
        expect(text).toContain("v. 37");
        expect(text).toContain("Vårt lag");
        expect(text).not.toContain("Snitt");
    });

    it("stands on a pane of the thick material with glass, and on nothing of its own without", () => {
        const plain = render(LineChart, { props });
        expect(host(plain.container).className).not.toContain("material-");
        cleanup();
        for (const Chart of [LineChart, BarChart, PieChart]) {
            const { container } = render(Chart as typeof LineChart, {
                props: { label: "x", glass: true, series: [], data: [{ label: "a", value: 1 }] } as never,
            });
            expect(host(container).className).toContain("material-thick");
            expect(host(container).className).toContain("on-surface");
            cleanup();
        }
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

    it("names the value of a one-series chart with valueTitle, in the table and in the pane (Z-149)", async () => {
        const one = { ...props, series: [series[0]], valueTitle: "Rätt" };
        const { container } = render(LineChart, { props: one });
        expect(cells(container.querySelector("table thead tr")!)).toEqual(["Vecka", "Rätt"]);
        const plot = container.querySelector("svg.plot") as SVGSVGElement;
        plot.getBoundingClientRect = () => ({ left: 0, top: 0, width: 600, height: 240, right: 600, bottom: 240, x: 0, y: 0, toJSON: () => ({}) });
        await fireEvent.pointerDown(plot, { clientX: 590, pointerType: "touch" });
        expect(container.querySelector(".readout .name")!.textContent).toBe("Rätt");
        cleanup();
        const two = render(LineChart, { props: { ...props, valueTitle: "Rätt" } });
        expect(cells(two.container.querySelector("table thead tr")!)).toEqual(["Vecka", "Vårt lag", "Snitt"]);
    });

    it("draws only the last `visible` points and keeps every one in the table (Z-151)", () => {
        const labels = Array.from({ length: 13 }, (_, index) => `${index + 1} okt`);
        const points = labels.map((_, index) => index * 5);
        const { container } = render(LineChart, {
            props: { label: "Lag ni slog", xLabels: labels, series: [{ name: "Lag", points }], visible: 12, markers: true },
        });
        expect(container.querySelectorAll("table tbody tr")).toHaveLength(13);
        expect(container.querySelector("table tbody tr th")!.textContent).toBe("1 okt");
        const drawn = Array.from(container.querySelectorAll("svg.plot text.tick")).map((text) => text.textContent?.trim());
        expect(drawn).not.toContain("1 okt");
        expect(drawn).toContain("13 okt");
        expect(container.querySelectorAll("svg.plot g.marks path.marker")).toHaveLength(12);
        cleanup();
        const all = render(LineChart, { props: { label: "Lag", xLabels: labels, series: [{ name: "Lag", points }], visible: 20 } });
        expect(all.container.querySelectorAll("svg.plot g.marks path.marker")).toHaveLength(13);
    });

    it("always draws the first and the last x label when they are thinned (Z-150)", () => {
        const labels = Array.from({ length: 30 }, (_, index) => `${index + 1} sep`);
        const { container } = render(LineChart, { props: { label: "Lag", xLabels: labels, series: [{ name: "Lag", points: labels.map(() => 1) }] } });
        const drawn = Array.from(container.querySelectorAll("svg.plot text.tick")).map((text) => text.textContent?.trim());
        expect(drawn).toContain("1 sep");
        expect(drawn).toContain("30 sep");
        expect(drawn.filter((text) => text?.endsWith(" sep")).length).toBeLessThan(30);
    });

    it("draws the pane of values under the plot when it would be taller than the plot (Z-148)", async () => {
        const height = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight")!;
        Object.defineProperty(HTMLElement.prototype, "offsetHeight", { configurable: true, get: () => 500 });
        try {
            const { container } = render(LineChart, { props });
            const plot = container.querySelector("svg.plot") as SVGSVGElement;
            plot.getBoundingClientRect = () => ({ left: 0, top: 0, width: 600, height: 240, right: 600, bottom: 240, x: 0, y: 0, toJSON: () => ({}) });
            await fireEvent.pointerDown(plot, { clientX: 590, pointerType: "touch" });
            const readout = container.querySelector<HTMLElement>(".readout")!;
            expect(readout.classList.contains("under")).toBe(true);
            expect(readout.style.top).toBe("");
            expect(readout.style.right).toBe("");
        } finally {
            Object.defineProperty(HTMLElement.prototype, "offsetHeight", height);
        }
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

    /** Where a bar starts and ends, read back from its path: it stands on `base` and its rounded end is at `end`. */
    const span = (bar: Element) => {
        const [, base, rise, radius] = bar.getAttribute("d")!.match(/^M[\d.-]+ ([\d.-]+)v([\d.-]+)a([\d.]+) /)!.map(Number);
        const end = base + rise + Math.sign(rise) * radius;
        return { base, end, height: Math.abs(end - base) };
    };

    it("draws a bar per value from zero, taller for more, one colour unless a datum has its own", () => {
        const { container } = render(BarChart, { props });
        const bars = Array.from(container.querySelectorAll<SVGPathElement>("path.bar"));
        expect(bars).toHaveLength(3);
        const heights = bars.map((bar) => span(bar).height);
        expect(heights[1]).toBeGreaterThan(heights[0]);
        expect(heights[0]).toBeGreaterThan(heights[2]);
        expect(span(bars[0]).base).toBeCloseTo(span(bars[1]).base);
        expect(bars[0].style.getPropertyValue("--_c")).toBe("var(--zabi-chart-1, var(--color-action-primary))");
        expect(bars[2].style.getPropertyValue("--_c")).toBe(bars[0].style.getPropertyValue("--_c"));
        expect(bars[1].style.getPropertyValue("--_c")).toBe("var(--color-success)");
    });

    it("rounds a bar like a Progress fill at its far end and leaves it square on the zero line", () => {
        const { container } = render(BarChart, { props });
        const d = container.querySelector("path.bar")!.getAttribute("d")!;
        // Half the bar's width: the round end of a pill.
        expect(d.match(/a12 12 /g)).toHaveLength(2);
        expect(d.endsWith("Z")).toBe(true);
    });

    it("stands each bar in a track up to a yMax that is given, and draws none without one or below zero", () => {
        const open = render(BarChart, { props });
        expect(open.container.querySelectorAll("path.track")).toHaveLength(0);
        cleanup();
        const capped = render(BarChart, { props: { ...props, yMax: 10 } });
        const tracks = Array.from(capped.container.querySelectorAll("path.track"));
        expect(tracks).toHaveLength(3);
        expect(new Set(tracks.map((track) => span(track).end)).size).toBe(1);
        expect(span(tracks[0]).end).toBeLessThan(span(capped.container.querySelector("path.bar")!).end);
        cleanup();
        const below = render(BarChart, { props: { label: "x", yMax: 10, data: [{ label: "a", value: 4 }, { label: "b", value: -4 }] } });
        expect(below.container.querySelectorAll("path.track")).toHaveLength(0);
    });

    it("lays the glass over the bars: a veil and a rim of light each, and a sheen where a bar is wide and tall enough", () => {
        const { container } = render(BarChart, { props });
        const glass = container.querySelector("svg.plot g.glass")!;
        expect(glass.querySelectorAll("path.veil")).toHaveLength(3);
        expect(glass.querySelectorAll("path.rim")).toHaveLength(3);
        expect(glass.querySelectorAll("line.sheen").length).toBeGreaterThan(0);
        expect(glass.getAttribute("clip-path")).toMatch(/^url\(#/);
        expect(container.querySelectorAll("path.bar")).toHaveLength(3);
        cleanup();
        const empty = render(BarChart, { props: { label: "Noll", data: [{ label: "a", value: 0 }] } });
        expect(empty.container.querySelectorAll("g.glass path")).toHaveLength(0);
    });

    it("takes one colour for all bars", () => {
        const { container } = render(BarChart, { props: { ...props, color: "accent" } });
        expect(container.querySelector<SVGPathElement>("path.bar")!.style.getPropertyValue("--_c")).toBe("var(--color-accent)");
    });

    it("writes each value over its bar unless told not to, and each label under it", () => {
        const { container } = render(BarChart, { props });
        expect(Array.from(container.querySelectorAll("text.value")).map((text) => text.textContent?.trim())).toEqual(["7", "9", "4"]);
        expect(Array.from(container.querySelectorAll("text.label")).map((text) => text.textContent?.trim())).toEqual(["R1", "R2", "R3"]);
        cleanup();
        const bare = render(BarChart, { props: { ...props, showValues: false } });
        expect(bare.container.querySelectorAll("text.value")).toHaveLength(0);
    });

    it("draws a value below zero downward from the zero line", () => {
        const { container } = render(BarChart, { props: { label: "x", data: [{ label: "a", value: 4 }, { label: "b", value: -4 }] } });
        const [up, down] = Array.from(container.querySelectorAll("path.bar")).map(span);
        expect(down.base).toBeCloseTo(up.base);
        expect(up.end).toBeLessThan(up.base);
        expect(down.end).toBeGreaterThan(down.base);
        expect(container.innerHTML).not.toContain("NaN");
    });

    it("renders with no data", () => {
        const { container } = render(BarChart, { props: { label: "Tom", data: [] } });
        expect(container.querySelectorAll("path.bar")).toHaveLength(0);
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
        expect(slices[1].style.getPropertyValue("--_c")).toMatch(/^var\(--zabi-chart-2, /);
        expect(slices[2].style.getPropertyValue("--_c")).toMatch(/^var\(--zabi-chart-3, /);
        expect(slices[0].getAttribute("d")).toMatch(/^M50 0A50 50 0 1 1 /);
        const mask = container.querySelector("mask")!;
        expect(mask.querySelectorAll("path.cut")).toHaveLength(3);
        // Each gap is one even line from the exact centre with a round end, so the gaps meet in a point.
        for (const cut of mask.querySelectorAll("path.cut")) {
            expect(cut.getAttribute("d")).toMatch(/^M50 50L[\d.-]+ [\d.-]+$/);
            expect(cut.getAttribute("stroke")).toBe("black");
            expect(cut.getAttribute("stroke-linecap")).toBe("round");
        }
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

    it("lays the glass over the slices as one piece, cut by the same gaps, and it takes no pointer and no name", () => {
        const { container } = render(PieChart, { props });
        const glass = container.querySelector("svg.pie g.glass")!;
        // Inside the masked group, so the gaps go through it; after the slices, so it lies over them.
        expect(glass.parentElement!.getAttribute("mask")).toMatch(/^url\(#/);
        expect(glass.previousElementSibling!.classList.contains("slice")).toBe(true);
        // Nothing is drawn along the sides of a slice: a veil, a sheen and a rim over the whole shape.
        expect(glass.querySelectorAll("path")).toHaveLength(1);
        expect(glass.querySelectorAll("path.veil")).toHaveLength(1);
        expect(glass.querySelectorAll("circle.sheen")).toHaveLength(1);
        expect(glass.querySelectorAll("circle.rim")).toHaveLength(1);
        expect(glass.querySelector("title")).toBeNull();
        // The slices themselves keep their colour: the glass adds, it does not replace.
        expect(container.querySelector<SVGPathElement>("path.slice")!.style.getPropertyValue("--_c")).toBe("var(--color-success)");
        cleanup();
        const ring = render(PieChart, { props: { ...props, donut: true } });
        expect(ring.container.querySelectorAll("g.glass circle.rim")).toHaveLength(2);
        // In a ring the gaps keep parallel sides: a line of one width from the centre, hidden in the hole.
        expect(ring.container.querySelector("mask path.cut")!.getAttribute("stroke")).toBe("black");
        cleanup();
        const none = render(PieChart, { props: { label: "Tom", data: [] } });
        expect(none.container.querySelector("g.glass")).toBeNull();
    });

    it("is a ring with donut", () => {
        const pie = render(PieChart, { props });
        expect(pie.container.querySelector("path.slice")!.getAttribute("d")).toContain("L50 50Z");
        cleanup();
        const ring = render(PieChart, { props: { ...props, donut: true } });
        const d = ring.container.querySelector("path.slice")!.getAttribute("d")!;
        expect(d).not.toContain("L50 50Z");
        expect(d).toContain("A33 33");
    });

    it("puts the app's figure in the middle of the ring, and nothing in a full pie", () => {
        const center = createRawSnippet(() => ({ render: () => "<strong>20</strong>" }));
        const ring = render(PieChart, { props: { ...props, donut: true, center } });
        expect(ring.container.querySelector(".center strong")?.textContent).toBe("20");
        expect(ring.container.querySelector(".center")!.closest("[aria-hidden]")).toBeNull();
        cleanup();
        const pie = render(PieChart, { props: { ...props, center } });
        expect(pie.container.querySelector(".center")).toBeNull();
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

    it("marks the last value with a dot that does not stretch with the box", () => {
        const { container } = render(Sparkline, { props: { points: [1, 2, null, 3, null] } });
        expect(container.querySelector("path.end")!.getAttribute("d")).toBe("M75 8h0");
        cleanup();
        const none = render(Sparkline, { props: { points: [] } });
        expect(none.container.querySelector("path.end")).toBeNull();
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
