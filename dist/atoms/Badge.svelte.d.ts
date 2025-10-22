type $$ComponentProps = {
    variant?: "default" | "success" | "warning" | "error" | "info";
    size?: "sm" | "md" | "lg";
    text: string;
};
declare const Badge: import("svelte").Component<$$ComponentProps, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
