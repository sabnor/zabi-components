<script lang="ts">
    import { untrack, type Snippet } from "svelte";
    import { Info, OctagonAlert, TriangleAlert } from "@lucide/svelte";
    import Button from "../atoms/Button.svelte";
    import Modal from "./Modal.svelte";
    import { cn } from "../util/cn.js";
    import { generateId } from "../util/ssr-safe.js";
    import type {
        ConfirmDialogCancelReason,
        ConfirmDialogResult,
        ConfirmDialogVariant,
    } from "../util/confirm-dialog.js";

    interface Props {
        /** Whether the dialog is shown; supports `bind:open`. */
        open?: boolean;
        /** The question, as the dialog's heading and accessible name. */
        title: string;
        /** What will happen. It is the dialog's accessible description. */
        message?: string;
        /** `danger` makes the confirm button the danger button. Each variant has its own icon. */
        variant?: ConfirmDialogVariant;
        confirmLabel?: string;
        cancelLabel?: string;
        /**
         * The confirm button shows its loading state, cancel is disabled and
         * the dialog cannot be dismissed. Set by the dialog itself while a
         * promise from `onconfirm` is pending.
         */
        loading?: boolean;
        /**
         * Called when the confirm button is activated. The dialog then closes,
         * unless this returns (or resolves to) `false`, throws or rejects.
         */
        onconfirm?: () => ConfirmDialogResult;
        /** Called when the user backs out: cancel, Escape or the backdrop. */
        oncancel?: (detail: { reason: ConfirmDialogCancelReason }) => void;
        /**
         * Called when the promise from `onconfirm` rejects; the dialog stays
         * open. Without it the error goes to the global error handler.
         */
        onerror?: (error: unknown) => void;
        /**
         * Render in `document.body`, so a transformed or clipped ancestor
         * cannot trap the dialog. A theme class set below `body` does not
         * reach it; pass `false` to render in place.
         */
        portal?: boolean;
        /** On the dialog panel (testing, analytics). */
        "data-testid"?: string;
        /** Extra classes for the dialog panel. */
        class?: string;
        /** Richer content below the message. */
        children?: Snippet;
    }

    let {
        open = $bindable(false),
        title,
        message = "",
        variant = "info",
        confirmLabel = "Confirm",
        cancelLabel = "Cancel",
        loading = false,
        onconfirm,
        oncancel,
        onerror,
        portal = true,
        "data-testid": dataTestId = undefined,
        class: className = "",
        children,
    }: Props = $props();

    const messageId = generateId("confirm-dialog-message");

    /** True while a promise returned by `onconfirm` is pending. */
    let pending = $state(false);
    const busy = $derived(loading || pending);

    let bodyElement: HTMLDivElement | undefined = $state();

    const Icon = $derived(
        variant === "danger"
            ? OctagonAlert
            : variant === "warning"
              ? TriangleAlert
              : Info,
    );
    const iconClass = $derived(
        variant === "danger"
            ? "text-error-text"
            : variant === "warning"
              ? "text-warning-text"
              : "text-info-text",
    );

    function cancel(reason: ConfirmDialogCancelReason) {
        if (busy) return;
        open = false;
        oncancel?.({ reason });
    }

    async function confirm() {
        if (busy) return;
        // A synchronous throw is the caller's bug: it propagates, and the
        // dialog stays open.
        let result = onconfirm?.();
        if (result instanceof Promise) {
            pending = true;
            try {
                result = await result;
            } catch (error) {
                // Stay open so the caller can show what went wrong. Never
                // swallowed: with no `onerror` it is reported like any other
                // uncaught error.
                if (onerror) onerror(error);
                else if (typeof reportError === "function") reportError(error);
                else console.error(error);
                return;
            } finally {
                pending = false;
            }
        }
        if (result !== false) open = false;
    }

    /**
     * Both buttons are disabled while busy, and a disabled button drops focus
     * on `<body>`. Hold it on the dialog panel instead, and hand it back to
     * the confirm button if the dialog is still open afterwards (a rejected
     * confirm), so a keyboard user is where they were.
     */
    let wasBusy = false;
    $effect(() => {
        const now = busy;
        const panel = bodyElement?.closest<HTMLElement>('[role="dialog"]');
        untrack(() => {
            if (!panel) {
                wasBusy = false;
                return;
            }
            const active = document.activeElement;
            if (now && !wasBusy) {
                if (!active || active === document.body || panel.contains(active)) {
                    panel.focus();
                }
            } else if (!now && wasBusy) {
                if (active === panel || active === document.body) {
                    panel
                        .querySelector<HTMLElement>("[data-confirm-dialog-confirm]")
                        ?.focus();
                }
            }
            wasBusy = now;
        });
    });

    /**
     * Modal spreads what it does not know onto its dialog panel. The message
     * is rendered here, beside the icon, so the description is wired here too.
     */
    const panelAttributes = $derived({
        "aria-describedby": messageId,
        "aria-busy": busy ? "true" : undefined,
        "data-variant": variant,
    });
</script>

<!--
  `role="dialog"`, not `alertdialog`: Modal finds dialogs by `[role="dialog"]`
  in its focus trap and its stray-key recovery, so an alertdialog would lose
  both. No close button: Cancel is the way out, it is the first control, and so
  it takes the initial focus for every variant.
-->
<Modal
    bind:isOpen={open}
    {title}
    size="sm"
    showClose={false}
    {portal}
    dismissible={!busy}
    onclose={({ reason }) => oncancel?.({ reason })}
    data-testid={dataTestId}
    class={className}
    {...panelAttributes}
>
    <div bind:this={bodyElement} class="flex items-start gap-3">
        <span class={cn("mt-0.5 shrink-0", iconClass)}>
            <Icon size={20} aria-hidden="true" />
        </span>
        <!-- The message alone is the description; richer content is read
        in place. With no message, the content is all there is to describe. -->
        <div
            id={message ? undefined : messageId}
            class="min-w-0 flex-1 space-y-2 text-sm text-body"
        >
            {#if message}
                <p id={messageId}>{message}</p>
            {/if}
            {@render children?.()}
        </div>
    </div>

    {#snippet footer()}
        <Button
            variant="outline"
            disabled={busy}
            onclick={() => cancel("cancel-button")}
            data-confirm-dialog-cancel=""
        >
            {cancelLabel}
        </Button>
        <Button
            variant={variant === "danger" ? "danger" : "primary"}
            loading={busy}
            onclick={confirm}
            data-confirm-dialog-confirm=""
        >
            {confirmLabel}
        </Button>
    {/snippet}
</Modal>
