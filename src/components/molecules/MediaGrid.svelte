<script lang="ts" generics="T">
    import { tick, untrack, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { Check, ImageOff, Play, Trash2 } from "@lucide/svelte";
    import Skeleton from "../atoms/Skeleton.svelte";
    import EmptyState from "./EmptyState.svelte";
    import { cn } from "../util/cn.js";
    import type { CollapsibleHeadingLevel } from "../util/collapsible.js";
    import { generateId } from "../util/ssr-safe.js";
    import {
        MEDIA_GRID_STRINGS,
        columnCount,
        isVideoUrl,
        moveIndex,
        type MediaGridItemType,
        type MediaGridKey,
        type MediaGridMove,
        type MediaGridSelectDetail,
        type MediaGridStrings,
    } from "../util/media-grid.js";

    /** Other attributes (`id`, `data-*`, ...) land on the host `<div>`; the two ARIA names go to the `<ul>`. */
    type Props = Omit<
        HTMLAttributes<HTMLDivElement>,
        // `onselect` is also a native event (text selection); ours replaces it.
        "class" | "aria-label" | "aria-labelledby" | "onselect"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        items: T[];
        /** Stable identity of an item. Tiles are keyed by it, and selection is stored as keys. */
        getKey: (item: T) => MediaGridKey;
        /** Name of an item: the image's `alt`, and part of the delete button's name. */
        getLabel: (item: T) => string;
        /** Address of the image or video. */
        getUrl: (item: T) => string;
        /** Whether an item is a video. Without it, or when it returns nothing, the URL's extension decides. */
        getType?: (item: T) => MediaGridItemType | undefined;
        /** A still image for a video, shown instead of loading the video's first frame. */
        getPoster?: (item: T) => string | undefined;
        /** Key of the selected item, or `null`; supports `bind:selected`. Used unless `multiple`. */
        selected?: MediaGridKey | null;
        /** Any number of items can be selected; the keys are in `selectedKeys`. */
        multiple?: boolean;
        /** Keys of the selected items; supports `bind:selectedKeys`. Used when `multiple`. */
        selectedKeys?: MediaGridKey[];
        /** Called when an item is selected or its selection is cleared. */
        onselect?: (detail: MediaGridSelectDetail<T>) => void;
        /**
         * Shows a delete button on each item and reports which one was
         * activated. The grid neither confirms nor removes: confirm, then
         * take the item out of `items`.
         */
        ondelete?: (item: T) => void;
        /** Leaves the delete button off one item. */
        isItemDeletable?: (item: T) => boolean;
        /** Adds placeholder tiles after the items, for a first load or a next page. */
        loading?: boolean;
        /** How many placeholder tiles `loading` shows. */
        loadingCount?: number;
        /** Replaces the built-in empty state. */
        empty?: Snippet;
        /**
         * Heading element of the built-in empty state's title. 3 by default:
         * the grid usually sits under a Modal or section title.
         */
        emptyHeadingLevel?: CollapsibleHeadingLevel;
        /** Disables selecting and deleting. */
        disabled?: boolean;
        /** Smallest tile edge, as px or any CSS length. The grid fits as many columns as that allows. */
        minTileSize?: number | string;
        /** Overrides for the built-in strings. */
        strings?: Partial<MediaGridStrings>;
        "aria-label"?: string;
        "aria-labelledby"?: string;
    };

    let {
        class: className = "",
        items,
        getKey,
        getLabel,
        getUrl,
        getType,
        getPoster,
        selected = $bindable(null),
        multiple = false,
        selectedKeys = $bindable([]),
        onselect,
        ondelete,
        isItemDeletable,
        loading = false,
        loadingCount = 8,
        empty,
        emptyHeadingLevel = 3,
        disabled = false,
        minTileSize = 96,
        strings,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        ...restProps
    }: Props = $props();

    /** How long to wait for a confirmation dialog to give focus up after a delete. */
    const FOCUS_WAIT_MS = 2000;

    const text = $derived({ ...MEDIA_GRID_STRINGS, ...strings });
    const keys = $derived(items.map(getKey));
    const tileSize = $derived(
        typeof minTileSize === "number" ? `${minTileSize}px` : minTileSize,
    );

    const hintId = generateId("media-grid-hint");

    let host: HTMLDivElement | undefined = $state();
    /** URLs that failed to load; a changed URL is tried again. */
    let failed = $state<string[]>([]);

    /**
     * The tile the arrow keys last reached. Only its buttons are in the Tab
     * order (a roving tabindex), so the grid is one stop however many items
     * it holds.
     */
    let activeKey = $state<MediaGridKey | null>(null);
    const tabbableKey = $derived.by(() => {
        if (activeKey !== null && keys.includes(activeKey)) return activeKey;
        if (!multiple && selected !== null && keys.includes(selected)) return selected;
        return keys[0] ?? null;
    });

    /**
     * Nothing about a list of buttons says that the arrow keys work, so the
     * item focus arrives on is described by the hint. Only that one: a
     * description on every item would be read again at each arrow press.
     * While focus is outside, that item is the Tab stop; once inside, it
     * stays the item focus came in on until focus leaves.
     */
    let focusInside = $state(false);
    let entryKey = $state<MediaGridKey | null>(null);
    const describedKey = $derived(focusInside ? entryKey : tabbableKey);

    function handleTileFocus(key: MediaGridKey) {
        // Runs before the host's own focusin, which sets `focusInside`.
        if (!focusInside) entryKey = key;
        activeKey = key;
    }

    function handleHostFocusOut(event: FocusEvent) {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !host?.contains(next)) focusInside = false;
    }

    function isSelected(key: MediaGridKey): boolean {
        return multiple ? selectedKeys.includes(key) : selected === key;
    }

    function isVideo(entry: T): boolean {
        const type = getType?.(entry);
        return type ? type === "video" : isVideoUrl(getUrl(entry));
    }

    function isDeletable(entry: T): boolean {
        return !!ondelete && (isItemDeletable?.(entry) ?? true);
    }

    function tileButtons(): HTMLElement[] {
        return host
            ? Array.from(host.querySelectorAll<HTMLElement>("[data-media-grid-item]"))
            : [];
    }

    function toggle(entry: T) {
        if (disabled) return;
        const key = getKey(entry);
        const on = !isSelected(key);
        if (multiple) {
            selectedKeys = on
                ? [...selectedKeys, key]
                : selectedKeys.filter((candidate) => candidate !== key);
            onselect?.({ item: entry, selected: on, keys: selectedKeys });
        } else {
            // A single choice is never cleared by pressing it again; only the
            // checkbox-like `multiple` mode toggles off. Removing the item, or
            // the parent through the binding, still clears it.
            if (!on) return;
            selected = key;
            onselect?.({ item: entry, selected: true, keys: [key] });
        }
    }

    /** The item whose delete was last requested; its removal is this grid's doing. */
    let pendingDelete: MediaGridKey | null = null;

    function requestDelete(entry: T) {
        if (disabled || !isDeletable(entry)) return;
        pendingDelete = getKey(entry);
        ondelete?.(entry);
    }

    const KEY_MOVES: Record<string, MediaGridMove> = {
        ArrowUp: "up",
        ArrowDown: "down",
        Home: "rowStart",
        End: "rowEnd",
    };

    function handleKeydown(event: KeyboardEvent) {
        const tile = (event.target as HTMLElement).closest<HTMLElement>(
            "[data-media-grid-tile]",
        );
        if (!tile || event.altKey || event.metaKey) return;
        const buttons = tileButtons();
        const index = buttons.findIndex((button) => tile.contains(button));
        if (index === -1) return;

        if (event.key === "Delete" && !event.ctrlKey) {
            const entry = items[index];
            if (entry !== undefined && isDeletable(entry) && !disabled) {
                event.preventDefault();
                requestDelete(entry);
            }
            return;
        }

        let move: MediaGridMove | undefined;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            // The arrows follow what is on screen, which is mirrored in RTL.
            const rtl = getComputedStyle(tile).direction === "rtl";
            move = (event.key === "ArrowLeft") !== rtl ? "left" : "right";
        } else if (event.ctrlKey && event.key === "Home") {
            move = "first";
        } else if (event.ctrlKey && event.key === "End") {
            move = "last";
        } else if (!event.ctrlKey) {
            move = KEY_MOVES[event.key];
        }
        if (!move) return;

        // Also keeps the arrow keys from scrolling a Modal body under the grid.
        event.preventDefault();
        const columns = columnCount(
            buttons.map((button) => button.getBoundingClientRect().top),
        );
        const target = moveIndex(index, move, columns, buttons.length);
        if (target !== index) buttons[target]?.focus();
    }

    let focusFrame: number | undefined;

    function stopWaitingForFocus() {
        if (focusFrame !== undefined) cancelAnimationFrame(focusFrame);
        focusFrame = undefined;
    }

    function focusLost(): boolean {
        const active = document.activeElement;
        return !active || active === document.body;
    }

    /** With nothing left, the host takes focus so it does not land on `<body>`. */
    function focusTile(key: MediaGridKey | null) {
        const index = key === null ? -1 : keys.indexOf(key);
        (tileButtons()[index] ?? host)?.focus();
    }

    /**
     * Removing an item removes the node that had focus, and the browser then
     * drops focus on `<body>`. Hand it to the item that took its place.
     *
     * A delete is usually confirmed in a dialog, and the dialog may still be
     * open when the item goes: focus is then inside the dialog, and is lost
     * only when the dialog closes and cannot return it to a delete button
     * that no longer exists. Nothing fires at that moment, so the grid looks
     * for it frame by frame for a short while. It never takes focus from an
     * element that has it.
     */
    let previousKeys: MediaGridKey[] = [];
    $effect.pre(() => {
        const current = keys;
        untrack(() => {
            const before = previousKeys;
            previousKeys = current;
            if (!host) return;

            const focusInside = host.contains(document.activeElement);
            const focusedGone =
                focusInside && activeKey !== null && !current.includes(activeKey)
                    ? activeKey
                    : null;
            const deletedGone =
                pendingDelete !== null && !current.includes(pendingDelete)
                    ? pendingDelete
                    : null;
            if (deletedGone !== null) pendingDelete = null;
            const gone = focusedGone ?? deletedGone;
            if (gone === null || !before.includes(gone)) return;

            const target =
                current[Math.min(before.indexOf(gone), current.length - 1)] ?? null;
            activeKey = target;

            void tick().then(() => {
                if (focusLost()) {
                    focusTile(target);
                    return;
                }
                if (deletedGone === null || host?.contains(document.activeElement)) return;

                stopWaitingForFocus();
                const deadline = performance.now() + FOCUS_WAIT_MS;
                const check = () => {
                    focusFrame = undefined;
                    if (focusLost()) {
                        focusTile(target);
                    } else if (
                        !host?.contains(document.activeElement) &&
                        performance.now() < deadline
                    ) {
                        focusFrame = requestAnimationFrame(check);
                    }
                };
                focusFrame = requestAnimationFrame(check);
            });
        });
    });

    $effect(() => stopWaitingForFocus);

    const badgeClasses =
        "pointer-events-none absolute flex size-6 items-center justify-center";
    // Nested corners: a mark in the corner of a tile is 0.25rem (`start-1
    // top-1`) inside the tile's border, so its radius is the tile's less that
    // gap. The border is 2px on a selected tile, where the check is, and 1px
    // otherwise. A pill there would need a tile radius of 18px.
    const CHECK_RADIUS = "rounded-[calc(var(--radius-container)-0.25rem-2px)]";
    const VIDEO_RADIUS = "rounded-[calc(var(--radius-container)-0.25rem-1px)]";
</script>

<div
    bind:this={host}
    tabindex="-1"
    class={cn("group/media focus-ring relative rounded-container", className)}
    onfocusin={() => (focusInside = true)}
    onfocusout={handleHostFocusOut}
    data-disabled={disabled ? "" : undefined}
    {...restProps}
>
    {#if items.length === 0 && !loading}
        {#if empty}
            {@render empty()}
        {:else}
            <EmptyState
                title={text.emptyTitle}
                description={text.emptyDescription}
                size="compact"
                headingLevel={emptyHeadingLevel}
            />
        {/if}
    {:else}
        <!-- The reset removes the markers, and Safari then drops the list role. -->
        <!-- svelte-ignore a11y_no_redundant_roles, a11y_no_noninteractive_element_interactions -->
        <ul
            role="list"
            class="m-0 grid list-none gap-2 p-0"
            style:grid-template-columns="repeat(auto-fill, minmax(min({tileSize}, 100%), 1fr))"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-busy={loading ? "true" : undefined}
            onkeydown={handleKeydown}
        >
            {#each items as entry (getKey(entry))}
                {@const key = getKey(entry)}
                {@const label = getLabel(entry)}
                {@const url = getUrl(entry)}
                {@const video = isVideo(entry)}
                {@const poster = video ? getPoster?.(entry) : undefined}
                {@const source = poster ?? url}
                {@const on = isSelected(key)}
                {@const tabindex = key === tabbableKey ? 0 : -1}
                <li
                    class="relative aspect-square"
                    data-media-grid-tile
                    data-selected={on ? "" : undefined}
                    onfocusin={() => handleTileFocus(key)}
                >
                    <!-- Selection is a thicker border and a check mark, not
                    a colour alone. -->
                    <button
                        type="button"
                        class={cn(
                            "focus-ring relative block size-full cursor-pointer overflow-hidden rounded-container border bg-surface-2 transition-colors duration-150 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50",
                            on
                                ? "border-2 border-action-primary"
                                : "border-border enabled:hover:border-border-medium enabled:active:scale-[0.98]",
                        )}
                        aria-pressed={on}
                        aria-label={video ? text.videoLabel(label) : label}
                        aria-describedby={key === describedKey ? hintId : undefined}
                        {tabindex}
                        {disabled}
                        data-media-grid-item
                        onclick={() => toggle(entry)}
                    >
                        {#if failed.includes(source)}
                            <span
                                class="flex size-full items-center justify-center text-description"
                                data-media-grid-fallback
                            >
                                <ImageOff size={24} aria-hidden="true" />
                            </span>
                        {:else if video && !poster}
                            <!-- A still first frame: never plays, so there is
                            no motion to reduce and no sound. The name is on
                            the button. -->
                            <video
                                src={url}
                                muted
                                playsinline
                                preload="metadata"
                                tabindex="-1"
                                aria-hidden="true"
                                class="pointer-events-none size-full object-cover"
                                onerror={() => (failed = [...failed, source])}
                            ></video>
                        {:else}
                            <img
                                src={source}
                                alt={label}
                                loading="lazy"
                                decoding="async"
                                draggable="false"
                                class="size-full object-cover"
                                onerror={() => (failed = [...failed, source])}
                            />
                        {/if}
                        {#if on}
                            <span
                                class={cn(
                                    badgeClasses,
                                    CHECK_RADIUS,
                                    "start-1 top-1 bg-action-primary text-action-primary",
                                )}
                                data-media-grid-check
                            >
                                <Check size={14} aria-hidden="true" />
                            </span>
                        {/if}
                        {#if video}
                            <!-- Opaque, so it reads over any frame. Assistive
                            technology gets "video" from the button's name. -->
                            <span
                                class={cn(
                                    badgeClasses,
                                    VIDEO_RADIUS,
                                    "bottom-1 start-1 border border-border-overlay bg-surface-overlay text-body",
                                )}
                                data-media-grid-video
                            >
                                <Play size={12} aria-hidden="true" />
                            </span>
                        {/if}
                    </button>
                    {#if isDeletable(entry)}
                        <!-- Beside the item's button, not inside it, and
                        always visible: hover cannot reveal it on a touch
                        screen. On the end corner, so it mirrors in a
                        right-to-left layout. On a coarse pointer the
                        pseudo-element widens what takes the tap to 44px
                        without changing the 28px that is drawn, so a near
                        miss no longer toggles the selection. -->
                        <button
                            type="button"
                            class="focus-ring focus-ring--danger absolute end-1 top-1 flex size-7 cursor-pointer before:absolute before:hidden before:-inset-[9px] before:content-[''] pointer-coarse:before:block items-center justify-center rounded-control border border-border-overlay bg-surface-overlay text-body transition-colors duration-150 enabled:hover:text-error-text motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={text.deleteLabel(label)}
                            {tabindex}
                            {disabled}
                            data-media-grid-delete
                            onclick={() => requestDelete(entry)}
                        >
                            <Trash2 size={14} aria-hidden="true" />
                        </button>
                    {/if}
                </li>
            {/each}
            {#if loading}
                {#each { length: loadingCount } as _, index (index)}
                    <!-- One status below speaks for all of them. -->
                    <li class="aspect-square" aria-hidden="true" data-media-grid-skeleton>
                        <Skeleton variant="block" class="h-full rounded-container" />
                    </li>
                {/each}
            {/if}
        </ul>
        <!-- Hidden until the grid has keyboard focus: a sighted keyboard user
        needs it as much as a screen reader user, and a pointer user does not.
        It describes the item focus enters on whether it is shown or not. -->
        <p
            id={hintId}
            class="mt-2 hidden text-xs text-description group-has-[:focus-visible]/media:block"
            data-media-grid-hint
        >
            {text.keyboardHint}
        </p>
    {/if}

    <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {loading ? text.loading : ""}
    </div>
</div>
