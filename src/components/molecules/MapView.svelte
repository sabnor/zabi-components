<script lang="ts" generics="T extends MapPoint">
    import { onMount, tick, untrack, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Check from "@lucide/svelte/icons/check";
    import { cn } from "../util/cn.js";
    import {
        attributionText,
        boundsOf,
        clusterMarkers,
        fitPadding,
        insetOffset,
        MAP_FIT_MAX_ZOOM,
        MAP_MARKER_TAP,
        MAP_VIEW_STRINGS,
        pointsSignature,
        lineColor,
        MAP_LINE_CASING_PREFIX,
        MAP_LINE_PREFIX,
        type MapInset,
        type MapLine,
        type MapLibreLike,
        type MapLibreMapLike,
        type MapLngLat,
        type MapMarker,
        type MapPixel,
        type MapPoint,
        type MapPointKey,
        type MapViewPosition,
        type MapViewStatus,
        type MapViewStrings,
    } from "../util/map-view.js";
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { isThemeDark } from "../util/theme-mode.js";

    /** MapLibre's own map type; a type only, so nothing of the library is imported here. */
    type MapLibreMap = import("maplibre-gl").Map;

    /**
     * A map with markers from a list, on MapLibre GL JS. It fills the box it
     * is given and has no control of its own: a finger pans and pinches, and
     * everything else is the page's.
     *
     * ```svelte
     * <MapView {points} styleLight={light} styleDark={dark} bind:status onpointpress={open} />
     * ```
     *
     * It comes from its own entry, `zabi-components/map`, and loads the map
     * library (`maplibre-gl`, the app's own dependency) only when it is
     * mounted in a browser: nothing else in the package brings any of it.
     * Ask `mapViewSupported()` before offering a map at all; it also comes
     * from `zabi-components/map/support`, which brings no component.
     *
     * The markers are the map for a keyboard and a screen reader: each is a
     * named button, in the order of `points`. Markers whose tap areas overlap
     * are drawn as one with their number. Every move the component makes is a
     * jump; the finger's own pan and pinch are the only motion.
     *
     * It shows no text of its own and no error: read `status` and put your
     * own skeleton or empty state in its place. `ready` is the opening view
     * drawn, without its tiles maybe; `onpainted` is told once they are in.
     * After an error, `retry()` starts it again.
     *
     * A browser keeps a failed `import()` for the life of the page: asking
     * the same address again fails at once, also once the net is back. So a
     * `retry()` after `library-error` can only load the library if `load`
     * asks at an address the page has not asked before on a later attempt
     * (it is called with the attempt's number, 1 first); with the default
     * `load`, the page must be reloaded instead.
     *
     * MapLibre 6 keeps its worker in a file of its own, which a bundler does
     * not move with the module, so the default `load` finds no worker in a
     * built app (`status` is then `library-error`). With Vite, pass a `load`
     * that hands the library the worker's address:
     *
     * ```ts
     * const load = async () => {
     *     const [library, worker] = await Promise.all([
     *         import("maplibre-gl"),
     *         import("maplibre-gl/dist/maplibre-gl-worker.mjs?url"),
     *     ]);
     *     library.setWorkerUrl(worker.default);
     *     return library;
     * };
     * ```
     *
     * A `marker` snippet draws the app's own picture inside a point's mark:
     * zabi draws the frame, the snippet only a 20px box in its middle, which
     * is decoration (the button's name is still `label`). `--map-marker-fill`
     * on the host or above sets the fill of those marks' discs.
     *
     * Other attributes (`id`, `data-*`, ...) land on the host `<div>`.
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "aria-label"> & {
        /** The markers, in the order they take in the tab order. */
        points: T[];
        /** The style drawn in the light theme: a URL or a style object. Nothing about the tile host is fixed here. */
        styleLight: string | object;
        /** The style drawn while the page is dark (`data-theme` on `<html>`, which may follow the system). Without it, `styleLight`. */
        styleDark?: string | object;
        /** Called with the point when its marker is pressed. */
        onpointpress?: (point: T, index: number) => void;
        /** Called with the points a count marker holds when it is pressed. */
        onclusterpress?: (points: T[]) => void;
        /** Names a count marker from its points. Without it, `strings.cluster` with the count. */
        clusterLabel?: (points: T[]) => string;
        /**
         * The app's own picture inside a point's mark, called with the point
         * from `points`. It fills a 20px box in a 32px disc that zabi draws;
         * the box is `aria-hidden` and takes no press of its own. Never called
         * for a count marker. Without it, every mark is drawn as before.
         */
        marker?: Snippet<[point: T]>;
        /** Which points get `marker`. Without it, every single point does; one it answers false for is drawn as before. */
        hasMarker?: (point: T) => boolean;
        /** The closest the fit to the markers zooms in. */
        fitMaxZoom?: number;
        /**
         * The middle of the map; supports `bind:center`. Given with `zoom`
         * when the map is made, it opens there and is not fitted to the
         * markers; set later, the map jumps there.
         */
        center?: MapLngLat;
        /** The zoom; supports `bind:zoom`. */
        zoom?: number;
        /** Called when a move has ended, by the finger or by the component. */
        onmove?: (position: MapViewPosition) => void;
        /**
         * The viewer's own position, from the page: a dot is drawn there and
         * the map jumps to it when it is set or changes. The component never
         * asks the browser for it.
         */
        viewer?: MapLngLat | null;
        /**
         * Lines drawn above every layer of the base style, in the order of
         * the list (a later one on top), under the markers. Each has its
         * colour (one per theme if it likes), width, dash and optional
         * casing; every casing is drawn under every line. They are the
         * component's own layers, so they survive a change of theme and cost
         * no reload of the style: give a line the same `id` and only its
         * data and paint change. Without it, no line.
         */
        lines?: MapLine[];
        /**
         * Called with the MapLibre map each time a new one has loaded (a
         * `retry()` makes a new one). Layers you add yourself are lost when
         * the theme swaps the style: listen for `style.load` to add them
         * again, or use `lines`.
         */
        onready?: (map: MapLibreMap) => void;
        /** Where the map stands; supports `bind:status`. */
        status?: MapViewStatus;
        onstatus?: (status: MapViewStatus) => void;
        /**
         * Called once the opening view has drawn with every tile in it, after
         * `ready`: the first time the map is still with nothing left to load.
         * Once per start (`retry()` starts again); not after a theme change.
         */
        onpainted?: () => void;
        /**
         * The credit that is always shown, bottom left. Without it, the words
         * of the attribution the style's sources carry, as plain text.
         */
        attribution?: string | Snippet;
        /**
         * Loads the map library, called with the attempt's number (1, then 2
         * after a `retry()`, ...). Default: `() => import("maplibre-gl")`, which
         * in a built app finds no MapLibre 6 worker, and which a `retry()`
         * cannot load again after it failed: see above.
         */
        load?: (attempt: number) => Promise<unknown>;
        /** Overrides for the built-in strings. */
        strings?: Partial<MapViewStrings>;
        /** Extra classes for the host element. */
        class?: string;
        /** Accessible name of the map. Without it, `strings.label`. */
        "aria-label"?: string;
    };

    let {
        points,
        styleLight,
        styleDark,
        onpointpress,
        onclusterpress,
        clusterLabel,
        marker: markerContent,
        hasMarker,
        fitMaxZoom = MAP_FIT_MAX_ZOOM,
        center = $bindable<Props["center"]>(),
        zoom = $bindable<Props["zoom"]>(),
        onmove,
        viewer = null,
        status = $bindable<Exclude<Props["status"], undefined>>(),
        onstatus,
        onpainted,
        lines = [],
        onready,
        attribution,
        load,
        strings,
        class: className = "",
        "aria-label": ariaLabel,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (status === undefined) status = "loading";
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    const text = $derived(mergeStrings(MAP_VIEW_STRINGS, strings));

    let host = $state<HTMLDivElement>();
    let surface = $state<HTMLDivElement>();
    let instance: MapLibreMapLike | undefined;
    /** The map has drawn once: it can be fitted and moved. */
    let loaded = $state(false);
    let dark = $state(false);
    let markers = $state.raw<MapMarker<T>[]>([]);
    let creditPlate = $state<HTMLParagraphElement>();
    let viewerPixel = $state.raw<MapPixel | null>(null);
    let styleCredit = $state("");

    const style = $derived(dark && styleDark ? styleDark : styleLight);
    let appliedStyle: string | object | undefined;

    function setStatus(next: MapViewStatus) {
        if (status === next) return;
        status = next;
        onstatus?.(next);
    }

    // --- Tiles ---------------------------------------------------------------

    /**
     * "Tiles failed" is told when none has arrived, not at the first one that
     * fails: the page puts its own message in the map's place, and a map with
     * one hole in it is still a map. A tile that arrives later takes it back.
     */
    let tilesArrived = 0;
    let tileErrors = 0;
    /** No worker, no map: the library did not start, whatever the tiles do after it. */
    let workerFailed = false;

    function handleError(event: { tile?: unknown; sourceId?: unknown; error?: { message?: unknown } }) {
        if (/worker/i.test(String(event?.error?.message ?? ""))) {
            workerFailed = true;
            setStatus("library-error");
            return;
        }
        if (event?.tile || event?.sourceId) {
            tileErrors += 1;
            return;
        }
        // Not a tile: before the first draw it is the style that did not come.
        if (!loaded && tilesArrived === 0 && !workerFailed) setStatus("tiles-error");
    }

    function handleData(event: { dataType?: string; tile?: unknown }) {
        if (event?.dataType !== "source" || !event.tile) return;
        tilesArrived += 1;
        if (loaded && status === "tiles-error") setStatus("ready");
    }

    /** `onpainted` has been told for this start. */
    let painted = false;

    function handleIdle() {
        if (tileErrors > 0 && tilesArrived === 0 && !workerFailed) setStatus("tiles-error");
        // Still, and everything in view loaded: the view the page uncovers is drawn.
        if (loaded && !painted && status === "ready") {
            painted = true;
            onpainted?.();
        }
    }

    // --- Markers -------------------------------------------------------------

    /** Where each point is on the screen now, and which of them share a marker. */
    function reproject() {
        const map = instance;
        if (!map) return;
        const pixels = points.map((point) => map.project([point.lng, point.lat]));
        const before = focusedKey;
        markers = clusterMarkers(points, pixels);
        viewerPixel = viewer ? map.project([viewer.lng, viewer.lat]) : null;
        if (before !== null && !markers.some((marker) => marker.key === before)) followFocus(before);
    }

    /**
     * The marker that has the focus keeps its element while others join it.
     * When it joins a marker earlier in the list its element goes; the
     * focus follows its point to the marker that now holds it.
     */
    let focusedKey: MapPointKey | null = null;

    function followFocus(id: MapPointKey) {
        const holder = markers.find((marker) => marker.points.some((point) => point.id === id));
        focusedKey = null;
        if (!holder) return;
        void tick().then(() => {
            const active = document.activeElement;
            if (active && active !== document.body) return;
            markerElement(holder.key)?.focus({ preventScroll: true });
        });
    }

    function markerElement(key: MapPointKey): HTMLElement | undefined {
        return Array.from(host?.querySelectorAll<HTMLElement>("[data-map-marker]") ?? []).find(
            (element) => element.dataset.pointId === String(key),
        );
    }

    /** A marker reached with Tab may be outside what is shown: the map jumps so that it is in view. */
    function handleMarkerFocus(marker: MapMarker<T>) {
        focusedKey = marker.key;
        const map = instance;
        if (!map || !host) return;
        const inside =
            marker.x >= 0 && marker.y >= 0 && marker.x <= host.clientWidth && marker.y <= host.clientHeight;
        if (!inside) map.jumpTo({ center: map.unproject([marker.x, marker.y]) });
    }

    function handleMarkerBlur(event: FocusEvent) {
        // A focus that went somewhere is let go; one that was dropped (the element was taken out) is followed.
        if (event.relatedTarget) focusedKey = null;
    }

    function press(marker: MapMarker<T>) {
        if (marker.points.length > 1) {
            onclusterpress?.(marker.points);
            return;
        }
        const point = marker.points[0];
        onpointpress?.(point, points.indexOf(point));
    }

    function nameOf(marker: MapMarker<T>): string {
        if (marker.points.length === 1) return marker.points[0].label;
        return clusterLabel ? clusterLabel(marker.points) : text.cluster(marker.points.length);
    }

    /** Whether a single point is drawn with the app's picture in it. */
    function pictured(point: T): boolean {
        return !!markerContent && (hasMarker ? hasMarker(point) : true);
    }

    // --- Moving ----------------------------------------------------------------

    /** How far the credit reaches up from the bottom edge, its 4px gap included; 0 while it is not drawn. */
    function creditReach(): number {
        const height = creditPlate?.offsetHeight ?? 0;
        return height > 0 ? height + 4 : 0;
    }

    /** Fits the map to the markers, no closer than `fitMaxZoom`. A jump. */
    export function fit() {
        const map = instance;
        const box = boundsOf(points);
        if (!map || !box) return;
        if (box[0][0] === box[1][0] && box[0][1] === box[1][1]) {
            map.jumpTo({ center: box[0], zoom: fitMaxZoom });
            return;
        }
        // Room for a marker at each edge, so none is cut by it, and none under the credit.
        const camera = map.cameraForBounds(box, { padding: fitPadding(creditReach()), maxZoom: fitMaxZoom });
        if (camera) map.jumpTo(camera as { center?: MapLngLat; zoom?: number });
    }

    /**
     * Puts a place in the middle of what `inset` leaves clear: a sheet over
     * the lower part of the map is `{ bottom: its height }`. The credit is
     * always kept clear at the bottom. A jump.
     */
    export function showPlace(place: MapLngLat, options: { inset?: MapInset; zoom?: number } = {}) {
        const map = instance;
        if (!map) return;
        map.jumpTo({ center: [place.lng, place.lat], zoom: options.zoom });
        const bottom = Math.max(options.inset?.bottom ?? 0, creditReach());
        const offset = insetOffset({ ...options.inset, bottom });
        if (offset.x === 0 && offset.y === 0) return;
        const middle = map.project([place.lng, place.lat]);
        map.jumpTo({ center: map.unproject([middle.x - offset.x, middle.y - offset.y]) });
    }

    /** The same for one of `points`, by its id. Nothing happens for an id that is not there. */
    export function showPoint(id: MapPointKey, options: { inset?: MapInset; zoom?: number } = {}) {
        const point = points.find((candidate) => candidate.id === id);
        if (point) showPlace(point, options);
    }

    /** What the map last told the page, so that the page handing it back moves nothing. */
    let reported: MapViewPosition | null = null;

    function reportPosition() {
        const map = instance;
        if (!map) return;
        const at = map.getCenter();
        const position = { center: { lng: at.lng, lat: at.lat }, zoom: map.getZoom() };
        reported = position;
        center = position.center;
        zoom = position.zoom;
        onmove?.(position);
    }

    $effect(() => {
        const to = center;
        const level = zoom;
        if (!loaded) return;
        untrack(() => {
            const map = instance;
            if (!map || (!to && level === undefined)) return;
            const same =
                reported !== null &&
                (!to || (to.lng === reported.center.lng && to.lat === reported.center.lat)) &&
                (level === undefined || level === reported.zoom);
            if (!same) map.jumpTo({ center: to ? [to.lng, to.lat] : undefined, zoom: level });
        });
    });

    /** The list the map was last fitted to. */
    let fitted: string | null = null;

    $effect(() => {
        const signature = pointsSignature(points);
        if (!loaded) return;
        untrack(() => {
            if (signature !== fitted) {
                fitted = signature;
                fit();
            }
            // A name or a check may have changed without anything moving.
            reproject();
        });
    });

    let viewerShown = "";

    $effect(() => {
        const at = viewer;
        if (!loaded) return;
        untrack(() => {
            const signature = at ? `${at.lng}:${at.lat}` : "";
            if (signature !== viewerShown) {
                viewerShown = signature;
                if (at) instance?.jumpTo({ center: [at.lng, at.lat] });
            }
            reproject();
        });
    });

    // --- Theme and credit ------------------------------------------------------

    $effect(() => {
        const next = style;
        untrack(() => {
            if (!instance || next === appliedStyle) return;
            appliedStyle = next;
            // The position and the markers stay: the markers are this component's own elements.
            if (drawnLines.length > 0 || lines.length > 0) {
                // The new style takes our layers with it. `diff: false` makes a
                // full swap, which always ends in `style.load`; there they are
                // added again (see `handleStyleLoad`).
                drawnLines = [];
                styleReady = false;
                instance.setStyle(next, { diff: false });
            } else {
                instance.setStyle(next);
            }
        });
    });

    // --- Lines ---------------------------------------------------------------

    /** What this map's current style has of ours: id and whether it has a casing, in order. */
    let drawnLines: string[] = [];
    /** The current style has loaded, so layers can be added to it. */
    let styleReady = false;

    const lineKey = (line: MapLine) => `${line.id}${line.casing ? "+" : ""}`;

    function paintLine(map: MapLibreMapLike, line: MapLine) {
        map.setPaintProperty?.(MAP_LINE_PREFIX + line.id, "line-color", lineColor(line.color, dark));
        map.setPaintProperty?.(MAP_LINE_PREFIX + line.id, "line-width", line.width ?? 4);
        map.setPaintProperty?.(MAP_LINE_PREFIX + line.id, "line-opacity", line.opacity ?? 1);
        map.setPaintProperty?.(MAP_LINE_PREFIX + line.id, "line-dasharray", line.dash);
        map.setLayoutProperty?.(MAP_LINE_PREFIX + line.id, "line-cap", line.cap ?? "round");
        if (line.casing) {
            const id = MAP_LINE_CASING_PREFIX + line.id;
            map.setPaintProperty?.(id, "line-color", lineColor(line.casing.color, dark));
            map.setPaintProperty?.(id, "line-width", line.casing.width);
            map.setPaintProperty?.(id, "line-opacity", line.opacity ?? 1);
            map.setPaintProperty?.(id, "line-dasharray", undefined);
            map.setLayoutProperty?.(id, "line-cap", line.cap ?? "round");
        }
    }

    const lineData = (line: MapLine) => ({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: line.coordinates },
    });

    function removeLines(map: MapLibreMapLike) {
        for (const key of drawnLines) {
            const id = key.replace(/\+$/, "");
            for (const name of [MAP_LINE_PREFIX + id, MAP_LINE_CASING_PREFIX + id]) {
                if (map.getLayer?.(name)) map.removeLayer?.(name);
                if (map.getSource?.(name)) map.removeSource?.(name);
            }
        }
        drawnLines = [];
    }

    /** Brings the map's lines to `lines` and the theme: updated in place if the same are there, else drawn again. */
    function syncLines() {
        const map = instance;
        if (!map || !styleReady || !map.addLayer) return;
        const want = lines;
        const keys = want.map(lineKey);
        try {
            if (keys.length === drawnLines.length && keys.every((key, at) => key === drawnLines[at])) {
                for (const line of want) {
                    map.getSource?.(MAP_LINE_PREFIX + line.id)?.setData?.(lineData(line));
                    if (line.casing) map.getSource?.(MAP_LINE_CASING_PREFIX + line.id)?.setData?.(lineData(line));
                    paintLine(map, line);
                }
                return;
            }
            removeLines(map);
            // Every casing first, so that it lies under every line.
            for (const line of want) {
                if (!line.casing) continue;
                const id = MAP_LINE_CASING_PREFIX + line.id;
                map.addSource?.(id, { type: "geojson", data: lineData(line) });
                map.addLayer({
                    id,
                    type: "line",
                    source: id,
                    layout: { "line-cap": line.cap ?? "round", "line-join": "round" },
                    paint: {
                        "line-color": lineColor(line.casing.color, dark),
                        "line-width": line.casing.width,
                        "line-opacity": line.opacity ?? 1,
                    },
                });
            }
            for (const line of want) {
                const id = MAP_LINE_PREFIX + line.id;
                map.addSource?.(id, { type: "geojson", data: lineData(line) });
                map.addLayer({
                    id,
                    type: "line",
                    source: id,
                    layout: { "line-cap": line.cap ?? "round", "line-join": "round" },
                    paint: {
                        "line-color": lineColor(line.color, dark),
                        "line-width": line.width ?? 4,
                        "line-opacity": line.opacity ?? 1,
                        ...(line.dash ? { "line-dasharray": line.dash } : {}),
                    },
                });
            }
            drawnLines = keys;
        } catch {
            // A style that refuses a layer leaves the map without lines; the next change tries again.
            drawnLines = [];
        }
    }

    /**
     * `style.load` rather than `setStyle(next, { transformStyle })`: the
     * layers are added to the style the map really has, whether the style is
     * a URL (not ours to read) or an object, and nothing is changed in the
     * app's style before it is drawn.
     */
    function handleStyleLoad() {
        styleReady = true;
        drawnLines = [];
        syncLines();
    }

    $effect(() => {
        // Read here: a change of the lines or of the theme repaints them.
        void lines;
        void dark;
        if (!loaded) return;
        untrack(syncLines);
    });

    function readCredit() {
        const map = instance;
        if (!map) return;
        const sources = map.getStyle()?.sources ?? {};
        const found: string[] = [];
        for (const [id, source] of Object.entries(sources)) {
            const words = attributionText(map.getSource?.(id)?.attribution ?? source.attribution ?? "");
            if (words && !found.includes(words)) found.push(words);
        }
        styleCredit = found.join(" · ");
    }

    // --- The map itself ----------------------------------------------------------

    /** The component is gone: nothing that comes back late may touch it. */
    let gone = false;
    /** The number of the start under way; one that is not the newest gives up. */
    let attempt = 0;

    /** Loads the library and makes the map. */
    async function start() {
        attempt += 1;
        const mine = attempt;
        let library: MapLibreLike | undefined;
        try {
            const module = (await (load ? load(mine) : import("maplibre-gl"))) as
                | (Partial<MapLibreLike> & { default?: MapLibreLike })
                | undefined;
            library = module?.Map ? (module as MapLibreLike) : module?.default;
            if (!library?.Map) throw new Error("no Map in the map library");
        } catch {
            if (!gone && mine === attempt) setStatus("library-error");
            return;
        }
        if (gone || mine !== attempt || !surface) return;
        // Opened where the page says, if it says both. Else made at the fit
        // to the markers, so that the first view drawn is the one that is
        // seen, and fitted again once it has drawn, with the credit measured.
        const restored = !!center && zoom !== undefined;
        try {
            appliedStyle = style;
            instance = new library.Map({
                container: surface,
                style,
                // No control on the surface: the credit is drawn below, always open.
                attributionControl: false,
                maplibreLogo: false,
                // The finger's pan and pinch only: no turning, no tilting, no zoom that eases on a double tap.
                dragRotate: false,
                pitchWithRotate: false,
                touchPitch: false,
                doubleClickZoom: false,
                boxZoom: false,
                keyboard: false,
                ...(restored && center ? { center: [center.lng, center.lat], zoom } : openingFit()),
            });
        } catch {
            setStatus("library-error");
            return;
        }
        const map = instance;
        map.touchZoomRotate?.disableRotation();
        // The markers are the map for a keyboard: the canvas is not a stop of its own.
        map.getCanvas().tabIndex = -1;
        map.on("error", handleError);
        map.on("data", handleData);
        map.on("idle", handleIdle);
        map.on("style.load", handleStyleLoad);
        map.on("styledata", readCredit);
        map.on("sourcedata", readCredit);
        map.on("move", reproject);
        map.on("resize", reproject);
        map.on("moveend", reportPosition);
        map.on("load", () => {
            if (gone || map !== instance) return;
            // Also here: a map that fired no `style.load` before `load`.
            if (!styleReady) handleStyleLoad();
            if (restored) fitted = pointsSignature(points);
            loaded = true;
            if (!workerFailed && (tilesArrived > 0 || tileErrors === 0)) setStatus("ready");
            readCredit();
            reproject();
            onready?.(map as unknown as MapLibreMap);
        });
    }

    /** The map's opening view as options of its constructor: the fit, as `fit()` makes it. None with no markers. */
    function openingFit(): Record<string, unknown> {
        const box = boundsOf(points);
        if (!box) return {};
        if (box[0][0] === box[1][0] && box[0][1] === box[1][1]) return { center: box[0], zoom: fitMaxZoom };
        return { bounds: box, fitBoundsOptions: { padding: fitPadding(creditReach()), maxZoom: fitMaxZoom } };
    }

    /**
     * Starts the map again from the library on: for a "Try again" after
     * `library-error` or `tiles-error`. `load` is called with the next
     * attempt's number; see above for what it must do after a failed load.
     */
    export function retry() {
        if (gone) return;
        instance?.remove();
        instance = undefined;
        drawnLines = [];
        styleReady = false;
        loaded = false;
        markers = [];
        viewerPixel = null;
        styleCredit = "";
        tilesArrived = 0;
        tileErrors = 0;
        workerFailed = false;
        painted = false;
        fitted = null;
        viewerShown = "";
        reported = null;
        setStatus("loading");
        void start();
    }

    onMount(() => {
        gone = false;
        dark = isThemeDark();
        const readTheme = () => (dark = isThemeDark());
        const themeObserver = new MutationObserver(readTheme);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme", "class"],
        });
        const system = window.matchMedia?.("(prefers-color-scheme: dark)");
        system?.addEventListener?.("change", readTheme);

        void start();

        return () => {
            gone = true;
            themeObserver.disconnect();
            system?.removeEventListener?.("change", readTheme);
            instance?.remove();
            instance = undefined;
        };
    });
</script>

<!-- `touch-action: none` and `data-sheet-no-drag`: a finger on the map pans the
     map, and neither scrolls the page nor drags a sheet the map is in. -->
<div
    bind:this={host}
    class={cn("relative size-full min-h-0 touch-none overflow-hidden", className)}
    role="group"
    aria-label={ariaLabel ?? text.label}
    data-map-view
    data-status={status}
    data-sheet-no-drag
    {...restProps}
>
    <!-- The library's own element is inside one more box: its stylesheet, where
         a page has it, makes the element `relative`, and it must still fill. -->
    <div class="absolute inset-0" aria-hidden="true">
        <div bind:this={surface} class="map-surface relative size-full"></div>
    </div>

    <!-- In px throughout: a marker does not grow with the text size. In the
         order of the list, which is the tab order. -->
    <div class="pointer-events-none absolute inset-0" data-map-markers>
        {#each markers as marker (marker.key)}
            {@const count = marker.points.length}
            {@const point = marker.points[0]}
            <button
                type="button"
                class="focus-ring pointer-events-auto absolute top-0 left-0 flex size-[44px] cursor-pointer items-center justify-center rounded-full bg-transparent"
                style:transform="translate({Math.round(marker.x - MAP_MARKER_TAP / 2)}px, {Math.round(
                    marker.y - MAP_MARKER_TAP / 2,
                )}px)"
                aria-label={nameOf(marker)}
                data-map-marker={count > 1 ? "cluster" : point.checked ? "checked" : "point"}
                data-point-id={marker.key}
                onfocus={() => handleMarkerFocus(marker)}
                onblur={handleMarkerBlur}
                onclick={() => press(marker)}
            >
                <!-- Each mark has a ring in the surface colour around it, so
                     its edge shows on any tile in either style. -->
                {#if count > 1}
                    <!-- Beside pictured marks the count is as tall as their discs. -->
                    <span
                        class={markerContent
                            ? "map-marker-frame flex h-[32px] min-w-[32px] items-center justify-center rounded-full border-2 border-action-primary bg-surface-overlay px-[7px] text-[13px] leading-none font-semibold text-headline tabular-nums ring-2 ring-(--color-surface-overlay)"
                            : "flex h-[28px] min-w-[28px] items-center justify-center rounded-full border-2 border-action-primary bg-surface-overlay px-[6px] text-[13px] leading-none font-semibold text-headline tabular-nums ring-2 ring-(--color-surface-overlay)"}
                    >
                        {count}
                    </span>
                {:else if markerContent && pictured(point)}
                    <!-- zabi's frame, the app's picture: a 32px disc, its 2px line
                         included, and the 20px box in its middle. The check is a
                         badge whose centre is 12px right of and above the pin's. -->
                    <span
                        class="map-marker-frame relative flex size-[32px] items-center justify-center rounded-full border-2 border-action-primary bg-(--map-marker-fill,var(--color-surface-overlay)) ring-2 ring-(--color-surface-overlay)"
                    >
                        <span
                            class="pointer-events-none flex size-[20px] items-center justify-center overflow-hidden"
                            aria-hidden="true"
                            data-map-marker-content
                        >
                            {@render markerContent(point)}
                        </span>
                        {#if point.checked}
                            <span
                                class="map-marker-badge absolute top-[-6px] left-[18px] flex size-[16px] items-center justify-center rounded-full bg-action-primary text-action-primary ring-2 ring-(--color-surface-overlay)"
                                data-map-marker-badge
                            >
                                <Check size={10} strokeWidth={3} aria-hidden="true" />
                            </span>
                        {/if}
                    </span>
                {:else if point.checked}
                    <span
                        class="flex size-[24px] items-center justify-center rounded-full bg-action-primary text-action-primary ring-2 ring-(--color-surface-overlay)"
                    >
                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                {:else}
                    <span
                        class="size-[20px] rounded-full border-[3px] border-action-primary bg-surface-overlay ring-2 ring-(--color-surface-overlay)"
                    ></span>
                {/if}
            </button>
        {/each}
        {#if viewerPixel}
            <!-- Found at a glance and still not a pin: a filled 20px dot, its
                 3px halo in the surface colour and a 1px edge outside that,
                 which keeps the halo apart from a pale ground. No pulse.
                 `--map-viewer-fill` on the host or above sets the fill. -->
            <span
                class="absolute top-0 left-0 size-[20px] rounded-full border-[3px] border-(--color-surface-overlay) bg-(--map-viewer-fill,var(--color-action-primary)) shadow-sm ring-1 ring-border-strong"
                style:transform="translate({Math.round(viewerPixel.x - 10)}px, {Math.round(viewerPixel.y - 10)}px)"
                role="img"
                aria-label={text.viewer}
                data-map-viewer
            ></span>
        {/if}
    </div>

    <!-- Always open, never behind a button: the licence of the map data asks for it. -->
    {#if attribution || styleCredit}
        <p
            bind:this={creditPlate}
            class="pointer-events-auto absolute start-[4px] bottom-[4px] m-0 [max-inline-size:calc(100%-8px)] rounded-control bg-surface-overlay px-[6px] py-[2px] text-xs text-description"
            data-map-attribution
        >
            {#if typeof attribution === "function"}
                {@render attribution()}
            {:else}
                {attribution || styleCredit}
            {/if}
        </p>
    {/if}
</div>

<style>
    /* The few rules of the library's stylesheet the map needs, so that the page
       does not have to load the rest of it: the canvas laid over the box, and
       nothing of the browser's own panning under a finger. */
    .map-surface {
        overflow: hidden;
    }

    .map-surface :global(.maplibregl-canvas-container),
    .map-surface :global(.maplibregl-canvas) {
        touch-action: none;
        user-select: none;
    }

    .map-surface :global(.maplibregl-canvas) {
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
    }

    /* No control is asked for; the holders the library still makes take no room. */
    .map-surface :global(.maplibregl-control-container) {
        display: none;
    }

    /* A pictured mark keeps its shape in forced colours; its picture follows
       the app's own rule for drawings. */
    @media (forced-colors: active) {
        .map-marker-frame {
            border-color: CanvasText;
            background-color: Canvas;
        }

        .map-marker-badge {
            border: 1px solid CanvasText;
            background-color: Canvas;
            color: CanvasText;
        }
    }
</style>
