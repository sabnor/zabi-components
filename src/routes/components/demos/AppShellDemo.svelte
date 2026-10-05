<script lang="ts">
    import Bell from "@lucide/svelte/icons/bell";
    import House from "@lucide/svelte/icons/house";
    import Plus from "@lucide/svelte/icons/plus";
    import Search from "@lucide/svelte/icons/search";
    import Share2 from "@lucide/svelte/icons/share-2";
    import Trophy from "@lucide/svelte/icons/trophy";
    import User from "@lucide/svelte/icons/user";
    import Users from "@lucide/svelte/icons/users";
    import Button from "../../../components/atoms/Button.svelte";
    import IconButton from "../../../components/atoms/IconButton.svelte";
    import AppBar from "../../../components/molecules/AppBar.svelte";
    import BottomTabBar from "../../../components/molecules/BottomTabBar.svelte";
    import AppShell from "../../../components/organisms/AppShell.svelte";
    import type { BottomTabBarItem } from "../../../components/util/bottom-tab-bar.js";
    import type { DemoRendererProps } from "./types";

    // One example, so the index is not read.
    const _props: DemoRendererProps = $props();

    const items: BottomTabBarItem[] = [
        { href: "/home", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/teams", label: "Teams", icon: Users },
        { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
        { href: "/me", label: "Me", icon: User },
    ];

    /** Long enough to scroll on any phone. */
    const rounds = Array.from({ length: 24 }, (_, index) => ({
        name: `Round ${index + 1}`,
        text: "Ten questions, one point each. Hand in the sheet before the bell.",
    }));

    let active = $state("/quiz");
    let fullScreen = $state(false);
    let lastAction = $state("none yet");
    const title = $derived(items.find((item) => item.href === active)?.label ?? "");

    /** The tabs are real links; this page has nowhere for them to go. */
    function stayHere(event: MouseEvent) {
        const link = (event.target as Element).closest("a");
        if (!link) return;
        event.preventDefault();
        active = link.getAttribute("href") ?? active;
    }
</script>

{#snippet shell(className: string)}
    <!-- `div`, because this page has its own `<main>`. In an app, leave it out. -->
    <AppShell class={className} contentElement="div" data-testid="app-shell-demo">
        {#snippet header()}
            <AppBar
                {title}
                headingLevel={2}
                collapseOnScroll
                onback={fullScreen ? () => (fullScreen = false) : undefined}
                backLabel="Close full screen"
            >
                {#snippet actions()}
                    <IconButton
                        variant="ghost"
                        size="lg"
                        label="Search"
                        onclick={() => (lastAction = "Search")}
                    >
                        <Search size={20} />
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        size="lg"
                        label="Share"
                        onclick={() => (lastAction = "Share")}
                    >
                        <Share2 size={20} />
                    </IconButton>
                {/snippet}
            </AppBar>
        {/snippet}
        <ul class="m-0 list-none space-y-3 p-4">
            {#each rounds as round (round.name)}
                <li class="rounded-container border border-border bg-card p-4">
                    <p class="font-medium text-headline">{round.name}</p>
                    <p class="text-sm text-description">{round.text}</p>
                </li>
            {/each}
        </ul>
        <!-- Placed against the shell, above the tab bar, with the shell's own
        measure of that bar. It does not scroll with the content. -->
        <IconButton
            size="lg"
            label="New quiz"
            class="absolute right-4 bottom-[calc(var(--app-shell-bottom-inset)+1rem)] rounded-pill shadow-lg"
            onclick={() => (lastAction = "New quiz")}
        >
            <Plus size={24} />
        </IconButton>
        {#snippet footer()}
            <BottomTabBar {items} {active} onclick={stayHere} />
        {/snippet}
    </AppShell>
{/snippet}

{#if fullScreen}
    <!-- Over the whole page, so the shell is as tall as the screen. -->
    <div class="fixed inset-0 z-modal" data-testid="app-shell-demo-full-screen">
        {@render shell("")}
    </div>
{:else}
    <div class="w-full space-y-3">
        <div class="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onclick={() => (fullScreen = true)}>
                Open full screen
            </Button>
            <p class="text-sm text-description" data-testid="app-shell-demo-action">
                Last action: {lastAction}
            </p>
        </div>
        <!-- A phone-sized frame. In an app the shell fills the screen and has no frame. -->
        <div
            class="mx-auto h-[36rem] w-full overflow-hidden rounded-container border border-border sm:w-96"
        >
            {@render shell("h-full")}
        </div>
    </div>
{/if}
