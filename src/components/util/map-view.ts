/**
 * Public types and pure helpers for `MapView`.
 *
 * Which markers become one count marker is worked out here, on pixels, so it
 * can be tested without a browser or the map library. Nothing in this file
 * imports MapLibre: `mapViewSupported()` can be asked before the library is
 * loaded, and the library's own types stay out of the package's.
 */

export type MapPointKey = string | number;

/** A place on the map. */
export interface MapLngLat {
    lng: number;
    lat: number;
}

/** One marker. */
export interface MapPoint extends MapLngLat {
    /** Stable identity. */
    id: MapPointKey;
    /** The marker's accessible name, written by the app. */
    label: string;
    /** Drawn filled, with a check mark; left out or false, round and outlined. */
    checked?: boolean;
}

/** Room kept clear at the edges of the map, in px: a sheet over its lower part is a `bottom`. */
export interface MapInset {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

/**
 * Where the map stands:
 * - `loading`: the library or the first style is on its way;
 * - `ready`: the map has drawn;
 * - `library-error`: the map library could not be loaded or started (no WebGL, a failed chunk);
 * - `tiles-error`: the style could not be fetched, or tiles failed and none has arrived (offline).
 */
export type MapViewStatus = "loading" | "ready" | "library-error" | "tiles-error";

/** Payload of MapView's `onmove`: where the map is after a move has ended. */
export interface MapViewPosition {
    center: MapLngLat;
    zoom: number;
}

/** Every built-in string of MapView. Pass a partial object to `strings` to translate. */
export interface MapViewStrings {
    /** Accessible name of the map. */
    label: string;
    /** Accessible name of a marker that stands for several points. */
    cluster: (count: number) => string;
    /** Accessible name of the dot at the viewer's own position. */
    viewer: string;
}

export const MAP_VIEW_STRINGS: MapViewStrings = {
    label: "Map",
    cluster: (count) => `${count} places`,
    viewer: "Your position",
};

/** A marker's tap area, in px. It does not grow with the text size. */
export const MAP_MARKER_TAP = 44;
/** The closest the opening fit zooms in, so one marker does not fill the screen: street level. */
export const MAP_FIT_MAX_ZOOM = 16;

/**
 * Whether this browser can draw the map: it has WebGL. Safe on the server
 * (false) and cheap: it does not load the map library.
 */
export function mapViewSupported(): boolean {
    if (typeof document === "undefined") return false;
    try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
        return false;
    }
}

export interface MapPixel {
    x: number;
    y: number;
}

/** What is drawn: one point, or several under one count marker. */
export interface MapMarker<T> {
    /** The key of its first point in the list: the marker keeps its element, and the focus, while others join or leave it. */
    key: MapPointKey;
    /** Its points, in the order of the list. */
    points: T[];
    /** Place in the list of its first point: the marker's place in the tab order. */
    order: number;
    /** Where it is drawn: the middle of its points. */
    x: number;
    y: number;
}

/**
 * Groups points whose tap areas overlap into one marker, and goes on until no
 * two markers overlap: a count marker sits in the middle of its points, which
 * may bring it over a neighbour. Markers come back in the order of the list,
 * each at the place of its first point.
 *
 * `pixels[i]` is where `points[i]` is on the screen. The result depends only
 * on how far apart the points are, so a pan changes nothing and a pinch splits
 * markers as they stop overlapping.
 */
export function clusterMarkers<T extends { id: MapPointKey }>(
    points: readonly T[],
    pixels: readonly MapPixel[],
    tap = MAP_MARKER_TAP,
): MapMarker<T>[] {
    type Group = { members: number[]; x: number; y: number };
    let groups: Group[] = points.map((_, index) => ({
        members: [index],
        x: pixels[index].x,
        y: pixels[index].y,
    }));

    let merged = true;
    while (merged) {
        merged = false;
        const next: Group[] = [];
        for (const group of groups) {
            const into = next.find(
                (other) => Math.abs(other.x - group.x) < tap && Math.abs(other.y - group.y) < tap,
            );
            if (!into) {
                next.push(group);
                continue;
            }
            into.members = [...into.members, ...group.members];
            into.x = into.members.reduce((sum, index) => sum + pixels[index].x, 0) / into.members.length;
            into.y = into.members.reduce((sum, index) => sum + pixels[index].y, 0) / into.members.length;
            merged = true;
        }
        groups = next;
    }

    return groups
        .map((group) => {
            const members = [...group.members].sort((a, b) => a - b);
            return {
                key: points[members[0]].id,
                points: members.map((index) => points[index]),
                order: members[0],
                x: group.x,
                y: group.y,
            };
        })
        .sort((a, b) => a.order - b.order);
}

/** The corners of the box around `points`, or null with none. */
export function boundsOf(points: readonly MapLngLat[]): [[number, number], [number, number]] | null {
    if (points.length === 0) return null;
    let west = Infinity;
    let south = Infinity;
    let east = -Infinity;
    let north = -Infinity;
    for (const point of points) {
        west = Math.min(west, point.lng);
        east = Math.max(east, point.lng);
        south = Math.min(south, point.lat);
        north = Math.max(north, point.lat);
    }
    return [
        [west, south],
        [east, north],
    ];
}

/** Changes when a point is added, taken away or moved, and not when only its name or its check does. */
export function pointsSignature(points: readonly MapPoint[]): string {
    return points.map((point) => `${point.id}:${point.lng}:${point.lat}`).join("|");
}

/**
 * How far from the middle of the map the middle of the area inside `inset`
 * is, in px: where a point is put so that it is in view above a sheet.
 */
export function insetOffset(inset: MapInset | undefined): MapPixel {
    return {
        x: ((inset?.left ?? 0) - (inset?.right ?? 0)) / 2,
        y: ((inset?.top ?? 0) - (inset?.bottom ?? 0)) / 2,
    };
}

/**
 * The fit's room at each edge: a tap area, and at the bottom enough that a
 * marker's tap area ends above the credit. `credit` is how far the credit
 * reaches up from the bottom edge, in px (0 when there is none).
 */
export function fitPadding(credit: number): Required<MapInset> {
    return {
        top: MAP_MARKER_TAP,
        right: MAP_MARKER_TAP,
        bottom: Math.max(MAP_MARKER_TAP, credit + MAP_MARKER_TAP / 2),
        left: MAP_MARKER_TAP,
    };
}

/** The words of an attribution the style carries as HTML, as plain text. */
export function attributionText(html: string): string {
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&copy;/g, "©")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

/** A colour, or one per theme. */
export type MapLineColor = string | { light: string; dark: string };

/** A line drawn on the map, above the base style. */
export interface MapLine {
    /** Unique among the lines; keep it the same across updates. */
    id: string;
    coordinates: [lng: number, lat: number][];
    color: MapLineColor;
    /** In px. Default 4. */
    width?: number;
    /** MapLibre's `line-dasharray`, in line widths. Without it, solid. */
    dash?: number[];
    /** The line's ends. Default `round`. */
    cap?: "round" | "butt";
    /** Default 1. */
    opacity?: number;
    /** An edge drawn under the line (and under every other line): its colour and its total width in px. */
    casing?: { color: MapLineColor; width: number };
}

/** The ids of the lines' own sources and layers start with these, so they never meet the app's. */
export const MAP_LINE_PREFIX = "zabi-line-";
export const MAP_LINE_CASING_PREFIX = "zabi-line-casing-";

/** The colour a line has in a theme. */
export function lineColor(color: MapLineColor, dark: boolean): string {
    return typeof color === "string" ? color : dark ? color.dark : color.light;
}

/**
 * The part of MapLibre GL JS that MapView uses, written out here so that the
 * package's types do not need the library's.
 */
export interface MapLibreMapLike {
    on(type: string, listener: (event: any) => void): unknown;
    off(type: string, listener: (event: any) => void): unknown;
    remove(): void;
    resize(): unknown;
    jumpTo(options: { center?: [number, number] | MapLngLat; zoom?: number }): unknown;
    cameraForBounds(
        bounds: [[number, number], [number, number]],
        options?: { padding?: number | Required<MapInset>; maxZoom?: number },
    ): { center?: unknown; zoom?: number } | undefined;
    project(lngLat: [number, number]): MapPixel;
    unproject(point: [number, number]): MapLngLat;
    getCenter(): MapLngLat;
    getZoom(): number;
    setStyle(style: string | object, options?: { diff?: boolean }): unknown;
    getStyle(): { sources?: Record<string, { attribution?: string }> } | undefined;
    getSource?(id: string): { attribution?: string; setData?(data: object): unknown } | undefined;
    getCanvas(): HTMLCanvasElement;
    addSource?(id: string, source: object): unknown;
    removeSource?(id: string): unknown;
    addLayer?(layer: object): unknown;
    removeLayer?(id: string): unknown;
    getLayer?(id: string): unknown;
    setPaintProperty?(layer: string, name: string, value: unknown): unknown;
    setLayoutProperty?(layer: string, name: string, value: unknown): unknown;
    touchZoomRotate?: { disableRotation(): void };
}

export interface MapLibreLike {
    Map: new (options: Record<string, unknown>) => MapLibreMapLike;
}
