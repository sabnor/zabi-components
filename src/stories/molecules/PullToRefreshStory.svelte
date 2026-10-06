<script lang="ts">
    import PullToRefresh from '../../components/molecules/PullToRefresh.svelte';

    interface Props {
        disabled?: boolean;
        /** The Refresh button, shown when keyboard focus reaches it. */
        showButton?: boolean;
        /** How far the indicator has to come out, in px. */
        threshold?: number;
    }

    let { disabled = false, showButton = true, threshold = 64 }: Props = $props();

    let loads = $state(0);
    const rounds = $derived(Array.from({ length: 12 }, (_, index) => `Round ${index + 1 + loads * 12}`));

    function reload() {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                loads += 1;
                resolve();
            }, 800);
        });
    }
</script>

<div class="h-72 w-full max-w-lg overflow-y-auto rounded-container border border-border">
    <PullToRefresh onrefresh={reload} {disabled} {showButton} {threshold}>
        <ul class="divide-y divide-border">
            {#each rounds as round (round)}
                <li class="px-4 py-3 text-sm text-body">{round}</li>
            {/each}
        </ul>
    </PullToRefresh>
</div>
