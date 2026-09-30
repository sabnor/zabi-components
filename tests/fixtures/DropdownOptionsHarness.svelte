<script lang="ts">
    import Pencil from "@lucide/svelte/icons/pencil";
    import Trash2 from "@lucide/svelte/icons/trash-2";
    import Dropdown from "../../src/components/molecules/Dropdown.svelte";
    import DropdownItem from "../../src/components/molecules/DropdownItem.svelte";
    import type { DropdownOption } from "../../src/components/util/dropdown.js";

    interface Props {
        menuRole?: "menu" | "listbox";
        /** Render the same items as `DropdownItem` children instead of `options`. */
        custom?: boolean;
        onOptionClick?: (value: string | number) => void;
    }
    let { menuRole = "menu", custom = false, onOptionClick }: Props = $props();

    let isOpen = $state(false);

    const options: DropdownOption[] = [
        { value: "edit", label: "Edit", icon: Pencil },
        {
            value: "archive",
            label: "Archive",
            disabled: true,
            description: "Only an owner can archive.",
        },
        { value: "rename", label: "Rename", description: "Change the display name." },
        { value: "delete", label: "Delete", icon: Trash2, tone: "danger" },
    ];
</script>

<Dropdown
    bind:isOpen
    ariaLabel="Project actions"
    {menuRole}
    selectedValue="rename"
    options={custom ? [] : options}
    {onOptionClick}
>
    {#snippet trigger(props)}
        <button type="button" onclick={() => (isOpen = !isOpen)} {...props}>
            Actions
        </button>
    {/snippet}

    {#snippet children()}
        {#each options as option (option.value)}
            <DropdownItem
                label={option.label}
                description={option.description}
                icon={option.icon}
                tone={option.tone}
                disabled={option.disabled}
                onclick={() => onOptionClick?.(option.value)}
            />
        {/each}
    {/snippet}
</Dropdown>
