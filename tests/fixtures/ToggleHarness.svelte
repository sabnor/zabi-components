<script lang="ts">
    import Toggle from "../../src/components/atoms/Toggle.svelte";

    interface Props {
        withLabel?: boolean;
    }
    let { withLabel = false }: Props = $props();
</script>

{#if withLabel}
    <Toggle label="Notifications" />
{:else}
    <Toggle />
{/if}
