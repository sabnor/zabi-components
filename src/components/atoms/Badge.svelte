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
        /**
         * Draws the family's edge on a subtle badge. Off by default: the fill
         * and the text already carry it, and a same-hue outline on every badge
         * is one more line per row. Solid badges never have one.
         */
        bordered?: boolean;
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
        bordered = false,
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
     * 20 + 6 + 2), so a one-line badge is exactly as tall as it was. The
     * border box stays when the border is not drawn (transparent), so
     * `bordered` does not move the badge by a pixel.
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
     *
     * A subtle badge has a transparent edge unless `bordered` is set, which
     * puts the family's `-border` step back (the 8.1 look). The class is
     * written out for each case so Tailwind can see it.
     *
     * The neutral subtle badge reads `--zabi-badge-neutral-fill` and
     * `--zabi-badge-neutral-text` (src/app.css) in front of the neutral
     * tokens: set on any ancestor or in the theme, they move this badge and
     * no other reader of `--color-neutral-subtle` or `--color-neutral-text`.
     *
     * Every variant's subtle badge also reads four per-instance custom
     * properties in front of its own tokens, so an app can give one badge its
     * own colours without a new variant: `--zabi-badge-fill`,
     * `--zabi-badge-text`, `--zabi-badge-border` (only where `bordered` draws
     * an edge; an unbordered badge stays transparent) and `--zabi-badge-icon`
     * (the built-in `showIcon` icon only; unset, it follows the text). Set them
     * from `style` or any ancestor. Unset, the colours are exactly the
     * variant's. Solid badges ignore all four. A neutral surface, for instance:
     *
     * ```svelte
     * <Badge variant="neutral" bordered style="--zabi-badge-fill: var(--color-surface-raised); --zabi-badge-border: var(--color-border-strong); --zabi-badge-text: var(--color-headline)" />
     * ```
     */
    const variantClass = $derived.by(() => {
        const solid = emphasis === "solid";
        const edge = (drawn: string) => (bordered ? drawn : "border-transparent");
        switch (variant) {
            case "success":
                return solid
                    ? "bg-success text-card border-transparent"
                    : `bg-[color:var(--zabi-badge-fill,var(--color-success-subtle))] text-[color:var(--zabi-badge-text,var(--color-success-text))] ${edge("border-[color:var(--zabi-badge-border,var(--color-success-border))]")}`;
            case "warning":
                return solid
                    ? "bg-warning text-card border-transparent"
                    : `bg-[color:var(--zabi-badge-fill,var(--color-warning-subtle))] text-[color:var(--zabi-badge-text,var(--color-warning-text))] ${edge("border-[color:var(--zabi-badge-border,var(--color-warning-border))]")}`;
            case "error":
                return solid
                    ? "bg-error text-card border-transparent"
                    : `bg-[color:var(--zabi-badge-fill,var(--color-error-subtle))] text-[color:var(--zabi-badge-text,var(--color-error-text))] ${edge("border-[color:var(--zabi-badge-border,var(--color-error-border))]")}`;
            case "info":
                return solid
                    ? "bg-info text-card border-transparent"
                    : `bg-[color:var(--zabi-badge-fill,var(--color-info-subtle))] text-[color:var(--zabi-badge-text,var(--color-info-text))] ${edge("border-[color:var(--zabi-badge-border,var(--color-info-border))]")}`;
            case "energetic":
                return solid
                    ? "bg-energetic text-card border-transparent"
                    : `bg-[color:var(--zabi-badge-fill,var(--color-energetic-subtle))] text-[color:var(--zabi-badge-text,var(--color-energetic-text))] ${edge("border-[color:var(--zabi-badge-border,var(--color-energetic-border))]")}`;
            // The app's second brand colour. Its solid label is the "on accent"
            // role, not the card surface: an app with a light accent (a
            // yellow) sets a dark label there, and white would be unreadable.
            case "accent":
                return solid
                    ? "bg-accent text-on-accent border-transparent"
                    : `bg-[color:var(--zabi-badge-fill,var(--color-accent-subtle))] text-[color:var(--zabi-badge-text,var(--color-accent-text))] ${edge("border-[color:var(--zabi-badge-border,var(--color-accent-border))]")}`;
            // The primary brand colour, for the neutral-but-branded label
            // ("Member"). Subtle text is the link role, guarded on this fill
            // as the label of a selected pill tab; solid carries the label
            // of the primary fill. The colour is read from the token, not
            // through `text-link`: that class darkens on hover and while
            // pressed, and a badge is not a link.
            case "brand":
                return solid
                    ? "bg-action-primary text-action-primary border-transparent"
                    : `bg-[color:var(--zabi-badge-fill,var(--color-action-primary-subtle))] text-[color:var(--zabi-badge-text,var(--color-link))] ${edge("border-[color:var(--zabi-badge-border,var(--color-action-primary-border))]")}`;
            case "neutral":
            case "default":
            default:
                return solid
                    ? "bg-neutral text-card border-transparent"
                    : `bg-[color:var(--zabi-badge-fill,var(--zabi-badge-neutral-fill,var(--color-neutral-subtle)))] text-[color:var(--zabi-badge-text,var(--zabi-badge-neutral-text,var(--color-neutral-text)))] ${edge("border-[color:var(--zabi-badge-border,var(--color-neutral-border))]")}`;
        }
    });

    // `on-surface`: inside a brand, accent or fill block (src/app.css) a
    // subtle badge is a surface, so its text tokens are the theme's again.
    // The `bg-*-subtle` class names used to say so; the custom-property
    // classes (D290) do not.
    const badgeClasses = $derived(
        // Never wider than what it is in, and its words break onto the next
        // line before they push anything out; a word longer than the line
        // breaks inside. The icon stays centred beside the lines.
        cn(`inline-flex [max-inline-size:100%] min-w-0 items-center justify-center border font-medium [overflow-wrap:anywhere] ${sizeClass.box} ${variantClass} ${emphasis === "solid" ? "" : "on-surface"} ${className}`),
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

    // `--zabi-badge-icon` colours the built-in icon only; unset, it is the
    // text colour, as before. Solid badges leave it alone.
    const iconClass = $derived(
        emphasis === "solid" ? "shrink-0" : "shrink-0 text-[color:var(--zabi-badge-icon,currentColor)]",
    );

    const hasLabel = $derived(Boolean(children) || Boolean(text));
</script>

{#if hasLabel}
    <span class={badgeClasses} {...restProps}>
        {#if showIcon}
            {@const BadgeIcon = Icon}
            <BadgeIcon size={sizeClass.icon} class={iconClass} aria-hidden="true" />
        {/if}
        {#if children}
            {@render children()}
        {:else}
            {text}
        {/if}
    </span>
{/if}
