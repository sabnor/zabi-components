import {
    Bell,
    Circle,
    CircleCheck,
    House,
    Package,
    PieChart,
} from "@lucide/svelte";
import type { Component } from "svelte";

type SidebarNavIcon = Component<{ size?: number; class?: string }>;

/**
 * Icon for a documentation sidebar category row.
 */
export function getDocsCategoryIcon(categoryId: string): SidebarNavIcon {
    if (categoryId === "all") return House;
    if (categoryId === "molecules") return PieChart;
    if (categoryId === "organisms") return Package;
    return Circle;
}

/**
 * Icon for a documentation sidebar component row.
 */
export function getDocsComponentIcon(
    componentName: string,
    componentCategory: string,
): SidebarNavIcon {
    if (componentName.includes("Navigation")) return House;
    if (
        componentName.includes("Form") ||
        componentName === "Input" ||
        componentName === "Textarea" ||
        componentName === "Select" ||
        componentName === "Checkbox" ||
        componentName === "Toggle"
    ) {
        return CircleCheck;
    }
    if (componentName === "Alert" || componentName === "Toast") return Bell;
    if (componentCategory === "molecules") return PieChart;
    if (componentCategory === "organisms") return Package;
    return Circle;
}
