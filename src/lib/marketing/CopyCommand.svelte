<script lang="ts">
    import Check from "@lucide/svelte/icons/check";
    import Copy from "@lucide/svelte/icons/copy";

    interface Props {
        command: string;
    }

    let { command }: Props = $props();

    type CopyState = "idle" | "copied" | "failed";

    let state = $state<CopyState>("idle");
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const copied = $derived(state === "copied");

    /**
     * The clipboard API is unavailable on an insecure origin and can be denied
     * outright, and the failure is silent. Saying so is the difference between
     * "nothing happened" and "select the text yourself".
     */
    async function copy() {
        clearTimeout(resetTimer);
        try {
            await navigator.clipboard.writeText(command);
            state = "copied";
        } catch {
            state = "failed";
        }
        resetTimer = setTimeout(() => (state = "idle"), 2000);
    }

    $effect(() => () => clearTimeout(resetTimer));
</script>

<div class="inline-block max-w-full">
    <div
        class="inline-flex max-w-full items-center gap-3 rounded-2xl border border-border bg-card py-2 pl-4 pr-2 text-headline"
    >
        <span class="text-description select-none" aria-hidden="true">$</span>
        <code class="truncate text-[0.9375rem] font-semibold">{command}</code>
        <button
            type="button"
            class="focus-ring flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-description transition-colors hover:bg-surface-hover hover:text-headline"
            onclick={copy}
            aria-label={copied ? "Install command copied" : "Copy install command"}
        >
            {#if copied}
                <Check size={18} aria-hidden="true" />
            {:else}
                <Copy size={18} aria-hidden="true" />
            {/if}
        </button>
    </div>

    {#if state === "failed"}
        <p class="mt-2 text-sm text-description">
            Could not reach the clipboard. Select the command to copy it.
        </p>
    {/if}

    <span class="sr-only" aria-live="polite">
        {#if state === "copied"}Copied to clipboard{/if}
        {#if state === "failed"}Could not reach the clipboard. Select the
            command to copy it.{/if}
    </span>
</div>
