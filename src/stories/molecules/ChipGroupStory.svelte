<script lang="ts">
    import Chip from '../../components/atoms/Chip.svelte';
    import ChipGroup from '../../components/molecules/ChipGroup.svelte';

    interface Props {
        scenario?: 'wrap-checkbox' | 'radio' | 'row-links' | 'row-subgroups' | 'row-no-edge' | 'on-brand';
        edge?: 'fade' | 'none';
    }

    let { scenario = 'wrap-checkbox', edge = 'fade' }: Props = $props();

    let toppings = $state<string[]>(['ham']);
    let plan = $state<string | undefined>('pro');
    let day = $state<string | undefined>('sat');
    let areas = $state<string[]>(['north']);

    const pubs = [
        'All', 'Open now', 'Near me', 'Food', 'Quiz tonight', 'Outdoor seating', 'Live music',
        'Dog friendly', 'Craft beer', 'Cocktails', 'Karaoke', 'Pool table', 'Rooftop'
    ];
</script>

{#if scenario === 'wrap-checkbox'}
    <ChipGroup label="Toppings" showLabel type="checkbox" name="topping" bind:value={toppings}>
        {#each ['Cheese', 'Ham', 'Mushroom', 'Olives', 'Pineapple', 'Onion', 'Pepper'] as topping (topping)}
            <Chip value={topping.toLowerCase()}>{topping}</Chip>
        {/each}
    </ChipGroup>
    <p class="mt-4 text-sm text-description">Chosen: {toppings.join(', ') || 'nothing'}</p>
{:else if scenario === 'radio'}
    <ChipGroup label="Plan" showLabel type="radio" name="plan" bind:value={plan}>
        <Chip value="basic">Basic</Chip>
        <Chip value="pro">Pro</Chip>
        <Chip value="team">Team</Chip>
        <Chip value="legacy" disabled>Legacy</Chip>
    </ChipGroup>
    <p class="mt-4 text-sm text-description">Chosen: {plan ?? 'nothing'}</p>
{:else if scenario === 'row-links'}
    <div class="w-[360px] max-w-full">
        <ChipGroup label="Filter pubs" layout="row" {edge}>
            {#each pubs as pub, index (pub)}
                <Chip href={`#filter-${index + 1}`} selected={index === 10}>{pub}</Chip>
            {/each}
        </ChipGroup>
    </div>
{:else if scenario === 'row-subgroups'}
    <div class="w-[360px] max-w-full">
        <ChipGroup label="Filters" layout="row" {edge}>
            <ChipGroup label="Day" type="radio" name="day" bind:value={day}>
                <Chip value="fri">Fri</Chip>
                <Chip value="sat">Sat</Chip>
                <Chip value="sun">Sun</Chip>
            </ChipGroup>
            <ChipGroup label="Area" type="checkbox" name="area" bind:value={areas}>
                <Chip value="north">North</Chip>
                <Chip value="south">South</Chip>
                <Chip value="centre">Centre</Chip>
            </ChipGroup>
            <ChipGroup label="Extras">
                <Chip>Food</Chip>
                <Chip>Outdoor</Chip>
            </ChipGroup>
        </ChipGroup>
    </div>
{:else if scenario === 'row-no-edge'}
    <div class="w-[360px] max-w-full">
        <ChipGroup label="Filter pubs" layout="row" edge="none">
            {#each pubs as pub, index (pub)}
                <Chip href={`#filter-${index + 1}`} selected={index === 10}>{pub}</Chip>
            {/each}
        </ChipGroup>
    </div>
{:else}
    <div class="on-brand w-[360px] max-w-full rounded-container bg-action-primary p-4">
        <ChipGroup label="Filter pubs" layout="row" {edge}>
            {#each pubs as pub, index (pub)}
                <Chip href={`#filter-${index + 1}`} selected={index === 2}>{pub}</Chip>
            {/each}
        </ChipGroup>
    </div>
{/if}
