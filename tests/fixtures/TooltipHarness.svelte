<script lang="ts">
    import Tooltip from "../../src/components/atoms/Tooltip.svelte";

    interface Props {
        delay?: number;
    }
    let { delay = 0 }: Props = $props();
</script>

<Tooltip content="Help copy" {delay}>
    <button type="button" data-testid="tip-trigger">Hover me</button>
</Tooltip>
