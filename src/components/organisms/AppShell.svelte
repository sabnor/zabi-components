<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { untrack } from "svelte";
    import { markAppShell, publishAppShellInsets } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";
    import { watchScrollEdge } from "../util/scroll-edge.js";

    /**
     * The layout of a phone app: a bar at the top, content that scrolls, a
     * tab bar at the bottom, and none of it under the notch or the home
     * indicator.
     *
     * The shell is exactly as tall as the visible screen (`100dvh`, so the
     * browser's own bars are accounted for) and only the middle scrolls. The
     * header stays at the top of that scrolling area. The footer lies over
     * the bottom of it, so content passes beneath both bars: they are the
     * page colour at rest and turn to glass once content is under them.
     *
     * ```svelte
     * <AppShell>
     *     {#snippet header()}
     *         <AppBar title="Quizrundan" collapseOnScroll />
     *     {/snippet}
     *     <div class="p-4">…</div>
     *     {#snippet footer()}
     *         <BottomTabBar {items} active={page.url.pathname} />
     *     {/snippet}
     * </AppShell>
     * ```
     *
     * Two custom properties on the host say how much of the screen the bars
     * take, safe areas included, so anything inside the shell can stay clear
     * of them:
     *
     * - `--app-shell-top-inset`: the height of the header;
     * - `--app-shell-bottom-inset`: the height of the footer.
     *
     * Without a bar the value is the safe-area inset alone. With a footer the
     * content takes the bottom inset as padding and the scroller as
     * `scroll-padding-bottom`, so the end of the content and a focused field
     * clear the footer.
     *
     * A third, on the scroller, is for what sits in the content and has to
     * stay above the footer (`StickyActionBar` and `UnsavedChangesBar` read it):
     *
     * - `--app-shell-footer-overlay`: the bottom inset when a footer lies over
     *   the scroller, `0px` when there is no footer.
     *
     * The host also says where content is: `data-scrolled-top="true"` once it
     * has scrolled under the header, `data-scrolled-bottom="true"` while it
     * passes under the footer (both `"false"` on the server and before the
     * first measurement). The bars read the same state.
     *
     * With `canvas` the shell is painted with the page colour and the brand
     * wash (`bg-canvas`), and the header bar rests transparent so the wash
     * shows through it.
     *
     * The host is the containing block for anything positioned inside it, and such an element
     * does not scroll with the content, so a floating button above the tab bar
     * is `absolute` with `bottom: calc(var(--app-shell-bottom-inset) + 1rem)`.
     *
     * While the shell is mounted the same two properties are also set on
     * `<html>`, so an overlay that is moved to `document.body` (a sheet, a
     * toast) can read them too. With more than one shell on the page, the one
     * mounted last is the one mirrored there.
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "style"> & {
        /** The top bar, an `AppBar`. It handles the safe area above it. */
        header?: Snippet;
        /** The scrolling content, rendered in the element `contentElement` names. */
        children?: Snippet;
        /**
         * The element around the content. `main` when the shell is the page,
         * which is what it is for. A page has one `<main>`: use `div` for a
         * shell that sits inside another one, such as a preview in a page of
         * its own.
         */
        contentElement?: "main" | "div";
        /**
         * The bottom bar, a `BottomTabBar`. It lies over the bottom of the
         * scrolling area and handles the safe area below it.
         */
        footer?: Snippet;
        /**
         * Paints the shell with the page colour and the brand wash (`bg-canvas`)
         * instead of the plain page colour, and lets the wash show through the
         * header bar at rest.
         */
        canvas?: boolean;
        class?: string;
        /** Added after the two custom properties the shell sets. */
        style?: string;
    };

    let {
        header,
        children,
        contentElement = "main",
        footer,
        canvas = false,
        class: className = "",
        style = "",
        ...restProps
    }: Props = $props();

    let headerRegion: HTMLDivElement | undefined = $state();
    let footerRegion: HTMLDivElement | undefined = $state();
    /** Measured heights in px; null on the server and until the first measurement. */
    let headerHeight = $state<number | null>(null);
    let footerHeight = $state<number | null>(null);

    /**
     * What the bars measure before they have been measured: the default
     * heights of AppBar and BottomTabBar. The real size replaces it once the
     * shell runs, which matters when the text is enlarged or a label wraps.
     */
    // In px: AppBar (56) and BottomTabBar (64) keep their height when the text is enlarged.
    const HEADER_ESTIMATE = "calc(56px + env(safe-area-inset-top, 0px))";
    const FOOTER_ESTIMATE = "calc(64px + env(safe-area-inset-bottom, 0px))";

    function track(region: HTMLElement | undefined, set: (height: number | null) => void) {
        if (!region) {
            set(null);
            return;
        }
        const measure = () => {
            const height = region.getBoundingClientRect().height;
            // No layout (a hidden shell, a test DOM): keep the estimate.
            set(height > 0 ? height : null);
        };
        measure();
        if (typeof ResizeObserver === "undefined") return;
        const observer = new ResizeObserver(measure);
        observer.observe(region);
        return () => observer.disconnect();
    }

    let scroller: HTMLDivElement | undefined = $state();
    /** Content is under the header / the footer. False until the browser has measured. */
    let scrolledTop = $state(false);
    let scrolledBottom = $state(false);

    markAppShell({
        get scrolledTop() {
            return scrolledTop;
        },
        get scrolledBottom() {
            return scrolledBottom;
        },
        get footerOverlays() {
            return !!footer;
        },
        get footerHeight() {
            return footer ? (footerHeight ?? 0) : 0;
        },
    });

    $effect(() => {
        if (!scroller) return;
        return watchScrollEdge(scroller, (edge) => {
            scrolledTop = edge.top;
            scrolledBottom = edge.bottom;
        });
    });

    $effect(() => track(headerRegion, (height) => (headerHeight = height)));
    $effect(() => track(footerRegion, (height) => (footerHeight = height)));

    const topInset = $derived(
        !header
            ? "env(safe-area-inset-top, 0px)"
            : headerHeight === null
              ? HEADER_ESTIMATE
              : `${headerHeight}px`,
    );
    const bottomInset = $derived(
        !footer
            ? "env(safe-area-inset-bottom, 0px)"
            : footerHeight === null
              ? FOOTER_ESTIMATE
              : `${footerHeight}px`,
    );

    // On `<html>` as well, for what is rendered outside the shell.
    let published: ReturnType<typeof publishAppShellInsets> | undefined;
    $effect(() => {
        published = untrack(() => publishAppShellInsets(topInset, bottomInset));
        return () => {
            published?.leave();
            published = undefined;
        };
    });
    $effect(() => {
        published?.update(topInset, bottomInset);
    });

    const contentClasses = $derived(
        cn(
            "min-w-0 flex-1 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
            !header && "pt-[env(safe-area-inset-top)]",
            // With a footer over the scroller the content ends above it.
            footer ? "pb-(--app-shell-bottom-inset)" : "pb-[env(safe-area-inset-bottom)]",
        ),
    );
</script>

<div
    data-app-shell
    class={cn(
        "relative flex h-dvh w-full flex-col overflow-hidden text-body",
        canvas ? "bg-canvas" : "bg-background",
        className,
    )}
    data-scrolled-top={String(scrolledTop)}
    data-scrolled-bottom={String(scrolledBottom)}
    style="--app-shell-top-inset: {topInset}; --app-shell-bottom-inset: {bottomInset}; {style}"
    {...restProps}
>
    <!--
      The header is inside the scrolling area and sticks to its top. It keeps
      its place in the flow, so the content starts below it with nothing to
      measure, and it can slide away (AppBar's collapseOnScroll) without the
      content moving. scroll-padding keeps a focused field from landing under it.
    -->
    <div
        bind:this={scroller}
        data-app-shell-scroller
        class={cn(
            "flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-pt-(--app-shell-top-inset)",
            // Shared with StickyActionBar's reservation: the larger one is set inline.
            footer && "scroll-pb-(--app-shell-bottom-inset)",
        )}
        style="--app-shell-footer-overlay: {footer ? 'var(--app-shell-bottom-inset)' : '0px'}"
    >
        {#if header}
            <!-- An empty strip is left when the bar slides away; it must not take taps. -->
            <div
                bind:this={headerRegion}
                data-app-shell-header
                class={cn(
                    "pointer-events-none sticky top-0 z-sticky shrink-0 *:pointer-events-auto",
                    // The wash shows through a bar at rest (glass still takes over once scrolled).
                    canvas && "[--color-bar:transparent]",
                )}
            >
                {@render header()}
            </div>
        {/if}
        <!-- Two branches, not `<svelte:element>`: hydration takes a dynamic
        element out and puts it back, which blurs a control inside it that the
        user had already tabbed to, and the whole page is inside this one. -->
        {#if contentElement === "div"}
            <div data-app-shell-content class={contentClasses}>
                {@render children?.()}
            </div>
        {:else}
            <main data-app-shell-content class={contentClasses}>
                {@render children?.()}
            </main>
        {/if}
    </div>
    {#if footer}
        <!-- Over the bottom of the scroller, not a row of its own: content passes beneath it. -->
        <div bind:this={footerRegion} data-app-shell-footer class="absolute inset-x-0 bottom-0 z-sticky">
            {@render footer()}
        </div>
    {/if}
</div>
