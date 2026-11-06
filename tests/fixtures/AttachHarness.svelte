<script lang="ts">
    import Heading from "../../src/components/atoms/Heading.svelte";
    import Text from "../../src/components/atoms/Text.svelte";

    let { onHeading, onText }: { onHeading: (el: Element) => void; onText: (el: Element) => void } = $props();
</script>

<Heading level={2} text="Title" {@attach (el) => onHeading(el)} />
<Text {@attach (el) => onText(el)}>Body</Text>
