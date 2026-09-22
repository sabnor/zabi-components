<script lang="ts">
    import type { Snippet } from "svelte";
    import { cn } from "../util/cn.js";

    interface Props {
        title?: string;
        /** Disambiguates generated ids when section titles repeat. */
        sectionKey?: string;
        /** `aria-label` on the `<ul>` (required when title is hidden in collapsed mode). */
        listAriaLabel: string;
        collapsed?: boolean;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        children: Snippet;
    }

    let {
        title = "",
        sectionKey = "",
        listAriaLabel,
        collapsed = false,
        class: classAttr = "",
        className: legacyClass = "",
        children,
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));

    const trimmedTitle = $derived(title.trim());
    const headingId = $derived(
        trimmedTitle
            ? `sidebar-section-${sectionKey || "group"}`
            : undefined,
    );
    const showHeading = $derived(Boolean(trimmedTitle) && !collapsed);
</script>

<div class={cn(`flex w-full flex-col gap-2 ${className}`)}>
    {#if showHeading && headingId}
        <h2
            class="px-0 text-xs font-semibold uppercase tracking-wider text-description"
            id={headingId}
        >
            {trimmedTitle}
        </h2>
    {/if}
    <ul
        class="flex w-full flex-col gap-1 px-0"
        aria-labelledby={showHeading && headingId ? headingId : undefined}
        aria-label={showHeading ? undefined : listAriaLabel}
    >
        {@render children()}
    </ul>
</div>
