<script lang="ts">
    import Bell from '@lucide/svelte/icons/bell';
    import House from '@lucide/svelte/icons/house';
    import Plus from '@lucide/svelte/icons/plus';
    import Search from '@lucide/svelte/icons/search';
    import Trophy from '@lucide/svelte/icons/trophy';
    import User from '@lucide/svelte/icons/user';
    import IconButton from '../../components/atoms/IconButton.svelte';
    import AppBar from '../../components/molecules/AppBar.svelte';
    import BottomTabBar from '../../components/molecules/BottomTabBar.svelte';
    import AppShell from '../../components/organisms/AppShell.svelte';
    import type { BottomTabBarItem } from '../../components/util/bottom-tab-bar.js';

    interface Props {
        withHeader?: boolean;
        withFooter?: boolean;
        collapseOnScroll?: boolean;
        /** A floating button placed with --app-shell-bottom-inset. */
        withFloatingButton?: boolean;
        /** Few enough rows that nothing scrolls. */
        shortContent?: boolean;
        /** Width of the phone frame in px. */
        frameWidth?: 320 | 360 | 390;
    }

    let {
        withHeader = true,
        withFooter = true,
        collapseOnScroll = true,
        withFloatingButton = false,
        shortContent = false,
        frameWidth = 360,
    }: Props = $props();

    const items: BottomTabBarItem[] = [
        { href: '/home', label: 'Home', icon: House },
        { href: '/quiz', label: 'Quiz', icon: Trophy },
        { href: '/inbox', label: 'Inbox', icon: Bell, badge: 3 },
        { href: '/me', label: 'Me', icon: User },
    ];

    let active = $state('/quiz');
    const title = $derived(items.find((item) => item.href === active)?.label ?? '');
    const rounds = $derived(
        Array.from({ length: shortContent ? 2 : 20 }, (_, index) => `Round ${index + 1}`),
    );

    /** The tabs are real links; a story has nowhere for them to go. */
    function select(event: MouseEvent) {
        const link = (event.target as Element).closest('a');
        if (!link) return;
        event.preventDefault();
        active = link.getAttribute('href') ?? active;
    }
</script>

{#snippet header()}
    <AppBar {title} headingLevel={2} {collapseOnScroll}>
        {#snippet actions()}
            <IconButton variant="ghost" size="lg" label="Search">
                <Search size={20} />
            </IconButton>
        {/snippet}
    </AppBar>
{/snippet}

{#snippet footer()}
    <BottomTabBar {items} {active} onclick={select} />
{/snippet}

<!-- A phone-sized frame. In an app the shell is 100dvh and has no frame: the
height class here replaces that. -->
<div
    class="overflow-hidden rounded-container border border-border"
    style="width: {frameWidth}px;"
>
    <AppShell
        class="h-[40rem]"
        header={withHeader ? header : undefined}
        footer={withFooter ? footer : undefined}
    >
        <ul class="m-0 list-none space-y-3 p-4">
            {#each rounds as round (round)}
                <li class="rounded-container border border-border bg-card p-4">
                    <p class="font-medium text-headline">{round}</p>
                    <p class="text-sm text-description">Ten questions, one point each.</p>
                </li>
            {/each}
        </ul>
        {#if withFloatingButton}
            <!-- Inside the shell, so it can read the shell's custom properties. -->
            <IconButton
                size="lg"
                label="New quiz"
                class="absolute right-4 bottom-[calc(var(--app-shell-bottom-inset)+1rem)] rounded-pill shadow-lg"
            >
                <Plus size={24} />
            </IconButton>
        {/if}
    </AppShell>
</div>
