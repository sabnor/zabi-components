<script lang="ts">
    import Modal from "../../src/components/molecules/Modal.svelte";

    let isOpen = $state(false);
</script>

<button
    type="button"
    data-testid="open-modal"
    onclick={() => (isOpen = true)}
>
    Open dialog
</button>
<button type="button" data-testid="outside-before">Before dialog</button>

<Modal bind:isOpen title="Test dialog">
    <button type="button" data-testid="modal-action">Modal action</button>
</Modal>
