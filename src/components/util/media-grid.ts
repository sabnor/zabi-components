/** Types and pure helpers for `MediaGrid`. Kept out of the component so they can be tested without a DOM. */

export type MediaGridKey = string | number;

export type MediaGridItemType = "image" | "video";

/** Payload of `onselect`. */
export interface MediaGridSelectDetail<T> {
    item: T;
    /** False when the activation cleared the item's selection. */
    selected: boolean;
    /** Every selected key after the change: one or none unless `multiple`. */
    keys: MediaGridKey[];
}

/** Every built-in string. Pass a partial object to `strings` to translate. */
export interface MediaGridStrings {
    /** Accessible name of an item's delete button. */
    deleteLabel: (label: string) => string;
    /** Accessible name of a video item; an image is named by its label alone. */
    videoLabel: (label: string) => string;
    /** Announced, and never shown, while `loading` is set. */
    loading: string;
    emptyTitle: string;
    emptyDescription: string;
}

export const MEDIA_GRID_STRINGS: MediaGridStrings = {
    deleteLabel: (label) => `Delete ${label}`,
    videoLabel: (label) => `${label}, video`,
    loading: "Loading media",
    emptyTitle: "No media yet",
    emptyDescription: "Images and videos you upload appear here.",
};

const VIDEO_EXTENSION = /\.(mp4|m4v|webm|ogv|mov)$/i;

/** The same rule `ImageUpload` applies to its preview: a video data URL, or a video file extension before any query or hash. */
export function isVideoUrl(url: string): boolean {
    return url.startsWith("data:video/") || VIDEO_EXTENSION.test(url.split(/[?#]/)[0]);
}

/**
 * Columns in the rendered grid, read from the top edge of each tile in DOM
 * order: the first row ends where the top edge changes. The layout is CSS
 * `auto-fill`, so only the browser knows the answer.
 */
export function columnCount(tops: readonly number[]): number {
    if (tops.length === 0) return 1;
    let count = 1;
    while (count < tops.length && Math.abs(tops[count] - tops[0]) < 1) count += 1;
    return count;
}

export type MediaGridMove =
    | "left"
    | "right"
    | "up"
    | "down"
    | "rowStart"
    | "rowEnd"
    | "first"
    | "last";

/**
 * Index a navigation key lands on. Nothing wraps. Moving down from the row
 * above a short last row lands on the last item, so the last row can always
 * be reached from any column.
 */
export function moveIndex(
    index: number,
    move: MediaGridMove,
    columns: number,
    total: number,
): number {
    if (total === 0) return -1;
    const last = total - 1;
    const rowStart = index - (index % columns);
    switch (move) {
        case "left":
            return Math.max(0, index - 1);
        case "right":
            return Math.min(last, index + 1);
        case "up":
            return index - columns >= 0 ? index - columns : index;
        case "down": {
            if (index + columns <= last) return index + columns;
            // A row exists below, but not under this column.
            return rowStart + columns <= last ? last : index;
        }
        case "rowStart":
            return rowStart;
        case "rowEnd":
            return Math.min(last, rowStart + columns - 1);
        case "first":
            return 0;
        case "last":
            return last;
    }
}
