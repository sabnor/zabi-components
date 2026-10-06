<script lang="ts">
    import Tooltip from "../../src/components/atoms/Tooltip.svelte";

    interface Props {
        touchDuration?: number;
        disabled?: boolean;
        delay?: number;
        /** The trigger is a natively disabled button. */
        triggerDisabled?: boolean;
        /** The trigger is unavailable but still takes focus. */
        triggerAriaDisabled?: boolean;
    }
    let {
        touchDuration,
        disabled = false,
        delay = 0,
        triggerDisabled = false,
        triggerAriaDisabled = false,
    }: Props = $props();

    let pressed = $state(0);
</script>

<button type="button" data-testid="outside">Elsewhere</button>
<Tooltip content="Adds a question" {touchDuration} {disabled} {delay}>
    <button
        type="button"
        data-testid="trigger"
        disabled={triggerDisabled}
        aria-disabled={triggerAriaDisabled ? "true" : undefined}
        onclick={() => (pressed += 1)}
    >
        Add
    </button>
</Tooltip>
<p data-testid="pressed">{pressed}</p>
