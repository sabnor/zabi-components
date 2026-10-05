<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { onDestroy, untrack } from "svelte";
    import { generateId } from "../util/ssr-safe.js";
    import { claimOpenTooltip, releaseOpenTooltip } from "../util/tooltip.js";
    import {
        insideTriangle,
        pickSide,
        shiftIntoViewport,
        type FloatingSide,
    } from "../util/viewport-fit.js";

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
        /**
         * On a touch screen a tap on the trigger opens the tooltip, and the
         * trigger still does what it does. It stays until a second tap, a tap
         * elsewhere, Escape, scrolling or focus leaving: the tap also puts
         * focus on the trigger, and a tooltip that went by itself while its
         * trigger still had focus would be gone before it was read. Give a
         * number of milliseconds to have it close by itself after that long
         * as well, for a button whose tooltip is in the way of what the tap
         * did. A mouse and a keyboard are not affected.
         */
        touchDuration?: number;
        class?: string;
        children?: Snippet;
    };

    /** First matching focusable inside the slot receives `aria-describedby` (wrapper div is skipped). */
    const FOCUSABLE_SELECTOR =
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    /**
     * With nothing focusable in the slot, the first control of any kind is
     * described instead: a disabled button is where a tooltip most often says
     * something that matters (why it is disabled). It cannot take focus, so
     * the keyboard never opens that tooltip: `aria-disabled="true"` on a
     * button that stays focusable is the pattern that reaches everyone.
     */
    const CONTROL_SELECTOR = 'button, a[href], input, select, textarea, [role="button"], [tabindex]';

    let {
        content = "",
        placement = "top",
        delay = 0,
        disabled = false,
        block = false,
        fixed = false,
        touchDuration = 0,
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    let fixedStyle = $state("");

    /** Gap must match --tooltip-gap's default (0.5rem). */
    const FIXED_GAP = 8;
    /** How close to the edge of the viewport the bubble may come, in px. */
    const EDGE_MARGIN = 8;

    /**
     * The side the bubble is on when that is not `placement`: there was no
     * room there, or the screen is too narrow to put anything beside the
     * trigger. Decided each time the tooltip opens.
     */
    let flippedTo = $state<FloatingSide | null>(null);
    const side = $derived(flippedTo ?? placement);
    /** How far the bubble is moved along its side to stay on screen, in px. */
    let shift = $state({ x: 0, y: 0 });
    /** The arrow moves back by as much, so it still points at the trigger. */
    let arrowShift = $state({ x: 0, y: 0 });

    function positionFixed(): void {
        if (!fixed || !triggerElement) return;
        const r = triggerElement.getBoundingClientRect();
        // The styles centre the bubble on the cross axis only. Above and to
        // the left it also has to clear the trigger by its own size, or it
        // lies over it: `left` and `top` are where its near corner goes.
        const width = bubbleElement?.offsetWidth ?? 0;
        const height = bubbleElement?.offsetHeight ?? 0;
        const coords = {
            top: [r.left + r.width / 2, r.top - FIXED_GAP - height],
            bottom: [r.left + r.width / 2, r.bottom + FIXED_GAP],
            left: [r.left - FIXED_GAP - width, r.top + r.height / 2],
            right: [r.right + FIXED_GAP, r.top + r.height / 2],
        }[side];
        fixedStyle = `left:${coords[0]}px;top:${coords[1]}px;`;
    }

    /**
     * Picks the side and the shift that keep the bubble in the viewport. It is
     * worked out from the trigger's rectangle and the bubble's size, not from
     * where the bubble is drawn: that is mid-transition when this runs.
     */
    function fitToViewport(): void {
        const trigger = triggerElement;
        const bubble = bubbleElement;
        if (!trigger || !bubble) return;
        const width = bubble.offsetWidth;
        const height = bubble.offsetHeight;
        // No layout (a test DOM, a hidden subtree): nothing to fit.
        if (!width || !height) return;
        const root = document.documentElement;
        const viewport = {
            width: root.clientWidth || window.innerWidth,
            height: root.clientHeight || window.innerHeight,
        };
        const r = trigger.getBoundingClientRect();
        // Below 640px nothing fits beside a trigger: above it, or below.
        const narrow =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(max-width: 640px)").matches;
        const preferred: FloatingSide =
            narrow && (placement === "left" || placement === "right") ? "top" : placement;
        // `left` and `right` are the start and the end side in the styles
        // below, so in a right-to-left page they are the other way round on
        // screen. The fixed strategy places by `left` and `top` and is not.
        const mirrored = !fixed && getComputedStyle(trigger).direction === "rtl";
        isMirrored = mirrored;
        const onScreen = (name: FloatingSide): FloatingSide =>
            mirrored && name === "left" ? "right" : mirrored && name === "right" ? "left" : name;
        const next = pickSide(onScreen(preferred), r, { width, height }, viewport, {
            gap: FIXED_GAP,
            margin: EDGE_MARGIN,
        });
        // Back to the name the styles know it by.
        const named = onScreen(next);
        flippedTo = named === placement ? null : named;

        const centreX = r.left + r.width / 2;
        const centreY = r.top + r.height / 2;
        const [left, top] = {
            top: [centreX - width / 2, r.top - FIXED_GAP - height],
            bottom: [centreX - width / 2, r.bottom + FIXED_GAP],
            left: [r.left - FIXED_GAP - width, centreY - height / 2],
            right: [r.right + FIXED_GAP, centreY - height / 2],
        }[next];
        const move = shiftIntoViewport(
            { left, top, right: left + width, bottom: top + height },
            viewport,
            EDGE_MARGIN,
        );
        // Rounded, so a sub-pixel difference does not blur the text.
        const x = Math.round(move.x);
        const y = Math.round(move.y);
        if (x !== shift.x || y !== shift.y) shift = { x, y };
        // The arrow stays on the bubble: 12px clear of its corners.
        const reach = (extent: number) => Math.max(0, extent / 2 - 12);
        const vertical = next === "top" || next === "bottom";
        const arrowX = vertical ? -Math.max(-reach(width), Math.min(reach(width), x)) : 0;
        const arrowY = vertical ? 0 : -Math.max(-reach(height), Math.min(reach(height), y));
        if (arrowX !== arrowShift.x || arrowY !== arrowShift.y) {
            arrowShift = { x: arrowX, y: arrowY };
        }
    }

    $effect(() => {
        if (!isVisible) return;
        untrack(fitToViewport);
        const onMove = () => fitToViewport();
        window.addEventListener("scroll", onMove, true);
        window.addEventListener("resize", onMove);
        return () => {
            window.removeEventListener("scroll", onMove, true);
            window.removeEventListener("resize", onMove);
        };
    });

    const bubbleStyle = $derived(
        (fixed ? fixedStyle : "") +
            (shift.x || shift.y ? `translate:${shift.x}px ${shift.y}px;` : "") +
            (arrowShift.x || arrowShift.y
                ? `--tooltip-arrow-shift:${arrowShift.x}px ${arrowShift.y}px;`
                : ""),
    );

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
    let containerElement: HTMLElement | null = $state(null);
    let triggerElement: HTMLElement | null = $state(null);
    let bubbleElement: HTMLElement | null = $state(null);
    let showDelayTimeout: ReturnType<typeof setTimeout> | null = null;
    let hideBlurTimeout: ReturnType<typeof setTimeout> | null = null;

    /**
     * A hidden bubble still takes part in layout, and one that reaches past
     * the right edge of a 320px screen makes the whole page scroll sideways.
     * While it is closed it is parked in the corner of the viewport, where it
     * widens nothing; it is parked once it has faded out, not before.
     */
    let parked = $state(true);
    let parkTimeout: ReturnType<typeof setTimeout> | null = null;
    /** Longer than the 200ms fade. */
    const PARK_AFTER = 250;

    /** The pointer that last touched the trigger: "mouse", "touch" or "pen". */
    let lastPointerType = "";
    /** When a finger last went down on, or came up from, the trigger. */
    let touchedAt = 0;
    /** Open because of a tap: closes on a tap elsewhere, on scroll, and after `touchDuration`. */
    let openedByTouch = $state(false);
    let touchHideTimeout: ReturnType<typeof setTimeout> | null = null;
    /** A tap also focuses the trigger; for this long that focus is the tap's, not new input. */
    const TOUCH_ECHO = 700;
    /** True while a mouse is over the trigger, the bubble or the gap between them. */
    let hovering = false;
    /** The finger that is down on the trigger, and where it went down. */
    let touchStart: { id: number; x: number; y: number } | null = null;
    /** Further than this, in px, and it was a drag, not a tap. */
    const TAP_SLOP = 10;

    function clearTouchHide(): void {
        if (touchHideTimeout !== null) {
            clearTimeout(touchHideTimeout);
            touchHideTimeout = null;
        }
    }

    /** True in a right-to-left page, where the start side is the right: the side arrows turn round. */
    let isMirrored = $state(false);

    function show(): void {
        stopCrossing();
        // One at a time: the tooltip that was open closes.
        claimOpenTooltip(hide);
        if (parkTimeout !== null) {
            clearTimeout(parkTimeout);
            parkTimeout = null;
        }
        // Placed before it is let out of the corner: laid out where the styles
        // alone put it, a bubble near the edge would widen the page for a
        // moment, and in a right-to-left page that moves what is under the finger.
        if (!isVisible) fitToViewport();
        parked = false;
        isVisible = true;
    }

    function hide(): void {
        clearTouchHide();
        stopCrossing();
        openedByTouch = false;
        releaseOpenTooltip(hide);
        if (!isVisible) return;
        isVisible = false;
        if (parkTimeout !== null) clearTimeout(parkTimeout);
        parkTimeout = setTimeout(() => {
            parkTimeout = null;
            parked = true;
            flippedTo = null;
            shift = { x: 0, y: 0 };
            arrowShift = { x: 0, y: 0 };
        }, PARK_AFTER);
    }

    const isTouch = (type: string) => type === "touch" || type === "pen";
    const afterTouch = () => isTouch(lastPointerType) && Date.now() - touchedAt < TOUCH_ECHO;

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
        const found =
            root.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ??
            root.querySelector<HTMLElement>(CONTROL_SELECTOR);
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
            // Switched off while open: closed, and no longer listening for a tap elsewhere.
            untrack(hide);
        }
    });

    onDestroy(() => {
        stopCrossing();
        releaseOpenTooltip(hide);
        clearShowDelay();
        clearHideBlurTimeout();
        clearTouchHide();
        if (parkTimeout !== null) clearTimeout(parkTimeout);
    });

    // A tooltip opened by a tap has no hover to end and, where a tap does not
    // focus a button (Safari), no blur either: a tap anywhere else closes it,
    // and so does scrolling, which would otherwise carry it over other content.
    $effect(() => {
        if (!isVisible || !openedByTouch) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!containerElement?.contains(event.target as Node | null)) hide();
        };
        const onScroll = () => hide();
        document.addEventListener("pointerdown", onPointerDown, true);
        window.addEventListener("scroll", onScroll, true);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown, true);
            window.removeEventListener("scroll", onScroll, true);
        };
    });

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isVisible) {
            // Capture phase, and marked as handled: the first Escape dismisses
            // the tooltip only, not the modal or menu it sits in (WCAG 1.4.13).
            event.preventDefault();
            clearShowDelay();
            clearHideBlurTimeout();
            hide();
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
        // The focus a tap gives the trigger: the tap has already opened or closed it.
        if (afterTouch()) return;
        if (!disabled && content) {
            show();
        }
    }

    function handleBlur() {
        clearHideBlurTimeout();
        // Defer hide so brief focus moves within the trigger subtree do not flash the tooltip off.
        hideBlurTimeout = setTimeout(() => {
            hideBlurTimeout = null;
            // A press on the bubble itself (to select its text) takes focus
            // off the trigger. The pointer is still on the tooltip: it stays,
            // and leaving it, a press elsewhere or Escape closes it.
            if (hovering || containerElement?.contains(document.activeElement)) return;
            hide();
        }, 100);
    }

    function handleMouseEnter() {
        // The mouse events a browser makes up after a tap. Opening here would
        // undo a tap that closed the tooltip, and on iOS a hover handler that
        // shows something makes the first tap a hover and drops its click.
        if (isTouch(lastPointerType)) return;
        hovering = true;
        stopCrossing();
        clearShowDelay();
        clearHideBlurTimeout();
        if (!disabled && content) {
            if (delay > 0) {
                showDelayTimeout = setTimeout(() => {
                    showDelayTimeout = null;
                    show();
                }, delay);
            } else {
                show();
            }
        }
    }

    /** Stops watching a pointer that is on its way from the trigger to the bubble. */
    let stopCrossing: () => void = () => {};
    /** A pointer that has stopped short of the bubble is given this long without moving, in ms. */
    const CROSSING_TIME = 300;

    /**
     * The pointer has left the tooltip. Straight across the gap it never
     * does, but from a small trigger to the far corner of a wide bubble the
     * way is diagonal and leaves through the side. While it stays in the
     * triangle between where it left and the near edge of the bubble it is
     * still coming, and the tooltip waits: until it arrives, strays, or stops.
     */
    function handleMouseLeave(event: MouseEvent) {
        hovering = false;
        if (isTouch(lastPointerType)) return;
        clearShowDelay();
        clearHideBlurTimeout();
        const box = isVisible ? bubbleElement?.getBoundingClientRect() : undefined;
        // No bubble on screen (or no layout to measure): nothing to cross to.
        if (!box || box.width === 0 || box.height === 0) {
            hide();
            return;
        }
        const left = { x: event.clientX, y: event.clientY };
        // The edge of the bubble that faces the trigger, a little wider than it is.
        const reach = 4;
        const [near, far] = {
            top: [
                { x: box.left - reach, y: box.bottom },
                { x: box.right + reach, y: box.bottom },
            ],
            bottom: [
                { x: box.left - reach, y: box.top },
                { x: box.right + reach, y: box.top },
            ],
            left: [
                { x: box.right, y: box.top - reach },
                { x: box.right, y: box.bottom + reach },
            ],
            right: [
                { x: box.left, y: box.top - reach },
                { x: box.left, y: box.bottom + reach },
            ],
        }[
            // On screen: the start side is the right in a right-to-left page.
            isMirrored && side === "left" ? "right" : isMirrored && side === "right" ? "left" : side
        ];
        stopCrossing();
        let timer = setTimeout(hide, CROSSING_TIME);
        const onMove = (move: MouseEvent) => {
            if (insideTriangle({ x: move.clientX, y: move.clientY }, left, near, far)) {
                // Still coming: the wait starts again.
                clearTimeout(timer);
                timer = setTimeout(hide, CROSSING_TIME);
                return;
            }
            // Not on the way: unless it has arrived, which `mouseenter` says.
            if (containerElement?.contains(move.target as Node | null)) return;
            hide();
        };
        document.addEventListener("mousemove", onMove, true);
        stopCrossing = () => {
            clearTimeout(timer);
            document.removeEventListener("mousemove", onMove, true);
            stopCrossing = () => {};
        };
    }

    /** Which kind of pointer is over the trigger; a mouse arriving after a finger counts again. */
    function handlePointerEnter(event: PointerEvent) {
        lastPointerType = event.pointerType;
    }

    /**
     * A tap of a finger or a pen on the trigger toggles the tooltip: when the
     * finger comes up where it went down, not when it goes down. A finger
     * that goes down to scroll the page would otherwise open the tooltip and
     * close it again as the scroll began. Nothing is prevented: the tap goes
     * on to become the trigger's own click.
     */
    function handlePointerDown(event: PointerEvent) {
        lastPointerType = event.pointerType;
        if (!isTouch(event.pointerType)) return;
        touchedAt = Date.now();
        // On the bubble itself: neither a tap on the trigger nor one elsewhere.
        if (bubbleElement?.contains(event.target as Node | null)) {
            touchStart = null;
            // It may take focus off the trigger; the tooltip stays, and from
            // here on a tap elsewhere or scrolling is what closes it.
            clearHideBlurTimeout();
            hovering = true;
            if (isVisible) openedByTouch = true;
            return;
        }
        hovering = false;
        touchStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
    }

    function handlePointerUp(event: PointerEvent) {
        if (!isTouch(event.pointerType)) return;
        touchedAt = Date.now();
        const start = touchStart;
        touchStart = null;
        if (!start || start.id !== event.pointerId) return;
        if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > TAP_SLOP) return;
        clearShowDelay();
        clearHideBlurTimeout();
        if (isVisible) {
            hide();
            return;
        }
        if (disabled || !content) return;
        show();
        openedByTouch = true;
        clearTouchHide();
        if (touchDuration > 0) {
            touchHideTimeout = setTimeout(() => {
                touchHideTimeout = null;
                hide();
            }, touchDuration);
        }
    }

    /** The browser took the touch for itself: to scroll, most often. */
    function handlePointerCancel() {
        touchStart = null;
    }
</script>

<svelte:window onkeydowncapture={handleKeydown} />

<div
    class={cn(
        "tooltip-container relative",
        block ? "block w-full" : "inline-block",
        className,
    )}
    bind:this={containerElement}
    data-placement={side}
    data-strategy={fixed ? "fixed" : "absolute"}
    data-mirrored={isMirrored ? "true" : undefined}
    data-disabled={disabled}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onpointerenter={handlePointerEnter}
    onpointerdown={handlePointerDown}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerCancel}
    onfocusin={handleFocus}
    onfocusout={handleBlur}
    {...restProps}
>
    <div bind:this={triggerElement} id={triggerId} class={block ? "w-full" : undefined}>
        {@render children?.()}
    </div>

    {#if content && !disabled}
        <div
            bind:this={bubbleElement}
            id={tooltipId}
            class="tooltip pointer-events-none invisible absolute z-tooltip whitespace-normal wrap-break-word rounded-control bg-tooltip-bg px-3 py-2 text-sm leading-5 text-tooltip-fg opacity-0 transition-[opacity,visibility,transform] duration-200 ease-in-out"
            role="tooltip"
            aria-hidden={!isVisible}
            data-visible={isVisible}
            data-parked={parked}
            data-placement={side}
            style={bubbleStyle || undefined}
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

    /* Centred over the trigger with `left`, not `inset-inline-start`: the
       shift back by half is to the left whichever way the text runs. */
    .tooltip-container[data-placement="top"] .tooltip {
        inset-block-end: 100%;
        left: 50%;
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
        left: 50%;
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

    /* Closed and faded out: parked in the corner of the viewport, so a bubble
       that would reach past the edge of a narrow screen does not widen the
       page while nobody can see it. The selector outweighs the placement
       rules, the fixed strategy and the narrow-screen rules below. */
    .tooltip-container[data-strategy] .tooltip[data-parked="true"] {
        position: fixed !important;
        inset-block: 0 auto !important;
        inset-inline: 0 auto !important;
        margin: 0 !important;
    }

    /* Open, the bubble can be pointed at, so the pointer can move onto it and
       its text can be selected (WCAG 1.4.13). The strip behind it covers the
       gap to the trigger: the pointer never leaves the tooltip on the way
       across. Closed or fading, neither takes the pointer. */
    .tooltip[data-visible="true"] {
        pointer-events: auto;
    }

    .tooltip::after {
        content: "";
        position: absolute;
        pointer-events: none;
    }

    .tooltip[data-visible="true"]::after {
        pointer-events: auto;
    }

    .tooltip-container[data-placement="top"] .tooltip::after {
        inset-inline: 0;
        inset-block-start: 100%;
        height: var(--tooltip-gap, 0.5rem);
    }

    .tooltip-container[data-placement="bottom"] .tooltip::after {
        inset-inline: 0;
        inset-block-end: 100%;
        height: var(--tooltip-gap, 0.5rem);
    }

    .tooltip-container[data-placement="left"] .tooltip::after {
        inset-block: 0;
        inset-inline-start: 100%;
        width: var(--tooltip-gap, 0.5rem);
    }

    .tooltip-container[data-placement="right"] .tooltip::after {
        inset-block: 0;
        inset-inline-end: 100%;
        width: var(--tooltip-gap, 0.5rem);
    }

    /* The fixed strategy places the bubble by `left` and `top`, so in a
       right-to-left page it is still on the side it is named after: the strip
       is on the physical side, not the logical one. */
    .tooltip-container[data-strategy="fixed"][data-placement="left"] .tooltip::after {
        right: auto;
        left: 100%;
    }

    .tooltip-container[data-strategy="fixed"][data-placement="right"] .tooltip::after {
        right: 100%;
        left: auto;
    }

    .tooltip::before {
        content: "";
        position: absolute;
        width: calc(var(--tooltip-arrow-size, 4px) * 2);
        height: calc(var(--tooltip-arrow-size, 4px) * 2);
        background-color: var(--color-tooltip-bg);
        /* Set when the bubble was moved to stay on screen: the arrow moves back. */
        translate: var(--tooltip-arrow-shift, 0px 0px);
    }

    .tooltip-container[data-placement="top"] .tooltip::before {
        inset-block-start: 100%;
        left: 50%;
        transform: translateX(-50%);
        clip-path: polygon(50% 100%, 0 0, 100% 0);
    }

    .tooltip-container[data-placement="bottom"] .tooltip::before {
        inset-block-end: 100%;
        left: 50%;
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

    /* In a right-to-left page `left` is the start side, which is the right:
       the bubble is on the other side of the trigger, and so is the arrow,
       which has to point the other way too. */
    .tooltip-container[data-mirrored="true"][data-placement="left"] .tooltip::before {
        clip-path: polygon(0 50%, 100% 0, 100% 100%);
    }

    .tooltip-container[data-mirrored="true"][data-placement="right"] .tooltip::before {
        clip-path: polygon(0 0, 100% 50%, 0 100%);
    }

    /* As for the strip above: the fixed strategy is not mirrored, so its
       arrow is on the physical side that faces the trigger. */
    .tooltip-container[data-strategy="fixed"][data-placement="left"] .tooltip::before {
        right: auto;
        left: 100%;
    }

    .tooltip-container[data-strategy="fixed"][data-placement="right"] .tooltip::before {
        right: 100%;
        left: auto;
    }

    @media (max-width: 640px) {
        .tooltip {
            --tooltip-max-width: calc(100vw - 2rem);
        }

        /* Not the fixed strategy: its bubble is placed by inline left and top,
           which an !important inset would override. */
        .tooltip-container:not([data-strategy="fixed"]) .tooltip {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) scale(0.95) !important;
            margin: var(--tooltip-gap, 0.5rem) 0 !important;
        }

        .tooltip-container:not([data-strategy="fixed"]) .tooltip[data-visible="true"] {
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

    /* Forced colours repaint the fill as the page's own canvas, and the
       bubble has no border: without an edge its text lies loose over the
       content under it. An outline takes no room, so nothing moves. */
    @media (forced-colors: active) {
        .tooltip {
            outline: 1px solid CanvasText;
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
