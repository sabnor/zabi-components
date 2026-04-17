import type { Component } from "svelte";
import ButtonDemo from "./ButtonDemo.svelte";
import InputDemo from "./InputDemo.svelte";
import ModalDemo from "./ModalDemo.svelte";
import SidebarNavigationDemo from "./SidebarNavigationDemo.svelte";
import SkeletonDemo from "./SkeletonDemo.svelte";
import type { DemoRendererProps } from "./types";

const registry: Record<string, Component<DemoRendererProps>> = {
    Button: ButtonDemo,
    Input: InputDemo,
    Skeleton: SkeletonDemo,
    Modal: ModalDemo,
    SidebarNavigation: SidebarNavigationDemo,
};

export function getComponentDemo(
    componentName: string,
): Component<DemoRendererProps> | undefined {
    return registry[componentName];
}

