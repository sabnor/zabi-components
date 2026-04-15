<script lang="ts">
    import Toaster from '../../components/molecules/Toaster.svelte';
    import Button from '../../components/atoms/Button.svelte';
    import { pushToast } from '../../components/molecules/toast-store.js';
</script>

<div class="space-y-4">
    <div class="flex flex-wrap gap-2">
        <Button
            text="Success"
            onclick={() =>
                pushToast({ message: 'Saved successfully.', type: 'success' })}
        />
        <Button
            variant="secondary"
            text="Error"
            onclick={() =>
                pushToast({
                    message: 'Something went wrong. Try again.',
                    type: 'error',
                })}
        />
        <Button
            variant="ghost"
            text="Info"
            onclick={() =>
                pushToast({ message: 'Tip: use keyboard shortcuts.', type: 'info' })}
        />
    </div>
    <Toaster />
</div>
