<script lang="ts">
    import Dropdown from '../components/molecules/Dropdown.svelte';
    import Button from '../components/atoms/Button.svelte';

    interface Props {
        isOpen?: boolean;
        placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
    }

    let { isOpen = false, placement = "bottom-start" }: Props = $props();
</script>

<Dropdown {isOpen} {placement}>
    {#snippet trigger()}
        <Button text="Select an option" variant="secondary" />
    {/snippet}
    {#snippet children()}
        <div class="py-2">
            <button
                class="w-full text-left px-4 py-2 text-body hover:bg-surface-hover transition-colors"
                type="button"
            >
                Option 1
            </button>
            <button
                class="w-full text-left px-4 py-2 text-body hover:bg-surface-hover transition-colors"
                type="button"
            >
                Option 2
            </button>
            <button
                class="w-full text-left px-4 py-2 text-body hover:bg-surface-hover transition-colors"
                type="button"
            >
                Option 3
            </button>
        </div>
    {/snippet}
</Dropdown>
