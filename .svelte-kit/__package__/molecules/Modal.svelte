<script lang="ts">
    import { onMount } from "svelte";
    import { trapFocus, saveFocus, returnFocus, focusFirstElement } from "../routes/lib/focus-utils.js";

    type Size = "sm" | "md" | "lg";

    interface Props {
        isOpen?: boolean;
        title?: string;
        size?: Size;
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
    }

    let {
        isOpen = false,
        title = "",
        size = "md",
        onclick,
        onkeydown,
        children,
        footer,
        ...restProps
    }: Props & { children?: any; footer?: any } = $props();

    let modalContainer: HTMLDivElement;
    let cleanupFocusTrap: (() => void) | null = null;

    const sizeClasses = $derived(
        {
            sm: "w-full md:w-[24rem]",
            md: "w-full md:w-[28rem]",
            lg: "w-full md:w-[42rem]",
        }[size] || "w-full md:w-[28rem]",
    );

    function closeModal(event?: Event) {
        isOpen = false;
        if (cleanupFocusTrap) {
            cleanupFocusTrap();
            cleanupFocusTrap = null;
        }
        returnFocus();
        if (onclick && event) {
            onclick(event);
        }
    }

    // Handle focus trap when modal opens
    $effect(() => {
        if (isOpen && modalContainer) {
            saveFocus();
            cleanupFocusTrap = trapFocus(modalContainer);
            // Small delay to ensure modal is rendered
            setTimeout(() => {
                focusFirstElement(modalContainer);
            }, 0);
        } else if (!isOpen && cleanupFocusTrap) {
            cleanupFocusTrap();
            cleanupFocusTrap = null;
        }
    });

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
        class="fixed inset-0 bg-overlay flex items-end md:items-center justify-center p-0 md:p-4 z-modal"
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabindex="-1"
    >
        <div
            bind:this={modalContainer}
            class="bg-card rounded-t-3xl md:rounded-3xl shadow-xl min-w-[320px] {sizeClasses} max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out] md:animate-none flex flex-col"
        >
            {#if title}
                <div class="flex items-center justify-between px-6 pt-6 pb-4">
                    <h2
                        id="modal-title"
                        class="text-2xl font-normal leading-8 text-headline tracking-normal"
                    >
                        {title}
                    </h2>
                    <button
                        type="button"
                        onclick={closeModal}
                        class="text-description hover:text-headline text-2xl cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-100"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
            {/if}

            <div class="px-6 pb-6 flex-1">
                {@render children?.()}
            </div>

            {#if footer}
                <div class="flex justify-end gap-3 px-6 pb-6 pt-4">
                    {@render footer?.()}
                </div>
            {/if}
        </div>
    </div>
{/if}
