/**
 * Layout strings for selection controls. Interaction states live in `app.css`
 * (`.selection-control-label-row-interaction`, etc.) — keep class names in sync.
 */

/** With `app.css`: hover, disabled, `:focus-visible` ring on the row. */
export const SELECTION_CONTROL_LABEL_ROW_INTERACTION =
    "selection-control-label-row-interaction";

/** With `app.css`: `:checked` ring for radio list rows. */
export const SELECTION_CONTROL_OPTION_ROW = "selection-control-option-row";

/** Control + label row; `p-2 -m-2` aligns hit area with text; `group` is not valid inside `@apply`. */
export const SELECTION_CONTROL_LABEL_ROW_BASE =
    `p-2 -m-2 group ${SELECTION_CONTROL_LABEL_ROW_INTERACTION}`.trim();

export const SELECTION_CONTROL_LABEL_ROW = `flex items-center gap-2 ${SELECTION_CONTROL_LABEL_ROW_BASE}`;

/** Radio option row: stacked label/description; `p-2` only (no `-m-2`) so vertical gaps stay even. */
export const RADIO_GROUP_OPTION_LABEL_ROW =
    `flex items-start gap-2 p-2 group ${SELECTION_CONTROL_LABEL_ROW_INTERACTION} ${SELECTION_CONTROL_OPTION_ROW}`.trim();

/** Control shell: border/fill/hover/checked/disabled. `group/control` drives inner mark states. */
export const SELECTION_CONTROL_SHELL_STATE =
    "group/control relative inline-flex items-center justify-center w-5 h-5 transition-all duration-200 border-2 group-active:scale-95 border-base-400 bg-transparent group-hover:border-brand-500 group-hover:bg-brand-50 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-500 has-[:checked]:group-hover:bg-brand-600 has-[:checked]:group-hover:border-brand-600 has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed";

export type SelectionControlShape = "square" | "circle";

export function selectionControlShellClasses(shape: SelectionControlShape): string {
    const rounding = shape === "circle" ? "rounded-full" : "rounded";
    return `${SELECTION_CONTROL_SHELL_STATE} ${rounding}`.trim();
}

/** Radio circle control; `mt-0.5` aligns with multi-line labels. */
export const RADIO_GROUP_CONTROL_SHELL = `${SELECTION_CONTROL_SHELL_STATE} mt-0.5 shrink-0 rounded-full`.trim();

/** Full-bleed ring behind the mark (same geometry as SelectionControl inner ring). */
export function selectionControlRingOverlayClasses(
    shape: SelectionControlShape,
): string {
    const rounding = shape === "circle" ? "rounded-full" : "rounded";
    return `absolute inset-0 ${rounding}`.trim();
}

/** Radio row: circle overlay + `pointer-events-none` so clicks hit the input. */
export const RADIO_GROUP_RING_OVERLAY = `pointer-events-none ${selectionControlRingOverlayClasses("circle")}`;

/** Checked radio dot (shared with `Radio.svelte`). */
export const RADIO_CHECKED_DOT_CLASSES =
    "absolute size-2 rounded-full bg-base-50 pointer-events-none z-10 opacity-0 group-has-checked/control:opacity-100";
