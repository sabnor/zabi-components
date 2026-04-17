/**
 * Layout + geometry helpers for selection controls. Interaction/focus rings are defined in
 * `app.css` `@layer components` (`.selection-control-label-row-interaction`, etc.).
 */

/** Matches `app.css` — hover, disabled, ring when inner control is `:focus-visible`. */
export const SELECTION_CONTROL_LABEL_ROW_INTERACTION =
    "selection-control-label-row-interaction";

/** Matches `app.css` — ring when inner control is `:checked` (radio list rows). */
export const SELECTION_CONTROL_OPTION_ROW = "selection-control-option-row";

/**
 * Single control + label: `p-2 -m-2` keeps the padded hit area aligned with surrounding text.
 * `group` is a Tailwind variant utility (not valid inside `@apply`); keep it in layout strings.
 */
export const SELECTION_CONTROL_LABEL_ROW_BASE =
    `p-2 -m-2 group ${SELECTION_CONTROL_LABEL_ROW_INTERACTION}`.trim();

/** Single-line control + label (e.g. `SelectionControl`). */
export const SELECTION_CONTROL_LABEL_ROW = `flex items-center gap-2 ${SELECTION_CONTROL_LABEL_ROW_BASE}`;

/**
 * Stacked label + description beside control (e.g. `RadioGroup` options).
 * `p-2` without negative margin so vertical `space-y-*` between options stays even.
 */
export const RADIO_GROUP_OPTION_LABEL_ROW =
    `flex items-start gap-2 p-2 group ${SELECTION_CONTROL_LABEL_ROW_INTERACTION} ${SELECTION_CONTROL_OPTION_ROW}`.trim();

/**
 * Border / fill / hover / checked / disabled shell (no rounding).
 * `group/control` enables `group-has-*` on inner marks.
 */
export const SELECTION_CONTROL_SHELL_STATE =
    "group/control relative inline-flex items-center justify-center w-5 h-5 transition-all duration-200 border-2 group-active:scale-95 border-base-400 bg-transparent group-hover:border-brand-500 group-hover:bg-brand-50 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-500 has-[:checked]:group-hover:bg-brand-600 has-[:checked]:group-hover:border-brand-600 has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed";

export type SelectionControlShape = "square" | "circle";

export function selectionControlShellClasses(shape: SelectionControlShape): string {
    const rounding = shape === "circle" ? "rounded-full" : "rounded";
    return `${SELECTION_CONTROL_SHELL_STATE} ${rounding}`.trim();
}

/** Radio row in `RadioGroup`: aligns with multi-line label + circle shape. */
export const RADIO_GROUP_CONTROL_SHELL = `${SELECTION_CONTROL_SHELL_STATE} mt-0.5 shrink-0 rounded-full`.trim();

/** Stacking layer behind marks (matches `SelectionControl` inner ring span). */
export function selectionControlRingOverlayClasses(
    shape: SelectionControlShape,
): string {
    const rounding = shape === "circle" ? "rounded-full" : "rounded";
    return `absolute inset-0 ${rounding}`.trim();
}

/** Radio row overlay: same geometry as circle ring + `pointer-events-none` for `RadioGroup`. */
export const RADIO_GROUP_RING_OVERLAY = `pointer-events-none ${selectionControlRingOverlayClasses("circle")}`;

/** Inner dot when radio is checked (shared with `Radio` atom markup). */
export const RADIO_CHECKED_DOT_CLASSES =
    "absolute size-2 rounded-full bg-base-50 pointer-events-none z-10 opacity-0 group-has-checked/control:opacity-100";
