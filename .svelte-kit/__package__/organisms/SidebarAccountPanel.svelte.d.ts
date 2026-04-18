interface Props {
    /** Target id for `aria-controls` from the sidebar footer/nav. */
    panelId?: string;
    style?: string;
    profileName?: string;
    profileEmail?: string;
    logoutLabel?: string;
    showThemeToggle?: boolean;
    showLogout?: boolean;
    isLightMode?: boolean;
    onThemeToggle?: (nextIsLightMode: boolean) => void;
    onLogout?: () => void;
    onAccount?: () => void;
    onClose?: () => void;
    widthClass?: string;
    variant?: "plain" | "elevated";
}
declare const SidebarAccountPanel: import("svelte").Component<Props, {}, "isLightMode">;
type SidebarAccountPanel = ReturnType<typeof SidebarAccountPanel>;
export default SidebarAccountPanel;
