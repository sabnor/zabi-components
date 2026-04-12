import type { Component } from "svelte";
type SidebarNavIcon = Component<{
    size?: number;
    class?: string;
}>;
/**
 * Icon for a documentation sidebar category row.
 */
export declare function getDocsCategoryIcon(categoryId: string): SidebarNavIcon;
/**
 * Icon for a documentation sidebar component row.
 */
export declare function getDocsComponentIcon(componentName: string, componentCategory: string): SidebarNavIcon;
export {};
//# sourceMappingURL=docs-sidebar-helpers.d.ts.map