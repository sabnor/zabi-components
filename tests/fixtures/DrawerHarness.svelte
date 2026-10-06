<script lang="ts">
    import Drawer from "../../src/components/molecules/Drawer.svelte";
    import Modal from "../../src/components/molecules/Modal.svelte";
    import type {
        DrawerCloseReason,
        DrawerSide,
        DrawerSize,
    } from "../../src/components/util/drawer.js";

    interface Props {
        initialOpen?: boolean;
        side?: DrawerSide;
        size?: DrawerSize;
        portal?: boolean;
        dismissible?: boolean;
        description?: string;
        closeLabel?: string;
        withFooter?: boolean;
        initialFocus?: string;
        /** `drawer-in-modal`: the drawer opens from a modal. `modal-in-drawer`: the reverse. */
        nesting?: "none" | "drawer-in-modal" | "modal-in-drawer";
        /** Replace the controls with plain text, as a read-only drawer has. */
        textOnly?: boolean;
        onkeydown?: (event: KeyboardEvent) => void;
        onclose?: (detail: { reason: DrawerCloseReason }) => void;
    }

    let {
        initialOpen = false,
        side,
        size,
        portal,
        dismissible = true,
        description,
        closeLabel,
        withFooter = false,
        initialFocus,
        nesting = "none",
        textOnly = false,
        onkeydown,
        onclose,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let isOpen = $state(initialOpen);
    let modalOpen = $state(false);
    let applyDisabled = $state(false);
</script>

{#snippet drawer()}
    <Drawer
        bind:isOpen
        title="Choose a project"
        data-testid="drawer"
        {side}
        {size}
        {portal}
        {dismissible}
        {description}
        {closeLabel}
        {initialFocus}
        {onclose}
        {onkeydown}
    >
        {#if textOnly}
            <p data-testid="prose">Release notes, with nothing to focus.</p>
        {:else}
        <input aria-label="Search projects" id="project-search" />
        <button type="button">Zabi web</button>
        <button
            type="button"
            disabled={applyDisabled}
            onclick={() => (applyDisabled = true)}
        >
            Apply
        </button>
        {/if}
        {#if nesting === "modal-in-drawer"}
            <button type="button" onclick={() => (modalOpen = true)}>New project</button>
            <Modal bind:isOpen={modalOpen} title="New project" portal>
                <button type="button">Create</button>
            </Modal>
        {/if}
        {#snippet footer()}
            {#if withFooter}
                <button type="button" onclick={() => (isOpen = false)}>Done</button>
            {/if}
        {/snippet}
    </Drawer>
{/snippet}

<!-- Stands in for the ancestor a portalled drawer has to get out of. -->
<div data-testid="host">
    {#if nesting === "drawer-in-modal"}
        <button type="button" onclick={() => (modalOpen = true)}>Edit page</button>
        <Modal bind:isOpen={modalOpen} title="Edit page">
            <button type="button" onclick={() => (isOpen = true)}>Open projects</button>
            {@render drawer()}
        </Modal>
    {:else}
        <button type="button" onclick={() => (isOpen = true)}>Open projects</button>
        <button type="button" onclick={() => (isOpen = false)}>Close from parent</button>
        {@render drawer()}
    {/if}
</div>
<p data-testid="state">{isOpen ? "open" : "closed"}</p>
