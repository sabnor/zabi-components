<script lang="ts">
    import { getContext, onDestroy, setContext, untrack, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import { cn } from "../util/cn.js";
    import { generateId, isBrowser } from "../util/ssr-safe.js";
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
        /** Extra classes for the default trigger (a `<summary>`). */
        triggerClass?: string;
        /** Extra classes for the panel. */
        panelClass?: string;
        /** Whether the panel is shown; supports `bind:open`. */
        open?: boolean;
        /** Called when the user toggles the panel, or a group closes it. */
        onopenchange?: (open: boolean) => void;
        /**
         * The trigger cannot be activated. The panel keeps its current state:
         * a group does not close a disabled panel either.
         */
        disabled?: boolean;
        /**
         * Text of the default trigger, a full-width header with a chevron. It is
         * a native `<details>` / `<summary>`, so it opens and closes without
         * scripts: before hydration, and for a visitor who has none.
         */
        title?: string;
        /**
         * Your own header, in place of the default trigger. Spread the first
         * argument on a `<button>`; the second carries the open state. This
         * path needs scripts: the button and the `hidden` panel are yours to
         * wire, and nothing opens until the page has hydrated. Use `title` for
         * content that must open without scripts.
         */
        trigger?: Snippet<[CollapsibleTriggerProps, CollapsibleTriggerState]>;
        /** Wraps the default trigger in `<h1>`–`<h6>`. No heading when omitted. */
        headingLevel?: CollapsibleHeadingLevel;
        /**
         * Closed content stays in the DOM, inside the closed `<details>`, so a
         * form inside it keeps its values and still submits them: closed
         * details content is part of the form. Set this to remove the content
         * while closed instead.
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
        open = $bindable<Exclude<Props["open"], undefined>>(),
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

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (open === undefined) open = false;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    const triggerId = generateId("collapsible-trigger");
    const panelId = generateId("collapsible-panel");

    const group = getContext<CollapsibleGroupContext | undefined>(COLLAPSIBLE_GROUP);
    // A Collapsible inside this panel is not a member of the group around it:
    // opening it must not close the panel it lives in.
    setContext(COLLAPSIBLE_GROUP, undefined);

    /**
     * True for a panel that asked to start open in a single-open group that
     * already had one. It renders closed from the first render, the server's
     * included, and `open` is brought in line after mount. Nobody changed
     * anything, so `onopenchange` is not called for it.
     */
    let startClosed = $state(false);
    /** What is rendered. Everything below reads this, not `open`. */
    const isOpen = $derived(open && !startClosed);

    let panelElement: HTMLDivElement | undefined = $state();

    function setOpen(next: boolean) {
        if (isOpen === next) return;
        open = next;
        onopenchange?.(next);
    }

    function toggle() {
        if (disabled) return;
        setOpen(!isOpen);
    }

    const member: CollapsibleGroupMember = {
        triggerId,
        // Spelled out rather than `isOpen`: the group asks while this
        // component is still initialising, before `startClosed` is known, and
        // on the server a derived value keeps its first answer.
        isOpen: () => open && !startClosed,
        isDisabled: () => disabled,
        close: () => setOpen(false),
    };

    if (group) {
        const registration = group.register(member);
        startClosed = registration.startClosed;
        onDestroy(registration.unregister);
    }

    // The bound prop cannot be written while the component initialises, so
    // the settled state is written back here, once.
    $effect(() => {
        if (!startClosed) return;
        open = false;
        startClosed = false;
    });

    // An effect rather than a call in `toggle`, so a panel opened from outside
    // through `bind:open` closes its siblings as well. Untracked, because the
    // group reads the siblings' state: tracking that would re-run this effect
    // when a sibling opens, and the two would close each other.
    $effect(() => {
        if (isOpen) untrack(() => group?.opened(member));
    });

    // A panel can close while focus is inside it: the parent sets `open`, or
    // a group closes it. Hidden content cannot hold focus, which would fall
    // to `<body>`, so the trigger takes it. This runs before the panel is
    // hidden, while the focused element can still be found; focus is not
    // touched in any other case.
    $effect.pre(() => {
        if (isOpen || !panelElement) return;
        const panel = panelElement;
        untrack(() => {
            if (panel.contains(document.activeElement)) {
                document.getElementById(triggerId)?.focus();
            }
        });
    });

    const triggerProps = $derived({
        id: triggerId,
        type: "button",
        "aria-expanded": isOpen,
        "aria-controls": panelId,
        disabled,
        onclick: toggle,
        "data-collapsible-trigger": "",
    } satisfies CollapsibleTriggerProps);

    let detailsElement: HTMLDetailsElement | undefined = $state();

    /**
     * What only the server writes on the `<details>`: the `open` attribute and
     * a mark that says the element came from the server. The client never
     * writes `open` through the template: hydration would set it from the
     * state and undo a toggle the visitor made before the scripts arrived.
     * The effects below adopt that choice, then keep `open` in line.
     */
    const SERVER_MARK = "data-collapsible-ssr";
    const serverAttributes = () =>
        isBrowser() ? {} : { open: isOpen, [SERVER_MARK]: "" };

    // Once, after mount: a panel toggled before hydration keeps that state.
    $effect(() => {
        const element = detailsElement;
        if (!element?.hasAttribute(SERVER_MARK)) return;
        element.removeAttribute(SERVER_MARK);
        untrack(() => {
            if (!disabled && element.open !== isOpen) setOpen(element.open);
        });
    });

    // `open` follows the state: an `open` bound from outside, a group closing
    // a sibling. Runs after the adoption above on the first pass.
    $effect(() => {
        const element = detailsElement;
        if (element && element.open !== isOpen) element.open = isOpen;
    });

    /**
     * The browser's `toggle` event is where a change made on the `<details>`
     * enters: a click on the summary, Enter or Space, find-in-page opening it,
     * or the native exclusive group closing it. It also fires, a task later,
     * for a change this component made itself; `setOpen` then sees no change.
     */
    function handleToggle() {
        const element = detailsElement;
        if (!element) return;
        if (disabled) {
            // Find-in-page can still open a disabled panel: undo it.
            if (element.open !== isOpen) element.open = isOpen;
            return;
        }
        setOpen(element.open);
    }

    /** A summary cannot be disabled, so its click is cancelled instead. */
    function handleSummaryClick(event: MouseEvent) {
        if (disabled) event.preventDefault();
    }

    /**
     * Native exclusivity (the `name` attribute) for a single-open group. A
     * disabled panel stays out of it: the group neither closes nor counts it.
     */
    const detailsName = $derived(disabled ? undefined : group?.exclusiveName);

    const rowClass =
        "m-0 flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium pointer-coarse:min-h-11";

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

{#snippet defaultRow()}
    <span class="min-w-0 flex-1">{title}</span>
    <ChevronDown
        size={16}
        aria-hidden="true"
        class={cn(
            "shrink-0 text-description transition-transform duration-150 motion-reduce:transition-none",
            isOpen && "rotate-180",
        )}
    />
{/snippet}

{#snippet panel()}
    <div
        bind:this={panelElement}
        id={panelId}
        role={panelRole}
        aria-labelledby={triggerId}
        hidden={trigger ? !isOpen : undefined}
        class={cn(!trigger && "px-3 pb-3 pt-1", panelClass)}
    >
        {#if isOpen || !unmountOnClose}
            {@render children?.()}
        {/if}
    </div>
{/snippet}

<div
    class={cn(className)}
    data-state={isOpen ? "open" : "closed"}
    data-disabled={disabled ? "" : undefined}
    {...restProps}
>
    {#if trigger}
        {@render trigger(triggerProps, { open: isOpen, disabled })}
        <!-- `hidden` is `display: none`: closed content takes no focus and is not
        in the accessibility tree. The element itself stays, so `aria-controls`
        always points at something. -->
        {@render panel()}
    {:else}
        <!-- A native disclosure: the browser opens and closes it, so it works
        before hydration and without scripts. `open` follows `isOpen` (see
        `serverAttributes`); user changes come back through `toggle`. -->
        <details
            bind:this={detailsElement}
            {...serverAttributes()}
            name={detailsName}
            ontoggle={handleToggle}
        >
            <summary
                id={triggerId}
                aria-controls={panelId}
                aria-disabled={disabled ? "true" : undefined}
                tabindex={disabled ? -1 : undefined}
                data-collapsible-trigger=""
                onclick={handleSummaryClick}
                class={cn(
                    "focus-ring block w-full cursor-pointer list-none rounded-control text-start text-sm font-medium text-headline transition-colors duration-150 hover:bg-surface-hover active:bg-surface-active motion-reduce:transition-none [&::-webkit-details-marker]:hidden",
                    disabled &&
                        "pointer-events-none cursor-not-allowed opacity-50 hover:bg-transparent active:bg-transparent",
                    triggerClass,
                )}
            >
                <!-- One branch per level, not `<svelte:element>`: hydration takes
                a dynamic element out and puts it back, which blurs the trigger
                inside it if the user had already tabbed to it. The heading goes
                inside the summary: a summary inside a heading is not valid. The
                flex row is on the inner element, not on the summary, which
                older Safari does not lay out as flex. -->
                {#if headingLevel === 1}
                    <h1 class={rowClass}>{@render defaultRow()}</h1>
                {:else if headingLevel === 2}
                    <h2 class={rowClass}>{@render defaultRow()}</h2>
                {:else if headingLevel === 3}
                    <h3 class={rowClass}>{@render defaultRow()}</h3>
                {:else if headingLevel === 4}
                    <h4 class={rowClass}>{@render defaultRow()}</h4>
                {:else if headingLevel === 5}
                    <h5 class={rowClass}>{@render defaultRow()}</h5>
                {:else if headingLevel === 6}
                    <h6 class={rowClass}>{@render defaultRow()}</h6>
                {:else}
                    <span class={rowClass}>{@render defaultRow()}</span>
                {/if}
            </summary>
            {@render panel()}
        </details>
    {/if}
</div>
