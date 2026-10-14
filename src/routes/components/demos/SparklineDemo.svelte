<script lang="ts">
    import Sparkline from "../../../components/atoms/Sparkline.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const values = [12, 14, 13, 17, 16, 21, 19, 24];
</script>

{#if exampleIndex === 0}
    <div class="flex items-center gap-3 text-body">
        <span class="text-2xl font-semibold">9</span>
        <Sparkline points={[3, 5, 4, 7, 6, 9]} label="Poäng, sex senaste: stigande" />
    </div>
{:else}
    <div class="w-full max-w-xs">
        <Sparkline points={values} label="Poäng, åtta senaste: stigande" color="success" class="h-8 w-full" />
    </div>
{/if}
