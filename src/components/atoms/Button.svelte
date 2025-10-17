<script lang="ts">
    interface Props {
        variant?:
            | "primary"
            | "secondary"
            | "danger"
            | "success"
            | "ghost"
            | "brand";
        size?: "sm" | "md" | "lg";
        disabled?: boolean;
        type?: "button" | "submit" | "reset";
        className?: string;
        onclick?: (event: MouseEvent) => void;
    }

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        type = "button",
        className = "",
        onclick,
        children,
        ...restProps
    }: Props & { children?: any } = $props();

    // Enhanced size classes with better spacing and typography
    let sizeClasses = $derived({
        sm: "px-3 py-1.5 text-sm font-medium",
        md: "px-4 py-2 text-sm font-medium",
        lg: "px-6 py-3 text-base font-semibold",
    });

    // Enhanced variant classes with better focus states and transitions
    let variantClasses = $derived({
        primary:
            "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
        secondary:
            "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
        success:
            "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
        brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400",
    });

    // Enhanced button classes with better accessibility and animations
    let buttonClasses = $derived(
        [
            "inline-flex items-center justify-center rounded-md transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "active:scale-95 transform-gpu",
            "shadow-sm hover:shadow-md",
            sizeClasses[size],
            variantClasses[variant],
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<button {type} class={buttonClasses} {disabled} {...restProps}>
    {@render children?.()}
</button>
