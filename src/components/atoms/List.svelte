<script lang="ts">
    import ListItemRow, { type ListItemData } from "./ListItem.svelte";
    import { cn } from "../util/cn.js";

    export type ListItem = ListItemData;

    interface Props {
        items: ListItemData[];
        /** `aria-label` on the list region. */
        ariaLabel?: string;
        selectedId?: string;
        showArrow?: boolean;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        onclick?: (item: ListItem, event: MouseEvent) => void;
    }

    let {
        items,
        ariaLabel = "List items",
        selectedId = "",
        showArrow = true,
        class: classAttr = "",
        className: legacyClass = "",
        onclick,
        ...restProps
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));

    const listClasses = $derived(
        cn(`space-y-1 overflow-hidden rounded-container ${className}`),
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
