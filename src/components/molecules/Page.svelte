<script lang="ts">
    import type { Snippet } from "svelte";
    import { isInsideAppShell } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";

    interface Props {
        children?: Snippet;
        /**
         * Keeps the content out from under a notch at the side (a phone held
         * sideways) and the home indicator at the bottom, by padding the page
         * with the safe-area insets. They are zero on a screen without them,
         * and until the app asks for them with `viewport-fit=cover`.
         *
         * Inside an `AppShell` the page adds nothing, whatever this says: the
         * shell has already kept its content clear. Set it to false when
         * something else of yours has, such as padding on `<body>`.
         */
        safeArea?: boolean;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
    }

    let {
        children,
        safeArea = true,
        class: classAttr = "",
        className: legacyClass = "",
    }: Props = $props();

    const inShell = isInsideAppShell();

    /** `class` is the public prop; `className` is a deprecated alias. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));
</script>

<div
    class={cn(
        "mx-auto w-full space-y-10",
        // Left and right, not start and end: a notch is on a side of the
        // device, whichever way the text runs.
        safeArea &&
            !inShell &&
            "pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)]",
        className,
    )}
    data-safe-area={safeArea && !inShell ? "" : undefined}
>
    {#if children}
        {@render children()}
    {/if}
</div>
