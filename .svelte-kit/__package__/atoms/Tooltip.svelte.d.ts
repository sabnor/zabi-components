interface Props {
    content?: string;
    placement?: "top" | "bottom" | "left" | "right";
    delay?: number;
    disabled?: boolean;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const Tooltip: import("svelte").Component<$$ComponentProps, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
