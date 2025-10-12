<script lang="ts">
    import { onMount } from "svelte";

    export let message: string = "";
    export let type: "success" | "error" | "warning" | "info" = "info";
    export let closable: boolean = true;

    let isVisible = true;

    // Simple type classes
    const typeClasses = {
        success: "bg-green-100 border-green-300 text-green-800",
        error: "bg-red-100 border-red-300 text-red-800",
        warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
        info: "bg-blue-100 border-blue-300 text-blue-800",
    };

    function closeToast() {
        isVisible = false;
    }
</script>

{#if isVisible}
    <div
        class="fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 z-50"
        role="alert"
        {...$$restProps}
    >
        <div class="flex items-start">
            <div class="flex-1">
                <p class="text-sm {typeClasses[type]}">{message}</p>
            </div>

            {#if closable}
                <button
                    type="button"
                    class="ml-3 text-gray-400 hover:text-gray-600"
                    on:click={closeToast}
                    aria-label="Close notification"
                >
                    ×
                </button>
            {/if}
        </div>
    </div>
{/if}
