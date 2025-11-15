<script lang="ts">
    import Button from "../atoms/Button.svelte";
    import { Image } from "@lucide/svelte";

    interface Props {
        value?: string | null;
        disabled?: boolean;
        accept?: string;
        placeholder?: string;
        onchange?: (event: Event) => void;
        onclick?: (event: Event) => void;
    }

    let {
        value = null,
        disabled = false,
        accept = "image/*",
        placeholder = "No image selected",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

    let fileInput = $state<HTMLInputElement>();

    function handleFileSelect(event: Event) {
        if (disabled) return;

        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];

        // SSR-safe URL creation
        if (typeof URL !== "undefined" && URL.createObjectURL) {
            const url = URL.createObjectURL(file);
            value = url;
        }
    }

    function removeImage() {
        if (disabled) return;

        if (value && typeof URL !== "undefined" && URL.revokeObjectURL) {
            URL.revokeObjectURL(value);
        }
        value = null;
    }

    function triggerFileSelect() {
        if (disabled) return;
        fileInput?.click();
    }
</script>

<div class="space-y-3">
    {#if value}
        <!-- Image Display -->
        <div class="relative group">
            <img
                src={value}
                alt=""
                class="w-full h-32 object-cover rounded-lg border-0"
            />
            <div
                class="absolute inset-0 bg-black/50 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
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
        <!-- Empty State -->
        <div
            class="border-2 border-dashed border-stone-200 rounded-lg p-6 text-center hover:border-brand-500 transition-colors {disabled
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
                    class="w-12 h-12 mx-auto bg-surface-level-1 rounded-lg flex items-center justify-center"
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

    <!-- Hidden File Input -->
    <input
        bind:this={fileInput}
        type="file"
        {accept}
        onchange={handleFileSelect}
        {disabled}
        class="hidden"
    />
</div>
