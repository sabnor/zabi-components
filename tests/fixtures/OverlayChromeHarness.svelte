<script lang="ts">
    import BottomSheet from "../../src/components/molecules/BottomSheet.svelte";
    import Drawer from "../../src/components/molecules/Drawer.svelte";
    import Modal from "../../src/components/molecules/Modal.svelte";
    import SlideUp from "../../src/components/molecules/SlideUp.svelte";

    interface Props {
        kind: "sheet" | "modal" | "modal-full" | "modal-mobile" | "drawer" | "slide" | "slide-swipe";
        withFooter?: boolean;
    }

    let { kind, withFooter = true }: Props = $props();

    let open = $state(true);
    const title = "Lägg till på hemskärmen";
</script>

{#snippet text()}
    <p data-testid="text">Öppna webbläsarens meny och välj Dela.</p>
{/snippet}
{#snippet done()}
    <button type="button" data-testid="done" onclick={() => (open = false)}>Klar</button>
{/snippet}

{#if kind === "sheet"}
    <BottomSheet bind:isOpen={open} {title} lang="sv" footer={withFooter ? done : undefined}>
        {@render text()}
    </BottomSheet>
{:else if kind === "drawer"}
    <Drawer bind:isOpen={open} {title} lang="sv" footer={withFooter ? done : undefined}>
        {@render text()}
    </Drawer>
{:else if kind === "slide" || kind === "slide-swipe"}
    <!-- Rendered in place, and takes no `lang` of its own. -->
    <div lang="sv">
        <SlideUp
            bind:isOpen={open}
            {title}
            swipeToClose={kind === "slide-swipe"}
            footer={withFooter ? done : undefined}
        >
            {@render text()}
        </SlideUp>
    </div>
{:else}
    <Modal
        bind:isOpen={open}
        {title}
        lang="sv"
        fullScreen={kind === "modal-full" ? true : kind === "modal-mobile" ? "mobile" : false}
        footer={withFooter ? done : undefined}
    >
        {@render text()}
    </Modal>
{/if}
