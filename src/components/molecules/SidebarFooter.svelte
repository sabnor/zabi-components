<script lang="ts">
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
    <footer
        class={`flex w-full shrink-0 flex-col gap-2.5 border-t border-border pt-3 pb-1 ${className}`.trim()}
        aria-label="Account and settings"
    >
        {#if showPanelLauncher}
            <div class="relative">
                <button
                    type="button"
                    class="w-full cursor-pointer rounded-xl px-2 py-2 outline-none transition-colors hover:bg-nav-menu-hover hover:text-nav-menu-item-hover hover:ring-1 hover:ring-border/60 active:bg-base-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus"
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

                {#if profilePanelOpen && profilePanel}
                    <div
                        class="absolute bottom-0 left-full ml-3 z-50"
                        role="presentation"
                    >
                        {@render profilePanel()}
                    </div>
                {/if}
            </div>
        {/if}
    </footer>
{/if}
