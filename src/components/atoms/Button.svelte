<script lang="ts">
    export let variant: "primary" | "secondary" | "danger" = "primary";
    export let size: "sm" | "md" | "lg" = "md";
    export let disabled: boolean = false;
    export let type: "button" | "submit" | "reset" = "button";

    // Simple size classes
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    };

    // Simple variant classes
    $: variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    // Button classes
    $: buttonClasses = [
        "inline-flex items-center justify-center font-medium rounded-md",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
    ].join(" ");
</script>

<button {type} class={buttonClasses} {disabled} {...$$restProps}>
    <slot />
</button>
