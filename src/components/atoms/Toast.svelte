<script lang="ts">
    import { cn } from "../util/cn.js";
    import { TOUCH_HIT_AREA } from "../util/touch-target.js";

    interface Props {
        message?: string;
        type?: 'success' | 'error' | 'warning' | 'info';
        closable?: boolean;
        onclick?: (event: Event) => void;
        class?: string;
        /** `viewport`: fixed corner; `inline`: block in flow (e.g. demos). */
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
        success: 'border-success bg-surface-overlay text-success',
        error: 'border-error bg-surface-overlay text-error',
        warning: 'border-warning bg-surface-overlay text-warning',
        info: 'border-border bg-surface-overlay text-body',
    };

    // `min(18rem, 100%)`: 18rem is wider than a 320px screen once the text is enlarged.
    const cardClasses =
        'box-border w-full min-w-[min(18rem,100%)] max-w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-control border p-4 shadow-lg';

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
            <!-- `px-1` on a touch screen: the 44px layer is centred on the
            button, and around a button as narrow as the glyph it reached a
            pixel past what the card clips. -->
            <button
                type="button"
                class="focus-ring pointer-coarse:relative shrink-0 cursor-pointer rounded-control text-description hover:text-headline active:text-headline focus:outline-none pointer-coarse:px-1 {TOUCH_HIT_AREA}"
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
            class="pointer-events-none fixed top-[calc(max(var(--app-shell-top-inset,0px),env(safe-area-inset-top,0px))_+_1rem)] right-[calc(env(safe-area-inset-right,0px)_+_1rem)] left-[calc(env(safe-area-inset-left,0px)_+_1rem)] z-toast flex justify-end sm:left-auto"
        >
            <div
                class={cn("pointer-events-auto", cardClasses, typeClasses[type], className)}
                role="alert"
                {...restProps}
            >
                {@render toastBody()}
            </div>
        </div>
    {:else}
        <div
            class={cn("relative z-toast mx-auto", cardClasses, typeClasses[type], className)}
            role="alert"
            {...restProps}
        >
            {@render toastBody()}
        </div>
    {/if}
{/if}
