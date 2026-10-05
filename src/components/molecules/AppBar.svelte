<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import ArrowLeft from "@lucide/svelte/icons/arrow-left";
    import { findScrollParent } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";

    /**
     * The bar at the top of a phone screen: where you are, the way back, and
     * at most two things to do here.
     *
     * ```svelte
     * <AppBar title="Round 3" backHref="/quiz" collapseOnScroll>
     *     {#snippet actions()}
     *         <IconButton variant="ghost" size="lg" label="Share">
     *             <Share2 size={20} />
     *         </IconButton>
     *     {/snippet}
     * </AppBar>
     * ```
     */
    type Props = Omit<HTMLAttributes<HTMLElement>, "class" | "title"> & {
        /** The name of the screen, as a heading. */
        title?: string;
        /** Heading level of the title. 1 when the bar names the page. */
        headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
        /** Shows the back control as a link to this address. */
        backHref?: string;
        /**
         * Called when the back control is activated. On its own it makes the
         * control a button; with `backHref` it runs before the link is
         * followed, and `event.preventDefault()` stops that.
         */
        onback?: (event: MouseEvent) => void;
        /** Accessible name of the back control. */
        backLabel?: string;
        /**
         * Hides the bar while the page scrolls down and brings it back as
         * soon as it scrolls up. It follows the nearest scrolling ancestor
         * (the one in `AppShell`), or the window. The bar never hides while
         * keyboard focus is inside it, and focus arriving from the keyboard
         * brings it back. Focus left behind by a tap or a click does not hold
         * it: it hides as usual, and the next key press brings it back.
         */
        collapseOnScroll?: boolean;
        /** Before the title, after the back control: a logo, an avatar. */
        leading?: Snippet;
        /**
         * After the title. At most two icon buttons, at `size="lg"` so each is
         * a 48px target; put anything more in a menu.
         */
        actions?: Snippet;
        class?: string;
    };

    let {
        title = "",
        headingLevel = 1,
        backHref,
        onback,
        backLabel = "Back",
        collapseOnScroll = false,
        leading,
        actions,
        class: className = "",
        ...restProps
    }: Props = $props();

    let host: HTMLElement | undefined = $state();
    /** Scrolled out of view. Only ever true with `collapseOnScroll`. */
    let scrolledAway = $state(false);
    const collapsed = $derived(collapseOnScroll && scrolledAway);

    /** Scrolling less than this in one direction does not move the bar. */
    const SCROLL_TOLERANCE = 8;

    $effect(() => {
        if (!collapseOnScroll || !host) return;
        const bar = host;
        const parent = findScrollParent(bar);
        const target: HTMLElement | Window = parent ?? window;
        const position = () => (parent ? parent.scrollTop : window.scrollY);
        const end = () =>
            parent
                ? parent.scrollHeight - parent.clientHeight
                : document.documentElement.scrollHeight - window.innerHeight;
        // Rubber-banding past either end reports positions outside the range.
        const clamped = () => Math.min(Math.max(0, position()), Math.max(0, end()));

        /**
         * Whether the focus inside the bar is there for the keyboard. Only
         * that holds the bar: after a tap on an action the button stays
         * focused for as long as the user reads on, and a bar held by it
         * would never hide again. `:focus-visible` is not asked, because it
         * answers for the browser's own ring, not for how focus arrived.
         */
        let heldByKeyboard = false;
        /** A press began in the bar and has not yet turned into a click. */
        let pressing = false;

        const onPointerDown = () => {
            pressing = true;
        };
        const onClick = () => {
            pressing = false;
        };
        const onFocusIn = () => {
            // A press cannot reach a bar that is away, so focus that arrives
            // then is never the pointer's. The focus of a press is not held.
            if (pressing && !scrolledAway) {
                heldByKeyboard = false;
                return;
            }
            heldByKeyboard = true;
            scrolledAway = false;
        };
        const onFocusOut = (event: FocusEvent) => {
            const next = event.relatedTarget;
            if (!(next instanceof Node) || !bar.contains(next)) heldByKeyboard = false;
        };
        /** A key pressed in the bar: the keyboard is in use, wherever focus came from. */
        const onKeyDown = () => {
            heldByKeyboard = true;
            scrolledAway = false;
        };
        /** Any key ends a press that never became a click (a drag off the bar). */
        const onAnyKeyDown = () => {
            pressing = false;
        };

        let last = clamped();
        const onScroll = () => {
            const now = clamped();
            // At the top the bar is where it was laid out: always showing.
            if (now <= bar.offsetHeight) {
                last = now;
                scrolledAway = false;
                return;
            }
            const delta = now - last;
            if (Math.abs(delta) < SCROLL_TOLERANCE) return;
            last = now;
            scrolledAway =
                delta > 0 && !(heldByKeyboard && bar.contains(document.activeElement));
        };

        target.addEventListener("scroll", onScroll, { passive: true });
        bar.addEventListener("pointerdown", onPointerDown);
        bar.addEventListener("click", onClick);
        bar.addEventListener("focusin", onFocusIn);
        bar.addEventListener("focusout", onFocusOut);
        bar.addEventListener("keydown", onKeyDown);
        window.addEventListener("keydown", onAnyKeyDown, true);
        return () => {
            target.removeEventListener("scroll", onScroll);
            bar.removeEventListener("pointerdown", onPointerDown);
            bar.removeEventListener("click", onClick);
            bar.removeEventListener("focusin", onFocusIn);
            bar.removeEventListener("focusout", onFocusOut);
            bar.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keydown", onAnyKeyDown, true);
            scrolledAway = false;
        };
    });

    /** A 48px ghost target, the same as `IconButton` at `variant="ghost" size="lg"`. */
    const backClasses =
        "focus-ring focus-ring--muted inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-control bg-transparent text-headline transition-colors duration-150 hover:bg-surface-hover active:bg-surface-active";

    const hasBack = $derived(backHref !== undefined || onback !== undefined);
</script>

<header
    bind:this={host}
    data-collapsed={collapseOnScroll ? String(collapsed) : undefined}
    class={cn(
        "sticky top-0 z-sticky border-b border-border-weak bg-surface-elevated",
        // Clear of the status bar and the notch, and of the corners in landscape.
        "pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
        "transition-transform duration-200 ease-out motion-reduce:transition-none",
        // The strip under the status bar stays, so content never shows through it.
        collapsed && "-translate-y-[calc(100%-env(safe-area-inset-top,0px))]",
        className,
    )}
    {...restProps}
>
    <!-- Wraps as a last resort: with the text enlarged on a narrow phone the
    controls alone can be wider than the screen.
    Fades out while the bar is away: under a status bar the strip that stays
    is the bottom of the bar, and the controls would show in it. They keep
    their place in the tab order; keyboard focus brings the bar back. -->
    <div
        class={cn(
            "flex min-h-14 flex-wrap items-center gap-2 px-2 py-1",
            "transition-opacity duration-200 ease-out motion-reduce:transition-none",
            collapsed && "pointer-events-none opacity-0",
        )}
    >
        {#if backHref !== undefined}
            <a href={backHref} class={backClasses} aria-label={backLabel} onclick={onback}>
                <ArrowLeft size={24} class="rtl:rotate-180" aria-hidden="true" />
            </a>
        {:else if onback}
            <button type="button" class={backClasses} aria-label={backLabel} onclick={onback}>
                <ArrowLeft size={24} class="rtl:rotate-180" aria-hidden="true" />
            </button>
        {/if}
        {@render leading?.()}
        {#if title}
            <!-- Two lines before it is cut: enlarged text has to stay readable. -->
            <svelte:element
                this={`h${headingLevel}`}
                class={cn(
                    "m-0 line-clamp-2 min-w-0 flex-[1_1_4rem] text-lg leading-6 font-semibold text-headline [overflow-wrap:anywhere]",
                    !hasBack && !leading && "pl-2",
                )}
            >
                {title}
            </svelte:element>
        {:else}
            <div class="min-w-0 flex-1"></div>
        {/if}
        {#if actions}
            <div class="ms-auto flex shrink-0 items-center gap-2">
                {@render actions()}
            </div>
        {/if}
    </div>
</header>
