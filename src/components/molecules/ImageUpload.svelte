<script lang="ts">
    import { onDestroy } from "svelte";
    import Button from "../atoms/Button.svelte";
    import { Image } from "@lucide/svelte";

    interface Props {
        value?: string | null;
        disabled?: boolean;
        accept?: string;
        placeholder?: string;
        errorMessage?: string;
        onchange?: (event: Event) => void;
        onclick?: (event: Event) => void;
    }

    let {
        value = null,
        disabled = false,
        accept = "image/*",
        placeholder = "No image selected",
        errorMessage = "",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

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

        if (typeof URL !== "undefined" && URL.createObjectURL) {
            revokeCurrentObjectUrl();
            const url = URL.createObjectURL(file);
            value = url;
            currentObjectUrl = url;
        }
    }

    function removeImage() {
        if (disabled) return;

        revokeCurrentObjectUrl();
        value = null;
    }

    function triggerFileSelect() {
        if (disabled) return;
        fileInput?.click();
    }

    onDestroy(() => {
        revokeCurrentObjectUrl();
    });
</script>

<div class="space-y-3">
    {#if value}
        <div class="relative group">
            <img
                src={value}
                alt=""
                class="w-full h-32 min-w-64 object-cover rounded-2xl border-0"
            />
            <div
                class="absolute inset-0 border border-input-border bg-input min-w-64 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center"
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
            class="border-2 border-dashed border-input rounded-2xl min-w-64 p-6 text-center hover:border-brand-500 transition-colors {disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'}"
            onclick={triggerFileSelect}
            role="button"
            tabindex={disabled ? -1 : 0}
            onkeydown={(e) =>
                e.key === "Enter" && !disabled && triggerFileSelect()}
            aria-disabled={disabled}
        >
            <div class="space-y-3">
                <div
                    class="w-12 h-12 mx-auto bg-action-secondary rounded-lg flex items-center justify-center"
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
    />

    {#if errorMessage}
        <div class="rounded-lg border border-error px-3 py-2 text-sm text-error" role="alert">
            <p class="font-medium">Image upload failed</p>
            <p>{errorMessage}</p>
            <p class="mt-1">Recovery action: try another file or retry upload.</p>
        </div>
    {/if}
</div>
