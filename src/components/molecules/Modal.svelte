<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { ModalEvents } from "../../types/events";

    export let isOpen = false;
    export let title = "";
    export let showCloseButton = true;

    const dispatch = createEventDispatcher<ModalEvents>();

    let modalElement: HTMLDivElement;
    let previousActiveElement: HTMLElement | null = null;

    function closeDialog() {
        isOpen = false;
        dispatch("close");
    }

    function handleBackdropClick(event: CustomEvent) {
        if (event.target === event.currentTarget) {
            closeDialog();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            closeDialog();
        }
    }

    // Focus trap implementation
    function trapFocus(event: KeyboardEvent) {
        if (!isOpen) return;

        const focusableElements = modalElement?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) as NodeListOf<HTMLElement>;

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key === "Tab") {
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }

    // Focus management
    onMount(() => {
        return () => {
            if (previousActiveElement) {
                previousActiveElement.focus();
            }
        };
    });

    $: if (isOpen) {
        previousActiveElement = document.activeElement as HTMLElement;
        // Focus the modal after it's rendered
        setTimeout(() => {
            const firstFocusable = modalElement?.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            ) as HTMLElement;
            firstFocusable?.focus();
        }, 0);
    }
</script>

{#if isOpen}
    <!-- Backdrop -->
    <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-modal-backdrop flex items-center justify-center p-4"
        on:click={handleBackdropClick}
        on:keydown={(e: KeyboardEvent) => handleKeydown(e)}
        role="presentation"
        tabindex="-1"
    >
        <!-- Dialog -->
        <div
            bind:this={modalElement}
            class="bg-surface-elevated rounded-xl shadow-adaptive-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-primary focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            on:keydown={(e: KeyboardEvent) => trapFocus(e)}
            tabindex="-1"
        >
            <!-- Header -->
            <div
                class="flex items-center justify-between p-6 border-b border-primary"
            >
                <h2
                    id="dialog-title"
                    class="text-xl font-semibold text-primary"
                >
                    {title}
                </h2>
                {#if showCloseButton}
                    <button
                        type="button"
                        on:click={closeDialog}
                        class="text-tertiary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 transition-colors"
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
            <div class="p-6 text-primary">
                <slot />
            </div>

            <!-- Footer (optional) -->
            {#if $$slots.footer}
                <div
                    class="flex items-center justify-end gap-3 p-6 border-t border-primary bg-surface-secondary"
                >
                    <slot name="footer" />
                </div>
            {/if}
        </div>
    </div>
{/if}
