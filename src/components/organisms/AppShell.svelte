<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { markAppShell } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";

    /**
     * The layout of a phone app: a bar at the top, content that scrolls, a
     * tab bar at the bottom, and none of it under the notch or the home
     * indicator.
     *
     * The shell is exactly as tall as the visible screen (`100dvh`, so the
     * browser's own bars are accounted for) and only the middle scrolls. The
     * header stays at the top of that scrolling area; the footer sits below it.
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
     * Without a bar the value is the safe-area inset alone. The host is the
     * containing block for anything positioned inside it, and such an element
     * does not scroll with the content, so a floating button above the tab bar
     * is `absolute` with `bottom: calc(var(--app-shell-bottom-inset) + 1rem)`.
     * The properties are inherited: they reach what is rendered inside the
     * shell, not an overlay that is moved to `document.body`.
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
        /** The bottom bar, a `BottomTabBar`. It handles the safe area below it. */
        footer?: Snippet;
        class?: string;
        /** Added after the two custom properties the shell sets. */
        style?: string;
    };

    let {
        header,
        children,
        contentElement = "main",
        footer,
        class: className = "",
        style = "",
        ...restProps
    }: Props = $props();

    markAppShell();

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
    const HEADER_ESTIMATE = "calc(3.5rem + 1px + env(safe-area-inset-top, 0px))";
    const FOOTER_ESTIMATE = "calc(4rem + 1px + env(safe-area-inset-bottom, 0px))";

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
</script>

<div
    data-app-shell
    class={cn(
        "relative flex h-dvh w-full flex-col overflow-hidden bg-background text-body",
        className,
    )}
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
        data-app-shell-scroller
        class="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-pt-(--app-shell-top-inset)"
    >
        {#if header}
            <!-- An empty strip is left when the bar slides away; it must not take taps. -->
            <div
                bind:this={headerRegion}
                data-app-shell-header
                class="pointer-events-none sticky top-0 z-sticky shrink-0 *:pointer-events-auto"
            >
                {@render header()}
            </div>
        {/if}
        <svelte:element
            this={contentElement}
            data-app-shell-content
            class={cn(
                "min-w-0 flex-1 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
                !header && "pt-[env(safe-area-inset-top)]",
                !footer && "pb-[env(safe-area-inset-bottom)]",
            )}
        >
            {@render children?.()}
        </svelte:element>
    </div>
    {#if footer}
        <div bind:this={footerRegion} data-app-shell-footer class="shrink-0">
            {@render footer()}
        </div>
    {/if}
</div>
