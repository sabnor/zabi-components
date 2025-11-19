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
        onchange,
        ...restProps
    }: Props = $props();

    // Generate unique ID - SSR safe (call directly, not in $state)
    const checkboxId = generateId("checkbox");

    // Checkbox container classes matching M3 design
    const checkboxContainerClasses = $derived(() => {
        const baseClasses =
            "relative inline-flex items-center justify-center w-5 h-5 rounded transition-all duration-200";

        if (disabled) {
            return `${baseClasses} opacity-50 cursor-not-allowed`;
        }
        return `${baseClasses} cursor-pointer`;
    });

    // Checkbox border and background classes matching M3 design
    const checkboxBoxClasses = $derived(() => {
        if (checked) {
            return disabled
                ? "border-0 opacity-50 bg-brand-500"
                : "border-0 bg-brand-500";
        }
        return disabled
            ? "border-2 border-base-400 bg-transparent"
            : "border-2 border-base-400 bg-transparent";
    });

    function handleChange(event: Event) {
        if (disabled) return;
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        if (onchange) {
            onchange(event);
        }
    }
</script>

<div class="flex items-center gap-2">
    <label
        for={checkboxId}
        class="flex items-center gap-2 cursor-pointer {disabled
            ? 'opacity-50 cursor-not-allowed'
            : ''}"
    >
        <div class={checkboxContainerClasses()}>
            <input
                type="checkbox"
                id={checkboxId}
                {name}
                {checked}
                {disabled}
                class="sr-only"
                onchange={handleChange}
                {...restProps}
            />
            <div class="absolute inset-0 {checkboxBoxClasses()} rounded"></div>
            {#if checked}
                <svg
                    class="absolute w-3 h-3 text-base-50 pointer-events-none z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            {/if}
        </div>
        {#if label}
            <span class="text-sm font-medium text-label">
                {label}
            </span>
        {/if}
    </label>
</div>
