<script lang="ts">
    import Modal from "../../src/components/molecules/Modal.svelte";

    let isOpen = $state(false);
    let extra = $state(false);
</script>

<button type="button" data-testid="open-dynamic" onclick={() => (isOpen = true)}>
    Open untitled dialog
</button>

<Modal bind:isOpen data-testid="dynamic-modal">
    <button type="button" data-testid="add-late" onclick={() => (extra = true)}>
        Add late content
    </button>
    {#if extra}
        <button type="button" data-testid="late-button">Late button</button>
    {/if}
</Modal>
