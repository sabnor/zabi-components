<script lang="ts">
    import { onMount } from "svelte";
    // SSR-safe ID generation
    function generateId(prefix: string = "id"): string {
        if (typeof window !== "undefined") {
            return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
        } else {
            return `${prefix}-ssr-${Date.now()}`;
        }
    }

    interface Props {
        checked?: boolean;
        name?: string;
        disabled?: boolean;
        label?: string;
        onchange?: (event: Event) => void;
    }

    let {
        checked = false,
        name = "",
        disabled = false,
        label = "",
        ...restProps
    }: Props = $props();

    // Generate unique ID - SSR safe (call directly, not in $state)
    const checkboxId = generateId("checkbox");

    // Checkbox classes using Badge pattern
    const checkboxClasses = $derived(
        () =>
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed",
    );

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        checked = target.checked;
    }
</script>

<div class="flex items-center gap-2">
    <input
        type="checkbox"
        id={checkboxId}
        {name}
        {checked}
        {disabled}
        class={checkboxClasses()}
        onchange={handleChange}
        {...restProps}
    />
    {#if label}
        <label for={checkboxId} class="text-sm font-medium cursor-pointer"
            >{label}</label
        >
    {/if}
</div>
