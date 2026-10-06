/** Types and pure helpers for `Avatar` and `AvatarGroup`. Kept out of the components so they can be tested without a DOM. */

/** Diameter of the circle: 24, 32 and 48px. */
export type AvatarSize = "sm" | "md" | "lg";

/** One person in an `AvatarGroup`. */
export interface AvatarPerson {
    name: string;
    /** Address of the picture. Without it, or when it fails to load, the initials show. */
    src?: string;
}

/** Every built-in string of `AvatarGroup`. Pass a partial object to `strings` to translate. */
export interface AvatarGroupStrings {
    /**
     * Accessible name of the "+3" at the end: how many people are not shown,
     * and their names, for an app that wants to read them out.
     */
    more: (count: number, names: string[]) => string;
}

export const DEFAULT_AVATAR_GROUP_STRINGS: AvatarGroupStrings = {
    more: (count) => `and ${count} more`,
};

/** `locale` when the runtime takes it as a language tag; otherwise `undefined`, which is the runtime's own. */
function knownLocale(locale: string | undefined): string | undefined {
    if (!locale) return undefined;
    try {
        return Intl.getCanonicalLocales(locale)[0];
    } catch {
        return undefined;
    }
}

/** The first user-perceived character of `word`: a letter with its accents, or an emoji, whole. */
function firstGrapheme(word: string, locale?: string): string {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segments = new Intl.Segmenter(locale, { granularity: "grapheme" }).segment(word);
        for (const { segment } of segments) return segment;
        return "";
    }
    // Code points, at least: a surrogate pair is not cut in half.
    return Array.from(word)[0] ?? "";
}

/**
 * The initials shown for `name`: the first letter of its first word and of
 * its last, upper-cased for `locale`; one letter for a name of one word; `""`
 * for a name with no words, which is drawn as an icon and never as "?".
 */
export function initialsOf(name: string | null | undefined, locale?: string): string {
    const words = (name ?? "").trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "";
    const picked = words.length === 1 ? [words[0]] : [words[0], words[words.length - 1]];
    const language = knownLocale(locale);
    return picked.map((word) => firstGrapheme(word, language).toLocaleUpperCase(language)).join("");
}

/**
 * How an `AvatarGroup` of `total` people splits at `max`: how many are
 * shown, and how many stand behind the "+N".
 *
 * `max` below 1 is 1. One person too many is shown and not counted: a "+1"
 * takes the room of the person it hides.
 */
export function splitGroup(total: number, max: number): { shown: number; hidden: number } {
    const limit = Number.isFinite(max) ? Math.max(1, Math.floor(max)) : 4;
    if (total <= limit + 1) return { shown: total, hidden: 0 };
    return { shown: limit, hidden: total - limit };
}
