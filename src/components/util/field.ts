/**
 * What Input, Textarea and Select share about the text under a field, and
 * DateField and TimeField through Input. Kept in one place so the four cannot
 * drift: which message shows, in which variant, and what the control is
 * described by.
 */

import type { SemanticVariant } from "../types/variants.js";

export interface FieldMessageInput {
    variant?: SemanticVariant;
    message?: string;
    hint?: string;
    error?: string;
}

export interface FieldMessageState {
    /** The variant the control is drawn in: `error` whenever there is an error. */
    variant: SemanticVariant;
    /** The text of the status message: the error, or else `message`. */
    message: string;
    /** Whether the status message is rendered. A `message` without a variant is not. */
    showMessage: boolean;
    /** Whether the hint is rendered. */
    showHint: boolean;
}

/**
 * `error` wins over `variant` and `message`: it sets the error variant and is
 * the message. Without it, `message` shows in a `success`, `warning` or
 * `error` variant, as it always has, and not in `default`: text for a field
 * that is neither is a `hint`.
 */
export function fieldMessageState({
    variant = "default",
    message = "",
    hint = "",
    error = "",
}: FieldMessageInput): FieldMessageState {
    const resolvedVariant: SemanticVariant = error ? "error" : variant;
    const resolvedMessage = error || message;
    return {
        variant: resolvedVariant,
        message: resolvedMessage,
        showMessage: !!resolvedMessage && resolvedVariant !== "default",
        showHint: !!hint,
    };
}

export const fieldHintId = (fieldId: string) => `${fieldId}-hint`;
export const fieldMessageId = (fieldId: string) => `${fieldId}-message`;

/**
 * The ids a control is described by: the caller's own (a FormField around the
 * field, say), then the hint, then the status message. Only ids of elements
 * that are rendered; `undefined` when there are none, so no empty attribute.
 */
export function fieldDescribedBy(
    fieldId: string,
    state: Pick<FieldMessageState, "showMessage" | "showHint">,
    own?: string | null,
): string | undefined {
    return (
        [
            own,
            state.showHint ? fieldHintId(fieldId) : "",
            state.showMessage ? fieldMessageId(fieldId) : "",
        ]
            .filter(Boolean)
            .join(" ") || undefined
    );
}
