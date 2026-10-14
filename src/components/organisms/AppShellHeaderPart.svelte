<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { getAppShell, markAppShell } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";

    /**
     * One part of an `AppShell` header, and the choice of whether it stays at
     * the top of the screen or scrolls away with the content.
     *
     * Put the parts side by side in the shell's `header` snippet, in the order
     * they are drawn: an `AppBar`, a search field, a row of filter chips,
     * tabs, anything. The shell leaves a header without parts as it was (the
     * whole header sticks).
     *
     * ```svelte
     * <AppShell>
     *     {#snippet header()}
     *         <AppShellHeaderPart sticky={false}><AppBar title="Quizzes" /></AppShellHeaderPart>
     *         <AppShellHeaderPart class="px-4 py-2"><FilterChips /></AppShellHeaderPart>
     *     {/snippet}
     *     …
     * </AppShell>
     * ```
     *
     * A part that sticks is in the flow like any other, so nothing is measured
     * to make a part that does not stick leave: it is content. Parts that
     * stick stack under one another in the order of the document, with no gap
     * and no overlap, however many parts that do not stick are between them.
     * The shell measures the heights to place them, and reports only what
     * covers content at that moment as `--app-shell-top-inset` (so
     * `scroll-padding-top`, a focused field and an anchor clear exactly the
     * stuck parts).
     *
     * The parts look like one surface: the page colour at rest, glass and one
     * hairline under the lowest stuck part once content is under it. The
     * status bar is covered by whatever is topmost: an `AppBar` pads for it
     * itself, any other first part gets the padding, and a part that sticks
     * further down has a strip of the same surface above it.
     *
     * Keep the parts that stick short: with more than 40% of the screen
     * covered (landscape, 200% text), the lower ones stop sticking and scroll
     * with the content (`data-released`).
     *
     * An `AppBar` with `largeTitle` condenses inside its part as it does in a
     * header without parts. `collapseOnScroll` is for a header without parts;
     * in a part that sticks it leaves its space behind.
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
        /** The part's content. */
        children?: Snippet;
        /**
         * Stays at the top of the screen under the parts that stick above it
         * (`true`, the default), or scrolls away with the content (`false`).
         */
        sticky?: boolean;
        class?: string;
    };

    let { children, sticky = true, class: className = "", ...restProps }: Props = $props();

    const shell = getAppShell();

    /** How far this part sticks above the top: a large title's row (px), told by the `AppBar` inside it. */
    let overscroll = $state(0);

    // The bars inside report to this part, not to the shell: the part is the thing that sticks.
    if (shell) {
        markAppShell({
            get scrolledTop() {
                return shell.scrolledTop;
            },
            get scrolledBottom() {
                return shell.scrolledBottom;
            },
            get footerOverlays() {
                return shell.footerOverlays;
            },
            get footerHeight() {
                return shell.footerHeight;
            },
            get navigationPlacement() {
                return shell.navigationPlacement;
            },
            setHeaderOverscroll(px) {
                overscroll = px > 0 ? px : 0;
            },
        });
    }
</script>

<!-- The glass and the hairline are the bar surface (`material-bar`). It is left
off a part that holds an `AppBar`, which has its own; the stylesheet below also
takes the hairline off every stuck part but the lowest. -->
<div
    data-app-shell-part
    data-sticky={String(sticky)}
    data-overscroll={overscroll > 0 ? overscroll : undefined}
    data-scrolled-under={sticky ? String(shell?.scrolledTop ?? false) : undefined}
    class={cn("shrink-0", sticky && "material-bar", className)}
    {...restProps}
>
    {@render children?.()}
</div>

<style>
    /*
     * Global on purpose: the rules read the shell's own markup (the header
     * wrapper, the strip) and the part's siblings, and a scoped class would
     * not reach an AppBar inside it.
     *
     * A part that sticks. The offset is written by the shell once it has
     * measured (`--app-shell-part-top`); until then, on the server and without
     * scripts, the first part sticks at 0 (it is the top, or an AppBar that
     * pads the status bar itself) or under the status bar strip, and a later
     * one under an estimate of an AppBar.
     */
    :global([data-app-shell-part][data-sticky="true"]:not([data-released])) {
        position: sticky;
        z-index: var(--z-sticky);
        top: var(--app-shell-part-top, env(safe-area-inset-top, 0px));
    }
    :global([data-app-shell-header] > [data-app-shell-part][data-sticky="true"]:not([data-released]):first-child),
    :global([data-app-shell-part][data-sticky="true"]:not([data-released]):has([data-appbar])) {
        top: var(--app-shell-part-top, 0px);
    }
    :global(
        [data-app-shell-part][data-sticky="true"]:not([data-released])
            ~ [data-app-shell-part][data-sticky="true"]:not([data-released])
    ) {
        top: var(--app-shell-part-top, calc(56px + env(safe-area-inset-top, 0px)));
    }

    /* Released on a short screen: the surface goes with the stickiness. */
    :global([data-app-shell-part][data-released]::before) {
        display: none;
    }

    /* An AppBar inside has the surface already. */
    :global([data-app-shell-part]:has([data-appbar])::before) {
        display: none;
    }

    /* One surface, one hairline: only the lowest stuck part draws it (in forced colours too). */
    :global(
        [data-app-shell-part][data-sticky="true"]:not([data-released]):has(
                ~ [data-app-shell-part][data-sticky="true"]:not([data-released])
            )::before
    ),
    :global(
        [data-app-shell-part][data-sticky="true"]:not([data-released]):has(
                ~ [data-app-shell-part][data-sticky="true"]:not([data-released])
            )
            .material-bar::before
    ) {
        border-color: transparent !important;
    }

    /* The first part reaches the top of the screen: it clears the status bar, unless an AppBar does. */
    :global([data-app-shell-header] > [data-app-shell-part]:first-child:not(:has([data-appbar]))) {
        padding-top: env(safe-area-inset-top, 0px);
    }
</style>
