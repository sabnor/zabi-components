import type { Component } from "svelte";
import ButtonDemo from "./ButtonDemo.svelte";
import InputDemo from "./InputDemo.svelte";
import ModalDemo from "./ModalDemo.svelte";
import RadioDemo from "./RadioDemo.svelte";
import SliderDemo from "./SliderDemo.svelte";
import SidebarNavigationDemo from "./SidebarNavigationDemo.svelte";
import SkeletonDemo from "./SkeletonDemo.svelte";
import SpinnerDemo from "./SpinnerDemo.svelte";
import ListDemo from "./ListDemo.svelte";
import MediaGridDemo from "./MediaGridDemo.svelte";
import SortableListDemo from "./SortableListDemo.svelte";
import CollapsibleDemo from "./CollapsibleDemo.svelte";
import CollapsibleGroupDemo from "./CollapsibleGroupDemo.svelte";
import ConfirmDialogDemo from "./ConfirmDialogDemo.svelte";
import DrawerDemo from "./DrawerDemo.svelte";
import type { DemoRendererProps } from "./types";

const registry: Record<string, Component<DemoRendererProps>> = {
    Button: ButtonDemo,
    Input: InputDemo,
    Radio: RadioDemo,
    Slider: SliderDemo,
    Skeleton: SkeletonDemo,
    Spinner: SpinnerDemo,
    Modal: ModalDemo,
    SidebarNavigation: SidebarNavigationDemo,
    List: ListDemo,
    MediaGrid: MediaGridDemo,
    SortableList: SortableListDemo,
    Collapsible: CollapsibleDemo,
    CollapsibleGroup: CollapsibleGroupDemo,
    ConfirmDialog: ConfirmDialogDemo,
    Drawer: DrawerDemo,
};

export function getComponentDemo(
    componentName: string,
): Component<DemoRendererProps> | undefined {
    return registry[componentName];
}

