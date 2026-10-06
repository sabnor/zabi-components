<script lang="ts">
    import PullToRefresh from "../../src/components/molecules/PullToRefresh.svelte";
    import SwipeableListItem from "../../src/components/molecules/SwipeableListItem.svelte";

    interface Props {
        kind: "swipe" | "pull";
        onselect?: (id: string) => void;
        onrefresh?: () => Promise<void> | void;
    }

    let { kind, onselect, onrefresh }: Props = $props();
    const rows = ["One", "Two"];
</script>

{#if kind === "swipe"}
    <ul>
        {#each rows as row (row)}
            <li>
                <SwipeableListItem
                    data-testid={`row-${row}`}
                    actions={[
                        { id: "archive", label: `Archive ${row}`, onselect: () => onselect?.(`archive ${row}`) },
                        { id: "delete", label: `Delete ${row}`, tone: "danger", onselect: () => onselect?.(`delete ${row}`) },
                    ]}
                >
                    {row}
                </SwipeableListItem>
            </li>
        {/each}
    </ul>
    <button type="button" data-testid="elsewhere">Elsewhere</button>
{:else}
    <PullToRefresh {onrefresh} data-testid="region">
        <p>List</p>
    </PullToRefresh>
{/if}
