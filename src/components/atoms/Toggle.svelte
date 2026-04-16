<script lang="ts">
    import { generateId } from "../../routes/lib/ssr-safe.js";

    interface Props {
        checked?: boolean;
        disabled?: boolean;
        /** Shows a spinner on the thumb and disables interaction while true. */
        loading?: boolean;
        label?: string;
        onclick?: (event: MouseEvent) => void;
        onchange?: (event: { checked: boolean }) => void;
    }

    let {
        checked = $bindable(false),
        disabled = false,
        loading = false,
        label = "",
        onclick,
        onchange,
        ...restProps
    }: Props = $props();

    const toggleId = generateId("toggle");
    const isDisabled = $derived(disabled || loading);

    function handleClick(event: MouseEvent) {
        if (isDisabled) return;
        checked = !checked;

        if (onclick) onclick(event);
        if (onchange) onchange({ checked });
    }

    const toggleButtonClasses = $derived(() => {
        const base =
            "relative inline-flex w-10 h-6 flex-shrink-0 rounded-full border-0 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";
        const colorClass = checked
            ? "bg-action-primary hover:bg-action-primary-hover active:bg-action-primary-active"
            : "bg-base-400 hover:bg-base-500 active:bg-base-500";
        const stateClass = isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer";
        return `${base} ${colorClass} ${stateClass}`;
    });

    const toggleThumbClasses = $derived(() => {
        const base =
            "pointer-events-none absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform duration-200 ease-in-out flex items-center justify-center";
        const positionClasses = checked ? "translate-x-4" : "translate-x-0";
        return `${base} ${positionClasses}`;
    });

    function handleKeydown(event: KeyboardEvent) {
        if (isDisabled) return;
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            handleClick(event as unknown as MouseEvent);
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
        aria-busy={loading ? "true" : undefined}
        disabled={isDisabled}
        onclick={handleClick}
        onkeydown={handleKeydown}
        class={toggleButtonClasses()}
        {...restProps}
    >
        <span class={toggleThumbClasses()}>
            {#if loading}
                <span
                    class="inline-block size-3 shrink-0 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"
                    aria-hidden="true"
                ></span>
            {/if}
        </span>
    </button>

    {#if label}
        <label
            for={toggleId}
            class="text-sm font-medium text-label {isDisabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'}"
        >
            {label}
        </label>
    {/if}
</div>
