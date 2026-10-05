<script lang="ts">
    import { untrack } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Check from "@lucide/svelte/icons/check";
    import ImageOff from "@lucide/svelte/icons/image-off";
    import Maximize2 from "@lucide/svelte/icons/maximize-2";
    import Plus from "@lucide/svelte/icons/plus";
    import Skeleton from "../atoms/Skeleton.svelte";
    import { isDevBuild } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";
    import { columnCount, moveForKey, moveIndex } from "../util/media-grid.js";
    import {
        PHOTO_GRID_STRINGS,
        photoKey,
        visibleCount,
        type Photo,
        type PhotoGridSelectDetail,
        type PhotoGridStrings,
        type PhotoKey,
    } from "../util/photo.js";
    import { generateId } from "../util/ssr-safe.js";
    import { TOUCH_HIT_AREA } from "../util/touch-target.js";

    /**
     * A grid of square photo thumbnails. A press on one tells you which, so
     * you can open it in a `PhotoViewer`:
     *
     * ```svelte
     * <PhotoGrid {photos} max={9} onopen={(at) => { index = at; open = true; }} onadd={pickFiles} />
     * <PhotoViewer {photos} bind:index bind:isOpen={open} />
     * ```
     *
     * With `selectable` a press selects instead, for choosing a cover photo
     * (`single`) or photos to delete (`multiple`); each tile then has a small
     * button of its own that opens it. In `single` a press on the selected
     * photo changes nothing: the selection is never cleared by pressing it
     * again.
     *
     * The grid is one Tab stop; the arrow keys move between the tiles.
     *
     * Other attributes (`id`, `data-*`, ...) land on the host `<div>`; the
     * two ARIA names go to the list.
     */
    type Props = Omit<
        HTMLAttributes<HTMLDivElement>,
        // `onselect` is also a native event (text selection); ours replaces it.
        "class" | "aria-label" | "aria-labelledby" | "onselect"
    > & {
        photos: Photo[];
        /**
         * How many columns. Left out, it follows the width of the grid: 3
         * under 480px, 4 from there and 5 from 768px.
         */
        columns?: number;
        /**
         * Shows no more than this many photos. The last tile then says how
         * many more there are ("+12") and opens the viewer at its photo.
         */
        max?: number;
        /** Called with the photo's place in `photos` when one is opened. */
        onopen?: (index: number) => void;
        /**
         * Makes a press select: `single` for one photo, `multiple` for any
         * number, with a check mark on each selected tile.
         */
        selectable?: "single" | "multiple";
        /** Key of the selected photo, or `null`; supports `bind:selected`. Used with `selectable="single"`. */
        selected?: PhotoKey | null;
        /** Keys of the selected photos; supports `bind:selectedKeys`. Used with `selectable="multiple"`. */
        selectedKeys?: PhotoKey[];
        /** Called when a photo is selected or, in `multiple`, its selection is cleared. */
        onselect?: (detail: PhotoGridSelectDetail) => void;
        /**
         * Puts an "Add photo" tile first and is called when it is pressed.
         * Open your own file picker or an ImageUpload from it.
         */
        onadd?: () => void;
        /** Overrides for the built-in strings. */
        strings?: Partial<PhotoGridStrings>;
        /** Extra classes for the host element. */
        class?: string;
        "aria-label"?: string;
        "aria-labelledby"?: string;
    };

    let {
        photos,
        columns,
        max,
        onopen,
        selectable,
        selected = $bindable(null),
        selectedKeys = $bindable([]),
        onselect,
        onadd,
        strings,
        class: className = "",
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        ...restProps
    }: Props = $props();

    /** The add tile's place among the tile keys. No photo has this key: it is not an address. */
    const ADD_KEY = "\u0000add";
    type TileKey = PhotoKey;

    const text = $derived({ ...PHOTO_GRID_STRINGS, ...strings });
    const hintId = generateId("photo-grid-hint");

    const counts = $derived(visibleCount(photos.length, max));
    const shown = $derived(photos.slice(0, counts.shown));
    const multiple = $derived(selectable === "multiple");

    /** Every tile in order, by key: the add tile, then the photos shown. */
    const tileKeys = $derived<TileKey[]>([...(onadd ? [ADD_KEY] : []), ...shown.map(photoKey)]);

    $effect(() => {
        if (!isDevBuild()) return;
        const unnamed = photos.filter((photo) => !photo.alt?.trim()).length;
        if (unnamed > 0) {
            console.warn(
                `[zabi-components] PhotoGrid: ${unnamed} of ${photos.length} photos have no alt text. ` +
                    'Each is named "Photo 3 of 12" until it has one.',
            );
        }
    });

    function nameOf(photo: Photo, index: number): string {
        return photo.alt?.trim() || text.photoName(index + 1, photos.length);
    }

    let host: HTMLDivElement | undefined = $state();
    /** Thumbnails that have loaded, and those that failed; a changed address is tried again. */
    let loaded = $state<string[]>([]);
    let failed = $state<string[]>([]);

    /**
     * An image that was already there when the page started running (the
     * server sent it, the cache had it) fired its `load` before anything was
     * listening.
     */
    function settled(image: HTMLImageElement) {
        if (!image.complete) return;
        const address = image.getAttribute("src") ?? "";
        // Untracked: this runs as an attachment, which would otherwise run
        // again for every image each time one of the lists changes.
        untrack(() => {
            if (image.naturalWidth > 0) markLoaded(address);
            else markFailed(address);
        });
    }

    function markLoaded(address: string) {
        if (!loaded.includes(address)) loaded = [...loaded, address];
    }

    function markFailed(address: string) {
        if (!failed.includes(address)) failed = [...failed, address];
    }

    /**
     * The tile the arrow keys last reached. Only its buttons are in the Tab
     * order (a roving tabindex), so the grid is one stop however many photos
     * it holds.
     */
    let activeKey = $state<TileKey | null>(null);
    const tabbableKey = $derived.by(() => {
        if (activeKey !== null && tileKeys.includes(activeKey)) return activeKey;
        if (selectable === "single" && selected !== null && tileKeys.includes(selected)) return selected;
        return tileKeys[0] ?? null;
    });

    /** As in MediaGrid: the hint describes the tile focus arrives on, and only that one. */
    let focusInside = $state(false);
    let entryKey = $state<TileKey | null>(null);
    const describedKey = $derived(focusInside ? entryKey : tabbableKey);

    function handleTileFocus(key: TileKey) {
        // Runs before the host's own focusin, which sets `focusInside`.
        if (!focusInside) entryKey = key;
        activeKey = key;
    }

    function handleHostFocusOut(event: FocusEvent) {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !host?.contains(next)) focusInside = false;
    }

    function isSelected(key: PhotoKey): boolean {
        if (!selectable) return false;
        return multiple ? selectedKeys.includes(key) : selected === key;
    }

    function toggle(photo: Photo, index: number) {
        const key = photoKey(photo);
        const on = !isSelected(key);
        if (multiple) {
            selectedKeys = on
                ? [...selectedKeys, key]
                : selectedKeys.filter((candidate) => candidate !== key);
            onselect?.({ photo, index, selected: on, keys: selectedKeys });
        } else {
            // A single choice is never cleared by pressing it again; only the
            // checkbox-like `multiple` mode toggles off.
            if (!on) return;
            selected = key;
            onselect?.({ photo, index, selected: true, keys: [key] });
        }
    }

    /** The tile that stands for the photos not shown always opens: it is not one photo to select. */
    function press(photo: Photo, index: number, standsForMore: boolean) {
        if (selectable && !standsForMore) toggle(photo, index);
        else onopen?.(index);
    }

    function mainButtons(): HTMLElement[] {
        return host ? Array.from(host.querySelectorAll<HTMLElement>("[data-photo-grid-item]")) : [];
    }

    function handleKeydown(event: KeyboardEvent) {
        const tile = (event.target as HTMLElement).closest<HTMLElement>("[data-photo-grid-tile]");
        if (!tile || event.altKey || event.metaKey) return;
        const buttons = mainButtons();
        const index = buttons.findIndex((button) => tile.contains(button));
        if (index === -1) return;
        // The arrows follow what is on screen, which is mirrored in RTL.
        const move = moveForKey(event, getComputedStyle(tile).direction === "rtl");
        if (!move) return;
        // Also keeps the arrow keys from scrolling the page under the grid.
        event.preventDefault();
        const perRow = columnCount(buttons.map((button) => button.getBoundingClientRect().top));
        const target = moveIndex(index, move, perRow, buttons.length);
        if (target !== index) buttons[target]?.focus();
    }

    /**
     * The tile's radius is the container role's. What sits 4px inside a
     * corner of it (the check mark, the open button) takes that radius less
     * the 4px, so the two curves stay parallel.
     */
    const cornerMark =
        "absolute flex items-center justify-center rounded-[calc(var(--radius-container)-4px)]";

    /**
     * The tile's edge is an outline drawn inside it, not a border: a border
     * would move everything in the tile in by its own width, and by another
     * pixel when the tile is selected, and the marks would no longer be 4px
     * from the corner they are rounded for.
     */
    const tileButton =
        "focus-ring relative block size-full cursor-pointer overflow-hidden rounded-container bg-(--color-surface-2) transition-[outline-color,scale] duration-150 motion-reduce:transition-none";
</script>

<div
    bind:this={host}
    class={cn("group/photos @container relative", className)}
    data-photo-grid
    onfocusin={() => (focusInside = true)}
    onfocusout={handleHostFocusOut}
    {...restProps}
>
    <!-- The reset removes the markers, and Safari then drops the list role. -->
    <!-- The gap is in px: it is the line between two photos, not text spacing. -->
    <!-- svelte-ignore a11y_no_redundant_roles, a11y_no_noninteractive_element_interactions -->
    <ul
        role="list"
        class={cn(
            "m-0 grid list-none gap-[4px] p-0",
            // By the width of the grid itself, so it is right in a sheet or a
            // sidebar too. In px: the count must not change with the text size.
            columns === undefined && "grid-cols-3 @[480px]:grid-cols-4 @[768px]:grid-cols-5",
        )}
        style:grid-template-columns={columns === undefined
            ? undefined
            : `repeat(${Math.max(1, Math.floor(columns))}, minmax(0, 1fr))`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        onkeydown={handleKeydown}
    >
        {#if onadd}
            <li class="relative aspect-square" data-photo-grid-tile onfocusin={() => handleTileFocus(ADD_KEY)}>
                <!-- A dashed edge the tile depends on to be seen, so in the
                control-border colour; the label is shown, not only read out. -->
                <button
                    type="button"
                    class="focus-ring flex size-full cursor-pointer flex-col items-center justify-center gap-1 rounded-container border border-dashed border-control-border bg-transparent p-1 text-center text-xs font-medium text-body transition-colors duration-150 hover:bg-surface-hover active:bg-surface-active motion-reduce:transition-none"
                    aria-describedby={describedKey === ADD_KEY ? hintId : undefined}
                    tabindex={tabbableKey === ADD_KEY ? 0 : -1}
                    data-photo-grid-item
                    data-photo-grid-add
                    onclick={() => onadd?.()}
                >
                    <Plus size={24} class="shrink-0" aria-hidden="true" />
                    <span class="[overflow-wrap:anywhere]">{text.addPhoto}</span>
                </button>
            </li>
        {/if}
        {#each shown as photo, index (photoKey(photo))}
            {@const key = photoKey(photo)}
            {@const name = nameOf(photo, index)}
            {@const source = photo.thumbSrc ?? photo.src}
            {@const more = counts.hidden > 0 && index === shown.length - 1}
            {@const on = isSelected(key)}
            {@const tabindex = key === tabbableKey ? 0 : -1}
            {@const selects = !!selectable && !more}
            <li
                class="relative aspect-square"
                data-photo-grid-tile
                data-selected={on ? "" : undefined}
                onfocusin={() => handleTileFocus(key)}
            >
                <!-- Selection is a thicker edge and a check mark, not a colour
                alone. `data-photo-key` is how a PhotoViewer finds the tile of
                the photo it shows, to give focus back to it. -->
                <button
                    type="button"
                    class={cn(
                        tileButton,
                        on
                            ? "outline-2 -outline-offset-2 outline-(--color-action-primary)"
                            : "outline-1 -outline-offset-1 outline-(--color-border) hover:outline-(--color-border-medium) active:scale-[0.98] motion-reduce:active:scale-100",
                    )}
                    aria-label={more ? `${name}, ${text.morePhotos(counts.hidden)}` : name}
                    aria-pressed={selects ? on : undefined}
                    aria-describedby={key === describedKey ? hintId : undefined}
                    {tabindex}
                    data-photo-grid-item
                    data-photo-key={key}
                    onclick={() => press(photo, index, more)}
                >
                    {#if failed.includes(source)}
                        <span
                            class="flex size-full items-center justify-center text-description"
                            data-photo-grid-fallback
                        >
                            <ImageOff size={24} aria-hidden="true" />
                        </span>
                    {:else}
                        {#if !loaded.includes(source)}
                            <span class="absolute inset-0" aria-hidden="true" data-photo-grid-skeleton>
                                <Skeleton variant="block" class="h-full rounded-none" />
                            </span>
                        {/if}
                        <!-- The button carries the name; the image would only repeat it. -->
                        <img
                            src={source}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            draggable="false"
                            class={cn(
                                "relative size-full object-cover transition-opacity duration-200 motion-reduce:transition-none",
                                loaded.includes(source) ? "opacity-100" : "opacity-0",
                            )}
                            onload={() => markLoaded(source)}
                            onerror={() => markFailed(source)}
                            {@attach settled}
                        />
                    {/if}
                    {#if on}
                        <span
                            class={cn(cornerMark, "start-[4px] top-[4px] size-6 bg-action-primary text-action-primary")}
                            data-photo-grid-check
                        >
                            <Check size={14} aria-hidden="true" />
                        </span>
                    {/if}
                    {#if more}
                        <!-- The photo is dimmed and the number sits on an opaque
                        plate, so it reads on any photo in either theme. The
                        name says it in words. -->
                        <span
                            class="absolute inset-0 flex items-center justify-center bg-overlay"
                            aria-hidden="true"
                            data-photo-grid-more
                        >
                            <span
                                class="rounded-control border border-control-border bg-surface-overlay px-2 py-1 text-base font-semibold text-headline"
                            >
                                +{counts.hidden}
                            </span>
                        </span>
                    {/if}
                </button>
                {#if selects && onopen}
                    <!-- Beside the tile's button, not inside it. An opaque
                    plate, so it reads over any photo; on a coarse pointer an
                    invisible layer widens what takes the tap to 44px. -->
                    <button
                        type="button"
                        class={cn(
                            cornerMark,
                            TOUCH_HIT_AREA,
                            "focus-ring bottom-[4px] end-[4px] size-7 cursor-pointer border border-control-border bg-surface-overlay text-body transition-colors duration-150 hover:text-headline motion-reduce:transition-none",
                        )}
                        aria-label={text.openPhoto(name)}
                        {tabindex}
                        data-photo-grid-open
                        onclick={() => onopen?.(index)}
                    >
                        <Maximize2 size={14} aria-hidden="true" />
                    </button>
                {/if}
            </li>
        {/each}
    </ul>
    <!-- Hidden until the grid has keyboard focus: a sighted keyboard user
    needs it as much as a screen reader user, and a pointer user does not. -->
    <p
        id={hintId}
        class="mt-2 hidden text-xs text-description group-has-[:focus-visible]/photos:block"
        data-photo-grid-hint
    >
        {text.keyboardHint}
    </p>
</div>
