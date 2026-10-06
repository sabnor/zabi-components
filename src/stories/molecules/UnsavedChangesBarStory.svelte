<script lang="ts">
    import Button from '../../components/atoms/Button.svelte';
    import Input from '../../components/atoms/Input.svelte';
    import UnsavedChangesBar from '../../components/molecules/UnsavedChangesBar.svelte';

    interface Props {
        /** Start with a change already made, so the bar is showing. */
        startDirty?: boolean;
        position?: 'bottom' | 'top';
        message?: string;
        saveLabel?: string;
        discardLabel?: string;
        /** Hold the saving state, to look at it. */
        saving?: boolean;
        /** Make the save fail after a moment. */
        failing?: boolean;
        /** Add a third button through the actions snippet. */
        withActions?: boolean;
    }

    let {
        startDirty = true,
        position = 'bottom',
        message,
        saveLabel,
        discardLabel,
        saving = false,
        failing = false,
        withActions = false,
    }: Props = $props();

    let saved = $state('Ada Lovelace');
    // svelte-ignore state_referenced_locally
    let name = $state(startDirty ? 'Ada King' : 'Ada Lovelace');
    let note = $state('Change the name to show the bar.');

    function wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function save() {
        await wait(900);
        if (failing) throw new Error('The server did not answer.');
        saved = name;
        note = `Saved ${saved}.`;
    }
</script>

{#snippet bar()}
    <UnsavedChangesBar
        dirty={name !== saved}
        {position}
        {message}
        {saveLabel}
        {discardLabel}
        {saving}
        onsave={save}
        ondiscard={() => (name = saved)}
        onerror={(error) => (note = error instanceof Error ? error.message : String(error))}
    >
        {#snippet actions()}
            {#if withActions}
                <Button variant="secondary" onclick={() => (note = 'Preview opened.')}>
                    Preview
                </Button>
            {/if}
        {/snippet}
    </UnsavedChangesBar>
{/snippet}

<div class="max-w-lg space-y-4">
    {#if position === 'top'}
        {@render bar()}
    {/if}
    <Input label="Name" bind:value={name} />
    <p class="text-sm text-description">{note}</p>
    {#if position === 'bottom'}
        {@render bar()}
    {/if}
</div>
