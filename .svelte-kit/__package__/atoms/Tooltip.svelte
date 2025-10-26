<script lang="ts">
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
</script>

<div
    class="tooltip-container group relative inline-block"
    data-placement={placement}
    data-delay={delay}
    data-disabled={disabled}
    {...restProps}
>
    {@render children?.()}

    {#if content && !disabled}
        <div
            class="tooltip group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"
            role="tooltip"
            aria-hidden="true"
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
            visibility 0.2s ease-in-out;
    }

    .tooltip-container {
        position: relative;
        display: inline-block;
    }

    .tooltip {
        position: absolute;
        z-index: 50;
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
        /* Use logical properties for better internationalization */
        inset-inline-start: 50%;
        inset-block-start: 50%;
        transform: translate(-50%, -50%);
    }

    /* Simplified positioning using CSS custom properties and logical properties */
    .tooltip-container[data-placement="top"] .tooltip {
        inset-block-end: 100%;
        inset-inline-start: 50%;
        transform: translateX(-50%);
        margin-block-end: var(--tooltip-gap);
    }

    .tooltip-container[data-placement="bottom"] .tooltip {
        inset-block-start: 100%;
        inset-inline-start: 50%;
        transform: translateX(-50%);
        margin-block-start: var(--tooltip-gap);
    }

    .tooltip-container[data-placement="left"] .tooltip {
        inset-inline-end: 100%;
        inset-block-start: 50%;
        transform: translateY(-50%);
        margin-inline-end: var(--tooltip-gap);
    }

    .tooltip-container[data-placement="right"] .tooltip {
        inset-inline-start: 100%;
        inset-block-start: 50%;
        transform: translateY(-50%);
        margin-inline-start: var(--tooltip-gap);
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
        clip-path: polygon(0 50%, 100% 0, 100% 100%);
    }

    .tooltip-container[data-placement="right"] .tooltip::before {
        inset-inline-end: 100%;
        inset-block-start: 50%;
        transform: translateY(-50%);
        clip-path: polygon(0 0, 100% 50%, 0 100%);
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
            transform: translateX(-50%) !important;
            margin: var(--tooltip-gap) 0 !important;
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

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        :root {
            --tooltip-bg: #000000;
            --tooltip-color: #ffffff;
        }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .tooltip {
            transition: none;
        }
    }
</style>
