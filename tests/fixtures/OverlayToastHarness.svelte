<script lang="ts">
    import BottomSheet from "../../src/components/molecules/BottomSheet.svelte";
    import Drawer from "../../src/components/molecules/Drawer.svelte";
    import Modal from "../../src/components/molecules/Modal.svelte";
    import SlideUp from "../../src/components/molecules/SlideUp.svelte";
    import Toaster from "../../src/components/molecules/Toaster.svelte";

    interface Props {
        kind?: "modal" | "sheet" | "drawer" | "slide";
        initialOpen?: boolean;
        withFooter?: boolean;
        onclose?: () => void;
    }

    let { kind = "modal", initialOpen = true, withFooter = true, onclose }: Props = $props();

    // svelte-ignore state_referenced_locally
    let open = $state(initialOpen);
</script>

{#snippet actions()}
    <button type="button" data-testid="save" onclick={() => (open = false)}>Save</button>
{/snippet}

<button type="button" data-testid="opener" onclick={() => (open = true)}>Open</button>
<a href="#between" data-testid="between">A link of the page, between the overlay and the toasts</a>

{#if kind === "modal"}
    <Modal
        bind:isOpen={open}
        title="Round"
        fullScreen
        footer={withFooter ? actions : undefined}
        {onclose}
        data-testid="panel"
    >
        <label>Name <input data-testid="field" /></label>
    </Modal>
{:else if kind === "sheet"}
    <BottomSheet
        bind:isOpen={open}
        title="Round"
        portal={false}
        snapPoints={["full"]}
        footer={withFooter ? actions : undefined}
        {onclose}
        data-testid="panel"
    >
        <label>Name <input data-testid="field" /></label>
    </BottomSheet>
{:else if kind === "drawer"}
    <Drawer
        bind:isOpen={open}
        title="Round"
        portal={false}
        footer={withFooter ? actions : undefined}
        {onclose}
        data-testid="panel"
    >
        <label>Name <input data-testid="field" /></label>
    </Drawer>
{:else}
    <SlideUp bind:isOpen={open} title="Round">
        <label>Name <input data-testid="field" /></label>
        <button type="button" data-testid="save" onclick={() => (open = false)}>Save</button>
    </SlideUp>
{/if}

<Toaster />
