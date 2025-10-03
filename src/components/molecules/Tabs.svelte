<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { fly, fade } from "svelte/transition";

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

    const dispatch = createEventDispatcher<{
        change: { activeTab: string; tab: (typeof tabs)[0] };
        tabClick: { tab: (typeof tabs)[0]; event: MouseEvent };
    }>();

    let tabListElement: HTMLDivElement;
    let tabPanelsElement: HTMLDivElement;
    let activeTabIndex = 0;

    // Set initial active tab
    $: if (tabs.length > 0 && !activeTab) {
        activeTab = tabs[0].id;
    }

    // Update active tab index when activeTab changes
    $: activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

    // Size classes
    const sizeClasses = {
        sm: {
            tab: "px-3 py-1.5 text-sm",
            panel: "p-3",
            icon: "w-4 h-4",
        },
        md: {
            tab: "px-4 py-2 text-base",
            panel: "p-4",
            icon: "w-5 h-5",
        },
        lg: {
            tab: "px-6 py-3 text-lg",
            panel: "p-6",
            icon: "w-6 h-6",
        },
    };

    // Variant classes
    const variantClasses = {
        default: {
            container: "border-b border-primary",
            tab: "border-b-2 border-transparent text-secondary hover:text-primary hover:border-primary-hover transition-colors",
            activeTab: "border-primary text-primary",
            panel: "mt-4",
        },
        pills: {
            container: "bg-surface-secondary p-1 rounded-lg",
            tab: "rounded-md text-secondary hover:text-primary hover:bg-surface-tertiary transition-colors",
            activeTab: "bg-surface text-primary shadow-adaptive-sm",
            panel: "mt-4",
        },
        underline: {
            container: "border-b border-primary",
            tab: "relative text-secondary hover:text-primary transition-colors",
            activeTab: "text-primary",
            panel: "mt-4",
        },
        cards: {
            container: "space-y-2",
            tab: "border border-primary rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-colors",
            activeTab:
                "bg-surface text-primary shadow-adaptive-sm border-primary",
            panel: "mt-4",
        },
    };

    function handleTabClick(tab: (typeof tabs)[0], event: MouseEvent) {
        if (tab.disabled) {
            event.preventDefault();
            return;
        }

        activeTab = tab.id;
        dispatch("change", { activeTab, tab });
        dispatch("tabClick", { tab, event });
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!tabListElement) return;

        const tabs = Array.from(
            tabListElement.querySelectorAll('[role="tab"]'),
        ) as HTMLElement[];
        const currentIndex = tabs.findIndex(
            (tab) => tab === document.activeElement,
        );

        let newIndex = currentIndex;

        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                event.preventDefault();
                newIndex = (currentIndex + 1) % tabs.length;
                break;
            case "ArrowLeft":
            case "ArrowUp":
                event.preventDefault();
                newIndex =
                    currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
                break;
            case "Home":
                event.preventDefault();
                newIndex = 0;
                break;
            case "End":
                event.preventDefault();
                newIndex = tabs.length - 1;
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                const tab = tabs[currentIndex];
                if (tab) {
                    tab.click();
                }
                return;
        }

        if (newIndex !== currentIndex && tabs[newIndex]) {
            tabs[newIndex].focus();
        }
    }

    // Focus management
    export function focusTab(tabId: string) {
        const tabElement = tabListElement?.querySelector(
            `[data-tab-id="${tabId}"]`,
        ) as HTMLElement;
        tabElement?.focus();
    }

    // Get tab content
    function getTabContent(tabId: string) {
        const tab = tabs.find((t) => t.id === tabId);
        return tab;
    }
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
        class="
            {variantClasses[variant].container}
            {orientation === 'vertical' ? 'flex-col space-y-1 mr-4' : ''}
            {fullWidth ? 'grid grid-cols-' + tabs.length : 'flex'}
        "
        on:keydown={handleKeydown}
        aria-orientation={orientation}
    >
        {#each tabs as tab, index}
            <button
                type="button"
                role="tab"
                data-tab-id={tab.id}
                class="
                    {sizeClasses[size].tab}
                    {variantClasses[variant].tab}
                    {tab.id === activeTab
                    ? variantClasses[variant].activeTab
                    : ''}
                    {tab.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'}
                    {fullWidth ? 'flex-1' : ''}
                    flex items-center justify-center gap-2
                "
                aria-selected={tab.id === activeTab}
                aria-controls="tabpanel-{tab.id}"
                aria-disabled={tab.disabled}
                tabindex={tab.id === activeTab ? 0 : -1}
                on:click={(e: MouseEvent) => handleTabClick(tab, e)}
            >
                {#if tab.icon}
                    <svg
                        class={sizeClasses[size].icon}
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
            {#if variant === "underline" && tab.id === activeTab}
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
                id="tabpanel-{tab.id}"
                role="tabpanel"
                aria-labelledby="tab-{tab.id}"
                class="
                    {sizeClasses[size].panel}
                    {variantClasses[variant].panel}
                    {tab.id === activeTab ? 'block' : 'hidden'}
                "
                transition:fade={{ duration: 200 }}
            >
                {#if tab.id === activeTab}
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

    /* Underline animation */
    .underline-indicator {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Badge animation */
    .tab-badge {
        animation: badge-pulse 2s infinite;
    }

    @keyframes badge-pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
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
