<script lang="ts">
    import Download from "@lucide/svelte/icons/download";
    import ImageIcon from "@lucide/svelte/icons/image";
    import Share2 from "@lucide/svelte/icons/share-2";
    import Trash2 from "@lucide/svelte/icons/trash-2";
    import Button from "../../../components/atoms/Button.svelte";
    import ConfirmDialog from "../../../components/molecules/ConfirmDialog.svelte";
    import PhotoGrid from "../../../components/molecules/PhotoGrid.svelte";
    import PhotoViewer from "../../../components/molecules/PhotoViewer.svelte";
    import type { Photo, PhotoKey, PhotoViewerAction } from "../../../components/util/photo.js";
    import { photoKey } from "../../../components/util/photo.js";
    import { LONG_CAPTION, samplePhoto, samplePhotos } from "$lib/showcase/sample-photos";
    import type { DemoRendererProps } from "./types";

    /** One demo for both components; `component` says which page it is on. */
    let {
        exampleIndex,
        component,
    }: DemoRendererProps & { component: "PhotoGrid" | "PhotoViewer" } = $props();

    let photos = $state<Photo[]>(samplePhotos(14));
    let index = $state(0);
    let open = $state(false);
    let note = $state("Nothing done yet.");
    let cover = $state<PhotoKey | null>("photo-2");
    let chosen = $state<PhotoKey[]>([]);
    let lastClose = $state("none yet");

    let picker: HTMLInputElement | undefined = $state();
    let added = 0;

    function show(at: number) {
        index = at;
        open = true;
    }

    /** What an app does with the file it gets: here, a new sample photo takes its place. */
    function addPicked() {
        const files = picker?.files?.length ?? 0;
        if (files === 0) return;
        for (let file = 0; file < files; file += 1) {
            added += 1;
            photos = [samplePhoto(20 + added, { alt: `New photo ${added}` }), ...photos];
        }
        note = `Added ${files} ${files === 1 ? "photo" : "photos"}.`;
        if (picker) picker.value = "";
    }

    // --- Actions of the viewer: each is the app's own function. -----------

    let confirmOpen = $state(false);
    let toDelete = $state<Photo | null>(null);

    async function share(photo: Photo) {
        // The Web Share sheet where the browser has one; a note where it has not.
        if (typeof navigator.share === "function") {
            try {
                await navigator.share({ title: photo.alt, text: photo.caption ?? photo.alt });
                note = `Shared "${photo.alt}".`;
                return;
            } catch {
                // Dismissed by the user: nothing to report.
            }
        }
        note = `Would share "${photo.alt}".`;
    }

    function remove() {
        const gone = toDelete;
        if (!gone) return;
        photos = photos.filter((photo) => photoKey(photo) !== photoKey(gone));
        chosen = chosen.filter((key) => key !== photoKey(gone));
        note = `Deleted "${gone.alt}".`;
        toDelete = null;
    }

    const actions: PhotoViewerAction[] = [
        { id: "share", label: "Share", icon: Share2, onclick: (photo) => void share(photo) },
        {
            id: "cover",
            label: "Set as cover",
            icon: ImageIcon,
            onclick: (photo) => {
                cover = photoKey(photo);
                note = `"${photo.alt}" is the cover.`;
            },
        },
        {
            id: "download",
            label: "Download",
            icon: Download,
            onclick: (photo) => (note = `Would download "${photo.alt}".`),
        },
        {
            id: "delete",
            label: "Delete",
            icon: Trash2,
            tone: "danger",
            onclick: (photo) => {
                toDelete = photo;
                confirmOpen = true;
            },
        },
    ];

    const captioned = $derived(
        photos.slice(0, 5).map((photo, at) => (at === 1 ? { ...photo, caption: LONG_CAPTION } : photo)),
    );

    function deleteChosen() {
        const count = chosen.length;
        photos = photos.filter((photo) => !chosen.includes(photoKey(photo)));
        chosen = [];
        note = `Deleted ${count} ${count === 1 ? "photo" : "photos"}.`;
    }
</script>

{#snippet status(testid: string)}
    <p class="text-sm text-description" data-testid={testid}>{note}</p>
{/snippet}

{#if component === "PhotoGrid" && exampleIndex === 0}
    <div class="w-full space-y-3" data-testid="photo-grid-demo">
        <!-- The app's own file picker. ImageUpload would do as well: the grid
        only says that Add was pressed. -->
        <input
            bind:this={picker}
            type="file"
            accept="image/*"
            multiple
            class="sr-only"
            tabindex="-1"
            aria-hidden="true"
            onchange={addPicked}
        />
        <PhotoGrid
            {photos}
            max={8}
            aria-label="Quiz night photos"
            onopen={show}
            onadd={() => picker?.click()}
        />
        {@render status("photo-grid-demo-note")}
        <PhotoViewer {photos} bind:index bind:isOpen={open} {actions} />
    </div>
{:else if component === "PhotoGrid" && exampleIndex === 1}
    <!-- 288px is a 320px phone less its margins: the card this example sits
    in is narrower than that, so it scrolls sideways there instead of making
    the tiles smaller than they are on any phone. -->
    <div class="w-full overflow-x-auto">
    <div class="w-full min-w-[288px] space-y-3" data-testid="photo-grid-demo-multiple">
        <PhotoGrid
            photos={photos.slice(0, 9)}
            selectable="multiple"
            bind:selectedKeys={chosen}
            aria-label="Photos to delete"
            onopen={show}
        />
        <div class="flex flex-wrap items-center gap-3">
            <Button variant="danger" size="lg" disabled={chosen.length === 0} onclick={deleteChosen}>
                Delete selected
            </Button>
            <p class="text-sm text-description" data-testid="photo-grid-demo-chosen">
                {chosen.length} selected.
            </p>
        </div>
        <PhotoViewer photos={photos.slice(0, 9)} bind:index bind:isOpen={open} />
    </div>
    </div>
{:else if component === "PhotoGrid"}
    <div class="w-full space-y-3" data-testid="photo-grid-demo-single">
        <PhotoGrid
            photos={photos.slice(0, 6)}
            columns={3}
            selectable="single"
            bind:selected={cover}
            aria-label="Cover photo"
        />
        <p class="text-sm text-description" data-testid="photo-grid-demo-cover">
            Cover: {photos.find((photo) => photoKey(photo) === cover)?.alt ?? "none"}.
        </p>
    </div>
{:else if exampleIndex === 0}
    <div class="w-full space-y-3" data-testid="photo-viewer-demo">
        <PhotoGrid {photos} aria-label="Quiz night photos" onopen={show} />
        <p class="text-sm text-description" data-testid="photo-viewer-demo-note">
            {note} Last close: {lastClose}.
        </p>
        <PhotoViewer
            {photos}
            bind:index
            bind:isOpen={open}
            {actions}
            onclose={({ reason }) => (lastClose = reason)}
        />
    </div>
{:else}
    <div class="w-full space-y-3" data-testid="photo-viewer-demo-captions">
        <PhotoGrid photos={captioned} aria-label="Photos with captions" onopen={show} />
        <PhotoViewer photos={captioned} bind:index bind:isOpen={open} label="Photos with captions" />
    </div>
{/if}

<!-- Delete asks first. The viewer stays open behind the question; when the
photo goes, it shows the one that takes its place. -->
<ConfirmDialog
    bind:open={confirmOpen}
    variant="danger"
    title="Delete this photo?"
    message={toDelete ? `"${toDelete.alt}" is removed for everyone in the team.` : ""}
    confirmLabel="Delete"
    onconfirm={remove}
    oncancel={() => (toDelete = null)}
/>
