/**
 * The look of a field-shaped control's box: Select's trigger and native select
 * and PickerField draw it from here, so a picker beside a Select is the same
 * box. Kept in one place so they cannot drift.
 */

export type FieldControlSize = "sm" | "md" | "lg";

export interface FieldControlSizeClasses {
    /** The trigger's box: a minimum height, so a label that wraps makes it taller. */
    box: string;
    /** The text size: 16px below `sm`, as Input. */
    text: string;
    /** The same box for a native `<select>`, which is always one line. */
    native: string;
    /** Where the trailing chevron sits. */
    chevron: string;
}

/**
 * Same fixed height scale as Button, IconButton and Input (32 / 40 / 48), and
 * the same 16px text below `sm`. One line is exactly 32, 40 or 48px: the
 * padding leaves room for the line and the border inside it, and is a step
 * smaller below `sm`, where the text is 16px on a 24px line.
 */
export function fieldControlSize(size: FieldControlSize): FieldControlSizeClasses {
    if (size === "sm") return { box: "min-h-8 px-3 py-1 max-sm:py-0 pointer-coarse:min-h-11", text: "text-sm max-sm:text-base", native: "h-8 ps-3 pe-9 pointer-coarse:h-11", chevron: "end-3" };
    if (size === "lg") return { box: "min-h-12 px-4 py-2", text: "text-base", native: "h-12 ps-4 pe-10", chevron: "end-4" };
    return { box: "min-h-10 px-3 py-2 max-sm:py-1 pointer-coarse:min-h-11", text: "text-sm max-sm:text-base", native: "h-10 ps-3 pe-9 pointer-coarse:h-11", chevron: "end-3" };
}

/** The edge colour for a status: the field's own, or the status colour. */
export function fieldControlEdge(variant: string): string {
    return variant === "success"
        ? "border-success focus-visible:border-success"
        : variant === "warning"
          ? "border-warning focus-visible:border-warning"
          : variant === "error"
            ? "border-error focus-visible:border-error"
            : "border-input-border enabled:hover:border-input-border-hover";
}

/** The field's surface, edge and states. */
export const FIELD_CONTROL_SURFACE =
    "focus-ring w-full min-w-0 cursor-pointer rounded-control border bg-input text-body transition-colors duration-(--duration-base) hover:bg-input-hover active:bg-input-active focus-visible:bg-input-focus focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-input-disabled disabled:text-action-disabled-text";

/** What the trigger adds to the surface: one row, text and chevron apart. */
export const FIELD_CONTROL_TRIGGER = `${FIELD_CONTROL_SURFACE} flex items-center justify-between gap-2`;
