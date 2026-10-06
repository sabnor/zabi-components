<script lang="ts">
    import Alert from "../../../components/molecules/Alert.svelte";
    import Button from "../../../components/atoms/Button.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import Textarea from "../../../components/atoms/Textarea.svelte";
    import UnsavedChangesBar from "../../../components/molecules/UnsavedChangesBar.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    type Profile = { name: string; email: string; company: string; city: string; bio: string };

    const initial: Profile = {
        name: "Ada Lovelace",
        email: "ada@example.com",
        company: "Analytical Engines",
        city: "London",
        bio: "",
    };

    let saved = $state<Profile>({ ...initial });
    let draft = $state<Profile>({ ...initial });
    const dirty = $derived(JSON.stringify(draft) !== JSON.stringify(saved));
    let outcome = $state("Nothing saved yet.");

    /** Stands in for a request. */
    function wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function save() {
        await wait(800);
        saved = { ...draft };
        outcome = `Saved ${saved.name}.`;
    }

    let title = $state("Spring launch");
    let savedTitle = $state("Spring launch");
    let failure = $state("");

    async function failToSave() {
        failure = "";
        await wait(800);
        throw new Error("The page is locked by another editor.");
    }
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <!-- A scroll container of its own, so the bar has something to stick to
        inside this example. On a page, the page is the scroll container. -->
        <div
            class="h-80 space-y-4 overflow-y-auto rounded-container border border-border p-4"
            data-testid="unsaved-demo-scroller"
        >
            <Input label="Name" bind:value={draft.name} />
            <Input label="Email" type="email" bind:value={draft.email} />
            <Input label="Company" bind:value={draft.company} />
            <Input label="City" bind:value={draft.city} />
            <Textarea label="Bio" bind:value={draft.bio} />
            <UnsavedChangesBar
                {dirty}
                onsave={save}
                ondiscard={() => (draft = { ...saved })}
                data-testid="unsaved-demo-bar"
            />
        </div>
        <p class="text-sm text-description" data-testid="unsaved-demo-outcome">{outcome}</p>
    </div>
{:else}
    <div class="w-full space-y-3">
        <UnsavedChangesBar
            dirty={title !== savedTitle}
            position="top"
            message="This page has changes that are not published"
            saveLabel="Publish"
            onsave={failToSave}
            ondiscard={() => {
                title = savedTitle;
                failure = "";
            }}
            onerror={(error) => (failure = error instanceof Error ? error.message : String(error))}
        >
            {#snippet actions()}
                <Button variant="secondary" onclick={() => (savedTitle = title)}>
                    Save as draft
                </Button>
            {/snippet}
        </UnsavedChangesBar>
        {#if failure}
            <Alert variant="error" title="Could not publish">{failure}</Alert>
        {/if}
        <Input label="Page title" bind:value={title} />
    </div>
{/if}
