<script lang="ts">
    import { Check, AlertTriangle, X, Info } from "@lucide/svelte";
    let {
        variant = "default",
        size = "md",
        text = "",
        showIcon = true,
    }: {
        variant?:
            | "default"
            | "success"
            | "warning"
            | "error"
            | "info"
            | "neutral"
            | "energetic";
        size?: "sm" | "md" | "lg";
        text: string;
        showIcon?: boolean;
    } = $props();

    const classes = $derived(() => {
        const baseClasses =
            "inline-flex items-center font-medium border rounded-md";

        const sizeClass =
            size === "sm"
                ? "px-2 py-0.5 text-xs"
                : size === "lg"
                  ? "px-4 py-2 text-base"
                  : "px-3 py-1 text-sm";

        const variantClass =
            variant === "success"
                ? "bg-success border-success text-card"
                : variant === "warning"
                  ? "bg-warning border-warning text-card"
                  : variant === "error"
                    ? "bg-error border-error text-card"
                    : variant === "info"
                      ? "bg-info border-info text-card"
                      : variant === "neutral"
                        ? "bg-neutral border-neutral text-card"
                        : variant === "energetic"
                          ? "bg-energetic border-energetic text-card"
                          : "bg-secondary border-secondary text-card";

        return `${baseClasses} ${sizeClass} ${variantClass}`.trim();
    });

    const iconSize = $derived(() => {
        return size === "sm" ? 12 : size === "lg" ? 20 : 16;
    });

    const iconSpacingClass = $derived(() => {
        return size === "sm" ? "mr-1" : size === "lg" ? "mr-2" : "mr-1.5";
    });
</script>

<span class={classes()}>
    {#if showIcon}
        {#if variant === "success"}
            <Check size={iconSize()} class="{iconSpacingClass()} text-card" />
        {:else if variant === "warning"}
            <AlertTriangle
                size={iconSize()}
                class="{iconSpacingClass()} text-card"
            />
        {:else if variant === "error"}
            <X size={iconSize()} class="{iconSpacingClass()} text-card" />
        {:else if variant === "info"}
            <Info size={iconSize()} class="{iconSpacingClass()} text-card" />
        {:else if variant === "neutral"}
            <Info size={iconSize()} class="{iconSpacingClass()} text-card" />
        {:else if variant === "energetic"}
            <Info size={iconSize()} class="{iconSpacingClass()} text-card" />
        {:else}
            <Info size={iconSize()} class="{iconSpacingClass()} text-card" />
        {/if}
    {/if}
    {text}
</span>
