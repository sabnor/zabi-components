<script lang="ts">
    import { onMount } from "svelte";
    import Copy from "@lucide/svelte/icons/copy";
    import Pencil from "@lucide/svelte/icons/pencil";
    import Share2 from "@lucide/svelte/icons/share-2";
    import Trash2 from "@lucide/svelte/icons/trash-2";
    import Select from "../../../components/atoms/Select.svelte";
    import BottomSheet from "../../../components/molecules/BottomSheet.svelte";
    import Drawer from "../../../components/molecules/Drawer.svelte";
    import Dropdown from "../../../components/molecules/Dropdown.svelte";
    import Modal from "../../../components/molecules/Modal.svelte";
    import type { DropdownOption } from "../../../components/util/dropdown.js";

    /**
     * Select and Dropdown as a phone has them, for
     * playwright/touch-menus.spec.ts: the list in a BottomSheet on a touch
     * screen narrower than 640px, the pop-over everywhere else.
     */
    const pubs = [
        "Akkurat",
        "Bishops Arms",
        "Carmen",
        "Dovas",
        "Engelen",
        "Flying Elk",
        "Glenfiddich Warehouse",
        "Half Way Inn",
        "Indigo",
        "Kvarnen",
        "Lion Bar",
        "Monks Porter House",
    ].map((label, index) => ({ value: String(index + 1), label, disabled: index === 3 }));

    const sizes = [
        { value: "s", label: "Liten" },
        { value: "m", label: "Mellan" },
        { value: "l", label: "Stor" },
    ];

    const actions: DropdownOption[] = [
        { value: "edit", label: "Redigera", icon: Pencil },
        { value: "share", label: "Dela", icon: Share2, description: "Skicka en länk till besöket" },
        { value: "copy", label: "Kopiera", icon: Copy, disabled: true, description: "Bara ägaren kan kopiera" },
        { value: "delete", label: "Ta bort", icon: Trash2, tone: "danger" },
    ];

    let pub = $state<string | undefined>("7");
    let size = $state<string | undefined>(undefined);
    let inModal = $state<string | undefined>("2");
    let inDrawer = $state<string | undefined>(undefined);
    let inSheet = $state<string | undefined>(undefined);
    let forced = $state<string | undefined>(undefined);

    let lastAction = $state("");
    let popoverOpen = $state(false);
    let sheetOpen = $state(false);
    let autoOpen = $state(false);

    let modalOpen = $state(false);
    let drawerOpen = $state(false);
    let outerSheetOpen = $state(false);

    let hydrated = $state(false);
    onMount(() => {
        hydrated = true;
    });
</script>

<svelte:head>
    <title>Touch menus lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="p-4">
    <h1 class="text-lg font-semibold text-headline">Touch menus lab</h1>
    {#if hydrated}
        <span data-testid="lab-hydrated" aria-hidden="true" hidden></span>
    {/if}

    <form class="mt-4 max-w-xs space-y-4" data-testid="lab-form">
        <div data-testid="lab-select-long">
            <Select label="Pub" name="pub" options={pubs} bind:value={pub} />
        </div>
        <div data-testid="lab-select-short">
            <Select label="Storlek" name="size" options={sizes} searchable={false} bind:value={size} />
        </div>
        <div data-testid="lab-select-popover">
            <Select label="Alltid under fältet" options={sizes} presentation="popover" bind:value={forced} />
        </div>
    </form>
    <p class="mt-2 text-sm text-description" data-testid="lab-values">{pub ?? ""}|{size ?? ""}</p>

    <div class="mt-6 flex flex-wrap gap-4">
        <div data-testid="lab-menu-popover">
            <Dropdown
                bind:isOpen={popoverOpen}
                ariaLabel="Besök"
                options={actions}
                onOptionClick={(value) => {
                    lastAction = String(value);
                    popoverOpen = false;
                }}
            >
                {#snippet trigger(aria)}
                    <button type="button" class="min-h-11 rounded-control border border-border px-3" onclick={() => (popoverOpen = !popoverOpen)} {...aria}>Meny</button>
                {/snippet}
            </Dropdown>
        </div>
        <div data-testid="lab-menu-sheet">
            <Dropdown
                bind:isOpen={sheetOpen}
                presentation="sheet"
                ariaLabel="Besök"
                sheetTitle="Besöket på Kvarnen"
                options={actions}
                onOptionClick={(value) => {
                    if (value === "copy") return;
                    lastAction = String(value);
                    sheetOpen = false;
                }}
            >
                {#snippet trigger(aria)}
                    <button type="button" class="min-h-11 rounded-control border border-border px-3" onclick={() => (sheetOpen = !sheetOpen)} {...aria}>Åtgärder</button>
                {/snippet}
            </Dropdown>
        </div>
        <div data-testid="lab-menu-auto">
            <Dropdown
                bind:isOpen={autoOpen}
                presentation="auto"
                ariaLabel="Mer"
                options={actions}
                onOptionClick={(value) => {
                    lastAction = String(value);
                    autoOpen = false;
                }}
            >
                {#snippet trigger(aria)}
                    <button type="button" class="min-h-11 rounded-control border border-border px-3" onclick={() => (autoOpen = !autoOpen)} {...aria}>Mer</button>
                {/snippet}
            </Dropdown>
        </div>
    </div>
    <p class="mt-2 text-sm text-description" data-testid="lab-action">{lastAction}</p>

    <div class="mt-6 flex flex-wrap gap-2">
        <button type="button" class="min-h-11 rounded-control border border-border px-3" data-testid="lab-open-modal" onclick={() => (modalOpen = true)}>I en dialog</button>
        <button type="button" class="min-h-11 rounded-control border border-border px-3" data-testid="lab-open-drawer" onclick={() => (drawerOpen = true)}>I en låda</button>
        <button type="button" class="min-h-11 rounded-control border border-border px-3" data-testid="lab-open-sheet" onclick={() => (outerSheetOpen = true)}>I ett ark</button>
    </div>
    <p class="mt-2 text-sm text-description" data-testid="lab-nested-values">{inModal ?? ""}|{inDrawer ?? ""}|{inSheet ?? ""}</p>

    <Modal bind:isOpen={modalOpen} title="Nytt besök">
        <Select label="Pub i dialogen" options={pubs} bind:value={inModal} />
    </Modal>
    <Drawer bind:isOpen={drawerOpen} title="Filter">
        <Select label="Pub i lådan" options={pubs} bind:value={inDrawer} />
    </Drawer>
    <BottomSheet bind:isOpen={outerSheetOpen} title="Logga besök">
        <Select label="Pub i arket" options={pubs} bind:value={inSheet} />
    </BottomSheet>

    <!-- Room below, so the pop-overs have somewhere to open. -->
    <div class="h-96"></div>
</main>
