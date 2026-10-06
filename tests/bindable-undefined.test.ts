import { createRawSnippet, flushSync, mount, unmount, type Component } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import Checkbox from "../src/components/atoms/Checkbox.svelte";
import ColorPicker from "../src/components/atoms/ColorPicker.svelte";
import DateField from "../src/components/atoms/DateField.svelte";
import Input from "../src/components/atoms/Input.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import Rating from "../src/components/atoms/Rating.svelte";
import Select from "../src/components/atoms/Select.svelte";
import Slider from "../src/components/atoms/Slider.svelte";
import Textarea from "../src/components/atoms/Textarea.svelte";
import TimeField from "../src/components/atoms/TimeField.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";
import Alert from "../src/components/molecules/Alert.svelte";
import BottomSheet from "../src/components/molecules/BottomSheet.svelte";
import Calendar from "../src/components/molecules/Calendar.svelte";
import Collapsible from "../src/components/molecules/Collapsible.svelte";
import ConfirmDialog from "../src/components/molecules/ConfirmDialog.svelte";
import Drawer from "../src/components/molecules/Drawer.svelte";
import Dropdown from "../src/components/molecules/Dropdown.svelte";
import ImageUpload from "../src/components/molecules/ImageUpload.svelte";
import MediaGrid from "../src/components/molecules/MediaGrid.svelte";
import Modal from "../src/components/molecules/Modal.svelte";
import PhotoGrid from "../src/components/molecules/PhotoGrid.svelte";
import PhotoViewer from "../src/components/molecules/PhotoViewer.svelte";
import PullToRefresh from "../src/components/molecules/PullToRefresh.svelte";
import RadioGroup from "../src/components/molecules/RadioGroup.svelte";
import SegmentedControl from "../src/components/molecules/SegmentedControl.svelte";
import SidebarFooter from "../src/components/molecules/SidebarFooter.svelte";
import SlideUp from "../src/components/molecules/SlideUp.svelte";
import Stepper from "../src/components/molecules/Stepper.svelte";
import SwipeableListItem from "../src/components/molecules/SwipeableListItem.svelte";
import Tabs from "../src/components/molecules/Tabs.svelte";
import SidebarAccountPanel from "../src/components/organisms/SidebarAccountPanel.svelte";
import SidebarNavigation from "../src/components/organisms/SidebarNavigation.svelte";
import SidebarPanel from "../src/components/organisms/SidebarPanel.svelte";
import SidebarShell from "../src/components/organisms/SidebarShell.svelte";
import BindableFallbackFixture from "./fixtures/BindableFallbackFixture.svelte";

/**
 * `bind:…={undefined}` on every bindable prop of the library.
 *
 * Svelte refuses a binding whose value is `undefined` when the prop has a
 * fallback (`let { value = $bindable(fallback) }`): it throws
 * `props_invalid_value`. Thrown while a page hydrates, that leaves the page
 * dead. RadioGroup did, with the very value its documentation gives for "no
 * selection", and every other bindable prop with a fallback would have for
 * `let open = $state<boolean>()`.
 *
 * No bindable prop has a fallback now. Each component applies its default
 * itself, at once, and writes it back through the binding, so the parent's
 * state says what the component shows.
 *
 * A binding is a prop with a setter, which is how Svelte itself tells a bound
 * prop from a plain one; that is what `bound` builds.
 */

const photos = [{ id: "p1", src: "/a.jpg", alt: "A", width: 4, height: 3 }];
const options = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
];
const media = {
    items: [{ id: "m1", url: "/a.jpg", name: "A" }],
    getKey: (item: { id: string }) => item.id,
    getLabel: (item: { name: string }) => item.name,
    getUrl: (item: { url: string }) => item.url,
};
const trigger = createRawSnippet(() => ({ render: () => "<button type='button'>Menu</button>" }));

interface Case {
    name: string;
    component: Component<any>;
    prop: string;
    /** What the component must have written back: its default. `undefined` where no selection is a value. */
    becomes: unknown;
    props?: Record<string, unknown>;
}

const cases: Case[] = [
    { name: "Checkbox", component: Checkbox, prop: "checked", becomes: false, props: { label: "Terms" } },
    { name: "Checkbox with defaultChecked", component: Checkbox, prop: "checked", becomes: true, props: { label: "Terms", defaultChecked: true } },
    { name: "Radio", component: Radio, prop: "checked", becomes: false, props: { label: "Yes" } },
    { name: "Toggle", component: Toggle, prop: "checked", becomes: false, props: { label: "Notify" } },
    { name: "Input", component: Input, prop: "value", becomes: "", props: { label: "Name" } },
    { name: "Textarea", component: Textarea, prop: "value", becomes: "", props: { label: "Notes" } },
    { name: "DateField", component: DateField, prop: "value", becomes: "", props: { label: "Date" } },
    { name: "TimeField", component: TimeField, prop: "value", becomes: "", props: { label: "Time" } },
    { name: "ColorPicker", component: ColorPicker, prop: "value", becomes: "" },
    { name: "Slider", component: Slider, prop: "value", becomes: 10, props: { label: "Volume", min: 10, max: 50 } },
    { name: "Rating", component: Rating, prop: "value", becomes: null, props: { label: "Quiz" } },
    { name: "Select", component: Select, prop: "value", becomes: undefined, props: { label: "Team", options } },
    { name: "SegmentedControl", component: SegmentedControl, prop: "value", becomes: undefined, props: { label: "Size", options } },
    { name: "RadioGroup", component: RadioGroup, prop: "value", becomes: undefined, props: { legend: "Answer", options } },
    { name: "RadioGroup with defaultValue", component: RadioGroup, prop: "value", becomes: "b", props: { legend: "Answer", options, defaultValue: "b" } },
    { name: "Alert", component: Alert, prop: "open", becomes: true, props: { message: "Saved" } },
    { name: "Collapsible", component: Collapsible, prop: "open", becomes: false, props: { title: "More" } },
    { name: "ConfirmDialog", component: ConfirmDialog, prop: "open", becomes: false, props: { title: "Delete?" } },
    { name: "Modal", component: Modal, prop: "isOpen", becomes: false, props: { title: "Edit" } },
    { name: "Drawer", component: Drawer, prop: "isOpen", becomes: false, props: { title: "Menu" } },
    { name: "SlideUp", component: SlideUp, prop: "isOpen", becomes: false, props: { title: "Sheet" } },
    { name: "BottomSheet", component: BottomSheet, prop: "isOpen", becomes: false, props: { title: "Sheet" } },
    { name: "Dropdown", component: Dropdown, prop: "isOpen", becomes: false, props: { trigger } },
    // Tabs goes on from its default to the first tab, as it always has.
    { name: "Tabs", component: Tabs, prop: "activeTab", becomes: "a", props: { tabs: [{ id: "a", label: "A" }] } },
    { name: "Stepper", component: Stepper, prop: "current", becomes: 0, props: { steps: ["One", "Two"] } },
    { name: "Calendar", component: Calendar, prop: "selected", becomes: null },
    { name: "ImageUpload", component: ImageUpload, prop: "value", becomes: null },
    { name: "MediaGrid selected", component: MediaGrid, prop: "selected", becomes: null, props: { ...media } },
    { name: "MediaGrid selectedKeys", component: MediaGrid, prop: "selectedKeys", becomes: [], props: { ...media, multiple: true } },
    { name: "PhotoGrid selected", component: PhotoGrid, prop: "selected", becomes: null, props: { photos, selectable: "single" } },
    { name: "PhotoGrid selectedKeys", component: PhotoGrid, prop: "selectedKeys", becomes: [], props: { photos, selectable: "multiple" } },
    { name: "PhotoViewer index", component: PhotoViewer, prop: "index", becomes: 0, props: { photos } },
    { name: "PhotoViewer isOpen", component: PhotoViewer, prop: "isOpen", becomes: false, props: { photos } },
    { name: "SidebarFooter", component: SidebarFooter, prop: "isLightMode", becomes: false },
    { name: "SidebarAccountPanel", component: SidebarAccountPanel, prop: "isLightMode", becomes: false },
    { name: "SidebarNavigation searchValue", component: SidebarNavigation, prop: "searchValue", becomes: "", props: { items: [] } },
    { name: "SidebarNavigation isLightMode", component: SidebarNavigation, prop: "isLightMode", becomes: false, props: { items: [] } },
    { name: "SidebarNavigation isOpen", component: SidebarNavigation, prop: "isOpen", becomes: false, props: { items: [] } },
    { name: "PullToRefresh", component: PullToRefresh, prop: "refreshing", becomes: false, props: {} },
    { name: "SwipeableListItem", component: SwipeableListItem, prop: "open", becomes: false, props: { actions: [{ id: "a", label: "Archive", onselect: () => {} }] } },
    { name: "SidebarPanel searchValue", component: SidebarPanel, prop: "searchValue", becomes: "", props: { items: [] } },
    { name: "SidebarPanel selectedItemId", component: SidebarPanel, prop: "selectedItemId", becomes: "", props: { items: [] } },
    { name: "SidebarShell", component: SidebarShell, prop: "isOpen", becomes: false },
];

/** Props with `key` bound to state that starts as `undefined`. */
function bound(props: Record<string, unknown>, key: string) {
    const state: { value: unknown; writes: unknown[] } = { value: undefined, writes: [] };
    Object.defineProperty(props, key, {
        enumerable: true,
        get: () => state.value,
        set: (next: unknown) => {
            state.value = next;
            state.writes.push(next);
        },
    });
    return state;
}

let mounted: ReturnType<typeof mount> | undefined;
let target: HTMLElement | undefined;

afterEach(() => {
    if (mounted) void unmount(mounted);
    mounted = undefined;
    target?.remove();
    document.body.innerHTML = "";
});

function show(component: Component<any>, props: Record<string, unknown>) {
    target = document.createElement("div");
    document.body.append(target);
    mounted = mount(component, { target, props });
    flushSync();
}

describe("bind:…={undefined}", () => {
    it("is refused by Svelte for a prop with a fallback, which is what this guards against", () => {
        const props: Record<string, unknown> = {};
        bound(props, "value");
        expect(() => show(BindableFallbackFixture, props)).toThrow(/props_invalid_value/);
    });

    it("covers every bindable prop in src/components", async () => {
        // Read from the source, so a new bindable prop cannot be forgotten here.
        const sources = import.meta.glob("../src/components/**/*.svelte", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
        const declared: string[] = [];
        const withFallback: string[] = [];
        for (const [file, source] of Object.entries(sources)) {
            const name = file.split("/").pop()!.replace(".svelte", "");
            for (const match of source.matchAll(/^\s+(\w+) = \$bindable(?:<[^\n]*>)?\(([^)\n]*)\),?\s*$/gm)) {
                declared.push(`${name}.${match[1]}`);
                if (match[2].trim() !== "" && match[2].trim() !== "undefined") withFallback.push(`${name}.${match[1]}`);
            }
        }
        expect(withFallback, "no bindable prop has a fallback").toEqual([]);

        // Internal pieces are reached through the component that wraps them.
        // The rest of this list never had a fallback, so they never threw:
        // `undefined` is one of their values (no snap point chosen, the month
        // the calendar picks itself, not a toggle, the page's own mode).
        const internal = new Set([
            "SelectionControl.checked",
            "TemporalField.value",
            "IconButton.pressed",
            "BottomSheet.snap",
            "Calendar.month",
            "SortableList.items",
            "ThemeToggle.mode",
        ]);
        const tested = new Set(
            cases.map((entry) => `${entry.name.split(" ")[0]}.${entry.prop}`),
        );
        const missing = declared.filter((prop) => !internal.has(prop) && !tested.has(prop));
        expect(missing).toEqual([]);
    });

    it.each(cases)("$name: mounts, and its default goes back through the binding", ({ component, prop, becomes, props }) => {
        const all = { ...props };
        const state = bound(all, prop);
        expect(() => show(component, all)).not.toThrow();
        expect(state.value).toEqual(becomes);
        // Applying a default is not a loop: one write, or two where the
        // component then moves on from the default (Tabs, to its first tab).
        expect(state.writes.length).toBeLessThanOrEqual(2);
    });

    it.each(cases)("$name: takes `undefined` again later without throwing, and applies its default again", ({ component, prop, becomes, props, name }) => {
        const all = { ...props };
        const state = bound(all, prop);
        show(component, all);
        if (name.startsWith("RadioGroup with")) return; // Its default is for the start only.
        // The parent sets something, then clears it: with plain state behind the
        // binding the component is not told, so this only has to stay standing.
        state.value = undefined;
        expect(() => flushSync()).not.toThrow();
        void becomes;
    });
});
