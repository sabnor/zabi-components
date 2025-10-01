<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { fly, fade } from "svelte/transition";

    export let content: string = "";
    export let placement:
        | "top"
        | "bottom"
        | "left"
        | "right"
        | "top-start"
        | "top-end"
        | "bottom-start"
        | "bottom-end"
        | "left-start"
        | "left-end"
        | "right-start"
        | "right-end" = "top";
    export let trigger: "hover" | "click" | "focus" | "manual" = "hover";
    export let disabled: boolean = false;
    export let delay: number = 200;
    export let maxWidth: string = "200px";
    export let variant:
        | "default"
        | "dark"
        | "light"
        | "info"
        | "success"
        | "warning"
        | "error" = "default";
    export let size: "sm" | "md" | "lg" = "md";
    export let arrow: boolean = true;
    export let interactive: boolean = false;
    export let className: string = "";

    const dispatch = createEventDispatcher<{
        show: { event: Event };
        hide: { event: Event };
    }>();

    let tooltipElement: HTMLDivElement;
    let triggerElement: HTMLElement;
    let isVisible = false;
    let showTimeout: number;
    let hideTimeout: number;
    let triggerRect: DOMRect;

    // Size classes
    const sizeClasses = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
    };

    // Variant classes
    const variantClasses = {
        default:
            "bg-surface-elevated text-primary border-primary shadow-adaptive-lg",
        dark: "bg-surface text-inverse border-primary shadow-adaptive-lg",
        light: "bg-surface text-primary border-primary shadow-adaptive-lg",
        info: "bg-info text-inverse border-info shadow-adaptive-lg",
        success: "bg-success text-inverse border-success shadow-adaptive-lg",
        warning: "bg-warning text-inverse border-warning shadow-adaptive-lg",
        error: "bg-error text-inverse border-error shadow-adaptive-lg",
    };

    // Calculate tooltip position
    function calculatePosition() {
        if (!triggerElement || !tooltipElement) return { top: 0, left: 0 };

        triggerRect = triggerElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let top = 0;
        let left = 0;

        // Calculate position based on placement
        switch (placement) {
            case "top":
                top = triggerRect.top + scrollY - tooltipRect.height - 8;
                left =
                    triggerRect.left +
                    scrollX +
                    (triggerRect.width - tooltipRect.width) / 2;
                break;
            case "top-start":
                top = triggerRect.top + scrollY - tooltipRect.height - 8;
                left = triggerRect.left + scrollX;
                break;
            case "top-end":
                top = triggerRect.top + scrollY - tooltipRect.height - 8;
                left = triggerRect.right + scrollX - tooltipRect.width;
                break;
            case "bottom":
                top = triggerRect.bottom + scrollY + 8;
                left =
                    triggerRect.left +
                    scrollX +
                    (triggerRect.width - tooltipRect.width) / 2;
                break;
            case "bottom-start":
                top = triggerRect.bottom + scrollY + 8;
                left = triggerRect.left + scrollX;
                break;
            case "bottom-end":
                top = triggerRect.bottom + scrollY + 8;
                left = triggerRect.right + scrollX - tooltipRect.width;
                break;
            case "left":
                top =
                    triggerRect.top +
                    scrollY +
                    (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left + scrollX - tooltipRect.width - 8;
                break;
            case "left-start":
                top = triggerRect.top + scrollY;
                left = triggerRect.left + scrollX - tooltipRect.width - 8;
                break;
            case "left-end":
                top = triggerRect.bottom + scrollY - tooltipRect.height;
                left = triggerRect.left + scrollX - tooltipRect.width - 8;
                break;
            case "right":
                top =
                    triggerRect.top +
                    scrollY +
                    (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + scrollX + 8;
                break;
            case "right-start":
                top = triggerRect.top + scrollY;
                left = triggerRect.right + scrollX + 8;
                break;
            case "right-end":
                top = triggerRect.bottom + scrollY - tooltipRect.height;
                left = triggerRect.right + scrollX + 8;
                break;
        }

        // Keep tooltip within viewport
        if (left < 8) left = 8;
        if (left + tooltipRect.width > viewportWidth - 8) {
            left = viewportWidth - tooltipRect.width - 8;
        }
        if (top < 8) top = 8;
        if (top + tooltipRect.height > viewportHeight + scrollY - 8) {
            top = viewportHeight + scrollY - tooltipRect.height - 8;
        }

        return { top, left };
    }

    function showTooltip(event: Event) {
        if (disabled || isVisible) return;

        clearTimeout(hideTimeout);
        showTimeout = setTimeout(() => {
            isVisible = true;
            dispatch("show", event);

            // Calculate position after showing
            requestAnimationFrame(() => {
                const position = calculatePosition();
                if (tooltipElement) {
                    tooltipElement.style.top = `${position.top}px`;
                    tooltipElement.style.left = `${position.left}px`;
                }
            });
        }, delay);
    }

    function hideTooltip(event: Event) {
        if (!isVisible) return;

        clearTimeout(showTimeout);
        hideTimeout = setTimeout(
            () => {
                isVisible = false;
                dispatch("hide", event);
            },
            interactive ? 300 : 0,
        );
    }

    function handleTriggerClick(event: MouseEvent) {
        if (trigger === "click") {
            if (isVisible) {
                hideTooltip(event);
            } else {
                showTooltip(event);
            }
        }
    }

    function handleTriggerKeydown(event: KeyboardEvent) {
        if (
            trigger === "click" &&
            (event.key === "Enter" || event.key === " ")
        ) {
            event.preventDefault();
            if (isVisible) {
                hideTooltip(event);
            } else {
                showTooltip(event);
            }
        }
    }

    function handleTriggerFocus(event: FocusEvent) {
        if (trigger === "focus") {
            showTooltip(event);
        }
    }

    function handleTriggerBlur(event: FocusEvent) {
        if (trigger === "focus") {
            hideTooltip(event);
        }
    }

    function handleTriggerMouseEnter(event: MouseEvent) {
        if (trigger === "hover") {
            showTooltip(event);
        }
    }

    function handleTriggerMouseLeave(event: MouseEvent) {
        if (trigger === "hover") {
            hideTooltip(event);
        }
    }

    function handleTooltipMouseEnter() {
        if (interactive) {
            clearTimeout(hideTimeout);
        }
    }

    function handleTooltipMouseLeave(event: MouseEvent) {
        if (interactive) {
            hideTooltip(event);
        }
    }

    // Public methods
    export function show() {
        if (!disabled) {
            isVisible = true;
        }
    }

    export function hide() {
        isVisible = false;
    }

    export function toggle() {
        if (isVisible) {
            hide();
        } else {
            show();
        }
    }

    onMount(() => {
        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    });

    // Update position when tooltip becomes visible
    $: if (isVisible && tooltipElement) {
        requestAnimationFrame(() => {
            const position = calculatePosition();
            tooltipElement.style.top = `${position.top}px`;
            tooltipElement.style.left = `${position.left}px`;
        });
    }
</script>

<!-- Trigger element -->
{#if trigger === "click"}
    <button
        bind:this={triggerElement}
        type="button"
        aria-describedby={isVisible ? "tooltip-{content}" : undefined}
        on:click={handleTriggerClick}
        on:keydown={handleTriggerKeydown}
        on:focus={handleTriggerFocus}
        on:blur={handleTriggerBlur}
        on:mouseenter={handleTriggerMouseEnter}
        on:mouseleave={handleTriggerMouseLeave}
        class="inline-block"
    >
        <slot />
    </button>
{:else}
    <div
        bind:this={triggerElement}
        role="button"
        tabindex="0"
        aria-describedby={isVisible ? "tooltip-{content}" : undefined}
        on:click={handleTriggerClick}
        on:keydown={handleTriggerKeydown}
        on:focus={handleTriggerFocus}
        on:blur={handleTriggerBlur}
        on:mouseenter={handleTriggerMouseEnter}
        on:mouseleave={handleTriggerMouseLeave}
        class="inline-block"
    >
        <slot />
    </div>
{/if}

<!-- Tooltip -->
{#if isVisible && content}
    <div
        bind:this={tooltipElement}
        id="tooltip-{content}"
        class="
            fixed z-tooltip
            {sizeClasses[size]}
            {variantClasses[variant]}
            border rounded-lg shadow-adaptive-lg
            {className}
        "
        style="max-width: {maxWidth};"
        role="tooltip"
        on:mouseenter={handleTooltipMouseEnter}
        on:mouseleave={handleTooltipMouseLeave}
        transition:fly={{
            x: placement.includes("left")
                ? -10
                : placement.includes("right")
                  ? 10
                  : 0,
            y: placement.includes("top")
                ? -10
                : placement.includes("bottom")
                  ? 10
                  : 0,
            duration: 200,
        }}
    >
        <div class="relative">
            {content}

            <!-- Arrow -->
            {#if arrow}
                <div
                    class="
                    absolute w-2 h-2 transform rotate-45
                    {variantClasses[variant].split(' ')[0]}
                    {placement.includes('top')
                        ? 'bottom-[-4px] left-1/2 -translate-x-1/2'
                        : ''}
                    {placement.includes('bottom')
                        ? 'top-[-4px] left-1/2 -translate-x-1/2'
                        : ''}
                    {placement.includes('left')
                        ? 'right-[-4px] top-1/2 -translate-y-1/2'
                        : ''}
                    {placement.includes('right')
                        ? 'left-[-4px] top-1/2 -translate-y-1/2'
                        : ''}
                "
                ></div>
            {/if}
        </div>
    </div>
{/if}

<style>
    /* Ensure tooltip is above other elements */
    :global(.tooltip-container) {
        z-index: 1000;
    }

    /* Smooth transitions */
    .tooltip-enter {
        animation: tooltip-enter 0.2s ease-out;
    }

    .tooltip-exit {
        animation: tooltip-exit 0.15s ease-in;
    }

    @keyframes tooltip-enter {
        0% {
            opacity: 0;
            transform: scale(0.95);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes tooltip-exit {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.95);
        }
    }

    /* Arrow positioning */
    .tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
    }
</style>
