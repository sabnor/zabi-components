<script lang="ts">
    export let isOpen: boolean = false;
    export let title: string = "";

    function closeSlideUp() {
        isOpen = false;
    }

    function handleBackdropClick(event: Event) {
        if (event.target === event.currentTarget) {
            closeSlideUp();
        }
    }

    function handleKeydown(event: Event) {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === "Escape") {
            closeSlideUp();
        }
    }
</script>

{#if isOpen}
    <!-- Backdrop -->
    <div
        class="fixed inset-0 bg-black/50 z-50"
        on:click={handleBackdropClick}
        on:keydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    ></div>

    <!-- SlideUp Content -->
    <div
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-xl shadow-xl z-50 max-h-[80vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
    >
        <!-- Header -->
        {#if title}
            <div
                class="flex items-center justify-between p-4 border-b border-gray-200"
            >
                <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
                <button
                    type="button"
                    class="text-gray-400 hover:text-gray-600 text-2xl"
                    on:click={closeSlideUp}
                    aria-label="Close"
                >
                    ×
                </button>
            </div>
        {/if}

        <!-- Content -->
        <div class="p-4">
            <slot />
        </div>
    </div>
{/if}
