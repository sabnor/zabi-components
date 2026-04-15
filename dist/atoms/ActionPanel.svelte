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
        badgeText,
        badgeVariant = "neutral",
        ariaLabel,
        className = "",
        target,
        rel,
        ...restProps
    }: Props = $props();

    const computedAriaLabel = $derived(
        ariaLabel ?? (href ? `Open ${title}` : title),
    );

    const baseClasses =
        "group rounded-2xl border border-base-200 bg-base-0 p-6 transition-colors hover:border-headline/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-headline/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

    const panelClasses = $derived(
        [baseClasses, className].filter(Boolean).join(" ").trim(),
    );

    function handleKeydown(event: KeyboardEvent) {
        if (!href && onclick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onclick(event as unknown as MouseEvent);
        }
    }
</script>

{#if href}
    <a
        class={panelClasses}
        href={href}
        aria-label={computedAriaLabel}
        target={target}
        rel={rel}
        {...restProps}
    >
        <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
                <h3
                    class="truncate text-lg font-semibold text-headline transition-colors group-hover:text-headline/90"
                >
                    {title}
                </h3>
                <p class="mt-3 line-clamp-2 text-description">{description}</p>
            </div>
            {#if badgeText}
                <Badge variant={badgeVariant} text={badgeText} />
            {/if}
        </div>
    </a>
{:else}
    <button
        type="button"
        class={panelClasses}
        aria-label={computedAriaLabel}
        onclick={onclick}
        onkeydown={handleKeydown}
        {...restProps}
    >
        <div class="flex items-start justify-between gap-4 text-left">
            <div class="min-w-0">
                <h3
                    class="truncate text-lg font-semibold text-headline transition-colors group-hover:text-headline/90"
                >
                    {title}
                </h3>
                <p class="mt-3 line-clamp-2 text-description">{description}</p>
            </div>
            {#if badgeText}
                <Badge variant={badgeVariant} text={badgeText} />
            {/if}
        </div>
    </button>
{/if}

