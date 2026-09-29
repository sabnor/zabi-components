<script lang="ts">
    import CopyButton, { type CopyState } from "./CopyButton.svelte";

    interface Props {
        command: string;
    }

    let { command }: Props = $props();

    let state = $state<CopyState>("idle");
</script>

<div class="inline-block max-w-full">
    <div
        class="inline-flex max-w-full items-center gap-3 rounded-2xl border border-border bg-card py-2 pl-4 pr-2 text-headline"
    >
        <span class="text-description select-none" aria-hidden="true">$</span>
        <code class="truncate text-[0.9375rem] font-semibold">{command}</code>
        <CopyButton text={command} subject="install command" bind:state />
    </div>

    {#if state === "failed"}
        <p class="mt-2 text-sm text-description">
            Could not reach the clipboard. Select the command to copy it.
        </p>
    {/if}
</div>
