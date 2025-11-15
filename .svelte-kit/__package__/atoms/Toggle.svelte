<script lang="ts">
    // SSR-safe ID generation
    function generateId(prefix: string = "id"): string {
        if (typeof window !== "undefined") {
            return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
        } else {
            return `${prefix}-ssr-${Date.now()}`;
        }
    }

    // Props using Svelte 5 runes
    interface Props {
        checked?: boolean;
        disabled?: boolean;
        label?: string;
        onclick?: (event: MouseEvent) => void;
        onchange?: (event: { checked: boolean }) => void;
    }

    let {
        checked = false,
        disabled = false,
        label = "",
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

    // Toggle button classes matching M3 design
    const toggleButtonClasses = $derived(() =>
        [
            "relative inline-flex w-10 h-6 flex-shrink-0 cursor-pointer rounded-full border-0 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
            checked ? "bg-brand-600" : "bg-stone-300",
            disabled && "opacity-50 cursor-not-allowed",
        ]
            .filter(Boolean)
            .join(" "),
    );

    // Toggle thumb classes matching M3 design
    const toggleThumbClasses = $derived(() => {
        const baseClasses =
            "pointer-events-none absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ease-in-out";
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
            class="text-sm font-medium text-label cursor-pointer"
        >
            {label}
        </label>
    {/if}
</div>
