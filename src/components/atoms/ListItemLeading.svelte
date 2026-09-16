<script lang="ts">
    import type { Snippet } from "svelte";

    import { cn } from "../util/cn.js";
    interface Props {
        /** e.g. `rounded-full` for avatars; default is `rounded-control` for icons. */
        class?: string;
        children?: Snippet;
    }

    let { class: className = "", children }: Props = $props();

    // cn lets a call-site radius win outright, instead of replacing the default wholesale.
    const roundingClass = $derived(cn("rounded-control", className));
</script>

<span
    class="flex size-[length:var(--spacing-xl)] shrink-0 select-none items-center justify-center overflow-hidden text-description {roundingClass}"
>
    {@render children?.()}
</span>
