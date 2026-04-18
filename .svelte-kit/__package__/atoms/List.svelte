<script lang="ts">
    import ListItemRow, { type ListItemData } from "./ListItem.svelte";

    export type ListItem = ListItemData;

    interface Props {
        items: ListItemData[];
        /** `aria-label` on the list region. */
        ariaLabel?: string;
        selectedId?: string;
        showArrow?: boolean;
        className?: string;
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
