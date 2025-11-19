<script lang="ts">
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
        placeholder?: string;
        onchange?: (event: Event) => void;
    }

    let {
        value = "",
        label = "",
        disabled = false,
        placeholder = "#000000",
        onchange,
        ...restProps
    }: Props = $props();

    const inputId = generateId("color-picker");

    function isValidHex(hex: string): boolean {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexPattern.test(hex);
    }

    function handleHexInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const hexValue = target.value;

        if (hexValue === "" || isValidHex(hexValue)) {
            value = hexValue;
            if (onchange) onchange(event);
        }
    }

    function handleHexBlur(event: Event) {
        const target = event.target as HTMLInputElement;
        let hexValue = target.value.trim();

        if (hexValue && !hexValue.startsWith("#")) {
            hexValue = "#" + hexValue;
        }

        if (hexValue === "" || isValidHex(hexValue)) {
            value = hexValue;
            target.value = hexValue;
        } else {
            target.value = value;
        }
    }

    const inputClasses = $derived(() => {
        const baseClasses =
            "w-full px-3 py-2 bg-input hover:bg-input-hover focus:bg-input-focus disabled:bg-input-disabled rounded-lg text-sm text-body placeholder:text-description transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";
        const stateClasses =
            isValidHex(value) || value === ""
                ? "border-base-300 focus:border-brand-500 focus:ring-brand-500"
                : "border-red-300 focus:border-red-500 focus:ring-red-500";

        return `${baseClasses} ${stateClasses}`.trim();
    });
</script>

<div class="space-y-2" {...restProps}>
    {#if label}
        <label for={inputId} class="block text-sm font-medium text-label">
            {label}
        </label>
    {/if}

    <div class="flex items-center space-x-2">
        <input
            id={inputId}
            type="text"
            {placeholder}
            {value}
            oninput={handleHexInput}
            onblur={handleHexBlur}
            {disabled}
            class={inputClasses()}
            aria-label="Hex color input"
        />
        {#if value && isValidHex(value)}
            <div
                class="w-8 h-8 rounded border-2 border-base-300 shrink-0"
                style="background-color: {value};"
                aria-label="Color preview"
            ></div>
        {/if}
    </div>

    {#if value && !isValidHex(value)}
        <p class="text-xs text-red-500">
            Please enter a valid hex color (e.g., #ff0000 or #f00)
        </p>
    {/if}
</div>
