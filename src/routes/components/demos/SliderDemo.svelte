<script lang="ts">
    import Slider from "../../../components/atoms/Slider.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let volume = $state(40);
    let quality = $state(80);
    let hours = $state(2);
    let small = $state(20);
    let medium = $state(50);
    let large = $state(80);
    let zoom = $state(8);
</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <Slider label="Volume" bind:value={volume} data-testid="slider-demo-volume" />
        <p class="mt-2 text-sm text-description">
            Value: <span data-testid="slider-demo-volume-value">{volume}</span>
        </p>
    </div>
{:else if exampleIndex === 1}
    <div class="w-full space-y-6">
        <Slider
            label="Image quality"
            bind:value={quality}
            min={10}
            max={100}
            step={10}
            showValue
            formatValue={(value) => `${value} %`}
            message="Lower quality makes smaller files."
            data-testid="slider-demo-quality"
        />
        <Slider
            label="Session length"
            bind:value={hours}
            min={0.5}
            max={8}
            step={0.5}
            showValue
            formatValue={(value) => `${value} h`}
        />
    </div>
{:else if exampleIndex === 2}
    <div class="w-full space-y-4">
        <Slider label="Small" size="sm" bind:value={small} showValue />
        <Slider label="Medium" bind:value={medium} showValue />
        <Slider label="Large" size="lg" bind:value={large} showValue />
    </div>
{:else}
    <div class="w-full space-y-6">
        <Slider label="Locked by your plan" value={30} showValue disabled />
        <Slider
            label="Zoom"
            bind:value={zoom}
            min={1}
            max={10}
            showValue
            formatValue={(value) => `${value}x`}
            variant={zoom > 6 ? "error" : "default"}
            message={zoom > 6
                ? "Above 6x the image is too blurred to print."
                : "Up to 6x prints sharply."}
        />
    </div>
{/if}
