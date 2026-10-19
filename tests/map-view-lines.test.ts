import { cleanup, render, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import MapView from "../src/components/molecules/MapView.svelte";
import type { MapLine } from "../src/components/util/map-view";

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-theme");
});

type Layer = {
  id: string;
  source: string;
  paint: Record<string, unknown>;
  layout: Record<string, unknown>;
};

/** A stand-in for MapLibre with a style that holds sources and layers. */
class LineMap {
  static last: LineMap;
  listeners = new Map<string, Array<(event: unknown) => void>>();
  layers: Layer[] = [{ id: "base", source: "tiles", paint: {}, layout: {} }];
  sources = new Map<
    string,
    { data: unknown; setData: (data: unknown) => void }
  >();
  calls: string[] = [];
  setStyleCalls: unknown[][] = [];
  canvas = document.createElement("canvas");
  constructor() {
    LineMap.last = this;
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
  setStyle(...args: unknown[]) {
    this.setStyleCalls.push(args);
    // A new style: the app's layers only.
    this.layers = [{ id: "base", source: "tiles", paint: {}, layout: {} }];
    this.sources.clear();
  }
  getStyle() {
    return { sources: {} };
  }
  getCanvas() {
    return this.canvas;
  }
  addSource(id: string, source: { data: unknown }) {
    this.calls.push(`addSource:${id}`);
    const entry = {
      data: source.data,
      setData: (data: unknown) => {
        this.calls.push(`setData:${id}`);
        entry.data = data;
      },
    };
    this.sources.set(id, entry);
  }
  getSource(id: string) {
    return this.sources.get(id);
  }
  removeSource(id: string) {
    this.calls.push(`removeSource:${id}`);
    this.sources.delete(id);
  }
  addLayer(layer: Layer) {
    this.calls.push(`addLayer:${layer.id}`);
    this.layers.push(layer);
  }
  getLayer(id: string) {
    return this.layers.find((layer) => layer.id === id);
  }
  removeLayer(id: string) {
    this.calls.push(`removeLayer:${id}`);
    this.layers = this.layers.filter((layer) => layer.id !== id);
  }
  setPaintProperty(id: string, name: string, value: unknown) {
    this.calls.push(`paint:${id}:${name}`);
    this.getLayer(id)!.paint[name] = value;
  }
  setLayoutProperty(id: string, name: string, value: unknown) {
    this.getLayer(id)!.layout[name] = value;
  }
  get ids() {
    return this.layers.map((layer) => layer.id);
  }
}

const route = (id: string, extra: Partial<MapLine> = {}): MapLine => ({
  id,
  coordinates: [
    [18, 59],
    [18.1, 59.1],
  ],
  color: { light: "#111111", dark: "#eeeeee" },
  ...extra,
});

async function mount(props: Record<string, unknown> = {}) {
  const load = vi.fn(async () => ({ Map: LineMap }));
  const view = render(MapView, {
    props: {
      points: [],
      styleLight: "light.json",
      styleDark: "dark.json",
      load,
      ...props,
    },
  });
  await waitFor(() => expect(LineMap.last?.listeners.has("load")).toBe(true));
  return { ...view, map: LineMap.last };
}

describe("MapView lines", () => {
  it("draws nothing and calls nothing on the map without lines", async () => {
    const { map } = await mount();
    map.fire("style.load");
    map.fire("load");
    expect(map.calls).toEqual([]);
  });

  it("waits for the style, then draws every casing and then every line above the base, in order", async () => {
    const { map } = await mount({
      lines: [
        route("a", { casing: { color: "#fff", width: 11 } }),
        route("b", { width: 8 }),
      ],
    });
    expect(map.ids).toEqual(["base"]);
    map.fire("style.load");
    map.fire("load");
    expect(map.ids).toEqual([
      "base",
      "zabi-line-casing-a",
      "zabi-line-a",
      "zabi-line-b",
    ]);
    expect(map.getLayer("zabi-line-b")!.paint["line-width"]).toBe(8);
    expect(map.getLayer("zabi-line-casing-a")!.paint["line-width"]).toBe(11);
    expect(map.getLayer("zabi-line-a")!.paint["line-color"]).toBe("#111111");
    expect(map.getLayer("zabi-line-a")!.layout["line-cap"]).toBe("round");
    expect(map.getSource("zabi-line-a")!.data).toMatchObject({
      geometry: { type: "LineString" },
    });
    expect(map.setStyleCalls).toEqual([]);
  });

  it("puts every casing under every line, whatever their order", async () => {
    const { map } = await mount({
      lines: [route("a"), route("b", { casing: { color: "#fff", width: 9 } })],
    });
    map.fire("load");
    expect(map.ids).toEqual([
      "base",
      "zabi-line-casing-b",
      "zabi-line-a",
      "zabi-line-b",
    ]);
  });

  it("keeps a dash on the line only", async () => {
    const { map } = await mount({
      lines: [route("a", { dash: [2, 1.25], cap: "butt" })],
    });
    map.fire("load");
    expect(map.getLayer("zabi-line-a")!.paint["line-dasharray"]).toEqual([
      2, 1.25,
    ]);
    expect(map.getLayer("zabi-line-a")!.layout["line-cap"]).toBe("butt");
  });

  it("updates in place for the same ids: new data and paint, no remove, add or setStyle", async () => {
    const { map, rerender } = await mount({ lines: [route("a")] });
    map.fire("load");
    map.calls.length = 0;
    await rerender({ lines: [route("a", { color: "#ff0000", width: 6 })] });
    await waitFor(() => expect(map.calls).toContain("setData:zabi-line-a"));
    expect(map.calls.some((call) => /^(add|remove)/.test(call))).toBe(false);
    expect(map.getLayer("zabi-line-a")!.paint["line-color"]).toBe("#ff0000");
    expect(map.getLayer("zabi-line-a")!.paint["line-width"]).toBe(6);
    expect(map.setStyleCalls).toEqual([]);
  });

  it("draws again, without a reload of the style, when the ids change", async () => {
    const { map, rerender } = await mount({ lines: [route("a")] });
    map.fire("load");
    await rerender({ lines: [route("b"), route("c")] });
    await waitFor(() =>
      expect(map.ids).toEqual(["base", "zabi-line-b", "zabi-line-c"]),
    );
    expect(map.calls).toContain("removeLayer:zabi-line-a");
    expect(map.calls).toContain("removeSource:zabi-line-a");
    expect(map.setStyleCalls).toEqual([]);
    await rerender({ lines: [] });
    await waitFor(() => expect(map.ids).toEqual(["base"]));
  });

  it("adds the lines again, in the dark colours, once the dark style has loaded", async () => {
    const { map } = await mount({
      lines: [
        route("a", {
          casing: { color: { light: "#fff", dark: "#111827" }, width: 7 },
        }),
      ],
    });
    map.fire("load");
    document.documentElement.setAttribute("data-theme", "dark");
    await waitFor(() => expect(map.setStyleCalls).toHaveLength(1));
    expect(map.setStyleCalls[0][0]).toBe("dark.json");
    expect(map.ids).toEqual(["base"]);
    map.fire("style.load");
    expect(map.ids).toEqual(["base", "zabi-line-casing-a", "zabi-line-a"]);
    expect(map.getLayer("zabi-line-a")!.paint["line-color"]).toBe("#eeeeee");
    expect(map.getLayer("zabi-line-casing-a")!.paint["line-color"]).toBe(
      "#111827",
    );
  });

  it("repaints the colours on a theme change when there is no dark style", async () => {
    const { map } = await mount({ styleDark: undefined, lines: [route("a")] });
    map.fire("load");
    document.documentElement.setAttribute("data-theme", "dark");
    await waitFor(() =>
      expect(map.getLayer("zabi-line-a")!.paint["line-color"]).toBe("#eeeeee"),
    );
    expect(map.setStyleCalls).toEqual([]);
    expect(map.calls.some((call) => call.startsWith("removeLayer"))).toBe(
      false,
    );
  });

  it("calls onready with the map once it has loaded, and again for the map a retry makes", async () => {
    const onready = vi.fn();
    const { map, component } = await mount({ onready });
    expect(onready).not.toHaveBeenCalled();
    map.fire("load");
    expect(onready).toHaveBeenCalledTimes(1);
    expect(onready).toHaveBeenCalledWith(map);
    (component as unknown as { retry(): void }).retry();
    await waitFor(() => expect(LineMap.last).not.toBe(map));
    await waitFor(() => expect(LineMap.last.listeners.has("load")).toBe(true));
    LineMap.last.fire("load");
    expect(onready).toHaveBeenCalledTimes(2);
    expect(onready).toHaveBeenLastCalledWith(LineMap.last);
  });
});
