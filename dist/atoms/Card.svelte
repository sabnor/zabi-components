<script lang="ts">
    import type { Snippet } from "svelte";
    import type { CardVariant, SizeVariant } from "../../types/variants.js";

    interface Props {
        onclick?: (event: MouseEvent) => void | Promise<void>;
        size?: SizeVariant;
        variant?: CardVariant;
        fullWidth?: boolean;
        className?: string;
        /** Required when card is interactive (has onclick) for accessibility */
        ariaLabel?: string;
        children?: Snippet;
    }

    let {
        onclick,
        size = "md",
        variant = "default",
        fullWidth = true,
        className = "",
        ariaLabel,
        children,
        ...restProps
    }: Props = $props();

    const sizeClass = $derived(
        size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-6",
    );

    /** Larger radius for larger cards (was single `rounded-lg` for all). */
    const radiusClass = $derived(
        size === "sm"
            ? "rounded-xl"
            : size === "lg"
              ? "rounded-3xl"
              : "rounded-2xl",
    );

    const variantClasses = $derived(
        variant === "elevated"
            ? "bg-card shadow-lg"
            : variant === "outlined"
              ? "bg-card border-2 border-base-200 shadow-none"
              : variant === "flat"
                ? "bg-card shadow-none border-none"
                : "bg-card shadow-sm",
    );

    const cardClasses = $derived(
        [
            radiusClass,
            "transition-all duration-200",
            variantClasses,
            onclick
                ? variant === "elevated"
                    ? "cursor-pointer hover:shadow-xl hover:bg-card-hover"
                    : variant === "outlined"
                      ? "cursor-pointer hover:border-brand-500 hover:bg-card-hover"
                      : variant === "flat"
                        ? "cursor-pointer hover:bg-card-hover"
                        : "cursor-pointer hover:shadow-lg hover:bg-card-hover"
                : "",
            fullWidth ? "w-full" : "",
            sizeClass,
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
