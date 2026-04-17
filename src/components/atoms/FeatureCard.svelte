<script lang="ts">
    import type { Component, Snippet } from "svelte";

    interface Props {
        /** Feature title. Kept intentionally short — one line at most. */
        title: string;
        /** Supporting copy. Optional; omit for a title-only card. */
        description?: string;
        /** Lucide (or any) icon component rendered in the top-left slot. */
        icon?: Component<{ size?: number; class?: string }>;
        /** Optional footer content (e.g. a link or CTA). */
        children?: Snippet;
        /** Extra classes forwarded to the root element. */
        class?: string;
    }

    let {
        title,
        description,
        icon: Icon,
        children,
        class: className = "",
    }: Props = $props();
</script>

<article
    class="flex flex-col gap-3 p-6 rounded-2xl bg-surface-1 border border-base-200 transition-colors duration-200 hover:border-base-300 {className}"
>
    {#if Icon}
        <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600"
            aria-hidden="true"
        >
            <Icon size={20} />
        </span>
    {/if}

    <div class="flex flex-col gap-1.5">
        <h3 class="text-base font-semibold leading-snug text-headline">
            {title}
        </h3>
        {#if description}
            <p class="text-sm leading-relaxed text-description">
                {description}
            </p>
        {/if}
    </div>

    {#if children}
        <div class="mt-2">
            {@render children()}
        </div>
    {/if}
</article>
