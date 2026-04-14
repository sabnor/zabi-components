<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        /** Short section label above the list (hidden when collapsed). */
        title?: string;
        /** Stable id fragment so duplicate titles stay unique in the DOM. */
        sectionKey?: string;
        /** Accessible name for the list when no visible title is shown. */
        listAriaLabel: string;
        collapsed?: boolean;
        className?: string;
        children: Snippet;
    }

    let {
        title = "",
        sectionKey = "",
        listAriaLabel,
        collapsed = false,
        className = "",
        children,
    }: Props = $props();

    const trimmedTitle = $derived(title.trim());
    const headingId = $derived(
        trimmedTitle
            ? `sidebar-section-${sectionKey || "group"}`
            : undefined,
    );
    const showHeading = $derived(Boolean(trimmedTitle) && !collapsed);
</script>

<div class={`flex w-full flex-col gap-2 ${className}`.trim()}>
    {#if showHeading && headingId}
        <h2
            class="px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-description"
            id={headingId}
        >
            {trimmedTitle}
        </h2>
    {/if}
    <ul
        class="flex w-full flex-col gap-1 px-2"
        aria-labelledby={showHeading && headingId ? headingId : undefined}
        aria-label={showHeading ? undefined : listAriaLabel}
    >
        {@render children()}
    </ul>
</div>
