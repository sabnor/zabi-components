<script lang="ts">
    import { untrack } from 'svelte';
    import Copy from '@lucide/svelte/icons/copy';
    import Pencil from '@lucide/svelte/icons/pencil';
    import Archive from '@lucide/svelte/icons/archive';
    import Trash2 from '@lucide/svelte/icons/trash-2';
    import Dropdown from '../../components/molecules/Dropdown.svelte';
    import DropdownItem from '../../components/molecules/DropdownItem.svelte';
    import Button from '../../components/atoms/Button.svelte';
    import type { DropdownOption } from '../../components/util/dropdown.js';

    interface Props {
        isOpen?: boolean;
        placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
        /** Render the items as `DropdownItem` children instead of `options`. */
        custom?: boolean;
        presentation?: 'auto' | 'popover' | 'sheet';
    }

    let {
        isOpen: initialOpen = true,
        placement = 'bottom-start',
        custom = false,
        presentation = 'popover',
    }: Props = $props();

    // Initial value only; the effect below syncs later prop changes.
    let isOpen = $state(untrack(() => initialOpen));

    $effect(() => {
        isOpen = initialOpen;
    });

    let lastAction = $state('');

    const options: DropdownOption[] = [
        { value: 'edit', label: 'Edit', icon: Pencil },
        { value: 'duplicate', label: 'Duplicate', icon: Copy, description: 'Copies the settings too.' },
        {
            value: 'archive',
            label: 'Archive',
            icon: Archive,
            disabled: true,
            description: 'Only an owner can archive a project.',
        },
        { value: 'delete', label: 'Delete', icon: Trash2, tone: 'danger' },
    ];

    function choose(value: string | number) {
        lastAction = String(value);
        isOpen = false;
    }
</script>

<div class="space-y-2">
    <Dropdown
        bind:isOpen
        {placement}
        {presentation}
        ariaLabel="Project actions"
        options={custom ? [] : options}
        onOptionClick={choose}
    >
        {#snippet trigger(aria)}
            <Button
                text="Project actions"
                variant="secondary"
                onclick={() => (isOpen = !isOpen)}
                {...aria}
            />
        {/snippet}
        {#snippet children()}
            <div class="px-2 py-1">
                {#each options as option (option.value)}
                    <DropdownItem
                        label={option.label}
                        description={option.description}
                        icon={option.icon}
                        tone={option.tone}
                        disabled={option.disabled}
                        onclick={() => choose(option.value)}
                    />
                {/each}
            </div>
        {/snippet}
    </Dropdown>
    {#if lastAction}
        <p class="text-sm text-description">Chosen: {lastAction}</p>
    {/if}
</div>
