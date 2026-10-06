/**
 * The chrome of an overlay at large text: the header of a BottomSheet, Drawer,
 * Modal or SlideUp, and the padding of its footer.
 *
 * Tailwind's spacing is in rem, so at `html { font-size: 200% }` the gutters,
 * the gap above the title, the title and the close button all doubled. On a
 * phone that left a third of a half-height sheet to what the sheet was opened
 * for. This is navigation chrome, as the app bar is (see AppBar): it says
 * where you are and how to leave, and it is not what the user enlarged the
 * text to read. So it is laid out in px, and its title grows to 1.3 times its
 * size and stops. The content, and whatever the app puts in the footer, scale
 * in full. docs/ACCESSIBILITY.md has the reasoning against WCAG 1.4.4.
 */

/**
 * On the header box: the spacing scale in px for everything inside it, so
 * `px-6`, `gap-4`, `size-8` and the 44px of `TOUCH_HIT_AREA` are the sizes
 * they are at 100% text. Only for a box that holds chrome alone: an app's
 * Button inside it would stop growing too, which is why a footer spells its
 * padding out in px instead.
 */
export const OVERLAY_CHROME = "[--spacing:4px]";

/**
 * How a title wraps: onto as many lines as it needs, between words, and a
 * word wider than the whole line is cut rather than left sticking out.
 */
export const OVERLAY_TITLE_WRAP = "[overflow-wrap:break-word]";

/**
 * On the title while the text is enlarged (`textIsEnlarged`): a word that does
 * not fit at the end of a line is hyphenated by the rules of the page's
 * `lang`, where the browser has them, before it is cut.
 *
 * Not at the default text size, and not narrowed with `hyphenate-limit-chars`:
 * `hyphens: auto` hyphenates at the end of every line, not only where a word
 * is too wide, and what a browser offers as a hyphenation point is the
 * platform's ("sett-ings", "histor-y" in Chromium on macOS). A title that
 * wraps between words today would get those. A limit, where it is supported
 * at all (not in Safari), turns a hyphenated break of a shorter word into a
 * plain cut.
 */
export const OVERLAY_TITLE_HYPHENS = "hyphens-auto";

/**
 * Whether the reader has enlarged the text: the root font size is above the
 * 16px every browser starts from. Read when an overlay opens. False on the
 * server and until then, which is the layout at the default size.
 */
export function textIsEnlarged(): boolean {
    if (typeof document === "undefined") return false;
    return parseFloat(getComputedStyle(document.documentElement).fontSize) > 16;
}

/** A title of 20px (`text-xl`): up to 26px, on the same 1.4 line. */
export const OVERLAY_TITLE_XL = "text-[length:min(1.25rem,26px)] leading-[1.4]";

/** A title of 24px (`text-2xl`): up to 31.2px, on the same 4/3 line. */
export const OVERLAY_TITLE_2XL = "text-[length:min(1.5rem,31.2px)] leading-[calc(4/3)]";

/** The "×" of a close button: a control, so the size it is at 100%. */
export const OVERLAY_CLOSE_GLYPH = "text-[24px] leading-[32px]";
