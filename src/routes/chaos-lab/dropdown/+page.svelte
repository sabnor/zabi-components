<script lang="ts">
    import { onMount } from "svelte";
    import Button from "../../../components/atoms/Button.svelte";
    import Select from "../../../components/atoms/Select.svelte";
    import Dropdown from "../../../components/molecules/Dropdown.svelte";
    import Modal from "../../../components/molecules/Modal.svelte";
    import NavigationMenu from "../../../components/molecules/NavigationMenu.svelte";
    import type { DropdownOption } from "../../../components/util/dropdown.js";

    /**
     * Dropdowns whose preferred side does not fit, for
     * playwright/dropdown-viewport.spec.ts. Each sits where the panel would
     * leave the screen if nothing moved it.
     */
    const options: DropdownOption[] = [
        { value: "rename", label: "Rename the project and its folder" },
        { value: "duplicate", label: "Duplicate with all of its settings" },
        { value: "archive", label: "Archive until the next season" },
        { value: "delete", label: "Delete", tone: "danger" },
    ];
    const many: DropdownOption[] = Array.from({ length: 24 }, (_, index) => ({
        value: `team-${index + 1}`,
        label: `Team ${index + 1}`,
    }));

    let hydrated = $state(false);
    onMount(() => {
        hydrated = true;
    });

    // Every id up front: `bind:isOpen` cannot start from undefined.
    let openById = $state<Record<string, boolean>>({
        "start-fits": false,
        "start-at-end": false,
        "end-at-start": false,
        "end-fits": false,
        long: false,
        "rtl-fits": false,
        "rtl-at-end": false,
        bottom: false,
        "in-scroller": false,
        "in-modal": false,
        "in-transformed": false,
    });
    let modalOpen = $state(false);
</script>

<svelte:head>
    <title>Dropdown lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

{#snippet menu(id: string, label: string, placement: "bottom-start" | "bottom-end" | "top-start" | "top-end", list: DropdownOption[])}
    <span data-testid={`lab-${id}`}>
        <Dropdown
            bind:isOpen={() => openById[id] ?? false, (value) => (openById[id] = value)}
            {placement}
            ariaLabel={label}
            options={list}
            onOptionClick={() => (openById[id] = false)}
        >
            {#snippet trigger(aria)}
                <Button size="sm" variant="outline" onclick={() => (openById[id] = !openById[id])} {...aria}>
                    {label}
                </Button>
            {/snippet}
        </Dropdown>
    </span>
{/snippet}

<main class="p-4">
    <h1 class="text-lg font-semibold text-headline">Dropdown lab</h1>
    {#if hydrated}
        <span data-testid="lab-hydrated" aria-hidden="true" hidden></span>
    {/if}

    <!-- Room above, so a menu near the top has somewhere to be measured from. -->
    <div class="mt-4 flex items-center justify-between">
        {@render menu("start-fits", "Fits", "bottom-start", options)}
        {@render menu("start-at-end", "At the end", "bottom-start", options)}
    </div>

    <div class="mt-4 flex items-center justify-between">
        {@render menu("end-at-start", "At the start", "bottom-end", options)}
        {@render menu("end-fits", "Fits too", "bottom-end", options)}
    </div>

    <div class="mt-4 flex justify-center">
        {@render menu("long", "Twenty-four", "bottom-start", many)}
    </div>

    <!-- A Select with every default, `maxMenuHeight` among them. -->
    <div class="mt-4 max-w-xs" data-testid="lab-select-default">
        <Select
            label="Team"
            options={many.map((team) => ({ value: String(team.value), label: team.label }))}
        />
    </div>

    <div class="mt-4" dir="rtl">
        <div class="flex items-center justify-between">
            {@render menu("rtl-fits", "RTL fits", "bottom-start", options)}
            {@render menu("rtl-at-end", "RTL at the end", "bottom-start", options)}
        </div>
    </div>

    <!-- Clipping ancestors: a box that scrolls is what cuts a menu off, not the screen. -->
    <div
        class="mt-4 h-40 w-64 overflow-y-auto border border-border p-2"
        data-testid="lab-scroller"
    >
        <p class="text-sm text-description">A 160px box that scrolls.</p>
        <div class="mt-16">
            {@render menu("in-scroller", "In a scroller", "bottom-start", options)}
        </div>
        <!-- Room to scroll the trigger out of the box. -->
        <div class="h-64"></div>
    </div>

    <div class="mt-4 max-w-xs" data-testid="lab-select-in-scroller-host">
        <div class="h-32 overflow-y-auto border border-border p-2" data-testid="lab-select-scroller">
            <Select
                label="Team"
                options={many.slice(0, 6).map((team) => ({ value: String(team.value), label: team.label }))}
            />
        </div>
    </div>

    <!-- A transformed box is the containing block of anything fixed inside it:
    there is no way out of this one, so the menu flips to its roomier side. -->
    <div
        class="mt-4 h-40 w-64 overflow-y-auto border border-border p-2"
        style="transform: translateZ(0)"
        data-testid="lab-transformed"
    >
        <div class="mt-20">
            {@render menu("in-transformed", "In a transformed box", "bottom-start", options)}
        </div>
    </div>

    <div class="mt-4 w-72 overflow-x-auto border border-border p-2" data-testid="lab-nav-scroller">
        <NavigationMenu
            menuId="lab-nav"
            ariaLabel="Lab menu"
            items={[
                {
                    value: "teams",
                    label: "Teams",
                    content: [
                        { href: "#a", label: "All teams", description: "Everyone who has played this season." },
                        { href: "#b", label: "My team" },
                        { href: "#c", label: "Invitations" },
                    ],
                },
            ]}
        />
    </div>

    <div class="mt-4">
        <Button size="sm" variant="secondary" onclick={() => (modalOpen = true)} data-testid="lab-open-modal">
            Open the dialog
        </Button>
    </div>
    <Modal bind:isOpen={modalOpen} title="A short dialog">
        <p class="text-sm text-description">The menu below has no room inside this dialog.</p>
        <div class="mt-2">
            {@render menu("in-modal", "In a dialog", "bottom-start", options)}
        </div>
    </Modal>

    <!-- Far enough down that the last menu has no room below it. -->
    <div style="height: 100vh" aria-hidden="true"></div>
    <div class="flex justify-end pb-2">
        {@render menu("bottom", "At the bottom", "bottom-end", options)}
    </div>
</main>
