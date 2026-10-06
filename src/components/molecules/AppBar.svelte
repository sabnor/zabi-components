<script lang="ts">
    import { zabiCommonStrings } from "../util/zabi-strings.js";
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import ArrowLeft from "@lucide/svelte/icons/arrow-left";
    import { findScrollParent, getAppShell, isDevBuild } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";
    import { resolveScrolledUnder, watchScrollEdge, type ScrollEdgeMode } from "../util/scroll-edge.js";

    /**
     * The bar at the top of a phone screen: where you are, the way back, and
     * at most two things to do here.
     *
     * It is one row, 56px tall, whenever the title has 72px or more beside
     * the controls, at every text size. The bar is chrome: when the reader
     * enlarges text, the room belongs to the page under it. So the controls
     * are sized in px (48px targets), the title grows with the text only up
     * to 1.3 times its size, and a title too long for the room it has is cut
     * with an ellipsis (after two lines with `titleLines={2}`). The heading
     * keeps its full text for a screen reader; keep the visible start of it
     * enough to name the screen.
     *
     * The title never has less than 72px. Where the back control, `leading`
     * and the actions leave it less (a wide chip in `leading`, a very narrow
     * bar), it takes a second row of its own, as wide as the bar, and they
     * stay together on the first.
     *
     * The bar is flush with the page and page-coloured at rest. Once content
     * has scrolled under it, it turns to frosted glass with a hairline below
     * it. Inside an `AppShell` the shell says when; on a page of its own the
     * bar watches the window or its nearest scrolling ancestor.
     *
     * With `largeTitle` the title is also drawn large on a second row under
     * the bar. That row scrolls away with the content (nothing is animated),
     * the 56px row stays, and its own small title fades in once the large
     * one has gone under it. The heading is the large one.
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
        /**
         * How many lines the title may take before it is cut with an
         * ellipsis. The bar is taller only while the second line is in use.
         */
        titleLines?: 1 | 2;
        /**
         * Before the title, after the back control: a logo, an avatar, a
         * chip. Rendered as it is, a child of the bar's row. It keeps its
         * width; when that leaves the title under 72px the title moves to a
         * row of its own, and a `leading` wider than the row is held to the
         * row's width.
         */
        leading?: Snippet;
        /**
         * After the title. At most two icon buttons, at `size="lg"` so each is
         * a 48px target; put anything more in a menu. Their size does not
         * grow with the text size here: inside the bar the spacing scale is
         * in px.
         */
        actions?: Snippet;
        /**
         * When the bar shows the glass and the hairline. `auto` follows the
         * scroll position: flush at the top, glass once content is under it.
         * `always` is glass all the time, `never` flush all the time.
         */
        scrollEdge?: ScrollEdgeMode;
        /**
         * Draws the title large (30px bold, two lines at most) on a second row
         * under the bar. It scrolls away with the content; the bar keeps its
         * 56px row, which shows the title small once the large one is gone.
         * The heading is the large title; the small one is hidden from
         * assistive technology. Needs `title`. `collapseOnScroll` is ignored
         * with it. Before the bar has been measured (the server, no scripts)
         * the whole header simply sticks and the large title stays.
         */
        largeTitle?: boolean;
        /**
         * The bar's fill. `default` is the page colour at rest. `transparent`
         * has none at rest, for a canvas, an image or a colour block laid
         * behind the bar, and takes the glass once content is under it.
         * `brand` is the brand colour with on-brand text and controls, at rest
         * and scrolled, with no glass and no hairline, so a brand block
         * directly under the bar joins it. With `largeTitle` the large row is
         * part of the brand block.
         * `inherit` is for a bar inside a block of another colour: no fill of
         * its own, no glass and no hairline at any scroll position, and the
         * title, back control, actions, links, borders and focus rings take
         * the colour the block gives the text. A sticky bar that has to cover
         * scrolling content takes its fill from the app:
         * `class="[--color-bar:var(--my-block-colour)]"`.
         */
        tone?: "default" | "transparent" | "brand" | "inherit";
        /**
         * `sticky` (default) keeps the bar at the top of what scrolls.
         * `static` leaves it where it is in the page, for a bar that sits
         * inside a block of the content: it scrolls away with the block, is
         * never glass, and `collapseOnScroll` and the condensing of
         * `largeTitle` do nothing. `class="static"`, the 8.1 way to say this,
         * is read as `position="static"`.
         */
        position?: "sticky" | "static";
        class?: string;
    };

    let {
        title = "",
        headingLevel = 1,
        backHref,
        onback,
        backLabel: backLabelGiven,
        collapseOnScroll = false,
        titleLines = 1,
        leading,
        actions,
        scrollEdge = "auto",
        largeTitle = false,
        tone = "default",
        position = "sticky",
        class: className = "",
        ...restProps
    }: Props = $props();

    /** Words many components share: a `ZabiStringsProvider` above this one may give them; else English. */
    const common = zabiCommonStrings();
    const backLabel = $derived(backLabelGiven ?? common().back);

    let host: HTMLElement | undefined = $state();

    /**
     * In the flow of the page, not stuck to the top. The material's layer is
     * placed against the bar, so the bar is always positioned: `relative`
     * here, and a `static` class from the caller is taken out and read as this.
     */
    const classStatic = $derived(/(?:^|\s)static(?:\s|$)/.test(className));
    const inFlow = $derived(position === "static" || classStatic);
    const ownClass = $derived(
        classStatic ? className.replace(/(?:^|\s)static(?=\s|$)/g, " ").trim() : className,
    );

    /** A large title needs a title to be large. */
    const large = $derived(largeTitle && !!title);
    /** The two scroll behaviours fight: with a large title, `collapseOnScroll` is ignored. */
    const collapses = $derived(collapseOnScroll && !large && !inFlow);

    $effect(() => {
        if (!isDevBuild()) return;
        if (largeTitle && collapseOnScroll) {
            console.warn(
                "[zabi-components] AppBar: `collapseOnScroll` is ignored with `largeTitle`; " +
                    "the large title already condenses on scroll.",
            );
        }
    });

    /** The large row, and its measured height in px: how far the header sticks above the top. Null until measured. */
    let largeRow: HTMLElement | undefined = $state();
    let largeHeight = $state<number | null>(null);
    const overscroll = $derived(
        large && !inFlow && largeHeight !== null && largeHeight > 0 ? largeHeight : 0,
    );

    $effect(() => {
        const el = largeRow;
        if (!el || typeof ResizeObserver === "undefined") {
            largeHeight = null;
            return;
        }
        const measure = () => {
            const height = el.getBoundingClientRect().height;
            // No layout (a hidden bar, a test DOM): stay as unmeasured.
            largeHeight = height > 0 ? height : null;
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => observer.disconnect();
    });

    /** Content is under the bar: from the shell if there is one, else from its own scroller. */
    const shell = getAppShell();
    let ownScrolled = $state(false);
    $effect(() => {
        if (shell || (scrollEdge !== "auto" && !large) || !host) return;
        return watchScrollEdge(findScrollParent(host), (edge) => (ownScrolled = edge.top), overscroll);
    });
    /** Past the large row: the standard title shows and the bar is over content. Never before it has been measured. */
    const condensed = $derived(
        large && overscroll > 0 && (shell ? shell.scrolledTop : ownScrolled),
    );
    const scrolledUnder = $derived(
        // An opaque brand bar has no glass and no hairline whatever the mode says, nor has
        // one that takes its block's colours (glass over any colour is not readable).
        // Nor has a bar in the flow of the page: nothing scrolls under it.
        tone === "brand" || tone === "inherit" || inFlow
            ? false
            : resolveScrolledUnder(
                  scrollEdge,
                  large ? condensed : shell ? shell.scrolledTop : ownScrolled,
              ),
    );

    // Inside a shell the sticky container is the shell's header wrapper.
    $effect(() => {
        if (!shell || !(overscroll > 0)) return;
        shell.setHeaderOverscroll(overscroll);
        return () => shell.setHeaderOverscroll(0);
    });

    /** Scrolled out of view. Only ever true with `collapseOnScroll`. */
    let scrolledAway = $state(false);
    const collapsed = $derived(collapses && scrolledAway);

    /** Scrolling less than this in one direction does not move the bar. */
    const SCROLL_TOLERANCE = 8;

    $effect(() => {
        if (!collapses || !host) return;
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
    const backClasses = $derived(
        "focus-ring focus-ring--muted inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-control bg-transparent text-headline transition-colors duration-(--duration-base) " +
            // The page's hover fills are a dark veil: on the brand fill the on-brand colour is what shows.
            (tone === "brand" || tone === "inherit"
                ? "hover:bg-[color-mix(in_srgb,var(--color-on-brand)_16%,transparent)] active:bg-[color-mix(in_srgb,var(--color-on-brand)_26%,transparent)]"
                : "hover:bg-surface-hover active:bg-surface-active"),
    );

    const hasBack = $derived(backHref !== undefined || onback !== undefined);

    /** The least room a title is left with beside the controls, in px. */
    const TITLE_MIN = 72;

    /**
     * Where the title is: `inline`, between `leading` and the actions, or on
     * a row of its `own` under them. Null until the bar has been measured
     * (the server, a test DOM without layout): the stylesheet's own fallback
     * then keeps the title at 72px by wrapping.
     *
     * It has to be measured. What the title is left with depends on how wide
     * `leading` is, which is the app's markup: no media or container query
     * knows that. And wrapping alone cannot do it: the actions come after
     * the title, so they would follow it down to the second row.
     */
    let titleRow = $state<"inline" | "own" | null>(null);
    /** The widest `leading` can be on the first row, in px. */
    let leadingMax = $state<number | null>(null);
    let row: HTMLElement | undefined = $state();

    /** 1.875rem, and no more than 39px however large the text is set: capped as the bar's other sizes are. */
    const largeClasses =
        "appbar-large-title m-0 text-[length:min(1.875rem,39px)] leading-[1.15] font-bold text-headline line-clamp-2 [overflow-wrap:anywhere]";

    const headerClasses = $derived(
        cn(
            cn(!large && "material-bar", inFlow ? "relative" : "sticky top-0 z-sticky"),
            // Clear of the status bar and the notch, and of the corners in landscape. With a
            // large title the status-bar strip is the 56px row's, so it stays covered when stuck.
            large
                ? "pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
                : "pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
            !large && "transition-transform duration-(--duration-moderate) ease-out motion-reduce:transition-none",
            // The strip under the status bar stays, so content never shows through it.
            !large && collapsed && "-translate-y-[calc(100%-env(safe-area-inset-top,0px))]",
            // `--color-bar` is scoped on the element that carries `material-bar`.
            !large && tone === "transparent" && "[--color-bar:transparent]",
            !large && tone === "brand" && "[--color-bar:var(--color-bar-brand)]",
            // With a large title the inner bar takes whatever the header says (see below), so a caller's fill reaches it.
            tone === "inherit" && "[--color-bar:transparent]",
            tone === "brand" && "on-brand",
            // The on-brand scope with the on-colour left as the block's own text colour; the
            // focus ring's gap is the block's, not the brand fill.
            tone === "inherit" && "on-brand [--color-on-brand:currentColor] [--color-focus-ring-offset:transparent]",
            // The caller's classes come last: their `[--color-bar:…]` replaces the tone's.
            ownClass,
        ),
    );

    $effect(() => {
        const bar = row;
        if (!bar || typeof ResizeObserver === "undefined") return;
        // Read here so that a new title or line count measures again.
        void title;
        void titleLines;

        const measure = () => {
            const style = getComputedStyle(bar);
            const inner =
                bar.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
            // Nothing is laid out (a hidden bar): leave it as it is.
            if (!(inner > 0)) return;
            const gap = parseFloat(style.columnGap) || 0;

            // Every part at the width it asks for, on one line, with the
            // title out of the count: what is left is the title's.
            bar.dataset.measuring = "";
            let fixed = 0;
            let beside = 0;
            let parts = 0;
            for (const child of bar.children) {
                if (!(child instanceof HTMLElement)) continue;
                const part = child.dataset.appbarPart;
                if (part === "title" || child.offsetWidth === 0) continue;
                parts += 1;
                beside += child.offsetWidth;
                // The back control and the actions keep their width whatever happens.
                if (part === "back" || part === "actions") fixed += child.offsetWidth;
            }
            delete bar.dataset.measuring;

            const left = inner - beside - gap * parts;
            const next = left < TITLE_MIN ? "own" : "inline";
            if (next !== titleRow) titleRow = next;
            const fixedParts = bar.querySelectorAll(
                ":scope > [data-appbar-part='back'], :scope > [data-appbar-part='actions']",
            ).length;
            const room = Math.max(0, Math.floor(inner - fixed - gap * fixedParts));
            if (room !== leadingMax) leadingMax = room;
        };

        measure();
        const sizes = new ResizeObserver(measure);
        const watch = () => {
            sizes.disconnect();
            sizes.observe(bar);
            for (const child of bar.children) sizes.observe(child);
        };
        watch();
        // `leading` and the actions are the app's: they come and go.
        const nodes = new MutationObserver(() => {
            watch();
            measure();
        });
        nodes.observe(bar, { childList: true });
        return () => {
            sizes.disconnect();
            nodes.disconnect();
        };
    });
</script>

{#snippet barRow()}
    <!-- `--spacing: 4px`: Tailwind sizes everything from `--spacing`, which
    is 0.25rem, so a 48px button was 96px with the text at 200% and the bar
    wrapped to 225px. In px here, the back control, the actions and whatever
    `leading` holds keep their size, and the title has the rest of the row,
    or a row of its own when the rest is under 72px (see the style block).
    The same at 100%: 0.25rem is 4px.
    Fades out while the bar is away: under a status bar the strip that stays
    is the bottom of the bar, and the controls would show in it. They keep
    their place in the tab order; keyboard focus brings the bar back. -->
    <div
        bind:this={row}
        data-title-row={titleRow ?? undefined}
        style:--appbar-leading-max={leadingMax !== null ? `${leadingMax}px` : undefined}
        class={cn(
            "appbar-row flex min-h-14 items-center gap-2 px-2 py-1 [--spacing:4px]",
            "transition-opacity duration-(--duration-moderate) ease-out motion-reduce:transition-none",
            collapsed && "pointer-events-none opacity-0",
        )}
    >
        {#if backHref !== undefined}
            <a href={backHref} class={backClasses} aria-label={backLabel} onclick={onback} data-appbar-part="back">
                <ArrowLeft size={24} class="rtl:rotate-180" aria-hidden="true" />
            </a>
        {:else if onback}
            <button type="button" class={backClasses} aria-label={backLabel} onclick={onback} data-appbar-part="back">
                <ArrowLeft size={24} class="rtl:rotate-180" aria-hidden="true" />
            </button>
        {/if}
        {@render leading?.()}
        {#if title}
            <!-- One line, cut with an ellipsis; two before it is cut with
            `titleLines={2}`. 1.125rem, and no more than 1.3 times that
            (23.4px) however large the text is set.
            One branch per level, not a dynamic element: hydration takes a dynamic
            element out and puts it back, which blurs a control inside it that the
            user had already tabbed to. -->
            {@const titleClasses = cn(
                "appbar-title m-0 text-[length:min(1.125rem,23.4px)] leading-[1.34] font-semibold text-headline",
                titleLines === 2 ? "line-clamp-2 [overflow-wrap:anywhere]" : "truncate",
                !hasBack && !leading && "ps-2",
            )}
            {#if large}
                <!-- The large row holds the heading. This one only repeats the text for the
                eye, in the title's place so the row measures as before. -->
                <p
                    class={cn(titleClasses, "transition-opacity duration-(--duration-base)", condensed ? "opacity-100" : "opacity-0")}
                    data-appbar-part="title"
                    aria-hidden="true"
                >{title}</p>
            {:else if headingLevel === 1}
                <h1 class={titleClasses} data-appbar-part="title">{title}</h1>
            {:else if headingLevel === 2}
                <h2 class={titleClasses} data-appbar-part="title">{title}</h2>
            {:else if headingLevel === 3}
                <h3 class={titleClasses} data-appbar-part="title">{title}</h3>
            {:else if headingLevel === 4}
                <h4 class={titleClasses} data-appbar-part="title">{title}</h4>
            {:else if headingLevel === 5}
                <h5 class={titleClasses} data-appbar-part="title">{title}</h5>
            {:else}
                <h6 class={titleClasses} data-appbar-part="title">{title}</h6>
            {/if}
        {:else}
            <div class="min-w-0 flex-1" data-appbar-part="title"></div>
        {/if}
        {#if actions}
            <div class="ms-auto flex shrink-0 items-center gap-2" data-appbar-part="actions">
                {@render actions()}
            </div>
        {/if}
    </div>
{/snippet}

<header
    bind:this={host}
    data-tone={tone}
    data-large-title={large ? "" : undefined}
    data-condensed={large ? String(condensed) : undefined}
    data-collapsed={collapses ? String(collapsed) : undefined}
    data-scrolled-under={large ? undefined : String(scrolledUnder)}
    style:top={large && !shell && overscroll > 0 ? `-${overscroll}px` : undefined}
    class={headerClasses}
    {...restProps}
>
    {#if large}
        <!-- Two rows. The header sticks at minus the large row's height and the
        56px row sticks at 0 inside it, so the large row scrolls away behind a bar
        that stays: no scroll-linked animation, no jump. The surface and the
        status-bar strip belong to the 56px row; the large row is on the page
        (on the brand fill, with `tone="brand"`). -->
        <div
            data-appbar-bar
            data-scrolled-under={String(scrolledUnder)}
            class={cn(
                "material-bar pt-[env(safe-area-inset-top)]",
                inFlow ? "relative" : "sticky top-0",
                tone === "transparent" && "[--color-bar:transparent]",
                tone === "brand" && "[--color-bar:var(--color-bar-brand)]",
                tone === "inherit" && "[--color-bar:inherit]",
            )}
        >
            {@render barRow()}
        </div>
        <div
            bind:this={largeRow}
            data-appbar-large
            class={cn("px-[16px] pt-[4px] pb-[8px]", tone === "brand" && "bg-bar-brand")}
        >
            {#if headingLevel === 1}
                <h1 class={largeClasses}>{title}</h1>
            {:else if headingLevel === 2}
                <h2 class={largeClasses}>{title}</h2>
            {:else if headingLevel === 3}
                <h3 class={largeClasses}>{title}</h3>
            {:else if headingLevel === 4}
                <h4 class={largeClasses}>{title}</h4>
            {:else if headingLevel === 5}
                <h5 class={largeClasses}>{title}</h5>
            {:else}
                <h6 class={largeClasses}>{title}</h6>
            {/if}
        </div>
    {:else}
        {@render barRow()}
    {/if}
</header>

<style>
    /*
     * Until the bar has measured itself (the server's markup, no scripts):
     * the row may wrap and the title asks for 72px, so it is never narrower.
     * The actions follow it to the second row there, which is the one thing
     * wrapping cannot avoid: they come after the title.
     */
    .appbar-row {
        flex-wrap: wrap;
        /* A `leading` that is wider than the row must not widen the page.
           `clip`, not `hidden`: nothing scrolls, and nothing is cut above or
           below, where a focus ring is. */
        overflow-x: clip;
    }
    .appbar-row :global(> [data-appbar-part="title"]) {
        flex: 1 1 72px;
        min-width: 72px;
    }
    /* `leading`: whatever in the row is not the bar's own. */
    .appbar-row :global(> :not([data-appbar-part])) {
        min-width: 0;
        max-width: var(--appbar-leading-max, 100%);
    }

    /* Measured, and the title has 72px or more: one row, as it was. */
    .appbar-row[data-title-row="inline"] {
        flex-wrap: nowrap;
    }
    .appbar-row[data-title-row="inline"] :global(> [data-appbar-part="title"]) {
        flex: 1 1 0;
    }

    /*
     * Measured, and it has less: the title is last and takes a whole row;
     * the back control, `leading` and the actions are the first. Only the
     * drawing order changes: in the document, and so for a screen reader and
     * the Tab key, it is still back, leading, title, actions.
     */
    .appbar-row[data-title-row="own"] :global(> [data-appbar-part="actions"]) {
        order: 1;
    }
    .appbar-row[data-title-row="own"] :global(> [data-appbar-part="title"]) {
        order: 2;
        flex: 1 1 100%;
        /* The same inset as on a row with nothing before it, and the row's
           4px above and below; 8px more at the sides, in line with the
           icons' edges. */
        padding-inline: 8px;
        padding-block-end: 4px;
    }

    /* While it measures: every part at the width it asks for, on one line. */
    .appbar-row[data-measuring] {
        flex-wrap: nowrap;
    }
    .appbar-row[data-measuring] :global(> *) {
        flex: none;
        max-width: none;
    }
</style>
