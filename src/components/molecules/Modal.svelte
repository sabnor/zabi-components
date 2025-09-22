<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let isOpen = false;
    export let title = "";
    export let showCloseButton = true;

    const dispatch = createEventDispatcher();

    function closeDialog() {
        isOpen = false;
        dispatch("close");
    }

    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            closeDialog();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            closeDialog();
        }
    }
</script>

{#if isOpen}
    <!-- Backdrop -->
    <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        on:click={handleBackdropClick}
        on:keydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabindex="-1"
    >
        <!-- Dialog -->
        <div
            class="bg-stone-900 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-stone-700"
            role="document"
        >
            <!-- Header -->
            <div
                class="flex items-center justify-between p-6 border-b border-stone-700"
            >
                <h2
                    id="dialog-title"
                    class="text-xl font-semibold text-stone-100"
                >
                    {title}
                </h2>
                {#if showCloseButton}
                    <button
                        type="button"
                        on:click={closeDialog}
                        class="text-stone-400 hover:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 transition-colors"
                        aria-label="Close dialog"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                {/if}
            </div>

            <!-- Content -->
            <div class="p-6 text-stone-300">
                <slot />
            </div>

            <!-- Footer (optional) -->
            {#if $$slots.footer}
                <div
                    class="flex items-center justify-end gap-3 p-6 border-t border-stone-700 bg-stone-800"
                >
                    <slot name="footer" />
                </div>
            {/if}
        </div>
    </div>
{/if}
