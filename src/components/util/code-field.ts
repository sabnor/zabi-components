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
