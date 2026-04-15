<script lang="ts">
    import Dropdown from '../../components/molecules/Dropdown.svelte';
    import Button from '../../components/atoms/Button.svelte';

    interface Props {
        isOpen?: boolean;
        placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
    }

    let {
        isOpen: initialOpen = true,
        placement = 'bottom-start',
    }: Props = $props();

    let isOpen = $state(initialOpen);

    $effect(() => {
        isOpen = initialOpen;
    });
</script>

<Dropdown bind:isOpen {placement} ariaLabel="Empty dropdown">
    {#snippet trigger(aria)}
        <Button text="Open menu" variant="secondary" {...aria} />
    {/snippet}
    {#snippet children()}
        <div class="rounded-md border border-border bg-base-50 px-3 py-3 text-sm">
            <p class="font-medium text-headline">No options available</p>
            <p class="mt-1 text-description">Add your first option to get started.</p>
            <button
                type="button"
                class="mt-3 inline-flex min-h-11 items-center rounded-lg bg-action-primary px-3 py-2 text-sm text-action-primary"
            >
                Add Option
            </button>
        </div>
    {/snippet}
</Dropdown>
