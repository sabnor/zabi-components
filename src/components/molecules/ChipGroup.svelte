<script lang="ts">
    import { getContext, onMount, setContext, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";
    import { generateId } from "../util/ssr-safe.js";
    import {
        CHIP_GAP,
        CHIP_GROUP_CONTEXT_KEY,
        SELECTED_CHIP_SELECTOR,
        chipBox,
        measureRowOverflow,
        scrollLeftToReveal,
        toggleValue,
        type ChipGroupContext,
        type RowMetrics,
    } from "../util/chip.js";

    /** Other attributes (`id`, `data-*`, `aria-label`, `aria-labelledby`, ...) land on the group element. */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "onchange" | "children"> & {
        class?: string;
        /**
         * `wrap` breaks onto as many lines as it needs; `row` is one line that
         * scrolls sideways, with the chosen chip brought into view on load.
         * A group inside a group takes the layout of the one around it.
         */
        layout?: "wrap" | "row";
        /** The group's accessible name. Not shown unless `showLabel`. */
        label?: string;
        /** Show `label` as text above the group (beside it, in a group inside a group). */
        showLabel?: boolean;
        /**
         * `radio` or `checkbox`: the chips are inputs that share this group's
         * `name` and `value`. Without it the group only lays out its chips,
         * which are links or toggle buttons.
         */
        type?: "radio" | "checkbox";
        /** Name the inputs submit under. */
        name?: string;
        /**
         * What is chosen. Bindable: a string, or `undefined` for none, for
         * `radio`; an array of strings for `checkbox`.
         */
        value?: string | string[] | undefined;
        /** Disables every chip in the group. */
        disabled?: boolean;
        /** With `layout="row"`: `fade` dims the edge that has more chips beyond it; `none` never does. */
        edge?: "fade" | "none";
        /** With `layout="row"`: bring the chosen chip into view when the row appears. */
        scrollSelectedIntoView?: boolean;
        /** Called with the new `value` when a person changes it. */
        onchange?: (value: string | string[] | undefined) => void;
        children?: Snippet;
    };

    let {
        class: className = "",
        layout = "wrap",
        label = "",
        showLabel = false,
        type,
        name,
        value = $bindable<Props["value"]>(),
        disabled = false,
        edge = "fade",
        scrollSelectedIntoView = true,
        onchange,
        children,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop (see Rating): a checkbox group starts
    // empty, here, so the server renders it and `bind:value={undefined}` works.
    const applyDefaults = () => {
        if (type === "checkbox" && value === undefined) value = [];
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    /** A group inside a group is a sub-group: it names its chips and does not scroll or wrap on its own. */
    const parent = getContext<ChipGroupContext | undefined>(CHIP_GROUP_CONTEXT_KEY);
    const nested = parent !== undefined;
    const effectiveLayout = $derived(parent ? parent.layout : layout);

    function isSelected(chip: string): boolean {
        if (type === "radio") return value === chip;
        if (type === "checkbox") return Array.isArray(value) && value.includes(chip);
        return false;
    }

    setContext<ChipGroupContext>(CHIP_GROUP_CONTEXT_KEY, {
        get type() {
            return type;
        },
        get name() {
            return name;
        },
        get layout() {
            return effectiveLayout;
        },
        get disabled() {
            return disabled;
        },
        get radioValue() {
            return type === "radio" && typeof value === "string" ? value : undefined;
        },
        isSelected,
        change(chip, checked, report) {
            if (type === "radio") {
                // Single selection never clears: unchecking is not a thing a radio does.
                if (!checked) return;
                value = chip;
            } else if (type === "checkbox") {
                value = toggleValue(Array.isArray(value) ? value : [], chip, checked);
            } else {
                return;
            }
            if (report) onchange?.(value);
        },
        restore() {
            if (type === "radio") value = undefined;
        },
    });

    const labelId = generateId("chip-group-label");
    const role = $derived(type === "radio" ? "radiogroup" : "group");
    const isRow = $derived(effectiveLayout === "row");
    /** Only the outermost row scrolls; a sub-group is just inline. */
    const scrolls = $derived(isRow && !nested);

    // ---- The one-row layout: the chosen chip in view, and the edge cue. ----

    let scroller = $state<HTMLDivElement | null>(null);
    let overflowStart = $state(false);
    let overflowEnd = $state(false);

    function metricsOf(element: HTMLElement): RowMetrics {
        return {
            scrollLeft: element.scrollLeft,
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
            rtl: getComputedStyle(element).direction === "rtl",
        };
    }

    function measure() {
        if (!scroller) return;
        const overflow = measureRowOverflow(metricsOf(scroller));
        overflowStart = overflow.start;
        overflowEnd = overflow.end;
    }

    /** Room kept between the revealed chip and the edge: one gap, and the fade when there is one. */
    const FADE_WIDTH = 24;

    /** Scrolls the row, and only the row (it sets `scrollLeft`, so the page cannot move). Not animated. */
    function revealSelected() {
        const row = scroller;
        if (!row) return;
        const selected = row.querySelector(SELECTED_CHIP_SELECTOR);
        if (!selected) return;
        const box = row.getBoundingClientRect();
        const item = chipBox(selected).getBoundingClientRect();
        row.scrollLeft = scrollLeftToReveal(
            metricsOf(row),
            { left: box.left, right: box.right },
            { left: item.left, right: item.right },
            edge === "fade" ? CHIP_GAP + FADE_WIDTH : CHIP_GAP,
        );
    }

    let revealed = false;
    onMount(() => {
        if (!revealed && scroller && scrolls && scrollSelectedIntoView) revealSelected();
        revealed = true;
    });

    $effect(() => {
        const row = scroller;
        if (!row || !scrolls) {
            overflowStart = false;
            overflowEnd = false;
            return;
        }
        measure();
        row.addEventListener("scroll", measure, { passive: true });
        let sizes: ResizeObserver | undefined;
        let nodes: MutationObserver | undefined;
        if (typeof ResizeObserver !== "undefined") {
            const sized = new ResizeObserver(measure);
            sizes = sized;
            const watch = () => {
                sized.disconnect();
                sized.observe(row);
                for (const child of row.children) sized.observe(child);
            };
            watch();
            if (typeof MutationObserver !== "undefined") {
                nodes = new MutationObserver(() => {
                    watch();
                    measure();
                });
                nodes.observe(row, { childList: true });
            }
        }
        return () => {
            row.removeEventListener("scroll", measure);
            sizes?.disconnect();
            nodes?.disconnect();
        };
    });

    const hostClasses = $derived.by(() => {
        if (nested) {
            return cn(isRow ? "flex shrink-0 items-center gap-2" : "flex flex-wrap items-center gap-2", className);
        }
        if (isRow) {
            // 4px of room on every side for the focus ring, which the scrolling box
            // would clip, taken back by the negative margin (as Tabs does).
            return cn(
                "chip-row -m-1 flex flex-nowrap items-center gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain p-1 scroll-px-8 has-[>[data-chip-subgroup]]:gap-6",
                className,
            );
        }
        return cn("flex flex-wrap items-center gap-2 has-[>[data-chip-subgroup]]:gap-x-6", className);
    });
</script>

{#snippet group(labelledBy: string | undefined)}
    <div
        bind:this={scroller}
        {role}
        class={hostClasses}
        aria-label={labelledBy ? undefined : label || undefined}
        aria-labelledby={labelledBy}
        data-chip-subgroup={nested ? "" : undefined}
        data-layout={nested ? undefined : effectiveLayout}
        data-overflow-start={scrolls && edge === "fade" && overflowStart ? "" : undefined}
        data-overflow-end={scrolls && edge === "fade" && overflowEnd ? "" : undefined}
        {...restProps}
    >
        {#if nested && showLabel && label}
            <span id={labelId} class="shrink-0 text-sm font-medium whitespace-nowrap text-label">{label}</span>
        {/if}
        {@render children?.()}
    </div>
{/snippet}

{#if !nested && showLabel && label}
    <div class="flex flex-col gap-2">
        <span id={labelId} class="text-sm font-medium text-label">{label}</span>
        {@render group(labelId)}
    </div>
{:else if nested && showLabel && label}
    {@render group(labelId)}
{:else}
    {@render group(undefined)}
{/if}

<style>
    /*
     * One line that scrolls sideways, with no scrollbar. The edge cue is a
     * mask, not a gradient laid over the chips, so it fades them into any
     * background, a brand block included, and nothing sits on a chip or its
     * focus ring. Only a side with more chips beyond it fades (the component
     * writes data-overflow-start and -end after it has measured), and there
     * is none on the server. The mask is physical; start is the right edge
     * in a right-to-left row.
     */
    :global(.chip-row) {
        scrollbar-width: none;
    }

    :global(.chip-row::-webkit-scrollbar) {
        display: none;
    }

    :global(.chip-row[data-overflow-start]),
    :global(.chip-row[data-overflow-end]) {
        --chip-fade-start: 0px;
        --chip-fade-end: 0px;
        --chip-fade-left: var(--chip-fade-start);
        --chip-fade-right: var(--chip-fade-end);
    }

    :global(.chip-row[data-overflow-start]) {
        --chip-fade-start: 1.5rem;
    }

    :global(.chip-row[data-overflow-end]) {
        --chip-fade-end: 1.5rem;
    }

    :global(.chip-row[data-overflow-start]:dir(rtl)),
    :global(.chip-row[data-overflow-end]:dir(rtl)) {
        --chip-fade-left: var(--chip-fade-end);
        --chip-fade-right: var(--chip-fade-start);
    }

    :global(.chip-row[data-overflow-start]),
    :global(.chip-row[data-overflow-end]) {
        -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black var(--chip-fade-left),
            black calc(100% - var(--chip-fade-right)),
            transparent
        );
        mask-image: linear-gradient(
            to right,
            transparent,
            black var(--chip-fade-left),
            black calc(100% - var(--chip-fade-right)),
            transparent
        );
    }

    /* Forced colours: a half-transparent label is harder to read than a cut-off one. */
    @media (forced-colors: active) {
        :global(.chip-row[data-overflow-start]),
        :global(.chip-row[data-overflow-end]) {
            -webkit-mask-image: none;
            mask-image: none;
        }
    }
</style>
