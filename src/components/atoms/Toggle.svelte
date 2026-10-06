<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import { TOUCH_HIT_AREA } from "../util/touch-target.js";

    /** Other attributes (`data-*`, `aria-*`, ...) land on the switch, which is a `<button>`. */
    type Props = Omit<
        HTMLButtonAttributes,
        "class" | "id" | "name" | "value" | "disabled" | "type" | "role" | "onclick" | "onchange" | "children"
    > & {
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
        /**
         * The switch's accessible name when there is no visible `label`. With
         * neither this, `aria-labelledby` nor `label`, it is called "Toggle".
         */
        "aria-label"?: string;
        /** The id of an element of the page that names the switch. */
        "aria-labelledby"?: string;
        onclick?: (event: MouseEvent) => void;
        onchange?: (event: { checked: boolean }) => void;
    };

    let {
        class: className = "",
        id: idProp,
        name = "",
        value = "on",
        checked = $bindable<Exclude<Props["checked"], undefined>>(),
        disabled = false,
        loading = false,
        label = "",
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        onclick,
        onchange,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (checked === undefined) checked = false;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

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
            `focus-ring relative inline-flex w-10 h-6 flex-shrink-0 rounded-full border-0 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:outline-none ${TOUCH_HIT_AREA}`;
        // A disabled switch has no hover or pressed fill: `:active` still matches a disabled button.
        const colorClass = checked
            ? "bg-action-primary hover:bg-action-primary-hover active:bg-action-primary-active"
            : isDisabled
              ? "bg-control-track"
              : "bg-control-track hover:bg-control-track-hover active:bg-control-track-active";
        const stateClass = isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer";
        return `${base} ${colorClass} ${stateClass}`;
    });

    const toggleThumbClasses = $derived(() => {
        const base =
            "pointer-events-none absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-sm transition-transform duration-200 ease-in-out flex items-center justify-center";
        const positionClasses = checked ? "translate-x-4" : "translate-x-0";
        return `${base} ${positionClasses}`;
    });
</script>

<!-- On a coarse pointer the row is 44px tall, so the switch's hit area (44px, around a
     24px switch) has room of its own: stacked 8px apart, the layer of one switch lay
     over the visible edge of the one above it and took its taps. -->
<div class={cn("flex items-center gap-3 pointer-coarse:min-h-11", className)}>
    <button
        type="button"
        role="switch"
        id={toggleId}
        aria-checked={checked}
        aria-label={ariaLabel ?? (label || ariaLabelledby ? undefined : "Toggle")}
        aria-labelledby={ariaLabelledby}
        aria-busy={loading ? "true" : undefined}
        disabled={isDisabled}
        onclick={handleClick}
        class={toggleButtonClasses()}
        {...restProps}
    >
        <span class={toggleThumbClasses()}>
            {#if loading}
                <span
                    class="inline-block size-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent text-brand-500 motion-reduce:animate-pulse"
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
