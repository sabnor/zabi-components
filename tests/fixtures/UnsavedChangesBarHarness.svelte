<script lang="ts">
    import UnsavedChangesBar from "../../src/components/molecules/UnsavedChangesBar.svelte";

    interface Props {
        initialDirty?: boolean;
        position?: "bottom" | "top";
        saving?: boolean;
        message?: string;
        saveLabel?: string;
        discardLabel?: string;
        withActions?: boolean;
        /**
         * `sync`: saves at once. `async`: after a moment. `reject`: fails
         * after a moment. `late`: resolves first and clears `dirty` a moment
         * later. `none`: only reports.
         */
        mode?: "sync" | "async" | "reject" | "late" | "none";
        onsaved?: () => void;
        ondiscarded?: () => void;
        onerror?: (error: unknown) => void;
    }

    let {
        initialDirty = false,
        position,
        saving,
        message,
        saveLabel,
        discardLabel,
        withActions = false,
        mode = "sync",
        onsaved,
        ondiscarded,
        onerror,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let saved = $state(initialDirty ? "" : "Ada");
    // svelte-ignore state_referenced_locally
    let name = $state(initialDirty ? "Ada Lovelace" : "Ada");
    const dirty = $derived(name !== saved);

    function wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function save(): void | Promise<unknown> {
        onsaved?.();
        if (mode === "none") return;
        if (mode === "sync") {
            saved = name;
            return;
        }
        if (mode === "async") {
            return wait(30).then(() => {
                saved = name;
            });
        }
        if (mode === "late") {
            return wait(30).then(() => {
                setTimeout(() => (saved = name), 30);
            });
        }
        return wait(30).then(() => {
            throw new Error("The server said no.");
        });
    }
</script>

{#snippet extra()}
    <button type="button" data-testid="preview">Preview</button>
{/snippet}

<label>
    Name
    <input data-testid="name" bind:value={name} />
</label>
<UnsavedChangesBar
    {dirty}
    {position}
    {saving}
    {message}
    {saveLabel}
    {discardLabel}
    {onerror}
    onsave={save}
    ondiscard={() => {
        ondiscarded?.();
        name = saved;
    }}
    actions={withActions ? extra : undefined}
    data-testid="bar"
/>
<button type="button" data-testid="after">After</button>
