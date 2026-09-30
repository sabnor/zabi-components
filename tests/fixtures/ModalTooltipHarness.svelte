<script lang="ts">
    import Tooltip from "../../src/components/atoms/Tooltip.svelte";
    import Modal from "../../src/components/molecules/Modal.svelte";

    let isOpen = $state(true);
</script>

<Modal bind:isOpen title="With a tooltip" showClose={false}>
    <Tooltip content="Copies the link">
        <button type="button" data-testid="described">Copy</button>
    </Tooltip>
</Modal>
