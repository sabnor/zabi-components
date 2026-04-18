<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        /** e.g. `rounded-full` for avatars; default is `rounded-md` for icons. */
        class?: string;
        children?: Snippet;
    }

    let { class: className = "", children }: Props = $props();

    const roundingClass = $derived(className.trim() ? className.trim() : "rounded-md");
</script>

<span
    class="flex size-[length:var(--spacing-xl)] shrink-0 select-none items-center justify-center overflow-hidden text-description {roundingClass}"
>
    {@render children?.()}
</span>
