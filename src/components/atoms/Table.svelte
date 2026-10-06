<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLTableAttributes } from 'svelte/elements';
    import { cn } from "../util/cn.js";
    import { generateId } from "../util/ssr-safe.js";

    /** `true` stacks at every width; a breakpoint name stacks below it. */
    export type TableStacked = boolean | "sm" | "md" | "lg";

    /** Other attributes (`id`, `data-*`, `aria-*`, ...) land on the `<table>`. */
    type Props = Omit<HTMLTableAttributes, 'class' | 'children'> & {
        /** `<caption>`, and the table's accessible name, when set. */
        caption?: string;
        /** Keeps the caption as the accessible name but hides it from view. */
        captionHidden?: boolean;
        /**
         * Lays each row out as a block of label and value pairs instead of
         * scrolling sideways. The label of a cell is its `data-label`
         * attribute, which the caller sets on every `<td>`.
         */
        stacked?: TableStacked;
        class?: string;
        children?: Snippet;
    };

    let {
        caption,
        captionHidden = false,
        stacked = false,
        class: className = '',
        children,
        ...restProps
    }: Props = $props();

    const captionId = generateId("table-caption");
    let tableElement = $state<HTMLTableElement>();

    /**
     * The rows arrive as `children`, so the stacked layout is written from the
     * table down. Tailwind only generates classes it can read whole, which is
     * why each breakpoint repeats the list rather than building it.
     *
     * The header row is hidden from view, not removed, so cells keep their
     * column header. The visible label is the cell's `data-label` drawn in
     * `::before`; where the browser supports alternative text for generated
     * content it is given an empty one, so a screen reader reads the column
     * header once instead of the header and then the label.
     *
     * The label takes the start of the line with an auto margin after it, and
     * the cell packs everything else at the end. So a cell's own children stay
     * together however many there are, and a cell with no label still has its
     * value on the value side. An empty cell collapses to nothing but is not
     * hidden: taking it out of the tree would shift the cells after it under
     * the wrong column headers.
     */
    const STACKED_CLASS = {
        always:
            "block min-w-0 [&>:not(thead)]:block [&>thead]:sr-only [&>*>tr]:block [&>*>tr]:py-2 " +
            "[&>*>tr>*]:flex [&>*>tr>*]:items-baseline [&>*>tr>*]:justify-end " +
            "[&>*>tr>*]:gap-4 [&>*>tr>*]:py-1 [&>*>tr>*]:text-end " +
            "[&>*>tr>:empty]:py-0 [&>*>tr>[data-label]:not(:empty)]:before:me-auto " +
            "[&>*>tr>[data-label]:not(:empty)]:before:shrink-0 " +
            "[&>*>tr>[data-label]:not(:empty)]:before:text-start " +
            "[&>*>tr>[data-label]:not(:empty)]:before:font-medium " +
            "[&>*>tr>[data-label]:not(:empty)]:before:text-headline " +
            "[&>*>tr>[data-label]:not(:empty)]:before:content-[attr(data-label)] " +
            "supports-[content:'x'/'']:[&>*>tr>[data-label]:not(:empty)]:before:content-[attr(data-label)/'']",
        sm:
            "max-sm:block max-sm:min-w-0 max-sm:[&>:not(thead)]:block max-sm:[&>thead]:sr-only " +
            "max-sm:[&>*>tr]:block max-sm:[&>*>tr]:py-2 max-sm:[&>*>tr>*]:flex " +
            "max-sm:[&>*>tr>*]:items-baseline " +
            "max-sm:[&>*>tr>*]:justify-end max-sm:[&>*>tr>*]:gap-4 " +
            "max-sm:[&>*>tr>*]:py-1 max-sm:[&>*>tr>*]:text-end max-sm:[&>*>tr>:empty]:py-0 " +
            "max-sm:[&>*>tr>[data-label]:not(:empty)]:before:me-auto " +
            "max-sm:[&>*>tr>[data-label]:not(:empty)]:before:shrink-0 " +
            "max-sm:[&>*>tr>[data-label]:not(:empty)]:before:text-start " +
            "max-sm:[&>*>tr>[data-label]:not(:empty)]:before:font-medium " +
            "max-sm:[&>*>tr>[data-label]:not(:empty)]:before:text-headline " +
            "max-sm:[&>*>tr>[data-label]:not(:empty)]:before:content-[attr(data-label)] " +
            "max-sm:supports-[content:'x'/'']:[&>*>tr>[data-label]:not(:empty)]:before:content-[attr(data-label)/'']",
        md:
            "max-md:block max-md:min-w-0 max-md:[&>:not(thead)]:block max-md:[&>thead]:sr-only " +
            "max-md:[&>*>tr]:block max-md:[&>*>tr]:py-2 max-md:[&>*>tr>*]:flex " +
            "max-md:[&>*>tr>*]:items-baseline " +
            "max-md:[&>*>tr>*]:justify-end max-md:[&>*>tr>*]:gap-4 " +
            "max-md:[&>*>tr>*]:py-1 max-md:[&>*>tr>*]:text-end max-md:[&>*>tr>:empty]:py-0 " +
            "max-md:[&>*>tr>[data-label]:not(:empty)]:before:me-auto " +
            "max-md:[&>*>tr>[data-label]:not(:empty)]:before:shrink-0 " +
            "max-md:[&>*>tr>[data-label]:not(:empty)]:before:text-start " +
            "max-md:[&>*>tr>[data-label]:not(:empty)]:before:font-medium " +
            "max-md:[&>*>tr>[data-label]:not(:empty)]:before:text-headline " +
            "max-md:[&>*>tr>[data-label]:not(:empty)]:before:content-[attr(data-label)] " +
            "max-md:supports-[content:'x'/'']:[&>*>tr>[data-label]:not(:empty)]:before:content-[attr(data-label)/'']",
        lg:
            "max-lg:block max-lg:min-w-0 max-lg:[&>:not(thead)]:block max-lg:[&>thead]:sr-only " +
            "max-lg:[&>*>tr]:block max-lg:[&>*>tr]:py-2 max-lg:[&>*>tr>*]:flex " +
            "max-lg:[&>*>tr>*]:items-baseline " +
            "max-lg:[&>*>tr>*]:justify-end max-lg:[&>*>tr>*]:gap-4 " +
            "max-lg:[&>*>tr>*]:py-1 max-lg:[&>*>tr>*]:text-end max-lg:[&>*>tr>:empty]:py-0 " +
            "max-lg:[&>*>tr>[data-label]:not(:empty)]:before:me-auto " +
            "max-lg:[&>*>tr>[data-label]:not(:empty)]:before:shrink-0 " +
            "max-lg:[&>*>tr>[data-label]:not(:empty)]:before:text-start " +
            "max-lg:[&>*>tr>[data-label]:not(:empty)]:before:font-medium " +
            "max-lg:[&>*>tr>[data-label]:not(:empty)]:before:text-headline " +
            "max-lg:[&>*>tr>[data-label]:not(:empty)]:before:content-[attr(data-label)] " +
            "max-lg:supports-[content:'x'/'']:[&>*>tr>[data-label]:not(:empty)]:before:content-[attr(data-label)/'']",
    } as const;

    const stackedClass = $derived(
        stacked === true ? STACKED_CLASS.always : stacked ? STACKED_CLASS[stacked] : "",
    );

    /**
     * Some browsers stop treating a table as one once its boxes are no longer
     * table boxes, and the rows then reach a screen reader as loose text.
     * Explicit roles keep the structure whatever `display` says. The rows are
     * the caller's markup, so the roles are set on the rendered elements and
     * kept up as rows come and go; a role the caller set is left alone.
     */
    function restoreTableRoles(table: HTMLTableElement) {
        const set = (element: Element, role: string) => {
            if (!element.hasAttribute("role")) element.setAttribute("role", role);
        };
        for (const group of table.querySelectorAll(":scope > :is(thead, tbody, tfoot)")) {
            set(group, "rowgroup");
            for (const row of group.querySelectorAll(":scope > tr")) {
                set(row, "row");
                for (const cell of row.querySelectorAll(":scope > :is(td, th)")) {
                    if (cell.tagName === "TD") set(cell, "cell");
                    else if (cell.getAttribute("scope") === "row") set(cell, "rowheader");
                    else if (cell.getAttribute("scope") === "col") set(cell, "columnheader");
                    else set(cell, group.tagName === "THEAD" ? "columnheader" : "rowheader");
                }
            }
        }
    }

    $effect(() => {
        const table = tableElement;
        if (!table || !stacked) return;

        restoreTableRoles(table);
        const observer = new MutationObserver(() => restoreTableRoles(table));
        observer.observe(table, { childList: true, subtree: true });
        return () => observer.disconnect();
    });
</script>

<div
    class={cn("overflow-x-auto rounded-control border border-border bg-card shadow-sm", className)}
>
    <table
        bind:this={tableElement}
        class={cn("w-full min-w-[20rem] border-collapse text-left text-sm text-body", stackedClass)}
        role={stacked ? "table" : undefined}
        aria-labelledby={stacked && caption ? captionId : undefined}
        {...restProps}
    >
        {#if caption}
            <caption
                id={captionId}
                class={captionHidden
                    ? "sr-only"
                    : "border-b border-border bg-surface-elevated px-4 py-3 text-left text-headline"}
            >
                {caption}
            </caption>
        {/if}
        {#if children}
            {@render children()}
        {/if}
    </table>
</div>
