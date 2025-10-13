<script lang="ts">
    interface Props {
        checked?: boolean;
        disabled?: boolean;
        label?: string;
        onchange?: (event: Event) => void;
    }

    let {
        checked = false,
        disabled = false,
        label = "",
        ...restProps
    }: Props = $props();

    // Generate unique ID - SSR safe
    let checkboxId = $state(
        typeof window !== "undefined"
            ? `checkbox-${Math.random().toString(36).substr(2, 9)}`
            : `checkbox-ssr-${Date.now()}`,
    );

    // Simple checkbox classes
    let checkboxClasses = $derived(
        [
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
            "focus:ring-blue-500 focus:ring-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
        ].join(" "),
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
        {checked}
        {disabled}
        class={checkboxClasses}
        onchange={handleChange}
        {...restProps}
    />
    {#if label}
        <label for={checkboxId} class="text-sm font-medium cursor-pointer"
            >{label}</label
        >
    {/if}
</div>
