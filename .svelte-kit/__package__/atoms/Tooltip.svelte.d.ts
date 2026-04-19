import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    content?: string;
    placement?: "top" | "bottom" | "left" | "right";
    delay?: number;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
};
declare const Tooltip: import("svelte").Component<Props, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
