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
        isOpen: initialOpen = true,
        title = 'Dialog title',
        size = 'md',
    }: Props = $props();

    let isOpen = $state(initialOpen);

    $effect(() => {
        isOpen = initialOpen;
    });

    let item1Checked = $state(true);
    let item2Checked = $state(true);
    let item3Checked = $state(true);

    function handleClose() {
        isOpen = false;
    }
</script>

<Modal bind:isOpen {title} {size} onclick={handleClose}>
    <p class="mb-4 text-sm leading-5 text-body">
        A dialog is a type of modal window that appears in front of app content
        to provide critical information, or prompt for a decision to be made.
    </p>
    <div class="space-y-0">
        <div class="flex items-center justify-between border-b border-border py-2">
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100"
                >
                    <span class="font-medium text-brand-800">A</span>
                </div>
                <span class="text-sm text-body">List item</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-sm text-body">100+</span>
                <Checkbox bind:checked={item1Checked} label="" />
            </div>
        </div>
        <div class="flex items-center justify-between border-b border-border py-2">
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100"
                >
                    <span class="font-medium text-brand-800">B</span>
                </div>
                <span class="text-sm text-body">List item</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-sm text-body">100+</span>
                <Checkbox bind:checked={item2Checked} label="" />
            </div>
        </div>
        <div class="flex items-center justify-between py-2">
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100"
                >
                    <span class="font-medium text-brand-800">C</span>
                </div>
                <span class="text-sm text-body">List item</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-sm text-body">100+</span>
                <Checkbox bind:checked={item3Checked} label="" />
            </div>
        </div>
    </div>

    {#snippet footer()}
        <Button variant="ghost" size="sm" text="Action 2" onclick={handleClose} />
        <Button variant="ghost" size="sm" text="Action 1" onclick={handleClose} />
    {/snippet}
</Modal>
