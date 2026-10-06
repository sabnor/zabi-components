<script lang="ts">
    import SlideUp from "../../src/components/molecules/SlideUp.svelte";
    import Toaster from "../../src/components/molecules/Toaster.svelte";

    interface Props {
        initialOpen?: boolean;
        withFooter?: boolean;
        withTitle?: boolean;
        swipeToClose?: boolean;
    }

    let { initialOpen = true, withFooter = true, withTitle = true, swipeToClose = false }: Props = $props();

    // svelte-ignore state_referenced_locally
    let open = $state(initialOpen);
</script>

{#snippet actions()}
    <button type="button" data-testid="save" onclick={() => (open = false)}>Save</button>
{/snippet}

<button type="button" data-testid="opener" onclick={() => (open = true)}>Open</button>
<SlideUp
    bind:isOpen={open}
    title={withTitle ? "Edit note" : ""}
    {swipeToClose}
    footer={withFooter ? actions : undefined}
>
    <label>Note <input data-testid="field" /></label>
</SlideUp>
<Toaster />
