<script lang="ts">
    import Badge from "./Badge.svelte";
    import type { ExtendedSemanticVariant } from "../types/variants.js";

    interface Props {
        title: string;
        description: string;
        href?: string;
        onclick?: (event: MouseEvent) => void | Promise<void>;
        disabled?: boolean;
        loading?: boolean;
        badgeText?: string;
        badgeVariant?: ExtendedSemanticVariant;
        /** Overrides the default accessible name for the clickable region. */
        ariaLabel?: string;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        target?: HTMLAnchorElement["target"];
        rel?: string;
    }

    let {
        title,
        description,
        href,
        onclick,
        disabled = false,
        loading = false,
        badgeText,
        badgeVariant = "neutral",
        ariaLabel,
        class: classAttr = "",
        className: legacyClass = "",
        target,
        rel,
        ...restProps
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(`${classAttr} ${legacyClass}`.trim());

    const isDisabled = $derived(disabled || loading);

    const computedAriaLabel = $derived(
        ariaLabel ?? (href ? `Open ${title}` : title),
    );

    const baseClasses =
        "group focus-ring focus-ring--muted block rounded-container border border-border bg-card p-6 text-left transition-colors duration-150 hover:border-border-medium hover:bg-surface-hover active:scale-[0.99] active:bg-surface-active";

    const disabledClasses =
        "opacity-50 cursor-not-allowed pointer-events-none hover:border-border hover:bg-card active:scale-100";

    const panelClasses = $derived(
        [baseClasses, isDisabled ? disabledClasses : "", className]
            .filter(Boolean)
            .join(" ")
            .trim(),
    );

    function handleKeydown(event: KeyboardEvent) {
        if (isDisabled) return;
        if (!href && onclick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onclick(event as unknown as MouseEvent);
        }
    }
</script>

{#snippet body()}
    <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
            <h3
                class="truncate text-lg font-semibold text-headline transition-colors group-hover:text-headline/90"
            >
                {title}
            </h3>
            <p class="mt-3 line-clamp-2 text-description">{description}</p>
        </div>
        <div class="flex shrink-0 items-center gap-3">
            {#if badgeText}
                <Badge variant={badgeVariant} text={badgeText} />
            {/if}
            {#if loading}
                <span
                    class="inline-block size-5 shrink-0 animate-spin rounded-full border-2 border-description border-t-transparent opacity-70"
                    aria-hidden="true"
                ></span>
            {/if}
        </div>
    </div>
{/snippet}

{#if href}
    <a
        class={panelClasses}
        href={isDisabled ? undefined : href}
        aria-label={computedAriaLabel}
        aria-disabled={isDisabled ? "true" : undefined}
        aria-busy={loading ? "true" : undefined}
        tabindex={isDisabled ? -1 : undefined}
        target={target}
        rel={rel}
        {...restProps}
    >
        {@render body()}
    </a>
{:else}
    <button
        type="button"
        class={panelClasses}
        aria-label={computedAriaLabel}
        aria-busy={loading ? "true" : undefined}
        disabled={isDisabled}
        onclick={onclick}
        onkeydown={handleKeydown}
        {...restProps}
    >
        {@render body()}
    </button>
{/if}
