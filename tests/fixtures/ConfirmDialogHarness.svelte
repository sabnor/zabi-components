<script lang="ts">
    import ConfirmDialog from "../../src/components/molecules/ConfirmDialog.svelte";
    import type {
        ConfirmDialogCancelReason,
        ConfirmDialogResult,
        ConfirmDialogVariant,
    } from "../../src/components/util/confirm-dialog.js";

    interface Props {
        initialOpen?: boolean;
        variant?: ConfirmDialogVariant;
        message?: string;
        confirmLabel?: string;
        cancelLabel?: string;
        loading?: boolean;
        loadingLabel?: string;
        portal?: boolean;
        /** Render a paragraph through `children`. */
        rich?: boolean;
        onconfirm?: () => ConfirmDialogResult;
        oncancel?: (detail: { reason: ConfirmDialogCancelReason }) => void;
        onerror?: (error: unknown) => void;
    }

    let {
        initialOpen = false,
        variant,
        message = "The project and its files are removed for everyone.",
        confirmLabel,
        cancelLabel,
        loading = false,
        loadingLabel,
        portal,
        rich = false,
        onconfirm,
        oncancel,
        onerror,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let open = $state(initialOpen);
</script>

<!-- Stands in for the ancestor a portalled dialog has to get out of. -->
<div data-testid="host">
    <button type="button" onclick={() => (open = true)}>Delete project</button>
    <button type="button" onclick={() => (open = false)}>Close from parent</button>

    <ConfirmDialog
        bind:open
        title="Delete this project?"
        data-testid="confirm"
        {message}
        {variant}
        {confirmLabel}
        {cancelLabel}
        {loading}
        {loadingLabel}
        {portal}
        {onconfirm}
        {oncancel}
        {onerror}
    >
        {#if rich}
            <p data-testid="rich">Type the project name to continue.</p>
        {/if}
    </ConfirmDialog>
</div>
<p data-testid="state">{open ? "open" : "closed"}</p>
