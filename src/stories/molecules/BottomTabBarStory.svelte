<script lang="ts">
    import BellRing from '@lucide/svelte/icons/bell-ring';
    import Bell from '@lucide/svelte/icons/bell';
    import House from '@lucide/svelte/icons/house';
    import Trophy from '@lucide/svelte/icons/trophy';
    import User from '@lucide/svelte/icons/user';
    import Users from '@lucide/svelte/icons/users';
    import BottomTabBar from '../../components/molecules/BottomTabBar.svelte';
    import type { BottomTabBarItem } from '../../components/util/bottom-tab-bar.js';

    interface Props {
        /** How many tabs to show: the bar is made for three to five. */
        count?: 3 | 4 | 5;
        /** The tab that starts active. */
        startActive?: string;
        /** Put counts on Inbox and Me. */
        withBadges?: boolean;
        label?: string;
        badgeMax?: number;
        /** Use longer labels, to see them wrap. */
        longLabels?: boolean;
        /** Width of the phone frame in px. */
        frameWidth?: 320 | 360 | 390;
        /** Swap to a different icon on the active tab. */
        withActiveIcons?: boolean;
        /** Draw the bar as a capsule inset from the edges. */
        floating?: boolean;
    }

    let {
        count = 5,
        startActive = '/quiz',
        withBadges = false,
        label,
        badgeMax,
        longLabels = false,
        frameWidth = 360,
        withActiveIcons = false,
        floating = false,
    }: Props = $props();

    const all = $derived<BottomTabBarItem[]>([
        { href: '/home', label: 'Home', icon: House },
        { href: '/quiz', label: longLabels ? 'Quiz night' : 'Quiz', icon: Trophy },
        { href: '/inbox', label: longLabels ? 'Notifications' : 'Inbox', icon: Bell, activeIcon: withActiveIcons ? BellRing : undefined, badge: withBadges ? 3 : undefined },
        { href: '/teams', label: longLabels ? 'Leaderboard' : 'Teams', icon: Users },
        { href: '/me', label: 'Me', icon: User, badge: withBadges ? 120 : undefined },
    ]);
    const items = $derived(all.slice(0, count));

    // svelte-ignore state_referenced_locally
    let active = $state(startActive);

    /** The tabs are real links; a story has nowhere for them to go. */
    function select(event: MouseEvent) {
        const link = (event.target as Element).closest('a');
        if (!link) return;
        event.preventDefault();
        active = link.getAttribute('href') ?? active;
    }
</script>

<!-- A phone-width frame. `position="static"` keeps the bar inside it; on its
own in an app the bar is fixed to the bottom of the screen. -->
<div
    class="overflow-hidden rounded-container border border-border bg-background"
    style="width: {frameWidth}px;"
>
    <p class="p-4 text-sm text-description">Active: {active}</p>
    <BottomTabBar {items} {active} {label} {badgeMax} {floating} position="static" onclick={select} />
</div>
