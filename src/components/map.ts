/**
 * `zabi-components/map`: the map, apart from everything else.
 *
 * `MapView` needs `maplibre-gl` (the app's own dependency) and loads it when
 * it is mounted. It is in no other entry of the package, so importing a
 * component from `zabi-components` brings none of the map, script or CSS.
 */
export { default as MapView } from './molecules/MapView.svelte';
export {
    MAP_FIT_MAX_ZOOM,
    MAP_MARKER_TAP,
    MAP_VIEW_STRINGS,
    clusterMarkers,
    mapViewSupported,
} from './util/map-view.js';
export type {
    MapInset,
    MapLngLat,
    MapMarker,
    MapPixel,
    MapPoint,
    MapPointKey,
    MapViewPosition,
    MapViewStatus,
    MapViewStrings,
} from './util/map-view.js';
