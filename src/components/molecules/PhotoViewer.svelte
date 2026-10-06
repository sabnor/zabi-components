<script lang="ts">
    import { tick, untrack } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import ChevronLeft from "@lucide/svelte/icons/chevron-left";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import Ellipsis from "@lucide/svelte/icons/ellipsis";
    import ImageOff from "@lucide/svelte/icons/image-off";
    import X from "@lucide/svelte/icons/x";
    import Button from "../atoms/Button.svelte";
    import IconButton from "../atoms/IconButton.svelte";
    import Spinner from "../atoms/Spinner.svelte";
    import Dropdown from "./Dropdown.svelte";
    import { isDevBuild } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";
    import {
        focusFirstElement,
        joinOverlayStack,
        recoverStrayFocus,
        returnFocus,
        saveFocus,
    } from "../util/focus-utils.js";
    import { lockBodyScroll, trapTabKey } from "../util/overlay.js";
    import {
        clampIndex,
        doubleTapTransform,
        dragAxis,
        isDoubleTap,
        isZoomed,
        panBy,
        PHOTO_VIEWER_STRINGS,
        photoKey,
        pinchSample,
        pinchTransform,
        resist,
        REST,
        settleZoom,
        splitActions,
        swipeCloses,
        swipeTurn,
        TAP_MS,
        TAP_SLOP,
        ZOOM_STEP,
        zoomAbout,
        type Photo,
        type PhotoTransform,
        type PhotoViewerAction,
        type PhotoViewerCloseReason,
        type PhotoViewerStrings,
        type PinchSample,
        type Point,
        type Size,
    } from "../util/photo.js";
    import { portal as portalTo } from "../util/portal.js";
    import { generateId } from "../util/ssr-safe.js";
    import { isRtl } from "../util/radio-keys.js";
    import { createVelocityTracker, FLICK_VELOCITY, timeOf } from "../util/sheet-drag.js";

    /**
     * Photos one at a time, on the whole screen: swipe or use the arrows to
     * go between them, pinch or double tap to look closer, swipe down or
     * press Escape to leave.
     *
     * ```svelte
     * <PhotoGrid {photos} onopen={(at) => { index = at; open = true; }} />
     * <PhotoViewer {photos} bind:index bind:isOpen={open} actions={[share, remove]} />
     * ```
     *
     * It is a modal dialog, on the same footing as Modal, Drawer and
     * BottomSheet. When it closes, focus goes to the tile of the photo that
     * was showing, if the `PhotoGrid` it was opened from shows it; otherwise
     * to whatever opened it.
     *
     * It is dark in both themes: the photos are on black. Nothing in it is
     * written on that black: every control, the counter and the caption sit
     * on plates in the theme's own surface colour, so they read over any
     * photo in either theme.
     *
     * Other attributes (`id`, `data-*`, ...) land on the `role="dialog"` panel.
     */
    type Props = Omit<
        HTMLAttributes<HTMLDivElement>,
        // `onclose` is also a DOM event handler; ours carries a reason instead.
        "class" | "onclose" | "aria-label"
    > & {
        photos: Photo[];
        /** Place in `photos` of the photo that is showing. Supports `bind:index`. */
        index?: number;
        isOpen?: boolean;
        /**
         * Things to do with the photo that is showing. Up to three are
         * buttons in a bar under the photo; with more, two are, and the
         * rest are in a menu. The viewer does nothing by itself: each action
         * is your own function.
         */
        actions?: PhotoViewerAction[];
        /**
         * Render the overlay in `document.body`, so an ancestor with a
         * transform, filter or clipped overflow cannot trap it; pass `false`
         * to render in place.
         */
        portal?: boolean;
        /** Fired when the viewer closes itself, with what the user did. */
        onclose?: (detail: { reason: PhotoViewerCloseReason }) => void;
        /** Accessible name of the dialog. */
        label?: string;
        /** Overrides for the built-in strings. */
        strings?: Partial<PhotoViewerStrings>;
        /** Extra classes for the dialog panel. */
        class?: string;
    };

    let {
        photos,
        index = $bindable<Exclude<Props["index"], undefined>>(),
        isOpen = $bindable<Exclude<Props["isOpen"], undefined>>(),
        actions = [],
        portal = true,
        onclose,
        label = "Photo viewer",
        strings,
        class: className = "",
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (index === undefined) index = 0;
        if (isOpen === undefined) isOpen = false;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    /** Room between two photos while one is swiped to the next, in px. */
    const GAP = 16;
    /** How far an arrow key pans a zoomed photo, in px. */
    const KEY_PAN = 64;
    /** A photo that loads faster than this never shows a spinner. */
    const SLOW_MS = 400;

    const text = $derived({ ...PHOTO_VIEWER_STRINGS, ...strings });
    const count = $derived(photos.length);
    const current = $derived(clampIndex(index, count));
    const photo = $derived<Photo | undefined>(photos[current]);
    const nameOf = (item: Photo, at: number) =>
        item.alt?.trim() || text.photoName(at + 1, photos.length);

    /** The photo showing and the one on either side of it, each with where it stands. */
    const slides = $derived(
        [-1, 0, 1]
            .map((slot) => ({ slot, at: current + slot, item: photos[current + slot] }))
            .filter((slide): slide is { slot: number; at: number; item: Photo } => !!slide.item),
    );

    const split = $derived(splitActions(actions));

    let root = $state<HTMLDivElement>();
    let panel = $state<HTMLDivElement>();
    let stage = $state<HTMLDivElement>();
    let captionText = $state<HTMLParagraphElement>();
    let focusActive = false;
    /** Position among the open overlays; lifts a viewer opened later above the earlier ones. */
    let depth = $state(0);
    /** What had focus when the viewer opened. */
    let opener: Element | null = null;
    /**
     * The grid it was in. Kept apart from the opener: when the photo that was
     * opened from is deleted, its tile leaves the page and no longer leads to
     * the grid.
     */
    let openerGrid: Element | null = null;
    const statusId = generateId("photo-viewer-status");
    let rtl = $state(false);

    // --- Loading -----------------------------------------------------------

    /** Full images that have loaded, and those that failed. */
    let loaded = $state<string[]>([]);
    let failed = $state<string[]>([]);
    /** Bumped by Retry, so the image element is made again and asks again. */
    let attempts = $state<Record<string, number>>({});
    /** The photo showing has been loading for a while. */
    let slow = $state(false);

    function markLoaded(source: string) {
        if (!loaded.includes(source)) loaded = [...loaded, source];
    }

    function markFailed(source: string) {
        if (!failed.includes(source)) failed = [...failed, source];
    }

    /** An image that was complete before anything was listening. */
    function settled(image: HTMLImageElement) {
        if (!image.complete) return;
        const source = image.getAttribute("src") ?? "";
        // Untracked: this runs as an attachment, which would otherwise run
        // again for every image each time one of the lists changes.
        untrack(() => {
            if (image.naturalWidth > 0) markLoaded(source);
            else markFailed(source);
        });
    }

    function retry(source: string) {
        failed = failed.filter((candidate) => candidate !== source);
        attempts = { ...attempts, [source]: (attempts[source] ?? 0) + 1 };
        // The button that was pressed goes with the message it was in: the
        // dialog takes its focus, so it is not dropped onto the page.
        panel?.focus({ preventScroll: true });
    }

    $effect(() => {
        const source = photo?.src;
        slow = false;
        if (!isOpen || !source || loaded.includes(source) || failed.includes(source)) return;
        const timer = setTimeout(() => (slow = true), SLOW_MS);
        return () => clearTimeout(timer);
    });

    // --- Where the photo is ------------------------------------------------

    let zoom = $state<PhotoTransform>(REST);
    /** Sideways travel of a swipe between photos, and downward travel of a swipe to close, in px. */
    let dragX = $state(0);
    let dragY = $state(0);
    /** Whether the next change of position is eased. Off while a finger is moving it. */
    let animating = $state(false);

    const zoomed = $derived(isZoomed(zoom));

    function viewSize(): Size {
        return { width: stage?.clientWidth ?? 0, height: stage?.clientHeight ?? 0 };
    }

    /** The size of the photo showing at scale 1: its laid-out box, which transforms do not change. */
    function fit(): Size {
        const box = stage?.querySelector<HTMLElement>("[data-photo-viewer-current] [data-photo-viewer-box]");
        return { width: box?.offsetWidth ?? 0, height: box?.offsetHeight ?? 0 };
    }

    /** A point on the screen, measured from the centre of the stage. */
    function fromCentre(clientX: number, clientY: number): Point {
        const rect = stage?.getBoundingClientRect();
        if (!rect) return { x: 0, y: 0 };
        return { x: clientX - rect.left - rect.width / 2, y: clientY - rect.top - rect.height / 2 };
    }

    function setZoom(next: PhotoTransform, eased: boolean) {
        animating = eased;
        zoom = next;
    }

    /**
     * Shows the photo `turn` places on (1 is next, -1 previous). The photo
     * that comes in starts from where it stood beside the one showing, plus
     * however far a swipe had already pulled it, and is eased to the middle.
     */
    async function go(turn: number) {
        const target = current + turn;
        if (turn === 0 || target < 0 || target >= count) {
            animating = true;
            dragX = 0;
            return;
        }
        const step = (viewSize().width + GAP) * (rtl ? -1 : 1) * Math.sign(turn);
        animating = false;
        zoom = REST;
        // However the photo was changed (a key, a swipe, a button): the next caption starts folded.
        captionOpen = false;
        index = target;
        dragX = dragX + step;
        await tick();
        requestAnimationFrame(() => {
            animating = true;
            dragX = 0;
        });
    }

    function goTo(target: number) {
        const next = clampIndex(target, count);
        if (next === current || next === -1) return;
        // Further than one photo away there is nothing to slide past.
        if (Math.abs(next - current) === 1) void go(next - current);
        else {
            animating = false;
            zoom = REST;
            dragX = 0;
            captionOpen = false;
            index = next;
        }
    }

    // --- Pointers ------------------------------------------------------------

    type Gesture =
        | { kind: "pending"; start: Point; at: Moment; base: PhotoTransform }
        | { kind: "pan"; start: Point; base: PhotoTransform }
        | { kind: "swipe"; start: Point }
        | { kind: "close"; start: Point }
        | { kind: "pinch"; from: PinchSample; base: PhotoTransform }
        | { kind: "spent" };

    const pointers = new Map<number, Point>();
    let gesture: Gesture | null = null;
    let lastTap: { at: Moment; point: Point } | null = null;
    const speedX = createVelocityTracker();
    const speedY = createVelocityTracker();

    /**
     * When a pointer event happened. `time` is the event's own, which is
     * when the finger touched or lifted; `clock` is when it was handled,
     * later by however busy the page is. A tap is timed by the first, as a
     * flick is: handled late, two quick taps were two single taps.
     */
    interface Moment {
        time: number;
        clock: number;
    }
    const momentOf = (event: Event): Moment => ({ time: timeOf(event), clock: performance.now() });
    /** Some browsers hand every event of one frame the same stamp: then the clock says how long. */
    const elapsed = (from: Moment, to: Moment) =>
        to.time !== from.time ? to.time - from.time : to.clock - from.clock;

    function pinchNow(): PinchSample {
        const [first, second] = [...pointers.values()];
        return pinchSample(fromCentre(first.x, first.y), fromCentre(second.x, second.y));
    }

    function handlePointerDown(event: PointerEvent) {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        if (pointers.size >= 2) return;
        try {
            stage?.setPointerCapture(event.pointerId);
        } catch {
            /* a test DOM, or a pointer that is already gone */
        }
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        animating = false;
        if (pointers.size === 1) {
            gesture = {
                kind: "pending",
                start: { x: event.clientX, y: event.clientY },
                at: momentOf(event),
                base: zoom,
            };
        } else {
            // A second finger: whatever the first was doing, this is a pinch.
            dragX = 0;
            dragY = 0;
            gesture = { kind: "pinch", from: pinchNow(), base: zoom };
        }
    }

    function handlePointerMove(event: PointerEvent) {
        if (!pointers.has(event.pointerId) || !gesture) return;
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

        if (gesture.kind === "pinch") {
            if (pointers.size >= 2) {
                zoom = pinchTransform(gesture.base, gesture.from, pinchNow(), fit(), viewSize());
            }
            return;
        }
        if (gesture.kind === "spent" || pointers.size !== 1) return;

        const point = { x: event.clientX, y: event.clientY };
        if (gesture.kind === "pending") {
            const moved = { x: point.x - gesture.start.x, y: point.y - gesture.start.y };
            if (isZoomed(gesture.base)) {
                // Zoomed in, any drag moves the photo: it does not turn the page or close.
                if (Math.hypot(moved.x, moved.y) < TAP_SLOP) return;
                gesture = { kind: "pan", start: point, base: zoom };
            } else {
                const axis = dragAxis(moved);
                if (axis === null) return;
                // Measured from where the drag was recognised, so nothing jumps by the slop.
                gesture = { kind: axis === "x" ? "swipe" : "close", start: point };
                speedX.reset(point.x, timeOf(event));
                speedY.reset(point.y, timeOf(event));
            }
            return;
        }

        const delta = { x: point.x - gesture.start.x, y: point.y - gesture.start.y };
        if (gesture.kind === "pan") {
            zoom = panBy(gesture.base, delta, fit(), viewSize());
        } else if (gesture.kind === "swipe") {
            speedX.add(point.x, timeOf(event));
            // Towards a photo that is not there, the photo only gives a little.
            const towards = (delta.x < 0 ? 1 : -1) * (rtl ? -1 : 1);
            const exists = current + towards >= 0 && current + towards < count;
            dragX = exists ? delta.x : resist(delta.x);
        } else if (gesture.kind === "close") {
            speedY.add(point.y, timeOf(event));
            dragY = Math.max(0, delta.y);
        }
    }

    function handlePointerUp(event: PointerEvent) {
        if (!pointers.has(event.pointerId)) return;
        const lifted = pointers.get(event.pointerId)!;
        pointers.delete(event.pointerId);
        try {
            stage?.releasePointerCapture(event.pointerId);
        } catch {
            /* never captured */
        }
        const ended = gesture;
        if (!ended) return;

        if (ended.kind === "pinch") {
            setZoom(settleZoom(zoom, fit(), viewSize()), true);
            // The finger that stays does nothing more until it too has lifted.
            gesture = pointers.size > 0 ? { kind: "spent" } : null;
            return;
        }
        if (pointers.size > 0) return;
        gesture = null;

        switch (ended.kind) {
            case "pending": {
                const at = momentOf(event);
                if (elapsed(ended.at, at) > TAP_MS) break;
                const tap = { at, point: lifted };
                const before = lastTap && { time: 0, point: lastTap.point };
                if (isDoubleTap(before, { time: lastTap ? elapsed(lastTap.at, at) : 0, point: lifted })) {
                    lastTap = null;
                    setZoom(
                        doubleTapTransform(zoom, fromCentre(lifted.x, lifted.y), fit(), viewSize()),
                        true,
                    );
                } else {
                    lastTap = tap;
                }
                break;
            }
            case "swipe": {
                speedX.add(lifted.x, timeOf(event));
                const turn = swipeTurn({
                    distance: lifted.x - ended.start.x,
                    velocity: speedX.velocity(),
                    width: viewSize().width,
                    index: current,
                    count,
                    rtl,
                    flick: FLICK_VELOCITY,
                });
                void go(turn);
                break;
            }
            case "close": {
                speedY.add(lifted.y, timeOf(event));
                const closes = swipeCloses({
                    distance: lifted.y - ended.start.y,
                    velocity: speedY.velocity(),
                    height: viewSize().height,
                    flick: FLICK_VELOCITY,
                });
                if (closes) close("swipe");
                else {
                    animating = true;
                    dragY = 0;
                }
                break;
            }
            default:
                break;
        }
    }

    function handlePointerCancel(event: PointerEvent) {
        if (!pointers.has(event.pointerId)) return;
        pointers.delete(event.pointerId);
        if (pointers.size > 0) return;
        gesture = null;
        animating = true;
        dragX = 0;
        dragY = 0;
        zoom = settleZoom(zoom, fit(), viewSize());
    }

    /** Ctrl or Cmd with the wheel (and a pinch on a trackpad, which arrives as one) zooms about the pointer. */
    function handleWheel(event: WheelEvent) {
        if (!event.ctrlKey && !event.metaKey) return;
        event.preventDefault();
        const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
        setZoom(
            settleZoom(
                zoomAbout(zoom, zoom.scale * factor, fromCentre(event.clientX, event.clientY), fit(), viewSize()),
                fit(),
                viewSize(),
            ),
            false,
        );
    }

    $effect(() => {
        const element = stage;
        if (!element) return;
        // Not passive: the browser must not zoom the page as well.
        element.addEventListener("wheel", handleWheel, { passive: false });
        return () => element.removeEventListener("wheel", handleWheel);
    });

    // --- Opening and closing -------------------------------------------------

    /** The tile of the photo now showing, in the grid the viewer was opened from. */
    function tileOfCurrent(): HTMLElement | null {
        const grid = openerGrid?.isConnected ? openerGrid : null;
        const key = photo ? String(photoKey(photo)) : null;
        if (!grid || key === null) return null;
        return (
            Array.from(grid.querySelectorAll<HTMLElement>("[data-photo-key]")).find(
                (tile) => tile.dataset.photoKey === key,
            ) ?? null
        );
    }

    function giveFocusBack() {
        if (!focusActive) return;
        focusActive = false;
        const tile = tileOfCurrent();
        returnFocus();
        if (tile) {
            tile.focus();
            return;
        }
        // The tile it was opened from is gone (its photo was deleted) and the
        // photo showing has none: the grid's own Tab stop, or its first tile,
        // so focus is not dropped onto the page.
        if (opener?.isConnected || !openerGrid?.isConnected) return;
        (
            openerGrid.querySelector<HTMLElement>('[data-photo-grid-item][tabindex="0"]') ??
            openerGrid.querySelector<HTMLElement>("[data-photo-grid-item]")
        )?.focus();
    }

    function close(reason: PhotoViewerCloseReason) {
        isOpen = false;
        giveFocusBack();
        onclose?.({ reason });
    }

    $effect(() => {
        const container = panel;
        if (isOpen && container) {
            opener = document.activeElement;
            openerGrid = opener?.closest?.("[data-photo-grid]") ?? null;
            saveFocus();
            focusActive = true;
            rtl = isRtl(container);
            const unlockScroll = lockBodyScroll();
            const overlay = joinOverlayStack(container);
            depth = overlay.depth;
            const t = setTimeout(() => {
                focusFirstElement(container);
            }, 0);
            // If the focused control is disabled or removed, focus lands on
            // `<body>`; take Tab and Escape back from there.
            const stopRecovery = recoverStrayFocus(container, {
                onEscape: () => close("escape"),
            });
            return () => {
                clearTimeout(t);
                stopRecovery();
                overlay.leave();
                unlockScroll();
                pointers.clear();
                gesture = null;
                lastTap = null;
                zoom = REST;
                dragX = 0;
                dragY = 0;
                animating = false;
                captionOpen = false;
                menuOpen = false;
                giveFocusBack();
            };
        }
    });

    /**
     * The list can change under an open viewer: a photo is deleted. Stay on a
     * photo that exists, and with none left there is nothing to show.
     */
    $effect(() => {
        const total = count;
        untrack(() => {
            if (!isOpen) return;
            if (total === 0) {
                isOpen = false;
                return;
            }
            if (index !== clampIndex(index, total)) index = clampIndex(index, total);
        });
    });

    $effect(() => {
        if (!isDevBuild() || !isOpen) return;
        const unnamed = photos.filter((item) => !item.alt?.trim()).length;
        if (unnamed > 0) {
            console.warn(
                `[zabi-components] PhotoViewer: ${unnamed} of ${photos.length} photos have no alt text. ` +
                    'Each is read out as "Photo 3 of 12" until it has one.',
            );
        }
    });

    // --- Keys ----------------------------------------------------------------

    function handleKeydown(event: KeyboardEvent) {
        trapTabKey(panel, event);
        // A menu inside the viewer has the keys while it is open.
        if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
        if ((event.target as Element | null)?.closest?.('[role="menu"], input, textarea, select')) return;

        const view = viewSize();
        const size = fit();
        const pan = (x: number, y: number) => setZoom(panBy(zoom, { x, y }, size, view), true);
        const centre = { x: 0, y: 0 };
        // Left and Right follow what is on screen, which is mirrored in RTL.
        const forward = rtl ? "ArrowLeft" : "ArrowRight";
        const backward = rtl ? "ArrowRight" : "ArrowLeft";

        switch (event.key) {
            case "Escape":
                // Out of the zoom first: one press never does two things.
                if (zoomed) setZoom(REST, true);
                else close("escape");
                break;
            case forward:
            case backward:
                // The photo moves the way the finger would push it: Right shows what is to the right.
                if (zoomed) pan(event.key === "ArrowRight" ? -KEY_PAN : KEY_PAN, 0);
                else void go(event.key === forward ? 1 : -1);
                break;
            case "ArrowUp":
            case "ArrowDown":
                if (!zoomed) return;
                pan(0, event.key === "ArrowDown" ? -KEY_PAN : KEY_PAN);
                break;
            case "PageDown":
                void go(1);
                break;
            case "PageUp":
                void go(-1);
                break;
            case "Home":
                goTo(0);
                break;
            case "End":
                goTo(count - 1);
                break;
            case "+":
            case "=":
                setZoom(zoomAbout(zoom, zoom.scale * ZOOM_STEP, centre, size, view), true);
                break;
            case "-":
            case "_":
                setZoom(settleZoom(zoomAbout(zoom, zoom.scale / ZOOM_STEP, centre, size, view), size, view), true);
                break;
            case "0":
                setZoom(REST, true);
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    // --- Caption ---------------------------------------------------------------

    /** The menu of the actions that do not fit in the bar. */
    let menuOpen = $state(false);

    let captionOpen = $state(false);
    /** The caption is longer than the two lines it is given. */
    let captionLong = $state(false);

    $effect(() => {
        const element = captionText;
        // Read again for each photo, and when the screen turns.
        void photo?.caption;
        if (!element) {
            captionLong = false;
            return;
        }
        const measure = () => {
            if (!captionOpen) captionLong = element.scrollHeight > element.clientHeight + 1;
        };
        measure();
        const observer = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : undefined;
        observer?.observe(element);
        return () => observer?.disconnect();
    });

    /**
     * More and Less come and go with the caption, and Try again with its
     * message. One of them may be holding the focus as it goes (an arrow key
     * pressed on More shows a photo with a short caption): the dialog takes
     * the focus then, so the keys go on working and it is not left on the page.
     */
    $effect(() => {
        void current;
        void captionLong;
        void captionOpen;
        void failed;
        const container = panel;
        if (!isOpen || !container || !focusActive) return;
        const active = document.activeElement;
        if (!active || active === document.body) container.focus({ preventScroll: true });
    });

    function showPhoto(turn: number) {
        captionOpen = false;
        void go(turn);
    }

    function run(action: PhotoViewerAction) {
        if (action.disabled || !photo) return;
        action.onclick(photo, current);
    }

    /**
     * A plate: the theme's own overlay surface and text, opaque, with an edge
     * that shows on black and on any photo. Everything in the viewer that is
     * read or pressed sits on one.
     */
    const plate = "border border-control-border bg-surface-overlay text-body";
    const plateButton = cn(plate, "hover:bg-surface-overlay-hover active:bg-surface-overlay-hover");
    /** Clear of the notch and the rounded corners, whichever side they are on. */
    const sides =
        "px-[max(8px,env(safe-area-inset-left),env(safe-area-inset-right))]";

    const atFirst = $derived(current <= 0);
    const atLast = $derived(current >= count - 1);
    /**
     * `aria-disabled`, not `disabled` or removed: the button may hold focus
     * when the end is reached. Only the arrow is dimmed, to the colour a
     * control's edge has (3:1 on the plate). The plate and its edge stay
     * opaque: `opacity` on the whole button let the photo through and left
     * the arrow at 1:1 to 2.5:1 over one. No hover or pressed fill either:
     * nothing happens there.
     */
    const endedButton =
        "border border-control-border bg-surface-overlay text-control-border hover:bg-surface-overlay active:bg-surface-overlay cursor-not-allowed active:scale-100";
</script>

{#snippet slide(item: Photo, at: number, isCurrent: boolean)}
    {@const source = item.src}
    {@const ready = loaded.includes(source)}
    {@const broken = failed.includes(source)}
    <!-- The box has the photo's own proportions and is as large as fits, from
    its width and height alone: the small image and the full one fill the same
    box, so nothing jumps when one replaces the other. -->
    <div
        class="photo-box"
        style:aspect-ratio="{item.width} / {item.height}"
        style:--photo-ratio={item.width / item.height}
        style:transform={isCurrent && (zoomed || zoom.x !== 0 || zoom.y !== 0)
            ? `translate3d(${zoom.x}px, ${zoom.y}px, 0) scale(${zoom.scale})`
            : undefined}
        style:transition={isCurrent && animating ? undefined : "none"}
        data-photo-viewer-box
    >
        {#if broken}
            {#if isCurrent}
                <div class="flex size-full items-center justify-center p-4">
                    <div
                        class={cn(plate, "flex flex-col items-center gap-3 rounded-container p-4 text-center text-sm")}
                        role="alert"
                    >
                        <ImageOff size={24} aria-hidden="true" />
                        <p>{text.loadError}</p>
                        <Button variant="secondary" size="lg" onclick={() => retry(source)}>
                            {text.retry}
                        </Button>
                    </div>
                </div>
            {/if}
        {:else}
            {#if !ready && item.thumbSrc}
                <!-- The small image, blurred, until the full one is there. -->
                <img
                    src={item.thumbSrc}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                    class="absolute inset-0 size-full scale-105 object-cover blur-md"
                    data-photo-viewer-thumb
                />
            {/if}
            {#key attempts[source] ?? 0}
                <img
                    src={source}
                    alt={isCurrent ? nameOf(item, at) : ""}
                    aria-hidden={isCurrent ? undefined : "true"}
                    width={item.width}
                    height={item.height}
                    decoding="async"
                    draggable="false"
                    class={cn(
                        "absolute inset-0 size-full object-contain transition-opacity duration-200 motion-reduce:transition-none",
                        ready ? "opacity-100" : "opacity-0",
                    )}
                    onload={() => markLoaded(source)}
                    onerror={() => markFailed(source)}
                    data-photo-viewer-image
                    {@attach settled}
                />
            {/key}
        {/if}
    </div>
{/snippet}

{#if isOpen && photo}
    <div
        bind:this={root}
        class="fixed inset-x-0 top-0 z-modal h-dvh overflow-hidden"
        style:z-index={depth > 0 ? `calc(var(--z-modal) + ${depth})` : undefined}
        data-overlay-depth={depth}
        use:portalTo={portal}
        role="presentation"
    >
        <!-- Black, and opaque: the overlay colour alone lets the page show
        through, and a photo over a page cannot be read. It thins while a swipe
        down pulls the photo away, to show what is coming back. -->
        <div
            class="photo-backdrop absolute inset-0"
            style:opacity={dragY > 0 ? Math.max(0.3, 1 - dragY / Math.max(1, viewSize().height)) : undefined}
            style:transition={animating ? undefined : "none"}
            aria-hidden="true"
        ></div>
        <!-- `touch-none` on the whole dialog, not only the stage: two fingers
        that land on the counter or a button would otherwise zoom the page
        under the viewer, and leave it zoomed. Taps are not affected. -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <div
            bind:this={panel}
            class={cn("absolute inset-0 touch-none outline-none", className)}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            aria-describedby={statusId}
            tabindex="-1"
            data-zoomed={zoomed ? "true" : undefined}
            {...restProps}
            onkeydown={handleKeydown}
        >
            <!-- The stage takes every touch on the photo and the black around
            it, and decides what it is: `touch-none`, or the browser would
            scroll or zoom the page with it. A tap beside the photo does not
            close: it is half of a double tap, and a near miss of the photo. -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                bind:this={stage}
                class="photo-stage absolute inset-0 touch-none overflow-hidden select-none"
                class:cursor-grab={zoomed}
                data-photo-viewer-stage
                onpointerdown={handlePointerDown}
                onpointermove={handlePointerMove}
                onpointerup={handlePointerUp}
                onpointercancel={handlePointerCancel}
            >
                {#each slides as entry (photoKey(entry.item))}
                    {@const isCurrent = entry.slot === 0}
                    <div
                        class="photo-slide absolute inset-0 flex items-center justify-center"
                        style:transform="translate3d(calc({entry.slot * (rtl ? -1 : 1)} * (100% + {GAP}px) + {dragX}px), {isCurrent ? dragY : 0}px, 0)"
                        style:transition={animating ? undefined : "none"}
                        data-photo-viewer-current={isCurrent ? "" : undefined}
                        aria-hidden={isCurrent ? undefined : "true"}
                    >
                        {@render slide(entry.item, entry.at, isCurrent)}
                    </div>
                {/each}
                {#if slow && !loaded.includes(photo.src) && !failed.includes(photo.src)}
                    <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div class={cn(plate, "flex size-11 items-center justify-center rounded-pill")}>
                            <Spinner size="lg" label={text.loading} />
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Top: where you are, and the way out. Close is the first
            control, so it takes the focus when the viewer opens. -->
            <div
                class={cn(
                    "pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-[8px] pt-[max(8px,env(safe-area-inset-top))]",
                    sides,
                )}
            >
                <p
                    class={cn(plate, "pointer-events-auto flex min-h-11 items-center rounded-pill px-4 text-sm font-medium tabular-nums")}
                    aria-hidden="true"
                    data-photo-viewer-counter
                >
                    {text.counter(current + 1, count)}
                </p>
                <IconButton
                    variant="outline"
                    size="lg"
                    label={text.close}
                    class={cn(plateButton, "pointer-events-auto")}
                    onclick={() => close("close-button")}
                >
                    <X size={20} aria-hidden="true" />
                </IconButton>
            </div>

            {#if count > 1}
                <!-- At either end the button stays, dimmed and aria-disabled:
                taken away, it would drop the focus it may be holding. -->
                <div
                    class={cn(
                        "pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between",
                        sides,
                    )}
                >
                    <IconButton
                        variant="outline"
                        size="lg"
                        label={text.previous}
                        class={cn(atFirst ? endedButton : plateButton, "pointer-events-auto")}
                        aria-disabled={atFirst ? "true" : undefined}
                        onclick={() => !atFirst && showPhoto(-1)}
                    >
                        <ChevronLeft size={20} class="rtl:rotate-180" aria-hidden="true" />
                    </IconButton>
                    <IconButton
                        variant="outline"
                        size="lg"
                        label={text.next}
                        class={cn(atLast ? endedButton : plateButton, "pointer-events-auto")}
                        aria-disabled={atLast ? "true" : undefined}
                        onclick={() => !atLast && showPhoto(1)}
                    >
                        <ChevronRight size={20} class="rtl:rotate-180" aria-hidden="true" />
                    </IconButton>
                </div>
            {/if}

            <!-- Bottom: the caption, then what can be done with the photo. -->
            {#if photo.caption || actions.length > 0}
                <div
                    class={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-[8px] pb-[max(8px,env(safe-area-inset-bottom))]",
                        sides,
                    )}
                >
                    {#if photo.caption}
                        <div
                            class={cn(
                                plate,
                                "pointer-events-auto flex w-full items-end gap-[8px] rounded-container px-3 py-2 text-sm sm:w-[min(100%,40rem)]",
                            )}
                            data-photo-viewer-caption
                        >
                            <p
                                bind:this={captionText}
                                class={cn(
                                    "min-w-0 flex-1 [overflow-wrap:anywhere]",
                                    // The one thing in the viewer that scrolls under a finger.
                                    captionOpen ? "max-h-[40dvh] touch-pan-y overflow-y-auto" : "line-clamp-2",
                                )}
                            >
                                {photo.caption}
                            </p>
                            {#if captionLong || captionOpen}
                                <button
                                    type="button"
                                    class="focus-ring -my-1 -me-1 min-h-11 shrink-0 cursor-pointer rounded-[calc(var(--radius-container)-4px)] px-2 text-sm font-medium text-link"
                                    aria-expanded={captionOpen}
                                    onclick={() => (captionOpen = !captionOpen)}
                                >
                                    {captionOpen ? text.showLess : text.showMore}
                                </button>
                            {/if}
                        </div>
                    {/if}
                    {#if actions.length > 0}
                        <div
                            class="pointer-events-auto flex flex-wrap items-center justify-center gap-[8px]"
                            data-photo-viewer-actions
                        >
                            {#each split.bar as action (action.id)}
                                {@const Icon = action.icon}
                                <!-- `aria-disabled`: an action that turns unavailable under the finger keeps the focus. -->
                                <button
                                    type="button"
                                    class={cn(
                                        "focus-ring inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-control px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none",
                                        plateButton,
                                        action.tone === "danger" && "text-error-text",
                                        action.disabled && "cursor-not-allowed opacity-50",
                                    )}
                                    aria-disabled={action.disabled ? "true" : undefined}
                                    data-action={action.id}
                                    onclick={() => run(action)}
                                >
                                    {#if Icon}
                                        <span class="flex shrink-0" aria-hidden="true"><Icon size={20} /></span>
                                    {/if}
                                    {action.label}
                                </button>
                            {/each}
                            {#if split.menu.length > 0}
                                <Dropdown
                                    bind:isOpen={menuOpen}
                                    placement="top-end"
                                    ariaLabel={text.moreActions}
                                    options={split.menu.map((action) => ({
                                        value: action.id,
                                        label: action.label,
                                        icon: action.icon,
                                        tone: action.tone,
                                        disabled: action.disabled,
                                    }))}
                                    onOptionClick={(value) => {
                                        const action = split.menu.find((candidate) => candidate.id === value);
                                        if (!action || action.disabled) return;
                                        menuOpen = false;
                                        run(action);
                                    }}
                                >
                                    {#snippet trigger(aria)}
                                        <IconButton
                                            variant="outline"
                                            size="lg"
                                            label={text.moreActions}
                                            class={plateButton}
                                            onclick={() => (menuOpen = !menuOpen)}
                                            {...aria}
                                        >
                                            <Ellipsis size={20} aria-hidden="true" />
                                        </IconButton>
                                    {/snippet}
                                </Dropdown>
                            {/if}
                        </div>
                    {/if}
                </div>
            {/if}

            <!-- Read out when the photo changes: what it shows, and where it is
            in the set. A live region says nothing of what it holds when it
            arrives, so it is also the dialog's description: that is read with
            the dialog's name when the viewer opens. -->
            <div id={statusId} class="sr-only" aria-live="polite" aria-atomic="true" data-photo-viewer-status>
                {nameOf(photo, current)}, {text.position(current + 1, count)}
            </div>
        </div>
    </div>
{/if}

<style>
    /*
     * The viewer is dark whatever the theme. The overlay colour is black with
     * some of it let through; here it is taken whole, so nothing of the page
     * shows behind a photo. Where `rgb(from ...)` is not known, the overlay
     * colour itself is the fallback.
     */
    .photo-backdrop {
        background-color: var(--color-overlay);
        background-color: rgb(from var(--color-overlay) r g b / 1);
        transition: opacity 200ms ease-out;
    }

    /* The stage is the container the photo's box is sized against. */
    .photo-stage {
        container-type: size;
    }

    .photo-slide {
        transition: transform 250ms ease-out;
        will-change: transform;
    }

    /*
     * As wide as the stage, or as wide as its height allows at the photo's
     * proportions, whichever is less. `aspect-ratio` on the element gives the
     * height.
     */
    .photo-box {
        position: relative;
        flex: none;
        overflow: hidden;
        width: min(100cqw, calc(100cqh * var(--photo-ratio)));
        transform-origin: center;
        transition: transform 200ms ease-out;
    }

    @media (prefers-reduced-motion: reduce) {
        .photo-backdrop,
        .photo-slide,
        .photo-box {
            transition: none;
        }
    }

    /* Where colours are forced the page's own background is the dark. */
    @media (forced-colors: active) {
        .photo-backdrop {
            background-color: Canvas;
        }
    }
</style>
