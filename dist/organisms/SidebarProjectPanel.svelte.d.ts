import type { Component } from "svelte";
export interface SidebarProjectPanelItem {
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
    items?: SidebarProjectPanelItem[];
    selectedItemId?: string;
    emptyStateTitle?: string;
    emptyStateDescription?: string;
    selectLabel?: string;
    closeLabel?: string;
    onSelect?: (item: SidebarProjectPanelItem) => void;
    onClose?: () => void;
}
declare const SidebarProjectPanel: Component<Props, {}, "searchValue" | "selectedItemId">;
type SidebarProjectPanel = ReturnType<typeof SidebarProjectPanel>;
export default SidebarProjectPanel;
