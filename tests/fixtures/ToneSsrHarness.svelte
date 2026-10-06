<script lang="ts">
    import Block from "../../src/components/atoms/Block.svelte";
    import Card from "../../src/components/atoms/Card.svelte";
    import Heading from "../../src/components/atoms/Heading.svelte";
</script>

<Card href="/pubs/1" tone="brand" data-testid="link">
    <Heading level={3} text="Puben" />
</Card>
<Block as="section" tone="tint" aria-label="Erbjudande">Innehåll</Block>
<Card fill="#123" onFill="#fff">Egen färg</Card>
