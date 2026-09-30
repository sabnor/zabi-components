<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import ImageUpload from '../../components/molecules/ImageUpload.svelte';
    import Button from '../../components/atoms/Button.svelte';

    const library = [
        { name: 'Storefront', url: 'https://placehold.co/300x200?text=Storefront' },
        { name: 'Team', url: 'https://placehold.co/300x200?text=Team' },
    ];

    // Story args pass straight through; the library picker is wired on top.
    let props: ComponentProps<typeof ImageUpload> = $props();

    let value = $state<string | null>(null);
    let pickerOpen = $state(false);

    function choose(url: string) {
        value = url;
        pickerOpen = false;
    }
</script>

<div class="w-72 space-y-3">
    <ImageUpload
        {...props}
        bind:value
        onbrowse={() => (pickerOpen = true)}
    />

    {#if pickerOpen}
        <div class="rounded-container border border-border p-3 space-y-2">
            <p class="text-sm font-medium text-headline">Media library</p>
            <div class="flex gap-2">
                {#each library as item (item.url)}
                    <Button
                        variant="secondary"
                        size="sm"
                        text={item.name}
                        onclick={() => choose(item.url)}
                    />
                {/each}
            </div>
        </div>
    {/if}
</div>
