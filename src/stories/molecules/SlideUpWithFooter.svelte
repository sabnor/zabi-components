<script lang="ts">
    import Button from '../../components/atoms/Button.svelte';
    import Input from '../../components/atoms/Input.svelte';
    import SlideUp from '../../components/molecules/SlideUp.svelte';

    interface Props {
        isOpen?: boolean;
        title?: string;
        swipeToClose?: boolean;
    }

    let { isOpen: initialOpen = true, title = 'Edit note', swipeToClose = false }: Props = $props();

    // svelte-ignore state_referenced_locally
    let isOpen = $state(initialOpen);

    const lines = [1, 2, 3, 4, 5, 6, 7, 8];
</script>

{#if !isOpen}
    <div class="p-6">
        <Button size="sm" text="Open panel" onclick={() => (isOpen = true)} />
    </div>
{/if}

<SlideUp bind:isOpen {title} {swipeToClose}>
    <div class="space-y-4">
        {#each lines as line (line)}
            <Input label={`Line ${line}`} />
        {/each}
    </div>
    {#snippet footer()}
        <Button variant="secondary" text="Cancel" onclick={() => (isOpen = false)} />
        <Button text="Save note" onclick={() => (isOpen = false)} />
    {/snippet}
</SlideUp>
