/** Types and pure helpers for `Rating`. Kept out of the component so they can be tested without a DOM. */

/** Every built-in string. Pass a partial object to `strings` to translate. */
export interface RatingStrings {
    /**
     * Accessible name of one star ("4 of 5 stars"), and of a read-only
     * rating as a whole ("3.5 of 5 stars"). `value` is already formatted.
     */
    starLabel: (value: string, max: number) => string;
    /** Accessible name of the clear button that `clearable` adds. */
    clearLabel: string;
    /** Shown, and read, for a read-only rating without a value. */
    noRating: string;
}

export const RATING_STRINGS: RatingStrings = {
    starLabel: (value, max) => `${value} of ${max} stars`,
    clearLabel: "Clear rating",
    noRating: "No rating",
};

/** Number of stars: a whole number, at least one. */
export function starCount(max: number): number {
    return Number.isFinite(max) ? Math.max(1, Math.floor(max)) : 5;
}

/** `value` held within 0..max; `null` for no rating or a value that is not a number. */
export function clampRating(value: number | null | undefined, max: number): number | null {
    if (value === null || value === undefined || !Number.isFinite(value)) return null;
    return Math.max(0, Math.min(max, value));
}

/** How much of star `star` (counted from 1) is filled, 0 to 1. */
export function starFill(value: number | null, star: number): number {
    if (value === null) return 0;
    return Math.max(0, Math.min(1, value - (star - 1)));
}

/** The value with at most one decimal: 4, 3.5, 3.7. */
export function defaultRatingFormat(value: number): string {
    return String(Math.round(value * 10) / 10);
}
