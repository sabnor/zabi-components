<script lang="ts">
    import Skeleton from "../../src/components/atoms/Skeleton.svelte";
    import SkeletonGroup from "../../src/components/atoms/SkeletonGroup.svelte";
    import ZabiStringsProvider from "../../src/components/atoms/ZabiStringsProvider.svelte";

    /** `kind`: a lone piece, three pieces, a group of three, or a lone piece under a provider. */
    let { kind = "lone" }: { kind?: "lone" | "three" | "group" | "provider" | "group-provider" } = $props();
</script>

{#if kind === "lone"}
    <Skeleton />
{:else if kind === "three"}
    <Skeleton />
    <Skeleton />
    <Skeleton />
{:else if kind === "group"}
    <SkeletonGroup aria-label="Laddar sidan">
        <Skeleton variant="circle" />
        <Skeleton />
        <Skeleton lines={2} />
    </SkeletonGroup>
{:else if kind === "provider"}
    <ZabiStringsProvider strings={{ skeleton: { label: "Laddar…" } }}>
        <Skeleton />
    </ZabiStringsProvider>
{:else}
    <ZabiStringsProvider strings={{ skeleton: { label: "Laddar…" } }}>
        <SkeletonGroup>
            <Skeleton />
        </SkeletonGroup>
    </ZabiStringsProvider>
{/if}
