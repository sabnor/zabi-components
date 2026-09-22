<script lang="ts">
    import { untrack } from 'svelte';
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

    // Initial value only; the effect below syncs later prop changes.
    let isOpen = $state(untrack(() => initialOpen));

    $effect(() => {
        isOpen = initialOpen;
    });
</script>

<Dropdown bind:isOpen {placement}>
    {#snippet trigger(aria)}
        <Button text="Select an option" variant="secondary" {...aria} />
    {/snippet}
    {#snippet children()}
        <div class="py-2">
            <button
                class="w-full px-4 py-2 text-left text-body transition-colors hover:bg-base-100"
                type="button"
                role="menuitem"
            >
                Option 1
            </button>
            <button
                class="w-full px-4 py-2 text-left text-body transition-colors hover:bg-base-100"
                type="button"
                role="menuitem"
            >
                Option 2
            </button>
            <button
                class="w-full px-4 py-2 text-left text-body transition-colors hover:bg-base-100"
                type="button"
                role="menuitem"
            >
                Option 3
            </button>
        </div>
    {/snippet}
</Dropdown>
