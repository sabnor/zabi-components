<script lang="ts">
    import Bell from "@lucide/svelte/icons/bell";
    import House from "@lucide/svelte/icons/house";
    import Pencil from "@lucide/svelte/icons/pencil";
    import Trophy from "@lucide/svelte/icons/trophy";
    import FloatingActionButton from "../../../components/atoms/FloatingActionButton.svelte";
    import BottomTabBar from "../../../components/molecules/BottomTabBar.svelte";
    import AppShell from "../../../components/organisms/AppShell.svelte";
    import type { BottomTabBarItem } from "../../../components/util/bottom-tab-bar.js";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const items: BottomTabBarItem[] = [
        { href: "/home", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/inbox", label: "Inbox", icon: Bell },
    ];

    const rounds = Array.from({ length: 12 }, (_, index) => `Round ${index + 1}`);

    let count = $state(0);

    function stayHere(event: MouseEvent) {
        if ((event.target as Element).closest("a")) event.preventDefault();
    }
</script>

<!-- In a phone-sized frame: an AppShell places the button against itself. On
its own, outside a shell, the button is fixed to the screen.
`div`, because this page has its own `<main>`. -->
<div class="w-full space-y-3">
    <p class="text-sm text-description" data-testid="fab-demo-count-{exampleIndex}">
        Pressed {count} times.
    </p>
    <div class="mx-auto h-[28rem] overflow-hidden rounded-container border border-border sm:w-96">
        <AppShell class="h-full" contentElement="div" data-testid="fab-demo-shell-{exampleIndex}">
            <!-- `pb-24`: room for the last row to scroll clear of the button. -->
            <ul class="m-0 list-none space-y-3 p-4 pb-24">
                {#each rounds as round (round)}
                    <li class="rounded-container border border-border bg-card p-4 text-body">
                        {round}
                    </li>
                {/each}
            </ul>
            {#if exampleIndex === 0}
                <FloatingActionButton label="New quiz" onclick={() => (count += 1)} />
            {:else}
                <FloatingActionButton
                    label="Write a question"
                    icon={Pencil}
                    extended
                    position="bottom-center"
                    onclick={() => (count += 1)}
                />
            {/if}
            {#snippet footer()}
                <BottomTabBar {items} active="/quiz" onclick={stayHere} />
            {/snippet}
        </AppShell>
    </div>
</div>
