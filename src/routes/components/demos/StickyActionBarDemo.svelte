<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import Textarea from "../../../components/atoms/Textarea.svelte";
    import Bell from "@lucide/svelte/icons/bell";
    import House from "@lucide/svelte/icons/house";
    import Trophy from "@lucide/svelte/icons/trophy";
    import AppBar from "../../../components/molecules/AppBar.svelte";
    import BottomSheet from "../../../components/molecules/BottomSheet.svelte";
    import BottomTabBar from "../../../components/molecules/BottomTabBar.svelte";
    import StickyActionBar from "../../../components/molecules/StickyActionBar.svelte";
    import AppShell from "../../../components/organisms/AppShell.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let visit = $state({ place: "The Crown", date: "", team: "", players: "", notes: "" });
    let outcome = $state("Nothing saved yet.");
    let fullScreen = $state(false);
    /** Keep the tab bar under the form, to see the action bar sit above it. */
    let withTabs = $state(false);
    let sheetOpen = $state(false);

    const tabs = [
        { href: "/home", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/inbox", label: "Inbox", icon: Bell },
    ];

    function stayHere(event: MouseEvent) {
        if ((event.target as Element).closest("a")) event.preventDefault();
    }

    function save(event: SubmitEvent) {
        event.preventDefault();
        outcome = `Saved the visit to ${visit.place}.`;
    }
</script>

{#snippet fields(prefix: string)}
    <Input id="{prefix}-place" label="Place" bind:value={visit.place} />
    <Input id="{prefix}-date" label="Date" type="date" bind:value={visit.date} />
    <Input id="{prefix}-team" label="Team" bind:value={visit.team} />
    <Input id="{prefix}-players" label="Players" bind:value={visit.players} />
    <Textarea id="{prefix}-notes" label="Notes" bind:value={visit.notes} />
{/snippet}

{#snippet tabBar()}
    <BottomTabBar items={tabs} active="/quiz" onclick={stayHere} />
{/snippet}

<!-- A form screen: no tab bar, the action bar is the bottom of the screen.
`div`, because this page has its own `<main>`. In an app, leave it out. -->
{#snippet formScreen(className: string)}
    <AppShell
        class={className}
        contentElement="div"
        footer={withTabs ? tabBar : undefined}
        data-testid="sticky-action-bar-demo-shell"
    >
        {#snippet header()}
            <AppBar
                title="New visit"
                headingLevel={2}
                onback={fullScreen ? () => (fullScreen = false) : undefined}
                backLabel="Close full screen"
            />
        {/snippet}
        <!-- A column as tall as the screen, so the bar is at the bottom of
        it even when the fields end sooner. -->
        <form class="flex min-h-full flex-col" onsubmit={save}>
            <div class="space-y-4 p-4">
                {@render fields("sticky-shell-demo")}
            </div>
            <StickyActionBar label="Visit" data-testid="sticky-action-bar-demo-in-shell">
                <Button variant="ghost" size="lg" onclick={() => (outcome = "Draft kept.")}>
                    Save draft
                </Button>
                <Button type="submit" size="lg">Save visit</Button>
            </StickyActionBar>
        </form>
    </AppShell>
{/snippet}

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <!-- A scroll container of its own, so the bar has something to stick
        to inside this example. On a page, the page is the scroll container. -->
        <form
            class="mx-auto h-80 overflow-y-auto rounded-container border border-border sm:w-96"
            onsubmit={save}
            data-testid="sticky-action-bar-demo-scroller"
        >
            <div class="space-y-4 p-4">
                {@render fields("sticky-demo")}
            </div>
            <StickyActionBar data-testid="sticky-action-bar-demo">
                <Button type="submit" size="lg" fullWidth>Save visit</Button>
            </StickyActionBar>
        </form>
        <p class="text-sm text-description" data-testid="sticky-action-bar-demo-outcome">
            {outcome}
        </p>
    </div>
{:else if exampleIndex === 2}
    <div class="w-full space-y-3">
        <Button onclick={() => (sheetOpen = true)} data-testid="sticky-action-bar-demo-sheet-open">
            Add a visit
        </Button>
        <BottomSheet bind:isOpen={sheetOpen} title="Add a visit" snapPoints={["half"]}>
            <!-- The sheet's content is the scrolling box: the bar sticks to
            the bottom of it, inside its padding. The negative side margins
            undo that padding, so the bar reaches the edges of the sheet. -->
            <form
                class="flex min-h-full flex-col"
                onsubmit={(event) => {
                    save(event);
                    sheetOpen = false;
                }}
            >
                <div class="space-y-4 pb-4">
                    {@render fields("sticky-sheet-demo")}
                </div>
                <StickyActionBar class="-mx-4" data-testid="sticky-action-bar-demo-in-sheet">
                    <Button type="submit" size="lg" fullWidth>Save visit</Button>
                </StickyActionBar>
            </form>
        </BottomSheet>
        <p class="text-sm text-description">{outcome}</p>
    </div>
{:else if fullScreen}
    <!-- Over the whole page, so the shell is as tall as the screen and the
    keyboard of a phone comes up over it. -->
    <div class="fixed inset-0 z-modal" data-testid="sticky-action-bar-demo-full-screen">
        {@render formScreen("")}
    </div>
{:else}
    <div class="w-full space-y-3">
        <div class="flex flex-wrap gap-3">
            <Button
                variant="secondary"
                onclick={() => {
                    withTabs = false;
                    fullScreen = true;
                }}
            >
                Open full screen
            </Button>
            <!-- Not the recommended form screen: it shows the bar above a tab bar. -->
            <Button
                variant="ghost"
                onclick={() => {
                    withTabs = true;
                    fullScreen = true;
                }}
            >
                Open with a tab bar
            </Button>
        </div>
        <div
            class="mx-auto h-[32rem] overflow-hidden rounded-container border border-border sm:w-96"
        >
            {@render formScreen("h-full")}
        </div>
    </div>
{/if}
