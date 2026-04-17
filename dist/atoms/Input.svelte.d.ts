import type { SemanticVariant, SizeVariant } from "../../types/variants.js";
interface Props {
    /** Stable id; generated when omitted (use with FormField `id`). */
    id?: string;
    value?: string;
    type?: string;
    name?: string;
    class?: string;
    label?: string;
    /** When using FormField, set true so the field provides the label. */
    hideLabel?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    /** Shows a spinner at the trailing edge and disables interaction while true. */
    loading?: boolean;
    size?: SizeVariant;
    variant?: SemanticVariant;
    message?: string;
    oninput?: (event: Event) => void;
    onblur?: (event: Event) => void;
    "aria-label"?: string;
}
declare const Input: import("svelte").Component<Props, {}, "value">;
type Input = ReturnType<typeof Input>;
export default Input;
