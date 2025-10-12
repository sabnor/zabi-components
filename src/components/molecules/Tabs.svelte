<script lang="ts">
    export let tabs: Array<{
        id: string;
        label: string;
        disabled?: boolean;
    }> = [];
    export let activeTab: string = "";
    export let variant: "default" | "pills" = "default";

    function selectTab(tabId: string) {
        activeTab = tabId;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
            const direction = event.key === "ArrowLeft" ? -1 : 1;
            const nextIndex =
                (currentIndex + direction + tabs.length) % tabs.length;
            selectTab(tabs[nextIndex].id);
        }
    }
</script>

<div class="tabs-container">
    <!-- Tab List -->
    <div
        class="flex border-b border-gray-200"
        role="tablist"
        tabindex="0"
        on:keydown={handleKeydown}
    >
        {#each tabs as tab}
            <button
                type="button"
                role="tab"
                class="px-4 py-2 text-sm font-medium border-b-2 transition-colors {activeTab ===
                tab.id
                    ? variant === 'pills'
                        ? 'bg-blue-100 text-blue-700 border-blue-500'
                        : 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                on:click={() => selectTab(tab.id)}
                disabled={tab.disabled}
                aria-selected={activeTab === tab.id}
            >
                {tab.label}
            </button>
        {/each}
    </div>

    <!-- Tab Content -->
    <div class="mt-4">
        <slot {activeTab} />
    </div>
</div>
