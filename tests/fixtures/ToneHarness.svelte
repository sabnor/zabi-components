<script lang="ts">
    import Badge from "../../src/components/atoms/Badge.svelte";
    import Block from "../../src/components/atoms/Block.svelte";
    import Button from "../../src/components/atoms/Button.svelte";
    import Card from "../../src/components/atoms/Card.svelte";
    import Heading from "../../src/components/atoms/Heading.svelte";
    import Rating from "../../src/components/atoms/Rating.svelte";
    import Text from "../../src/components/atoms/Text.svelte";
    import type { SurfaceTone } from "../../src/components/types/variants.js";

    let {
        scenario = "card",
        tone = "neutral",
        fill,
        onFill,
        onclick,
    }: { scenario?: string; tone?: SurfaceTone; fill?: string; onFill?: string; onclick?: (e: MouseEvent) => void } = $props();
</script>

{#snippet inside()}
    <Heading level={3} text="Rubrik" />
    <Text>Brödtext</Text>
    <a href="/mer">En länk</a>
    <Button text="Primär" />
    <Button variant="outline" text="Kontur" />
    <Badge variant="brand" emphasis="solid" text="Solid" />
    <Rating value={3} readonly label="Betyg" />
{/snippet}

{#if scenario === "link"}
    <Card href="/pubs/1" {tone} {fill} {onFill} {onclick} data-testid="card">
        <Heading level={3} text="Puben" />
        <Text>Öppet till 23</Text>
    </Card>
{:else if scenario === "link-label"}
    <Card href="/pubs/1" ariaLabel="Öppna puben" target="_blank" rel="noopener" data-testid="card">Ikon</Card>
{:else if scenario === "tone"}
    <Card {tone} {fill} {onFill} {onclick} data-testid="card">{@render inside()}</Card>
{:else if scenario === "nested"}
    <Card {tone} {fill} {onFill} data-testid="outer">
        <Card data-testid="inner">inre</Card>
    </Card>
{:else if scenario === "block"}
    <Block {tone} {fill} {onFill} data-testid="block">{@render inside()}</Block>
{:else if scenario === "block-section"}
    <Block as="section" aria-label="Sektion" id="s1" data-x="1" tone="brand" data-testid="block">Innehåll</Block>
    <Block as="footer" tone="tint" data-testid="block2">Fot</Block>
{:else}
    <Card {tone} {fill} {onFill} {onclick} data-testid="card">Innehåll</Card>
{/if}
