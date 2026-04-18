<script lang="ts">
    import SidebarPanel, {
        type SidebarPanelItem,
    } from "./SidebarPanel.svelte";
    import { generateId } from "../util/ssr-safe.js";
    import { LogOut, Moon, Sun, User } from "@lucide/svelte";

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

    let {
        panelId = generateId("account-panel"),
        style = "",
        profileName = "Account",
        profileEmail = "",
        logoutLabel = "Log out",
        showThemeToggle = true,
        showLogout = true,
        isLightMode = $bindable(false),
        onThemeToggle,
        onLogout,
        onAccount,
        onClose,
        widthClass = "w-[320px]",
        variant = "plain",
        ...restProps
    }: Props = $props();

    let selectedItemId = $state("");

    const items = $derived.by((): SidebarPanelItem[] => {
        const list: SidebarPanelItem[] = [
            {
                id: "account",
                label: "Account",
                description: profileName,
                icon: User,
            },
        ];

        if (showThemeToggle) {
            list.push({
                id: "theme",
                label: "Theme",
                description: isLightMode ? "Light mode" : "Dark mode",
                badgeText: isLightMode ? "Light" : "Dark",
                icon: isLightMode ? Sun : Moon,
            });
        }

        if (showLogout) {
            list.push({
                id: "logout",
                label: logoutLabel,
                description: "Sign out of this account",
                icon: LogOut,
            });
        }

        return list;
    });

    function toggleTheme(): void {
        isLightMode = !isLightMode;
        onThemeToggle?.(isLightMode);
    }

    function handleSelect(item: SidebarPanelItem): void {
        if (item.id === "theme") {
            toggleTheme();
        } else if (item.id === "logout") {
            onLogout?.();
        } else if (item.id === "account") {
            onAccount?.();
        }

        onClose?.();
    }
</script>

<div
    id={panelId}
    {style}
    role="dialog"
    aria-modal="false"
    aria-label="Account panel"
    {...restProps}
>
    <SidebarPanel
        title="Account"
        subtitle={profileEmail}
        ariaLabel="Account panel"
        closeLabel="Close account panel"
        {widthClass}
        {variant}
        showSearch={false}
        items={items}
        bind:selectedItemId={selectedItemId}
        onSelect={handleSelect}
        onClose={onClose}
    />
</div>

