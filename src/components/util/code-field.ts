/** Types and pure helpers for `CodeField`. Kept out of the component so they can be tested without a DOM. */

/** `numeric`: digits only, the numeric keyboard. `alphanumeric`: digits and letters. */
export type CodeFieldMode = "numeric" | "alphanumeric";

/** Every built-in string. Pass a partial object to `strings` to translate. */
export interface CodeFieldStrings {
    /** The field's name when no `label` is given. */
    label: string;
    /** Read after the name, so a screen reader user knows how long the code is ("6 digits"). */
    description: (length: number, mode: CodeFieldMode) => string;
}

export const DEFAULT_CODE_FIELD_STRINGS: CodeFieldStrings = {
    label: "Verification code",
    description: (length, mode) => (mode === "numeric" ? `${length} digits` : `${length} characters`),
};

/** The fewest and the most places a code field draws. */
export const CODE_FIELD_LENGTH_MAX = 12;

/** `length` as a whole number from 1 to 12; 6 for anything that is not a number. */
export function codeLength(length: number | undefined): number {
    if (length === undefined || !Number.isFinite(length)) return 6;
    return Math.max(1, Math.min(CODE_FIELD_LENGTH_MAX, Math.floor(length)));
}

/** Whether one character belongs in a code of this mode. */
export function isCodeChar(char: string, mode: CodeFieldMode): boolean {
    return mode === "numeric" ? /^[0-9]$/.test(char) : /^[0-9A-Za-z]$/.test(char);
}

/**
 * What is left of `text` once everything that does not belong is dropped
 * (spaces, dashes, letters in a numeric code), cut to `length`. "123 456" and
 * "123-456" are "123456".
 */
export function sanitiseCode(text: string, mode: CodeFieldMode, length: number): string {
    let kept = "";
    for (const char of text) {
        if (isCodeChar(char, mode)) kept += char;
    }
    return kept.slice(0, length);
}

/** The characters kept of `text` before position `caret`: where the caret goes after `text` is cleaned. */
export function caretAfterSanitise(text: string, caret: number, mode: CodeFieldMode, length: number): number {
    return sanitiseCode(text.slice(0, caret), mode, length).length;
}

/** `value` with the place at `index` replaced by `char`. */
export function replaceAt(value: string, index: number, char: string): string {
    return value.slice(0, index) + char + value.slice(index + 1);
}

/** The text with `pasted` where the selection from `start` to `end` is. A whole code replaces what was there. */
export function pasteInto(value: string, start: number, end: number, pasted: string, mode: CodeFieldMode, length: number): string {
    const clean = sanitiseCode(pasted, mode, Number.MAX_SAFE_INTEGER);
    if (clean.length >= length) return clean.slice(0, length);
    return sanitiseCode(value.slice(0, start) + clean + value.slice(end), mode, length);
}

/** The place the caret is in, for the focus mark: the next empty place, or the last when the code is whole. */
export function activePlace(caret: number, length: number): number {
    return Math.max(0, Math.min(caret, length - 1));
}

/** The sizes of the boxes: the field's `size`. `md` is the size the field has always had. */
export type CodeFieldSize = "sm" | "md" | "lg";

/**
 * Per size: the box height, the digit class, the widest a box grows (rem) and
 * the least it is (`minEm`, in ems of its own digit, so a digit is never wider than its
 * box at any text size). `sm` stays 44px tall, the least for a touch target.
 */
export const CODE_FIELD_SIZES: Record<CodeFieldSize, { box: string; text: string; digitRem: number; maxRem: number; minEm: number }> = {
    sm: { box: "h-11", text: "text-lg", digitRem: 1.125, maxRem: 2.5, minEm: 1.15 },
    md: { box: "h-12", text: "text-xl", digitRem: 1.25, maxRem: 3, minEm: 1.15 },
    lg: { box: "h-14", text: "text-2xl", digitRem: 1.5, maxRem: 3.5, minEm: 1.15 },
};

/** The gap between boxes in a group, and the wider gap between groups (rem). */
export const CODE_FIELD_GAP_REM = 0.5;
export const CODE_FIELD_GROUP_GAP_REM = 1;

/**
 * `groups` as the sizes of the groups the boxes are drawn in. A number is the
 * size of each group (4 for 8 places is 4 and 4, 3 for 8 is 3, 3 and 2); a list
 * gives each group's size and the places left over form a last group. One
 * group, or anything unusable, means no grouping: an empty list.
 */
export function codeGroups(groups: number | number[] | undefined, length: number): number[] {
    if (groups === undefined) return [];
    const sizes: number[] = [];
    let left = length;
    if (typeof groups === "number") {
        if (!Number.isFinite(groups) || groups < 1) return [];
        const each = Math.floor(groups);
        while (left > 0) {
            sizes.push(Math.min(each, left));
            left -= each;
        }
    } else {
        for (const size of groups) {
            if (left <= 0) break;
            if (!Number.isFinite(size) || size < 1) continue;
            const take = Math.min(Math.floor(size), left);
            sizes.push(take);
            left -= take;
        }
        if (left > 0) sizes.push(left);
    }
    return sizes.length > 1 ? sizes : [];
}

/** The index of the box nearest to a point, by its rectangle; -1 when there are none. */
export function nearestBox(rects: { left: number; right: number; top?: number; bottom?: number }[], x: number, y: number): number {
    let best = -1;
    let bestDistance = Infinity;
    rects.forEach((rect, index) => {
        const dx = Math.max(rect.left - x, 0, x - rect.right);
        const dy = Math.max((rect.top ?? 0) - y, 0, y - (rect.bottom ?? 0));
        const distance = dy * 1000 + dx;
        if (distance < bestDistance) {
            bestDistance = distance;
            best = index;
        }
    });
    return best;
}
