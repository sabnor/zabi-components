<script lang="ts">
    import SidebarPanel, {
        type SidebarPanelItem,
    } from "./SidebarPanel.svelte";
    import { generateId } from "../util/ssr-safe.js";
    import {
        DEFAULT_SIDEBAR_ACCOUNT_PANEL_STRINGS,
        type SidebarAccountPanelStrings,
    } from "../util/sidebar.js";
    import {
        getThemeMode,
        isThemeDark,
        setThemeMode,
        THEME_MODES,
        type ThemeMode,
    } from "../util/theme-mode.js";
    import LogOut from "@lucide/svelte/icons/log-out";
    import Monitor from "@lucide/svelte/icons/monitor";
    import Moon from "@lucide/svelte/icons/moon";
    import Sun from "@lucide/svelte/icons/sun";
    import User from "@lucide/svelte/icons/user";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
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
        /**
         * `"two"` (the default): the theme row flips `isLightMode` and calls
         * `onThemeToggle`; the app switches the page. `"three"`: the row
         * steps through system, light and dark, switches the page itself
         * (`data-theme` on `<html>`, as ThemeToggle does) and calls
         * `onThemeModeChange`.
         */
        themeModes?: "two" | "three";
        /** With `themeModes="three"`: called with the mode the row has switched to. */
        onThemeModeChange?: (mode: ThemeMode) => void;
        /**
         * With `themeModes="three"`: the `localStorage` key the choice is kept
         * under. Default `"theme"`, as ThemeToggle; `null` keeps nothing.
         */
        themeStorageKey?: string | null;
        /** Every word the panel says by itself, for another language. `logoutLabel` is its own prop. */
        strings?: Partial<SidebarAccountPanelStrings>;
        onLogout?: () => void;
        onAccount?: () => void;
        onClose?: () => void;
        widthClass?: string;
        variant?: "plain" | "elevated";
    }

    let {
        class: className = "",
        panelId = generateId("account-panel"),
        style = "",
        profileName = "Account",
        profileEmail = "",
        logoutLabel = "Log out",
        showThemeToggle = true,
        showLogout = true,
        isLightMode = $bindable(false),
        onThemeToggle,
        themeModes = "two",
        onThemeModeChange,
        themeStorageKey,
        strings,
        onLogout,
        onAccount,
        onClose,
        widthClass = "w-[320px]",
        variant = "plain",
        ...restProps
    }: Props = $props();

    let selectedItemId = $state("");

    const text = $derived({ ...DEFAULT_SIDEBAR_ACCOUNT_PANEL_STRINGS, ...strings });

    /**
     * With three modes: the page's mode, read when the panel mounts, after
     * each step, and when something else switches the page (a ThemeToggle in
     * the bar, the app's own script) while the panel is there.
     */
    let themeMode = $state<ThemeMode>("light");
    $effect(() => {
        if (themeModes !== "three") return;
        themeMode = getThemeMode();
        if (typeof MutationObserver === "undefined") return;
        const observer = new MutationObserver(() => {
            themeMode = getThemeMode();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
        return () => observer.disconnect();
    });

    const items = $derived.by((): SidebarPanelItem[] => {
        const list: SidebarPanelItem[] = [
            {
                id: "account",
                label: text.account,
                description: profileName,
                icon: User,
            },
        ];

        if (showThemeToggle && themeModes === "three") {
            list.push({
                id: "theme",
                label: text.theme,
                description:
                    themeMode === "auto"
                        ? text.systemMode
                        : themeMode === "light"
                          ? text.lightMode
                          : text.darkMode,
                badgeText:
                    themeMode === "auto" ? text.system : themeMode === "light" ? text.light : text.dark,
                icon: themeMode === "auto" ? Monitor : themeMode === "light" ? Sun : Moon,
            });
        } else if (showThemeToggle) {
            list.push({
                id: "theme",
                label: text.theme,
                description: isLightMode ? text.lightMode : text.darkMode,
                badgeText: isLightMode ? text.light : text.dark,
                icon: isLightMode ? Sun : Moon,
            });
        }

        if (showLogout) {
            list.push({
                id: "logout",
                label: logoutLabel,
                description: text.signOut,
                icon: LogOut,
            });
        }

        return list;
    });

    function toggleTheme(): void {
        if (themeModes === "three") {
            // From where the page is now, which another control may have changed.
            const current = getThemeMode();
            const next = THEME_MODES[(THEME_MODES.indexOf(current) + 1) % THEME_MODES.length];
            setThemeMode(next, themeStorageKey === undefined ? {} : { storageKey: themeStorageKey });
            themeMode = next;
            isLightMode = !isThemeDark();
            onThemeModeChange?.(next);
            return;
        }
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
    class={className}
    role="dialog"
    aria-modal="false"
    aria-label={text.panelLabel}
    {...restProps}
>
    <SidebarPanel
        title={text.title}
        subtitle={profileEmail}
        ariaLabel={text.panelLabel}
        closeLabel={text.closeLabel}
        selectLabel={text.listLabel}
        {widthClass}
        {variant}
        showSearch={false}
        items={items}
        bind:selectedItemId={selectedItemId}
        onSelect={handleSelect}
        onClose={onClose}
    />
</div>

