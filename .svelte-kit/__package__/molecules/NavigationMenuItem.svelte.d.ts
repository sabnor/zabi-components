import type { Snippet } from "svelte";
interface Props {
    value?: string;
    className?: string;
    children?: Snippet;
}
declare const NavigationMenuItem: import("svelte").Component<Props, {}, "">;
type NavigationMenuItem = ReturnType<typeof NavigationMenuItem>;
export default NavigationMenuItem;
