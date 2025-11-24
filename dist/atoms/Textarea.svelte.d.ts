import type { SemanticVariant, SizeVariant } from "../../types/variants.js";
interface Props {
    value?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
    size?: SizeVariant;
    variant?: SemanticVariant;
    message?: string;
    oninput?: (event: Event) => void;
}
declare const Textarea: import("svelte").Component<Props, {}, "">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
