<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import type { TabsEvents } from "../../types/events";
    import {
        createTabsState,
        updateTabsState,
        getContainerClasses,
        getTabClasses,
        getPanelClasses,
        createTabsKeyboardNavigation,
        createTabClickHandler,
        getTabAccessibilityProps,
        getPanelAccessibilityProps,
        isTabActive,
    } from "../../lib/tabs-utils";

    export let tabs: Array<{
        id: string;
        label: string;
        disabled?: boolean;
        icon?: string;
        badge?: string | number;
    }> = [];
    export let activeTab: string = "";
    export let variant: "default" | "pills" | "underline" | "cards" = "default";
    export let size: "sm" | "md" | "lg" = "md";
    export let orientation: "horizontal" | "vertical" = "horizontal";
    export let fullWidth: boolean = false;
    export let className: string = "";

    const dispatch = createEventDispatcher<TabsEvents>();

    let tabListElement: HTMLDivElement;
    let tabPanelsElement: HTMLDivElement;

    // Create tabs configuration and state
    const config = { variant, size, orientation, fullWidth };
    $: tabsState = updateTabsState(
        createTabsState(tabs, activeTab),
        tabs,
        activeTab,
    );

    // Event handlers
    const handleTabClick = createTabClickHandler(
        tabs,
        (updates) => {
            activeTab = updates.activeTab || activeTab;
        },
        dispatch,
    );

    const handleKeydown = createTabsKeyboardNavigation(
        tabs,
        tabsState,
        (updates) => {
            activeTab = updates.activeTab || activeTab;
        },
        handleTabClick,
    );

    // Public methods
    export function focusTab(tabId: string) {
        const tabElement = tabListElement?.querySelector(
            `[data-tab-id="${tabId}"]`,
        ) as HTMLElement;
        tabElement?.focus();
    }

    // Computed classes
    $: containerClasses = getContainerClasses(config, tabs);
</script>

<div
    class="tabs-container {orientation === 'vertical'
        ? 'flex'
        : ''} {className}"
>
    <!-- Tab List -->
    <div
        bind:this={tabListElement}
        role="tablist"
        tabindex="0"
        class={containerClasses}
        on:keydown={(e) => handleKeydown(e as unknown as KeyboardEvent)}
        aria-orientation={orientation}
    >
        {#each tabs as tab, index}
            <button
                type="button"
                role="tab"
                data-tab-id={tab.id}
                class={getTabClasses(config, tab, isTabActive(tab, activeTab))}
                {...getTabAccessibilityProps(
                    tab,
                    isTabActive(tab, activeTab),
                    index,
                )}
                on:click={(e) =>
                    handleTabClick(tab, e as unknown as MouseEvent)}
            >
                {#if tab.icon}
                    <svg
                        class="w-4 h-4 text-current"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d={tab.icon}
                            clip-rule="evenodd"
                        />
                    </svg>
                {/if}

                <span>{tab.label}</span>

                {#if tab.badge}
                    <span
                        class="
                        ml-1 px-1.5 py-0.5 text-xs font-medium
                        bg-primary-100 text-primary-800 rounded-full
                        dark:bg-primary-900 dark:text-primary-200
                    "
                    >
                        {tab.badge}
                    </span>
                {/if}
            </button>

            <!-- Underline variant active indicator -->
            {#if variant === "underline" && isTabActive(tab, activeTab)}
                <div
                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                ></div>
            {/if}
        {/each}
    </div>

    <!-- Tab Panels -->
    <div bind:this={tabPanelsElement} class="tab-panels">
        {#each tabs as tab}
            <div
                class={getPanelClasses(config, isTabActive(tab, activeTab))}
                transition:fade={{ duration: 200 }}
                {...getPanelAccessibilityProps(tab)}
            >
                {#if isTabActive(tab, activeTab)}
                    <slot name="content" />
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    /* Focus styles for better accessibility */
    [role="tab"]:focus {
        outline: 2px solid var(--color-primary-500);
        outline-offset: 2px;
    }

    /* Smooth transitions */
    [role="tab"] {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Vertical tabs specific styles */
    .tabs-container.vertical {
        align-items: flex-start;
    }

    .tabs-container.vertical [role="tablist"] {
        min-width: 200px;
    }

    .tabs-container.vertical [role="tab"] {
        justify-content: flex-start;
        text-align: left;
    }
</style>
