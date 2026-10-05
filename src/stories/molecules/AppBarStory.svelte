<script lang="ts">
    import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';
    import Share2 from '@lucide/svelte/icons/share-2';
    import Trophy from '@lucide/svelte/icons/trophy';
    import IconButton from '../../components/atoms/IconButton.svelte';
    import AppBar from '../../components/molecules/AppBar.svelte';

    interface Props {
        title?: string;
        headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
        /** Show the back control. */
        withBack?: boolean;
        backLabel?: string;
        /** How many actions to put after the title. */
        actionCount?: 0 | 1 | 2;
        /** Put a mark before the title through the leading snippet. */
        withLeading?: boolean;
        collapseOnScroll?: boolean;
        /** Width of the phone frame in px. */
        frameWidth?: 320 | 360 | 390;
    }

    let {
        title = 'Round 3',
        headingLevel = 2,
        withBack = true,
        backLabel,
        actionCount = 2,
        withLeading = false,
        collapseOnScroll = false,
        frameWidth = 360,
    }: Props = $props();

    let note = $state('Nothing pressed yet.');

    /** Long enough to scroll inside the frame. */
    const questions = Array.from({ length: 16 }, (_, index) => `Question ${index + 1}`);
</script>

{#snippet leading()}
    <span class="flex size-8 items-center justify-center rounded-pill bg-action-primary-subtle text-link">
        <Trophy size={16} aria-hidden="true" />
    </span>
{/snippet}

{#snippet actions()}
    <IconButton variant="ghost" size="lg" label="Share" onclick={() => (note = 'Share pressed.')}>
        <Share2 size={20} />
    </IconButton>
    {#if actionCount === 2}
        <IconButton variant="ghost" size="lg" label="More" onclick={() => (note = 'More pressed.')}>
            <EllipsisVertical size={20} />
        </IconButton>
    {/if}
{/snippet}

<!-- A phone-width frame that scrolls, so the bar has something to follow. -->
<div
    class="h-96 overflow-y-auto rounded-container border border-border bg-background"
    style="width: {frameWidth}px;"
>
    <AppBar
        {title}
        {headingLevel}
        {backLabel}
        {collapseOnScroll}
        onback={withBack ? () => (note = 'Back pressed.') : undefined}
        leading={withLeading ? leading : undefined}
        actions={actionCount > 0 ? actions : undefined}
    />
    <p class="px-4 pt-4 text-sm text-description">{note}</p>
    <ul class="m-0 list-none space-y-3 p-4">
        {#each questions as question (question)}
            <li class="rounded-container border border-border bg-card p-4 text-body">{question}</li>
        {/each}
    </ul>
</div>
