<script lang="ts">
    import Spinner from "../../../components/atoms/Spinner.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
</script>

{#if exampleIndex === 0}
    <div class="flex w-full items-center gap-2 text-sm text-body">
        <Spinner />
        Saving changes
    </div>
{:else if exampleIndex === 1}
    <div class="flex w-full items-center gap-4 text-description">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner class="size-8" />
    </div>
{:else}
    <div class="flex w-full items-center gap-4">
        <Spinner label="Loading projects" size="lg" class="text-link" />
        <p class="text-sm text-description">
            Nothing beside this one says what is loading, so it carries a label
            for screen readers.
        </p>
    </div>
{/if}
