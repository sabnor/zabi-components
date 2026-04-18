import type { SemanticVariant, SizeVariant } from "../../types/variants.js";
interface Props {
    /** Omit to auto-generate; pair with FormField `id` when used inside FormField. */
    id?: string;
    value?: string;
    type?: string;
    name?: string;
    class?: string;
    label?: string;
    /** True when FormField supplies the visible `<label>`. */
    hideLabel?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
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
