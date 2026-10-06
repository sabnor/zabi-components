<script lang="ts">
    import IconButton from "../../src/components/atoms/IconButton.svelte";

    interface Props {
        /** How the parent owns the state: `bind:pressed`, or one-way plus `onclick`. */
        mode?: "bind" | "one-way" | "veto";
    }
    let { mode = "bind" }: Props = $props();

    let bold = $state(false);
</script>

{#if mode === "bind"}
    <IconButton variant="ghost" label="Bold" bind:pressed={bold}>B</IconButton>
{:else if mode === "one-way"}
    <IconButton
        variant="ghost"
        label="Bold"
        pressed={bold}
        onclick={() => (bold = !bold)}
    >
        B
    </IconButton>
{:else}
    <IconButton
        variant="ghost"
        label="Bold"
        pressed={bold}
        onclick={(event) => event.preventDefault()}
    >
        B
    </IconButton>
{/if}
<span data-testid="bound">{String(bold)}</span>
