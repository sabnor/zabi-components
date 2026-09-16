<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import type { CardVariant, SizeVariant } from "../types/variants.js";

    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
        onclick?: (event: MouseEvent) => void | Promise<void>;
        size?: SizeVariant;
        variant?: CardVariant;
        fullWidth?: boolean;
        class?: string;
        /** @deprecated use `class` — kept so 7.x call sites keep working. */
        className?: string;
        /** Required when `onclick` is set (no visible label). */
        ariaLabel?: string;
        children?: Snippet;
    };

    let {
        onclick,
        size = "md",
        variant = "default",
        fullWidth = true,
        class: classProp = "",
        className = "",
        ariaLabel,
        children,
        ...restProps
    }: Props = $props();

    /** Size changes the padding. It does NOT change the corner — see
     * `--radius-container`. A large card is a bigger box, not a rounder one. */
    const sizeClass = $derived(
        size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-6",
    );

    const variantClasses = $derived(
        variant === "elevated"
            ? "bg-card-elevated shadow-lg"
            : variant === "outlined"
              ? "bg-card border border-border shadow-none"
              : variant === "flat"
                ? "bg-card shadow-none border-none"
                : "bg-card shadow-sm",
    );

    const interactiveClasses = $derived.by(() => {
        if (!onclick) return "";
        const shared = "cursor-pointer focus-ring";
        switch (variant) {
            case "elevated":
                return `${shared} hover:bg-card-hover`;
            case "outlined":
                return `${shared} hover:border-border-medium hover:bg-card-hover`;
            case "flat":
                return `${shared} hover:bg-card-hover`;
            default:
                return `${shared} hover:shadow-lg hover:bg-card-hover`;
        }
    });

    const cardClasses = $derived(
        [
            "rounded-container transition-all duration-150",
            variantClasses,
            interactiveClasses,
            fullWidth ? "w-full" : "",
            sizeClass,
            classProp,
            className,
        ]
            .filter(Boolean)
            .join(" ")
            .trim(),
    );

    function handleKeydown(event: KeyboardEvent) {
        if (onclick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onclick(event as unknown as MouseEvent);
        }
    }

    const cardRole = $derived(onclick ? "button" : undefined);
</script>

<div
    class={cardClasses}
    {onclick}
    role={cardRole}
    {...onclick ? { tabindex: 0 } : {}}
    aria-label={ariaLabel}
    onkeydown={onclick ? handleKeydown : undefined}
    {...restProps}
>
    {@render children?.()}
</div>
