<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Modal from "./Modal.svelte";
    import Button from "../atoms/Button.svelte";
    import type { ImageUploadEvents } from "../../types/events";

    export let value: string | null = null;
    export let disabled = false;
    export let accept = "image/*";
    export let maxSize = 5 * 1024 * 1024; // 5MB default
    export let placeholder = "No image selected";

    const dispatch = createEventDispatcher<ImageUploadEvents>();

    // Component state
    let showUploadDialog = false;
    let selectedFile: File | null = null;
    let previewUrl: string | null = null;
    let isUploading = false;
    let uploadProgress = 0;

    // Handle file selection for upload
    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const files = input.files;
        const file = files[0];

        // Check file size
        if (file.size > maxSize) {
            dispatch("error", {
                message: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`,
            });
            return;
        }

        // Check file type
        if (accept !== "*" && !file.type.match(accept.replace("*", ".*"))) {
            dispatch("error", { message: "Please select a valid file type" });
            return;
        }

        selectedFile = file;
        previewUrl = URL.createObjectURL(file);

        // Dispatch upload event with files
        dispatch("upload", { files });
    }

    // Simulate upload (parent should handle actual upload)
    async function uploadFile() {
        if (!selectedFile || !previewUrl) return;

        isUploading = true;
        uploadProgress = 0;

        try {
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                if (uploadProgress < 90) {
                    uploadProgress += Math.random() * 10;
                }
            }, 200);

            // Simulate upload delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            clearInterval(progressInterval);
            uploadProgress = 100;

            // For demo purposes, use the preview URL as the final value
            // In real implementation, parent should handle actual upload
            value = previewUrl;
            dispatch("change", { value: previewUrl });
            showUploadDialog = false;
            resetUploadState();
        } catch (error) {
            // Note: error event not in ImageUploadEvents, keeping for backward compatibility
            dispatch("error", { message: `Upload failed: ${error}` });
        } finally {
            isUploading = false;
            uploadProgress = 0;
        }
    }

    // Remove current image
    function removeImage() {
        value = null;
        dispatch("change", { value: null });
    }

    // Reset upload state
    function resetUploadState() {
        selectedFile = null;
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }
        uploadProgress = 0;
    }

    // Clean up object URLs
    function cleanup() {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }
    }

    // Cleanup on component destroy
    import { onDestroy } from "svelte";
    onDestroy(() => {
        cleanup();
    });
</script>

<div class="space-y-3">
    <!-- Current Image Display -->
    {#if value}
        <div class="relative group">
            <img
                src={value}
                alt=""
                class="w-full h-32 object-cover rounded-lg border border-stone-600"
            />
            <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
            >
                <div class="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        on:click={() => (showUploadDialog = true)}
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
            class="border-2 border-dashed rounded-lg p-6 text-center transition-colors"
            style="border-color: rgb(var(--color-border));"
        >
            <div class="space-y-3">
                <div
                    class="w-12 h-12 mx-auto rounded-lg flex items-center justify-center"
                    style="background-color: rgb(var(--color-surface-secondary));"
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style="color: rgb(var(--color-text-secondary));"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>
                <div>
                    <p
                        class="font-medium"
                        style="color: rgb(var(--color-text));"
                    >
                        {placeholder}
                    </p>
                    <p
                        class="text-sm"
                        style="color: rgb(var(--color-text-secondary));"
                    >
                        Choose a file to upload
                    </p>
                </div>
                <div class="flex gap-2 justify-center">
                    <Button
                        variant="primary"
                        size="sm"
                        on:click={() => (showUploadDialog = true)}
                        {disabled}
                    >
                        Upload File
                    </Button>
                </div>
            </div>
        </div>
    {/if}

    <!-- Upload Dialog -->
    <Modal
        bind:isOpen={showUploadDialog}
        title="Upload File"
        on:close={() => {
            showUploadDialog = false;
            resetUploadState();
        }}
    >
        <div class="space-y-4">
            {#if !selectedFile}
                <!-- File Selection -->
                <div class="space-y-3">
                    <div class="text-sm font-medium text-stone-300">
                        Choose File
                    </div>
                    <input
                        type="file"
                        {accept}
                        on:change={handleFileSelect}
                        class="block w-full text-sm text-stone-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-900/30 file:text-blue-300 hover:file:bg-blue-900/50"
                    />
                    <p class="text-xs text-stone-500">
                        Max size: {Math.round(maxSize / 1024 / 1024)}MB
                    </p>
                </div>
            {:else}
                <!-- Preview and Upload -->
                <div class="space-y-4">
                    <div class="relative">
                        {#if selectedFile.type.startsWith("image/")}
                            <img
                                src={previewUrl}
                                alt="Preview"
                                class="w-full h-48 object-cover rounded-lg border"
                                style="border-color: rgb(var(--color-border));"
                            />
                        {:else}
                            <div
                                class="w-full h-48 rounded-lg flex items-center justify-center"
                                style="background-color: rgb(var(--color-surface-secondary)); border-color: rgb(var(--color-border));"
                            >
                                <div class="text-center">
                                    <svg
                                        class="w-12 h-12 mx-auto mb-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        style="color: rgb(var(--color-text-secondary));"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <p
                                        class="text-sm"
                                        style="color: rgb(var(--color-text));"
                                    >
                                        {selectedFile.name}
                                    </p>
                                </div>
                            </div>
                        {/if}
                        {#if isUploading}
                            <div
                                class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"
                            >
                                <div class="text-center">
                                    <div
                                        class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"
                                    ></div>
                                    <p class="text-white text-sm">
                                        Uploading...
                                    </p>
                                </div>
                            </div>
                        {/if}
                    </div>

                    <!-- Progress Bar -->
                    {#if isUploading}
                        <div class="space-y-2">
                            <div
                                class="flex justify-between text-sm text-stone-400"
                            >
                                <span>Uploading...</span>
                                <span>{Math.round(uploadProgress)}%</span>
                            </div>
                            <div class="w-full bg-stone-700 rounded-full h-2">
                                <div
                                    class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style="width: {uploadProgress}%"
                                ></div>
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
        <svelte:fragment slot="footer">
            <Button
                variant="secondary"
                on:click={() => {
                    showUploadDialog = false;
                    resetUploadState();
                }}
            >
                Cancel
            </Button>
            {#if selectedFile}
                <Button
                    variant="primary"
                    on:click={uploadFile}
                    disabled={isUploading}
                    loading={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload File"}
                </Button>
            {/if}
        </svelte:fragment>
    </Modal>
</div>
