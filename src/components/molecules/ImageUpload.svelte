<script lang="ts">
    import { onDestroy, type Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Button from "../atoms/Button.svelte";
    import { Image } from "@lucide/svelte";
    import { cn } from "../util/cn.js";
    import { generateId } from "../util/ssr-safe.js";

    export type ImageUploadFileDetail = {
        /** Selected file, or `null` when the image is removed. */
        file: File | null;
        /** Object URL used for the preview, or `null`. */
        url: string | null;
    };

    export type ImageUploadPreviewType = "image" | "video";

    export type ImageUploadPreviewDetail = {
        /** The current `value`. */
        url: string;
        /** What the built-in preview would have rendered. */
        type: ImageUploadPreviewType;
        alt: string;
    };

    type Props = Omit<HTMLAttributes<HTMLDivElement>, "onchange" | "onclick" | "id"> & {
        /** Extra classes for the host element. */
        class?: string;
        /** Id of the control the label points at; generated when omitted. */
        id?: string;
        /** Visible label, associated with the dropzone. */
        label?: string;
        /** Preview URL; `bind:value` to read it. */
        value?: string | null;
        disabled?: boolean;
        accept?: string;
        placeholder?: string;
        /** Second line of the dropzone. */
        browseText?: string;
        changeText?: string;
        removeText?: string;
        /** Accessible name of the Change action; defaults to `changeText` plus `label`. */
        changeLabel?: string;
        /** Accessible name of the Remove action; defaults to `removeText` plus `label`. */
        removeLabel?: string;
        /** Text alternative for the preview. */
        alt?: string;
        /** Forces the preview kind when the URL has no extension to go by. */
        previewType?: ImageUploadPreviewType;
        /** Replaces the built-in `<img>` / `<video>` preview. */
        preview?: Snippet<[ImageUploadPreviewDetail]>;
        errorMessage?: string;
        errorTitle?: string;
        /** Closing line of the error block; `false` or `""` leaves it out. */
        errorRecovery?: string | false;
        /** Native `change` event from the hidden file input. */
        onchange?: (event: Event) => void;
        /** Fires before the file chooser opens; `event.preventDefault()` keeps it closed. */
        onclick?: (event: Event) => void;
        /** Replaces the native file chooser, for a media library or another source. */
        onbrowse?: (event: Event) => void;
        /** Selected file and preview URL; `{ file: null, url: null }` on remove. */
        onfileselect?: (detail: ImageUploadFileDetail) => void;
        /** A dropped file that `accept` does not allow. */
        onfilereject?: (file: File) => void;
    };

    let {
        class: className = "",
        id: idProp,
        label = "",
        value = $bindable(null),
        disabled = false,
        accept = "image/*",
        placeholder = "No image selected",
        browseText = "Click to choose a file",
        changeText = "Change",
        removeText = "Remove",
        changeLabel,
        removeLabel,
        alt = "",
        previewType,
        preview,
        errorMessage = "",
        errorTitle = "Image upload failed",
        errorRecovery = "Recovery action: try another file or retry upload.",
        onchange,
        onclick,
        onbrowse,
        onfileselect,
        onfilereject,
        children: _children,
        ...restProps
    }: Props = $props();

    const VIDEO_EXTENSION = /\.(mp4|m4v|webm|ogv|mov)$/i;

    const fallbackId = generateId("image-upload");
    const controlId = $derived(idProp ?? fallbackId);
    const labelId = $derived(`${controlId}-label`);
    const hintId = $derived(`${controlId}-hint`);
    const errorId = $derived(`${controlId}-error`);

    let fileInput = $state<HTMLInputElement>();
    let currentObjectUrl = $state<string | null>(null);
    // An object URL has no extension, so the kind is kept from the file itself.
    let currentObjectType = $state<ImageUploadPreviewType | null>(null);
    // dragenter/dragleave also fire for children; count them instead of toggling.
    let dragDepth = $state(0);

    const isDragOver = $derived(dragDepth > 0);

    function isVideoPath(path: string) {
        return VIDEO_EXTENSION.test(path.split(/[?#]/)[0]);
    }

    const resolvedPreviewType = $derived.by<ImageUploadPreviewType>(() => {
        if (previewType) return previewType;
        if (!value) return "image";
        if (value === currentObjectUrl && currentObjectType) return currentObjectType;
        return value.startsWith("data:video/") || isVideoPath(value) ? "video" : "image";
    });

    const changeName = $derived(
        changeLabel ?? (label ? `${changeText} ${label}` : undefined),
    );
    const removeName = $derived(
        removeLabel ?? (label ? `${removeText} ${label}` : undefined),
    );

    function revokeCurrentObjectUrl() {
        if (currentObjectUrl && typeof URL !== "undefined" && URL.revokeObjectURL) {
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
            currentObjectType = null;
        }
    }

    /** Shared by the file chooser and drag and drop. */
    function selectFile(file: File): string | null {
        let url: string | null = null;

        if (typeof URL !== "undefined" && URL.createObjectURL) {
            revokeCurrentObjectUrl();
            url = URL.createObjectURL(file);
            value = url;
            currentObjectUrl = url;
            currentObjectType =
                file.type.startsWith("video/") || (!file.type && isVideoPath(file.name))
                    ? "video"
                    : "image";
        }

        return url;
    }

    function handleFileSelect(event: Event) {
        if (disabled) return;

        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        const url = selectFile(file);

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
        if (event.defaultPrevented) return;
        if (onbrowse) {
            onbrowse(event);
            return;
        }
        fileInput?.click();
    }

    /** Same rules the browser applies to the `accept` attribute. */
    function matchesAccept(file: File) {
        const tokens = accept
            .split(",")
            .map((token) => token.trim().toLowerCase())
            .filter(Boolean);
        if (tokens.length === 0) return true;

        const type = file.type.toLowerCase();
        const name = file.name.toLowerCase();
        return tokens.some((token) => {
            if (token.startsWith(".")) return name.endsWith(token);
            if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
            return type === token;
        });
    }

    function carriesFiles(event: DragEvent) {
        return Array.from(event.dataTransfer?.types ?? []).includes("Files");
    }

    function handleDragEnter(event: DragEvent) {
        if (disabled || !carriesFiles(event)) return;
        event.preventDefault();
        dragDepth += 1;
    }

    function handleDragOver(event: DragEvent) {
        if (disabled || !carriesFiles(event)) return;
        // Without this the browser refuses the drop and opens the file instead.
        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    }

    function handleDragLeave() {
        if (dragDepth > 0) dragDepth -= 1;
    }

    function handleDrop(event: DragEvent) {
        dragDepth = 0;
        if (disabled || !carriesFiles(event)) return;
        event.preventDefault();

        const file = event.dataTransfer?.files?.[0];
        if (!file) return;
        if (!matchesAccept(file)) {
            onfilereject?.(file);
            return;
        }

        const url = selectFile(file);
        // The input did not take part; clear it so the same file can be picked again.
        if (fileInput) fileInput.value = "";
        onfileselect?.({ file, url });
    }

    onDestroy(() => {
        revokeCurrentObjectUrl();
    });
</script>

<div class={cn("space-y-3", className)} {...restProps}>
    {#if label}
        <label
            id={labelId}
            for={controlId}
            class={cn("block text-sm font-medium text-label", disabled && "opacity-60")}
        >
            {label}
        </label>
    {/if}

    <!-- Wraps both states so a drop is handled the same over either. -->
    <div
        role="presentation"
        ondragenter={handleDragEnter}
        ondragover={handleDragOver}
        ondragleave={handleDragLeave}
        ondrop={handleDrop}
        data-drag-over={isDragOver ? "" : undefined}
    >
        {#if value}
            <div
                class="relative group"
                role={label ? "group" : undefined}
                aria-labelledby={label ? labelId : undefined}
            >
                {#if preview}
                    {@render preview({ url: value, type: resolvedPreviewType, alt })}
                {:else if resolvedPreviewType === "video"}
                    <!-- Never autoplays, so there is no motion to reduce; muted
                         until the viewer unmutes it from the native controls. -->
                    <video
                        src={value}
                        controls
                        muted
                        playsinline
                        preload="metadata"
                        aria-label={alt || undefined}
                        class="w-full h-32 object-cover rounded-container border-0"
                    ></video>
                {:else}
                    <img
                        src={value}
                        {alt}
                        class="w-full h-32 object-cover rounded-container border-0"
                    />
                {/if}
                <!-- Hover cannot reveal the actions on a touch screen, so there
                     they stay visible as a strip that leaves the preview in
                     view. A video always gets the strip: a full overlay would
                     cover its controls. -->
                <div
                    class={cn(
                        "absolute inset-0 border border-border-overlay bg-surface-overlay/60 backdrop-blur-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity motion-reduce:transition-none rounded-container flex items-center justify-center",
                        "pointer-coarse:opacity-100 [@media(hover:none)]:opacity-100",
                        !preview && resolvedPreviewType === "video"
                            ? "bottom-auto py-2"
                            : "pointer-coarse:bottom-auto pointer-coarse:py-2 [@media(hover:none)]:bottom-auto [@media(hover:none)]:py-2",
                        isDragOver && "opacity-100 border-action-primary",
                    )}
                    data-testid="image-upload-actions"
                >
                    <div class="flex gap-2">
                        <Button
                            id={controlId}
                            variant="secondary"
                            size="sm"
                            onclick={triggerFileSelect}
                            aria-label={changeName}
                            {disabled}
                        >
                            {changeText}
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onclick={removeImage}
                            aria-label={removeName}
                            {disabled}
                        >
                            {removeText}
                        </Button>
                    </div>
                </div>
            </div>
        {:else}
            <button
                type="button"
                id={controlId}
                class={cn(
                    "focus-ring block w-full border-2 border-dashed border-input-border rounded-container p-6 text-center hover:border-action-primary transition-colors",
                    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                    isDragOver && "border-action-primary bg-action-primary-subtle",
                )}
                onclick={triggerFileSelect}
                {disabled}
                aria-describedby={[label ? hintId : "", errorMessage ? errorId : ""]
                    .filter(Boolean)
                    .join(" ") || undefined}
            >
                <span class="block space-y-3">
                    <span
                        class="w-12 h-12 mx-auto bg-action-secondary rounded-control flex items-center justify-center"
                    >
                        <Image size={24} class="text-description" aria-hidden="true" />
                    </span>
                    <span id={hintId} class="block">
                        <span class="block font-medium text-headline">{placeholder}</span>
                        <span class="block text-sm text-description">
                            {browseText}
                        </span>
                    </span>
                </span>
            </button>
        {/if}
    </div>

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
        <!-- Same tinted fill + tinted border Alert uses, rather than a bare
             step-600 outline on a transparent ground. -->
        <div
            id={errorId}
            class="rounded-container border bg-error-subtle border-error-border text-error-text px-3 py-2 text-sm"
            role="alert"
        >
            <p class="font-medium">{errorTitle}</p>
            <p>{errorMessage}</p>
            {#if errorRecovery}
                <p class="mt-1">{errorRecovery}</p>
            {/if}
        </div>
    {/if}
</div>
