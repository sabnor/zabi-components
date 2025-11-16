<script lang="ts">
    import Modal from '../../components/molecules/Modal.svelte';
    import Button from '../../components/atoms/Button.svelte';
    import Checkbox from '../../components/atoms/Checkbox.svelte';

    interface Props {
        isOpen?: boolean;
        title?: string;
        size?: 'sm' | 'md' | 'lg';
    }

    let {
        isOpen = true,
        title = 'Dialog title',
        size = 'md'
    }: Props = $props();

    let item1Checked = $state(true);
    let item2Checked = $state(true);
    let item3Checked = $state(true);

    function handleClose() {
        isOpen = false;
    }
</script>

<Modal {isOpen} {title} {size} onclick={handleClose}>
    <p class="text-sm text-body leading-5 mb-4">
        A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.
    </p>
    <div class="space-y-0">
        <div class="flex items-center justify-between py-2 border-b border-border">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                    <span class="text-brand-800 font-medium">A</span>
                </div>
                <span class="text-sm text-body">List item</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-sm text-body">100+</span>
                <Checkbox checked={item1Checked} label="" />
            </div>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-border">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                    <span class="text-brand-800 font-medium">B</span>
                </div>
                <span class="text-sm text-body">List item</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-sm text-body">100+</span>
                <Checkbox checked={item2Checked} label="" />
            </div>
        </div>
        <div class="flex items-center justify-between py-2">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                    <span class="text-brand-800 font-medium">C</span>
                </div>
                <span class="text-sm text-body">List item</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-sm text-body">100+</span>
                <Checkbox checked={item3Checked} label="" />
            </div>
        </div>
    </div>

    {#snippet footer()}
        <Button variant="ghost" size="sm" text="Action 2" onclick={handleClose} />
        <Button variant="ghost" size="sm" text="Action 1" onclick={handleClose} />
    {/snippet}
</Modal>

