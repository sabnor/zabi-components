<script lang="ts">
    import { DEFAULT_TOAST_TEXTS, zabiStringsFor } from "../util/zabi-strings.js";
    import { cn } from "../util/cn.js";
    import { TOUCH_HIT_AREA } from "../util/touch-target.js";

    interface Props {
        message?: string;
        type?: 'success' | 'error' | 'warning' | 'info';
        closable?: boolean;
        /** Accessible name of the close button. */
        closeLabel?: string;
        onclick?: (event: Event) => void;
        class?: string;
        /** `viewport`: fixed corner; `inline`: block in flow (e.g. demos). */
        layout?: 'viewport' | 'inline';
    }

    let {
        message = '',
        type = 'info',
        closable = true,
        closeLabel: closeLabelGiven,
        onclick,
        class: className = '',
        layout = 'viewport',
        ...restProps
    }: Props = $props();

    /** Each text: the prop, else the app-wide word from a `ZabiStringsProvider` above this one, else English. */
    const provided = zabiStringsFor("toast");
    const closeLabel = $derived(closeLabelGiven ?? provided()?.closeLabel ?? DEFAULT_TOAST_TEXTS.closeLabel);

    let isVisible = $state(true);

    const typeClasses: Record<NonNullable<Props['type']>, string> = {
        success: 'border-success text-success-text',
        error: 'border-error text-error-text',
        warning: 'border-warning text-warning-text',
        // The material has its own rim: no second edge on the neutral toast.
        info: 'border-transparent text-body',
    };

    // `min(18rem, 100%)`: 18rem is wider than a 320px screen once the text is enlarged.
    const cardClasses =
        'box-border w-full min-w-[min(18rem,100%)] max-w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-control border p-4 material-thick';

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
                aria-label={closeLabel}
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
