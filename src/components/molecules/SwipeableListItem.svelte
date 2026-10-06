<script lang="ts">
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import { tick, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Ellipsis from "@lucide/svelte/icons/ellipsis";
    import { cn } from "../util/cn.js";
    import { isInsideToastRegion } from "../util/focus-utils.js";
    import {
        createVelocityTracker,
        DRAG_SLOP,
        FLICK_VELOCITY,
        prefersReducedMotion,
        timeOf,
    } from "../util/sheet-drag.js";
    import { generateId } from "../util/ssr-safe.js";
    import {
        DEFAULT_SWIPEABLE_LIST_ITEM_STRINGS,
        registerOpenRow,
        settleSwipe,
        type SwipeableListItemAction,
        type SwipeableListItemStrings,
    } from "../util/swipeable-list-item.js";

    /**
     * A row with one or two actions behind its inline end, such as Delete on
     * a draft. A finger swipes the row towards the inline start to show them;
     * a swipe only shows them, and an action runs when its button is pressed.
     *
     * The swipe is a shortcut and never the only way. The row has a "more"
     * button at its end that opens the same actions for a mouse, a keyboard,
     * a switch or a screen reader, and they are ordinary buttons once open.
     * Escape or a press elsewhere closes the row. In a list (`ul`, `ol`,
     * `List`) one row is open at a time.
     *
     * It is the row's content and a group of buttons, not a list item: put
     * it inside your own `li` or `ListItem`.
     *
     * ```svelte
     * <ul>
     *     {#each drafts as draft (draft.id)}
     *         <li>
     *             <SwipeableListItem
     *                 actions={[{ id: "delete", label: "Delete", tone: "danger", onselect: () => remove(draft) }]}
     *             >
     *                 {draft.title}
     *             </SwipeableListItem>
     *         </li>
     *     {/each}
     * </ul>
     * ```
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> & {
        /** One or two actions, shown at the inline end. */
        actions: SwipeableListItemAction[];
        /** Whether the actions are shown. Bindable. */
        open?: boolean;
        /** Runs when the row opens or closes, by whatever means. */
        onopenchange?: (open: boolean) => void;
        /**
         * The button at the end of the row that opens the actions without a
         * swipe. Without it the swipe is the only way this component offers,
         * and the app has to give another: the same actions on the page the
         * row leads to, or in a menu (WCAG 2.5.1, 2.5.7).
         */
        showMoreButton?: boolean;
        /** The words the row says by itself, for another language. */
        strings?: Partial<SwipeableListItemStrings>;
        class?: string;
        /** The row's content. */
        children?: Snippet;
    };

    let {
        actions,
        open = $bindable<Exclude<Props["open"], undefined>>(),
        onopenchange,
        showMoreButton = true,
        strings,
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop (see Collapsible): the default is applied here.
    const applyDefaults = () => {
        if (open === undefined) open = false;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("swipeableListItem");
    const text = $derived({ ...DEFAULT_SWIPEABLE_LIST_ITEM_STRINGS, ...provided(), ...strings });
    const groupId = generateId("swipeable-actions");

    let root = $state<HTMLDivElement>();
    let track = $state<HTMLDivElement>();
    let group = $state<HTMLDivElement>();
    let moreButton = $state<HTMLButtonElement>();

    /** While a finger drags the row: how many px of the actions show. */
    let dragged = $state<number | null>(null);

    function setOpen(next: boolean) {
        if (open === next) return;
        open = next;
        onopenchange?.(next);
    }

    /** Closes the row and puts focus back on the button that opens it, when focus was in the actions. */
    function close({ returnFocus = false } = {}) {
        const held = !!group?.contains(document.activeElement);
        setOpen(false);
        if (returnFocus || held) moreButton?.focus();
    }

    async function toggleFromButton() {
        if (open) {
            close();
            return;
        }
        setOpen(true);
        // Opened on purpose, by a press: on to the first action.
        await tick();
        group?.querySelector<HTMLElement>("button")?.focus();
    }

    function select(action: SwipeableListItemAction) {
        try {
            action.onselect();
        } finally {
            close({ returnFocus: true });
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key !== "Escape" || !open || event.defaultPrevented) return;
        event.preventDefault();
        event.stopPropagation();
        close({ returnFocus: true });
    }

    // One open row in a list, and a press anywhere else closes this one.
    $effect(() => {
        const element = root;
        if (!open || !element) return;
        const unregister = registerOpenRow(element, () => setOpen(false));
        const onPointerDown = (event: PointerEvent) => {
            const target = event.target;
            if (target instanceof Node && element.contains(target)) return;
            // A toast lies over the list; a press on it is for the toast.
            if (isInsideToastRegion(target)) return;
            setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown, true);
        return () => {
            unregister();
            document.removeEventListener("pointerdown", onPointerDown, true);
        };
    });

    // --- The swipe. A finger or a stylus; a mouse has the button. The row
    // has `touch-action: pan-y`, so a vertical move is the browser's (it
    // scrolls and cancels the pointer) and only a sideways one comes here.
    const tracker = createVelocityTracker();
    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startRevealed = 0;
    let width = 0;
    let swiping = false;
    /** 1 where the inline start is on the left, -1 in a right-to-left page. */
    let direction = 1;

    const revealedAt = (clientX: number) =>
        Math.max(0, Math.min(width, startRevealed + (startX - clientX) * direction));

    function handlePointerDown(event: PointerEvent) {
        if (pointerId !== null || event.pointerType === "mouse" || !group || !track) return;
        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        swiping = false;
        width = group.offsetWidth;
        startRevealed = open ? width : 0;
        direction = getComputedStyle(track).direction === "rtl" ? -1 : 1;
    }

    function handlePointerMove(event: PointerEvent) {
        if (event.pointerId !== pointerId) return;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        if (!swiping) {
            if (Math.abs(dx) < DRAG_SLOP && Math.abs(dy) < DRAG_SLOP) return;
            // Clearly sideways, or it is not a swipe of the row.
            if (Math.abs(dx) <= Math.abs(dy)) {
                pointerId = null;
                return;
            }
            swiping = true;
            try {
                track?.setPointerCapture(event.pointerId);
            } catch {
                /* a test DOM, or a pointer that is already gone */
            }
            // Measured from where the swipe was recognised, so the row does not jump by the slop.
            startX = event.clientX;
            tracker.reset(0, timeOf(event));
        }
        const revealed = revealedAt(event.clientX);
        tracker.add(revealed, timeOf(event));
        // Where motion is unwanted the row does not follow the finger; the actions appear at the end.
        if (!prefersReducedMotion()) dragged = revealed;
    }

    function swallowClick(event: MouseEvent) {
        // The click that ends a swipe is not a press of what is in the row.
        event.preventDefault();
        event.stopPropagation();
    }

    function finishPointer(event: PointerEvent, cancelled: boolean) {
        if (event.pointerId !== pointerId) return;
        pointerId = null;
        const wasSwiping = swiping;
        swiping = false;
        dragged = null;
        if (!wasSwiping || cancelled) return;
        const revealed = revealedAt(event.clientX);
        tracker.add(revealed, timeOf(event));
        track?.addEventListener("click", swallowClick, { capture: true, once: true });
        setTimeout(() => track?.removeEventListener("click", swallowClick, true), 0);
        setOpen(settleSwipe(revealed, width, tracker.velocity(), FLICK_VELOCITY));
    }

    /** The actions are laid out and can be seen: open, or coming out under a finger. */
    const shown = $derived(open || dragged !== null);

    /** How far the row is moved, as CSS: by the width of the actions when open. */
    const shift = $derived.by(() => {
        if (dragged !== null) return `${dragged}px`;
        return open ? "var(--swipeable-actions-width, 0px)" : "0px";
    });

    // The width of the actions, for the row to move by. Measured, since the labels are the app's.
    $effect(() => {
        const element = group;
        const host = root;
        if (!element || !host) return;
        const measure = () => host.style.setProperty("--swipeable-actions-width", `${element.offsetWidth}px`);
        measure();
        const observer = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : undefined;
        observer?.observe(element);
        return () => observer?.disconnect();
    });

    const actionClasses = (tone: SwipeableListItemAction["tone"]) =>
        cn(
            // The ring is drawn inside the button: the row clips what reaches past its ends.
            "flex min-h-11 min-w-[72px] cursor-pointer flex-col items-center justify-center gap-[4px] px-[12px] py-[8px] text-center text-xs font-medium transition-colors motion-reduce:transition-none focus:outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current forced-colors:border forced-colors:border-[ButtonText]",
            tone === "danger"
                ? "bg-action-danger text-action-danger-text hover:bg-action-danger-hover active:bg-action-danger-active"
                : "bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active",
        );
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    {...restProps}
    bind:this={root}
    class={cn("relative overflow-x-clip", className)}
    data-swipeable-list-item
    data-open={open ? "true" : "false"}
    onkeydown={handleKeydown}
>
    <!-- The row and its actions side by side, the actions past the end of the
    row until the two are moved over. `pan-y`: a vertical move scrolls. -->
    <div
        bind:this={track}
        class={cn(
            // Towards the inline start: to the left, or to the right in a right-to-left page.
            "flex touch-pan-y items-stretch [--swipeable-direction:-1] rtl:[--swipeable-direction:1]",
            dragged === null && "transition-transform duration-200 ease-out motion-reduce:transition-none",
        )}
        style:transform="translateX(calc({shift} * var(--swipeable-direction, -1)))"
        onpointerdown={handlePointerDown}
        onpointermove={handlePointerMove}
        onpointerup={(event) => finishPointer(event, false)}
        onpointercancel={(event) => finishPointer(event, true)}
    >
        <div class="flex min-w-0 shrink-0 basis-full items-center gap-[8px]">
            <div class="min-w-0 flex-1">
                {@render children?.()}
            </div>
            {#if showMoreButton}
                <button
                    bind:this={moreButton}
                    type="button"
                    class="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-control text-description transition-colors hover:bg-surface-hover hover:text-headline active:bg-surface-active focus:outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus-ring motion-reduce:transition-none pointer-coarse:size-11"
                    aria-label={text.actions}
                    aria-expanded={open}
                    aria-controls={groupId}
                    data-swipeable-more
                    onclick={toggleFromButton}
                >
                    <Ellipsis size={20} aria-hidden="true" />
                </button>
            {/if}
        </div>
        <!-- In the page while closed, so the button above has something to
        name; out of reach until the row is open. -->
        <div
            bind:this={group}
            id={groupId}
            role="group"
            aria-label={text.actions}
            class={cn("flex shrink-0 items-stretch", !shown && "invisible")}
            inert={!open}
            data-swipeable-actions
        >
            {#each actions as action (action.id)}
                <button type="button" class={actionClasses(action.tone)} onclick={() => select(action)}>
                    {#if action.icon}
                        {@const Icon = action.icon}
                        <span class="flex" aria-hidden="true"><Icon size={20} /></span>
                    {/if}
                    <span>{action.label}</span>
                </button>
            {/each}
        </div>
    </div>
</div>
