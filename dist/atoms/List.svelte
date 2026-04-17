<script lang="ts">
    import ListItemRow, { type ListItemData } from "./ListItem.svelte";

    export type ListItem = ListItemData;

    interface Props {
        /** Collection of items rendered in the list. */
        items: ListItemData[];
        /** Accessible label for the list container. */
        ariaLabel?: string;
        /** Optional active item id for current state styling. */
        selectedId?: string;
        /** Whether to show the arrow icon for each row. */
        showArrow?: boolean;
        /** Optional custom class names for the list container. */
        className?: string;
        /** Item click callback. */
        onclick?: (item: ListItem, event: MouseEvent) => void;
    }

    let {
        items,
        ariaLabel = "List items",
        selectedId = "",
        showArrow = true,
        className = "",
        onclick,
        ...restProps
    }: Props = $props();

    const listClasses = $derived(
        `space-y-1 overflow-hidden rounded-xl ${className}`.trim(),
    );
</script>

<ul class={listClasses} role="list" aria-label={ariaLabel} {...restProps}>
    {#each items as item (item.id)}
        <li>
            <ListItemRow
                {item}
                selected={item.id === selectedId}
                {showArrow}
                {onclick}
            />
        </li>
    {/each}
</ul>
