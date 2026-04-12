import type { Component } from "svelte";
export interface SidebarPanelItem {
    id: string;
    label: string;
    icon?: Component<{
        size?: number;
        class?: string;
    }>;
    description?: string;
    badgeText?: string;
}
interface Props {
    className?: string;
    widthClass?: string;
    ariaLabel?: string;
    title?: string;
    subtitle?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
    searchValue?: string;
    items?: SidebarPanelItem[];
    selectedItemId?: string;
    emptyStateTitle?: string;
    emptyStateDescription?: string;
    selectLabel?: string;
    closeLabel?: string;
    onSelect?: (item: SidebarPanelItem) => void;
    onClose?: () => void;
}
declare const SidebarPanel: Component<Props, {}, "searchValue" | "selectedItemId">;
type SidebarPanel = ReturnType<typeof SidebarPanel>;
export default SidebarPanel;
