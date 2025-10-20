<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        value?: string;
        label?: string;
        disabled?: boolean;
        onclick?: (event: Event) => void;
    }

    let {
        value = "",
        label = "",
        disabled = false,
        onclick,
        ...restProps
    }: Props = $props();

    const colors = [
        { label: "Red", value: "#ef4444" },
        { label: "Blue", value: "#3b82f6" },
        { label: "Green", value: "#10b981" },
        { label: "Yellow", value: "#f59e0b" },
        { label: "Purple", value: "#8b5cf6" },
        { label: "Pink", value: "#ec4899" },
        { label: "Gray", value: "#6b7280" },
        { label: "Black", value: "#000000" },
    ];

    // Generate unique ID - SSR safe
    let groupId = $state(`color-picker-ssr-${Date.now()}`);
    let mounted = $state(false);

    onMount(() => {
        mounted = true;
        // Update ID to be more unique on client side
        groupId = `color-picker-${Math.random().toString(36).substr(2, 9)}`;
    });
</script>

<div class="space-y-2">
    {#if label}
        <label for={groupId} class="block text-sm font-medium text-gray-700"
            >{label}</label
        >
    {/if}

    <div
        id={groupId}
        class="grid grid-cols-4 gap-2"
        role="radiogroup"
        {...restProps}
    >
        {#each colors as color}
            <button
                type="button"
                class="w-12 h-12 rounded-lg border-2 transition-all {value ===
                color.value
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'}"
                style="background-color: {color.value};"
                onclick={(e) => {
                    value = color.value;
                    if (onclick) onclick(e);
                }}
                {disabled}
                role="radio"
                aria-checked={value === color.value}
                aria-label={color.label}
                {...restProps}
            >
                {#if value === color.value}
                    <span class="text-white text-lg">✓</span>
                {/if}
            </button>
        {/each}
    </div>
</div>
