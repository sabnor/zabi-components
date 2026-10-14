<script lang="ts">
    import Block from "../../components/atoms/Block.svelte";
    import Skeleton from "../../components/atoms/Skeleton.svelte";
    import SkeletonGroup from "../../components/atoms/SkeletonGroup.svelte";

    let { scenario = "colour" }: { scenario?: "colour" | "group" } = $props();
</script>

<div class="w-[32rem] max-w-full">
    {#if scenario === "colour"}
        {#each ["brand", "accent"] as const as tone (tone)}
            <Block {tone}>
                <Skeleton variant="block" tone="on-color" height={64} />
                <div class="mt-3"><Skeleton lines={3} tone="on-color" /></div>
            </Block>
        {/each}
    {:else}
        <SkeletonGroup class="flex items-center gap-3">
            <Skeleton variant="circle" />
            <Skeleton lines={3} class="flex-1" />
        </SkeletonGroup>
    {/if}
</div>
