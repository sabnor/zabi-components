<script lang="ts">
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        /** Omit to auto-generate; pass to pair with an external `<label for>`. */
        id?: string;
        /** When set, a hidden input submits `value` with native forms while checked. */
        name?: string;
        value?: string;
        checked?: boolean;
        disabled?: boolean;
        loading?: boolean;
        label?: string;
        onclick?: (event: MouseEvent) => void;
        onchange?: (event: { checked: boolean }) => void;
    }

    let {
        class: className = "",
        id: idProp,
        name = "",
        value = "on",
        checked = $bindable(false),
        disabled = false,
        loading = false,
        label = "",
        onclick,
        onchange,
        ...restProps
    }: Props = $props();

    const fallbackId = generateId("toggle");
    const toggleId = $derived(idProp ?? fallbackId);
    const isDisabled = $derived(disabled || loading);

    function handleClick(event: MouseEvent) {
        if (isDisabled) return;
        checked = !checked;

        if (onclick) onclick(event);
        if (onchange) onchange({ checked });
    }

    const toggleButtonClasses = $derived(() => {
        const base =
            "focus-ring relative inline-flex w-10 h-6 flex-shrink-0 rounded-full border-0 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:outline-none";
        const colorClass = checked
            ? "bg-action-primary hover:bg-action-primary-hover active:bg-action-primary-active"
            : "bg-control-track hover:bg-control-track-hover active:bg-control-track-active";
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
</script>

<div class="flex items-center gap-3 {className}">
    <button
        type="button"
        role="switch"
        id={toggleId}
        aria-checked={checked}
        aria-label={label ? undefined : "Toggle"}
        aria-busy={loading ? "true" : undefined}
        disabled={isDisabled}
        onclick={handleClick}
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

    {#if name && checked}
        <input type="hidden" {name} {value} />
    {/if}

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
