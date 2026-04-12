import type { Component } from "svelte";
export interface ListItemData {
    /** Unique identifier for stable rendering and active-state tracking. */
    id: string;
    /** Primary item label. */
    label: string;
    /** Optional secondary text shown under the label. */
    description?: string;
    /** Optional URL; when set, the item renders as an anchor. */
    href?: string;
    /** Optional leading icon rendered before text. */
    icon?: Component<{
        size?: number;
        class?: string;
    }>;
    /** Link target, only used when href is provided. */
    target?: "_self" | "_blank" | "_parent" | "_top";
    /** Link rel attribute, only used when href is provided. */
    rel?: string;
    /** Disabled state for the item. */
    disabled?: boolean;
}
interface Props {
    /** Item data to render. */
    item: ListItemData;
    /** Active-state styling flag. */
    selected?: boolean;
    /** Whether to show the right-arrow icon. */
    showArrow?: boolean;
    /** Item click callback. */
    onclick?: (item: ListItemData, event: MouseEvent) => void;
}
declare const ListItem: Component<Props, {}, "">;
type ListItem = ReturnType<typeof ListItem>;
export default ListItem;
