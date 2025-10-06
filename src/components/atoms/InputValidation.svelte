<script lang="ts">
    import { AlertCircle } from "@lucide/svelte";

    export let hasError: boolean = false;
    export let hasSuccess: boolean = false;
    export let error: string = "";
    export let success: string = "";
    export let helpText: string = "";
    export let inputId: string = "";

    // Helper text classes
    $: helperTextClasses = [
        "mt-2",
        "text-xs",
        hasError
            ? "text-red-600"
            : hasSuccess
              ? "text-green-600"
              : "text-gray-500",
    ].join(" ");
</script>

{#if hasError || hasSuccess || helpText}
    <div id="{inputId}-help" class={helperTextClasses}>
        {#if hasError}
            <div class="flex items-center gap-1">
                <AlertCircle size={14} class="flex-shrink-0" />
                <span>{error}</span>
            </div>
        {:else if hasSuccess}
            <div class="flex items-center gap-1">
                <span class="text-green-600">✓</span>
                <span>{success}</span>
            </div>
        {:else if helpText}
            <span>{helpText}</span>
        {/if}
    </div>
{/if}
