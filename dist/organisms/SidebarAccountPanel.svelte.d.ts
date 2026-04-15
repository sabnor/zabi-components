interface Props {
    /** Used to connect `SidebarFooter`/`SidebarNavigation` `aria-controls` to this panel wrapper. */
    panelId?: string;
    /** Optional inline style for anchoring/positioning. */
    style?: string;
    profileName?: string;
    profileEmail?: string;
    logoutLabel?: string;
    showThemeToggle?: boolean;
    showLogout?: boolean;
    isLightMode?: boolean;
    onThemeToggle?: (nextIsLightMode: boolean) => void;
    onLogout?: () => void;
    /** Optional hook for navigating to an account/settings page. */
    onAccount?: () => void;
    /** Called when the panel should close (close button, or after selection). */
    onClose?: () => void;
    /** Optional width override (defaults to 320px). */
    widthClass?: string;
    /** Match `SidebarNavigation` card surfaces when desired. */
    variant?: "plain" | "elevated";
}
declare const SidebarAccountPanel: import("svelte").Component<Props, {}, "isLightMode">;
type SidebarAccountPanel = ReturnType<typeof SidebarAccountPanel>;
export default SidebarAccountPanel;
