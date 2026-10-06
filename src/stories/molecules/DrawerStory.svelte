<script lang="ts">
    import Button from '../../components/atoms/Button.svelte';
    import Input from '../../components/atoms/Input.svelte';
    import Drawer from '../../components/molecules/Drawer.svelte';
    import type { DrawerSide, DrawerSize } from '../../components/util/drawer.js';

    interface Props {
        side?: DrawerSide;
        size?: DrawerSize;
        title?: string;
        description?: string;
        dismissible?: boolean;
        closeLabel?: string;
        /** Render a footer with two buttons. */
        withFooter?: boolean;
        /** Enough content to scroll inside the panel. */
        long?: boolean;
    }

    let {
        side = 'right',
        size = 'md',
        title = 'Choose a project',
        description = '',
        dismissible = true,
        closeLabel = 'Close',
        withFooter = false,
        long = false,
    }: Props = $props();

    let isOpen = $state(false);
    let lastClose = $state('none yet');

    const projects = ['Zabi web', 'Zabi admin', 'Marketing site', 'Design tokens', 'Partner portal'];
    const rows = $derived(long ? Array.from({ length: 8 }, () => projects).flat() : projects);
</script>

<div class="space-y-3">
    <Button onclick={() => (isOpen = true)}>Open drawer</Button>
    <p class="text-sm text-description">Last close: {lastClose}</p>
    <Drawer
        bind:isOpen
        onclose={({ reason }) => (lastClose = reason)}
        {title}
        {description}
        {side}
        {size}
        {dismissible}
        {closeLabel}
        initialFocus="#drawer-story-search"
    >
        <Input label="Search projects" placeholder="Search" id="drawer-story-search" />
        <ul class="mt-4 space-y-1">
            {#each rows as name, index (index)}
                <li>
                    <button
                        type="button"
                        class="focus-ring w-full cursor-pointer rounded-control px-3 py-2 text-left text-sm text-body transition-colors hover:bg-surface-overlay-hover"
                        onclick={() => (isOpen = false)}
                    >
                        {name}
                    </button>
                </li>
            {/each}
        </ul>
        {#snippet footer()}
            {#if withFooter || !dismissible}
                <Button variant="outline" onclick={() => (isOpen = false)}>Cancel</Button>
                <Button onclick={() => (isOpen = false)}>Done</Button>
            {/if}
        {/snippet}
    </Drawer>
</div>
