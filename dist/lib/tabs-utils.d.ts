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
export declare function createTabsState(tabs: TabItem[], initialActiveTab?: string): TabsState;
/**
 * Updates tabs state
 */
export declare function updateTabsState(state: TabsState, tabs: TabItem[], activeTab: string): TabsState;
/**
 * Size classes for tabs
 */
export declare const tabsSizeClasses: {
    readonly sm: {
        readonly tab: "px-3 py-1.5 text-sm";
        readonly panel: "p-3";
        readonly icon: "w-4 h-4";
    };
    readonly md: {
        readonly tab: "px-4 py-2 text-base";
        readonly panel: "p-4";
        readonly icon: "w-5 h-5";
    };
    readonly lg: {
        readonly tab: "px-6 py-3 text-lg";
        readonly panel: "p-6";
        readonly icon: "w-6 h-6";
    };
};
/**
 * Variant classes for tabs
 */
export declare const tabsVariantClasses: {
    readonly default: {
        readonly container: "border-b border-primary";
        readonly tab: "border-b-2 border-transparent text-secondary hover:text-primary hover:border-primary-hover transition-colors";
        readonly activeTab: "border-primary text-primary";
        readonly panel: "mt-4";
    };
    readonly pills: {
        readonly container: "bg-surface-secondary p-1 rounded-lg";
        readonly tab: "rounded-md text-secondary hover:text-primary hover:bg-surface-tertiary transition-colors";
        readonly activeTab: "bg-surface text-primary shadow-adaptive-sm";
        readonly panel: "mt-4";
    };
    readonly underline: {
        readonly container: "border-b border-primary";
        readonly tab: "relative text-secondary hover:text-primary transition-colors";
        readonly activeTab: "text-primary";
        readonly panel: "mt-4";
    };
    readonly cards: {
        readonly container: "space-y-2";
        readonly tab: "border border-primary rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-colors";
        readonly activeTab: "bg-surface text-primary shadow-adaptive-sm border-primary";
        readonly panel: "mt-4";
    };
};
/**
 * Gets tab classes based on config and state
 */
export declare function getTabClasses(config: TabsConfig, tab: TabItem, isActive: boolean): string;
/**
 * Gets container classes based on config
 */
export declare function getContainerClasses(config: TabsConfig, tabs?: TabItem[]): string;
/**
 * Gets panel classes based on config
 */
export declare function getPanelClasses(config: TabsConfig, isActive: boolean): string;
/**
 * Keyboard navigation for tabs
 */
export declare function createTabsKeyboardNavigation(tabs: TabItem[], state: TabsState, updateState: (updates: Partial<TabsState>) => void, onTabClick: (tab: TabItem, event: MouseEvent) => void): (event: KeyboardEvent) => void;
/**
 * Tab click handler
 */
export declare function createTabClickHandler(tabs: TabItem[], updateState: (updates: Partial<TabsState>) => void, dispatch: (event: keyof TabsEvents, detail: any) => void): (tab: TabItem, event: MouseEvent) => void;
/**
 * Focus tab by ID
 */
export declare function focusTab(tabId: string, container: HTMLElement): void;
/**
 * Gets tab content by ID
 */
export declare function getTabContent(tabs: TabItem[], tabId: string): TabItem | undefined;
/**
 * Checks if tab is active
 */
export declare function isTabActive(tab: TabItem, activeTab: string): boolean;
/**
 * Gets tab accessibility attributes
 */
export declare function getTabAccessibilityProps(tab: TabItem, isActive: boolean, index: number): {
    "aria-selected": boolean;
    "aria-controls": string;
    "aria-disabled": boolean | undefined;
    tabindex: number;
};
/**
 * Gets panel accessibility attributes
 */
export declare function getPanelAccessibilityProps(tab: TabItem): {
    id: string;
    role: string;
    "aria-labelledby": string;
};
//# sourceMappingURL=tabs-utils.d.ts.map