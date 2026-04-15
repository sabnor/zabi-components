<script lang="ts">
    interface Props {
        message?: string;
        type?: 'success' | 'error' | 'warning' | 'info';
        closable?: boolean;
        onclick?: (event: Event) => void;
        class?: string;
    }

    let {
        message = '',
        type = 'info',
        closable = true,
        onclick,
        class: className = '',
        ...restProps
    }: Props = $props();

    let isVisible = $state(true);

    const typeClasses: Record<NonNullable<Props['type']>, string> = {
        success: 'border-success bg-card text-success',
        error: 'border-error bg-card text-error',
        warning: 'border-warning bg-card text-warning',
        info: 'border-border bg-card text-body',
    };

    function closeToast(event: Event) {
        isVisible = false;
        onclick?.(event);
    }
</script>

{#if isVisible}
    <div
        class="fixed top-4 right-4 z-toast min-w-0 w-[min(24rem,calc(100vw-2rem))] rounded-lg border p-4 shadow-lg {typeClasses[type]} {className}"
        role="alert"
        {...restProps}
    >
        <div class="flex items-start gap-3">
            <div class="min-w-0 flex-1">
                <p class="text-sm">{message}</p>
            </div>

            {#if closable}
                <button
                    type="button"
                    class="shrink-0 cursor-pointer rounded-md text-description hover:text-headline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    onclick={closeToast}
                    aria-label="Close notification"
                >
                    ×
                </button>
            {/if}
        </div>
    </div>
{/if}
