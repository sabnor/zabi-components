<script lang="ts">
    import Badge from "./Badge.svelte";
    import type { ExtendedSemanticVariant } from "../../types/variants.js";

    interface Props {
        /** Main title shown in the panel */
        title: string;
        /** Short supporting text shown under the title */
        description: string;
        /** When set, renders as an anchor */
        href?: string;
        /** Click handler (used when `href` is not set) */
        onclick?: (event: MouseEvent) => void | Promise<void>;
        /** Whether the panel is disabled and non-interactive */
        disabled?: boolean;
        /** Shows a trailing spinner and disables interaction while true */
        loading?: boolean;
        /** Optional badge shown on the right */
        badgeText?: string;
        /** Badge variant */
        badgeVariant?: ExtendedSemanticVariant;
        /** Accessible label override */
        ariaLabel?: string;
        /** Additional Tailwind classes */
        className?: string;
        /** Anchor target when `href` is set */
        target?: HTMLAnchorElement["target"];
        /** Anchor rel when `href` is set */
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
        className = "",
        target,
        rel,
        ...restProps
    }: Props = $props();

    const isDisabled = $derived(disabled || loading);

    const computedAriaLabel = $derived(
        ariaLabel ?? (href ? `Open ${title}` : title),
    );

    const baseClasses =
        "group focus-ring focus-ring--muted block rounded-2xl border border-base-200 bg-base-0 p-6 text-left transition-all duration-200 hover:border-headline/30 hover:bg-base-50 active:scale-[0.99] active:bg-base-100";

    const disabledClasses =
        "opacity-50 cursor-not-allowed pointer-events-none hover:border-base-200 hover:bg-base-0 active:scale-100";

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
