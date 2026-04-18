<script lang="ts">
    import {
        focusFirstElement,
        returnFocus,
        saveFocus,
        trapFocus,
    } from '../util/focus-utils.js';
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        isOpen?: boolean;
        title?: string;
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
    }

    let {
        isOpen = $bindable(false),
        title = '',
        onclick,
        onkeydown,
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

    const slideTitleId = generateId('slideup-title');

    let slideUpContainer = $state<HTMLDivElement>();
    let cleanupFocusTrap: (() => void) | null = null;

    function closeSlideUp(event?: Event) {
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

    $effect(() => {
        const container = slideUpContainer;
        if (isOpen && container) {
            saveFocus();
            cleanupFocusTrap = trapFocus(container);
            setTimeout(() => {
                focusFirstElement(container);
            }, 0);
        } else if (!isOpen && cleanupFocusTrap) {
            cleanupFocusTrap();
            cleanupFocusTrap = null;
            returnFocus();
        }
    });

    function handleBackdropClick(event: Event) {
        if (event.target === event.currentTarget) {
            closeSlideUp(event);
        }
    }

    function handleKeydown(event: Event) {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === 'Escape') {
            closeSlideUp(event);
        }
        onkeydown?.(event);
    }
</script>

{#if isOpen}
    <div
        class="fixed inset-0 z-modal cursor-pointer bg-overlay"
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? slideTitleId : undefined}
        tabindex="-1"
        {...restProps}
    >
        <div
            bind:this={slideUpContainer}
            class="fixed bottom-0 left-0 right-0 z-modal flex max-h-[90vh] cursor-default flex-col overflow-y-auto rounded-t-3xl bg-card shadow-xl animate-[slideUp_0.3s_ease-out]"
        >
            {#if title}
                <div class="flex items-center justify-between px-6 pb-4 pt-6">
                    <h2
                        id={slideTitleId}
                        class="text-2xl font-normal leading-8 tracking-normal text-headline"
                    >
                        {title}
                    </h2>
                    <button
                        type="button"
                        onclick={closeSlideUp}
                        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-2xl text-description transition-colors hover:bg-base-100 hover:text-headline"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
            {/if}

            <div class="flex-1 px-6 pb-6">
                {@render children?.()}
            </div>
        </div>
    </div>
{/if}
