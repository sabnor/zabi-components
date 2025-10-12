<script lang="ts">
    import { getInputVariantClasses } from "../../lib/variant-utils";

    interface Props {
        value?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        rows?: number;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "success" | "warning" | "error";
    }

    let {
        value = "",
        label = "",
        placeholder = "",
        disabled = false,
        rows = 4,
        size = "md",
        variant = "default"
    }: Props = $props();

    // Generate unique ID - SSR safe
    let textareaId: string;
    if (typeof window !== "undefined") {
        textareaId = `textarea-${Math.random().toString(36).substr(2, 9)}`;
    } else {
        textareaId = `textarea-ssr-${Date.now()}`;
    }

    // Simple size classes
    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    };

    // Get variant class using utility function
    const variantClass = getInputVariantClasses(variant);

    // Textarea classes
    const textareaClasses = [
        "w-full rounded-md transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
        "resize-y",
        sizeClasses[size],
        variantClass,
    ].join(" ");

    // Label classes using semantic text colors
    const labelClasses = "block text-sm font-medium text-primary mb-1";

    function handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
    }
</script>

<div>
    {#if label}
        <label for={textareaId} class={labelClasses}>{label}</label>
    {/if}

    <textarea
        id={textareaId}
        {value}
        {placeholder}
        {disabled}
        {rows}
        class={textareaClasses}
        oninput={handleInput}
    ></textarea>
</div>
