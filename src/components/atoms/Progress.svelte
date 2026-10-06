<script lang="ts">
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        value?: number;
        max?: number;
        size?: "sm" | "md" | "lg";
        label?: string;
    }

    let {
        class: className = "",
        value = 0,
        max = 100,
        size = "md",
        label = "",
        ...restProps
    }: Props = $props();

    const progressId = generateId("progress");
    const labelId = `${progressId}-label`;

    let percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));

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
        aria-labelledby={label ? labelId : undefined}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
        {...restProps}
    >
        <div
            class="h-full bg-progress-fill rounded-full"
            style="width: {percentage}%"
        ></div>
    </div>
</div>
