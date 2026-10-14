<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { untrack } from "svelte";
    import {
        APP_SHELL_RAIL_MIN_WIDTH,
        APP_SHELL_SIDEBAR_MIN_WIDTH,
        markAppShell,
        publishAppShellInsets,
        type AppShellNavigationContext,
        type AppShellNavigationMode,
        type AppShellNavigationPlacement,
    } from "../util/app-shell.js";
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
     * - `--app-shell-top-inset`: the height of the header (with an `AppBar`
     *   `largeTitle`, the height it condenses to);
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
     * To let the consumer choose what stays, compose the header from
     * `AppShellHeaderPart`s: each says `sticky` (the default) or `sticky={false}`
     * and scrolls away with the content, so a bar can leave while the filter
     * row stays, or a large title can go while the bar and the tabs stay. The
     * shell measures the parts to stack the ones that stick, reports only
     * what is stuck as `--app-shell-top-inset` and `scroll-padding-top`, and
     * puts the glass and the hairline under the lowest one. Without parts the
     * header is one block that sticks, as before.
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
     *
     * With `navigation` the shell holds one navigation that is drawn as tabs
     * over the bottom of the screen on a phone, a rail on a tablet and a
     * sidebar on a desktop, and the app writes one layout, not three
     * (`AppNavigation` is the ready-made content). The snippet is rendered
     * once and only CSS moves it, so the server's markup is right at every
     * width and nothing jumps when scripts load. As tabs it lies over the
     * bottom like `footer` (the footer then sits directly above it); as a
     * rail or sidebar it is a full-height column at the inline start, and the
     * header, content and footer take the rest. The host says which with
     * `data-navigation-placement`, and the bottom inset counts the tabs, so a
     * sticky action bar or a floating button clears them too.
     *
     * ```svelte
     * <AppShell>
     *     {#snippet header()}<AppBar title="Quizrundan" largeTitle />{/snippet}
     *     {#snippet navigation()}<AppNavigation {items} active={page.url.pathname} />{/snippet}
     *     <div class="p-4">…</div>
     * </AppShell>
     * ```
     *
     * One more custom property: `--app-shell-start-inset`, the width of the
     * rail or sidebar (`0px` as tabs), also mirrored onto `<html>`.
     *
     * With `flushTop` and no `header` the content starts at the top edge of
     * the screen, under the status bar, so a block of colour at the top of it
     * can run there. The content then handles the safe area itself: pad by
     * `--app-shell-top-inset`, or let an `AppBar position="static"` in the
     * block do it.
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "style"> & {
        /**
         * The top bar, an `AppBar`. It handles the safe area above it. Or
         * several `AppShellHeaderPart`s, each of which sticks or scrolls away.
         */
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
        /**
         * One navigation, drawn as tabs, a rail or a sidebar by
         * `navigationPlacement`. Rendered once, first in the DOM: the Tab order
         * is navigation, header, content. `placement` is the forced value, or
         * in `auto` what the viewport says once mounted (`tabs` on the server
         * and before mount); use it only to render different markup per
         * placement, since the layout itself is CSS and right without it.
         */
        navigation?: Snippet<[AppShellNavigationContext]>;
        /**
         * Where the `navigation` goes. `auto` follows the viewport in CSS:
         * tabs below 48rem (768px), a rail from 48rem, a sidebar from 64rem
         * (1024px). The others apply at every width.
         */
        navigationPlacement?: AppShellNavigationMode;
        /**
         * Without a `header`, leaves out the padding the content has for the
         * status bar and the notch, so it starts at the top of the screen and
         * handles the safe area itself. `--app-shell-top-inset` keeps its
         * value. With a `header` it does nothing: the header covers the safe
         * area.
         */
        flushTop?: boolean;
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
        navigation,
        navigationPlacement = "auto",
        flushTop = false,
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

    let navRegion: HTMLDivElement | undefined = $state();
    /** Measured size of the navigation region in px; null on the server and until the first measurement. */
    let navBox = $state<{ width: number; height: number } | null>(null);
    /** What the viewport says in `auto`, after mount. `tabs` before, as on the server. */
    let viewportPlacement = $state<AppShellNavigationPlacement>("tabs");
    const placement = $derived<AppShellNavigationPlacement>(
        navigationPlacement === "auto" ? viewportPlacement : navigationPlacement,
    );
    /** The navigation lies over the bottom of the scroller, like a footer. */
    const navigationOverlays = $derived(!!navigation && placement === "tabs");

    // The same two breakpoints as the stylesheet below, for the `placement` the snippet is given.
    $effect(() => {
        if (!navigation || navigationPlacement !== "auto") return;
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
        const rail = window.matchMedia(`(min-width: ${APP_SHELL_RAIL_MIN_WIDTH})`);
        const sidebar = window.matchMedia(`(min-width: ${APP_SHELL_SIDEBAR_MIN_WIDTH})`);
        const read = () => {
            viewportPlacement = sidebar.matches ? "sidebar" : rail.matches ? "rail" : "tabs";
        };
        read();
        rail.addEventListener?.("change", read);
        sidebar.addEventListener?.("change", read);
        return () => {
            rail.removeEventListener?.("change", read);
            sidebar.removeEventListener?.("change", read);
        };
    });

    $effect(() => {
        const region = navRegion;
        if (!region) {
            navBox = null;
            return;
        }
        const measure = () => {
            const { width, height } = region.getBoundingClientRect();
            navBox = width > 0 && height > 0 ? { width, height } : null;
        };
        measure();
        if (typeof ResizeObserver === "undefined") return;
        const observer = new ResizeObserver(measure);
        observer.observe(region);
        return () => observer.disconnect();
    });

    let scroller: HTMLDivElement | undefined = $state();
    /** Content is under the header / the footer. False until the browser has measured. */
    let scrolledTop = $state(false);
    let scrolledBottom = $state(false);
    /** How far the header wrapper sticks above the top of the scroller: a large title's row (px). */
    let headerOverscroll = $state(0);
    /**
     * What the `AppShellHeaderPart`s measure to: the px that cover content while
     * the stuck parts are stuck (status bar strip included) and how far the
     * content scrolls before it passes under them. Null without parts, on the
     * server and until measured.
     */
    let partsLayout = $state<{ inset: number; threshold: number } | null>(null);
    let strip: HTMLDivElement | undefined = $state();

    markAppShell({
        get scrolledTop() {
            return scrolledTop;
        },
        get scrolledBottom() {
            return scrolledBottom;
        },
        get footerOverlays() {
            return !!footer || navigationOverlays;
        },
        get footerHeight() {
            return (footer ? (footerHeight ?? 0) : 0) + (navigationOverlays ? (navBox?.height ?? 0) : 0);
        },
        get navigationPlacement() {
            return navigation ? placement : "tabs";
        },
        setHeaderOverscroll(px) {
            headerOverscroll = px > 0 ? px : 0;
        },
    });

    $effect(() => {
        if (!scroller) return;
        // Under the header means past the large title's row, when there is one.
        return watchScrollEdge(
            scroller,
            (edge) => {
                scrolledTop = edge.top;
                scrolledBottom = edge.bottom;
            },
            partsLayout ? partsLayout.threshold : headerOverscroll,
        );
    });

    /** Stuck parts may cover this much of the scroller; the lower ones then scroll (WCAG 2.4.11, 200% text). */
    const PARTS_MAX_COVER = 0.4;

    $effect(() => {
        const region = headerRegion;
        const area = scroller;
        if (!region || !area) {
            partsLayout = null;
            return;
        }
        const partsOf = () =>
            Array.from(region.querySelectorAll<HTMLElement>(":scope > [data-app-shell-part]"));
        const heightOf = (part: HTMLElement) => part.getBoundingClientRect().height;

        const layout = () => {
            const parts = partsOf();
            const env = strip ? strip.getBoundingClientRect().height : 0;
            const heights = parts.map(heightOf);
            // No parts, or no layout (a hidden shell, a test DOM): the header measure applies.
            if (parts.length === 0 || heights.every((height) => height === 0)) {
                for (const part of parts) part.removeAttribute("data-released");
                partsLayout = null;
                return;
            }
            const overscrolls = parts.map((part) => Number(part.dataset.overscroll) || 0);
            let natural = 0;
            const items = parts.map((part, index) => {
                const top = natural;
                natural += heights[index];
                return {
                    part,
                    natural: top,
                    height: heights[index],
                    overscroll: overscrolls[index],
                    sticky: part.dataset.sticky === "true",
                    // Pads the status bar itself: an AppBar, or the part at the very top.
                    atTop: index === 0 || part.querySelector("[data-appbar]") !== null,
                };
            });
            const stuck = items.filter((item) => item.sticky);
            // The stack, top down, for the first `count` stuck parts.
            const stack = (count: number) => {
                let cover = 0;
                const placed = stuck.slice(0, count).map((item, index) => {
                    if (index === 0) cover = item.atTop ? 0 : env;
                    const top = cover - item.overscroll;
                    cover = top + item.height;
                    return { item, top };
                });
                return { placed, cover: placed.length ? cover : env };
            };
            let count = stuck.length;
            const limit = area.clientHeight * PARTS_MAX_COVER;
            // Keep at least the first: a stack of one is the author's choice.
            while (count > 1 && area.clientHeight > 0 && stack(count).cover > limit) count -= 1;
            const { placed, cover } = stack(count);
            const released = new Set(stuck.slice(count).map((item) => item.part));
            for (const item of items) {
                if (released.has(item.part)) item.part.setAttribute("data-released", "");
                else item.part.removeAttribute("data-released");
            }
            for (const { item, top } of placed) {
                item.part.style.setProperty("--app-shell-part-top", `${top}px`);
            }
            const last = placed[placed.length - 1];
            // Content is under the stuck parts once the lowest has reached its place.
            const threshold = last ? Math.max(0, last.item.natural - last.top) : 0;
            const current = untrack(() => partsLayout);
            if (!current || current.inset !== cover || current.threshold !== threshold) {
                partsLayout = { inset: cover, threshold };
            }
        };

        const resize = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(layout);
        const watch = () => {
            if (!resize) return;
            resize.disconnect();
            resize.observe(area);
            if (strip) resize.observe(strip);
            for (const part of partsOf()) resize.observe(part);
        };
        // Parts come and go, and `sticky` and a large title's height change.
        const changes =
            typeof MutationObserver === "undefined"
                ? undefined
                : new MutationObserver(() => {
                      watch();
                      layout();
                  });
        changes?.observe(region, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-sticky", "data-overscroll"],
        });
        watch();
        untrack(layout);
        return () => {
            resize?.disconnect();
            changes?.disconnect();
            partsLayout = null;
        };
    });

    $effect(() => track(headerRegion, (height) => (headerHeight = height)));
    $effect(() => track(footerRegion, (height) => (footerHeight = height)));

    const topInset = $derived(
        !header
            ? "env(safe-area-inset-top, 0px)"
            : partsLayout
              ? `${partsLayout.inset}px`
              : headerHeight === null
                ? HEADER_ESTIMATE
                : // What covers content while scrolled: the header less the large row that scrolls away.
                  `${Math.max(0, headerHeight - headerOverscroll)}px`,
    );
    /** The footer's height: measured, or the estimate. */
    const footerPart = $derived(
        footer ? (footerHeight === null ? FOOTER_ESTIMATE : `${footerHeight}px`) : null,
    );
    /** The tabs' height when the navigation lies over the bottom: measured, or the estimate. */
    const navigationPart = $derived(
        navigationOverlays ? (navBox === null ? FOOTER_ESTIMATE : `${navBox.height}px`) : null,
    );
    /**
     * What lies over the bottom of the content, resolved for the placement the
     * script knows. The host itself says it in CSS (see `hostStyle`), which is
     * right before any script runs; this value is for `<html>`, where the
     * stylesheet's own properties do not reach.
     */
    const bottomInset = $derived(
        footerPart && navigationPart
            ? `calc(${footerPart} + ${navigationPart})`
            : (footerPart ?? navigationPart ?? "env(safe-area-inset-bottom, 0px)"),
    );
    const startInset = $derived(
        !navigation
            ? undefined
            : placement === "tabs"
              ? "0px"
              : navBox
                ? `${navBox.width}px`
                : placement === "rail"
                  ? "80px"
                  : "256px",
    );
    /**
     * With a navigation the bottom inset and the start inset are CSS
     * expressions over the placement, so they are right on the server; the
     * measured sizes only replace the estimates in them.
     */
    const hostStyle = $derived(
        navigation
            ? `--app-shell-top-inset: ${topInset}; --app-shell-bottom-inset: calc(var(--shell-overlay) + ${footer ? "0px" : "var(--shell-safe-bottom)"}); --app-shell-start-inset: var(--shell-start); --shell-footer: ${footerPart ?? "0px"};${navBox ? ` --shell-nav-h: ${navBox.height}px; --shell-nav-w: ${navBox.width}px;` : ""} ${style}`
            : `--app-shell-top-inset: ${topInset}; --app-shell-bottom-inset: ${bottomInset}; ${style}`,
    );

    // On `<html>` as well, for what is rendered outside the shell.
    let published: ReturnType<typeof publishAppShellInsets> | undefined;
    $effect(() => {
        published = untrack(() => publishAppShellInsets(topInset, bottomInset, startInset));
        return () => {
            published?.leave();
            published = undefined;
        };
    });
    $effect(() => {
        published?.update(topInset, bottomInset, startInset);
    });

    const contentClasses = $derived(
        navigation
            ? cn(
                  // A rail or sidebar clears the inline-start safe area itself: not twice.
                  "min-w-0 flex-1 pl-(--shell-content-pl) pr-[env(safe-area-inset-right)]",
                  !header && !flushTop && "pt-[env(safe-area-inset-top)]",
                  // Whatever lies over the bottom (footer, tabs), or the safe area alone.
                  "pb-(--app-shell-bottom-inset)",
              )
            : cn(
                  "min-w-0 flex-1 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
                  !header && !flushTop && "pt-[env(safe-area-inset-top)]",
                  // With a footer over the scroller the content ends above it.
                  footer ? "pb-(--app-shell-bottom-inset)" : "pb-[env(safe-area-inset-bottom)]",
              ),
    );
    /** Whether the content ends above something that lies over the scroller. */
    const padsBottom = $derived(!!footer || !!navigation);
</script>

{#snippet body()}
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
            padsBottom && "scroll-pb-(--app-shell-bottom-inset)",
        )}
        style="--app-shell-footer-overlay: {navigation
            ? 'var(--shell-overlay)'
            : footer
              ? 'var(--app-shell-bottom-inset)'
              : '0px'}"
    >
        {#if header}
            <!-- With header parts: the status bar's strip. Clear at rest, the glass of the bars once
            content is under the stuck parts, so content never shows through the status bar when
            the first part has scrolled away. It takes no room. -->
            <div
                bind:this={strip}
                data-app-shell-strip
                aria-hidden="true"
                data-scrolled-under={String(scrolledTop)}
                class="material-bar app-shell-strip [--color-bar:transparent]"
            ></div>
            <!-- An empty strip is left when the bar slides away; it must not take taps. -->
            <div
                bind:this={headerRegion}
                data-app-shell-header
                style:top={headerOverscroll > 0 ? `-${headerOverscroll}px` : undefined}
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
        <!-- Over the bottom of the scroller, not a row of its own: content passes beneath it.
        Above the tabs when the navigation is placed there. -->
        <div
            bind:this={footerRegion}
            data-app-shell-footer
            class={cn(
                "absolute inset-x-0",
                navigation ? "bottom-(--shell-nav-bottom)" : "bottom-0",
                "z-sticky",
            )}
        >
            {@render footer()}
        </div>
    {/if}
{/snippet}

<div
    data-app-shell
    class={cn(
        navigation
            ? "relative flex h-dvh w-full overflow-hidden text-body"
            : "relative flex h-dvh w-full flex-col overflow-hidden text-body",
        canvas ? "bg-canvas" : "bg-background",
        className,
    )}
    class:app-shell--nav={!!navigation}
    data-navigation-placement={navigation ? navigationPlacement : undefined}
    data-scrolled-top={String(scrolledTop)}
    data-scrolled-bottom={String(scrolledBottom)}
    style={hostStyle}
    {...restProps}
>
    {#if navigation}
        <!-- First in the DOM: Tab reaches the navigation, then the header, then the content.
        Over the bottom as tabs, a column at the start as a rail or a sidebar: the stylesheet
        below moves it, the snippet is rendered once. -->
        <div bind:this={navRegion} data-app-shell-navigation class="shell-nav z-sticky">
            {@render navigation({ placement })}
        </div>
        <div data-app-shell-column class="relative flex min-h-0 min-w-0 flex-1 flex-col">
            {@render body()}
        </div>
    {:else}
        {@render body()}
    {/if}
</div>

<style>
    /*
     * Global on purpose: a scoped class would be added to every element of the
     * shell, and a shell without `navigation` renders what it always did.
     *
     * The navigation's placement is two things: the host's data attribute
     * (forced) or the viewport (`auto`, below 48rem tabs, from 48rem a rail,
     * from 64rem a sidebar: the constants in util/app-shell.ts). Both only set
     * the same two flags; every length the shell uses is derived from them, so
     * the rules are written once. `--is-side` is 1 for a rail or a sidebar,
     * `--is-wide` is 1 for a sidebar. Server and client render the same
     * markup; only these rules decide.
     */
    :global(.app-shell--nav) {
        --is-side: 0;
        --is-wide: 0;
        /* A flex item of the host as a column, over the bottom as tabs. */
        --nav-position: absolute;
        /* What the navigation takes over the bottom: its height as tabs, nothing as a side column. */
        --shell-nav-bottom: calc(
            (1 - var(--is-side)) * var(--shell-nav-h, calc(64px + env(safe-area-inset-bottom, 0px)))
        );
        /* The width of the side column: the estimates until the shell has measured it. */
        --shell-start: calc(var(--is-side) * var(--shell-nav-w, calc(80px + var(--is-wide) * 176px)));
        /* Without a footer, a side column leaves the safe area under the content. Tabs carry their own. */
        --shell-safe-bottom: calc(var(--is-side) * env(safe-area-inset-bottom, 0px));
        /* The side column clears the inline-start safe area itself. */
        --shell-content-pl: calc((1 - var(--is-side)) * env(safe-area-inset-left, 0px));
        /* Everything that lies over the bottom of the content: footer plus tabs. */
        --shell-overlay: calc(var(--shell-footer, 0px) + var(--shell-nav-bottom));
    }
    :global(.app-shell--nav[data-navigation-placement="rail"]),
    :global(.app-shell--nav[data-navigation-placement="sidebar"]) {
        --is-side: 1;
        --nav-position: static;
    }
    :global(.app-shell--nav[data-navigation-placement="sidebar"]) {
        --is-wide: 1;
    }
    @media (min-width: 48rem) {
        :global(.app-shell--nav[data-navigation-placement="auto"]) {
            --is-side: 1;
            --nav-position: static;
        }
    }
    @media (min-width: 64rem) {
        :global(.app-shell--nav[data-navigation-placement="auto"]) {
            --is-wide: 1;
        }
    }

    /*
     * Header parts. A header whose children are `AppShellHeaderPart`s is not
     * one sticky block: the wrapper drops out of the layout so that each part
     * is a flex item of the scroller and sticks (or not) by itself. The
     * decision is made in CSS, so the server's markup is right.
     */
    :global([data-app-shell-header]:has(> [data-app-shell-part])) {
        display: contents;
    }
    :global(.app-shell-strip) {
        display: none;
    }
    /* The strip is only for parts: the height of the status bar, taking no room, over the stuck parts' place. */
    :global(.app-shell-strip:has(+ [data-app-shell-header] > [data-app-shell-part])) {
        display: block;
        position: sticky;
        top: 0;
        z-index: var(--z-sticky);
        flex-shrink: 0;
        height: env(safe-area-inset-top, 0px);
        margin-bottom: calc(-1 * env(safe-area-inset-top, 0px));
        pointer-events: none;
    }
    /* The surface is the bars' (`material-bar`): glass without the hairline, which belongs to the lowest part. */
    :global(.app-shell-strip::before) {
        border-width: 0;
    }

    :global(.shell-nav) {
        position: var(--nav-position);
        inset-inline: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        flex: none;
        min-height: 0;
    }
</style>
