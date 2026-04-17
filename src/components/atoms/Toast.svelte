<script lang="ts">
    interface Props {
        message?: string;
        type?: 'success' | 'error' | 'warning' | 'info';
        closable?: boolean;
        onclick?: (event: Event) => void;
        class?: string;
        /**
         * `viewport` — fixed corner toast for transient feedback.
         * `inline` — block-level; `w-full` up to max width (use inside a sized parent for demos).
         */
        layout?: 'viewport' | 'inline';
    }

    let {
        message = '',
        type = 'info',
        closable = true,
        onclick,
        class: className = '',
        layout = 'viewport',
        ...restProps
    }: Props = $props();

    let isVisible = $state(true);

    const typeClasses: Record<NonNullable<Props['type']>, string> = {
        success: 'border-success bg-card text-success',
        error: 'border-error bg-card text-error',
        warning: 'border-warning bg-card text-warning',
        info: 'border-border bg-card text-body',
    };

    /** Readable floor (18rem / 288px); max width caps corner + inline toasts */
    const cardClasses =
        'box-border w-full min-w-[18rem] max-w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-lg border p-4 shadow-lg';

    function closeToast(event: Event) {
        isVisible = false;
        onclick?.(event);
    }
</script>

{#snippet toastBody()}
    <div class="flex min-w-0 items-start gap-3">
        <div class="min-w-0 max-w-full flex-1 basis-0">
            <p class="text-sm break-words [overflow-wrap:anywhere]">{message}</p>
        </div>

        {#if closable}
            <button
                type="button"
                class="focus-ring shrink-0 cursor-pointer rounded-md text-description hover:text-headline focus:outline-none"
                onclick={closeToast}
                aria-label="Close notification"
            >
                ×
            </button>
        {/if}
    </div>
{/snippet}

{#if isVisible}
    {#if layout === 'viewport'}
        <div
            class="pointer-events-none fixed top-4 right-4 left-4 z-toast flex justify-end sm:left-auto"
        >
            <div
                class="pointer-events-auto {cardClasses} {typeClasses[type]} {className}"
                role="alert"
                {...restProps}
            >
                {@render toastBody()}
            </div>
        </div>
    {:else}
        <div
            class="relative z-toast mx-auto {cardClasses} {typeClasses[type]} {className}"
            role="alert"
            {...restProps}
        >
            {@render toastBody()}
        </div>
    {/if}
{/if}
