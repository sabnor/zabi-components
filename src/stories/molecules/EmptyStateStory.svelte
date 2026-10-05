<script lang="ts">
    import EmptyState from '../../components/molecules/EmptyState.svelte';
    import Button from '../../components/atoms/Button.svelte';
    import FolderPlus from '@lucide/svelte/icons/folder-plus';

    interface Props {
        title?: string;
        description?: string;
        withAction?: boolean;
        withMedia?: boolean;
        actionLabel?: string;
        headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
        size?: 'default' | 'compact';
    }

    let {
        title = 'No projects yet',
        description = 'Create a project to organize your work and collaborate with your team.',
        withAction = true,
        withMedia = false,
        actionLabel = 'Create project',
        headingLevel = 2,
        size = 'default',
    }: Props = $props();
</script>

<EmptyState {title} {description} {headingLevel} {size}>
    {#snippet media()}
        {#if withMedia}
            <span
                class="flex size-12 items-center justify-center rounded-pill bg-action-primary-subtle text-link"
            >
                <FolderPlus size={24} aria-hidden="true" />
            </span>
        {/if}
    {/snippet}
    {#snippet action()}
        {#if withAction}
            <Button text={actionLabel} size={size === 'compact' ? 'sm' : 'md'} />
        {/if}
    {/snippet}
</EmptyState>
