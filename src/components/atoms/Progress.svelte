<script lang="ts">
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        value?: number;
        max?: number;
        size?: "sm" | "md" | "lg";
        label?: string;
    }

    let {
        value = 0,
        max = 100,
        size = "md",
        label = "",
        ...restProps
    }: Props = $props();

    const progressId = generateId("progress");

    let percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));

    let sizeClasses = $derived({
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
    });
</script>

<div>
    {#if label}
        <div class="flex justify-between items-center mb-2">
            <label for={progressId} class="text-sm font-medium text-label"
                >{label}</label
            >
            <span class="text-sm text-caption">{Math.round(percentage)}%</span>
        </div>
    {/if}

    <div
        id={progressId}
        class="w-full border border-input-border bg-input rounded-full overflow-hidden {sizeClasses[size]}"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
        {...restProps}
    >
        <div
            class="h-full bg-brand-600 rounded-full"
            style="width: {percentage}%"
        ></div>
    </div>
</div>
