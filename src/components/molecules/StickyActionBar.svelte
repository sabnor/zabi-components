<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { findScrollParent } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";
    import { watchKeyboardInset } from "../util/keyboard-inset.js";
    import { reserveScrollPaddingBottom } from "../util/scroll-padding.js";

    /**
     * Keeps a form's main button on screen: at the bottom of whatever
     * scrolls, and above the on-screen keyboard when that is up.
     *
     * Put it after the form's last field. It is sticky, not fixed, so it
     * keeps its place in the flow and the last field can always be scrolled
     * clear of it. A form shorter than the screen ends where its fields end,
     * and so would the bar: make the form a column as tall as the screen
     * (`flex min-h-full flex-col`) and the bar takes the bottom of it.
     *
     * ```svelte
     * <form class="flex min-h-full flex-col" onsubmit={save}>
     *     <div class="space-y-4 p-4">
     *         <Input label="Name" bind:value={name} />
     *         …
     *     </div>
     *     <StickyActionBar>
     *         <Button type="submit" size="lg" fullWidth>Save visit</Button>
     *     </StickyActionBar>
     * </form>
     * ```
     *
     * Where the keyboard covers the bottom of the page instead of shrinking
     * it (iOS Safari, Chrome on Android), the bar rises above it. The covered
     * part is read from `window.visualViewport`, and the bar is raised by as
     * much of its own scrolling box as the keyboard covers: the keyboard's
     * full height in a box that ends at the bottom of the screen, less in
     * one that ends above a tab bar or inside a sheet. It never leaves its
     * box. It takes a bottom margin of the same size, so the content gains
     * that much room to scroll, which a short form needs to bring its last
     * field above the keyboard. Where the page shrinks by itself, nothing is
     * done.
     *
     * While it is mounted the bar also sets `scroll-padding-bottom` on its
     * scrolling ancestor (or the page) to its own height plus that rise, so a
     * field that takes focus is brought into view above the bar, not under
     * it. Use one bar per scrolling box: two would both stick to the same
     * edge, one on top of the other.
     *
     * In an `AppShell`, a screen with a form is a task of its own: leave the
     * tab bar out (no `footer`) and let this bar be the bottom of the screen.
     * With a tab bar it sits directly above it.
     *
     * `UnsavedChangesBar` is the other bar at the bottom of a form. That one
     * appears only while there is something to save, announces itself, and
     * brings its own Save and Discard. This one is always there, holds the
     * buttons you give it, and follows the keyboard.
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "style"> & {
        /**
         * Accessible name. With it the bar is a group, so a screen reader
         * says what the buttons belong to; without it, it is a plain box.
         */
        label?: string;
        class?: string;
        /** Added after the offset and margin the bar sets while the keyboard is up. */
        style?: string;
        /** The main action, and at most one or two beside it. */
        children?: Snippet;
    };

    let { label, class: className = "", style = "", children, ...restProps }: Props = $props();

    let host: HTMLDivElement | undefined = $state();
    /** Height of the keyboard over the page, in px. 0 on the server and where the page shrinks by itself. */
    let keyboardInset = $state(0);
    /**
     * How far the bar is raised from the bottom of its scrolling box, in px.
     * Not the keyboard's height: only the part of this box the keyboard covers.
     */
    let lift = $state(0);

    $effect(() =>
        watchKeyboardInset((inset) => {
            keyboardInset = inset;
        }),
    );

    /**
     * The keyboard covers the screen from the bottom of the visual viewport
     * down. The bar has to rise by as much of its own scrolling box as lies
     * under that line: all of the keyboard's height when the box ends at the
     * bottom of the screen, less when it ends higher (above a tab bar, in a
     * sheet), nothing when it ends above the keyboard. It never leaves the
     * box: a box wholly under the keyboard keeps its bar at its own top.
     */
    $effect(() => {
        const bar = host;
        if (!bar || keyboardInset === 0) {
            lift = 0;
            return;
        }
        const container = findScrollParent(bar);
        const measure = () => {
            const viewport = window.visualViewport;
            if (!viewport) return;
            const keyboardTop = viewport.offsetTop + viewport.height;
            // Where the bar sticks: the box's content edge, inside its
            // border and its own bottom padding.
            const padding = container
                ? parseFloat(getComputedStyle(container).paddingBottom) || 0
                : 0;
            const boxBottom = container
                ? container.getBoundingClientRect().top +
                  container.clientTop +
                  container.clientHeight -
                  padding
                : document.documentElement.clientHeight;
            const boxHeight =
                (container ? container.clientHeight : document.documentElement.clientHeight) -
                padding;
            const room = Math.max(0, boxHeight - bar.getBoundingClientRect().height);
            lift = Math.round(Math.min(Math.max(boxBottom - keyboardTop, 0), room));
        };
        measure();
        // The box moves on the screen when the page scrolls or is resized.
        // Captured, so a scroll of any ancestor is heard.
        window.addEventListener("scroll", measure, { capture: true, passive: true });
        window.addEventListener("resize", measure);
        window.visualViewport?.addEventListener("resize", measure);
        window.visualViewport?.addEventListener("scroll", measure);
        // An overlay moves itself up over the keyboard, and its content with
        // it: the box then ends above the keyboard, and the bar is not raised
        // a second time. That move is heard here, whichever came first.
        const resized =
            container && typeof ResizeObserver === "function"
                ? new ResizeObserver(measure)
                : undefined;
        if (container) resized?.observe(container);
        return () => {
            resized?.disconnect();
            window.removeEventListener("scroll", measure, true);
            window.removeEventListener("resize", measure);
            window.visualViewport?.removeEventListener("resize", measure);
            window.visualViewport?.removeEventListener("scroll", measure);
        };
    });

    /**
     * The browser scrolls a focused field into view, to the edge of the
     * scroll container: under this bar, since it lies over that edge.
     */
    $effect(() => {
        const bar = host;
        if (!bar) return;
        const raised = lift;
        const container = findScrollParent(bar) ?? document.documentElement;
        const reservation = reserveScrollPaddingBottom(container);
        const reserve = () => {
            reservation.set(Math.ceil(bar.getBoundingClientRect().height) + raised);
        };
        reserve();
        const observer =
            typeof ResizeObserver === "function" ? new ResizeObserver(reserve) : undefined;
        observer?.observe(bar);
        return () => {
            observer?.disconnect();
            reservation.release();
        };
    });

    const keyboardOpen = $derived(keyboardInset > 0);
</script>

<!-- Nothing here takes focus by itself, and the bar never moves focus. -->
<div
    bind:this={host}
    role={label ? "group" : undefined}
    aria-label={label}
    data-keyboard-open={keyboardOpen ? "true" : undefined}
    class={cn(
        // `mt-auto`: in a column taller than its fields, the bar goes to the bottom.
        "sticky bottom-0 z-sticky mt-auto flex flex-wrap items-center justify-end gap-[8px] border-t border-border-weak bg-surface-elevated pt-3",
        "pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]",
        // The home indicator is under the keyboard while that is up.
        keyboardOpen ? "pb-3" : "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className,
    )}
    style="{lift > 0 ? `bottom: ${lift}px; margin-bottom: ${lift}px;` : ''} {style}"
    {...restProps}
>
    {@render children?.()}
</div>
