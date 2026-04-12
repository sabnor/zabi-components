<script lang="ts">
    function createId(prefix: string): string {
        if (typeof window !== "undefined") {
            return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
        }
        return `${prefix}-ssr-${Date.now()}`;
    }

    interface Props {
        tabs?: Array<{
            id: string;
            label: string;
            disabled?: boolean;
        }>;
        activeTab?: string;
        variant?: "default" | "pills";
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
    }

    let {
        tabs = [],
        activeTab = "",
        variant = "default",
        children,
        ...restProps
    }: Props & { children?: any } = $props();

    const tabsBaseId = createId("tabs");

    function selectTab(tabId: string) {
        activeTab = tabId;
    }

    function getEnabledTabs() {
        return tabs.filter((tab) => !tab.disabled);
    }

    function getTabIndex(tabId: string) {
        return tabs.findIndex((tab) => tab.id === tabId);
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
            selectTab(enabledTabs[nextIndex].id);
        } else if (event.key === "Home") {
            event.preventDefault();
            selectTab(enabledTabs[0].id);
        } else if (event.key === "End") {
            event.preventDefault();
            selectTab(enabledTabs[enabledTabs.length - 1].id);
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (currentIndex === -1) {
                selectTab(enabledTabs[0].id);
            }
        }
    }
</script>

<div class="tabs-container">
    <div
        class="flex border-b border-base-200"
        role="tablist"
        tabindex="0"
        onkeydown={handleKeydown}
    >
        {#each tabs as tab}
            <button
                type="button"
                role="tab"
                id={getTabId(tab.id)}
                class="cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed {activeTab ===
                tab.id
                    ? variant === 'pills'
                        ? 'border-brand-500 bg-brand-100 text-brand-700'
                        : 'border-brand-500 text-body'
                    : 'border-transparent text-description hover:border-base-300 hover:text-body'}"
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
