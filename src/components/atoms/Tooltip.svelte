<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { onDestroy } from "svelte";
    import { generateId } from "../util/ssr-safe.js";

    import { cn } from "../util/cn.js";
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
        content?: string;
        placement?: "top" | "bottom" | "left" | "right";
        delay?: number;
        disabled?: boolean;
        /**
         * Lay the trigger out as a full-width block instead of an inline-block.
         * A prop rather than a `class="block w-full"` override, because `block`
         * and `inline-block` are equal-specificity utilities: the winner would
         * be whichever Tailwind emits later, not whichever the caller passed.
         */
        block?: boolean;
        /**
         * Position the bubble against the viewport instead of the trigger's
         * offset parent. An absolutely-positioned tooltip cannot escape an
         * ancestor that scrolls: a collapsed sidebar rail sits inside an
         * `overflow-y-auto overflow-x-hidden` list, which clipped the bubble
         * at the rail edge and left only the arrow showing.
         */
        fixed?: boolean;
        class?: string;
        children?: Snippet;
    };

    /** First matching focusable inside the slot receives `aria-describedby` (wrapper div is skipped). */
    const FOCUSABLE_SELECTOR =
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    let {
        content = "",
        placement = "top",
        delay = 0,
        disabled = false,
        block = false,
        fixed = false,
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    let fixedStyle = $state("");

    /** Gap must match --tooltip-gap's default (0.5rem). */
    const FIXED_GAP = 8;

    function positionFixed(): void {
        if (!fixed || !triggerElement) return;
        const r = triggerElement.getBoundingClientRect();
        const coords = {
            top: [r.left + r.width / 2, r.top - FIXED_GAP],
            bottom: [r.left + r.width / 2, r.bottom + FIXED_GAP],
            left: [r.left - FIXED_GAP, r.top + r.height / 2],
            right: [r.right + FIXED_GAP, r.top + r.height / 2],
        }[placement];
        fixedStyle = `left:${coords[0]}px;top:${coords[1]}px;`;
    }

    $effect(() => {
        if (!fixed || !isVisible) return;
        positionFixed();
        const onMove = () => positionFixed();
        // `true` so ancestor scrolls (the nav list itself) are caught too.
        window.addEventListener("scroll", onMove, true);
        window.addEventListener("resize", onMove);
        return () => {
            window.removeEventListener("scroll", onMove, true);
            window.removeEventListener("resize", onMove);
        };
    });

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
        const describe = isVisible && content && !disabled ? tooltipId : null;
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
            // Keep focus on the described control; never steal it when the tooltip was hover-only.
            const target = triggerElement ? findDescribedTarget(triggerElement) : null;
            if (target && triggerElement?.contains(document.activeElement)) {
                target.focus();
            }
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
    class={cn(
        "tooltip-container relative",
        block ? "block w-full" : "inline-block",
        className,
    )}
    data-placement={placement}
    data-strategy={fixed ? "fixed" : "absolute"}
    data-disabled={disabled}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onfocusin={handleFocus}
    onfocusout={handleBlur}
    {...restProps}
>
    <div bind:this={triggerElement} id={triggerId} class={block ? "w-full" : undefined}>
        {@render children?.()}
    </div>

    {#if content && !disabled}
        <div
            id={tooltipId}
            class="tooltip pointer-events-none invisible absolute z-tooltip whitespace-normal wrap-break-word rounded-control bg-tooltip-bg px-3 py-2 text-sm leading-5 text-tooltip-fg opacity-0 transition-[opacity,visibility,transform] duration-200 ease-in-out"
            role="tooltip"
            aria-hidden={!isVisible}
            data-visible={isVisible}
            data-placement={placement}
            style={fixed ? fixedStyle : undefined}
        >
            {content}
        </div>
    {/if}
</div>

<style>
    /* Tunables (override on :root or any ancestor): --tooltip-max-width, --tooltip-gap, --tooltip-arrow-size. Defaults live in the var() fallbacks. */
    /* max-width: policy forbids max-w-* utilities on packaged atoms; variable used by sm: override */
    .tooltip {
        width: max-content;
        max-width: var(--tooltip-max-width, min(24rem, calc(100vw - 2rem)));
    }

    .tooltip-container[data-placement="top"] .tooltip {
        inset-block-end: 100%;
        inset-inline-start: 50%;
        transform: translateX(-50%) translateY(4px) scale(0.95);
        margin-block-end: var(--tooltip-gap, 0.5rem);
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
        margin-block-start: var(--tooltip-gap, 0.5rem);
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
        margin-inline-end: var(--tooltip-gap, 0.5rem);
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
        margin-inline-start: var(--tooltip-gap, 0.5rem);
    }

    .tooltip-container[data-placement="right"] .tooltip[data-visible="true"] {
        opacity: 1;
        visibility: visible;
        transform: translateY(-50%) translateX(0) scale(1);
    }

    /* Fixed strategy: the bubble is placed against the viewport from the
       trigger's rect, so a scrolling ancestor cannot clip it. Insets and
       margins are reset; the transforms above still do the centring. */
    .tooltip-container[data-strategy="fixed"] .tooltip {
        position: fixed;
        inset: auto;
        margin: 0;
    }

    .tooltip::before {
        content: "";
        position: absolute;
        width: calc(var(--tooltip-arrow-size, 4px) * 2);
        height: calc(var(--tooltip-arrow-size, 4px) * 2);
        background-color: var(--color-tooltip-bg);
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

    @media (max-width: 640px) {
        .tooltip {
            --tooltip-max-width: calc(100vw - 2rem);
            inset-inline-start: 50% !important;
            inset-inline-end: auto !important;
            transform: translateX(-50%) scale(0.95) !important;
            margin: var(--tooltip-gap, 0.5rem) 0 !important;
        }

        .tooltip[data-visible="true"] {
            transform: translateX(-50%) scale(1) !important;
        }

        .tooltip::before {
            display: none;
        }
    }

    @media (prefers-contrast: high) {
        .tooltip {
            padding: 0.75rem 1rem;
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
        border-radius: 0.5rem;
    }
</style>
