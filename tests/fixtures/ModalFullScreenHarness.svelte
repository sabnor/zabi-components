<script lang="ts">
    import Modal from "../../src/components/molecules/Modal.svelte";

    interface Props {
        initialOpen?: boolean;
        fullScreen?: boolean | "mobile";
        dismissible?: boolean;
        portal?: boolean;
        withFooter?: boolean;
        withFields?: boolean;
        title?: string;
        showClose?: boolean;
        onclose?: (detail: { reason: "escape" | "backdrop" | "close-button" }) => void;
    }

    let {
        initialOpen = false,
        fullScreen,
        dismissible,
        portal,
        withFooter = true,
        withFields = true,
        title = "New quiz round",
        showClose,
        onclose,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let open = $state(initialOpen);
</script>

{#snippet actions()}
    <button type="button" data-testid="cancel" onclick={() => (open = false)}>Cancel</button>
    <button type="button" data-testid="save" onclick={() => (open = false)}>Save</button>
{/snippet}

<div data-testid="host">
    <button type="button" data-testid="opener" onclick={() => (open = true)}>Open</button>
    <Modal
        bind:isOpen={open}
        {title}
        {fullScreen}
        {dismissible}
        {portal}
        {showClose}
        {onclose}
        footer={withFooter ? actions : undefined}
        data-testid="panel"
    >
        {#if withFields}
            <label>Round name <input data-testid="first-field" /></label>
            <label>Question <input data-testid="second-field" /></label>
        {:else}
            <p>Phones stay in pockets while a round is being played.</p>
        {/if}
    </Modal>
</div>
