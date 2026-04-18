<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        /** Visible `<caption>` when set. */
        caption?: string;
        class?: string;
        children?: Snippet;
    }

    let { caption, class: className = '', children }: Props = $props();
</script>

<div
    class="overflow-x-auto rounded-lg border border-border shadow-sm {className}"
>
    <table class="w-full min-w-[20rem] border-collapse text-left text-sm text-body">
        {#if caption}
            <caption class="border-b border-border bg-base-50 px-4 py-3 text-left text-headline">
                {caption}
            </caption>
        {/if}
        {#if children}
            {@render children()}
        {/if}
    </table>
</div>
