<script lang="ts">
    import { DEFAULT_ALERT_TEXTS, zabiStringsFor } from "../util/zabi-strings.js";
    import Check from "@lucide/svelte/icons/check";
    import TriangleAlert from "@lucide/svelte/icons/triangle-alert";
    import X from "@lucide/svelte/icons/x";
    import Info from "@lucide/svelte/icons/info";
    import Zap from "@lucide/svelte/icons/zap";
    import type { ExtendedSemanticVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";
    import { TOUCH_HIT_AREA } from "../util/touch-target.js";
    /** The shared variants plus the theme's brand tint, which only an alert has. */
    type AlertVariant = ExtendedSemanticVariant | "brand";
    type AlertVisualVariant = Exclude<AlertVariant, "default">;

    interface Props {
        variant?: AlertVariant;
        title?: string;
        message?: string;
        closable?: boolean;
        /** Accessible name of the dismiss button a `closable` alert has. */
        closeLabel?: string;
        /** Visible state; `closable` dismiss sets it to `false`. Supports `bind:open`. */
        open?: boolean;
        /** Shrink to content instead of filling the container. */
        inline?: boolean;
        /**
         * Draws the tinted edge. `false` makes it transparent and keeps the
         * 1px, so the box is the same size either way. The width itself
         * follows `--zabi-alert-border-width`, which is read through a
         * fallback and declared nowhere: an app (or any ancestor) sets it to
         * `0px` once and every alert under it has no edge, with no prop on
         * each. Default `true`, the edge an alert always had.
         */
        bordered?: boolean;
        class?: string;
        /** @deprecated use `class` — kept so 7.x call sites keep working. */
        className?: string;
        onclick?: (event: Event) => void;
    }

    let {
        variant = "info",
        title = "",
        message = "",
        closable = false,
        closeLabel: closeLabelGiven,
        open = $bindable<Exclude<Props["open"], undefined>>(),
        inline = false,
        bordered = true,
        class: classProp = "",
        className = "",
        onclick,
        children,
        ...restProps
    }: Props & { children?: any } = $props();

    /** Each text: the prop, else the app-wide word from a `ZabiStringsProvider` above this one, else English. */
    const provided = zabiStringsFor("alert");
    const closeLabel = $derived(closeLabelGiven ?? provided()?.closeLabel ?? DEFAULT_ALERT_TEXTS.closeLabel);

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (open === undefined) open = true;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    function handleDismiss(event: MouseEvent) {
        open = false;
        if (onclick) {
            onclick(event);
        }
    }

    const visualVariant = $derived<AlertVisualVariant>(
        variant === "default" ? "info" : variant,
    );

    /**
     * A tinted fill plus a tinted edge, not a bare 1px outline on a
     * transparent ground — an outline-only alert on a light page barely
     * registers, and the pale warning and citron borders were close to
     * invisible. The icon carries the family colour at its `-text` step.
     */
    let alertClasses = $derived({
        info: "bg-info-subtle border-info-border text-info-text",
        success: "bg-success-subtle border-success-border text-success-text",
        warning: "bg-warning-subtle border-warning-border text-warning-text",
        error: "bg-error-subtle border-error-border text-error-text",
        neutral: "bg-neutral-subtle border-neutral-border text-neutral-text",
        energetic:
            "bg-energetic-subtle border-energetic-border text-energetic-text",
        // The primary brand tint. The accent is the link role, guarded on
        // this fill (as Badge's brand label is); read from the token, not
        // `text-link`, which darkens on hover and an alert is not a link.
        brand: "bg-action-primary-subtle border-action-primary-border text-(color:--color-link)",
    });

    let alertRole = $derived(
        variant === "success" || variant === "info" || variant === "brand"
            ? "status"
            : "alert",
    );
</script>

{#snippet icon()}
    {#if visualVariant === "info"}
        <Info size={20} strokeWidth={2.5} aria-hidden="true" />
    {:else if visualVariant === "success"}
        <Check size={20} strokeWidth={2.5} aria-hidden="true" />
    {:else if visualVariant === "warning"}
        <TriangleAlert size={20} strokeWidth={2.5} aria-hidden="true" />
    {:else if visualVariant === "error"}
        <X size={20} strokeWidth={2.5} aria-hidden="true" />
    {:else if visualVariant === "neutral" || visualVariant === "brand"}
        <Info size={20} strokeWidth={2.5} aria-hidden="true" />
    {:else}
        <Zap size={20} strokeWidth={2.5} aria-hidden="true" />
    {/if}
{/snippet}

{#if open}
<div
    class={cn(
        'relative rounded-container p-4 border-[length:var(--zabi-alert-border-width,1px)]',
        inline ? 'inline-block' : 'block w-full',
        alertClasses[visualVariant],
        !bordered && 'border-transparent',
        'transition-colors duration-150 motion-reduce:transition-none',
        classProp,
        className,
    )}
    role={alertRole}
    aria-atomic="true"
    {...restProps}
>
    {#if closable}
        <!-- At the end edge (`end-2`), so it is on the left in a right-to-left
        layout, and the text keeps clear of it on that side (`pe-8`).
        Nested corners: 0.5rem (`end-2 top-2`) and the 1px border inside
        the alert's corner, so the radius is the alert's less that gap. -->
        <button
            onclick={handleDismiss}
            class="absolute end-2 top-2 z-10 flex size-6 cursor-pointer items-center justify-center rounded-[calc(var(--radius-container)-0.5rem-1px)] text-description transition-colors duration-150 hover:bg-surface-hover hover:text-body active:bg-surface-active motion-reduce:transition-none focus-ring focus-ring--muted {TOUCH_HIT_AREA}"
            aria-label={closeLabel}
            type="button"
        >
            <X size={16} aria-hidden="true" />
        </button>
    {/if}

    <div class="flex items-start gap-3 {closable ? 'pe-8' : ''}">
        <div class="shrink-0 mt-0.5">
            {@render icon()}
        </div>

        <div class="flex-1 min-w-0">
            {#if title}
                <h4 class="font-semibold text-sm mb-1 text-headline">
                    {title}
                </h4>
            {/if}
            {#if message}
                <p class="text-sm leading-relaxed text-body">
                    {message}
                </p>
            {/if}
            {@render children?.()}
        </div>
    </div>
</div>
{/if}
