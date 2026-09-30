<script lang="ts" generics="T">
    import { tick, untrack, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { ChevronDown, ChevronUp, GripVertical } from "@lucide/svelte";
    import { cn } from "../util/cn.js";
    import { generateId } from "../util/ssr-safe.js";
    import {
        SORTABLE_LIST_STRINGS,
        dropIndex,
        moveItem,
        type SortableListReorderDetail,
        type SortableListRow,
        type SortableListStrings,
        type SortableSlot,
    } from "../util/sortable-list.js";

    /** Other attributes (`id`, `data-*`, ...) land on the host `<div>`; the two ARIA names go to the `<ul>`. */
    type Props = Omit<
        HTMLAttributes<HTMLDivElement>,
        "class" | "aria-label" | "aria-labelledby"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        /** Extra classes for the `<ul>`, for example a different gap. */
        listClass?: string;
        /** The items, in order; supports `bind:items`. */
        items: T[];
        /** Stable identity of an item. Rows are keyed by it. */
        getKey: (item: T) => string | number;
        /** Name of an item, used in the button names and the announcements. */
        getLabel: (item: T) => string;
        /** Content of one row. The second argument carries the row state and its controls. */
        item: Snippet<[T, SortableListRow]>;
        /** Called once per move, after `items` has the new order. */
        onreorder?: (detail: SortableListReorderDetail<T>) => void;
        /**
         * `auto` lays out handle, content and move buttons in a row. `manual`
         * renders only your snippet, which places `row.handle` (and
         * `row.moveButtons` if wanted) itself, for example in a card header.
         * Put them beside a header toggle, never inside another `<button>`
         * or link: a button inside a button is invalid and unreachable. A
         * click on either does not bubble, so a clickable (non-button) header
         * around them is not toggled by it.
         */
        controls?: "auto" | "manual";
        /** Show the move up / move down buttons when `controls="auto"`. */
        showMoveButtons?: boolean;
        /** Disables every handle and move button. */
        disabled?: boolean;
        /** Disables one item's own controls. Other items can still move past it. */
        isItemDisabled?: (item: T) => boolean;
        /** Overrides for the built-in strings. */
        strings?: Partial<SortableListStrings>;
        "aria-label"?: string;
        "aria-labelledby"?: string;
    };

    let {
        class: className = "",
        listClass = "",
        items = $bindable(),
        getKey,
        getLabel,
        item,
        onreorder,
        controls = "auto",
        showMoveButtons = true,
        disabled = false,
        isItemDisabled,
        strings,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        ...restProps
    }: Props = $props();

    /** Pointer travel before a press on the handle becomes a drag. */
    const DRAG_THRESHOLD = 4;
    /** Distance from the scroll container's edge at which a drag starts scrolling it. */
    const SCROLL_EDGE = 48;
    const SCROLL_STEP = 12;
    const SETTLE_MS = 160;
    const NBSP = String.fromCharCode(160);

    const descriptionId = generateId("sortable-list-help");
    const text = $derived({ ...SORTABLE_LIST_STRINGS, ...strings });

    let listElement: HTMLUListElement | undefined = $state();
    let announcement = $state("");

    /**
     * A pointer drag in progress. The DOM order does not change until the
     * drop: rows are only translated. That keeps pointer capture and focus on
     * the handle (moving a node releases both) and makes Escape trivial,
     * because `items` has not been touched yet.
     */
    let drag = $state<{
        key: string | number;
        from: number;
        to: number;
        /** How far the dragged row is translated, in px. */
        offset: number;
        /** How far a row steps aside: the dragged row's height plus the gap. */
        shift: number;
        /** False until the pointer has travelled past the threshold. */
        active: boolean;
    } | null>(null);

    /** Bookkeeping for the drag that nothing renders from. */
    let session: {
        pointerId: number;
        handle: HTMLElement;
        /** The dragged item's label, kept in case the item is gone by the time it is announced. */
        label: string;
        /** Key order at drag start. The measured slots only describe this order. */
        keys: (string | number)[];
        slots: SortableSlot[];
        /** Pointer position relative to the list's top edge at drag start. */
        grab: number;
        clientY: number;
        scroller: HTMLElement | null;
        frame: number | undefined;
    } | null = null;

    function isDisabled(entry: T): boolean {
        return disabled || !!isItemDisabled?.(entry);
    }

    function indexOf(entry: T): number {
        const key = getKey(entry);
        return items.findIndex((candidate) => getKey(candidate) === key);
    }

    function rowElements(): HTMLElement[] {
        return listElement ? (Array.from(listElement.children) as HTMLElement[]) : [];
    }

    function announce(message: string) {
        // A live region stays silent when its text does not change, so moving
        // an item there and back would announce only the first move.
        announcement = message === announcement ? message + NBSP : message;
    }

    function prefersReducedMotion(): boolean {
        return (
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
    }

    function rowTops(): Map<HTMLElement, number> {
        return new Map(
            rowElements().map((row) => [row, row.getBoundingClientRect().top]),
        );
    }

    /** Slides each row from where it was painted to where the new order puts it. */
    function settle(before: Map<HTMLElement, number>) {
        if (prefersReducedMotion()) return;
        for (const [row, top] of before) {
            if (!row.isConnected || typeof row.animate !== "function") continue;
            const delta = top - row.getBoundingClientRect().top;
            if (Math.abs(delta) < 1) continue;
            row.animate(
                [
                    { transform: `translateY(${delta}px)` },
                    { transform: "translateY(0)" },
                ],
                { duration: SETTLE_MS, easing: "ease-out" },
            );
        }
    }

    /** Reordering moves DOM nodes, and a moved node loses focus. */
    function restoreFocus(target: HTMLElement | undefined) {
        if (!target?.isConnected) return;
        if (!(target as HTMLButtonElement).disabled) {
            if (document.activeElement !== target) target.focus();
            return;
        }
        // A move button that has reached an end is now disabled; its
        // neighbour keeps focus on the same row.
        target.parentElement
            ?.querySelector<HTMLElement>("button:not([disabled])")
            ?.focus();
    }

    async function move(from: number, to: number, focusTarget?: HTMLElement) {
        const target = Math.max(0, Math.min(items.length - 1, to));
        const entry = items[from];
        if (entry === undefined || target === from) return;

        const before = rowTops();
        const next = moveItem(items, from, target);
        items = next;
        announce(
            text.moved({
                label: getLabel(entry),
                position: target + 1,
                total: next.length,
            }),
        );
        onreorder?.({ item: entry, from, to: target, items: next });

        await tick();
        settle(before);
        restoreFocus(focusTarget);
    }

    function handleKeydown(event: KeyboardEvent, entry: T) {
        if (drag || event.altKey || event.ctrlKey || event.metaKey) return;
        const index = indexOf(entry);
        let to: number;
        if (event.key === "ArrowUp") to = index - 1;
        else if (event.key === "ArrowDown") to = index + 1;
        else if (event.key === "Home") to = 0;
        else if (event.key === "End") to = items.length - 1;
        else return;

        // Also keeps the arrow keys from scrolling the page under the handle.
        event.preventDefault();
        if (isDisabled(entry) || index === -1 || items.length < 2) return;

        const last = items.length - 1;
        if (Math.max(0, Math.min(last, to)) === index) {
            // A key that does nothing and says nothing reads as a broken control.
            const detail = {
                label: getLabel(entry),
                position: index + 1,
                total: items.length,
            };
            announce(index === 0 ? text.atStart(detail) : text.atEnd(detail));
            return;
        }
        void move(index, to, event.currentTarget as HTMLElement);
    }

    /**
     * Neither control lets its click bubble. The handle has no click action,
     * and a move button's action is the move; in a clickable card header
     * (`controls="manual"`) a bubbling click, including the one Enter and
     * Space produce, would also toggle the card. `onreorder` is the way to
     * observe a move.
     */
    function handleHandleClick(event: MouseEvent) {
        event.stopPropagation();
    }

    function handleMoveClick(event: MouseEvent, entry: T, direction: -1 | 1) {
        event.stopPropagation();
        if (isDisabled(entry)) return;
        const index = indexOf(entry);
        void move(index, index + direction, event.currentTarget as HTMLElement);
    }

    function scrollParent(node: HTMLElement): HTMLElement | null {
        for (let el = node.parentElement; el; el = el.parentElement) {
            if (el === document.body || el === document.documentElement) break;
            const overflowY = getComputedStyle(el).overflowY;
            if (
                (overflowY === "auto" || overflowY === "scroll") &&
                el.scrollHeight > el.clientHeight
            ) {
                return el;
            }
        }
        return null;
    }

    function handlePointerDown(event: PointerEvent, entry: T) {
        if (drag || !listElement || isDisabled(entry)) return;
        // One item has nowhere to go; do not mark it as dragging.
        if (items.length < 2) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;

        const index = indexOf(entry);
        const listTop = listElement.getBoundingClientRect().top;
        const slots = rowElements().map((row) => {
            const rect = row.getBoundingClientRect();
            return { top: rect.top - listTop, height: rect.height };
        });
        if (index === -1 || !slots[index]) return;
        const gap =
            slots.length > 1
                ? Math.max(0, slots[1].top - slots[0].top - slots[0].height)
                : 0;

        const handle = event.currentTarget as HTMLElement;
        try {
            // Keeps the grabbing cursor and stops hover styles firing on
            // whatever the pointer passes over.
            handle.setPointerCapture(event.pointerId);
        } catch {
            /* not supported (older WebViews, jsdom); the window listeners still work */
        }

        session = {
            pointerId: event.pointerId,
            handle,
            label: getLabel(entry),
            keys: items.map(getKey),
            slots,
            grab: event.clientY - listTop,
            clientY: event.clientY,
            scroller: scrollParent(listElement),
            frame: undefined,
        };
        drag = {
            key: getKey(entry),
            from: index,
            to: index,
            offset: 0,
            shift: slots[index].height + gap,
            active: false,
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("pointercancel", handlePointerCancel);
        window.addEventListener("keydown", handleDragKeydown, true);
        window.addEventListener("scroll", updateDrag, true);
    }

    function stopSession() {
        if (!session) return;
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerCancel);
        window.removeEventListener("keydown", handleDragKeydown, true);
        window.removeEventListener("scroll", updateDrag, true);
        if (session.frame !== undefined) cancelAnimationFrame(session.frame);
        try {
            session.handle.releasePointerCapture(session.pointerId);
        } catch {
            /* already released */
        }
        session = null;
    }

    /** Recomputes the drag from the last pointer position; also runs on scroll. */
    function updateDrag() {
        if (!drag || !session || !listElement) return;
        if (!orderUnchanged()) {
            void cancelDrag();
            return;
        }

        const { slots } = session;
        const slot = slots[drag.from];
        const last = slots[slots.length - 1];
        const travelled =
            session.clientY -
            listElement.getBoundingClientRect().top -
            session.grab;
        if (!drag.active && Math.abs(travelled) < DRAG_THRESHOLD) return;

        // The row cannot be dragged out of the list.
        const offset = Math.max(
            slots[0].top - slot.top,
            Math.min(last.top + last.height - slot.top - slot.height, travelled),
        );
        drag.active = true;
        drag.offset = offset;
        drag.to = dropIndex(slots, drag.from, offset);

        if (session.frame === undefined) {
            session.frame = requestAnimationFrame(autoScroll);
        }
    }

    /** Scrolls the nearest scroll container while the pointer rests near its edge. */
    function autoScroll() {
        if (!session || !drag?.active) return;
        const { scroller, clientY } = session;
        const top = scroller ? scroller.getBoundingClientRect().top : 0;
        const bottom = scroller
            ? scroller.getBoundingClientRect().bottom
            : window.innerHeight;
        const step =
            clientY < top + SCROLL_EDGE
                ? -SCROLL_STEP
                : clientY > bottom - SCROLL_EDGE
                  ? SCROLL_STEP
                  : 0;
        if (step !== 0) {
            (scroller ?? window).scrollBy(0, step);
            updateDrag();
        }
        session.frame = requestAnimationFrame(autoScroll);
    }

    function handlePointerMove(event: PointerEvent) {
        if (!session || event.pointerId !== session.pointerId) return;
        session.clientY = event.clientY;
        updateDrag();
    }

    function handlePointerUp(event: PointerEvent) {
        if (!session || !drag || event.pointerId !== session.pointerId) return;
        if (!orderUnchanged()) {
            void cancelDrag();
            return;
        }
        const { from, to, active } = drag;
        const { handle } = session;
        const before = active ? rowTops() : null;
        stopSession();
        drag = null;
        if (!before) return;

        if (to !== from) {
            void move(from, to, handle);
        } else {
            void tick().then(() => settle(before));
        }
    }

    function handlePointerCancel(event: PointerEvent) {
        if (!session || event.pointerId !== session.pointerId) return;
        void cancelDrag();
    }

    function handleDragKeydown(event: KeyboardEvent) {
        if (event.key !== "Escape" || !drag) return;
        if (drag.active) {
            // The drag owns this Escape; a surrounding Modal must not close on it.
            event.preventDefault();
            event.stopPropagation();
        }
        void cancelDrag();
    }

    /** False once the parent has reordered, added or removed items since the drag started. */
    function orderUnchanged(): boolean {
        if (!session) return true;
        const { keys } = session;
        return (
            keys.length === items.length &&
            items.every((entry, index) => getKey(entry) === keys[index])
        );
    }

    /**
     * Abandons the drag. `items` was never changed by it, so the order is
     * whatever the parent last set. The dragged item is looked up by key: the
     * parent may have moved or removed it while the pointer was down.
     */
    async function cancelDrag() {
        if (!drag || !session) return;
        const { key, active } = drag;
        const { label } = session;
        const before = active ? rowTops() : null;
        stopSession();
        drag = null;
        if (!before) return;

        const index = items.findIndex((entry) => getKey(entry) === key);
        if (index !== -1) {
            announce(
                text.cancelled({
                    label,
                    position: index + 1,
                    total: items.length,
                }),
            );
        }
        await tick();
        settle(before);
    }

    // A parent that replaces `items` mid-drag (a poll, a refetch) invalidates
    // the measured slots and the indexes; releasing would move the wrong item.
    $effect(() => {
        const keys = items.map(getKey);
        untrack(() => {
            if (!session) return;
            const stale =
                keys.length !== session.keys.length ||
                keys.some((key, index) => key !== session?.keys[index]);
            if (stale) void cancelDrag();
        });
    });

    function rowTransform(index: number): string | undefined {
        if (!drag?.active) return undefined;
        if (index === drag.from) return `translate3d(0, ${drag.offset}px, 0)`;
        if (index > drag.from && index <= drag.to) {
            return `translate3d(0, ${-drag.shift}px, 0)`;
        }
        if (index < drag.from && index >= drag.to) {
            return `translate3d(0, ${drag.shift}px, 0)`;
        }
        return undefined;
    }

    // Unmounting mid-drag must not leave listeners on `window`.
    $effect(() => stopSession);

    const controlClasses =
        "focus-ring focus-ring--muted flex size-8 shrink-0 items-center justify-center rounded-control text-description transition-colors duration-150 hover:bg-surface-hover hover:text-body motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-description";
</script>

<div
    class={cn("relative", className)}
    data-disabled={disabled ? "" : undefined}
    {...restProps}
>
    <!-- Tailwind's reset removes the markers, and Safari then drops the list
    role from a `<ul>`; the explicit role keeps "list, 5 items" announced. -->
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <ul
        bind:this={listElement}
        role="list"
        class={cn(
            "m-0 flex list-none flex-col gap-2 p-0",
            drag?.active && "select-none",
            listClass,
        )}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
    >
        {#each items as entry, index (getKey(entry))}
            {@const label = getLabel(entry)}
            {@const rowDisabled = isDisabled(entry)}
            {@const dragging = !!drag?.active && drag.key === getKey(entry)}

            {#snippet handle()}
                <!-- `touch-none`: a touch that starts on the handle drags the
                row instead of scrolling the page. -->
                <button
                    type="button"
                    class={cn(
                        controlClasses,
                        "touch-none select-none",
                        dragging ? "cursor-grabbing" : "cursor-grab",
                    )}
                    aria-label={text.handleLabel(label)}
                    aria-describedby={descriptionId}
                    disabled={rowDisabled}
                    data-sortable-handle
                    onpointerdown={(event) => handlePointerDown(event, entry)}
                    onclick={handleHandleClick}
                    onkeydown={(event) => handleKeydown(event, entry)}
                >
                    <GripVertical size={16} aria-hidden="true" />
                </button>
            {/snippet}

            {#snippet moveButtons()}
                <span class="flex shrink-0 items-center">
                    <button
                        type="button"
                        class={cn(controlClasses, "cursor-pointer")}
                        aria-label={text.moveUp(label)}
                        disabled={rowDisabled || index === 0}
                        data-sortable-move="up"
                        onclick={(event) => handleMoveClick(event, entry, -1)}
                    >
                        <ChevronUp size={16} aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        class={cn(controlClasses, "cursor-pointer")}
                        aria-label={text.moveDown(label)}
                        disabled={rowDisabled || index === items.length - 1}
                        data-sortable-move="down"
                        onclick={(event) => handleMoveClick(event, entry, 1)}
                    >
                        <ChevronDown size={16} aria-hidden="true" />
                    </button>
                </span>
            {/snippet}

            <li
                class={cn(
                    controls === "auto" && "flex items-start gap-2",
                    drag?.active &&
                        !dragging &&
                        "transition-transform duration-150 ease-out motion-reduce:transition-none",
                    dragging && "relative z-10 rounded-container shadow-lg",
                )}
                style:transform={rowTransform(index)}
                data-dragging={dragging ? "" : undefined}
            >
                {#if controls === "manual"}
                    {@render item(entry, {
                        index,
                        dragging,
                        disabled: rowDisabled,
                        handle,
                        moveButtons,
                    })}
                {:else}
                    {@render handle()}
                    <div class="min-w-0 flex-1">
                        {@render item(entry, {
                            index,
                            dragging,
                            disabled: rowDisabled,
                            handle,
                            moveButtons,
                        })}
                    </div>
                    {#if showMoveButtons}
                        {@render moveButtons()}
                    {/if}
                {/if}
            </li>
        {/each}
    </ul>

    <!-- `hidden` keeps it out of the reading order (it would be read as loose
    text after every list); `aria-describedby` still resolves hidden content. -->
    <span id={descriptionId} hidden>{text.handleDescription}</span>
    <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
    </div>
</div>
