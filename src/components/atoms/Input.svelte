<script lang="ts">
    import { getInputVariantClasses } from "../../lib/variant-utils";

    export let value: string = "";
    export let type: string = "text";
    export let label: string = "";
    export let placeholder: string = "";
    export let disabled: boolean = false;
    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "default" | "success" | "warning" | "error" = "default";

    // Generate unique ID
    const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

    // Simple size classes
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    };

    // Get variant class using utility function
    $: variantClass = getInputVariantClasses(variant);

    // Input classes
    $: inputClasses = [
        "w-full rounded-md transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
        sizeClasses[size],
        variantClass,
    ].join(" ");

    // Label classes using semantic text colors
    $: labelClasses = "block text-sm font-medium text-primary mb-1";

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
    }
</script>

<div>
    {#if label}
        <label for={inputId} class={labelClasses}>{label}</label>
    {/if}
    <input
        id={inputId}
        {type}
        {value}
        {placeholder}
        {disabled}
        class={inputClasses}
        on:input={handleInput}
        {...$$restProps}
    />
</div>
