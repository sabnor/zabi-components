<script lang="ts">
    import { isDevBuild } from "../util/app-shell.js";
    import {
        PROGRESS_STRINGS,
        canSegment,
        filledSegments,
        type ProgressStrings,
    } from "../util/progress.js";
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { generateId } from "../util/ssr-safe.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        value?: number;
        max?: number;
        /** Height of the bar: 4, 8, 12 and 16px. */
        size?: "sm" | "md" | "lg" | "xl";
        /**
         * Draws `max` separate segments, `value` of them filled, for a count
         * such as 4 of 19. `max` must be a whole number from 2 to 24; any
         * other `max` draws the continuous bar.
         */
        segmented?: boolean;
        /** Overrides for the built-in strings. */
        strings?: Partial<ProgressStrings>;
        label?: string;
        /** Names the progressbar when there is no visible `label`. Reaches the element with role="progressbar". */
        "aria-label"?: string;
        /** Points the progressbar at another element's id for its name. Reaches the element with role="progressbar". */
        "aria-labelledby"?: string;
    }

    let {
        class: className = "",
        value = 0,
        max = 100,
        size = "md",
        segmented = false,
        strings,
        label = "",
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        ...restProps
    }: Props = $props();

    const progressId = generateId("progress");
    const labelId = `${progressId}-label`;

    // A max that is not a positive, finite number would give an empty or full
    // bar with aria-valuemax=0: fall back to the default.
    let safeMax = $derived(Number.isFinite(max) && max > 0 ? max : 100);
    let safeValue = $derived(
        Number.isFinite(value) ? Math.min(Math.max(value, 0), safeMax) : 0,
    );
    let percentage = $derived((safeValue / safeMax) * 100);
    let labelledby = $derived(
        ariaLabelledby ?? (ariaLabel || !label ? undefined : labelId),
    );

    const sizeClasses = {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
    };

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("progress");
    const text = $derived(mergeStrings(PROGRESS_STRINGS, provided(), strings));

    /** Segmented only where `max` can be drawn as segments; otherwise the continuous bar. */
    let asSegments = $derived(segmented && canSegment(max));
    let filled = $derived(filledSegments(value, safeMax));
    let valueText = $derived(asSegments ? text.valueText(filled, safeMax) : undefined);

    $effect(() => {
        if (!isDevBuild() || !segmented || canSegment(max)) return;
        console.warn(
            "[zabi-components] Progress: `segmented` needs a whole-number `max` from 2 to 24; drawing the continuous bar instead.",
        );
    });
</script>

<div class={className} {...restProps}>
    {#if label}
        <div class="flex justify-between items-center mb-2">
            <!-- A span named through aria-labelledby, not a label: `for` only
            names form controls, so it left the progressbar without a name. -->
            <span id={labelId} class="text-sm font-medium text-label"
                >{label}</span
            >
            <span class="text-sm text-caption">{asSegments ? valueText : `${Math.round(percentage)}%`}</span>
        </div>
    {/if}

    {#if asSegments}
        <div
            id={progressId}
            class="flex w-full {safeMax > 12 ? 'gap-[2px]' : 'gap-1'} {sizeClasses[size]}"
            role="progressbar"
            aria-label={ariaLabel}
            aria-labelledby={labelledby}
            aria-valuenow={filled}
            aria-valuemin="0"
            aria-valuemax={safeMax}
            aria-valuetext={valueText}
        >
            {#each { length: safeMax } as _, index (index)}
                <!-- Presentational: the count is said once, by the progressbar. -->
                <span
                    class="h-full flex-1 min-w-0 rounded-full {index < filled
                        ? 'bg-progress-fill forced-colors:bg-[Highlight]'
                        : 'bg-progress-track border border-progress-track-border forced-colors:border-[CanvasText]'}"
                    aria-hidden="true"
                ></span>
            {/each}
        </div>
    {:else}
        <div
            id={progressId}
            class="w-full border border-progress-track-border bg-progress-track rounded-full overflow-hidden {sizeClasses[size]}"
            role="progressbar"
            aria-label={ariaLabel}
            aria-labelledby={labelledby}
            aria-valuenow={safeValue}
            aria-valuemin="0"
            aria-valuemax={safeMax}
        >
            <div
                class="h-full bg-progress-fill rounded-full"
                style="width: {percentage}%"
            ></div>
        </div>
    {/if}
</div>
