<script lang="ts">
    interface Props {
        checked?: boolean;
        disabled?: boolean;
        label?: string;
        onclick?: (event: Event) => void;
    }

    let {
        checked = false,
        disabled = false,
        label = "",
        onclick,
        ...restProps
    }: Props = $props();

    // Simple toggle classes
    let toggleClasses = $derived(
        [
            "relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
            "transition-colors duration-200 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            checked ? "bg-blue-600" : "bg-gray-200",
            disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" "),
    );

    let thumbClasses = $derived(
        [
            "pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg",
            "transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0",
        ].join(" "),
    );

    function handleClick(event: Event) {
        if (!disabled) {
            checked = !checked;
            // Call the parent's onclick handler if provided
            if (onclick) {
                onclick(event);
            }
        }
    }
</script>

<div class="flex items-center gap-3">
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || "Toggle"}
        {disabled}
        onclick={handleClick}
        class={toggleClasses}
        {...restProps}
    >
        <span class={thumbClasses}></span>
    </button>

    {#if label}
        <span class="text-sm font-medium text-gray-700">
            {label}
        </span>
    {/if}
</div>
