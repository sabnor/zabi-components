<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { CardEvents, ClickEventDetail } from "../../types/events";

    // Card configuration
    export let variant:
        | "default"
        | "elevated"
        | "outlined"
        | "glass"
        | "gradient" = "default";
    export let density: "comfortable" | "compact" | "spacious" = "comfortable";
    export let interactive: boolean = false;
    export let disabled: boolean = false;
    export let loading: boolean = false;
    // export let hoverable: boolean = true; // Reserved for future use
    export let containerQuery: boolean = true;
    export let className: string = "";

    // Content props
    export let title: string = "";
    export let subtitle: string = "";
    export let description: string = "";
    export let image: string = "";
    export let imageAlt: string = "";

    // Accessibility props
    export let ariaLabel: string = "";
    export let ariaDescribedBy: string = "";
    export let role: string = "article";

    const dispatch = createEventDispatcher<CardEvents>();

    // Density classes using semantic tokens
    const densityClasses = {
        compact: "p-3 rounded-md",
        comfortable: "p-4 rounded-lg",
        spacious: "p-6 rounded-xl",
    };

    // Variant classes using modern CSS features
    const variantClasses = {
        default: [
            "bg-surface border border-primary shadow-adaptive-sm",
            "backdrop-blur-0",
        ].join(" "),

        elevated: [
            "bg-surface-elevated border border-primary shadow-adaptive-md",
            "backdrop-blur-0",
        ].join(" "),

        outlined: [
            "bg-surface border-2 border-primary shadow-adaptive-sm",
            "backdrop-blur-0",
        ].join(" "),

        glass: [
            "bg-surface/80 border border-primary/20 shadow-adaptive-lg",
            "backdrop-blur-md backdrop-saturate-150",
        ].join(" "),

        gradient: [
            "bg-gradient-to-br from-surface to-surface-secondary",
            "border border-primary shadow-adaptive-md",
        ].join(" "),
    };

    // Interactive state classes
    const interactiveClasses =
        interactive && !disabled
            ? [
                  "cursor-pointer",
                  "transition-all duration-200 ease-out",
                  "hover:shadow-adaptive-lg hover:-translate-y-1",
                  "active:translate-y-0 active:shadow-adaptive-sm",
                  "focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2",
              ].join(" ")
            : "";

    // Disabled state classes
    const disabledClasses = disabled
        ? [
              "opacity-50 cursor-not-allowed",
              "hover:shadow-adaptive-sm hover:translate-y-0",
          ].join(" ")
        : "";

    // Loading state classes
    const loadingClasses = loading ? "animate-pulse" : "";

    // Container query classes
    const containerQueryClasses = containerQuery ? "container-query" : "";

    // Computed classes
    $: computedClasses = [
        "card",
        variantClasses[variant],
        densityClasses[density],
        interactiveClasses,
        disabledClasses,
        loadingClasses,
        containerQueryClasses,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Event handlers
    function handleClick(event: MouseEvent) {
        if (disabled || loading) {
            event.preventDefault();
            return;
        }
        dispatch("click", { value: true, event });
    }

    function handleKeydown(event: KeyboardEvent) {
        if (disabled || loading || !interactive) return;

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            dispatch("click", { value: true, event });
        }
    }

    // Accessibility attributes
    $: accessibilityProps = {
        "aria-label": ariaLabel || (title ? undefined : "Card"),
        "aria-describedby": ariaDescribedBy || undefined,
        "aria-busy": loading,
        "aria-disabled": disabled,
        role: role,
        tabindex: interactive && !disabled ? 0 : undefined,
    };
</script>

<article
    class={computedClasses}
    on:click={(e) => handleClick(e as unknown as MouseEvent)}
    on:keydown={(e) => handleKeydown(e as unknown as KeyboardEvent)}
    {...accessibilityProps}
>
    {#if image}
        <div class="card-image-container">
            <img
                src={image}
                alt={imageAlt || title || "Card image"}
                class="card-image"
                loading="lazy"
                decoding="async"
            />
        </div>
    {/if}

    <div class="card-content">
        {#if title}
            <header class="card-header">
                <h3 class="card-title">{title}</h3>
                {#if subtitle}
                    <p class="card-subtitle">{subtitle}</p>
                {/if}
            </header>
        {/if}

        {#if description}
            <div class="card-description">
                <p>{description}</p>
            </div>
        {/if}

        <div class="card-body">
            <slot />
        </div>

        {#if $$slots.actions}
            <footer class="card-actions">
                <slot name="actions" />
            </footer>
        {/if}
    </div>

    {#if loading}
        <div class="card-loading-overlay" aria-hidden="true">
            <div class="loading-spinner"></div>
        </div>
    {/if}
</article>

<style>
    /* Container Query Support */
    @supports (container-type: inline-size) {
        .container-query {
            container-type: inline-size;
        }
    }

    /* Card base styles with modern CSS features */
    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        contain: layout style paint;
        will-change: transform, box-shadow;
    }

    /* Container Query Responsive Behavior */
    @container (min-width: 300px) {
        .card {
            border-radius: var(--radius-lg);
        }

        .card-content {
            padding: var(--spacing-lg);
        }
    }

    @container (min-width: 500px) {
        .card {
            border-radius: var(--radius-xl);
        }

        .card-content {
            padding: var(--spacing-xl);
        }
    }

    /* Image container with modern aspect ratio */
    .card-image-container {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
    }

    .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .card:hover .card-image {
        transform: scale(1.05);
    }

    /* Content layout using CSS Grid */
    .card-content {
        display: grid;
        grid-template-areas:
            "header"
            "description"
            "body"
            "actions";
        gap: var(--spacing-sm);
        flex: 1;
        padding: var(--spacing-md);
    }

    .card-header {
        grid-area: header;
    }

    .card-description {
        grid-area: description;
    }

    .card-body {
        grid-area: body;
        flex: 1;
    }

    .card-actions {
        grid-area: actions;
        display: flex;
        gap: var(--spacing-sm);
        justify-content: flex-end;
        margin-top: auto;
    }

    /* Typography using semantic tokens */
    .card-title {
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.4;
        color: rgb(var(--color-text));
        margin: 0;
    }

    .card-subtitle {
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        color: rgb(var(--color-text-secondary));
        margin: 0.25rem 0 0 0;
    }

    .card-description p {
        font-size: 0.875rem;
        line-height: 1.6;
        color: rgb(var(--color-text-tertiary));
        margin: 0;
    }

    /* Loading overlay with modern CSS */
    .card-loading-overlay {
        position: absolute;
        inset: 0;
        background: rgb(var(--color-surface) / 0.8);
        backdrop-filter: blur(2px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }

    .loading-spinner {
        width: 2rem;
        height: 2rem;
        border: 2px solid rgb(var(--color-border));
        border-top-color: rgb(var(--color-primary));
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Focus management for interactive cards */
    .card:focus-visible {
        outline: 2px solid rgb(var(--color-focus-ring));
        outline-offset: 2px;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .card {
            transition: none;
        }

        .card-image {
            transition: none;
        }

        .loading-spinner {
            animation: none;
        }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .card {
            border-width: 2px;
        }

        .card-title {
            font-weight: 700;
        }
    }

    /* Print styles */
    @media print {
        .card {
            break-inside: avoid;
            box-shadow: none;
            border: 1px solid #000;
        }

        .card-loading-overlay {
            display: none;
        }
    }
</style>
