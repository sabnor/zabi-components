<script lang="ts">
    import Avatar from '../../components/atoms/Avatar.svelte';
    import Checkbox from '../../components/atoms/Checkbox.svelte';
    import Radio from '../../components/atoms/Radio.svelte';
    import Toggle from '../../components/atoms/Toggle.svelte';

    interface Props {
        control?: 'checkbox' | 'radio' | 'toggle';
        label?: string;
    }

    let { control = 'checkbox', label = 'Anna Lindqvist' }: Props = $props();
</script>

{#snippet leading()}
    <Avatar name={label} alt="" size="sm" />
{/snippet}

{#if control === 'checkbox'}
    <Checkbox {label} {leading} />
{:else if control === 'radio'}
    <Radio name="attendee" value="anna" {label} {leading} />
{:else}
    <Toggle {label} {leading} />
{/if}
