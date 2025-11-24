import type { ExtendedSemanticVariant, SizeVariant } from "../../types/variants.js";
interface Props {
    variant?: ExtendedSemanticVariant;
    size?: SizeVariant;
    text: string;
    showIcon?: boolean;
}
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
