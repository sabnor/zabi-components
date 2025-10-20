<script lang="ts">
    import { getInputVariantClasses } from "../../routes/lib/variant-utils";
    import { generateId } from "../../routes/lib/ssr-safe";

    interface Props {
        value?: string;
        name?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        rows?: number;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "success" | "warning" | "error";
        oninput?: (event: Event) => void;
    }

    let {
        value = "",
        name = "",
        label = "",
        placeholder = "",
        disabled = false,
        rows = 4,
        size = "md",
        variant = "default",
        oninput,
        ...restProps
    }: Props = $props();

    // Generate unique ID - SSR safe
    let textareaId = $state(generateId("textarea"));

    // Simple size classes
    let sizeClasses = $derived({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    });

    // Get variant class using utility function
    let variantClass = $derived(getInputVariantClasses(variant));

    // Textarea classes
    let textareaClasses = $derived(
        [
            "w-full rounded-md transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
            "resize-y",
            sizeClasses[size],
            variantClass,
        ].join(" "),
    );

    // Label classes using semantic text colors
    let labelClasses = $derived("block text-sm font-medium text-primary mb-1");

    function handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;

        // Call the parent's oninput handler if provided
        if (oninput) {
            oninput(event);
        }
    }
</script>

<div>
    {#if label}
        <label for={textareaId} class={labelClasses}>{label}</label>
    {/if}

    <textarea
        id={textareaId}
        {name}
        {value}
        {placeholder}
        {disabled}
        {rows}
        class={textareaClasses}
        oninput={handleInput}
        {...restProps}
    ></textarea>
</div>
