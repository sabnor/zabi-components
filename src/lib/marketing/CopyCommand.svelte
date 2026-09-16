<script lang="ts">
    import Check from "@lucide/svelte/icons/check";
    import Copy from "@lucide/svelte/icons/copy";

    interface Props {
        command: string;
    }

    let { command }: Props = $props();

    let copied = $state(false);
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    async function copy() {
        try {
            await navigator.clipboard.writeText(command);
            copied = true;
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => (copied = false), 2000);
        } catch {
            copied = false;
        }
    }

    $effect(() => () => clearTimeout(resetTimer));
</script>

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
    <span class="sr-only" aria-live="polite">{copied ? "Copied to clipboard" : ""}</span>
</div>
