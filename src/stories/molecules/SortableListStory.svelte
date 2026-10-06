<script lang="ts">
    import SortableList from '../../components/molecules/SortableList.svelte';
    import Card from '../../components/atoms/Card.svelte';
    import type { SortableListReorderDetail } from '../../components/util/sortable-list.js';

    type Section = { id: string; title: string; summary: string; locked?: boolean };

    interface Props {
        /** Render each item as a card with the handle in its header. */
        cards?: boolean;
        showMoveButtons?: boolean;
        disabled?: boolean;
        /** Lock the last item, to show a disabled item among enabled ones. */
        lockLast?: boolean;
        /** Swedish strings, to show the translation hook. */
        translated?: boolean;
    }

    let {
        cards = false,
        showMoveButtons = true,
        disabled = false,
        lockLast = false,
        translated = false,
    }: Props = $props();

    let sections = $state<Section[]>([
        { id: 'hero', title: 'Hero section', summary: 'Headline, lead text and the primary action.' },
        { id: 'features', title: 'Feature grid', summary: 'Six cards in three columns.' },
        { id: 'pricing', title: 'Pricing table', summary: 'Three plans with a monthly and yearly toggle.' },
        { id: 'faq', title: 'Questions', summary: 'Eight questions in an accordion.' },
        { id: 'footer', title: 'Footer', summary: 'Set by the site template.' },
    ]);

    let lastMove = $state('Nothing moved yet.');

    const swedish = {
        handleLabel: (label: string) => `Flytta ${label}`,
        handleDescription:
            'Piltangenterna flyttar objektet. Home och End flyttar det först eller sist.',
        moveUp: (label: string) => `Flytta upp ${label}`,
        moveDown: (label: string) => `Flytta ned ${label}`,
        moved: ({ label, position, total }: { label: string; position: number; total: number }) =>
            `${label}, flyttad till plats ${position} av ${total}`,
        cancelled: ({ label, position, total }: { label: string; position: number; total: number }) =>
            `${label}, flytten avbröts, kvar på plats ${position} av ${total}`,
        atStart: ({ label }: { label: string }) => `${label}, redan först`,
        atEnd: ({ label }: { label: string }) => `${label}, redan sist`,
    };

    function describeMove({ item, from, to }: SortableListReorderDetail<Section>) {
        lastMove = `${item.title}: ${from + 1} → ${to + 1}`;
    }
</script>

<div class="max-w-lg space-y-3">
    <SortableList
        bind:items={sections}
        getKey={(section) => section.id}
        getLabel={(section) => section.title}
        isItemDisabled={(section) => lockLast && section.id === 'footer'}
        onreorder={describeMove}
        controls={cards ? 'manual' : 'auto'}
        listClass={cards ? 'gap-3' : ''}
        strings={translated ? swedish : undefined}
        aria-label="Page sections"
        {showMoveButtons}
        {disabled}
    >
        {#snippet item(section, row)}
            {#if cards}
                <Card fullWidth={true}>
                    <div class="flex items-center gap-2">
                        {@render row.handle()}
                        <p class="min-w-0 flex-1 text-sm font-medium text-headline">
                            {section.title}
                        </p>
                        {#if showMoveButtons}
                            {@render row.moveButtons()}
                        {/if}
                    </div>
                    <p class="mt-2 text-sm text-description">{section.summary}</p>
                </Card>
            {:else}
                <div
                    class="flex h-8 items-center rounded-control border border-border bg-surface-raised px-3 text-sm text-body"
                >
                    {section.title}
                </div>
            {/if}
        {/snippet}
    </SortableList>
    <p class="text-sm text-description">Last move: {lastMove}</p>
</div>
