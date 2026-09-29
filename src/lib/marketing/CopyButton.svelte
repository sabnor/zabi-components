<script lang="ts" module>
    export type CopyState = "idle" | "copied" | "failed";
</script>

<script lang="ts">
    import Check from "@lucide/svelte/icons/check";
    import Copy from "@lucide/svelte/icons/copy";

    interface Props {
        text: string;
        /** What is being copied, lower case: "install command", "css code". */
        subject: string;
        state?: CopyState;
        class?: string;
    }

    let {
        text,
        subject,
        state = $bindable("idle"),
        class: className = "",
    }: Props = $props();

    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const copied = $derived(state === "copied");
    const failureMessage = $derived(
        `Could not reach the clipboard. Select the ${subject} to copy it.`,
    );

    /**
     * The clipboard API is unavailable on an insecure origin and can be denied
     * outright, and the failure is silent. Saying so is the difference between
     * "nothing happened" and "select the text yourself".
     */
    async function copy() {
        clearTimeout(resetTimer);
        try {
            await navigator.clipboard.writeText(text);
            state = "copied";
        } catch {
            state = "failed";
        }
        resetTimer = setTimeout(() => (state = "idle"), 2000);
    }

    $effect(() => () => clearTimeout(resetTimer));
</script>

<!-- Drawn at 36px to sit inside the command pill; the pseudo-element brings
the tap area to 44px. -->
<button
    type="button"
    class="focus-ring relative flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-description transition-colors before:absolute before:-inset-1 hover:bg-surface-hover hover:text-headline {className}"
    onclick={copy}
    aria-label={copied
        ? `${subject.charAt(0).toUpperCase()}${subject.slice(1)} copied`
        : `Copy ${subject}`}
>
    {#if copied}
        <Check size={18} aria-hidden="true" />
    {:else}
        <Copy size={18} aria-hidden="true" />
    {/if}
</button>

<span class="sr-only" aria-live="polite">
    {#if state === "copied"}Copied to clipboard{/if}
    {#if state === "failed"}{failureMessage}{/if}
</span>
