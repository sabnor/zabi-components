<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import Modal from "../../../components/molecules/Modal.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
    let modalOpen = $state(false);
</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <Button onclick={() => (modalOpen = true)}>Open modal</Button>
        <Modal bind:isOpen={modalOpen} title="Confirm changes">
            <p class="text-description">
                This change affects all team members.
            </p>
            <div class="mt-4 flex justify-end gap-2">
                <Button variant="secondary" onclick={() => (modalOpen = false)}>
                    Cancel
                </Button>
                <Button variant="primary" onclick={() => (modalOpen = false)}>
                    Confirm
                </Button>
            </div>
        </Modal>
    </div>
{:else}
    <div class="w-full">
        <Button onclick={() => (modalOpen = true)}>Open modal</Button>
        <Modal bind:isOpen={modalOpen} title="Confirm changes">
            <p class="text-description">Modal content</p>
        </Modal>
    </div>
{/if}

