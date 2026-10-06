<script lang="ts">
    import Check from "@lucide/svelte/icons/check";
    import Copy from "@lucide/svelte/icons/copy";
    import IconButton from "./IconButton.svelte";
    import { cn } from "../util/cn.js";

    interface Props {
        /** Raw source; escaped unless `trustHtml` (e.g. highlighter HTML). */
        code: string;
        language?: string;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        showCopyButton?: boolean;
        /** Accessible name of the copy button. */
        copyLabel?: string;
        /** Its name for the two seconds after the code was copied. */
        copiedLabel?: string;
        /** If true, `{@html code}` — only trusted, sanitized input. */
        trustHtml?: boolean;
    }

    let {
        code,
        language = "svelte",
        class: classAttr = "",
        className: legacyClass = "",
        showCopyButton = true,
        copyLabel = "Copy code to clipboard",
        copiedLabel = "Code copied to clipboard",
        trustHtml = false,
        ...restProps
    }: Props & Record<string, unknown> = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));

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
    class={cn("code-block relative bg-surface-1 border border-border rounded-control overflow-hidden", className)}
    {...restProps}
>
    <div
        class="flex items-center justify-between px-4 py-2 bg-surface-2 border-b border-border"
    >
        <div class="flex items-center gap-2" aria-hidden="true">
            <div class="w-3 h-3 rounded-full bg-error"></div>
            <div class="w-3 h-3 rounded-full bg-warning"></div>
            <div class="w-3 h-3 rounded-full bg-success"></div>
        </div>
        {#if showCopyButton}
            <IconButton
                variant="ghost"
                size="sm"
                label={copied ? copiedLabel : copyLabel}
                onclick={copyToClipboard}
            >
                {#if copied}
                    <Check size={16} class="shrink-0" aria-hidden="true" />
                {:else}
                    <Copy size={16} class="shrink-0" aria-hidden="true" />
                {/if}
            </IconButton>
            <!-- A button's new name is not read out while it keeps focus.
            This says it: always in the page, filled when the code is copied. -->
            <span class="sr-only" role="status" data-code-block-status>{copied ? copiedLabel : ""}</span>
        {/if}
    </div>

    <pre class="p-4 overflow-x-auto text-sm text-base-900 leading-relaxed"><code
            class="language-{language}"
            >{#if trustHtml}{@html code}{:else}{code}{/if}</code
        ></pre>
</div>

<style>
    /* The token's default is this same stack. It is repeated as the fallback
       because Tailwind only emits theme variables it sees used, and it does
       not read a component's scoped styles. */
    .code-block {
        font-family: var(--font-family-mono, "Monaco", "Menlo", "Ubuntu Mono", monospace);
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
