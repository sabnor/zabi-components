<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import Modal from "../../../components/molecules/Modal.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
    let modalOpen = $state(false);
    let lastClose = $state("");
    let saving = $state(false);

    /** Stands in for a request: the modal cannot be dismissed until it settles. */
    function remove() {
        saving = true;
        setTimeout(() => {
            saving = false;
            modalOpen = false;
        }, 1500);
    }
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
{:else if exampleIndex === 1}
    <div class="w-full space-y-3">
        <Button onclick={() => (modalOpen = true)}>Open modal</Button>
        <p class="text-sm text-description" aria-live="polite">
            Last close: {lastClose || "none yet"}
        </p>
        <Modal
            bind:isOpen={modalOpen}
            title="Confirm changes"
            onclose={({ reason }) => (lastClose = reason)}
        >
            <p class="text-description">
                Close me with Escape, the backdrop or the close button.
            </p>
        </Modal>
    </div>
{:else if exampleIndex === 2}
    <div class="w-full">
        <Button onclick={() => (modalOpen = true)}>Open modal</Button>
        <Modal
            portal
            bind:isOpen={modalOpen}
            title="Delete project"
            dismissible={!saving}
        >
            <p class="text-description">This cannot be undone.</p>
            {#snippet footer()}
                <Button
                    variant="secondary"
                    disabled={saving}
                    onclick={() => (modalOpen = false)}
                >
                    Cancel
                </Button>
                <Button variant="danger" loading={saving} onclick={remove}>
                    Delete
                </Button>
            {/snippet}
        </Modal>
    </div>
{:else if exampleIndex === 3}
    <div class="w-full">
        <Button onclick={() => (modalOpen = true)}>Open form</Button>
        <Modal bind:isOpen={modalOpen} fullScreen="mobile" title="New quiz round">
            <div class="space-y-4">
                <Input label="Round name" />
                {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as number (number)}
                    <Input label={`Question ${number}`} />
                {/each}
            </div>
            {#snippet footer()}
                <Button variant="secondary" onclick={() => (modalOpen = false)}>
                    Cancel
                </Button>
                <Button variant="primary" onclick={() => (modalOpen = false)}>
                    Save round
                </Button>
            {/snippet}
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

