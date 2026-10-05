<script lang="ts">
    import Button from '../../components/atoms/Button.svelte';
    import Input from '../../components/atoms/Input.svelte';
    import Textarea from '../../components/atoms/Textarea.svelte';
    import StickyActionBar from '../../components/molecules/StickyActionBar.svelte';

    interface Props {
        /** Accessible name of the bar; makes it a group. */
        label?: string;
        /** Add a second, quieter action. */
        withSecondary?: boolean;
        /** Only two fields, so the form is shorter than the frame. */
        shortForm?: boolean;
        /** Width of the phone frame in px. */
        frameWidth?: 320 | 360 | 390;
    }

    let { label, withSecondary = false, shortForm = false, frameWidth = 360 }: Props = $props();

    let visit = $state({ place: 'The Crown', team: '', players: '', notes: '' });
    let note = $state('Nothing saved yet.');

    function save(event: SubmitEvent) {
        event.preventDefault();
        note = `Saved the visit to ${visit.place}.`;
    }
</script>

<!-- A phone-sized frame that scrolls, so the bar has something to stick to.
The form is a column as tall as the frame, so the bar is at the bottom of it
even when the fields end sooner. -->
<div class="space-y-3">
    <div
        class="h-[32rem] overflow-y-auto rounded-container border border-border bg-background"
        style="width: {frameWidth}px;"
    >
        <form class="flex min-h-full flex-col" onsubmit={save}>
            <div class="space-y-4 p-4">
                <Input label="Place" bind:value={visit.place} />
                <Input label="Team" bind:value={visit.team} />
                {#if !shortForm}
                    <Input label="Players" bind:value={visit.players} />
                    <Textarea label="Notes" bind:value={visit.notes} />
                    <Textarea label="More notes" />
                {/if}
            </div>
            <StickyActionBar {label}>
                {#if withSecondary}
                    <Button variant="ghost" size="lg" onclick={() => (note = 'Draft kept.')}>
                        Save draft
                    </Button>
                    <Button type="submit" size="lg">Save visit</Button>
                {:else}
                    <Button type="submit" size="lg" fullWidth>Save visit</Button>
                {/if}
            </StickyActionBar>
        </form>
    </div>
    <p class="text-sm text-description">{note}</p>
</div>
