<script lang="ts">
    import MediaGrid from '../../components/molecules/MediaGrid.svelte';
    import type { MediaGridKey } from '../../components/util/media-grid.js';

    type Media = { id: string; name: string; url: string; kind: 'image' | 'video'; poster?: string };

    interface Props {
        /** How many items the library holds; 0 shows the empty state. */
        count?: number;
        multiple?: boolean;
        /** Show a delete button on every item but the first. */
        deletable?: boolean;
        loading?: boolean;
        disabled?: boolean;
        minTileSize?: number;
        /** Swedish strings, to show the translation hook. */
        translated?: boolean;
    }

    let {
        count = 12,
        multiple = false,
        deletable = true,
        loading = false,
        disabled = false,
        minTileSize = 96,
        translated = false,
    }: Props = $props();

    /** A flat colour with a number: a stand-in for a stored image, with no network. */
    function picture(index: number): string {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="hsl(${index * 31} 55% 55%)"/><text x="60" y="76" font-family="sans-serif" font-size="44" text-anchor="middle" fill="white">${index + 1}</text></svg>`;
        return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }

    function library(length: number): Media[] {
        return Array.from({ length }, (_, index) => {
            const video = index % 5 === 3;
            return {
                id: `file-${index + 1}`,
                name: video ? `clip-${index + 1}.mp4` : `photo-${index + 1}.jpg`,
                url: video ? `/media/clip-${index + 1}.mp4` : picture(index),
                kind: video ? 'video' : 'image',
                poster: video ? picture(index) : undefined,
            };
        });
    }

    // svelte-ignore state_referenced_locally
    let items = $state<Media[]>(library(count));
    let selected = $state<MediaGridKey | null>('file-2');
    let selectedKeys = $state<MediaGridKey[]>(['file-2', 'file-5']);
    let lastAction = $state('Nothing yet.');

    const swedish = {
        deleteLabel: (label: string) => `Ta bort ${label}`,
        videoLabel: (label: string) => `${label}, video`,
        loading: 'Laddar media',
        emptyTitle: 'Inga filer än',
        emptyDescription: 'Bilder och videor du laddar upp visas här.',
        keyboardHint: 'Flytta mellan objekten med piltangenterna.',
    };
</script>

<div class="space-y-3">
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
        {disabled}
        {minTileSize}
        strings={translated ? swedish : undefined}
        onselect={({ item, selected: on }) =>
            (lastAction = `${on ? 'Selected' : 'Cleared'} ${item.name}`)}
        ondelete={deletable
            ? (item) => {
                  // A real library confirms first; see the ConfirmDialog stories.
                  items = items.filter((candidate) => candidate.id !== item.id);
                  lastAction = `Deleted ${item.name}`;
              }
            : undefined}
        isItemDeletable={(item) => item.id !== 'file-1'}
        aria-label="Media library"
    />
    <p class="text-sm text-description">{lastAction}</p>
</div>
