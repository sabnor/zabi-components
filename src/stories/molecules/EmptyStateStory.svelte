<script lang="ts">
    import EmptyState from '../../components/molecules/EmptyState.svelte';
    import Button from '../../components/atoms/Button.svelte';
    import { FolderPlus } from '@lucide/svelte';

    interface Props {
        title?: string;
        description?: string;
        withAction?: boolean;
        withMedia?: boolean;
        actionLabel?: string;
    }

    let {
        title = 'No projects yet',
        description = 'Create a project to organize your work and collaborate with your team.',
        withAction = true,
        withMedia = false,
        actionLabel = 'Create project',
    }: Props = $props();
</script>

<EmptyState {title} {description}>
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
            <Button text={actionLabel} />
        {/if}
    {/snippet}
</EmptyState>
