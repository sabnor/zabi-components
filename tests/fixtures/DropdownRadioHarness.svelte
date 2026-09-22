<script lang="ts">
    import Dropdown from "../../src/components/molecules/Dropdown.svelte";

    let { isOpen = $bindable(false) }: { isOpen?: boolean } = $props();

    const items = ["Iris", "Pine", "Citron"];
    let selected = $state("Iris");
</script>

<Dropdown bind:isOpen ariaLabel="Brand accent" menuRole="menu">
    {#snippet trigger(props)}
        <button type="button" onclick={() => (isOpen = !isOpen)} {...props}>
            {selected}
        </button>
    {/snippet}

    {#snippet children()}
        {#each items as item (item)}
            <button
                type="button"
                role="menuitemradio"
                aria-checked={item === selected}
                onclick={() => {
                    selected = item;
                    isOpen = false;
                }}
            >
                {item}
            </button>
        {/each}
    {/snippet}
</Dropdown>
