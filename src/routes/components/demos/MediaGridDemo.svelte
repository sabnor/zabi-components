<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import ConfirmDialog from "../../../components/molecules/ConfirmDialog.svelte";
    import MediaGrid from "../../../components/molecules/MediaGrid.svelte";
    import Modal from "../../../components/molecules/Modal.svelte";
    import type { MediaGridKey } from "../../../components/util/media-grid.js";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    type Media = {
        id: string;
        name: string;
        url: string;
        kind?: "image" | "video";
        poster?: string;
        /** In use on a page, so it may not be deleted. */
        inUse?: boolean;
    };

    /** A flat colour with the file's initial: a stand-in for a stored image, with no network. */
    function picture(name: string, hue: number): string {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="hsl(${hue} 55% 55%)"/><text x="60" y="76" font-family="sans-serif" font-size="48" text-anchor="middle" fill="white">${name[0].toUpperCase()}</text></svg>`;
        return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }

    function library(): Media[] {
        const names = [
            "hero.jpg",
            "team.png",
            "office.jpg",
            "launch.mp4",
            "logo.svg",
            "map.webp",
            "desk.jpg",
            "founders.jpg",
            "tour.webm",
            "banner.png",
        ];
        return names.map((name, index) => {
            const video = /\.(mp4|webm)$/.test(name);
            return {
                id: name,
                name,
                url: video ? `/media/${name}` : picture(name, index * 36),
                kind: video ? "video" : "image",
                poster: video ? picture(name, index * 36) : undefined,
                inUse: name === "logo.svg",
            } satisfies Media;
        });
    }

    let items = $state<Media[]>([
        ...library(),
        // Points nowhere: shows the fallback tile.
        { id: "missing.jpg", name: "missing.jpg", url: "/media/missing.jpg" },
    ]);
    let selected = $state<MediaGridKey | null>("team.png");
    let toDelete = $state<Media | null>(null);
    let confirmOpen = $state(false);

    let manyItems = $state<Media[]>(library().slice(0, 6));
    let selectedKeys = $state<MediaGridKey[]>(["hero.jpg", "office.jpg"]);
    let loading = $state(false);

    let pickerOpen = $state(false);
    let picked = $state<MediaGridKey | null>(null);
    const pickerItems = library();
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <MediaGrid
            {items}
            getKey={(item) => item.id}
            getLabel={(item) => item.name}
            getUrl={(item) => item.url}
            getType={(item) => item.kind}
            getPoster={(item) => item.poster}
            bind:selected
            ondelete={(item) => {
                toDelete = item;
                confirmOpen = true;
            }}
            isItemDeletable={(item) => !item.inUse}
            aria-label="Media library"
            data-testid="media-demo-library"
        />
        <p class="text-sm text-description">
            Selected: <span data-testid="media-demo-selected">{selected ?? "nothing"}</span>
        </p>
        <ConfirmDialog
            bind:open={confirmOpen}
            variant="danger"
            title="Delete this file?"
            message={toDelete ? `${toDelete.name} is removed from the library.` : ""}
            confirmLabel="Delete"
            onconfirm={async () => {
                // Stands in for the request that deletes the file.
                await new Promise((resolve) => setTimeout(resolve, 400));
                items = items.filter((item) => item.id !== toDelete?.id);
                if (selected === toDelete?.id) selected = null;
            }}
        />
    </div>
{:else if exampleIndex === 1}
    <div class="w-full space-y-3">
        <div class="flex flex-wrap gap-2">
            <Button
                variant="secondary"
                size="sm"
                onclick={() => (loading = !loading)}
                data-testid="media-demo-toggle-loading"
            >
                {loading ? "Stop loading" : "Load more"}
            </Button>
            <Button
                variant="secondary"
                size="sm"
                onclick={() => {
                    manyItems = manyItems.length ? [] : library().slice(0, 6);
                    selectedKeys = [];
                }}
                data-testid="media-demo-toggle-empty"
            >
                {manyItems.length ? "Empty the library" : "Restore the library"}
            </Button>
        </div>
        <MediaGrid
            items={manyItems}
            getKey={(item) => item.id}
            getLabel={(item) => item.name}
            getUrl={(item) => item.url}
            getType={(item) => item.kind}
            getPoster={(item) => item.poster}
            multiple
            bind:selectedKeys
            {loading}
            loadingCount={4}
            minTileSize={72}
            aria-label="Attachments"
            data-testid="media-demo-multiple"
        />
        <p class="text-sm text-description">
            {selectedKeys.length} selected: {selectedKeys.join(", ") || "nothing"}
        </p>
    </div>
{:else}
    <div class="w-full space-y-3">
        <Button onclick={() => (pickerOpen = true)} data-testid="media-demo-open-picker">
            Choose from library
        </Button>
        <p class="text-sm text-description">
            Picked: <span data-testid="media-demo-picked">{picked ?? "nothing"}</span>
        </p>
        <Modal bind:isOpen={pickerOpen} title="Media library" data-testid="media-demo-modal">
            <MediaGrid
                items={pickerItems}
                getKey={(item) => item.id}
                getLabel={(item) => item.name}
                getUrl={(item) => item.url}
                getType={(item) => item.kind}
                getPoster={(item) => item.poster}
                selected={picked}
                onselect={({ item }) => {
                    picked = item.id;
                    pickerOpen = false;
                }}
                aria-label="Media library"
            />
        </Modal>
    </div>
{/if}
