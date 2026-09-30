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
                pushToast({
                    title: 'Changes saved',
                    message:
                        'Some settings may take a few minutes to apply across your workspace.',
                    type: 'success',
                })}
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
        <Button
            variant="outline"
            text="With Undo"
            onclick={() =>
                pushToast({
                    title: 'Project archived',
                    message: 'It is still in the archive, where you can restore it.',
                    type: 'success',
                    // No duration: a toast with an action stays until it is dismissed.
                    action: {
                        label: 'Undo',
                        onclick: () =>
                            pushToast({ message: 'Project restored.', type: 'info' }),
                    },
                })}
        />
    </div>
    <Toaster />
</div>
