<script lang="ts">
    import Skeleton from "../../../components/atoms/Skeleton.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <Skeleton />
    </div>
{:else if exampleIndex === 1}
    <div class="w-full">
        <Skeleton variant="circle" />
    </div>
{:else if exampleIndex === 2}
    <div class="w-full">
        <Skeleton variant="block" />
    </div>
{:else if exampleIndex === 3}
    <div class="w-full space-y-3">
        <Skeleton width="50%" />
        <Skeleton width={240} height={8} />
        <Skeleton variant="block" class="w-64" />
    </div>
{:else if exampleIndex === 4}
    <div class="flex w-full items-center gap-3">
        <Skeleton variant="circle" />
        <div class="flex-1 space-y-2">
            <Skeleton width="60%" />
            <Skeleton width="40%" />
        </div>
    </div>
{:else if exampleIndex === 5}
    <article class="w-full space-y-3">
        <Skeleton variant="block" />
        <Skeleton width="70%" height={16} />
        <div class="space-y-2">
            <Skeleton />
            <Skeleton width="85%" />
        </div>
    </article>
{:else}
    <div class="w-full">
        <Skeleton />
    </div>
{/if}

