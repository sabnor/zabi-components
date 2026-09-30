<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import Checkbox from "../../../components/atoms/Checkbox.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import Drawer from "../../../components/molecules/Drawer.svelte";
    import Modal from "../../../components/molecules/Modal.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const projects = [
        "Zabi web",
        "Zabi admin",
        "Marketing site",
        "Design tokens",
        "Partner portal",
    ];

    /** Long enough to scroll on any screen, with nothing in it to focus. */
    const notes = Array.from({ length: 14 }, (_, index) => ({
        version: `8.${14 - index}.0`,
        text: "Fixes and small improvements across the components, the tokens and the documentation site. Nothing in this release changes an existing prop.",
    }));

    let open = $state(false);
    let search = $state("");
    let selected = $state("Zabi web");
    let lastClose = $state("none yet");

    let editOpen = $state(false);
    let newProjectOpen = $state(false);

    const matches = $derived(
        projects.filter((name) =>
            name.toLowerCase().includes(search.trim().toLowerCase()),
        ),
    );

    function choose(name: string) {
        selected = name;
        open = false;
    }
</script>

{#snippet picker()}
    <Drawer
        bind:isOpen={open}
        title="Choose a project"
        description="The page moves to the project you pick."
        initialFocus="#drawer-demo-search"
        onclose={({ reason }) => (lastClose = reason)}
    >
        <Input
            label="Search projects"
            placeholder="Search"
            bind:value={search}
            id="drawer-demo-search"
        />
        <ul class="mt-4 space-y-1">
            {#each matches as name (name)}
                <li>
                    <button
                        type="button"
                        class="focus-ring flex w-full cursor-pointer items-center justify-between rounded-control px-3 py-2 text-left text-sm text-body transition-colors hover:bg-surface-overlay-hover motion-reduce:transition-none"
                        aria-current={name === selected ? "true" : undefined}
                        onclick={() => choose(name)}
                    >
                        {name}
                        {#if name === selected}
                            <span class="text-description">Current</span>
                        {/if}
                    </button>
                </li>
            {:else}
                <li class="px-3 py-2 text-sm text-description">No project matches.</li>
            {/each}
        </ul>
        {#if exampleIndex === 2}
            <div class="mt-4">
                <Button variant="outline" onclick={() => (newProjectOpen = true)}>
                    New project
                </Button>
            </div>
            <Modal bind:isOpen={newProjectOpen} title="New project" portal>
                <Input label="Project name" placeholder="Name" />
                {#snippet footer()}
                    <Button onclick={() => (newProjectOpen = false)}>Create</Button>
                {/snippet}
            </Modal>
        {/if}
        {#snippet footer()}
            <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
        {/snippet}
    </Drawer>
{/snippet}

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <Button onclick={() => (open = true)}>Choose project</Button>
        <p class="text-sm text-description" data-testid="drawer-demo-selected">
            Project: {selected} · Last close: {lastClose}
        </p>
        {@render picker()}
    </div>
{:else if exampleIndex === 1}
    <div class="w-full">
        <Button variant="outline" onclick={() => (open = true)}>Filters</Button>
        <Drawer bind:isOpen={open} title="Filters" side="start" size="sm">
            <div class="space-y-3">
                <Checkbox label="Published" checked />
                <Checkbox label="Drafts" />
                <Checkbox label="Archived" />
            </div>
            {#snippet footer()}
                <Button onclick={() => (open = false)}>Show results</Button>
            {/snippet}
        </Drawer>
    </div>
{:else if exampleIndex === 3}
    <div class="w-full">
        <Button variant="outline" onclick={() => (open = true)}>Release notes</Button>
        <Drawer bind:isOpen={open} title="Release notes" size="sm">
            {#each notes as note (note.version)}
                <h3 class="mt-4 text-sm font-medium text-headline">{note.version}</h3>
                <p class="mt-1 text-sm text-description">{note.text}</p>
            {/each}
        </Drawer>
    </div>
{:else}
    <div class="w-full">
        <Button variant="outline" onclick={() => (editOpen = true)}>Edit page</Button>
        <Modal bind:isOpen={editOpen} title="Edit page" portal>
            <p class="text-description">Project: {selected}</p>
            <div class="mt-4">
                <Button onclick={() => (open = true)}>Move to project</Button>
            </div>
        </Modal>
        {@render picker()}
    </div>
{/if}
