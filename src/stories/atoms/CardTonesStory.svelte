<script lang="ts">
    import Badge from "../../components/atoms/Badge.svelte";
    import Button from "../../components/atoms/Button.svelte";
    import Card from "../../components/atoms/Card.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Rating from "../../components/atoms/Rating.svelte";
    import Text from "../../components/atoms/Text.svelte";
    import type { SurfaceTone } from "../../components/types/variants.js";

    let { size = "md" }: { size?: "sm" | "md" | "lg" } = $props();
    const tones: SurfaceTone[] = ["neutral", "tint", "brand", "accent"];
</script>

{#snippet content(name: string)}
    <Heading level={3} text={name} />
    <Text>Open until 23, kitchen until 21.</Text>
    <p class="mt-2"><a href="/pubs" class="underline">See the menu</a></p>
    <div class="mt-3 flex flex-wrap items-center gap-2">
        <Button text="Book" />
        <Button variant="outline" text="Details" />
        <Badge variant="brand" emphasis="solid" text="New" />
        <Badge text="Subtle" />
    </div>
    <div class="mt-3"><Rating value={4} readonly label="Rating" /></div>
{/snippet}

<div class="grid w-[44rem] max-w-full gap-4 sm:grid-cols-2">
    {#each tones as tone (tone)}
        <Card {tone} {size}>{@render content(tone)}</Card>
    {/each}
    <Card {size} fill="#1f3a5f" onFill="#ffffff">{@render content("Custom fill")}</Card>
    <Card {size} fill="#1f3a5f" onFill="#ffffff" href="/pubs/1">{@render content("Custom fill, link")}</Card>
</div>
