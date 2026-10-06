<script lang="ts">
    import { setContext, untrack, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";
    import {
        COLLAPSIBLE_GROUP,
        nextTriggerIndex,
        type CollapsibleGroupContext,
        type CollapsibleGroupMember,
    } from "../util/collapsible.js";

    /** Other attributes (`id`, `aria-label`, `data-*`, ...) land on the host `<div>`. */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
        /** Extra classes for the host element. */
        class?: string;
        /** Lets several panels be open at once. By default opening one closes the others. */
        multiple?: boolean;
        /** The `Collapsible` components to coordinate. */
        children?: Snippet;
    };

    let {
        class: className = "",
        multiple = false,
        onkeydown,
        children,
        ...restProps
    }: Props = $props();

    let hostElement: HTMLDivElement | undefined = $state();

    /** In the order the Collapsibles were created. */
    const members = new Set<CollapsibleGroupMember>();

    /** A disabled panel keeps its state, so it neither holds the one open slot nor loses it. */
    function holdsTheSlot(member: CollapsibleGroupMember): boolean {
        return member.isOpen() && !member.isDisabled();
    }

    function closeOthers(keep: CollapsibleGroupMember) {
        for (const member of members) {
            if (member !== keep && holdsTheSlot(member)) member.close();
        }
    }

    setContext<CollapsibleGroupContext>(COLLAPSIBLE_GROUP, {
        get multiple() {
            return multiple;
        },
        register(member) {
            // Settled here, while the members initialise, so the first render
            // (the server's included) already shows one open panel.
            const startClosed =
                !multiple &&
                holdsTheSlot(member) &&
                [...members].some(holdsTheSlot);
            members.add(member);
            return { unregister: () => members.delete(member), startClosed };
        },
        opened(member) {
            // A disabled panel is outside the one-open rule in both
            // directions: it is not closed, and it closes nothing.
            if (!multiple && !member.isDisabled()) closeOthers(member);
        },
    });

    // Going from `multiple` back to single: the first open panel stays.
    $effect(() => {
        if (multiple) return;
        untrack(() => {
            const first = [...members].find(holdsTheSlot);
            if (first) closeOthers(first);
        });
    });

    /**
     * The optional keys of the accordion pattern, between this group's own
     * header buttons. A trigger nested in a panel belongs to no group, or to
     * an inner one, and is left alone; Tab is never touched.
     */
    function handleKeydown(
        event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement },
    ) {
        onkeydown?.(event);
        if (event.defaultPrevented) return;
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        const target = event.target;
        if (!(target instanceof HTMLElement) || !hostElement) return;

        const ids = new Set([...members].map((member) => member.triggerId));
        if (!ids.has(target.id)) return;

        // Read from the DOM so the order is the visual one. A disabled button
        // cannot take focus, so it is skipped.
        const triggers = Array.from(
            hostElement.querySelectorAll<HTMLButtonElement>(
                "[data-collapsible-trigger]",
            ),
        ).filter((element) => ids.has(element.id) && !element.disabled);

        const next = nextTriggerIndex(
            event.key,
            triggers.indexOf(target as HTMLButtonElement),
            triggers.length,
        );
        if (next === null) return;

        // Also keeps the arrow keys from scrolling the page under the header.
        event.preventDefault();
        triggers[next]?.focus();
    }
</script>

<!-- The listener only moves focus between buttons that are already in the
tab order; the group itself is not interactive. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    bind:this={hostElement}
    class={cn("flex flex-col", className)}
    data-collapsible-group=""
    data-multiple={multiple ? "" : undefined}
    {...restProps}
    onkeydown={handleKeydown}
>
    {@render children?.()}
</div>
