<script lang="ts">
    import type { Component } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { Plus } from "@lucide/svelte";
    import { findScrollParent, isInsideAppShell } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";
    import { reserveScrollPaddingBottom } from "../util/scroll-padding.js";

    /**
     * The one main thing to do on a screen, as a round button that floats over
     * the content: new quiz, compose, add.
     *
     * Inside an `AppShell` it is placed against the shell, 16px above the tab
     * bar. On its own it is fixed to the screen, 16px above the home
     * indicator; if something else is fixed to the bottom there (a
     * `BottomTabBar` on its own), say how tall it is with
     * `--fab-bottom-offset` on the button or any ancestor:
     *
     * ```svelte
     * <FloatingActionButton
     *     label="New quiz"
     *     onclick={create}
     *     style="--fab-bottom-offset: calc(4rem + 1px)"
     * />
     * ```
     *
     * It lies over the content, so the last row would stay under it at the
     * end of the page. Give the content room to scroll clear: `pb-24` (96px)
     * on the list covers the button and its margins.
     *
     * While it is mounted it sets `scroll-padding-bottom` on what scrolls
     * under it (the shell's content, or the page) to the height it takes
     * from the bottom, so a row that takes keyboard focus is scrolled clear
     * of the button and not left half under it.
     */
    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        /** What the button does. Its accessible name, and its text when `extended`. */
        label: string;
        /** An icon component, as `@lucide/svelte` icons are. A plus sign by default. */
        icon?: Component<{ size?: number; class?: string }>;
        /** Shows the label as text beside the icon. */
        extended?: boolean;
        /** Makes it a link to this address. Without it, it is a button. */
        href?: string;
        /**
         * The bottom corner it sits in. `bottom-end` is the right in a
         * left-to-right page and the left in a right-to-left one.
         */
        position?: "bottom-end" | "bottom-start" | "bottom-center";
        class?: string;
    };

    let {
        label,
        icon,
        extended = false,
        href,
        position = "bottom-end",
        class: className = "",
        ...restProps
    }: Props = $props();

    const inShell = isInsideAppShell();
    const Icon = $derived(icon ?? Plus);

    let host = $state<HTMLElement>();

    /**
     * The browser scrolls a focused control into view, to the edge of the
     * scroll container: under this button, which lies over that edge. The
     * room it takes, from its top edge to the bottom of the container, is
     * reserved through the helper the bars use, so the largest request wins.
     */
    $effect(() => {
        const button = host;
        if (!button) return;
        const scroller = findScrollParent(button);
        const reservation = reserveScrollPaddingBottom(scroller ?? document.documentElement);
        const reserve = () => {
            const top = button.getBoundingClientRect().top;
            const bottom = scroller
                ? scroller.getBoundingClientRect().bottom
                : document.documentElement.clientHeight;
            // No layout (a test DOM, a hidden button): nothing to keep clear of.
            reservation.set(button.offsetHeight > 0 ? Math.max(0, Math.ceil(bottom - top)) : 0);
        };
        reserve();
        const observer =
            typeof ResizeObserver === "function" ? new ResizeObserver(reserve) : undefined;
        observer?.observe(button);
        if (scroller) observer?.observe(scroller);
        window.addEventListener("resize", reserve);
        return () => {
            observer?.disconnect();
            window.removeEventListener("resize", reserve);
            reservation.release();
        };
    });

    /**
     * 16px from the edges, in px: a margin that grew with the text size would
     * push the button into the content it floats over. The side clears a
     * notch in landscape, whichever side that is on.
     */
    const positionClasses = $derived(
        {
            "bottom-end":
                "end-[calc(16px+max(env(safe-area-inset-left,0px),env(safe-area-inset-right,0px)))]",
            "bottom-start":
                "start-[calc(16px+max(env(safe-area-inset-left,0px),env(safe-area-inset-right,0px)))]",
            // Not `left-1/2` with a shift back: that leaves the button half
            // the width to lay its label out in.
            "bottom-center": "inset-x-0 mx-auto w-fit",
        }[position] ??
            "end-[calc(16px+max(env(safe-area-inset-left,0px),env(safe-area-inset-right,0px)))]",
    );

    const classes = $derived(
        cn(
            "focus-ring z-sticky inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill no-underline shadow-lg select-none",
            // Round: 56px in px, like the 24px icon in it, so it does not
            // double with the text size and cover twice the content.
            // Extended: it holds text, so its height follows the text; it
            // grows sideways, and downwards if the label wraps.
            extended ? "min-h-14 min-w-14" : "size-[56px]",
            // Transparent until forced-colors mode draws it: the fill is gone there.
            "border border-transparent",
            "bg-action-primary text-action-primary",
            "transition-[background-color,scale] duration-150 active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100",
            extended ? "px-5 py-2 text-sm font-medium" : "p-0",
            // Never wider than the screen it floats on, margins included.
            "[max-inline-size:calc(100%_-_32px)]",
            inShell
                ? "absolute bottom-[calc(var(--app-shell-bottom-inset,0px)+var(--fab-bottom-offset,0px)+16px)]"
                : "fixed bottom-[calc(env(safe-area-inset-bottom,0px)+var(--fab-bottom-offset,0px)+16px)]",
            positionClasses,
            className,
        ),
    );
</script>

{#snippet content()}
    <!-- Decorative: the label names the button, shown or not. -->
    <span class="flex size-[24px] shrink-0" aria-hidden="true">
        <Icon size={24} />
    </span>
    {#if extended}
        <span class="min-w-0 [overflow-wrap:anywhere]">{label}</span>
    {/if}
{/snippet}

{#if href !== undefined}
    <a
        bind:this={host}
        {href}
        class={classes}
        aria-label={extended ? undefined : label}
        data-position={position}
        {...restProps}
    >
        {@render content()}
    </a>
{:else}
    <button
        bind:this={host}
        type="button"
        class={classes}
        aria-label={extended ? undefined : label}
        data-position={position}
        {...restProps}
    >
        {@render content()}
    </button>
{/if}
