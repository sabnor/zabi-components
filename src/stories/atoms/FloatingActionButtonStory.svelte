<script lang="ts">
    import Bell from '@lucide/svelte/icons/bell';
    import House from '@lucide/svelte/icons/house';
    import Pencil from '@lucide/svelte/icons/pencil';
    import Trophy from '@lucide/svelte/icons/trophy';
    import FloatingActionButton from '../../components/atoms/FloatingActionButton.svelte';
    import BottomTabBar from '../../components/molecules/BottomTabBar.svelte';
    import AppShell from '../../components/organisms/AppShell.svelte';
    import type { BottomTabBarItem } from '../../components/util/bottom-tab-bar.js';

    interface Props {
        label?: string;
        extended?: boolean;
        position?: 'bottom-end' | 'bottom-start' | 'bottom-center';
        /** Use a pencil instead of the default plus sign. */
        pencil?: boolean;
        /** Render a link instead of a button. */
        asLink?: boolean;
        /** Show a tab bar under it. */
        withTabBar?: boolean;
        /** Width of the phone frame in px. */
        frameWidth?: 320 | 360 | 390;
    }

    let {
        label = 'New quiz',
        extended = false,
        position = 'bottom-end',
        pencil = false,
        asLink = false,
        withTabBar = true,
        frameWidth = 360,
    }: Props = $props();

    const items: BottomTabBarItem[] = [
        { href: '/home', label: 'Home', icon: House },
        { href: '/quiz', label: 'Quiz', icon: Trophy },
        { href: '/inbox', label: 'Inbox', icon: Bell },
    ];

    const rounds = Array.from({ length: 12 }, (_, index) => `Round ${index + 1}`);
    let count = $state(0);

    function stayHere(event: MouseEvent) {
        if ((event.target as Element).closest('a')) event.preventDefault();
    }
</script>

{#snippet footer()}
    <BottomTabBar {items} active="/quiz" onclick={stayHere} />
{/snippet}

<!-- A phone-sized frame holding an AppShell, which places the button against
itself. On its own, outside a shell, the button is fixed to the screen. -->
<div class="space-y-3">
    <p class="text-sm text-description">Pressed {count} times.</p>
    <div
        class="overflow-hidden rounded-container border border-border"
        style="width: {frameWidth}px;"
    >
        <AppShell class="h-[32rem]" footer={withTabBar ? footer : undefined}>
            <!-- `pb-24`: room for the last row to scroll clear of the button. -->
            <ul class="m-0 list-none space-y-3 p-4 pb-24">
                {#each rounds as round (round)}
                    <li class="rounded-container border border-border bg-card p-4 text-body">
                        {round}
                    </li>
                {/each}
            </ul>
            <FloatingActionButton
                {label}
                {extended}
                {position}
                icon={pencil ? Pencil : undefined}
                href={asLink ? '#new' : undefined}
                onclick={(event) => {
                    event.preventDefault();
                    count += 1;
                }}
            />
        </AppShell>
    </div>
</div>
