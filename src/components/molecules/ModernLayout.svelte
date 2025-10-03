<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { LayoutEvents } from "../../types/events";

    // Layout configuration
    export let variant: "main" | "sidebar" | "grid" | "auto-fit" | "auto-fill" =
        "main";
    export let gap: "xs" | "sm" | "md" | "lg" | "xl" = "md";
    export let columns: number = 12;
    export let minItemWidth: string = "250px";
    export let responsive: boolean = true;
    export let containerQuery: boolean = false;
    export let className: string = "";

    // Accessibility props
    export let ariaLabel: string = "";
    export let ariaDescribedBy: string = "";
    export let role: string = "main";

    // Layout state
    export let sidebarOpen: boolean = false;
    export let currentBreakpoint: string = "mobile";

    const dispatch = createEventDispatcher<LayoutEvents>();

    let layoutElement: HTMLElement;
    let resizeObserver: ResizeObserver;

    // Responsive breakpoints using CSS custom properties
    const breakpoints = {
        mobile: "320px",
        tablet: "768px",
        desktop: "1024px",
        wide: "1440px",
    };

    // Gap classes using semantic tokens
    const gapClasses = {
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    // Layout variant classes
    const layoutClasses = {
        main: "layout-main",
        sidebar: "layout-sidebar",
        grid: "layout-grid",
        "auto-fit": "grid-auto-fit",
        "auto-fill": "grid-auto-fill",
    };

    // Container query classes
    const containerQueryClasses = containerQuery ? "container-query" : "";

    // Computed classes
    $: computedClasses = [
        layoutClasses[variant],
        gapClasses[gap],
        containerQueryClasses,
        responsive ? "responsive" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Dynamic grid template columns for grid variant
    $: gridColumns = variant === "grid" ? `repeat(${columns}, 1fr)` : undefined;
    $: autoFitColumns =
        variant === "auto-fit"
            ? `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
            : undefined;
    $: autoFillColumns =
        variant === "auto-fill"
            ? `repeat(auto-fill, minmax(${minItemWidth}, 1fr))`
            : undefined;

    // CSS custom properties for dynamic styling
    $: cssVars = {
        "--layout-columns": gridColumns || "",
        "--auto-fit-columns": autoFitColumns || "",
        "--auto-fill-columns": autoFillColumns || "",
        "--layout-gap": `var(--spacing-${gap})`,
    } as Record<string, string>;

    // Responsive behavior
    function handleResize(entries: ResizeObserverEntry[]) {
        if (!responsive) return;

        const entry = entries[0];
        const width = entry.contentRect.width;

        let newBreakpoint = "mobile";
        if (width >= parseInt(breakpoints.wide)) newBreakpoint = "wide";
        else if (width >= parseInt(breakpoints.desktop))
            newBreakpoint = "desktop";
        else if (width >= parseInt(breakpoints.tablet))
            newBreakpoint = "tablet";

        if (newBreakpoint !== currentBreakpoint) {
            currentBreakpoint = newBreakpoint;
            dispatch("breakpoint-change", { breakpoint: newBreakpoint, width });
        }
    }

    // Keyboard navigation for sidebar layout
    function handleKeydown(event: KeyboardEvent) {
        if (variant === "sidebar" && event.key === "Escape" && sidebarOpen) {
            sidebarOpen = false;
            dispatch("sidebar-toggle", { open: sidebarOpen });
        }
    }

    onMount(() => {
        if (responsive && layoutElement) {
            resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(layoutElement);
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    });

    // Accessibility attributes
    $: accessibilityProps = {
        "aria-label": ariaLabel || undefined,
        "aria-describedby": ariaDescribedBy || undefined,
        role: role,
        "data-layout-variant": variant,
        "data-breakpoint": currentBreakpoint,
    };
</script>

<div
    bind:this={layoutElement}
    class={computedClasses}
    style={cssVars as any}
    on:keydown={(e) => handleKeydown(e as unknown as KeyboardEvent)}
    {...accessibilityProps}
>
    {#if variant === "sidebar"}
        <!-- Sidebar Layout -->
        <aside
            class="sidebar bg-surface-secondary border-r border-primary p-4"
            aria-label="Navigation"
        >
            <slot name="sidebar" />
        </aside>

        <main class="main-content p-4">
            <slot name="main" />
        </main>
    {:else if variant === "main"}
        <!-- Main Layout -->
        <header class="header bg-surface-elevated border-b border-primary p-4">
            <slot name="header" />
        </header>

        <main class="main-content p-4">
            <slot name="main" />
        </main>

        <footer class="footer bg-surface-secondary border-t border-primary p-4">
            <slot name="footer" />
        </footer>
    {:else if variant === "grid"}
        <!-- Grid Layout -->
        <div
            class="grid-content"
            style="grid-template-columns: var(--layout-columns);"
        >
            <slot />
        </div>
    {:else if variant === "auto-fit"}
        <!-- Auto-fit Grid -->
        <div
            class="auto-fit-content"
            style="grid-template-columns: var(--auto-fit-columns);"
        >
            <slot />
        </div>
    {:else if variant === "auto-fill"}
        <!-- Auto-fill Grid -->
        <div
            class="auto-fill-content"
            style="grid-template-columns: var(--auto-fill-columns);"
        >
            <slot />
        </div>
    {:else}
        <!-- Default slot -->
        <slot />
    {/if}
</div>

<style>
    /* Modern CSS Grid with subgrid support */
    @supports (grid-template-columns: subgrid) {
        .grid-content {
            display: grid;
            gap: var(--layout-gap);
        }

        .auto-fit-content,
        .auto-fill-content {
            display: grid;
            gap: var(--layout-gap);
        }
    }

    /* Fallback for browsers without subgrid */
    @supports not (grid-template-columns: subgrid) {
        .grid-content {
            display: grid;
            gap: var(--layout-gap);
        }

        .auto-fit-content,
        .auto-fill-content {
            display: grid;
            gap: var(--layout-gap);
        }
    }

    /* Container Query Support */
    @supports (container-type: inline-size) {
        .container-query {
            container-type: inline-size;
        }
    }

    /* Responsive behavior using CSS logical properties */
    @supports (margin-inline-start: 1rem) {
        .responsive {
            padding-inline: var(--spacing-md);
            padding-block: var(--spacing-sm);
        }
    }

    /* Modern focus management */
    .layout-main:focus-within,
    .layout-sidebar:focus-within {
        outline: 2px solid rgb(var(--color-focus-ring));
        outline-offset: 2px;
    }

    /* Performance optimizations */
    .layout-main,
    .layout-sidebar,
    .grid-content,
    .auto-fit-content,
    .auto-fill-content {
        contain: layout style;
        will-change: auto;
    }

    /* Accessibility enhancements */
    .sidebar[aria-hidden="true"] {
        display: none;
    }

    .main-content:focus {
        outline: none;
    }

    /* Animation for layout changes */
    .layout-main,
    .layout-sidebar {
        transition: grid-template-columns 0.3s ease;
    }

    /* Skip link for keyboard navigation */
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: rgb(var(--color-primary));
        color: rgb(var(--color-text-inverse));
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    }

    .skip-link:focus {
        top: 6px;
    }
</style>
