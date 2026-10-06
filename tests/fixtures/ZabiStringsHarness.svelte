<script lang="ts">
    import Input from "../../src/components/atoms/Input.svelte";
    import Select from "../../src/components/atoms/Select.svelte";
    import ThemeToggle from "../../src/components/atoms/ThemeToggle.svelte";
    import ZabiStringsProvider from "../../src/components/atoms/ZabiStringsProvider.svelte";
    import BottomSheet from "../../src/components/molecules/BottomSheet.svelte";
    import Drawer from "../../src/components/molecules/Drawer.svelte";
    import FormField from "../../src/components/molecules/FormField.svelte";
    import Modal from "../../src/components/molecules/Modal.svelte";
    import CodeBlock from "../../src/components/atoms/CodeBlock.svelte";
    import Toast from "../../src/components/atoms/Toast.svelte";
    import Alert from "../../src/components/molecules/Alert.svelte";
    import AvatarGroup from "../../src/components/molecules/AvatarGroup.svelte";
    import ImageUpload from "../../src/components/molecules/ImageUpload.svelte";
    import UnsavedChangesBar from "../../src/components/molecules/UnsavedChangesBar.svelte";
    import SwipePullHarness from "./SwipePullHarness.svelte";
    import SlideUp from "../../src/components/molecules/SlideUp.svelte";
    import Toaster from "../../src/components/molecules/Toaster.svelte";
    import { pushToast } from "../../src/components/molecules/toast-store.js";
    import { onMount } from "svelte";
    import RatingHarness from "./RatingHarness.svelte";
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

    onMount(() => {
        // A toaster says nothing until there is a toast.
        if (kind === "Toaster") pushToast({ message: "Sparat", type: "success" });
    });
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
    {:else if kind === "Modal"}
        <Modal isOpen title="Dialog" portal>Innehåll</Modal>
    {:else if kind === "Drawer"}
        <Drawer isOpen title="Låda">Innehåll</Drawer>
    {:else if kind === "SlideUp"}
        <SlideUp isOpen title="Panel">Innehåll</SlideUp>
    {:else if kind === "BottomSheet"}
        <BottomSheet isOpen title="Ark">Innehåll</BottomSheet>
    {:else if kind === "Toaster"}
        <!-- Mounted under the provider, as an app mounts it once at its root. -->
        <Toaster />
    {:else if kind === "AvatarGroup"}
        <AvatarGroup
            label="Sällskap"
            max={2}
            people={["Anna", "Bo", "Cia", "Dan", "Eva"].map((name) => ({ name }))}
        />
    {:else if kind === "SwipeableListItem"}
        <SwipePullHarness kind="swipe" />
    {:else if kind === "PullToRefresh"}
        <SwipePullHarness kind="pull" />
    {:else if kind === "Toast"}
        <Toast message="Sparat" layout="inline" />
    {:else if kind === "Alert"}
        <Alert variant="info" title="Obs" message="Läs detta" closable />
    {:else if kind === "CodeBlock"}
        <CodeBlock code="let a = 1;" />
    {:else if kind === "ImageUpload"}
        <ImageUpload label="Bild" />
    {:else if kind === "UnsavedChangesBar"}
        <UnsavedChangesBar dirty onsave={() => {}} ondiscard={() => {}} />
    {:else if kind === "Rating"}
        <RatingHarness initial={3} clearable />
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
