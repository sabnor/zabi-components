<script lang="ts">
    import Bell from '@lucide/svelte/icons/bell';
    import House from '@lucide/svelte/icons/house';
    import Search from '@lucide/svelte/icons/search';
    import Trophy from '@lucide/svelte/icons/trophy';
    import User from '@lucide/svelte/icons/user';
    import FloatingActionButton from '../../components/atoms/FloatingActionButton.svelte';
    import IconButton from '../../components/atoms/IconButton.svelte';
    import List from '../../components/atoms/List.svelte';
    import AppBar from '../../components/molecules/AppBar.svelte';
    import AppNavigation from '../../components/organisms/AppNavigation.svelte';
    import AppShell from '../../components/organisms/AppShell.svelte';
    import type { AppShellNavigationMode } from '../../components/util/app-shell.js';
    import type { BottomTabBarItem } from '../../components/util/bottom-tab-bar.js';

    interface Props {
        /** Where the navigation goes; `auto` follows the width of the window. */
        placement?: AppShellNavigationMode;
        /** Width of the frame in px. Ignored when `fullscreen`. */
        frameWidth?: number;
        /** Height of the frame in px. Ignored when `fullscreen`. */
        frameHeight?: number;
        /** The tab bar form as a floating capsule. */
        floating?: boolean;
        /** A brand-coloured bar over a brand block. */
        brandBar?: boolean;
        /** No frame: the shell fills the window, so resizing it moves between the three placements. */
        fullscreen?: boolean;
    }

    let {
        placement = 'auto',
        frameWidth = 390,
        frameHeight = 780,
        floating = false,
        brandBar = false,
        fullscreen = false,
    }: Props = $props();

    const items: BottomTabBarItem[] = [
        { href: '/home', label: 'Home', icon: House },
        { href: '/quiz', label: 'Quiz', icon: Trophy },
        { href: '/inbox', label: 'Inbox', icon: Bell, badge: 3 },
        { href: '/me', label: 'Me', icon: User },
    ];

    let active = $state('/quiz');
    const title = $derived(items.find((item) => item.href === active)?.label ?? '');
    const rounds = Array.from({ length: 14 }, (_, index) => ({
        id: `round-${index + 1}`,
        label: `Round ${index + 1}`,
        description: 'Ten questions, one point each.',
    }));

    /** The tabs are real links; a story has nowhere for them to go. */
    function select(event: MouseEvent) {
        const link = (event.target as Element).closest('a');
        if (!link) return;
        event.preventDefault();
        active = link.getAttribute('href') ?? active;
    }
</script>

{#snippet header()}
    <!-- The bar stays: content is meant to be seen passing under it. -->
    <AppBar {title} headingLevel={2} largeTitle tone={brandBar ? 'brand' : 'default'}>
        {#snippet actions()}
            <IconButton variant="ghost" size="lg" label="Search">
                <Search size={20} />
            </IconButton>
            <IconButton variant="ghost" size="lg" label="Notifications" count={3}>
                <Bell size={20} />
            </IconButton>
        {/snippet}
    </AppBar>
{/snippet}

{#snippet navigation()}
    <AppNavigation {items} {active} {floating} onclick={select} />
{/snippet}

{#snippet shell()}
    <AppShell
        canvas
        contentElement="div"
        navigationPlacement={placement}
        class={fullscreen ? '' : 'h-full'}
        {header}
        {navigation}
    >
        {#if brandBar}
            <!-- Directly under the bar, so the two read as one block. -->
            <section class="on-brand bg-action-primary px-4 pt-2 pb-6">
                <p class="m-0 text-sm font-medium text-description">Tonight, 20:00</p>
                <p class="m-0 mt-1 text-2xl font-bold text-headline">Music quiz</p>
                <p class="m-0 mt-1 text-sm text-description">The Crown. Six teams signed up.</p>
            </section>
        {/if}
        <div class="space-y-6 px-4 pt-2">
            {#if !brandBar}
                <!-- Colour in the content layer, so the glass has something to show. -->
                <section class="on-brand rounded-container bg-action-primary p-5">
                    <p class="m-0 text-sm font-medium text-description">Tonight, 20:00</p>
                    <p class="m-0 mt-1 text-2xl font-bold text-headline">Music quiz</p>
                    <p class="m-0 mt-1 text-sm text-description">The Crown. Six teams signed up.</p>
                </section>
            {/if}
            <section class={brandBar ? 'pt-6' : ''}>
                <h3 class="m-0 px-4 pb-2 text-sm font-medium text-description">Rounds</h3>
                <div class="overflow-hidden rounded-container bg-card">
                    <List items={rounds} ariaLabel="Rounds" />
                </div>
            </section>
        </div>
        <FloatingActionButton label="New quiz" />
    </AppShell>
{/snippet}

{#if fullscreen}
    {@render shell()}
{:else}
    <!-- A positioned box with a fixed height: in an app the shell is 100dvh and has no frame. -->
    <div
        class="relative overflow-hidden rounded-container border border-border"
        style="width: {frameWidth}px; height: {frameHeight}px;"
    >
        {@render shell()}
    </div>
{/if}
