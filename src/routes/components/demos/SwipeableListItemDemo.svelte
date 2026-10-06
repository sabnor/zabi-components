<script lang="ts">
    import Archive from "@lucide/svelte/icons/archive";
    import Trash2 from "@lucide/svelte/icons/trash-2";
    import SwipeableListItem from "../../../components/molecules/SwipeableListItem.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let drafts = $state([
        { id: "a", title: "Quiz night, round 3", note: "Edited yesterday" },
        { id: "b", title: "Summer league rules", note: "Edited on Monday" },
        { id: "c", title: "Prize list", note: "Edited last week" },
    ]);
    let archived = $state(0);

    const remove = (id: string) => (drafts = drafts.filter((draft) => draft.id !== id));
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <ul class="divide-y divide-border rounded-container border border-border">
            {#each drafts as draft (draft.id)}
                <li>
                    <SwipeableListItem
                        actions={[
                            {
                                id: "archive",
                                label: "Archive",
                                icon: Archive,
                                onselect: () => {
                                    archived += 1;
                                    remove(draft.id);
                                },
                            },
                            {
                                id: "delete",
                                label: "Delete",
                                icon: Trash2,
                                tone: "danger",
                                onselect: () => remove(draft.id),
                            },
                        ]}
                    >
                        <div class="px-4 py-3">
                            <p class="text-sm font-medium text-headline">{draft.title}</p>
                            <p class="text-sm text-description">{draft.note}</p>
                        </div>
                    </SwipeableListItem>
                </li>
            {/each}
        </ul>
        <p class="text-sm text-description">
            {drafts.length} drafts, {archived} archived. Swipe a row towards the start of the line on a touch
            screen, or use its button.
        </p>
    </div>
{/if}
