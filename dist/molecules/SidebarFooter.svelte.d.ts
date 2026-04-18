import type { Snippet } from "svelte";
interface Props {
    collapsed?: boolean;
    showProfile?: boolean;
    profileName?: string;
    profileEmail?: string;
    profileInitials?: string;
    showLogout?: boolean;
    logoutLabel?: string;
    showThemeToggle?: boolean;
    lightModeLabel?: string;
    isLightMode?: boolean;
    onLogout?: () => void;
    onThemeToggle?: (nextIsLightMode: boolean) => void;
    className?: string;
    profilePanelOpen?: boolean;
    profilePanelControlsId?: string;
    onProfileClick?: (event?: MouseEvent) => void;
    profilePanel?: Snippet;
}
declare const SidebarFooter: import("svelte").Component<Props, {}, "isLightMode">;
type SidebarFooter = ReturnType<typeof SidebarFooter>;
export default SidebarFooter;
