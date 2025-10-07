<script lang="ts">
    export let value: "left" | "center" | "right" = "center";
    export let label: string = "Text Alignment";

    const alignmentOptions = [
        { value: "left" as const, label: "Left", icon: "⬅" },
        { value: "center" as const, label: "Center", icon: "↔" },
        { value: "right" as const, label: "Right", icon: "➡" },
    ];

    const groupId = `text-alignment-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="space-y-2">
    <label for={groupId} class="block text-sm font-medium text-gray-700"
        >{label}</label
    >

    <div
        id={groupId}
        class="flex gap-1 p-1 bg-gray-100 rounded-lg"
        role="radiogroup"
    >
        {#each alignmentOptions as option}
            <button
                type="button"
                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors {value ===
                option.value
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'}"
                on:click={() => (value = option.value)}
                role="radio"
                aria-checked={value === option.value}
                aria-label={option.label}
            >
                <span class="text-lg">{option.icon}</span>
                <span class="text-sm">{option.label}</span>
            </button>
        {/each}
    </div>
</div>
