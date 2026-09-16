<script lang="ts">
    import { Check, TriangleAlert, X, Info, Zap } from "@lucide/svelte";
    import type { ExtendedSemanticVariant } from "../types/variants.js";
    type AlertVisualVariant = Exclude<ExtendedSemanticVariant, "default">;

    interface Props {
        variant?: ExtendedSemanticVariant;
        title?: string;
        message?: string;
        closable?: boolean;
        /** Visible state; `closable` dismiss sets it to `false`. Supports `bind:open`. */
        open?: boolean;
        /** Shrink to content instead of filling the container. */
        inline?: boolean;
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
        open = $bindable(true),
        inline = false,
        class: classProp = "",
        className = "",
        onclick,
        children,
        ...restProps
    }: Props & { children?: any } = $props();

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
    });

    let alertRole = $derived(
        variant === "success" || variant === "info" ? "status" : "alert",
    );
</script>

{#snippet icon()}
    {#if visualVariant === "info"}
        <Info size={20} aria-hidden="true" />
    {:else if visualVariant === "success"}
        <Check size={20} aria-hidden="true" />
    {:else if visualVariant === "warning"}
        <TriangleAlert size={20} aria-hidden="true" />
    {:else if visualVariant === "error"}
        <X size={20} aria-hidden="true" />
    {:else if visualVariant === "neutral"}
        <Info size={20} aria-hidden="true" />
    {:else}
        <Zap size={20} aria-hidden="true" />
    {/if}
{/snippet}

{#if open}
<div
    class="relative rounded-container p-4 border {inline ? 'inline-block' : 'block w-full'} {alertClasses[
        visualVariant
    ]} transition-colors duration-150 motion-reduce:transition-none {classProp} {className}"
    role={alertRole}
    aria-atomic="true"
    {...restProps}
>
    {#if closable}
        <button
            onclick={handleDismiss}
            class="absolute right-2 top-2 z-10 flex size-6 cursor-pointer items-center justify-center rounded-control text-description transition-colors duration-150 hover:bg-surface-hover hover:text-body motion-reduce:transition-none focus-ring--muted"
            aria-label="Dismiss alert"
            type="button"
        >
            <X size={16} aria-hidden="true" />
        </button>
    {/if}

    <div class="flex items-start gap-3 {closable ? 'pr-8' : ''}">
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
