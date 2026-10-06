<script lang="ts">
    import Bell from '@lucide/svelte/icons/bell';
    import House from '@lucide/svelte/icons/house';
    import Search from '@lucide/svelte/icons/search';
    import Trophy from '@lucide/svelte/icons/trophy';
    import IconButton from '../../components/atoms/IconButton.svelte';
    import AppBar from '../../components/molecules/AppBar.svelte';
    import BottomTabBar from '../../components/molecules/BottomTabBar.svelte';
    import AppShell from '../../components/organisms/AppShell.svelte';
    import type { BottomTabBarItem } from '../../components/util/bottom-tab-bar.js';

    interface Props {
        /** Width of the phone frame in px. */
        frameWidth?: number;
        frameHeight?: number;
    }

    let { frameWidth = 390, frameHeight = 780 }: Props = $props();

    const items: BottomTabBarItem[] = [
        { href: '/home', label: 'Home', icon: House },
        { href: '/quiz', label: 'Quiz', icon: Trophy },
        { href: '/inbox', label: 'Inbox', icon: Bell },
    ];
    const rounds = Array.from({ length: 16 }, (_, index) => `Round ${index + 1}`);
</script>

<!-- A tab screen with no header: the colour block runs under the status bar, and
the AppBar inside it (static, tone inherit) pads the safe area and takes the block's text colour. -->
<div style:width="{frameWidth}px" style:max-width="100%" class="overflow-hidden rounded-container border border-border">
    <AppShell flushTop style="height: {frameHeight}px">
        <section class="on-accent bg-accent pb-6">
            <AppBar position="static" tone="inherit" title="Quiz">
                {#snippet actions()}
                    <IconButton variant="ghost" size="lg" label="Search"><Search size={24} aria-hidden="true" /></IconButton>
                {/snippet}
            </AppBar>
            <p class="px-4 pt-2 text-lg font-semibold">Ten questions, one point each.</p>
        </section>
        <ul class="divide-y divide-border px-4">
            {#each rounds as round (round)}
                <li class="py-3">{round}</li>
            {/each}
        </ul>
        {#snippet footer()}
            <BottomTabBar {items} active="/quiz" />
        {/snippet}
    </AppShell>
</div>
