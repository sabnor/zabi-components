import { type ListItemData } from "./ListItem.svelte";
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
declare const List: import("svelte").Component<Props, {}, "">;
type List = ReturnType<typeof List>;
export default List;
