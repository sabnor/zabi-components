<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <Button>Save changes</Button>
    </div>
{:else if exampleIndex === 1}
    <div class="flex flex-wrap items-center gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="danger">Delete</Button>
    </div>
{:else if exampleIndex === 2}
    <div class="flex flex-wrap items-center gap-2">
        <Button disabled>Saving…</Button>
        <Button variant="secondary" disabled>Cancel</Button>
    </div>
{:else}
    <div class="flex flex-wrap items-center gap-2">
        <Button>Button</Button>
    </div>
{/if}

