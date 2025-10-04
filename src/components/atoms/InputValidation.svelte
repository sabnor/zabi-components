<script lang="ts">
    import { AlertCircle, CheckCircle } from "@lucide/svelte";

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
            ? "text-error"
            : hasSuccess
              ? "text-success"
              : "text-text-secondary",
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
                <CheckCircle size={14} class="flex-shrink-0" />
                <span>{success}</span>
            </div>
        {:else if helpText}
            <span>{helpText}</span>
        {/if}
    </div>
{/if}

