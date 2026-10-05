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
    /**
     * How to get around by keyboard. Read once when focus enters the grid,
     * and shown below it while it has keyboard focus. Keep it to one short
     * sentence.
     */
    keyboardHint: string;
}

export const MEDIA_GRID_STRINGS: MediaGridStrings = {
    deleteLabel: (label) => `Delete ${label}`,
    videoLabel: (label) => `${label}, video`,
    loading: "Loading media",
    emptyTitle: "No media yet",
    emptyDescription: "Images and videos you upload appear here.",
    keyboardHint: "Use the arrow keys to move between items.",
};

// The rule is shared with `ImageUpload`; re-exported so this module's exports stay as they were.
export { isVideoUrl } from "./media.js";

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

const KEY_MOVES: Record<string, MediaGridMove> = {
    ArrowUp: "up",
    ArrowDown: "down",
    Home: "rowStart",
    End: "rowEnd",
};

/**
 * The move a key asks for in a grid of tiles, or undefined for a key that is
 * not a navigation key. Left and Right follow what is on screen, which is
 * mirrored in a right-to-left layout; Ctrl with Home or End goes to the first
 * or last tile. Shared by `MediaGrid` and `PhotoGrid`.
 */
export function moveForKey(
    event: Pick<KeyboardEvent, "key" | "ctrlKey">,
    rtl: boolean,
): MediaGridMove | undefined {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        return (event.key === "ArrowLeft") !== rtl ? "left" : "right";
    }
    if (event.ctrlKey && event.key === "Home") return "first";
    if (event.ctrlKey && event.key === "End") return "last";
    if (!event.ctrlKey) return KEY_MOVES[event.key];
    return undefined;
}
