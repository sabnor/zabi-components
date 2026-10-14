<script lang="ts">
    import MapPin from '@lucide/svelte/icons/map-pin';
    import { tick } from 'svelte';
    import PickerField from '../../components/atoms/PickerField.svelte';
    import BottomSheet from '../../components/molecules/BottomSheet.svelte';

    interface Props {
        /** Which arrangement to show. */
        scenario?: 'empty' | 'value' | 'leading' | 'error' | 'disabled' | 'sizes' | 'interactive' | 'link';
        size?: 'sm' | 'md' | 'lg';
    }

    let { scenario = 'empty', size = 'md' }: Props = $props();

    const pubs = ['The Bishops Arms', 'The Old Crown', 'The Fox and Hounds'];
    let open = $state(false);
    let chosen = $state<string | undefined>(undefined);
    let field = $state<HTMLButtonElement | HTMLAnchorElement | null>(null);

    async function choose(pub: string) {
        chosen = pub;
        open = false;
        await tick();
        field?.focus();
    }
</script>

{#snippet pin()}
    <MapPin size={18} aria-hidden="true" />
{/snippet}

<div class="flex w-80 flex-col gap-4">
    {#if scenario === 'empty'}
        <PickerField label="Pub" placeholder="Choose a pub" hint="Where you had it" {size} />
    {:else if scenario === 'value'}
        <PickerField label="Pub" value="The Bishops Arms" {size} />
    {:else if scenario === 'leading'}
        <PickerField label="Pub" value="The Bishops Arms" leading={pin} {size} />
    {:else if scenario === 'error'}
        <PickerField label="Pub" placeholder="Choose a pub" error="Choose a pub to continue" {size} />
    {:else if scenario === 'disabled'}
        <PickerField label="Pub" value="The Bishops Arms" disabled {size} />
        <PickerField label="Pub" placeholder="Choose a pub" disabled {size} />
    {:else if scenario === 'sizes'}
        <PickerField label="Small" value="The Bishops Arms" size="sm" />
        <PickerField label="Medium" value="The Bishops Arms" size="md" />
        <PickerField label="Large" value="The Bishops Arms" size="lg" />
    {:else if scenario === 'link'}
        <PickerField label="Pub" placeholder="Choose a pub" href="#choose-a-pub" {size} />
    {:else}
        <PickerField
            bind:element={field}
            label="Pub"
            placeholder="Choose a pub"
            value={chosen}
            leading={pin}
            expanded={open}
            onclick={() => (open = true)}
            {size}
        />
        <BottomSheet bind:isOpen={open} title="Choose a pub">
            <ul class="flex flex-col">
                {#each pubs as pub (pub)}
                    <li>
                        <button
                            type="button"
                            class="focus-ring w-full rounded-control px-3 py-3 text-start text-body hover:bg-surface-overlay-hover"
                            onclick={() => choose(pub)}
                        >
                            {pub}
                        </button>
                    </li>
                {/each}
            </ul>
        </BottomSheet>
    {/if}
</div>
