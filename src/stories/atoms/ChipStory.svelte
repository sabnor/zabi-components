<script lang="ts">
    import MapPin from '@lucide/svelte/icons/map-pin';
    import Chip from '../../components/atoms/Chip.svelte';
    import Avatar from '../../components/atoms/Avatar.svelte';

    interface Props {
        /** Which arrangement to show. */
        scenario?: 'forms' | 'states' | 'sizes' | 'leading' | 'disabled' | 'on-brand';
        size?: 'sm' | 'md' | 'lg';
    }

    let { scenario = 'forms', size = 'md' }: Props = $props();

    let pressed = $state(true);
    let plan = $state<string | undefined>('pro');
</script>

{#snippet pin()}
    <MapPin size={14} aria-hidden="true" />
{/snippet}
{#snippet face()}
    <Avatar name="Ada Lovelace" size="sm" />
{/snippet}

{#if scenario === 'forms'}
    <div class="flex flex-wrap items-center gap-2">
        <Chip href="#open" selected {size}>Link, selected</Chip>
        <Chip href="#all" {size}>Link</Chip>
        <Chip bind:selected={pressed} {size}>Toggle button</Chip>
        <Chip type="checkbox" name="cheese" value="yes" {size}>Checkbox</Chip>
        <Chip type="radio" name="story-plan" value="basic" selected={plan === 'basic'} {size}>Radio A</Chip>
        <Chip type="radio" name="story-plan" value="pro" selected={plan === 'pro'} {size}>Radio B</Chip>
    </div>
{:else if scenario === 'states'}
    <div class="flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
            <Chip {size}>Not selected</Chip>
            <Chip selected {size}>Selected</Chip>
            <Chip type="checkbox" value="a" {size}>Checkbox</Chip>
            <Chip type="checkbox" value="b" selected {size}>Checkbox, selected</Chip>
        </div>
    </div>
{:else if scenario === 'sizes'}
    <div class="flex flex-wrap items-center gap-2">
        <Chip size="sm" selected>Small, 28px</Chip>
        <Chip size="md" selected>Medium, 32px</Chip>
        <Chip size="lg" selected>Large, 40px</Chip>
        <Chip size="sm">Small</Chip>
        <Chip size="md">Medium</Chip>
        <Chip size="lg">Large</Chip>
    </div>
{:else if scenario === 'leading'}
    <div class="flex flex-wrap items-center gap-2">
        <Chip leading={pin} {size}>Near me</Chip>
        <Chip leading={pin} selected {size}>Near me</Chip>
        <Chip leading={face} {size}>Ada</Chip>
        <Chip href="#long" class="max-w-xs" {size}>A very long label that is cut off by a maximum width on the chip, so it ends in an ellipsis</Chip>
    </div>
{:else if scenario === 'disabled'}
    <div class="flex flex-wrap items-center gap-2">
        <Chip disabled {size}>Button</Chip>
        <Chip href="#a" disabled {size}>Link</Chip>
        <Chip type="checkbox" disabled selected {size}>Checkbox</Chip>
    </div>
{:else}
    <div class="on-brand flex flex-wrap items-center gap-2 rounded-container bg-action-primary p-4">
        <Chip href="#a" selected {size}>Selected</Chip>
        <Chip href="#b" {size}>At rest</Chip>
        <Chip type="checkbox" value="c" {size}>Checkbox</Chip>
    </div>
{/if}
