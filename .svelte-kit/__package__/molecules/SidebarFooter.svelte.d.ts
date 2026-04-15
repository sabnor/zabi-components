import type { Snippet } from "svelte";
interface Props {
    /** When true, profile text and control labels are hidden; controls stay icon-first. */
    collapsed?: boolean;
    showProfile?: boolean;
    profileName?: string;
    profileEmail?: string;
    profileInitials?: string;
    showLogout?: boolean;
    logoutLabel?: string;
    showThemeToggle?: boolean;
    /** Shown as the theme switch `title` when expanded context is needed. */
    lightModeLabel?: string;
    isLightMode?: boolean;
    onLogout?: () => void;
    onThemeToggle?: (nextIsLightMode: boolean) => void;
    className?: string;
    /** Controls whether the external account panel is open. */
    profilePanelOpen?: boolean;
    /** Optional id of the external panel element for aria-controls. */
    profilePanelControlsId?: string;
    /** Called when the profile button is clicked (toggle panel in parent). */
    onProfileClick?: (event?: MouseEvent) => void;
    /** Optional panel snippet rendered next to the profile button (CSS overlay). */
    profilePanel?: Snippet;
}
declare const SidebarFooter: import("svelte").Component<Props, {}, "isLightMode">;
type SidebarFooter = ReturnType<typeof SidebarFooter>;
export default SidebarFooter;
