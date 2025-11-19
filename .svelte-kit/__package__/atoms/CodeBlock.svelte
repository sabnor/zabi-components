<script lang="ts">
    interface Props {
        code: string;
        language?: string;
        className?: string;
        showCopyButton?: boolean;
    }

    let {
        code,
        language = "svelte",
        className = "",
        showCopyButton = true,
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
    class="code-block relative bg-base-900 rounded-lg overflow-hidden {className}"
    {...restProps}
>
    <!-- Header -->
    <div
        class="flex items-center justify-between px-4 py-2 bg-base-800 border-b border-base-700"
    >
        <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {#if showCopyButton}
            <button
                onclick={copyToClipboard}
                class="flex items-center gap-2 px-3 py-1 text-xs text-base-300 hover:text-white hover:bg-base-700 rounded transition-colors duration-200"
                aria-label="Copy code to clipboard"
            >
                {#if copied}
                    <svg
                        class="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Copied!
                {:else}
                    <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                    Copy
                {/if}
            </button>
        {/if}
    </div>

    <!-- Code content -->
    <pre class="p-4 overflow-x-auto text-sm text-base-100 leading-relaxed"><code
            class="language-{language}">{@html code}</code
        ></pre>
</div>

<style>
    .code-block {
        font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    }

    /* Basic syntax highlighting for common languages */
    :global(.language-svelte .token.tag),
    :global(.language-html .token.tag) {
        color: #f92672;
    }

    :global(.language-svelte .token.attr-name),
    :global(.language-html .token.attr-name) {
        color: #a6e22e;
    }

    :global(.language-svelte .token.attr-value),
    :global(.language-html .token.attr-value) {
        color: #e6db74;
    }

    :global(.language-javascript .token.keyword),
    :global(.language-typescript .token.keyword) {
        color: #66d9ef;
    }

    :global(.language-javascript .token.string),
    :global(.language-typescript .token.string) {
        color: #e6db74;
    }

    :global(.language-javascript .token.function),
    :global(.language-typescript .token.function) {
        color: #a6e22e;
    }
</style>
