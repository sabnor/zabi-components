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
        /** What a real menu does: choosing an item closes it. */
        closeOnChoose?: boolean;
        /** The handler moves focus itself, as one that opens a dialog would. */
        focusElsewhereOnChoose?: boolean;
        presentation?: "auto" | "popover" | "sheet";
        sheetTitle?: string;
        initialOpen?: boolean;
    }
    let {
        menuRole = "menu",
        custom = false,
        onOptionClick,
        closeOnChoose = false,
        focusElsewhereOnChoose = false,
        presentation = undefined,
        sheetTitle = undefined,
        initialOpen = false,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let isOpen = $state(initialOpen);
    let elsewhere = $state<HTMLButtonElement>();

    function choose(value: string | number) {
        onOptionClick?.(value);
        if (focusElsewhereOnChoose) elsewhere?.focus();
        if (closeOnChoose) isOpen = false;
    }

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
    {presentation}
    {sheetTitle}
    selectedValue="rename"
    options={custom ? [] : options}
    onOptionClick={choose}
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
                onclick={() => choose(option.value)}
            />
        {/each}
    {/snippet}
</Dropdown>
<button type="button" bind:this={elsewhere}>Elsewhere</button>
