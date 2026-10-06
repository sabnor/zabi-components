<script lang="ts">
    import Pencil from "@lucide/svelte/icons/pencil";
    import FloatingActionButton from "../../src/components/atoms/FloatingActionButton.svelte";
    import SlideUp from "../../src/components/molecules/SlideUp.svelte";
    import StickyActionBar from "../../src/components/molecules/StickyActionBar.svelte";
    import AppShell from "../../src/components/organisms/AppShell.svelte";

    /**
     * One harness for the small phone pieces, picked by `piece`:
     * - `bar`: a StickyActionBar after a field, in a scrolling box or not;
     * - `fab-in-shell`: a FloatingActionButton inside an AppShell;
     * - `slide-up`: a SlideUp with an opener and content.
     */
    interface Props {
        piece: "bar" | "fab-in-shell" | "slide-up";
        label?: string;
        inScroller?: boolean;
        barClass?: string;
        barStyle?: string;
        extended?: boolean;
        position?: "bottom-end" | "bottom-start" | "bottom-center";
        swipeToClose?: boolean;
        title?: string;
        initialOpen?: boolean;
        onclick?: (event: Event) => void;
        onsave?: () => void;
    }

    let {
        piece,
        label,
        inScroller = true,
        barClass,
        barStyle,
        extended,
        position,
        swipeToClose,
        title = "Release notes",
        initialOpen = false,
        onclick,
        onsave,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let open = $state(initialOpen);
</script>

{#snippet bar()}
    <label>
        Name
        <input type="text" data-testid="field" />
    </label>
    <StickyActionBar {label} class={barClass} style={barStyle} data-testid="bar">
        <button type="button" onclick={onsave}>Save visit</button>
    </StickyActionBar>
{/snippet}

{#if piece === "bar"}
    {#if inScroller}
        <div data-testid="scroller" style="overflow-y: auto; height: 300px; scroll-padding-bottom: 4px;">
            {@render bar()}
        </div>
    {:else}
        {@render bar()}
    {/if}
{:else if piece === "fab-in-shell"}
    <AppShell data-testid="shell">
        <p>Rounds</p>
        <FloatingActionButton label="New quiz" icon={Pencil} {extended} {position} {onclick} />
    </AppShell>
{:else}
    <button type="button" data-testid="opener" onclick={() => (open = true)}>Open notes</button>
    <output data-testid="state">{open ? "open" : "closed"}</output>
    <SlideUp bind:isOpen={open} {title} {swipeToClose} {onclick}>
        <p>Fixes and small improvements.</p>
        <button type="button">Read more</button>
    </SlideUp>
{/if}
