/** Types and helpers shared by `Skeleton` and `SkeletonGroup`. Kept out of the components so they can be tested without a DOM. */
import { getContext, setContext } from "svelte";

/** Every built-in string. Pass a partial object to `strings` to translate. */
export interface SkeletonStrings {
    /** The name of the loading status, for a lone `Skeleton` and for a `SkeletonGroup`. */
    label: string;
}

export const DEFAULT_SKELETON_STRINGS: SkeletonStrings = {
    label: "Loading…",
};

/** The fewest and the most lines a text `Skeleton` draws with `lines`. */
export const SKELETON_LINES_MAX = 20;

/** `lines` as a whole number from 1 to 20, or 0 for "not a paragraph" (unset, below 1, not a number). */
export function skeletonLineCount(lines: number | undefined): number {
    if (lines === undefined || !Number.isFinite(lines) || lines < 1) return 0;
    return Math.min(SKELETON_LINES_MAX, Math.floor(lines));
}

const GROUP_KEY = Symbol("zabi-skeleton-group");

/** For `SkeletonGroup`: marks everything below it as pieces of one status. Call while the component initialises. */
export function provideSkeletonGroup(): void {
    setContext(GROUP_KEY, true);
}

/** For `Skeleton`: whether it sits under a `SkeletonGroup`. Call while the component initialises. */
export function inSkeletonGroup(): boolean {
    return getContext<boolean | undefined>(GROUP_KEY) === true;
}
