<script lang="ts">
    import {
        trapFocus,
        saveFocus,
        returnFocus,
        focusFirstElement,
    } from '../util/focus-utils.js';
    import { generateId } from "../util/ssr-safe.js";
    import Card from '../atoms/Card.svelte';
    import CardHeader from '../atoms/CardHeader.svelte';
    import CardContent from '../atoms/CardContent.svelte';
    import CardFooter from '../atoms/CardFooter.svelte';

    type Size = 'sm' | 'md' | 'lg';

    interface Props {
        isOpen?: boolean;
        title?: string;
        description?: string;
        size?: Size;
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
        /** On the `role="dialog"` root (testing, analytics). */
        "data-testid"?: string;
    }

    let {
        isOpen = $bindable(false),
        title = '',
        description = '',
        size = 'md',
        onclick,
        onkeydown,
        "data-testid": dataTestId = undefined,
        children,
        footer,
        ...restProps
    }: Props & { children?: any; footer?: any } = $props();

    const modalTitleId = generateId('modal-title');
    const modalDescriptionId = generateId('modal-description');

    let modalContainer = $state<HTMLDivElement>();
    let cleanupFocusTrap: (() => void) | null = null;

    const sizeClasses = $derived(
        {
            sm: 'w-full md:w-[24rem]',
            md: 'w-full md:w-[28rem]',
            lg: 'w-full md:w-[42rem]',
        }[size] || 'w-full md:w-[28rem]',
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

    $effect(() => {
        const container = modalContainer;
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
            closeModal(event);
        }
    }

    function handleKeydown(event: Event) {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === 'Escape') {
            closeModal(event);
        }
        onkeydown?.(event);
    }
</script>

{#if isOpen}
    <div
        class="fixed inset-0 z-modal flex cursor-pointer items-end justify-center bg-overlay p-0 md:items-center md:p-4"
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? modalTitleId : undefined}
        aria-describedby={description ? modalDescriptionId : undefined}
        tabindex="-1"
        data-testid={dataTestId}
        {...restProps}
    >
        <div
            bind:this={modalContainer}
            class="flex max-h-[90vh] min-w-[320px] cursor-default flex-col overflow-y-auto rounded-t-3xl bg-card p-0 shadow-xl animate-[slideUp_0.3s_ease-out] md:animate-none md:rounded-3xl {sizeClasses}"
        >
            <Card variant="default" fullWidth={false}>
                {#if title || description}
                    <CardHeader
                        {description}
                        descriptionId={description ? modalDescriptionId : undefined}
                        className="px-6 pt-6 pb-4"
                    >
                        {#if title}
                            <div class="flex items-center justify-between">
                                <h2
                                    id={modalTitleId}
                                    class="text-2xl font-normal leading-8 tracking-normal text-headline"
                                >
                                    {title}
                                </h2>
                                <button
                                    type="button"
                                    onclick={closeModal}
                                    class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-2xl text-description transition-colors hover:bg-base-100 hover:text-headline"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>
                        {/if}
                    </CardHeader>
                {/if}

                {#if children}
                    <CardContent className="flex-1">
                        {@render children?.()}
                    </CardContent>
                {/if}

                {#if footer}
                    <CardFooter className="flex justify-end gap-3 pt-4">
                        {@render footer?.()}
                    </CardFooter>
                {/if}
            </Card>
        </div>
    </div>
{/if}
