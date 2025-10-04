<script lang="ts">
    import { Eye, EyeOff, X } from "@lucide/svelte";

    export let showPasswordToggle: boolean = false;
    export let showClearButton: boolean = false;
    export let hasValue: boolean = false;
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let showPassword: boolean = false;
    export let onTogglePassword: () => void = () => {};
    export let onClear: () => void = () => {};

    // Button classes for actions
    const buttonClasses = [
        "absolute",
        "right-3",
        "top-1/2",
        "-translate-y-1/2",
        "text-text-tertiary",
        "hover:text-primary",
        "transition-colors",
        "duration-200",
        "focus:outline-none",
        "focus:text-primary",
        "focus:ring-2",
        "focus:ring-focus-ring",
        "focus:ring-offset-1",
        "rounded-sm",
        "p-1",
    ].join(" ");

    function handleKeydown(event: KeyboardEvent, action: () => void) {
        if (event.key === "Enter") {
            action();
        }
    }
</script>

<div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
    {#if showClearButton && hasValue && !disabled && !readonly}
        <button
            type="button"
            class={buttonClasses}
            on:click|preventDefault={onClear}
            on:keydown={(e) =>
                handleKeydown(e as unknown as KeyboardEvent, onClear)}
            aria-label="Clear input"
        >
            <X size={16} />
        </button>
    {/if}

    {#if showPasswordToggle}
        <button
            type="button"
            class={buttonClasses}
            on:click|preventDefault={onTogglePassword}
            on:keydown={(e) =>
                handleKeydown(e as unknown as KeyboardEvent, onTogglePassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
        >
            {#if showPassword}
                <EyeOff size={16} />
            {:else}
                <Eye size={16} />
            {/if}
        </button>
    {/if}
</div>

