<script lang="ts">
    import {
        focusFirstElement,
        returnFocus,
        saveFocus,
        trapFocus,
    } from "../../routes/lib/focus-utils.js";

    interface Props {
        isOpen?: boolean;
        title?: string;
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
    }

    let {
        isOpen = false,
        title = "",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

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
            (onclick as (event: Event) => void)(event);
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
        }
    });

    function handleBackdropClick(event: Event) {
        if (event.target === event.currentTarget) {
            closeSlideUp(event);
        }
    }

    function handleKeydown(event: Event) {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === "Escape") {
            closeSlideUp(event);
        }
        if (onkeydown) {
            (onkeydown as (event: Event) => void)(event);
        }
    }
</script>

{#if isOpen}
    <div
        class="fixed inset-0 bg-overlay z-modal"
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "slideup-title" : undefined}
        tabindex="-1"
    >
        <div
            bind:this={slideUpContainer}
            class="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-xl z-modal max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out] flex flex-col"
        >
            {#if title}
                <div class="flex items-center justify-between px-6 pt-6 pb-4">
                    <h2
                        id="slideup-title"
                        class="text-2xl font-normal leading-8 text-headline tracking-normal"
                    >
                        {title}
                    </h2>
                    <button
                        type="button"
                        onclick={closeSlideUp}
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
        </div>
    </div>
{/if}
