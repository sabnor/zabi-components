import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import MapView from "../src/components/molecules/MapView.svelte";
import {
    attributionText,
    boundsOf,
    clusterMarkers,
    fitPadding,
    insetOffset,
    mapViewSupported,
    type MapPoint,
} from "../src/components/util/map-view";

afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute("data-theme");
});

describe("clusterMarkers", () => {
    const at = (id: string) => ({ id });

    it("keeps markers apart whose tap areas do not overlap, in the order of the list", () => {
        const markers = clusterMarkers(
            [at("a"), at("b"), at("c")],
            [
                { x: 0, y: 0 },
                { x: 44, y: 0 },
                { x: 0, y: 44 },
            ],
        );
        expect(markers.map((marker) => [marker.key, marker.points.length])).toEqual([
            ["a", 1],
            ["b", 1],
            ["c", 1],
        ]);
    });

    it("draws overlapping markers as one, in the middle, at the place of its first point", () => {
        const markers = clusterMarkers(
            [at("a"), at("b"), at("c"), at("d")],
            [
                { x: 300, y: 300 },
                { x: 100, y: 100 },
                { x: 120, y: 110 },
                { x: 110, y: 120 },
            ],
        );
        expect(markers.map((marker) => marker.key)).toEqual(["a", "b"]);
        expect(markers[1].points.map((point) => point.id)).toEqual(["b", "c", "d"]);
        expect(markers[1].x).toBeCloseTo(110);
        expect(markers[1].y).toBeCloseTo(110);
    });

    it("goes on until no two markers overlap", () => {
        // a and b meet in the middle, which is then over c.
        const markers = clusterMarkers(
            [at("a"), at("b"), at("c")],
            [
                { x: 0, y: 0 },
                { x: 40, y: 0 },
                { x: 60, y: 0 },
            ],
        );
        expect(markers).toHaveLength(1);
        expect(markers[0].points).toHaveLength(3);
    });

    it("does not change with a pan", () => {
        const pixels = [
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 200, y: 0 },
        ];
        const moved = pixels.map(({ x, y }) => ({ x: x + 517, y: y - 80 }));
        const shape = (list: ReturnType<typeof clusterMarkers>) => list.map((marker) => marker.points.length);
        expect(shape(clusterMarkers([at("a"), at("b"), at("c")], moved))).toEqual(
            shape(clusterMarkers([at("a"), at("b"), at("c")], pixels)),
        );
    });
});

describe("map helpers", () => {
    it("boxes the points, and has no box for none", () => {
        expect(boundsOf([])).toBeNull();
        expect(
            boundsOf([
                { lng: 18, lat: 59.3 },
                { lng: 18.1, lat: 59.2 },
            ]),
        ).toEqual([
            [18, 59.2],
            [18.1, 59.3],
        ]);
    });

    it("puts a point in the middle of what an inset leaves clear", () => {
        expect(insetOffset(undefined)).toEqual({ x: 0, y: 0 });
        expect(insetOffset({ bottom: 200 })).toEqual({ x: 0, y: -100 });
    });

    it("reads an attribution's words out of its HTML", () => {
        expect(attributionText('<a href="https://openfreemap.org">OpenFreeMap</a> &copy; <a>OpenStreetMap</a>')).toBe(
            "OpenFreeMap © OpenStreetMap",
        );
    });

    it("says no to a map where there is no WebGL (jsdom has none)", () => {
        expect(mapViewSupported()).toBe(false);
    });
});

/** A stand-in for MapLibre: one px per thousandth of a degree, the middle of a 400 by 300 box at `center`. */
class FakeMap {
    static last: FakeMap;
    options: Record<string, unknown>;
    listeners = new Map<string, Array<(event: unknown) => void>>();
    center = { lng: 0, lat: 0 };
    zoom = 1;
    style: unknown;
    jumps: Array<Record<string, unknown>> = [];
    removed = false;
    canvas = document.createElement("canvas");
    touchZoomRotate = { disableRotation: vi.fn() };

    constructor(options: Record<string, unknown>) {
        this.options = options;
        this.style = options.style;
        const at = options.center as [number, number] | undefined;
        if (at) this.center = { lng: at[0], lat: at[1] };
        if (typeof options.zoom === "number") this.zoom = options.zoom;
        FakeMap.last = this;
    }
    on(type: string, listener: (event: unknown) => void) {
        this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
    }
    off() {}
    fire(type: string, event: unknown = {}) {
        for (const listener of this.listeners.get(type) ?? []) listener(event);
    }
    remove() {
        this.removed = true;
    }
    resize() {}
    jumpTo(options: { center?: [number, number] | { lng: number; lat: number }; zoom?: number }) {
        this.jumps.push(options);
        const at = options.center;
        if (at) this.center = Array.isArray(at) ? { lng: at[0], lat: at[1] } : { lng: at.lng, lat: at.lat };
        if (options.zoom !== undefined) this.zoom = options.zoom;
        this.fire("move");
        this.fire("moveend");
    }
    cameraForBounds(bounds: [[number, number], [number, number]], options: { maxZoom?: number }) {
        return {
            center: { lng: (bounds[0][0] + bounds[1][0]) / 2, lat: (bounds[0][1] + bounds[1][1]) / 2 },
            zoom: Math.min(12, options.maxZoom ?? 22),
        };
    }
    project([lng, lat]: [number, number]) {
        return { x: 200 + (lng - this.center.lng) * 1000, y: 150 - (lat - this.center.lat) * 1000 };
    }
    unproject([x, y]: [number, number]) {
        return { lng: this.center.lng + (x - 200) / 1000, lat: this.center.lat - (y - 150) / 1000 };
    }
    getCenter() {
        return this.center;
    }
    getZoom() {
        return this.zoom;
    }
    setStyle(style: unknown) {
        this.style = style;
    }
    getStyle() {
        return { sources: { tiles: { attribution: '<a href="#">OpenFreeMap</a> © OpenStreetMap' } } };
    }
    getCanvas() {
        return this.canvas;
    }
}

const points: MapPoint[] = [
    { id: "kaja", lng: 18.0, lat: 59.3, label: "Bar Kaja" },
    { id: "akkurat", lng: 18.2, lat: 59.3, label: "Akkurat, besökt", checked: true },
    { id: "oliver", lng: 18.201, lat: 59.301, label: "Oliver Twist" },
];

async function mount(props: Record<string, unknown> = {}) {
    const load = vi.fn(async () => ({ Map: FakeMap }));
    const view = render(MapView, {
        props: { points, styleLight: "light.json", styleDark: "dark.json", load, "data-testid": "map", ...props },
    });
    await waitFor(() => expect(FakeMap.last?.listeners.has("load")).toBe(true));
    const map = FakeMap.last;
    return { ...view, map, load };
}

const host = () => screen.getByTestId("map");
const markers = () => [...host().querySelectorAll<HTMLButtonElement>("[data-map-marker]")];

describe("MapView", () => {
    it("is a named group that says it is loading, and asks for no control of the library's", async () => {
        const onstatus = vi.fn();
        const { map } = await mount({ onstatus });
        expect(host().getAttribute("role")).toBe("group");
        expect(host().getAttribute("aria-label")).toBe("Map");
        expect(host().getAttribute("data-status")).toBe("loading");
        expect(host().hasAttribute("data-sheet-no-drag")).toBe(true);
        expect(host().className).toContain("touch-none");
        expect(map.options).toMatchObject({
            style: "light.json",
            attributionControl: false,
            dragRotate: false,
            touchPitch: false,
            doubleClickZoom: false,
            keyboard: false,
        });
        expect(map.touchZoomRotate.disableRotation).toHaveBeenCalled();
        expect(map.canvas.tabIndex).toBe(-1);
        map.fire("load");
        await waitFor(() => expect(host().getAttribute("data-status")).toBe("ready"));
        expect(onstatus).toHaveBeenCalledWith("ready");
    });

    it("fits to the markers when it has drawn, with a jump and the zoom capped", async () => {
        const { map } = await mount({ fitMaxZoom: 9 });
        map.fire("load");
        await waitFor(() => expect(map.jumps.length).toBeGreaterThan(0));
        expect(map.jumps[0]).toMatchObject({ zoom: 9 });
        expect((map.jumps[0].center as { lng: number }).lng).toBeCloseTo(18.1005);
    });

    it("draws a button per marker in the order of the list, and one count marker for those that overlap", async () => {
        const onpointpress = vi.fn();
        const onclusterpress = vi.fn();
        const { map } = await mount({ onpointpress, onclusterpress });
        map.fire("load");
        await waitFor(() => expect(markers()).toHaveLength(2));
        const [kaja, pair] = markers();
        expect(kaja.getAttribute("aria-label")).toBe("Bar Kaja");
        expect(kaja.getAttribute("data-map-marker")).toBe("point");
        expect(kaja.className).toContain("size-[44px]");
        expect(kaja.className).toContain("focus-ring");
        expect(pair.getAttribute("aria-label")).toBe("2 places");
        expect(pair.getAttribute("data-map-marker")).toBe("cluster");
        expect(pair.textContent!.trim()).toBe("2");
        const user = userEvent.setup();
        await user.click(kaja);
        expect(onpointpress).toHaveBeenCalledWith(points[0], 0);
        await user.click(pair);
        expect(onclusterpress).toHaveBeenCalledWith([points[1], points[2]]);
    });

    it("names a count marker with the app's own words", async () => {
        const { map } = await mount({ strings: { cluster: (count: number) => `${count} pubar` } });
        map.fire("load");
        await waitFor(() => expect(within(host()).getByRole("button", { name: "2 pubar" })).toBeTruthy());
    });

    it("marks a checked point, and opens where the page says without fitting", async () => {
        const { map } = await mount({
            points: [points[1]],
            center: { lng: 18.2, lat: 59.3 },
            zoom: 14,
        });
        expect(map.options).toMatchObject({ center: [18.2, 59.3], zoom: 14 });
        map.fire("load");
        await waitFor(() => expect(markers()).toHaveLength(1));
        expect(markers()[0].getAttribute("data-map-marker")).toBe("checked");
        expect(map.jumps.every((jump) => jump.zoom === undefined || jump.zoom === 14)).toBe(true);
    });

    it("draws the dark style while the page is dark, and keeps the map when the theme changes", async () => {
        document.documentElement.setAttribute("data-theme", "dark");
        const { map } = await mount();
        expect(map.options.style).toBe("dark.json");
        map.fire("load");
        document.documentElement.setAttribute("data-theme", "light");
        await waitFor(() => expect(map.style).toBe("light.json"));
        expect(map.removed).toBe(false);
    });

    it("shows the style's credit as plain text, always, or the page's own", async () => {
        const { map, unmount } = await mount();
        map.fire("load");
        await waitFor(() =>
            expect(host().querySelector("[data-map-attribution]")!.textContent!.trim()).toBe(
                "OpenFreeMap © OpenStreetMap",
            ),
        );
        expect(host().querySelector("[data-map-attribution] a")).toBeNull();
        unmount();
        await mount({ attribution: "© OpenStreetMap" });
        expect(host().querySelector("[data-map-attribution]")!.textContent!.trim()).toBe("© OpenStreetMap");
    });

    it("tells tiles-error when the style does not come, and takes it back when a tile arrives", async () => {
        const { map } = await mount();
        map.fire("error", { error: new Error("Failed to fetch") });
        await waitFor(() => expect(host().getAttribute("data-status")).toBe("tiles-error"));
        map.fire("load");
        map.fire("data", { dataType: "source", tile: {} });
        await waitFor(() => expect(host().getAttribute("data-status")).toBe("ready"));
    });

    it("does not tell tiles-error at the first failed tile, only when none has arrived", async () => {
        const { map } = await mount();
        map.fire("load");
        map.fire("data", { dataType: "source", tile: {} });
        map.fire("error", { tile: {}, sourceId: "tiles" });
        map.fire("idle");
        await waitFor(() => expect(host().getAttribute("data-status")).toBe("ready"));

        cleanup();
        const second = await mount();
        second.map.fire("error", { tile: {}, sourceId: "tiles" });
        expect(host().getAttribute("data-status")).toBe("loading");
        second.map.fire("idle");
        await waitFor(() => expect(host().getAttribute("data-status")).toBe("tiles-error"));
    });

    it("tells library-error when the library cannot be loaded", async () => {
        render(MapView, {
            props: {
                points,
                styleLight: "light.json",
                load: () => Promise.reject(new Error("chunk")),
                "data-testid": "map",
            },
        });
        await waitFor(() => expect(host().getAttribute("data-status")).toBe("library-error"));
    });

    it("draws the viewer's dot and jumps to it, and puts a point above a sheet", async () => {
        const { map, component, rerender } = await mount();
        map.fire("load");
        await waitFor(() => expect(markers().length).toBeGreaterThan(0));
        await rerender({ viewer: { lng: 18.05, lat: 59.31 } });
        await waitFor(() => expect(host().querySelector("[data-map-viewer]")).not.toBeNull());
        expect(host().querySelector("[data-map-viewer]")!.getAttribute("aria-label")).toBe("Your position");
        expect(map.center).toEqual({ lng: 18.05, lat: 59.31 });

        (component as unknown as { showPoint: (id: string, options: object) => void }).showPoint("kaja", {
            inset: { bottom: 100 },
        });
        // 50px above the middle: the middle of what the sheet leaves clear.
        expect(map.project([18.0, 59.3]).y).toBeCloseTo(100);
        expect(map.project([18.0, 59.3]).x).toBeCloseTo(200);
    });

    it("hands the page where it is when a move ends, and removes the map when it goes", async () => {
        const onmove = vi.fn();
        const { map, unmount } = await mount({ onmove });
        map.fire("load");
        await waitFor(() => expect(onmove).toHaveBeenCalled());
        expect(onmove.mock.calls.at(-1)![0]).toMatchObject({ zoom: 12 });
        unmount();
        expect(map.removed).toBe(true);
    });
});

describe("MapView: no worker is library-error (Z-139)", () => {
    it("tells library-error when MapLibre's worker does not load, and no later tile or draw takes it back", async () => {
        const { map } = await mount();
        map.fire("error", { error: new Error("Worker failed to load. Check that the worker URL is correct.") });
        await waitFor(() => expect(host().getAttribute("data-status")).toBe("library-error"));
        map.fire("error", { error: new Error("Failed to fetch") });
        map.fire("error", { tile: {}, sourceId: "tiles" });
        map.fire("idle");
        map.fire("load");
        await Promise.resolve();
        expect(host().getAttribute("data-status")).toBe("library-error");
    });

    it("says in the doc comment what a built app passes as load", () => {
        const source = readFileSync(join(__dirname, "../src/components/molecules/MapView.svelte"), "utf8");
        expect(source).toContain('import("maplibre-gl/dist/maplibre-gl-worker.mjs?url")');
        expect(source).toContain("setWorkerUrl(worker.default)");
    });
});

describe("MapView: the fit keeps markers clear of the credit (Z-140)", () => {
    it("pads the bottom so a tap area ends above the credit", () => {
        expect(fitPadding(0)).toEqual({ top: 44, right: 44, bottom: 44, left: 44 });
        expect(fitPadding(40)).toEqual({ top: 44, right: 44, bottom: 62, left: 44 });
    });

    it("fits with that padding, and keeps the credit clear in showPoint", async () => {
        const height = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight");
        Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
            configurable: true,
            get(this: HTMLElement) {
                return this.hasAttribute("data-map-attribution") ? 36 : 0;
            },
        });
        try {
            const { map, component } = await mount({ attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap" });
            const camera = vi.spyOn(map, "cameraForBounds");
            map.fire("load");
            await waitFor(() => expect(camera).toHaveBeenCalled());
            expect(camera.mock.calls[0][1]).toMatchObject({ padding: { top: 44, bottom: 62 } });

            (component as unknown as { showPoint: (id: string, options?: object) => void }).showPoint("kaja");
            // 20px above the middle: the middle of what the 40px of credit leaves clear.
            expect(map.project([18.0, 59.3]).y).toBeCloseTo(130);
            (component as unknown as { showPoint: (id: string, options?: object) => void }).showPoint("kaja", {
                inset: { bottom: 100 },
            });
            // A sheet taller than the credit is the inset alone, as before.
            expect(map.project([18.0, 59.3]).y).toBeCloseTo(100);
        } finally {
            if (height) Object.defineProperty(HTMLElement.prototype, "offsetHeight", height);
        }
    });
});

describe("MapView: the app's picture in a point's mark (Z-143)", () => {
    const picture = vi.fn();
    const marker = createRawSnippet((point: () => MapPoint) => {
        picture(point().id);
        return { render: () => `<svg data-picture="${point().id}"><title>Pub</title></svg>` };
    });

    const content = (button: Element) => button.querySelector("[data-map-marker-content]");

    it("draws the picture in a 20px box inside a 32px disc, as decoration of the named button", async () => {
        picture.mockClear();
        const { map } = await mount({ marker });
        map.fire("load");
        await waitFor(() => expect(markers()).toHaveLength(2));
        const [kaja, pair] = markers();
        expect(kaja.getAttribute("aria-label")).toBe("Bar Kaja");
        expect(kaja.getAttribute("data-map-marker")).toBe("point");
        expect(kaja.className).toContain("size-[44px]");
        const box = content(kaja)!;
        expect(box.getAttribute("aria-hidden")).toBe("true");
        expect(box.className).toContain("size-[20px]");
        expect(box.className).toContain("pointer-events-none");
        expect(box.querySelector('svg[data-picture="kaja"]')).not.toBeNull();
        expect(box.parentElement!.className).toContain("size-[32px]");
        expect(box.parentElement!.className).toContain("border-2");
        expect(box.parentElement!.className).toContain("bg-(--map-marker-fill,var(--color-surface-overlay))");
        // The count pin is as tall as the discs, and the snippet is never called for it.
        expect(content(pair)).toBeNull();
        expect(pair.querySelector("span")!.className).toContain("h-[32px]");
        expect(picture.mock.calls.map(([id]) => id)).not.toContain("akkurat");
    });

    it("draws a checked pictured point's check as a 16px corner badge, the picture left as it is", async () => {
        const { map } = await mount({ marker, points: [points[1]] });
        map.fire("load");
        await waitFor(() => expect(markers()).toHaveLength(1));
        const [akkurat] = markers();
        expect(akkurat.getAttribute("data-map-marker")).toBe("checked");
        expect(content(akkurat)!.querySelector("svg")).not.toBeNull();
        const badge = akkurat.querySelector("[data-map-marker-badge]")!;
        expect(badge.className).toContain("size-[16px]");
        expect(badge.className).toContain("top-[-6px]");
        expect(badge.className).toContain("left-[18px]");
        expect(badge.querySelector("svg")).not.toBeNull();
    });

    it("draws a point hasMarker refuses, and every point without marker, as before", async () => {
        const { map, unmount } = await mount({ marker, hasMarker: (point: MapPoint) => point.id !== "kaja" });
        map.fire("load");
        await waitFor(() => expect(markers()).toHaveLength(2));
        expect(content(markers()[0])).toBeNull();
        expect(markers()[0].querySelector("span")!.className).toContain("size-[20px] rounded-full border-[3px]");
        unmount();

        const second = await mount();
        second.map.fire("load");
        await waitFor(() => expect(markers()).toHaveLength(2));
        expect(host().querySelector("[data-map-marker-content]")).toBeNull();
        expect(markers()[1].querySelector("span")!.className).toContain("h-[28px]");
    });

    it("keeps the picture's element through a pan", async () => {
        const { map } = await mount({ marker });
        map.fire("load");
        await waitFor(() => expect(markers()).toHaveLength(2));
        const before = content(markers()[0])!.firstElementChild;
        map.jumpTo({ center: [18.01, 59.3] });
        await Promise.resolve();
        expect(content(markers()[0])!.firstElementChild).toBe(before);
    });

    it("has no animation or transition on any part of a mark", () => {
        const source = readFileSync(join(__dirname, "../src/components/molecules/MapView.svelte"), "utf8");
        const markup = source.slice(source.indexOf("{#each markers"), source.indexOf("{/each}"));
        expect(markup).not.toMatch(/\b(transition|animate|duration)-/);
    });
});

describe("the map stays out of every other entry", () => {
    const root = join(__dirname, "..");
    const read = (path: string) => readFileSync(join(root, path), "utf8");

    it.each([
        "src/components/index.ts",
        "src/components/atoms/index.ts",
        "src/components/molecules/index.ts",
        "src/components/organisms/index.ts",
    ])("%s does not export MapView", (path) => {
        expect(read(path)).not.toMatch(/MapView|map-view/);
    });

    it("has an entry of its own, and the library is an optional peer", () => {
        const pkg = JSON.parse(read("package.json"));
        expect(pkg.exports["./map"]).toEqual({
            types: "./dist/map.d.ts",
            import: "./dist/map.js",
            svelte: "./dist/map.js",
        });
        expect(pkg.peerDependencies["maplibre-gl"]).toBeTruthy();
        expect(pkg.peerDependenciesMeta["maplibre-gl"]).toEqual({ optional: true });
        expect(pkg.dependencies["maplibre-gl"]).toBeUndefined();
    });

    it("loads the library only from inside the component, when it is mounted", () => {
        const source = read("src/components/molecules/MapView.svelte");
        expect(source).toContain('import("maplibre-gl")');
        expect(source).not.toMatch(/^\s*import .* from ["']maplibre-gl/m);
        expect(read("src/components/util/map-view.ts")).not.toMatch(/from ["']maplibre-gl/);
    });
});
