<script lang="ts">
    import { LogOut, Moon, Sun, User } from "@lucide/svelte";
    import SidebarPanel, {
        type SidebarPanelItem,
    } from "../organisms/SidebarPanel.svelte";

    function createId(prefix: string): string {
        if (typeof window !== "undefined") {
            return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
        }
        return `${prefix}-ssr-${Date.now()}`;
    }

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
    }

    let {
        collapsed = false,
        showProfile = true,
        profileName = "Zabi",
        profileEmail = "hello@zabi.dev",
        profileInitials = "ZA",
        showLogout = true,
        logoutLabel = "Logout",
        showThemeToggle = true,
        lightModeLabel = "Light mode",
        isLightMode = $bindable(false),
        onLogout,
        onThemeToggle,
        className = "",
    }: Props = $props();

    const showFooter = $derived(showProfile || showLogout || showThemeToggle);
    const showPanelLauncher = $derived(showProfile);

    let isAccountPanelOpen = $state(false);
    let selectedPanelItemId = $state("");
    const accountPanelBaseId = createId("account-panel");
    const accountPanelDialogId = `${accountPanelBaseId}-dialog`;
    const accountPanelTitleId = `${accountPanelBaseId}-title`;
    const accountPanelDescriptionId = `${accountPanelBaseId}-description`;

    const avatarClasses =
        "size-10 rounded-xl bg-action-primary text-action-primary flex items-center justify-center text-sm font-semibold shrink-0 ring-1 ring-border-focus";

    const iconContainerClasses =
        "flex size-6 shrink-0 items-center justify-center leading-none text-current";

    function getTextToneClass(isMuted = false): string {
        return isMuted ? "text-description" : "text-headline";
    }

    function getControlButtonClasses(): string {
        const baseClasses =
            "w-full cursor-pointer rounded-lg text-nav-menu-item transition-colors duration-150 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-base-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";
        const layoutClasses = collapsed
            ? "flex min-h-10 items-center justify-center px-0 py-2"
            : "flex min-h-10 items-center gap-2.5 px-2.5 py-2";

        return `${baseClasses} ${layoutClasses}`;
    }

    const themeToggleContainerClasses = $derived(
        collapsed
            ? "flex w-full justify-center py-0.5"
            : "flex w-full justify-start py-0.5",
    );

    function handleLogout(): void {
        onLogout?.();
    }

    function handleThemeToggle(): void {
        isLightMode = !isLightMode;
        onThemeToggle?.(isLightMode);
    }

    function openAccountPanel(): void {
        isAccountPanelOpen = true;
    }

    function closeAccountPanel(): void {
        isAccountPanelOpen = false;
    }

    function handleWindowKeydown(event: KeyboardEvent): void {
        if (!isAccountPanelOpen) return;
        if (event.key === "Escape") {
            event.preventDefault();
            closeAccountPanel();
        }
    }

    const panelItems = $derived.by((): SidebarPanelItem[] => {
        const items: SidebarPanelItem[] = [
            {
                id: "account",
                label: "Account",
                description: profileName,
                icon: User,
            },
        ];

        if (showThemeToggle) {
            items.push({
                id: "theme",
                label: "Theme",
                description: isLightMode ? "Light mode" : "Dark mode",
                badgeText: isLightMode ? "Light" : "Dark",
                icon: isLightMode ? Sun : Moon,
            });
        }

        if (showLogout) {
            items.push({
                id: "logout",
                label: logoutLabel,
                description: "Sign out of this account",
                icon: LogOut,
            });
        }

        return items;
    });

    function handlePanelSelect(item: SidebarPanelItem): void {
        if (item.id === "theme") {
            handleThemeToggle();
        }

        if (item.id === "logout") {
            handleLogout();
        }

        closeAccountPanel();
    }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

{#if showFooter}
    <div class={`relative w-full ${className}`.trim()}>
        <footer
            class="flex w-full shrink-0 flex-col gap-2.5 border-t border-border pt-3 pb-1"
            aria-label="Account and settings"
        >
            {#if showPanelLauncher}
                <button
                    type="button"
                    class="w-full rounded-xl outline-none transition-colors hover:bg-nav-menu-hover active:bg-base-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus"
                    aria-haspopup="dialog"
                    aria-expanded={isAccountPanelOpen}
                    aria-controls={accountPanelDialogId}
                    aria-label={collapsed
                        ? `Open account panel`
                        : `Open account panel for ${profileName}`}
                    onclick={openAccountPanel}
                >
                    <span class="flex w-full items-center gap-3 text-left">
                        <span class={avatarClasses} aria-hidden="true">
                            {profileInitials}
                        </span>
                        {#if !collapsed}
                            <span class="min-w-0">
                                <span
                                    class="block truncate text-sm font-semibold {getTextToneClass()}"
                                >
                                    {profileName}
                                </span>
                                <span
                                    class="block truncate text-xs {getTextToneClass(true)}"
                                >
                                    {profileEmail}
                                </span>
                            </span>
                        {/if}
                    </span>
                </button>
            {/if}
        </footer>

        {#if isAccountPanelOpen}
            <div
                id={accountPanelDialogId}
                class="absolute bottom-0 left-full z-50 ml-4"
                role="dialog"
                aria-modal="false"
                aria-labelledby={accountPanelTitleId}
                aria-describedby={accountPanelDescriptionId}
            >
                <h2 id={accountPanelTitleId} class="sr-only">Account</h2>
                <p id={accountPanelDescriptionId} class="sr-only">
                    Account actions and preferences.
                </p>
                <SidebarPanel
                    title="Account"
                    subtitle={profileEmail}
                    ariaLabel="Account panel"
                    closeLabel="Close account panel"
                    widthClass="w-[320px]"
                    variant="plain"
                    showSearch={false}
                    items={panelItems}
                    bind:selectedItemId={selectedPanelItemId}
                    onSelect={handlePanelSelect}
                    onClose={closeAccountPanel}
                />
            </div>
        {/if}
    </div>
{/if}
