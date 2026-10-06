<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Check from "@lucide/svelte/icons/check";
    import TriangleAlert from "@lucide/svelte/icons/triangle-alert";
    import X from "@lucide/svelte/icons/x";
    import Info from "@lucide/svelte/icons/info";
    import Zap from "@lucide/svelte/icons/zap";
    import { cn } from "../util/cn.js";
    import type {
        BadgeVariant,
        SizeVariant,
    } from "../types/variants.js";

    /**
     * `subtle` is the default because a page full of saturated fills is noise —
     * a badge is a label, not a button. `solid` is there for the one badge on
     * a screen that has to shout.
     */
    type BadgeEmphasis = "subtle" | "solid";

    type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class"> & {
        variant?: BadgeVariant;
        size?: SizeVariant;
        emphasis?: BadgeEmphasis;
        /** Label text. Ignored when `children` is provided. */
        text?: string;
        showIcon?: boolean;
        class?: string;
        children?: Snippet;
    };

    let {
        variant = "default",
        size = "md",
        emphasis = "subtle",
        text = "",
        showIcon = false,
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    /**
     * 20, 24 and 28px tall for a label on one line, as a minimum: a label that
     * does not fit wraps and the badge grows. It used to be a fixed height
     * with `whitespace-nowrap`, and a long label beside a flexible name made
     * the page wider than a phone at 200% text.
     *
     * The vertical padding is what is left of the height after one line of
     * text and the 1px border on each side (16 + 2 + 2, 16 + 6 + 2 and
     * 20 + 6 + 2), so a one-line badge is exactly as tall as it was.
     *
     * The corner is half of that one-line height, not the pill radius: for
     * one line that is the same full round end, and a badge of two lines
     * keeps the same corner and becomes a rounded rectangle, where a pill
     * radius would have turned it into a lozenge with its text in the curve.
     */
    const sizeClass = $derived.by(() => {
        if (size === "sm") return { box: "min-h-5 py-px px-2 gap-1 text-xs rounded-[0.625rem]", icon: 12 };
        if (size === "lg") return { box: "min-h-7 py-[3px] px-3 gap-2 text-sm rounded-[0.875rem]", icon: 16 };
        return { box: "min-h-6 py-[3px] px-2 gap-1 text-xs rounded-[0.75rem]", icon: 14 };
    });

    /**
     * Both emphases are built from the SAME step of each family's ramp, so
     * every variant reads at the same weight. Subtle is 100/200/800 (8.2:1),
     * solid is 600 with its `-text` foreground (4.9:1). Before the ramps were
     * calibrated, a solid warning badge sat at 2.15:1 and energetic at 1.97:1.
     */
    const variantClass = $derived.by(() => {
        const solid = emphasis === "solid";
        switch (variant) {
            case "success":
                return solid
                    ? "bg-success text-card border-transparent"
                    : "bg-success-subtle text-success-text border-success-border";
            case "warning":
                return solid
                    ? "bg-warning text-card border-transparent"
                    : "bg-warning-subtle text-warning-text border-warning-border";
            case "error":
                return solid
                    ? "bg-error text-card border-transparent"
                    : "bg-error-subtle text-error-text border-error-border";
            case "info":
                return solid
                    ? "bg-info text-card border-transparent"
                    : "bg-info-subtle text-info-text border-info-border";
            case "energetic":
                return solid
                    ? "bg-energetic text-card border-transparent"
                    : "bg-energetic-subtle text-energetic-text border-energetic-border";
            // The app's second brand colour. Its solid label is the "on accent"
            // role, not the card surface: an app with a light accent (a
            // yellow) sets a dark label there, and white would be unreadable.
            case "accent":
                return solid
                    ? "bg-accent text-on-accent border-transparent"
                    : "bg-accent-subtle text-accent-text border-accent-border";
            case "neutral":
            case "default":
            default:
                return solid
                    ? "bg-neutral text-card border-transparent"
                    : "bg-neutral-subtle text-neutral-text border-neutral-border";
        }
    });

    const badgeClasses = $derived(
        // Never wider than what it is in, and its words break onto the next
        // line before they push anything out; a word longer than the line
        // breaks inside. The icon stays centred beside the lines.
        cn(`inline-flex [max-inline-size:100%] min-w-0 items-center justify-center border font-medium [overflow-wrap:anywhere] ${sizeClass.box} ${variantClass} ${className}`),
    );

    /** One outline icon family, so the variants don't look like a rummage. */
    const Icon = $derived.by(() => {
        switch (variant) {
            case "success":
                return Check;
            case "warning":
                return TriangleAlert;
            case "error":
                return X;
            case "energetic":
                return Zap;
            default:
                return Info;
        }
    });

    const hasLabel = $derived(Boolean(children) || Boolean(text));
</script>

{#if hasLabel}
    <span class={badgeClasses} {...restProps}>
        {#if showIcon}
            {@const BadgeIcon = Icon}
            <BadgeIcon size={sizeClass.icon} class="shrink-0" aria-hidden="true" />
        {/if}
        {#if children}
            {@render children()}
        {:else}
            {text}
        {/if}
    </span>
{/if}
