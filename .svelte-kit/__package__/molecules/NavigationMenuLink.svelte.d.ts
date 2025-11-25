import type { Snippet } from "svelte";
interface Props {
    href?: string;
    asChild?: boolean;
    className?: string;
    children?: Snippet;
}
declare const NavigationMenuLink: import("svelte").Component<Props, {}, "">;
type NavigationMenuLink = ReturnType<typeof NavigationMenuLink>;
export default NavigationMenuLink;
