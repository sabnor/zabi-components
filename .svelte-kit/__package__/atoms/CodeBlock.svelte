<script lang="ts">
    import Check from "@lucide/svelte/icons/check";
    import Copy from "@lucide/svelte/icons/copy";
    import IconButton from "./IconButton.svelte";

    interface Props {
        /** Raw source; escaped unless `trustHtml` (e.g. highlighter HTML). */
        code: string;
        language?: string;
        className?: string;
        showCopyButton?: boolean;
        /** If true, `{@html code}` — only trusted, sanitized input. */
        trustHtml?: boolean;
    }

    let {
        code,
        language = "svelte",
        className = "",
        showCopyButton = true,
        trustHtml = false,
        ...restProps
    } = $props();

    let copied = $state(false);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(code);
            copied = true;
            setTimeout(() => {
                copied = false;
            }, 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    }
</script>

<div
    class="code-block relative bg-surface-1 border border-border rounded-lg overflow-hidden {className}"
    {...restProps}
>
    <div
        class="flex items-center justify-between px-4 py-2 bg-surface-2 border-b border-border"
    >
        <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {#if showCopyButton}
            <IconButton
                variant="ghost"
                size="sm"
                label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
                onclick={copyToClipboard}
            >
                {#if copied}
                    <Check size={16} class="shrink-0" aria-hidden="true" />
                {:else}
                    <Copy size={16} class="shrink-0" aria-hidden="true" />
                {/if}
            </IconButton>
        {/if}
    </div>

    <pre class="p-4 overflow-x-auto text-sm text-base-900 leading-relaxed"><code
            class="language-{language}"
            >{#if trustHtml}{@html code}{:else}{code}{/if}</code
        ></pre>
</div>

<style>
    .code-block {
        font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    }

    :global(.language-svelte .token.tag),
    :global(.language-html .token.tag) {
        color: var(--color-error-text);
    }

    :global(.language-svelte .token.attr-name),
    :global(.language-html .token.attr-name) {
        color: var(--color-success-text);
    }

    :global(.language-svelte .token.attr-value),
    :global(.language-html .token.attr-value) {
        color: var(--color-warning-text);
    }

    :global(.language-javascript .token.keyword),
    :global(.language-typescript .token.keyword) {
        color: var(--color-info-text);
    }

    :global(.language-javascript .token.string),
    :global(.language-typescript .token.string) {
        color: var(--color-warning-text);
    }

    :global(.language-javascript .token.function),
    :global(.language-typescript .token.function) {
        color: var(--color-success-text);
    }
</style>
