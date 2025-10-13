<script lang="ts">
    import { getInputVariantClasses } from "../../lib/variant-utils";

    interface Props {
        value?: string;
        type?: string;
        name?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "success" | "warning" | "error";
        oninput?: (event: Event) => void;
    }

    let {
        value = "",
        type = "text",
        name = "",
        label = "",
        placeholder = "",
        disabled = false,
        size = "md",
        variant = "default",
        oninput,
        ...restProps
    }: Props = $props();

    // Generate unique ID - SSR safe
    let inputId = $state(
        typeof window !== "undefined"
            ? `input-${Math.random().toString(36).substr(2, 9)}`
            : `input-ssr-${Date.now()}`,
    );

    // Simple size classes
    let sizeClasses = $derived({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    });

    // Get variant class using utility function
    let variantClass = $derived(getInputVariantClasses(variant));

    // Input classes
    let inputClasses = $derived(
        [
            "w-full rounded-md transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
            sizeClasses[size],
            variantClass,
        ].join(" "),
    );

    // Label classes using semantic text colors
    let labelClasses = $derived("block text-sm font-medium text-primary mb-1");

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;

        // Call the parent's oninput handler if provided
        if (oninput) {
            oninput(event);
        }
    }
</script>

<div>
    {#if label}
        <label for={inputId} class={labelClasses}>{label}</label>
    {/if}
    <input
        id={inputId}
        {type}
        {name}
        {value}
        {placeholder}
        {disabled}
        class={inputClasses}
        oninput={handleInput}
        {...restProps}
    />
</div>
