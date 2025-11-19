<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        content?: string;
        placement?: "top" | "bottom" | "left" | "right";
        delay?: number;
        disabled?: boolean;
    }

    let {
        content = "",
        placement = "top",
        delay = 0,
        disabled = false,
        children,
        ...restProps
    }: Props & { children?: any } = $props();

    let triggerId = `tooltip-trigger-${Math.random().toString(36).substr(2, 9)}`;
    let tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
    let isVisible = $state(false);
    let triggerElement: HTMLElement | null = $state(null);

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isVisible) {
            isVisible = false;
            triggerElement?.focus();
        }
    }

    function handleFocus() {
        if (!disabled && content) {
            isVisible = true;
        }
    }

    function handleBlur() {
        setTimeout(() => {
            isVisible = false;
        }, 100);
    }

    function handleMouseEnter() {
        if (!disabled && content) {
            if (delay > 0) {
                setTimeout(() => {
                    isVisible = true;
                }, delay);
            } else {
                isVisible = true;
            }
        }
    }

    function handleMouseLeave() {
        isVisible = false;
    }

    onMount(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("keydown", handleKeydown);
            return () => {
                window.removeEventListener("keydown", handleKeydown);
            };
        }
    });
</script>

<div
    class="tooltip-container relative inline-block"
    data-placement={placement}
    data-disabled={disabled}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onfocusin={handleFocus}
    onfocusout={handleBlur}
    {...restProps}
>
    <div bind:this={triggerElement} id={triggerId} aria-describedby={isVisible ? tooltipId : undefined}>
        {@render children?.()}
    </div>

    {#if content && !disabled}
        <div
            id={tooltipId}
            class="tooltip"
            role="tooltip"
            aria-hidden={!isVisible}
            data-visible={isVisible}
            data-placement={placement}
        >
            {content}
        </div>
    {/if}
</div>

<style>
    :root {
        --tooltip-bg: #1f2937;
        --tooltip-color: white;
        --tooltip-padding: 0.5rem 0.75rem;
        --tooltip-radius: 0.375rem;
        --tooltip-font-size: 0.875rem;
        --tooltip-line-height: 1.25rem;
        --tooltip-max-width: 200px;
        --tooltip-gap: 0.5rem;
        --tooltip-arrow-size: 4px;
        --tooltip-transition: opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out, transform 0.2s ease-in-out;
    }

    .tooltip-container {
        position: relative;
        display: inline-block;
    }

    .tooltip {
        position: absolute;
        z-index: var(--z-tooltip, 1070);
        padding: var(--tooltip-padding);
        background-color: var(--tooltip-bg);
        color: var(--tooltip-color);
        border-radius: var(--tooltip-radius);
        font-size: var(--tooltip-font-size);
        line-height: var(--tooltip-line-height);
        max-width: var(--tooltip-max-width);
        white-space: normal;
        word-wrap: break-word;
        opacity: 0;
        visibility: hidden;
        transition: var(--tooltip-transition);
        pointer-events: none;
    }

    /* Simplified positioning using CSS custom properties and logical properties */
    .tooltip-container[data-placement="top"] .tooltip {
        inset-block-end: 100%;
        inset-inline-start: 50%;
        transform: translateX(-50%) translateY(4px) scale(0.95);
        margin-block-end: var(--tooltip-gap);
    }

    .tooltip-container[data-placement="top"] .tooltip[data-visible="true"] {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0) scale(1);
    }

    .tooltip-container[data-placement="bottom"] .tooltip {
        inset-block-start: 100%;
        inset-inline-start: 50%;
        transform: translateX(-50%) translateY(-4px) scale(0.95);
        margin-block-start: var(--tooltip-gap);
    }

    .tooltip-container[data-placement="bottom"] .tooltip[data-visible="true"] {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0) scale(1);
    }

    .tooltip-container[data-placement="left"] .tooltip {
        inset-inline-end: 100%;
        inset-block-start: 50%;
        transform: translateY(-50%) translateX(4px) scale(0.95);
        margin-inline-end: var(--tooltip-gap);
    }

    .tooltip-container[data-placement="left"] .tooltip[data-visible="true"] {
        opacity: 1;
        visibility: visible;
        transform: translateY(-50%) translateX(0) scale(1);
    }

    .tooltip-container[data-placement="right"] .tooltip {
        inset-inline-start: 100%;
        inset-block-start: 50%;
        transform: translateY(-50%) translateX(-4px) scale(0.95);
        margin-inline-start: var(--tooltip-gap);
    }

    .tooltip-container[data-placement="right"] .tooltip[data-visible="true"] {
        opacity: 1;
        visibility: visible;
        transform: translateY(-50%) translateX(0) scale(1);
    }

    /* Modern arrow implementation using CSS clip-path for better performance */
    .tooltip::before {
        content: "";
        position: absolute;
        width: calc(var(--tooltip-arrow-size) * 2);
        height: calc(var(--tooltip-arrow-size) * 2);
        background-color: var(--tooltip-bg);
    }

    .tooltip-container[data-placement="top"] .tooltip::before {
        inset-block-start: 100%;
        inset-inline-start: 50%;
        transform: translateX(-50%);
        clip-path: polygon(50% 100%, 0 0, 100% 0);
    }

    .tooltip-container[data-placement="bottom"] .tooltip::before {
        inset-block-end: 100%;
        inset-inline-start: 50%;
        transform: translateX(-50%);
        clip-path: polygon(0 100%, 50% 0, 100% 100%);
    }

    .tooltip-container[data-placement="left"] .tooltip::before {
        inset-inline-start: 100%;
        inset-block-start: 50%;
        transform: translateY(-50%);
        clip-path: polygon(0 0, 100% 50%, 0 100%);
    }

    .tooltip-container[data-placement="right"] .tooltip::before {
        inset-inline-end: 100%;
        inset-block-start: 50%;
        transform: translateY(-50%);
        clip-path: polygon(0 50%, 100% 0, 100% 100%);
    }

    /* Delay support using CSS custom properties */
    .tooltip-container[data-delay] .tooltip {
        transition-delay: calc(var(--tooltip-delay, 0) * 1ms);
    }

    /* Responsive design with modern CSS */
    @media (max-width: 640px) {
        .tooltip {
            --tooltip-max-width: calc(100vw - 2rem);
            inset-inline-start: 50% !important;
            inset-inline-end: auto !important;
            transform: translateX(-50%) scale(0.95) !important;
            margin: var(--tooltip-gap) 0 !important;
        }

        .tooltip[data-visible="true"] {
            transform: translateX(-50%) scale(1) !important;
        }

        .tooltip::before {
            display: none;
        }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
        :root {
            --tooltip-bg: #374151;
        }
    }

    /* Use CSS color-scheme for better dark mode support */
    .dark :root {
        --tooltip-bg: #374151;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        :root {
            --tooltip-bg: #000000;
            --tooltip-color: #ffffff;
            --tooltip-padding: 0.75rem 1rem;
        }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .tooltip {
            transition: opacity 0.1s ease-in-out, visibility 0.1s ease-in-out;
        }

        .tooltip-container[data-placement="top"] .tooltip[data-visible="true"],
        .tooltip-container[data-placement="bottom"] .tooltip[data-visible="true"] {
            transform: translateX(-50%) !important;
        }

        .tooltip-container[data-placement="left"] .tooltip[data-visible="true"],
        .tooltip-container[data-placement="right"] .tooltip[data-visible="true"] {
            transform: translateY(-50%) !important;
        }
    }

    /* Focus-visible for better keyboard navigation */
    .tooltip-container:focus-visible {
        outline: 2px solid var(--color-focus, #8fa8ff);
        outline-offset: 2px;
        border-radius: var(--tooltip-radius);
    }
</style>
