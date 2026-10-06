<script lang="ts">
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        value?: number;
        max?: number;
        size?: "sm" | "md" | "lg";
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

    let sizeClasses = $derived({
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
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
            <span class="text-sm text-caption">{Math.round(percentage)}%</span>
        </div>
    {/if}

    <div
        id={progressId}
        class="w-full border border-input-border bg-progress-track rounded-full overflow-hidden {sizeClasses[size]}"
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
</div>
