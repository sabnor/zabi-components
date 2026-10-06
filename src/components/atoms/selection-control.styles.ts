/**
 * Layout strings for selection controls. Interaction states live in `app.css`
 * (`.selection-control-label-row-interaction`, etc.) — keep class names in sync.
 */

/** With `app.css`: hover, disabled, `:focus-visible` ring on the row. */
export const SELECTION_CONTROL_LABEL_ROW_INTERACTION =
    "selection-control-label-row-interaction";

/** With `app.css`: `:checked` ring for radio list rows. */
export const SELECTION_CONTROL_OPTION_ROW = "selection-control-option-row";

/**
 * Control + label row; `p-2 -m-2` aligns hit area with text; `group` is not valid inside `@apply`.
 *
 * On a coarse pointer the row is 44px tall and takes that room in the layout
 * (`my-0`): with the negative margin kept, two rows 8px apart overlapped by
 * 8px, and a tap in the overlap went to the lower one.
 */
export const SELECTION_CONTROL_LABEL_ROW_BASE =
    `p-2 -m-2 pointer-coarse:my-0 pointer-coarse:min-h-11 group ${SELECTION_CONTROL_LABEL_ROW_INTERACTION}`.trim();

export const SELECTION_CONTROL_LABEL_ROW = `flex items-center gap-2 ${SELECTION_CONTROL_LABEL_ROW_BASE}`;

/** Radio option row: stacked label/description; `p-2` only (no `-m-2`) so vertical gaps stay even. */
export const RADIO_GROUP_OPTION_LABEL_ROW =
    `flex items-start gap-2 p-2 pointer-coarse:min-h-11 group ${SELECTION_CONTROL_LABEL_ROW_INTERACTION} ${SELECTION_CONTROL_OPTION_ROW}`.trim();

/**
 * Control shell: border/fill/hover/checked/disabled. `group/control` drives inner mark states.
 * The checked fill is the primary action fill, so a ticked box and a primary
 * button are the same colour; it used to be a step paler (2.8:1 on the page).
 *
 * The pressed dip and the hover fills are for a control that can be used.
 * The row around a disabled input still matches `:active` and `:hover`, so
 * without that a disabled box dipped under a finger and lit up under the
 * mouse. The unchecked ones are limited to `not-has-[:disabled]`; the checked
 * hover is undone by a rule with one more `has-` in it, which outweighs it.
 */
export const SELECTION_CONTROL_SHELL_STATE =
    "group/control relative inline-flex items-center justify-center w-5 h-5 transition-all duration-200 border-2 not-has-[:disabled]:group-active:scale-95 border-base-400 bg-transparent not-has-[:disabled]:group-hover:border-brand-500 not-has-[:disabled]:group-hover:bg-brand-50 has-[:checked]:border-action-primary has-[:checked]:bg-action-primary has-[:checked]:group-hover:bg-action-primary-hover has-[:checked]:group-hover:border-action-primary-hover has-[:disabled]:has-[:checked]:group-hover:bg-action-primary has-[:disabled]:has-[:checked]:group-hover:border-action-primary has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed";

export type SelectionControlShape = "square" | "circle";

export function selectionControlShellClasses(shape: SelectionControlShape): string {
    const rounding = shape === "circle" ? "rounded-full" : "rounded";
    return `${SELECTION_CONTROL_SHELL_STATE} ${rounding}`.trim();
}

/** Radio circle control; `mt-0.5` aligns with multi-line labels. */
export const RADIO_GROUP_CONTROL_SHELL = `${SELECTION_CONTROL_SHELL_STATE} mt-0.5 shrink-0 rounded-full`.trim();

/**
 * The real input, stretched over the 20px box and transparent, so a press on
 * the box lands on the input itself. It used to be `sr-only`: a 1px box under
 * the ring overlay, where a click aimed at the input (a test's
 * `getByRole("checkbox").check()`, a pointer-driven assistive tool) hit the
 * overlay instead. Everything drawn over it lets the press through.
 *
 * 2px out on each side: the shell's border is outside its padding box.
 *
 * On a coarse pointer it is 44 by 44px, centred on the box (12px further out
 * on each side), so the input itself is the touch target and not only the
 * row around it. The row is 44px tall there, so the inputs of two rows never
 * reach each other.
 */
export const SELECTION_CONTROL_INPUT =
    "absolute -top-0.5 -start-0.5 m-0 size-5 cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed pointer-coarse:-top-3.5 pointer-coarse:-start-3.5 pointer-coarse:size-11";

/** Full-bleed ring behind the mark (same geometry as SelectionControl inner ring). Lets a press through to the input. */
export function selectionControlRingOverlayClasses(
    shape: SelectionControlShape,
): string {
    const rounding = shape === "circle" ? "rounded-full" : "rounded";
    return `pointer-events-none absolute inset-0 ${rounding}`.trim();
}

/** Radio row: circle overlay + `pointer-events-none` so clicks hit the input. */
export const RADIO_GROUP_RING_OVERLAY = selectionControlRingOverlayClasses("circle");

/** Checked radio dot (shared with `Radio.svelte`). */
export const RADIO_CHECKED_DOT_CLASSES =
    "absolute size-2 rounded-full bg-action-primary-text pointer-events-none z-10 opacity-0 group-has-checked/control:opacity-100";
