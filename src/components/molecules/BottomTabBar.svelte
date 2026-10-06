<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import Badge from "../atoms/Badge.svelte";
    import { getAppShell, isDevBuild } from "../util/app-shell.js";
    import {
        activeTabHref,
        badgeText,
        defaultBadgeLabel,
        type BottomTabBarItem,
    } from "../util/bottom-tab-bar.js";
    import { cn } from "../util/cn.js";
    import { resolveScrolledUnder, watchScrollEdge, type ScrollEdgeMode } from "../util/scroll-edge.js";

    /**
     * The navigation bar at the bottom of a phone screen: three to five
     * destinations, each an icon over a short label, within reach of a thumb.
     *
     * The tabs are links. Pressing the active one is an ordinary navigation to
     * the page you are on; nothing is ever deselected.
     *
     * On its own the bar is fixed over the page and reserves no room. Give the
     * page `padding-bottom` and `scroll-padding-bottom` of the bar's height
     * (`calc(64px + env(safe-area-inset-bottom))`), or the end of the
     * content, and a focused control there, sits under it. `AppShell` does
     * this for you.
     *
     * The bar is one row, 64px tall, at every width and text size. It is
     * chrome: when the reader enlarges text, the room belongs to the page.
     * So its sizes are in px; a label is one line, grows with the text only
     * up to 1.3 times its size and no further than its tab has room for, and
     * is cut with an ellipsis, never inside a word, when it still does not
     * fit. Where a tab is narrower than 52px (five tabs below 260px) the bar
     * shows icons only. The link is always named by its full label.
     *
     * The bar is flush with the page and page-coloured at rest; once content
     * is under it (not at the end of what scrolls) it turns to frosted glass
     * with a hairline above it. Inside an `AppShell` the shell says when; on
     * its own the bar watches the window.
     *
     * With `floating` the bar is a glass capsule inset from the screen edges
     * instead: always glass, since content is always under it.
     *
     * ```svelte
     * <BottomTabBar
     *     items={[
     *         { href: "/", label: "Home", icon: House },
     *         { href: "/quiz", label: "Quiz", icon: Trophy },
     *         { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
     *     ]}
     *     active={page.url.pathname}
     * />
     * ```
     */
    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        /** Three to five destinations. */
        items: BottomTabBarItem[];
        /**
         * The href of the active tab, or the path of the current page: the tab
         * for that page or the closest one above it is marked. Left out, the
         * bar reads the address of the page once it runs in the browser. In
         * SvelteKit pass `page.url.pathname`, so the server marks it too.
         */
        active?: string;
        /** Accessible name of the navigation landmark. */
        label?: string;
        /**
         * What a badge adds to the tab's accessible name, after the label and
         * a comma. Replace it to translate or to say what is being counted.
         */
        badgeLabel?: (count: number, item: BottomTabBarItem) => string;
        /** Counts above this show as `99+`. The accessible name keeps the real count. */
        badgeMax?: number;
        /**
         * `fixed` pins the bar to the bottom of the screen; `static` leaves it
         * where it is in the page. Defaults to `fixed`, or to `static` inside
         * an `AppShell`, which places the bar itself.
         */
        position?: "fixed" | "static";
        /**
         * When the bar shows the glass and the hairline. `auto` follows the
         * scroll position: flush at the end of the content, glass while
         * content is under it. `always` is glass all the time, `never` flush
         * all the time.
         */
        scrollEdge?: ScrollEdgeMode;
        /**
         * Draws the bar as a rounded capsule of glass, inset 12px from the
         * screen edges (and from the home indicator), instead of edge to edge.
         * Always the regular material, because content is always under it, so
         * `scrollEdge` has no effect. The height a shell measures includes
         * the 12px. The landmark, the safe-area insets and the position stay
         * on the `<nav>`.
         */
        floating?: boolean;
        class?: string;
    };

    let {
        items,
        active,
        label = "Main",
        badgeLabel = defaultBadgeLabel,
        badgeMax = 99,
        position,
        scrollEdge = "auto",
        floating = false,
        class: className = "",
        ...restProps
    }: Props = $props();

    const shell = getAppShell();
    const inShell = shell !== undefined;
    const resolvedPosition = $derived(position ?? (inShell ? "static" : "fixed"));

    let host: HTMLElement | undefined = $state();
    /** Content is under the bar: from the shell if there is one, else from the window. */
    let ownScrolled = $state(false);
    $effect(() => {
        if (shell || scrollEdge !== "auto" || !host) return;
        return watchScrollEdge(null, (edge) => (ownScrolled = edge.bottom));
    });
    const scrolledUnder = $derived(
        resolveScrolledUnder(scrollEdge, shell ? shell.scrolledBottom : ownScrolled),
    );

    /**
     * The page's own path, used while `active` is not given. Empty on the
     * server and until the bar has mounted: nothing here may read `location`
     * while rendering.
     */
    let locationPath = $state("");

    $effect(() => {
        if (active !== undefined) return;
        const read = () => {
            locationPath = window.location.pathname;
        };
        read();
        // Back and forward, and every other same-document navigation where the
        // browser reports them. A router that only calls `history.pushState`
        // is not seen by a browser without the Navigation API: pass `active`.
        window.addEventListener("popstate", read);
        const navigation = (window as { navigation?: EventTarget }).navigation;
        navigation?.addEventListener("currententrychange", read);
        return () => {
            window.removeEventListener("popstate", read);
            navigation?.removeEventListener("currententrychange", read);
        };
    });

    const activeHref = $derived(activeTabHref(items, active ?? locationPath));

    $effect(() => {
        if (!isDevBuild()) return;
        if (items.length < 3 || items.length > 5) {
            console.warn(
                `[zabi-components] BottomTabBar is made for 3 to 5 items and got ${items.length}. ` +
                    "With fewer, use links in the page; with more, move the rest into a menu.",
            );
        }
    });

    /**
     * The colours are chosen here, not with an `aria-[current=page]:` variant:
     * the hand-written colour classes sit outside Tailwind's cascade layer and
     * would beat it (see TopNavbar).
     */
    function linkClasses(isActive: boolean): string {
        // Every size is in px (the nav sets `--spacing: 4px`): in rem they
        // doubled with the text size, and the bar was 177px tall at 200%.
        //
        // Radius: the active pill (32px high, so 16px at its ends) sits 4px
        // inside this box on every side, so the box takes that radius plus
        // the 4px. No gap between pill and label: 32px and a 16px line in a
        // 56px box leave the same 4px above and below as at the sides.
        const base =
            "focus-ring focus-ring--nav flex min-h-14 w-full min-w-0 flex-col items-center justify-center gap-0 rounded-[20px] px-[4px] text-center no-underline transition-colors duration-(--duration-base) motion-reduce:transition-none";
        return isActive
            ? cn(base, "font-semibold text-nav-menu-item-active")
            : cn(
                  base,
                  "font-medium text-nav-menu-item hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-surface-active",
              );
    }
</script>

<nav
    bind:this={host}
    aria-label={label}
    data-position={resolvedPosition}
    data-bar-edge="bottom"
    data-scrolled-under={String(scrolledUnder)}
    data-floating={floating ? "true" : undefined}
    class={cn(
        "tabbar [--spacing:4px]",
        floating
            ? // Transparent: the capsule inside carries the glass. The gaps around
              // it let clicks through to the page.
              "pointer-events-none pb-[calc(env(safe-area-inset-bottom)+12px)] pl-[calc(env(safe-area-inset-left)+12px)] pr-[calc(env(safe-area-inset-right)+12px)]"
            : // Clear of the home indicator, and of the rounded corners in landscape.
              "material-bar pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
        // The layer of the material is placed against the bar, so it is always positioned.
        resolvedPosition === "fixed" ? "fixed inset-x-0 bottom-0 z-sticky" : "relative",
        className,
    )}
    style:--tabbar-count={items.length}
    {...restProps}
>
    <!-- 8px between the tabs and at the sides while every tab can be 52px
    wide; less as the bar narrows, down to none, so the tabs keep the width a
    label needs for as long as there is any. See the style block. -->
    {#if floating}
        <!-- Radius: the tab's box is 20px and sits the list's gap (8px, less
        in a narrow bar) inside the capsule on all four sides, so the capsule
        is 20px plus that gap: outer radius = inner radius + padding. See
        `.tabbar-capsule` in the style block. -->
        <div class="tabbar-capsule material-layer-regular pointer-events-auto relative">
            {@render tabs()}
        </div>
    {:else}
        {@render tabs()}
    {/if}
</nav>

{#snippet tabs()}
    <ul class="tabbar-list m-0 flex list-none items-stretch py-1">
        {#each items as item (item.href)}
            {@const isActive = item.href === activeHref}
            {@const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon}
            {@const count = item.badge ?? 0}
            <li class="tabbar-tab flex">
                <!-- The name is spelled out when there is a count: built from
                the content, a browser reads "Inbox , 3 new" or leaves the
                count out, depending on how it treats the hidden text. It
                starts with the visible label, so voice control still finds it. -->
                <a
                    href={item.href}
                    class={linkClasses(isActive)}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={count > 0 ? `${item.label}, ${badgeLabel(count, item)}` : undefined}
                >
                    <!-- The pill is the active mark, with no outline: a pill with a
                    ring is what keyboard focus looks like, and the bar would
                    seem to hold focus. Selection is not by colour alone. The
                    set of marks tells the active tab apart: the pill, the
                    icon (the filled `activeIcon`, or the same icon drawn
                    heavier), the semibold label and the active colour (4.5:1
                    for the label on the pill). WCAG 1.4.11 is met by the set,
                    not by the fill, which is within a shade of the bar. In
                    forced-colors mode the fill is dropped, so the pill gets
                    an outline in a system colour there only and the active
                    tab keeps a shape. Decorative with all it holds: the label
                    names the tab. -->
                    <span
                        aria-hidden="true"
                        class={cn(
                            "flex h-8 w-[min(56px,100%)] shrink-0 items-center justify-center rounded-pill transition-colors duration-(--duration-base) motion-reduce:transition-none",
                            isActive &&
                                "bg-tabbar-active text-nav-menu-item-active forced-colors:outline-2 forced-colors:-outline-offset-2 forced-colors:outline-[color:Highlight]",
                        )}
                    >
                        <!-- The badge is placed against the icon's own 24px
                        box, in px: from its upper end corner outwards. It
                        covers that corner by 8px and no more, whatever the
                        text size and however narrow the pill is. -->
                        <span class="relative flex size-6 shrink-0 items-center justify-center">
                            <Icon
                                size={24}
                                class="shrink-0"
                                strokeWidth={isActive && !item.activeIcon ? 2.5 : undefined}
                            />
                            {#if count > 0}
                                <Badge
                                    size="sm"
                                    emphasis="solid"
                                    variant="error"
                                    class="tabbar-badge ring-2 ring-(color:--color-bar) absolute start-4 bottom-4 h-[18px] min-h-[18px] min-w-[18px] px-[5px] py-0 text-[11px] leading-[18px] whitespace-nowrap"
                                >
                                    {badgeText(count, badgeMax)}
                                </Badge>
                            {/if}
                        </span>
                    </span>
                    <span class="tabbar-label">
                        {item.label}
                    </span>
                </a>
            </li>
        {/each}
    </ul>
{/snippet}

<style>
    /*
     * The bar measures itself: the tabs and the gaps are sized from its own
     * width and the number of tabs, not from the screen, so a bar in a narrow
     * column behaves like one on a narrow phone.
     */
    .tabbar {
        container: tabbar / inline-size;
    }

    /*
     * The room between the tabs and at the two sides is whatever is left
     * when every tab is 52px wide, shared out, and never more than 8px. So
     * the bar gives up its gaps before it gives up label room: five tabs are
     * 8px apart from 308px up (a 320px phone included), closer below that,
     * and touch at 260px.
     */
    .tabbar-list,
    .tabbar-capsule {
        --tabbar-gap: clamp(
            0px,
            calc((100cqi - var(--tabbar-count) * 52px) / (var(--tabbar-count) + 1)),
            8px
        );
    }

    .tabbar-list {
        gap: var(--tabbar-gap);
        padding-inline: var(--tabbar-gap);
    }

    /*
     * The floating capsule and the tabs inside it are nested rounded shapes,
     * so they are concentric: the tabs sit the same distance inside the
     * capsule above and below as at its two ends (the gap, in place of the
     * edge-to-edge bar's 4px), and the capsule's radius is the tab's 20px
     * plus that distance. At 8px the capsule is 72px tall with a 28px corner.
     */
    .tabbar-capsule {
        border-radius: calc(20px + var(--tabbar-gap));
    }

    .tabbar-capsule .tabbar-list {
        padding-block: var(--tabbar-gap);
    }

    /*
     * A tab is at least 44px wide for as long as that many fit the bar. When
     * they do not (five tabs below 220px), they share the bar edge to edge:
     * narrower than a full target, but never on top of each other, and the
     * bar never scrolls sideways. Each tab is a container too, so its label
     * can follow its width.
     */
    .tabbar-tab {
        flex: 1 1 0;
        min-width: min(44px, calc(100cqi / var(--tabbar-count)));
        container: tabbar-tab / inline-size;
    }

    /*
     * One line. 0.75rem, so it follows the reader's text size, but never
     * above 1.3 times its 12px, nor above what a nine-letter word needs to
     * fit the tab (18.5% of its width), and never below 11px. A label longer
     * than that is cut with an ellipsis, between letters but with the mark
     * that says so; it is not broken over lines.
     */
    .tabbar-label {
        display: block;
        width: 100%;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: clamp(11px, 0.75rem, min(15.6px, 18.5cqi));
        line-height: 16px;
    }

    /*
     * Narrower than 52px, a tab has no room for a word: icons only, for every
     * tab, the active one too, so the row reads as one thing. The label stays
     * in the page for the link's name; it is only not drawn.
     */
    @container tabbar-tab (max-width: 51.9px) {
        .tabbar-label {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
            white-space: nowrap;
        }
    }
</style>
