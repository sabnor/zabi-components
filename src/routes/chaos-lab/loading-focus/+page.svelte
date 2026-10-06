<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import IconButton from "../../../components/atoms/IconButton.svelte";
    import type { ButtonVariant } from "../../../components/types/variants.js";

    /**
     * Controls that turn `loading` when pressed, for
     * playwright/loading-focus.spec.ts: focus is on the control when it
     * starts loading, and has to be there still. Each loads for a second.
     */
    const VARIANTS: ButtonVariant[] = ["primary", "secondary", "outline", "ghost", "link", "danger", "accent"];

    let loading = $state<Record<string, boolean>>({});
    let presses = $state<Record<string, number>>({});
    let submits = $state(0);

    function press(id: string, event?: Event) {
        // The links go nowhere here; what is tested is what loading does to them.
        event?.preventDefault();
        presses[id] = (presses[id] ?? 0) + 1;
        loading[id] = true;
        setTimeout(() => (loading[id] = false), 1000);
    }
</script>

<svelte:head>
    <title>Loading focus lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="space-y-6 p-4">
    <h1 class="text-lg font-semibold text-headline">Loading focus lab</h1>

    <section class="flex flex-wrap items-center gap-3" data-testid="buttons">
        {#each VARIANTS as variant (variant)}
            <Button
                {variant}
                loading={loading[variant]}
                onclick={() => press(variant)}
                data-testid="button-{variant}"
            >
                Save {variant}
            </Button>
        {/each}
    </section>

    <section class="flex flex-wrap items-center gap-3" data-testid="links">
        <Button
            href="/docs"
            loading={loading.link1}
            onclick={(event) => press("link1", event)}
            data-testid="link-button"
        >
            Open docs
        </Button>
        <IconButton
            label="Refresh"
            loading={loading.icon}
            onclick={() => press("icon")}
            data-testid="icon-button"
        >
            <span aria-hidden="true">R</span>
        </IconButton>
        <IconButton
            label="Open theming"
            href="/theming"
            loading={loading.iconLink}
            onclick={(event) => press("iconLink", event)}
            data-testid="icon-link"
        >
            <span aria-hidden="true">T</span>
        </IconButton>
    </section>

    <form
        class="flex items-center gap-3"
        onsubmit={(event) => {
            event.preventDefault();
            submits += 1;
            press("submit");
        }}
    >
        <label class="text-sm text-label">
            Name
            <input class="ml-2 rounded-control border border-border px-2 py-1" data-testid="name" />
        </label>
        <Button type="submit" loading={loading.submit} data-testid="submit">Send</Button>
    </form>

    <p data-testid="presses">{JSON.stringify(presses)}</p>
    <p data-testid="submits">{submits}</p>
    <button type="button" data-testid="after">After</button>
</main>
