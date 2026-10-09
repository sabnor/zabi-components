<script lang="ts">
    import Card from "../../components/atoms/Card.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Text from "../../components/atoms/Text.svelte";
    let { size = "sm" }: { size?: "sm" | "md" | "lg" } = $props();
</script>

<form method="POST" onsubmit={(event) => event.preventDefault()} class="flex w-96 max-w-full flex-col gap-3">
    <Card type="submit" name="notification" value="n1" {size} tone="tint">
        <Heading level={3} text="Ny inbjudan" />
        <Text tone="description">Pubquiz på torsdag</Text>
    </Card>
    <Card type="submit" name="notification" value="n2" {size}>
        <Heading level={3} text="Läst" />
        <Text tone="description">Resultatet är klart</Text>
    </Card>
    <Card type="submit" name="notification" value="n3" {size} disabled>
        <Heading level={3} text="Avstängd" />
        <Text tone="description">Disabled</Text>
    </Card>
    <Card type="submit" name="notification" value="n4" {size} tone="tint" loading>
        <Heading level={3} text="Öppnas" />
        <Text tone="description">Loading: busy, the press swallowed, still a Tab stop</Text>
    </Card>
</form>
