import type { Component } from "svelte";
import ButtonDemo from "./ButtonDemo.svelte";
import InputDemo from "./InputDemo.svelte";
import ModalDemo from "./ModalDemo.svelte";
import RadioDemo from "./RadioDemo.svelte";
import SidebarNavigationDemo from "./SidebarNavigationDemo.svelte";
import SkeletonDemo from "./SkeletonDemo.svelte";
import ListDemo from "./ListDemo.svelte";
import type { DemoRendererProps } from "./types";

const registry: Record<string, Component<DemoRendererProps>> = {
    Button: ButtonDemo,
    Input: InputDemo,
    Radio: RadioDemo,
    Skeleton: SkeletonDemo,
    Modal: ModalDemo,
    SidebarNavigation: SidebarNavigationDemo,
    List: ListDemo,
};

export function getComponentDemo(
    componentName: string,
): Component<DemoRendererProps> | undefined {
    return registry[componentName];
}

