<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let variant: "default" | "success" | "warning" | "error" | "info" =
        "default";
    export let size: "sm" | "md" | "lg" = "md";
    export let closable: boolean = false;

    const dispatch = createEventDispatcher<{
        close: { event: MouseEvent };
    }>();

    function handleClose(event: MouseEvent) {
        event.stopPropagation();
        dispatch("close", { event });
    }

    // Simple size classes
    $: sizeClasses = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
    };

    // Simple variant classes
    $: variantClasses = {
        default: "bg-gray-100 text-gray-800 border-gray-300",
        success: "bg-green-100 text-green-800 border-green-300",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
        error: "bg-red-100 text-red-800 border-red-300",
        info: "bg-blue-100 text-blue-800 border-blue-300",
    };

    // Badge classes
    $: badgeClasses = [
        "inline-flex items-center gap-1 font-medium border rounded-md",
        sizeClasses[size],
        variantClasses[variant],
        closable ? "cursor-pointer hover:opacity-80" : "",
    ].join(" ");
</script>

{#if closable}
    <button type="button" class={badgeClasses} on:click={handleClose}>
        <slot />
        <span class="ml-1 text-xs">×</span>
    </button>
{:else}
    <span class={badgeClasses}>
        <slot />
    </span>
{/if}
