<script lang="ts">
    import Input from "../../src/components/atoms/Input.svelte";
    import Select from "../../src/components/atoms/Select.svelte";
    import ThemeToggle from "../../src/components/atoms/ThemeToggle.svelte";
    import ZabiStringsProvider from "../../src/components/atoms/ZabiStringsProvider.svelte";
    import BottomSheet from "../../src/components/molecules/BottomSheet.svelte";
    import Drawer from "../../src/components/molecules/Drawer.svelte";
    import FormField from "../../src/components/molecules/FormField.svelte";
    import Modal from "../../src/components/molecules/Modal.svelte";
    import SidebarPanel from "../../src/components/organisms/SidebarPanel.svelte";
    import type { ZabiStrings } from "../../src/components/util/zabi-strings.js";
    import AppBarHarness from "./AppBarHarness.svelte";
    import ConfirmDialogHarness from "./ConfirmDialogHarness.svelte";
    import DateHarness from "./DateHarness.svelte";
    import DropdownOptionsHarness from "./DropdownOptionsHarness.svelte";
    import GalleryHarness from "./GalleryHarness.svelte";
    import MediaGridHarness from "./MediaGridHarness.svelte";
    import SidebarShellHarness from "./SidebarShellHarness.svelte";
    import SortableListHarness from "./SortableListHarness.svelte";
    import StepperHarness from "./StepperHarness.svelte";
    import StringsHarness from "./StringsHarness.svelte";
    import ZabiStringsProbe from "./ZabiStringsProbe.svelte";

    /**
     * A component with nothing set on it, under a `ZabiStringsProvider` or
     * under none: what it says is then the provider's words, or the built-in
     * English. `kind` is one of StringsHarness's, or one of the ones here.
     */
    interface Props {
        kind: string;
        /** The app-wide words. Left out: no provider at all. */
        strings?: ZabiStrings;
        /** A second provider inside the first, around the component. */
        inner?: ZabiStrings;
    }

    let { kind, strings, inner }: Props = $props();
</script>

{#snippet component()}
    {#if kind === "Calendar"}
        <DateHarness piece="calendar" events={[]} />
    {:else if kind === "MediaGrid"}
        <MediaGridHarness />
    {:else if kind === "SortableList"}
        <SortableListHarness />
    {:else if kind === "Stepper"}
        <StepperHarness />
    {:else if kind === "Gallery"}
        <!-- `label` is the app's: the viewer's name, "Photo viewer" by default. -->
        <GalleryHarness initialOpen label="Bilder" />
    {:else if kind === "ThemeToggle"}
        <ThemeToggle modes="three" />
    {:else if kind === "AppBar"}
        <AppBarHarness backHref="/quiz" />
    {:else if kind === "RequiredField"}
        <FormField label="Namn" required>
            {#snippet control(field)}
                <input {...field} />
            {/snippet}
        </FormField>
    {:else if kind === "PasswordField"}
        <Input label="Lösenord" type="password" revealable />
    {:else if kind === "SidebarPanel"}
        <SidebarPanel items={[{ id: "a", label: "Alfa" }]} title="Projekt" subtitle="Välj" ariaLabel="Projekt" closeLabel="Stäng panelen" selectLabel="Välj" />
    {:else if kind === "ConfirmDialog"}
        <ConfirmDialogHarness initialOpen />
    {:else if kind === "DropdownSheet"}
        <DropdownOptionsHarness presentation="sheet" initialOpen />
    {:else if kind === "SidebarDrawer"}
        <SidebarShellHarness mobile="drawer" initialOpen />
    {:else if kind === "SelectSheet"}
        <Select label="Ark" options={[{ value: "a", label: "Alfa" }]} presentation="sheet" />
    {:else if kind === "Portals"}
        <!-- App code inside overlays that are rendered in <body>: each still reads the provider it was written under. -->
        <Modal isOpen title="Dialog" portal>
            <ZabiStringsProbe id="in-modal" />
        </Modal>
        <Drawer isOpen title="Låda">
            <ZabiStringsProbe id="in-drawer" />
        </Drawer>
        <BottomSheet isOpen title="Ark">
            <ZabiStringsProbe id="in-sheet" />
        </BottomSheet>
        <ZabiStringsProbe id="in-page" />
    {:else}
        <StringsHarness {kind} />
    {/if}
{/snippet}

{#if strings && inner}
    <ZabiStringsProvider {strings}>
        <ZabiStringsProbe id="outer-probe" />
        <ZabiStringsProvider strings={inner}>
            {@render component()}
        </ZabiStringsProvider>
    </ZabiStringsProvider>
{:else if strings}
    <ZabiStringsProvider {strings}>
        {@render component()}
    </ZabiStringsProvider>
{:else}
    {@render component()}
{/if}
