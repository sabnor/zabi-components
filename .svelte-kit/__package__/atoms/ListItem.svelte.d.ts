import type { Component, Snippet } from "svelte";
export interface ListItemData {
    id: string;
    label: string;
    description?: string;
    href?: string;
    icon?: Component<{
        size?: number;
        class?: string;
    }>;
    /** Leading image; wins over `icon` when both are set. */
    avatar?: string;
    /** `avatar` alt text; `""` if decorative. */
    avatarAlt?: string;
    target?: "_self" | "_blank" | "_parent" | "_top";
    rel?: string;
    disabled?: boolean;
}
interface Props {
    item: ListItemData;
    selected?: boolean;
    showArrow?: boolean;
    /** Shown before the chevron when `showArrow` is true. */
    trailing?: Snippet;
    onclick?: (item: ListItemData, event: MouseEvent) => void;
}
declare const ListItem: Component<Props, {}, "">;
type ListItem = ReturnType<typeof ListItem>;
export default ListItem;
