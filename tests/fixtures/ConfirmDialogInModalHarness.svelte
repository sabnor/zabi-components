<script lang="ts">
    import ConfirmDialog from "../../src/components/molecules/ConfirmDialog.svelte";
    import Modal from "../../src/components/molecules/Modal.svelte";

    let editing = $state(true);
    let confirming = $state(false);
</script>

<!-- The common case: a confirm opened from inside an edit modal. -->
<Modal bind:isOpen={editing} title="Edit project">
    <button type="button" onclick={() => (confirming = true)}>Discard changes</button>
    <ConfirmDialog
        bind:open={confirming}
        title="Discard your changes?"
        message="What you typed is lost."
        variant="warning"
        confirmLabel="Discard"
        onconfirm={() => (editing = false)}
    />
</Modal>
<p data-testid="state">{editing ? "editing" : "closed"}</p>
