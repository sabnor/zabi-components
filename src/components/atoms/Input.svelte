<script lang="ts">
    import { generateId } from "../../routes/lib/ssr-safe";

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

    // Generate unique ID - SSR safe (call directly, not in $state)
    const inputId = generateId("input");

    // Size classes using full class names
    const sizeClass = $derived(() => {
        return size === "sm"
            ? "px-3 py-1.5 text-sm"
            : size === "lg"
              ? "px-5 py-3 text-base"
              : "px-4 py-2 text-sm"; // default md
    });

    // Variant classes using full class names
    const variantClass = $derived(() => {
        return variant === "success"
            ? "border-green-300 focus:border-green-500 focus:ring-green-500"
            : variant === "warning"
              ? "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
              : variant === "error"
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"; // default
    });

    // Input classes using Badge pattern
    const inputClasses = $derived(() => {
        const baseClasses =
            "w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled";

        return `${baseClasses} ${sizeClass()} ${variantClass()}`.trim();
    });

    // Label classes using semantic text colors
    const labelClasses = $derived(
        () => "block text-sm font-medium text-primary mb-1",
    );

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
        <label for={inputId} class={labelClasses()}>{label}</label>
    {/if}
    <input
        id={inputId}
        {type}
        {name}
        {value}
        {placeholder}
        {disabled}
        class={inputClasses()}
        oninput={handleInput}
        {...restProps}
    />
</div>
