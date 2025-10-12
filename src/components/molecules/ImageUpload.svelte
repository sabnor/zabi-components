<script lang="ts">
    import Button from "../atoms/Button.svelte";

    export let value: string | null = null;
    export let disabled: boolean = false;
    export let accept: string = "image/*";
    export let placeholder: string = "No image selected";

    let fileInput: HTMLInputElement;

    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        const url = URL.createObjectURL(file);

        value = url;
    }

    function removeImage() {
        if (value) {
            URL.revokeObjectURL(value);
        }
        value = null;
    }

    function triggerFileSelect() {
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
                class="w-full h-32 object-cover rounded-lg border border-gray-300"
            />
            <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
            >
                <div class="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        on:click={triggerFileSelect}
                        {disabled}
                    >
                        Change
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        on:click={removeImage}
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
            class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
            on:click={triggerFileSelect}
            role="button"
            tabindex="0"
            on:keydown={(e) => e.key === "Enter" && triggerFileSelect()}
        >
            <div class="space-y-3">
                <div
                    class="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center"
                >
                    <span class="text-2xl">📷</span>
                </div>
                <div>
                    <p class="font-medium text-gray-900">{placeholder}</p>
                    <p class="text-sm text-gray-500">Click to choose a file</p>
                </div>
            </div>
        </div>
    {/if}

    <!-- Hidden File Input -->
    <input
        bind:this={fileInput}
        type="file"
        {accept}
        on:change={handleFileSelect}
        class="hidden"
    />
</div>
