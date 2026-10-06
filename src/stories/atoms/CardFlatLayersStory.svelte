<script lang="ts">
    import Card from "../../components/atoms/Card.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Text from "../../components/atoms/Text.svelte";

    let { size = "sm" }: { size?: "sm" | "md" | "lg" } = $props();
</script>

{#snippet layers()}
    <Card variant="flat" {size}>
        <Heading level={4} text="Layer one" />
        <Card variant="flat" {size} class="mt-3">
            <Heading level={4} text="Layer two" />
            <Card variant="flat" {size} class="mt-3">
                <Heading level={4} text="Layer three" />
                <Text>Body text on the third layer.</Text>
                <Text {size} tone="caption">Caption text on the third layer.</Text>
            </Card>
        </Card>
    </Card>
{/snippet}

<div class="grid w-[56rem] max-w-full gap-6 md:grid-cols-3">
    <div class="rounded-container bg-background p-4">
        <p class="mb-2 text-sm text-caption">On the page</p>
        {@render layers()}
    </div>
    <Card {size}>
        <p class="mb-2 text-sm text-caption">Inside a default card</p>
        {@render layers()}
    </Card>
    <Card variant="elevated" {size}>
        <p class="mb-2 text-sm text-caption">Inside an elevated card</p>
        {@render layers()}
    </Card>
</div>
