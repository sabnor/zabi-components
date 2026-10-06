<script lang="ts">
    import PullToRefresh from "../../../components/molecules/PullToRefresh.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let loads = $state(0);
    const rounds = $derived(Array.from({ length: 12 }, (_, index) => `Round ${index + 1 + loads * 12}`));

    /** A reload that takes a moment, as a request does. */
    function reload() {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                loads += 1;
                resolve();
            }, 800);
        });
    }
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <!-- A box that scrolls by itself, as the content of an app screen does. -->
        <div class="h-72 overflow-y-auto rounded-container border border-border" data-testid="pull-scroller">
            <PullToRefresh onrefresh={reload}>
                <ul class="divide-y divide-border">
                    {#each rounds as round (round)}
                        <li class="px-4 py-3 text-sm text-body">{round}</li>
                    {/each}
                </ul>
            </PullToRefresh>
        </div>
        <p class="text-sm text-description" data-testid="pull-loads">Reloaded {loads} times.</p>
    </div>
{/if}
