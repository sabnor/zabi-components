<script lang="ts">
    import Alert from "../../../components/molecules/Alert.svelte";
    import Button from "../../../components/atoms/Button.svelte";
    import ConfirmDialog from "../../../components/molecules/ConfirmDialog.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let open = $state(false);
    let outcome = $state("Nothing yet.");
    let failure = $state("");

    /** Stands in for a request. */
    function wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function removeProject() {
        await wait(1200);
        outcome = "Project deleted.";
    }

    async function transferOwnership() {
        failure = "";
        await wait(1200);
        throw new Error("The new owner has not accepted the invitation yet.");
    }
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <Button variant="danger" onclick={() => (open = true)}>Delete project</Button>
        <p class="text-sm text-description" data-testid="confirm-demo-outcome">
            {outcome}
        </p>
        <ConfirmDialog
            bind:open
            variant="danger"
            title="Delete this project?"
            message="The project and its files are removed for everyone. This cannot be undone."
            confirmLabel="Delete"
            onconfirm={removeProject}
            oncancel={({ reason }) => (outcome = `Cancelled (${reason}).`)}
        />
    </div>
{:else if exampleIndex === 1}
    <div class="w-full space-y-3">
        <Button onclick={() => (open = true)}>Publish page</Button>
        <p class="text-sm text-description">{outcome}</p>
        <ConfirmDialog
            bind:open
            title="Publish this page?"
            message="It becomes visible to everyone with the link."
            confirmLabel="Publish"
            cancelLabel="Not now"
            onconfirm={() => {
                outcome = "Page published.";
            }}
        >
            <p class="text-description">You can unpublish it again at any time.</p>
        </ConfirmDialog>
    </div>
{:else}
    <div class="w-full space-y-3">
        <Button variant="outline" onclick={() => (open = true)}>
            Transfer ownership
        </Button>
        <ConfirmDialog
            bind:open
            variant="warning"
            title="Transfer ownership?"
            message="You keep access as a member, and only the new owner can undo this."
            confirmLabel="Transfer"
            onconfirm={transferOwnership}
            onerror={(error) =>
                (failure = error instanceof Error ? error.message : "Something went wrong.")}
            oncancel={() => (failure = "")}
        >
            {#if failure}
                <Alert variant="error" message={failure} />
            {/if}
        </ConfirmDialog>
    </div>
{/if}
