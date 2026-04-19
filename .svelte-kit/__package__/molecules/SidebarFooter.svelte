<script lang="ts">
    import type { Snippet } from "svelte";
    import { fixedSidebarFlyout } from "../util/fixed-sidebar-flyout.js";

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
        profilePanelOpen = false,
        profilePanelControlsId = "",
        onProfileClick,
        profilePanel,
    }: Props = $props();

    const showFooter = $derived(showProfile || showLogout || showThemeToggle);
    const showPanelLauncher = $derived(showProfile);

    const avatarClasses =
        "size-10 rounded-xl bg-action-primary text-action-primary flex items-center justify-center text-sm font-semibold shrink-0 ring-1 ring-border-focus";

    function getTextToneClass(isMuted = false): string {
        return isMuted ? "text-description" : "text-headline";
    }

    function handleProfileClick(event: MouseEvent): void {
        onProfileClick?.(event);
    }
</script>

{#if showFooter}
    <div class="w-full shrink-0" data-sidebar-flyout-root>
        <footer
            class={`flex w-full shrink-0 flex-col gap-2.5 border-t border-border pt-3 pb-1 ${className}`.trim()}
            aria-label="Account and settings"
        >
            {#if showPanelLauncher}
                <button
                    type="button"
                    data-sidebar-flyout-anchor="profile"
                    class="w-full cursor-pointer rounded-xl px-2 py-2 outline-none transition-colors hover:bg-nav-menu-hover hover:text-nav-menu-item-hover hover:ring-1 hover:ring-border/60 active:bg-base-200 focus-ring focus-ring--nav"
                    aria-haspopup="dialog"
                    aria-expanded={profilePanelOpen}
                    aria-controls={profilePanelControlsId.trim()
                        ? profilePanelControlsId.trim()
                        : undefined}
                    aria-label={collapsed
                        ? `Open account panel`
                        : `Open account panel for ${profileName}`}
                    onclick={handleProfileClick}
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

        {#if showPanelLauncher && profilePanelOpen && profilePanel}
            <div
                class="max-h-[min(32rem,calc(100dvh-6rem))] overflow-y-auto overscroll-contain outline-none"
                role="presentation"
                use:fixedSidebarFlyout={{
                    open: profilePanelOpen,
                    align: "bottom",
                    gap: 12,
                    anchorRole: "profile",
                }}
            >
                {@render profilePanel()}
            </div>
        {/if}
    </div>
{/if}
