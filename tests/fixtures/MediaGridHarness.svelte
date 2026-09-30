<script lang="ts">
    import ConfirmDialog from "../../src/components/molecules/ConfirmDialog.svelte";
    import MediaGrid from "../../src/components/molecules/MediaGrid.svelte";
    import type {
        MediaGridKey,
        MediaGridSelectDetail,
        MediaGridStrings,
    } from "../../src/components/util/media-grid.js";

    type Media = { id: string; name: string; url: string; poster?: string; kind?: "image" | "video" };

    interface Props {
        initialItems?: Media[];
        initialSelected?: string | null;
        multiple?: boolean;
        loading?: boolean;
        loadingCount?: number;
        disabled?: boolean;
        strings?: Partial<MediaGridStrings>;
        customEmpty?: boolean;
        onselect?: (detail: MediaGridSelectDetail<Media>) => void;
        /**
         * `none`: no delete buttons. `report`: only calls `onremove`.
         * `remove`: takes the item out at once. `confirm`: asks in a
         * ConfirmDialog first, the way a consumer would. `confirm-slow`: the
         * same, but the request takes a moment and the dialog stays open a
         * little longer than the item does.
         */
        deleting?: "none" | "report" | "remove" | "confirm" | "confirm-slow";
        onremove?: (item: Media) => void;
        /** Item that gets no delete button. */
        protectedId?: string;
    }

    const library: Media[] = [
        { id: "hero", name: "hero.jpg", url: "/media/hero.jpg" },
        { id: "team", name: "team.png", url: "/media/team.png" },
        { id: "clip", name: "clip.mp4", url: "/media/clip.mp4?v=2" },
        { id: "logo", name: "logo.svg", url: "/media/logo.svg" },
        { id: "reel", name: "reel", url: "/media/9f3a", kind: "video", poster: "/media/9f3a.jpg" },
        { id: "map", name: "map.webp", url: "/media/map.webp" },
        { id: "desk", name: "desk.jpg", url: "/media/desk.jpg" },
    ];

    let {
        initialItems = library,
        initialSelected = null,
        multiple = false,
        loading = false,
        loadingCount,
        disabled = false,
        strings,
        customEmpty = false,
        onselect,
        deleting = "none",
        onremove,
        protectedId,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let items = $state<Media[]>(initialItems);
    // svelte-ignore state_referenced_locally
    let selected = $state<MediaGridKey | null>(initialSelected);
    let selectedKeys = $state<MediaGridKey[]>([]);

    let confirming = $state<Media | null>(null);
    let confirmOpen = $state(false);

    function wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function remove(item: Media) {
        items = items.filter((candidate) => candidate.id !== item.id);
    }

    function handleDelete(item: Media) {
        onremove?.(item);
        if (deleting === "remove") remove(item);
        if (deleting === "confirm" || deleting === "confirm-slow") {
            confirming = item;
            confirmOpen = true;
        }
    }
</script>

{#snippet emptySnippet()}
    <p data-testid="custom-empty">Nothing here.</p>
{/snippet}

<button type="button" data-testid="before">Before</button>
<MediaGrid
    {items}
    getKey={(item) => item.id}
    getLabel={(item) => item.name}
    getUrl={(item) => item.url}
    getType={(item) => item.kind}
    getPoster={(item) => item.poster}
    bind:selected
    bind:selectedKeys
    {multiple}
    {loading}
    {loadingCount}
    {disabled}
    {strings}
    {onselect}
    ondelete={deleting === "none" ? undefined : handleDelete}
    isItemDeletable={(item) => item.id !== protectedId}
    empty={customEmpty ? emptySnippet : undefined}
    aria-label="Media library"
    data-testid="grid"
/>
<button type="button" data-testid="after">After</button>
<button
    type="button"
    data-testid="remove-first"
    onclick={() => (items = items.slice(1))}
>
    Remove first
</button>
<p data-testid="selected">{multiple ? selectedKeys.join(",") : (selected ?? "")}</p>

{#if deleting === "confirm" || deleting === "confirm-slow"}
    <ConfirmDialog
        bind:open={confirmOpen}
        variant="danger"
        title="Delete this file?"
        message={confirming ? `${confirming.name} is removed for everyone.` : ""}
        confirmLabel="Delete"
        onconfirm={deleting === "confirm-slow"
            ? async () => {
                  await wait(20);
                  if (confirming) remove(confirming);
                  await wait(60);
              }
            : () => {
                  if (confirming) remove(confirming);
              }}
    />
{/if}
