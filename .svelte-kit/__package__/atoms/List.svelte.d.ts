import { type ListItemData } from "./ListItem.svelte";
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
declare const List: import("svelte").Component<Props, {}, "">;
type List = ReturnType<typeof List>;
export default List;
