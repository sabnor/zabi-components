<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        /** Disambiguates generated ids when section titles repeat. */
        sectionKey?: string;
        /** `aria-label` on the `<ul>` (required when title is hidden in collapsed mode). */
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

<div class={`flex w-full flex-col gap-1.5 ${className}`.trim()}>
    {#if showHeading && headingId}
        <h2
            class="px-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-description"
            id={headingId}
        >
            {trimmedTitle}
        </h2>
    {/if}
    <ul
        class="flex w-full flex-col gap-0.5 px-0"
        aria-labelledby={showHeading && headingId ? headingId : undefined}
        aria-label={showHeading ? undefined : listAriaLabel}
    >
        {@render children()}
    </ul>
</div>
