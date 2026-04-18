/**
 * Layout strings for selection controls. Interaction states live in `app.css`
 * (`.selection-control-label-row-interaction`, etc.) — keep class names in sync.
 */
/** With `app.css`: hover, disabled, `:focus-visible` ring on the row. */
export declare const SELECTION_CONTROL_LABEL_ROW_INTERACTION = "selection-control-label-row-interaction";
/** With `app.css`: `:checked` ring for radio list rows. */
export declare const SELECTION_CONTROL_OPTION_ROW = "selection-control-option-row";
/** Control + label row; `p-2 -m-2` aligns hit area with text; `group` is not valid inside `@apply`. */
export declare const SELECTION_CONTROL_LABEL_ROW_BASE: string;
export declare const SELECTION_CONTROL_LABEL_ROW: string;
/** Radio option row: stacked label/description; `p-2` only (no `-m-2`) so vertical gaps stay even. */
export declare const RADIO_GROUP_OPTION_LABEL_ROW: string;
/** Control shell: border/fill/hover/checked/disabled. `group/control` drives inner mark states. */
export declare const SELECTION_CONTROL_SHELL_STATE = "group/control relative inline-flex items-center justify-center w-5 h-5 transition-all duration-200 border-2 group-active:scale-95 border-base-400 bg-transparent group-hover:border-brand-500 group-hover:bg-brand-50 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-500 has-[:checked]:group-hover:bg-brand-600 has-[:checked]:group-hover:border-brand-600 has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed";
export type SelectionControlShape = "square" | "circle";
export declare function selectionControlShellClasses(shape: SelectionControlShape): string;
/** Radio circle control; `mt-0.5` aligns with multi-line labels. */
export declare const RADIO_GROUP_CONTROL_SHELL: string;
/** Full-bleed ring behind the mark (same geometry as SelectionControl inner ring). */
export declare function selectionControlRingOverlayClasses(shape: SelectionControlShape): string;
/** Radio row: circle overlay + `pointer-events-none` so clicks hit the input. */
export declare const RADIO_GROUP_RING_OVERLAY: string;
/** Checked radio dot (shared with `Radio.svelte`). */
export declare const RADIO_CHECKED_DOT_CLASSES = "absolute size-2 rounded-full bg-base-50 pointer-events-none z-10 opacity-0 group-has-checked/control:opacity-100";
//# sourceMappingURL=selection-control.styles.d.ts.map