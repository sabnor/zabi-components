<script lang="ts">
    import Modal from "../../src/components/molecules/Modal.svelte";

    let outerOpen = $state(false);
    let innerOpen = $state(false);
</script>

<button
    type="button"
    data-testid="open-outer"
    onclick={() => (outerOpen = true)}
>
    Open outer
</button>
<button type="button" data-testid="focus-outside">Before modals</button>

<Modal bind:isOpen={outerOpen} title="Outer">
    <button
        type="button"
        data-testid="open-inner"
        onclick={() => (innerOpen = true)}
    >
        Open inner
    </button>
    <Modal bind:isOpen={innerOpen} title="Inner">
        <button
            type="button"
            data-testid="close-inner"
            onclick={() => (innerOpen = false)}
        >
            Close inner
        </button>
    </Modal>
    <button
        type="button"
        data-testid="close-outer"
        onclick={() => (outerOpen = false)}
    >
        Close outer
    </button>
</Modal>
