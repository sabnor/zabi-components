<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { Check, TriangleAlert, X, Info, Zap } from "@lucide/svelte";
    import type {
        ExtendedSemanticVariant,
        SizeVariant,
    } from "../types/variants.js";

    /**
     * `subtle` is the default because a page full of saturated fills is noise —
     * a badge is a label, not a button. `solid` is there for the one badge on
     * a screen that has to shout.
     */
    type BadgeEmphasis = "subtle" | "solid";

    type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class"> & {
        variant?: ExtendedSemanticVariant;
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

    const sizeClass = $derived.by(() => {
        if (size === "sm") return { box: "h-5 px-2 gap-1 text-xs", icon: 12 };
        if (size === "lg") return { box: "h-7 px-3 gap-1.5 text-sm", icon: 16 };
        return { box: "h-6 px-2.5 gap-1.5 text-xs", icon: 14 };
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
            case "neutral":
            case "default":
            default:
                return solid
                    ? "bg-neutral text-card border-transparent"
                    : "bg-neutral-subtle text-neutral-text border-neutral-border";
        }
    });

    const badgeClasses = $derived(
        `inline-flex items-center justify-center whitespace-nowrap rounded-pill border font-medium ${sizeClass.box} ${variantClass} ${className}`.trim(),
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
