<script lang="ts">
    import { tick, untrack, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Button from "../atoms/Button.svelte";
    import { cn } from "../util/cn.js";

    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "role"> & {
        /** Shows the bar. Set it while the form differs from what is saved. */
        dirty?: boolean;
        /** Shown in the bar, and announced once when it appears. */
        message?: string;
        /** Accessible name of the bar as a landmark. */
        label?: string;
        saveLabel?: string;
        discardLabel?: string;
        /**
         * Save shows its loading state and Discard is disabled. Set by the
         * bar itself while a promise from `onsave` is pending.
         */
        saving?: boolean;
        /**
         * Called when Save is activated. Return a promise to keep the bar in
         * its saving state until it settles. The bar does not hide itself:
         * clear `dirty` once the save has gone through.
         */
        onsave?: () => void | Promise<unknown>;
        /** Called when Discard is activated. */
        ondiscard?: () => void;
        /**
         * Called when the promise from `onsave` rejects; the bar stays.
         * Without it the error goes to the global error handler.
         */
        onerror?: (error: unknown) => void;
        /**
         * Which edge of its scroll container the bar sticks to. It is sticky,
         * not fixed, so it keeps its place in the flow: put it after the
         * form's last field (`bottom`) or before its first (`top`).
         */
        position?: "bottom" | "top";
        /** Extra buttons, placed before Discard. */
        actions?: Snippet;
        /** Extra classes for the bar. */
        class?: string;
    };

    let {
        dirty = false,
        message = "You have unsaved changes",
        label = "Unsaved changes",
        saveLabel = "Save",
        discardLabel = "Discard",
        saving = false,
        onsave,
        ondiscard,
        onerror,
        position = "bottom",
        actions,
        class: className = "",
        ...restProps
    }: Props = $props();

    /** True while a promise returned by `onsave` is pending. */
    let pending = $state(false);
    const busy = $derived(saving || pending);

    let host: HTMLDivElement | undefined = $state();
    /** Where focus was before it came into the bar; it goes back there when the bar leaves. */
    let cameFrom: HTMLElement | null = null;

    async function save() {
        if (busy) return;
        // A synchronous throw is the caller's bug: it propagates.
        const result = onsave?.();
        if (!(result instanceof Promise)) return;
        pending = true;
        try {
            await result;
        } catch (error) {
            // The bar stays, so the caller can show what went wrong. Never
            // swallowed: with no `onerror` it is reported like any other
            // uncaught error.
            if (onerror) onerror(error);
            else if (typeof reportError === "function") reportError(error);
            else console.error(error);
        } finally {
            pending = false;
        }
    }

    function discard() {
        if (busy) return;
        ondiscard?.();
    }

    function handleFocusIn(event: FocusEvent) {
        const from = event.relatedTarget;
        if (from instanceof HTMLElement && !host?.contains(from)) cameFrom = from;
    }

    function canTakeFocus(element: HTMLElement | null): element is HTMLElement {
        return (
            !!element &&
            element.isConnected &&
            !(element as HTMLButtonElement).disabled &&
            !host?.contains(element)
        );
    }

    /**
     * Both buttons are disabled while busy, and a disabled button drops focus
     * on `<body>`. Hold it on the bar instead, and hand it back to Save if the
     * bar is still there afterwards (a rejected save).
     */
    let wasBusy = false;
    $effect.pre(() => {
        const now = busy;
        untrack(() => {
            const changed = now !== wasBusy;
            wasBusy = now;
            // Read before the buttons change: afterwards focus may be gone.
            if (!changed || !host?.contains(document.activeElement)) return;
            void tick().then(() => {
                if (now) {
                    host?.focus();
                } else if (dirty && document.activeElement === host) {
                    host?.querySelector<HTMLElement>("[data-unsaved-changes-save]")?.focus();
                }
            });
        });
    });

    /**
     * When the bar leaves, its buttons go with it. If focus was on one, send
     * it back to where it came from, usually the field the user was editing;
     * failing that it stays on the (now empty) host, which keeps the user's
     * place in the page instead of dropping them at the top.
     */
    let wasDirty = false;
    $effect.pre(() => {
        const now = dirty;
        untrack(() => {
            const leaving = wasDirty && !now;
            wasDirty = now;
            if (!leaving || !host?.contains(document.activeElement)) return;
            const target = canTakeFocus(cameFrom) ? cameFrom : host;
            cameFrom = null;
            void tick().then(() => {
                const active = document.activeElement;
                // Never from an element that has taken focus meanwhile.
                if (active && active !== document.body && !host?.contains(active)) return;
                target.focus();
            });
        });
    });
</script>

<!--
  The host is always rendered and empty until `dirty`. The message is a live
  region, and a live region is only announced when its text changes inside an
  element that was already there. The status is on the message alone, so the
  buttons are not read out with it, and nothing here takes focus on appearing.
-->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
    bind:this={host}
    tabindex="-1"
    role={dirty ? "region" : undefined}
    aria-label={dirty ? label : undefined}
    aria-busy={dirty && busy ? "true" : undefined}
    data-position={position}
    class={cn(
        "focus-ring",
        dirty &&
            "sticky z-sticky flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-container border border-border-overlay bg-surface-overlay px-4 py-3 shadow-lg",
        // Clear of the home indicator on a phone.
        dirty && (position === "top" ? "top-2" : "bottom-[max(0.5rem,env(safe-area-inset-bottom))]"),
        dirty && className,
    )}
    onfocusin={handleFocusIn}
    {...restProps}
>
    <p role="status" class={dirty ? "min-w-0 text-sm font-medium text-body" : "sr-only"}>
        {dirty ? message : ""}
    </p>
    {#if dirty}
        <div class="flex flex-wrap items-center gap-2">
            {@render actions?.()}
            <Button variant="ghost" onclick={discard} disabled={busy}>
                {discardLabel}
            </Button>
            <Button onclick={save} loading={busy} data-unsaved-changes-save>
                {saveLabel}
            </Button>
        </div>
    {/if}
</div>
