import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import MapView from "../src/components/molecules/MapView.svelte";
import type { MapPoint } from "../src/components/util/map-view";

afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute("data-theme");
});

/** A stand-in for MapLibre: a point's lng/lat are its pixels. */
class MarkMap {
    static last: MarkMap;
    listeners = new Map<string, Array<(event: unknown) => void>>();
    canvas = document.createElement("canvas");
    constructor() {
        MarkMap.last = this;
    }
    on(type: string, listener: (event: unknown) => void) {
        this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
    }
    off() {}
    fire(type: string) {
        for (const listener of this.listeners.get(type) ?? []) listener({});
    }
    remove() {}
    resize() {}
    jumpTo() {}
    cameraForBounds() {
        return undefined;
    }
    project([lng, lat]: [number, number]) {
        return { x: lng, y: lat };
    }
    unproject([x, y]: [number, number]) {
        return { lng: x, lat: y };
    }
    getCenter() {
        return { lng: 0, lat: 0 };
    }
    getZoom() {
        return 1;
    }
    setStyle() {}
    getStyle() {
        return { sources: {} };
    }
    getCanvas() {
        return this.canvas;
    }
}

async function mount(points: MapPoint[], props: Record<string, unknown> = {}) {
    const load = vi.fn(async () => ({ Map: MarkMap }));
    const view = render(MapView, {
        props: { points, styleLight: "light.json", load, "data-testid": "map", ...props },
    });
    await waitFor(() => expect(MarkMap.last?.listeners.has("load")).toBe(true));
    MarkMap.last.fire("load");
    await waitFor(() => expect(buttons().length).toBeGreaterThan(0));
    return view;
}

const buttons = () => [...screen.getByTestId("map").querySelectorAll<HTMLButtonElement>("[data-map-marker]")];
const picture = createRawSnippet(() => ({ render: () => "<i data-pic></i>" }));

const at = (id: string, x: number, extra: Partial<MapPoint> = {}): MapPoint => ({
    id,
    lng: x,
    lat: 100,
    label: `Point ${id}`,
    ...extra,
});

describe("MapView marks", () => {
    it("draws a point without a mark as before", async () => {
        await mount([at("a", 100)]);
        const span = buttons()[0].querySelector("span")!;
        expect(span.className).toBe(
            "size-[20px] rounded-full border-[3px] border-action-primary bg-surface-overlay ring-2 ring-(--color-surface-overlay)",
        );
        expect(span.hasAttribute("data-map-mark-shape")).toBe(false);
        expect(buttons()[0].querySelector("svg")).toBeNull();
    });

    it("lets line and fill reach a round mark", async () => {
        await mount([at("a", 100, { mark: { line: "#c00", fill: "#fee" } })]);
        const span = buttons()[0].querySelector<HTMLElement>("[data-map-mark-shape]")!;
        expect(span.getAttribute("data-map-mark-shape")).toBe("circle");
        expect(span.style.getPropertyValue("--map-mark-line")).toBe("#c00");
        expect(span.style.getPropertyValue("--map-mark-fill")).toBe("#fee");
        expect(span.className).toContain("rounded-full");
        expect(span.className).toContain("border-(--map-mark-line,var(--color-action-primary))");
        expect(span.querySelector("svg")).toBeNull();
    });

    it.each(["triangle", "diamond", "hexagon"] as const)("draws a %s as an SVG the surface halo sits under", async (shape) => {
        await mount([at("a", 100, { mark: { shape, line: "#c00", fill: "#fee" } })]);
        const holder = buttons()[0].querySelector("[data-map-mark-shape]")!;
        expect(holder.getAttribute("data-map-mark-shape")).toBe(shape);
        const svg = holder.querySelector("svg")!;
        expect(svg.getAttribute("aria-hidden")).toBe("true");
        expect(svg.getAttribute("width")).toBe("20");
        const polygons = svg.querySelectorAll("polygon");
        expect(polygons).toHaveLength(2);
        expect(polygons[0].getAttribute("stroke-width")).toBe("7");
        expect(polygons[1].getAttribute("stroke-width")).toBe("3");
        expect(polygons[1].getAttribute("style")).toContain("var(--map-mark-line");
        expect(buttons()[0].getAttribute("aria-label")).toBe("Point a");
        expect(buttons()[0].className).toContain("size-[44px]");
    });

    it("draws a pictured shape at 32px with the picture inside", async () => {
        await mount([at("a", 100, { mark: { shape: "diamond" } })], { marker: picture });
        const holder = buttons()[0].querySelector("[data-map-mark-shape]")!;
        expect(holder.className).toContain("size-[32px]");
        expect(holder.querySelector("svg")!.getAttribute("width")).toBe("32");
        expect(holder.querySelector("[data-map-marker-content] [data-pic]")).not.toBeNull();
    });

    it("shows the check badge on a checked marked point, pictured or not", async () => {
        await mount([
            at("a", 100, { checked: true, mark: { shape: "triangle" } }),
            at("b", 300, { checked: true, mark: { shape: "circle" } }),
        ]);
        for (const button of buttons()) {
            expect(button.querySelector("[data-map-marker-badge]")).not.toBeNull();
            expect(button.getAttribute("data-map-marker")).toBe("checked");
        }
        cleanup();
        await mount([at("a", 100, { checked: true, mark: { shape: "hexagon" } })], { marker: picture });
        expect(buttons()[0].querySelector("[data-map-marker-badge]")).not.toBeNull();
    });

    const group = () => [
        at("a", 100, { mark: { shape: "triangle", line: "#c00" } }),
        at("b", 110, { mark: { shape: "diamond" } }),
    ];

    it("draws a count marker as the chosen point's mark with the count in a badge", async () => {
        const clusterPoint = vi.fn((points: MapPoint[]) => points[0]);
        await mount(group(), { clusterPoint });
        expect(buttons()).toHaveLength(1);
        const button = buttons()[0];
        expect(clusterPoint).toHaveBeenCalled();
        expect(button.getAttribute("data-map-marker")).toBe("cluster");
        expect(button.getAttribute("aria-label")).toBe("2 places");
        const holder = button.querySelector("[data-map-mark-shape]")!;
        expect(holder.getAttribute("data-map-mark-shape")).toBe("triangle");
        expect(holder.className).toContain("size-[32px]");
        const count = button.querySelector("[data-map-marker-count]")!;
        expect(count.textContent!.trim()).toBe("2");
        expect(count.className).toContain("tabular-nums");
        expect(count.className).toContain("text-[11px]");
    });

    it("keeps the count marker as before without clusterPoint or when it answers nothing", async () => {
        await mount(group());
        const plain =
            "flex h-[28px] min-w-[28px] items-center justify-center rounded-full border-2 border-action-primary bg-surface-overlay px-[6px] text-[13px] leading-none font-semibold text-headline tabular-nums ring-2 ring-(--color-surface-overlay)";
        expect(buttons()[0].querySelector("span")!.className.startsWith(plain)).toBe(true);
        expect(buttons()[0].querySelector("svg")).toBeNull();
        cleanup();
        await mount(group(), { clusterPoint: () => undefined });
        expect(buttons()[0].querySelector("span")!.className.startsWith(plain)).toBe(true);
        expect(buttons()[0].textContent!.trim()).toBe("2");
    });

    it("draws a point's text under its mark, hidden from the name and off the tap", async () => {
        await mount([at("a", 100, { text: "Hög risk", mark: { shape: "hexagon" } }), at("b", 300)]);
        const [withText, without] = buttons();
        const word = withText.querySelector<HTMLElement>("[data-map-marker-text]")!;
        expect(word.textContent!.trim()).toBe("Hög risk");
        expect(word.getAttribute("aria-hidden")).toBe("true");
        expect(word.className).toContain("pointer-events-none");
        expect(word.className).toContain("top-[40px]");
        expect(word.className).toContain("text-sm");
        expect(withText.getAttribute("aria-label")).toBe("Point a");
        expect(without.querySelector("[data-map-marker-text]")).toBeNull();
    });

    it("gives a count marker the text of the point clusterPoint picks, and none without it", async () => {
        const words = () => [
            at("a", 100, { text: "Måttlig risk", mark: { shape: "triangle" } }),
            at("b", 110, { text: "Hög risk", mark: { shape: "hexagon" } }),
        ];
        await mount(words(), { clusterPoint: (points: MapPoint[]) => points[1] });
        expect(buttons()).toHaveLength(1);
        const all = buttons()[0].querySelectorAll("[data-map-marker-text]");
        expect(all).toHaveLength(1);
        expect(all[0].textContent!.trim()).toBe("Hög risk");
        cleanup();
        await mount(words());
        expect(buttons()[0].querySelector("[data-map-marker-text]")).toBeNull();
    });
});
