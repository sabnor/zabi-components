/** Types and pure helpers for `Progress`. Kept out of the component so they can be tested without a DOM. */

/** Every built-in string. Pass a partial object to `strings` to translate. */
export interface ProgressStrings {
    /**
     * The count of a segmented bar, as its accessible value and as the
     * read-out beside the label: "4 of 19". `value` is the number of filled
     * segments.
     */
    valueText: (value: number, max: number) => string;
}

export const PROGRESS_STRINGS: ProgressStrings = {
    valueText: (value, max) => `${value} of ${max}`,
};

/** The fewest and the most segments a segmented bar is drawn with. */
export const SEGMENTS_MIN = 2;
export const SEGMENTS_MAX = 24;

/** Whether `max` can be drawn as separate segments: a whole number from 2 to 24. */
export function canSegment(max: number): boolean {
    return Number.isInteger(max) && max >= SEGMENTS_MIN && max <= SEGMENTS_MAX;
}

/** Filled segments: `value` rounded down, held within 0..max; 0 for something that is not a number. */
export function filledSegments(value: number, max: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(max, Math.floor(value)));
}
