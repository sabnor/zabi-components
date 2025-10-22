<script lang="ts">
    // SSR-safe ID generation
    function generateId(prefix: string = "id"): string {
        if (typeof window !== "undefined") {
            return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
        } else {
            return `${prefix}-ssr-${Date.now()}`;
        }
    }

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

    // Generate unique ID - SSR safe (call directly, not in onMount)
    const groupId = generateId("color-picker");

    // Color button classes using full class names
    const colorButtonClasses = $derived(() => {
        return (colorValue: string) => {
            const baseClasses = "w-12 h-12 rounded-lg border-2 transition-all";
            const stateClasses =
                value === colorValue
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-300 hover:border-gray-400";

            return `${baseClasses} ${stateClasses}`.trim();
        };
    });
</script>

<div class="space-y-2">
    {#if label}
        <label for={groupId} class="block text-sm font-medium text-label"
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
                class={colorButtonClasses()(color.value)}
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
