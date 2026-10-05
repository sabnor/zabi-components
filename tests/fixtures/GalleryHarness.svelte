<script lang="ts">
    import PhotoGrid from "../../src/components/molecules/PhotoGrid.svelte";
    import PhotoViewer from "../../src/components/molecules/PhotoViewer.svelte";
    import type {
        Photo,
        PhotoGridSelectDetail,
        PhotoGridStrings,
        PhotoKey,
        PhotoViewerAction,
        PhotoViewerCloseReason,
        PhotoViewerStrings,
    } from "../../src/components/util/photo";

    /**
     * A PhotoGrid wired to a PhotoViewer, as an app wires them. `withGrid`
     * and `withViewer` leave one of them out.
     */
    interface Props {
        initialPhotos?: Photo[];
        count?: number;
        withGrid?: boolean;
        withViewer?: boolean;
        columns?: number;
        max?: number;
        selectable?: "single" | "multiple";
        initialSelected?: PhotoKey | null;
        withAdd?: boolean;
        handlesOpen?: boolean;
        gridStrings?: Partial<PhotoGridStrings>;
        onselect?: (detail: PhotoGridSelectDetail) => void;
        onadded?: () => void;
        onopened?: (index: number) => void;

        initialOpen?: boolean;
        initialIndex?: number;
        actions?: PhotoViewerAction[];
        portal?: boolean;
        label?: string;
        viewerStrings?: Partial<PhotoViewerStrings>;
        onclose?: (detail: { reason: PhotoViewerCloseReason }) => void;
    }

    /** A 1px image: nothing is fetched. jsdom loads no images; the tests fire `load` themselves. */
    const PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    const NAMES = ["Team at the table", "Score sheet", "The bar", "Trophy", "Question card", "Team by the door"];

    function make(total: number): Photo[] {
        return Array.from({ length: total }, (_, at) => ({
            id: `p${at + 1}`,
            src: `${PIXEL}#full-${at + 1}`,
            thumbSrc: `${PIXEL}#thumb-${at + 1}`,
            alt: `${NAMES[at % NAMES.length]}${at >= NAMES.length ? ` ${at + 1}` : ""}`,
            width: 1600,
            height: 1200,
            caption: at === 1 ? "Round three, taken from the corner table." : undefined,
        }));
    }

    let {
        initialPhotos,
        count = 6,
        withGrid = true,
        withViewer = true,
        columns,
        max,
        selectable,
        initialSelected = null,
        withAdd = false,
        handlesOpen = true,
        gridStrings,
        onselect,
        onadded,
        onopened,
        initialOpen = false,
        initialIndex = 0,
        actions,
        portal,
        label,
        viewerStrings,
        onclose,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let photos = $state<Photo[]>(initialPhotos ?? make(count));
    // svelte-ignore state_referenced_locally
    let index = $state(initialIndex);
    // svelte-ignore state_referenced_locally
    let open = $state(initialOpen);
    // svelte-ignore state_referenced_locally
    let selected = $state<PhotoKey | null>(initialSelected);
    let selectedKeys = $state<PhotoKey[]>([]);

    function show(at: number) {
        onopened?.(at);
        index = at;
        open = true;
    }
</script>

<div data-testid="host">
    <button type="button" data-testid="before">Before</button>
    <output data-testid="state"
        >{open ? "open" : "closed"}|{index}|{selected ?? "none"}|{selectedKeys.join(",")}|{photos.length}</output
    >
    {#if withGrid}
        <PhotoGrid
            {photos}
            {columns}
            {max}
            {selectable}
            bind:selected
            bind:selectedKeys
            {onselect}
            strings={gridStrings}
            onopen={handlesOpen ? show : undefined}
            onadd={withAdd ? () => onadded?.() : undefined}
            aria-label="Quiz night photos"
            data-testid="grid"
        />
    {:else}
        <button type="button" data-testid="opener" onclick={() => show(index)}>Open photos</button>
    {/if}
    <button type="button" data-testid="after">After</button>
    <button type="button" data-testid="remove-current" onclick={() => (photos = photos.filter((_, at) => at !== index))}>
        Remove current
    </button>
    <button type="button" data-testid="remove-all" onclick={() => (photos = [])}>Remove all</button>
    {#if withViewer}
        <PhotoViewer
            {photos}
            bind:index
            bind:isOpen={open}
            {actions}
            {portal}
            {label}
            strings={viewerStrings}
            {onclose}
            data-testid="viewer"
        />
    {/if}
</div>
