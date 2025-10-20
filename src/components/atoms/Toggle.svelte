<script lang="ts">
    import { generateId } from "../../routes/lib/ssr-safe";

    // Props using Svelte 5 runes
    interface Props {
        checked?: boolean;
        disabled?: boolean;
        label?: string;
        className?: string;
        onclick?: (event: MouseEvent) => void;
        onchange?: (event: { checked: boolean }) => void;
    }

    let {
        checked = false,
        disabled = false,
        label = "",
        className = "",
        onclick,
        onchange,
        ...restProps
    }: Props = $props();

    // SSR-safe ID generation (call directly, not in onMount)
    const toggleId = generateId("toggle");

    // Handle click
    function handleClick(event: MouseEvent) {
        if (disabled) return;
        checked = !checked;

        // Call parent handlers if provided
        if (onclick) onclick(event);
        if (onchange) onchange({ checked });
    }

    // Toggle button classes using full class names
    const toggleButtonClasses = $derived(() => {
        const baseClasses =
            "relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
        const stateClasses = checked ? "bg-blue-600" : "bg-gray-200";
        const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

        return `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`.trim();
    });

    // Toggle thumb classes using full class names
    const toggleThumbClasses = $derived(() => {
        const baseClasses =
            "pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out";
        const positionClasses = checked ? "translate-x-5" : "translate-x-0";

        return `${baseClasses} ${positionClasses}`.trim();
    });

    // Handle keyboard
    function handleKeydown(event: KeyboardEvent) {
        if (disabled) return;
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            handleClick(event as any);
        }
    }
</script>

<div class="flex items-center gap-3">
    <button
        type="button"
        role="switch"
        id={toggleId}
        aria-checked={checked}
        aria-label={label || "Toggle"}
        {disabled}
        onclick={handleClick}
        onkeydown={handleKeydown}
        class={toggleButtonClasses()}
    >
        <span class={toggleThumbClasses()}></span>
    </button>

    {#if label}
        <label
            for={toggleId}
            class="text-sm font-medium text-gray-700 cursor-pointer"
        >
            {label}
        </label>
    {/if}
</div>
