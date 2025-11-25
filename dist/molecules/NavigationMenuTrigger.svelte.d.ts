import type { Snippet } from "svelte";
interface Props {
    value?: string;
    className?: string;
    children?: Snippet;
}
declare const NavigationMenuTrigger: import("svelte").Component<Props, {}, "">;
type NavigationMenuTrigger = ReturnType<typeof NavigationMenuTrigger>;
export default NavigationMenuTrigger;
