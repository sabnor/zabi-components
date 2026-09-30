<script lang="ts">
    import { getContext, onDestroy, setContext, untrack, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { ChevronDown } from "@lucide/svelte";
    import { cn } from "../util/cn.js";
    import { generateId } from "../util/ssr-safe.js";
    import {
        COLLAPSIBLE_GROUP,
        type CollapsibleGroupContext,
        type CollapsibleGroupMember,
        type CollapsibleHeadingLevel,
        type CollapsibleTriggerProps,
        type CollapsibleTriggerState,
    } from "../util/collapsible.js";

    /** Other attributes (`id`, `data-*`, ...) land on the host `<div>`. */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "title"> & {
        /** Extra classes for the host element. */
        class?: string;
        /** Extra classes for the default trigger button. */
        triggerClass?: string;
        /** Extra classes for the panel. */
        panelClass?: string;
        /** Whether the panel is shown; supports `bind:open`. */
        open?: boolean;
        /** Called when the user toggles the panel, or a group closes it. */
        onopenchange?: (open: boolean) => void;
        /** The trigger cannot be activated. The panel keeps its current state. */
        disabled?: boolean;
        /** Text of the default trigger, a full-width header button with a chevron. */
        title?: string;
        /**
         * Your own header, in place of the default trigger. Spread the first
         * argument on a `<button>`; the second carries the open state.
         */
        trigger?: Snippet<[CollapsibleTriggerProps, CollapsibleTriggerState]>;
        /** Wraps the default trigger in `<h1>`–`<h6>`. No heading when omitted. */
        headingLevel?: CollapsibleHeadingLevel;
        /**
         * Closed content is kept in the DOM under `hidden`, so a form inside it
         * keeps its values. Set this to remove the content while closed instead.
         */
        unmountOnClose?: boolean;
        /**
         * Gives the panel `role="region"`, which makes it a landmark. Defaults
         * to true only inside a single-open `CollapsibleGroup`.
         */
        region?: boolean;
        children?: Snippet;
    };

    let {
        class: className = "",
        triggerClass = "",
        panelClass = "",
        open = $bindable(false),
        onopenchange,
        disabled = false,
        title,
        trigger,
        headingLevel,
        unmountOnClose = false,
        region,
        children,
        ...restProps
    }: Props = $props();

    const triggerId = generateId("collapsible-trigger");
    const panelId = generateId("collapsible-panel");

    const group = getContext<CollapsibleGroupContext | undefined>(COLLAPSIBLE_GROUP);
    // A Collapsible inside this panel is not a member of the group around it:
    // opening it must not close the panel it lives in.
    setContext(COLLAPSIBLE_GROUP, undefined);

    function setOpen(next: boolean) {
        if (open === next) return;
        open = next;
        onopenchange?.(next);
    }

    function toggle() {
        if (disabled) return;
        setOpen(!open);
    }

    const member: CollapsibleGroupMember = {
        triggerId,
        isOpen: () => open,
        close: () => setOpen(false),
    };

    if (group) onDestroy(group.register(member));

    // An effect rather than a call in `toggle`, so a panel opened from outside
    // through `bind:open` closes its siblings as well. Untracked, because the
    // group reads the siblings' state: tracking that would re-run this effect
    // when a sibling opens, and the two would close each other.
    $effect(() => {
        if (open) untrack(() => group?.opened(member));
    });

    const triggerProps = $derived({
        id: triggerId,
        type: "button",
        "aria-expanded": open,
        "aria-controls": panelId,
        disabled,
        onclick: toggle,
        "data-collapsible-trigger": "",
    } satisfies CollapsibleTriggerProps);

    /**
     * A region is a landmark, and a page of them is noise (the WAI-ARIA
     * accordion pattern warns against it). In a single-open group at most one
     * panel is exposed at a time, so a region is safe there. Everywhere else
     * the panel is a plain named group unless the caller asks for a region.
     */
    const panelRole = $derived(
        (region ?? (group ? !group.multiple : false)) ? "region" : "group",
    );
</script>

{#snippet defaultTrigger()}
    <button
        {...triggerProps}
        class={cn(
            "focus-ring flex w-full cursor-pointer items-center justify-between gap-2 rounded-control px-3 py-2 text-left text-sm font-medium text-headline transition-colors duration-150 hover:bg-surface-hover motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
            triggerClass,
        )}
    >
        <span class="min-w-0 flex-1">{title}</span>
        <ChevronDown
            size={16}
            aria-hidden="true"
            class={cn(
                "shrink-0 text-description transition-transform duration-150 motion-reduce:transition-none",
                open && "rotate-180",
            )}
        />
    </button>
{/snippet}

<div
    class={cn(className)}
    data-state={open ? "open" : "closed"}
    data-disabled={disabled ? "" : undefined}
    {...restProps}
>
    {#if trigger}
        {@render trigger(triggerProps, { open, disabled })}
    {:else if headingLevel}
        <svelte:element this={`h${headingLevel}`} class="m-0">
            {@render defaultTrigger()}
        </svelte:element>
    {:else}
        {@render defaultTrigger()}
    {/if}

    <!-- `hidden` is `display: none`: closed content takes no focus and is not
    in the accessibility tree. The element itself stays, so `aria-controls`
    always points at something. -->
    <div
        id={panelId}
        role={panelRole}
        aria-labelledby={triggerId}
        hidden={!open}
        class={cn(!trigger && "px-3 pb-3 pt-1", panelClass)}
    >
        {#if open || !unmountOnClose}
            {@render children?.()}
        {/if}
    </div>
</div>
