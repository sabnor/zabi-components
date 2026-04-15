<script lang="ts">
    import EmptyState from '../../components/molecules/EmptyState.svelte';
    import Button from '../../components/atoms/Button.svelte';
</script>

<EmptyState
    title="No projects yet"
    description="Create a project to organize your work and collaborate with your team."
>
    {#snippet action()}
        <Button text="Create project" />
    {/snippet}
</EmptyState>
