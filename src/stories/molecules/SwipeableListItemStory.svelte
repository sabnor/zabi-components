<script lang="ts">
    import Trash2 from '@lucide/svelte/icons/trash-2';
    import Archive from '@lucide/svelte/icons/archive';
    import SwipeableListItem from '../../components/molecules/SwipeableListItem.svelte';

    interface Props {
        /** The button at the end of each row that opens its actions without a swipe. */
        showMoreButton?: boolean;
    }

    let { showMoreButton = true }: Props = $props();

    let drafts = $state([
        { id: 'a', title: 'Quiz night, round 3' },
        { id: 'b', title: 'Summer league rules' },
        { id: 'c', title: 'Prize list' },
    ]);
    const remove = (id: string) => (drafts = drafts.filter((draft) => draft.id !== id));
</script>

<ul class="w-full max-w-lg divide-y divide-border rounded-container border border-border">
    {#each drafts as draft (draft.id)}
        <li>
            <SwipeableListItem
                {showMoreButton}
                actions={[
                    { id: 'archive', label: 'Archive', icon: Archive, onselect: () => remove(draft.id) },
                    { id: 'delete', label: 'Delete', icon: Trash2, tone: 'danger', onselect: () => remove(draft.id) },
                ]}
            >
                <div class="px-4 py-3 text-sm text-headline">{draft.title}</div>
            </SwipeableListItem>
        </li>
    {/each}
</ul>
