<script lang="ts">
    import Search from '@lucide/svelte/icons/search';
    import Chip from '../../components/atoms/Chip.svelte';
    import IconButton from '../../components/atoms/IconButton.svelte';
    import AppBar from '../../components/molecules/AppBar.svelte';
    import Tabs from '../../components/molecules/Tabs.svelte';
    import AppShell from '../../components/organisms/AppShell.svelte';
    import AppShellHeaderPart from '../../components/organisms/AppShellHeaderPart.svelte';

    interface Props {
        /**
         * `filter-sticks`: the bar scrolls away, the filter row stays.
         * `tabs-stick`: the large title scrolls away, the bar and the tabs stay.
         * `all-stick`: every part stays, as a header always did.
         */
        layout?: 'filter-sticks' | 'tabs-stick' | 'all-stick';
        /** Width of the phone frame in px. */
        frameWidth?: 320 | 360 | 390;
    }

    let { layout = 'filter-sticks', frameWidth = 360 }: Props = $props();

    const filters = ['All', 'Open', 'Mine', 'Archived', 'Drafts'];
    const sections = [
        { id: 'quizzes', label: 'Quizzes' },
        { id: 'teams', label: 'Teams' },
        { id: 'rounds', label: 'Rounds' },
    ];
    let section = $state('quizzes');
    const rows = Array.from({ length: 24 }, (_, index) => `Round ${index + 1}`);
</script>

{#snippet filterRow()}
    <div class="flex gap-2 overflow-x-auto px-4 py-2" role="group" aria-label="Filter">
        {#each filters as filter, index (filter)}
            <Chip selected={index === 0}>{filter}</Chip>
        {/each}
    </div>
{/snippet}

{#snippet tabRow()}
    <Tabs tabs={sections} bind:activeTab={section} fullWidth />
{/snippet}

{#snippet searchAction()}
    <IconButton variant="ghost" size="lg" label="Search"><Search size={20} /></IconButton>
{/snippet}

{#snippet header()}
    {#if layout === 'filter-sticks'}
        <AppShellHeaderPart sticky={false}>
            <AppBar title="Quizzes" actions={searchAction} />
        </AppShellHeaderPart>
        <AppShellHeaderPart>{@render filterRow()}</AppShellHeaderPart>
    {:else if layout === 'tabs-stick'}
        <AppShellHeaderPart>
            <AppBar title="Quizzes" largeTitle actions={searchAction} />
        </AppShellHeaderPart>
        <AppShellHeaderPart>{@render tabRow()}</AppShellHeaderPart>
    {:else}
        <AppShellHeaderPart>
            <AppBar title="Quizzes" actions={searchAction} />
        </AppShellHeaderPart>
        <AppShellHeaderPart>{@render filterRow()}</AppShellHeaderPart>
        <AppShellHeaderPart>{@render tabRow()}</AppShellHeaderPart>
    {/if}
{/snippet}

<div
    class="overflow-hidden rounded-container border border-border"
    style="width: {frameWidth}px;"
>
    <AppShell class="h-[40rem]" contentElement="div" {header}>
        <ul class="m-0 list-none space-y-3 p-4">
            {#each rows as row (row)}
                <li class="rounded-container border border-border bg-card p-4">
                    <p class="font-medium text-headline">{row}</p>
                    <p class="text-sm text-description">Ten questions, one point each.</p>
                </li>
            {/each}
        </ul>
    </AppShell>
</div>
