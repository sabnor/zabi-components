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
        value?: string | number | undefined;
        options?: Array<{
            value: string | number;
            label: string;
            disabled?: boolean;
        }>;
        placeholder?: string;
        label?: string;
        disabled?: boolean;
        size?: "sm" | "md" | "lg";
        onchange?: (event: Event) => void;
    }

    let {
        value = undefined,
        options = [],
        placeholder = "Select an option",
        label = "",
        disabled = false,
        size = "md",
        ...restProps
    }: Props = $props();

    // Generate unique ID - SSR safe (call directly, not in $state)
    const selectId = generateId("select");

    // Size classes using full class names
    const sizeClass = $derived(() => {
        return size === "sm"
            ? "px-3 py-1.5 text-sm"
            : size === "lg"
              ? "px-5 py-3 text-base"
              : "px-4 py-2 text-sm"; // default md
    });

    // Select classes using Badge pattern
    const selectClasses = $derived(() => {
        const baseClasses =
            "w-full border border-border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-focus focus:border-focus disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled";

        return `${baseClasses} ${sizeClass()}`.trim();
    });

    // Label classes using semantic text colors
    const labelClasses = $derived(
        () => "block text-sm font-medium text-label mb-1",
    );

    function handleChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        value = target.value;
    }
</script>

<div>
    {#if label}
        <label for={selectId} class={labelClasses()}>{label}</label>
    {/if}

    <select
        id={selectId}
        {value}
        {disabled}
        class={selectClasses()}
        onchange={handleChange}
        {...restProps}
    >
        {#if placeholder && !value}
            <option value="" disabled>{placeholder}</option>
        {/if}
        {#each options as option (option.value)}
            <option value={option.value} disabled={option.disabled}>
                {option.label}
            </option>
        {/each}
    </select>
</div>
