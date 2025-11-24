<script lang="ts">
    import Input from "./Input.svelte";

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

    function isValidHex(hex: string): boolean {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexPattern.test(hex);
    }

    const variant = $derived(() => {
        if (value && !isValidHex(value)) {
            return "error";
        }
        return "default";
    });

    const message = $derived(() => {
        if (value && !isValidHex(value)) {
            return "Please enter a valid hex color (e.g., #ff0000 or #f00)";
        }
        return "";
    });

    function handleInput(event: Event) {
        if (onchange) onchange(event);
    }

    function handleBlur(event: Event) {
        const target = event.target as HTMLInputElement;
        let hexValue = target.value.trim();

        if (hexValue && !hexValue.startsWith("#")) {
            hexValue = "#" + hexValue;
        }

        if (hexValue === "" || isValidHex(hexValue)) {
            value = hexValue;
            if (onchange) onchange(event);
        }
    }
</script>

<div {...restProps}>
    <div class="flex items-start gap-2">
        <div class="flex-1">
            <Input
                bind:value
                {label}
                {placeholder}
                {disabled}
                variant={variant()}
                message={message()}
                oninput={handleInput}
                onblur={handleBlur}
                aria-label="Hex color input"
            />
        </div>
        {#if value && isValidHex(value)}
            <div
                class="w-8 h-8 rounded border-2 border-base-300 shrink-0 mt-6"
                style="background-color: {value};"
                aria-label="Color preview"
            ></div>
        {/if}
    </div>
</div>
