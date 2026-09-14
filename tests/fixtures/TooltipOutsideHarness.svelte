<script lang="ts">
    import Tooltip from "../../src/components/atoms/Tooltip.svelte";
</script>

<button type="button" data-testid="outside-focus">Elsewhere</button>
<Tooltip content="Help copy">
    <button type="button" data-testid="tip-trigger">Hover me</button>
</Tooltip>
