<script lang="ts">
    import { onDestroy } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Button from "../atoms/Button.svelte";
    import { Image } from "@lucide/svelte";
    import { cn } from "../util/cn.js";

    export type ImageUploadFileDetail = {
        /** Selected file, or `null` when the image is removed. */
        file: File | null;
        /** Object URL used for the preview, or `null`. */
        url: string | null;
    };

    type Props = Omit<HTMLAttributes<HTMLDivElement>, "onchange" | "onclick"> & {
        /** Extra classes for the host element. */
        class?: string;
        /** Preview URL; `bind:value` to read it. */
        value?: string | null;
        disabled?: boolean;
        accept?: string;
        placeholder?: string;
        errorMessage?: string;
        /** Native `change` event from the hidden file input. */
        onchange?: (event: Event) => void;
        /** Fires when the file chooser is opened. */
        onclick?: (event: Event) => void;
        /** Selected file and preview URL; `{ file: null, url: null }` on remove. */
        onfileselect?: (detail: ImageUploadFileDetail) => void;
    };

    let {
        class: className = "",
        value = $bindable(null),
        disabled = false,
        accept = "image/*",
        placeholder = "No image selected",
        errorMessage = "",
        onchange,
        onclick,
        onfileselect,
        children: _children,
        ...restProps
    }: Props = $props();

    let fileInput = $state<HTMLInputElement>();
    let currentObjectUrl = $state<string | null>(null);

    function revokeCurrentObjectUrl() {
        if (currentObjectUrl && typeof URL !== "undefined" && URL.revokeObjectURL) {
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
        }
    }

    function handleFileSelect(event: Event) {
        if (disabled) return;

        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        let url: string | null = null;

        if (typeof URL !== "undefined" && URL.createObjectURL) {
            revokeCurrentObjectUrl();
            url = URL.createObjectURL(file);
            value = url;
            currentObjectUrl = url;
        }

        onchange?.(event);
        onfileselect?.({ file, url });
    }

    function removeImage() {
        if (disabled) return;

        revokeCurrentObjectUrl();
        value = null;
        if (fileInput) fileInput.value = "";
        onfileselect?.({ file: null, url: null });
    }

    function triggerFileSelect(event: Event) {
        if (disabled) return;
        onclick?.(event);
        fileInput?.click();
    }

    function handleDropZoneKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            triggerFileSelect(event);
        }
    }

    onDestroy(() => {
        revokeCurrentObjectUrl();
    });
</script>

<div class={cn("space-y-3", className)} {...restProps}>
    {#if value}
        <div class="relative group">
            <img
                src={value}
                alt=""
                class="w-full h-32 min-w-64 object-cover rounded-container border-0"
            />
            <div
                class="absolute inset-0 border border-input-border bg-input min-w-64 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity rounded-container flex items-center justify-center"
            >
                <div class="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onclick={triggerFileSelect}
                        {disabled}
                    >
                        Change
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onclick={removeImage}
                        {disabled}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    {:else}
        <div
            class="border-2 border-dashed border-input rounded-container min-w-64 p-6 text-center hover:border-brand-500 transition-colors {disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'}"
            onclick={triggerFileSelect}
            role="button"
            tabindex={disabled ? -1 : 0}
            onkeydown={handleDropZoneKeydown}
            aria-disabled={disabled}
        >
            <div class="space-y-3">
                <div
                    class="w-12 h-12 mx-auto bg-action-secondary rounded-control flex items-center justify-center"
                >
                    <Image size={24} class="text-description" />
                </div>
                <div>
                    <p class="font-medium text-headline">{placeholder}</p>
                    <p class="text-sm text-description">
                        Click to choose a file
                    </p>
                </div>
            </div>
        </div>
    {/if}

    <input
        bind:this={fileInput}
        type="file"
        {accept}
        onchange={handleFileSelect}
        {disabled}
        class="hidden"
        data-testid="image-upload-input"
    />

    {#if errorMessage}
        <div class="rounded-control border border-error px-3 py-2 text-sm text-error" role="alert">
            <p class="font-medium">Image upload failed</p>
            <p>{errorMessage}</p>
            <p class="mt-1">Recovery action: try another file or retry upload.</p>
        </div>
    {/if}
</div>
