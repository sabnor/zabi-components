<script lang="ts">
    export let value: number = 0;
    export let max: number = 100;
    export let size: "sm" | "md" | "lg" = "md";
    export let label: string = "";

    // Generate unique ID
    const progressId = `progress-${Math.random().toString(36).substr(2, 9)}`;

    // Calculate percentage
    $: percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Simple size classes
    $: sizeClasses = {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
    };
</script>

<div>
    {#if label}
        <div class="flex justify-between items-center mb-2">
            <label for={progressId} class="text-sm font-medium text-gray-700"
                >{label}</label
            >
            <span class="text-sm text-gray-500">{Math.round(percentage)}%</span>
        </div>
    {/if}

    <div
        id={progressId}
        class="w-full bg-gray-200 rounded-full overflow-hidden {sizeClasses[
            size
        ]}"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
        {...$$restProps}
    >
        <div
            class="h-full bg-blue-600 rounded-full"
            style="width: {percentage}%"
        ></div>
    </div>
</div>
