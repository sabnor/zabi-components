import type { SemanticVariant, SizeVariant } from "../../types/variants.js";
interface Props {
    value?: string;
    type?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
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
