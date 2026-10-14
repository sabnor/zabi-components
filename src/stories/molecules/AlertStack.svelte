<script lang="ts">
    import Alert from '../../components/molecules/Alert.svelte';

    interface Props {
        bordered?: boolean;
        /** Set `--zabi-alert-border-width: 0px` on a parent instead of using the prop. */
        wrapper?: boolean;
    }

    let { bordered = true, wrapper = false }: Props = $props();

    const variants = ['info', 'success', 'warning', 'error', 'neutral', 'energetic', 'brand'] as const;
</script>

<div class="flex w-96 max-w-full flex-col gap-3" style={wrapper ? '--zabi-alert-border-width: 0px' : undefined}>
    {#each variants as variant (variant)}
        <Alert {variant} {bordered} title={variant} message="The same box with or without an edge." />
    {/each}
</div>
