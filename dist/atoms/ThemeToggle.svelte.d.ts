interface Props {
    size?: "sm" | "md" | "lg";
    variant?: "default" | "ghost" | "outline";
    onclick?: (event: Event) => void;
}
declare const ThemeToggle: import("svelte").Component<Props, {}, "">;
type ThemeToggle = ReturnType<typeof ThemeToggle>;
export default ThemeToggle;
