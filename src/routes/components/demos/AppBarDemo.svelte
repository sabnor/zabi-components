<script lang="ts">
    import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
    import Share2 from "@lucide/svelte/icons/share-2";
    import IconButton from "../../../components/atoms/IconButton.svelte";
    import AppBar from "../../../components/molecules/AppBar.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let lastAction = $state("none yet");

    /** Long enough to scroll inside the frame. */
    const questions = Array.from({ length: 20 }, (_, index) => `Question ${index + 1}`);
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <div class="mx-auto overflow-hidden rounded-container border border-border sm:w-96">
            <AppBar
                title="Round 3"
                headingLevel={2}
                onback={() => (lastAction = "Back")}
                data-testid="app-bar-demo"
            >
                {#snippet actions()}
                    <IconButton
                        variant="ghost"
                        size="lg"
                        label="Share"
                        onclick={() => (lastAction = "Share")}
                    >
                        <Share2 size={20} />
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        size="lg"
                        label="More"
                        onclick={() => (lastAction = "More")}
                    >
                        <EllipsisVertical size={20} />
                    </IconButton>
                {/snippet}
            </AppBar>
            <p class="p-4 text-sm text-description">Ten questions, one point each.</p>
        </div>
        <p class="text-sm text-description" data-testid="app-bar-demo-action">
            Last action: {lastAction}
        </p>
    </div>
{:else}
    <!-- A scroll container of its own, so the bar has something to follow
    inside this example. In an app that is AppShell, or the page. -->
    <div
        class="mx-auto h-80 overflow-y-auto rounded-container border border-border sm:w-96"
        data-testid="app-bar-demo-scroller"
    >
        <AppBar
            title="Questions"
            headingLevel={2}
            backHref="/components"
            collapseOnScroll
            data-testid="app-bar-demo-collapsing"
        />
        <ul class="m-0 list-none space-y-3 p-4">
            {#each questions as question (question)}
                <li class="rounded-container border border-border bg-card p-4 text-body">
                    {question}
                </li>
            {/each}
        </ul>
    </div>
{/if}
