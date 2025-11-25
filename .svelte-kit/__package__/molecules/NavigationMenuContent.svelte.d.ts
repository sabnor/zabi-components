import type { Snippet } from "svelte";
interface Props {
    value?: string;
    className?: string;
    children?: Snippet;
}
declare const NavigationMenuContent: import("svelte").Component<Props, {}, "">;
type NavigationMenuContent = ReturnType<typeof NavigationMenuContent>;
export default NavigationMenuContent;
