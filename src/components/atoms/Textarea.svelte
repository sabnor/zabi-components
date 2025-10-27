<script lang="ts">
    // SSR-safe ID generation
    function generateId(prefix: string = "id"): string {
        if (typeof window !== "undefined") {
            return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
        } else {
            return `${prefix}-ssr-${Date.now()}`;
        }
    }

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

    // Generate unique ID - SSR safe (call directly, not in $state)
    const textareaId = generateId("textarea");

    // Size classes using full class names
    const sizeClass = $derived(() => {
        return size === "sm"
            ? "px-3 py-1.5 text-sm"
            : size === "lg"
              ? "px-5 py-3 text-base"
              : "px-4 py-2 text-sm"; // default md
    });

    // Variant classes using semantic colors
    const variantClass = $derived(() => {
        return variant === "success"
            ? "border-success focus:border-success focus:ring-success"
            : variant === "warning"
              ? "border-warning focus:border-warning focus:ring-warning"
              : variant === "error"
                ? "border-error focus:border-error focus:ring-error"
                : "border-border focus:border-focus focus:ring-focus"; // default
    });

    // Textarea classes using Badge pattern
    const textareaClasses = $derived(() => {
        const baseClasses =
            "w-full border rounded-md transition-colors duration-200 placeholder:text-input-placeholder focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled resize-y";

        return `${baseClasses} ${sizeClass()} ${variantClass()}`.trim();
    });

    // Label classes using semantic text colors
    const labelClasses = $derived(
        () => "block text-sm font-medium text-label mb-1",
    );

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
        <label for={textareaId} class={labelClasses()}>{label}</label>
    {/if}

    <textarea
        id={textareaId}
        {name}
        {value}
        {placeholder}
        {disabled}
        {rows}
        class={textareaClasses()}
        oninput={handleInput}
        {...restProps}
    ></textarea>
</div>
