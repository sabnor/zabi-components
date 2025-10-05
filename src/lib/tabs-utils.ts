// Tabs utilities for common tab patterns
import type { TabsEvents } from '../types/events';

export interface TabItem {
    id: string;
    label: string;
    disabled?: boolean;
    icon?: string;
    badge?: string | number;
}

export interface TabsConfig {
    variant: 'default' | 'pills' | 'underline' | 'cards';
    size: 'sm' | 'md' | 'lg';
    orientation: 'horizontal' | 'vertical';
    fullWidth: boolean;
}

export interface TabsState {
    activeTab: string;
    activeTabIndex: number;
}

/**
 * Creates initial tabs state
 */
export function createTabsState(tabs: TabItem[], initialActiveTab?: string): TabsState {
    const activeTab = initialActiveTab || (tabs.length > 0 ? tabs[0].id : '');
    return {
        activeTab,
        activeTabIndex: tabs.findIndex(tab => tab.id === activeTab),
    };
}

/**
 * Updates tabs state
 */
export function updateTabsState(
    state: TabsState,
    tabs: TabItem[],
    activeTab: string
): TabsState {
    return {
        activeTab,
        activeTabIndex: tabs.findIndex(tab => tab.id === activeTab),
    };
}

/**
 * Size classes for tabs
 */
export const tabsSizeClasses = {
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
} as const;

/**
 * Variant classes for tabs
 */
export const tabsVariantClasses = {
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
        activeTab: "bg-surface text-primary shadow-adaptive-sm border-primary",
        panel: "mt-4",
    },
} as const;

/**
 * Gets tab classes based on config and state
 */
export function getTabClasses(
    config: TabsConfig,
    tab: TabItem,
    isActive: boolean
): string {
    const sizeClasses = tabsSizeClasses[config.size];
    const variantClasses = tabsVariantClasses[config.variant];

    return [
        sizeClasses.tab,
        variantClasses.tab,
        isActive ? variantClasses.activeTab : '',
        tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        config.fullWidth ? 'flex-1' : '',
        'flex items-center justify-center gap-2',
    ].filter(Boolean).join(' ');
}

/**
 * Gets container classes based on config
 */
export function getContainerClasses(config: TabsConfig, tabs: TabItem[] = []): string {
    const variantClasses = tabsVariantClasses[config.variant];

    return [
        variantClasses.container,
        config.orientation === 'vertical' ? 'flex-col space-y-1 mr-4' : '',
        config.fullWidth ? `grid grid-cols-${tabs.length || 1}` : 'flex',
    ].filter(Boolean).join(' ');
}

/**
 * Gets panel classes based on config
 */
export function getPanelClasses(config: TabsConfig, isActive: boolean): string {
    const sizeClasses = tabsSizeClasses[config.size];
    const variantClasses = tabsVariantClasses[config.variant];

    return [
        sizeClasses.panel,
        variantClasses.panel,
        isActive ? 'block' : 'hidden',
    ].filter(Boolean).join(' ');
}

/**
 * Keyboard navigation for tabs
 */
export function createTabsKeyboardNavigation(
    tabs: TabItem[],
    state: TabsState,
    updateState: (updates: Partial<TabsState>) => void,
    onTabClick: (tab: TabItem, event: MouseEvent) => void
) {
    return function handleKeydown(event: KeyboardEvent) {
        const tabElements = Array.from(
            document.querySelectorAll('[role="tab"]')
        ) as HTMLElement[];

        const currentIndex = tabElements.findIndex(
            tab => tab === document.activeElement
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
                newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
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
                const tab = tabElements[currentIndex];
                if (tab) {
                    tab.click();
                }
                return;
        }

        if (newIndex !== currentIndex && tabElements[newIndex]) {
            tabElements[newIndex].focus();
        }
    };
}

/**
 * Tab click handler
 */
export function createTabClickHandler(
    tabs: TabItem[],
    updateState: (updates: Partial<TabsState>) => void,
    dispatch: (event: keyof TabsEvents, detail: any) => void
) {
    return function handleTabClick(tab: TabItem, event: MouseEvent) {
        if (tab.disabled) return;

        updateState({ activeTab: tab.id });
        dispatch("change", { activeTab: tab.id, tab, event });
        dispatch("tabClick", { tab, event });
    };
}

/**
 * Focus tab by ID
 */
export function focusTab(tabId: string, container: HTMLElement): void {
    const tabElement = container.querySelector(
        `[data-tab-id="${tabId}"]`
    ) as HTMLElement;
    tabElement?.focus();
}

/**
 * Gets tab content by ID
 */
export function getTabContent(tabs: TabItem[], tabId: string): TabItem | undefined {
    return tabs.find(tab => tab.id === tabId);
}

/**
 * Checks if tab is active
 */
export function isTabActive(tab: TabItem, activeTab: string): boolean {
    return tab.id === activeTab;
}

/**
 * Gets tab accessibility attributes
 */
export function getTabAccessibilityProps(
    tab: TabItem,
    isActive: boolean,
    index: number
) {
    return {
        "aria-selected": isActive,
        "aria-controls": `tabpanel-${tab.id}`,
        "aria-disabled": tab.disabled,
        "tabindex": isActive ? 0 : -1,
    };
}

/**
 * Gets panel accessibility attributes
 */
export function getPanelAccessibilityProps(tab: TabItem) {
    return {
        id: `tabpanel-${tab.id}`,
        role: "tabpanel",
        "aria-labelledby": `tab-${tab.id}`,
    };
}

