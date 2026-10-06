<script lang="ts">
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import ArrowDown from "@lucide/svelte/icons/arrow-down";
    import Spinner from "../atoms/Spinner.svelte";
    import { cn } from "../util/cn.js";
    import {
        DEFAULT_PULL_TO_REFRESH_STRINGS,
        pullDistance,
        scrollContainerOf,
        type PullToRefreshStrings,
    } from "../util/pull-to-refresh.js";
    import { DRAG_SLOP, prefersReducedMotion } from "../util/sheet-drag.js";

    /**
     * A list that reloads when it is pulled down from its top, on a touch
     * screen.
     *
     * The pull is a shortcut. The same refresh is a button at the top of the
     * region, out of sight until keyboard focus reaches it, and named for a
     * screen reader; "Refreshing" and "Updated" are announced, and the
     * region is `aria-busy` meanwhile.
     *
     * It only acts while what scrolls the list (the page, or the nearest
     * scrolling ancestor, such as the content of an `AppShell`) is at its
     * top, and never takes an ordinary scroll. The indicator is in the flow
     * of the region, above the list, so under an app bar it comes out below
     * the bar.
     *
     * ```svelte
     * <PullToRefresh onrefresh={() => loadRounds()}>
     *     <List items={rounds} />
     * </PullToRefresh>
     * ```
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "children" | "aria-busy"> & {
        /**
         * Reloads the list. Return the promise: the indicator stays until it
         * settles. A promise that rejects ends the refresh too, and nothing
         * is announced as updated; say what went wrong yourself.
         */
        onrefresh?: () => Promise<void> | void;
        /** Whether a refresh is running. Bindable: set it to show the indicator for a refresh of your own. */
        refreshing?: boolean;
        /** No pull and no button. */
        disabled?: boolean;
        /** How far the indicator has to come out for letting go to refresh, in px. */
        threshold?: number;
        /**
         * The button that refreshes without the gesture. Without it the pull
         * is the only way this component offers, and the app has to give
         * another (WCAG 2.5.1).
         */
        showButton?: boolean;
        /** The words the component says by itself, for another language. */
        strings?: Partial<PullToRefreshStrings>;
        class?: string;
        /** The list. */
        children?: Snippet;
    };

    let {
        onrefresh,
        refreshing = $bindable<Exclude<Props["refreshing"], undefined>>(),
        disabled = false,
        threshold = 64,
        showButton = true,
        strings,
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop (see Collapsible): the default is applied here.
    const applyDefaults = () => {
        if (refreshing === undefined) refreshing = false;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("pullToRefresh");
    const text = $derived({ ...DEFAULT_PULL_TO_REFRESH_STRINGS, ...provided(), ...strings });

    let root = $state<HTMLDivElement>();
    /** How far the indicator is out under a finger, in px; null when no pull is going on. */
    let pulled = $state<number | null>(null);
    /** What the status region says. It is in the page, empty, before anything is said. */
    let status = $state("");
    /** Set when a refresh of this component's own failed: nothing was updated. */
    let failed = false;

    const armed = $derived(pulled !== null && pulled >= threshold);

    async function refresh() {
        if (disabled || refreshing) return;
        failed = false;
        refreshing = true;
        try {
            await onrefresh?.();
        } catch {
            // The app's to report (see `onrefresh`). The refresh is over all the same.
            failed = true;
        } finally {
            refreshing = false;
        }
    }

    // The announcements follow `refreshing`, whoever set it.
    let wasRefreshing = false;
    $effect(() => {
        const now = !!refreshing;
        if (now === wasRefreshing) return;
        wasRefreshing = now;
        status = now ? text.refreshing : failed ? "" : text.done;
    });

    // The browser's own pull-to-refresh must not fire as well: that is a
    // property of what scrolls, which is not this element.
    $effect(() => {
        const element = root;
        if (!element || disabled) return;
        const scroller = scrollContainerOf(element);
        const before = scroller.style.overscrollBehaviorY;
        scroller.style.overscrollBehaviorY = "contain";
        return () => {
            scroller.style.overscrollBehaviorY = before;
        };
    });

    // --- The pull. Touch events, because the browser owns the gesture (it
    // scrolls) until it is taken, and only a touch listener that is not
    // passive can take it. A mouse does not pull.
    $effect(() => {
        const element = root;
        if (!element || disabled) return;
        const scroller = scrollContainerOf(element);
        let touchId: number | null = null;
        let startX = 0;
        let startY = 0;
        let pulling = false;

        const find = (list: TouchList) => Array.from(list).find((touch) => touch.identifier === touchId);

        function onTouchStart(event: TouchEvent) {
            if (touchId !== null || event.touches.length !== 1 || refreshing) return;
            if (scroller.scrollTop > 0) return;
            const touch = event.touches[0];
            touchId = touch.identifier;
            startX = touch.clientX;
            startY = touch.clientY;
            pulling = false;
        }

        function onTouchMove(event: TouchEvent) {
            const touch = find(event.touches);
            if (!touch) return;
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;
            if (!pulling) {
                // Scrolled since, upwards, or sideways: not a pull.
                if (scroller.scrollTop > 0 || dy < DRAG_SLOP) return;
                if (Math.abs(dx) > Math.abs(dy)) {
                    touchId = null;
                    return;
                }
                pulling = true;
                // Measured from where the pull was recognised.
                startY = touch.clientY;
            }
            if (event.cancelable) event.preventDefault();
            pulled = pullDistance(touch.clientY - startY, threshold);
        }

        function finish(event: TouchEvent, cancelled: boolean) {
            if (!find(event.changedTouches)) return;
            touchId = null;
            const far = pulling && !cancelled && pulled !== null && pulled >= threshold;
            pulling = false;
            pulled = null;
            if (far) void refresh();
        }

        const onTouchEnd = (event: TouchEvent) => finish(event, false);
        const onTouchCancel = (event: TouchEvent) => finish(event, true);

        element.addEventListener("touchstart", onTouchStart, { passive: true });
        element.addEventListener("touchmove", onTouchMove, { passive: false });
        element.addEventListener("touchend", onTouchEnd);
        element.addEventListener("touchcancel", onTouchCancel);
        return () => {
            element.removeEventListener("touchstart", onTouchStart);
            element.removeEventListener("touchmove", onTouchMove);
            element.removeEventListener("touchend", onTouchEnd);
            element.removeEventListener("touchcancel", onTouchCancel);
        };
    });

    /**
     * The height of the indicator: under the finger while pulling, at the
     * threshold while the refresh runs. Where motion is unwanted it does not
     * follow the finger: it is there, at full height, or it is not.
     */
    const indicatorHeight = $derived.by(() => {
        if (refreshing) return threshold;
        if (pulled === null) return 0;
        return prefersReducedMotion() ? (pulled > 0 ? threshold : 0) : pulled;
    });
</script>

<div
    {...restProps}
    bind:this={root}
    class={cn("relative", className)}
    aria-busy={refreshing ? "true" : undefined}
    data-pull-to-refresh
    data-refreshing={refreshing ? "true" : "false"}
>
    <!-- In the page before it says anything, or the first announcement is lost. -->
    <div class="sr-only" role="status" aria-live="polite" data-pull-status>{status}</div>

    {#if showButton && !disabled}
        <!-- Out of sight until keyboard focus reaches it: the list is what the region is for. -->
        <button
            type="button"
            class="focus-ring sr-only cursor-pointer rounded-control bg-action-secondary text-sm font-medium text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active focus-visible:not-sr-only focus-visible:absolute focus-visible:start-[8px] focus-visible:top-[8px] focus-visible:z-10 focus-visible:min-h-11 focus-visible:px-[16px]"
            aria-disabled={refreshing ? "true" : undefined}
            data-pull-button
            onclick={() => void refresh()}
        >
            {text.refresh}
        </button>
    {/if}

    <!-- Decorative: the status region and the button carry it for assistive technology. -->
    <div
        class={cn(
            "flex items-end justify-center overflow-hidden text-sm text-description",
            pulled === null && "transition-[height] duration-200 ease-out motion-reduce:transition-none",
        )}
        style:height="{indicatorHeight}px"
        aria-hidden="true"
        data-pull-indicator
        data-armed={armed ? "true" : "false"}
    >
        <div class="flex h-[64px] shrink-0 items-center gap-[8px]">
            {#if refreshing}
                <Spinner size="md" />
                <span>{text.refreshing}</span>
            {:else}
                <ArrowDown
                    size={16}
                    class={cn("transition-transform duration-150 motion-reduce:transition-none", armed && "rotate-180")}
                />
                <span>{armed ? text.release : text.pull}</span>
            {/if}
        </div>
    </div>

    {@render children?.()}
</div>
