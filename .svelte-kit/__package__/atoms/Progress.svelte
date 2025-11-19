<script lang="ts">
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

    // Generate unique ID - SSR safe
    let progressId = $state(
        typeof window !== "undefined"
            ? `progress-${Math.random().toString(36).substr(2, 9)}`
            : `progress-ssr-${Date.now()}`,
    );

    // Calculate percentage
    let percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));

    // Simple size classes
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
        class="w-full bg-base-200 rounded-full overflow-hidden {sizeClasses[
            size
        ]}"
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
