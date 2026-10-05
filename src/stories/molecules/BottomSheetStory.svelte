<script lang="ts">
    import Button from '../../components/atoms/Button.svelte';
    import Input from '../../components/atoms/Input.svelte';
    import BottomSheet from '../../components/molecules/BottomSheet.svelte';
    import type { BottomSheetSnap } from '../../components/util/bottom-sheet.js';

    interface Props {
        /** Start with the sheet open. */
        startOpen?: boolean;
        snapPoints?: BottomSheetSnap[];
        /** The snap point it opens at. */
        startSnap?: BottomSheetSnap;
        title?: string;
        description?: string;
        dismissible?: boolean;
        /** A short form instead of the long list. */
        form?: boolean;
        withFooter?: boolean;
    }

    let {
        startOpen = true,
        snapPoints,
        startSnap,
        title = 'Choose a team',
        description = '',
        dismissible = true,
        form = false,
        withFooter = true,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let open = $state(startOpen);
    // svelte-ignore state_referenced_locally
    let snap = $state<BottomSheetSnap | undefined>(startSnap);
    let lastClose = $state('none yet');
    let name = $state('');

    const teams = Array.from({ length: 30 }, (_, index) => `Team ${index + 1}`);
</script>

<!-- The sheet is an overlay on the whole preview: view the story at a phone
width (the viewport toolbar) to see it as on a phone. -->
<div class="space-y-3">
    <Button onclick={() => (open = true)}>Open the sheet</Button>
    <p class="text-sm text-description">Snap: {snap ?? 'lowest'}. Last close: {lastClose}.</p>
</div>

{#snippet footer()}
    <Button size="lg" onclick={() => (open = false)}>{form ? 'Save' : 'Done'}</Button>
{/snippet}

<BottomSheet
    bind:isOpen={open}
    bind:snap
    {title}
    {description}
    {snapPoints}
    {dismissible}
    initialFocus={form ? '#bottom-sheet-story-name' : undefined}
    onclose={({ reason }) => (lastClose = reason)}
    footer={withFooter ? footer : undefined}
>
    {#if form}
        <Input id="bottom-sheet-story-name" label="Team name" bind:value={name} />
    {:else}
        <ul class="m-0 list-none space-y-[8px] p-0">
            {#each teams as team (team)}
                <li class="rounded-control border border-border p-3 text-body">{team}</li>
            {/each}
        </ul>
    {/if}
</BottomSheet>
