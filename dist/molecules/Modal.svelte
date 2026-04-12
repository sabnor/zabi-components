<script lang="ts">
    import { trapFocus, saveFocus, returnFocus, focusFirstElement } from "../routes/lib/focus-utils.js";
    import Card from "../atoms/Card.svelte";
    import CardHeader from "../atoms/CardHeader.svelte";
    import CardContent from "../atoms/CardContent.svelte";
    import CardFooter from "../atoms/CardFooter.svelte";

    type Size = "sm" | "md" | "lg";

    interface Props {
        isOpen?: boolean;
        title?: string;
        description?: string;
        size?: Size;
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
    }

    let {
        isOpen = false,
        title = "",
        description = "",
        size = "md",
        onclick,
        onkeydown,
        children,
        footer,
        ...restProps
    }: Props & { children?: any; footer?: any } = $props();

    let modalContainer = $state<HTMLDivElement>();
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
        const container = modalContainer;
        if (isOpen && container) {
            saveFocus();
            cleanupFocusTrap = trapFocus(container);
            // Small delay to ensure modal is rendered
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
        class="fixed inset-0 z-modal flex cursor-pointer items-end justify-center bg-overlay p-0 md:items-center md:p-4"
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabindex="-1"
    >
        <div
            bind:this={modalContainer}
            class="flex max-h-[90vh] min-w-[320px] cursor-default flex-col overflow-y-auto rounded-t-3xl bg-card p-0 shadow-xl animate-[slideUp_0.3s_ease-out] md:animate-none md:rounded-3xl {sizeClasses}"
        >
            <Card variant="default" fullWidth={false}>
                {#if title || description}
                    <CardHeader
                        {description}
                        className="px-6 pt-6 pb-4"
                    >
                        {#if title}
                            <div class="flex items-center justify-between">
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
