<script lang="ts">
    import { onDestroy } from "svelte";
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        content?: string;
        placement?: "top" | "bottom" | "left" | "right";
        delay?: number;
        disabled?: boolean;
    }

    /** First matching focusable inside the slot receives `aria-describedby` (wrapper div is skipped). */
    const FOCUSABLE_SELECTOR =
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    let {
        content = "",
        placement = "top",
        delay = 0,
        disabled = false,
        children,
        ...restProps
    }: Props & { children?: any } = $props();

    const triggerId = generateId("tooltip-trigger");
    const tooltipId = generateId("tooltip");
    let isVisible = $state(false);
    let triggerElement: HTMLElement | null = $state(null);
    let showDelayTimeout: ReturnType<typeof setTimeout> | null = null;
    let hideBlurTimeout: ReturnType<typeof setTimeout> | null = null;

    function clearShowDelay(): void {
        if (showDelayTimeout !== null) {
            clearTimeout(showDelayTimeout);
            showDelayTimeout = null;
        }
    }

    function clearHideBlurTimeout(): void {
        if (hideBlurTimeout !== null) {
            clearTimeout(hideBlurTimeout);
            hideBlurTimeout = null;
        }
    }

    function findDescribedTarget(root: HTMLElement): HTMLElement | null {
        const found = root.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        if (found) {
            return found;
        }
        try {
            if (root.matches(FOCUSABLE_SELECTOR)) {
                return root;
            }
        } catch {
            /* `matches()` can throw on unusual roots */
        }
        return null;
    }

    $effect(() => {
        const root = triggerElement;
        const describe =
            isVisible && content && !disabled ? tooltipId : null;
        if (!root) {
            return;
        }
        const target = findDescribedTarget(root);
        if (!target) {
            return;
        }
        if (describe) {
            target.setAttribute("aria-describedby", describe);
        } else {
            target.removeAttribute("aria-describedby");
        }
        return () => {
            target.removeAttribute("aria-describedby");
        };
    });

    $effect(() => {
        if (!content || disabled) {
            clearShowDelay();
            clearHideBlurTimeout();
        }
    });

    onDestroy(() => {
        clearShowDelay();
        clearHideBlurTimeout();
    });

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isVisible) {
            clearShowDelay();
            clearHideBlurTimeout();
            isVisible = false;
            triggerElement?.focus();
        }
    }

    function handleFocus() {
        clearShowDelay();
        clearHideBlurTimeout();
        if (!disabled && content) {
            isVisible = true;
        }
    }

    function handleBlur() {
        clearHideBlurTimeout();
        // Defer hide so brief focus moves within the trigger subtree do not flash the tooltip off.
        hideBlurTimeout = setTimeout(() => {
            hideBlurTimeout = null;
            isVisible = false;
        }, 100);
    }

    function handleMouseEnter() {
        clearShowDelay();
        clearHideBlurTimeout();
        if (!disabled && content) {
            if (delay > 0) {
                showDelayTimeout = setTimeout(() => {
                    showDelayTimeout = null;
                    isVisible = true;
                }, delay);
            } else {
                isVisible = true;
            }
        }
    }

    function handleMouseLeave() {
        clearShowDelay();
        clearHideBlurTimeout();
        isVisible = false;
    }
</script>

<svelte:window onkeydown={handleKeydown} />

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
    <div bind:this={triggerElement} id={triggerId}>
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
        --tooltip-bg: var(--color-base-800);
        --tooltip-color: var(--color-base-50);
        --tooltip-padding: 0.5rem 0.75rem;
        --tooltip-radius: 0.5rem;
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

    .tooltip-container[data-delay] .tooltip {
        transition-delay: calc(var(--tooltip-delay, 0) * 1ms);
    }

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

    @media (prefers-contrast: high) {
        :root {
            --tooltip-bg: CanvasText;
            --tooltip-color: Canvas;
            --tooltip-padding: 0.75rem 1rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .tooltip {
            transition:
                opacity 0.1s ease-in-out,
                visibility 0.1s ease-in-out;
        }

        .tooltip-container[data-placement="top"] .tooltip[data-visible="true"],
        .tooltip-container[data-placement="bottom"]
            .tooltip[data-visible="true"] {
            transform: translateX(-50%) !important;
        }

        .tooltip-container[data-placement="left"] .tooltip[data-visible="true"],
        .tooltip-container[data-placement="right"]
            .tooltip[data-visible="true"] {
            transform: translateY(-50%) !important;
        }
    }

    .tooltip-container:has(:focus-visible) {
        outline: none;
        box-shadow:
            0 0 0 2px var(--color-focus-ring-offset),
            0 0 0 4px var(--color-focus-ring);
        border-radius: var(--tooltip-radius);
    }
</style>
