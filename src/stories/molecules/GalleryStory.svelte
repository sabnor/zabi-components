<script lang="ts">
    import Download from '@lucide/svelte/icons/download';
    import ImageIcon from '@lucide/svelte/icons/image';
    import Share2 from '@lucide/svelte/icons/share-2';
    import Trash2 from '@lucide/svelte/icons/trash-2';
    import PhotoGrid from '../../components/molecules/PhotoGrid.svelte';
    import PhotoViewer from '../../components/molecules/PhotoViewer.svelte';
    import type { Photo, PhotoKey, PhotoViewerAction } from '../../components/util/photo.js';
    import { photoKey } from '../../components/util/photo.js';
    import { LONG_CAPTION, samplePhotos } from '../../lib/showcase/sample-photos';

    interface Props {
        /** How many photos. */
        count?: number;
        columns?: number;
        max?: number;
        selectable?: 'single' | 'multiple';
        /** Show the Add photo tile. */
        withAdd?: boolean;
        /** How many actions the viewer has: more than three puts the rest in a menu. */
        actionCount?: 0 | 2 | 4;
        /** Give the second photo a caption too long for two lines. */
        longCaption?: boolean;
        /** Start with the viewer open, at this photo (from 1). */
        openAt?: number;
        /** Width of the phone frame around the grid, in px. */
        frameWidth?: 320 | 360 | 390 | 800;
    }

    let {
        count = 12,
        columns,
        max,
        selectable,
        withAdd = false,
        actionCount = 0,
        longCaption = false,
        openAt,
        frameWidth = 360,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let photos = $state<Photo[]>(
        samplePhotos(count).map((photo, at) =>
            longCaption && at === 1 ? { ...photo, caption: LONG_CAPTION } : photo,
        ),
    );
    // svelte-ignore state_referenced_locally
    let index = $state(openAt ? openAt - 1 : 0);
    // svelte-ignore state_referenced_locally
    let open = $state(openAt !== undefined);
    let selected = $state<PhotoKey | null>(null);
    let selectedKeys = $state<PhotoKey[]>([]);
    let note = $state('Nothing done yet.');

    const all: PhotoViewerAction[] = [
        { id: 'share', label: 'Share', icon: Share2, onclick: (photo) => (note = `Share "${photo.alt}".`) },
        {
            id: 'delete',
            label: 'Delete',
            icon: Trash2,
            tone: 'danger',
            onclick: (photo) => {
                photos = photos.filter((candidate) => photoKey(candidate) !== photoKey(photo));
                note = `Deleted "${photo.alt}".`;
            },
        },
        { id: 'cover', label: 'Set as cover', icon: ImageIcon, onclick: (photo) => (note = `Cover: "${photo.alt}".`) },
        { id: 'download', label: 'Download', icon: Download, onclick: (photo) => (note = `Download "${photo.alt}".`) },
    ];
    const actions = $derived(all.slice(0, actionCount));
</script>

<!-- The grid in a phone-width frame; the viewer is an overlay on the whole
preview. View the story at a phone width to see the viewer as on a phone. -->
<div class="space-y-3">
    <div class="rounded-container border border-border bg-background p-4" style="width: {frameWidth}px;">
        <PhotoGrid
            {photos}
            {columns}
            {max}
            {selectable}
            bind:selected
            bind:selectedKeys
            aria-label="Quiz night photos"
            onopen={(at) => {
                index = at;
                open = true;
            }}
            onadd={withAdd ? () => (note = 'Add photo pressed: open your file picker here.') : undefined}
        />
    </div>
    <p class="text-sm text-description">
        {note}
        {#if selectable === 'single'}Selected: {selected ?? 'none'}.{/if}
        {#if selectable === 'multiple'}{selectedKeys.length} selected.{/if}
    </p>
</div>

<PhotoViewer {photos} bind:index bind:isOpen={open} {actions} />
