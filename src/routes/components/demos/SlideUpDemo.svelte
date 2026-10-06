<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import SlideUp from "../../../components/molecules/SlideUp.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let open = $state(false);
    let closes = $state(0);

    /** Long enough to scroll inside the sheet. */
    const notes = Array.from({ length: 24 }, (_, index) => `Release note ${index + 1}`);
</script>

{#if exampleIndex === 0}
    <div class="space-y-4">
        <Button onclick={() => (open = true)} text="Open Slide Up" />
        <SlideUp bind:isOpen={open} title="Slide Up Panel">
            <p class="mb-4 text-description">This is a slide-up panel with custom content.</p>
            <Button onclick={() => (open = false)} text="Close" />
        </SlideUp>
    </div>
{:else if exampleIndex === 1}
    <div class="space-y-4">
        <Button onclick={() => (open = true)} text="Open filters" />
        <SlideUp
            bind:isOpen={open}
            title="Filter"
            closeLabel="Dismiss filters"
            initialFocus="#slide-up-demo-search"
        >
            <Input id="slide-up-demo-search" label="Search" />
        </SlideUp>
    </div>
{:else if exampleIndex === 3}
    <div class="space-y-4">
        <Button onclick={() => (open = true)} text="Edit note" />
        <SlideUp bind:isOpen={open} title="Edit note">
            <div class="space-y-4">
                <Input label="Title" />
                {#each [1, 2, 3, 4, 5, 6, 7, 8] as line (line)}
                    <Input label={`Line ${line}`} />
                {/each}
            </div>
            {#snippet footer()}
                <Button variant="secondary" onclick={() => (open = false)} text="Cancel" />
                <Button onclick={() => (open = false)} text="Save note" />
            {/snippet}
        </SlideUp>
    </div>
{:else}
    <div class="space-y-4">
        <Button onclick={() => (open = true)} data-testid="slide-up-demo-swipe-open">
            Open release notes
        </Button>
        <p class="text-sm text-description" data-testid="slide-up-demo-swipe-closes">
            Closed {closes} times.
        </p>
        <SlideUp
            bind:isOpen={open}
            title="Release notes"
            swipeToClose
            onclick={() => (closes += 1)}
        >
            <ul class="m-0 list-none space-y-3 p-0">
                {#each notes as note (note)}
                    <li class="text-body">{note}</li>
                {/each}
            </ul>
        </SlideUp>
    </div>
{/if}
