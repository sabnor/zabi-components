<script lang="ts">
    import CodeBlock from "../atoms/CodeBlock.svelte";

    interface Props {
        title: string;
        description?: string;
        code: string;
        language?: string;
        className?: string;
    }

    let {
        title,
        description = "",
        code,
        language = "svelte",
        className = "",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

    let showCode = $state(false);
</script>

<div
    class="component-demo bg-surface border border-border rounded-lg overflow-hidden {className}"
    {...restProps}
>
    <!-- Header -->
    <div class="px-6 py-4 border-b border-border bg-surface-secondary">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-semibold text-text">{title}</h3>
                {#if description}
                    <p class="text-sm text-text-secondary mt-1">
                        {description}
                    </p>
                {/if}
            </div>
            <button
                onclick={() => (showCode = !showCode)}
                class="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-surface rounded-md transition-colors duration-200"
                aria-label={showCode ? "Show preview" : "Show code"}
            >
                {#if showCode}
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                    Preview
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
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                    </svg>
                    Code
                {/if}
            </button>
        </div>
    </div>

    <!-- Content -->
    <div class="p-6">
        {#if showCode}
            <CodeBlock {code} {language} />
        {:else}
            <div class="min-h-[100px] flex items-center justify-center">
                {@render children?.()}
            </div>
        {/if}
    </div>
</div>
