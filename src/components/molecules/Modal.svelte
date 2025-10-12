<script lang="ts">
    export let isOpen = false;
    export let title = "";

    function closeModal() {
        isOpen = false;
    }

    function handleBackdropClick(event: Event) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    function handleKeydown(event: Event) {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === "Escape") {
            closeModal();
        }
    }
</script>

{#if isOpen}
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        on:click={handleBackdropClick}
        on:keydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <div
            class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
            <!-- Header -->
            <div
                class="flex items-center justify-between p-6 border-b border-gray-200"
            >
                <h2 class="text-xl font-semibold text-gray-900">{title}</h2>
                <button
                    type="button"
                    on:click={closeModal}
                    class="text-gray-400 hover:text-gray-600 text-2xl"
                    aria-label="Close"
                >
                    ×
                </button>
            </div>

            <!-- Content -->
            <div class="p-6">
                <slot />
            </div>

            <!-- Footer -->
            {#if $$slots.footer}
                <div
                    class="flex justify-end gap-3 p-6 border-t border-gray-200"
                >
                    <slot name="footer" />
                </div>
            {/if}
        </div>
    </div>
{/if}
