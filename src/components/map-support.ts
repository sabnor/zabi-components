/**
 * `zabi-components/map/support`: what `zabi-components/map` has besides the
 * component, with no component in it.
 *
 * Ask `mapViewSupported()` from here before the map is offered: this entry
 * imports nothing of `MapView` or of MapLibre, so asking costs neither.
 */
export {
    MAP_FIT_MAX_ZOOM,
    MAP_MARKER_TAP,
    MAP_VIEW_STRINGS,
    clusterMarkers,
    mapViewSupported,
} from './util/map-view.js';
export type {
    MapInset,
    MapLine,
    MapLineColor,
    MapLngLat,
    MapMarker,
    MapPixel,
    MapPoint,
    MapPointKey,
    MapViewPosition,
    MapViewStatus,
    MapViewStrings,
} from './util/map-view.js';
