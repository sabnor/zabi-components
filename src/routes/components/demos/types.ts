export interface SharedDemoState {
    modalOpen?: boolean;
    slideUpOpen?: boolean;
    activeTab?: string;
    selectValue?: string | number | undefined;
    sidebarPath?: string;
    sidebarSearchValue?: string;
    sidebarSearchPanelOpen?: boolean;
    sidebarProjectSearch?: string;
    selectedProjectId?: string;
}

export interface DemoRendererProps extends SharedDemoState {
    /** Which example is being rendered for the component. */
    exampleIndex: number;
}

