<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { SemanticVariant, SizeVariant } from "../types/variants.js";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";

    /** Other attributes (`data-*`, `aria-*`, `list`, ...) land on the `<input>`. */
    type Props = Omit<
        HTMLInputAttributes,
        "class" | "size" | "type" | "value" | "min" | "max" | "step" | "id"
    > & {
        /** Omit to auto-generate; pair with FormField `id` when used inside FormField. */
        id?: string;
        /** Current value; supports `bind:value`. Starts at `min` when not given. */
        value?: number;
        min?: number;
        max?: number;
        step?: number;
        name?: string;
        /** Extra classes for the host element. */
        class?: string;
        label?: string;
        /** True when FormField supplies the visible `<label>`. */
        hideLabel?: boolean;
        disabled?: boolean;
        /** Height of the row, on the scale Input and Button use. */
        size?: SizeVariant;
        /** Colours the message; `error` also marks the input invalid. */
        variant?: SemanticVariant;
        /** Helper or error text below the slider. */
        message?: string;
        /** Shows the current value beside the label. */
        showValue?: boolean;
        /**
         * Turns the value into text ("40 %", "2 h"). It is what `showValue`
         * shows, and what assistive technology reads instead of the bare
         * number.
         */
        formatValue?: (value: number) => string;
        /** Native `input` event: fires while the thumb moves. */
        oninput?: (event: Event) => void;
        /** Native `change` event: fires when the thumb is released. */
        onchange?: (event: Event) => void;
    };

    let {
        id: idProp,
        min = 0,
        max = 100,
        step = 1,
        value = $bindable(min),
        name = "",
        class: className = "",
        label = "",
        hideLabel = false,
        disabled = false,
        size = "md",
        variant = "default",
        message = "",
        showValue = false,
        formatValue,
        oninput,
        onchange,
        ...restProps
    }: Props = $props();

    const fallbackId = generateId("slider");
    const inputId = $derived(idProp ?? fallbackId);

    /**
     * Row heights on the shared control scale (32 / 40 / 48), so a slider
     * lines up with an Input or a Button of the same size beside it. The
     * `<input>` itself is 44px tall in the two smaller rows, pulled back in
     * with a negative margin: the whole input takes the pointer, so that is
     * the touch target, and the row does not grow for it.
     */
    const sizeClass = $derived.by(() => {
        if (size === "sm") return { box: "h-8 pointer-coarse:min-h-11", input: "h-11 -my-1.5" };
        if (size === "lg") return { box: "h-12", input: "h-12" };
        return { box: "h-10 pointer-coarse:min-h-11", input: "h-11 -my-0.5" };
    });

    /** Where the thumb sits, 0 to 1; drives the filled part of the track. */
    const ratio = $derived.by(() => {
        if (!(max > min)) return 0;
        return Math.max(0, Math.min(1, (value - min) / (max - min)));
    });

    const valueText = $derived(formatValue ? formatValue(value) : String(value));
    const labelVisible = $derived(!!label && !hideLabel);

    // The `-text` step clears 4.5:1 on a page surface, as in Input.
    const messageClasses = $derived.by(() => {
        const base = "text-sm mt-2";
        if (variant === "error") return `text-error-text ${base}`;
        if (variant === "success") return `text-success-text ${base}`;
        if (variant === "warning") return `text-warning-text ${base}`;
        return `text-description ${base}`;
    });
</script>

{#snippet valueOutput()}
    <output
        for={inputId}
        class={cn(
            "shrink-0 text-sm tabular-nums",
            disabled ? "text-action-disabled-text" : "text-description",
        )}
        data-slider-value
    >
        {valueText}
    </output>
{/snippet}

<div class={cn(className)}>
    {#if labelVisible}
        <div class="mb-2 flex items-baseline justify-between gap-3">
            <label for={inputId} class="block text-sm font-medium text-label">{label}</label>
            {#if showValue}
                {@render valueOutput()}
            {/if}
        </div>
    {/if}
    <div class={cn("flex items-center gap-3", sizeClass.box)}>
        <!-- A native range input: keyboard, touch, right-to-left and form
        submission come with it. Only its looks are replaced, below. -->
        <input
            type="range"
            id={inputId}
            class={cn("slider min-w-0 flex-1", sizeClass.input)}
            style:--zabi-slider-ratio={ratio}
            data-size={size}
            bind:value
            {min}
            {max}
            {step}
            name={name || undefined}
            {disabled}
            {oninput}
            {onchange}
            aria-valuetext={formatValue ? valueText : undefined}
            aria-invalid={variant === "error" ? "true" : undefined}
            aria-describedby={message ? `${inputId}-message` : undefined}
            {...restProps}
        />
        {#if showValue && !labelVisible}
            {@render valueOutput()}
        {/if}
    </div>
    {#if message}
        <p
            id={`${inputId}-message`}
            class={messageClasses}
            role={variant === "error" ? "alert" : undefined}
        >
            {message}
        </p>
    {/if}
</div>

<style>
    /*
     * The parts of a range input are vendor pseudo-elements, which utilities
     * cannot reach without an arbitrary variant per declaration. WebKit/Blink
     * and Gecko each get their own rules: one unknown pseudo-element in a
     * selector list drops the whole rule.
     */
    .slider {
        --zabi-slider-thumb: 1.25rem;
        --zabi-slider-track: 0.375rem;
        --zabi-slider-fill: var(--color-action-primary);
        --zabi-slider-rest: var(--color-control-track);
        --zabi-slider-halo: 0 0 0 0 transparent;
        /* The fill ends under the centre of the thumb, which travels less
           than the full width. */
        --zabi-slider-stop: calc(
            var(--zabi-slider-ratio, 0) * (100% - var(--zabi-slider-thumb)) +
                var(--zabi-slider-thumb) / 2
        );
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: pointer;
        outline: none;
        /* A touch that starts on the slider moves the thumb; vertical scrolling stays with the page. */
        touch-action: pan-y;
    }

    .slider[data-size="sm"] {
        --zabi-slider-thumb: 1rem;
        --zabi-slider-track: 0.25rem;
    }

    .slider[data-size="lg"] {
        --zabi-slider-thumb: 1.5rem;
        --zabi-slider-track: 0.5rem;
    }

    /* Only where a pointer can hover: after a tap, `:hover` stays on the slider until the next tap elsewhere. */
    @media (hover: hover) {
        .slider:hover {
            --zabi-slider-fill: var(--color-action-primary-hover);
            --zabi-slider-rest: var(--color-control-track-hover);
            --zabi-slider-halo: 0 0 0 4px var(--color-surface-hover);
        }
    }

    .slider:active {
        --zabi-slider-fill: var(--color-action-primary-active);
        --zabi-slider-rest: var(--color-control-track-active);
        --zabi-slider-halo: 0 0 0 6px var(--color-surface-active);
    }

    /* Same geometry as `.focus-ring`: a 2px gap, then a 2px ring, on the thumb. */
    .slider:focus-visible {
        --zabi-slider-halo:
            0 0 0 2px var(--color-focus-ring-offset), 0 0 0 4px var(--color-focus-ring);
    }

    .slider:disabled {
        --zabi-slider-fill: var(--color-action-disabled-text);
        --zabi-slider-rest: var(--color-action-disabled);
        --zabi-slider-halo: 0 0 0 0 transparent;
        cursor: not-allowed;
    }

    /* WebKit and Blink: one track, painted in two parts. */
    .slider::-webkit-slider-runnable-track {
        height: var(--zabi-slider-track);
        border-radius: 9999px;
        background: linear-gradient(
            to right,
            var(--zabi-slider-fill) 0 var(--zabi-slider-stop),
            var(--zabi-slider-rest) var(--zabi-slider-stop) 100%
        );
    }

    .slider:dir(rtl)::-webkit-slider-runnable-track {
        background: linear-gradient(
            to left,
            var(--zabi-slider-fill) 0 var(--zabi-slider-stop),
            var(--zabi-slider-rest) var(--zabi-slider-stop) 100%
        );
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        box-sizing: border-box;
        width: var(--zabi-slider-thumb);
        height: var(--zabi-slider-thumb);
        margin-top: calc((var(--zabi-slider-track) - var(--zabi-slider-thumb)) / 2);
        border: 2px solid var(--zabi-slider-fill);
        border-radius: 9999px;
        background: var(--color-card);
        box-shadow: var(--zabi-slider-halo);
        transition: box-shadow 150ms;
    }

    /* Gecko: the filled part is its own pseudo-element and follows the direction. */
    .slider::-moz-range-track {
        height: var(--zabi-slider-track);
        border-radius: 9999px;
        background: var(--zabi-slider-rest);
    }

    .slider::-moz-range-progress {
        height: var(--zabi-slider-track);
        border-radius: 9999px;
        background: var(--zabi-slider-fill);
    }

    .slider::-moz-range-thumb {
        box-sizing: border-box;
        width: var(--zabi-slider-thumb);
        height: var(--zabi-slider-thumb);
        border: 2px solid var(--zabi-slider-fill);
        border-radius: 9999px;
        background: var(--color-card);
        box-shadow: var(--zabi-slider-halo);
        transition: box-shadow 150ms;
    }

    @media (prefers-reduced-motion: reduce) {
        .slider::-webkit-slider-thumb {
            transition: none;
        }

        .slider::-moz-range-thumb {
            transition: none;
        }
    }
</style>
