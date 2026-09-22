<script lang="ts">
    import type { Snippet } from "svelte";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        tabs?: Array<{
            id: string;
            label: string;
            disabled?: boolean;
        }>;
        /** Selected tab id; supports `bind:activeTab`. */
        activeTab?: string;
        variant?: "default" | "pills";
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
        children?: Snippet<[{ activeTab: string }]>;
    }

    let {
        class: className = "",
        tabs = [],
        activeTab = $bindable(""),
        variant = "default",
        children,
        ...restProps
    }: Props = $props();

    const tabsBaseId = generateId("tabs");

    /** Button refs keyed by tab id — roving tabindex needs focus to follow selection. */
    const tabElements: Record<string, HTMLButtonElement | undefined> = {};

    function selectTab(tabId: string, moveFocus = false) {
        activeTab = tabId;
        if (moveFocus) {
            tabElements[tabId]?.focus();
        }
    }

    function getEnabledTabs() {
        return tabs.filter((tab) => !tab.disabled);
    }

    function getTabId(tabId: string) {
        return `${tabsBaseId}-tab-${tabId}`;
    }

    function getPanelId(tabId: string) {
        return `${tabsBaseId}-panel-${tabId}`;
    }

    $effect(() => {
        if (tabs.length === 0) {
            return;
        }

        const activeExists = tabs.some((tab) => tab.id === activeTab && !tab.disabled);
        if (!activeExists) {
            const firstEnabledTab = tabs.find((tab) => !tab.disabled);
            if (firstEnabledTab) {
                activeTab = firstEnabledTab.id;
            }
        }
    });

    function handleKeydown(event: KeyboardEvent) {
        const enabledTabs = getEnabledTabs();
        if (enabledTabs.length === 0) {
            return;
        }

        const currentIndex = enabledTabs.findIndex((tab) => tab.id === activeTab);
        const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;

        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            const direction = event.key === "ArrowLeft" ? -1 : 1;
            const nextIndex =
                (fallbackIndex + direction + enabledTabs.length) %
                enabledTabs.length;
            selectTab(enabledTabs[nextIndex].id, true);
        } else if (event.key === "Home") {
            event.preventDefault();
            selectTab(enabledTabs[0].id, true);
        } else if (event.key === "End") {
            event.preventDefault();
            selectTab(enabledTabs[enabledTabs.length - 1].id, true);
        }
        // Enter/Space: native <button> click already selects the tab.
    }
</script>

<div class={cn("tabs-container", className)}>
    <div
        class="flex border-b border-base-200"
        role="tablist"
        tabindex="-1"
        onkeydown={handleKeydown}
    >
        {#each tabs as tab (tab.id)}
            <button
                bind:this={tabElements[tab.id]}
                type="button"
                role="tab"
                id={getTabId(tab.id)}
                class="focus-ring cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:outline-none active:bg-surface-active disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent disabled:hover:text-description {activeTab ===
                tab.id
                    ? variant === 'pills'
                        ? 'border-brand-500 bg-brand-100 text-brand-700'
                        : 'border-brand-500 text-body'
                    : 'border-transparent text-description hover:border-border-medium hover:text-body'}"
                onclick={() => selectTab(tab.id)}
                disabled={tab.disabled}
                aria-selected={activeTab === tab.id}
                aria-controls={getPanelId(tab.id)}
                tabindex={activeTab === tab.id ? 0 : -1}
            >
                {tab.label}
            </button>
        {/each}
    </div>

    <div
        class="mt-4"
        role="tabpanel"
        id={getPanelId(activeTab)}
        aria-labelledby={getTabId(activeTab)}
    >
        {@render children?.({ activeTab })}
    </div>
</div>
