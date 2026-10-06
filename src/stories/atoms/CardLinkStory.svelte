<script lang="ts">
    import Card from "../../components/atoms/Card.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Text from "../../components/atoms/Text.svelte";
    let { size = "sm" }: { size?: "sm" | "md" | "lg" } = $props();
</script>

<div class="flex w-96 max-w-full flex-col gap-3">
    <Card href="/pubs/1" {size}>
        <Heading level={3} text="The Crown" />
        <Text tone="description">Open until 23</Text>
    </Card>
    <Card href="/pubs/2" {size} tone="tint">
        <Heading level={3} text="The Anchor" />
        <Text tone="description">Open until 01</Text>
    </Card>
    <Card href="/pubs/3" {size} tone="brand">
        <Heading level={3} text="The Harp" />
        <Text>Open until 22</Text>
    </Card>
</div>
