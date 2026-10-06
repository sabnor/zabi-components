<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import Checkbox from "../../../components/atoms/Checkbox.svelte";
    import Heading from "../../../components/atoms/Heading.svelte";
    import IconButton from "../../../components/atoms/IconButton.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import Radio from "../../../components/atoms/Radio.svelte";
    import Rating from "../../../components/atoms/Rating.svelte";
    import Select from "../../../components/atoms/Select.svelte";
    import Text from "../../../components/atoms/Text.svelte";
    import Toggle from "../../../components/atoms/Toggle.svelte";
    import type { ButtonVariant } from "../../../components/types/variants.js";

    /**
     * Every kind of control inside a brand block and an accent block, for
     * playwright/blocks.spec.ts: directly on the block, on a card inside it,
     * and in a block inside that card.
     */
    const BLOCKS = [
        { id: "brand", fill: "bg-action-primary on-brand", inner: "bg-accent on-accent" },
        { id: "accent", fill: "bg-accent on-accent", inner: "bg-action-primary on-brand" },
    ];
    const QUIET: ButtonVariant[] = ["outline", "ghost", "link", "secondary"];
    const OPTIONS = [
        { value: "se", label: "Sverige" },
        { value: "no", label: "Norge" },
    ];
</script>

<svelte:head>
    <title>Blocks lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

{#snippet controls(where: string)}
    <div class="space-y-4" data-testid="controls-{where}">
        <Heading level={2} tone="inherit" data-part="heading">Dagens quiz</Heading>
        <Text tone="inherit" data-part="text">Tio frågor om Sverige.</Text>
        <p class="text-body" data-part="body">Body text of the page roles.</p>
        <p class="text-description" data-part="description">A description.</p>
        <p class="text-caption text-xs" data-part="caption">A caption.</p>
        <a class="text-link underline" href="/docs" data-part="link">A plain link</a>

        <div data-part="checkbox"><Checkbox label="Remember me" /></div>
        <div data-part="checkbox-checked"><Checkbox label="Checked" checked /></div>
        <div data-part="radio"><Radio label="Weekly" name="when-{where}" value="weekly" /></div>
        <div data-part="toggle"><Toggle label="Notifications" /></div>
        <div data-part="input"><Input label="Email" hint="We never share it." placeholder="you@example.com" /></div>
        <div data-part="select"><Select label="Country" options={OPTIONS} placeholder="Choose" /></div>
        <div data-part="rating"><Rating label="Betyg" value={2} /></div>

        <div class="flex flex-wrap items-center gap-3">
            {#each QUIET as variant (variant)}
                <Button {variant} data-part="button-{variant}">{variant}</Button>
            {/each}
            <Button variant="danger" data-part="button-danger">danger</Button>
            <Button variant="primary" data-part="button-primary">primary</Button>
            <Button variant="accent" data-part="button-accent">accent</Button>
            <IconButton variant="ghost" label="More" data-part="icon-ghost"><span aria-hidden="true">M</span></IconButton>
            <IconButton variant="outline" label="Edit" data-part="icon-outline"><span aria-hidden="true">E</span></IconButton>
        </div>
    </div>
{/snippet}

<main class="space-y-8 p-4">
    <h1 class="text-lg font-semibold text-headline">Blocks lab</h1>

    {#each BLOCKS as block (block.id)}
        <section class="{block.fill} space-y-6 rounded-container p-6" data-testid="block-{block.id}">
            {@render controls(`${block.id}-direct`)}

            <div class="bg-card space-y-4 rounded-container p-4" data-testid="card-in-{block.id}">
                {@render controls(`${block.id}-card`)}

                <div class="{block.inner} rounded-container p-4" data-testid="block-in-card-in-{block.id}">
                    {@render controls(`${block.id}-inner`)}
                </div>
            </div>

            <div class="on-surface space-y-2 rounded-container p-4" style="background: var(--color-surface-raised)" data-testid="own-surface-in-{block.id}">
                <p class="text-body" data-part="body">On a background of the app's own.</p>
                <Button variant="outline" data-part="button-outline">outline</Button>
            </div>
        </section>
    {/each}
</main>
