<script lang="ts">
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

    const sizeClasses = $derived(
        {
            sm: "w-full md:w-[24rem]",
            md: "w-full md:w-[28rem]",
            lg: "w-full md:w-[42rem]",
        }[size] || "w-full md:w-[28rem]",
    );

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
        class="fixed inset-0 bg-background/50 dark:bg-background/80 flex items-end md:items-center justify-center p-0 md:p-4 z-50"
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <div
            class="bg-surface-elevated rounded-t-2xl md:rounded-lg shadow-xl min-w-[320px] {sizeClasses} max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out] md:animate-none"
        >
            <!-- Header -->
            <div
                class="flex items-center justify-between p-6 border-b border-(--color-border)"
            >
                <h2 class="text-xl font-semibold text-headline">{title}</h2>
                <button
                    type="button"
                    onclick={closeModal}
                    class="text-description hover:text-headline text-2xl cursor-pointer transition-colors"
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
                    class="flex justify-end gap-3 p-6 border-t border-(--color-border)"
                >
                    {@render footer?.()}
                </div>
            {/if}
        </div>
    </div>
{/if}
