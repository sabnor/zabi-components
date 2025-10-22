type $$ComponentProps = {
    variant?: "default" | "success" | "warning" | "error" | "info";
    size?: "sm" | "md" | "lg";
    text: string;
    showIcon?: boolean;
};
declare const Badge: import("svelte").Component<$$ComponentProps, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
