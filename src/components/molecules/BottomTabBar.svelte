<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import Badge from "../atoms/Badge.svelte";
    import { isDevBuild, isInsideAppShell } from "../util/app-shell.js";
    import {
        activeTabHref,
        badgeText,
        defaultBadgeLabel,
        type BottomTabBarItem,
    } from "../util/bottom-tab-bar.js";
    import { cn } from "../util/cn.js";

    /**
     * The navigation bar at the bottom of a phone screen: three to five
     * destinations, each an icon over a short label, within reach of a thumb.
     *
     * The tabs are links. Pressing the active one is an ordinary navigation to
     * the page you are on; nothing is ever deselected.
     *
     * On its own the bar is fixed over the page and reserves no room. Give the
     * page `padding-bottom` and `scroll-padding-bottom` of the bar's height
     * (`calc(4rem + 1px + env(safe-area-inset-bottom))` by default), or the
     * end of the content, and a focused control there, sits under it.
     * `AppShell` does this for you.
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
        class?: string;
    };

    let {
        items,
        active,
        label = "Main",
        badgeLabel = defaultBadgeLabel,
        badgeMax = 99,
        position,
        class: className = "",
        ...restProps
    }: Props = $props();

    const inShell = isInsideAppShell();
    const resolvedPosition = $derived(position ?? (inShell ? "static" : "fixed"));

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
        // The 44px floor and the side padding are in px on purpose: in rem
        // they would double with the text size, and five tabs would no longer
        // fit a 320px screen, or would leave a label one letter per line.
        //
        // Radius: the active pill (2rem high, so 1rem at its ends) sits 4px
        // inside this box on every side, so the box takes that radius plus
        // the 4px. No gap between pill and label: 2rem + 1rem of content in a
        // 3.5rem box leaves the same 4px above and below as at the sides.
        const base =
            "focus-ring focus-ring--nav flex min-h-14 w-full min-w-[44px] flex-col items-center justify-center gap-0 rounded-[calc(1rem+4px)] px-[4px] text-center text-xs leading-4 no-underline transition-colors duration-150 motion-reduce:transition-none";
        return isActive
            ? cn(base, "font-semibold text-nav-menu-item-active")
            : cn(
                  base,
                  "font-medium text-nav-menu-item hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-surface-active",
              );
    }
</script>

<nav
    aria-label={label}
    data-position={resolvedPosition}
    class={cn(
        "border-t border-border-weak bg-surface-elevated",
        // Clear of the home indicator, and of the rounded corners in landscape.
        "pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
        resolvedPosition === "fixed" && "fixed inset-x-0 bottom-0 z-sticky",
        className,
    )}
    {...restProps}
>
    <!-- 8px between the tabs and at the sides, in px for the same reason as
    the floor on each tab: the room belongs to the labels when text grows. -->
    <ul class="m-0 flex list-none items-stretch gap-[8px] px-[8px] py-1">
        {#each items as item (item.href)}
            {@const isActive = item.href === activeHref}
            {@const Icon = item.icon}
            {@const count = item.badge ?? 0}
            <li class="flex min-w-0 flex-1">
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
                    <!-- The pill is the active mark that does not depend on colour;
                    the icon on it takes the action colour. Decorative with all
                    it holds: the label names the tab. Its fill is dropped in
                    forced-colors mode, where the transparent outline is drawn
                    instead, so the active tab keeps a shape there too. -->
                    <span
                        aria-hidden="true"
                        class={cn(
                            "relative flex h-8 w-[min(3.5rem,100%)] items-center justify-center rounded-pill transition-colors duration-150 motion-reduce:transition-none",
                            isActive &&
                                "bg-nav-menu-active text-(color:--color-action-primary) outline-2 -outline-offset-2 outline-transparent",
                        )}
                    >
                        <Icon size={24} class="shrink-0" />
                        {#if count > 0}
                            <Badge
                                size="sm"
                                emphasis="solid"
                                class="absolute -top-1 end-0 min-w-5 px-1"
                            >
                                {badgeText(count, badgeMax)}
                            </Badge>
                        {/if}
                    </span>
                    <!-- Wraps instead of being cut off when the text is enlarged. -->
                    <span class="w-full min-w-0 hyphens-auto [overflow-wrap:anywhere]">
                        {item.label}
                    </span>
                </a>
            </li>
        {/each}
    </ul>
</nav>
