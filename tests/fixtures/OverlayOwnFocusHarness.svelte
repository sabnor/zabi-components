<script lang="ts">
    import BottomSheet from "../../src/components/molecules/BottomSheet.svelte";
    import Drawer from "../../src/components/molecules/Drawer.svelte";
    import Modal from "../../src/components/molecules/Modal.svelte";
    import SlideUp from "../../src/components/molecules/SlideUp.svelte";

    /**
     * An overlay whose content takes focus itself as it opens (a search field
     * that focuses on mount). The overlay's own deferred focus move must not
     * take it away again.
     */
    interface Props {
        kind: "modal" | "drawer" | "slide-up" | "bottom-sheet";
        initialFocus?: string;
        /** False: nothing inside focuses itself, and the overlay picks as it always has. */
        ownFocus?: boolean;
    }
    let { kind, initialFocus = undefined, ownFocus = true }: Props = $props();

    let isOpen = $state(true);

    /**
     * Focuses the field once the overlay is in place and before its timer. A
     * microtask later, not at once: a portalled overlay is moved to `<body>`
     * after its content mounts, and moving a focused element blurs it.
     */
    function focusOnMount(node: HTMLInputElement) {
        if (ownFocus) queueMicrotask(() => node.focus());
    }
</script>

{#snippet content()}
    <button type="button" data-testid="first">First</button>
    <input aria-label="Search" data-testid="search" use:focusOnMount />
    <button type="button" data-testid="last">Last</button>
{/snippet}

{#if kind === "modal"}
    <Modal bind:isOpen title="Overlay" {initialFocus}>{@render content()}</Modal>
{:else if kind === "drawer"}
    <Drawer bind:isOpen title="Overlay" {initialFocus}>{@render content()}</Drawer>
{:else if kind === "slide-up"}
    <SlideUp bind:isOpen title="Overlay" {initialFocus}>{@render content()}</SlideUp>
{:else}
    <BottomSheet bind:isOpen title="Overlay" {initialFocus}>{@render content()}</BottomSheet>
{/if}
