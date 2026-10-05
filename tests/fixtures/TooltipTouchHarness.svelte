<script lang="ts">
    import Tooltip from "../../src/components/atoms/Tooltip.svelte";

    interface Props {
        touchDuration?: number;
        disabled?: boolean;
        delay?: number;
    }
    let { touchDuration, disabled = false, delay = 0 }: Props = $props();

    let pressed = $state(0);
</script>

<button type="button" data-testid="outside">Elsewhere</button>
<Tooltip content="Adds a question" {touchDuration} {disabled} {delay}>
    <button type="button" data-testid="trigger" onclick={() => (pressed += 1)}>Add</button>
</Tooltip>
<p data-testid="pressed">{pressed}</p>
