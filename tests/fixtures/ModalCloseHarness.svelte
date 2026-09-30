<script lang="ts">
    import Modal from "../../src/components/molecules/Modal.svelte";

    interface Props {
        portal?: boolean;
        dismissible?: boolean;
        /** Open a second, portalled modal from inside the first. */
        nested?: boolean;
        innerDismissible?: boolean;
        /** Role of the nested modal, or of the only one when not nested. */
        role?: "dialog" | "alertdialog";
        closeLabel?: string;
        initialOpen?: boolean;
        onclose?: (detail: { reason: string }) => void;
        onclick?: (event: Event) => void;
    }
    let {
        portal = false,
        dismissible = true,
        nested = false,
        innerDismissible = true,
        role = "dialog",
        closeLabel = undefined,
        initialOpen = false,
        onclose,
        onclick,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let isOpen = $state(initialOpen);
    let innerOpen = $state(false);
    let locked = $state(false);
</script>

<!-- Stands in for the ancestor a portalled overlay has to get out of. -->
<div data-testid="host">
    <button type="button" data-testid="open-modal" onclick={() => (isOpen = true)}>
        Open dialog
    </button>

    <Modal
        bind:isOpen
        title="Closing dialog"
        {portal}
        role={nested ? "dialog" : role}
        {closeLabel}
        dismissible={dismissible && !locked}
        {onclose}
        {onclick}
        aria-busy={locked ? "true" : undefined}
        data-variant="harness"
    >
        <button type="button" data-testid="modal-action">Modal action</button>
        <button type="button" data-testid="lock" onclick={() => (locked = true)}>
            Lock
        </button>
        <button
            type="button"
            data-testid="close-from-parent"
            onclick={() => (isOpen = false)}
        >
            Close from parent
        </button>
        {#if nested}
            <button
                type="button"
                data-testid="open-inner"
                onclick={() => (innerOpen = true)}
            >
                Open inner
            </button>
            <Modal
                bind:isOpen={innerOpen}
                title="Inner dialog"
                {portal}
                {role}
                dismissible={innerDismissible}
            >
                <button type="button" data-testid="inner-action">
                    Inner action
                </button>
            </Modal>
        {/if}
    </Modal>
</div>
