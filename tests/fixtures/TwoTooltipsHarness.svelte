<script lang="ts">
    import Tooltip from "../../src/components/atoms/Tooltip.svelte";

    interface Props {
        /** Shows the second trigger and its tooltip. */
        withSecond?: boolean;
    }
    let { withSecond = true }: Props = $props();
</script>

<Tooltip content="First hint">
    <button type="button" data-testid="first">First</button>
</Tooltip>
{#if withSecond}
    <Tooltip content="Second hint">
        <button type="button" data-testid="second">Second</button>
    </Tooltip>
{/if}
