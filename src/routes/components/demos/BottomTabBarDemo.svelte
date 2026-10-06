<script lang="ts">
    import Bell from "@lucide/svelte/icons/bell";
    import BookOpen from "@lucide/svelte/icons/book-open";
    import House from "@lucide/svelte/icons/house";
    import LayoutGrid from "@lucide/svelte/icons/layout-grid";
    import Trophy from "@lucide/svelte/icons/trophy";
    import User from "@lucide/svelte/icons/user";
    import Users from "@lucide/svelte/icons/users";
    import BottomTabBar from "../../../components/molecules/BottomTabBar.svelte";
    import type { BottomTabBarItem } from "../../../components/util/bottom-tab-bar.js";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    /** This site's own sections, so the bar can find the page it is on. */
    const siteItems: BottomTabBarItem[] = [
        { href: "/", label: "Home", icon: House },
        { href: "/components", label: "Components", icon: LayoutGrid },
        { href: "/docs", label: "Docs", icon: BookOpen },
    ];

    const appItems: BottomTabBarItem[] = [
        { href: "/home", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/teams", label: "Teams", icon: Users },
        { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
        { href: "/me", label: "Me", icon: User, badge: 120 },
    ];

    let active = $state("/quiz");

    function stayHere(event: MouseEvent) {
        if ((event.target as Element).closest("a")) event.preventDefault();
    }

    /** The tabs are real links; this page has nowhere for them to go. */
    function select(event: MouseEvent) {
        const link = (event.target as Element).closest("a");
        if (!link) return;
        event.preventDefault();
        active = link.getAttribute("href") ?? active;
    }
</script>

<!-- `position="static"` keeps the bar inside the example. On its own in an
app it is fixed to the bottom of the screen. -->
{#if exampleIndex === 0}
    <div class="mx-auto overflow-hidden rounded-container border border-border sm:w-96">
        <p class="p-4 text-sm text-description">
            No active tab is passed: the bar marks the section this page is in.
            Navigation is turned off in this example.
        </p>
        <BottomTabBar
            items={siteItems}
            label="Site sections"
            position="static"
            onclick={stayHere}
            data-testid="bottom-tab-bar-demo"
        />
    </div>
{:else}
    <div class="mx-auto overflow-hidden rounded-container border border-border sm:w-96">
        <p class="p-4 text-sm text-description" data-testid="bottom-tab-bar-demo-active">
            Active: {active}
        </p>
        <BottomTabBar
            items={appItems}
            {active}
            label="Quiz app"
            position="static"
            badgeLabel={(count) => (count === 1 ? "1 unread" : `${count} unread`)}
            onclick={select}
            data-testid="bottom-tab-bar-demo-badges"
        />
    </div>
{/if}
