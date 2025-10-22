<script lang="ts">
    interface Props {
        isOpen?: boolean;
        title?: string;
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
    }

    let {
        isOpen = false,
        title = "",
        onclick,
        onkeydown,
        children,
        footer,
        ...restProps
    }: Props & { children?: any; footer?: any } = $props();

    function closeModal(event?: Event) {
        isOpen = false;
        if (onclick && event) {
            onclick(event);
        }
    }

    function handleBackdropClick(event: Event) {
        if (event.target === event.currentTarget) {
            closeModal(event);
        }
    }

    function handleKeydown(event: Event) {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === "Escape") {
            closeModal(event);
        }
        if (onkeydown) {
            onkeydown(event);
        }
    }
</script>

{#if isOpen}
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
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
                    onclick={closeModal}
                    class="text-gray-400 hover:text-gray-600 text-2xl"
                    aria-label="Close"
                >
                    ×
                </button>
            </div>

            <!-- Content -->
            <div class="p-6">
                {@render children?.()}
            </div>

            <!-- Footer -->
            {#if footer}
                <div
                    class="flex justify-end gap-3 p-6 border-t border-gray-200"
                >
                    {@render footer?.()}
                </div>
            {/if}
        </div>
    </div>
{/if}
