<script lang="ts">
    import Button from "../../components/atoms/Button.svelte";
    import Block from "../../components/atoms/Block.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Text from "../../components/atoms/Text.svelte";
    import type { SurfaceTone } from "../../components/types/variants.js";

    let { scenario = "tones" }: { scenario?: "tones" | "page" | "fill" } = $props();
    const tones: SurfaceTone[] = ["neutral", "tint", "brand", "accent"];
</script>

<div class="w-[40rem] max-w-full">
    {#if scenario === "tones"}
        {#each tones as tone (tone)}
            <Block {tone}>
                <Heading level={3} text={tone} />
                <Text>One colour per block.</Text>
                <div class="mt-3"><Button variant="outline" text="Read more" /></div>
            </Block>
        {/each}
    {:else if scenario === "page"}
        <Block as="section" tone="brand" aria-labelledby="offer" padding="lg">
            <Heading id="offer" level={2} text="Join the club" />
            <Text>Free to join, cancel any time.</Text>
            <div class="mt-3"><Button text="Join" /></div>
        </Block>
        <Block as="section" tone="tint" aria-labelledby="how" padding="lg">
            <Heading id="how" level={2} text="How it works" />
            <Text>Pick a pub, show your card, collect points.</Text>
        </Block>
    {:else}
        <Block fill="#7a3e00" onFill="#ffffff">
            <Heading level={3} text="Custom fill" />
            <Text>The app picks the colour and the label colour, and checks their contrast.</Text>
            <a href="/more">A link</a>
            <div class="mt-3"><Button variant="outline" text="Read more" /></div>
        </Block>
    {/if}
</div>
