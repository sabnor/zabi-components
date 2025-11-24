<script lang="ts">
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
                class="px-4 py-2 text-sm font-medium border-b-2 transition-colors {activeTab ===
                tab.id
                    ? variant === 'pills'
                        ? 'bg-brand-100 text-brand-700 border-brand-500'
                        : 'border-brand-500 text-body'
                    : 'border-transparent text-description hover:text-body hover:border-base-300'}"
                onclick={() => selectTab(tab.id)}
                disabled={tab.disabled}
                aria-selected={activeTab === tab.id}
            >
                {tab.label}
            </button>
        {/each}
    </div>

    <div class="mt-4">
        {@render children?.({ activeTab })}
    </div>
</div>
