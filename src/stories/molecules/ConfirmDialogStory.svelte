<script lang="ts">
    import Button from '../../components/atoms/Button.svelte';
    import ConfirmDialog from '../../components/molecules/ConfirmDialog.svelte';
    import type { ConfirmDialogVariant } from '../../components/util/confirm-dialog.js';

    interface Props {
        variant?: ConfirmDialogVariant;
        title?: string;
        message?: string;
        confirmLabel?: string;
        cancelLabel?: string;
        /** Announced to screen readers when loading starts. */
        loadingLabel?: string;
        /** Hold the dialog in its loading state. */
        loading?: boolean;
        /** What confirming does: finish at once, after a request, or fail after one. */
        outcome?: 'sync' | 'resolve' | 'reject';
        /** Start open, so the docs page shows the dialog itself. */
        open?: boolean;
    }

    let {
        variant = 'info',
        title = 'Publish this page?',
        message = 'It becomes visible to everyone with the link.',
        confirmLabel = 'Confirm',
        cancelLabel = 'Cancel',
        loadingLabel = 'Working…',
        loading = false,
        outcome = 'sync',
        open = false,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let isOpen = $state(open);
    let last = $state('Nothing yet.');
    let failure = $state('');

    function wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function confirm() {
        failure = '';
        if (outcome === 'sync') {
            last = 'Confirmed.';
            return;
        }
        await wait(1500);
        if (outcome === 'reject') throw new Error('The server said no. Try again.');
        last = 'Confirmed after the request.';
    }
</script>

<div class="space-y-3">
    <Button
        variant={variant === 'danger' ? 'danger' : 'primary'}
        onclick={() => (isOpen = true)}
    >
        Open dialog
    </Button>
    <p class="text-sm text-description">{last}</p>
    <ConfirmDialog
        bind:open={isOpen}
        onconfirm={outcome === 'sync' ? () => void confirm() : confirm}
        oncancel={({ reason }) => (last = `Cancelled (${reason}).`)}
        onerror={(error) => (failure = error instanceof Error ? error.message : String(error))}
        {variant}
        {title}
        {message}
        {confirmLabel}
        {cancelLabel}
        {loading}
        {loadingLabel}
    >
        {#if failure}
            <p class="text-error-text">{failure}</p>
        {/if}
    </ConfirmDialog>
</div>
