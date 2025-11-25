import type { Snippet } from "svelte";
interface SidebarItem {
    id: string;
    label: string;
    description?: string;
    icon?: any;
    onClick?: () => void;
}
interface SidebarSection {
    title?: string;
    items: SidebarItem[];
}
interface Props {
    title?: string;
    sections?: SidebarSection[];
    items?: SidebarItem[];
    selectedItemId?: string;
    selectedSectionId?: string;
    onItemClick?: (item: SidebarItem) => void;
    onSectionClick?: (sectionId: string) => void;
    className?: string;
    header?: Snippet;
    footer?: Snippet;
    isOpen?: boolean;
    onClose?: () => void;
    mobileResponsive?: boolean;
}
declare const Sidebar: import("svelte").Component<Props, {}, "">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
